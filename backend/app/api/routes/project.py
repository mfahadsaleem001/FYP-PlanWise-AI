from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.connection import get_db
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.services.project_service import create_project, delete_project, get_project_by_id, get_projects_by_owner, update_project

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)

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