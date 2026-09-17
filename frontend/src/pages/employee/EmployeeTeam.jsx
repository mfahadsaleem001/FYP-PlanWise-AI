import {
  BriefcaseBusiness,
  FolderKanban,
  MessageSquare,
  Users,
} from "lucide-react";

import "./EmployeeTeam.css";

function EmployeeTeam() {
  const projects = [
    {
      id: 1,
      name: "AI Learning Platform",
      type: "AI / Machine Learning",
      role: "Backend Developer",
      members: [
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
      ],
    },
    {
      id: 2,
      name: "E-Commerce Marketplace",
      type: "E-Commerce",
      role: "Backend Developer",
      members: [
        {
          name: "Fahad",
          role: "Backend Developer",
          initials: "F",
          current: true,
        },
        {
          name: "Areeba Khan",
          role: "Frontend Developer",
          initials: "AK",
        },
        {
          name: "Hassan Ali",
          role: "UI/UX Designer",
          initials: "HA",
        },
        {
          name: "Muneeb Shah",
          role: "QA Engineer",
          initials: "MS",
        },
      ],
    },
    {
      id: 3,
      name: "Company Management Portal",
      type: "Web Application",
      role: "Backend Developer",
      members: [
        {
          name: "Fahad",
          role: "Backend Developer",
          initials: "F",
          current: true,
        },
        {
          name: "Hamza Malik",
          role: "Frontend Developer",
          initials: "HM",
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
          name: "Bilal Ahmed",
          role: "ML Engineer",
          initials: "BA",
        },
      ],
    },
  ];

  return (
    <section className="employee-team-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="employee-team-header">

        <div>

          <span className="employee-team-eyebrow">
            COLLABORATION
          </span>

          <h1>Team & Project Members</h1>

          <p>
            View the teams and roles connected to your
            assigned projects.
          </p>

        </div>

      </header>


      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="employee-team-summary-grid">

        <div className="employee-team-summary-card">

          <div className="employee-team-summary-icon">
            <FolderKanban />
          </div>

          <div>
            <span>ASSIGNED PROJECTS</span>
            <strong>3</strong>
          </div>

        </div>


        <div className="employee-team-summary-card">

          <div className="employee-team-summary-icon">
            <Users />
          </div>

          <div>
            <span>TEAM MEMBERS</span>
            <strong>9</strong>
          </div>

        </div>


        <div className="employee-team-summary-card">

          <div className="employee-team-summary-icon">
            <BriefcaseBusiness />
          </div>

          <div>
            <span>YOUR ROLE</span>
            <strong>Backend Developer</strong>
          </div>

        </div>

      </div>


      {/* =====================================================
          PROJECT TEAMS
          ===================================================== */}

      <div className="employee-team-project-list">

        {projects.map((project) => (

          <section
            className="employee-team-project-card"
            key={project.id}
          >

            {/* PROJECT HEADER */}

            <div className="employee-team-project-header">

              <div className="employee-team-project-title">

                <div className="employee-team-project-icon">
                  <FolderKanban />
                </div>

                <div>

                  <span className="employee-team-project-eyebrow">
                    PROJECT TEAM
                  </span>

                  <h2>{project.name}</h2>

                  <p>
                    {project.type}
                  </p>

                </div>

              </div>


              <div className="employee-team-project-role">

                <span>Your Role</span>

                <strong>
                  {project.role}
                </strong>

              </div>

            </div>


            {/* TEAM MEMBERS */}

            <div className="employee-team-members-heading">

              <div>

                <span className="employee-team-section-label">
                  TEAM MEMBERS
                </span>

                <h3>
                  Project Team
                </h3>

              </div>

              <span className="employee-team-member-count">
                {project.members.length} members
              </span>

            </div>


            <div className="employee-team-members">

              {project.members.map((member) => (

                <div
                  className={`employee-team-member ${
                    member.current ? "current" : ""
                  }`}
                  key={`${project.id}-${member.name}`}
                >

                  <div className="employee-team-member-avatar">
                    {member.initials}
                  </div>


                  <div className="employee-team-member-info">

                    <strong>
                      {member.name}
                    </strong>

                    <span>
                      {member.role}
                    </span>

                  </div>


                  {member.current && (
                    <span className="employee-team-you">
                      You
                    </span>
                  )}

                </div>

              ))}

            </div>


            {/* PROJECT ACTION */}

            <div className="employee-team-project-footer">

              <a
                href={`/employee/projects/${project.id}`}
                className="employee-team-project-link"
              >
                <FolderKanban />
                View Project
              </a>

              <a
                href="/employee/messages"
                className="employee-team-message-link"
              >
                <MessageSquare />
                Project Messages
              </a>

            </div>

          </section>

        ))}

      </div>

    </section>
  );
}

export default EmployeeTeam;