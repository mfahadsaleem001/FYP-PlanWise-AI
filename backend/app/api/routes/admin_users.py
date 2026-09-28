from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User
from app.schemas.admin_user import (
    AdminUserCreate,
    AdminUserDetailResponse,
    AdminUserResponse,
)
from app.services.activity_log_service import get_user_activity_history
from app.services.user_service import (
    create_user,
    get_all_users,
    get_user_by_email,
    get_user_by_id_for_admin,
    get_user_project_count,
)


router = APIRouter(
    prefix="/api/admin/users",
    tags=["Admin Users"],
)


@router.post(
    "",
    response_model=AdminUserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee_user(
    user_data: AdminUserCreate,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db=db,
        email=user_data.email,
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    user = create_user(
        db=db,
        name=user_data.name,
        email=user_data.email,
        password=user_data.password,
        role="employee",
    )

    return user


@router.get(
    "",
    response_model=list[AdminUserResponse],
)
def get_users(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return get_all_users(db)


@router.get(
    "/{user_id}",
    response_model=AdminUserDetailResponse,
)
def get_user_details(
    user_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = get_user_by_id_for_admin(
        db=db,
        user_id=user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    project_count = get_user_project_count(
        db=db,
        user_id=user.id,
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": user.status,
        "projects": project_count,
        "last_activity": user.last_login_at,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }


@router.get(
    "/{user_id}/activities",
)
def get_user_activities(
    user_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = get_user_by_id_for_admin(
        db=db,
        user_id=user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    activities = get_user_activity_history(
        db=db,
        user_id=user.id,
    )

    return [
        {
            "id": activity.id,
            "action": activity.action,
            "description": activity.description,
            "created_at": activity.created_at,
        }
        for activity in activities
    ]