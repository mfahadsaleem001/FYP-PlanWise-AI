from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User


def create_initial_admin(db: Session) -> User | None:
    statement = select(User).where(User.role == "admin")

    existing_admin = db.scalar(statement)

    if existing_admin is not None:
        return None

    admin = User(
        name="PlanWise Admin",
        email=settings.initial_admin_email,
        password_hash=hash_password(
            settings.initial_admin_password
        ),
        role="admin",
        status="active",
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin