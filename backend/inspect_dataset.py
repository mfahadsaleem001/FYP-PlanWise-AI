from pathlib import Path

import pandas as pd

DATASET_DIR = Path(__file__).parent / "datasets"

excel_files = list(DATASET_DIR.glob("*.xlsx"))

if not excel_files:
    raise FileNotFoundError(
        f"No .xlsx files found in: {DATASET_DIR}"
    )

if len(excel_files) > 1:
    print("Excel files found:")
    for file in excel_files:
        print(f" - {file.name}")
    raise RuntimeError(
        "Keep only the intended dataset in this folder "
        "or select the file explicitly."
    )

file_path = excel_files[0]

print(f"\nDataset: {file_path.name}")

# List all worksheets.
workbook = pd.ExcelFile(file_path)
print("\nWorksheets:")
for sheet in workbook.sheet_names:
    print(f" - {sheet}")

# Inspect each worksheet without changing the original file.
for sheet in workbook.sheet_names:
    df = pd.read_excel(file_path, sheet_name=sheet)

    print(f"\n{'=' * 60}")
    print(f"Sheet: {sheet}")
    print(f"Rows: {df.shape[0]}")
    print(f"Columns: {df.shape[1]}")

    print("\nColumn headings:")
    for index, column in enumerate(df.columns, start=1):
        print(f"{index}. {column!r}")

    print("\nData types:")
    print(df.dtypes.to_string())

    print("\nMissing values:")
    print(df.isna().sum().to_string())

    print(f"\nExact duplicate rows: {df.duplicated().sum()}")

    print("\nFirst 5 rows:")
    print(df.head().to_string(index=False))

    print("\nNumeric summary:")
    
    numeric_summary = df.select_dtypes(include="number")

    if numeric_summary.empty:
       print("No numeric-typed columns detected in this sheet.")
    else:
       print(numeric_summary.describe().to_string())
