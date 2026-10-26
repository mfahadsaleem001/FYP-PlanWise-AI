from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class ModelTrainingRun(Base):
    __tablename__ = "model_training_runs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    model_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    model_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="completed",
    )

    trained_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    dataset_rows: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    training_rows: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    testing_rows: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    training_projects: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    testing_projects: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    mae_hours: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    rmse_hours: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    r2: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    baseline_mae_hours: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    error_message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )