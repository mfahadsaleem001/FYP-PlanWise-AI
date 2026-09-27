from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User

from app.services.admin_dashboard_service import (
    get_dashboard_stats,
    get_employee_resource_summary,
    get_project_type_distribution,
    get_recent_projects,
    get_dashboard_recent_activity,
    get_system_status,
)


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin Dashboard"],
)


@router.get("/dashboard")
def get_admin_dashboard(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    stats = get_dashboard_stats(db)

    project_type_distribution = (get_project_type_distribution(db))

    recent_projects = get_recent_projects(db)

    employee_resource_summary = (get_employee_resource_summary(db))

    recent_activity = (get_dashboard_recent_activity(db))
    
    system_status = get_system_status(db)

    return {
        "stats": stats,
        "project_type_distribution": project_type_distribution,
        "recent_projects": recent_projects,
        "employee_resource_summary": employee_resource_summary,
        "recent_activity": recent_activity,
        "admin_id": current_admin.id,
        "system_status": system_status,
    }