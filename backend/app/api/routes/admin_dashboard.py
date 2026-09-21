from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User
from app.services.admin_dashboard_service import (
    get_dashboard_stats,
    get_project_type_distribution,
    get_recent_projects,
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

    project_type_distribution = (
        get_project_type_distribution(db)
    )

    recent_projects = get_recent_projects(db)

    return {
        "stats": stats,
        "project_type_distribution": project_type_distribution,
        "recent_projects": recent_projects,
        "admin_id": current_admin.id,
    }