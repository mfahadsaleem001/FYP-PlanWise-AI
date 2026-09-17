import { useEffect } from "react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

import "./AdminLayout.css";

function AdminLayout({ children }) {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("planwise-admin-theme") || "light";

    if (savedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );

      return;
    }

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminTopbar />

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;