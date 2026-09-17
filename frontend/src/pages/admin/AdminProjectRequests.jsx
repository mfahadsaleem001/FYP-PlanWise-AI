import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  Users,
  FolderKanban,
  AlertTriangle,
  MoreHorizontal,
  MessageCircle,
  Send,
  UserCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./AdminProjectRequests.css";

const initialProjectRequests = [
  {
    id: 1,
    projectName: "E-Commerce Platform",
    owner: "Ali Raza",
    ownerEmail: "ali.raza@example.com",
    projectType: "Web Application",
    estimatedCost: "$18,500",
    duration: "14 Weeks",
    resources: 5,
    discussion: "Active discussion",
    requestedDate: "Sep 12, 2026",
    status: "Pending Admin Review",
    resourceStatus: "Partial Gap",
    description:
      "A scalable e-commerce platform with product management, customer accounts, shopping cart, order processing, and admin management.",
    requiredTeam: [
      {
        role: "Backend Developer",
        required: 2,
        available: 1,
        gap: 1,
      },
      {
        role: "Frontend Developer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "UI/UX Designer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 1,
        gap: 0,
      },
    ],
  },

  {
    id: 2,
    projectName: "AI Recommendation Engine",
    owner: "Sara Khan",
    ownerEmail: "sara.khan@example.com",
    projectType: "AI / Machine Learning",
    estimatedCost: "$32,000",
    duration: "20 Weeks",
    resources: 6,
    discussion: "Active",
    requestedDate: "Sep 11, 2026",
    status: "Pending Admin Review",
    resourceStatus: "Gap Detected",
    description:
      "An AI recommendation system that analyzes user behavior and recommends relevant products or content using machine learning.",
    requiredTeam: [
      {
        role: "ML Engineer",
        required: 2,
        available: 1,
        gap: 1,
      },
      {
        role: "Backend Developer",
        required: 2,
        available: 1,
        gap: 1,
      },
      {
        role: "Frontend Developer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 1,
        gap: 0,
      },
    ],
  },

  {
    id: 3,
    projectName: "Customer Mobile App",
    owner: "Ahmed Hassan",
    ownerEmail: "ahmed.hassan@example.com",
    projectType: "Mobile Application",
    estimatedCost: "$14,800",
    duration: "12 Weeks",
    resources: 4,
    discussion: "Completed discussion",
    requestedDate: "Sep 10, 2026",
    status: "Under Review",
    resourceStatus: "Available",
    description:
      "A customer-facing mobile application with account management, notifications, service browsing, and secure user interactions.",
    requiredTeam: [
      {
        role: "Mobile Developer",
        required: 2,
        available: 2,
        gap: 0,
      },
      {
        role: "UI/UX Designer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 1,
        gap: 0,
      },
    ],
  },

  {
    id: 4,
    projectName: "Business Analytics Portal",
    owner: "Mariam Iqbal",
    ownerEmail: "mariam.iqbal@example.com",
    projectType: "Web Application",
    estimatedCost: "$16,400",
    duration: "13 Weeks",
    resources: 4,
    discussion: "Completed",
    requestedDate: "Sep 09, 2026",
    status: "Accepted",
    resourceStatus: "Available",
    description:
      "A business analytics portal providing dashboards, reporting, data visualization, and business performance insights.",
    requiredTeam: [
      {
        role: "Frontend Developer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "Backend Developer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "Data Analyst",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 1,
        gap: 0,
      },
    ],
  },

  {
    id: 5,
    projectName: "Healthcare Management System",
    owner: "Usman Ahmed",
    ownerEmail: "usman.ahmed@example.com",
    projectType: "Desktop Software",
    estimatedCost: "$21,700",
    duration: "16 Weeks",
    resources: 5,
    discussion: "Completed",
    requestedDate: "Sep 07, 2026",
    status: "In Development",
    resourceStatus: "Assigned",
    description:
      "A healthcare management system for handling patient records, appointments, staff workflows, and operational reporting.",
    requiredTeam: [
      {
        role: "Backend Developer",
        required: 2,
        available: 2,
        gap: 0,
      },
      {
        role: "Desktop Developer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "UI/UX Designer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 1,
        gap: 0,
      },
    ],
  },

  {
    id: 6,
    projectName: "SaaS Project Management Tool",
    owner: "Ayesha Malik",
    ownerEmail: "ayesha.malik@example.com",
    projectType: "SaaS",
    estimatedCost: "$28,500",
    duration: "18 Weeks",
    resources: 6,
    discussion: "Completed",
    requestedDate: "Sep 05, 2026",
    status: "Rejected",
    resourceStatus: "Insufficient Resources",
    description:
      "A SaaS project management platform for planning projects, tracking tasks, managing teams, and monitoring project progress.",
    requiredTeam: [
      {
        role: "Backend Developer",
        required: 2,
        available: 0,
        gap: 2,
      },
      {
        role: "Frontend Developer",
        required: 2,
        available: 1,
        gap: 1,
      },
      {
        role: "UI/UX Designer",
        required: 1,
        available: 1,
        gap: 0,
      },
      {
        role: "QA Engineer",
        required: 1,
        available: 0,
        gap: 1,
      },
    ],
  },
];

const demoMessages = [
  {
    id: 1,
    sender: "user",
    text: "Hi, I wanted to check the status of our project development request.",
    time: "10:20 AM",
  },
  {
    id: 2,
    sender: "admin",
    text: "We are currently reviewing the required resources and project scope.",
    time: "10:35 AM",
  },
  {
    id: 3,
    sender: "user",
    text: "Thank you. Please let me know if you need any additional information.",
    time: "10:42 AM",
  },
];

function AdminProjectRequests() {
  const [requests, setRequests] = useState(
    initialProjectRequests
  );

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [showRequestModal, setShowRequestModal] =
    useState(false);

  const [showChat, setShowChat] = useState(false);

  const [chatRequest, setChatRequest] =
    useState(null);

  const [messageInput, setMessageInput] =
    useState("");

  const [messages, setMessages] =
    useState(demoMessages);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [resourceFilter, setResourceFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openMoreMenu, setOpenMoreMenu] =
    useState(null);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  const [assignRequest, setAssignRequest] =
    useState(null);

  const requestsPerPage = 10;

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const pendingCount = requests.filter(
    (request) =>
      request.status === "Pending Admin Review"
  ).length;

  const acceptedCount = requests.filter(
    (request) =>
      request.status === "Accepted" ||
      request.status === "In Development"
  ).length;

  const resourceGapCount = requests.filter(
    (request) =>
      request.resourceStatus === "Partial Gap" ||
      request.resourceStatus === "Gap Detected" ||
      request.resourceStatus === "Insufficient Resources"
  ).length;

  // ============================================================
  // OPEN REQUEST
  // ============================================================

  const openRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // CHAT
  // ============================================================

  const openChat = (request) => {
    setChatRequest(request);
    setShowChat(true);
    setMessageInput("");
    setOpenMoreMenu(null);
  };

  const sendMessage = () => {
    const message = messageInput.trim();

    if (!message) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        sender: "admin",
        text: message,
        time: "Just now",
      },
    ]);

    setMessageInput("");
  };

  const handleMessageKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // ============================================================
  // ACCEPT / REJECT
  // ============================================================

  const updateRequestStatus = (
    requestId,
    newStatus
  ) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
            }
          : request
      )
    );

    setSelectedRequest((currentRequest) =>
      currentRequest &&
      currentRequest.id === requestId
        ? {
            ...currentRequest,
            status: newStatus,
          }
        : currentRequest
    );

    setOpenMoreMenu(null);
  };

  const acceptRequest = (request) => {
    updateRequestStatus(
      request.id,
      "Accepted"
    );
  };

  const rejectRequest = (request) => {
    updateRequestStatus(
      request.id,
      "Rejected"
    );
  };

  // ============================================================
  // ASSIGN RESOURCES
  // ============================================================

  const openAssignResources = (request) => {
    setAssignRequest(request);
    setShowAssignModal(true);
    setOpenMoreMenu(null);
  };

  const closeAssignResources = () => {
    setShowAssignModal(false);
    setAssignRequest(null);
  };

  // ============================================================
  // FILTERING
  // ============================================================

  const filteredRequests = requests.filter(
    (request) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        request.projectName
          .toLowerCase()
          .includes(search) ||
        request.owner
          .toLowerCase()
          .includes(search) ||
        request.projectType
          .toLowerCase()
          .includes(search) ||
        request.ownerEmail
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        request.status === statusFilter;

      let matchesResource = true;

      if (resourceFilter === "available") {
        matchesResource =
          request.resourceStatus ===
          "Available";
      }

      if (resourceFilter === "assigned") {
        matchesResource =
          request.resourceStatus ===
          "Assigned";
      }

      if (resourceFilter === "gap") {
        matchesResource =
          request.resourceStatus ===
            "Partial Gap" ||
          request.resourceStatus ===
            "Gap Detected" ||
          request.resourceStatus ===
            "Insufficient Resources";
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesResource
      );
    }
  );

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.ceil(
    filteredRequests.length /
      requestsPerPage
  );

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(
          currentPage,
          totalPages
        );

  const startIndex =
    (safeCurrentPage - 1) *
    requestsPerPage;

  const currentRequests =
    filteredRequests.slice(
      startIndex,
      startIndex + requestsPerPage
    );

  const changePage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
    setOpenMoreMenu(null);
  };

  // ============================================================
  // PAGINATION BUTTON WINDOW
  // ============================================================

  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages = [];

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      safeCurrentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      safeCurrentPage + 1
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    if (
      safeCurrentPage <
      totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ============================================================
  // RESET PAGINATION WHEN FILTERS CHANGE
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleResourceChange = (event) => {
    setResourceFilter(event.target.value);
    setCurrentPage(1);
  };

  // ============================================================
  // CLOSE REQUEST MODAL
  // ============================================================

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setSelectedRequest(null);
  };

  // ============================================================
  // STATUS CLASS
  // ============================================================

  const getStatusClass = (status) => {
    if (
      status ===
      "Pending Admin Review"
    ) {
      return "pending";
    }

    if (status === "Accepted") {
      return "accepted";
    }

    if (status === "Rejected") {
      return "rejected";
    }

    if (status === "In Development") {
      return "development";
    }

    return "review";
  };

  const getResourceClass = (
    resourceStatus
  ) => {
    if (
      resourceStatus === "Available" ||
      resourceStatus === "Assigned"
    ) {
      return "available";
    }

    return "gap";
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-project-requests">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="admin-requests-header">
        <div>
          <h1>Project Requests</h1>
          <p>
            Review development requests,
            manage resources, and communicate
            with project owners.
          </p>
        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="admin-requests-summary">

        <div className="admin-request-summary-card">
          <div className="admin-request-summary-icon">
            <FolderKanban size={20} />
          </div>

          <div>
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>
        </div>

        <div className="admin-request-summary-card">
          <div className="admin-request-summary-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="admin-request-summary-card">
          <div className="admin-request-summary-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Accepted / Active</span>
            <strong>{acceptedCount}</strong>
          </div>
        </div>

        <div className="admin-request-summary-card">
          <div className="admin-request-summary-icon">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Resource Gaps</span>
            <strong>{resourceGapCount}</strong>
          </div>
        </div>

      </div>

      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <div className="admin-requests-toolbar">

        <div className="admin-requests-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search project, owner, type..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">
            All Statuses
          </option>

          <option value="Pending Admin Review">
            Pending Admin Review
          </option>

          <option value="Under Review">
            Under Review
          </option>

          <option value="Accepted">
            Accepted
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="In Development">
            In Development
          </option>
        </select>

        <select
          value={resourceFilter}
          onChange={handleResourceChange}
        >
          <option value="all">
            All Resources
          </option>

          <option value="available">
            Available
          </option>

          <option value="assigned">
            Assigned
          </option>

          <option value="gap">
            Resource Gap
          </option>
        </select>

      </div>

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="admin-requests-table-card">

        <div className="admin-requests-table-wrapper">

          <table className="admin-requests-table">

            <thead>
              <tr>
                <th>Project</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Estimate</th>
                <th>Resources</th>
                <th>Requested</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {currentRequests.length > 0 ? (
                currentRequests.map(
                  (request) => (
                    <tr key={request.id}>

                      <td>
                        <div className="admin-request-project">
                          <strong>
                            {request.projectName}
                          </strong>

                          <span>
                            {request.duration}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="admin-request-owner">
                          <strong>
                            {request.owner}
                          </strong>

                          <span>
                            {request.ownerEmail}
                          </span>
                        </div>
                      </td>

                      <td>
                        {request.projectType}
                      </td>

                      <td>
                        <strong>
                          {request.estimatedCost}
                        </strong>
                      </td>

                      <td>
                        <div className="admin-request-resource-cell">
                          <Users size={16} />
                          <span>
                            {request.resources}
                          </span>
                        </div>

                        <small
                          className={`admin-request-resource-badge ${getResourceClass(
                            request.resourceStatus
                          )}`}
                        >
                          {request.resourceStatus}
                        </small>
                      </td>

                      <td>
                        {request.requestedDate}
                      </td>

                      <td>
                        <span
                          className={`admin-request-status-badge ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td>

                        <div className="admin-request-actions">

                          {/* VIEW */}

                          <button
                            className="admin-request-icon-btn"
                            title="View Request"
                            onClick={() =>
                              openRequest(request)
                            }
                          >
                            <Eye size={17} />
                          </button>

                          {/* CHAT */}

                          <button
                            className="admin-request-icon-btn"
                            title="Contact User"
                            onClick={() =>
                              openChat(request)
                            }
                          >
                            <MessageCircle
                              size={17}
                            />
                          </button>

                          {/* ACCEPT */}

                          {request.status !==
                            "In Development" &&
                            request.status !==
                              "Accepted" && (
                              <button
                                className="admin-request-accept-btn"
                                title="Accept Request"
                                onClick={() =>
                                  acceptRequest(
                                    request
                                  )
                                }
                              >
                                <CheckCircle2
                                  size={16}
                                />
                              </button>
                            )}

                          {/* REJECT */}

                          {request.status !==
                            "Rejected" &&
                            request.status !==
                              "In Development" && (
                              <button
                                className="admin-request-reject-btn"
                                title="Reject Request"
                                onClick={() =>
                                  rejectRequest(
                                    request
                                  )
                                }
                              >
                                <XCircle
                                  size={16}
                                />
                              </button>
                            )}

                          {/* MORE */}

                          <div className="admin-request-more-wrapper">

                            <button
                              className="admin-request-icon-btn"
                              title="More"
                              onClick={() =>
                                setOpenMoreMenu(
                                  openMoreMenu ===
                                    request.id
                                    ? null
                                    : request.id
                                )
                              }
                            >
                              <MoreHorizontal
                                size={17}
                              />
                            </button>

                            {openMoreMenu ===
                              request.id && (
                              <div className="admin-request-more-menu">

                                <button
                                  className="admin-request-more-item"
                                  onClick={() =>
                                    openRequest(
                                      request
                                    )
                                  }
                                >
                                  <Eye
                                    size={15}
                                  />
                                  View Request
                                </button>

                                <button
                                  className="admin-request-more-item"
                                  onClick={() =>
                                    openChat(
                                      request
                                    )
                                  }
                                >
                                  <MessageCircle
                                    size={15}
                                  />
                                  Contact User
                                </button>

                                <button
                                  className="admin-request-more-item"
                                  onClick={() =>
                                    openAssignResources(
                                      request
                                    )
                                  }
                                >
                                  <UserCheck
                                    size={15}
                                  />
                                  Assign Resources
                                </button>

                                <div className="admin-request-more-divider" />

                                <button
                                  className="admin-request-more-item accept"
                                  onClick={() =>
                                    acceptRequest(
                                      request
                                    )
                                  }
                                >
                                  <CheckCircle2
                                    size={15}
                                  />
                                  Accept Request
                                </button>

                                <button
                                  className="admin-request-more-item reject"
                                  onClick={() =>
                                    rejectRequest(
                                      request
                                    )
                                  }
                                >
                                  <XCircle
                                    size={15}
                                  />
                                  Reject Request
                                </button>

                              </div>
                            )}

                          </div>

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="admin-request-empty"
                  >
                    <FolderKanban size={30} />

                    <strong>
                      No project requests found
                    </strong>

                    <span>
                      Try changing your search or
                      filter criteria.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ====================================================
            PAGINATION
        ==================================================== */}

        <div className="admin-request-table-footer">

          <div className="admin-request-footer-info">

            {filteredRequests.length === 0
              ? "Showing 0 of 0 project requests"
              : `Showing ${
                  startIndex + 1
                }-${Math.min(
                  startIndex +
                    currentRequests.length,
                  filteredRequests.length
                )} of ${
                  filteredRequests.length
                } project requests`}

          </div>

          {totalPages > 0 && (
            <div className="admin-request-pagination">

              <button
                className="admin-request-page-button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  changePage(
                    safeCurrentPage - 1
                  )
                }
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {getPaginationItems().map(
                (item, index) =>
                  item === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="admin-request-pagination-ellipsis"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      className={`admin-request-page-button ${
                        safeCurrentPage ===
                        item
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        changePage(item)
                      }
                    >
                      {item}
                    </button>
                  )
              )}

              <button
                className="admin-request-page-button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  changePage(
                    safeCurrentPage + 1
                  )
                }
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          )}

        </div>

      </div>

      {/* ======================================================
          PROJECT REQUEST MODAL
      ====================================================== */}

      {showRequestModal &&
        selectedRequest && (
          <div
            className="admin-request-modal-overlay"
            onClick={closeRequestModal}
          >
            <div
              className="admin-request-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-request-modal-header">

                <div>
                  <span>
                    PROJECT REQUEST
                  </span>

                  <h2>
                    {selectedRequest.projectName}
                  </h2>
                </div>

                <button
                  className="admin-request-modal-close"
                  onClick={
                    closeRequestModal
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="admin-request-modal-body">

                {/* PROJECT INFORMATION */}

                <section className="admin-request-detail-section">

                  <div className="admin-request-detail-heading">
                    <FolderKanban
                      size={18}
                    />

                    <h3>
                      Project Information
                    </h3>
                  </div>

                  <div className="admin-request-detail-grid">

                    <div>
                      <span>
                        Project Type
                      </span>

                      <strong>
                        {
                          selectedRequest.projectType
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Project Owner
                      </span>

                      <strong>
                        {
                          selectedRequest.owner
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Estimated Cost
                      </span>

                      <strong>
                        {
                          selectedRequest.estimatedCost
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Estimated Duration
                      </span>

                      <strong>
                        {
                          selectedRequest.duration
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Requested Date
                      </span>

                      <strong>
                        {
                          selectedRequest.requestedDate
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Current Status
                      </span>

                      <strong>
                        <span
                          className={`admin-request-status-badge ${getStatusClass(
                            selectedRequest.status
                          )}`}
                        >
                          {
                            selectedRequest.status
                          }
                        </span>
                      </strong>
                    </div>

                  </div>

                </section>

                {/* DESCRIPTION */}

                <section className="admin-request-detail-section">

                  <div className="admin-request-detail-heading">
                    <FolderKanban
                      size={18}
                    />

                    <h3>
                      Project Description
                    </h3>
                  </div>

                  <p className="admin-request-description">
                    {
                      selectedRequest.description
                    }
                  </p>

                </section>

                {/* REQUIRED TEAM */}

                <section className="admin-request-detail-section">

                  <div className="admin-request-detail-heading">
                    <Users size={18} />

                    <h3>
                      Required Team
                    </h3>
                  </div>

                  <div className="admin-required-team-list">

                    {selectedRequest.requiredTeam.map(
                      (team) => (
                        <div
                          key={team.role}
                          className="admin-required-team-row"
                        >

                          <div>
                            <strong>
                              {team.role}
                            </strong>

                            <span>
                              Required:{" "}
                              {team.required}
                            </span>
                          </div>

                          <div className="admin-team-availability">

                            <span>
                              Available:{" "}
                              {team.available}
                            </span>

                            {team.gap > 0 && (
                              <span className="admin-team-gap">
                                Gap: {team.gap}
                              </span>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </section>

                {/* RESOURCE STATUS */}

                <section className="admin-request-detail-section">

                  <div className="admin-request-detail-heading">
                    <AlertTriangle
                      size={18}
                    />

                    <h3>
                      Resource Availability
                    </h3>
                  </div>

                  <div
                    className={`admin-request-resource-summary ${getResourceClass(
                      selectedRequest.resourceStatus
                    )}`}
                  >
                    <Users size={18} />

                    <div>
                      <strong>
                        {
                          selectedRequest.resourceStatus
                        }
                      </strong>

                      <span>
                        Review resource
                        availability before
                        assigning employees.
                      </span>
                    </div>
                  </div>

                </section>

              </div>

              {/* ==================================================
                  MODAL FOOTER
              ================================================== */}

              <div className="admin-request-modal-footer">

                <button
                  className="admin-request-secondary-btn"
                  onClick={() =>
                    openChat(
                      selectedRequest
                    )
                  }
                >
                  <MessageCircle
                    size={16}
                  />
                  Contact User
                </button>

                <button
                  className="admin-request-secondary-btn"
                  onClick={() =>
                    openAssignResources(
                      selectedRequest
                    )
                  }
                >
                  <UserCheck size={16} />
                  Assign Resources
                </button>

                <div className="admin-request-footer-actions">

                  {/* REJECT */}

                  <button
                    className="admin-request-modal-reject-btn"
                    onClick={() => {
                      rejectRequest(
                        selectedRequest
                      );
                      closeRequestModal();
                    }}
                  >
                    <XCircle size={16} />
                    Reject Request
                  </button>

                  {/* ACCEPT */}

                  <button
                    className="admin-request-modal-accept-btn"
                    onClick={() => {
                      acceptRequest(
                        selectedRequest
                      );
                      closeRequestModal();
                    }}
                  >
                    <CheckCircle2 size={16} />
                    Accept Request
                  </button>

                </div>

              </div>

            </div>
          </div>
        )}

      {/* ======================================================
          CHAT MODAL
      ====================================================== */}

      {showChat &&
        chatRequest && (
          <div
            className="admin-request-modal-overlay"
            onClick={() =>
              setShowChat(false)
            }
          >
            <div
              className="admin-request-chat-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-request-modal-header">

                <div>
                  <span>
                    PROJECT DISCUSSION
                  </span>

                  <h2>
                    {chatRequest.projectName}
                  </h2>
                </div>

                <button
                  className="admin-request-modal-close"
                  onClick={() =>
                    setShowChat(false)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="admin-request-chat-body">

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`admin-chat-message ${
                      message.sender ===
                      "admin"
                        ? "admin"
                        : "user"
                    }`}
                  >

                    <div className="admin-chat-message-bubble">
                      <p>
                        {message.text}
                      </p>

                      <span>
                        {message.time}
                      </span>
                    </div>

                  </div>
                ))}

              </div>

              <div className="admin-request-chat-input-area">

                <textarea
                  placeholder="Write a message..."
                  value={messageInput}
                  onChange={(event) =>
                    setMessageInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    handleMessageKeyDown
                  }
                  rows={2}
                />

                <button
                  className="admin-request-send-btn"
                  onClick={sendMessage}
                >
                  <Send size={17} />
                  Send
                </button>

              </div>

            </div>
          </div>
        )}

      {/* ======================================================
          ASSIGN RESOURCES MODAL
      ====================================================== */}

      {showAssignModal &&
        assignRequest && (
          <div
            className="admin-assign-resource-modal-overlay"
            onClick={
              closeAssignResources
            }
          >
            <div
              className="admin-assign-resource-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="admin-assign-resource-modal-header">

                <div>
                  <span>
                    RESOURCE PLANNING
                  </span>

                  <h2>
                    Assign Resources
                  </h2>

                  <p>
                    {
                      assignRequest.projectName
                    }
                  </p>
                </div>

                <button
                  className="admin-request-modal-close"
                  onClick={
                    closeAssignResources
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="admin-assign-resource-modal-body">

                <div className="admin-assign-resource-info">
                  <Users size={18} />

                  <div>
                    <strong>
                      Required team:
                    </strong>

                    <span>
                      {
                        assignRequest.resources
                      } resources required
                    </span>
                  </div>
                </div>

                {assignRequest.requiredTeam.map(
                  (team) => (
                    <div
                      key={team.role}
                      className="admin-resource-assignment-row"
                    >

                      <div className="admin-resource-assignment-info">

                        <strong>
                          {team.role}
                        </strong>

                        <span>
                          Required:{" "}
                          {team.required}
                        </span>

                      </div>

                      <div className="admin-resource-assignment-availability">

                        <span>
                          Available:{" "}
                          {team.available}
                        </span>

                        {team.gap > 0 && (
                          <span className="admin-team-gap">
                            Gap: {team.gap}
                          </span>
                        )}

                      </div>

                      <button
                        className="admin-resource-select-btn"
                        disabled={
                          team.available ===
                          0
                        }
                        onClick={() => {
                          if (
                            team.available >
                            0
                          ) {
                            alert(
                              `Resource assignment for ${team.role} will be connected to the employee directory in the backend.`
                            );
                          }
                        }}
                      >
                        <UserCheck
                          size={15}
                        />

                        {team.available ===
                        0
                          ? "No Resource"
                          : "Select Resource"}
                      </button>

                    </div>
                  )
                )}

                <div className="admin-assign-resource-note">
                  <AlertTriangle
                    size={16}
                  />

                  <span>
                    Employee assignment will be
                    validated against role,
                    availability, workload, and
                    project conflicts when the
                    backend resource system is
                    connected.
                  </span>
                </div>

              </div>

              <div className="admin-assign-resource-modal-footer">

                <button
                  className="admin-request-secondary-btn"
                  onClick={
                    closeAssignResources
                  }
                >
                  Cancel
                </button>

                <button
                  className="admin-request-modal-accept-btn"
                  onClick={() => {
                    alert(
                      "Resource assignment saved for this demo. Actual employee assignment will be handled by the backend resource system."
                    );
                    closeAssignResources();
                  }}
                >
                  <UserCheck size={16} />
                  Save Assignment
                </button>

              </div>

            </div>
          </div>
        )}

    </div>
  );
}

export default AdminProjectRequests;