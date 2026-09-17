import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  Bell,
  ShieldCheck,
  Palette,
  Database,
  Mail,
  CheckCircle2,
  Save,
  X,
} from "lucide-react";

import "./Settings.css";

function Settings() {
  // ============================================================
  // THEME STATE
  // ============================================================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("planwise-theme") || "light";
  });

  // ============================================================
  // NOTIFICATION STATES
  // ============================================================

  const [projectAnalysisUpdates, setProjectAnalysisUpdates] =
    useState(() => {
      const saved = localStorage.getItem(
        "planwise-project-analysis-notifications"
      );

      return saved === null ? true : saved === "true";
    });

  const [emailNotifications, setEmailNotifications] =
    useState(() => {
      const saved = localStorage.getItem(
        "planwise-email-notifications"
      );

      return saved === null ? true : saved === "true";
    });

  const [riskAlerts, setRiskAlerts] = useState(() => {
    const saved = localStorage.getItem(
      "planwise-risk-alerts"
    );

    return saved === null ? true : saved === "true";
  });

  // ============================================================
  // UI STATES
  // ============================================================

  const [showDataModal, setShowDataModal] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // ============================================================
  // APPLY THEME
  // ============================================================

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
    } else {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem("planwise-theme", theme);
  }, [theme]);

  // ============================================================
  // SAVE SETTINGS
  // ============================================================

  const handleSaveChanges = () => {
    localStorage.setItem(
      "planwise-project-analysis-notifications",
      projectAnalysisUpdates
    );

    localStorage.setItem(
      "planwise-email-notifications",
      emailNotifications
    );

    localStorage.setItem(
      "planwise-risk-alerts",
      riskAlerts
    );

    localStorage.setItem("planwise-theme", theme);

    setShowSavedMessage(true);

    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  return (
    <div className="settings-page">

      {/* ========================================================
          PAGE HEADER
          ======================================================== */}

      <div className="settings-header">
        <div>
          <span className="page-eyebrow">
            ACCOUNT PREFERENCES
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your account preferences, notifications,
            security, and data settings.
          </p>
        </div>

        <button
          type="button"
          className="settings-save-btn"
          onClick={handleSaveChanges}
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>


      {/* ========================================================
          ACCOUNT PREFERENCES
          ======================================================== */}

      <section className="settings-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              ACCOUNT
            </span>

            <h2>
              Account Preferences
            </h2>

            <p>
              Control how your PlanWise AI workspace behaves.
            </p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-icon">
            <SettingsIcon size={20} />
          </div>

          <div className="settings-card-content">
            <h3>
              Workspace Experience
            </h3>

            <p>
              Keep your project planning workspace focused on
              estimation, analysis, and project planning.
            </p>
          </div>

          <span className="settings-status">
            <CheckCircle2 size={14} />
            Active
          </span>
        </div>
      </section>


      {/* ========================================================
          NOTIFICATION PREFERENCES
          ======================================================== */}

      <section className="settings-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              NOTIFICATIONS
            </span>

            <h2>
              Notification Preferences
            </h2>

            <p>
              Choose which project updates you want to receive.
            </p>
          </div>
        </div>

        <div className="settings-options-card">

          {/* Project Analysis Updates */}

          <div className="settings-option">
            <div className="settings-option-icon">
              <Bell size={18} />
            </div>

            <div className="settings-option-content">
              <strong>
                Project Analysis Updates
              </strong>

              <span>
                Receive notifications when project analysis
                or estimation is completed.
              </span>
            </div>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={projectAnalysisUpdates}
                onChange={(event) => {
                  setProjectAnalysisUpdates(
                    event.target.checked
                  );
                }}
              />

              <span></span>
            </label>
          </div>


          {/* Email Notifications */}

          <div className="settings-option">
            <div className="settings-option-icon">
              <Mail size={18} />
            </div>

            <div className="settings-option-content">
              <strong>
                Email Notifications
              </strong>

              <span>
                Receive important project and account updates
                through email.
              </span>
            </div>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(event) => {
                  setEmailNotifications(
                    event.target.checked
                  );
                }}
              />

              <span></span>
            </label>
          </div>


          {/* Risk Alerts */}

          <div className="settings-option">
            <div className="settings-option-icon">
              <ShieldCheck size={18} />
            </div>

            <div className="settings-option-content">
              <strong>
                Risk Alerts
              </strong>

              <span>
                Get notified when important project risks or
                resource gaps are detected.
              </span>
            </div>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={riskAlerts}
                onChange={(event) => {
                  setRiskAlerts(
                    event.target.checked
                  );
                }}
              />

              <span></span>
            </label>
          </div>

        </div>
      </section>


      {/* ========================================================
          APPEARANCE
          ======================================================== */}

      <section className="settings-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              APPEARANCE
            </span>

            <h2>
              Interface Preferences
            </h2>

            <p>
              Customize the visual experience of your workspace.
            </p>
          </div>
        </div>

        <div className="settings-options-card">

          <div className="settings-option">

            <div className="settings-option-icon">
              <Palette size={18} />
            </div>

            <div className="settings-option-content">
              <strong>
                Interface Theme
              </strong>

              <span>
                Choose your preferred workspace theme.
              </span>
            </div>

            <select
              className="settings-select"
              value={theme}
              onChange={(event) => {
                setTheme(event.target.value);
              }}
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>

              <option value="system">
                System
              </option>
            </select>

          </div>

        </div>
      </section>


      {/* ========================================================
          SECURITY
          ======================================================== */}

      <section className="settings-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              SECURITY
            </span>

            <h2>
              Security Settings
            </h2>

            <p>
              Review the security status of your PlanWise AI
              account.
            </p>
          </div>
        </div>

        <div className="settings-security-grid">

          {/* Account Protection */}

          <div className="settings-security-card">

            <div className="security-setting-icon">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h3>
                Account Protection
              </h3>

              <p>
                Your account security will be managed through
                authenticated backend services.
              </p>

              <span className="security-active">
                <CheckCircle2 size={14} />
                Protected
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          DATA & PRIVACY
          ======================================================== */}

      <section className="settings-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              DATA & PRIVACY
            </span>

            <h2>
              Data Management
            </h2>

            <p>
              Review how your project information and analysis
              data are associated with your account.
            </p>
          </div>
        </div>

        <div className="settings-data-card">

          <div className="settings-data-icon">
            <Database size={20} />
          </div>

          <div className="settings-data-content">
            <h3>
              Project Data
            </h3>

            <p>
              Saved projects, estimates, risks,
              recommendations, reports, and planning results
              are associated with your account.
            </p>
          </div>

          <button
            type="button"
            className="settings-secondary-btn"
            onClick={() => {
              setShowDataModal(true);
            }}
          >
            Manage Data
          </button>

        </div>
      </section>


      {/* ========================================================
          INFORMATION NOTE
          ======================================================== */}

      <div className="settings-info-note">
        <ShieldCheck size={20} />

        <div>
          <strong>
            Secure & Personalized Workspace
          </strong>

          <p>
            Your preferences are currently stored locally
            while the authenticated backend is being developed.
            Notification settings and project data controls will
            later be connected to the secure backend.
          </p>
        </div>
      </div>


      {/* ========================================================
          SAVE SUCCESS MESSAGE
          ======================================================== */}

      {showSavedMessage && (
        <div className="settings-save-message">
          <CheckCircle2 size={17} />

          <div>
            <strong>
              Settings Saved
            </strong>

            <span>
              Your preferences have been saved successfully.
            </span>
          </div>
        </div>
      )}


      {/* ========================================================
          MANAGE DATA MODAL
          ======================================================== */}

      {showDataModal && (
        <div
          className="settings-modal-overlay"
          onClick={() => {
            setShowDataModal(false);
          }}
        >
          <div
            className="settings-modal"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            <div className="settings-modal-header">

              <div>
                <span className="section-eyebrow">
                  DATA & PRIVACY
                </span>

                <h2>
                  Manage Project Data
                </h2>
              </div>

              <button
                type="button"
                className="settings-modal-close"
                onClick={() => {
                  setShowDataModal(false);
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>

            </div>


            <div className="settings-modal-body">

              <div className="settings-modal-icon">
                <Database size={22} />
              </div>

              <h3>
                Your PlanWise Project Data
              </h3>

              <p>
                Your saved projects can include project
                descriptions, estimates, risks, recommendations,
                resources, milestones, reports, and planning
                results.
              </p>

              <div className="settings-data-list">

                <div>
                  <strong>
                    Projects
                  </strong>

                  <span>
                    Saved project information and analysis.
                  </span>
                </div>

                <div>
                  <strong>
                    Estimates
                  </strong>

                  <span>
                    Cost, effort, duration, complexity, and
                    team planning results.
                  </span>
                </div>

                <div>
                  <strong>
                    Reports
                  </strong>

                  <span>
                    Generated project reports and planning
                    information.
                  </span>
                </div>

                <div>
                  <strong>
                    Security
                  </strong>

                  <span>
                    Data access will be protected through
                    authenticated backend services.
                  </span>
                </div>

              </div>

            </div>


            <div className="settings-modal-footer">

              <button
                type="button"
                className="settings-secondary-btn"
                onClick={() => {
                  setShowDataModal(false);
                }}
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Settings;