import { useState } from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  MoreHorizontal,
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

  const [openMoreMenu, setOpenMoreMenu] = useState(null);

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
      assignedProjects: 1,
    },
    {
      id: 4,
      name: "Mariam Iqbal",
      email: "mariam.iqbal@planwise.com",
      phone: "+92 303 4567890",
      role: "UI/UX Designer",
      experience: "4 Years",
      skills: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      availability: "Available",
      workload: 35,
      currentProject: "Customer Mobile App",
      location: "Rawalpindi, Pakistan",
      joined: "June 2023",
      status: "Active",
      assignedProjects: 2,
    },
    {
      id: 5,
      name: "Sara Ahmed",
      email: "sara.ahmed@planwise.com",
      phone: "+92 304 5678901",
      role: "QA Engineer",
      experience: "3 Years",
      skills: [
        "Manual Testing",
        "Automation",
        "Postman",
        "Selenium",
      ],
      availability: "Available",
      workload: 25,
      currentProject: "Healthcare Management System",
      location: "Islamabad, Pakistan",
      joined: "September 2023",
      status: "Active",
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
      assignedProjects: 2,
    },
    {
      id: 7,
      name: "Ayesha Malik",
      email: "ayesha.malik@planwise.com",
      phone: "+92 306 7890123",
      role: "Project Manager",
      experience: "6 Years",
      skills: [
        "Agile",
        "Scrum",
        "Planning",
        "Risk Management",
      ],
      availability: "Available",
      workload: 45,
      currentProject: "SaaS Project Management Tool",
      location: "Islamabad, Pakistan",
      joined: "November 2021",
      status: "Active",
      assignedProjects: 3,
    },
    {
      id: 8,
      name: "Bilal Hassan",
      email: "bilal.hassan@planwise.com",
      phone: "+92 307 8901234",
      role: "Frontend Developer",
      experience: "2 Years",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
      ],
      availability: "Unavailable",
      workload: 100,
      currentProject: "Customer Mobile App",
      location: "Peshawar, Pakistan",
      joined: "May 2024",
      status: "Active",
      assignedProjects: 2,
    },
  ]);

  /* ============================================================
     FILTER EMPLOYEES
  ============================================================ */

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "All" ||
      employee.availability === statusFilter;

    const matchesRole =
      roleFilter === "All" ||
      employee.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  /* ============================================================
     VIEW EMPLOYEE
  ============================================================ */

  const openEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
    setOpenMoreMenu(null);
  };

  const closeEmployee = () => {
    setSelectedEmployee(null);
    setShowEmployeeModal(false);
  };

  /* ============================================================
     ADD EMPLOYEE
  ============================================================ */

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

    const skillsArray = newEmployee.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const employee = {
      id: Date.now(),
      name: newEmployee.name.trim(),
      email: newEmployee.email.trim(),
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
      assignedProjects: 0,
    };

    setEmployees((previous) => [employee, ...previous]);

    setShowAddEmployeeModal(false);

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
  };

  /* ============================================================
     EDIT EMPLOYEE
  ============================================================ */

  const openEditEmployee = (employee) => {
    setEditingEmployee({
      ...employee,
      skills: [...employee.skills],
    });

    setShowEmployeeModal(false);
    setSelectedEmployee(null);

    setShowEditEmployeeModal(true);
    setOpenMoreMenu(null);
  };

  const closeEditEmployee = () => {
    setShowEditEmployeeModal(false);
    setEditingEmployee(null);
  };

  const handleEditEmployeeInput = (event) => {
    const { name, value } = event.target;

    setEditingEmployee((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEditSkillsInput = (event) => {
    const skillsArray = event.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setEditingEmployee((previous) => ({
      ...previous,
      skills: skillsArray,
    }));
  };

  const handleUpdateEmployee = (event) => {
    event.preventDefault();

    if (!editingEmployee) return;

    const updatedEmployee = {
      ...editingEmployee,
      name: editingEmployee.name.trim(),
      email: editingEmployee.email.trim(),
      phone: editingEmployee.phone.trim(),
      experience: editingEmployee.experience.trim(),
      skills: editingEmployee.skills,
      location: editingEmployee.location.trim(),
      workload:
        editingEmployee.availability === "Unavailable"
          ? 100
          : editingEmployee.workload,
    };

    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    setSelectedEmployee(null);
    setShowEmployeeModal(false);

    setShowEditEmployeeModal(false);
    setEditingEmployee(null);
  };

  /* ============================================================
     MORE MENU
  ============================================================ */

  const toggleMoreMenu = (employeeId) => {
    setOpenMoreMenu((previous) =>
      previous === employeeId ? null : employeeId
    );
  };

  /* ============================================================
     HELPERS
  ============================================================ */

  const getAvailabilityClass = (availability) => {
    if (availability === "Available") return "available";
    if (availability === "Assigned") return "assigned";
    return "unavailable";
  };

  const getWorkloadClass = (workload) => {
    if (workload >= 90) return "critical";
    if (workload >= 70) return "high";
    if (workload >= 40) return "medium";
    return "low";
  };

  return (
    <div className="admin-employees">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="employees-page-header">
        <div>
          <span className="employees-eyebrow">
            RESOURCE MANAGEMENT
          </span>

          <h1>Employees & Resources</h1>

          <p>
            Manage employees, skills, availability, workload, and
            project assignments.
          </p>
        </div>

        <button
          className="employees-primary-btn"
          onClick={openAddEmployee}
        >
          <Plus size={17} />
          Add Employee
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="employees-summary-grid">
        <div className="employee-summary-card">
          <div className="summary-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
            <small>Active resources</small>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon">
            <UserCheck size={20} />
          </div>

          <div>
            <span>Available</span>

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
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Currently Assigned</span>

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
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon">
            <UserX size={20} />
          </div>

          <div>
            <span>Unavailable</span>

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
      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="employees-toolbar">
        <div className="employees-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search employees, roles or skills..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
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
          <option value="QA Engineer">QA Engineer</option>
          <option value="ML Engineer">ML Engineer</option>
          <option value="Project Manager">
            Project Manager
          </option>
        </select>
      </div>

      {/* =====================================================
          EMPLOYEES TABLE
      ===================================================== */}

      <div className="employees-table-card">
        <div className="employees-table-header">
          <div>
            <h2>Resource Directory</h2>

            <p>{filteredEmployees.length} employees shown</p>
          </div>

          <span className="directory-status">
            Resource Management
          </span>
        </div>

        <div className="employees-table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Availability</th>
                <th>Workload</th>
                <th>Current Project</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name-cell">
                      <div className="employee-avatar">
                        {employee.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <strong>{employee.name}</strong>
                        <span>{employee.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="employee-role">
                      {employee.role}
                    </span>
                  </td>

                  <td>
                    <span className="employee-experience">
                      {employee.experience}
                    </span>
                  </td>

                  <td>
                    <div className="employee-skills">
                      {employee.skills
                        .slice(0, 3)
                        .map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}

                      {employee.skills.length > 3 && (
                        <span className="more-skill">
                          +{employee.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`availability-badge ${getAvailabilityClass(
                        employee.availability
                      )}`}
                    >
                      <span className="availability-dot"></span>
                      {employee.availability}
                    </span>
                  </td>

                  <td>
                    <div className="workload-cell">
                      <div className="workload-top">
                        <span>{employee.workload}%</span>
                      </div>

                      <div className="workload-bar">
                        <span
                          className={getWorkloadClass(
                            employee.workload
                          )}
                          style={{
                            width: `${employee.workload}%`,
                          }}
                        ></span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="current-project">
                      {employee.currentProject}
                    </span>
                  </td>

                  <td>
                    <div className="employee-actions">
                      <button
                        className="employee-action-btn"
                        title="View employee"
                        onClick={() => openEmployee(employee)}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="employee-action-btn"
                        title="Edit employee"
                        onClick={() =>
                          openEditEmployee(employee)
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <div className="employee-more-wrapper">
                        <button
                          className="employee-action-btn"
                          title="More options"
                          onClick={() =>
                            toggleMoreMenu(employee.id)
                          }
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {openMoreMenu === employee.id && (
                          <div className="employee-more-menu">
                            <button
                              onClick={() =>
                                openEmployee(employee)
                              }
                            >
                              <Eye size={14} />
                              View Profile
                            </button>

                            <button
                              onClick={() =>
                                openEditEmployee(employee)
                              }
                            >
                              <Pencil size={14} />
                              Edit Employee
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="employees-empty-state">
                      <Users size={30} />

                      <h3>No employees found</h3>

                      <p>
                        Try changing your search or filter
                        criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="employees-table-footer">
          <span>
            Showing {filteredEmployees.length} of{" "}
            {employees.length} employees
          </span>

          <div className="employees-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* =====================================================
          EMPLOYEE PROFILE MODAL
      ===================================================== */}

      {showEmployeeModal && selectedEmployee && (
        <div className="employee-modal-overlay">
          <div className="employee-modal">
            <div className="employee-modal-header">
              <div>
                <span>EMPLOYEE PROFILE</span>

                <h2>{selectedEmployee.name}</h2>
              </div>

              <button
                className="employee-modal-close"
                onClick={closeEmployee}
              >
                <X size={18} />
              </button>
            </div>

            <div className="employee-profile-summary">
              <div className="employee-profile-avatar">
                {selectedEmployee.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <h3>{selectedEmployee.role}</h3>

                <span
                  className={`availability-badge ${getAvailabilityClass(
                    selectedEmployee.availability
                  )}`}
                >
                  <span className="availability-dot"></span>
                  {selectedEmployee.availability}
                </span>
              </div>
            </div>

            <div className="employee-detail-grid">
              <div className="employee-detail-item">
                <Mail size={16} />

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedEmployee.email}
                  </strong>
                </div>
              </div>

              <div className="employee-detail-item">
                <Phone size={16} />

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedEmployee.phone}
                  </strong>
                </div>
              </div>

              <div className="employee-detail-item">
                <MapPin size={16} />

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedEmployee.location}
                  </strong>
                </div>
              </div>

              <div className="employee-detail-item">
                <CalendarDays size={16} />

                <div>
                  <span>Joined</span>
                  <strong>
                    {selectedEmployee.joined}
                  </strong>
                </div>
              </div>
            </div>

            <div className="employee-modal-section">
              <h3>Professional Information</h3>

              <div className="employee-info-row">
                <span>Experience</span>
                <strong>
                  {selectedEmployee.experience}
                </strong>
              </div>

              <div className="employee-info-row">
                <span>Current Project</span>
                <strong>
                  {selectedEmployee.currentProject}
                </strong>
              </div>

              <div className="employee-info-row">
                <span>Assigned Projects</span>
                <strong>
                  {selectedEmployee.assignedProjects}
                </strong>
              </div>

              <div className="employee-info-row">
                <span>Current Workload</span>
                <strong>
                  {selectedEmployee.workload}%
                </strong>
              </div>
            </div>

            <div className="employee-modal-section">
              <h3>Skills</h3>

              <div className="modal-skills">
                {selectedEmployee.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="employee-modal-section">
              <h3>Resource Assignment</h3>

              <div className="assignment-info-box">
                <ShieldCheck size={18} />

                <div>
                  <strong>
                    Admin Controlled Assignment
                  </strong>

                  <p>
                    Project assignments are managed by Admin
                    based on role, skills, availability,
                    workload, and project requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="employee-modal-actions">
              <button
                className="employee-secondary-btn"
                onClick={closeEmployee}
              >
                Close
              </button>

              <button
                className="employee-primary-btn employee-profile-edit-btn"
                onClick={() =>
                  openEditEmployee(selectedEmployee)
                }
              >
                <Pencil size={16} />
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ADD EMPLOYEE MODAL
      ===================================================== */}

      {showAddEmployeeModal && (
        <div className="employee-modal-overlay">
          <div className="employee-modal employee-add-modal">
            <div className="employee-modal-header">
              <div>
                <span>RESOURCE MANAGEMENT</span>

                <h2>Add Employee</h2>
              </div>

              <button
                className="employee-modal-close"
                onClick={closeAddEmployee}
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="employee-add-form"
              onSubmit={handleAddEmployee}
            >
              <div className="employee-form-grid">
                <div className="employee-form-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleEmployeeInput}
                    placeholder="e.g. Hassan Ahmed"
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleEmployeeInput}
                    placeholder="e.g. hassan@planwise.com"
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleEmployeeInput}
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Role</label>

                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleEmployeeInput}
                  >
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

                <div className="employee-form-field">
                  <label>Experience</label>

                  <input
                    type="text"
                    name="experience"
                    value={newEmployee.experience}
                    onChange={handleEmployeeInput}
                    placeholder="e.g. 3 Years"
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Availability</label>

                  <select
                    name="availability"
                    value={newEmployee.availability}
                    onChange={handleEmployeeInput}
                  >
                    <option value="Available">
                      Available
                    </option>
                    <option value="Assigned">
                      Assigned
                    </option>
                    <option value="Unavailable">
                      Unavailable
                    </option>
                  </select>
                </div>

                <div className="employee-form-field employee-form-full">
                  <label>Skills</label>

                  <input
                    type="text"
                    name="skills"
                    value={newEmployee.skills}
                    onChange={handleEmployeeInput}
                    placeholder="Python, FastAPI, PostgreSQL, Docker"
                    required
                  />

                  <small>
                    Separate multiple skills with commas.
                  </small>
                </div>

                <div className="employee-form-field employee-form-full">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    value={newEmployee.location}
                    onChange={handleEmployeeInput}
                    placeholder="e.g. Islamabad, Pakistan"
                    required
                  />
                </div>
              </div>

              <div className="employee-add-form-actions employee-edit-form-actions">
                <button
                  type="button"
                  className="employee-secondary-btn"
                  onClick={closeAddEmployee}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="employee-primary-btn"
                >
                  <Plus size={16} />
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT EMPLOYEE MODAL
      ===================================================== */}

      {showEditEmployeeModal && editingEmployee && (
        <div className="employee-modal-overlay">
          <div className="employee-modal employee-edit-modal">
            <div className="employee-modal-header">
              <div>
                <span>RESOURCE MANAGEMENT</span>

                <h2>Edit Employee</h2>
              </div>

              <button
                type="button"
                className="employee-modal-close"
                onClick={closeEditEmployee}
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="employee-add-form employee-edit-form"
              onSubmit={handleUpdateEmployee}
            >
              <div className="employee-form-grid">
                <div className="employee-form-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={editingEmployee.name}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={editingEmployee.email}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    value={editingEmployee.phone}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Role</label>

                  <select
                    name="role"
                    value={editingEmployee.role}
                    onChange={handleEditEmployeeInput}
                  >
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

                <div className="employee-form-field">
                  <label>Experience</label>

                  <input
                    type="text"
                    name="experience"
                    value={editingEmployee.experience}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </div>

                <div className="employee-form-field">
                  <label>Availability</label>

                  <select
                    name="availability"
                    value={editingEmployee.availability}
                    onChange={handleEditEmployeeInput}
                  >
                    <option value="Available">
                      Available
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="Unavailable">
                      Unavailable
                    </option>
                  </select>
                </div>

                <div className="employee-form-field employee-form-full">
                  <label>Skills</label>

                  <input
                    type="text"
                    value={editingEmployee.skills.join(", ")}
                    onChange={handleEditSkillsInput}
                    placeholder="Python, FastAPI, PostgreSQL, Docker"
                    required
                  />

                  <small>
                    Separate multiple skills with commas.
                  </small>
                </div>

                <div className="employee-form-field employee-form-full">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    value={editingEmployee.location}
                    onChange={handleEditEmployeeInput}
                    required
                  />
                </div>
              </div>

              {/* =================================================
                  EDIT FORM ACTIONS
              ================================================= */}

              <div className="employee-edit-form-actions">
                <button
                  type="button"
                  className="employee-secondary-btn"
                  onClick={closeEditEmployee}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="employee-primary-btn employee-update-btn"
                >
                  <Pencil size={16} />
                  Update Employee
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