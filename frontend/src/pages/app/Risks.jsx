import { useState } from "react";

import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CircleAlert,
  Filter,
  ArrowUpRight,
  Users,
  Cpu,
  FileWarning,
  Database,
  X,
  Search,
} from "lucide-react";

import "./Risks.css";

function Risks() {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const risks = [
    {
      id: 1,
      title: "Insufficient Development Capacity",
      category: "Resource Availability",
      severity: "High",
      probability: "High",
      impact:
        "Project timeline may increase due to limited development capacity.",
      mitigation:
        "Allocate additional resources or adjust the development schedule.",
      project: "AI Learning Platform",
      icon: Users,
    },
    {
      id: 2,
      title: "ML Model Integration Complexity",
      category: "Technical",
      severity: "Medium",
      probability: "Medium",
      impact:
        "Integration between the trained ML model and application services may require additional development effort.",
      mitigation:
        "Define a clear ML inference interface and perform integration testing early.",
      project: "AI Learning Platform",
      icon: Cpu,
    },
    {
      id: 3,
      title: "Requirement Changes",
      category: "Requirements",
      severity: "Medium",
      probability: "Medium",
      impact:
        "Changes in project requirements may increase development effort and affect planned milestones.",
      mitigation:
        "Finalize core requirements early and maintain controlled change management.",
      project: "E-Commerce Marketplace",
      icon: FileWarning,
    },
    {
      id: 4,
      title: "Data Quality Risk",
      category: "Data / ML",
      severity: "Medium",
      probability: "Low",
      impact:
        "Poor-quality historical data can reduce the reliability of ML-based estimates.",
      mitigation:
        "Validate, clean, and continuously review the historical project dataset.",
      project: "AI Learning Platform",
      icon: Database,
    },
  ];

  const highRisks = risks.filter(
    (risk) => risk.severity === "High"
  ).length;

  const mediumRisks = risks.filter(
    (risk) => risk.severity === "Medium"
  ).length;

  const lowRisks = risks.filter(
    (risk) => risk.severity === "Low"
  ).length;

  const categories = [
    "All",
    ...new Set(risks.map((risk) => risk.category)),
  ];

  const filteredRisks = risks.filter((risk) => {
    const matchesSeverity =
      severityFilter === "All" ||
      risk.severity === severityFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      risk.category === categoryFilter;

    return matchesSeverity && matchesCategory;
  });

  const handleViewRisk = (risk) => {
    setSelectedRisk(risk);
  };

  const closeRiskDetails = () => {
    setSelectedRisk(null);
  };

  const clearFilters = () => {
    setSeverityFilter("All");
    setCategoryFilter("All");
  };

  return (
    <div className="risks-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="risks-header">

        <div>

          <span className="risks-eyebrow">
            RISK ANALYSIS
          </span>

          <h1>
            Project Risks
          </h1>

          <p>
            Review identified project risks, their potential impact,
            and recommended mitigation strategies.
          </p>

        </div>


        <div className="risk-filter-wrapper">

          <button
            type="button"
            className={`risk-filter-button ${
              showFilter ? "active" : ""
            }`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={18} />
            Filter Risks
          </button>


          {showFilter && (
            <div className="risk-filter-panel">

              <div className="risk-filter-panel-header">

                <div>
                  <strong>
                    Filter Risks
                  </strong>

                  <span>
                    Narrow the risk register
                  </span>
                </div>

                <button
                  type="button"
                  className="risk-filter-close"
                  onClick={() => setShowFilter(false)}
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>

              </div>


              <div className="risk-filter-field">

                <label>
                  Severity
                </label>

                <select
                  value={severityFilter}
                  onChange={(event) =>
                    setSeverityFilter(event.target.value)
                  }
                >
                  <option value="All">
                    All Severities
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>
                </select>

              </div>


              <div className="risk-filter-field">

                <label>
                  Category
                </label>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category === "All"
                        ? "All Categories"
                        : category}
                    </option>
                  ))}
                </select>

              </div>


              <div className="risk-filter-actions">

                <button
                  type="button"
                  className="risk-filter-clear"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

                <button
                  type="button"
                  className="risk-filter-apply"
                  onClick={() => setShowFilter(false)}
                >
                  Apply Filters
                </button>

              </div>

            </div>
          )}

        </div>

      </div>



      {/* =====================================================
          RISK OVERVIEW
      ===================================================== */}

      <section className="risk-overview">

        <div className="risk-summary-card total">

          <div className="risk-summary-icon">
            <AlertTriangle size={22} />
          </div>

          <div>

            <span>
              Total Risks
            </span>

            <strong>
              {risks.length}
            </strong>

          </div>

        </div>


        <div className="risk-summary-card high">

          <div className="risk-summary-icon">
            <ShieldAlert size={22} />
          </div>

          <div>

            <span>
              High Risk
            </span>

            <strong>
              {highRisks}
            </strong>

          </div>

        </div>


        <div className="risk-summary-card medium">

          <div className="risk-summary-icon">
            <CircleAlert size={22} />
          </div>

          <div>

            <span>
              Medium Risk
            </span>

            <strong>
              {mediumRisks}
            </strong>

          </div>

        </div>


        <div className="risk-summary-card low">

          <div className="risk-summary-icon">
            <ShieldCheck size={22} />
          </div>

          <div>

            <span>
              Low Risk
            </span>

            <strong>
              {lowRisks}
            </strong>

          </div>

        </div>

      </section>



      {/* =====================================================
          RESOURCE AVAILABILITY NOTICE
      ===================================================== */}

      <section className="resource-risk-banner">

        <div className="resource-risk-icon">
          <Users size={24} />
        </div>

        <div className="resource-risk-content">

          <div className="resource-risk-heading">

            <div>

              <span>
                RESOURCE AVAILABILITY
              </span>

              <h3>
                Development capacity requires attention
              </h3>

            </div>

            <span className="severity-badge high">
              High Risk
            </span>

          </div>

          <p>
            The current project requires additional development
            capacity. Resource gaps may affect the planned timeline
            if additional resources are not allocated.
          </p>

          <div className="resource-risk-stats">

            <div>
              <span>Required</span>
              <strong>4</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>2</strong>
            </div>

            <div>
              <span>Resource Gap</span>
              <strong>2</strong>
            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          RISK LIST
      ===================================================== */}

      <section className="risk-list-section">

        <div className="risk-list-header">

          <div>

            <span className="section-label">
              IDENTIFIED RISKS
            </span>

            <h2>
              Risk Register
            </h2>

          </div>

          <span className="risk-count">
            {filteredRisks.length}{" "}
            {filteredRisks.length === 1
              ? "Risk"
              : "Risks"}
          </span>

        </div>



        <div className="risk-list">

          {filteredRisks.length > 0 ? (

            filteredRisks.map((risk) => {

              const RiskIcon = risk.icon;

              return (
                <article
                  className="risk-card"
                  key={risk.id}
                >

                  {/* Risk Card Header */}

                  <div className="risk-card-top">

                    <div className="risk-title-area">

                      <div className="risk-card-icon">
                        <RiskIcon size={21} />
                      </div>

                      <div>

                        <h3>
                          {risk.title}
                        </h3>

                        <div className="risk-meta">

                          <span>
                            {risk.category}
                          </span>

                          <span className="meta-dot">
                            •
                          </span>

                          <span>
                            {risk.project}
                          </span>

                        </div>

                      </div>

                    </div>


                    <span
                      className={`severity-badge ${risk.severity.toLowerCase()}`}
                    >
                      {risk.severity}
                    </span>

                  </div>



                  {/* Probability + Impact */}

                  <div className="risk-indicators">

                    <div className="risk-indicator">

                      <span>
                        Probability
                      </span>

                      <strong
                        className={
                          risk.probability.toLowerCase()
                        }
                      >
                        {risk.probability}
                      </strong>

                    </div>


                    <div className="risk-indicator-divider">
                    </div>


                    <div className="risk-indicator">

                      <span>
                        Impact
                      </span>

                      <strong
                        className={
                          risk.severity.toLowerCase()
                        }
                      >
                        {risk.severity}
                      </strong>

                    </div>

                  </div>



                  {/* Risk Details */}

                  <div className="risk-details">

                    <div className="risk-detail-block">

                      <span className="risk-detail-label">
                        POTENTIAL IMPACT
                      </span>

                      <p>
                        {risk.impact}
                      </p>

                    </div>


                    <div className="risk-detail-block">

                      <span className="risk-detail-label">
                        MITIGATION
                      </span>

                      <p>
                        {risk.mitigation}
                      </p>

                    </div>

                  </div>



                  {/* View Details */}

                  <button
                    type="button"
                    className="risk-details-button"
                    onClick={() => handleViewRisk(risk)}
                  >
                    View Risk Details
                    <ArrowUpRight size={16} />
                  </button>

                </article>
              );
            })

          ) : (

            <div className="risk-empty-state">

              <Search size={22} />

              <strong>
                No risks found
              </strong>

              <p>
                No risks match the selected filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>



      {/* =====================================================
          INFORMATION NOTE
      ===================================================== */}

      <div className="risks-info-note">

        <ShieldCheck size={19} />

        <p>
          Risk analysis will later be generated dynamically from
          project requirements, ML estimation results, resource
          availability, and Gemini-based project analysis.
        </p>

      </div>



      {/* =====================================================
          RISK DETAILS MODAL
      ===================================================== */}

      {selectedRisk && (
        <div
          className="risk-modal-overlay"
          onClick={closeRiskDetails}
        >

          <div
            className="risk-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="risk-modal-header">

              <div className="risk-modal-title">

                <div className="risk-modal-icon">
                  {(() => {
                    const ModalIcon =
                      selectedRisk.icon;

                    return (
                      <ModalIcon size={22} />
                    );
                  })()}
                </div>

                <div>

                  <span>
                    RISK DETAILS
                  </span>

                  <h2>
                    {selectedRisk.title}
                  </h2>

                </div>

              </div>


              <button
                type="button"
                className="risk-modal-close"
                onClick={closeRiskDetails}
                aria-label="Close risk details"
              >
                <X size={19} />
              </button>

            </div>



            <div className="risk-modal-body">

              <div className="risk-modal-meta">

                <div>
                  <span>
                    CATEGORY
                  </span>

                  <strong>
                    {selectedRisk.category}
                  </strong>
                </div>

                <div>
                  <span>
                    PROJECT
                  </span>

                  <strong>
                    {selectedRisk.project}
                  </strong>
                </div>

                <div>
                  <span>
                    SEVERITY
                  </span>

                  <strong
                    className={`modal-severity ${selectedRisk.severity.toLowerCase()}`}
                  >
                    {selectedRisk.severity}
                  </strong>
                </div>

                <div>
                  <span>
                    PROBABILITY
                  </span>

                  <strong
                    className={`modal-severity ${selectedRisk.probability.toLowerCase()}`}
                  >
                    {selectedRisk.probability}
                  </strong>
                </div>

              </div>



              <div className="risk-modal-section">

                <span>
                  POTENTIAL IMPACT
                </span>

                <p>
                  {selectedRisk.impact}
                </p>

              </div>



              <div className="risk-modal-section">

                <span>
                  RECOMMENDED MITIGATION
                </span>

                <p>
                  {selectedRisk.mitigation}
                </p>

              </div>



              <div className="risk-modal-note">

                <ShieldCheck size={18} />

                <p>
                  This risk assessment is based on the
                  current project analysis and may change
                  as project requirements, resources, and
                  planning information are updated.
                </p>

              </div>

            </div>



            <div className="risk-modal-footer">

              <button
                type="button"
                className="risk-modal-close-btn"
                onClick={closeRiskDetails}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Risks;