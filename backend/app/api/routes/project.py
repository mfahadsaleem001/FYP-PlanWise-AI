
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_admin
from app.database.connection import get_db
from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.services.project_service import (
    create_project,
    delete_project,
    get_project_by_id,
    get_projects_by_owner,
    update_project,
)

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)


class ProjectEmployeeAssignmentRequest(BaseModel):
    employee_ids: list[int] = Field(default_factory=list)


# Admin: Get all projects, including their assigned employees
# Keep this route before /{project_id}
@router.get("/admin/all")
def get_all_admin_projects(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    statement = (
        select(Project, User)
        .join(User, Project.owner_id == User.id)
        .order_by(Project.created_at.desc())
    )

    results = db.execute(statement).all()

    if not results:
        return []

    project_ids = [project.id for project, _ in results]

    assignment_statement = (
        select(ProjectEmployeeAssignment, Employee, User)
        .join(
            Employee,
            ProjectEmployeeAssignment.employee_id == Employee.id,
        )
        .join(User, Employee.user_id == User.id)
        .where(ProjectEmployeeAssignment.project_id.in_(project_ids))
    )

    assignment_results = db.execute(assignment_statement).all()

    teams_by_project = {}

    for assignment, employee, employee_user in assignment_results:
        teams_by_project.setdefault(assignment.project_id, []).append(
            {
                "id": employee.id,
                "user_id": employee.user_id,
                "name": employee_user.name,
                "email": employee_user.email,
                "role": employee.job_title,
                "job_title": employee.job_title,
                "availability_status": employee.availability_status,
                "capacity_hours": employee.capacity_hours,
                "assigned_at": assignment.assigned_at,
            }
        )

    return [
        {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "type": project.project_type,
            "status": project.status,
            "owner_id": project.owner_id,
            "owner": owner.name,
            "owner_email": owner.email,
            "created_at": project.created_at,
            "updated_at": project.updated_at,
            "team": teams_by_project.get(project.id, []),
            "teamSize": len(teams_by_project.get(project.id, [])),
        }
        for project, owner in results
    ]


# Admin: Assign or replace employees assigned to a project
@router.put("/{project_id}/employees")
def assign_project_employees(
    project_id: int,
    assignment_data: ProjectEmployeeAssignmentRequest,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    project = db.get(Project, project_id)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    employee_ids = assignment_data.employee_ids

    # Reject duplicate IDs in the request
    if len(employee_ids) != len(set(employee_ids)):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Duplicate employee IDs are not allowed",
        )

    # Verify that every requested employee exists
    if employee_ids:
        employees_statement = select(Employee.id).where(
            Employee.id.in_(employee_ids)
        )
        existing_employee_ids = set(db.scalars(employees_statement).all())

        missing_employee_ids = set(employee_ids) - existing_employee_ids

        if missing_employee_ids:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={
                    "message": "One or more employees were not found",
                    "employee_ids": sorted(missing_employee_ids),
                },
            )

    try:
        # Replace the project's current team with the submitted selection
        db.execute(
            delete(ProjectEmployeeAssignment).where(
                ProjectEmployeeAssignment.project_id == project_id
            )
        )

        for employee_id in employee_ids:
            db.add(
                ProjectEmployeeAssignment(
                    project_id=project_id,
                    employee_id=employee_id,
                )
            )

        db.commit()

    except Exception:
        db.rollback()
        raise

    return {
        "message": "Project employees assigned successfully",
        "project_id": project_id,
        "employee_ids": employee_ids,
        "team_size": len(employee_ids),
    }


# Create a project
@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_project(
    project_data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = create_project(
        db=db,
        project_data=project_data,
        owner_id=current_user.id,
    )

    return project


# Get projects belonging to the logged-in user
@router.get(
    "",
    response_model=list[ProjectResponse],
)
def get_my_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    projects = get_projects_by_owner(
        db=db,
        owner_id=current_user.id,
    )

    return projects


# Get a specific project
@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def get_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = get_project_by_id(
        db=db,
        project_id=project_id,
        owner_id=current_user.id,
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    return project


# Update a project
@router.patch(
    "/{project_id}",
    response_model=ProjectResponse,
)
def update_existing_project(
    project_id: int,
    project_data: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = get_project_by_id(
        db=db,
        project_id=project_id,
        owner_id=current_user.id,
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    updated_project = update_project(
        db=db,
        project=project,
        project_data=project_data,
    )

    return updated_project


# Delete a project
@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_existing_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = get_project_by_id(
        db=db,
        project_id=project_id,
        owner_id=current_user.id,
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    delete_project(
        db=db,
        project=project,
    )

    return None