import "./AdminTasks.css";

import React, { useEffect, useMemo, useState } from "react";

import {
  Activity,
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  FileText,
  Flag,
  FolderKanban,
  ListChecks,
  Plus,
  RefreshCcw,
  Save,
  Search,
  UserPlus,
  Users,
  X,
} from "lucide-react";

/* ==========================================================================
   Demo Employee Directory
   ========================================================================== */

const teamMembers = [
  {
    id: "emp-001",
    name: "Ali Raza",
    role: "Backend Developer",
    availability: "Available",
    workload: 2,
  },
  {
    id: "emp-002",
    name: "Ahmed Ali",
    role: "Frontend Developer",
    availability: "Available",
    workload: 1,
  },
  {
    id: "emp-003",
    name: "Sara Ahmed",
    role: "UI/UX Designer",
    availability: "Available",
    workload: 2,
  },
  {
    id: "emp-004",
    name: "Usman Tariq",
    role: "ML Engineer",
    availability: "Available",
    workload: 3,
  },
  {
    id: "emp-005",
    name: "Mariam Iqbal",
    role: "AI Engineer",
    availability: "Available",
    workload: 1,
  },
  {
    id: "emp-006",
    name: "Hamza Khan",
    role: "Backend Developer",
    availability: "Available",
    workload: 2,
  },
  {
    id: "emp-007",
    name: "Ayesha Malik",
    role: "Frontend Developer",
    availability: "Available",
    workload: 0,
  },
];

/* ==========================================================================
   Demo Tasks
   ========================================================================== */

const initialTasks = [
  {
    id: 1,
    title: "Design Authentication Flow",
    project: "PlanWise AI",
    assignedTo: ["emp-003", "emp-002"],
    priority: "High",
    dueDate: "2026-10-08",
    progress: 72,
    status: "In Progress",
    description:
      "Finalize authentication screens and connect the frontend flow with the planned protected-route structure.",
  },
  {
    id: 2,
    title: "Develop Project Estimation API",
    project: "PlanWise AI",
    assignedTo: ["emp-001", "emp-006"],
    priority: "High",
    dueDate: "2026-10-10",
    progress: 48,
    status: "In Progress",
    description:
      "Implement the backend estimation endpoint and prepare the API structure for ML inference.",
  },
  {
    id: 3,
    title: "Prepare ML Feature Pipeline",
    project: "PlanWise AI",
    assignedTo: ["emp-004", "emp-005"],
    priority: "Critical",
    dueDate: "2026-10-12",
    progress: 36,
    status: "In Progress",
    description:
      "Prepare feature engineering and preprocessing required before connecting the trained estimation model.",
  },
  {
    id: 4,
    title: "Build Risk Analysis Interface",
    project: "PlanWise AI",
    assignedTo: ["emp-002", "emp-003"],
    priority: "Medium",
    dueDate: "2026-10-15",
    progress: 20,
    status: "Assigned",
    description:
      "Create the risk analysis interface with severity indicators and mitigation information.",
  },
  {
    id: 5,
    title: "Create Resource Planning Module",
    project: "PlanWise AI",
    assignedTo: ["emp-001", "emp-004", "emp-005"],
    priority: "High",
    dueDate: "2026-10-17",
    progress: 15,
    status: "Assigned",
    description:
      "Build the resource planning workflow for project requirements, availability and resource gaps.",
  },
  {
    id: 6,
    title: "Implement Project Comparison",
    project: "PlanWise AI",
    assignedTo: ["emp-006", "emp-007"],
    priority: "Medium",
    dueDate: "2026-10-19",
    progress: 8,
    status: "Assigned",
    description:
      "Implement the project comparison interface and prepare comparison data structures.",
  },
  {
    id: 7,
    title: "Generate Estimation Report PDF",
    project: "PlanWise AI",
    assignedTo: ["emp-001", "emp-005"],
    priority: "Medium",
    dueDate: "2026-10-21",
    progress: 0,
    status: "Pending",
    description:
      "Create the PDF report generation workflow for estimation, risk and planning results.",
  },
  {
    id: 8,
    title: "Database Schema Review",
    project: "PlanWise AI",
    assignedTo: ["emp-006"],
    priority: "Low",
    dueDate: "2026-10-22",
    progress: 100,
    status: "Completed",
    description:
      "Review the project, user, resource and estimation database schema.",
  },
  {
    id: 9,
    title: "Dashboard Analytics Cards",
    project: "PlanWise AI",
    assignedTo: ["emp-002", "emp-003"],
    priority: "Medium",
    dueDate: "2026-10-24",
    progress: 55,
    status: "In Progress",
    description:
      "Develop dashboard analytics cards for project estimation and resource planning insights.",
  },
  {
    id: 10,
    title: "Gemini Recommendation Service",
    project: "PlanWise AI",
    assignedTo: ["emp-005"],
    priority: "High",
    dueDate: "2026-10-25",
    progress: 30,
    status: "In Progress",
    description:
      "Connect Gemini-powered recommendations for explanations, risks and planning suggestions.",
  },
  {
    id: 11,
    title: "Notifications UI",
    project: "PlanWise AI",
    assignedTo: ["emp-007", "emp-003"],
    priority: "Low",
    dueDate: "2026-10-27",
    progress: 10,
    status: "Assigned",
    description:
      "Build the notifications interface and empty, loading and success states.",
  },
  {
    id: 12,
    title: "Profile Settings Screen",
    project: "PlanWise AI",
    assignedTo: ["emp-002"],
    priority: "Low",
    dueDate: "2026-10-28",
    progress: 65,
    status: "In Progress",
    description:
      "Complete profile and account settings interface with validation states.",
  },
  {
    id: 13,
    title: "Model Evaluation Pipeline",
    project: "PlanWise AI",
    assignedTo: ["emp-004"],
    priority: "Critical",
    dueDate: "2026-10-29",
    progress: 42,
    status: "In Progress",
    description:
      "Compare candidate ML models and prepare evaluation metrics for the estimation pipeline.",
  },
  {
    id: 14,
    title: "Cost Planning Charts",
    project: "PlanWise AI",
    assignedTo: ["emp-003", "emp-004"],
    priority: "High",
    dueDate: "2026-10-30",
    progress: 18,
    status: "Assigned",
    description:
      "Prepare cost distribution and milestone financial planning visualizations.",
  },
  {
    id: 15,
    title: "Protected Route Integration",
    project: "PlanWise AI",
    assignedTo: ["emp-002", "emp-007"],
    priority: "High",
    dueDate: "2026-11-01",
    progress: 75,
    status: "In Progress",
    description:
      "Integrate authentication state with protected frontend routes.",
  },
  {
    id: 16,
    title: "ML Model Inference Endpoint",
    project: "PlanWise AI",
    assignedTo: ["emp-001", "emp-004"],
    priority: "Critical",
    dueDate: "2026-11-02",
    progress: 25,
    status: "Assigned",
    description:
      "Expose the trained model through the backend inference endpoint.",
  },
  {
    id: 17,
    title: "Risk Mitigation Recommendations",
    project: "PlanWise AI",
    assignedTo: ["emp-005", "emp-006"],
    priority: "Medium",
    dueDate: "2026-11-04",
    progress: 12,
    status: "Assigned",
    description:
      "Prepare AI-assisted mitigation recommendations for detected project risks.",
  },
  {
    id: 18,
    title: "Project Search and Filters",
    project: "PlanWise AI",
    assignedTo: ["emp-007", "emp-002"],
    priority: "Medium",
    dueDate: "2026-11-05",
    progress: 90,
    status: "In Progress",
    description:
      "Finalize project search, filtering and result-state behavior.",
  },
  {
    id: 19,
    title: "Estimation Results UI",
    project: "PlanWise AI",
    assignedTo: ["emp-003", "emp-005"],
    priority: "High",
    dueDate: "2026-11-07",
    progress: 60,
    status: "In Progress",
    description:
      "Build the estimation results interface with cost, effort, duration and confidence information.",
  },
  {
    id: 20,
    title: "Backend Error Handling",
    project: "PlanWise AI",
    assignedTo: ["emp-001", "emp-006"],
    priority: "Medium",
    dueDate: "2026-11-08",
    progress: 100,
    status: "Completed",
    description:
      "Complete consistent API error handling and validation responses.",
  },
];

/* ==========================================================================
   Constants
   ========================================================================== */

const PAGE_SIZE = 10;
const MAX_PROJECTS_PER_MEMBER = 3;

/* ==========================================================================
   Helpers
   ========================================================================== */

const getEmployeeById = (employeeId) =>
  teamMembers.find((member) => member.id === employeeId);

const getEmployeeNames = (employeeIds = []) =>
  employeeIds
    .map((id) => getEmployeeById(id)?.name)
    .filter(Boolean);

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusClass = (status) => {
  const value = status.toLowerCase().replace(/\s+/g, "-");

  return `admin-task-status admin-task-status-${value}`;
};

const getPriorityClass = (priority) => {
  const value = priority.toLowerCase();

  return `admin-task-priority admin-task-priority-${value}`;
};

/* ==========================================================================
   Component
   ========================================================================== */

const AdminTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [selectedAssignments, setSelectedAssignments] = useState([]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    project: "",
    priority: "Medium",
    dueDate: "",
    description: "",
  });

  const [assignmentError, setAssignmentError] = useState("");

  /* ==========================================================================
     Active project workload
     ========================================================================== */

  const employeeProjectCounts = useMemo(() => {
    const counts = {};

    teamMembers.forEach((member) => {
      counts[member.id] = new Set();
    });

    tasks.forEach((task) => {
      if (task.status === "Completed") return;

      task.assignedTo.forEach((employeeId) => {
        if (counts[employeeId]) {
          counts[employeeId].add(task.project);
        }
      });
    });

    return Object.fromEntries(
      Object.entries(counts).map(([employeeId, projects]) => [
        employeeId,
        projects.size,
      ])
    );
  }, [tasks]);

  /* ==========================================================================
     Filtered Tasks
     ========================================================================== */

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const assignedNames = getEmployeeNames(task.assignedTo)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.project.toLowerCase().includes(query) ||
        assignedNames.includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  /* ==========================================================================
     Pagination
     ========================================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / PAGE_SIZE)
  );

  const pageStart = (currentPage - 1) * PAGE_SIZE;

  const paginatedTasks = filteredTasks.slice(
    pageStart,
    pageStart + PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* ==========================================================================
     Statistics
     ========================================================================== */

  const stats = useMemo(
    () => [
      {
        label: "Total Tasks",
        value: tasks.length,
        icon: ClipboardList,
      },
      {
        label: "Assigned Tasks",
        value: tasks.filter((task) => task.assignedTo.length > 0).length,
        icon: Users,
      },
      {
        label: "In Progress",
        value: tasks.filter((task) => task.status === "In Progress").length,
        icon: Activity,
      },
      {
        label: "Completed",
        value: tasks.filter((task) => task.status === "Completed").length,
        icon: CheckCircle2,
      },
    ],
    [tasks]
  );

  /* ==========================================================================
     Open Details
     ========================================================================== */

  const openTask = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const closeTaskModal = () => {
    setIsDetailsOpen(false);
    setSelectedTask(null);
  };

  /* ==========================================================================
     Open Assignment / Create Modal
     ========================================================================== */

  const openAssignModal = (task = null) => {
    setAssignmentError("");

    if (task) {
      setSelectedTask(task);
      setIsCreating(false);

      setTaskForm({
        title: task.title,
        project: task.project,
        priority: task.priority,
        dueDate: task.dueDate,
        description: task.description,
      });

      setSelectedAssignments([...task.assignedTo]);
    } else {
      setSelectedTask(null);
      setIsCreating(true);

      setTaskForm({
        title: "",
        project: "",
        priority: "Medium",
        dueDate: "",
        description: "",
      });

      setSelectedAssignments([]);
    }

    setIsDetailsOpen(false);
    setIsAssignOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignOpen(false);
    setSelectedTask(null);
    setSelectedAssignments([]);
    setAssignmentError("");
  };

  /* ==========================================================================
     Assignment Eligibility
     ========================================================================== */

  const getMemberProjectCount = (employeeId) => {
    return employeeProjectCounts[employeeId] || 0;
  };

  const canAssignMember = (employeeId) => {
    if (selectedAssignments.includes(employeeId)) {
      return true;
    }

    const member = getEmployeeById(employeeId);

    if (!member) {
      return false;
    }

    const currentProjectCount = getMemberProjectCount(employeeId);

    if (
      selectedTask &&
      !isCreating &&
      selectedTask.status !== "Completed"
    ) {
      const alreadyWorkingOnSameProject = tasks.some(
        (task) =>
          task.id !== selectedTask.id &&
          task.project === selectedTask.project &&
          task.status !== "Completed" &&
          task.assignedTo.includes(employeeId)
      );

      if (alreadyWorkingOnSameProject) {
        return currentProjectCount <= MAX_PROJECTS_PER_MEMBER;
      }

      if (selectedTask.assignedTo.includes(employeeId)) {
        return currentProjectCount <= MAX_PROJECTS_PER_MEMBER;
      }
    }

    return currentProjectCount < MAX_PROJECTS_PER_MEMBER;
  };

  /* ==========================================================================
     Toggle Team Member
     ========================================================================== */

  const handleAssignmentChange = (employeeId) => {
    setAssignmentError("");

    if (selectedAssignments.includes(employeeId)) {
      setSelectedAssignments((current) =>
        current.filter((id) => id !== employeeId)
      );

      return;
    }

    if (!canAssignMember(employeeId)) {
      const member = getEmployeeById(employeeId);
      const count = employeeProjectCounts[employeeId] || 0;

      setAssignmentError(
        `${member?.name || "This team member"} is already assigned to ${count}/3 active projects and cannot be assigned to another project.`
      );

      return;
    }

    setSelectedAssignments((current) => [
      ...current,
      employeeId,
    ]);
  };

  /* ==========================================================================
     Save Assignment / Create Task
     ========================================================================== */

  const handleSaveAssignment = () => {
    setAssignmentError("");

    if (!taskForm.title.trim()) {
      setAssignmentError("Task title is required.");
      return;
    }

    if (!taskForm.project.trim()) {
      setAssignmentError("Project name is required.");
      return;
    }

    if (selectedAssignments.length === 0) {
      setAssignmentError(
        "Assign at least one team member to this task."
      );
      return;
    }

    /* Final workload validation */

    const invalidMembers = selectedAssignments.filter((employeeId) => {
      const currentCount = employeeProjectCounts[employeeId] || 0;

      if (isCreating) {
        return currentCount >= MAX_PROJECTS_PER_MEMBER;
      }

      if (!selectedTask || selectedTask.status === "Completed") {
        return false;
      }

      if (selectedTask.assignedTo.includes(employeeId)) {
        return false;
      }

      return currentCount >= MAX_PROJECTS_PER_MEMBER;
    });

    if (invalidMembers.length > 0) {
      const names = invalidMembers
        .map((id) => getEmployeeById(id)?.name)
        .filter(Boolean)
        .join(", ");

      setAssignmentError(
        `${names} cannot be assigned because the maximum active project limit is 3.`
      );

      return;
    }

    /* Create new task */

    if (isCreating) {
      const newTask = {
        id: Date.now(),
        title: taskForm.title.trim(),
        project: taskForm.project.trim(),
        assignedTo: selectedAssignments,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate,
        progress: 0,
        status: "Assigned",
        description:
          taskForm.description.trim() ||
          "No task description has been added yet.",
      };

      setTasks((current) => [newTask, ...current]);
      setCurrentPage(1);
      closeAssignModal();

      return;
    }

    /* Update existing task */

    if (!selectedTask) {
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              title: taskForm.title.trim(),
              project: taskForm.project.trim(),
              assignedTo: selectedAssignments,
              priority: taskForm.priority,
              dueDate: taskForm.dueDate,
              description:
                taskForm.description.trim() ||
                "No task description has been added yet.",
              status:
                task.status === "Pending" &&
                selectedAssignments.length > 0
                  ? "Assigned"
                  : task.status,
            }
          : task
      )
    );

    closeAssignModal();
  };

  /* ==========================================================================
     Reset Filters
     ========================================================================== */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCurrentPage(1);
  };

  /* ==========================================================================
     Render
     ========================================================================== */

  return (
    <div className="admin-tasks-page">

      {/* --------------------------------------------------------------------
          Header
          -------------------------------------------------------------------- */}

      <div className="admin-tasks-header">
        <div className="admin-tasks-header-content">

          <div className="admin-tasks-eyebrow">
            <ListChecks size={15} />

            <span className="admin-tasks-management-title">
              Task Management
            </span>
          </div>

          <h1 className="admin-tasks-main-title">
            <span className="admin-tasks-assignments-title">
              Tasks & Assignments
            </span>
          </h1>

          <p>
            Manage project tasks, assign multiple team members and keep
            workloads within the 3-project limit.
          </p>

        </div>

        <button
          type="button"
          className="admin-tasks-primary-btn"
          onClick={() => openAssignModal()}
        >
          <Plus size={17} />
          Create Task
        </button>
      </div>

      {/* --------------------------------------------------------------------
          Summary Cards
          -------------------------------------------------------------------- */}

      <div className="admin-tasks-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="admin-task-stat-card"
              style={{
                "--card-index": index,
              }}
            >
              <div className="admin-task-stat-icon">
                <Icon size={19} />
              </div>

              <div className="admin-task-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* --------------------------------------------------------------------
          Main Panel
          -------------------------------------------------------------------- */}

      <section className="admin-tasks-panel">

        {/* Toolbar */}

        <div className="admin-tasks-toolbar">

          <div className="admin-tasks-search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks, projects or team members..."
              aria-label="Search tasks"
            />

            {search && (
              <button
                type="button"
                className="admin-tasks-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="admin-tasks-filters">

            <div className="admin-tasks-filter">
              <label htmlFor="task-status-filter">
                Status
              </label>

              <select
                id="task-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="admin-tasks-filter">
              <label htmlFor="task-priority-filter">
                Priority
              </label>

              <select
                id="task-priority-filter"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Table */}

        <div className="admin-tasks-table-wrap">

          {paginatedTasks.length > 0 ? (
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
                {paginatedTasks.map((task, index) => {
                  const assignedMembers = task.assignedTo
                    .map(getEmployeeById)
                    .filter(Boolean);

                  return (
                    <tr
                      key={task.id}
                      className="admin-task-row"
                      style={{
                        "--row-index": index,
                      }}
                    >

                      {/* Task */}

                      <td>
                        <div className="admin-task-title-cell">

                          <div className="admin-task-title-icon">
                            <ClipboardList size={16} />
                          </div>

                          <div>
                            <strong>{task.title}</strong>

                            <span>
                              {task.assignedTo.length}{" "}
                              {task.assignedTo.length === 1
                                ? "member"
                                : "members"}{" "}
                              assigned
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* Project */}

                      <td>
                        <div className="admin-task-project-cell">
                          <FolderKanban size={15} />
                          <span>{task.project}</span>
                        </div>
                      </td>

                      {/* Assigned To */}

                      <td>
                        <div className="admin-task-assignees">

                          {assignedMembers.map(
                            (member, memberIndex) => (
                              <div
                                key={member.id}
                                className="admin-task-assignee"
                                style={{
                                  "--member-index": memberIndex,
                                }}
                                title={`${member.name} — ${member.role}`}
                              >
                                <div className="admin-task-avatar">
                                  {getInitials(member.name)}
                                </div>

                                <div className="admin-task-assignee-info">
                                  <strong>
                                    {member.name}
                                  </strong>

                                  <span>
                                    {member.role}
                                  </span>
                                </div>
                              </div>
                            )
                          )}

                        </div>
                      </td>

                      {/* Priority */}

                      <td>
                        <span
                          className={getPriorityClass(
                            task.priority
                          )}
                        >
                          <Flag size={13} />
                          {task.priority}
                        </span>
                      </td>

                      {/* Due Date */}

                      <td>
                        <div className="admin-task-date">
                          <CalendarDays size={14} />
                          {formatDate(task.dueDate)}
                        </div>
                      </td>

                      {/* Progress */}

                      <td>
                        <div className="admin-task-progress-cell">

                          <div className="admin-task-progress-top">
                            <span>{task.progress}%</span>
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

                      {/* Status */}

                      <td>
                        <span
                          className={getStatusClass(task.status)}
                        >
                          {task.status === "Completed" ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <Activity size={13} />
                          )}

                          {task.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="admin-task-actions">

                          <button
                            type="button"
                            className="admin-task-action-btn"
                            onClick={() => openTask(task)}
                            title="View task"
                            aria-label={`View ${task.title}`}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            className="admin-task-action-btn admin-task-action-btn-secondary"
                            onClick={() =>
                              openAssignModal(task)
                            }
                            title="Assign team members"
                            aria-label={`Manage assignment for ${task.title}`}
                          >
                            <UserPlus size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          ) : (

            <div className="admin-tasks-empty">

              <div className="admin-tasks-empty-icon">
                <ClipboardList size={26} />
              </div>

              <h3>No tasks found</h3>

              <p>
                Try changing your search or filters, or create a
                new task.
              </p>

              <button
                type="button"
                className="admin-tasks-secondary-btn"
                onClick={resetFilters}
              >
                <RefreshCcw size={15} />
                Reset Filters
              </button>

            </div>

          )}

        </div>

        {/* Footer / Pagination */}

        <div className="admin-tasks-footer">

          <span>
            {filteredTasks.length === 0
              ? "Showing 0 tasks"
              : `Showing ${pageStart + 1}–${Math.min(
                  pageStart + PAGE_SIZE,
                  filteredTasks.length
                )} of ${filteredTasks.length} tasks`}
          </span>

          <div className="admin-tasks-pagination">

            <button
              type="button"
              className="admin-task-page-btn"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <ChevronLeft size={15} />
              Previous
            </button>

            <div className="admin-task-page-number">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </div>

            <button
              type="button"
              className="admin-task-page-btn"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              Next
              <ChevronRight size={15} />
            </button>

          </div>
        </div>

      </section>

      {/* ====================================================================
          Task Details Modal
          ==================================================================== */}

      {isDetailsOpen && selectedTask && (
        <div
          className="admin-task-modal-overlay"
          onMouseDown={closeTaskModal}
          role="presentation"
        >

          <div
            className="admin-task-modal admin-task-details-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-details-title"
          >

            <div className="admin-task-modal-header">

              <div>
                <span className="admin-task-modal-eyebrow">
                  Task Details
                </span>

                <h2 id="task-details-title">
                  {selectedTask.title}
                </h2>
              </div>

              <button
                type="button"
                className="admin-task-modal-close"
                onClick={closeTaskModal}
                aria-label="Close task details"
              >
                <X size={18} />
              </button>

            </div>

            <div className="admin-task-detail-grid">

              <div className="admin-task-detail-card">
                <span>Project</span>
                <strong>{selectedTask.project}</strong>
              </div>

              <div className="admin-task-detail-card">
                <span>Due Date</span>
                <strong>
                  {formatDate(selectedTask.dueDate)}
                </strong>
              </div>

              <div className="admin-task-detail-card">
                <span>Priority</span>
                <strong>{selectedTask.priority}</strong>
              </div>

              <div className="admin-task-detail-card">
                <span>Status</span>
                <strong>{selectedTask.status}</strong>
              </div>

            </div>

            <div className="admin-task-detail-section">

              <div className="admin-task-detail-section-title">
                <FileText size={16} />
                Description
              </div>

              <p>{selectedTask.description}</p>

            </div>

            <div className="admin-task-detail-section">

              <div className="admin-task-detail-section-title">
                <Users size={16} />
                Assigned Team Members
              </div>

              <div className="admin-task-detail-members">

                {selectedTask.assignedTo.map(
                  (employeeId, index) => {
                    const member =
                      getEmployeeById(employeeId);

                    if (!member) {
                      return null;
                    }

                    const workload =
                      employeeProjectCounts[member.id] || 0;

                    return (
                      <div
                        key={member.id}
                        className="admin-task-detail-member"
                        style={{
                          "--member-index": index,
                        }}
                      >

                        <div className="admin-task-avatar">
                          {getInitials(member.name)}
                        </div>

                        <div>
                          <strong>{member.name}</strong>
                          <span>{member.role}</span>
                        </div>

                        <small>
                          {workload}/
                          {MAX_PROJECTS_PER_MEMBER} projects
                        </small>

                      </div>
                    );
                  }
                )}

              </div>
            </div>

            <div className="admin-task-detail-section">

              <div className="admin-task-detail-section-title">
                <Activity size={16} />
                Progress
              </div>

              <div className="admin-task-detail-progress">

                <div className="admin-task-progress-top">
                  <strong>{selectedTask.progress}%</strong>
                  <span>Complete</span>
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
            </div>

            <div className="admin-task-modal-footer">

              <button
                type="button"
                className="admin-tasks-secondary-btn"
                onClick={closeTaskModal}
              >
                Close
              </button>

              <button
                type="button"
                className="admin-tasks-primary-btn"
                onClick={() =>
                  openAssignModal(selectedTask)
                }
              >
                <UserPlus size={15} />
                Manage Assignment
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          Create / Assignment Modal
          ==================================================================== */}

      {isAssignOpen && (
        <div
          className="admin-task-modal-overlay"
          onMouseDown={closeAssignModal}
          role="presentation"
        >

          <div
            className={`admin-task-modal admin-task-assignment-modal ${
              isCreating ? "admin-task-create-modal" : ""
            }`}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-assignment-title"
          >

            <div className="admin-task-modal-header">

              <div>
                <span className="admin-task-modal-eyebrow">
                  {isCreating
                    ? "Create & Assign"
                    : "Task Assignment"}
                </span>

                <h2 id="task-assignment-title">
                  {isCreating
                    ? "Create New Task"
                    : "Manage Team Assignment"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-task-modal-close"
                onClick={closeAssignModal}
                aria-label="Close assignment modal"
              >
                <X size={18} />
              </button>

            </div>

            <div className="admin-task-form">

              {/* Task Title */}

              <div className="admin-task-form-group">

                <label htmlFor="task-title">
                  Task Name <span>*</span>
                </label>

                <input
                  id="task-title"
                  type="text"
                  value={taskForm.title}
                  onChange={(event) =>
                    setTaskForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Enter task name"
                />

              </div>

              {/* Project */}

              <div className="admin-task-form-group">

                <label htmlFor="task-project">
                  Project <span>*</span>
                </label>

                <input
                  id="task-project"
                  type="text"
                  value={taskForm.project}
                  onChange={(event) =>
                    setTaskForm((current) => ({
                      ...current,
                      project: event.target.value,
                    }))
                  }
                  placeholder="Enter project name"
                />

              </div>

              {/* Priority + Due Date */}

              <div className="admin-task-form-row">

                <div className="admin-task-form-group">

                  <label htmlFor="task-priority">
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    value={taskForm.priority}
                    onChange={(event) =>
                      setTaskForm((current) => ({
                        ...current,
                        priority: event.target.value,
                      }))
                    }
                  >
                    <option value="Critical">
                      Critical
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

                <div className="admin-task-form-group">

                  <label htmlFor="task-due-date">
                    Due Date
                  </label>

                  <input
                    id="task-due-date"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(event) =>
                      setTaskForm((current) => ({
                        ...current,
                        dueDate: event.target.value,
                      }))
                    }
                  />

                </div>

              </div>

              {/* Description */}

              <div className="admin-task-form-group">

                <label htmlFor="task-description">
                  Description
                </label>

                <textarea
                  id="task-description"
                  rows="3"
                  value={taskForm.description}
                  onChange={(event) =>
                    setTaskForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Describe the task..."
                />

              </div>

              {/* Team Members */}

              <div className="admin-task-assignment-section">

                <div className="admin-task-assignment-heading">

                  <div>

                    <label>
                      Assign Team Members{" "}
                      <span>*</span>
                    </label>

                    <p>
                      Multiple members can be assigned. Each
                      member can work on a maximum of 3 active
                      projects.
                    </p>

                  </div>

                  <div className="admin-task-assignment-count">
                    {selectedAssignments.length} selected
                  </div>

                </div>

                <div className="admin-task-member-list">

                  {teamMembers.map((member, index) => {
                    const isSelected =
                      selectedAssignments.includes(member.id);

                    const projectCount =
                      employeeProjectCounts[member.id] || 0;

                    const isLimitReached =
                      projectCount >=
                        MAX_PROJECTS_PER_MEMBER &&
                      !isSelected;

                    return (
                      <button
                        type="button"
                        key={member.id}
                        className={`admin-task-member-option ${
                          isSelected ? "is-selected" : ""
                        } ${
                          isLimitReached ? "is-disabled" : ""
                        }`}
                        style={{
                          "--member-index": index,
                        }}
                        onClick={() =>
                          handleAssignmentChange(member.id)
                        }
                        disabled={isLimitReached}
                      >

                        <div className="admin-task-member-option-main">

                          <div className="admin-task-avatar">
                            {getInitials(member.name)}
                          </div>

                          <div className="admin-task-member-option-info">

                            <strong>{member.name}</strong>

                            <span>{member.role}</span>

                          </div>

                        </div>

                        <div className="admin-task-member-workload">

                          <strong>
                            {projectCount}/
                            {MAX_PROJECTS_PER_MEMBER}
                          </strong>

                          <span>
                            {isLimitReached
                              ? "Limit Reached"
                              : "Active Projects"}
                          </span>

                        </div>

                        <div className="admin-task-member-check">

                          {isSelected ? (
                            <CheckCircle2 size={19} />
                          ) : (
                            <span />
                          )}

                        </div>

                      </button>
                    );
                  })}

                </div>
              </div>

              {/* Error */}

              {assignmentError && (
                <div className="admin-task-assignment-error">

                  <AlertCircle size={17} />

                  <span>{assignmentError}</span>

                </div>
              )}

            </div>

            {/* Modal Footer */}

            <div className="admin-task-modal-footer">

              <button
                type="button"
                className="admin-tasks-secondary-btn"
                onClick={closeAssignModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-tasks-primary-btn"
                onClick={handleSaveAssignment}
              >
                <Save size={15} />

                {isCreating
                  ? "Create & Assign"
                  : "Save Assignment"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTasks;