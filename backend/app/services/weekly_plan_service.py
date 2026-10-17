from datetime import datetime, time, timedelta

from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task
from app.models.task_weekly_plan import TaskWeeklyPlan
from app.models.weekly_plan import WeeklyPlan
from app.schemas.task import WeeklyPlanCreate


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


def _weekly_plan_to_dict(plan: WeeklyPlan) -> dict:
    return {
        "id": plan.id,
        "project_id": plan.project_id,
        "week_start_date": plan.week_start_date,
        "week_end_date": plan.week_end_date,
        "created_by": plan.created_by,
        "created_at": plan.created_at,
        "updated_at": plan.updated_at,
    }


def _ensure_task_weekly_link(
    db: Session,
    task: Task,
    weekly_plan_id: int,
    admin_id: int,
    is_original: bool,
) -> None:
    existing_link = db.scalar(
        select(TaskWeeklyPlan.id).where(
            TaskWeeklyPlan.task_id == task.id,
            TaskWeeklyPlan.weekly_plan_id == weekly_plan_id,
        )
    )

    if existing_link is None:
        db.add(
            TaskWeeklyPlan(
                task_id=task.id,
                weekly_plan_id=weekly_plan_id,
                is_original=is_original,
                added_by=admin_id,
            )
        )


def create_weekly_plan(
    db: Session,
    plan_data: WeeklyPlanCreate,
    admin_id: int,
) -> dict:
    project = db.get(Project, plan_data.project_id)

    if project is None:
        raise ValueError("Project not found.")

    if (project.status or "").strip().lower() in INACTIVE_PROJECT_STATUSES:
        raise ValueError(
            "Cannot create weekly plans for an inactive project."
        )

    week_start = plan_data.week_start_date
    week_end = plan_data.week_end_date

    if week_start.weekday() != 0:
        raise ValueError("The week start date must be a Monday.")

    if week_end != week_start + timedelta(days=6):
        raise ValueError(
            "The week end date must be the Sunday of the selected week."
        )

    existing_plan = db.scalar(
        select(WeeklyPlan).where(
            WeeklyPlan.project_id == project.id,
            WeeklyPlan.week_start_date == week_start,
        )
    )

    if existing_plan is not None:
        raise ValueError(
            "A weekly plan already exists for this project and week."
        )

    plan = WeeklyPlan(
        project_id=project.id,
        week_start_date=week_start,
        week_end_date=week_end,
        created_by=admin_id,
    )

    try:
        db.add(plan)
        db.flush()

        # Find unfinished tasks that were due before this week begins.
        week_start_datetime = datetime.combine(week_start, time.min)

        overdue_tasks = db.scalars(
            select(Task).where(
                Task.project_id == project.id,
                Task.due_date < week_start_datetime,
                Task.weekly_plan_id.is_not(None),
                func.lower(Task.status).not_in(
                    COMPLETED_TASK_STATUSES
                ),
            )
        ).all()

        for task in overdue_tasks:
            # Preserve the task's original weekly-plan history.
            _ensure_task_weekly_link(
                db=db,
                task=task,
                weekly_plan_id=task.weekly_plan_id,
                admin_id=admin_id,
                is_original=True,
            )

            # Link the existing task to the newly created week.
            # The task itself is not duplicated.
            _ensure_task_weekly_link(
                db=db,
                task=task,
                weekly_plan_id=plan.id,
                admin_id=admin_id,
                is_original=False,
            )

        db.commit()
        db.refresh(plan)

    except IntegrityError as exc:
        db.rollback()
        raise ValueError(
            "A weekly plan or task-week link already exists."
        ) from exc

    except Exception:
        db.rollback()
        raise

    return _weekly_plan_to_dict(plan)


def get_weekly_plans(
    db: Session,
    project_id: int,
) -> list[dict]:
    project = db.get(Project, project_id)

    if project is None:
        raise ValueError("Project not found.")

    plans = db.scalars(
        select(WeeklyPlan)
        .where(WeeklyPlan.project_id == project_id)
        .order_by(WeeklyPlan.week_start_date.desc())
    ).all()

    return [
        _weekly_plan_to_dict(plan)
        for plan in plans
    ]


def get_weekly_plan_by_id(
    db: Session,
    weekly_plan_id: int,
) -> dict | None:
    plan = db.get(WeeklyPlan, weekly_plan_id)

    if plan is None:
        return None

    return _weekly_plan_to_dict(plan)