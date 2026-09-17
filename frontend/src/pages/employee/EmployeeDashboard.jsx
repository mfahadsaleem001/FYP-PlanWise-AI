import {
  FolderKanban,
  ListTodo,
  Clock3,
  CheckCircle2,
  ArrowRight,
  CalendarDays,
  CircleDot,
  MessageSquare,
} from "lucide-react";

import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  return (
    <div className="employee-dashboard-page">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <section className="employee-dashboard-header">
        <div>
          <span className="employee-dashboard-eyebrow">
            EMPLOYEE WORKSPACE
          </span>

          <h1>Good morning, Fahad</h1>

          <p>
            Here is a quick overview of your assigned work and
            upcoming responsibilities.
          </p>
        </div>

        <div className="employee-dashboard-date">
          <CalendarDays />
          <span>September 17, 2026</span>
        </div>
      </section>


      {/* ======================================================
          SUMMARY CARDS
          ====================================================== */}

      <section className="employee-dashboard-summary">

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            <FolderKanban />
          </div>

          <div className="employee-summary-content">
            <span>ACTIVE PROJECTS</span>
            <strong>3</strong>
            <p>Currently assigned</p>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            <ListTodo />
          </div>

          <div className="employee-summary-content">
            <span>PENDING TASKS</span>
            <strong>8</strong>
            <p>Tasks requiring attention</p>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            <Clock3 />
          </div>

          <div className="employee-summary-content">
            <span>DUE SOON</span>
            <strong>3</strong>
            <p>Due within 7 days</p>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon">
            <CheckCircle2 />
          </div>

          <div className="employee-summary-content">
            <span>COMPLETED</span>
            <strong>24</strong>
            <p>Tasks completed</p>
          </div>
        </div>

      </section>


      {/* ======================================================
          PROJECTS + TASKS
          ====================================================== */}

      <section className="employee-dashboard-grid">

        <div className="employee-dashboard-card employee-projects-card">

          <div className="employee-card-header">
            <div>
              <span className="employee-section-eyebrow">
                CURRENT WORK
              </span>

              <h2>My Active Projects</h2>

              <p>
                Projects currently assigned to you.
              </p>
            </div>

            <a
              href="/employee/projects"
              className="employee-card-link"
            >
              View all
              <ArrowRight />
            </a>
          </div>


          <div className="employee-project-list">

            <div className="employee-project-item">
              <div className="employee-project-main">
                <div className="employee-project-icon">
                  <FolderKanban />
                </div>

                <div>
                  <strong>AI Learning Platform</strong>
                  <span>AI / Machine Learning</span>
                </div>
              </div>

              <div className="employee-project-status">
                <span className="status-dot active"></span>
                In Progress
              </div>
            </div>


            <div className="employee-project-item">
              <div className="employee-project-main">
                <div className="employee-project-icon">
                  <FolderKanban />
                </div>

                <div>
                  <strong>E-Commerce Marketplace</strong>
                  <span>E-Commerce</span>
                </div>
              </div>

              <div className="employee-project-status">
                <span className="status-dot active"></span>
                In Progress
              </div>
            </div>


            <div className="employee-project-item">
              <div className="employee-project-main">
                <div className="employee-project-icon">
                  <FolderKanban />
                </div>

                <div>
                  <strong>Company Management Portal</strong>
                  <span>Web Application</span>
                </div>
              </div>

              <div className="employee-project-status">
                <span className="status-dot planning"></span>
                Planning
              </div>
            </div>

          </div>

        </div>


        <div className="employee-dashboard-card employee-tasks-card">

          <div className="employee-card-header">
            <div>
              <span className="employee-section-eyebrow">
                TASK MANAGEMENT
              </span>

              <h2>Upcoming Tasks</h2>

              <p>
                Your next tasks and deadlines.
              </p>
            </div>

            <a
              href="/employee/tasks"
              className="employee-card-link"
            >
              View all
              <ArrowRight />
            </a>
          </div>


          <div className="employee-task-list">

            <div className="employee-task-item">
              <div className="employee-task-indicator">
                <CircleDot />
              </div>

              <div className="employee-task-content">
                <strong>
                  Implement authentication API
                </strong>

                <span>
                  AI Learning Platform
                </span>
              </div>

              <div className="employee-task-deadline">
                <span>Due</span>
                <strong>Sep 19</strong>
              </div>
            </div>


            <div className="employee-task-item">
              <div className="employee-task-indicator">
                <CircleDot />
              </div>

              <div className="employee-task-content">
                <strong>
                  Database integration
                </strong>

                <span>
                  E-Commerce Marketplace
                </span>
              </div>

              <div className="employee-task-deadline">
                <span>Due</span>
                <strong>Sep 21</strong>
              </div>
            </div>


            <div className="employee-task-item">
              <div className="employee-task-indicator">
                <CircleDot />
              </div>

              <div className="employee-task-content">
                <strong>
                  Review API documentation
                </strong>

                <span>
                  Company Management Portal
                </span>
              </div>

              <div className="employee-task-deadline">
                <span>Due</span>
                <strong>Sep 23</strong>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ACTIVITY + WORK SUMMARY
          ====================================================== */}

      <section className="employee-dashboard-bottom-grid">

        <div className="employee-dashboard-card">

          <div className="employee-card-header">
            <div>
              <span className="employee-section-eyebrow">
                ACTIVITY
              </span>

              <h2>Recent Activity</h2>

              <p>
                Latest updates related to your work.
              </p>
            </div>
          </div>


          <div className="employee-activity-list">

            <div className="employee-activity-item">
              <div className="employee-activity-marker">
                <CheckCircle2 />
              </div>

              <div>
                <strong>
                  Task marked as completed
                </strong>

                <span>
                  API endpoint implementation
                </span>

                <small>
                  2 hours ago
                </small>
              </div>
            </div>


            <div className="employee-activity-item">
              <div className="employee-activity-marker">
                <FolderKanban />
              </div>

              <div>
                <strong>
                  Added to a project
                </strong>

                <span>
                  Company Management Portal
                </span>

                <small>
                  Yesterday
                </small>
              </div>
            </div>


            <div className="employee-activity-item">
              <div className="employee-activity-marker">
                <MessageSquare />
              </div>

              <div>
                <strong>
                  New project message
                </strong>

                <span>
                  Admin sent you a project update
                </span>

                <small>
                  2 days ago
                </small>
              </div>
            </div>

          </div>

        </div>


        <div className="employee-dashboard-card employee-work-summary">

          <div className="employee-card-header">
            <div>
              <span className="employee-section-eyebrow">
                WORK OVERVIEW
              </span>

              <h2>Work Summary</h2>

              <p>
                Your current workload overview.
              </p>
            </div>
          </div>


          <div className="employee-work-summary-list">

            <div className="employee-work-summary-row">
              <span>Assigned tasks</span>
              <strong>32</strong>
            </div>

            <div className="employee-work-summary-row">
              <span>Completed tasks</span>
              <strong>24</strong>
            </div>

            <div className="employee-work-summary-row">
              <span>In progress</span>
              <strong>5</strong>
            </div>

            <div className="employee-work-summary-row">
              <span>Pending</span>
              <strong>3</strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default EmployeeDashboard;