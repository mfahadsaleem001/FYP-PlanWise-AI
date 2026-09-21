from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.user import User


def get_dashboard_stats(
    db: Session,
) -> dict:
    total_users = db.scalar(
        select(func.count(User.id)).where(
            User.role == "user"
        )
    )

    total_employees = db.scalar(
        select(func.count(User.id)).where(
            User.role == "employee"
        )
    )

    return {
        "users": total_users or 0,
        "employees": total_employees or 0,
    }