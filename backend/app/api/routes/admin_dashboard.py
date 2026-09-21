from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User
from app.services.admin_dashboard_service import get_dashboard_stats


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

    return {
        "stats": stats,
        "admin_id": current_admin.id,
    }