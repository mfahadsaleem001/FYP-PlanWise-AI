import {
  Activity,
  Search,
  UserPlus,
  LogIn,
  FolderPlus,
  Calculator,
  UserCheck,
  UserMinus,
  ShieldAlert,
  FileText,
  Clock3,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./AdminActivity.css";

function AdminActivity() {
  // ============================================================
  // DEMO ACTIVITY DATA
  // ============================================================

  const activities = [
    {
      id: 1,
      type: "user_registered",
      title: "New user registered",
      description: "Sara Khan created a new PlanWise account.",
      user: "Sara Khan",
      time: "10 minutes ago",
      date: "Sep 13, 2026",
      category: "user",
    },

    {
      id: 2,
      type: "estimate_generated",
      title: "Estimate generated",
      description:
        "An estimate was generated for AI Recommendation Engine.",
      user: "Sara Khan",
      time: "24 minutes ago",
      date: "Sep 13, 2026",
      category: "project",
    },

    {
      id: 3,
      type: "project_created",
      title: "Project created",
      description:
        "Customer Mobile App was added to the system.",
      user: "Ahmed Hassan",
      time: "48 minutes ago",
      date: "Sep 13, 2026",
      category: "project",
    },

    {
      id: 4,
      type: "employee_assigned",
      title: "Resource assigned",
      description:
        "Hassan Ali was assigned to PlanWise AI.",
      user: "Administrator",
      time: "1 hour ago",
      date: "Sep 13, 2026",
      category: "resource",
    },

    {
      id: 5,
      type: "risk_detected",
      title: "High-risk issue detected",
      description:
        "A resource availability risk was detected for AI Recommendation Engine.",
      user: "PlanWise System",
      time: "2 hours ago",
      date: "Sep 13, 2026",
      category: "system",
    },

    {
      id: 6,
      type: "login",
      title: "User signed in",
      description:
        "Mariam Iqbal signed in successfully.",
      user: "Mariam Iqbal",
      time: "3 hours ago",
      date: "Sep 13, 2026",
      category: "user",
    },

    {
      id: 7,
      type: "employee_released",
      title: "Resource released",
      description:
        "Danish Raza was released from E-Commerce Platform.",
      user: "Administrator",
      time: "4 hours ago",
      date: "Sep 13, 2026",
      category: "resource",
    },

    {
      id: 8,
      type: "report_generated",
      title: "Report generated",
      description:
        "Project estimation report was generated successfully.",
      user: "Ali Raza",
      time: "5 hours ago",
      date: "Sep 13, 2026",
      category: "system",
    },

    {
      id: 9,
      type: "estimate_generated",
      title: "Project estimate updated",
      description:
        "The estimation results for SaaS Analytics Platform were updated.",
      user: "Hina Malik",
      time: "6 hours ago",
      date: "Sep 13, 2026",
      category: "project",
    },

    {
      id: 10,
      type: "risk_detected",
      title: "Risk assessment completed",
      description:
        "Risk analysis was completed for Customer Mobile App.",
      user: "PlanWise System",
      time: "7 hours ago",
      date: "Sep 13, 2026",
      category: "system",
    },
  ];

  // ============================================================
  // STATE
  // ============================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);

  // 10 ACTIVITIES PER PAGE
  const activitiesPerPage = 10;

  // ============================================================
  // ACTIVITY ICON
  // ============================================================

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_registered":
        return <UserPlus size={17} />;

      case "login":
        return <LogIn size={17} />;

      case "project_created":
        return <FolderPlus size={17} />;

      case "estimate_generated":
        return <Calculator size={17} />;

      case "employee_assigned":
        return <UserCheck size={17} />;

      case "employee_released":
        return <UserMinus size={17} />;

      case "risk_detected":
        return <ShieldAlert size={17} />;

      case "report_generated":
        return <FileText size={17} />;

      default:
        return <Activity size={17} />;
    }
  };

  // ============================================================
  // ACTIVITY CLASS
  // ============================================================

  const getActivityClass = (type) => {
    switch (type) {
      case "user_registered":
        return "user";

      case "login":
        return "login";

      case "project_created":
        return "project";

      case "estimate_generated":
        return "estimate";

      case "employee_assigned":
        return "resource";

      case "employee_released":
        return "release";

      case "risk_detected":
        return "risk";

      case "report_generated":
        return "report";

      default:
        return "default";
    }
  };

  // ============================================================
  // FILTER ACTIVITIES
  // ============================================================

  const filteredActivities = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return activities.filter((activity) => {
      // --------------------------------------------------------
      // SEARCH
      // --------------------------------------------------------

      const matchesSearch =
        normalizedSearch === "" ||
        activity.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        activity.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        activity.user
          .toLowerCase()
          .includes(normalizedSearch);

      // --------------------------------------------------------
      // ACTIVITY FILTER
      // --------------------------------------------------------

      const matchesActivity =
        activityFilter === "all" ||
        activity.category === activityFilter;

      // --------------------------------------------------------
      // TIME FILTER
      // --------------------------------------------------------

      const demoToday = new Date(
        "2026-09-13T12:00:00"
      );

      const activityDate = new Date(
        activity.date
      );

      const startOfToday = new Date(
        demoToday
      );

      startOfToday.setHours(0, 0, 0, 0);

      const startOfWeek = new Date(
        demoToday
      );

      const currentDay =
        startOfWeek.getDay();

      const daysFromMonday =
        currentDay === 0
          ? 6
          : currentDay - 1;

      startOfWeek.setDate(
        startOfWeek.getDate() -
          daysFromMonday
      );

      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(
        demoToday.getFullYear(),
        demoToday.getMonth(),
        1
      );

      let matchesTime = true;

      if (timeFilter === "today") {
        matchesTime =
          activityDate >= startOfToday &&
          activityDate <= demoToday;
      }

      if (timeFilter === "week") {
        matchesTime =
          activityDate >= startOfWeek &&
          activityDate <= demoToday;
      }

      if (timeFilter === "month") {
        matchesTime =
          activityDate >= startOfMonth &&
          activityDate <= demoToday;
      }

      if (timeFilter === "all") {
        matchesTime = true;
      }

      return (
        matchesSearch &&
        matchesActivity &&
        matchesTime
      );
    });
  }, [
    searchTerm,
    activityFilter,
    timeFilter,
  ]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredActivities.length /
        activitiesPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    activitiesPerPage;

  const endIndex =
    startIndex + activitiesPerPage;

  const paginatedActivities =
    filteredActivities.slice(
      startIndex,
      endIndex
    );

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // ============================================================
  // ACTIVITY DROPDOWN
  // ============================================================

  const handleActivityFilterChange = (
    event
  ) => {
    setActivityFilter(event.target.value);
    setCurrentPage(1);
  };

  // ============================================================
  // TIME DROPDOWN
  // ============================================================

  const handleTimeFilterChange = (
    event
  ) => {
    setTimeFilter(event.target.value);
    setCurrentPage(1);
  };

  // ============================================================
  // PAGINATION
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

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <section className="admin-activity">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="admin-page-header">
        <div className="admin-page-header-content">
          <span className="admin-page-eyebrow">
            SYSTEM
          </span>

          <h1>
            Activity Logs
          </h1>

          <p>
            Monitor important user, project,
            resource, estimation, and system
            activities across PlanWise.
          </p>
        </div>
      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="admin-activity-summary">

        <div className="admin-activity-summary-card">
          <div className="admin-activity-summary-icon">
            <Activity size={18} />
          </div>

          <div>
            <span>
              Total Activities
            </span>

            <strong>
              1,842
            </strong>
          </div>
        </div>

        <div className="admin-activity-summary-card">
          <div className="admin-activity-summary-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>
              Today
            </span>

            <strong>
              126
            </strong>
          </div>
        </div>

        <div className="admin-activity-summary-card">
          <div className="admin-activity-summary-icon">
            <UserPlus size={18} />
          </div>

          <div>
            <span>
              User Activities
            </span>

            <strong>
              74
            </strong>
          </div>
        </div>

        <div className="admin-activity-summary-card">
          <div className="admin-activity-summary-icon">
            <ShieldAlert size={18} />
          </div>

          <div>
            <span>
              System Events
            </span>

            <strong>
              18
            </strong>
          </div>
        </div>

      </div>

      {/* ======================================================
          ACTIVITY PANEL
      ====================================================== */}

      <div className="admin-activity-panel">

        {/* ====================================================
            TOOLBAR
        ==================================================== */}

        <div className="admin-activity-toolbar">

          {/* SEARCH */}

          <div className="admin-activity-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={
                handleSearchChange
              }
            />
          </div>

          {/* FILTERS */}

          <div className="admin-activity-filters">

            {/* ACTIVITY TYPE */}

            <select
              value={activityFilter}
              onChange={
                handleActivityFilterChange
              }
              aria-label="Filter activities by type"
            >
              <option value="all">
                All Activity
              </option>

              <option value="user">
                User Activity
              </option>

              <option value="project">
                Project Activity
              </option>

              <option value="resource">
                Resource Activity
              </option>

              <option value="system">
                System Activity
              </option>
            </select>

            {/* TIME PERIOD */}

            <select
              value={timeFilter}
              onChange={
                handleTimeFilterChange
              }
              aria-label="Filter activities by time"
            >
              <option value="today">
                Today
              </option>

              <option value="week">
                This Week
              </option>

              <option value="month">
                This Month
              </option>

              <option value="all">
                All Time
              </option>
            </select>

          </div>
        </div>

        {/* ====================================================
            ACTIVITY LIST
        ==================================================== */}

        <div className="admin-activity-list">

          {paginatedActivities.length > 0 ? (

            paginatedActivities.map(
              (activity) => (
                <div
                  className="admin-activity-item"
                  key={activity.id}
                >

                  <div
                    className={`admin-activity-icon ${getActivityClass(
                      activity.type
                    )}`}
                  >
                    {getActivityIcon(
                      activity.type
                    )}
                  </div>

                  <div className="admin-activity-content">

                    <div className="admin-activity-main">

                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.description}
                      </span>

                    </div>

                    <div className="admin-activity-meta">

                      <span>
                        By {activity.user}
                      </span>

                      <span className="admin-activity-dot">
                        •
                      </span>

                      <span>
                        {activity.date}
                      </span>

                    </div>

                  </div>

                  <div className="admin-activity-time">

                    <Clock3 size={14} />

                    <span>
                      {activity.time}
                    </span>

                  </div>

                </div>
              )
            )

          ) : (

            <div
              className="admin-activity-empty"
              style={{
                padding: "2rem",
                textAlign: "center",
                color:
                  "var(--color-text-muted)",
                fontSize: "0.72rem",
              }}
            >
              No activities found.
            </div>

          )}

        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="admin-activity-footer">

          <span>
            {filteredActivities.length === 0
              ? "Showing 0 of 1,842 activities"
              : `Showing ${
                  startIndex + 1
                }-${Math.min(
                  endIndex,
                  filteredActivities.length
                )} of ${
                  filteredActivities.length
                } activities`}
          </span>

          <div className="admin-activity-pagination">

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

export default AdminActivity;