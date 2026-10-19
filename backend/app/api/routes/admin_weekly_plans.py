
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.user import User
from app.schemas.weekly_plan import WeeklyPlanCreate, WeeklyPlanResponse
from app.services.weekly_plan_service import (
    create_weekly_plan,
    get_weekly_plans,
)

router = APIRouter(
    prefix="/admin/weekly-plans",
    tags=["Admin - Weekly Plans"],
)


@router.post(
    "",
    response_model=WeeklyPlanResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_admin_weekly_plan(
    plan_data: WeeklyPlanCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    try:
        return create_weekly_plan(
            db=db,
            plan_data=plan_data,
            admin_id=admin.id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.get(
    "",
    response_model=list[WeeklyPlanResponse],
)
def list_admin_weekly_plans(
    project_id: int = Query(gt=0),
    db: Session = Depends(get_db),
):
    try:
        return get_weekly_plans(
            db=db,
            project_id=project_id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc