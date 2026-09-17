import {
  ListTodo,
  Search,
  Filter,
  CalendarDays,
  ArrowRight,
  X,
  CircleDot,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./EmployeeTasks.css";

function EmployeeTasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "Implement authentication API",
      project: "AI Learning Platform",
      priority: "High",
      status: "In Progress",
      dueDate: "Sep 19, 2026",
      progress: 70,
    },
    {
      id: 2,
      title: "Database integration",
      project: "E-Commerce Marketplace",
      priority: "High",
      status: "Pending",
      dueDate: "Sep 21, 2026",
      progress: 30,
    },
    {
      id: 3,
      title: "Review API documentation",
      project: "Company Management Portal",
      priority: "Medium",
      status: "Pending",
      dueDate: "Sep 23, 2026",
      progress: 10,
    },
    {
      id: 4,
      title: "Build project authentication middleware",
      project: "AI Learning Platform",
      priority: "High",
      status: "Completed",
      dueDate: "Sep 16, 2026",
      progress: 100,
    },
    {
      id: 5,
      title: "Create product API endpoints",
      project: "E-Commerce Marketplace",
      priority: "Medium",
      status: "In Progress",
      dueDate: "Sep 26, 2026",
      progress: 55,
    },
    {
      id: 6,
      title: "Prepare deployment configuration",
      project: "Company Management Portal",
      priority: "Low",
      status: "Pending",
      dueDate: "Sep 29, 2026",
      progress: 0,
    },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.project.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    searchTerm,
    statusFilter,
    priorityFilter,
  ]);

  const clearFilters = () => {
    setStatusFilter("All");
    setPriorityFilter("All");
    setShowFilter(false);
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle2 />;
    }

    if (status === "In Progress") {
      return <Clock3 />;
    }

    return <CircleDot />;
  };

  return (
    <div className="employee-tasks-page">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <section className="employee-tasks-header">

        <div>
          <span className="employee-tasks-eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>My Tasks</h1>

          <p>
            View and manage the tasks assigned to you
            across your active projects.
          </p>
        </div>

      </section>


      {/* ======================================================
          SUMMARY
          ====================================================== */}

      <section className="employee-tasks-summary">

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <ListTodo />
          </div>

          <div>
            <span>TOTAL TASKS</span>
            <strong>{tasks.length}</strong>
            <p>Assigned to you</p>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <Clock3 />
          </div>

          <div>
            <span>IN PROGRESS</span>

            <strong>
              {
                tasks.filter(
                  (task) => task.status === "In Progress"
                ).length
              }
            </strong>

            <p>Currently working</p>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <CalendarDays />
          </div>

          <div>
            <span>DUE SOON</span>

            <strong>3</strong>

            <p>Within 7 days</p>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <CheckCircle2 />
          </div>

          <div>
            <span>COMPLETED</span>

            <strong>
              {
                tasks.filter(
                  (task) => task.status === "Completed"
                ).length
              }
            </strong>

            <p>Completed tasks</p>
          </div>

        </div>

      </section>


      {/* ======================================================
          TASK SECTION
          ====================================================== */}

      <section className="employee-tasks-section">

        <div className="employee-tasks-section-header">

          <div>
            <span className="employee-tasks-section-eyebrow">
              ASSIGNED WORK
            </span>

            <h2>Task List</h2>

            <p>
              Tasks currently assigned to your employee account.
            </p>
          </div>


          <div className="employee-tasks-actions">

            <div className="employee-tasks-search">

              <Search />

              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="employee-tasks-search-clear"
                  onClick={() => setSearchTerm("")}
                  title="Clear search"
                >
                  <X />
                </button>
              )}

            </div>


            <button
              type="button"
              className={`employee-tasks-filter-button ${
                showFilter ? "active" : ""
              }`}
              onClick={() =>
                setShowFilter(!showFilter)
              }
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
          <div className="employee-tasks-filter-panel">

            <div className="employee-task-filter-field">

              <label htmlFor="employee-task-status">
                Status
              </label>

              <select
                id="employee-task-status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

            </div>


            <div className="employee-task-filter-field">

              <label htmlFor="employee-task-priority">
                Priority
              </label>

              <select
                id="employee-task-priority"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">
                  All Priorities
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


            <button
              type="button"
              className="employee-task-clear-filter"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}


        {/* ====================================================
            RESULTS
            ==================================================== */}

        <div className="employee-task-results-info">
          Showing{" "}
          <strong>{filteredTasks.length}</strong>{" "}
          of{" "}
          <strong>{tasks.length}</strong> tasks
        </div>


        {/* ====================================================
            TASK LIST
            ==================================================== */}

        {filteredTasks.length > 0 ? (

          <div className="employee-tasks-list">

            {filteredTasks.map((task) => (

              <article
                className="employee-task-card"
                key={task.id}
              >

                <div className="employee-task-card-main">

                  <div
                    className={`employee-task-card-icon ${
                      task.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {getStatusIcon(task.status)}
                  </div>


                  <div className="employee-task-card-content">

                    <div className="employee-task-title-row">

                      <div>
                        <h3>{task.title}</h3>

                        <span>
                          {task.project}
                        </span>
                      </div>


                      <span
                        className={`employee-task-status-badge ${
                          task.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >
                        {task.status}
                      </span>

                    </div>


                    <div className="employee-task-meta">

                      <div>
                        <span>PRIORITY</span>

                        <strong
                          className={`priority-${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </strong>
                      </div>


                      <div>
                        <span>DUE DATE</span>

                        <strong>
                          {task.dueDate}
                        </strong>
                      </div>


                      <div>
                        <span>PROJECT</span>

                        <strong>
                          {task.project}
                        </strong>
                      </div>

                    </div>


                    <div className="employee-task-progress">

                      <div className="employee-task-progress-header">

                        <span>
                          Task Progress
                        </span>

                        <strong>
                          {task.progress}%
                        </strong>

                      </div>


                      <div className="employee-task-progress-track">

                        <div
                          className="employee-task-progress-bar"
                          style={{
                            width: `${task.progress}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  </div>

                </div>


                <div className="employee-task-card-action">

                  <a
                    href={`/employee/tasks/${task.id}`}
                    className="employee-task-view-button"
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

          <div className="employee-tasks-empty">

            <div className="employee-tasks-empty-icon">
              <ListTodo />
            </div>

            <h3>No tasks found</h3>

            <p>
              No assigned tasks match your current
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

export default EmployeeTasks;