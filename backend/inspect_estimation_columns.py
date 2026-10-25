from pathlib import Path
import pandas as pd

DATASET_PATH = (
    Path(__file__).parent
    / "datasets"
    / "user_stories_estimates.xlsx"
)

for sheet_name in [
    "Estimates & Accuracy - Web",
    "Estimates & Accuracy - Mobile",
]:
    df = pd.read_excel(
        DATASET_PATH,
        sheet_name=sheet_name,
        header=None,
    )

    print(f"\n{'=' * 90}")
    print(f"SHEET: {sheet_name}")

    print("\n=== FIRST TWO ROWS: ORIGINAL EXCEL HEADERS ===")
    print(df.iloc[:2, :].to_string(index=False, header=False))

    print("\n=== COLUMN INDEX AND HEADER VALUES ===")
    for index in range(df.shape[1]):
        first_row = df.iloc[0, index]
        second_row = df.iloc[1, index]

        print(
            f"Column {index:02}: "
            f"main={first_row!r}, "
            f"subheader={second_row!r}"
        )