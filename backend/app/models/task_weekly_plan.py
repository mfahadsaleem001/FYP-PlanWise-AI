from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class TaskWeeklyPlan(Base):
    __tablename__ = "task_weekly_plans"

    __table_args__ = (
        UniqueConstraint(
            "task_id",
            "weekly_plan_id",
            name="uq_task_weekly_plan",
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    weekly_plan_id: Mapped[int] = mapped_column(
        ForeignKey("weekly_plans.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    is_original: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    added_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    assigned_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )