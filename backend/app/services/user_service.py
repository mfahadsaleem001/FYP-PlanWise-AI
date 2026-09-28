from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.models.project import Project


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:
    statement = select(User).where(
        User.email == email
    )

    return db.scalar(statement)


def get_user_by_id(
    db: Session,
    user_id: int,
) -> User | None:
    statement = select(User).where(
        User.id == user_id
    )

    return db.scalar(statement)

def get_user_by_id_for_admin(
    db: Session,
    user_id: int,
) -> User | None:
    statement = select(User).where(
        User.id == user_id,
        User.role == "user",
    )
    return db.scalar(statement)


def create_user(
    db: Session,
    name: str,
    email: str,
    password: str,
    role: str = "user",
) -> User:
    password_hash = hash_password(password)

    user = User(
        name=name,
        email=email,
        password_hash=password_hash,
        role=role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def get_all_users(db: Session) -> list[User]:
    statement = (
        select(User)
        .where(User.role == "user")
        .order_by(User.created_at.desc())
    )
    return list(db.scalars(statement).all())

def get_user_project_count(
    db: Session,
    user_id: int,
) -> int:
    statement = select(
        func.count(Project.id)
    ).where(
        Project.owner_id == user_id
    )

    return db.scalar(statement) or 0