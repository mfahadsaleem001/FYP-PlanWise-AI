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
} from "lucide-react";

import "./AdminSettings.css";

function AdminSettings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("planwise-admin-theme") || "light";
  });

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

          <h1>Admin Settings</h1>

          <p>
            Manage PlanWise system configuration, notifications,
            resources, estimation settings, and administrative security.
          </p>
        </div>
      </div>


      {/* ======================================================
          SETTINGS CONTENT
          ====================================================== */}

      <div className="admin-settings-content">


        {/* ==================================================
            GENERAL SETTINGS
            ================================================== */}

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
                Basic configuration for the PlanWise administration
                workspace.
              </p>
            </div>

          </div>


          <div className="admin-settings-form-grid">

            <div className="admin-settings-field">

              <label>
                System Name
              </label>

              <input
                type="text"
                defaultValue="PlanWise AI"
              />

            </div>


            <div className="admin-settings-field">

              <label>
                Environment
              </label>

              <select defaultValue="production">

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

              <label>
                Default Project Status
              </label>

              <select defaultValue="planning">

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

              <label>
                Default Currency
              </label>

              <select defaultValue="USD">

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


        {/* ==================================================
            APPEARANCE
            ================================================== */}

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

              <h2>
                Appearance
              </h2>

              <p>
                Choose how the PlanWise administration workspace
                should appear across the entire Admin Panel.
              </p>

            </div>

          </div>


          <div className="admin-theme-options">

            {/* LIGHT MODE */}

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

                <strong>
                  Light Mode
                </strong>

                <span>
                  Use the standard PlanWise light interface.
                </span>

              </div>


              <div className="admin-theme-radio">

                {theme === "light" && (
                  <span />
                )}

              </div>

            </button>


            {/* DARK MODE */}

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

                <strong>
                  Dark Mode
                </strong>

                <span>
                  Use the dark interface across the entire Admin Panel.
                </span>

              </div>


              <div className="admin-theme-radio">

                {theme === "dark" && (
                  <span />
                )}

              </div>

            </button>


            {/* SYSTEM DEFAULT */}

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

                <strong>
                  System Default
                </strong>

                <span>
                  Follow the appearance preference of your device.
                </span>

              </div>


              <div className="admin-theme-radio">

                {theme === "system" && (
                  <span />
                )}

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

              <strong>
                {theme === "dark"
                  ? "Dark Mode"
                  : theme === "system"
                  ? "System Default"
                  : "Light Mode"}
              </strong>

              . This preference is applied across the Admin Panel.

            </p>

          </div>

        </div>


        {/* ==================================================
            NOTIFICATION PREFERENCES
            ================================================== */}

        <div
          className="admin-settings-card"
          id="notifications"
        >

          <div className="admin-settings-card-header">

            <div className="admin-settings-card-icon">
              <Bell size={18} />
            </div>

            <div>

              <h2>
                Notification Preferences
              </h2>

              <p>
                Control which system events should generate
                administrative notifications.
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
                  Notify administrators when a project reaches
                  a high-risk level.
                </span>

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="admin-settings-option">

              <div>

                <strong>
                  Resource shortage alerts
                </strong>

                <span>
                  Notify administrators when required resources
                  are unavailable.
                </span>

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="admin-settings-option">

              <div>

                <strong>
                  Resource conflict alerts
                </strong>

                <span>
                  Notify when a resource is assigned to
                  conflicting project schedules.
                </span>

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="admin-settings-option">

              <div>

                <strong>
                  Model monitoring alerts
                </strong>

                <span>
                  Notify administrators about important model
                  health or performance issues.
                </span>

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>


            <label className="admin-settings-option">

              <div>

                <strong>
                  New user notifications
                </strong>

                <span>
                  Notify administrators when a new account
                  is registered.
                </span>

              </div>

              <input
                type="checkbox"
                defaultChecked
              />

            </label>

          </div>

        </div>


        {/* ==================================================
            RESOURCE CONFIGURATION
            ================================================== */}

        <div
          className="admin-settings-card"
          id="resources"
        >

          <div className="admin-settings-card-header">

            <div className="admin-settings-card-icon">
              <Users size={18} />
            </div>

            <div>

              <h2>
                Resource Configuration
              </h2>

              <p>
                Configure availability and planning defaults
                used by the resource planning system.
              </p>

            </div>

          </div>


          <div className="admin-settings-form-grid">


            <div className="admin-settings-field">

              <label>
                Default Availability
              </label>

              <select defaultValue="100">

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

              <select defaultValue="80">

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

            <div className="admin-settings-role">
              <span>Frontend Developer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>Backend Developer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>Full Stack Developer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>ML Engineer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>UI/UX Designer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>QA Engineer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>DevOps Engineer</span>
              <strong>Active</strong>
            </div>

            <div className="admin-settings-role">
              <span>Project Manager</span>
              <strong>Active</strong>
            </div>

          </div>

        </div>


        {/* ==================================================
            PROJECT CONFIGURATION
            ================================================== */}

        <div
          className="admin-settings-card"
          id="projects"
        >

          <div className="admin-settings-card-header">

            <div className="admin-settings-card-icon">
              <FolderKanban size={18} />
            </div>

            <div>

              <h2>
                Project Configuration
              </h2>

              <p>
                Manage project types and planning behavior used
                throughout PlanWise.
              </p>

            </div>

          </div>


          <div className="admin-settings-project-types">


            <div>
              <span>Web Application</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>Mobile Application</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>Desktop Software</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>AI / Machine Learning</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>SaaS</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>E-Commerce</span>
              <strong>Active</strong>
            </div>


            <div>
              <span>Other</span>
              <strong>Active</strong>
            </div>

          </div>

        </div>


        {/* ==================================================
            MODEL CONFIGURATION
            ================================================== */}

        <div
          className="admin-settings-card"
          id="models"
        >

          <div className="admin-settings-card-header">

            <div className="admin-settings-card-icon">
              <BrainCircuit size={18} />
            </div>

            <div>

              <h2>
                Model Configuration
              </h2>

              <p>
                Review the active estimation model configuration
                and monitoring behavior.
              </p>

            </div>

          </div>


          <div className="admin-model-config-grid">


            <div className="admin-model-config-item">

              <span>
                Active Model
              </span>

              <strong>
                PlanWise Estimation Model
              </strong>

            </div>


            <div className="admin-model-config-item">

              <span>
                Version
              </span>

              <strong>
                v1.0.0
              </strong>

            </div>


            <div className="admin-model-config-item">

              <span>
                Model Pipeline
              </span>

              <strong>
                Regression Pipeline
              </strong>

            </div>


            <div className="admin-model-config-item">

              <span>
                Monitoring
              </span>

              <strong className="status-active">
                Enabled
              </strong>

            </div>

          </div>


          <div className="admin-settings-info-box">

            <BrainCircuit size={17} />

            <p>
              Model algorithm and training configuration should
              be finalized after the historical project dataset
              is evaluated. The current interface represents the
              monitoring configuration only.
            </p>

          </div>

        </div>


        {/* ==================================================
            SECURITY & SESSIONS
            ================================================== */}

        <div
          className="admin-settings-card"
          id="security"
        >

          <div className="admin-settings-card-header">

            <div className="admin-settings-card-icon">
              <ShieldCheck size={18} />
            </div>

            <div>

              <h2>
                Security & Sessions
              </h2>

              <p>
                Configure administrative security and session
                behavior.
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
                  Admin authentication
                </strong>

                <span>
                  JWT-based authentication required
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
                  Role-based access
                </strong>

                <span>
                  Admin-only API authorization
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
                defaultValue="60">
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


        {/* ==================================================
            ACTIONS
            ================================================== */}

        <div className="admin-settings-actions">

          <button className="admin-settings-reset">

            <RotateCcw size={15} />

            <span>
              Reset Changes
            </span>

          </button>


          <button className="admin-settings-save">

            <Save size={15} />

            <span>
              Save Settings
            </span>

          </button>

        </div>

      </div>

    </section>
  );
}

export default AdminSettings;