# PlanWise AI
### AI-Based Software Project Estimation, Risk Analysis, and Planning System

PlanWise AI is an AI-powered software project planning platform designed to help software teams make more informed decisions during project estimation and planning. It combines machine learning, natural language processing, and AI-assisted analysis to support effort estimation, project risk assessment, resource planning, and project management.

The platform aims to transform software project requirements into structured planning insights through a data-driven approach, helping teams identify potential challenges, understand estimation uncertainty, and make better project decisions.

> **Project Status:** Under Development

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Key Features](#key-features)
- [AI and Machine Learning Approach](#ai-and-machine-learning-approach)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Model Development and Evaluation](#model-development-and-evaluation)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

Software project estimation is challenging because requirements may be incomplete, project complexity varies, and historical data does not always translate directly into reliable predictions.

PlanWise AI addresses this challenge by combining historical software-task data, machine learning, and AI-assisted reasoning in a unified planning workflow.

The system is designed to support:

- Data-driven software effort estimation.
- Project complexity analysis.
- Risk identification and mitigation recommendations.
- Resource and team planning.
- Milestone and financial planning.
- Project progress tracking and reporting.
- Estimation confidence and uncertainty analysis.

The goal is to provide transparent, useful planning support rather than relying entirely on manually entered estimates or AI-generated guesses.

## Problem Statement

Traditional project estimation often relies on expert judgment, spreadsheets, and assumptions that may be difficult to validate. These methods can produce inconsistent estimates, overlook risks, and make it harder to allocate resources effectively.

PlanWise AI explores how historical software engineering data and machine learning can improve the estimation process while using AI-assisted analysis to explain potential risks and support planning decisions.

## Objectives

1. Develop a machine-learning-based software effort estimation component.
2. Process project requirements and descriptions into useful model inputs.
3. Evaluate model performance using appropriate metrics and unseen test data.
4. Provide AI-assisted risk analysis and mitigation recommendations.
5. Support resource allocation and milestone planning.
6. Present project estimates and insights through an intuitive interface.
7. Maintain clear separation between predictive models and AI-generated explanations.
8. Build a modular architecture that can support future model improvements.

## Key Features

### 1. Software Project Estimation

Users provide essential project information, including project name, description, and project type.

The system is designed to generate estimation insights such as:

- Estimated development effort.
- Estimated project duration.
- Suggested team size.
- Project complexity.
- Estimation confidence and uncertainty.

The availability and reliability of each output depend on the implemented models, supporting data, and validated planning assumptions.

### 2. AI-Assisted Risk Analysis

The system aims to identify potential project risks and provide mitigation suggestions.

Risk analysis may cover:

- Technical complexity.
- Requirement ambiguity.
- Resource constraints.
- Schedule-related challenges.
- Potential implementation difficulties.

Risk levels and recommendations are intended to support decision-making, not replace professional judgment.

### 3. Intelligent Recommendations

PlanWise AI is designed to provide contextual planning recommendations, including possible implementation approaches, technology considerations, and project management suggestions.

### 4. Resource Planning

Resource planning is intended to compare required skills and roles with available team resources, helping identify potential staffing gaps.

### 5. Milestone and Financial Planning

The planned functionality includes milestone breakdowns, phase-level planning, financial estimates, and visual summaries of project costs.

### 6. Project Management

The platform is designed to provide project dashboards, project records, progress information, and reporting functionality in one place.

### 7. Reports and Notifications

Reporting functionality is intended to help users review and communicate project estimation results and planning insights.

## AI and Machine Learning Approach

PlanWise AI separates numerical prediction from AI-assisted reasoning.

### Machine Learning

The machine-learning component uses historical software engineering data to investigate the relationship between task descriptions and actual development effort.

The development workflow includes:

1. Dataset exploration and quality checks.
2. Data cleaning and preprocessing.
3. Feature extraction from text.
4. Training and test data separation.
5. Regression model training.
6. Evaluation using appropriate metrics.
7. Model serialization and loading for inference.
8. Iterative improvement based on evaluation results.

The current baseline experiment uses **TF-IDF and Ridge Regression** with the JOSSE software issue dataset.

TF-IDF converts text into numerical features, while Ridge Regression learns a relationship between those features and recorded effort.

The current model is a task-level baseline. It has not yet been established as a reliable predictor of complete software project effort.

### Model Evaluation

Model performance is evaluated using metrics such as:

- **Mean Absolute Error (MAE):** Average absolute difference between actual and predicted effort.
- **Root Mean Squared Error (RMSE):** Error metric that penalizes larger prediction errors more heavily.
- **R² Score:** Measures predictive performance relative to a mean-based baseline.

Baseline comparisons are important because a trained model is not necessarily better than a simple prediction strategy.

### AI-Assisted Analysis

A generative AI service, such as the Gemini API, is intended to support explanatory tasks, including:

- Explaining estimation results.
- Summarizing potential project risks.
- Suggesting mitigation strategies.
- Generating contextual planning recommendations.

Generative AI is not intended to substitute unsupported numerical predictions for the outputs of the evaluated estimation model.

### Current Limitations

The initial model predicts effort for individual software issues rather than complete project requirements. Converting task-level predictions into reliable project-level effort, duration, cost, and team-size estimates requires additional validation and explicitly documented assumptions.

Model quality, confidence calibration, and generalization to unfamiliar projects remain areas for further development.

## System Architecture

The planned system follows a modular architecture:

1. **Frontend:** Collects project information and presents estimates, analysis, and reports.
2. **Backend API:** Handles requests, authentication, business logic, and database operations.
3. **Machine Learning Layer:** Processes supported inputs and generates model predictions.
4. **AI Analysis Layer:** Produces contextual explanations and recommendations.
5. **Database Layer:** Stores users' project information and related records.
6. **Reporting Layer:** Generates downloadable project reports.

Conceptually, the workflow is:

`Project Requirements → Input Processing → ML Prediction → Risk and Planning Analysis → Results and Reports`

The precise workflow depends on the implemented backend services and available models.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3, Tailwind CSS |
| Visualization | Chart.js |
| Backend | Python, FastAPI, Uvicorn |
| Database | PostgreSQL, SQLAlchemy |
| Authentication | JWT and password hashing |
| Machine Learning | Scikit-learn, NumPy, Pandas |
| Text Processing | TF-IDF and NLP techniques |
| Model Persistence | Joblib |
| Generative AI | Gemini API |
| Report Generation | ReportLab |
| Development Tools | Git, GitHub, Visual Studio Code |

Technologies listed here describe the intended project stack; individual features may still be under development.

## Project Structure

The project is organized into frontend and backend components. The backend includes dataset preparation, model training, API functionality, and supporting application modules.

```text
PlanWise-AI/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── datasets/
│   ├── models/
│   ├── train_effort_baseline.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

This is a conceptual overview; the actual directory structure may differ as development progresses.

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Python 3.11 or another version supported by the project's dependencies.
- Node.js and npm.
- PostgreSQL, if using the PostgreSQL configuration.
- Git.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd PlanWise-AI
```

Replace `<YOUR_REPOSITORY_URL>` with the actual repository URL.

### 2. Set Up the Backend

Create and activate a virtual environment from the project root.

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
python -m pip install -r backend/requirements.txt
```

Configure the required environment variables and database connection before starting the API.

### 3. Run the Backend

Use the actual FastAPI application module configured in the repository. For example, if the application is exposed as `app.main:app`:

```powershell
python -m uvicorn app.main:app --reload --app-dir backend
```

Adjust the module path if the application entry point differs.

### 4. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The development URL is provided by the frontend development server.

### 5. Dataset and Model Setup

The machine-learning training workflow requires the supported dataset and its dependencies.

After preparing the dataset and configuring the training script, run:

```powershell
python backend/train_effort_baseline.py
```

Run the command from the repository root with the correct Python environment activated. The training script must have access to the expected dataset path.

The generated model artifact should be stored locally and made available to the inference service through the configured model-loading process.

## Environment Configuration

Create a local environment file using the project's documented variable names.

Typical configuration categories include:

- Database connection settings.
- JWT secret and token configuration.
- Generative AI API credentials.
- Application environment settings.
- Model artifact paths.

**Never commit `.env` files, API keys, database passwords, JWT secrets, or other sensitive credentials to GitHub.**

Use a safe `.env.example` file containing placeholder values to document required settings.

## Model Development and Evaluation

Model development should follow a reproducible experimental process:

1. Validate dataset meaning, target units, and missing-value conventions.
2. Identify data leakage and duplicate records.
3. Select features available at prediction time.
4. Establish a simple baseline.
5. Train and evaluate regression models.
6. Compare results on appropriate held-out data.
7. Inspect large prediction errors and model limitations.
8. Save the validated model and record its training configuration.
9. Re-evaluate the model when the dataset or feature pipeline changes.

Performance metrics should be reported with their evaluation method and test-set characteristics. A model should not be considered production-ready solely because training completed successfully.

## Security Considerations

PlanWise AI should follow standard application security practices:

- Protect credentials and environment variables.
- Validate incoming API data.
- Apply authentication and authorization where required.
- Use secure password hashing.
- Restrict database access.
- Handle exceptions without exposing sensitive information.
- Avoid logging secrets or personal data.
- Validate uploaded files and report-generation inputs.

## Future Enhancements

Planned areas for further development include:

- Improved estimation models and feature engineering.
- Stronger evaluation across previously unseen projects.
- Requirement decomposition and project-level effort aggregation.
- Estimation uncertainty and confidence calibration.
- Validated duration, cost, and team-size calculations.
- Improved risk analysis and mitigation recommendations.
- Resource availability and skill-gap analysis.
- Milestone planning and financial reporting.
- Model monitoring, version tracking, and performance evaluation.
- Expanded testing, documentation, and deployment support.

These enhancements are planned development areas and should not be interpreted as completed functionality.

## License

A license has not yet been specified. Add an appropriate license file before distributing the project for reuse.

---

**PlanWise AI — Turning Software Requirements into Data-Driven Planning Insights.**
