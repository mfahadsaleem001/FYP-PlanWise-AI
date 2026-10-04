from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.employee import Employee
from app.models.user import User
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate,
)
from app.services.activity_log_service import create_activity_log
from app.services.employee_service import (
    create_employee,
    delete_employee,
    get_all_employees,
    get_employee_by_id,
    get_employee_by_user_id,
    update_employee,
)
from app.services.user_service import get_user_by_id


router = APIRouter(
    prefix="/api/admin/employees",
    tags=["Admin Employees"],
)


def build_employee_response(
    employee: Employee,
    user: User,
) -> EmployeeResponse:
    account_status = (
        "pending_setup"
        if user.password_hash is None
        else "active"
    )

    return EmployeeResponse(
        id=employee.id,
        user_id=user.id,
        name=user.name,
        email=user.email,
        phone=employee.phone,
        job_title=employee.job_title,
        experience=employee.experience,
        skills=employee.skills,
        availability_status=employee.availability_status,
        capacity_hours=employee.capacity_hours,
        location=employee.location,
        account_status=account_status,
        user_status=user.status,
        created_at=employee.created_at,
        updated_at=employee.updated_at,
    )


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_employee(
    employee_data: EmployeeCreate,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    existing_user = db.scalar(
        select(User).where(
            User.email == str(employee_data.email).lower()
        )
    )

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    employee = create_employee(
        db=db,
        name=employee_data.name,
        email=str(employee_data.email).lower(),
        phone=employee_data.phone,
        job_title=employee_data.job_title,
        experience=employee_data.experience,
        availability_status=employee_data.availability_status,
        skills=employee_data.skills,
        capacity_hours=employee_data.capacity_hours,
        location=employee_data.location,
    )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account could not be loaded",
        )

    create_activity_log(
        db=db,
        user_id=current_admin.id,
        action="employee_created",
        description=(
            f"Created employee {user.email} "
            f"with employee profile {employee.id}"
        ),
    )

    return build_employee_response(
        employee=employee,
        user=user,
    )


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employees = get_all_employees(db)

    responses = []

    for employee in employees:
        user = get_user_by_id(
            db=db,
            user_id=employee.user_id,
        )

        if user is None:
            continue

        responses.append(
            build_employee_response(
                employee=employee,
                user=user,
            )
        )

    return responses


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account not found",
        )

    return build_employee_response(
        employee=employee,
        user=user,
    )


@router.patch(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def update_existing_employee(
    employee_id: int,
    employee_data: EmployeeUpdate,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    user = get_user_by_id(
        db=db,
        user_id=employee.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee user account not found",
        )

    if employee_data.email is not None:
        normalized_email = str(
            employee_data.email
        ).lower()

        if normalized_email != user.email:
            existing_user = db.scalar(
                select(User).where(
                    User.email == normalized_email,
                    User.id != user.id,
                )
            )

            if existing_user is not None:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A user with this email already exists",
                )

            user.email = normalized_email

    if employee_data.name is not None:
        user.name = employee_data.name

    updated_employee = update_employee(
        db=db,
        employee=employee,
        phone=employee_data.phone,
        job_title=employee_data.job_title,
        experience=employee_data.experience,
        availability_status=employee_data.availability_status,
        skills=employee_data.skills,
        capacity_hours=employee_data.capacity_hours,
        location=employee_data.location,
    )

    db.commit()
    db.refresh(user)

    return build_employee_response(
        employee=updated_employee,
        user=user,
    )


@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_existing_employee(
    employee_id: int,
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee = get_employee_by_id(
        db=db,
        employee_id=employee_id,
    )

    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found",
        )

    delete_employee(
        db=db,
        employee=employee,
    )

    return None