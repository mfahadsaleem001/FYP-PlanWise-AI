from pathlib import Path
import pandas as pd

DATASET_PATH = (
    Path(__file__).parent
    / "datasets"
    / "user_stories_estimates.xlsx"
)

for sheet in ["Estimates & Accuracy - Web", "Estimates & Accuracy - Mobile"]:
    df = pd.read_excel(DATASET_PATH, sheet_name=sheet)

    print(f"\n{'=' * 65}")
    print(f"SHEET: {sheet}")

    # Display the first 12 rows to inspect the header and data layout.
    print("\nFirst 12 rows, first 7 columns:")
    print(df.iloc[:12, :7].to_string(index=True))

    # Show rows with missing actual effort.
    print("\nRows with missing actual effort:")
    print(
        df.loc[
            df["Actual Effort (PH)"].isna(),
            ["Project", "User Story Key", "Actual Effort (PH)"],
        ].to_string(index=True)
    )

    # Show project identifiers as stored in Excel.
    print("\nNon-empty project identifiers:")
    print(df["Project"].dropna().unique().tolist())

    print("\nNon-empty user story IDs:")
    print(df["User Story Key"].dropna().head(15).tolist())