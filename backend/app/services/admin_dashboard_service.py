from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.project import Project
from app.models.user import User
from app.services.activity_log_service import get_recent_activity
from app.services.system_status_service import get_system_status


def get_dashboard_stats(db: Session) -> dict:
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

    total_projects = db.scalar(
        select(func.count(Project.id))
    )

    draft_projects = db.scalar(
        select(func.count(Project.id)).where(
            Project.status == "draft"
        )
    )

    status_statement = (
        select(
            Project.status,
            func.count(Project.id),
        )
        .group_by(Project.status)
    )

    status_rows = db.execute(
        status_statement
    ).all()

    project_status = {
        status: count
        for status, count in status_rows
    }

    return {
        "users": total_users or 0,
        "employees": total_employees or 0,
        "projects": total_projects or 0,
        "draft_projects": draft_projects or 0,
        "project_status": project_status,
    }


def get_project_type_distribution(
    db: Session,
) -> list[dict]:
    statement = (
        select(
            Project.project_type,
            func.count(Project.id).label("count"),
        )
        .group_by(Project.project_type)
        .order_by(
            func.count(Project.id).desc()
        )
    )

    rows = db.execute(
        statement
    ).all()

    return [
        {
            "project_type": project_type,
            "count": count,
        }
        for project_type, count in rows
    ]


def get_recent_projects(
    db: Session,
    limit: int = 5,
) -> list[dict]:
    statement = (
        select(Project, User)
        .join(
            User,
            Project.owner_id == User.id,
        )
        .order_by(
            Project.created_at.desc()
        )
        .limit(limit)
    )

    rows = db.execute(
        statement
    ).all()

    recent_projects = []

    for project, owner in rows:
        recent_projects.append(
            {
                "id": project.id,
                "name": project.name,
                "project_type": project.project_type,
                "status": project.status,
                "owner_id": owner.id,
                "owner_name": owner.name,
                "owner_email": owner.email,
                "created_at": project.created_at,
            }
        )

    return recent_projects


def get_employee_resource_summary(
    db: Session,
) -> dict:
    total_employees = db.scalar(
        select(func.count(Employee.id))
    )

    available_employees = db.scalar(
        select(func.count(Employee.id)).where(
            Employee.availability_status == "available"
        )
    )

    partially_available_employees = db.scalar(
        select(func.count(Employee.id)).where(
            Employee.availability_status == "partially_available"
        )
    )

    unavailable_employees = db.scalar(
        select(func.count(Employee.id)).where(
            Employee.availability_status == "unavailable"
        )
    )

    total_capacity_hours = db.scalar(
        select(
            func.coalesce(
                func.sum(Employee.capacity_hours),
                0,
            )
        )
    )

    return {
        "total": total_employees or 0,
        "available": available_employees or 0,
        "partially_available": (
            partially_available_employees or 0
        ),
        "unavailable": unavailable_employees or 0,
        "total_capacity_hours": (
            total_capacity_hours or 0
        ),
    }
    
def get_dashboard_recent_activity(
    db: Session,
    limit: int = 5,
) -> list[dict]:
    activities = get_recent_activity(
        db=db,
        limit=limit,
    )

    return [
        {
            "id": activity.id,
            "user_id": activity.user_id,
            "action": activity.action,
            "description": activity.description,
            "created_at": activity.created_at,
        }
        for activity in activities
    ]