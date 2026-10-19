
import {
  Bell,
  Eye,
  EyeOff,
  LockKeyhole,
  Moon,
  Monitor,
  Palette,
  Save,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";

import "./EmployeeSettings.css";

function EmployeeSettings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("planwise-theme") || "light"
  );

  const [preferences, setPreferences] = useState({
    deadlineReminders: true,
    projectUpdates: true,
    messages: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] =
    useState({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );

      localStorage.setItem("planwise-theme", "system");

      return;
    }

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("planwise-theme", theme);
  }, [theme]);

  const handlePreferenceChange = (name) => {
    setPreferences((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSavePreferences = () => {
    setSaveMessage(
      "Notification preferences saved successfully."
    );

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setSaveMessage(
        "Please complete all password fields."
      );
      return;
    }

    if (
      newPassword.length < 4 ||
      newPassword.length > 12
    ) {
      setSaveMessage(
        "New password must be between 4 and 12 characters."
      );
      return;
    }

    if (
      confirmPassword.length < 4 ||
      confirmPassword.length > 12
    ) {
      setSaveMessage(
        "Confirm password must be between 4 and 12 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setSaveMessage(
        "New password and confirmation do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setSaveMessage(
        "New password must be different from your current password."
      );
      return;
    }

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordVisibility({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

    setSaveMessage("Password updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  return (
    <section className="employee-settings-page">
      {/* PAGE HEADER */}

      <header className="employee-settings-header">
        <div>
          <span className="employee-settings-eyebrow">
            ACCOUNT
          </span>

          <h1>Settings</h1>

          <p>
            Manage your workspace preferences,
            notifications, appearance, and account
            security.
          </p>
        </div>
      </header>

      {/* SAVE MESSAGE */}

      {saveMessage && (
        <div className="employee-settings-feedback">
          <ShieldCheck />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* SETTINGS GRID */}

      <div className="employee-settings-grid">
        {/* APPEARANCE */}

        <section className="employee-settings-card">
          <div className="employee-settings-card-header">
            <div>
              <span>APPEARANCE</span>
              <h2>Workspace Appearance</h2>
            </div>

            <div className="employee-settings-card-icon">
              <Palette />
            </div>
          </div>

          <p className="employee-settings-description">
            Choose how the Employee Workspace should
            appear across your account.
          </p>

          <div className="employee-settings-theme-options">
            <button
              type="button"
              className={`employee-settings-theme-option ${
                theme === "light" ? "active" : ""
              }`}
              onClick={() => setTheme("light")}
            >
              <Sun />

              <div>
                <strong>Light</strong>
                <span>
                  Use the standard light workspace.
                </span>
              </div>
            </button>

            <button
              type="button"
              className={`employee-settings-theme-option ${
                theme === "dark" ? "active" : ""
              }`}
              onClick={() => setTheme("dark")}
            >
              <Moon />

              <div>
                <strong>Dark</strong>
                <span>
                  Use a darker workspace appearance.
                </span>
              </div>
            </button>

            <button
              type="button"
              className={`employee-settings-theme-option ${
                theme === "system" ? "active" : ""
              }`}
              onClick={() => setTheme("system")}
            >
              <Monitor />

              <div>
                <strong>System</strong>
                <span>
                  Follow your device preference.
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* NOTIFICATIONS */}

        <section className="employee-settings-card">
          <div className="employee-settings-card-header">
            <div>
              <span>NOTIFICATIONS</span>
              <h2>Notification Preferences</h2>
            </div>

            <div className="employee-settings-card-icon">
              <Bell />
            </div>
          </div>

          <p className="employee-settings-description">
            Choose which work-related notifications you
            want to receive.
          </p>

          <div className="employee-settings-toggle-list">
            <div className="employee-settings-toggle-row">
              <div>
                <strong>Deadline reminders</strong>
                <span>
                  Receive reminders about upcoming
                  deadlines.
                </span>
              </div>

              <button
                type="button"
                className={`employee-settings-toggle ${
                  preferences.deadlineReminders
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handlePreferenceChange(
                    "deadlineReminders"
                  )
                }
                aria-label="Toggle deadline reminders"
                aria-pressed={preferences.deadlineReminders}
              >
                <span></span>
              </button>
            </div>

            <div className="employee-settings-toggle-row">
              <div>
                <strong>Project updates</strong>
                <span>
                  Receive important project activity
                  updates.
                </span>
              </div>

              <button
                type="button"
                className={`employee-settings-toggle ${
                  preferences.projectUpdates
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handlePreferenceChange("projectUpdates")
                }
                aria-label="Toggle project updates"
                aria-pressed={preferences.projectUpdates}
              >
                <span></span>
              </button>
            </div>

            <div className="employee-settings-toggle-row">
              <div>
                <strong>Messages</strong>
                <span>
                  Get notified about new project
                  messages.
                </span>
              </div>

              <button
                type="button"
                className={`employee-settings-toggle ${
                  preferences.messages ? "active" : ""
                }`}
                onClick={() =>
                  handlePreferenceChange("messages")
                }
                aria-label="Toggle message notifications"
                aria-pressed={preferences.messages}
              >
                <span></span>
              </button>
            </div>
          </div>

          <button
            type="button"
            className="employee-settings-save-button"
            onClick={handleSavePreferences}
          >
            <Save />
            <span>Save Preferences</span>
          </button>
        </section>

        {/* SECURITY */}

        <section className="employee-settings-card employee-settings-security-card">
          <div className="employee-settings-card-header">
            <div>
              <span>SECURITY</span>
              <h2>Password & Security</h2>
            </div>

            <div className="employee-settings-card-icon">
              <LockKeyhole />
            </div>
          </div>

          <p className="employee-settings-description">
            Update your account password. Your employee
            role and permissions are managed by Admin.
          </p>

          <form
            className="employee-settings-password-form"
            onSubmit={handlePasswordUpdate}
          >
            {/* CURRENT PASSWORD */}

            <div className="employee-settings-field">
              <label htmlFor="currentPassword">
                Current Password
              </label>

              <div className="employee-settings-password-input">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={
                    passwordVisibility.currentPassword
                      ? "text"
                      : "password"
                  }
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  minLength={4}
                  maxLength={12}
                />

                <button
                  type="button"
                  className="employee-settings-password-toggle"
                  onClick={() =>
                    togglePasswordVisibility(
                      "currentPassword"
                    )
                  }
                  aria-label={
                    passwordVisibility.currentPassword
                      ? "Hide current password"
                      : "Show current password"
                  }
                >
                  {passwordVisibility.currentPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>
              </div>
            </div>

            {/* NEW + CONFIRM PASSWORD */}

            <div className="employee-settings-password-row">
              <div className="employee-settings-field">
                <label htmlFor="newPassword">
                  New Password
                </label>

                <div className="employee-settings-password-input">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={
                      passwordVisibility.newPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    minLength={4}
                    maxLength={12}
                  />

                  <button
                    type="button"
                    className="employee-settings-password-toggle"
                    onClick={() =>
                      togglePasswordVisibility("newPassword")
                    }
                    aria-label={
                      passwordVisibility.newPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {passwordVisibility.newPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>

                <span className="employee-settings-password-hint">
                  4–12 characters
                </span>
              </div>

              <div className="employee-settings-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="employee-settings-password-input">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      passwordVisibility.confirmPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    minLength={4}
                    maxLength={12}
                  />

                  <button
                    type="button"
                    className="employee-settings-password-toggle"
                    onClick={() =>
                      togglePasswordVisibility(
                        "confirmPassword"
                      )
                    }
                    aria-label={
                      passwordVisibility.confirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {passwordVisibility.confirmPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="employee-settings-save-button"
            >
              <LockKeyhole />
              <span>Update Password</span>
            </button>
          </form>
        </section>

        {/* ACCOUNT ACCESS */}

        <section className="employee-settings-card">
          <div className="employee-settings-card-header">
            <div>
              <span>ACCOUNT ACCESS</span>
              <h2>Employee Access</h2>
            </div>

            <div className="employee-settings-card-icon">
              <ShieldCheck />
            </div>
          </div>

          <div className="employee-settings-access-list">
            <div>
              <span>Account Type</span>
              <strong>Employee</strong>
            </div>

            <div>
              <span>Workspace</span>
              <strong>Employee Workspace</strong>
            </div>

            <div>
              <span>Project Access</span>
              <strong>Assigned Projects Only</strong>
            </div>

            <div>
              <span>Administrative Access</span>
              <strong>Not Available</strong>
            </div>
          </div>

          <div className="employee-settings-access-note">
            <ShieldCheck />

            <p>
              Access permissions are controlled by
              PlanWise administration and cannot be
              changed from the employee workspace.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default EmployeeSettings;