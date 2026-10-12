from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.api.routes.health import router as health_router
from app.api.routes.admin_dashboard import router as admin_dashboard_router
from app.api.routes.project import router as project_router
from app.api.routes.employee import router as employee_router
from app.api.routes.admin_users import router as admin_users_router
from app.api.routes.project_requests import router as project_requests_router


app = FastAPI(
    title="PlanWise AI API",
    description="Backend API for PlanWise AI",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(auth_router)
app.include_router(admin_dashboard_router)
app.include_router(project_router)
app.include_router(employee_router)
app.include_router(admin_users_router)
app.include_router(project_requests_router)


@app.get("/")
def root():
    return {
        "message": "PlanWise AI API is running"
    }