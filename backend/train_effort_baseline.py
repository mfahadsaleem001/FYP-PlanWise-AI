import sqlite3
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import TransformedTargetRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import GroupShuffleSplit
from sklearn.pipeline import Pipeline

from app.database.connection import SessionLocal
from app.models.model_training_run import ModelTrainingRun

# Project paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATABASE_PATH = (
    Path(__file__).resolve().parent
    / "datasets"
    / "josse_original"
    / "josse"
    / "JOSSE_18092020.sqlite3"
)

MODEL_PATH = (
    Path(__file__).resolve().parent
    / "models"
    / "effort_baseline.joblib"
)

MAX_TEXT_LENGTH = 20_000
RANDOM_STATE = 42

def load_dataset() -> pd.DataFrame:
    """Load issue descriptions and actual effort from SQLite."""

    with sqlite3.connect(
        f"file:{DATABASE_PATH.resolve().as_posix()}?mode=ro",
        uri=True,
    ) as connection:
        df = pd.read_sql_query(
            """
            SELECT id, corpus, actual_effort
            FROM "case"
            WHERE actual_effort > 0
            """,
            connection,
        )

    df = df.dropna(subset=["id", "corpus", "actual_effort"])
    df["corpus"] = df["corpus"].astype(str).str.strip()
    df = df[df["corpus"] != ""]

    # Remove exact duplicate descriptions.
    df = df.drop_duplicates(subset=["corpus"]).copy()

    # Limit unusually long issue descriptions.
    df["corpus"] = df["corpus"].str.slice(0, MAX_TEXT_LENGTH)

    # Stored effort is in seconds; convert to hours.
    df["effort_hours"] = df["actual_effort"] / 3600

    # Group issues by project prefix.
    df["project_group"] = (
        df["id"].astype(str).str.split("-", n=1).str[0]
    )

    return df.reset_index(drop=True)


def save_training_history(
    df: pd.DataFrame,
    groups: pd.Series,
    train_indices: np.ndarray,
    test_indices: np.ndarray,
    mae: float,
    rmse: float,
    r2: float,
    baseline_mae: float,
) -> int:
    """Save the completed training run to PostgreSQL."""

    training_run = ModelTrainingRun(
        model_name="Project Effort Estimation",
        model_type="TF-IDF + Ridge Regression",
        status="completed",
        trained_at=datetime.now(timezone.utc),
        dataset_rows=len(df),
        training_rows=len(train_indices),
        testing_rows=len(test_indices),
        training_projects=int(
            groups.iloc[train_indices].nunique()
        ),
        testing_projects=int(
            groups.iloc[test_indices].nunique()
        ),
        mae_hours=float(mae),
        rmse_hours=float(rmse),
        r2=float(r2),
        baseline_mae_hours=float(baseline_mae),
    )

    with SessionLocal() as db:
        try:
            db.add(training_run)
            db.commit()
            db.refresh(training_run)
            return training_run.id
        except Exception:
            db.rollback()
            raise


def main() -> None:
    df = load_dataset()

    X = df["corpus"]
    y = df["effort_hours"]
    groups = df["project_group"]

    # Keep projects separate between training and testing.
    splitter = GroupShuffleSplit(
        n_splits=1,
        test_size=0.20,
        random_state=RANDOM_STATE,
    )

    train_indices, test_indices = next(
        splitter.split(X, y, groups=groups)
    )

    X_train = X.iloc[train_indices]
    X_test = X.iloc[test_indices]

    y_train = y.iloc[train_indices]
    y_test = y.iloc[test_indices]

    model = TransformedTargetRegressor(
        regressor=Pipeline(
            [
                (
                    "tfidf",
                    TfidfVectorizer(
                        max_features=50_000,
                        ngram_range=(1, 2),
                        min_df=2,
                        max_df=0.98,
                        stop_words="english",
                        sublinear_tf=True,
                    ),
                ),
                ("ridge", Ridge(alpha=1.0)),
            ]
        ),
        func=np.log1p,
        inverse_func=np.expm1,
    )

    print("Training baseline model...")
    model.fit(X_train, y_train)

    # Effort cannot be negative.
    predictions = np.maximum(model.predict(X_test), 0)

    baseline_predictions = np.full(
        len(y_test),
        y_train.median(),
    )

    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    r2 = r2_score(y_test, predictions)

    baseline_mae = mean_absolute_error(
        y_test,
        baseline_predictions,
    )

    trained_at = datetime.now(timezone.utc)

    # Save the trained model and its evaluation metadata.
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)

    joblib.dump(
        {
            "model": model,
            "target_unit": "hours",
            "max_text_length": MAX_TEXT_LENGTH,
            "model_type": "TF-IDF + Ridge Regression",
            "random_state": RANDOM_STATE,
            "trained_at": trained_at.isoformat(),
            "evaluation_metrics": {
                "mae_hours": float(mae),
                "rmse_hours": float(rmse),
                "r2": float(r2),
                "baseline_mae_hours": float(baseline_mae),
            },
        },
        MODEL_PATH,
    )

    # Persist the completed training run in PostgreSQL.
    run_id = save_training_history(
        df=df,
        groups=groups,
        train_indices=train_indices,
        test_indices=test_indices,
        mae=mae,
        rmse=rmse,
        r2=r2,
        baseline_mae=baseline_mae,
    )

    print("\n=== BASELINE TRAINING RESULTS ===")
    print(f"Dataset rows after deduplication: {len(df)}")
    print(f"Training rows: {len(train_indices)}")
    print(f"Testing rows: {len(test_indices)}")
    print(
        "Projects in training: "
        f"{groups.iloc[train_indices].nunique()}"
    )
    print(
        "Projects in testing: "
        f"{groups.iloc[test_indices].nunique()}"
    )
    print(f"MAE: {mae:.2f} hours")
    print(f"RMSE: {rmse:.2f} hours")
    print(f"R²: {r2:.4f}")
    print(f"Median-baseline MAE: {baseline_mae:.2f} hours")
    print(f"Training history saved. Run ID: {run_id}")
    print(f"Saved model: {MODEL_PATH}")


if __name__ == "__main__":
    main()