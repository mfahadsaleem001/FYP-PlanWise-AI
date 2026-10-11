
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Search,
  Eye,
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
  X,
  CalendarDays,
  UserRound,
  DollarSign,
  ShieldAlert,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { getAdminProjects } from "../../services/api";
import "./AdminProjects.css";

// ============================================================
// HELPERS
// ============================================================

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status) {
  if (!status) return "Unknown";

  return String(status)
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatProjectType(type) {
  if (!type) return "Not available";

  return String(type)
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getProjectOwner(project) {
  return (
    project.owner ||
    project.owner_name ||
    project.owner_email ||
    (project.owner_id ? `User #${project.owner_id}` : "Not available")
  );
}

function getCost(project) {
  const value =
    project.estimated_cost ??
    project.estimatedCost ??
    project.total_cost ??
    project.cost;

  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  if (typeof value === "string") return value;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getDuration(project) {
  const value =
    project.estimated_duration ??
    project.estimatedDuration ??
    project.duration_weeks ??
    project.duration;

  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  if (typeof value === "number") {
    return `${value} ${value === 1 ? "Week" : "Weeks"}`;
  }

  return String(value);
}

function getProgress(project) {
  const value =
    project.progress ??
    project.progress_percentage ??
    project.progressPercentage;

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) return null;

  return Math.min(100, Math.max(0, number));
}

function getRisk(project) {
  const risk =
    project.risk_level ??
    project.riskLevel ??
    project.risk;

  if (!risk) return null;

  if (typeof risk === "object") {
    return risk.severity || risk.level || risk.status || null;
  }

  return String(risk);
}

function getTeam(project) {
  const team =
    project.team ??
    project.assigned_resources ??
    project.assignedResources ??
    project.members;

  return Array.isArray(team) ? team : [];
}

function getTeamSize(project) {
  const explicitSize =
    project.team_size ??
    project.teamSize ??
    project.required_team_size;

  if (
    explicitSize !== null &&
    explicitSize !== undefined &&
    explicitSize !== ""
  ) {
    const number = Number(explicitSize);
    return Number.isFinite(number) ? number : null;
  }

  const team = getTeam(project);

  return team.length > 0 ? team.length : null;
}

function normalizeProject(project) {
  return {
    ...project,
    id: project.id,
    name: project.name || "Untitled Project",
    owner: getProjectOwner(project),
    type: formatProjectType(project.type || project.project_type),
    status: formatStatus(project.status),
    cost: getCost(project),
    duration: getDuration(project),
    progress: getProgress(project),
    team: getTeam(project),
    teamSize: getTeamSize(project),
    risk: getRisk(project),
    created: formatDate(
      project.created_at || project.createdAt || project.created
    ),
    deadline: formatDate(
      project.deadline || project.due_date || project.dueDate
    ),
    description:
      project.description || "No project description available.",
  };
}

function getStatusClass(status) {
  const normalized = String(status || "").toLowerCase();

  if (normalized === "completed") return "completed";

  if (
    normalized === "in development" ||
    normalized === "in progress" ||
    normalized === "active"
  ) {
    return "in-development";
  }

  if (normalized === "planning" || normalized === "draft") {
    return "planning";
  }

  if (normalized === "on hold" || normalized === "paused") {
    return "on-hold";
  }

  return "";
}

function getRiskClass(risk) {
  const normalized = String(risk || "").toLowerCase();

  if (normalized.includes("critical")) return "high";
  if (normalized.includes("high")) return "high";
  if (normalized.includes("medium")) return "medium";
  if (normalized.includes("low")) return "low";

  return "";
}

function displayValue(value) {
  return value === null || value === undefined || value === ""
    ? "Not available"
    : value;
}

// ============================================================
// COMPONENT
// ============================================================

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFullProjectModal, setShowFullProjectModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 10;

  // ============================================================
  // LOAD PROJECTS
  // ============================================================

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminProjects();

      const projectList = Array.isArray(response)
        ? response
        : Array.isArray(response?.projects)
          ? response.projects
          : Array.isArray(response?.items)
            ? response.items
            : null;

      if (!projectList) {
        throw new Error(
          "The projects API returned an unexpected response format."
        );
      }

      setProjects(projectList.map(normalizeProject));
    } catch (err) {
      setError(err?.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ============================================================
  // MODAL ESCAPE KEY
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setShowProjectModal(false);
        setShowFullProjectModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const totalProjects = projects.length;

  const activeProjects = projects.filter((project) =>
    [
      "in development",
      "in progress",
      "planning",
      "active",
    ].includes(project.status.toLowerCase())
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status.toLowerCase() === "completed"
  ).length;

  const highRiskProjects = projects.filter((project) => {
    const risk = String(project.risk || "").toLowerCase();

    return risk.includes("high") || risk.includes("critical");
  }).length;

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const projectTypes = useMemo(
    () =>
      [
        ...new Set(
          projects
            .map((project) => project.type)
            .filter((type) => type && type !== "Not available")
        ),
      ].sort(),
    [projects]
  );

  const projectStatuses = useMemo(
    () =>
      [
        ...new Set(
          projects
            .map((project) => project.status)
            .filter((status) => status && status !== "Unknown")
        ),
      ].sort(),
    [projects]
  );

  // ============================================================
  // FILTER PROJECTS
  // ============================================================

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.owner.toLowerCase().includes(normalizedSearch) ||
        project.type.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesType =
        typeFilter === "All" || project.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [projects, searchTerm, statusFilter, typeFilter]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const startIndex = (safeCurrentPage - 1) * projectsPerPage;

  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  // ============================================================
  // FILTER HANDLERS
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ============================================================
  // PROJECT MODALS
  // ============================================================

  const openProject = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setShowFullProjectModal(false);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setShowProjectModal(false);
    setShowFullProjectModal(false);
  };

  const openFullProject = (project) => {
    setSelectedProject(project);
    setShowProjectModal(false);
    setShowFullProjectModal(true);
  };

  const closeFullProject = () => {
    setSelectedProject(null);
    setShowFullProjectModal(false);
    setShowProjectModal(false);
  };

  const backToProjectDetails = () => {
    setShowFullProjectModal(false);
    setShowProjectModal(true);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-projects">
      {/* PAGE HEADER */}

      <div className="admin-projects-header">
        <div className="admin-projects-header-content">
          <span className="admin-projects-eyebrow">
            PROJECT MANAGEMENT
          </span>

          <h1>Projects</h1>

          <p>
            Monitor projects, estimations, resources, progress, and
            project risks.
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="admin-project-summary">
        <div className="project-summary-card">
          <div className="project-summary-icon">
            <FolderKanban size={19} />
          </div>
          <div>
            <span>Total Projects</span>
            <strong>{loading ? "—" : totalProjects}</strong>
          </div>
        </div>

        <div className="project-summary-card">
          <div className="project-summary-icon">
            <Activity size={19} />
          </div>
          <div>
            <span>Active Projects</span>
            <strong>{loading ? "—" : activeProjects}</strong>
          </div>
        </div>

        <div className="project-summary-card">
          <div className="project-summary-icon">
            <CheckCircle2 size={19} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{loading ? "—" : completedProjects}</strong>
          </div>
        </div>

        <div className="project-summary-card">
          <div className="project-summary-icon">
            <AlertTriangle size={19} />
          </div>
          <div>
            <span>High Risk</span>
            <strong>{loading ? "—" : highRiskProjects}</strong>
          </div>
        </div>
      </div>

      {/* PROJECT PANEL */}

      <div className="admin-project-panel">
        <div className="admin-project-toolbar">
          <div className="admin-project-toolbar-left">
            <div className="admin-project-panel-title">
              <span>Project Directory</span>
              <small>
                {loading
                  ? "Loading projects..."
                  : `${filteredProjects.length} projects`}
              </small>
            </div>
          </div>

          <div className="admin-project-toolbar-right">
            <div className="project-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search projects, owners or types..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search projects"
              />
            </div>

            <select
              className="admin-project-filter"
              value={statusFilter}
              onChange={handleStatusChange}
              aria-label="Filter by project status"
            >
              <option value="All">All Status</option>
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              className="admin-project-filter"
              value={typeFilter}
              onChange={handleTypeChange}
              aria-label="Filter by project type"
            >
              <option value="All">All Types</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="project-action-btn"
              onClick={fetchProjects}
              disabled={loading}
              title="Refresh projects"
              aria-label="Refresh projects"
            >
              <RefreshCw
                size={16}
                className={loading ? "admin-projects-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* PROJECT TABLE */}

        {error && (
          <div className="admin-project-error" role="alert">
            <AlertTriangle size={17} />
            <span>{error}</span>
            <button type="button" onClick={fetchProjects}>
              Try Again
            </button>
          </div>
        )}

        <div className="admin-project-table-wrapper">
          <table className="admin-project-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Estimation</th>
                <th>Progress</th>
                <th>Team</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="project-empty-cell">
                    <RefreshCw
                      size={28}
                      className="admin-projects-spin"
                    />
                    <strong>Loading projects</strong>
                    <span>Fetching project records from the backend.</span>
                  </td>
                </tr>
              ) : currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className="admin-project-row"
                    style={{ "--row-index": index }}
                  >
                    <td>
                      <div className="project-name-cell">
                        <div className="project-name-icon">
                          <FolderKanban size={16} />
                        </div>
                        <div className="project-name-info">
                          <strong>{project.name}</strong>
                          <span>Created {project.created}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="project-owner-cell">
                        <UserRound size={15} />
                        <span>{project.owner}</span>
                      </div>
                    </td>

                    <td>
                      <span className="project-type-text">
                        {project.type}
                      </span>
                    </td>

                    <td>
                      <div className="project-estimation-cell">
                        <strong>{project.cost}</strong>
                        <span>
                          <Clock3 size={13} />
                          {project.duration}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="project-progress-cell">
                        <div className="project-progress-header">
                          <span>
                            {project.progress === null
                              ? "Not available"
                              : `${project.progress}%`}
                          </span>
                        </div>
                        <div className="project-progress-bar">
                          <div
                            className="project-progress-fill"
                            style={{
                              width:
                                project.progress === null
                                  ? "0%"
                                  : `${project.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="project-team-cell">
                        <Users size={15} />
                        <span>{project.teamSize ?? "—"}</span>
                      </div>
                    </td>

                    <td>
                      {project.risk ? (
                        <span
                          className={`project-risk-badge ${getRiskClass(
                            project.risk
                          )}`}
                        >
                          {project.risk}
                        </span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>

                    <td>
                      <span
                        className={`project-status-badge ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td>
                      <div className="project-actions">
                        <button
                          type="button"
                          className="project-action-btn"
                          title="Close"
                          aria-label={`Open ${project.name} details`}
                          onClick={() => openProject(project)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          className="project-action-btn"
                          title="View Full Project"
                          aria-label={`View full ${project.name}`}
                          onClick={() => openFullProject(project)}
                        >
                          <ClipboardList size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="project-empty-cell">
                    <FolderKanban size={30} />
                    <strong>No projects found</strong>
                    <span>Try changing your search or filters.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="projects-footer">
          <div className="projects-footer-info">
            Showing{" "}
            {filteredProjects.length === 0 ? 0 : startIndex + 1}
            {" - "}
            {Math.min(
              startIndex + projectsPerPage,
              filteredProjects.length
            )}
            {" of "}
            {filteredProjects.length} projects
          </div>

          <div className="projects-pagination">
            <button
              type="button"
              className="projects-page-btn"
              disabled={loading || safeCurrentPage === 1}
              onClick={() => changePage(safeCurrentPage - 1)}
            >
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={`projects-page-btn ${
                  safeCurrentPage === page ? "active" : ""
                }`}
                disabled={loading}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="projects-page-btn"
              disabled={
                loading ||
                totalPages === 0 ||
                safeCurrentPage === totalPages
              }
              onClick={() => changePage(safeCurrentPage + 1)}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          PROJECT DETAILS MODAL
      ======================================================== */}

      {showProjectModal && selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={closeProject}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-header">
              <div>
                <span className="project-modal-label">
                  PROJECT DETAILS
                </span>
                <h2 id="project-details-title">
                  {selectedProject.name}
                </h2>
              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={closeProject}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="project-modal-body">
              <div className="project-modal-status-row">
                <span
                  className={`project-status-badge ${getStatusClass(
                    selectedProject.status
                  )}`}
                >
                  {selectedProject.status}
                </span>

                {selectedProject.risk && (
                  <span
                    className={`project-risk-badge ${getRiskClass(
                      selectedProject.risk
                    )}`}
                  >
                    {selectedProject.risk} Risk
                  </span>
                )}
              </div>

              <div className="project-modal-description">
                <h3>Project Overview</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-detail-grid">
                <div className="project-detail-item">
                  <span>Project Owner</span>
                  <strong>
                    <UserRound size={15} />
                    {selectedProject.owner}
                  </strong>
                </div>

                <div className="project-detail-item">
                  <span>Project Type</span>
                  <strong>{selectedProject.type}</strong>
                </div>

                <div className="project-detail-item">
                  <span>Estimated Cost</span>
                  <strong>
                    <DollarSign size={15} />
                    {selectedProject.cost}
                  </strong>
                </div>

                <div className="project-detail-item">
                  <span>Estimated Duration</span>
                  <strong>
                    <Clock3 size={15} />
                    {selectedProject.duration}
                  </strong>
                </div>

                <div className="project-detail-item">
                  <span>Created</span>
                  <strong>
                    <CalendarDays size={15} />
                    {selectedProject.created}
                  </strong>
                </div>

                <div className="project-detail-item">
                  <span>Deadline</span>
                  <strong>
                    <CalendarDays size={15} />
                    {selectedProject.deadline}
                  </strong>
                </div>
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <Activity size={17} />
                    <h3>Project Progress</h3>
                  </div>
                  <strong>
                    {selectedProject.progress === null
                      ? "Not available"
                      : `${selectedProject.progress}%`}
                  </strong>
                </div>

                <div className="project-progress-bar project-modal-progress">
                  <div
                    className="project-progress-fill"
                    style={{
                      width:
                        selectedProject.progress === null
                          ? "0%"
                          : `${selectedProject.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <Users size={17} />
                    <h3>Assigned Resources</h3>
                  </div>
                  <strong>{selectedProject.teamSize ?? "—"}</strong>
                </div>

                {selectedProject.team.length > 0 ? (
                  <div className="project-team-list">
                    {selectedProject.team.map((member, index) => {
                      const memberName =
                        typeof member === "string"
                          ? member
                          : member.name ||
                            member.full_name ||
                            member.email ||
                            `Team Member ${index + 1}`;

                      const memberRole =
                        typeof member === "string"
                          ? "Assigned Resource"
                          : member.role ||
                            member.job_title ||
                            member.position ||
                            "Assigned Resource";

                      return (
                        <div
                          className="project-team-member"
                          key={`${memberName}-${index}`}
                        >
                          <div className="project-team-avatar">
                            {memberName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{memberName}</strong>
                            <span>{memberRole}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>
                    No assigned resource records are available for this
                    project.
                  </p>
                )}
              </div>
            </div>

            {/* LEFT: CLOSE | RIGHT: VIEW FULL PROJECT */}

            <div className="project-modal-actions">
              <button
                type="button"
                className="project-secondary-btn"
                onClick={closeProject}
              >
                Close
              </button>

              <button
                type="button"
                className="project-primary-btn"
                onClick={() => openFullProject(selectedProject)}
              >
                <ClipboardList size={16} />
                View Full Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FULL PROJECT MODAL
      ======================================================== */}

      {showFullProjectModal && selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={closeFullProject}
        >
          <div
            className="project-modal project-full-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="full-project-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-header">
              <div>
                <span className="project-modal-label">
                  FULL PROJECT
                </span>
                <h2 id="full-project-title">
                  {selectedProject.name}
                </h2>
              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={closeFullProject}
                aria-label="Close full project"
              >
                <X size={18} />
              </button>
            </div>

            <div className="project-modal-body">
              <div className="project-modal-description">
                <h3>Project Overview</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <FolderKanban size={17} />
                    <h3>Project Information</h3>
                  </div>
                </div>

                <div className="project-detail-grid">
                  <div className="project-detail-item">
                    <span>Project ID</span>
                    <strong>{displayValue(selectedProject.id)}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Project Name</span>
                    <strong>{selectedProject.name}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Owner</span>
                    <strong>{selectedProject.owner}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Project Type</span>
                    <strong>{selectedProject.type}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Status</span>
                    <strong>{selectedProject.status}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Created</span>
                    <strong>{selectedProject.created}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Deadline</span>
                    <strong>{selectedProject.deadline}</strong>
                  </div>
                </div>
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <DollarSign size={17} />
                    <h3>Estimation & Progress</h3>
                  </div>
                </div>

                <div className="project-detail-grid">
                  <div className="project-detail-item">
                    <span>Estimated Cost</span>
                    <strong>{selectedProject.cost}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Estimated Duration</span>
                    <strong>{selectedProject.duration}</strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Current Progress</span>
                    <strong>
                      {selectedProject.progress === null
                        ? "Not available"
                        : `${selectedProject.progress}%`}
                    </strong>
                  </div>

                  <div className="project-detail-item">
                    <span>Project Risk</span>
                    <strong>{displayValue(selectedProject.risk)}</strong>
                  </div>
                </div>

                <div className="project-progress-bar project-modal-progress">
                  <div
                    className="project-progress-fill"
                    style={{
                      width:
                        selectedProject.progress === null
                          ? "0%"
                          : `${selectedProject.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <Users size={17} />
                    <h3>Assigned Resources</h3>
                  </div>
                  <strong>{selectedProject.teamSize ?? "—"}</strong>
                </div>

                {selectedProject.team.length > 0 ? (
                  <div className="project-team-list">
                    {selectedProject.team.map((member, index) => {
                      const memberName =
                        typeof member === "string"
                          ? member
                          : member.name ||
                            member.full_name ||
                            member.email ||
                            `Team Member ${index + 1}`;

                      const memberRole =
                        typeof member === "string"
                          ? "Assigned Resource"
                          : member.role ||
                            member.job_title ||
                            member.position ||
                            "Assigned Resource";

                      return (
                        <div
                          className="project-team-member"
                          key={`${memberName}-${index}`}
                        >
                          <div className="project-team-avatar">
                            {memberName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{memberName}</strong>
                            <span>{memberRole}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>
                    No assigned resource records are available for this
                    project.
                  </p>
                )}
              </div>

              <div className="project-modal-section">
                <div className="project-section-heading">
                  <div>
                    <ShieldAlert size={17} />
                    <h3>Project Record</h3>
                  </div>
                </div>

                <div className="project-admin-note">
                  <p>
                    Project information is displayed when the backend
                    provides it. Missing cost, duration, progress, risk,
                    deadline, and resource information is not fabricated.
                  </p>
                </div>
              </div>
            </div>

            {/* LEFT: CLOSE | RIGHT: BACK TO DETAILS */}

            <div className="project-modal-actions">
              <button
                type="button"
                className="project-primary-btn"
                onClick={closeFullProject}
              >
                Close
              </button>

              <button
                type="button"
                className="project-secondary-btn"
                onClick={backToProjectDetails}
              >
                <ChevronLeft size={16} />
                Back to Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjects;