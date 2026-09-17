import "./Dashboard.css";

function Dashboard() {

  return (

    <div className="dashboard-page">

      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section className="dashboard-header">

        <div>

          <span className="dashboard-label">
            PROJECT OVERVIEW
          </span>

          <h1>
            Welcome back.
          </h1>

          <p>
            Review your project estimates, planning insights,
            and recent activity from one place.
          </p>

        </div>

        <button
          type="button"
          className="dashboard-primary-btn"
          onClick={() => {
            window.location.href = "/app/estimate/new";
          }}
        >
          + Create New Estimate
        </button>

      </section>



      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>Total Projects</span>
          <strong>12</strong>
          <small>Projects analyzed</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Total Estimates</span>
          <strong>18</strong>
          <small>Estimates generated</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Average Duration</span>
          <strong>4.8</strong>
          <small>Months per project</small>
        </div>

        <div className="dashboard-stat-card">
          <span>Average Complexity</span>
          <strong>Medium</strong>
          <small>Across analyzed projects</small>
        </div>

      </section>



      {/* =====================================================
          ANALYTICS
      ===================================================== */}

      <section className="dashboard-analytics">

        <div className="dashboard-section-heading">

          <div>

            <span className="dashboard-label">
              ANALYTICS
            </span>

            <h2>
              Project estimation overview
            </h2>

          </div>

          <span className="dashboard-period">
            Last 6 projects
          </span>

        </div>



        <div className="dashboard-chart-grid">

          {/* ESTIMATION CHART */}

          <div className="dashboard-chart-card">

            <div className="chart-card-header">

              <div>

                <h3>
                  Estimated Effort
                </h3>

                <p>
                  Effort required across recent projects
                </p>

              </div>

            </div>


            <div className="chart-placeholder">

              <div className="chart-bars">

                <div
                  className="chart-bar"
                  style={{ height: "45%" }}
                >
                  <span>1</span>
                </div>

                <div
                  className="chart-bar"
                  style={{ height: "65%" }}
                >
                  <span>2</span>
                </div>

                <div
                  className="chart-bar"
                  style={{ height: "52%" }}
                >
                  <span>3</span>
                </div>

                <div
                  className="chart-bar"
                  style={{ height: "80%" }}
                >
                  <span>4</span>
                </div>

                <div
                  className="chart-bar"
                  style={{ height: "60%" }}
                >
                  <span>5</span>
                </div>

                <div
                  className="chart-bar"
                  style={{ height: "72%" }}
                >
                  <span>6</span>
                </div>

              </div>

            </div>

          </div>



          {/* PROJECT TYPES */}

          <div className="dashboard-chart-card">

            <div className="chart-card-header">

              <div>

                <h3>
                  Project Types
                </h3>

                <p>
                  Distribution of analyzed projects
                </p>

              </div>

            </div>


            <div className="project-type-list">

              <div className="project-type-item">

                <span>
                  Web Application
                </span>

                <strong>
                  42%
                </strong>

              </div>


              <div className="project-type-item">

                <span>
                  AI / Machine Learning
                </span>

                <strong>
                  25%
                </strong>

              </div>


              <div className="project-type-item">

                <span>
                  Mobile Application
                </span>

                <strong>
                  18%
                </strong>

              </div>


              <div className="project-type-item">

                <span>
                  Other
                </span>

                <strong>
                  15%
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          RECENT PROJECTS
      ===================================================== */}

      <section className="dashboard-projects">

        <div className="dashboard-section-heading">

          <div>

            <span className="dashboard-label">
              RECENT ACTIVITY
            </span>

            <h2>
              Recent projects
            </h2>

          </div>

          <a href="/app/projects">
            View all →
          </a>

        </div>



        <div className="dashboard-project-table">

          <div className="project-table-header">

            <span>
              Project
            </span>

            <span>
              Type
            </span>

            <span>
              Complexity
            </span>

            <span>
              Estimated Duration
            </span>

          </div>



          <div className="project-table-row">

            <div>

              <strong>
                AI Learning Platform
              </strong>

              <small>
                Updated recently
              </small>

            </div>

            <span>
              AI / ML
            </span>

            <span className="complexity-badge medium">
              Medium
            </span>

            <span>
              5.2 Months
            </span>

          </div>



          <div className="project-table-row">

            <div>

              <strong>
                E-Commerce Platform
              </strong>

              <small>
                Updated recently
              </small>

            </div>

            <span>
              Web Application
            </span>

            <span className="complexity-badge high">
              High
            </span>

            <span>
              6.5 Months
            </span>

          </div>



          <div className="project-table-row">

            <div>

              <strong>
                Fitness Mobile App
              </strong>

              <small>
                Updated recently
              </small>

            </div>

            <span>
              Mobile Application
            </span>

            <span className="complexity-badge low">
              Low
            </span>

            <span>
              3.4 Months
            </span>

          </div>

        </div>

      </section>



      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="dashboard-quick-actions">

        <div className="dashboard-section-heading">

          <div>

            <span className="dashboard-label">
              QUICK ACCESS
            </span>

            <h2>
              Continue planning
            </h2>

          </div>

        </div>



        <div className="quick-action-grid">

          <a
            href="/app/estimate/new"
            className="quick-action-card"
          >

            <span className="quick-action-icon">
              +
            </span>

            <div>

              <h3>
                New Estimate
              </h3>

              <p>
                Analyze a new software project.
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </a>



          <a
            href="/app/risks"
            className="quick-action-card"
          >

            <span className="quick-action-icon">
              !
            </span>

            <div>

              <h3>
                Project Risks
              </h3>

              <p>
                Review identified project risks.
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </a>



          <a
            href="/app/recommendations"
            className="quick-action-card"
          >

            <span className="quick-action-icon">
              ✦
            </span>

            <div>

              <h3>
                Recommendations
              </h3>

              <p>
                Explore planning recommendations.
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </a>

        </div>

      </section>

    </div>

  );

}

export default Dashboard;