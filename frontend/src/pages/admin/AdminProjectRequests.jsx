import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CircleDollarSign,
  Timer,
  Activity,
  UserRound,
  ShieldCheck,
  BriefcaseBusiness,
  RefreshCw,
  AlertCircle,
  Send,
} from "lucide-react";

import {
  getProjectRequests,
  reviewProjectRequest,
  getProjectMessages,
  sendProjectMessage,
} from "../../services/api";

import "./AdminProjectRequests.css";

const ITEMS_PER_PAGE = 10;
const OWNER_NAME_FALLBACK = "User name unavailable";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending Review" },
  { value: "under_review", label: "Under Review" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "in_development", label: "In Development" },
  { value: "completed", label: "Completed" },
];

/* =========================================================
   GENERAL HELPERS
========================================================= */

const normalizeStatus = (status = "") =>
  String(status).trim().toLowerCase().replace(/\s+/g, "_");

const normalizeRole = (role = "") =>
  String(role)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const getApiError = (
  error,
  fallback = "Something went wrong. Please try again."
) => {
  const responseData = error?.response?.data;

  if (typeof responseData?.detail === "string") {
    return responseData.detail;
  }

  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (typeof error?.detail === "string") {
    return error.detail;
  }

  if (typeof error?.message === "string" && error.message) {
    return error.message;
  }

  return fallback;
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

const formatMessageDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
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

  return labels[normalizeStatus(status)] || "Unknown Status";
};

const getStatusClass = (status) => {
  const normalized = normalizeStatus(status);

  if (
    ["accepted", "in_development", "completed"].includes(normalized)
  ) {
    return "success";
  }

  if (normalized === "rejected") return "danger";
  if (normalized === "under_review") return "review";

  return "pending";
};

const getInitials = (name = "") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

const displayValue = (value, fallback = "Not available") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
};

const extractRequests = (response) => {
  const candidates = [
    response,
    response?.data,
    response?.items,
    response?.requests,
    response?.results,
    response?.data?.items,
    response?.data?.requests,
    response?.data?.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return null;
};

const extractMessages = (response) => {
  const candidates = [
    response,
    response?.data,
    response?.messages,
    response?.items,
    response?.results,
    response?.data?.messages,
    response?.data?.items,
    response?.data?.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return null;
};

/* =========================================================
   PROJECT OWNER HELPERS
========================================================= */

const getOwner = (item) =>
  item?.owner ?? item?.user ?? item?.requester ?? {};

const getProjectOwnerName = (item) => {
  const owner = getOwner(item);

  const possibleNames = [
    item?.owner_name,
    item?.user_name,
    item?.requester_name,
    item?.full_name,
    item?.fullName,
    owner?.name,
    owner?.full_name,
    owner?.fullName,
  ];

  for (const value of possibleNames) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const getProjectOwnerEmail = (item) => {
  const owner = getOwner(item);

  const possibleEmails = [
    item?.owner_email,
    item?.user_email,
    item?.requester_email,
    owner?.email,
  ];

  for (const value of possibleEmails) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const getProjectOwnerId = (item) => {
  const owner = getOwner(item);

  return (
    item?.owner_id ??
    owner?.id ??
    item?.user_id ??
    item?.requester_id ??
    null
  );
};

const mapProjectRequest = (item) => {
  const ownerName = getProjectOwnerName(item);
  const ownerEmail = getProjectOwnerEmail(item);

  return {
    ...item,
    project_name:
      item?.name ?? item?.project_name ?? "Untitled Project",
    user_name: ownerName || OWNER_NAME_FALLBACK,
    user_email: ownerEmail,
    owner_id: getProjectOwnerId(item),
    requested_at: item?.created_at ?? item?.requested_at ?? null,
    team_size: item?.team_size ?? null,
    estimated_cost: item?.estimated_cost ?? null,
    estimated_duration: item?.estimated_duration ?? null,
    complexity: item?.complexity ?? null,
    risk_level: item?.risk_level ?? null,
    required_resources: Array.isArray(item?.required_resources)
      ? item.required_resources
      : [],
  };
};

/* =========================================================
   CHAT HELPERS
========================================================= */

const getSenderId = (message) => {
  const sender =
    message?.sender ??
    message?.author ??
    message?.user ??
    {};

  return (
    message?.sender_id ??
    message?.senderId ??
    message?.author_id ??
    message?.authorId ??
    message?.user_id ??
    message?.userId ??
    sender?.id ??
    sender?.user_id ??
    sender?.userId ??
    null
  );
};

/*
 * The backend now returns sender_role and sender_name.
 * Nested fields remain supported for compatibility.
 */

const getSenderRole = (message) => {
  const sender =
    message?.sender ??
    message?.author ??
    message?.user ??
    {};

  const role =
    message?.sender_role ??
    message?.senderRole ??
    message?.author_role ??
    message?.authorRole ??
    message?.user_role ??
    message?.userRole ??
    sender?.role ??
    sender?.user_role ??
    sender?.userRole ??
    message?.role ??
    "";

  return normalizeRole(role);
};

const getSenderName = (message) => {
  const sender =
    message?.sender ??
    message?.author ??
    message?.user ??
    {};

  const possibleNames = [
    message?.sender_name,
    message?.senderName,
    message?.author_name,
    message?.authorName,
    message?.user_name,
    message?.userName,
    message?.full_name,
    message?.fullName,
    sender?.name,
    sender?.full_name,
    sender?.fullName,
  ];

  for (const value of possibleNames) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const getMessageText = (message) =>
  message?.message ??
  message?.content ??
  message?.body ??
  message?.text ??
  "";

const getMessageTimestamp = (message) =>
  message?.created_at ??
  message?.sent_at ??
  message?.timestamp ??
  null;

const isAdminRole = (role) =>
  ["admin", "administrator", "superadmin"].includes(
    normalizeRole(role)
  );

const isOwnerRole = (role) =>
  ["user", "customer", "client"].includes(
    normalizeRole(role)
  );

/*
 * Sender classification priority:
 *
 * 1. Explicit backend role.
 * 2. Match with the project's owner ID.
 * 3. Different known sender ID on this admin-only page.
 * 4. Unknown if identity cannot be established.
 *
 * The backend sender_role is the primary source of truth.
 */

const getMessageSenderType = (message, request) => {
  const senderId = getSenderId(message);
  const senderRole = getSenderRole(message);
  const ownerId = request?.owner_id;

  if (isAdminRole(senderRole)) {
    return "admin";
  }

  if (isOwnerRole(senderRole)) {
    return "owner";
  }

  if (
    ownerId != null &&
    senderId != null &&
    String(ownerId) === String(senderId)
  ) {
    return "owner";
  }

  /*
   * Fallback for older API responses without sender_role.
   * This fallback is only safe when owner_id is accurate.
   */
  if (
    ownerId != null &&
    senderId != null &&
    String(ownerId) !== String(senderId)
  ) {
    return "admin";
  }

  return "unknown";
};

const getDisplayOwnerName = (request, message) => {
  const requestName = String(request?.user_name ?? "").trim();

  if (
    requestName &&
    requestName !== OWNER_NAME_FALLBACK &&
    requestName.toLowerCase() !== "unknown sender"
  ) {
    return requestName;
  }

  const messageName = getSenderName(message);

  if (messageName) {
    return messageName;
  }

  return OWNER_NAME_FALLBACK;
};

/* =========================================================
   COMPONENT
========================================================= */

function AdminProjectRequests() {
  const [requests, setRequests] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /* CHAT STATE */

  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  /* PAGE STATE */

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  /* =======================================================
     LOAD PROJECT REQUESTS
  ======================================================= */

  const loadRequests = useCallback(
    async ({ refresh = false } = {}) => {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setLoadError("");

      try {
        const response = await getProjectRequests();
        const backendRequests = extractRequests(response);

        if (!backendRequests) {
          throw new Error(
            "The project requests API returned an unexpected response."
          );
        }

        const normalizedRequests =
          backendRequests.map(mapProjectRequest);

        setRequests(normalizedRequests);

        setSelectedRequest((previous) => {
          if (!previous) return previous;

          return (
            normalizedRequests.find(
              (item) => String(item.id) === String(previous.id)
            ) ?? previous
          );
        });
      } catch (error) {
        setLoadError(
          getApiError(error, "Could not load project requests.")
        );

        if (!refresh) {
          setRequests([]);
          setSelectedRequest(null);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  /* =======================================================
     SEARCH AND FILTER
  ======================================================= */

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const status = normalizeStatus(request.status);

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      if (!matchesStatus) return false;
      if (!query) return true;

      const searchableValues = [
        request.id,
        request.project_name,
        request.user_name,
        request.user_email,
        request.owner_id,
        request.project_type,
        request.description,
        status,
      ];

      return searchableValues
        .map((value) => String(value ?? ""))
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [requests, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)
  );

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredRequests.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredRequests, currentPage]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {
    const pendingStatuses = ["pending", "under_review"];

    const acceptedStatuses = [
      "accepted",
      "in_development",
      "completed",
    ];

    return {
      total: requests.length,
      pending: requests.filter((request) =>
        pendingStatuses.includes(normalizeStatus(request.status))
      ).length,
      accepted: requests.filter((request) =>
        acceptedStatuses.includes(normalizeStatus(request.status))
      ).length,
      rejected: requests.filter(
        (request) =>
          normalizeStatus(request.status) === "rejected"
      ).length,
    };
  }, [requests]);

  /* =======================================================
     MODALS
  ======================================================= */

  const openModal = (type, request) => {
    setSelectedRequest(request);
    setModalType(type);
    setActionError("");
    setChatMessage("");

    if (type === "chat") {
      setMessages([]);
      setMessagesError("");
      setMessagesLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalType(null);
    setChatMessage("");
    setMessages([]);
    setMessagesError("");
    setMessagesLoading(false);
    setActionError("");
  };

  /* =======================================================
     LOAD MESSAGES
  ======================================================= */

  const loadMessages = useCallback(async (requestId) => {
    if (requestId == null) return;

    setMessagesLoading(true);
    setMessagesError("");

    try {
      const response = await getProjectMessages(requestId);
      const backendMessages = extractMessages(response);

      if (!backendMessages) {
        throw new Error(
          "The messaging API returned an unexpected response."
        );
      }

      const orderedMessages = [...backendMessages].sort(
        (a, b) => {
          const timestampA = getMessageTimestamp(a);
          const timestampB = getMessageTimestamp(b);

          const timeA = timestampA
            ? new Date(timestampA).getTime()
            : 0;

          const timeB = timestampB
            ? new Date(timestampB).getTime()
            : 0;

          if (timeA !== timeB) return timeA - timeB;

          return Number(a.id ?? 0) - Number(b.id ?? 0);
        }
      );

      setMessages(orderedMessages);
    } catch (error) {
      setMessagesError(
        getApiError(error, "Could not load conversation messages.")
      );
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (modalType !== "chat" || selectedRequest?.id == null) {
      return;
    }

    loadMessages(selectedRequest.id);
  }, [modalType, selectedRequest?.id, loadMessages]);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = async () => {
    const text = chatMessage.trim();

    if (
      !text ||
      selectedRequest?.id == null ||
      sendingMessage ||
      messagesLoading
    ) {
      return;
    }

    const requestId = selectedRequest.id;

    setSendingMessage(true);
    setMessagesError("");

    try {
      await sendProjectMessage(requestId, text);
      setChatMessage("");

      await loadMessages(requestId);
    } catch (error) {
      setMessagesError(
        getApiError(error, "Could not send your message.")
      );
    } finally {
      setSendingMessage(false);
    }
  };

  /* =======================================================
     ACCEPT / REJECT
  ======================================================= */

  const changeStatus = async (request, newStatus) => {
    if (!request || request.id == null) return;
    if (actionLoadingId !== null) return;

    if (normalizeStatus(request.status) === newStatus) return;

    setActionError("");
    setActionLoadingId(request.id);

    try {
      await reviewProjectRequest(request.id, newStatus);
      await loadRequests({ refresh: true });
    } catch (error) {
      setActionError(
        getApiError(
          error,
          `Could not ${newStatus} this project request.`
        )
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleAccept = (request) =>
    changeStatus(request, "accepted");

  const handleReject = (request) =>
    changeStatus(request, "rejected");

  const handleAcceptAgain = (request) =>
    changeStatus(request, "accepted");

  /* =======================================================
     STATUS BADGE
  ======================================================= */

  const renderStatusBadge = (request) => (
    <span
      className={`request-status-badge ${getStatusClass(
        request.status
      )}`}
    >
      {getStatusLabel(request.status)}
    </span>
  );

  /* =======================================================
     TABLE ACTIONS
  ======================================================= */

  const renderActions = (request) => {
    const status = normalizeStatus(request.status);

    const isPending = ["pending", "under_review"].includes(status);
    const isRejected = status === "rejected";
    const isBusy = actionLoadingId === request.id;

    return (
      <div className="request-actions">
        <button
          type="button"
          className="request-action-btn view"
          title="View Request"
          aria-label={`View ${request.project_name}`}
          onClick={() => openModal("view", request)}
        >
          <Eye size={16} />
        </button>

        <button
          type="button"
          className="request-action-btn chat"
          title="Contact User"
          aria-label={`Contact ${request.user_name}`}
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
              aria-label="Accept project"
              disabled={actionLoadingId !== null}
              onClick={() => handleAccept(request)}
            >
              {isBusy ? (
                <RefreshCw
                  size={16}
                  className="request-refresh-spinning"
                />
              ) : (
                <Check size={16} />
              )}
            </button>

            <button
              type="button"
              className="request-action-btn reject"
              title="Reject Project"
              aria-label="Reject project"
              disabled={actionLoadingId !== null}
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
            aria-label="Accept rejected project"
            disabled={actionLoadingId !== null}
            onClick={() => handleAcceptAgain(request)}
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="admin-project-requests">
      <header className="admin-project-requests-header">
        <div className="project-requests-header-content">
          <span className="project-requests-eyebrow">
            PROJECT MANAGEMENT
          </span>

          <h1>Project Requests</h1>

          <p>
            Review incoming project requests, inspect project
            details, and manage approval decisions.
          </p>
        </div>

        <div className="project-requests-header-actions">
          <button
            type="button"
            className={`request-refresh-button${
              refreshing ? " is-refreshing" : ""
            }`}
            onClick={() => loadRequests({ refresh: true })}
            disabled={
              loading ||
              refreshing ||
              actionLoadingId !== null
            }
            title="Refresh project requests"
            aria-label="Refresh project requests"
          >
            <RefreshCw
              size={15}
              strokeWidth={2}
              className={
                refreshing ? "request-refresh-spinning" : ""
              }
              aria-hidden="true"
            />

            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {loadError && (
        <div className="request-demo-notice" role="alert">
          <AlertCircle size={16} />

          <div>
            <strong>Unable to load project requests</strong>
            <span>{loadError}</span>
          </div>

          <button
            type="button"
            onClick={() => setLoadError("")}
            aria-label="Dismiss error"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {actionError && (
        <div className="request-demo-notice" role="alert">
          <AlertCircle size={15} />

          <div>
            <strong>Unable to complete action</strong>
            <span>{actionError}</span>
          </div>

          <button
            type="button"
            onClick={() => setActionError("")}
            aria-label="Dismiss error"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}

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

      {/* REQUEST TABLE */}

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
              <Search size={14} aria-hidden="true" />

              <input
                type="search"
                className="project-request-search-input"
                placeholder="Search requests..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search project requests"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div className="admin-request-filter">
              <Filter size={14} aria-hidden="true" />

              <select
                className="project-request-status-select"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter requests by status"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
              {loading ? (
                <tr>
                  <td colSpan={8} className="project-request-state-cell">
                    <div className="request-empty-state">
                      <div className="request-empty-icon">
                        <RefreshCw
                          size={25}
                          className="request-refresh-spinning"
                        />
                      </div>

                      <strong>Loading project requests...</strong>

                      <span>
                        Please wait while requests are fetched.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : loadError && requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="project-request-state-cell">
                    <div className="request-empty-state">
                      <div className="request-empty-icon">
                        <AlertCircle size={25} />
                      </div>

                      <strong>Could not load project requests</strong>
                      <span>{loadError}</span>

                      <button
                        type="button"
                        className="request-modal-secondary-btn"
                        onClick={() => loadRequests({ refresh: true })}
                        disabled={refreshing}
                      >
                        <RefreshCw
                          size={14}
                          className={
                            refreshing
                              ? "request-refresh-spinning"
                              : ""
                          }
                        />
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {paginatedRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      style={{ "--row-index": index }}
                    >
                      <td>
                        <div className="request-project-cell">
                          <div className="request-project-icon">
                            <FolderKanban size={16} />
                          </div>

                          <div>
                            <strong>{request.project_name}</strong>
                            <span>Request #{request.id}</span>
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
                              {request.user_email ||
                                (request.owner_id != null
                                  ? `Owner ID: ${request.owner_id}`
                                  : "Not available")}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="request-type-text">
                          {displayValue(request.project_type)}
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
                            {request.team_size == null
                              ? "Not estimated"
                              : `${request.team_size} Members`}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="request-estimation-cell">
                          <strong>
                            {displayValue(
                              request.estimated_cost,
                              "Not estimated"
                            )}
                          </strong>

                          <span>
                            {displayValue(
                              request.estimated_duration,
                              "Duration unavailable"
                            )}
                          </span>
                        </div>
                      </td>

                      <td>{renderStatusBadge(request)}</td>
                      <td>{renderActions(request)}</td>
                    </tr>
                  ))}

                  {paginatedRequests.length === 0 && (
                    <tr>
                      <td colSpan={8} className="project-request-state-cell">
                        <div className="request-empty-state">
                          <div className="request-empty-icon">
                            <FolderKanban size={25} />
                          </div>

                          <strong>No project requests found</strong>

                          <span>
                            {search || statusFilter !== "all"
                              ? "Try changing your search or status filter."
                              : "There are currently no project requests in the backend."}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {filteredRequests.length > 0 &&
          !loading &&
          !(loadError && requests.length === 0) && (
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
                of <strong>{filteredRequests.length}</strong>
              </span>

              <div className="request-pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
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

      {/* VIEW REQUEST MODAL */}

      {modalType === "view" && selectedRequest && (
        <div
          className="project-request-modal-overlay project-request-modal-overlay-left"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeModal();
          }}
        >
          <div
            className="project-request-modal project-request-full-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-request-modal-title"
          >
            <div className="project-request-modal-header">
              <div>
                <span>PROJECT REQUEST</span>

                <h2 id="project-request-modal-title">
                  {selectedRequest.project_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="project-request-modal-body">
              <div className="request-detail-status-row">
                <div className="request-status-with-icon">
                  {renderStatusBadge(selectedRequest)}
                  <span>Request #{selectedRequest.id}</span>
                </div>

                <span className="request-date-detail">
                  <CalendarDays size={13} />
                  {formatDate(selectedRequest.requested_at)}
                </span>
              </div>

              <div className="request-detail-description">
                <div className="request-detail-heading">
                  <span>PROJECT OVERVIEW</span>
                  <FolderKanban size={15} />
                </div>

                <p>
                  {displayValue(
                    selectedRequest.description,
                    "No project description provided."
                  )}
                </p>
              </div>

              <div className="request-detail-grid">
                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <UserRound size={14} />
                  </div>

                  <div>
                    <span>Project Owner</span>
                    <strong>{selectedRequest.user_name}</strong>
                  </div>
                </div>

                <div className="request-detail-item">
                  <div className="request-detail-item-icon">
                    <BriefcaseBusiness size={14} />
                  </div>

                  <div>
                    <span>Project Type</span>
                    <strong>
                      {displayValue(selectedRequest.project_type)}
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
                      {displayValue(
                        selectedRequest.estimated_cost,
                        "Not estimated"
                      )}
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
                      {displayValue(
                        selectedRequest.estimated_duration,
                        "Not estimated"
                      )}
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
                      {selectedRequest.team_size == null
                        ? "Not estimated"
                        : `${selectedRequest.team_size} Members`}
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
                      {displayValue(
                        selectedRequest.complexity,
                        "Not assessed"
                      )}
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
                      {displayValue(
                        selectedRequest.risk_level,
                        "Not assessed"
                      )}
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
                      {formatDate(selectedRequest.requested_at)}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="request-modal-section">
                <div className="request-section-heading">
                  <div>
                    <span>RESOURCE REQUIREMENTS</span>
                    <h3>Required Team</h3>
                  </div>

                  <Users size={18} />
                </div>

                <div className="required-resource-list">
                  {selectedRequest.required_resources.length > 0 ? (
                    selectedRequest.required_resources.map(
                      (resource, index) => (
                        <div
                          className="required-resource-card"
                          key={`${resource.role || "role"}-${index}`}
                        >
                          <div className="required-resource-number">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="required-resource-content">
                            <strong>
                              {resource.role || "Role unavailable"}
                            </strong>

                            <span>{resource.purpose || "—"}</span>
                          </div>

                          <div className="required-resource-quantity">
                            ×{resource.quantity ?? 1}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="request-empty-state">
                      <div className="request-empty-icon">
                        <Users size={22} />
                      </div>

                      <strong>No resource plan available</strong>

                      <span>
                        Resource requirements are not available
                        in the current backend response.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="project-request-modal-footer">
              <button
                type="button"
                className="request-modal-secondary-btn"
                onClick={() => openModal("chat", selectedRequest)}
              >
                <MessageCircle size={15} />
                Contact User
              </button>

              {["pending", "under_review"].includes(
                normalizeStatus(selectedRequest.status)
              ) && (
                <>
                  <button
                    type="button"
                    className="request-modal-danger-btn"
                    disabled={actionLoadingId !== null}
                    onClick={() => handleReject(selectedRequest)}
                  >
                    {actionLoadingId === selectedRequest.id ? (
                      <RefreshCw
                        size={15}
                        className="request-refresh-spinning"
                      />
                    ) : (
                      <X size={15} />
                    )}
                    Reject
                  </button>

                  <button
                    type="button"
                    className="request-modal-primary-btn"
                    disabled={actionLoadingId !== null}
                    onClick={() => handleAccept(selectedRequest)}
                  >
                    {actionLoadingId === selectedRequest.id ? (
                      <RefreshCw
                        size={15}
                        className="request-refresh-spinning"
                      />
                    ) : (
                      <Check size={15} />
                    )}
                    Accept
                  </button>
                </>
              )}

              {normalizeStatus(selectedRequest.status) === "rejected" && (
                <button
                  type="button"
                  className="request-modal-primary-btn"
                  disabled={actionLoadingId !== null}
                  onClick={() => handleAcceptAgain(selectedRequest)}
                >
                  <RotateCcw size={15} />
                  Accept Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHAT MODAL */}

      {modalType === "chat" && selectedRequest && (
        <div
          className="project-request-modal-overlay project-request-modal-overlay-left"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            className="project-request-modal request-chat-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-chat-title"
          >
            <div className="project-request-modal-header">
              <div>
                <span>DIRECT CONVERSATION</span>

                <h2 id="request-chat-title">
                  {getDisplayOwnerName(selectedRequest)}
                </h2>

                {selectedRequest.user_email && (
                  <p className="request-chat-user-email">
                    {selectedRequest.user_email}
                  </p>
                )}
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
                <strong>{selectedRequest.project_name}</strong>
              </div>
            </div>

            <div className="request-chat-body" aria-live="polite">
              {messagesLoading && messages.length === 0 ? (
                <div className="chat-empty">
                  <RefreshCw
                    size={22}
                    className="request-refresh-spinning"
                  />

                  <strong>Loading conversation...</strong>
                  <span>Fetching messages from the backend.</span>
                </div>
              ) : messagesError && messages.length === 0 ? (
                <div className="chat-empty">
                  <AlertCircle size={22} />

                  <strong>Unable to load conversation</strong>
                  <span>{messagesError}</span>

                  <button
                    type="button"
                    className="request-modal-secondary-btn"
                    onClick={() => loadMessages(selectedRequest.id)}
                    disabled={messagesLoading}
                  >
                    <RefreshCw
                      size={14}
                      className={
                        messagesLoading
                          ? "request-refresh-spinning"
                          : ""
                      }
                    />
                    Try Again
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="chat-empty">
                  <div className="chat-empty-icon">
                    <MessageCircle size={21} />
                  </div>

                  <strong>No messages yet</strong>
                  <span>
                    Start the conversation about this project.
                  </span>
                </div>
              ) : (
                <div className="request-chat-message-list">
                  {messages.map((message, index) => {
                    const senderType = getMessageSenderType(
                      message,
                      selectedRequest
                    );

                    const messageText = getMessageText(message);
                    const createdAt = getMessageTimestamp(message);
                    const senderName = getSenderName(message);

                    const displaySenderName =
                      senderType === "admin"
                        ? "Admin"
                        : senderType === "owner"
                          ? getDisplayOwnerName(
                              selectedRequest,
                              message
                            )
                          : senderName || "Unknown Sender";

                    const alignmentClass =
                      senderType === "admin"
                        ? "is-admin-message"
                        : senderType === "owner"
                          ? "is-owner-message"
                          : "is-unknown-message";

                    return (
                      <div
                        key={
                          message.id ??
                          `${createdAt ?? "message"}-${index}`
                        }
                        className={`request-chat-message-row ${alignmentClass}`}
                      >
                        <div className="request-chat-message">
                          <span className="request-chat-sender">
                            {displaySenderName}
                          </span>

                          <p>{messageText}</p>

                          {createdAt && (
                            <time dateTime={String(createdAt)}>
                              {formatMessageDate(createdAt)}
                            </time>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {messagesError && messages.length > 0 && (
              <div className="request-chat-inline-error" role="alert">
                <AlertCircle size={14} />
                <span>{messagesError}</span>

                <button
                  type="button"
                  onClick={() => loadMessages(selectedRequest.id)}
                  disabled={messagesLoading}
                >
                  Retry
                </button>
              </div>
            )}

            <form
              className="request-chat-composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                value={chatMessage}
                onChange={(event) =>
                  setChatMessage(event.target.value)
                }
                placeholder="Write a message..."
                rows={2}
                disabled={sendingMessage}
                aria-label="Chat message"
                maxLength={5000}
              />

              <button
                type="submit"
                disabled={
                  !chatMessage.trim() ||
                  sendingMessage ||
                  messagesLoading
                }
                title="Send message"
                aria-label="Send message"
              >
                {sendingMessage ? (
                  <RefreshCw
                    size={16}
                    className="request-refresh-spinning"
                  />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjectRequests;