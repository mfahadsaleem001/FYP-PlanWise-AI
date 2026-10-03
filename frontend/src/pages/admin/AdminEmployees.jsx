import { useState } from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Users,
  UserCheck,
  UserX,
  BriefcaseBusiness,
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import "./AdminEmployees.css";

function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const [showAddEmployeeModal, setShowAddEmployeeModal] =
    useState(false);

  const [showEditEmployeeModal, setShowEditEmployeeModal] =
    useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);

  // Separate text state for editing skills
  const [editingSkillsInput, setEditingSkillsInput] = useState("");

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Backend Developer",
    experience: "",
    skills: "",
    availability: "Available",
    location: "",
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ali Raza",
      email: "ali.raza@planwise.com",
      phone: "+92 300 1234567",
      role: "Backend Developer",
      experience: "5 Years",
      skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      availability: "Available",
      workload: 40,
      currentProject: "E-Commerce Platform",
      location: "Islamabad, Pakistan",
      joined: "March 2023",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 2,
    },
    {
      id: 2,
      name: "Hamza Khan",
      email: "hamza.khan@planwise.com",
      phone: "+92 301 2345678",
      role: "Backend Developer",
      experience: "4 Years",
      skills: ["Django", "Python", "REST API", "MySQL"],
      availability: "Assigned",
      workload: 80,
      currentProject: "Business Analytics Portal",
      location: "Lahore, Pakistan",
      joined: "August 2022",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 3,
    },
    {
      id: 3,
      name: "Ahmed Ali",
      email: "ahmed.ali@planwise.com",
      phone: "+92 302 3456789",
      role: "Frontend Developer",
      experience: "3 Years",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      availability: "Available",
      workload: 30,
      currentProject: "—",
      location: "Islamabad, Pakistan",
      joined: "January 2024",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 1,
    },
    {
      id: 4,
      name: "Mariam Iqbal",
      email: "mariam.iqbal@planwise.com",
      phone: "+92 303 4567890",
      role: "UI/UX Designer",
      experience: "4 Years",
      skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
      availability: "Available",
      workload: 35,
      currentProject: "Customer Mobile App",
      location: "Rawalpindi, Pakistan",
      joined: "June 2023",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 2,
    },
    {
      id: 5,
      name: "Sara Ahmed",
      email: "sara.ahmed@planwise.com",
      phone: "+92 304 5678901",
      role: "QA Engineer",
      experience: "3 Years",
      skills: ["Manual Testing", "Automation", "Postman", "Selenium"],
      availability: "Available",
      workload: 25,
      currentProject: "Healthcare Management System",
      location: "Islamabad, Pakistan",
      joined: "September 2023",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 1,
    },
    {
      id: 6,
      name: "Usman Tariq",
      email: "usman.tariq@planwise.com",
      phone: "+92 305 6789012",
      role: "ML Engineer",
      experience: "5 Years",
      skills: ["Python", "Scikit-learn", "PyTorch", "Pandas"],
      availability: "Assigned",
      workload: 90,
      currentProject: "AI Recommendation Engine",
      location: "Karachi, Pakistan",
      joined: "February 2022",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 2,
    },
    {
      id: 7,
      name: "Ayesha Malik",
      email: "ayesha.malik@planwise.com",
      phone: "+92 306 7890123",
      role: "Project Manager",
      experience: "6 Years",
      skills: ["Agile", "Scrum", "Planning", "Risk Management"],
      availability: "Available",
      workload: 45,
      currentProject: "SaaS Project Management Tool",
      location: "Islamabad, Pakistan",
      joined: "November 2021",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 3,
    },
    {
      id: 8,
      name: "Bilal Hassan",
      email: "bilal.hassan@planwise.com",
      phone: "+92 307 8901234",
      role: "Frontend Developer",
      experience: "2 Years",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      availability: "Unavailable",
      workload: 100,
      currentProject: "Customer Mobile App",
      location: "Peshawar, Pakistan",
      joined: "May 2024",
      status: "Active",
      accountStatus: "Active",
      assignedProjects: 2,
    },
  ]);

  const filteredEmployees = employees.filter((employee) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    const matchesSearch =
      employee.name.toLowerCase().includes(normalizedSearch) ||
      employee.email.toLowerCase().includes(normalizedSearch) ||
      employee.role.toLowerCase().includes(normalizedSearch) ||
      employee.skills.some((skill) =>
        skill.toLowerCase().includes(normalizedSearch)
      );

    const matchesStatus =
      statusFilter === "All" ||
      employee.availability === statusFilter;

    const matchesRole =
      roleFilter === "All" ||
      employee.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const openEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const closeEmployee = () => {
    setSelectedEmployee(null);
    setShowEmployeeModal(false);
  };

  const openAddEmployee = () => {
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      role: "Backend Developer",
      experience: "",
      skills: "",
      availability: "Available",
      location: "",
    });

    setShowAddEmployeeModal(true);
  };

  const closeAddEmployee = () => {
    setShowAddEmployeeModal(false);
  };

  const handleEmployeeInput = (event) => {
    const { name, value } = event.target;

    setNewEmployee((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddEmployee = (event) => {
    event.preventDefault();

    if (!newEmployee.name.trim() || !newEmployee.email.trim()) {
      return;
    }

    const skillsArray = newEmployee.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const employee = {
      id: Date.now(),
      name: newEmployee.name.trim(),
      email: newEmployee.email.trim().toLowerCase(),
      phone: newEmployee.phone.trim(),
      role: newEmployee.role,
      experience: newEmployee.experience.trim(),
      skills: skillsArray,
      availability: newEmployee.availability,
      workload:
        newEmployee.availability === "Unavailable" ? 100 : 0,
      currentProject: "—",
      location: newEmployee.location.trim(),
      joined: "September 2026",
      status: "Active",
      accountStatus: "Pending Setup",
      assignedProjects: 0,
    };

    setEmployees((previous) => [employee, ...previous]);
    setShowAddEmployeeModal(false);
  };

  const openEditEmployee = (employee) => {
    setEditingEmployee({
      ...employee,
      skills: [...employee.skills],
    });

    // Keep skills as normal text while editing
    setEditingSkillsInput(employee.skills.join(", "));

    setShowEmployeeModal(false);
    setSelectedEmployee(null);
    setShowEditEmployeeModal(true);
  };

  const closeEditEmployee = () => {
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

  // Only update the text field while typing
  const handleEditSkillsInput = (event) => {
    setEditingSkillsInput(event.target.value);
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();

    if (!editingEmployee) {
      return;
    }

    // Convert unlimited comma-separated skills into an array on save
    const skillsArray = editingSkillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const updatedEmployee = {
      ...editingEmployee,
      name: editingEmployee.name.trim(),
      email: editingEmployee.email.trim().toLowerCase(),
      phone: editingEmployee.phone.trim(),
      experience: editingEmployee.experience.trim(),
      location: editingEmployee.location.trim(),
      skills: skillsArray,
      workload:
        editingEmployee.availability === "Unavailable"
          ? 100
          : Number(editingEmployee.workload) || 0,
    };

    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    closeEditEmployee();
  };

  const getAvailabilityClass = (availability) => {
    if (availability === "Available") {
      return "available";
    }

    if (availability === "Assigned") {
      return "assigned";
    }

    return "unavailable";
  };

  const getWorkloadClass = (workload) => {
    if (workload >= 90) {
      return "critical";
    }

    if (workload >= 70) {
      return "high";
    }

    if (workload >= 40) {
      return "medium";
    }

    return "low";
  };

  const getAccountStatusClass = (accountStatus) => {
    return accountStatus === "Active" ? "active" : "pending";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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
            Manage employees, skills, availability, workload, and
            project assignments.
          </p>
        </div>

        <button
          className="admin-employees-primary"
          onClick={openAddEmployee}
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="admin-employees-stat-grid">
        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Total Employees</span>

            <div className="admin-employees-stat-icon">
              <Users size={17} />
            </div>
          </div>

          <strong>{employees.length}</strong>

          <small>Active resources</small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Available</span>

            <div className="admin-employees-stat-icon">
              <UserCheck size={17} />
            </div>
          </div>

          <strong>
            {
              employees.filter(
                (employee) =>
                  employee.availability === "Available"
              ).length
            }
          </strong>

          <small>Ready for assignment</small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Currently Assigned</span>

            <div className="admin-employees-stat-icon">
              <BriefcaseBusiness size={17} />
            </div>
          </div>

          <strong>
            {
              employees.filter(
                (employee) =>
                  employee.availability === "Assigned"
              ).length
            }
          </strong>

          <small>Working on projects</small>
        </div>

        <div className="admin-employees-stat-card">
          <div className="admin-employees-stat-top">
            <span>Unavailable</span>

            <div className="admin-employees-stat-icon">
              <UserX size={17} />
            </div>
          </div>

          <strong>
            {
              employees.filter(
                (employee) =>
                  employee.availability === "Unavailable"
              ).length
            }
          </strong>

          <small>At full capacity</small>
        </div>
      </div>

      {/* MAIN PANEL */}
      <section className="admin-employees-panel">
        <div className="admin-employees-toolbar">
          <div className="admin-employees-toolbar-left">
            <div className="admin-employees-panel-title">
              <span>Resource Directory</span>

              <small>
                {filteredEmployees.length} employees
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
              <option value="All">All Availability</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            <select
              className="admin-employees-filter"
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="All">All Roles</option>

              <option value="Backend Developer">
                Backend Developer
              </option>

              <option value="Frontend Developer">
                Frontend Developer
              </option>

              <option value="UI/UX Designer">
                UI/UX Designer
              </option>

              <option value="QA Engineer">
                QA Engineer
              </option>

              <option value="ML Engineer">
                ML Engineer
              </option>

              <option value="Project Manager">
                Project Manager
              </option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-employees-table-wrapper">
          <table className="admin-employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Availability</th>
                <th>Workload</th>
                <th>Account</th>
                <th>Current Project</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="admin-employees-empty"
                  >
                    <Users size={25} />

                    <strong>No employees found</strong>

                    <span>
                      Try changing your search or filters.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
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
                          <strong>{employee.name}</strong>
                          <span>{employee.email}</span>
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
                        {employee.experience}
                      </span>
                    </td>

                    <td>
                      <div className="admin-employee-skills">
                        {employee.skills.map((skill, skillIndex) => (
                          <span key={`${skill}-${skillIndex}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`admin-availability-badge ${getAvailabilityClass(
                          employee.availability
                        )}`}
                      >
                        <span className="admin-availability-dot" />

                        {employee.availability}
                      </span>
                    </td>

                    <td>
                      <div className="admin-workload">
                        <div className="admin-workload-top">
                          <span>
                            {employee.workload}%
                          </span>
                        </div>

                        <div className="admin-workload-track">
                          <span
                            className={getWorkloadClass(
                              employee.workload
                            )}
                            style={{
                              width: `${employee.workload}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

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
                      <span className="admin-current-project">
                        {employee.currentProject}
                      </span>
                    </td>

                    <td>
                      <div className="admin-employee-actions">
                        <button
                          className="admin-table-action"
                          title="View employee"
                          onClick={() =>
                            openEmployee(employee)
                          }
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          className="admin-table-action"
                          title="Edit employee"
                          onClick={() =>
                            openEditEmployee(employee)
                          }
                        >
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-employees-footer">
          <span>
            Showing{" "}
            <strong>{filteredEmployees.length}</strong>{" "}
            of{" "}
            <strong>{employees.length}</strong>{" "}
            employees
          </span>

          <div className="admin-employees-pagination">
            <button
              className="admin-pagination-button"
              disabled
            >
              Previous
            </button>

            <button className="admin-pagination-current">
              1
            </button>

            <button className="admin-pagination-button">
              Next
            </button>
          </div>
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
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  EMPLOYEE PROFILE
                </span>

                <h2>Employee Details</h2>
              </div>

              <button
                className="admin-employee-modal-close"
                onClick={closeEmployee}
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
                  className={`admin-availability-badge ${getAvailabilityClass(
                    selectedEmployee.availability
                  )}`}
                >
                  <span className="admin-availability-dot" />

                  {selectedEmployee.availability}
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
                  <CalendarDays size={14} />
                </div>

                <div>
                  <span>Experience</span>

                  <strong>
                    {selectedEmployee.experience}
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
                    {selectedEmployee.location}
                  </strong>
                </div>
              </div>

              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <BriefcaseBusiness size={14} />
                </div>

                <div>
                  <span>Assigned Projects</span>

                  <strong>
                    {selectedEmployee.assignedProjects}
                  </strong>
                </div>
              </div>

              <div className="admin-employee-detail-card">
                <div className="admin-employee-detail-icon">
                  <CalendarDays size={14} />
                </div>

                <div>
                  <span>Joined</span>

                  <strong>
                    {selectedEmployee.joined}
                  </strong>
                </div>
              </div>
            </div>

            <div className="admin-employee-modal-section">
              <span>Skills</span>

              <div className="admin-employee-modal-skills">
                {selectedEmployee.skills.map(
                  (skill, skillIndex) => (
                    <span
                      key={`${skill}-${skillIndex}`}
                    >
                      {skill}
                    </span>
                  )
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
                className="admin-employee-modal-secondary"
                onClick={closeEmployee}
              >
                Close
              </button>

              <button
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
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  RESOURCE MANAGEMENT
                </span>

                <h2>Add Employee</h2>
              </div>

              <button
                className="admin-employee-modal-close"
                onClick={closeAddEmployee}
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
                    placeholder="employee@planwise.com"
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
                    <option>Backend Developer</option>
                    <option>Frontend Developer</option>
                    <option>UI/UX Designer</option>
                    <option>QA Engineer</option>
                    <option>ML Engineer</option>
                    <option>Project Manager</option>
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
                  <span>Availability</span>

                  <select
                    name="availability"
                    value={newEmployee.availability}
                    onChange={handleEmployeeInput}
                  >
                    <option>Available</option>
                    <option>Assigned</option>
                    <option>Unavailable</option>
                  </select>
                </label>

                <label className="admin-employee-form-full">
                  <span>Skills</span>

                  <input
                    name="skills"
                    type="text"
                    placeholder="Python, FastAPI, PostgreSQL, Docker"
                    value={newEmployee.skills}
                    onChange={handleEmployeeInput}
                  />

                  <small>
                    Separate multiple skills with commas.
                  </small>
                </label>

                <label className="admin-employee-form-full">
                  <span>Location</span>

                  <input
                    name="location"
                    type="text"
                    placeholder="Islamabad, Pakistan"
                    value={newEmployee.location}
                    onChange={handleEmployeeInput}
                  />
                </label>
              </div>

              <div className="admin-employee-secure-note">
                <ShieldCheck size={16} />

                <div>
                  <strong>
                    Secure employee account setup
                  </strong>

                  <span>
                    New employees start with Pending Setup.
                    The employee creates their password through
                    the secure account setup flow.
                  </span>
                </div>
              </div>

              <div className="admin-employee-form-actions">
                <button
                  type="button"
                  className="admin-employee-modal-secondary"
                  onClick={closeAddEmployee}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-employee-modal-primary"
                >
                  <Plus size={13} />

                  Add Employee
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
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-employee-modal-header">
              <div>
                <span className="admin-employee-modal-eyebrow">
                  RESOURCE MANAGEMENT
                </span>

                <h2>Edit Employee</h2>
              </div>

              <button
                className="admin-employee-modal-close"
                onClick={closeEditEmployee}
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
                    <option>Backend Developer</option>
                    <option>Frontend Developer</option>
                    <option>UI/UX Designer</option>
                    <option>QA Engineer</option>
                    <option>ML Engineer</option>
                    <option>Project Manager</option>
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
                  <span>Availability</span>

                  <select
                    name="availability"
                    value={editingEmployee.availability}
                    onChange={handleEditEmployeeInput}
                  >
                    <option>Available</option>
                    <option>Assigned</option>
                    <option>Unavailable</option>
                  </select>
                </label>

                <label className="admin-employee-form-full">
                  <span>Skills</span>

                  <input
                    type="text"
                    value={editingSkillsInput}
                    onChange={handleEditSkillsInput}
                    placeholder="Python, FastAPI, PostgreSQL, Docker"
                  />

                  <small>
                    Separate multiple skills with commas.
                  </small>
                </label>

                <label className="admin-employee-form-full">
                  <span>Location</span>

                  <input
                    name="location"
                    value={editingEmployee.location}
                    onChange={handleEditEmployeeInput}
                  />
                </label>
              </div>

              <div className="admin-employee-form-actions">
                <button
                  type="button"
                  className="admin-employee-modal-secondary"
                  onClick={closeEditEmployee}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-employee-modal-primary"
                >
                  <Pencil size={13} />

                  Save Changes
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