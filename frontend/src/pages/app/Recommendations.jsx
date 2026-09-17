import { useState } from "react";

import {
  Users,
  UserRound,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Target,
  Layers3,
  Database,
  Code2,
  Palette,
  ShieldCheck,
  BrainCircuit,
  Server,
  Globe,
  Send,
  X,
  MessageCircle,
} from "lucide-react";

import "./Recommendations.css";

function Recommendations() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [showAdminChat, setShowAdminChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      text:
        "Hello. I’m the PlanWise Admin. How can I help you with this project?",
      time: "10:32 AM",
    },
    {
      id: 2,
      sender: "user",
      text:
        "I would like to discuss the project estimate and development timeline.",
      time: "10:35 AM",
    },
    {
      id: 3,
      sender: "admin",
      text:
        "Sure. We can discuss the estimate, timeline, requirements, or development request here.",
      time: "10:37 AM",
    },
  ]);

  const projectInfo = {
    name: "E-Commerce Platform",
    type: "Web Application",
  };

  const teamRequirements = [
    {
      role: "Backend Developer",
      required: 2,
      icon: Server,
      reason:
        "Required for API development, business logic, database integration, authentication, and server-side services.",
    },
    {
      role: "Frontend Developer",
      required: 1,
      icon: Code2,
      reason:
        "Required for building the web interface, user interactions, responsive layouts, and frontend integration.",
    },
    {
      role: "UI/UX Designer",
      required: 1,
      icon: Palette,
      reason:
        "Required to design the user experience, interface structure, visual system, and usability flow.",
    },
    {
      role: "QA Engineer",
      required: 1,
      icon: ShieldCheck,
      reason:
        "Required for functional testing, integration testing, defect identification, and release validation.",
    },
  ];

  const planningRecommendations = [
    {
      title: "Start with requirements",
      description:
        "Finalize project requirements and user flows before development begins to reduce rework during implementation.",
      icon: Target,
    },
    {
      title: "Build in phases",
      description:
        "Organize development into manageable phases such as requirements, design, development, testing, and deployment.",
      icon: Layers3,
    },
    {
      title: "Keep QA involved",
      description:
        "Testing should run alongside development rather than being treated as a final project activity.",
      icon: ShieldCheck,
    },
    {
      title: "Review resources before execution",
      description:
        "Final employee assignment should be completed after checking current availability, workload, skills, and project conflicts.",
      icon: Users,
    },
  ];

  const technologyRecommendations = [
    {
      category: "Frontend",
      title: "React.js",
      description:
        "Suitable for building a responsive and component-based web application.",
      icon: Globe,
    },
    {
      category: "Backend",
      title: "FastAPI",
      description:
        "Suitable for developing structured APIs and integrating application services.",
      icon: Server,
    },
    {
      category: "Database",
      title: "PostgreSQL",
      description:
        "Suitable for reliable relational storage and production project data.",
      icon: Database,
    },
    {
      category: "Security",
      title: "JWT Authentication",
      description:
        "Suitable for secure authentication and protected application access.",
      icon: ShieldCheck,
    },
  ];

  const sendMessage = () => {
    const trimmedMessage = messageInput.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessageInput("");
  };

  const handleMessageKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="recommendations-page">

      {/* PAGE HEADER */}
      <header className="recommendations-header">
        <div>
          <span className="page-eyebrow">
            PROJECT PLANNING
          </span>

          <h1>Recommendations</h1>

          <p>
            PlanWise analyzes your project requirements and provides
            planning, technology, and team requirements to support
            project execution.
          </p>
        </div>
      </header>

      {/* PROJECT CONTEXT */}
      <section className="recommendations-project-context">

        <div className="project-context-main">

          <div className="project-context-icon">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <span>Current Project</span>
            <h2>{projectInfo.name}</h2>
            <p>{projectInfo.type}</p>
          </div>

        </div>

        <div className="project-context-status">
          <CheckCircle2 size={17} />
          <span>Analysis Completed</span>
        </div>

      </section>

      {/* SUMMARY */}
      <section className="recommendation-summary">

        <div className="recommendation-summary-card">

          <div className="recommendation-summary-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Required Team</span>
            <strong>5</strong>
            <small>Estimated resources</small>
          </div>

        </div>

        <div className="recommendation-summary-card">

          <div className="recommendation-summary-icon">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Estimated Duration</span>
            <strong>14 Weeks</strong>
            <small>Based on project analysis</small>
          </div>

        </div>

        <div className="recommendation-summary-card">

          <div className="recommendation-summary-icon">
            <Target size={19} />
          </div>

          <div>
            <span>Planning Confidence</span>
            <strong>High</strong>
            <small>Based on available analysis</small>
          </div>

        </div>

      </section>

      {/* TEAM REQUIREMENT */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              TEAM REQUIREMENT
            </span>

            <h2>Required Project Team</h2>

            <p>
              PlanWise determines the types and quantities of
              resources required from the project's characteristics.
              These are project requirements, not final employee
              assignments.
            </p>

          </div>

        </div>

        <div className="team-requirement-grid">

          {teamRequirements.map((member) => {

            const Icon = member.icon;

            return (
              <article
                className="team-requirement-card"
                key={member.role}
              >

                <div className="team-requirement-top">

                  <div className="team-requirement-icon">
                    <Icon size={20} />
                  </div>

                  <span className="team-required-badge">
                    {member.required} Required
                  </span>

                </div>

                <h3>{member.role}</h3>

                <p>{member.reason}</p>

              </article>
            );
          })}

        </div>

      </section>

      {/* RESOURCE PLANNING */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              RESOURCE PLANNING
            </span>

            <h2>Resource Requirement</h2>

            <p>
              The following resource requirements are generated
              from the project analysis. Actual employee availability
              and assignment are handled by the PlanWise Admin.
            </p>

          </div>

        </div>

        <div className="resource-table-wrapper">

          <table className="resource-table">

            <thead>

              <tr>
                <th>Required Role</th>
                <th>Required</th>
                <th>Purpose</th>
                <th>Assignment</th>
              </tr>

            </thead>

            <tbody>

              {teamRequirements.map((member) => {

                const Icon = member.icon;

                return (
                  <tr key={member.role}>

                    <td>

                      <div className="resource-role">

                        <div className="resource-role-icon">
                          <Icon size={16} />
                        </div>

                        <strong>
                          {member.role}
                        </strong>

                      </div>

                    </td>

                    <td>

                      <span className="resource-quantity">
                        {member.required}
                      </span>

                    </td>

                    <td>

                      <span className="resource-purpose">
                        {member.reason}
                      </span>

                    </td>

                    <td>

                      <span className="assignment-status pending">
                        <Clock3 size={13} />
                        Admin Assignment
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </section>

      {/* ADMIN RESPONSIBILITY NOTE */}
      <section className="resource-admin-note">

        <div className="resource-admin-note-icon">
          <UserRound size={20} />
        </div>

        <div>

          <h3>Final Resource Assignment</h3>

          <p>
            PlanWise does not assign individual developers automatically.
            After the user requests project development, the Admin reviews
            the required roles, employee skills, availability, workload,
            and existing assignments before selecting the project team.
          </p>

          <div className="assignment-flow">

            <span>Project Requirements</span>

            <span className="flow-arrow">→</span>

            <span>Admin Resource Review</span>

            <span className="flow-arrow">→</span>

            <span>Developer Assignment</span>

          </div>

        </div>

      </section>

      {/* TECHNOLOGY RECOMMENDATIONS */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              TECHNOLOGY
            </span>

            <h2>Technology Recommendations</h2>

            <p>
              Suggested technologies based on the project's
              characteristics and expected architecture.
            </p>

          </div>

        </div>

        <div className="technology-grid">

          {technologyRecommendations.map((technology) => {

            const Icon = technology.icon;

            return (
              <article
                className="technology-card"
                key={technology.title}
              >

                <div className="technology-icon">
                  <Icon size={19} />
                </div>

                <div className="technology-content">

                  <span className="technology-category">
                    {technology.category}
                  </span>

                  <h3>{technology.title}</h3>

                  <p>{technology.description}</p>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* ARCHITECTURE */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              ARCHITECTURE
            </span>

            <h2>Suggested System Architecture</h2>

            <p>
              A high-level architecture direction for the project.
            </p>

          </div>

        </div>

        <div className="architecture-card">

          <div className="architecture-flow">

            <div className="architecture-node">

              <div className="architecture-node-icon">
                <Globe size={17} />
              </div>

              <strong>React Frontend</strong>
              <span>User Interface</span>

            </div>

            <div className="architecture-arrow">
              →
            </div>

            <div className="architecture-node">

              <div className="architecture-node-icon">
                <Server size={17} />
              </div>

              <strong>FastAPI</strong>
              <span>Application API</span>

            </div>

            <div className="architecture-arrow">
              →
            </div>

            <div className="architecture-node">

              <div className="architecture-node-icon">
                <Database size={17} />
              </div>

              <strong>PostgreSQL</strong>
              <span>Application Data</span>

            </div>

            <div className="architecture-arrow">
              +
            </div>

            <div className="architecture-node">

              <div className="architecture-node-icon">
                <BrainCircuit size={17} />
              </div>

              <strong>AI / ML Engine</strong>
              <span>Intelligent Analysis</span>

            </div>

          </div>

        </div>

      </section>

      {/* PLANNING RECOMMENDATIONS */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              PROJECT PLANNING
            </span>

            <h2>Planning Recommendations</h2>

            <p>
              Practical recommendations generated from the
              project's planning requirements.
            </p>

          </div>

        </div>

        <div className="planning-grid">

          {planningRecommendations.map((recommendation) => {

            const Icon = recommendation.icon;

            return (
              <article
                className="planning-card"
                key={recommendation.title}
              >

                <div className="planning-icon">
                  <Icon size={19} />
                </div>

                <div>

                  <h3>{recommendation.title}</h3>

                  <p>
                    {recommendation.description}
                  </p>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      {/* INFORMATION NOTE */}
      <section className="recommendations-info">

        <div className="recommendations-info-icon">
          <AlertTriangle size={18} />
        </div>

        <div>

          <strong>
            Resource availability is not a final assignment.
          </strong>

          <p>
            The team shown above represents the estimated project
            requirement. Individual developers will only be selected
            after the Admin reviews current availability, skills,
            workload, existing assignments, and resource conflicts.
          </p>

        </div>

      </section>

      {/* PROJECT COMMUNICATION */}
      <section className="recommendation-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              PROJECT COMMUNICATION
            </span>

            <h2>Need to discuss your project?</h2>

            <p>
              You can communicate directly with the PlanWise Admin
              about your project requirements, estimate, timeline,
              development request, or planning details.
            </p>

          </div>

        </div>

        <div className="admin-contact-card">

          <div className="admin-contact-main">

            <div className="admin-contact-icon">
              <MessageCircle size={21} />
            </div>

            <div>

              <h3>Contact PlanWise Admin</h3>

              <p>
                Start a project-specific conversation with the Admin.
                You can send multiple messages and receive replies
                throughout the project planning process.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="admin-contact-button"
            onClick={() => setShowAdminChat(true)}
          >
            <MessageCircle size={17} />
            Contact Admin
          </button>

        </div>

      </section>

      {/* REQUEST PROJECT DEVELOPMENT */}
      <section className="development-request-section">

        <div className="development-request-content">

          <div className="development-request-icon">
            <Send size={21} />
          </div>

          <div className="development-request-text">

            <span className="section-eyebrow">
              PROJECT EXECUTION
            </span>

            <h2>Request Project Development</h2>

            <p>
              Your project analysis and planning are complete.
              You can now send a development request to the
              PlanWise Admin for project execution review.
            </p>

            {requestSubmitted ? (

              <div className="development-request-status">

                <CheckCircle2 size={18} />

                <div>

                  <strong>
                    Development Request Submitted
                  </strong>

                  <span>
                    Your request is currently pending Admin review.
                    Resource assignment will be handled by the Admin.
                  </span>

                </div>

                <span className="request-status-badge">
                  Pending Admin Review
                </span>

              </div>

            ) : (

              <button
                type="button"
                className="development-request-button"
                onClick={() => setShowRequestModal(true)}
              >
                <Send size={17} />
                Request Project Development
              </button>

            )}

          </div>

        </div>

      </section>

      {/* REQUEST CONFIRMATION MODAL */}
      {showRequestModal && (

        <div className="request-modal-overlay">

          <div className="request-modal">

            <button
              type="button"
              className="request-modal-close"
              onClick={() => setShowRequestModal(false)}
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <div className="request-modal-icon">
              <Send size={20} />
            </div>

            <span className="section-eyebrow">
              DEVELOPMENT REQUEST
            </span>

            <h2>
              Request Project Development?
            </h2>

            <p className="request-modal-description">
              Your project will be submitted to the PlanWise
              Admin for review and resource assignment.
            </p>

            <div className="request-project-summary">

              <div className="request-summary-row">
                <span>Project</span>
                <strong>{projectInfo.name}</strong>
              </div>

              <div className="request-summary-row">
                <span>Project Type</span>
                <strong>{projectInfo.type}</strong>
              </div>

              <div className="request-summary-row">
                <span>Estimated Duration</span>
                <strong>14 Weeks</strong>
              </div>

              <div className="request-summary-row">
                <span>Required Team</span>
                <strong>5 Resources</strong>
              </div>

            </div>

            <div className="request-modal-note">

              <ShieldCheck size={17} />

              <span>
                Individual developers will not be assigned automatically.
                The Admin will review skills, availability, workload,
                and existing project assignments before selecting the
                project team.
              </span>

            </div>

            <div className="request-modal-actions">

              <button
                type="button"
                className="request-cancel-button"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="request-confirm-button"
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestSubmitted(true);
                }}
              >
                <Send size={16} />
                Submit Development Request
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ADMIN CHAT MODAL */}
      {showAdminChat && (

        <div className="admin-chat-overlay">

          <div className="admin-chat-modal">

            {/* CHAT HEADER */}
            <div className="admin-chat-header">

              <div className="admin-chat-header-info">

                <div className="admin-chat-avatar">
                  <UserRound size={18} />
                </div>

                <div>

                  <strong>PlanWise Admin</strong>

                  <span>
                    {projectInfo.name}
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="admin-chat-close"
                onClick={() => setShowAdminChat(false)}
                aria-label="Close chat"
              >
                <X size={19} />
              </button>

            </div>

            {/* CHAT PROJECT BAR */}
            <div className="admin-chat-project-bar">

              <BriefcaseBusiness size={15} />

              <span>
                Project conversation · {projectInfo.name}
              </span>

            </div>

            {/* CHAT MESSAGES */}
            <div className="admin-chat-messages">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className={`chat-message ${
                    message.sender === "user"
                      ? "chat-message-user"
                      : "chat-message-admin"
                  }`}
                >

                  <div className="chat-message-bubble">

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

            {/* CHAT INPUT */}
            <div className="admin-chat-input-area">

              <textarea
                value={messageInput}
                onChange={(event) =>
                  setMessageInput(event.target.value)
                }
                onKeyDown={handleMessageKeyDown}
                placeholder="Write a message to the Admin..."
                rows={1}
              />

              <button
                type="button"
                className="admin-chat-send"
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>

            </div>

            <div className="admin-chat-footer">
              Press Enter to send · Shift + Enter for a new line
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Recommendations;