import {
  FolderKanban,
  Search,
  Filter,
  CalendarDays,
  Users,
  ArrowRight,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./EmployeeProjects.css";

function EmployeeProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const projects = [
    {
      id: 1,
      name: "AI Learning Platform",
      type: "AI / Machine Learning",
      role: "Backend Developer",
      status: "In Progress",
      progress: 68,
      deadline: "Oct 18, 2026",
      priority: "High",
      teamSize: 5,
    },
    {
      id: 2,
      name: "E-Commerce Marketplace",
      type: "E-Commerce",
      role: "Backend Developer",
      status: "In Progress",
      progress: 52,
      deadline: "Nov 04, 2026",
      priority: "Medium",
      teamSize: 4,
    },
    {
      id: 3,
      name: "Company Management Portal",
      type: "Web Application",
      role: "Backend Developer",
      status: "Planning",
      progress: 18,
      deadline: "Dec 12, 2026",
      priority: "High",
      teamSize: 5,
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
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

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const clearFilters = () => {
    setStatusFilter("All");
    setTypeFilter("All");
    setShowFilter(false);
  };

  return (
    <div className="employee-projects-page">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <section className="employee-projects-header">

        <div>
          <span className="employee-projects-eyebrow">
            PROJECT WORKSPACE
          </span>

          <h1>My Projects</h1>

          <p>
            View and manage the projects currently assigned
            to you.
          </p>
        </div>

      </section>


      {/* ======================================================
          SUMMARY
          ====================================================== */}

      <section className="employee-projects-summary">

        <div className="employee-project-summary-card">
          <div className="employee-project-summary-icon">
            <FolderKanban />
          </div>

          <div>
            <span>ASSIGNED PROJECTS</span>
            <strong>{projects.length}</strong>
            <p>Currently assigned</p>
          </div>
        </div>


        <div className="employee-project-summary-card">
          <div className="employee-project-summary-icon">
            <CalendarDays />
          </div>

          <div>
            <span>IN PROGRESS</span>
            <strong>
              {projects.filter(
                (project) => project.status === "In Progress"
              ).length}
            </strong>
            <p>Active projects</p>
          </div>
        </div>


        <div className="employee-project-summary-card">
          <div className="employee-project-summary-icon">
            <Users />
          </div>

          <div>
            <span>TEAM MEMBERS</span>
            <strong>5</strong>
            <p>Across assigned work</p>
          </div>
        </div>

      </section>


      {/* ======================================================
          PROJECT SECTION
          ====================================================== */}

      <section className="employee-projects-section">

        <div className="employee-projects-section-header">

          <div>
            <span className="employee-projects-section-eyebrow">
              ASSIGNED WORK
            </span>

            <h2>Project List</h2>

            <p>
              Projects assigned to your employee account.
            </p>
          </div>


          <div className="employee-projects-actions">

            <div className="employee-projects-search">
              <Search />

              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="employee-projects-search-clear"
                  onClick={() => setSearchTerm("")}
                  title="Clear search"
                >
                  <X />
                </button>
              )}
            </div>


            <button
              type="button"
              className={`employee-projects-filter-button ${
                showFilter ? "active" : ""
              }`}
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter />
              Filter
            </button>

          </div>

        </div>


        {/* ====================================================
            FILTER PANEL
            ==================================================== */}

        {showFilter && (
          <div className="employee-projects-filter-panel">

            <div className="employee-project-filter-field">
              <label htmlFor="employee-project-status">
                Status
              </label>

              <select
                id="employee-project-status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Planning">
                  Planning
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>


            <div className="employee-project-filter-field">
              <label htmlFor="employee-project-type">
                Project Type
              </label>

              <select
                id="employee-project-type"
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
              >
                <option value="All">All Types</option>
                <option value="AI / Machine Learning">
                  AI / Machine Learning
                </option>
                <option value="E-Commerce">
                  E-Commerce
                </option>
                <option value="Web Application">
                  Web Application
                </option>
              </select>
            </div>


            <button
              type="button"
              className="employee-project-clear-filter"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}


        {/* ====================================================
            PROJECT COUNT
            ==================================================== */}

        <div className="employee-project-results-info">
          <span>
            Showing{" "}
            <strong>{filteredProjects.length}</strong>{" "}
            of{" "}
            <strong>{projects.length}</strong> projects
          </span>
        </div>


        {/* ====================================================
            PROJECT CARDS
            ==================================================== */}

        {filteredProjects.length > 0 ? (
          <div className="employee-projects-list">

            {filteredProjects.map((project) => (
              <article
                className="employee-project-card"
                key={project.id}
              >

                <div className="employee-project-card-main">

                  <div className="employee-project-card-icon">
                    <FolderKanban />
                  </div>


                  <div className="employee-project-card-content">

                    <div className="employee-project-card-title-row">

                      <div>
                        <h3>{project.name}</h3>

                        <span className="employee-project-type">
                          {project.type}
                        </span>
                      </div>

                      <span
                        className={`employee-project-status-badge ${
                          project.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >
                        {project.status}
                      </span>

                    </div>


                    <div className="employee-project-meta">

                      <div>
                        <span>YOUR ROLE</span>
                        <strong>{project.role}</strong>
                      </div>

                      <div>
                        <span>PRIORITY</span>
                        <strong>{project.priority}</strong>
                      </div>

                      <div>
                        <span>TEAM SIZE</span>
                        <strong>
                          {project.teamSize} members
                        </strong>
                      </div>

                      <div>
                        <span>DEADLINE</span>
                        <strong>{project.deadline}</strong>
                      </div>

                    </div>


                    <div className="employee-project-progress">

                      <div className="employee-project-progress-header">
                        <span>Project Progress</span>
                        <strong>{project.progress}%</strong>
                      </div>

                      <div className="employee-project-progress-track">
                        <div
                          className="employee-project-progress-bar"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                  </div>

                </div>


                <div className="employee-project-card-action">

                  <a
                    href={`/employee/projects/${project.id}`}
                    className="employee-project-view-button"
                  >
                    View Details
                    <ArrowRight />
                  </a>

                </div>

              </article>
            ))}

          </div>
        ) : (

          /* ==================================================
             EMPTY STATE
             ================================================== */

          <div className="employee-projects-empty">

            <div className="employee-projects-empty-icon">
              <FolderKanban />
            </div>

            <h3>No projects found</h3>

            <p>
              No assigned projects match your current
              search or filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                clearFilters();
              }}
            >
              Clear Search & Filters
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default EmployeeProjects;