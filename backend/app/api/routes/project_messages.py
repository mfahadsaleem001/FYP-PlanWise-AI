
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.connection import get_db
from app.models.project_message import ProjectMessage
from app.models.project_request import ProjectRequest
from app.models.user import User
from app.schemas.project_message import (
    ProjectMessageCreate,
    ProjectMessageResponse,
)

router = APIRouter(
    prefix="/api/project-requests",
    tags=["Project Messages"],
)


def authorize_conversation(
    project_request: ProjectRequest,
    current_user: User,
) -> None:
    is_owner = project_request.owner_id == current_user.id
    is_admin = current_user.role == "admin"

    if not (is_owner or is_admin):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot access this conversation",
        )

@router.get(
    "/{request_id}/messages",
    response_model=list[ProjectMessageResponse],
)
def get_messages(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project_request = db.get(ProjectRequest, request_id)

    if project_request is None:
        raise HTTPException(
            status_code=404,
            detail="Project request not found",
        )

    authorize_conversation(project_request, current_user)

    messages = (
        db.query(ProjectMessage, User)
        .join(User, ProjectMessage.sender_id == User.id)
        .filter(ProjectMessage.project_request_id == request_id)
        .order_by(
            ProjectMessage.created_at.asc(),
            ProjectMessage.id.asc(),
        )
        .all()
    )

    return [
        ProjectMessageResponse(
            id=message.id,
            project_request_id=message.project_request_id,
            sender_id=message.sender_id,
            sender_name=sender.name,
            sender_role=sender.role,
            message=message.message,
            created_at=message.created_at,
        )
        for message, sender in messages
    ]


@router.post(
    "/{request_id}/messages",
    response_model=ProjectMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def send_message(
    request_id: int,
    message_data: ProjectMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project_request = db.get(ProjectRequest, request_id)

    if project_request is None:
        raise HTTPException(
            status_code=404,
            detail="Project request not found",
        )

    authorize_conversation(project_request, current_user)

    message_text = message_data.message.strip()

    if not message_text:
        raise HTTPException(
            status_code=422,
            detail="Message cannot be empty",
        )

    new_message = ProjectMessage(
        project_request_id=request_id,
        sender_id=current_user.id,
        message=message_text,
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return ProjectMessageResponse(
        id=new_message.id,
        project_request_id=new_message.project_request_id,
        sender_id=current_user.id,
        sender_name=current_user.name,
        sender_role=current_user.role,
        message=new_message.message,
        created_at=new_message.created_at,
    )