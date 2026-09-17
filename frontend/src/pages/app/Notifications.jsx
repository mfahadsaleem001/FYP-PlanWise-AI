import { useState } from "react";

import {
  Bell,
  CheckCheck,
  AlertTriangle,
  FileText,
  BarChart3,
  Users,
  CircleAlert,
  CheckCircle2,
  X,
} from "lucide-react";

import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Project analysis completed",
      message:
        "The estimation and planning analysis for AI Learning Platform has been completed successfully.",
      time: "10 minutes ago",
      read: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: "warning",
      title: "Resource gap detected",
      message:
        "The current project plan requires 2 additional resources to meet the recommended team requirements.",
      time: "1 hour ago",
      read: false,
      icon: Users,
    },
    {
      id: 3,
      type: "risk",
      title: "High project risk identified",
      message:
        "Insufficient Development Capacity has been identified as a high-severity project risk.",
      time: "3 hours ago",
      read: false,
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "report",
      title: "Project report generated",
      message:
        "The complete project estimation and planning report for AI Learning Platform is ready.",
      time: "Yesterday",
      read: true,
      icon: FileText,
    },
    {
      id: 5,
      type: "analysis",
      title: "Estimation updated",
      message:
        "The project estimation has been updated with the latest analysis results.",
      time: "Yesterday",
      read: true,
      icon: BarChart3,
    },
    {
      id: 6,
      type: "risk",
      title: "Requirement change risk",
      message:
        "Potential requirement changes may affect the estimated project timeline.",
      time: "2 days ago",
      read: true,
      icon: CircleAlert,
    },
  ]);

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleViewNotification = (notification) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) =>
        item.id === notification.id
          ? { ...item, read: true }
          : item
      )
    );

    setSelectedNotification({
      ...notification,
      read: true,
    });
  };

  const closeNotificationModal = () => {
    setSelectedNotification(null);
  };

  const getNotificationTypeLabel = (type) => {
    const labels = {
      success: "Project Update",
      warning: "Resource Alert",
      risk: "Risk Alert",
      report: "Report Update",
      analysis: "Analysis Update",
    };

    return labels[type] || "Notification";
  };

  return (
    <div className="notifications-page">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="notifications-header">
        <div>
          <span className="page-eyebrow">
            ACCOUNT ACTIVITY
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with project analysis, risks,
            resources, estimates, and generated reports.
          </p>
        </div>

        <button
          type="button"
          className="mark-all-btn"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={17} />
          {unreadCount === 0
            ? "All notifications read"
            : "Mark all as read"}
        </button>
      </div>

      {/* =====================================================
          NOTIFICATION SUMMARY
          ===================================================== */}

      <div className="notifications-summary">
        <div className="notification-summary-card">
          <div className="notification-summary-icon">
            <Bell size={20} />
          </div>

          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="notification-summary-icon unread-icon">
            <CircleAlert size={20} />
          </div>

          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="notification-summary-icon">
            <CheckCheck size={20} />
          </div>

          <div>
            <span>Read</span>

            <strong>
              {notifications.length - unreadCount}
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          NOTIFICATION LIST
          ===================================================== */}

      <section className="notifications-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              RECENT ACTIVITY
            </span>

            <h2>Recent Notifications</h2>

            <p>
              Important updates related to your projects
              and planning activity.
            </p>
          </div>
        </div>

        <div className="notification-list">
          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                className={`notification-card ${
                  notification.read ? "read" : "unread"
                }`}
                key={notification.id}
              >
                <div
                  className={`notification-icon ${notification.type}`}
                >
                  <Icon size={19} />
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                <button
                  type="button"
                  className="notification-view-btn"
                  onClick={() =>
                    handleViewNotification(notification)
                  }
                >
                  View
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          INFORMATION
          ===================================================== */}

      <div className="notifications-info">
        <div className="notifications-info-icon">
          <Bell size={20} />
        </div>

        <div>
          <strong>
            Intelligent Project Alerts
          </strong>

          <p>
            Notifications will later be generated dynamically
            when project analysis, estimation, risk detection,
            resource planning, or report generation events occur.
          </p>
        </div>
      </div>

      {/* =====================================================
          NOTIFICATION DETAILS MODAL
          ===================================================== */}

      {selectedNotification && (
        <div
          className="notification-modal-overlay"
          onClick={closeNotificationModal}
        >
          <div
            className="notification-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="notification-modal-header">
              <div className="notification-modal-title">
                <div
                  className={`notification-modal-icon ${selectedNotification.type}`}
                >
                  {(() => {
                    const ModalIcon =
                      selectedNotification.icon;

                    return <ModalIcon size={21} />;
                  })()}
                </div>

                <div>
                  <span>NOTIFICATION DETAILS</span>
                  <h2>{selectedNotification.title}</h2>
                </div>
              </div>

              <button
                type="button"
                className="notification-modal-close"
                onClick={closeNotificationModal}
                aria-label="Close notification details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="notification-modal-body">
              <div className="notification-modal-meta">
                <div>
                  <span>TYPE</span>
                  <strong>
                    {getNotificationTypeLabel(
                      selectedNotification.type
                    )}
                  </strong>
                </div>

                <div>
                  <span>TIME</span>
                  <strong>
                    {selectedNotification.time}
                  </strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong className="notification-read-status">
                    <CheckCircle2 size={15} />
                    Read
                  </strong>
                </div>
              </div>

              <div className="notification-modal-message">
                <span>MESSAGE</span>

                <p>
                  {selectedNotification.message}
                </p>
              </div>

              <div className="notification-modal-note">
                <Bell size={17} />

                <p>
                  This notification is related to your
                  PlanWise project analysis and planning
                  activity.
                </p>
              </div>
            </div>

            <div className="notification-modal-footer">
              <button
                type="button"
                className="notification-modal-close-btn"
                onClick={closeNotificationModal}
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

export default Notifications;