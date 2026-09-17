import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  FolderKanban,
  MessageSquare,
  Users,
} from "lucide-react";

import "./EmployeeProjectDetails.css";

function EmployeeProjectDetails() {
  const project = {
    name: "AI Learning Platform",
    type: "AI / Machine Learning",
    status: "In Progress",
    progress: 68,
    deadline: "October 18, 2026",
    priority: "High",
    role: "Backend Developer",
    phase: "Development",
    description:
      "An intelligent learning platform that provides personalized learning paths, progress tracking, assessments, and AI-powered learning assistance.",
  };

  const teamMembers = [
    {
      name: "Fahad",
      role: "Backend Developer",
      initials: "F",
      current: true,
    },
    {
      name: "Ali Khan",
      role: "Frontend Developer",
      initials: "AK",
    },
    {
      name: "Sara Ahmed",
      role: "UI/UX Designer",
      initials: "SA",
    },
    {
      name: "Usman Tariq",
      role: "QA Engineer",
      initials: "UT",
    },
    {
      name: "Hamza Malik",
      role: "ML Engineer",
      initials: "HM",
    },
  ];

  const milestones = [
    {
      title: "Requirements & Analysis",
      date: "Aug 28, 2026",
      status: "Completed",
      progress: 100,
    },
    {
      title: "UI/UX & Architecture",
      date: "Sep 05, 2026",
      status: "Completed",
      progress: 100,
    },
    {
      title: "Development",
      date: "Sep 06 – Oct 08, 2026",
      status: "In Progress",
      progress: 68,
    },
    {
      title: "Testing & QA",
      date: "Oct 09 – Oct 15, 2026",
      status: "Upcoming",
      progress: 0,
    },
    {
      title: "Deployment",
      date: "Oct 18, 2026",
      status: "Upcoming",
      progress: 0,
    },
  ];

  const assignedTasks = [
    {
      title: "Implement Authentication API",
      priority: "High",
      status: "Completed",
      progress: 100,
      deadline: "Sep 12, 2026",
    },
    {
      title: "Build Course Management API",
      priority: "High",
      status: "In Progress",
      progress: 72,
      deadline: "Sep 20, 2026",
    },
    {
      title: "Integrate Learning Progress API",
      priority: "Medium",
      status: "In Progress",
      progress: 45,
      deadline: "Sep 28, 2026",
    },
    {
      title: "Prepare API Documentation",
      priority: "Medium",
      status: "Pending",
      progress: 0,
      deadline: "Oct 03, 2026",
    },
  ];

  const activities = [
    {
      title: "Course Management API updated",
      detail: "Progress changed to 72%",
      time: "2 hours ago",
    },
    {
      title: "Development milestone updated",
      detail: "Milestone is currently 68% complete",
      time: "Yesterday",
    },
    {
      title: "Task assigned",
      detail: "Prepare API Documentation",
      time: "Sep 08, 2026",
    },
  ];

  return (
    <section className="employee-project-details-page">

      {/* ======================================================
          BACK NAVIGATION
          ====================================================== */}

      <a
        href="/employee/projects"
        className="employee-project-back"
      >
        <ArrowLeft />
        <span>Back to My Projects</span>
      </a>


      {/* ======================================================
          PROJECT HEADER
          ====================================================== */}

      <header className="employee-project-details-header">

        <div className="employee-project-title-area">

          <div className="employee-project-title-icon">
            <FolderKanban />
          </div>

          <div>
            <span className="employee-project-eyebrow">
              PROJECT DETAILS
            </span>

            <h1>{project.name}</h1>

            <p>
              {project.type} · Assigned as {project.role}
            </p>
          </div>

        </div>


        <div className="employee-project-header-status">

          <span className="employee-project-status">
            {project.status}
          </span>

          <span className="employee-project-priority">
            {project.priority} Priority
          </span>

        </div>

      </header>


      {/* ======================================================
          PROJECT SUMMARY
          ====================================================== */}

      <div className="employee-project-summary-grid">

        {/* ====================================================
            PROJECT PROGRESS
            ==================================================== */}

        <div className="employee-project-summary-card progress-card">

          <div className="employee-project-summary-heading">

            <div className="employee-project-summary-icon">
              <CheckCircle2 />
            </div>

            <span>
              PROJECT PROGRESS
            </span>

          </div>


          <div className="employee-project-summary-value">

            <strong>
              {project.progress}%
            </strong>

            <span>
              Complete
            </span>

          </div>


          <div className="employee-project-progress-track">

            <div
              className="employee-project-progress-fill"
              style={{
                width: `${project.progress}%`,
              }}
            ></div>

          </div>

        </div>


        {/* ====================================================
            CURRENT PHASE
            ==================================================== */}

        <div className="employee-project-summary-card">

          <div className="employee-project-summary-heading">

            <div className="employee-project-summary-icon">
              <FolderKanban />
            </div>

            <span>
              CURRENT PHASE
            </span>

          </div>


          <strong className="employee-project-summary-value-text">
            {project.phase}
          </strong>


          <span className="employee-project-summary-description">
            Active project phase
          </span>

        </div>


        {/* ====================================================
            PROJECT DEADLINE
            ==================================================== */}

        <div className="employee-project-summary-card">

          <div className="employee-project-summary-heading">

            <div className="employee-project-summary-icon">
              <CalendarDays />
            </div>

            <span>
              PROJECT DEADLINE
            </span>

          </div>


          <strong className="employee-project-summary-value-text">
            {project.deadline}
          </strong>


          <span className="employee-project-summary-description">
            Final delivery date
          </span>

        </div>


        {/* ====================================================
            YOUR ROLE
            ==================================================== */}

        <div className="employee-project-summary-card">

          <div className="employee-project-summary-heading">

            <div className="employee-project-summary-icon">
              <Users />
            </div>

            <span>
              YOUR ROLE
            </span>

          </div>


          <strong className="employee-project-summary-value-text">
            {project.role}
          </strong>


          <span className="employee-project-summary-description">
            Assigned project responsibility
          </span>

        </div>

      </div>


      {/* ======================================================
          OVERVIEW + TEAM
          ====================================================== */}

      <div className="employee-project-main-grid">

        {/* PROJECT OVERVIEW */}

        <section className="employee-project-section employee-project-overview">

          <div className="employee-project-section-heading">

            <div>

              <span className="employee-project-eyebrow">
                OVERVIEW
              </span>

              <h2>
                Project Overview
              </h2>

            </div>

          </div>


          <p className="employee-project-description">
            {project.description}
          </p>


          <div className="employee-project-info-list">

            <div>
              <span>
                Project Type
              </span>

              <strong>
                {project.type}
              </strong>
            </div>


            <div>
              <span>
                Current Phase
              </span>

              <strong>
                {project.phase}
              </strong>
            </div>


            <div>
              <span>
                Priority
              </span>

              <strong>
                {project.priority}
              </strong>
            </div>


            <div>
              <span>
                Deadline
              </span>

              <strong>
                {project.deadline}
              </strong>
            </div>

          </div>

        </section>


        {/* PROJECT TEAM */}

        <section className="employee-project-section">

          <div className="employee-project-section-heading">

            <div>

              <span className="employee-project-eyebrow">
                TEAM
              </span>

              <h2>
                Project Members
              </h2>

            </div>

            <span className="employee-project-section-count">
              {teamMembers.length} members
            </span>

          </div>


          <div className="employee-project-team-list">

            {teamMembers.map((member) => (

              <div
                className={`employee-project-team-member ${
                  member.current ? "current" : ""
                }`}
                key={member.name}
              >

                <div className="employee-project-member-avatar">
                  {member.initials}
                </div>


                <div className="employee-project-member-info">

                  <strong>
                    {member.name}
                  </strong>

                  <span>
                    {member.role}
                  </span>

                </div>


                {member.current && (
                  <span className="employee-project-you">
                    You
                  </span>
                )}

              </div>

            ))}

          </div>

        </section>

      </div>


      {/* ======================================================
          MILESTONES
          ====================================================== */}

      <section className="employee-project-section employee-project-milestones">

        <div className="employee-project-section-heading">

          <div>

            <span className="employee-project-eyebrow">
              PROJECT PLAN
            </span>

            <h2>
              Milestones
            </h2>

          </div>

        </div>


        <div className="employee-project-milestone-list">

          {milestones.map((milestone, index) => (

            <div
              className="employee-project-milestone"
              key={milestone.title}
            >

              <div className="employee-project-milestone-marker">

                {milestone.status === "Completed" ? (
                  <CheckCircle2 />
                ) : (
                  <span>
                    {index + 1}
                  </span>
                )}

              </div>


              <div className="employee-project-milestone-content">

                <div className="employee-project-milestone-top">

                  <div>

                    <strong>
                      {milestone.title}
                    </strong>

                    <span>
                      <CalendarDays />
                      {milestone.date}
                    </span>

                  </div>


                  <span
                    className={`employee-project-milestone-status ${milestone.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {milestone.status}
                  </span>

                </div>


                <div className="employee-project-milestone-progress">

                  <div className="employee-project-progress-track">

                    <div
                      className="employee-project-progress-fill"
                      style={{
                        width: `${milestone.progress}%`,
                      }}
                    ></div>

                  </div>

                  <span>
                    {milestone.progress}%
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ======================================================
          ASSIGNED TASKS
          ====================================================== */}

      <section className="employee-project-section">

        <div className="employee-project-section-heading">

          <div>

            <span className="employee-project-eyebrow">
              YOUR WORK
            </span>

            <h2>
              Assigned Tasks
            </h2>

          </div>


          <a
            href="/employee/tasks"
            className="employee-project-view-all"
          >
            View All Tasks
          </a>

        </div>


        <div className="employee-project-task-list">

          {assignedTasks.map((task) => (

            <div
              className="employee-project-task"
              key={task.title}
            >

              <div className="employee-project-task-main">

                <div className="employee-project-task-title">

                  <strong>
                    {task.title}
                  </strong>

                  <span
                    className={`employee-project-task-priority ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                </div>


                <div className="employee-project-task-meta">

                  <span
                    className={`employee-project-task-status ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <span>
                    <Clock3 />
                    {task.deadline}
                  </span>

                </div>

              </div>


              <div className="employee-project-task-progress">

                <div className="employee-project-progress-track">

                  <div
                    className="employee-project-progress-fill"
                    style={{
                      width: `${task.progress}%`,
                    }}
                  ></div>

                </div>

                <span>
                  {task.progress}%
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ======================================================
          ACTIVITY + COMMUNICATION
          ====================================================== */}

      <div className="employee-project-bottom-grid">

        {/* RECENT ACTIVITY */}

        <section className="employee-project-section">

          <div className="employee-project-section-heading">

            <div>

              <span className="employee-project-eyebrow">
                ACTIVITY
              </span>

              <h2>
                Recent Project Activity
              </h2>

            </div>

          </div>


          <div className="employee-project-activity-list">

            {activities.map((activity) => (

              <div
                className="employee-project-activity"
                key={activity.title}
              >

                <div className="employee-project-activity-dot"></div>


                <div>

                  <strong>
                    {activity.title}
                  </strong>

                  <span>
                    {activity.detail}
                  </span>

                  <small>
                    {activity.time}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* PROJECT COMMUNICATION */}

        <section className="employee-project-section employee-project-communication">

          <div className="employee-project-section-heading">

            <div>

              <span className="employee-project-eyebrow">
                COMMUNICATION
              </span>

              <h2>
                Project Messages
              </h2>

            </div>

          </div>


          <div className="employee-project-message-content">

            <div className="employee-project-message-icon">
              <MessageSquare />
            </div>


            <div>

              <strong>
                Need to discuss this project?
              </strong>

              <p>
                Contact the Admin or Project Manager
                about project-related questions,
                blockers, or updates.
              </p>

            </div>

          </div>


          <a
            href="/employee/messages"
            className="employee-project-message-btn"
          >
            <MessageSquare />
            Open Project Messages
          </a>

        </section>

      </div>

    </section>
  );
}

export default EmployeeProjectDetails;