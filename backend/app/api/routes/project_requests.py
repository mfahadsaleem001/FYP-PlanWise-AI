from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_admin
from app.database.connection import get_db
from app.models.project_request import ProjectRequest
from app.models.user import User
from app.schemas.project_request import (
    ProjectRequestCreate,
    ProjectRequestResponse,
    ProjectRequestReview,
)
from app.services.project_request_service import (
    create_project_request,
    get_all_project_requests,
    get_requests_by_owner,
    review_project_request,
)


router = APIRouter(
    prefix="/api/project-requests",
    tags=["Project Requests"],
)


@router.post(
    "",
    response_model=ProjectRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_project_request(
    request_data: ProjectRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_project_request(
        db=db,
        request_data=request_data,
        owner_id=current_user.id,
    )


@router.get(
    "/my",
    response_model=list[ProjectRequestResponse],
)
def read_my_project_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_requests_by_owner(
        db=db,
        owner_id=current_user.id,
    )


@router.get(
    "",
    response_model=list[ProjectRequestResponse],
)
def read_all_project_requests(
    request_status: Literal["pending", "accepted", "rejected"] | None = Query(
        default=None,
        alias="status",
    ),
    db: Session = Depends(get_db),
    reviewer: User = Depends(require_admin),
):
    return get_all_project_requests(
        db=db,
        status_filter=request_status,
    )


@router.patch(
    "/{request_id}/review",
    response_model=ProjectRequestResponse,
)
def review_request(
    request_id: int,
    review_data: ProjectRequestReview,
    db: Session = Depends(get_db),
    reviewer: User = Depends(require_admin),
):
    project_request = db.get(ProjectRequest, request_id)

    if project_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project request not found",
        )

    try:
        return review_project_request(
            db=db,
            project_request=project_request,
            review_data=review_data,
            reviewer_id=reviewer.id,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc