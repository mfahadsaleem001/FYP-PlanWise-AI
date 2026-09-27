import { useEffect, useState } from "react";

import {
  Users,
  UserCog,
  FolderKanban,
  Calculator,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import "./AdminDashboard.css";


function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(
          "planwise_access_token"
        );

        if (!token) {
          setError(
            "Authentication required. Please log in again."
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem(
            "planwise_access_token"
          );

          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You do not have permission to access the admin dashboard."
          );
        }

        if (!response.ok) {
          throw new Error(
            "Failed to load dashboard data."
          );
        }

        const data = await response.json();

        console.log(
          "Admin dashboard data:",
          data
        );

        setDashboardData(data);
      } catch (err) {
        console.error(
          "Admin dashboard error:",
          err
        );

        setError(
          err.message ||
            "Something went wrong while loading the dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);


  const stats = dashboardData?.stats;

  const projectTypeDistribution =
    dashboardData?.project_type_distribution || [];

  const recentProjects =
    dashboardData?.recent_projects || [];

  const employeeResourceSummary =
    dashboardData?.employee_resource_summary;

  const recentActivity =
    dashboardData?.recent_activity || [];

  const systemStatus =
    dashboardData?.system_status || [];


  const formatProjectDate = (dateString) => {
    if (!dateString) {
      return "Date unavailable";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  const formatProjectStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    return status.replaceAll("_", " ");
  };


  return (
    <div className="admin-dashboard">

      {/* ============================================================
          PAGE HEADER
          ============================================================ */}

      <div className="admin-dashboard-header">

        <div>
          <span className="admin-dashboard-eyebrow">
            SYSTEM OVERVIEW
          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Monitor users, employees, projects, resources,
            estimation activity, and overall PlanWise
            system performance.
          </p>
        </div>

        <button
          className="admin-dashboard-action"
          onClick={() => {
            window.location.href =
              "/admin/activity";
          }}
        >
          <Activity size={16} />
          View Activity
        </button>

      </div>


      {/* ============================================================
          ERROR MESSAGE
          ============================================================ */}

      {error && (
        <div className="admin-dashboard-error">
          {error}
        </div>
      )}


      {/* ============================================================
          OVERVIEW CARDS
          ============================================================ */}

      <div className="admin-stat-grid">

        {/* USERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <Users size={19} />
            </div>

            <span className="admin-stat-label">
              USERS
            </span>

          </div>

          <div className="admin-stat-value">
            {loading
              ? "—"
              : stats?.users ?? 0}
          </div>

          <div className="admin-stat-footer">
            <span>
              registered users
            </span>
          </div>

        </div>


        {/* EMPLOYEES */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <UserCog size={19} />
            </div>

            <span className="admin-stat-label">
              EMPLOYEES
            </span>

          </div>

          <div className="admin-stat-value">
            {loading
              ? "—"
              : stats?.employees ?? 0}
          </div>

          <div className="admin-stat-footer">
            <span>
              employee accounts
            </span>
          </div>

        </div>


        {/* PROJECTS */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <FolderKanban size={19} />
            </div>

            <span className="admin-stat-label">
              PROJECTS
            </span>

          </div>

          <div className="admin-stat-value">
            {loading
              ? "—"
              : stats?.projects ?? 0}
          </div>

          <div className="admin-stat-footer">

            <span>
              {loading
                ? "—"
                : stats?.draft_projects ?? 0}
            </span>

            <span>
              draft projects
            </span>

          </div>

        </div>


        {/* ESTIMATES */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <Calculator size={19} />
            </div>

            <span className="admin-stat-label">
              ESTIMATES
            </span>

          </div>

          <div className="admin-stat-value">
            —
          </div>

          <div className="admin-stat-footer">
            <span>
              estimation module not connected
            </span>
          </div>

        </div>


        {/* RESOURCES */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <UserCheck size={19} />
            </div>

            <span className="admin-stat-label">
              RESOURCES
            </span>

          </div>

          <div className="admin-stat-value">
            {loading
              ? "—"
              : employeeResourceSummary?.total ?? 0}
          </div>

          <div className="admin-stat-footer">

            <span>
              {loading
                ? "—"
                : employeeResourceSummary?.available ?? 0}
            </span>

            <span>
              available
            </span>

          </div>

        </div>


        {/* HIGH RISK */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon admin-stat-icon-danger">
              <AlertTriangle size={19} />
            </div>

            <span className="admin-stat-label">
              HIGH RISK
            </span>

          </div>

          <div className="admin-stat-value">
            —
          </div>

          <div className="admin-stat-footer">
            <span>
              risk analysis not connected
            </span>
          </div>

        </div>

      </div>


      {/* ============================================================
          MAIN DASHBOARD GRID
          ============================================================ */}

      <div className="admin-dashboard-grid">


        {/* ========================================================
            PROJECT OVERVIEW
            ======================================================== */}

        <section className="admin-dashboard-panel admin-project-overview">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                PROJECT PORTFOLIO
              </span>

              <h2>
                Project Overview
              </h2>

            </div>

            <button
              className="admin-panel-link"
              onClick={() => {
                window.location.href =
                  "/admin/projects";
              }}
            >
              View Projects
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-project-bars">

            {loading ? (

              <div className="admin-project-empty">

                <Clock3 size={18} />

                <span>
                  Loading project data...
                </span>

              </div>

            ) : projectTypeDistribution.length === 0 ? (

              <div className="admin-project-empty">

                <FolderKanban size={18} />

                <span>
                  No project data available.
                </span>

              </div>

            ) : (

              projectTypeDistribution.map(
                (item) => {

                  const totalProjects =
                    stats?.projects || 0;

                  const percentage =
                    totalProjects > 0
                      ? Math.round(
                          (item.count /
                            totalProjects) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      className="admin-project-bar-row"
                      key={item.project_type}
                    >

                      <div className="admin-project-bar-label">

                        <span>
                          {item.project_type}
                        </span>

                        <strong>
                          {item.count}
                        </strong>

                      </div>


                      <div className="admin-project-bar">

                        <span
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )

            )}

          </div>


          <div className="admin-project-overview-footer">

            <div>

              <span>
                Total portfolio
              </span>

              <strong>
                {stats?.projects ?? 0}
              </strong>

            </div>


            <div>

              <span>
                Project categories
              </span>

              <strong>
                {projectTypeDistribution.length}
              </strong>

            </div>

          </div>

        </section>


        {/* ========================================================
            RECENT PROJECTS
            ======================================================== */}

        <section className="admin-dashboard-panel admin-recent-projects">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                PROJECT ACTIVITY
              </span>

              <h2>
                Recent Projects
              </h2>

            </div>

            <button
              className="admin-panel-link"
              onClick={() => {
                window.location.href =
                  "/admin/projects";
              }}
            >
              View All
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-recent-project-list">

            {loading ? (

              <div className="admin-project-empty">

                <Clock3 size={18} />

                <span>
                  Loading recent projects...
                </span>

              </div>

            ) : recentProjects.length === 0 ? (

              <div className="admin-project-empty">

                <FolderKanban size={18} />

                <span>
                  No projects found.
                </span>

              </div>

            ) : (

              recentProjects.map(
                (project) => (

                  <div
                    className="admin-recent-project-item"
                    key={project.id}
                  >

                    <div className="admin-recent-project-main">

                      <div className="admin-recent-project-icon">
                        <FolderKanban size={16} />
                      </div>


                      <div className="admin-recent-project-info">

                        <strong
                          title={project.name}
                        >
                          {project.name}
                        </strong>

                        <span>
                          {project.project_type}
                        </span>

                      </div>

                    </div>


                    <div className="admin-recent-project-meta">

                      <span
                        className={`admin-project-status admin-project-status-${project.status}`}
                      >
                        {formatProjectStatus(
                          project.status
                        )}
                      </span>


                      <div className="admin-recent-project-owner">

                        <span>
                          {project.owner_name}
                        </span>

                        <small>
                          {formatProjectDate(
                            project.created_at
                          )}
                        </small>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </section>


        {/* ========================================================
            EMPLOYEE & RESOURCE SUMMARY
            ======================================================== */}

        <section className="admin-dashboard-panel admin-resource-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                TEAM CAPACITY
              </span>

              <h2>
                Employee & Resource Summary
              </h2>

            </div>

            <button
              className="admin-panel-link"
              onClick={() => {
                window.location.href =
                  "/admin/employees";
              }}
            >
              Manage
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-resource-summary">

            <div className="admin-resource-total">

              <strong>
                {loading
                  ? "—"
                  : employeeResourceSummary?.total ?? 0}
              </strong>

              <span>
                Total Employees
              </span>

            </div>


            <div className="admin-resource-row">

              <span>
                Available
              </span>

              <strong>
                {loading
                  ? "—"
                  : employeeResourceSummary?.available ?? 0}
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Partially Available
              </span>

              <strong>
                {loading
                  ? "—"
                  : employeeResourceSummary?.partially_available ?? 0}
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Unavailable
              </span>

              <strong>
                {loading
                  ? "—"
                  : employeeResourceSummary?.unavailable ?? 0}
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Weekly Capacity
              </span>

              <strong>
                {loading
                  ? "—"
                  : employeeResourceSummary?.total_capacity_hours ?? 0}

                {!loading && " hrs"}
              </strong>

            </div>

          </div>


          <div className="admin-resource-visual">

            <div className="admin-resource-visual-header">

              <span>
                Resource utilization
              </span>

              <strong>
                —
              </strong>

            </div>


            <div className="admin-resource-progress">

              <span
                style={{
                  width: "0%",
                }}
              />

            </div>


            <div className="admin-resource-visual-footer">

              <span>
                Assignment data not connected
              </span>

              <span>
                Capacity tracked
              </span>

            </div>

          </div>

        </section>


        {/* ========================================================
            RECENT ACTIVITY
            ======================================================== */}

        <section className="admin-dashboard-panel admin-recent-activity">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                SYSTEM ACTIVITY
              </span>

              <h2>
                Recent Activity
              </h2>

            </div>

            <button
              className="admin-panel-link"
              onClick={() => {
                window.location.href =
                  "/admin/activity";
              }}
            >
              View All
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-activity-list">

            {loading ? (

              <div className="admin-project-empty">

                <Clock3 size={18} />

                <span>
                  Loading recent activity...
                </span>

              </div>

            ) : recentActivity.length === 0 ? (

              <div className="admin-project-empty">

                <Activity size={18} />

                <span>
                  No recent activity.
                </span>

              </div>

            ) : (

              recentActivity.map(
                (activity) => (

                  <div
                    className="admin-activity-item"
                    key={activity.id}
                  >

                    <div className="admin-activity-icon">
                      <Activity size={15} />
                    </div>


                    <div className="admin-activity-content">

                      <strong>
                        {formatProjectStatus(
                          activity.action
                        )}
                      </strong>

                      <span>
                        {activity.description}
                      </span>

                    </div>


                    <time>
                      {formatProjectDate(
                        activity.created_at
                      )}
                    </time>

                  </div>

                )
              )

            )}

          </div>

        </section>


        {/* ========================================================
            SYSTEM STATUS
            ======================================================== */}

        <section className="admin-dashboard-panel admin-system-status-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                SYSTEM HEALTH
              </span>

              <h2>
                System Status
              </h2>

            </div>

          </div>


          <div className="admin-system-status">

            {loading ? (

              <div className="admin-project-empty">

                <Clock3 size={18} />

                <span>
                  Checking system status...
                </span>

              </div>

            ) : systemStatus.length === 0 ? (

              <div className="admin-project-empty">

                <Activity size={18} />

                <span>
                  System status unavailable.
                </span>

              </div>

            ) : (

              systemStatus.map(
                (item) => (

                  <div
                    className="admin-status-row"
                    key={item.name}
                  >

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.message}
                      </span>

                    </div>


                    <span
                      className={`admin-status-badge admin-status-${item.status}`}
                    >
                      {formatProjectStatus(
                        item.status
                      )}
                    </span>

                  </div>

                )
              )

            )}

          </div>

        </section>

      </div>

    </div>
  );
}


export default AdminDashboard;