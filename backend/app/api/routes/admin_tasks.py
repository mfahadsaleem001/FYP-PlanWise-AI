from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin
from app.database.connection import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import (
    TaskAssignmentHistoryResponse,
    TaskCreate,
    TaskResponse,
    TaskUpdate,
)
from app.services.task_service import (
    create_task,
    get_task_assignment_history,
    get_task_by_id,
    get_tasks,
    update_task,
)

router = APIRouter(
    prefix="/admin/tasks",
    tags=["Admin - Tasks"],
    dependencies=[Depends(require_admin)],
)


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_admin_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    try:
        return create_task(
            db=db,
            task_data=task_data,
            admin_id=admin.id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.get("", response_model=list[TaskResponse])
def list_admin_tasks(
    project_id: int | None = Query(default=None, gt=0),
    weekly_plan_id: int | None = Query(default=None, gt=0),
    db: Session = Depends(get_db),
):
    # Weekly-plan filtering will be implemented in the service.
    return get_tasks(
        db=db,
        project_id=project_id,
        weekly_plan_id=weekly_plan_id,
    )


@router.get("/{task_id}", response_model=TaskResponse)
def get_admin_task(
    task_id: int,
    db: Session = Depends(get_db),
):
    task = get_task_by_id(db=db, task_id=task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    return task

@router.patch("/{task_id}", response_model=TaskResponse)
def update_admin_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    task = db.get(Task, task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    try:
        return update_task(
            db=db,
            task=task,
            task_data=task_data,
            admin_id=admin.id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc



@router.get(
    "/{task_id}/assignment-history",
    response_model=list[TaskAssignmentHistoryResponse],
)
def get_admin_task_assignment_history(
    task_id: int,
    db: Session = Depends(get_db),
):
    history = get_task_assignment_history(
        db=db,
        task_id=task_id,
    )

    if history is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    return history