from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.user import User


def create_employee(
    db: Session,
    *,
    name: str,
    email: str,
    phone: str | None = None,
    job_title: str,
    experience: str | None = None,
    availability_status: str = "available",
    skills: list[str] | None = None,
    capacity_hours: int = 40,
    location: str | None = None,
) -> Employee:
    user = User(
        name=name,
        email=email,
        password_hash=None,
        role="employee",
        status="pending_setup",
    )

    employee = Employee(
        user_id=0,
        job_title=job_title,
        phone=phone,
        experience=experience,
        skills=skills or [],
        availability_status=availability_status,
        capacity_hours=capacity_hours,
        location=location,
    )

    db.add(user)
    db.flush()

    employee.user_id = user.id

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
    statement = select(Employee).order_by(
        Employee.created_at.desc()
    )

    return list(db.scalars(statement).all())


def update_employee(
    db: Session,
    employee: Employee,
    *,
    name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    job_title: str | None = None,
    experience: str | None = None,
    availability_status: str | None = None,
    skills: list[str] | None = None,
    capacity_hours: int | None = None,
    location: str | None = None,
) -> Employee:

    if name is not None:
        # User information is updated separately by the route/service
        # because Employee does not own the name field.
        pass

    if email is not None:
        # User information is updated separately.
        pass

    if phone is not None:
        employee.phone = phone

    if job_title is not None:
        employee.job_title = job_title

    if experience is not None:
        employee.experience = experience

    if availability_status is not None:
        employee.availability_status = availability_status

    if skills is not None:
        employee.skills = skills

    if capacity_hours is not None:
        employee.capacity_hours = capacity_hours

    if location is not None:
        employee.location = location

    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(
    db: Session,
    employee: Employee,
) -> None:
    db.delete(employee)
    db.commit()