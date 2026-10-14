from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectMessageCreate(BaseModel):
    message: str = Field(min_length=1, max_length=5000)


class ProjectMessageResponse(BaseModel):
    id: int
    project_request_id: int
    sender_id: int
    sender_name: str
    sender_role: str
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)