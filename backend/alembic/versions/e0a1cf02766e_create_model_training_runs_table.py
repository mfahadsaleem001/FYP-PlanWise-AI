"""create model training runs table

Revision ID: e0a1cf02766e
Revises: 6af0ea38272d
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "e0a1cf02766e"
down_revision: Union[str, Sequence[str], None] = "6af0ea38272d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "model_training_runs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("model_name", sa.String(length=150), nullable=False),
        sa.Column("model_type", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("trained_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("dataset_rows", sa.Integer(), nullable=True),
        sa.Column("training_rows", sa.Integer(), nullable=True),
        sa.Column("testing_rows", sa.Integer(), nullable=True),
        sa.Column("training_projects", sa.Integer(), nullable=True),
        sa.Column("testing_projects", sa.Integer(), nullable=True),
        sa.Column("mae_hours", sa.Float(), nullable=True),
        sa.Column("rmse_hours", sa.Float(), nullable=True),
        sa.Column("r2", sa.Float(), nullable=True),
        sa.Column("baseline_mae_hours", sa.Float(), nullable=True),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_model_training_runs_id",
        "model_training_runs",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_model_training_runs_id",
        table_name="model_training_runs",
    )
    op.drop_table("model_training_runs")