from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.project_request import ProjectRequest
from app.schemas.project_request import (
    ProjectRequestCreate,
    ProjectRequestReview,
)


def create_project_request(
    db: Session,
    request_data: ProjectRequestCreate,
    owner_id: int,
) -> ProjectRequest:
    project_request = ProjectRequest(
        name=request_data.name,
        description=request_data.description,
        project_type=request_data.project_type,
        owner_id=owner_id,
        status="pending",
    )

    db.add(project_request)
    db.commit()
    db.refresh(project_request)

    return project_request


def get_requests_by_owner(
    db: Session,
    owner_id: int,
) -> list[ProjectRequest]:
    statement = (
        select(ProjectRequest)
        .where(ProjectRequest.owner_id == owner_id)
        .order_by(ProjectRequest.created_at.desc())
    )

    return list(db.scalars(statement).all())


def get_all_project_requests(
    db: Session,
    status_filter: str | None = None,
) -> list[ProjectRequest]:
    statement = select(ProjectRequest)

    if status_filter is not None:
        statement = statement.where(
            ProjectRequest.status == status_filter
        )

    statement = statement.order_by(
        ProjectRequest.created_at.desc()
    )

    return list(db.scalars(statement).all())


def review_project_request(
    db: Session,
    project_request: ProjectRequest,
    review_data: ProjectRequestReview,
    reviewer_id: int,
) -> ProjectRequest:
    if project_request.status == "accepted":
        raise ValueError("Accepted requests cannot be reviewed again")

    project_request.status = review_data.status
    project_request.reviewed_by = reviewer_id
    project_request.reviewed_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(project_request)

    return project_request