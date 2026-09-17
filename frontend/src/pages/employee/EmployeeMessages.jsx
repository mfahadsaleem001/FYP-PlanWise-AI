import {
  CheckCheck,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Users,
  FolderKanban,
} from "lucide-react";

import { useMemo, useState } from "react";

import "./EmployeeMessages.css";

function EmployeeMessages() {
  const [selectedProjectId, setSelectedProjectId] =
    useState(1);

  const [conversationType, setConversationType] =
    useState("admin");

  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const projects = [
    {
      id: 1,
      name: "AI Learning Platform",
      type: "AI / Machine Learning",
      progress: 68,
      status: "In Progress",
      role: "Backend Developer",
      lastMessage:
        "Please update the Course Management API progress.",
      lastTime: "10:42 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "E-Commerce Marketplace",
      type: "E-Commerce",
      progress: 52,
      status: "In Progress",
      role: "Backend Developer",
      lastMessage:
        "QA has started testing the checkout flow.",
      lastTime: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Company Management Portal",
      type: "Web Application",
      progress: 18,
      status: "Planning",
      role: "Backend Developer",
      lastMessage:
        "Architecture discussion is scheduled for tomorrow.",
      lastTime: "Sep 12",
      unread: 0,
    },
  ];

  const conversations = {
    1: {
      admin: [
        {
          id: 1,
          sender: "admin",
          name: "Project Admin",
          text:
            "Hi Fahad, how is the Course Management API coming along?",
          time: "10:18 AM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "The course creation and retrieval endpoints are completed. I am currently working on update and delete operations.",
          time: "10:25 AM",
        },
        {
          id: 3,
          sender: "admin",
          name: "Project Admin",
          text:
            "Good. Please make sure validation and error handling are included before testing.",
          time: "10:31 AM",
        },
        {
          id: 4,
          sender: "employee",
          name: "Fahad",
          text:
            "Sure. I will include validation, proper API errors, and endpoint testing before marking the task complete.",
          time: "10:42 AM",
        },
      ],

      team: [
        {
          id: 1,
          sender: "team",
          name: "Sara Ahmed",
          text:
            "I have shared the latest dashboard design updates with the team.",
          time: "9:18 AM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "Looks good. I will review the API-related screens and check whether the backend fields match the design.",
          time: "9:24 AM",
        },
        {
          id: 3,
          sender: "team",
          name: "Ali Khan",
          text:
            "I will also update the frontend integration once the API endpoints are ready.",
          time: "9:35 AM",
        },
      ],
    },

    2: {
      admin: [
        {
          id: 1,
          sender: "admin",
          name: "Project Admin",
          text:
            "The E-Commerce Marketplace API requirements have been updated.",
          time: "4:10 PM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "I will review the updated requirements and adjust the backend implementation accordingly.",
          time: "4:18 PM",
        },
      ],

      team: [
        {
          id: 1,
          sender: "team",
          name: "Muneeb Shah",
          text:
            "QA has started testing the checkout flow.",
          time: "3:25 PM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "Let me know if any API validation issues appear during testing.",
          time: "3:34 PM",
        },
      ],
    },

    3: {
      admin: [
        {
          id: 1,
          sender: "admin",
          name: "Project Admin",
          text:
            "Architecture discussion is scheduled for tomorrow.",
          time: "11:10 AM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "Understood. I will review the current backend architecture before the discussion.",
          time: "11:20 AM",
        },
      ],

      team: [
        {
          id: 1,
          sender: "team",
          name: "Hamza Malik",
          text:
            "Frontend team is reviewing the new module structure.",
          time: "2:15 PM",
        },
        {
          id: 2,
          sender: "employee",
          name: "Fahad",
          text:
            "I will review the backend module dependencies and share any required changes.",
          time: "2:28 PM",
        },
      ],
    },
  };

  const selectedProject =
    projects.find(
      (project) => project.id === selectedProjectId
    ) || projects[0];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      `${project.name} ${project.type}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedMessages =
    conversations[selectedProjectId]?.[conversationType] ||
    [];

  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }

    setMessage("");
  };

  return (
    <section className="employee-messages-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="employee-messages-header">

        <div>

          <span className="employee-messages-eyebrow">
            COLLABORATION
          </span>

          <h1>Messages</h1>

          <p>
            Communicate and collaborate within your assigned
            projects.
          </p>

        </div>

      </header>


      {/* =====================================================
          MESSAGE WORKSPACE
          ===================================================== */}

      <div className="employee-messages-workspace">

        {/* ===================================================
            PROJECT LIST
            =================================================== */}

        <aside className="employee-messages-projects">

          <div className="employee-messages-projects-header">

            <div>

              <span className="employee-messages-sidebar-label">
                PROJECTS
              </span>

              <h2>Your Conversations</h2>

            </div>

            <div className="employee-messages-sidebar-icon">
              <MessageSquare />
            </div>

          </div>


          {/* SEARCH */}

          <div className="employee-messages-search">

            <Search />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search projects"
            />

          </div>


          <div className="employee-messages-project-label">
            ASSIGNED PROJECTS
          </div>


          <div className="employee-project-conversation-list">

            {filteredProjects.map((project) => (

              <button
                type="button"
                key={project.id}
                className={`employee-project-conversation ${
                  selectedProjectId === project.id
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setConversationType("admin");
                }}
              >

                <div className="employee-project-conversation-icon">
                  <FolderKanban />
                </div>


                <div className="employee-project-conversation-content">

                  <div className="employee-project-conversation-top">

                    <strong>
                      {project.name}
                    </strong>

                    {project.unread > 0 && (
                      <span className="employee-project-unread">
                        {project.unread}
                      </span>
                    )}

                  </div>


                  <span className="employee-project-conversation-type">
                    {project.type}
                  </span>


                  <div className="employee-project-conversation-preview">

                    <span>
                      {project.lastMessage}
                    </span>

                    <small>
                      {project.lastTime}
                    </small>

                  </div>

                </div>

              </button>

            ))}

          </div>


          <div className="employee-messages-projects-footer">

            <span>
              {projects.length} assigned projects
            </span>

          </div>

        </aside>


        {/* ===================================================
            PROJECT COMMUNICATION
            =================================================== */}

        <section className="employee-message-chat">

          {/* =================================================
              PROJECT HEADER
              ================================================= */}

          <header className="employee-project-chat-header">

            <div className="employee-project-chat-heading">

              <div className="employee-project-chat-icon">
                <FolderKanban />
              </div>

              <div>

                <span>
                  {selectedProject.type}
                </span>

                <h2>
                  {selectedProject.name}
                </h2>

              </div>

            </div>


            <div className="employee-project-chat-status">

              <span>
                {selectedProject.status}
              </span>

              <strong>
                {selectedProject.progress}%
              </strong>

            </div>

          </header>


          {/* =================================================
              CONVERSATION TABS
              ================================================= */}

          <div className="employee-message-tabs">

            <button
              type="button"
              className={
                conversationType === "admin"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setConversationType("admin")
              }
            >

              <ShieldCheck />

              <span>

                <strong>
                  Project Admin
                </strong>

                <small>
                  Official project communication
                </small>

              </span>

            </button>


            <button
              type="button"
              className={
                conversationType === "team"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setConversationType("team")
              }
            >

              <Users />

              <span>

                <strong>
                  Project Team
                </strong>

                <small>
                  Team collaboration
                </small>

              </span>

            </button>

          </div>


          {/* =================================================
              CHAT CONTENT
              ================================================= */}

          <div className="employee-message-list">

            <div className="employee-message-context-banner">

              {conversationType === "admin" ? (
                <ShieldCheck />
              ) : (
                <Users />
              )}

              <div>

                <strong>
                  {conversationType === "admin"
                    ? "Official Project Communication"
                    : "Project Team Collaboration"}
                </strong>

                <span>
                  {conversationType === "admin"
                    ? "Use this channel for requirements, blockers, approvals, progress updates, and important project decisions."
                    : "Use this channel for implementation discussions, technical coordination, and team updates."}
                </span>

              </div>

            </div>


            <div className="employee-message-date">

              <span></span>

              <strong>
                Today
              </strong>

              <span></span>

            </div>


            {selectedMessages.map((item) => (

              <div
                key={item.id}
                className={`employee-message-row ${
                  item.sender === "employee"
                    ? "employee"
                    : item.sender === "team"
                    ? "team"
                    : "admin"
                }`}
              >

                <div className="employee-message-avatar-small">

                  {item.sender === "employee"
                    ? "F"
                    : item.sender === "team"
                    ? "TM"
                    : "PA"}

                </div>


                <div className="employee-message-bubble-wrapper">

                  <div className="employee-message-meta">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.time}
                    </span>

                  </div>


                  <div className="employee-message-bubble">
                    {item.text}
                  </div>


                  {item.sender === "employee" && (

                    <div className="employee-message-read">

                      <CheckCheck />

                      <span>
                        Read
                      </span>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>


          {/* =================================================
              MESSAGE COMPOSER
              ================================================= */}

          <div className="employee-message-composer">

            <div className="employee-message-compose-label">

              {conversationType === "admin"
                ? "PROJECT ADMIN"
                : "PROJECT TEAM"}

            </div>


            <div className="employee-message-compose-row">

              <div className="employee-message-input-wrapper">

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder={
                    conversationType === "admin"
                      ? "Write a message to the Project Admin..."
                      : "Write a message to the Project Team..."
                  }
                  rows="1"
                />

                <button
                  type="button"
                  className="employee-message-attach"
                  title="Attach file"
                >
                  <Paperclip />
                </button>

              </div>


              <button
                type="button"
                className="employee-message-send"
                onClick={handleSendMessage}
              >

                <Send />

                <span>
                  Send
                </span>

              </button>

            </div>


            <span className="employee-message-helper">

              {conversationType === "admin"
                ? "Messages here are part of the official project communication."
                : "Use team messages for project coordination and technical collaboration."}

            </span>

          </div>

        </section>

      </div>

    </section>
  );
}

export default EmployeeMessages;