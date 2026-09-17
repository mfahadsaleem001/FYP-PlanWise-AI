import {
  Bell,
  CheckCheck,
  CircleAlert,
  Clock3,
  FolderKanban,
  ListTodo,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./EmployeeNotifications.css";

function EmployeeNotifications() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "task",
      title: "Task assigned to you",
      message:
        "Build Course Management API has been assigned to you in AI Learning Platform.",
      project: "AI Learning Platform",
      time: "12 minutes ago",
      unread: true,
      icon: ListTodo,
    },
    {
      id: 2,
      type: "message",
      title: "New message from Project Admin",
      message:
        "Please update the Course Management API progress before the next review.",
      project: "AI Learning Platform",
      time: "38 minutes ago",
      unread: true,
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "deadline",
      title: "Task deadline approaching",
      message:
        "Build Course Management API is due on September 20, 2026.",
      project: "AI Learning Platform",
      time: "2 hours ago",
      unread: true,
      icon: Clock3,
    },
    {
      id: 4,
      type: "project",
      title: "Project milestone updated",
      message:
        "Development milestone progress has been updated to 68%.",
      project: "AI Learning Platform",
      time: "Yesterday",
      unread: false,
      icon: FolderKanban,
    },
    {
      id: 5,
      type: "message",
      title: "New team message",
      message:
        "Sara Ahmed shared the latest dashboard design updates with the project team.",
      project: "AI Learning Platform",
      time: "Yesterday",
      unread: false,
      icon: MessageSquare,
    },
    {
      id: 6,
      type: "task",
      title: "Task status updated",
      message:
        "The Checkout API Integration task has moved to In Progress.",
      project: "E-Commerce Marketplace",
      time: "Sep 14, 2026",
      unread: false,
      icon: ListTodo,
    },
    {
      id: 7,
      type: "project",
      title: "Project assignment confirmed",
      message:
        "You are assigned as Backend Developer for E-Commerce Marketplace.",
      project: "E-Commerce Marketplace",
      time: "Sep 13, 2026",
      unread: false,
      icon: ShieldCheck,
    },
    {
      id: 8,
      type: "deadline",
      title: "Upcoming project deadline",
      message:
        "Company Management Portal has an upcoming project deadline on December 12, 2026.",
      project: "Company Management Portal",
      time: "Sep 12, 2026",
      unread: false,
      icon: CircleAlert,
    },
  ]);

  const filters = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Unread",
      value: "Unread",
    },
    {
      label: "Tasks",
      value: "task",
    },
    {
      label: "Messages",
      value: "message",
    },
    {
      label: "Projects",
      value: "project",
    },
  ];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (activeFilter === "All") {
        return true;
      }

      if (activeFilter === "Unread") {
        return notification.unread;
      }

      return notification.type === activeFilter;
    });
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  };

  return (
    <section className="employee-notifications-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="employee-notifications-header">

        <div>

          <span className="employee-notifications-eyebrow">
            ACCOUNT
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with assignments, project activity,
            messages, and upcoming deadlines.
          </p>

        </div>


        {unreadCount > 0 && (
          <button
            type="button"
            className="employee-notifications-mark-all"
            onClick={markAllAsRead}
          >
            <CheckCheck />

            <span>
              Mark all as read
            </span>
          </button>
        )}

      </header>


      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="employee-notifications-summary">

        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon">
            <Bell />
          </div>

          <div>

            <span>
              TOTAL NOTIFICATIONS
            </span>

            <strong>
              {notifications.length}
            </strong>

          </div>

        </div>


        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon unread">
            <CircleAlert />
          </div>

          <div>

            <span>
              UNREAD
            </span>

            <strong>
              {unreadCount}
            </strong>

          </div>

        </div>


        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon">
            <FolderKanban />
          </div>

          <div>

            <span>
              ACTIVE PROJECTS
            </span>

            <strong>
              3
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          NOTIFICATION CONTENT
          ===================================================== */}

      <section className="employee-notifications-section">

        <div className="employee-notifications-section-header">

          <div>

            <span className="employee-notifications-section-eyebrow">
              ACTIVITY
            </span>

            <h2>
              Recent Notifications
            </h2>

          </div>


          <span className="employee-notifications-count">
            {filteredNotifications.length} notifications
          </span>

        </div>


        {/* FILTERS */}

        <div className="employee-notifications-filters">

          {filters.map((filter) => (

            <button
              type="button"
              key={filter.value}
              className={
                activeFilter === filter.value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter.value)
              }
            >
              {filter.label}

              {filter.value === "Unread" &&
                unreadCount > 0 && (
                  <span>
                    {unreadCount}
                  </span>
                )}

            </button>

          ))}

        </div>


        {/* NOTIFICATION LIST */}

        <div className="employee-notifications-list">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(
              (notification) => {

                const NotificationIcon =
                  notification.icon;

                return (
                  <article
                    className={`employee-notification-item ${
                      notification.unread
                        ? "unread"
                        : ""
                    }`}
                    key={notification.id}
                  >

                    <div
                      className={`employee-notification-icon ${notification.type}`}
                    >
                      <NotificationIcon />
                    </div>


                    <div className="employee-notification-content">

                      <div className="employee-notification-top">

                        <div>

                          <strong>
                            {notification.title}
                          </strong>

                          {notification.unread && (
                            <span className="employee-notification-new">
                              NEW
                            </span>
                          )}

                        </div>

                        <span className="employee-notification-time">
                          {notification.time}
                        </span>

                      </div>


                      <p>
                        {notification.message}
                      </p>


                      <div className="employee-notification-bottom">

                        <span className="employee-notification-project">
                          <FolderKanban />

                          {notification.project}
                        </span>


                        {notification.unread && (
                          <button
                            type="button"
                            className="employee-notification-read"
                            onClick={() =>
                              markAsRead(
                                notification.id
                              )
                            }
                          >
                            Mark as read
                          </button>
                        )}

                      </div>

                    </div>


                    <button
                      type="button"
                      className="employee-notification-remove"
                      title="Remove notification"
                      onClick={() =>
                        removeNotification(
                          notification.id
                        )
                      }
                    >
                      <X />
                    </button>

                  </article>
                );
              }
            )
          ) : (

            <div className="employee-notifications-empty">

              <div className="employee-notifications-empty-icon">
                <Bell />
              </div>

              <h3>
                No notifications found
              </h3>

              <p>
                There are no notifications matching the
                selected filter.
              </p>

            </div>

          )}

        </div>

      </section>

    </section>
  );
}

export default EmployeeNotifications;