import {
  LayoutDashboard,
  Users,
  UserRoundCog,
  FolderKanban,
  ClipboardList,
  Activity,
  BrainCircuit,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function AdminSidebar() {
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("planwise-admin-auth");
    sessionStorage.removeItem("planwise-admin-auth");

    window.location.replace("/admin/login");
  };

  return (
    <aside className="app-sidebar">
      {/* BRAND */}
      <div className="sidebar-brand">
        <a href="/admin/dashboard" className="sidebar-logo">
          <span className="sidebar-logo-mark">P</span>

          <span className="sidebar-logo-text">
            PlanWise <span>AI</span>
          </span>
        </a>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-navigation">
        {/* MAIN */}
        <div className="sidebar-group">
          <span className="sidebar-group-title">MAIN</span>

          <a
            href="/admin/dashboard"
            className={`sidebar-link ${
              currentPath === "/admin/dashboard" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <LayoutDashboard />
            </span>
            <span>Dashboard</span>
          </a>
        </div>

        {/* MANAGEMENT */}
        <div className="sidebar-group">
          <span className="sidebar-group-title">MANAGEMENT</span>

          <a
            href="/admin/users"
            className={`sidebar-link ${
              currentPath === "/admin/users" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <Users />
            </span>
            <span>Users</span>
          </a>

          <a
            href="/admin/employees"
            className={`sidebar-link ${
              currentPath === "/admin/employees" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <UserRoundCog />
            </span>
            <span>Employees & Resources</span>
          </a>

          <a
            href="/admin/projects"
            className={`sidebar-link ${
              currentPath === "/admin/projects" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <FolderKanban />
            </span>
            <span>Projects</span>
          </a>

          <a
            href="/admin/project-requests"
            className={`sidebar-link ${
              currentPath === "/admin/project-requests" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <ClipboardList />
            </span>
            <span>Project Requests</span>
          </a>
        </div>

        {/* INTELLIGENCE */}
        <div className="sidebar-group">
          <span className="sidebar-group-title">INTELLIGENCE</span>

          <a
            href="/admin/models"
            className={`sidebar-link ${
              currentPath === "/admin/models" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <BrainCircuit />
            </span>
            <span>Model Monitoring</span>
          </a>
        </div>

        {/* SYSTEM */}
        <div className="sidebar-group">
          <span className="sidebar-group-title">SYSTEM</span>

          <a
            href="/admin/activity"
            className={`sidebar-link ${
              currentPath === "/admin/activity" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <Activity />
            </span>
            <span>Activity Logs</span>
          </a>

          <a
            href="/admin/notifications"
            className={`sidebar-link ${
              currentPath === "/admin/notifications" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <Bell />
            </span>
            <span>Notifications</span>
          </a>

          <a
            href="/admin/settings"
            className={`sidebar-link ${
              currentPath === "/admin/settings" ? "active" : ""
            }`}
          >
            <span className="sidebar-link-icon">
              <Settings />
            </span>
            <span>Settings</span>
          </a>
        </div>
      </nav>

      {/* ADMIN AREA */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">A</div>

          <div className="sidebar-user-info">
            <strong>Admin</strong>
            <span>PlanWise Administration</span>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span className="logout-icon">
            <LogOut />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;