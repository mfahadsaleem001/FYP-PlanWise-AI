import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Gauge,
  Users,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import "./ProjectDetails.css";

function ProjectDetails() {
  return (
    <div className="project-details-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="project-details-header">

        <div className="project-details-header-left">

          <a
            href="/app/projects"
            className="back-to-projects"
          >
            <ArrowLeft />
            Back to Projects
          </a>

          <span className="project-details-label">
            PROJECT DETAILS
          </span>

          <h1>AI Learning Platform</h1>

          <p>
            An intelligent learning platform that uses AI to
            personalize learning experiences and provide
            automated educational assistance.
          </p>

        </div>

        <div className="project-details-header-status">
          <span className="status-badge-detail">
            Completed
          </span>

          <span className="project-id">
            Project #001
          </span>
        </div>

      </section>


      {/* =====================================================
          PROJECT INFORMATION
          ===================================================== */}

      <section className="project-info-card">

        <div className="project-info-heading">

          <div>
            <span className="section-step">
              PROJECT OVERVIEW
            </span>

            <h2>Project information</h2>
          </div>

          <span className="project-type-detail">
            AI / Machine Learning
          </span>

        </div>


        <div className="project-info-grid">

          <div className="project-info-item">
            <span>Project Type</span>
            <strong>AI / Machine Learning</strong>
          </div>

          <div className="project-info-item">
            <span>Created</span>
            <strong>September 08, 2026</strong>
          </div>

          <div className="project-info-item">
            <span>Last Analysis</span>
            <strong>September 10, 2026</strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          ESTIMATION SUMMARY
          ===================================================== */}

      <section className="details-section">

        <div className="details-section-heading">
          <div>
            <span className="section-step">
              ESTIMATION
            </span>

            <h2>Project estimate</h2>

            <p>
              Summary of the current project estimation analysis.
            </p>
          </div>
        </div>


        <div className="estimate-summary-grid">

          <div className="estimate-detail-card">

            <div className="estimate-detail-icon">
              <DollarSign />
            </div>

            <div>
              <span>Estimated Cost</span>
              <strong>PKR 1.20M</strong>
              <small>Estimated project budget</small>
            </div>

          </div>


          <div className="estimate-detail-card">

            <div className="estimate-detail-icon">
              <Clock3 />
            </div>

            <div>
              <span>Estimated Duration</span>
              <strong>6 Months</strong>
              <small>Predicted project timeline</small>
            </div>

          </div>


          <div className="estimate-detail-card">

            <div className="estimate-detail-icon">
              <Gauge />
            </div>

            <div>
              <span>Complexity</span>
              <strong>High</strong>
              <small>Estimated project complexity</small>
            </div>

          </div>


          <div className="estimate-detail-card">

            <div className="estimate-detail-icon">
              <Users />
            </div>

            <div>
              <span>Recommended Team</span>
              <strong>4 Members</strong>
              <small>Estimated team requirement</small>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECT PLANNING
          ===================================================== */}

      <section className="planning-grid">

        {/* MILESTONES */}

        <div className="planning-card">

          <div className="planning-card-header">

            <div>
              <span className="section-step">
                PROJECT PLANNING
              </span>

              <h2>Milestones</h2>
            </div>

            <CalendarDays />

          </div>


          <div className="milestone-list">

            <div className="milestone-item completed">

              <div className="milestone-marker">
                <CheckCircle2 />
              </div>

              <div>
                <strong>Requirements & Analysis</strong>
                <span>2 weeks</span>
              </div>

            </div>


            <div className="milestone-item completed">

              <div className="milestone-marker">
                <CheckCircle2 />
              </div>

              <div>
                <strong>UI/UX & Architecture</strong>
                <span>3 weeks</span>
              </div>

            </div>


            <div className="milestone-item active">

              <div className="milestone-marker">
                <Clock3 />
              </div>

              <div>
                <strong>Development</strong>
                <span>10 weeks</span>
              </div>

            </div>


            <div className="milestone-item">

              <div className="milestone-marker">
                <span>4</span>
              </div>

              <div>
                <strong>Testing & Quality Assurance</strong>
                <span>5 weeks</span>
              </div>

            </div>


            <div className="milestone-item">

              <div className="milestone-marker">
                <span>5</span>
              </div>

              <div>
                <strong>Deployment</strong>
                <span>2 weeks</span>
              </div>

            </div>

          </div>

        </div>


        {/* RESOURCE PLANNING */}

        <div className="planning-card">

          <div className="planning-card-header">

            <div>
              <span className="section-step">
                RESOURCE PLANNING
              </span>

              <h2>Team availability</h2>
            </div>

            <Users />

          </div>


          <div className="resource-status">

            <div className="resource-status-number">
              <strong>3 / 4</strong>
              <span>Resources available</span>
            </div>

            <div className="resource-status-badge">
              Partial Availability
            </div>

          </div>


          <div className="resource-list">

            <div className="resource-row">
              <div>
                <strong>Frontend Developer</strong>
                <span>1 required</span>
              </div>

              <span className="resource-available">
                Available
              </span>
            </div>


            <div className="resource-row">
              <div>
                <strong>Backend Developer</strong>
                <span>1 required</span>
              </div>

              <span className="resource-available">
                Available
              </span>
            </div>


            <div className="resource-row">
              <div>
                <strong>ML Engineer</strong>
                <span>1 required</span>
              </div>

              <span className="resource-available">
                Available
              </span>
            </div>


            <div className="resource-row">
              <div>
                <strong>UI/UX Designer</strong>
                <span>1 required</span>
              </div>

              <span className="resource-gap">
                1 Gap
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COST PLANNING
          ===================================================== */}

      <section className="cost-planning-card">

        <div className="planning-card-header">

          <div>
            <span className="section-step">
              FINANCIAL PLANNING
            </span>

            <h2>Estimated cost breakdown</h2>

            <p>
              Planned distribution of the estimated project cost
              across major development phases.
            </p>
          </div>

          <div className="total-cost">
            <span>Total Estimated Cost</span>
            <strong>PKR 1.20M</strong>
          </div>

        </div>


        <div className="cost-breakdown">

          <div className="cost-row">

            <div className="cost-row-info">
              <strong>Requirements & Analysis</strong>
              <span>8%</span>
            </div>

            <div className="cost-bar">
              <span style={{ width: "8%" }}></span>
            </div>

            <strong>PKR 96K</strong>

          </div>


          <div className="cost-row">

            <div className="cost-row-info">
              <strong>UI/UX & Architecture</strong>
              <span>15%</span>
            </div>

            <div className="cost-bar">
              <span style={{ width: "15%" }}></span>
            </div>

            <strong>PKR 180K</strong>

          </div>


          <div className="cost-row">

            <div className="cost-row-info">
              <strong>Development</strong>
              <span>50%</span>
            </div>

            <div className="cost-bar">
              <span style={{ width: "50%" }}></span>
            </div>

            <strong>PKR 600K</strong>

          </div>


          <div className="cost-row">

            <div className="cost-row-info">
              <strong>Testing & QA</strong>
              <span>18%</span>
            </div>

            <div className="cost-bar">
              <span style={{ width: "18%" }}></span>
            </div>

            <strong>PKR 216K</strong>

          </div>


          <div className="cost-row">

            <div className="cost-row-info">
              <strong>Deployment</strong>
              <span>9%</span>
            </div>

            <div className="cost-bar">
              <span style={{ width: "9%" }}></span>
            </div>

            <strong>PKR 108K</strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          INSIGHTS
          ===================================================== */}

      <section className="details-insights-grid">

        <div className="detail-insight-card risk">

          <div className="detail-insight-icon">
            <AlertTriangle />
          </div>

          <div>
            <span>PROJECT RISKS</span>
            <h3>3 identified risks</h3>
            <p>
              Review resource, technical, and timeline risks
              identified during project analysis.
            </p>

            <a href="/app/risks">
              View Risks →
            </a>
          </div>

        </div>


        <div className="detail-insight-card recommendation">

          <div className="detail-insight-icon">
            <Lightbulb />
          </div>

          <div>
            <span>RECOMMENDATIONS</span>
            <h3>5 planning recommendations</h3>
            <p>
              Review technology, team, and project planning
              recommendations.
            </p>

            <a href="/app/recommendations">
              View Recommendations →
            </a>
          </div>

        </div>

      </section>


      {/* =====================================================
          NOTE
          ===================================================== */}

      <section className="project-details-note">

        <div className="project-details-note-mark">
          i
        </div>

        <div>
          <strong>Intelligent project analysis</strong>

          <p>
            Estimation, resource planning, milestones, risks,
            recommendations, and financial planning will later
            be generated dynamically from the project's analysis.
          </p>
        </div>

      </section>

    </div>
  );
}

export default ProjectDetails;