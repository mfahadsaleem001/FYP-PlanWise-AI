
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
  X,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useToast } from "../../components/common/ToastProvider";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/api";

import "./AdminEmployees.css";

const ROLE_OPTIONS = [
  "Backend Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "QA Engineer",
  "ML Engineer",
  "Project Manager",
  "DevOps Engineer",
  "Data Analyst",
  "Other",
];

// ============================================================
// ERROR MESSAGE HELPER
// ============================================================

function getErrorMessage(
  err,
  fallback = "Something went wrong."
) {
  const candidates = [
    err?.response?.data?.detail,
    err?.response?.data?.message,
    err?.response?.data?.error,
    err?.data?.detail,
    err?.data?.message,
    err?.detail,
    err?.message,
  ];

  const formatValue = (value, depth = 0) => {
    if (depth > 4 || value == null) {
      return "";
    }

    if (typeof value === "string") {
      return value.trim();
    }

    if (
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => formatValue(item, depth + 1))
        .filter(Boolean)
        .join(", ");
    }

    if (typeof value === "object") {
      const preferredKeys = [
        "message",
        "msg",
        "detail",
        "error",
        "description",
      ];

      for (const key of preferredKeys) {
        if (value[key] != null) {
          const result = formatValue(
            value[key],
            depth + 1
          );

          if (result) {
            return result;
          }
        }
      }

      // Handle FastAPI validation errors.
      // Example: { loc: ["body", "email"], msg: "Invalid email" }
      if (Array.isArray(value.loc)) {
        const field = value.loc
          .filter((part) => part !== "body")
          .join(".");

        const description = value.msg || value.message;

        if (field && description) {
          return `${field}: ${formatValue(
            description,
            depth + 1
          )}`;
        }
      }

      const entries = Object.entries(value);

      if (entries.length > 0) {
        return entries
          .map(([key, item]) => {
            const result = formatValue(item, depth + 1);

            return result ? `${key}: ${result}` : "";
          })
          .filter(Boolean)
          .join(", ");
      }
    }

    return "";
  };

  for (const candidate of candidates) {
    const message = formatValue(candidate);

    if (
      message &&
      message !== "[object Object]" &&
      message !== "undefined" &&
      message !== "null"
    ) {
      return message;
    }
  }

  return fallback;
}

// ============================================================
// NORMALIZATION HELPERS
// ============================================================

function normalizeSkills(skills) {
  if (Array.isArray(skills)) {
    return skills
      .map((skill) => String(skill).trim())
      .filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeAccountStatus(employee) {
  const rawStatus =
    employee.account_status ??
    employee.status ??
    "Unknown";

  const status = String(rawStatus)
    .trim()
    .toLowerCase()
    .replaceAll("-", "_")
    .replaceAll(" ", "_");

  const labels = {
    active: "Active",
    pending_setup: "Pending Setup",
    inactive: "Inactive",
    disabled: "Disabled",
    suspended: "Suspended",
    invited: "Invited",
  };

  return labels[status] || String(rawStatus);
}

function normalizeEmployee(employee) {
  return {
    id: employee.id ?? employee.employee_id,
    userId: employee.user_id ?? null,
    name: employee.name ?? "",
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    role: employee.job_title ?? employee.role ?? "Other",
    experience: employee.experience ?? "",
    skills: normalizeSkills(employee.skills),
    location: employee.location ?? "",
    accountStatus: normalizeAccountStatus(employee),
  };
}

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "E"
  );
}

function getAccountStatusClass(status = "") {
  const normalized = status.toLowerCase();

  if (normalized === "active") {
    return "active";
  }

  if (
    normalized === "pending setup" ||
    normalized === "invited"
  ) {
    return "pending";
  }

  return "inactive";
}

// ============================================================
// EMPLOYEES PAGE
// ============================================================

function Employees() {
  const { showToast } = useToast();

  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [showEmployeeModal, setShowEmployeeModal] =
    useState(false);

  const [showAddEmployeeModal, setShowAddEmployeeModal] =
    useState(false);

  const [showEditEmployeeModal, setShowEditEmployeeModal] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [editingSkillsInput, setEditingSkillsInput] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Backend Developer",
    experience: "",
    skills: "",
    location: "",
  });

  // ============================================================
  // FETCH EMPLOYEES
  // ============================================================

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEmployees();

      if (!Array.isArray(data)) {
        throw new Error(
          "Unexpected response from the employees API."
        );
      }

      setEmployees(data.map(normalizeEmployee));
    } catch (err) {
      console.error("Fetch employees failed:", err);

      setError(
        getErrorMessage(
          err,
          "Unable to load employees."
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ============================================================
  // SEARCH AND FILTERS
  // ============================================================

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return employees.filter((employee) => {
      const searchableText = [
        employee.name,
        employee.email,
        employee.role,
        employee.phone,
        employee.location,
        ...employee.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchableText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        employee.accountStatus.toLowerCase() ===
          statusFilter.toLowerCase();

      const matchesRole =
        roleFilter === "All" ||
        employee.role === roleFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRole
      );
    });
  }, [
    employees,
    searchTerm,
    statusFilter,
    roleFilter,
  ]);

  const activeCount = employees.filter(
    (employee) =>
      employee.accountStatus === "Active"
  ).length;

  const pendingCount = employees.filter(
    (employee) =>
      employee.accountStatus === "Pending Setup"
  ).length;

  const otherCount =
    employees.length - activeCount - pendingCount;

  // ============================================================
  // VIEW EMPLOYEE
  // ============================================================

  const openEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const closeEmployee = () => {
    setSelectedEmployee(null);
    setShowEmployeeModal(false);
  };

  // ============================================================
  // ADD EMPLOYEE
  // ============================================================

  const openAddEmployee = () => {
    setError("");

    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      role: "Backend Developer",
      experience: "",
      skills: "",
      location: "",
    });

    setShowAddEmployeeModal(true);
  };

  const closeAddEmployee = () => {
    if (saving) return;

    setShowAddEmployeeModal(false);
  };

  const handleEmployeeInput = (event) => {
    const { name, value } = event.target;

    setNewEmployee((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddEmployee = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: newEmployee.name.trim(),
        email: newEmployee.email
          .trim()
          .toLowerCase(),
        job_title: newEmployee.role,
        phone: newEmployee.phone.trim() || null,
        experience:
          newEmployee.experience.trim() || null,
        skills: newEmployee.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        location:
          newEmployee.location.trim() || null,
      };

      await createEmployee(payload);

      setShowAddEmployeeModal(false);

      showToast(
        "Employee created successfully.",
        "success"
      );

      await fetchEmployees();
    } catch (err) {
      console.error("Create employee failed:", err);

      showToast(
        getErrorMessage(
          err,
          "Unable to create employee."
        ),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // EDIT EMPLOYEE
  // ============================================================

  const openEditEmployee = (employee) => {
    setError("");

    setEditingEmployee({ ...employee });
    setEditingSkillsInput(
      employee.skills.join(", ")
    );

    setShowEmployeeModal(false);
    setSelectedEmployee(null);
    setShowEditEmployeeModal(true);
  };

  const closeEditEmployee = () => {
    if (saving) return;

    setShowEditEmployeeModal(false);
    setEditingEmployee(null);
    setEditingSkillsInput("");
  };

  const handleEditEmployeeInput = (event) => {
    const { name, value } = event.target;

    setEditingEmployee((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();

    if (!editingEmployee || saving) return;

    if (
      editingEmployee.id === null ||
      editingEmployee.id === undefined ||
      editingEmployee.id === ""
    ) {
      showToast(
        "Cannot update employee: employee ID is missing. Refresh the employee list and try again.",
        "error"
      );
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: editingEmployee.name.trim(),
        email: editingEmployee.email
          .trim()
          .toLowerCase(),
        job_title: editingEmployee.role,
        phone:
          editingEmployee.phone.trim() || null,
        experience:
          String(editingEmployee.experience ?? "").trim() ||
          null,
        skills: editingSkillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        location:
          editingEmployee.location.trim() || null,
      };

      // Keep the employee ID separate from the update payload.
      const employeeId = editingEmployee.id;

      await updateEmployee(employeeId, payload);

      setShowEditEmployeeModal(false);
      setEditingEmployee(null);
      setEditingSkillsInput("");

      showToast(
        "Employee updated successfully.",
        "success"
      );

      await fetchEmployees();
    } catch (err) {
      // Helpful for diagnosing API errors in the browser console.
      console.error("Update employee failed:", err);

      showToast(
        getErrorMessage(
          err,
          "Unable to update employee."
        ),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE EMPLOYEE
  // ============================================================

  const handleDeleteEmployee = async (employee) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}? This action cannot be undone.`
    );

    if (!confirmed || deletingId !== null) return;

    setDeletingId(employee.id);
    setError("");

    try {
      await deleteEmployee(employee.id);

      setEmployees((previous) =>
        previous.filter(
          (item) => item.id !== employee.id
        )
      );

      setShowEmployeeModal(false);
      setSelectedEmployee(null);

      showToast(
        "Employee deleted successfully.",
        "success"
      );
    } catch (err) {
      console.error("Delete employee failed:", err);

      showToast(
        getErrorMessage(
          err,
          "Unable to delete employee."
        ),
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-employees">
      {/* PAGE HEADER */}

      <div className="admin-employees-header">
        <div className="admin-employees-header-content">
          <span className="admin-employees-eyebrow">
            RESOURCE MANAGEMENT
          </span>

          <h1>Employees & Resources</h1>

          <p>
            Manage employee profiles, skills, and account status.
          </p>
        </div>

        <div className="admin-employees-header-actions">
          <button
            type="button"
            className="admin-employees-primary"
            onClick={fetchEmployees}
            disabled={loading}
          >
            <RefreshCw
              size={15}
              className={
                loading ? "admin-employees-spin" : ""
              }
            />
            Refresh
          </button>

          <button
            type="button"
            className="admin-employees-primary"
            onClick={openAddEmployee}
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* INITIAL LOAD / REFRESH ERROR */}

      {error && (
        <div className="admin-employees-message admin-employees-error">
          <AlertCircle size={18} />
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}

      <div className="admin-employees-stat-grid">
        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Total Employees</span>
            <div className="admin-employees-stat-icon">
              <Users size={17} />
            </div>
          </div>

          <strong>
            {loading ? (
              <Loader2 size={20} />
            ) : (
              employees.length
            )}
          </strong>

          <small>
            Employee records in the database
          </small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Active Accounts</span>
            <div className="admin-employees-stat-icon">
              <UserCheck size={17} />
            </div>
          </div>

          <strong>
            {loading ? (
              <Loader2 size={20} />
            ) : (
              activeCount
            )}
          </strong>

          <small>Accounts marked active</small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Pending Setup</span>
            <div className="admin-employees-stat-icon">
              <ShieldCheck size={17} />
            </div>
          </div>

          <strong>
            {loading ? (
              <Loader2 size={20} />
            ) : (
              pendingCount
            )}
          </strong>

          <small>Awaiting password setup</small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Other Statuses</span>
            <div className="admin-employees-stat-icon">
              <UserX size={17} />
            </div>
          </div>

          <strong>
            {loading ? (
              <Loader2 size={20} />
            ) : (
              otherCount
            )}
          </strong>

          <small>
            Inactive or other account statuses
          </small>
        </div>
      </div>

      {/* RESOURCE DIRECTORY */}

      <section className="admin-employees-panel">
        <div className="admin-employees-toolbar">
          <div className="admin-employees-toolbar-left">
            <div className="admin-employees-panel-title">
              <span>Resource Directory</span>

              <small>
                {loading
                  ? "Loading..."
                  : `${filteredEmployees.length} employees`}
              </small>
            </div>
          </div>

          <div className="admin-employees-toolbar-right">
            <label className="admin-employees-search">
              <Search size={15} />

              <input
                type="text"
                placeholder="Search employees, roles or skills..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </label>

            <select
              className="admin-employees-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">
                All Account Statuses
              </option>
              <option value="Active">Active</option>
              <option value="Pending Setup">
                Pending Setup
              </option>
              <option value="Inactive">Inactive</option>
              <option value="Disabled">Disabled</option>
              <option value="Suspended">Suspended</option>
              <option value="Invited">Invited</option>
            </select>

            <select
              className="admin-employees-filter"
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="All">All Roles</option>

              {[
                ...new Set([
                  ...ROLE_OPTIONS,
                  ...employees.map(
                    (employee) => employee.role
                  ),
                ]),
              ].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* EMPLOYEES TABLE */}

        <div className="admin-employees-table-wrapper">
          <table className="admin-employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Account</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="admin-employees-empty"
                  >
                    <Loader2
                      size={24}
                      className="admin-employees-spin"
                    />
                    <strong>
                      Loading employees...
                    </strong>
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="admin-employees-empty"
                  >
                    <Users size={25} />

                    <strong>
                      {error
                        ? "Employee records could not be loaded"
                        : "No employees found"}
                    </strong>

                    <span>
                      {error
                        ? "Check your connection and try refreshing."
                        : "Try changing your search or filters."}
                    </span>

                    {error && (
                      <button
                        type="button"
                        className="admin-employees-primary"
                        onClick={fetchEmployees}
                      >
                        Try Again
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(
                  (employee, index) => (
                    <tr
                      key={employee.id ?? employee.email}
                      className="admin-employee-row"
                      style={{
                        "--row-index": index,
                      }}
                    >
                      <td>
                        <div className="admin-employee-cell">
                          <div className="admin-employee-avatar">
                            {getInitials(employee.name)}
                          </div>

                          <div className="admin-employee-info">
                            <strong>
                              {employee.name}
                            </strong>
                            <span>
                              {employee.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-employee-role">
                          {employee.role}
                        </span>
                      </td>

                      <td>
                        <span className="admin-employee-experience">
                          {employee.experience || "—"}
                        </span>
                      </td>

                      <td>
                        <div className="admin-employee-skills">
                          {employee.skills.length > 0 ? (
                            employee.skills.map(
                              (skill, skillIndex) => (
                                <span
                                  key={`${skill}-${skillIndex}`}
                                >
                                  {skill}
                                </span>
                              )
                            )
                          ) : (
                            <span>Not provided</span>
                          )}
                        </div>
                      </td>

                      <td>{employee.phone || "—"}</td>
                      <td>{employee.location || "—"}</td>

                      <td>
                        <span
                          className={`admin-account-status ${getAccountStatusClass(
                            employee.accountStatus
                          )}`}
                        >
                          <span className="admin-account-status-dot" />
                          {employee.accountStatus}
                        </span>
                      </td>

                      <td>
                        <div className="admin-employee-actions">
                          <button
                            type="button"
                            className="admin-table-action"
                            title="View employee"
                            onClick={() =>
                              openEmployee(employee)
                            }
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            className="admin-table-action"
                            title="Edit employee"
                            onClick={() =>
                              openEditEmployee(employee)
                            }
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            className="admin-table-action"
                            title="Delete employee"
                            disabled={
                              deletingId === employee.id
                            }
                            onClick={() =>
                              handleDeleteEmployee(employee)
                            }
                          >
                            {deletingId === employee.id ? (
                              <Loader2
                                size={15}
                                className="admin-employees-spin"
                              />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-employees-footer">
          <span>
            Showing{" "}
            <strong>{filteredEmployees.length}</strong>{" "}
            of <strong>{employees.length}</strong> employees
          </span>
        </div>
      </section>

      {/* VIEW EMPLOYEE MODAL */}

      {showEmployeeModal && selectedEmployee && (
        <div
          className="admin-employee-modal-overlay"
          onClick={closeEmployee}
        >
          <div
            className="admin-employee-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  EMPLOYEE PROFILE
                </span>
                <h2>Employee Details</h2>
              </div>

              <button
                type="button"
                className="admin-employee-modal-close"
                onClick={closeEmployee}
                aria-label="Close employee details"
              >
                <X size={15} />
              </button>
            </div>

            <div className="admin-employee-profile">
              <div className="admin-employee-modal-avatar">
                {getInitials(selectedEmployee.name)}
              </div>

              <div>
                <h3>{selectedEmployee.name}</h3>

                <span className="admin-employee-modal-email">
                  <Mail size={12} />
                  {selectedEmployee.email}
                </span>

                <span
                  className={`admin-account-status ${getAccountStatusClass(
                    selectedEmployee.accountStatus
                  )}`}
                >
                  <span className="admin-account-status-dot" />
                  {selectedEmployee.accountStatus}
                </span>
              </div>
            </div>

            <div className="admin-employee-details-grid">
              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <BriefcaseBusiness size={14} />
                </div>

                <div>
                  <span>Role</span>
                  <strong>
                    {selectedEmployee.role}
                  </strong>
                </div>
              </div>

              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <BriefcaseBusiness size={14} />
                </div>

                <div>
                  <span>Experience</span>
                  <strong>
                    {selectedEmployee.experience ||
                      "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <Phone size={14} />
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedEmployee.phone ||
                      "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <MapPin size={14} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedEmployee.location ||
                      "Not provided"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="admin-employee-modal-section">
              <span>Skills</span>

              <div className="admin-employee-modal-skills">
                {selectedEmployee.skills.length > 0 ? (
                  selectedEmployee.skills.map(
                    (skill, index) => (
                      <span key={`${skill}-${index}`}>
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <span>No skills recorded</span>
                )}
              </div>
            </div>

            <div className="admin-employee-status-note">
              <div>
                <ShieldCheck size={14} />
              </div>

              <p>
                Account status:{" "}
                <strong>
                  {selectedEmployee.accountStatus}
                </strong>
              </p>
            </div>

            <div className="admin-employee-modal-actions">
              <button
                type="button"
                className="admin-employee-modal-secondary"
                onClick={closeEmployee}
              >
                Close
              </button>

              <button
                type="button"
                className="admin-employee-modal-primary"
                onClick={() =>
                  openEditEmployee(selectedEmployee)
                }
              >
                <Pencil size={13} />
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}

      {showAddEmployeeModal && (
        <div
          className="admin-employee-modal-overlay"
          onClick={closeAddEmployee}
        >
          <div
            className="admin-employee-form-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  RESOURCE MANAGEMENT
                </span>
                <h2>Add Employee</h2>
              </div>

              <button
                type="button"
                className="admin-employee-modal-close"
                onClick={closeAddEmployee}
                disabled={saving}
                aria-label="Close add employee form"
              >
                <X size={15} />
              </button>
            </div>

            <form
              className="admin-employee-form"
              onSubmit={handleAddEmployee}
            >
              <div className="admin-employee-form-grid">
                <label>
                  <span>Full Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter employee name"
                    value={newEmployee.name}
                    onChange={handleEmployeeInput}
                    required
                  />
                </label>

                <label>
                  <span>Email Address</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="employee@example.com"
                    value={newEmployee.email}
                    onChange={handleEmployeeInput}
                    required
                  />
                </label>

                <label>
                  <span>Phone</span>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+92 300 0000000"
                    value={newEmployee.phone}
                    onChange={handleEmployeeInput}
                  />
                </label>

                <label>
                  <span>Role</span>
                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleEmployeeInput}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Experience</span>
                  <input
                    name="experience"
                    type="text"
                    placeholder="e.g. 3 Years"
                    value={newEmployee.experience}
                    onChange={handleEmployeeInput}
                  />
                </label>

                <label>
                  <span>Location</span>
                  <input
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    value={newEmployee.location}
                    onChange={handleEmployeeInput}
                  />
                </label>

                <label className="admin-employee-form-full">
                  <span>Skills</span>
                  <input
                    name="skills"
                    type="text"
                    placeholder="Python, FastAPI, PostgreSQL"
                    value={newEmployee.skills}
                    onChange={handleEmployeeInput}
                  />
                  <small>
                    Separate multiple skills with commas.
                  </small>
                </label>
              </div>

              <div className="admin-employee-secure-note">
                <ShieldCheck size={16} />
                <div>
                  <strong>
                    Secure employee account setup
                  </strong>
                  <span>
                    The backend controls account creation
                    and the employee password setup process.
                  </span>
                </div>
              </div>

              <div className="admin-employee-form-actions">
                <button
                  type="button"
                  className="admin-employee-modal-secondary"
                  onClick={closeAddEmployee}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-employee-modal-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={14}
                        className="admin-employees-spin"
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={13} />
                      Add Employee
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT EMPLOYEE MODAL */}

      {showEditEmployeeModal && editingEmployee && (
        <div
          className="admin-employee-modal-overlay"
          onClick={closeEditEmployee}
        >
          <div
            className="admin-employee-form-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  RESOURCE MANAGEMENT
                </span>
                <h2>Edit Employee</h2>
              </div>

              <button
                type="button"
                className="admin-employee-modal-close"
                onClick={closeEditEmployee}
                disabled={saving}
                aria-label="Close edit employee form"
              >
                <X size={15} />
              </button>
            </div>

            <form
              className="admin-employee-form"
              onSubmit={handleUpdateEmployee}
            >
              <div className="admin-employee-form-grid">
                <label>
                  <span>Full Name</span>
                  <input
                    name="name"
                    value={editingEmployee.name}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </label>

                <label>
                  <span>Email Address</span>
                  <input
                    name="email"
                    type="email"
                    value={editingEmployee.email}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </label>

                <label>
                  <span>Phone</span>
                  <input
                    name="phone"
                    value={editingEmployee.phone}
                    onChange={handleEditEmployeeInput}
                  />
                </label>

                <label>
                  <span>Role</span>
                  <select
                    name="role"
                    value={editingEmployee.role}
                    onChange={handleEditEmployeeInput}
                  >
                    {!ROLE_OPTIONS.includes(
                      editingEmployee.role
                    ) && (
                      <option
                        value={editingEmployee.role}
                      >
                        {editingEmployee.role}
                      </option>
                    )}

                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Experience</span>
                  <input
                    name="experience"
                    value={editingEmployee.experience}
                    onChange={handleEditEmployeeInput}
                  />
                </label>

                <label>
                  <span>Location</span>
                  <input
                    name="location"
                    value={editingEmployee.location}
                    onChange={handleEditEmployeeInput}
                  />
                </label>

                <label className="admin-employee-form-full">
                  <span>Skills</span>
                  <input
                    type="text"
                    value={editingSkillsInput}
                    onChange={(event) =>
                      setEditingSkillsInput(
                        event.target.value
                      )
                    }
                    placeholder="Python, FastAPI, PostgreSQL"
                  />
                  <small>
                    Separate multiple skills with commas.
                  </small>
                </label>
              </div>

              <div className="admin-employee-form-actions">
                <button
                  type="button"
                  className="admin-employee-modal-secondary"
                  onClick={closeEditEmployee}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-employee-modal-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={14}
                        className="admin-employees-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Pencil size={13} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
