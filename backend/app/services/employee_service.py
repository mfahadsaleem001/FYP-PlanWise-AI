from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee import Employee


def create_employee(
    db: Session,
    user_id: int,
    job_title: str,
    availability_status: str = "available",
    capacity_hours: int = 40,
) -> Employee:
    employee = Employee(
        user_id=user_id,
        job_title=job_title,
        availability_status=availability_status,
        capacity_hours=capacity_hours,
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def get_employee_by_id(
    db: Session,
    employee_id: int,
) -> Employee | None:
    statement = select(Employee).where(
        Employee.id == employee_id
    )

    return db.scalar(statement)


def get_employee_by_user_id(
    db: Session,
    user_id: int,
) -> Employee | None:
    statement = select(Employee).where(
        Employee.user_id == user_id
    )

    return db.scalar(statement)


def get_all_employees(
    db: Session,
) -> list[Employee]:
    statement = (
        select(Employee)
        .order_by(Employee.created_at.desc())
    )

    return list(db.scalars(statement).all())


def update_employee(
    db: Session,
    employee: Employee,
    job_title: str | None = None,
    availability_status: str | None = None,
    capacity_hours: int | None = None,
) -> Employee:

    if job_title is not None:
        employee.job_title = job_title

    if availability_status is not None:
        employee.availability_status = availability_status

    if capacity_hours is not None:
        employee.capacity_hours = capacity_hours

    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(
    db: Session,
    employee: Employee,
) -> None:
    db.delete(employee)
    db.commit()