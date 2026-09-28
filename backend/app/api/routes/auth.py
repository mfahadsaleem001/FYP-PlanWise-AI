from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_admin
from app.core.security import create_access_token, verify_password
from app.database.connection import get_db
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from app.services.activity_log_service import create_activity_log
from app.services.user_service import create_user, get_user_by_email


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(
    register_data: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        register_data.email,
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    user = create_user(
        db=db,
        name=register_data.name,
        email=register_data.email,
        password=register_data.password,
        role="user",
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": user.status,
    }


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_email(
        db,
        login_data.email,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        login_data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    user.last_login_at = datetime.utcnow()

    db.commit()
    db.refresh(user)

    create_activity_log(
        db=db,
        user_id=user.id,
        action="login",
        description="User logged in successfully",
    )

    access_token = create_access_token(
        user_id=user.id,
        role=user.role,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "status": current_user.status,
    }


@router.get("/admin-test")
def admin_test(
    current_admin: User = Depends(require_admin),
):
    return {
        "message": "Admin authorization successful",
        "admin_id": current_admin.id,
        "role": current_admin.role,
    }