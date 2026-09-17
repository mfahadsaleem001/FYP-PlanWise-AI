import {
  Bell,
  Search,
  AlertTriangle,
  UserPlus,
  FolderPlus,
  Users,
  BrainCircuit,
  FileWarning,
  CheckCircle2,
  Check,
  CheckCheck,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./AdminNotifications.css";

function AdminNotifications() {
  // ============================================================
  // DEMO NOTIFICATION DATA
  // ============================================================

  const initialNotifications = [
    {
      id: 1,
      type: "resource",
      title: "Resource shortage detected",
      description:
        "AI Recommendation Engine requires an additional ML Engineer.",
      time: "12 minutes ago",
      status: "unread",
    },

    {
      id: 2,
      type: "risk",
      title: "High-risk project requires attention",
      description:
        "PlanWise AI currently has a high project risk level.",
      time: "35 minutes ago",
      status: "unread",
    },

    {
      id: 3,
      type: "user",
      title: "New user registered",
      description:
        "Sara Khan has created a new PlanWise account.",
      time: "1 hour ago",
      status: "unread",
    },

    {
      id: 4,
      type: "project",
      title: "New project created",
      description:
        "Customer Mobile App has been added to the system.",
      time: "2 hours ago",
      status: "read",
    },

    {
      id: 5,
      type: "model",
      title: "Model validation completed",
      description:
        "The latest estimation model validation completed successfully.",
      time: "4 hours ago",
      status: "read",
    },

    {
      id: 6,
      type: "conflict",
      title: "Resource conflict detected",
      description:
        "Hassan Ali is assigned to overlapping project schedules.",
      time: "5 hours ago",
      status: "read",
    },

    {
      id: 7,
      type: "report",
      title: "Report generation completed",
      description:
        "Project estimation report was generated successfully.",
      time: "6 hours ago",
      status: "read",
    },

    {
      id: 8,
      type: "system",
      title: "System health check completed",
      description:
        "All monitored PlanWise services are currently operational.",
      time: "Yesterday",
      status: "read",
    },
  ];

  // ============================================================
  // STATE
  // ============================================================

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [notificationFilter, setNotificationFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const notificationsPerPage = 5;

  // ============================================================
  // NOTIFICATION ICON
  // ============================================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "resource":
        return <Users size={17} />;

      case "risk":
        return <AlertTriangle size={17} />;

      case "user":
        return <UserPlus size={17} />;

      case "project":
        return <FolderPlus size={17} />;

      case "model":
        return <BrainCircuit size={17} />;

      case "conflict":
        return <Users size={17} />;

      case "report":
        return <FileWarning size={17} />;

      case "system":
        return <CheckCircle2 size={17} />;

      default:
        return <Bell size={17} />;
    }
  };

  // ============================================================
  // NOTIFICATION CLASS
  // ============================================================

  const getNotificationClass = (type) => {
    switch (type) {
      case "resource":
        return "resource";

      case "risk":
        return "risk";

      case "user":
        return "user";

      case "project":
        return "project";

      case "model":
        return "model";

      case "conflict":
        return "conflict";

      case "report":
        return "report";

      case "system":
        return "system";

      default:
        return "default";
    }
  };

  // ============================================================
  // FILTER NOTIFICATIONS
  // ============================================================

  const filteredNotifications = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return notifications.filter((notification) => {
      // --------------------------------------------------------
      // SEARCH
      // --------------------------------------------------------

      const matchesSearch =
        normalizedSearch === "" ||
        notification.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        notification.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        notification.type
          .toLowerCase()
          .includes(normalizedSearch);

      // --------------------------------------------------------
      // FILTER
      // --------------------------------------------------------

      let matchesFilter = true;

      if (
        notificationFilter === "unread"
      ) {
        matchesFilter =
          notification.status === "unread";
      }

      if (
        notificationFilter === "resource"
      ) {
        matchesFilter =
          notification.type === "resource";
      }

      if (
        notificationFilter === "risk"
      ) {
        matchesFilter =
          notification.type === "risk";
      }

      if (
        notificationFilter === "system"
      ) {
        matchesFilter =
          notification.type === "system";
      }

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    notifications,
    searchTerm,
    notificationFilter,
  ]);

  // ============================================================
  // UNREAD COUNT
  // ============================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.status === "unread"
    ).length;

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNotifications.length /
        notificationsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    notificationsPerPage;

  const endIndex =
    startIndex + notificationsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      endIndex
    );

  // ============================================================
  // SEARCH HANDLER
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchTerm(
      event.target.value
    );

    setCurrentPage(1);
  };

  // ============================================================
  // FILTER HANDLER
  // ============================================================

  const handleFilterChange = (event) => {
    setNotificationFilter(
      event.target.value
    );

    setCurrentPage(1);
  };

  // ============================================================
  // MARK SINGLE NOTIFICATION AS READ
  // ============================================================

  const handleMarkAsRead = (notificationId) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              status: "read",
            }
          : notification
      )
    );
  };

  // ============================================================
  // MARK ALL AS READ
  // ============================================================

  const handleMarkAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        status: "read",
      }))
    );
  };

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
  };

  // ============================================================
  // PAGE NUMBERS
  // ============================================================

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <section className="admin-notifications">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="admin-page-header">

        <div className="admin-page-header-content">

          <span className="admin-page-eyebrow">
            SYSTEM
          </span>

          <h1>
            Notifications
          </h1>

          <p>
            Review system alerts, project risks,
            resource issues, model events, and
            important administrative notifications.
          </p>

        </div>

        <button
          type="button"
          className="admin-mark-all"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          title={
            unreadCount === 0
              ? "All notifications are already read"
              : "Mark all notifications as read"
          }
        >
          <CheckCheck size={16} />

          <span>
            Mark All Read
          </span>
        </button>

      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="admin-notification-summary">

        <div className="admin-notification-summary-card">

          <div className="admin-notification-summary-icon">
            <Bell size={18} />
          </div>

          <div>
            <span>
              Total Notifications
            </span>

            <strong>
              42
            </strong>
          </div>

        </div>

        <div className="admin-notification-summary-card">

          <div className="admin-notification-summary-icon unread">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>
              Unread
            </span>

            <strong>
              {unreadCount}
            </strong>
          </div>

        </div>

        <div className="admin-notification-summary-card">

          <div className="admin-notification-summary-icon">
            <Users size={18} />
          </div>

          <div>
            <span>
              Resource Alerts
            </span>

            <strong>
              8
            </strong>
          </div>

        </div>

        <div className="admin-notification-summary-card">

          <div className="admin-notification-summary-icon">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>
              Risk Alerts
            </span>

            <strong>
              6
            </strong>
          </div>

        </div>

      </div>

      {/* ======================================================
          NOTIFICATION PANEL
      ====================================================== */}

      <div className="admin-notifications-panel">

        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <div className="admin-notifications-toolbar">

          {/* SEARCH */}

          <div className="admin-notification-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={
                handleSearchChange
              }
            />

          </div>

          {/* FILTER */}

          <div className="admin-notification-filters">

            <select
              value={notificationFilter}
              onChange={
                handleFilterChange
              }
              aria-label="Filter notifications"
            >
              <option value="all">
                All Notifications
              </option>

              <option value="unread">
                Unread
              </option>

              <option value="resource">
                Resource Alerts
              </option>

              <option value="risk">
                Risk Alerts
              </option>

              <option value="system">
                System Events
              </option>
            </select>

          </div>

        </div>

        {/* ====================================================
            NOTIFICATION LIST
        ==================================================== */}

        <div className="admin-notification-list">

          {paginatedNotifications.length > 0 ? (
            paginatedNotifications.map(
              (notification) => (

                <div
                  className={`admin-notification-item ${
                    notification.status === "unread"
                      ? "unread"
                      : ""
                  }`}
                  key={notification.id}
                >

                  {/* ICON */}

                  <div
                    className={`admin-notification-icon ${getNotificationClass(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="admin-notification-content">

                    <div className="admin-notification-title-row">

                      <strong>
                        {notification.title}
                      </strong>

                      {notification.status ===
                        "unread" && (
                        <span className="admin-unread-dot"></span>
                      )}

                    </div>

                    <p>
                      {notification.description}
                    </p>

                    <span className="admin-notification-time">
                      {notification.time}
                    </span>

                  </div>

                  {/* MARK AS READ */}

                  {notification.status ===
                  "unread" ? (
                    <button
                      type="button"
                      className="admin-notification-read"
                      title="Mark as read"
                      aria-label={`Mark ${notification.title} as read`}
                      onClick={() =>
                        handleMarkAsRead(
                          notification.id
                        )
                      }
                    >
                      <Check size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="admin-notification-read"
                      title="Already read"
                      aria-label={`${notification.title} is already read`}
                      disabled
                    >
                      <Check size={15} />
                    </button>
                  )}

                </div>

              )
            )
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color:
                  "var(--color-text-muted)",
                fontSize: "0.72rem",
              }}
            >
              No notifications found.
            </div>
          )}

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="admin-notifications-footer">

          <span>
            {filteredNotifications.length === 0
              ? "Showing 0 of 42 notifications"
              : `Showing ${
                  startIndex + 1
                }-${Math.min(
                  endIndex,
                  filteredNotifications.length
                )} of ${
                  filteredNotifications.length
                } notifications`}
          </span>

          <div className="admin-notifications-pagination">

            {/* PREVIOUS */}

            <button
              type="button"
              disabled={
                safeCurrentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  safeCurrentPage - 1
                )
              }
            >
              Previous
            </button>

            {/* PAGE NUMBERS */}

            {pageNumbers.map(
              (page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    safeCurrentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handlePageChange(page)
                  }
                >
                  {page}
                </button>
              )
            )}

            {/* NEXT */}

            <button
              type="button"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  safeCurrentPage + 1
                )
              }
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AdminNotifications;