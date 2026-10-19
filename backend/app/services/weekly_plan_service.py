
from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.weekly_plan import WeeklyPlan
from app.schemas.weekly_plan import WeeklyPlanCreate


INACTIVE_PROJECT_STATUSES = {
    "completed",
    "cancelled",
    "canceled",
    "archived",
    "deleted",
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
        db.commit()
        db.refresh(plan)

    except IntegrityError as exc:
        db.rollback()
        raise ValueError(
            "A weekly plan already exists for this project and week."
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