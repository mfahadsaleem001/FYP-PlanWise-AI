import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Flag,
  FolderKanban,
  MessageSquare,
  Milestone,
  UserRound,
} from "lucide-react";

import "./EmployeeTaskDetails.css";

function EmployeeTaskDetails() {
  const [progress, setProgress] = useState(72);

  const task = {
    id: 1,
    title: "Build Course Management API",
    project: "AI Learning Platform",
    projectType: "AI / Machine Learning",
    status: "In Progress",
    priority: "High",
    deadline: "September 20, 2026",
    milestone: "Development",
    assignee: "Fahad",
    role: "Backend Developer",
    description:
      "Develop the backend APIs required for course creation, course management, instructor operations, and course data retrieval. The implementation should follow the project's API structure, validation rules, authentication requirements, and database design.",
  };

  const updates = [
    {
      title: "Course creation endpoint completed",
      detail:
        "POST /courses endpoint and request validation implemented.",
      time: "Today, 10:30 AM",
    },
    {
      title: "Course retrieval API updated",
      detail:
        "Added filtering and pagination support for course listings.",
      time: "Yesterday, 4:15 PM",
    },
    {
      title: "Task started",
      detail:
        "Task assigned as part of the Development milestone.",
      time: "Sep 10, 2026",
    },
  ];

  const checklist = [
    {
      title: "Create course API structure",
      completed: true,
    },
    {
      title: "Implement course creation endpoint",
      completed: true,
    },
    {
      title: "Implement course retrieval endpoints",
      completed: true,
    },
    {
      title: "Add update and delete operations",
      completed: false,
    },
    {
      title: "Add API validation and error handling",
      completed: false,
    },
    {
      title: "Test course management endpoints",
      completed: false,
    },
  ];

  return (
    <section className="employee-task-details-page">

      {/* =====================================================
          BACK NAVIGATION
          ===================================================== */}

      <a
        href="/employee/tasks"
        className="employee-task-details-back"
      >
        <ArrowLeft />
        <span>Back to My Tasks</span>
      </a>


      {/* =====================================================
          TASK HEADER
          ===================================================== */}

      <header className="employee-task-details-header">

        <div className="employee-task-title-area">

          <div className="employee-task-title-icon">
            <CheckCircle2 />
          </div>

          <div>

            <span className="employee-task-eyebrow">
              TASK DETAILS
            </span>

            <h1>{task.title}</h1>

            <p>
              Part of{" "}
              <a href="/employee/projects/1">
                {task.project}
              </a>
            </p>

          </div>

        </div>


        <div className="employee-task-header-status">

          <span className="employee-task-status">
            {task.status}
          </span>

          <span
            className={`employee-task-priority ${task.priority.toLowerCase()}`}
          >
            {task.priority} Priority
          </span>

        </div>

      </header>


      {/* =====================================================
          TASK SUMMARY
          ===================================================== */}

      <div className="employee-task-summary-grid">

        {/* TASK PROGRESS */}

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-heading">

            <div className="employee-task-summary-icon">
              <CheckCircle2 />
            </div>

            <span>TASK PROGRESS</span>

          </div>


          <div className="employee-task-summary-value">

            <strong>{progress}%</strong>

            <span>Complete</span>

          </div>


          <div className="employee-task-progress-track">

            <div
              className="employee-task-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>


        {/* DEADLINE */}

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-heading">

            <div className="employee-task-summary-icon">
              <CalendarDays />
            </div>

            <span>DEADLINE</span>

          </div>


          <strong className="employee-task-summary-value-text">
            {task.deadline}
          </strong>


          <span className="employee-task-summary-description">
            Task completion date
          </span>

        </div>


        {/* MILESTONE */}

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-heading">

            <div className="employee-task-summary-icon">
              <Milestone />
            </div>

            <span>MILESTONE</span>

          </div>


          <strong className="employee-task-summary-value-text">
            {task.milestone}
          </strong>


          <span className="employee-task-summary-description">
            Current project phase
          </span>

        </div>


        {/* ASSIGNED TO */}

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-heading">

            <div className="employee-task-summary-icon">
              <UserRound />
            </div>

            <span>ASSIGNED TO</span>

          </div>


          <strong className="employee-task-summary-value-text">
            {task.assignee}
          </strong>


          <span className="employee-task-summary-description">
            {task.role}
          </span>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="employee-task-details-main-grid">


        {/* ===================================================
            TASK OVERVIEW
            =================================================== */}

        <section className="employee-task-section">

          <div className="employee-task-section-heading">

            <div>

              <span className="employee-task-eyebrow">
                DESCRIPTION
              </span>

              <h2>Task Overview</h2>

            </div>

          </div>


          <p className="employee-task-description">
            {task.description}
          </p>


          {/* TASK INFORMATION */}

          <div className="employee-task-info-grid">

            <div className="employee-task-info-item">

              <div className="employee-task-info-icon">
                <FolderKanban />
              </div>

              <div>

                <span>Project</span>

                <strong>
                  {task.project}
                </strong>

              </div>

            </div>


            <div className="employee-task-info-item">

              <div className="employee-task-info-icon">
                <Flag />
              </div>

              <div>

                <span>Priority</span>

                <strong>
                  {task.priority}
                </strong>

              </div>

            </div>


            <div className="employee-task-info-item">

              <div className="employee-task-info-icon">
                <Milestone />
              </div>

              <div>

                <span>Milestone</span>

                <strong>
                  {task.milestone}
                </strong>

              </div>

            </div>


            <div className="employee-task-info-item">

              <div className="employee-task-info-icon">
                <CalendarDays />
              </div>

              <div>

                <span>Deadline</span>

                <strong>
                  {task.deadline}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            CHECKLIST
            =================================================== */}

        <section className="employee-task-section">

          <div className="employee-task-section-heading">

            <div>

              <span className="employee-task-eyebrow">
                PROGRESS
              </span>

              <h2>Task Checklist</h2>

            </div>

            <span className="employee-task-section-count">
              3 of 6 completed
            </span>

          </div>


          <div className="employee-task-checklist">

            {checklist.map((item) => (

              <div
                className={`employee-task-checklist-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.title}
              >

                <div className="employee-task-check-icon">

                  {item.completed ? (
                    <CheckCircle2 />
                  ) : (
                    <span></span>
                  )}

                </div>

                <span>
                  {item.title}
                </span>

              </div>

            ))}

          </div>

        </section>

      </div>


      {/* =====================================================
          UPDATE PROGRESS
          ===================================================== */}

      <section className="employee-task-section employee-task-update-section">

        <div className="employee-task-section-heading">

          <div>

            <span className="employee-task-eyebrow">
              WORK UPDATE
            </span>

            <h2>Update Task Progress</h2>

          </div>

        </div>


        <div className="employee-task-update-content">


          {/* =================================================
              INTERACTIVE PROGRESS
              ================================================= */}

          <div className="employee-task-update-progress">

            <div className="employee-task-update-progress-top">

              <span>
                Current Progress
              </span>

              <strong>
                {progress}%
              </strong>

            </div>


            <div className="employee-task-interactive-progress">

              {/* REAL VISUAL PROGRESS BAR */}

              <div className="employee-task-progress-track large">

                <div
                  className="employee-task-progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>

              </div>


              {/* INVISIBLE RANGE CONTROL OVER THE BAR */}

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={progress}
                onChange={(event) =>
                  setProgress(
                    Number(event.target.value)
                  )
                }
                className="employee-task-progress-slider-overlay"
                aria-label="Task progress"
              />

            </div>

          </div>


          {/* =================================================
              ACTION BUTTONS
              ================================================= */}

          <div className="employee-task-update-actions">

            <button
              type="button"
              className="employee-task-update-button secondary"
            >
              Update Status
            </button>

            <button
              type="button"
              className="employee-task-update-button primary"
            >
              Update Progress
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          RECENT UPDATES + DISCUSSION
          ===================================================== */}

      <div className="employee-task-bottom-grid">


        {/* RECENT UPDATES */}

        <section className="employee-task-section">

          <div className="employee-task-section-heading">

            <div>

              <span className="employee-task-eyebrow">
                ACTIVITY
              </span>

              <h2>Recent Updates</h2>

            </div>

          </div>


          <div className="employee-task-updates-list">

            {updates.map((update) => (

              <div
                className="employee-task-update-item"
                key={update.title}
              >

                <div className="employee-task-update-dot"></div>

                <div>

                  <strong>
                    {update.title}
                  </strong>

                  <span>
                    {update.detail}
                  </span>

                  <small>
                    {update.time}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* TASK DISCUSSION */}

        <section className="employee-task-section">

          <div className="employee-task-section-heading">

            <div>

              <span className="employee-task-eyebrow">
                COLLABORATION
              </span>

              <h2>Task Discussion</h2>

            </div>

          </div>


          <div className="employee-task-message-content">

            <div className="employee-task-message-icon">
              <MessageSquare />
            </div>


            <div>

              <strong>
                Need to discuss this task?
              </strong>

              <p>
                Contact the Admin or Project Manager
                about blockers, requirements, or task
                updates.
              </p>

            </div>

          </div>


          <a
            href="/employee/messages"
            className="employee-task-message-button"
          >

            <MessageSquare />

            Open Messages

          </a>

        </section>

      </div>

    </section>
  );
}

export default EmployeeTaskDetails;