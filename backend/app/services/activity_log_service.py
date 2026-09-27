from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog


def create_activity_log(
    db: Session,
    user_id: int,
    action: str,
    description: str,
) -> ActivityLog:
    activity = ActivityLog(
        user_id=user_id,
        action=action,
        description=description,
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_recent_activity(
    db: Session,
    limit: int = 5,
) -> list[ActivityLog]:
    statement = (
        select(ActivityLog)
        .order_by(ActivityLog.created_at.desc())
        .limit(limit)
    )

    return list(db.scalars(statement).all())