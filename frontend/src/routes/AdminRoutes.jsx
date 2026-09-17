import AdminLayout from "../layouts/AdminLayout";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminEmployees from "../pages/admin/AdminEmployees";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminProjectRequests from "../pages/admin/AdminProjectRequests";
import AdminTasks from "../pages/admin/AdminTasks";
import AdminModels from "../pages/admin/AdminModels";
import AdminActivity from "../pages/admin/AdminActivity";
import AdminNotifications from "../pages/admin/AdminNotifications";
import AdminSettings from "../pages/admin/AdminSettings";

function AdminRoutes() {
  const path = window.location.pathname;

  if (path === "/admin/login") {
    return <AdminLogin />;
  }

  if (path === "/admin/dashboard") {
    return (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );
  }

  if (path === "/admin/users") {
    return (
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    );
  }

  if (path === "/admin/employees") {
    return (
      <AdminLayout>
        <AdminEmployees />
      </AdminLayout>
    );
  }

  if (path === "/admin/projects") {
    return (
      <AdminLayout>
        <AdminProjects />
      </AdminLayout>
    );
  }

  if (path === "/admin/project-requests") {
    return (
      <AdminLayout>
        <AdminProjectRequests />
      </AdminLayout>
    );
  }

  if (path === "/admin/tasks") {
    return (
      <AdminLayout>
        <AdminTasks />
      </AdminLayout>
    );
  }

  if (path === "/admin/models") {
    return (
      <AdminLayout>
        <AdminModels />
      </AdminLayout>
    );
  }

  if (path === "/admin/activity") {
    return (
      <AdminLayout>
        <AdminActivity />
      </AdminLayout>
    );
  }

  if (path === "/admin/notifications") {
    return (
      <AdminLayout>
        <AdminNotifications />
      </AdminLayout>
    );
  }

  if (path === "/admin/settings") {
    return (
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default AdminRoutes;