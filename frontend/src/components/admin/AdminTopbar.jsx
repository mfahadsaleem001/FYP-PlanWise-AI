import {
  Bell,
  Search,
  ShieldCheck,
  Users,
  FolderKanban,
  UserCog,
  ListChecks,
  Activity,
  Settings,
  ClipboardCheck,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import "./AdminTopbar.css";

function AdminTopbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  const searchItems = [
    // =====================================================
    // PAGES
    // =====================================================

    {
      title: "Users",
      description: "Manage and view registered users",
      category: "Page",
      icon: Users,
      path: "/admin/users",
      keywords: "users user accounts registered customers",
    },

    {
      title: "Projects",
      description: "View and manage all projects",
      category: "Page",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "projects project management",
    },

    {
      title: "Employees & Resources",
      description: "Manage employees, skills and resource capacity",
      category: "Page",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "employees employee resources developers availability workload",
    },

    {
      title: "Project Requests",
      description: "Review project development requests",
      category: "Page",
      icon: ClipboardCheck,
      path: "/admin/project-requests",
      keywords: "requests project request development pending review",
    },

    {
      title: "Tasks & Assignments",
      description: "Manage project tasks and assignments",
      category: "Page",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "tasks task assignments assigned work",
    },

    {
      title: "Activity Logs",
      description: "View system activity and audit logs",
      category: "Page",
      icon: Activity,
      path: "/admin/activity",
      keywords: "activity logs audit history actions",
    },

    {
      title: "Settings",
      description: "Manage administration settings",
      category: "Page",
      icon: Settings,
      path: "/admin/settings",
      keywords: "settings configuration theme preferences",
    },

    // =====================================================
    // USERS
    // =====================================================

    {
      title: "Ali Raza",
      description: "User • Active",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "ali raza user active",
    },

    {
      title: "Sara Khan",
      description: "User • Active",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "sara khan user active",
    },

    {
      title: "Ahmed Hassan",
      description: "User • Inactive",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "ahmed hassan user inactive",
    },

    {
      title: "Ayesha Malik",
      description: "User • Active",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "ayesha malik user active",
    },

    {
      title: "Hamza Shah",
      description: "User • Active",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "hamza shah user active",
    },

    {
      title: "Mariam Iqbal",
      description: "User • Inactive",
      category: "User",
      icon: Users,
      path: "/admin/users",
      keywords: "mariam iqbal user inactive",
    },

    // =====================================================
    // PROJECTS
    // =====================================================

    {
      title: "E-Commerce Platform",
      description: "Web Application • In Development",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "e commerce ecommerce platform web application development",
    },

    {
      title: "AI Recommendation Engine",
      description: "AI / ML • Planning",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "ai recommendation machine learning ml planning",
    },

    {
      title: "Customer Mobile App",
      description: "Mobile Application • In Development",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "customer mobile app application development",
    },

    {
      title: "Business Analytics Portal",
      description: "Web Application • Completed",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "business analytics portal web completed",
    },

    {
      title: "Healthcare Management System",
      description: "Desktop Software • In Development",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "healthcare management desktop software development",
    },

    {
      title: "SaaS Project Management Tool",
      description: "SaaS • On Hold",
      category: "Project",
      icon: FolderKanban,
      path: "/admin/projects",
      keywords: "saas project management tool on hold",
    },

    // =====================================================
    // EMPLOYEES
    // =====================================================

    {
      title: "Ali Raza",
      description: "Backend Developer • Available",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "ali raza backend developer available python fastapi",
    },

    {
      title: "Hamza Khan",
      description: "Backend Developer • Assigned",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "hamza khan backend developer assigned django python",
    },

    {
      title: "Ahmed Ali",
      description: "Frontend Developer • Available",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "ahmed ali frontend developer available react javascript",
    },

    {
      title: "Mariam Iqbal",
      description: "UI/UX Designer • Available",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "mariam iqbal ui ux designer figma available",
    },

    {
      title: "Sara Ahmed",
      description: "QA Engineer • Available",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "sara ahmed qa engineer testing postman selenium",
    },

    {
      title: "Usman Tariq",
      description: "ML Engineer • Assigned",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "usman tariq ml engineer machine learning pytorch",
    },

    {
      title: "Ayesha Malik",
      description: "Project Manager • Available",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "ayesha malik project manager agile scrum planning",
    },

    {
      title: "Bilal Hassan",
      description: "Frontend Developer • Unavailable",
      category: "Employee",
      icon: UserCog,
      path: "/admin/employees",
      keywords: "bilal hassan frontend developer unavailable react typescript",
    },

    // =====================================================
    // TASKS
    // =====================================================

    {
      title: "Build Authentication API",
      description: "E-Commerce Platform • Ali Raza",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "authentication api backend ali raza ecommerce high in progress",
    },

    {
      title: "Create Product Management UI",
      description: "E-Commerce Platform • Ahmed Ali",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "product management ui frontend ahmed ali assigned",
    },

    {
      title: "API Testing & Validation",
      description: "E-Commerce Platform • Sara Ahmed",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "api testing validation qa sara ahmed pending",
    },

    {
      title: "Recommendation Pipeline",
      description: "AI Recommendation Engine • Usman Tariq",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "recommendation pipeline ai ml usman tariq high",
    },

    {
      title: "Mobile App Wireframes",
      description: "Customer Mobile App • Mariam Iqbal",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "mobile app wireframes ui ux mariam completed",
    },

    {
      title: "Dashboard Analytics",
      description: "Business Analytics Portal • Hamza Khan",
      category: "Task",
      icon: ListChecks,
      path: "/admin/tasks",
      keywords: "dashboard analytics business portal hamza completed",
    },
  ];

  // =====================================================
  // FILTER RESULTS
  // =====================================================

  const normalizedQuery = searchQuery
    .trim()
    .toLowerCase();

  const filteredResults =
    normalizedQuery.length === 0
      ? []
      : searchItems.filter((item) => {
          const searchableText = `
            ${item.title}
            ${item.description}
            ${item.category}
            ${item.keywords}
          `.toLowerCase();

          return searchableText.includes(normalizedQuery);
        });

  // =====================================================
  // CLOSE SEARCH WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // =====================================================
  // HANDLE RESULT CLICK
  // =====================================================

  const handleResultClick = (path) => {
    setSearchQuery("");
    setShowResults(false);

    window.location.href = path;
  };

  return (
    <header className="admin-topbar">

      {/* ==================================================
          LEFT
      ================================================== */}

      <div className="admin-topbar-left">

        <div className="admin-topbar-heading">

          <span>
            PLANWISE AI
          </span>

          <h2>
            Administration Workspace
          </h2>

        </div>

      </div>


      {/* ==================================================
          RIGHT
      ================================================== */}

      <div className="admin-topbar-right">

        {/* ==================================================
            SEARCH
        ================================================== */}

        <div
          className="admin-search-wrapper"
          ref={searchRef}
        >

          <div className="admin-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(
                  event.target.value
                );

                setShowResults(
                  event.target.value.trim().length > 0
                );
              }}
              onFocus={() => {
                if (
                  searchQuery.trim().length > 0
                ) {
                  setShowResults(true);
                }
              }}
            />

          </div>


          {/* ==================================================
              SEARCH RESULTS
          ================================================== */}

          {showResults && (
            <div className="admin-search-results">

              {filteredResults.length > 0 ? (

                <>

                  <div className="admin-search-results-header">
                    Search Results
                  </div>

                  {filteredResults
                    .slice(0, 8)
                    .map((item, index) => {

                      const Icon =
                        item.icon;

                      return (
                        <button
                          key={`${item.category}-${item.title}-${index}`}
                          className="admin-search-result"
                          onClick={() =>
                            handleResultClick(
                              item.path
                            )
                          }
                        >

                          <div className="admin-search-result-icon">
                            <Icon size={16} />
                          </div>

                          <div className="admin-search-result-content">

                            <strong>
                              {item.title}
                            </strong>

                            <span>
                              {item.description}
                            </span>

                          </div>

                          <small>
                            {item.category}
                          </small>

                        </button>
                      );
                    })}

                </>

              ) : (

                <div className="admin-search-no-results">

                  <Search size={18} />

                  <div>
                    <strong>
                      No results found
                    </strong>

                    <span>
                      Try another keyword
                    </span>
                  </div>

                </div>

              )}

            </div>
          )}

        </div>


        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <button
          className="admin-topbar-icon-btn"
          title="Notifications"
        >
          <Bell size={18} />
        </button>


        {/* ==================================================
            ADMIN USER
        ================================================== */}

        <div className="admin-topbar-user">

          <div className="admin-topbar-avatar">
            <ShieldCheck size={17} />
          </div>

          <div className="admin-topbar-user-info">

            <strong>
              Administrator
            </strong>

            <span>
              System Admin
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminTopbar;