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
    / "clean_estimation_comparison.csv"
)

SHEETS = {
    "Estimates & Accuracy - Web": "Web",
    "Estimates & Accuracy - Mobile": "Mobile",
}

# Explicitly map each source column to its meaning.
COLUMN_MAP = {
    "Project": "Project",
    "User Story Key": "User Story Key",
    "Actual Effort (PH)": "Actual Effort (PH)",
    "Expert Judgement Single Point": "Expert Judgement Estimate (PH)",
    "Unnamed: 4": "Expert Judgement MRE",
    "Unnamed: 5": "Expert Judgement Within 25%",
    "Planning Poker": "Planning Poker Estimate (PH)",
    "Unnamed: 7": "Planning Poker Effort (Hours)",
    "Unnamed: 8": "Planning Poker Effort (PH)",
    "Unnamed: 9": "Planning Poker Iterations",
    "Unnamed: 10": "Planning Poker MRE",
    "Unnamed: 11": "Planning Poker Within 25%",
    "ChatGPT": "ChatGPT Estimate (PH)",
    "Unnamed: 13": "ChatGPT MRE",
    "Unnamed: 14": "ChatGPT Within 25%",
    "DeepSeek": "DeepSeek Estimate (PH)",
    "Unnamed: 16": "DeepSeek MRE",
    "Unnamed: 17": "DeepSeek Within 25%",
    "Copilot": "Copilot Estimate (PH)",
    "Unnamed: 19": "Copilot MRE",
    "Unnamed: 20": "Copilot Within 25%",
    "Gemini": "Gemini Estimate (PH)",
    "Unnamed: 22": "Gemini MRE",
    "Unnamed: 23": "Gemini Within 25%",
}

frames = []

for sheet_name, platform in SHEETS.items():
    # Read the first row as the main header.
    df = pd.read_excel(DATASET_PATH, sheet_name=sheet_name)

    # Keep only identifiable story rows.
    df = df[df["User Story Key"].notna()].copy()

    # Restore project IDs for stories with blank project cells.
    df["Project"] = df["Project"].ffill()

    # Remove summary rows, if any.
    df = df[
        ~df["Project"].isin(["Total", "Grand Total"])
    ].copy()

    # Remove the source's summary metrics only by renaming columns;
    # no existing estimates or accuracy values are recalculated here.
    df = df.rename(columns=COLUMN_MAP)

    df["Platform"] = platform

    frames.append(df)

combined = pd.concat(frames, ignore_index=True)

# Keep all source fields in the output, including Planning Poker details.
combined.to_csv(OUTPUT_PATH, index=False)

print(f"Output: {OUTPUT_PATH}")
print(f"Total stories: {len(combined)}")
print(f"Unique projects: {combined['Project'].nunique()}")

print("\nColumns in the prepared dataset:")
for column in combined.columns:
    print(f"- {column}")

print("\nSample estimation columns:")
sample_columns = [
    "Project",
    "User Story Key",
    "Platform",
    "Actual Effort (PH)",
    "Expert Judgement Estimate (PH)",
    "Planning Poker Estimate (PH)",
    "ChatGPT Estimate (PH)",
    "DeepSeek Estimate (PH)",
    "Copilot Estimate (PH)",
    "Gemini Estimate (PH)",
]

print(combined[sample_columns].head(5).to_string(index=False))