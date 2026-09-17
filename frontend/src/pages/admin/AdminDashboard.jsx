import {
  Users,
  FolderKanban,
  Calculator,
  UserCog,
  UserCheck,
  AlertTriangle,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import "./AdminDashboard.css";

function AdminDashboard() {
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
            Monitor users, projects, resources, estimation activity,
            and overall PlanWise system performance.
          </p>

        </div>

        <button
          className="admin-dashboard-action"
          onClick={() => {
            window.location.href = "/admin/activity";
          }}
        >
          <Activity size={16} />
          View Activity
        </button>

      </div>


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
            248
          </div>

          <div className="admin-stat-footer">

            <span className="admin-stat-positive">
              +12
            </span>

            <span>
              this month
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
            86
          </div>

          <div className="admin-stat-footer">

            <span className="admin-stat-positive">
              18
            </span>

            <span>
              active projects
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
            412
          </div>

          <div className="admin-stat-footer">

            <span className="admin-stat-positive">
              +34
            </span>

            <span>
              this month
            </span>

          </div>

        </div>


        {/* RESOURCES */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <UserCog size={19} />
            </div>

            <span className="admin-stat-label">
              RESOURCES
            </span>

          </div>

          <div className="admin-stat-value">
            64
          </div>

          <div className="admin-stat-footer">

            <span className="admin-stat-positive">
              41
            </span>

            <span>
              currently assigned
            </span>

          </div>

        </div>


        {/* AVAILABLE */}

        <div className="admin-stat-card">

          <div className="admin-stat-card-top">

            <div className="admin-stat-icon">
              <UserCheck size={19} />
            </div>

            <span className="admin-stat-label">
              AVAILABLE
            </span>

          </div>

          <div className="admin-stat-value">
            23
          </div>

          <div className="admin-stat-footer">

            <span>
              resource capacity
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
            7
          </div>

          <div className="admin-stat-footer">

            <span className="admin-stat-danger">
              requires attention
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
                window.location.href = "/admin/projects";
              }}
            >
              View Projects
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-project-bars">

            <div className="admin-project-bar-row">

              <div className="admin-project-bar-label">

                <span>
                  Web Application
                </span>

                <strong>
                  32
                </strong>

              </div>

              <div className="admin-project-bar">
                <span style={{ width: "78%" }} />
              </div>

            </div>


            <div className="admin-project-bar-row">

              <div className="admin-project-bar-label">

                <span>
                  AI / Machine Learning
                </span>

                <strong>
                  21
                </strong>

              </div>

              <div className="admin-project-bar">
                <span style={{ width: "58%" }} />
              </div>

            </div>


            <div className="admin-project-bar-row">

              <div className="admin-project-bar-label">

                <span>
                  Mobile Application
                </span>

                <strong>
                  15
                </strong>

              </div>

              <div className="admin-project-bar">
                <span style={{ width: "43%" }} />
              </div>

            </div>


            <div className="admin-project-bar-row">

              <div className="admin-project-bar-label">

                <span>
                  SaaS
                </span>

                <strong>
                  10
                </strong>

              </div>

              <div className="admin-project-bar">
                <span style={{ width: "31%" }} />
              </div>

            </div>


            <div className="admin-project-bar-row">

              <div className="admin-project-bar-label">

                <span>
                  Other
                </span>

                <strong>
                  8
                </strong>

              </div>

              <div className="admin-project-bar">
                <span style={{ width: "24%" }} />
              </div>

            </div>

          </div>

        </section>


        {/* ========================================================
            RESOURCE SUMMARY
            ======================================================== */}

        <section className="admin-dashboard-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-eyebrow">
                RESOURCE CAPACITY
              </span>

              <h2>
                Resource Summary
              </h2>

            </div>

            <button
              className="admin-panel-link"
              onClick={() => {
                window.location.href = "/admin/employees";
              }}
            >
              Manage
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-resource-summary">

            <div className="admin-resource-total">

              <strong>
                64
              </strong>

              <span>
                Total Resources
              </span>

            </div>


            <div className="admin-resource-row">

              <span>
                Available
              </span>

              <strong>
                23
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Assigned
              </span>

              <strong>
                41
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Partial Capacity
              </span>

              <strong>
                9
              </strong>

            </div>


            <div className="admin-resource-row">

              <span>
                Resource Gaps
              </span>

              <strong className="admin-stat-danger">
                6
              </strong>

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
                window.location.href = "/admin/activity";
              }}
            >
              View All
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="admin-activity-list">

            <div className="admin-activity-item">

              <div className="admin-activity-icon">
                <Users size={15} />
              </div>

              <div className="admin-activity-content">

                <strong>
                  New user registered
                </strong>

                <span>
                  Account registration completed
                </span>

              </div>

              <time>
                12 min
              </time>

            </div>


            <div className="admin-activity-item">

              <div className="admin-activity-icon">
                <Calculator size={15} />
              </div>

              <div className="admin-activity-content">

                <strong>
                  Estimate generated
                </strong>

                <span>
                  New project estimation completed
                </span>

              </div>

              <time>
                28 min
              </time>

            </div>


            <div className="admin-activity-item">

              <div className="admin-activity-icon">
                <UserCog size={15} />
              </div>

              <div className="admin-activity-content">

                <strong>
                  Resource assigned
                </strong>

                <span>
                  Backend Developer assigned to project
                </span>

              </div>

              <time>
                1 hr
              </time>

            </div>


            <div className="admin-activity-item">

              <div className="admin-activity-icon admin-activity-danger">
                <AlertTriangle size={15} />
              </div>

              <div className="admin-activity-content">

                <strong>
                  High-risk project detected
                </strong>

                <span>
                  Resource capacity requires review
                </span>

              </div>

              <time>
                2 hrs
              </time>

            </div>

          </div>

        </section>


        {/* ========================================================
            SYSTEM STATUS
            ======================================================== */}

        <section className="admin-dashboard-panel">

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

            <div className="admin-status-row">

              <div>

                <strong>
                  API Service
                </strong>

                <span>
                  Core application services
                </span>

              </div>

              <span className="admin-status-badge">
                Operational
              </span>

            </div>


            <div className="admin-status-row">

              <div>

                <strong>
                  Database
                </strong>

                <span>
                  PostgreSQL connection
                </span>

              </div>

              <span className="admin-status-badge">
                Operational
              </span>

            </div>


            <div className="admin-status-row">

              <div>

                <strong>
                  ML Model
                </strong>

                <span>
                  Current production model
                </span>

              </div>

              <span className="admin-status-badge">
                Active
              </span>

            </div>


            <div className="admin-status-row">

              <div>

                <strong>
                  Gemini Service
                </strong>

                <span>
                  AI recommendation service
                </span>

              </div>

              <span className="admin-status-badge">
                Connected
              </span>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default AdminDashboard;