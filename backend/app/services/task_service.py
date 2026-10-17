from datetime import date

from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.project import Project
from app.models.project_employee_assignment import ProjectEmployeeAssignment
from app.models.task import Task, TaskAssignment
from app.models.task_weekly_plan import TaskWeeklyPlan
from app.models.weekly_plan import WeeklyPlan
from app.schemas.task import TaskCreate, TaskUpdate
from app.models.task_assignment_history import TaskAssignmentHistory

INACTIVE_PROJECT_STATUSES = {
    "completed",
    "cancelled",
    "canceled",
    "archived",
    "deleted",
}

COMPLETED_TASK_STATUSES = {
    "completed",
    "cancelled",
    "canceled",
}


def _is_task_overdue(task: Task) -> bool:
    return (
        task.status.strip().lower() not in COMPLETED_TASK_STATUSES
        and task.due_date.date() < date.today()
    )


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

        active_count = _get_active_project_count(db, employee_id)

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
) -> WeeklyPlan:
    plan = db.get(WeeklyPlan, weekly_plan_id)

    if plan is None:
        raise ValueError("Weekly plan not found.")

    if plan.project_id != project_id:
        raise ValueError(
            "The weekly plan does not belong to this project."
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

    weekly_links = db.scalars(
        select(TaskWeeklyPlan)
        .where(TaskWeeklyPlan.task_id == task.id)
        .order_by(TaskWeeklyPlan.assigned_at)
    ).all()

    # Preserve the original plan even for older tasks whose
    # original link has not yet been backfilled.
    weekly_plan_ids = list(
        dict.fromkeys(
            [task.weekly_plan_id]
            + [link.weekly_plan_id for link in weekly_links]
        )
    )

    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "project_id": task.project_id,
        "weekly_plan_id": task.weekly_plan_id,
        "weekly_plan_ids": weekly_plan_ids,
        "is_overdue": _is_task_overdue(task),
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

    if (project.status or "").strip().lower() in INACTIVE_PROJECT_STATUSES:
        raise ValueError("Cannot create tasks for an inactive project.")

    plan = _validate_weekly_plan(
        db=db,
        project_id=project.id,
        weekly_plan_id=task_data.weekly_plan_id,
    )

    # A new task must be due within its original weekly plan.
    task_date = task_data.due_date.date()

    if not plan.week_start_date <= task_date <= plan.week_end_date:
        raise ValueError(
            "A new task's due date must fall within its original weekly plan."
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
        weekly_plan_id=plan.id,
        priority=task_data.priority,
        due_date=task_data.due_date,
        created_by=admin_id,
    )

    try:
        db.add(task)
        db.flush()

        # Record the original weekly-plan link.
        db.add(
            TaskWeeklyPlan(
                task_id=task.id,
                weekly_plan_id=plan.id,
                is_original=True,
                added_by=admin_id,
            )
        )

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

            # Save the employee's current task assignment.
            db.add(
                TaskAssignment(
                    task_id=task.id,
                    employee_id=employee_id,
                )
            )

            # Record the initial assignment in the audit history.
            db.add(
                TaskAssignmentHistory(
                    task_id=task.id,
                    employee_id=employee_id,
                    action="assigned",
                    changed_by=admin_id,
                )
            )

        db.commit()
        db.refresh(task)

    except Exception:
        db.rollback()
        raise

    return _task_to_dict(db, task)

def carry_forward_task(
    db: Session,
    task_id: int,
    weekly_plan_id: int,
    admin_id: int,
) -> dict:
    task = db.get(Task, task_id)

    if task is None:
        raise ValueError("Task not found.")

    project = db.get(Project, task.project_id)

    if project is None:
        raise ValueError("Project not found.")

    if (project.status or "").strip().lower() in INACTIVE_PROJECT_STATUSES:
        raise ValueError(
            "Cannot carry forward tasks for an inactive project."
        )

    if task.status.strip().lower() in COMPLETED_TASK_STATUSES:
        raise ValueError(
            "Completed or cancelled tasks cannot be carried forward."
        )

    plan = _validate_weekly_plan(
        db=db,
        project_id=task.project_id,
        weekly_plan_id=weekly_plan_id,
    )

    # The target week must be later than the task's due date.
    if task.due_date.date() >= plan.week_start_date:
        raise ValueError(
            "Only tasks due before the target week can be carried forward."
        )

    try:
        # Preserve the original weekly-plan history.
        original_link = db.scalar(
            select(TaskWeeklyPlan.id).where(
                TaskWeeklyPlan.task_id == task.id,
                TaskWeeklyPlan.weekly_plan_id == task.weekly_plan_id,
            )
        )

        if original_link is None:
            db.add(
                TaskWeeklyPlan(
                    task_id=task.id,
                    weekly_plan_id=task.weekly_plan_id,
                    is_original=True,
                    added_by=task.created_by,
                )
            )

        # Avoid duplicate links to the target week.
        existing_link = db.scalar(
            select(TaskWeeklyPlan.id).where(
                TaskWeeklyPlan.task_id == task.id,
                TaskWeeklyPlan.weekly_plan_id == plan.id,
            )
        )

        if existing_link is None:
            db.add(
                TaskWeeklyPlan(
                    task_id=task.id,
                    weekly_plan_id=plan.id,
                    is_original=False,
                    added_by=admin_id,
                )
            )

        db.commit()
        db.refresh(task)

    except IntegrityError as exc:
        db.rollback()
        raise ValueError(
            "The task could not be linked to the selected weekly plan."
        ) from exc

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
    weekly_plan_id: int | None = None,
) -> list[dict]:
    statement = select(Task)

    if project_id is not None:
        statement = statement.where(
            Task.project_id == project_id
        )

    if weekly_plan_id is not None:
        # Include tasks linked to this week, including carry-forwards.
        # Also include legacy tasks whose original plan link exists
        # only on the Task record.
        weekly_link_exists = (
            select(TaskWeeklyPlan.id)
            .where(
                TaskWeeklyPlan.task_id == Task.id,
                TaskWeeklyPlan.weekly_plan_id == weekly_plan_id,
            )
            .exists()
        )

        statement = statement.where(
            or_(
                Task.weekly_plan_id == weekly_plan_id,
                weekly_link_exists,
            )
        )

    statement = statement.order_by(Task.created_at.desc())

    tasks = db.scalars(statement).all()

    return [
        _task_to_dict(db, task)
        for task in tasks
    ]

def update_task(
    db: Session,
    task: Task,
    task_data: TaskUpdate,
    admin_id: int,
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

        if (project.status or "").strip().lower() in INACTIVE_PROJECT_STATUSES:
            raise ValueError("Cannot assign employees to an inactive project.")

        employee_ids = _validate_employee_assignments(
            db,
            task.project_id,
            employee_ids,
        )

    try:
        if employee_ids is not None:
            current_employee_ids = set(
                db.scalars(
                    select(TaskAssignment.employee_id).where(
                        TaskAssignment.task_id == task.id
                    )
                ).all()
            )

            requested_employee_ids = set(employee_ids)

            removed_employee_ids = current_employee_ids - requested_employee_ids
            added_employee_ids = requested_employee_ids - current_employee_ids

            # Record employees removed from the task.
            for employee_id in sorted(removed_employee_ids):
                db.add(
                    TaskAssignmentHistory(
                        task_id=task.id,
                        employee_id=employee_id,
                        action="unassigned",
                        changed_by=admin_id,
                    )
                )

            # Record employees newly assigned to the task.
            for employee_id in sorted(added_employee_ids):
                db.add(
                    TaskAssignmentHistory(
                        task_id=task.id,
                        employee_id=employee_id,
                        action="assigned",
                        changed_by=admin_id,
                    )
                )

            # Replace current assignments with the requested assignments.
            db.query(TaskAssignment).filter(
                TaskAssignment.task_id == task.id
            ).delete(synchronize_session=False)

            for employee_id in employee_ids:
                project_assignment = db.scalar(
                    select(ProjectEmployeeAssignment).where(
                        ProjectEmployeeAssignment.project_id == task.project_id,
                        ProjectEmployeeAssignment.employee_id == employee_id,
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

        for field, value in update_data.items():
            setattr(task, field, value)

        db.commit()
        db.refresh(task)

    except Exception:
        db.rollback()
        raise

    return _task_to_dict(db, task)

def get_task_assignment_history(
    db: Session,
    task_id: int,
) -> list[dict] | None:
    task = db.get(Task, task_id)

    if task is None:
        return None

    history_records = db.scalars(
        select(TaskAssignmentHistory)
        .where(TaskAssignmentHistory.task_id == task_id)
        .order_by(
            TaskAssignmentHistory.changed_at.desc(),
            TaskAssignmentHistory.id.desc(),
        )
    ).all()

    return [
        {
            "id": record.id,
            "task_id": record.task_id,
            "employee_id": record.employee_id,
            "action": record.action,
            "changed_by": record.changed_by,
            "changed_at": record.changed_at,
            "reason": record.reason,
        }
        for record in history_records
    ]