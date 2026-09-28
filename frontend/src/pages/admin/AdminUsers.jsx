import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  Mail,
  CalendarDays,
  FolderKanban,
  FileChartColumn,
  Clock3,
  History,
  Loader2,
  AlertCircle,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import "./AdminUsers.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [activities, setActivities] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const [usersError, setUsersError] = useState("");
  const [activityError, setActivityError] = useState("");

  const getAccessToken = () => {
    return localStorage.getItem("planwise_access_token");
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUsersError("");

    try {
      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found. Please sign in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your admin session has expired. Please sign in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You are not authorized to view users."
          );
        }

        throw new Error("Failed to load users.");
      }

      const data = await response.json();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      setUsersError(
        error.message ||
          "Something went wrong while loading users."
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId) => {
    setUsersError("");

    try {
      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your admin session has expired."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You are not authorized to view user details."
          );
        }

        if (response.status === 404) {
          throw new Error("User not found.");
        }

        throw new Error(
          "Failed to load user details."
        );
      }

      const data = await response.json();

      setSelectedUser(data);
      setShowUserModal(true);
    } catch (error) {
      setUsersError(
        error.message ||
          "Unable to load user details."
      );
    }
  };

  const fetchUserActivities = async (user) => {
    setSelectedUser(user);
    setShowActivityModal(true);
    setLoadingActivity(true);
    setActivityError("");
    setActivities([]);

    try {
      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/${user.id}/activities`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your admin session has expired."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You are not authorized to view activity history."
          );
        }

        if (response.status === 404) {
          throw new Error("User not found.");
        }

        throw new Error(
          "Failed to load user activity history."
        );
      }

      const data = await response.json();

      setActivities(Array.isArray(data) ? data : []);
    } catch (error) {
      setActivityError(
        error.message ||
          "Unable to load activity history."
      );
    } finally {
      setLoadingActivity(false);
    }
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

  const closeActivityModal = () => {
    setSelectedUser(null);
    setShowActivityModal(false);
    setActivities([]);
    setActivityError("");
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatActivityAction = (action) => {
    if (!action) {
      return "Activity";
    }

    return action
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return users.filter((user) => {
      const name =
        user.name?.toLowerCase() || "";

      const email =
        user.email?.toLowerCase() || "";

      const matchesSearch =
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch);

      const normalizedStatus =
        user.status?.toLowerCase() || "";

      const matchesStatus =
        statusFilter === "All Status" ||
        normalizedStatus ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [users, search, statusFilter]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) =>
      user.status?.toLowerCase() === "active"
  ).length;

  const inactiveUsers = users.filter(
    (user) =>
      user.status?.toLowerCase() === "inactive"
  ).length;

  const newThisMonth = useMemo(() => {
    const now = new Date();

    return users.filter((user) => {
      if (!user.created_at) {
        return false;
      }

      const createdAt = new Date(
        user.created_at
      );

      return (
        createdAt.getMonth() ===
          now.getMonth() &&
        createdAt.getFullYear() ===
          now.getFullYear()
      );
    }).length;
  }, [users]);

  return (
    <div className="admin-users">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="admin-users-header admin-users-animate">
        <div className="admin-users-header-content">
          <span className="admin-users-eyebrow">
            MANAGEMENT
          </span>

          <h1>Users</h1>

          <p>
            View registered users, account activity,
            projects, and estimation history.
          </p>
        </div>

        <button
          type="button"
          className="admin-users-refresh-button"
          onClick={fetchUsers}
          disabled={loadingUsers}
          title="Refresh users"
        >
          <RefreshCw
            size={16}
            className={
              loadingUsers
                ? "admin-users-spin"
                : ""
            }
          />

          <span>
            {loadingUsers
              ? "Refreshing..."
              : "Refresh"}
          </span>
        </button>
      </header>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {usersError && (
        <div className="admin-users-error admin-users-animate">
          <div className="admin-users-error-icon">
            <AlertCircle size={18} />
          </div>

          <div className="admin-users-error-content">
            <strong>
              Unable to load users
            </strong>

            <span>{usersError}</span>
          </div>

          <button
            type="button"
            onClick={fetchUsers}
          >
            Try again
          </button>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <section className="admin-user-stat-grid">
        <div className="admin-user-stat-card admin-users-animate">
          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Total Users
            </span>

            <div className="admin-user-stat-icon">
              <Users size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {loadingUsers ? (
              <Loader2
                size={22}
                className="admin-users-spin"
              />
            ) : (
              totalUsers
            )}
          </div>

          <div className="admin-user-stat-footer">
            Registered accounts
          </div>
        </div>

        <div className="admin-user-stat-card admin-users-animate">
          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Active Users
            </span>

            <div className="admin-user-stat-icon">
              <UserCheck size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {loadingUsers ? (
              <Loader2
                size={22}
                className="admin-users-spin"
              />
            ) : (
              activeUsers
            )}
          </div>

          <div className="admin-user-stat-footer">
            Currently active
          </div>
        </div>

        <div className="admin-user-stat-card admin-users-animate">
          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Inactive Users
            </span>

            <div className="admin-user-stat-icon">
              <UserX size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {loadingUsers ? (
              <Loader2
                size={22}
                className="admin-users-spin"
              />
            ) : (
              inactiveUsers
            )}
          </div>

          <div className="admin-user-stat-footer">
            Currently inactive
          </div>
        </div>

        <div className="admin-user-stat-card admin-users-animate">
          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              New This Month
            </span>

            <div className="admin-user-stat-icon">
              <CalendarDays size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {loadingUsers ? (
              <Loader2
                size={22}
                className="admin-users-spin"
              />
            ) : (
              newThisMonth
            )}
          </div>

          <div className="admin-user-stat-footer">
            Newly registered users
          </div>
        </div>
      </section>

      {/* =====================================================
          USERS PANEL
      ===================================================== */}

      <section className="admin-users-panel admin-users-animate">
        <div className="admin-users-toolbar">
          <div className="admin-users-toolbar-left">
            <div className="admin-users-panel-title">
              <span>Registered Users</span>

              <small>
                {loadingUsers
                  ? "Loading..."
                  : `${filteredUsers.length} ${
                      filteredUsers.length === 1
                        ? "user"
                        : "users"
                    }`}
              </small>
            </div>
          </div>

          <div className="admin-users-toolbar-right">
            <div className="admin-users-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />
            </div>

            <select
              className="admin-users-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="admin-users-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Projects</th>
                <th>Estimates</th>
                <th>Registered</th>
                <th>Last Activity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loadingUsers ? (
                <tr>
                  <td
                    colSpan="7"
                    className="admin-users-loading"
                  >
                    <Loader2
                      size={24}
                      className="admin-users-spin"
                    />

                    <span>
                      Loading registered users...
                    </span>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(
                  (user, index) => {
                    const normalizedStatus =
                      user.status?.toLowerCase() ||
                      "";

                    return (
                      <tr
                        key={user.id}
                        className="admin-user-table-row"
                        style={{
                          "--row-index": index,
                        }}
                      >
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-user-avatar">
                              {user.name
                                ?.charAt(0)
                                .toUpperCase() ||
                                "U"}
                            </div>

                            <div className="admin-user-info">
                              <strong>
                                {user.name}
                              </strong>

                              <span>
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`admin-user-status admin-user-status-${normalizedStatus}`}
                          >
                            <span className="admin-user-status-dot" />

                            {user.status}
                          </span>
                        </td>

                        <td>
                          <span className="admin-user-number">
                            {user.projects ??
                              "—"}
                          </span>
                        </td>

                        <td>
                          <span className="admin-user-number admin-user-muted-value">
                            —
                          </span>
                        </td>

                        <td>
                          <span className="admin-user-date">
                            {formatDate(
                              user.created_at
                            )}
                          </span>
                        </td>

                        <td>
                          <span className="admin-user-date">
                            {formatDateTime(
                              user.last_activity
                            )}
                          </span>
                        </td>

                        <td>
                          <div className="admin-user-actions">
                            <button
                              type="button"
                              className="admin-table-action"
                              title="View User"
                              onClick={() =>
                                fetchUserDetails(
                                  user.id
                                )
                              }
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              type="button"
                              className="admin-table-action admin-table-action-history"
                              title="View Activity History"
                              onClick={() =>
                                fetchUserActivities(
                                  user
                                )
                              }
                            >
                              <History size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="admin-users-empty"
                  >
                    <Users size={28} />

                    <strong>
                      No users found
                    </strong>

                    <span>
                      Try changing your search
                      or status filter.
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-users-footer">
          <span>
            Showing{" "}
            <strong>
              {filteredUsers.length}
            </strong>{" "}
            of{" "}
            <strong>{totalUsers}</strong>{" "}
            users
          </span>

          <div className="admin-users-pagination">
            <button
              type="button"
              className="admin-pagination-button"
              disabled
            >
              Previous
            </button>

            <button
              type="button"
              className="admin-pagination-current"
            >
              1
            </button>

            <button
              type="button"
              className="admin-pagination-button"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          USER DETAILS MODAL
      ===================================================== */}

      {showUserModal && selectedUser && (
        <div
          className="admin-user-modal-overlay"
          onClick={closeUserModal}
        >
          <div
            className="admin-user-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-user-modal-header">
              <div>
                <span className="admin-user-modal-eyebrow">
                  USER DETAILS
                </span>

                <h2>
                  {selectedUser.name}
                </h2>
              </div>

              <button
                type="button"
                className="admin-user-modal-close"
                onClick={closeUserModal}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-user-modal-profile">
              <div className="admin-user-modal-avatar">
                {selectedUser.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="admin-user-modal-profile-info">
                <h3>
                  {selectedUser.name}
                </h3>

                <div className="admin-user-modal-email">
                  <Mail size={14} />

                  <span>
                    {selectedUser.email}
                  </span>
                </div>

                <span
                  className={`admin-user-status admin-user-status-${selectedUser.status?.toLowerCase()}`}
                >
                  <span className="admin-user-status-dot" />

                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className="admin-user-details-grid">
              <div className="admin-user-detail-card">
                <div className="admin-user-detail-icon">
                  <FolderKanban size={17} />
                </div>

                <div>
                  <span>Projects</span>

                  <strong>
                    {selectedUser.projects ??
                      "—"}
                  </strong>
                </div>
              </div>

              <div className="admin-user-detail-card">
                <div className="admin-user-detail-icon">
                  <FileChartColumn size={17} />
                </div>

                <div>
                  <span>Estimates</span>

                  <strong>—</strong>
                </div>
              </div>

              <div className="admin-user-detail-card">
                <div className="admin-user-detail-icon">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <span>Registered</span>

                  <strong>
                    {formatDate(
                      selectedUser.created_at
                    )}
                  </strong>
                </div>
              </div>

              <div className="admin-user-detail-card">
                <div className="admin-user-detail-icon">
                  <Clock3 size={17} />
                </div>

                <div>
                  <span>Last Activity</span>

                  <strong>
                    {formatDateTime(
                      selectedUser.last_activity
                    )}
                  </strong>
                </div>
              </div>
            </div>

            <div className="admin-user-status-note">
              <div className="admin-user-status-note-title">
                Account Status
              </div>

              <p>
                User status is determined by
                system activity and backend
                records. Administrators can view
                the current status but cannot
                manually activate or deactivate
                user accounts from this panel.
              </p>
            </div>

            <div className="admin-user-modal-actions">
              <button
                type="button"
                className="admin-user-modal-primary"
                onClick={() =>
                  fetchUserActivities(
                    selectedUser
                  )
                }
              >
                <History size={15} />
                View Activity
              </button>

              <button
                type="button"
                className="admin-user-modal-secondary"
                onClick={closeUserModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ACTIVITY HISTORY MODAL
      ===================================================== */}

      {showActivityModal && selectedUser && (
        <div
          className="admin-user-modal-overlay"
          onClick={closeActivityModal}
        >
          <div
            className="admin-user-activity-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-user-modal-header">
              <div>
                <span className="admin-user-modal-eyebrow">
                  ACTIVITY HISTORY
                </span>

                <h2>
                  {selectedUser.name}
                </h2>
              </div>

              <button
                type="button"
                className="admin-user-modal-close"
                onClick={closeActivityModal}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-user-activity-summary">
              <div className="admin-user-modal-avatar">
                {selectedUser.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {selectedUser.name}
                </strong>

                <span>
                  {selectedUser.email}
                </span>
              </div>
            </div>

            <div className="admin-user-activity-content">
              {loadingActivity ? (
                <div className="admin-users-loading">
                  <Loader2
                    size={24}
                    className="admin-users-spin"
                  />

                  <span>
                    Loading activity history...
                  </span>
                </div>
              ) : activityError ? (
                <div className="admin-users-empty">
                  <AlertCircle size={28} />

                  <strong>
                    Unable to load activity
                  </strong>

                  <span>
                    {activityError}
                  </span>
                </div>
              ) : activities.length > 0 ? (
                <div className="admin-user-activity-list">
                  {activities.map(
                    (activity, index) => (
                      <div
                        className="admin-user-activity-item"
                        key={activity.id}
                        style={{
                          "--activity-index":
                            index,
                        }}
                      >
                        <div className="admin-user-activity-marker">
                          <History size={15} />
                        </div>

                        <div className="admin-user-activity-body">
                          <div className="admin-user-activity-top">
                            <strong>
                              {formatActivityAction(
                                activity.action
                              )}
                            </strong>

                            <time>
                              {formatDateTime(
                                activity.created_at
                              )}
                            </time>
                          </div>

                          <p>
                            {
                              activity.description
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="admin-users-empty">
                  <History size={30} />

                  <strong>
                    No activity recorded yet
                  </strong>

                  <span>
                    This user has no recorded
                    activity history.
                  </span>
                </div>
              )}
            </div>

            <div className="admin-user-modal-actions">
              <button
                type="button"
                className="admin-user-modal-secondary"
                onClick={closeActivityModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;