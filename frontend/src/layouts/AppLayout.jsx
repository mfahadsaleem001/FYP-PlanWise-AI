import AppSidebar from "../components/common/AppSidebar";
import "./AppLayout.css";

function AppLayout({ children }) {
  return (
    <div className="app-layout">

      <AppSidebar />

      <div className="app-main">

        <header className="app-topbar">

          <div className="app-topbar-title">
            <span>PLANWISE AI</span>
            <h2>Project Planning Workspace</h2>
          </div>

          <div className="app-topbar-actions">

            <button
              className="topbar-icon-btn"
              title="Notifications"
            >
              🔔
            </button>

            <div className="topbar-user">
              <div className="topbar-avatar">
                F
              </div>

              <div className="topbar-user-info">
                <strong>Fahad</strong>
                <span>Project Manager</span>
              </div>
            </div>

          </div>

        </header>

        <main className="app-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AppLayout;