
import "./AdminTasks.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  History,
  ListChecks,
  Plus,
  RefreshCcw,
  Save,
  Search,
  UserPlus,
  Users,
  X,
  ArrowRight,
} from "lucide-react";

import {
  getEmployees,
  getAdminProjects,
  getAdminTasks,
  getAdminTask,
  createAdminTask,
  updateAdminTask,
  getAdminWeeklyPlans,
  createAdminWeeklyPlan,
  getAdminTaskAssignmentHistory,
  carryForwardAdminTask,
} from "../../services/api";

const PAGE_SIZE = 10;
const MAX_PROJECTS_PER_MEMBER = 3;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "blocked", label: "Blocked" },
  { value: "cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS = ["critical", "high", "medium", "low"];

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

const toId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const normalizeStatus = (status = "pending") => {
  const value = String(status).toLowerCase().replace(/[\s-]+/g, "_");

  if (value === "assigned") return "pending";
  if (STATUS_OPTIONS.some((option) => option.value === value)) {
    return value;
  }

  return "pending";
};

const statusLabel = (status) =>
  STATUS_OPTIONS.find((option) => option.value === normalizeStatus(status))
    ?.label || "Pending";

const normalizePriority = (priority = "medium") => {
  const value = String(priority).toLowerCase();
  return PRIORITY_OPTIONS.includes(value) ? value : "medium";
};

const titleCase = (value = "") =>
  String(value)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const getInitials = (name = "") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

const getEmployeeName = (employee) =>
  employee?.name ||
  employee?.full_name ||
  employee?.fullName ||
  employee?.user?.name ||
  employee?.user?.full_name ||
  employee?.username ||
  employee?.email ||
  `Employee ${employee?.id ?? ""}`;

const getEmployeeRole = (employee) =>
  employee?.job_title ||
  employee?.jobTitle ||
  employee?.position ||
  employee?.designation ||
  employee?.user?.job_title ||
  employee?.role ||
  "Team Member";

const normalizeEmployee = (employee) => ({
  ...employee,
  id: toId(employee?.id ?? employee?.employee_id ?? employee?.user_id),
  name: getEmployeeName(employee),
  role: getEmployeeRole(employee),
  availability:
    employee?.availability_status ||
    employee?.availability ||
    employee?.status ||
    "Available",
});

const getProjectName = (project) =>
  project?.name ||
  project?.project_name ||
  project?.title ||
  `Project ${project?.id ?? ""}`;

const normalizeProject = (project) => ({
  ...project,
  id: toId(project?.id ?? project?.project_id),
  name: getProjectName(project),
});

const getPlanLabel = (plan) => {
  const start = formatDate(plan?.week_start_date);
  const end = formatDate(plan?.week_end_date);
  return `Week ${start} – ${end}`;
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toDateInput = (date) => {
  if (!date) return "";

  const value = String(date);
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);

  if (match) return match[1];

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return [
    parsed.getFullYear(),
    String(parsed.getMonth() + 1).padStart(2, "0"),
    String(parsed.getDate()).padStart(2, "0"),
  ].join("-");
};

const normalizeTask = (task) => {
  const assignments = Array.isArray(task?.assignments)
    ? task.assignments
    : [];

  const assignedTo = [
    ...new Set(
      assignments
        .map((assignment) =>
          toId(assignment?.employee_id ?? assignment?.employee?.id)
        )
        .filter(Boolean)
    ),
  ];

  return {
    ...task,
    id: toId(task?.id),
    projectId: toId(task?.project_id),
    weeklyPlanId: toId(task?.weekly_plan_id),
    weeklyPlanIds: Array.isArray(task?.weekly_plan_ids)
      ? task.weekly_plan_ids.map(toId).filter(Boolean)
      : [],
    title: task?.title || "Untitled Task",
    description: task?.description || "",
    priority: normalizePriority(task?.priority),
    status: normalizeStatus(task?.status),
    dueDate: toDateInput(task?.due_date),
    assignedTo,
    isOverdue: Boolean(task?.is_overdue),
  };
};

const getErrorMessage = (error, fallback) =>
  error instanceof Error && error.message ? error.message : fallback;

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [weeklyPlans, setWeeklyPlans] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    projectId: "",
    weeklyPlanId: "",
    priority: "medium",
    dueDate: "",
    status: "pending",
    description: "",
  });

  const [planForm, setPlanForm] = useState({
    weekStartDate: "",
    weekEndDate: "",
  });

  const [showPlanForm, setShowPlanForm] = useState(false);
  const [assignmentError, setAssignmentError] = useState("");
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [carryForwardPlanId, setCarryForwardPlanId] = useState("");

  const employeeById = useMemo(
    () => new Map(teamMembers.map((member) => [member.id, member])),
    [teamMembers]
  );

  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects]
  );

  const planById = useMemo(
    () => new Map(weeklyPlans.map((plan) => [plan.id, plan])),
    [weeklyPlans]
  );

  const getEmployeeById = useCallback(
    (id) => employeeById.get(toId(id)) || null,
    [employeeById]
  );

  const getProjectById = useCallback(
    (id) => projectById.get(toId(id)) || null,
    [projectById]
  );

  const getTaskPlanIds = useCallback(
    (task) => [
      ...new Set(
        [
          task?.weeklyPlanId,
          ...(task?.weeklyPlanIds || []),
        ].filter(Boolean)
      ),
    ],
    []
  );

  const loadTasks = useCallback(async () => {
    const filters = {};

    if (projectFilter !== "All") {
      filters.project_id = Number(projectFilter);
    }

    if (planFilter !== "All") {
      filters.weekly_plan_id = Number(planFilter);
    }

    const result = await getAdminTasks(filters);
    const normalized = toArray(result)
      .map(normalizeTask)
      .filter((task) => task.id);

    setTasks(normalized);
  }, [projectFilter, planFilter]);

  const loadPageData = useCallback(async () => {
    setLoading(true);
    setPageError("");
    setSuccessMessage("");

    try {
      const results = await Promise.allSettled([
        getAdminProjects(),
        getEmployees(),
        getAdminTasks(),
      ]);

      const failures = [];

      if (results[0].status === "fulfilled") {
        setProjects(
          toArray(results[0].value)
            .map(normalizeProject)
            .filter((project) => project.id)
        );
      } else {
        failures.push(
          `Projects: ${getErrorMessage(results[0].reason, "Unable to load projects.")}`
        );
      }

      if (results[1].status === "fulfilled") {
        setTeamMembers(
          toArray(results[1].value)
            .map(normalizeEmployee)
            .filter((employee) => employee.id)
        );
      } else {
        failures.push(
          `Employees: ${getErrorMessage(results[1].reason, "Unable to load employees.")}`
        );
      }

      if (results[2].status === "fulfilled") {
        setTasks(
          toArray(results[2].value)
            .map(normalizeTask)
            .filter((task) => task.id)
        );
      } else {
        failures.push(
          `Tasks: ${getErrorMessage(results[2].reason, "Unable to load tasks.")}`
        );
      }

      if (failures.length) {
        setPageError(failures.join(" "));
      }
    } catch (error) {
      setPageError(getErrorMessage(error, "Unable to load task management data."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  const loadPlansForProject = useCallback(async (projectId) => {
    const id = toId(projectId);

    if (!id) {
      setWeeklyPlans([]);
      return [];
    }

    setLoadingPlans(true);
    setAssignmentError("");

    try {
      const result = await getAdminWeeklyPlans(id);
      const plans = toArray(result)
        .map((plan) => ({
          ...plan,
          id: toId(plan?.id),
          project_id: toId(plan?.project_id),
        }))
        .filter((plan) => plan.id);

      setWeeklyPlans((current) => {
        const otherProjects = current.filter(
          (plan) => plan.project_id !== id
        );

        return [...otherProjects, ...plans];
      });

      return plans;
    } catch (error) {
      setAssignmentError(
        getErrorMessage(error, "Unable to load weekly plans for this project.")
      );
      return [];
    } finally {
      setLoadingPlans(false);
    }
  }, []);

  useEffect(() => {
    if (projectFilter === "All") {
      setPlanFilter("All");
      return;
    }

    let cancelled = false;

    const loadFilterPlans = async () => {
      try {
        const result = await getAdminWeeklyPlans(Number(projectFilter));

        if (cancelled) return;

        const plans = toArray(result).map((plan) => ({
          ...plan,
          id: toId(plan?.id),
          project_id: toId(plan?.project_id),
        }));

        setWeeklyPlans((current) => [
          ...current.filter(
            (plan) => plan.project_id !== Number(projectFilter)
          ),
          ...plans.filter((plan) => plan.id),
        ]);

        if (
          planFilter !== "All" &&
          !plans.some((plan) => String(plan.id) === planFilter)
        ) {
          setPlanFilter("All");
        }
      } catch {
        if (!cancelled) {
          setPlanFilter("All");
        }
      }
    };

    loadFilterPlans();

    return () => {
      cancelled = true;
    };
  }, [projectFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;

    const refreshFilteredTasks = async () => {
      try {
        const filters = {};

        if (projectFilter !== "All") {
          filters.project_id = Number(projectFilter);
        }

        if (planFilter !== "All") {
          filters.weekly_plan_id = Number(planFilter);
        }

        const result = await getAdminTasks(filters);

        if (!cancelled) {
          setTasks(
            toArray(result)
              .map(normalizeTask)
              .filter((task) => task.id)
          );
          setPageError("");
        }
      } catch (error) {
        if (!cancelled) {
          setPageError(
            getErrorMessage(error, "Unable to refresh tasks.")
          );
        }
      }
    };

    refreshFilteredTasks();

    return () => {
      cancelled = true;
    };
  }, [projectFilter, planFilter]);

  const employeeProjectCounts = useMemo(() => {
    const counts = {};

    teamMembers.forEach((member) => {
      counts[member.id] = new Set();
    });

    tasks.forEach((task) => {
      if (task.status === "completed" || task.status === "cancelled") {
        return;
      }

      task.assignedTo.forEach((employeeId) => {
        if (counts[employeeId] && task.projectId) {
          counts[employeeId].add(task.projectId);
        }
      });
    });

    return Object.fromEntries(
      Object.entries(counts).map(([employeeId, projectIds]) => [
        employeeId,
        projectIds.size,
      ])
    );
  }, [tasks, teamMembers]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const projectName =
        getProjectById(task.projectId)?.name?.toLowerCase() || "";

      const assignedNames = task.assignedTo
        .map((id) => getEmployeeById(id)?.name || "")
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        projectName.includes(query) ||
        assignedNames.includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    getProjectById,
    getEmployeeById,
  ]);

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
  }, [search, statusFilter, priorityFilter, projectFilter, planFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

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
        value: tasks.filter((task) => task.status === "in_progress").length,
        icon: Activity,
      },
      {
        label: "Completed",
        value: tasks.filter((task) => task.status === "completed").length,
        icon: CheckCircle2,
      },
    ],
    [tasks]
  );

  const getEmployeeNames = (ids = []) =>
    ids.map((id) => getEmployeeById(id)?.name).filter(Boolean);

  const openTask = async (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
    setShowHistory(false);
    setHistory([]);
    setHistoryError("");
    setCarryForwardPlanId("");

    if (task.projectId) {
      loadPlansForProject(task.projectId);
    }

    try {
      const freshTask = await getAdminTask(task.id);
      setSelectedTask(normalizeTask(freshTask));
    } catch {
      // The task already exists in the loaded list.
      // Keep the list data available if the detail request fails.
    }
  };

  const closeTaskModal = () => {
    setIsDetailsOpen(false);
    setSelectedTask(null);
    setShowHistory(false);
    setHistory([]);
  };

  const openAssignModal = async (task = null) => {
    setAssignmentError("");
    setPageError("");
    setSuccessMessage("");
    setShowPlanForm(false);
    setPlanForm({ weekStartDate: "", weekEndDate: "" });

    if (task) {
      setSelectedTask(task);
      setIsCreating(false);

      setTaskForm({
        title: task.title,
        projectId: String(task.projectId || ""),
        weeklyPlanId: String(task.weeklyPlanId || ""),
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
        description: task.description,
      });

      setSelectedAssignments([...task.assignedTo]);

      setIsDetailsOpen(false);
      setIsAssignOpen(true);

      if (task.projectId) {
        const plans = await loadPlansForProject(task.projectId);

        if (task.weeklyPlanId && !plans.some(
          (plan) => plan.id === task.weeklyPlanId
        )) {
          setCarryForwardPlanId("");
        }
      }
    } else {
      setSelectedTask(null);
      setIsCreating(true);
      setSelectedAssignments([]);

      setTaskForm({
        title: "",
        projectId: "",
        weeklyPlanId: "",
        priority: "medium",
        dueDate: "",
        status: "pending",
        description: "",
      });

      setWeeklyPlans([]);
      setIsDetailsOpen(false);
      setIsAssignOpen(true);
    }
  };

  const closeAssignModal = () => {
    setIsAssignOpen(false);
    setSelectedTask(null);
    setSelectedAssignments([]);
    setAssignmentError("");
    setShowPlanForm(false);
  };

  const handleProjectChange = async (projectId) => {
    setTaskForm((current) => ({
      ...current,
      projectId,
      weeklyPlanId: "",
    }));

    setWeeklyPlans([]);

    if (projectId) {
      await loadPlansForProject(projectId);
    }
  };

  const canAssignMember = (employeeId) => {
    if (selectedAssignments.includes(employeeId)) return true;

    const member = getEmployeeById(employeeId);
    if (!member) return false;

    const count = employeeProjectCounts[employeeId] || 0;

    if (
      selectedTask &&
      !isCreating &&
      selectedTask.status !== "completed" &&
      selectedTask.status !== "cancelled" &&
      selectedTask.projectId
    ) {
      const alreadyAssignedToProject = tasks.some(
        (task) =>
          task.id !== selectedTask.id &&
          task.projectId === selectedTask.projectId &&
          task.status !== "completed" &&
          task.status !== "cancelled" &&
          task.assignedTo.includes(employeeId)
      );

      if (alreadyAssignedToProject) return true;
    }

    return count < MAX_PROJECTS_PER_MEMBER;
  };

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
        `${member?.name || "This employee"} has reached the ${MAX_PROJECTS_PER_MEMBER}-project workload limit.`
      );

      return;
    }

    setSelectedAssignments((current) => [...current, employeeId]);
  };

  const handleCreateWeeklyPlan = async () => {
    setAssignmentError("");

    const projectId = toId(taskForm.projectId);

    if (!projectId) {
      setAssignmentError("Select a project first.");
      return;
    }

    if (!planForm.weekStartDate || !planForm.weekEndDate) {
      setAssignmentError("Enter both weekly plan dates.");
      return;
    }

    if (planForm.weekEndDate < planForm.weekStartDate) {
      setAssignmentError("The week end date must be on or after the start date.");
      return;
    }

    setSaving(true);

    try {
      const created = await createAdminWeeklyPlan({
        project_id: projectId,
        week_start_date: planForm.weekStartDate,
        week_end_date: planForm.weekEndDate,
      });

      const newPlan = {
        ...created,
        id: toId(created?.id),
        project_id: toId(created?.project_id),
      };

      if (!newPlan.id) {
        throw new Error("The weekly plan was created but its ID was not returned.");
      }

      setWeeklyPlans((current) => [
        ...current.filter((plan) => plan.id !== newPlan.id),
        newPlan,
      ]);

      setTaskForm((current) => ({
        ...current,
        weeklyPlanId: String(newPlan.id),
      }));

      setShowPlanForm(false);
      setPlanForm({ weekStartDate: "", weekEndDate: "" });
      setSuccessMessage("Weekly plan created.");
    } catch (error) {
      setAssignmentError(
        getErrorMessage(error, "Unable to create the weekly plan.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAssignment = async () => {
    setAssignmentError("");
    setPageError("");
    setSuccessMessage("");

    const projectId = toId(taskForm.projectId);
    const weeklyPlanId = toId(taskForm.weeklyPlanId);

    if (!taskForm.title.trim()) {
      setAssignmentError("Task title is required.");
      return;
    }

    if (!projectId) {
      setAssignmentError("Select a project.");
      return;
    }

    if (!weeklyPlanId) {
      setAssignmentError("Select a weekly plan.");
      return;
    }

    if (!taskForm.description.trim()) {
      setAssignmentError("Task description is required.");
      return;
    }

    if (selectedAssignments.length === 0) {
      setAssignmentError("Assign at least one team member.");
      return;
    }

    const invalidMembers = selectedAssignments.filter((employeeId) => {
      if (isCreating) {
        return !canAssignMember(employeeId);
      }

      if (
        !selectedTask ||
        selectedTask.status === "completed" ||
        selectedTask.status === "cancelled" ||
        selectedTask.assignedTo.includes(employeeId)
      ) {
        return false;
      }

      return !canAssignMember(employeeId);
    });

    if (invalidMembers.length) {
      const names = invalidMembers
        .map((id) => getEmployeeById(id)?.name)
        .filter(Boolean)
        .join(", ");

      setAssignmentError(
        `${names || "Selected employees"} cannot be assigned because of the active-project workload limit.`
      );
      return;
    }

    const dueDate = taskForm.dueDate
      ? `${taskForm.dueDate}T00:00:00`
      : null;

    setSaving(true);

    try {
      if (isCreating) {
        await createAdminTask({
          title: taskForm.title.trim(),
          description: taskForm.description.trim(),
          project_id: projectId,
          weekly_plan_id: weeklyPlanId,
          priority: taskForm.priority,
          due_date: dueDate,
          employee_ids: selectedAssignments,
        });

        setSuccessMessage("Task created and assigned successfully.");
      } else {
        if (!selectedTask?.id) {
          throw new Error("Select a valid task before saving changes.");
        }

        await updateAdminTask(selectedTask.id, {
          title: taskForm.title.trim(),
          description: taskForm.description.trim(),
          priority: taskForm.priority,
          status: taskForm.status,
          due_date: dueDate,
          employee_ids: selectedAssignments,
        });

        setSuccessMessage("Task updated successfully.");
      }

      closeAssignModal();
      await loadTasks();
    } catch (error) {
      setAssignmentError(
        getErrorMessage(error, "Unable to save the task.")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLoadHistory = async () => {
    if (!selectedTask?.id) return;

    if (showHistory) {
      setShowHistory(false);
      return;
    }

    setShowHistory(true);
    setHistoryLoading(true);
    setHistoryError("");

    try {
      const result = await getAdminTaskAssignmentHistory(selectedTask.id);
      setHistory(toArray(result));
    } catch (error) {
      setHistoryError(
        getErrorMessage(error, "Unable to load assignment history.")
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCarryForward = async () => {
    if (!selectedTask?.id || !toId(carryForwardPlanId)) {
      setHistoryError("Select a destination weekly plan first.");
      return;
    }

    setHistoryError("");
    setPageError("");
    setSaving(true);

    try {
      await carryForwardAdminTask(
        selectedTask.id,
        Number(carryForwardPlanId)
      );

      setSuccessMessage("Task carried forward successfully.");
      setIsDetailsOpen(false);
      setSelectedTask(null);
      await loadTasks();
    } catch (error) {
      setHistoryError(
        getErrorMessage(error, "Unable to carry forward this task.")
      );
    } finally {
      setSaving(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setProjectFilter("All");
    setPlanFilter("All");
    setCurrentPage(1);
  };

  const getStatusClass = (status) =>
    `admin-task-status admin-task-status-${normalizeStatus(status).replace(/_/g, "-")}`;

  const getPriorityClass = (priority) =>
    `admin-task-priority admin-task-priority-${normalizePriority(priority)}`;

  const getProjectNameForTask = (task) =>
    getProjectById(task.projectId)?.name || `Project #${task.projectId || "—"}`;

  const getMemberProjectCount = (employeeId) =>
    employeeProjectCounts[employeeId] || 0;

  const availableCarryForwardPlans = weeklyPlans.filter(
    (plan) =>
      plan.project_id === selectedTask?.projectId &&
      !getTaskPlanIds(selectedTask).includes(plan.id)
  );

  return (
    <div className="admin-tasks-page">
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
            Manage project tasks, assign team members and track task status
            through your project weekly plans.
          </p>
        </div>

        <div className="admin-tasks-header-actions">
          <button
            type="button"
            className="admin-tasks-secondary-btn"
            onClick={loadPageData}
            disabled={loading}
          >
            <RefreshCcw size={16} />
            Refresh
          </button>

          <button
            type="button"
            className="admin-tasks-primary-btn"
            onClick={() => openAssignModal()}
          >
            <Plus size={17} />
            Create Task
          </button>
        </div>
      </div>

      {pageError && (
        <div className="admin-task-assignment-error" role="alert">
          <AlertCircle size={17} />
          <span>{pageError}</span>
          <button
            type="button"
            className="admin-tasks-search-clear"
            onClick={() => setPageError("")}
            aria-label="Dismiss error"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="admin-task-success-message" role="status">
          <CheckCircle2 size={17} />
          <span>{successMessage}</span>
          <button
            type="button"
            className="admin-tasks-search-clear"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss success message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="admin-tasks-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="admin-task-stat-card"
              style={{ "--card-index": index }}
            >
              <div className="admin-task-stat-icon">
                <Icon size={19} />
              </div>

              <div className="admin-task-stat-content">
                <span>{stat.label}</span>
                <strong>{loading ? "—" : stat.value}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <section className="admin-tasks-panel">
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
              <label htmlFor="task-project-filter">Project</label>
              <select
                id="task-project-filter"
                value={projectFilter}
                onChange={(event) => setProjectFilter(event.target.value)}
              >
                <option value="All">All Projects</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-tasks-filter">
              <label htmlFor="task-plan-filter">Weekly Plan</label>
              <select
                id="task-plan-filter"
                value={planFilter}
                onChange={(event) => setPlanFilter(event.target.value)}
                disabled={projectFilter === "All"}
              >
                <option value="All">All Weeks</option>
                {weeklyPlans
                  .filter(
                    (plan) =>
                      plan.project_id === Number(projectFilter)
                  )
                  .map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {getPlanLabel(plan)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="admin-tasks-filter">
              <label htmlFor="task-status-filter">Status</label>
              <select
                id="task-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Status</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-tasks-filter">
              <label htmlFor="task-priority-filter">Priority</label>
              <select
                id="task-priority-filter"
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
              >
                <option value="All">All Priority</option>
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {titleCase(priority)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="admin-tasks-table-wrap">
          {loading ? (
            <div className="admin-tasks-empty">
              <div className="admin-tasks-empty-icon">
                <RefreshCcw size={26} />
              </div>
              <h3>Loading tasks</h3>
              <p>Fetching projects, team members and tasks from the backend.</p>
            </div>
          ) : paginatedTasks.length > 0 ? (
            <table className="admin-tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Weekly Plan</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedTasks.map((task, index) => {
                  const assignedMembers = task.assignedTo
                    .map(getEmployeeById)
                    .filter(Boolean);

                  const taskPlan = planById.get(task.weeklyPlanId);

                  return (
                    <tr
                      key={task.id}
                      className="admin-task-row"
                      style={{ "--row-index": index }}
                    >
                      <td>
                        <div className="admin-task-title-cell">
                          <div className="admin-task-title-icon">
                            <ClipboardList size={16} />
                          </div>

                          <div>
                            <strong>{task.title}</strong>
                            <span>
                              {task.assignedTo.length}{" "}
                              {task.assignedTo.length === 1 ? "member" : "members"} assigned
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="admin-task-project-cell">
                          <FolderKanban size={15} />
                          <span>{getProjectNameForTask(task)}</span>
                        </div>
                      </td>

                      <td>
                        <div className="admin-task-assignees">
                          {assignedMembers.length ? (
                            assignedMembers.map((member, memberIndex) => (
                              <div
                                key={member.id}
                                className="admin-task-assignee"
                                style={{ "--member-index": memberIndex }}
                                title={`${member.name} — ${member.role}`}
                              >
                                <div className="admin-task-avatar">
                                  {getInitials(member.name)}
                                </div>
                                <div className="admin-task-assignee-info">
                                  <strong>{member.name}</strong>
                                  <span>{member.role}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span>Unassigned</span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className={getPriorityClass(task.priority)}>
                          <Flag size={13} />
                          {titleCase(task.priority)}
                        </span>
                      </td>

                      <td>
                        <div className="admin-task-date">
                          <CalendarDays size={14} />
                          {formatDate(task.dueDate)}
                        </div>
                        {task.isOverdue && (
                          <span className="admin-task-overdue">Overdue</span>
                        )}
                      </td>

                      <td>
                        <div className="admin-task-plan-cell">
                          {taskPlan
                            ? getPlanLabel(taskPlan)
                            : task.weeklyPlanId
                              ? `Plan #${task.weeklyPlanId}`
                              : "—"}
                        </div>
                      </td>

                      <td>
                        <span className={getStatusClass(task.status)}>
                          {task.status === "completed" ? (
                            <CheckCircle2 size={13} />
                          ) : task.status === "blocked" ? (
                            <AlertCircle size={13} />
                          ) : (
                            <Activity size={13} />
                          )}
                          {statusLabel(task.status)}
                        </span>
                      </td>

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
                            onClick={() => openAssignModal(task)}
                            title="Edit task and assignment"
                            aria-label={`Edit ${task.title}`}
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
                No backend tasks match the selected search and filters.
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
                setCurrentPage((page) => Math.max(1, page - 1))
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
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {isDetailsOpen && selectedTask && (
        <div
          className="admin-task-modal-overlay"
          onMouseDown={closeTaskModal}
          role="presentation"
        >
          <div
            className="admin-task-modal admin-task-details-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-details-title"
          >
            <div className="admin-task-modal-header">
              <div>
                <span className="admin-task-modal-eyebrow">Task Details</span>
                <h2 id="task-details-title">{selectedTask.title}</h2>
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
                <strong>{getProjectNameForTask(selectedTask)}</strong>
              </div>
              <div className="admin-task-detail-card">
                <span>Due Date</span>
                <strong>{formatDate(selectedTask.dueDate)}</strong>
              </div>
              <div className="admin-task-detail-card">
                <span>Priority</span>
                <strong>{titleCase(selectedTask.priority)}</strong>
              </div>
              <div className="admin-task-detail-card">
                <span>Status</span>
                <strong>{statusLabel(selectedTask.status)}</strong>
              </div>
              <div className="admin-task-detail-card">
                <span>Task ID</span>
                <strong>#{selectedTask.id}</strong>
              </div>
              <div className="admin-task-detail-card">
                <span>Weekly Plan</span>
                <strong>
                  {planById.has(selectedTask.weeklyPlanId)
                    ? getPlanLabel(planById.get(selectedTask.weeklyPlanId))
                    : `Plan #${selectedTask.weeklyPlanId || "—"}`}
                </strong>
              </div>
            </div>

            <div className="admin-task-detail-section">
              <div className="admin-task-detail-section-title">
                <FileText size={16} />
                Description
              </div>
              <p>{selectedTask.description || "No description provided."}</p>
            </div>

            <div className="admin-task-detail-section">
              <div className="admin-task-detail-section-title">
                <Users size={16} />
                Assigned Team Members
              </div>

              <div className="admin-task-detail-members">
                {selectedTask.assignedTo.map((employeeId, index) => {
                  const member = getEmployeeById(employeeId);
                  if (!member) return null;

                  return (
                    <div
                      key={member.id}
                      className="admin-task-detail-member"
                      style={{ "--member-index": index }}
                    >
                      <div className="admin-task-avatar">
                        {getInitials(member.name)}
                      </div>

                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.role}</span>
                      </div>

                      <small>
                        {getMemberProjectCount(member.id)}/
                        {MAX_PROJECTS_PER_MEMBER} projects
                      </small>
                    </div>
                  );
                })}

                {selectedTask.assignedTo.length === 0 && (
                  <p>No team members are assigned to this task.</p>
                )}
              </div>
            </div>

            <div className="admin-task-detail-section">
              <div className="admin-task-detail-section-title">
                <History size={16} />
                Assignment History
              </div>

              <button
                type="button"
                className="admin-tasks-secondary-btn"
                onClick={handleLoadHistory}
              >
                <History size={15} />
                {showHistory ? "Hide History" : "View Assignment History"}
              </button>

              {showHistory && (
                <div className="admin-task-history-list">
                  {historyLoading ? (
                    <p>Loading assignment history…</p>
                  ) : historyError ? (
                    <div className="admin-task-assignment-error">
                      <AlertCircle size={16} />
                      <span>{historyError}</span>
                    </div>
                  ) : history.length === 0 ? (
                    <p>No assignment history entries were returned.</p>
                  ) : (
                    history.map((entry, index) => {
                      const member = getEmployeeById(entry.employee_id);

                      return (
                        <div
                          key={entry.id ?? `${entry.task_id}-${index}`}
                          className="admin-task-history-entry"
                        >
                          <strong>
                            {titleCase(entry.action || "Assignment update")}
                          </strong>
                          <span>
                            {member?.name || `Employee #${entry.employee_id}`}
                          </span>
                          <span>{formatDate(entry.changed_at)}</span>
                          {entry.reason && <p>{entry.reason}</p>}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <div className="admin-task-detail-section">
              <div className="admin-task-detail-section-title">
                <ArrowRight size={16} />
                Carry Task Forward
              </div>

              <p>
                Move this task to another weekly plan for the same project.
              </p>

              <div className="admin-task-carry-forward">
                <select
                  aria-label="Destination weekly plan"
                  value={carryForwardPlanId}
                  onChange={(event) => setCarryForwardPlanId(event.target.value)}
                >
                  <option value="">Select destination weekly plan</option>
                  {availableCarryForwardPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {getPlanLabel(plan)}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="admin-tasks-primary-btn"
                  onClick={handleCarryForward}
                  disabled={saving || !carryForwardPlanId}
                >
                  <ArrowRight size={15} />
                  {saving ? "Carrying Forward…" : "Carry Forward"}
                </button>
              </div>

              {historyError && !showHistory && (
                <div className="admin-task-assignment-error">
                  <AlertCircle size={16} />
                  <span>{historyError}</span>
                </div>
              )}
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
                onClick={() => openAssignModal(selectedTask)}
              >
                <UserPlus size={15} />
                Edit Task & Assignment
              </button>
            </div>
          </div>
        </div>
      )}

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
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-assignment-title"
          >
            <div className="admin-task-modal-header">
              <div>
                <span className="admin-task-modal-eyebrow">
                  {isCreating ? "Create & Assign" : "Task Management"}
                </span>

                <h2 id="task-assignment-title">
                  {isCreating ? "Create New Task" : "Edit Task & Assignment"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-task-modal-close"
                onClick={closeAssignModal}
                aria-label="Close task form"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-task-form">
              <div className="admin-task-form-group">
                <label htmlFor="task-title">
                  Task Name <span>*</span>
                </label>
                <input
                  id="task-title"
                  type="text"
                  maxLength={200}
                  value={taskForm.title}
                  onChange={(event) =>
                    setTaskForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="admin-task-form-group">
                <label htmlFor="task-project">
                  Project <span>*</span>
                </label>

                <select
                  id="task-project"
                  value={taskForm.projectId}
                  onChange={(event) => handleProjectChange(event.target.value)}
                  disabled={!isCreating}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>

                {!isCreating && (
                  <small>
                    Project cannot be changed through the current task update API.
                  </small>
                )}
              </div>

              <div className="admin-task-form-group">
                <label htmlFor="task-weekly-plan">
                  Weekly Plan <span>*</span>
                </label>

                <select
                  id="task-weekly-plan"
                  value={taskForm.weeklyPlanId}
                  onChange={(event) =>
                    setTaskForm((current) => ({
                      ...current,
                      weeklyPlanId: event.target.value,
                    }))
                  }
                  disabled={!isCreating || !taskForm.projectId || loadingPlans}
                  required
                >
                  <option value="">
                    {loadingPlans ? "Loading weekly plans…" : "Select a weekly plan"}
                  </option>

                  {weeklyPlans
                    .filter(
                      (plan) =>
                        plan.project_id === Number(taskForm.projectId)
                    )
                    .map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {getPlanLabel(plan)}
                      </option>
                    ))}
                </select>

                {isCreating && taskForm.projectId && !loadingPlans && (
                  <button
                    type="button"
                    className="admin-tasks-secondary-btn admin-task-create-plan-trigger"
                    onClick={() => setShowPlanForm((current) => !current)}
                  >
                    <Plus size={14} />
                    {showPlanForm ? "Cancel Weekly Plan" : "Create Weekly Plan"}
                  </button>
                )}

                {showPlanForm && (
                  <div className="admin-task-weekly-plan-form">
                    <div className="admin-task-form-row">
                      <div className="admin-task-form-group">
                        <label htmlFor="plan-week-start">Week Start</label>
                        <input
                          id="plan-week-start"
                          type="date"
                          value={planForm.weekStartDate}
                          onChange={(event) =>
                            setPlanForm((current) => ({
                              ...current,
                              weekStartDate: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="admin-task-form-group">
                        <label htmlFor="plan-week-end">Week End</label>
                        <input
                          id="plan-week-end"
                          type="date"
                          min={planForm.weekStartDate || undefined}
                          value={planForm.weekEndDate}
                          onChange={(event) =>
                            setPlanForm((current) => ({
                              ...current,
                              weekEndDate: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="admin-tasks-primary-btn"
                      onClick={handleCreateWeeklyPlan}
                      disabled={saving}
                    >
                      <Save size={15} />
                      {saving ? "Creating…" : "Save Weekly Plan"}
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-task-form-row">
                <div className="admin-task-form-group">
                  <label htmlFor="task-priority">
                    Priority <span>*</span>
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
                    {PRIORITY_OPTIONS.map((priority) => (
                      <option key={priority} value={priority}>
                        {titleCase(priority)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-task-form-group">
                  <label htmlFor="task-due-date">Due Date</label>
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

              {!isCreating && (
                <div className="admin-task-form-group">
                  <label htmlFor="task-status">Task Status</label>
                  <select
                    id="task-status"
                    value={taskForm.status}
                    onChange={(event) =>
                      setTaskForm((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="admin-task-form-group">
                <label htmlFor="task-description">
                  Description <span>*</span>
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
                  required
                />
              </div>

              <div className="admin-task-assignment-section">
                <div className="admin-task-assignment-heading">
                  <div>
                    <label>
                      Assign Team Members <span>*</span>
                    </label>
                    <p>
                      Select at least one employee. The workload check uses
                      the currently loaded task assignments.
                    </p>
                  </div>

                  <div className="admin-task-assignment-count">
                    {selectedAssignments.length} selected
                  </div>
                </div>

                <div className="admin-task-member-list">
                  {teamMembers.map((member, index) => {
                    const isSelected = selectedAssignments.includes(member.id);
                    const projectCount = getMemberProjectCount(member.id);
                    const isLimitReached =
                      projectCount >= MAX_PROJECTS_PER_MEMBER &&
                      !isSelected &&
                      !canAssignMember(member.id);

                    return (
                      <button
                        type="button"
                        key={member.id}
                        className={`admin-task-member-option ${
                          isSelected ? "is-selected" : ""
                        } ${isLimitReached ? "is-disabled" : ""}`}
                        style={{ "--member-index": index }}
                        onClick={() => handleAssignmentChange(member.id)}
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
                            {projectCount}/{MAX_PROJECTS_PER_MEMBER}
                          </strong>
                          <span>
                            {isLimitReached ? "Limit Reached" : "Active Projects"}
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

                  {teamMembers.length === 0 && (
                    <p>
                      No employees were returned by the employee API.
                    </p>
                  )}
                </div>
              </div>

              {assignmentError && (
                <div className="admin-task-assignment-error" role="alert">
                  <AlertCircle size={17} />
                  <span>{assignmentError}</span>
                </div>
              )}
            </div>

            <div className="admin-task-modal-footer">
              <button
                type="button"
                className="admin-tasks-secondary-btn"
                onClick={closeAssignModal}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-tasks-primary-btn"
                onClick={handleSaveAssignment}
                disabled={saving || loadingPlans}
              >
                <Save size={15} />
                {saving
                  ? "Saving…"
                  : isCreating
                    ? "Create & Assign"
                    : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;