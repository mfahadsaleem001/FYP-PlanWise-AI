import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  CalendarDays,
  Users,
  MessageSquare,
  Bell,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import "./EmployeeSidebar.css";

function EmployeeSidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="employee-sidebar">
      {/* BRAND */}
      <div className="employee-sidebar-brand">
        <a
          href="/employee/dashboard"
          className="employee-sidebar-logo"
        >
          <span className="employee-sidebar-logo-mark">
            P
          </span>

          <span className="employee-sidebar-logo-text">
            PlanWise <span>AI</span>
          </span>
        </a>
      </div>

      {/* NAVIGATION */}
      <nav className="employee-sidebar-navigation">

        {/* MAIN */}
        <div className="employee-sidebar-group">
          <span className="employee-sidebar-group-title">
            MAIN
          </span>

          <a
            href="/employee/dashboard"
            className={`employee-sidebar-link ${
              currentPath === "/employee/dashboard"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <LayoutDashboard />
            </span>

            <span>Dashboard</span>
          </a>
        </div>

        {/* WORK */}
        <div className="employee-sidebar-group">
          <span className="employee-sidebar-group-title">
            WORK
          </span>

          <a
            href="/employee/projects"
            className={`employee-sidebar-link ${
              currentPath === "/employee/projects"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <FolderKanban />
            </span>

            <span>My Projects</span>
          </a>

          <a
            href="/employee/tasks"
            className={`employee-sidebar-link ${
              currentPath === "/employee/tasks"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <ListTodo />
            </span>

            <span>My Tasks</span>
          </a>

          <a
            href="/employee/calendar"
            className={`employee-sidebar-link ${
              currentPath === "/employee/calendar"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <CalendarDays />
            </span>

            <span>Calendar</span>
          </a>
        </div>

        {/* COLLABORATION */}
        <div className="employee-sidebar-group">
          <span className="employee-sidebar-group-title">
            COLLABORATION
          </span>

          <a
            href="/employee/team"
            className={`employee-sidebar-link ${
              currentPath === "/employee/team"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <Users />
            </span>

            <span>Team</span>
          </a>

          <a
            href="/employee/messages"
            className={`employee-sidebar-link ${
              currentPath === "/employee/messages"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <MessageSquare />
            </span>

            <span>Messages</span>
          </a>
        </div>

        {/* ACCOUNT */}
        <div className="employee-sidebar-group">
          <span className="employee-sidebar-group-title">
            ACCOUNT
          </span>

          <a
            href="/employee/notifications"
            className={`employee-sidebar-link ${
              currentPath === "/employee/notifications"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <Bell />
            </span>

            <span>Notifications</span>
          </a>

          <a
            href="/employee/profile"
            className={`employee-sidebar-link ${
              currentPath === "/employee/profile"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <UserRound />
            </span>

            <span>Profile</span>
          </a>

          <a
            href="/employee/settings"
            className={`employee-sidebar-link ${
              currentPath === "/employee/settings"
                ? "active"
                : ""
            }`}
          >
            <span className="employee-sidebar-link-icon">
              <Settings />
            </span>

            <span>Settings</span>
          </a>
        </div>

      </nav>

      {/* BOTTOM */}
      <div className="employee-sidebar-bottom">

        <div className="employee-sidebar-user">
          <div className="employee-sidebar-user-avatar">
            F
          </div>

          <div className="employee-sidebar-user-info">
            <strong>Fahad</strong>
            <span>Employee Workspace</span>
          </div>
        </div>

        <a
          href="/employee/login"
          className="employee-sidebar-logout"
        >
          <span className="employee-sidebar-logout-icon">
            <LogOut />
          </span>

          <span>Logout</span>
        </a>

      </div>
    </aside>
  );
}

export default EmployeeSidebar;