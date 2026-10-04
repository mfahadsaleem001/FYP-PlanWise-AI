import { useEffect, useState } from "react";

import {
  Settings,
  Bell,
  ShieldCheck,
  Users,
  FolderKanban,
  BrainCircuit,
  Save,
  RotateCcw,
  Lock,
  Clock3,
  Moon,
  Sun,
  Monitor,
  Calculator,
  Sparkles,
  FileText,
  Wallet,
  BarChart3,
  Plus,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";

import "./AdminSettings.css";

const DEFAULT_SETTINGS = {
  systemName: "PlanWise AI",
  environment: "production",
  defaultProjectStatus: "planning",
  currency: "USD",

  effortUnit: "hours",
  durationUnit: "weeks",
  confidenceDisplay: "enabled",
  uncertaintyRange: "enabled",

  requirementAnalysis: true,
  riskAnalysis: true,
  planningRecommendations: true,
  aiExplanation: true,

  highRiskAlerts: true,
  resourceShortageAlerts: true,
  resourceConflictAlerts: true,
  milestoneAlerts: true,
  financialPlanningAlerts: true,
  modelMonitoringAlerts: true,

  defaultAvailability: "100",
  workloadThreshold: "80",

  defaultMilestonePlanning: "enabled",
  costBreakdown: "milestone",
  costVarianceThreshold: "10",
  financialTracking: "enabled",

  sessionTimeout: "60",

  reportEstimationSummary: true,
  reportRiskAnalysis: true,
  reportResourcePlanning: true,
  reportFinancialPlan: true,
  reportAIRecommendations: true,
};

const DEFAULT_PROJECT_TYPES = [
  "Web Application",
  "Mobile Application",
  "Desktop Software",
  "AI / Machine Learning",
  "SaaS",
  "E-Commerce",
  "Other",
];

const RESOURCE_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "ML Engineer",
  "AI Engineer",
  "UI/UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Project Manager",
];

function AdminSettings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("planwise-admin-theme") || "light";
  });

  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(
        "planwise-settings"
      );

      return savedSettings
        ? {
            ...DEFAULT_SETTINGS,
            ...JSON.parse(savedSettings),
          }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [projectTypes, setProjectTypes] = useState(() => {
    try {
      const savedTypes = localStorage.getItem(
        "planwise-project-types"
      );

      return savedTypes
        ? JSON.parse(savedTypes)
        : DEFAULT_PROJECT_TYPES;
    } catch {
      return DEFAULT_PROJECT_TYPES;
    }
  });

  const [newProjectType, setNewProjectType] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("planwise-admin-theme") || "light";

    if (savedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );

      setTheme("system");
      return;
    }

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setHasChanges(true);
    setSaveMessage("");
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);

    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );

      localStorage.setItem(
        "planwise-admin-theme",
        "system"
      );

      return;
    }

    document.documentElement.setAttribute(
      "data-theme",
      selectedTheme
    );

    localStorage.setItem(
      "planwise-admin-theme",
      selectedTheme
    );
  };

  const handleAddProjectType = (event) => {
    event.preventDefault();

    const cleanedType = newProjectType.trim();

    if (!cleanedType) {
      setSaveMessage("Please enter a project type.");
      return;
    }

    const alreadyExists = projectTypes.some(
      (type) =>
        type.toLowerCase() === cleanedType.toLowerCase()
    );

    if (alreadyExists) {
      setSaveMessage("This project type already exists.");
      return;
    }

    setProjectTypes((previous) => [
      ...previous,
      cleanedType,
    ]);

    setNewProjectType("");
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleRemoveProjectType = (typeToRemove) => {
    if (projectTypes.length <= 1) {
      setSaveMessage(
        "At least one project type must remain available."
      );
      return;
    }

    setProjectTypes((previous) =>
      previous.filter((type) => type !== typeToRemove)
    );

    setHasChanges(true);
    setSaveMessage("");
  };

  const handleSaveSettings = () => {
    localStorage.setItem(
      "planwise-settings",
      JSON.stringify(settings)
    );

    localStorage.setItem(
      "planwise-project-types",
      JSON.stringify(projectTypes)
    );

    localStorage.setItem(
      "planwise-admin-theme",
      theme
    );

    setHasChanges(false);
    setSaveMessage("Settings saved successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const handleResetSettings = () => {
    const confirmed = window.confirm(
      "Reset all PlanWise settings to their default values?"
    );

    if (!confirmed) {
      return;
    }

    setSettings({
      ...DEFAULT_SETTINGS,
    });

    setProjectTypes([
      ...DEFAULT_PROJECT_TYPES,
    ]);

    setTheme("light");

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

    localStorage.setItem(
      "planwise-admin-theme",
      "light"
    );

    localStorage.removeItem("planwise-settings");
    localStorage.removeItem("planwise-project-types");

    setNewProjectType("");
    setHasChanges(false);
    setSaveMessage("Settings have been reset.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const currentThemeLabel =
    theme === "dark"
      ? "Dark Mode"
      : theme === "system"
      ? "System Default"
      : "Light Mode";

  return (
    <section className="admin-settings">
      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <div className="admin-page-header">
        <div className="admin-page-header-content">
          <span className="admin-page-eyebrow">
            SYSTEM
          </span>

          <h1>Settings</h1>

          <p>
            Configure PlanWise estimation, AI analysis,
            project planning, notifications, security,
            reports, and workspace preferences.
          </p>
        </div>
      </div>

      <div className="admin-settings-content">

        {/* ====================================================
            GENERAL SETTINGS
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="general"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <Settings size={18} />
            </div>

            <div>
              <h2>General Settings</h2>

              <p>
                Basic configuration for the PlanWise
                workspace and project planning environment.
              </p>
            </div>
          </div>

          <div className="admin-settings-form-grid">

            <div className="admin-settings-field">
              <label>System Name</label>

              <input
                type="text"
                value={settings.systemName}
                onChange={(event) =>
                  updateSetting(
                    "systemName",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="admin-settings-field">
              <label>Environment</label>

              <select
                value={settings.environment}
                onChange={(event) =>
                  updateSetting(
                    "environment",
                    event.target.value
                  )
                }
              >
                <option value="production">
                  Production
                </option>

                <option value="staging">
                  Staging
                </option>

                <option value="development">
                  Development
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Default Project Status</label>

              <select
                value={settings.defaultProjectStatus}
                onChange={(event) =>
                  updateSetting(
                    "defaultProjectStatus",
                    event.target.value
                  )
                }
              >
                <option value="planning">
                  Planning
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Default Currency</label>

              <select
                value={settings.currency}
                onChange={(event) =>
                  updateSetting(
                    "currency",
                    event.target.value
                  )
                }
              >
                <option value="USD">
                  USD — US Dollar
                </option>

                <option value="PKR">
                  PKR — Pakistani Rupee
                </option>

                <option value="EUR">
                  EUR — Euro
                </option>

                <option value="GBP">
                  GBP — British Pound
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* ====================================================
            APPEARANCE
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="appearance"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              {theme === "dark" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </div>

            <div>
              <h2>Appearance</h2>

              <p>
                Choose how the PlanWise workspace should
                appear across the application.
              </p>
            </div>
          </div>

          <div className="admin-theme-options">

            <button
              type="button"
              className={`admin-theme-option ${
                theme === "light" ? "active" : ""
              }`}
              onClick={() =>
                handleThemeChange("light")
              }
            >
              <div className="admin-theme-option-icon">
                <Sun size={18} />
              </div>

              <div className="admin-theme-option-content">
                <strong>Light Mode</strong>

                <span>
                  Use the standard PlanWise light
                  interface.
                </span>
              </div>

              <div className="admin-theme-radio">
                {theme === "light" && <span />}
              </div>
            </button>

            <button
              type="button"
              className={`admin-theme-option ${
                theme === "dark" ? "active" : ""
              }`}
              onClick={() =>
                handleThemeChange("dark")
              }
            >
              <div className="admin-theme-option-icon">
                <Moon size={18} />
              </div>

              <div className="admin-theme-option-content">
                <strong>Dark Mode</strong>

                <span>
                  Use the dark interface across
                  PlanWise.
                </span>
              </div>

              <div className="admin-theme-radio">
                {theme === "dark" && <span />}
              </div>
            </button>

            <button
              type="button"
              className={`admin-theme-option ${
                theme === "system" ? "active" : ""
              }`}
              onClick={() =>
                handleThemeChange("system")
              }
            >
              <div className="admin-theme-option-icon">
                <Monitor size={18} />
              </div>

              <div className="admin-theme-option-content">
                <strong>System Default</strong>

                <span>
                  Follow the appearance preference
                  of your device.
                </span>
              </div>

              <div className="admin-theme-radio">
                {theme === "system" && <span />}
              </div>
            </button>

          </div>

          <div className="admin-theme-status">
            <div className="admin-theme-status-icon">
              {theme === "dark" ? (
                <Moon size={15} />
              ) : (
                <Sun size={15} />
              )}
            </div>

            <p>
              Current theme:{" "}
              <strong>{currentThemeLabel}</strong>.
              This preference is applied across
              PlanWise.
            </p>
          </div>
        </div>

        {/* ====================================================
            ESTIMATION CONFIGURATION
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="estimation"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <Calculator size={18} />
            </div>

            <div>
              <h2>Estimation Configuration</h2>

              <p>
                Configure how PlanWise presents project
                estimation results and uncertainty
                information.
              </p>
            </div>
          </div>

          <div className="admin-settings-form-grid">

            <div className="admin-settings-field">
              <label>Effort Unit</label>

              <select
                value={settings.effortUnit}
                onChange={(event) =>
                  updateSetting(
                    "effortUnit",
                    event.target.value
                  )
                }
              >
                <option value="hours">
                  Hours
                </option>

                <option value="days">
                  Person-Days
                </option>

                <option value="weeks">
                  Person-Weeks
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Duration Unit</label>

              <select
                value={settings.durationUnit}
                onChange={(event) =>
                  updateSetting(
                    "durationUnit",
                    event.target.value
                  )
                }
              >
                <option value="days">
                  Days
                </option>

                <option value="weeks">
                  Weeks
                </option>

                <option value="months">
                  Months
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Confidence Display</label>

              <select
                value={settings.confidenceDisplay}
                onChange={(event) =>
                  updateSetting(
                    "confidenceDisplay",
                    event.target.value
                  )
                }
              >
                <option value="enabled">
                  Show Confidence
                </option>

                <option value="disabled">
                  Hide Confidence
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Uncertainty Range</label>

              <select
                value={settings.uncertaintyRange}
                onChange={(event) =>
                  updateSetting(
                    "uncertaintyRange",
                    event.target.value
                  )
                }
              >
                <option value="enabled">
                  Show Estimated Range
                </option>

                <option value="disabled">
                  Show Point Estimate Only
                </option>
              </select>
            </div>

          </div>

          <div className="admin-settings-info-box">
            <Calculator size={17} />

            <p>
              PlanWise uses the trained machine learning
              pipeline to generate cost, effort, duration,
              team size, and complexity estimates.
              Confidence and uncertainty can be presented
              alongside predictions when supported by the
              trained model.
            </p>
          </div>
        </div>

        {/* ====================================================
            AI & ANALYSIS
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="ai-analysis"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <h2>AI & Analysis Configuration</h2>

              <p>
                Configure AI-assisted requirement analysis,
                risk assessment, and planning
                recommendations.
              </p>
            </div>
          </div>

          <div className="admin-settings-options">

            <label className="admin-settings-option">
              <div>
                <strong>
                  Requirement analysis
                </strong>

                <span>
                  Analyze project descriptions and identify
                  requirements and potential features.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.requirementAnalysis}
                onChange={(event) =>
                  updateSetting(
                    "requirementAnalysis",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Risk analysis
                </strong>

                <span>
                  Generate project risks with severity
                  levels and mitigation recommendations.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.riskAnalysis}
                onChange={(event) =>
                  updateSetting(
                    "riskAnalysis",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Planning recommendations
                </strong>

                <span>
                  Provide technology, team, milestone,
                  and planning recommendations based on
                  analysis.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.planningRecommendations}
                onChange={(event) =>
                  updateSetting(
                    "planningRecommendations",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  AI explanation
                </strong>

                <span>
                  Explain estimation results in a clear,
                  project-focused format.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.aiExplanation}
                onChange={(event) =>
                  updateSetting(
                    "aiExplanation",
                    event.target.checked
                  )
                }
              />
            </label>

          </div>

          <div className="admin-settings-info-box">
            <BrainCircuit size={17} />

            <p>
              AI assistance supports requirement
              understanding, explanations, risks, and
              recommendations. It does not replace the
              trained machine learning model used for
              project estimation.
            </p>
          </div>
        </div>

        {/* ====================================================
            NOTIFICATIONS
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="notifications"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <Bell size={18} />
            </div>

            <div>
              <h2>Notification Preferences</h2>

              <p>
                Control which important PlanWise project
                and system events generate notifications.
              </p>
            </div>
          </div>

          <div className="admin-settings-options">

            <label className="admin-settings-option">
              <div>
                <strong>
                  High-risk project alerts
                </strong>

                <span>
                  Notify when a project reaches a high
                  or critical risk level.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.highRiskAlerts}
                onChange={(event) =>
                  updateSetting(
                    "highRiskAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Resource shortage alerts
                </strong>

                <span>
                  Notify when required project resources
                  are unavailable or insufficient.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.resourceShortageAlerts}
                onChange={(event) =>
                  updateSetting(
                    "resourceShortageAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Resource conflict alerts
                </strong>

                <span>
                  Notify when resource availability
                  conflicts with planned project schedules.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.resourceConflictAlerts}
                onChange={(event) =>
                  updateSetting(
                    "resourceConflictAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Milestone alerts
                </strong>

                <span>
                  Notify about upcoming, delayed, or
                  completed project milestones.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.milestoneAlerts}
                onChange={(event) =>
                  updateSetting(
                    "milestoneAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Financial planning alerts
                </strong>

                <span>
                  Notify when estimated project costs
                  exceed configured planning thresholds.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.financialPlanningAlerts}
                onChange={(event) =>
                  updateSetting(
                    "financialPlanningAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Model monitoring alerts
                </strong>

                <span>
                  Notify about important model health,
                  drift, or prediction performance issues.
                </span>
              </div>

              <input
                type="checkbox"
                checked={settings.modelMonitoringAlerts}
                onChange={(event) =>
                  updateSetting(
                    "modelMonitoringAlerts",
                    event.target.checked
                  )
                }
              />
            </label>

          </div>
        </div>

        {/* ====================================================
            RESOURCE CONFIGURATION
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="resources"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <Users size={18} />
            </div>

            <div>
              <h2>Resource Configuration</h2>

              <p>
                Configure availability and workload defaults
                used by the project resource planning
                system.
              </p>
            </div>
          </div>

          <div className="admin-settings-form-grid">

            <div className="admin-settings-field">
              <label>Default Availability</label>

              <select
                value={settings.defaultAvailability}
                onChange={(event) =>
                  updateSetting(
                    "defaultAvailability",
                    event.target.value
                  )
                }
              >
                <option value="100">
                  100%
                </option>

                <option value="75">
                  75%
                </option>

                <option value="50">
                  50%
                </option>

                <option value="25">
                  25%
                </option>

                <option value="0">
                  0%
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>
                Default Workload Threshold
              </label>

              <select
                value={settings.workloadThreshold}
                onChange={(event) =>
                  updateSetting(
                    "workloadThreshold",
                    event.target.value
                  )
                }
              >
                <option value="60">
                  60%
                </option>

                <option value="70">
                  70%
                </option>

                <option value="80">
                  80%
                </option>

                <option value="90">
                  90%
                </option>
              </select>
            </div>

          </div>

          <div className="admin-settings-role-list">
            {RESOURCE_ROLES.map((role) => (
              <div
                className="admin-settings-role"
                key={role}
              >
                <span>{role}</span>

                <strong>Active</strong>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================
            PROJECT CONFIGURATION
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="projects"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <FolderKanban size={18} />
            </div>

            <div>
              <h2>Project Configuration</h2>

              <p>
                Manage the project types available when
                creating PlanWise estimates.
              </p>
            </div>
          </div>

          <div className="admin-settings-project-types">
            {projectTypes.map((type) => (
              <div key={type}>
                <span>{type}</span>

                <div className="admin-project-type-actions">
                  <strong>Active</strong>

                  <button
                    type="button"
                    className="admin-project-type-delete"
                    title={`Remove ${type}`}
                    onClick={() =>
                      handleRemoveProjectType(type)
                    }
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form
            className="admin-project-type-add"
            onSubmit={handleAddProjectType}
          >
            <div className="admin-project-type-input">
              <input
                type="text"
                value={newProjectType}
                onChange={(event) =>
                  setNewProjectType(event.target.value)
                }
                placeholder="Enter new project type"
                maxLength={50}
              />
            </div>

            <button
              type="submit"
              className="admin-project-type-add-button"
            >
              <Plus size={15} />
              <span>Add Project Type</span>
            </button>
          </form>

          <div className="admin-settings-info-box">
            <FolderKanban size={17} />

            <p>
              Project types are used during estimate
              creation and can help PlanWise apply the
              appropriate analysis and estimation behavior.
              Add custom types when your planning workflow
              requires them.
            </p>
          </div>
        </div>

        {/* ====================================================
            MILESTONE & FINANCIAL PLANNING
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="planning"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <BarChart3 size={18} />
            </div>

            <div>
              <h2>
                Milestone & Financial Planning
              </h2>

              <p>
                Configure defaults for milestone planning,
                financial estimates, and project cost
                tracking.
              </p>
            </div>
          </div>

          <div className="admin-settings-form-grid">

            <div className="admin-settings-field">
              <label>
                Default Milestone Planning
              </label>

              <select
                value={
                  settings.defaultMilestonePlanning
                }
                onChange={(event) =>
                  updateSetting(
                    "defaultMilestonePlanning",
                    event.target.value
                  )
                }
              >
                <option value="enabled">
                  Enabled
                </option>

                <option value="disabled">
                  Disabled
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Cost Breakdown</label>

              <select
                value={settings.costBreakdown}
                onChange={(event) =>
                  updateSetting(
                    "costBreakdown",
                    event.target.value
                  )
                }
              >
                <option value="milestone">
                  By Milestone
                </option>

                <option value="phase">
                  By Project Phase
                </option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>
                Cost Variance Threshold
              </label>

              <select
                value={
                  settings.costVarianceThreshold
                }
                onChange={(event) =>
                  updateSetting(
                    "costVarianceThreshold",
                    event.target.value
                  )
                }
              >
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
              </select>
            </div>

            <div className="admin-settings-field">
              <label>Financial Tracking</label>

              <select
                value={settings.financialTracking}
                onChange={(event) =>
                  updateSetting(
                    "financialTracking",
                    event.target.value
                  )
                }
              >
                <option value="enabled">
                  Enabled
                </option>

                <option value="disabled">
                  Disabled
                </option>
              </select>
            </div>

          </div>

          <div className="admin-settings-info-box">
            <Wallet size={17} />

            <p>
              Financial planning can break estimated
              project costs across milestones or phases
              and help identify cost variance during
              project execution.
            </p>
          </div>
        </div>

        {/* ====================================================
            MODEL CONFIGURATION
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="models"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <BrainCircuit size={18} />
            </div>

            <div>
              <h2>Model Configuration</h2>

              <p>
                Review the active estimation model
                configuration and monitoring behavior.
              </p>
            </div>
          </div>

          <div className="admin-model-config-grid">

            <div className="admin-model-config-item">
              <span>Active Model</span>

              <strong>
                PlanWise Estimation Model
              </strong>
            </div>

            <div className="admin-model-config-item">
              <span>Version</span>

              <strong>v1.0.0</strong>
            </div>

            <div className="admin-model-config-item">
              <span>Model Pipeline</span>

              <strong>
                Regression Pipeline
              </strong>
            </div>

            <div className="admin-model-config-item">
              <span>Monitoring</span>

              <strong className="status-active">
                Enabled
              </strong>
            </div>

          </div>

          <div className="admin-settings-info-box">
            <BrainCircuit size={17} />

            <p>
              Model algorithm and training configuration
              should be finalized after the historical
              project dataset is evaluated. This interface
              represents the deployed model configuration
              and monitoring state.
            </p>
          </div>
        </div>

        {/* ====================================================
            REPORTS
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="reports"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <FileText size={18} />
            </div>

            <div>
              <h2>Reports & Documentation</h2>

              <p>
                Configure the default content included in
                generated PlanWise project reports.
              </p>
            </div>
          </div>

          <div className="admin-settings-options">

            <label className="admin-settings-option">
              <div>
                <strong>
                  Estimation summary
                </strong>

                <span>
                  Include cost, effort, duration,
                  team size, and complexity results.
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  settings.reportEstimationSummary
                }
                onChange={(event) =>
                  updateSetting(
                    "reportEstimationSummary",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Risk analysis
                </strong>

                <span>
                  Include identified risks, severity,
                  and mitigation recommendations.
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  settings.reportRiskAnalysis
                }
                onChange={(event) =>
                  updateSetting(
                    "reportRiskAnalysis",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Resource planning
                </strong>

                <span>
                  Include required resources,
                  availability gaps, and planning
                  information.
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  settings.reportResourcePlanning
                }
                onChange={(event) =>
                  updateSetting(
                    "reportResourcePlanning",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  Milestone & financial plan
                </strong>

                <span>
                  Include milestone schedules and
                  project financial breakdowns.
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  settings.reportFinancialPlan
                }
                onChange={(event) =>
                  updateSetting(
                    "reportFinancialPlan",
                    event.target.checked
                  )
                }
              />
            </label>

            <label className="admin-settings-option">
              <div>
                <strong>
                  AI recommendations
                </strong>

                <span>
                  Include AI-generated planning and
                  project improvement recommendations.
                </span>
              </div>

              <input
                type="checkbox"
                checked={
                  settings.reportAIRecommendations
                }
                onChange={(event) =>
                  updateSetting(
                    "reportAIRecommendations",
                    event.target.checked
                  )
                }
              />
            </label>

          </div>
        </div>

        {/* ====================================================
            SECURITY
            ==================================================== */}

        <div
          className="admin-settings-card"
          id="security"
        >
          <div className="admin-settings-card-header">
            <div className="admin-settings-card-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h2>Security & Sessions</h2>

              <p>
                Configure application authentication and
                session security behavior.
              </p>
            </div>
          </div>

          <div className="admin-settings-security-list">

            <div className="admin-security-row">
              <div className="admin-security-row-icon">
                <Lock size={16} />
              </div>

              <div>
                <strong>
                  User authentication
                </strong>

                <span>
                  JWT-based authentication
                </span>
              </div>

              <strong className="security-status">
                Enabled
              </strong>
            </div>

            <div className="admin-security-row">
              <div className="admin-security-row-icon">
                <ShieldCheck size={16} />
              </div>

              <div>
                <strong>
                  Protected routes
                </strong>

                <span>
                  Authenticated access required for
                  protected application resources
                </span>
              </div>

              <strong className="security-status">
                Enabled
              </strong>
            </div>

            <div className="admin-security-row">
              <div className="admin-security-row-icon">
                <Clock3 size={16} />
              </div>

              <div>
                <strong>
                  Session timeout
                </strong>

                <span>
                  Automatically expire inactive sessions
                </span>
              </div>

              <select
                className="admin-session-timeout-select"
                value={settings.sessionTimeout}
                onChange={(event) =>
                  updateSetting(
                    "sessionTimeout",
                    event.target.value
                  )
                }
              >
                <option value="30">
                  30 minutes
                </option>

                <option value="60">
                  60 minutes
                </option>

                <option value="120">
                  2 hours
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* ====================================================
            SAVE STATUS
            ==================================================== */}

        {saveMessage && (
          <div className="admin-settings-save-message">
            <CheckCircle2 size={15} />
            <span>{saveMessage}</span>

            <button
              type="button"
              onClick={() => setSaveMessage("")}
              aria-label="Close message"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <div className="admin-settings-actions">

          <button
            type="button"
            className="admin-settings-reset"
            onClick={handleResetSettings}
          >
            <RotateCcw size={15} />

            <span>Reset Settings</span>
          </button>

          <button
            type="button"
            className="admin-settings-save"
            onClick={handleSaveSettings}
            disabled={!hasChanges}
          >
            <Save size={15} />

            <span>
              {hasChanges
                ? "Save Settings"
                : "Settings Saved"}
            </span>
          </button>

        </div>

      </div>
    </section>
  );
}

export default AdminSettings;