from pathlib import Path

import joblib
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.model_training_run import ModelTrainingRun
from app.models.user import User


router = APIRouter(
    prefix="/api/admin/models",
    tags=["Admin Model Monitoring"],
)

MODEL_PATH = (
    Path(__file__).resolve().parents[3]
    / "models"
    / "effort_baseline.joblib"
)


@router.get("/monitoring")
def get_model_monitoring(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    if not MODEL_PATH.exists():
        raise HTTPException(
            status_code=503,
            detail="Trained model artifact was not found.",
        )

    try:
        artifact = joblib.load(MODEL_PATH)
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Unable to load the trained model artifact.",
        )

    metrics = artifact.get("evaluation_metrics")

    if not metrics:
        raise HTTPException(
            status_code=503,
            detail="Model evaluation metrics are unavailable.",
        )

    return {
        "model_id": "effort_baseline",
        "model_name": "Project Effort Estimation",
        "model_type": artifact.get("model_type"),
        "target_unit": artifact.get("target_unit"),
        "max_text_length": artifact.get("max_text_length"),
        "random_state": artifact.get("random_state"),
        "trained_at": artifact.get("trained_at"),
        "status": "available",
        "evaluation_metrics": metrics,
    }


@router.get("/monitoring/history")
def get_model_training_history(
    current_admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
    limit: int = Query(default=20, ge=1, le=100),
):
    runs = (
        db.query(ModelTrainingRun)
        .order_by(ModelTrainingRun.trained_at.desc())
        .limit(limit)
        .all()
    )

    return {
        "total_returned": len(runs),
        "items": [
            {
                "id": run.id,
                "model_name": run.model_name,
                "model_type": run.model_type,
                "status": run.status,
                "trained_at": (
                    run.trained_at.isoformat()
                    if run.trained_at
                    else None
                ),
                "dataset_rows": run.dataset_rows,
                "training_rows": run.training_rows,
                "testing_rows": run.testing_rows,
                "training_projects": run.training_projects,
                "testing_projects": run.testing_projects,
                "evaluation_metrics": {
                    "mae_hours": run.mae_hours,
                    "rmse_hours": run.rmse_hours,
                    "r2": run.r2,
                    "baseline_mae_hours": run.baseline_mae_hours,
                },
                "error_message": run.error_message,
            }
            for run in runs
        ],
    }