import { useMemo, useState } from "react";

import {
  Search,
  Eye,
  X,
  Mail,
  CalendarDays,
  FolderKanban,
  FileChartColumn,
  Clock3,
} from "lucide-react";

import "./AdminUsers.css";

function AdminUsers() {
  // ============================================================
  // DEMO USERS
  // ============================================================

  const [users] = useState([
    {
      id: 1,
      name: "Ali Raza",
      email: "ali.raza@example.com",
      status: "Active",
      projects: 4,
      estimates: 12,
      registered: "08 Sep 2026",
      lastActivity: "Today, 10:42 AM",
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara.khan@example.com",
      status: "Active",
      projects: 2,
      estimates: 7,
      registered: "05 Sep 2026",
      lastActivity: "Today, 09:18 AM",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      status: "Inactive",
      projects: 1,
      estimates: 3,
      registered: "29 Aug 2026",
      lastActivity: "10 Sep 2026",
    },
    {
      id: 4,
      name: "Ayesha Malik",
      email: "ayesha.malik@example.com",
      status: "Active",
      projects: 6,
      estimates: 18,
      registered: "24 Aug 2026",
      lastActivity: "Today, 08:51 AM",
    },
    {
      id: 5,
      name: "Hamza Shah",
      email: "hamza.shah@example.com",
      status: "Active",
      projects: 3,
      estimates: 9,
      registered: "18 Aug 2026",
      lastActivity: "11 Sep 2026",
    },
    {
      id: 6,
      name: "Mariam Iqbal",
      email: "mariam.iqbal@example.com",
      status: "Inactive",
      projects: 2,
      estimates: 5,
      registered: "12 Aug 2026",
      lastActivity: "04 Sep 2026",
    },
  ]);

  // ============================================================
  // STATE
  // ============================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // ============================================================
  // FILTER USERS
  // ============================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // ============================================================
  // SUMMARY COUNTS
  // ============================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const newThisMonth = 4;

  // ============================================================
  // USER MODAL
  // ============================================================

  const openUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-users">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="admin-users-header">

        <div>
          <div className="admin-users-eyebrow">
            MANAGEMENT
          </div>

          <h1>Users</h1>

          <p>
            View registered users, account activity,
            projects, and estimation history.
          </p>
        </div>

      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="admin-user-stat-grid">

        <div className="admin-user-stat-card">

          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Total Users
            </span>

            <div className="admin-user-stat-icon">
              <FolderKanban size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {totalUsers}
          </div>

          <div className="admin-user-stat-footer">
            Registered accounts
          </div>

        </div>

        <div className="admin-user-stat-card">

          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Active Users
            </span>

            <div className="admin-user-stat-icon">
              <Clock3 size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {activeUsers}
          </div>

          <div className="admin-user-stat-footer">
            Currently active
          </div>

        </div>

        <div className="admin-user-stat-card">

          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              Inactive Users
            </span>

            <div className="admin-user-stat-icon">
              <Clock3 size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {inactiveUsers}
          </div>

          <div className="admin-user-stat-footer">
            No recent activity
          </div>

        </div>

        <div className="admin-user-stat-card">

          <div className="admin-user-stat-top">
            <span className="admin-user-stat-label">
              New This Month
            </span>

            <div className="admin-user-stat-icon">
              <CalendarDays size={18} />
            </div>
          </div>

          <div className="admin-user-stat-value">
            {newThisMonth}
          </div>

          <div className="admin-user-stat-footer">
            Newly registered users
          </div>

        </div>

      </div>

      {/* ======================================================
          USERS PANEL
      ====================================================== */}

      <section className="admin-users-panel">

        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <div className="admin-users-toolbar">

          <div className="admin-users-toolbar-left">

            <div className="admin-users-panel-title">
              <span>Registered Users</span>

              <small>
                {filteredUsers.length} users
              </small>
            </div>

          </div>

          <div className="admin-users-toolbar-right">

            {/* SEARCH */}

            <div className="admin-users-search">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            {/* STATUS FILTER */}

            <select
              className="admin-users-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

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

              {filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr key={user.id}>

                    {/* USER */}

                    <td>

                      <div className="admin-user-cell">

                        <div className="admin-user-avatar">
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
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

                    {/* STATUS */}

                    <td>

                      <span
                        className={`admin-user-status admin-user-status-${user.status.toLowerCase()}`}
                      >
                        <span className="admin-user-status-dot"></span>

                        {user.status}
                      </span>

                    </td>

                    {/* PROJECTS */}

                    <td>
                      <span className="admin-user-number">
                        {user.projects}
                      </span>
                    </td>

                    {/* ESTIMATES */}

                    <td>
                      <span className="admin-user-number">
                        {user.estimates}
                      </span>
                    </td>

                    {/* REGISTERED */}

                    <td>
                      <span className="admin-user-date">
                        {user.registered}
                      </span>
                    </td>

                    {/* LAST ACTIVITY */}

                    <td>
                      <span className="admin-user-date">
                        {user.lastActivity}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="admin-user-actions">

                        <button
                          className="admin-table-action"
                          title="View User"
                          onClick={() =>
                            openUser(user)
                          }
                        >
                          <Eye size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="admin-users-empty"
                  >
                    No users found matching your filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="admin-users-footer">

          <span>
            Showing {filteredUsers.length} of{" "}
            {totalUsers} users
          </span>

          <div className="admin-users-pagination">

            <button
              className="admin-pagination-button"
              disabled
            >
              Previous
            </button>

            <button className="admin-pagination-current">
              1
            </button>

            <button
              className="admin-pagination-button"
              disabled
            >
              Next
            </button>

          </div>

        </div>

      </section>

      {/* ======================================================
          USER DETAILS MODAL
      ====================================================== */}

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

            {/* MODAL HEADER */}

            <div className="admin-user-modal-header">

              <div>

                <div className="admin-user-modal-eyebrow">
                  USER DETAILS
                </div>

                <h2>
                  {selectedUser.name}
                </h2>

              </div>

              <button
                className="admin-user-modal-close"
                onClick={closeUserModal}
                title="Close"
              >
                <X size={18} />
              </button>

            </div>

            {/* PROFILE */}

            <div className="admin-user-modal-profile">

              <div className="admin-user-modal-avatar">
                {selectedUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3>
                  {selectedUser.name}
                </h3>

                <div className="admin-user-modal-email">
                  <Mail size={14} />
                  {selectedUser.email}
                </div>

                <span
                  className={`admin-user-status admin-user-status-${selectedUser.status.toLowerCase()}`}
                >
                  <span className="admin-user-status-dot"></span>

                  {selectedUser.status}
                </span>

              </div>

            </div>

            {/* DETAILS GRID */}

            <div className="admin-user-details-grid">

              <div className="admin-user-detail-card">

                <div className="admin-user-detail-icon">
                  <FolderKanban size={17} />
                </div>

                <div>
                  <span>Projects</span>

                  <strong>
                    {selectedUser.projects}
                  </strong>
                </div>

              </div>

              <div className="admin-user-detail-card">

                <div className="admin-user-detail-icon">
                  <FileChartColumn size={17} />
                </div>

                <div>
                  <span>Estimates</span>

                  <strong>
                    {selectedUser.estimates}
                  </strong>
                </div>

              </div>

              <div className="admin-user-detail-card">

                <div className="admin-user-detail-icon">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <span>Registered</span>

                  <strong>
                    {selectedUser.registered}
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
                    {selectedUser.lastActivity}
                  </strong>
                </div>

              </div>

            </div>

            {/* SYSTEM STATUS NOTE */}

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

            {/* MODAL ACTIONS */}

            <div className="admin-user-modal-actions">

              <button
                className="admin-user-modal-secondary"
                onClick={closeUserModal}
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