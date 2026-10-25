from pathlib import Path
import pandas as pd

DATASET_PATH = (
    Path(__file__).parent
    / "datasets"
    / "clean_user_story_effort.csv"
)

df = pd.read_csv(DATASET_PATH)

print("\n=== DATASET OVERVIEW ===")
print(f"Total stories: {len(df)}")
print(f"Unique projects: {df['Project'].nunique()}")

print("\n=== ACTUAL EFFORT STATISTICS (PERSON-HOURS) ===")
print(
    df["Actual Effort (PH)"]
    .describe()
    .round(2)
    .to_string()
)

print("\n=== EFFORT BY PLATFORM ===")
print(
    df.groupby("Platform")["Actual Effort (PH)"]
    .agg(["count", "mean", "median", "min", "max", "std"])
    .round(2)
    .to_string()
)

print("\n=== TOTAL ACTUAL EFFORT BY PROJECT ===")
project_effort = (
    df.groupby(["Platform", "Project"])["Actual Effort (PH)"]
    .agg(["count", "sum", "mean", "median", "max"])
    .round(2)
)

print(project_effort.to_string())

print("\n=== HIGHEST-EFFORT STORIES ===")
print(
    df.nlargest(10, "Actual Effort (PH)")
    .to_string(index=False)
)