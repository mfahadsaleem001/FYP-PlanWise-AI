from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate,
)

from app.services.employee_service import (
    create_employee,
    delete_employee,
    get_all_employees,
    get_employee_by_id,
    get_employee_by_user_id,
    update_employee,
)

from app.services.user_service import get_user_by_id

from app.services.activity_log_service import (
    create_activity_log,
)


router = APIRouter(
    prefix="/api/admin/employees",
    tags=["Admin Employees"],
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
    user = get_user_by_id(
        db=db,
        user_id=employee_data.user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.role != "employee":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected user is not an employee",
        )

    existing_employee = get_employee_by_user_id(
        db=db,
        user_id=employee_data.user_id,
    )

    if existing_employee is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee profile already exists for this user",
        )

    employee = create_employee(
        db=db,
        user_id=employee_data.user_id,
        job_title=employee_data.job_title,
        availability_status=employee_data.availability_status,
        capacity_hours=employee_data.capacity_hours,
    )

    create_activity_log(
        db=db,
        user_id=current_admin.id,
        action="employee_created",
        description=f"Created employee profile for user {employee.user_id}",
    )

    return employee


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return get_all_employees(db)


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

    return employee


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

    updated_employee = update_employee(
        db=db,
        employee=employee,
        job_title=employee_data.job_title,
        availability_status=employee_data.availability_status,
        capacity_hours=employee_data.capacity_hours,
    )

    return updated_employee


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