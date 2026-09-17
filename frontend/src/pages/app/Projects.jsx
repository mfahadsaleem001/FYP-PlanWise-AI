import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Clock3,
  Users,
  FolderKanban,
} from "lucide-react";

import "./Projects.css";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectType, setProjectType] = useState("all");

  const projects = [
    {
      id: 1,
      name: "AI Learning Platform",
      type: "AI / Machine Learning",
      estimate: "PKR 1.20M",
      duration: "6 months",
      complexity: "High",
      status: "Completed",
    },
    {
      id: 2,
      name: "E-Commerce Marketplace",
      type: "E-Commerce",
      estimate: "PKR 850K",
      duration: "5 months",
      complexity: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Healthcare Mobile App",
      type: "Mobile Application",
      estimate: "PKR 1.05M",
      duration: "7 months",
      complexity: "High",
      status: "Planning",
    },
    {
      id: 4,
      name: "Company Management Portal",
      type: "Web Application",
      estimate: "PKR 620K",
      duration: "4 months",
      complexity: "Medium",
      status: "Completed",
    },
    {
      id: 5,
      name: "Cloud SaaS Platform",
      type: "SaaS",
      estimate: "PKR 1.45M",
      duration: "8 months",
      complexity: "High",
      status: "Planning",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      projectType === "all" ||
      project.type === projectType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="projects-page">

      {/* PAGE HEADER */}

      <section className="projects-header">

        <div>

          <span className="projects-label">
            PROJECT MANAGEMENT
          </span>

          <h1>
            Your Projects
          </h1>

          <p>
            View, search, and manage your previously analyzed
            software projects and their estimates.
          </p>

        </div>

        <a
          href="/app/estimate/new"
          className="projects-new-btn"
        >
          <span>+</span>
          New Estimate
        </a>

      </section>



      {/* PROJECT SUMMARY */}

      <section className="projects-summary">

        <div className="project-summary-card">

          <div className="summary-icon">
            <FolderKanban />
          </div>

          <div>

            <span>
              Total Projects
            </span>

            <strong>
              5
            </strong>

          </div>

        </div>


        <div className="project-summary-card">

          <div className="summary-icon">
            <Clock3 />
          </div>

          <div>

            <span>
              Active Projects
            </span>

            <strong>
              3
            </strong>

          </div>

        </div>


        <div className="project-summary-card">

          <div className="summary-icon">
            <Users />
          </div>

          <div>

            <span>
              Total Estimates
            </span>

            <strong>
              5
            </strong>

          </div>

        </div>

      </section>



      {/* PROJECT LIST */}

      <section className="projects-card">

        <div className="projects-card-header">

          <div>

            <span className="section-step">
              PROJECT LIBRARY
            </span>

            <h2>
              All projects
            </h2>

            <p>
              Your saved project estimates and planning analyses.
            </p>

          </div>

        </div>



        {/* SEARCH + FILTER */}

        <div className="projects-toolbar">

          <div className="projects-search">

            <Search />

            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>


          <div className="projects-filter">

            <Filter />

            <select
              value={projectType}
              onChange={(event) =>
                setProjectType(event.target.value)
              }
            >

              <option value="all">
                All Project Types
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

              <option value="E-Commerce">
                E-Commerce
              </option>

            </select>

          </div>

        </div>



        {/* TABLE */}

        <div className="projects-table-wrapper">

          <table className="projects-table">

            <thead>

              <tr>

                <th>
                  PROJECT
                </th>

                <th>
                  TYPE
                </th>

                <th>
                  ESTIMATE
                </th>

                <th>
                  DURATION
                </th>

                <th>
                  COMPLEXITY
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredProjects.length > 0 ? (

                filteredProjects.map((project) => (

                  <tr key={project.id}>

                    <td>

                      <div className="project-name-cell">

                        <div className="project-table-icon">
                          <FolderKanban />
                        </div>

                        <div>

                          <strong>
                            {project.name}
                          </strong>

                          <span>
                            Project #
                            {String(project.id).padStart(3, "0")}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="project-type">
                        {project.type}
                      </span>

                    </td>


                    <td>

                      <strong className="estimate-value">
                        {project.estimate}
                      </strong>

                    </td>


                    <td>
                      {project.duration}
                    </td>


                    <td>

                      <span
                        className={`complexity-badge complexity-${project.complexity.toLowerCase()}`}
                      >
                        {project.complexity}
                      </span>

                    </td>


                    <td>

                      <span
                        className={`status-badge status-${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>

                    </td>


                    <td>

                      <a
                        href={`/app/projects/${project.id}`}
                        className="view-project-btn"
                      >

                        <Eye />

                        View

                      </a>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="projects-empty-state"
                  >
                    No projects found matching your search or filter.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>



      {/* FOOT NOTE */}

      <section className="projects-note">

        <div className="projects-note-mark">
          i
        </div>

        <div>

          <strong>
            Intelligent project history
          </strong>

          <p>
            Saved projects will later contain their complete
            estimation results, risks, recommendations,
            resource planning, milestones, and financial analysis.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Projects;