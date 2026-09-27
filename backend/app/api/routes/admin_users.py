from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User
from app.schemas.admin_user import (
    AdminUserCreate,
    AdminUserResponse,
)
from app.services.user_service import (
    create_user,
    get_user_by_email,
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