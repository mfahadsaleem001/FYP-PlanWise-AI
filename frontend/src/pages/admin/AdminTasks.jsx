import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  Eye,
  UserRound,
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  CircleDot,
  X,
  UserCheck,
  ClipboardList,
} from "lucide-react";

import "./AdminTasks.css";

function AdminTasks() {
  // ============================================================
  // DEMO TASKS
  // ============================================================

  const [tasks] = useState([
    {
      id: 1,
      title: "Build Authentication API",
      project: "E-Commerce Platform",
      projectType: "Web Application",
      assignee: "Ali Raza",
      role: "Backend Developer",
      priority: "High",
      status: "In Progress",
      dueDate: "20 Sep 2026",
      progress: 65,
      description:
        "Develop secure authentication APIs including registration, login, password hashing, JWT authentication, and protected endpoints.",
    },
    {
      id: 2,
      title: "Create Product Management UI",
      project: "E-Commerce Platform",
      projectType: "Web Application",
      assignee: "Ahmed Ali",
      role: "Frontend Developer",
      priority: "Medium",
      status: "Assigned",
      dueDate: "23 Sep 2026",
      progress: 20,
      description:
        "Build responsive product listing, product details, search, filtering, and product management interface.",
    },
    {
      id: 3,
      title: "API Testing & Validation",
      project: "E-Commerce Platform",
      projectType: "Web Application",
      assignee: "Sara Ahmed",
      role: "QA Engineer",
      priority: "High",
      status: "Pending",
      dueDate: "27 Sep 2026",
      progress: 0,
      description:
        "Validate authentication and product APIs using functional, validation, error-handling, and regression test cases.",
    },
    {
      id: 4,
      title: "Recommendation Pipeline",
      project: "AI Recommendation Engine",
      projectType: "AI / Machine Learning",
      assignee: "Usman Tariq",
      role: "ML Engineer",
      priority: "High",
      status: "In Progress",
      dueDate: "30 Sep 2026",
      progress: 48,
      description:
        "Prepare recommendation pipeline, feature processing, model inference, and prediction integration.",
    },
    {
      id: 5,
      title: "Mobile App Wireframes",
      project: "Customer Mobile App",
      projectType: "Mobile Application",
      assignee: "Mariam Iqbal",
      role: "UI/UX Designer",
      priority: "Medium",
      status: "Completed",
      dueDate: "12 Sep 2026",
      progress: 100,
      description:
        "Create user flows, wireframes, and responsive mobile interface designs for the customer application.",
    },
    {
      id: 6,
      title: "Dashboard Analytics",
      project: "Business Analytics Portal",
      projectType: "Web Application",
      assignee: "Hamza Khan",
      role: "Backend Developer",
      priority: "Low",
      status: "Completed",
      dueDate: "18 Aug 2026",
      progress: 100,
      description:
        "Implement backend services required for dashboard analytics, reporting, and business metrics.",
    },
    {
      id: 7,
      title: "Deployment Configuration",
      project: "Healthcare Management System",
      projectType: "Desktop Software",
      assignee: "Ali Raza",
      role: "Backend Developer",
      priority: "Medium",
      status: "Assigned",
      dueDate: "05 Oct 2026",
      progress: 10,
      description:
        "Prepare deployment configuration, environment settings, service configuration, and production readiness checks.",
    },
    {
      id: 8,
      title: "Risk & Security Testing",
      project: "SaaS Project Management Tool",
      projectType: "SaaS",
      assignee: "Sara Ahmed",
      role: "QA Engineer",
      priority: "High",
      status: "Pending",
      dueDate: "10 Oct 2026",
      progress: 0,
      description:
        "Perform security-focused validation, permission testing, error handling checks, and risk-based QA testing.",
    },
  ]);

  // ============================================================
  // STATE
  // ============================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] =
    useState("All Priority");

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  const [assignTask, setAssignTask] = useState(null);

  // ============================================================
  // FILTER TASKS
  // ============================================================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchValue) ||
        task.project.toLowerCase().includes(searchValue) ||
        task.assignee.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All Priority" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  // ============================================================
  // TASK MODAL
  // ============================================================

  const openTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  // ============================================================
  // ASSIGN TASK MODAL
  // ============================================================

  const openAssignModal = (task) => {
    setAssignTask(task);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setAssignTask(null);
    setShowAssignModal(false);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-tasks">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="admin-tasks-header">

        <div>
          <div className="admin-tasks-eyebrow">
            MANAGEMENT
          </div>

          <h1>Tasks & Assignments</h1>

          <p>
            Create, assign, and monitor project tasks
            across available team resources.
          </p>
        </div>

        <button
          className="admin-tasks-primary-button"
          onClick={() => openAssignModal(null)}
        >
          <Plus size={16} />
          Create Task
        </button>

      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="admin-task-stat-grid">

        <div className="admin-task-stat-card">

          <div className="admin-task-stat-top">

            <span className="admin-task-stat-label">
              Total Tasks
            </span>

            <div className="admin-task-stat-icon">
              <ClipboardList size={18} />
            </div>

          </div>

          <div className="admin-task-stat-value">
            {totalTasks}
          </div>

          <div className="admin-task-stat-footer">
            Across all projects
          </div>

        </div>

        <div className="admin-task-stat-card">

          <div className="admin-task-stat-top">

            <span className="admin-task-stat-label">
              In Progress
            </span>

            <div className="admin-task-stat-icon">
              <CircleDot size={18} />
            </div>

          </div>

          <div className="admin-task-stat-value">
            {inProgressTasks}
          </div>

          <div className="admin-task-stat-footer">
            Currently being worked on
          </div>

        </div>

        <div className="admin-task-stat-card">

          <div className="admin-task-stat-top">

            <span className="admin-task-stat-label">
              Pending
            </span>

            <div className="admin-task-stat-icon">
              <Clock3 size={18} />
            </div>

          </div>

          <div className="admin-task-stat-value">
            {pendingTasks}
          </div>

          <div className="admin-task-stat-footer">
            Waiting to start
          </div>

        </div>

        <div className="admin-task-stat-card">

          <div className="admin-task-stat-top">

            <span className="admin-task-stat-label">
              Completed
            </span>

            <div className="admin-task-stat-icon">
              <CheckCircle2 size={18} />
            </div>

          </div>

          <div className="admin-task-stat-value">
            {completedTasks}
          </div>

          <div className="admin-task-stat-footer">
            Successfully completed
          </div>

        </div>

      </div>

      {/* ======================================================
          TASKS PANEL
      ====================================================== */}

      <section className="admin-tasks-panel">

        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <div className="admin-tasks-toolbar">

          <div className="admin-tasks-panel-title">

            <span>Project Tasks</span>

            <small>
              {filteredTasks.length} tasks
            </small>

          </div>

          <div className="admin-tasks-toolbar-right">

            {/* SEARCH */}

            <div className="admin-tasks-search">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search tasks, projects, employees..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            {/* STATUS */}

            <select
              className="admin-tasks-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            {/* PRIORITY */}

            <select
              className="admin-tasks-filter"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

        <div className="admin-tasks-table-wrapper">

          <table className="admin-tasks-table">

            <thead>

              <tr>

                <th>Task</th>

                <th>Project</th>

                <th>Assigned To</th>

                <th>Priority</th>

                <th>Due Date</th>

                <th>Progress</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.length > 0 ? (

                filteredTasks.map((task) => (

                  <tr key={task.id}>

                    {/* TASK */}

                    <td>

                      <div className="admin-task-title-cell">

                        <div className="admin-task-title-icon">
                          <ClipboardList size={15} />
                        </div>

                        <div className="admin-task-title-info">

                          <strong>
                            {task.title}
                          </strong>

                          <span>
                            {task.role}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* PROJECT */}

                    <td>

                      <div className="admin-task-project">

                        <FolderKanban size={14} />

                        <span>
                          {task.project}
                        </span>

                      </div>

                    </td>

                    {/* ASSIGNED TO */}

                    <td>

                      <div className="admin-task-assignee">

                        <div className="admin-task-assignee-avatar">
                          {task.assignee
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {task.assignee}
                          </strong>

                          <span>
                            {task.role}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* PRIORITY */}

                    <td>

                      <span
                        className={`admin-task-priority admin-task-priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>

                    </td>

                    {/* DUE DATE */}

                    <td>

                      <div className="admin-task-due-date">

                        <CalendarDays size={13} />

                        {task.dueDate}

                      </div>

                    </td>

                    {/* PROGRESS */}

                    <td>

                      <div className="admin-task-progress-cell">

                        <div className="admin-task-progress-top">

                          <span>
                            {task.progress}%
                          </span>

                        </div>

                        <div className="admin-task-progress-track">

                          <div
                            className="admin-task-progress-fill"
                            style={{
                              width: `${task.progress}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`admin-task-status admin-task-status-${task.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {task.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="admin-task-actions">

                        <button
                          className="admin-table-action"
                          title="View Task"
                          onClick={() =>
                            openTask(task)
                          }
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          className="admin-table-action"
                          title="Assign / Reassign Task"
                          onClick={() =>
                            openAssignModal(task)
                          }
                        >
                          <UserCheck size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="admin-tasks-empty"
                  >
                    No tasks found matching your
                    current filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="admin-tasks-footer">

          <span>
            Showing {filteredTasks.length} of{" "}
            {totalTasks} tasks
          </span>

          <div className="admin-tasks-pagination">

            <button
              className="admin-pagination-button"
              disabled
            >
              Previous
            </button>

            <button className="admin-pagination-current">
              1
            </button>

            <button
              className="admin-pagination-button"
              disabled
            >
              Next
            </button>

          </div>

        </div>

      </section>

      {/* ======================================================
          TASK DETAILS MODAL
      ====================================================== */}

      {showTaskModal && selectedTask && (

        <div
          className="admin-task-modal-overlay"
          onClick={closeTaskModal}
        >

          <div
            className="admin-task-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-task-modal-header">

              <div>

                <div className="admin-task-modal-eyebrow">
                  TASK DETAILS
                </div>

                <h2>
                  {selectedTask.title}
                </h2>

              </div>

              <button
                className="admin-task-modal-close"
                onClick={closeTaskModal}
                title="Close"
              >
                <X size={18} />
              </button>

            </div>

            {/* TASK INFORMATION */}

            <div className="admin-task-detail-section">

              <div className="admin-task-detail-label">
                Description
              </div>

              <p className="admin-task-description">
                {selectedTask.description}
              </p>

            </div>

            {/* DETAIL GRID */}

            <div className="admin-task-detail-grid">

              <div className="admin-task-detail-card">

                <FolderKanban size={16} />

                <div>
                  <span>Project</span>
                  <strong>
                    {selectedTask.project}
                  </strong>
                </div>

              </div>

              <div className="admin-task-detail-card">

                <UserRound size={16} />

                <div>
                  <span>Assigned To</span>
                  <strong>
                    {selectedTask.assignee}
                  </strong>
                </div>

              </div>

              <div className="admin-task-detail-card">

                <CalendarDays size={16} />

                <div>
                  <span>Due Date</span>
                  <strong>
                    {selectedTask.dueDate}
                  </strong>
                </div>

              </div>

              <div className="admin-task-detail-card">

                <AlertTriangle size={16} />

                <div>
                  <span>Priority</span>
                  <strong>
                    {selectedTask.priority}
                  </strong>
                </div>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="admin-task-modal-progress">

              <div className="admin-task-modal-progress-header">

                <span>
                  Task Progress
                </span>

                <strong>
                  {selectedTask.progress}%
                </strong>

              </div>

              <div className="admin-task-progress-track">

                <div
                  className="admin-task-progress-fill"
                  style={{
                    width: `${selectedTask.progress}%`,
                  }}
                />

              </div>

            </div>

            {/* STATUS */}

            <div className="admin-task-modal-status">

              <span>
                Current Status
              </span>

              <span
                className={`admin-task-status admin-task-status-${selectedTask.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {selectedTask.status}
              </span>

            </div>

            {/* ACTIONS */}

            <div className="admin-task-modal-actions">

              <button
                className="admin-task-secondary-button"
                onClick={closeTaskModal}
              >
                Close
              </button>

              <button
                className="admin-task-primary-button"
                onClick={() => {
                  closeTaskModal();
                  openAssignModal(selectedTask);
                }}
              >
                <UserCheck size={15} />
                Assign / Reassign
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          ASSIGN TASK MODAL
      ====================================================== */}

      {showAssignModal && (

        <div
          className="admin-task-modal-overlay"
          onClick={closeAssignModal}
        >

          <div
            className="admin-task-assign-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-task-modal-header">

              <div>

                <div className="admin-task-modal-eyebrow">
                  TASK ASSIGNMENT
                </div>

                <h2>
                  {assignTask
                    ? "Assign / Reassign Task"
                    : "Create Task"}
                </h2>

              </div>

              <button
                className="admin-task-modal-close"
                onClick={closeAssignModal}
                title="Close"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <div className="admin-task-form">

              {/* TASK NAME */}

              <div className="admin-task-form-group">

                <label>
                  Task Name
                </label>

                <input
                  type="text"
                  placeholder="Enter task name"
                  defaultValue={
                    assignTask
                      ? assignTask.title
                      : ""
                  }
                />

              </div>

              {/* PROJECT */}

              <div className="admin-task-form-group">

                <label>
                  Project
                </label>

                <select
                  defaultValue={
                    assignTask
                      ? assignTask.project
                      : ""
                  }
                >
                  <option value="">
                    Select project
                  </option>
                  <option>
                    E-Commerce Platform
                  </option>
                  <option>
                    AI Recommendation Engine
                  </option>
                  <option>
                    Customer Mobile App
                  </option>
                  <option>
                    Business Analytics Portal
                  </option>
                  <option>
                    Healthcare Management System
                  </option>
                  <option>
                    SaaS Project Management Tool
                  </option>
                </select>

              </div>

              {/* ASSIGNEE */}

              <div className="admin-task-form-group">

                <label>
                  Assign Employee
                </label>

                <select
                  defaultValue={
                    assignTask
                      ? assignTask.assignee
                      : ""
                  }
                >
                  <option value="">
                    Select employee
                  </option>
                  <option>Ali Raza</option>
                  <option>Ahmed Ali</option>
                  <option>Mariam Iqbal</option>
                  <option>Sara Ahmed</option>
                  <option>Usman Tariq</option>
                  <option>Hamza Khan</option>
                  <option>Ayesha Malik</option>
                </select>

              </div>

              {/* PRIORITY */}

              <div className="admin-task-form-row">

                <div className="admin-task-form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    defaultValue={
                      assignTask
                        ? assignTask.priority
                        : "Medium"
                    }
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>

                </div>

                {/* DUE DATE */}

                <div className="admin-task-form-group">

                  <label>
                    Due Date
                  </label>

                  <input
                    type="date"
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="admin-task-form-group">

                <label>
                  Task Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Describe the task requirements..."
                  defaultValue={
                    assignTask
                      ? assignTask.description
                      : ""
                  }
                />

              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="admin-task-modal-actions">

              <button
                className="admin-task-secondary-button"
                onClick={closeAssignModal}
              >
                Cancel
              </button>

              <button
                className="admin-task-primary-button"
                onClick={closeAssignModal}
              >
                <UserCheck size={15} />
                {assignTask
                  ? "Update Assignment"
                  : "Create & Assign"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminTasks;