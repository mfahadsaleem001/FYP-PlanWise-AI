import { Bell } from "lucide-react";

import "./EmployeeTopbar.css";

function EmployeeTopbar() {
  return (
    <header className="employee-topbar">
      <div className="employee-topbar-title">
        <span>PLANWISE AI</span>
        <h2>Employee Workspace</h2>
      </div>

      <div className="employee-topbar-actions">
        <a
          href="/employee/notifications"
          className="employee-topbar-notification"
          title="Notifications"
        >
          <Bell />
          <span className="employee-notification-dot"></span>
        </a>

        <div className="employee-topbar-user">
          <div className="employee-topbar-avatar">
            F
          </div>

          <div className="employee-topbar-user-info">
            <strong>Fahad</strong>
            <span>Backend Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EmployeeTopbar;