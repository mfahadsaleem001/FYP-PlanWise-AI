from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class WeeklyPlanCreate(BaseModel):
    project_id: int = Field(gt=0)
    week_start_date: date
    week_end_date: date

    @model_validator(mode="after")
    def validate_week_dates(self):
        if self.week_start_date.weekday() != 0:
            raise ValueError("The week start date must be a Monday.")

        if (self.week_end_date - self.week_start_date).days != 6:
            raise ValueError(
                "The week end date must be the Sunday of the selected week."
            )

        return self


class WeeklyPlanResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    week_start_date: date
    week_end_date: date
    created_by: int
    created_at: datetime
    updated_at: datetime
