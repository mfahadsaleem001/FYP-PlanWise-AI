import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  TriangleAlert,
  Lightbulb,
  FileText,
  Bell,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

function AppSidebar() {

  // Get the current page URL
  const currentPath = window.location.pathname;

  return (
    <aside className="app-sidebar">

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="sidebar-brand">

        <a
          href="/app/dashboard"
          className="sidebar-logo"
        >

          <span className="sidebar-logo-mark">
            P
          </span>

          <span className="sidebar-logo-text">
            PlanWise <span>AI</span>
          </span>

        </a>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="sidebar-navigation">

        {/* ===================================================
            MAIN
        =================================================== */}

        <div className="sidebar-group">

          <span className="sidebar-group-title">
            MAIN
          </span>


          {/* DASHBOARD */}

          <a
            href="/app/dashboard"
            className={`sidebar-link ${
              currentPath === "/app/dashboard"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <LayoutDashboard />
            </span>

            <span>
              Dashboard
            </span>

          </a>


          {/* NEW ESTIMATE */}

          <a
            href="/app/estimate/new"
            className={`sidebar-link ${
              currentPath === "/app/estimate/new"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <PlusCircle />
            </span>

            <span>
              New Estimate
            </span>

          </a>


          {/* PROJECTS */}

          <a
            href="/app/projects"
            className={`sidebar-link ${
              currentPath === "/app/projects"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <FolderKanban />
            </span>

            <span>
              Projects
            </span>

          </a>

        </div>


        {/* ===================================================
            INSIGHTS
        =================================================== */}

        <div className="sidebar-group">

          <span className="sidebar-group-title">
            INSIGHTS
          </span>


          {/* RISKS */}

          <a
            href="/app/risks"
            className={`sidebar-link ${
              currentPath === "/app/risks"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <TriangleAlert />
            </span>

            <span>
              Risks
            </span>

          </a>


          {/* RECOMMENDATIONS */}

          <a
            href="/app/recommendations"
            className={`sidebar-link ${
              currentPath === "/app/recommendations"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <Lightbulb />
            </span>

            <span>
              Recommendations
            </span>

          </a>


          {/* REPORTS */}

          <a
            href="/app/reports"
            className={`sidebar-link ${
              currentPath === "/app/reports"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <FileText />
            </span>

            <span>
              Reports
            </span>

          </a>

        </div>


        {/* ===================================================
            ACCOUNT
        =================================================== */}

        <div className="sidebar-group">

          <span className="sidebar-group-title">
            ACCOUNT
          </span>


          {/* NOTIFICATIONS */}

          <a
            href="/app/notifications"
            className={`sidebar-link ${
              currentPath === "/app/notifications"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <Bell />
            </span>

            <span>
              Notifications
            </span>

          </a>


          {/* PROFILE */}

          <a
            href="/app/profile"
            className={`sidebar-link ${
              currentPath === "/app/profile"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <UserRound />
            </span>

            <span>
              Profile
            </span>

          </a>


          {/* SETTINGS */}

          <a
            href="/app/settings"
            className={`sidebar-link ${
              currentPath === "/app/settings"
                ? "active"
                : ""
            }`}
          >

            <span className="sidebar-link-icon">
              <Settings />
            </span>

            <span>
              Settings
            </span>

          </a>

        </div>

      </nav>


      {/* =====================================================
          USER AREA
      ===================================================== */}

      <div className="sidebar-bottom">

        {/* USER */}

        <div className="sidebar-user">

          <div className="sidebar-user-avatar">
            F
          </div>

          <div className="sidebar-user-info">

            <strong>
              Fahad
            </strong>

            <span>
              Personal Workspace
            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <a
          href="/auth/signin"
          className="sidebar-logout"
        >

          <span className="logout-icon">
            <LogOut />
          </span>

          <span>
            Logout
          </span>

        </a>

      </div>

    </aside>
  );
}

export default AppSidebar;
