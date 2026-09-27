from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings


def check_api_status() -> dict:
    return {
        "name": "API",
        "status": "operational",
        "message": "API is running",
    }


def check_database_status(db: Session) -> dict:
    try:
        db.execute(text("SELECT 1"))

        return {
            "name": "Database",
            "status": "operational",
            "message": "Database connection is healthy",
        }

    except Exception:
        return {
            "name": "Database",
            "status": "unavailable",
            "message": "Database connection failed",
        }


def check_ml_model_status() -> dict:
    return {
        "name": "ML Model",
        "status": "not_connected",
        "message": "ML inference service is not connected yet",
    }


def check_gemini_status() -> dict:
    if settings.gemini_api_key:
        return {
            "name": "Gemini API",
            "status": "configured",
            "message": "Gemini API key is configured",
        }

    return {
        "name": "Gemini API",
        "status": "not_configured",
        "message": "Gemini API key is not configured",
    }


def get_system_status(db: Session) -> list[dict]:
    return [
        check_api_status(),
        check_database_status(db),
        check_ml_model_status(),
        check_gemini_status(),
    ]