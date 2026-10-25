from pathlib import Path
import pandas as pd

DATASET_PATH = (
    Path(__file__).parent
    / "datasets"
    / "user_stories_estimates.xlsx"
)

OUTPUT_PATH = (
    Path(__file__).parent
    / "datasets"
    / "clean_user_story_effort.csv"
)

sheets = {
    "Estimates & Accuracy - Web": "Web",
    "Estimates & Accuracy - Mobile": "Mobile",
}

cleaned_frames = []

for sheet_name, platform in sheets.items():
    df = pd.read_excel(DATASET_PATH, sheet_name=sheet_name)

    # Keep only identifiable user-story records, not summary rows.
    df = df[
        df["User Story Key"].notna()
        & df["Project"].ne("Total")
        & df["Project"].ne("Grand Total")
    ].copy()

    # Project names are shown only on the first story of each group.
    df["Project"] = df["Project"].ffill()

    # Exclude rows without a usable actual-effort target.
    df["Actual Effort (PH)"] = pd.to_numeric(
        df["Actual Effort (PH)"],
        errors="coerce",
    )
    df = df.dropna(subset=["Project", "Actual Effort (PH)"])

    # Keep only valid, positive effort values.
    df = df[df["Actual Effort (PH)"] > 0].copy()

    cleaned_frames.append(
        df[["Project", "User Story Key", "Actual Effort (PH)"]]
        .assign(Platform=platform)
    )

cleaned = pd.concat(cleaned_frames, ignore_index=True)

cleaned = cleaned[
    ["Project", "User Story Key", "Platform", "Actual Effort (PH)"]
]

cleaned.to_csv(OUTPUT_PATH, index=False)

print(f"Output: {OUTPUT_PATH}")
print(f"Clean user stories: {len(cleaned)}")
print(f"Unique projects: {cleaned['Project'].nunique()}")
print("\nStories per platform:")
print(cleaned["Platform"].value_counts().to_string())
print("\nMissing values:")
print(cleaned.isna().sum().to_string())
print("\nSample records:")
print(cleaned.head(10).to_string(index=False))