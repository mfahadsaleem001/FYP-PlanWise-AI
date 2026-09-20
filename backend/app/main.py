from fastapi import FastAPI

from app.api.routes.auth import router as auth_router
from app.api.routes.health import router as health_router


app = FastAPI(
    title="PlanWise AI API",
    description="Backend API for PlanWise AI",
    version="1.0.0",
)


app.include_router(health_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "PlanWise AI API is running"
    }