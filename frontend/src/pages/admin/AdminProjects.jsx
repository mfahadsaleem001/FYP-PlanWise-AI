import { useState } from "react";
import {
  Search,
  Eye,
  MoreHorizontal,
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
  ExternalLink,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./AdminProjects.css";

function AdminProjects() {
  // ============================================================
  // STATE
  // ============================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [showProjectModal, setShowProjectModal] =
    useState(false);

  const [showFullProjectModal, setShowFullProjectModal] =
    useState(false);

  const [openMoreMenu, setOpenMoreMenu] =
    useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 5;

  // ============================================================
  // DEMO PROJECT DATA
  // ============================================================

  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      owner: "Ali Raza",
      type: "Web Application",
      status: "In Development",
      cost: "$18,500",
      duration: "14 Weeks",
      progress: 62,
      teamSize: 5,
      risk: "Medium",
      created: "12 Aug 2026",
      deadline: "18 Nov 2026",
      description:
        "A scalable e-commerce platform with product management, customer accounts, shopping cart, order management, payments, and an administrative dashboard.",
      team: [
        {
          name: "Ali Raza",
          role: "Backend Developer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Mariam Iqbal",
          role: "UI/UX Designer",
        },
        {
          name: "Sara Ahmed",
          role: "QA Engineer",
        },
        {
          name: "Ayesha Malik",
          role: "Project Manager",
        },
      ],
    },

    {
      id: 2,
      name: "AI Recommendation Engine",
      owner: "Sara Khan",
      type: "AI / Machine Learning",
      status: "Planning",
      cost: "$32,000",
      duration: "20 Weeks",
      progress: 18,
      teamSize: 6,
      risk: "High",
      created: "28 Aug 2026",
      deadline: "15 Jan 2027",
      description:
        "An intelligent recommendation engine designed to analyze user behavior and generate personalized product recommendations using machine learning.",
      team: [
        {
          name: "Usman Tariq",
          role: "ML Engineer",
        },
        {
          name: "Ali Raza",
          role: "Backend Developer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Sara Ahmed",
          role: "QA Engineer",
        },
      ],
    },

    {
      id: 3,
      name: "Customer Mobile App",
      owner: "Ahmed Hassan",
      type: "Mobile Application",
      status: "In Development",
      cost: "$14,800",
      duration: "12 Weeks",
      progress: 47,
      teamSize: 4,
      risk: "Low",
      created: "04 Sep 2026",
      deadline: "27 Nov 2026",
      description:
        "A customer-facing mobile application providing account management, product browsing, notifications, support, and order tracking.",
      team: [
        {
          name: "Mariam Iqbal",
          role: "UI/UX Designer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Ali Raza",
          role: "Backend Developer",
        },
        {
          name: "Sara Ahmed",
          role: "QA Engineer",
        },
      ],
    },

    {
      id: 4,
      name: "Business Analytics Portal",
      owner: "Mariam Iqbal",
      type: "Web Application",
      status: "Completed",
      cost: "$16,400",
      duration: "13 Weeks",
      progress: 100,
      teamSize: 4,
      risk: "Low",
      created: "18 May 2026",
      deadline: "19 Aug 2026",
      description:
        "A business analytics portal providing interactive dashboards, reporting, KPI monitoring, data visualization, and business performance insights.",
      team: [
        {
          name: "Hamza Khan",
          role: "Backend Developer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Mariam Iqbal",
          role: "UI/UX Designer",
        },
        {
          name: "Ayesha Malik",
          role: "Project Manager",
        },
      ],
    },

    {
      id: 5,
      name: "Healthcare Management System",
      owner: "Usman Ahmed",
      type: "Desktop Software",
      status: "In Development",
      cost: "$21,700",
      duration: "16 Weeks",
      progress: 71,
      teamSize: 5,
      risk: "Medium",
      created: "10 Jul 2026",
      deadline: "30 Oct 2026",
      description:
        "A healthcare management solution for patient records, appointments, staff management, reporting, and operational workflows.",
      team: [
        {
          name: "Ali Raza",
          role: "Backend Developer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Sara Ahmed",
          role: "QA Engineer",
        },
        {
          name: "Mariam Iqbal",
          role: "UI/UX Designer",
        },
        {
          name: "Ayesha Malik",
          role: "Project Manager",
        },
      ],
    },

    {
      id: 6,
      name: "SaaS Project Management Tool",
      owner: "Ayesha Malik",
      type: "SaaS",
      status: "On Hold",
      cost: "$28,500",
      duration: "18 Weeks",
      progress: 34,
      teamSize: 6,
      risk: "High",
      created: "21 Jun 2026",
      deadline: "20 Dec 2026",
      description:
        "A SaaS project management platform for managing projects, tasks, resources, team collaboration, milestones, reporting, and project performance.",
      team: [
        {
          name: "Hamza Khan",
          role: "Backend Developer",
        },
        {
          name: "Ahmed Ali",
          role: "Frontend Developer",
        },
        {
          name: "Mariam Iqbal",
          role: "UI/UX Designer",
        },
        {
          name: "Sara Ahmed",
          role: "QA Engineer",
        },
      ],
    },
  ];

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) =>
      project.status === "In Development" ||
      project.status === "Planning"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const highRiskProjects = projects.filter(
    (project) => project.risk === "High"
  ).length;

  // ============================================================
  // FILTER PROJECTS
  // ============================================================

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.owner
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    const matchesType =
      typeFilter === "All" ||
      project.type === typeFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType
    );
  });

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (safeCurrentPage - 1) * projectsPerPage;

  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // STATUS FILTER
  // ============================================================

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // TYPE FILTER
  // ============================================================

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
    setCurrentPage(1);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // PROJECT MODAL
  // ============================================================

  const openProject = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setShowFullProjectModal(false);
    setOpenMoreMenu(null);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setShowProjectModal(false);
  };

  // ============================================================
  // FULL PROJECT MODAL
  // ============================================================

  const openFullProject = (project) => {
    setSelectedProject(project);
    setShowProjectModal(false);
    setShowFullProjectModal(true);
    setOpenMoreMenu(null);
  };

  const closeFullProject = () => {
    setSelectedProject(null);
    setShowFullProjectModal(false);
  };

  // ============================================================
  // MORE MENU
  // ============================================================

  const toggleMoreMenu = (projectId) => {
    setOpenMoreMenu((current) =>
      current === projectId
        ? null
        : projectId
    );
  };

  // ============================================================
  // STATUS CLASS
  // ============================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";

      case "In Development":
        return "in-development";

      case "Planning":
        return "planning";

      case "On Hold":
        return "on-hold";

      default:
        return "";
    }
  };

  // ============================================================
  // RISK CLASS
  // ============================================================

  const getRiskClass = (risk) => {
    switch (risk) {
      case "High":
        return "high";

      case "Medium":
        return "medium";

      case "Low":
        return "low";

      default:
        return "";
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-projects">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="admin-projects-header">

        <div>
          <h1>Projects</h1>

          <p>
            Monitor projects, estimations, resources,
            progress, and project risks.
          </p>
        </div>

      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="admin-project-summary">

        <div className="project-summary-card">

          <div className="project-summary-icon">
            <FolderKanban size={19} />
          </div>

          <div>
            <span>Total Projects</span>
            <strong>{totalProjects}</strong>
          </div>

        </div>

        <div className="project-summary-card">

          <div className="project-summary-icon">
            <Activity size={19} />
          </div>

          <div>
            <span>Active Projects</span>
            <strong>{activeProjects}</strong>
          </div>

        </div>

        <div className="project-summary-card">

          <div className="project-summary-icon">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedProjects}</strong>
          </div>

        </div>

        <div className="project-summary-card">

          <div className="project-summary-icon">
            <AlertTriangle size={19} />
          </div>

          <div>
            <span>High Risk</span>
            <strong>{highRiskProjects}</strong>
          </div>

        </div>

      </div>

      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <div className="admin-project-toolbar">

        <div className="project-search-box">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search projects, owners or types..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

        </div>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="All">
            All Status
          </option>

          <option value="Planning">
            Planning
          </option>

          <option value="In Development">
            In Development
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="On Hold">
            On Hold
          </option>
        </select>

        <select
          value={typeFilter}
          onChange={handleTypeChange}
        >
          <option value="All">
            All Types
          </option>

          <option value="Web Application">
            Web Application
          </option>

          <option value="Mobile Application">
            Mobile Application
          </option>

          <option value="Desktop Software">
            Desktop Software
          </option>

          <option value="AI / Machine Learning">
            AI / Machine Learning
          </option>

          <option value="SaaS">
            SaaS
          </option>
        </select>

      </div>

      {/* ======================================================
          PROJECT TABLE
      ====================================================== */}

      <div className="admin-project-table-card">

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

              {currentProjects.length > 0 ? (

                currentProjects.map((project) => (

                  <tr key={project.id}>

                    {/* PROJECT */}

                    <td>

                      <div className="project-name-cell">

                        <div className="project-name-icon">
                          <FolderKanban size={16} />
                        </div>

                        <div>

                          <strong>
                            {project.name}
                          </strong>

                          <span>
                            Created {project.created}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* OWNER */}

                    <td>

                      <div className="project-owner-cell">

                        <UserRound size={15} />

                        <span>
                          {project.owner}
                        </span>

                      </div>

                    </td>

                    {/* TYPE */}

                    <td>
                      <span className="project-type-text">
                        {project.type}
                      </span>
                    </td>

                    {/* ESTIMATION */}

                    <td>

                      <div className="project-estimation-cell">

                        <strong>
                          {project.cost}
                        </strong>

                        <span>
                          <Clock3 size={13} />
                          {project.duration}
                        </span>

                      </div>

                    </td>

                    {/* PROGRESS */}

                    <td>

                      <div className="project-progress-cell">

                        <div className="project-progress-header">

                          <span>
                            {project.progress}%
                          </span>

                        </div>

                        <div className="project-progress-bar">

                          <div
                            className="project-progress-fill"
                            style={{
                              width:
                                `${project.progress}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* TEAM */}

                    <td>

                      <div className="project-team-cell">

                        <Users size={15} />

                        <span>
                          {project.teamSize}
                        </span>

                      </div>

                    </td>

                    {/* RISK */}

                    <td>

                      <span
                        className={`project-risk-badge ${getRiskClass(
                          project.risk
                        )}`}
                      >
                        {project.risk}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`project-status-badge ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="project-actions">

                        <button
                          type="button"
                          className="project-action-btn"
                          title="View Project"
                          onClick={() =>
                            openProject(project)
                          }
                        >
                          <Eye size={16} />
                        </button>

                        <div className="project-more-wrapper">

                          <button
                            type="button"
                            className="project-action-btn"
                            title="More"
                            onClick={() =>
                              toggleMoreMenu(
                                project.id
                              )
                            }
                          >
                            <MoreHorizontal
                              size={17}
                            />
                          </button>

                          {openMoreMenu ===
                            project.id && (

                            <div className="project-more-menu">

                              <button
                                type="button"
                                onClick={() =>
                                  openProject(
                                    project
                                  )
                                }
                              >
                                <Eye size={15} />

                                <span>
                                  View Details
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openFullProject(
                                    project
                                  )
                                }
                              >
                                <ExternalLink
                                  size={15}
                                />

                                <span>
                                  View Full Project
                                </span>
                              </button>

                            </div>

                          )}

                        </div>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="project-empty-cell"
                  >

                    <FolderKanban size={30} />

                    <strong>
                      No projects found
                    </strong>

                    <span>
                      Try changing your search or
                      filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ====================================================
            FOOTER / PAGINATION
        ==================================================== */}

        <div className="projects-footer">

          <div className="projects-footer-info">

            Showing{" "}

            {filteredProjects.length === 0
              ? 0
              : startIndex + 1}

            {" - "}

            {Math.min(
              startIndex + projectsPerPage,
              filteredProjects.length
            )}

            {" of "}

            {filteredProjects.length}

            {" projects"}

          </div>

          <div className="projects-pagination">

            {/* PREVIOUS */}

            <button
              type="button"
              className="projects-page-btn"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                changePage(
                  safeCurrentPage - 1
                )
              }
            >
              <ChevronLeft size={15} />

              <span>
                Previous
              </span>
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                type="button"
                className={`projects-page-btn ${
                  safeCurrentPage === page
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  changePage(page)
                }
              >
                {page}
              </button>

            ))}

            {/* NEXT */}

            <button
              type="button"
              className="projects-page-btn"
              disabled={
                totalPages === 0 ||
                safeCurrentPage === totalPages
              }
              onClick={() =>
                changePage(
                  safeCurrentPage + 1
                )
              }
            >
              <span>
                Next
              </span>

              <ChevronRight size={15} />

            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          PROJECT DETAILS MODAL
      ====================================================== */}

      {showProjectModal &&
        selectedProject && (

        <div
          className="project-modal-overlay"
          onClick={closeProject}
        >

          <div
            className="project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="project-modal-header">

              <div>

                <span className="project-modal-label">
                  PROJECT DETAILS
                </span>

                <h2>
                  {selectedProject.name}
                </h2>

              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={closeProject}
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

                <span
                  className={`project-risk-badge ${getRiskClass(
                    selectedProject.risk
                  )}`}
                >
                  {selectedProject.risk} Risk
                </span>

              </div>

              <div className="project-modal-description">

                <h3>
                  Project Overview
                </h3>

                <p>
                  {selectedProject.description}
                </p>

              </div>

              <div className="project-detail-grid">

                <div className="project-detail-item">

                  <span>
                    Project Owner
                  </span>

                  <strong>
                    <UserRound size={15} />
                    {selectedProject.owner}
                  </strong>

                </div>

                <div className="project-detail-item">

                  <span>
                    Project Type
                  </span>

                  <strong>
                    {selectedProject.type}
                  </strong>

                </div>

                <div className="project-detail-item">

                  <span>
                    Estimated Cost
                  </span>

                  <strong>
                    <DollarSign size={15} />
                    {selectedProject.cost}
                  </strong>

                </div>

                <div className="project-detail-item">

                  <span>
                    Estimated Duration
                  </span>

                  <strong>
                    <Clock3 size={15} />
                    {selectedProject.duration}
                  </strong>

                </div>

                <div className="project-detail-item">

                  <span>
                    Created
                  </span>

                  <strong>
                    <CalendarDays size={15} />
                    {selectedProject.created}
                  </strong>

                </div>

                <div className="project-detail-item">

                  <span>
                    Deadline
                  </span>

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

                    <h3>
                      Project Progress
                    </h3>
                  </div>

                  <strong>
                    {selectedProject.progress}%
                  </strong>

                </div>

                <div className="project-progress-bar project-modal-progress">

                  <div
                    className="project-progress-fill"
                    style={{
                      width:
                        `${selectedProject.progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="project-modal-section">

                <div className="project-section-heading">

                  <div>
                    <Users size={17} />

                    <h3>
                      Assigned Resources
                    </h3>
                  </div>

                  <strong>
                    {selectedProject.teamSize}
                  </strong>

                </div>

                <div className="project-team-list">

                  {selectedProject.team.map(
                    (member, index) => (

                    <div
                      className="project-team-member"
                      key={index}
                    >

                      <div className="project-team-avatar">

                        {member.name
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {member.name}
                        </strong>

                        <span>
                          {member.role}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

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
                onClick={() =>
                  openFullProject(
                    selectedProject
                  )
                }
              >
                <ClipboardList size={16} />

                View Full Project
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          FULL PROJECT MODAL
      ====================================================== */}

      {showFullProjectModal &&
        selectedProject && (

        <div
          className="project-modal-overlay"
          onClick={closeFullProject}
        >

          <div
            className="project-modal project-full-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="project-modal-header">

              <div>

                <span className="project-modal-label">
                  FULL PROJECT
                </span>

                <h2>
                  {selectedProject.name}
                </h2>

              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={closeFullProject}
              >
                <X size={18} />
              </button>

            </div>

            <div className="project-modal-body">

              {/* OVERVIEW */}

              <div className="project-modal-description">

                <h3>
                  Project Overview
                </h3>

                <p>
                  {selectedProject.description}
                </p>

              </div>

              {/* PROJECT INFORMATION */}

              <div className="project-modal-section">

                <div className="project-section-heading">

                  <div>
                    <FolderKanban size={17} />

                    <h3>
                      Project Information
                    </h3>
                  </div>

                </div>

                <div className="project-detail-grid">

                  <div className="project-detail-item">

                    <span>
                      Project Name
                    </span>

                    <strong>
                      {selectedProject.name}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Owner
                    </span>

                    <strong>
                      {selectedProject.owner}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Project Type
                    </span>

                    <strong>
                      {selectedProject.type}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Status
                    </span>

                    <strong>
                      {selectedProject.status}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Created
                    </span>

                    <strong>
                      {selectedProject.created}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Deadline
                    </span>

                    <strong>
                      {selectedProject.deadline}
                    </strong>

                  </div>

                </div>

              </div>

              {/* ESTIMATION */}

              <div className="project-modal-section">

                <div className="project-section-heading">

                  <div>
                    <DollarSign size={17} />

                    <h3>
                      Estimation & Progress
                    </h3>
                  </div>

                </div>

                <div className="project-detail-grid">

                  <div className="project-detail-item">

                    <span>
                      Estimated Cost
                    </span>

                    <strong>
                      {selectedProject.cost}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Estimated Duration
                    </span>

                    <strong>
                      {selectedProject.duration}
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Current Progress
                    </span>

                    <strong>
                      {selectedProject.progress}%
                    </strong>

                  </div>

                  <div className="project-detail-item">

                    <span>
                      Project Risk
                    </span>

                    <strong>
                      {selectedProject.risk}
                    </strong>

                  </div>

                </div>

                <div className="project-progress-bar project-modal-progress">

                  <div
                    className="project-progress-fill"
                    style={{
                      width:
                        `${selectedProject.progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* RESOURCES */}

              <div className="project-modal-section">

                <div className="project-section-heading">

                  <div>
                    <Users size={17} />

                    <h3>
                      Assigned Resources
                    </h3>
                  </div>

                  <strong>
                    {selectedProject.teamSize}
                  </strong>

                </div>

                <div className="project-team-list">

                  {selectedProject.team.map(
                    (member, index) => (

                    <div
                      className="project-team-member"
                      key={index}
                    >

                      <div className="project-team-avatar">

                        {member.name
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {member.name}
                        </strong>

                        <span>
                          {member.role}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* ADMIN MONITORING */}

              <div className="project-modal-section">

                <div className="project-section-heading">

                  <div>
                    <ShieldAlert size={17} />

                    <h3>
                      Administrative Monitoring
                    </h3>
                  </div>

                </div>

                <div className="project-admin-note">

                  <p>
                    This project is currently being
                    monitored through the PlanWise
                    administrative panel. Resource
                    allocation, project progress,
                    estimated cost, timeline, and
                    project risks can be reviewed
                    and managed by authorized
                    administrators.
                  </p>

                </div>

              </div>

            </div>

            <div className="project-modal-actions">

              <button
                type="button"
                className="project-secondary-btn"
                onClick={() => {
                  setShowFullProjectModal(false);
                  setShowProjectModal(true);
                }}
              >
                Back to Details
              </button>

              <button
                type="button"
                className="project-primary-btn"
                onClick={closeFullProject}
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

export default AdminProjects;