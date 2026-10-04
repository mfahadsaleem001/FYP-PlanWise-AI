import React, { useMemo, useState } from "react";

import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  Check,
  X,
  RotateCcw,
  Clock3,
  FolderKanban,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CircleDollarSign,
  Timer,
  Activity,
  UserRound,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

import "./AdminProjectRequests.css";

/* =========================================================
   DEMO DATA
   Replace this with backend/API data later.
========================================================= */

const INITIAL_REQUESTS = [
  {
    id: 1001,
    project_name: "Smart Inventory Management System",
    user_name: "Ahmed Khan",
    user_email: "ahmed.khan@example.com",
    project_type: "Web Application",
    description:
      "A web-based inventory management platform for tracking products, stock levels, suppliers, purchases, sales, and low-stock alerts.",
    requested_at: "2026-09-18T10:30:00",
    status: "pending",
    team_size: 5,
    estimated_cost: "PKR 480,000",
    estimated_duration: "14 Weeks",
    complexity: "Medium",
    risk_level: "Medium",
    required_resources: [
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "API development and database integration.",
      },
      {
        role: "Frontend Developer",
        quantity: 2,
        purpose: "Dashboard and inventory management interfaces.",
      },
      {
        role: "UI/UX Designer",
        quantity: 1,
        purpose: "User experience and interface design.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Testing and quality assurance.",
      },
    ],
  },

  {
    id: 1002,
    project_name: "AI Customer Support Assistant",
    user_name: "Sara Ahmed",
    user_email: "sara.ahmed@example.com",
    project_type: "AI / Machine Learning",
    description:
      "An AI-powered customer support assistant capable of understanding customer questions, retrieving relevant information, and generating helpful responses.",
    requested_at: "2026-09-16T14:15:00",
    status: "accepted",
    team_size: 4,
    estimated_cost: "PKR 620,000",
    estimated_duration: "18 Weeks",
    complexity: "High",
    risk_level: "High",
    required_resources: [
      {
        role: "AI / ML Engineer",
        quantity: 1,
        purpose: "Model integration and AI pipeline development.",
      },
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "API and application backend.",
      },
      {
        role: "Frontend Developer",
        quantity: 1,
        purpose: "Support dashboard and chat interface.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Functional and AI response testing.",
      },
    ],
  },

  {
    id: 1003,
    project_name: "Healthcare Appointment Platform",
    user_name: "Bilal Hussain",
    user_email: "bilal.hussain@example.com",
    project_type: "SaaS",
    description:
      "A SaaS platform connecting patients with healthcare providers for appointment scheduling, doctor profiles, availability, and appointment management.",
    requested_at: "2026-09-14T09:45:00",
    status: "rejected",
    team_size: 6,
    estimated_cost: "PKR 750,000",
    estimated_duration: "20 Weeks",
    complexity: "High",
    risk_level: "Critical",
    required_resources: [
      {
        role: "Backend Developer",
        quantity: 2,
        purpose: "Secure APIs and scheduling logic.",
      },
      {
        role: "Frontend Developer",
        quantity: 2,
        purpose: "Patient and provider dashboards.",
      },
      {
        role: "UI/UX Designer",
        quantity: 1,
        purpose: "Healthcare-focused user experience.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Testing and release validation.",
      },
    ],
  },

  {
    id: 1004,
    project_name: "E-Commerce Marketplace",
    user_name: "Usman Ali",
    user_email: "usman.ali@example.com",
    project_type: "E-Commerce",
    description:
      "A multi-vendor e-commerce marketplace where vendors can manage products while customers can browse, purchase, and track orders.",
    requested_at: "2026-09-11T16:20:00",
    status: "in_development",
    team_size: 7,
    estimated_cost: "PKR 920,000",
    estimated_duration: "24 Weeks",
    complexity: "High",
    risk_level: "Medium",
    required_resources: [
      {
        role: "Backend Developer",
        quantity: 2,
        purpose: "Marketplace APIs and order management.",
      },
      {
        role: "Frontend Developer",
        quantity: 2,
        purpose: "Customer and vendor interfaces.",
      },
      {
        role: "UI/UX Designer",
        quantity: 1,
        purpose: "Marketplace experience.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Testing and regression.",
      },
      {
        role: "DevOps Engineer",
        quantity: 1,
        purpose: "Deployment and infrastructure.",
      },
    ],
  },

  {
    id: 1005,
    project_name: "Student Learning Portal",
    user_name: "Hira Malik",
    user_email: "hira.malik@example.com",
    project_type: "Web Application",
    description:
      "An online learning portal for students with courses, assignments, progress tracking, announcements, and learning resources.",
    requested_at: "2026-09-09T11:10:00",
    status: "pending",
    team_size: 4,
    estimated_cost: "PKR 390,000",
    estimated_duration: "12 Weeks",
    complexity: "Medium",
    risk_level: "Low",
    required_resources: [
      {
        role: "Frontend Developer",
        quantity: 1,
        purpose: "Student learning interface.",
      },
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "Course and user APIs.",
      },
      {
        role: "UI/UX Designer",
        quantity: 1,
        purpose: "Learning experience design.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Application testing.",
      },
    ],
  },

  {
    id: 1006,
    project_name: "Mobile Expense Tracker",
    user_name: "Hamza Raza",
    user_email: "hamza.raza@example.com",
    project_type: "Mobile Application",
    description:
      "A mobile application that helps users record expenses, organize spending categories, and visualize monthly financial activity.",
    requested_at: "2026-09-07T13:35:00",
    status: "accepted",
    team_size: 4,
    estimated_cost: "PKR 430,000",
    estimated_duration: "13 Weeks",
    complexity: "Medium",
    risk_level: "Low",
    required_resources: [
      {
        role: "Mobile Developer",
        quantity: 2,
        purpose: "Mobile application development.",
      },
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "Authentication and cloud APIs.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Mobile application testing.",
      },
    ],
  },

  {
    id: 1007,
    project_name: "AI Document Analysis Platform",
    user_name: "Ayesha Noor",
    user_email: "ayesha.noor@example.com",
    project_type: "AI / Machine Learning",
    description:
      "An intelligent document analysis system for extracting useful information from uploaded documents and generating structured insights.",
    requested_at: "2026-09-05T15:00:00",
    status: "rejected",
    team_size: 5,
    estimated_cost: "PKR 680,000",
    estimated_duration: "17 Weeks",
    complexity: "High",
    risk_level: "High",
    required_resources: [
      {
        role: "AI / ML Engineer",
        quantity: 2,
        purpose: "Document intelligence pipeline.",
      },
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "Document processing APIs.",
      },
      {
        role: "Frontend Developer",
        quantity: 1,
        purpose: "Upload and analysis dashboard.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Validation and testing.",
      },
    ],
  },

  {
    id: 1008,
    project_name: "Company Task Management Suite",
    user_name: "Omar Farooq",
    user_email: "omar.farooq@example.com",
    project_type: "SaaS",
    description:
      "A team task management platform with projects, assignments, deadlines, progress tracking, notifications, and productivity dashboards.",
    requested_at: "2026-09-02T12:25:00",
    status: "under_review",
    team_size: 5,
    estimated_cost: "PKR 540,000",
    estimated_duration: "15 Weeks",
    complexity: "Medium",
    risk_level: "Medium",
    required_resources: [
      {
        role: "Frontend Developer",
        quantity: 2,
        purpose: "Workspace and dashboard interfaces.",
      },
      {
        role: "Backend Developer",
        quantity: 1,
        purpose: "Project and task APIs.",
      },
      {
        role: "UI/UX Designer",
        quantity: 1,
        purpose: "Product experience.",
      },
      {
        role: "QA Engineer",
        quantity: 1,
        purpose: "Testing and validation.",
      },
    ],
  },
];

const DEMO_EMPLOYEES = [
  {
    id: 1,
    name: "Usman Khalid",
    role: "Senior Backend Developer",
    active_projects_count: 2,
  },
  {
    id: 2,
    name: "Maryam Shah",
    role: "Frontend Developer",
    active_projects_count: 1,
  },
  {
    id: 3,
    name: "Ali Hassan",
    role: "AI / ML Engineer",
    active_projects_count: 3,
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "UI/UX Designer",
    active_projects_count: 0,
  },
  {
    id: 5,
    name: "Danish Ahmed",
    role: "QA Engineer",
    active_projects_count: 2,
  },
];

const DEMO_MESSAGES = [
  {
    id: 1,
    sender_role: "user",
    sender_name: "Ahmed Khan",
    message:
      "Hi Admin, I wanted to know if there is any additional information required for my project request.",
    created_at: "2026-09-18T11:05:00",
  },
  {
    id: 2,
    sender_role: "admin",
    sender_name: "Admin",
    message:
      "Your request is currently under review. We will let you know if any clarification is needed.",
    created_at: "2026-09-18T11:30:00",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const normalizeStatus = (status = "") =>
  String(status).toLowerCase().replace(/\s+/g, "_");

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "Pending Review",
    under_review: "Under Review",
    accepted: "Accepted",
    rejected: "Rejected",
    in_development: "In Development",
    completed: "Completed",
  };

  return labels[normalizeStatus(status)] || "Pending Review";
};

const getStatusClass = (status) => {
  const normalized = normalizeStatus(status);

  if (
    normalized === "accepted" ||
    normalized === "in_development" ||
    normalized === "completed"
  ) {
    return "success";
  }

  if (normalized === "rejected") {
    return "danger";
  }

  if (normalized === "under_review") {
    return "review";
  }

  return "pending";
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

/* =========================================================
   COMPONENT
========================================================= */

function AdminProjectRequests() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatMessages, setChatMessages] = useState(DEMO_MESSAGES);
  const [chatMessage, setChatMessage] = useState("");
  const [employees] = useState(DEMO_EMPLOYEES);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Updated: 10 requests per page
  const ITEMS_PER_PAGE = 10;

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const status = normalizeStatus(request.status);

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        request.project_name,
        request.user_name,
        request.user_email,
        request.project_type,
        status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [requests, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const summary = useMemo(() => {
    return {
      total: requests.length,

      pending: requests.filter((request) =>
        ["pending", "under_review"].includes(
          normalizeStatus(request.status)
        )
      ).length,

      accepted: requests.filter((request) =>
        ["accepted", "in_development", "completed"].includes(
          normalizeStatus(request.status)
        )
      ).length,

      rejected: requests.filter(
        (request) =>
          normalizeStatus(request.status) === "rejected"
      ).length,
    };
  }, [requests]);

  /* =========================================================
     MODALS
  ========================================================= */

  const openModal = (type, request) => {
    setSelectedRequest(request);
    setModalType(type);

    if (type === "chat") {
      setChatMessages(DEMO_MESSAGES);
      setChatMessage("");
    }

    if (type === "assign") {
      setSelectedEmployees([]);
    }
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalType(null);
    setChatMessage("");
    setSelectedEmployees([]);
  };

  /* =========================================================
     STATUS ACTIONS
  ========================================================= */

  const changeStatus = (requestId, newStatus) => {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
            }
          : request
      )
    );

    setSelectedRequest((previous) =>
      previous && previous.id === requestId
        ? {
            ...previous,
            status: newStatus,
          }
        : previous
    );
  };

  const handleAccept = (request) => {
    changeStatus(request.id, "accepted");
  };

  const handleReject = (request) => {
    changeStatus(request.id, "rejected");
  };

  const handleAcceptAgain = (request) => {
    changeStatus(request.id, "accepted");
  };

  /* =========================================================
     CHAT
  ========================================================= */

  const sendMessage = () => {
    const message = chatMessage.trim();

    if (!message) return;

    const newMessage = {
      id: Date.now(),
      sender_role: "admin",
      sender_name: "Admin",
      message,
      created_at: new Date().toISOString(),
    };

    setChatMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    setChatMessage("");
  };

  /* =========================================================
     EMPLOYEE ASSIGNMENT
  ========================================================= */

  const toggleEmployee = (employee) => {
    if (employee.active_projects_count >= 3) {
      return;
    }

    setSelectedEmployees((previous) =>
      previous.includes(employee.id)
        ? previous.filter((id) => id !== employee.id)
        : [...previous, employee.id]
    );
  };

  /* =========================================================
     STATUS BADGE
  ========================================================= */

  const renderStatusBadge = (request) => {
    const statusClass = getStatusClass(request.status);

    return (
      <span
        className={`request-status-badge ${statusClass}`}
      >
        {getStatusLabel(request.status)}
      </span>
    );
  };

  /* =========================================================
     ACTIONS
  ========================================================= */

  const renderActions = (request) => {
    const status = normalizeStatus(request.status);

    const isPending =
      status === "pending" || status === "under_review";

    const isRejected = status === "rejected";

    return (
      <div className="request-actions">
        <button
          type="button"
          className="request-action-btn view"
          title="View Request"
          onClick={() => openModal("view", request)}
        >
          <Eye size={16} />
        </button>

        <button
          type="button"
          className="request-action-btn chat"
          title="Contact User"
          onClick={() => openModal("chat", request)}
        >
          <MessageCircle size={16} />
        </button>

        {isPending && (
          <>
            <button
              type="button"
              className="request-action-btn accept"
              title="Accept Project"
              onClick={() => handleAccept(request)}
            >
              <Check size={16} />
            </button>

            <button
              type="button"
              className="request-action-btn reject"
              title="Reject Project"
              onClick={() => handleReject(request)}
            >
              <X size={16} />
            </button>
          </>
        )}

        {isRejected && (
          <button
            type="button"
            className="request-action-btn accept"
            title="Accept Again"
            onClick={() => handleAcceptAgain(request)}
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="admin-project-requests">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="admin-project-requests-header">
        <div>
          <span className="project-requests-eyebrow">
            PROJECT MANAGEMENT
          </span>

          <h1>Project Requests</h1>

          <p>
            Review incoming project requests, communicate with
            users, and manage project approval decisions.
          </p>
        </div>
      </header>

      {/* =====================================================
          DEMO NOTICE
      ===================================================== */}

      <div className="request-demo-notice">
        <AlertCircle size={15} />

        <div>
          <strong>Frontend Demo Mode</strong>

          <span>
            These requests are temporary demo data for UI
            preview. They will be replaced with real backend
            data later.
          </span>
        </div>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section className="project-request-summary">
        <div className="request-summary-card">
          <div className="request-summary-icon">
            <FolderKanban size={18} />
          </div>

          <div>
            <span>Total Requests</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="request-summary-card">
          <div className="request-summary-icon pending-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>{summary.pending}</strong>
          </div>
        </div>

        <div className="request-summary-card">
          <div className="request-summary-icon success-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Accepted</span>
            <strong>{summary.accepted}</strong>
          </div>
        </div>

        <div className="request-summary-card">
          <div className="request-summary-icon danger-icon">
            <XCircle size={18} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>{summary.rejected}</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN PANEL
      ===================================================== */}

      <section className="admin-project-request-panel">
        <div className="admin-project-request-toolbar">
          <div className="request-toolbar-title">
            <strong>Development Requests</strong>

            <span>
              {filteredRequests.length} request
              {filteredRequests.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="request-toolbar-controls">
            <div className="project-request-search-box">
              <Search size={14} />

              <input
                type="text"
                placeholder="Search requests..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="admin-request-filter">
              <Filter size={14} />

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>

                <option value="pending">
                  Pending Review
                </option>

                <option value="under_review">
                  Under Review
                </option>

                <option value="accepted">Accepted</option>

                <option value="rejected">Rejected</option>

                <option value="in_development">
                  In Development
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="admin-project-request-table-wrapper">
          <table className="admin-project-request-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Requested</th>
                <th>Team</th>
                <th>Estimation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRequests.map((request, index) => (
                <tr
                  key={request.id}
                  style={{
                    "--row-index": index,
                  }}
                >
                  <td>
                    <div className="request-project-cell">
                      <div className="request-project-icon">
                        <FolderKanban size={16} />
                      </div>

                      <div>
                        <strong>
                          {request.project_name}
                        </strong>

                        <span>
                          Request #{request.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="request-owner-cell">
                      <div className="request-owner-avatar">
                        {getInitials(request.user_name)}
                      </div>

                      <div>
                        <strong>{request.user_name}</strong>

                        <span>
                          {request.user_email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="request-type-text">
                      {request.project_type}
                    </span>
                  </td>

                  <td>
                    <span className="request-date-text">
                      {formatDate(request.requested_at)}
                    </span>
                  </td>

                  <td>
                    <div className="request-team-cell">
                      <Users size={14} />

                      <span>
                        {request.team_size} Members
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="request-estimation-cell">
                      <strong>
                        {request.estimated_cost}
                      </strong>

                      <span>
                        {request.estimated_duration}
                      </span>
                    </div>
                  </td>

                  <td>
                    {renderStatusBadge(request)}
                  </td>

                  <td>
                    {renderActions(request)}
                  </td>
                </tr>
              ))}

              {paginatedRequests.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="project-request-state-cell"
                  >
                    <div className="request-empty-state">
                      <div className="request-empty-icon">
                        <FolderKanban size={25} />
                      </div>

                      <strong>
                        No project requests found
                      </strong>

                      <span>
                        Try changing your search or status
                        filter.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            FOOTER / PAGINATION
        ===================================================== */}

        {filteredRequests.length > 0 && (
          <div className="project-requests-footer">
            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredRequests.length
                )}
              </strong>{" "}
              of{" "}
              <strong>{filteredRequests.length}</strong>
            </span>

            <div className="request-pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                aria-label="Previous page"
              >
                <ChevronLeft size={15} />
                <span>Previous</span>
              </button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {modalType === "view" && selectedRequest && (
        <div
          className="project-request-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="project-request-modal project-request-full-modal">
            <div className="project-request-modal-header">
              <div>
                <span>PROJECT REQUEST</span>

                <h2>
                  {selectedRequest.project_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="project-request-modal-body">
              {/* STATUS */}

              <div className="request-detail-status-row">
                <div className="request-status-with-icon">
                  {renderStatusBadge(selectedRequest)}

                  <span>
                    Request #{selectedRequest.id}
                  </span>
                </div>

                <span className="request-date-detail">
                  <CalendarDays size={13} />

                  {formatDate(
                    selectedRequest.requested_at
                  )}
                </span>
              </div>

              {/* DESCRIPTION */}

              <div className="request-detail-description">
                <div className="request-detail-heading">
                  <span>PROJECT OVERVIEW</span>

                  <FolderKanban size={15} />
                </div>

                <p>
                  {selectedRequest.description}
                </p>
              </div>

              {/* DETAILS */}

              <div className="request-detail-grid">
                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <UserRound size={14} />
                  </div>

                  <div>
                    <span>Project Owner</span>

                    <strong>
                      {selectedRequest.user_name}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <BriefcaseBusiness size={14} />
                  </div>

                  <div>
                    <span>Project Type</span>

                    <strong>
                      {selectedRequest.project_type}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <CircleDollarSign size={14} />
                  </div>

                  <div>
                    <span>Estimated Cost</span>

                    <strong>
                      {selectedRequest.estimated_cost}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <Timer size={14} />
                  </div>

                  <div>
                    <span>Estimated Duration</span>

                    <strong>
                      {selectedRequest.estimated_duration}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <Users size={14} />
                  </div>

                  <div>
                    <span>Required Team</span>

                    <strong>
                      {selectedRequest.team_size} Members
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <Activity size={14} />
                  </div>

                  <div>
                    <span>Complexity</span>

                    <strong>
                      {selectedRequest.complexity}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <ShieldCheck size={14} />
                  </div>

                  <div>
                    <span>Risk Level</span>

                    <strong>
                      {selectedRequest.risk_level}
                    </strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <CalendarDays size={14} />
                  </div>

                  <div>
                    <span>Requested On</span>

                    <strong>
                      {formatDate(
                        selectedRequest.requested_at
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              {/* RESOURCES */}

              <div className="request-modal-section">
                <div className="request-section-heading">
                  <div>
                    <span>RESOURCE REQUIREMENTS</span>

                    <h3>Required Team</h3>
                  </div>

                  <Users size={18} />
                </div>

                <div className="required-resource-list">
                  {selectedRequest.required_resources.map(
                    (resource, index) => (
                      <div
                        className="required-resource-card"
                        key={index}
                      >
                        <div className="required-resource-number">
                          0{index + 1}
                        </div>

                        <div className="required-resource-content">
                          <strong>
                            {resource.role}
                          </strong>

                          <span>
                            {resource.purpose}
                          </span>
                        </div>

                        <div className="required-resource-quantity">
                          ×{resource.quantity}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS */}

            <div className="project-request-modal-footer">
              <button
                type="button"
                className="request-modal-secondary-btn"
                onClick={() =>
                  openModal("chat", selectedRequest)
                }
              >
                <MessageCircle size={15} />
                Contact User
              </button>

              <button
                type="button"
                className="request-modal-secondary-btn"
                onClick={() =>
                  openModal("assign", selectedRequest)
                }
              >
                <Users size={15} />
                Assign Resources
              </button>

              {(normalizeStatus(selectedRequest.status) ===
                "pending" ||
                normalizeStatus(selectedRequest.status) ===
                  "under_review") && (
                <>
                  <button
                    type="button"
                    className="request-modal-danger-btn"
                    onClick={() =>
                      handleReject(selectedRequest)
                    }
                  >
                    <X size={15} />
                    Reject
                  </button>

                  <button
                    type="button"
                    className="request-modal-primary-btn"
                    onClick={() =>
                      handleAccept(selectedRequest)
                    }
                  >
                    <Check size={15} />
                    Accept
                  </button>
                </>
              )}

              {normalizeStatus(selectedRequest.status) ===
                "rejected" && (
                <button
                  type="button"
                  className="request-modal-primary-btn"
                  onClick={() =>
                    handleAcceptAgain(selectedRequest)
                  }
                >
                  <RotateCcw size={15} />
                  Accept Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CHAT MODAL
      ===================================================== */}

      {modalType === "chat" && selectedRequest && (
        <div
          className="project-request-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="project-request-modal request-chat-modal">
            <div className="project-request-modal-header">
              <div>
                <span>DIRECT CONVERSATION</span>

                <h2>
                  {selectedRequest.user_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="request-chat-project">
              <FolderKanban size={15} />

              <div>
                <span>Project</span>

                <strong>
                  {selectedRequest.project_name}
                </strong>
              </div>
            </div>

            <div className="request-chat-body">
              {chatMessages.length === 0 ? (
                <div className="chat-empty">
                  <div className="chat-empty-icon">
                    <MessageCircle size={21} />
                  </div>

                  <strong>No messages yet</strong>

                  <span>
                    Start a conversation with the project
                    owner.
                  </span>
                </div>
              ) : (
                <div className="request-message-list">
                  {chatMessages.map((message) => {
                    const isAdmin =
                      message.sender_role === "admin";

                    return (
                      <div
                        className={`request-message ${
                          isAdmin
                            ? "admin-message"
                            : "user-message"
                        }`}
                        key={message.id}
                      >
                        <div className="request-message-meta">
                          <strong>
                            {message.sender_name}
                          </strong>

                          <span>
                            {formatDate(
                              message.created_at
                            )}
                          </span>
                        </div>

                        <p>{message.message}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="request-chat-composer">
              <textarea
                value={chatMessage}
                onChange={(event) =>
                  setChatMessage(event.target.value)
                }
                placeholder="Write a message to the project owner..."
                rows="2"
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={!chatMessage.trim()}
                title="Send Message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ASSIGN RESOURCES MODAL
      ===================================================== */}

      {modalType === "assign" && selectedRequest && (
        <div
          className="project-request-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="project-request-modal assign-resource-modal">
            <div className="project-request-modal-header">
              <div>
                <span>RESOURCE ASSIGNMENT</span>

                <h2>Assign Employees</h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close assignment"
              >
                <X size={18} />
              </button>
            </div>

            <div className="assign-project-context">
              <FolderKanban size={15} />

              <div>
                <span>Project</span>

                <strong>
                  {selectedRequest.project_name}
                </strong>
              </div>
            </div>

            <div className="assign-resource-info">
              <ShieldCheck size={14} />

              <span>
                Every employee remains visible. Employees can
                handle a maximum of{" "}
                <strong>3 active projects</strong>.
                Employees at 3/3 cannot be assigned another
                project.
              </span>
            </div>

            <div className="employee-assignment-list">
              {employees.map((employee) => {
                const isFull =
                  employee.active_projects_count >= 3;

                const isSelected =
                  selectedEmployees.includes(employee.id);

                return (
                  <button
                    type="button"
                    className={`employee-assignment-card ${
                      isSelected ? "selected" : ""
                    } ${isFull ? "full" : ""}`}
                    key={employee.id}
                    disabled={isFull}
                    onClick={() =>
                      toggleEmployee(employee)
                    }
                  >
                    <div className="employee-assignment-avatar">
                      {getInitials(employee.name)}
                    </div>

                    <div className="employee-assignment-details">
                      <strong>{employee.name}</strong>

                      <span>{employee.role}</span>
                    </div>

                    <div
                      className={`employee-project-count ${
                        isFull ? "full-count" : ""
                      }`}
                    >
                      {employee.active_projects_count} / 3

                      <span>Projects</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2
                        className="employee-selected-icon"
                        size={17}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="project-request-modal-footer">
              <button
                type="button"
                className="request-modal-secondary-btn"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="request-modal-primary-btn"
                disabled={selectedEmployees.length === 0}
                onClick={closeModal}
              >
                <Users size={15} />

                Assign{" "}
                {selectedEmployees.length > 0
                  ? selectedEmployees.length
                  : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjectRequests;