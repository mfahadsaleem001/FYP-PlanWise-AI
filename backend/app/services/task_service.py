from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.task import Task, TaskAssignment
from app.models.weekly_plan import WeeklyPlan
from app.schemas.task import TaskCreate, TaskUpdate


INACTIVE_PROJECT_STATUSES = {
    "completed",
    "cancelled",
    "canceled",
    "archived",
    "deleted",
}


def _get_active_project_count(
    db: Session,
    employee_id: int,
) -> int:
    statement = (
        select(
            func.count(
                func.distinct(ProjectEmployeeAssignment.project_id)
            )
        )
        .join(
            Project,
            Project.id == ProjectEmployeeAssignment.project_id,
        )
        .where(
            ProjectEmployeeAssignment.employee_id == employee_id,
            func.lower(Project.status).not_in(
                INACTIVE_PROJECT_STATUSES
            ),
        )
    )

    return db.scalar(statement) or 0


def _validate_employee_assignments(
    db: Session,
    project_id: int,
    employee_ids: list[int],
) -> list[int]:
    employee_ids = list(dict.fromkeys(employee_ids))

    if not employee_ids:
        return employee_ids

    existing_employees = set(
        db.scalars(
            select(Employee.id).where(
                Employee.id.in_(employee_ids)
            )
        ).all()
    )

    missing_employees = set(employee_ids) - existing_employees

    if missing_employees:
        raise ValueError(
            f"Employee IDs not found: {sorted(missing_employees)}"
        )

    existing_assignments = set(
        db.scalars(
            select(ProjectEmployeeAssignment.employee_id).where(
                ProjectEmployeeAssignment.project_id == project_id,
                ProjectEmployeeAssignment.employee_id.in_(employee_ids),
            )
        ).all()
    )

    for employee_id in employee_ids:
        if employee_id in existing_assignments:
            continue

        active_count = _get_active_project_count(
            db,
            employee_id,
        )

        if active_count >= 3:
            raise ValueError(
                f"Employee {employee_id} already has "
                f"{active_count} active projects. Maximum allowed is 3."
            )

    return employee_ids


def _validate_weekly_plan(
    db: Session,
    project_id: int,
    weekly_plan_id: int,
    due_date,
) -> WeeklyPlan:
    plan = db.get(WeeklyPlan, weekly_plan_id)

    if plan is None:
        raise ValueError("Weekly plan not found.")

    if plan.project_id != project_id:
        raise ValueError(
            "The weekly plan does not belong to this project."
        )

    task_date = due_date.date()

    if not plan.week_start_date <= task_date <= plan.week_end_date:
        raise ValueError(
            "The task due date must fall within the selected weekly plan."
        )

    return plan


def _task_to_dict(
    db: Session,
    task: Task,
) -> dict:
    assignments = db.scalars(
        select(TaskAssignment)
        .where(TaskAssignment.task_id == task.id)
        .order_by(TaskAssignment.id)
    ).all()

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "project_id": task.project_id,
        "weekly_plan_id": task.weekly_plan_id,
        "priority": task.priority,
        "status": task.status,
        "due_date": task.due_date,
        "created_by": task.created_by,
        "created_at": task.created_at,
        "updated_at": task.updated_at,
        "assignments": [
            {
                "id": assignment.id,
                "task_id": assignment.task_id,
                "employee_id": assignment.employee_id,
                "assigned_at": assignment.assigned_at,
            }
            for assignment in assignments
        ],
    }


def create_task(
    db: Session,
    task_data: TaskCreate,
    admin_id: int,
) -> dict:
    project = db.get(Project, task_data.project_id)

    if project is None:
        raise ValueError("Project not found.")

    if (project.status or "").lower() in INACTIVE_PROJECT_STATUSES:
        raise ValueError("Cannot create tasks for an inactive project.")

    _validate_weekly_plan(
        db=db,
        project_id=project.id,
        weekly_plan_id=task_data.weekly_plan_id,
        due_date=task_data.due_date,
    )

    employee_ids = _validate_employee_assignments(
        db,
        project.id,
        task_data.employee_ids,
    )

    task = Task(
        title=task_data.title,
        description=task_data.description,
        project_id=project.id,
        weekly_plan_id=task_data.weekly_plan_id,
        priority=task_data.priority,
        due_date=task_data.due_date,
        created_by=admin_id,
    )

    try:
        db.add(task)
        db.flush()

        for employee_id in employee_ids:
            project_assignment = db.scalar(
                select(ProjectEmployeeAssignment).where(
                    ProjectEmployeeAssignment.project_id == project.id,
                    ProjectEmployeeAssignment.employee_id == employee_id,
                )
            )

            if project_assignment is None:
                db.add(
                    ProjectEmployeeAssignment(
                        project_id=project.id,
                        employee_id=employee_id,
                    )
                )

            db.add(
                TaskAssignment(
                    task_id=task.id,
                    employee_id=employee_id,
                )
            )

        db.commit()
        db.refresh(task)

    except Exception:
        db.rollback()
        raise

    return _task_to_dict(db, task)


def get_task_by_id(
    db: Session,
    task_id: int,
) -> dict | None:
    task = db.get(Task, task_id)

    if task is None:
        return None

    return _task_to_dict(db, task)


def get_tasks(
    db: Session,
    project_id: int | None = None,
) -> list[dict]:
    statement = select(Task).order_by(Task.created_at.desc())

    if project_id is not None:
        statement = statement.where(
            Task.project_id == project_id
        )

    tasks = db.scalars(statement).all()

    return [
        _task_to_dict(db, task)
        for task in tasks
    ]


def update_task(
    db: Session,
    task: Task,
    task_data: TaskUpdate,
) -> dict:
    update_data = task_data.model_dump(exclude_unset=True)
    employee_ids = update_data.pop("employee_ids", None)

    for field, value in update_data.items():
        if value is None:
            raise ValueError(f"{field} cannot be null.")

    if employee_ids is not None:
        project = db.get(Project, task.project_id)

        if project is None:
            raise ValueError("Project not found.")

        if (project.status or "").lower() in INACTIVE_PROJECT_STATUSES:
            raise ValueError(
                "Cannot assign employees to an inactive project."
            )

        employee_ids = _validate_employee_assignments(
            db,
            task.project_id,
            employee_ids,
        )

    try:
        for field, value in update_data.items():
            setattr(task, field, value)

        if employee_ids is not None:
            db.query(TaskAssignment).filter(
                TaskAssignment.task_id == task.id
            ).delete(synchronize_session=False)

            for employee_id in employee_ids:
                project_assignment = db.scalar(
                    select(ProjectEmployeeAssignment).where(
                        ProjectEmployeeAssignment.project_id
                        == task.project_id,
                        ProjectEmployeeAssignment.employee_id
                        == employee_id,
                    )
                )

                if project_assignment is None:
                    db.add(
                        ProjectEmployeeAssignment(
                            project_id=task.project_id,
                            employee_id=employee_id,
                        )
                    )

                db.add(
                    TaskAssignment(
                        task_id=task.id,
                        employee_id=employee_id,
                    )
                )

        db.commit()
        db.refresh(task)

    except Exception:
        db.rollback()
        raise

    return _task_to_dict(db, task)