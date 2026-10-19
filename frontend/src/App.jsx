import "./App.css";

// ============================================================
// COMMON / LANDING COMPONENTS
// ============================================================

import Navbar from "./components/common/Navbar";
import HeroSection from "./components/common/HeroSection";
import HowItWorks from "./components/common/HowItWorks";
import Capabilities from "./components/common/Capabilities";
import WhyPlanwise from "./components/common/WhyPlanwise";
import FAQ from "./components/common/FAQ";
import FinalCTA from "./components/common/FinalCTA";
import Footer from "./components/common/Footer";
import ToastProvider from "./components/common/ToastProvider";

// ============================================================
// AUTHENTICATION
// ============================================================

import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// ============================================================
// ADMIN PANEL
// ============================================================

import AdminRoutes from "./routes/AdminRoutes";

// ============================================================
// EMPLOYEE PANEL
// ============================================================

import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProjects from "./pages/employee/EmployeeProjects";
import EmployeeCalendar from "./pages/employee/EmployeeCalendar";
import EmployeeProjectDetails from "./pages/employee/EmployeeProjectDetails";
import EmployeeTeam from "./pages/employee/EmployeeTeam";
import EmployeeMessages from "./pages/employee/EmployeeMessages";
import EmployeeNotifications from "./pages/employee/EmployeeNotifications";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeSettings from "./pages/employee/EmployeeSettings";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeSetup from "./pages/employee/EmployeeSetup";
import EmployeeForgotPassword from "./pages/employee/EmployeeForgotPassword";
import EmployeeResetPassword from "./pages/employee/EmployeeResetPassword";

// ============================================================
// USER APP
// ============================================================

import Dashboard from "./pages/app/Dashboard";
import AppLayout from "./layouts/AppLayout";
import NewEstimate from "./pages/app/NewEstimate";
import Projects from "./pages/app/Projects";
import ProjectDetails from "./pages/app/ProjectDetails";
import Risks from "./pages/app/Risks";
import Recommendations from "./pages/app/Recommendations";
import Reports from "./pages/app/Reports";
import Notifications from "./pages/app/Notifications";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";

// ============================================================
// APP CONTENT
// ============================================================

function AppContent() {
  const path = window.location.pathname;

  // ==========================================================
  // ADMIN PANEL
  // ==========================================================

  if (path.startsWith("/admin")) {
    return <AdminRoutes />;
  }

  // ==========================================================
  // EMPLOYEE PANEL
  // ==========================================================

  if (
    path.startsWith("/employee/projects/") &&
    path !== "/employee/projects"
  ) {
    return (
      <EmployeeLayout>
        <EmployeeProjectDetails />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/login") {
    return <EmployeeLogin />;
  }

  if (path === "/employee/forgot-password") {
    return <EmployeeForgotPassword />;
  }

  if (path.startsWith("/employee/setup")) {
    return <EmployeeSetup />;
  }

  if (path === "/employee/dashboard") {
    return (
      <EmployeeLayout>
        <EmployeeDashboard />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/projects") {
    return (
      <EmployeeLayout>
        <EmployeeProjects />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/calendar") {
    return (
      <EmployeeLayout>
        <EmployeeCalendar />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/team") {
    return (
      <EmployeeLayout>
        <EmployeeTeam />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/messages") {
    return (
      <EmployeeLayout>
        <EmployeeMessages />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/notifications") {
    return (
      <EmployeeLayout>
        <EmployeeNotifications />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/profile") {
    return (
      <EmployeeLayout>
        <EmployeeProfile />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/settings") {
    return (
      <EmployeeLayout>
        <EmployeeSettings />
      </EmployeeLayout>
    );
  }

  if (path === "/employee/reset-password") {
    return <EmployeeResetPassword />;
  }

  // ==========================================================
  // USER APP
  // ==========================================================

  if (path === "/app/dashboard") {
    return (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    );
  }

  if (path === "/app/estimate/new") {
    return (
      <AppLayout>
        <NewEstimate />
      </AppLayout>
    );
  }

  if (path === "/app/projects") {
    return (
      <AppLayout>
        <Projects />
      </AppLayout>
    );
  }

  if (path.startsWith("/app/projects/")) {
    return (
      <AppLayout>
        <ProjectDetails />
      </AppLayout>
    );
  }

  if (path === "/app/risks") {
    return (
      <AppLayout>
        <Risks />
      </AppLayout>
    );
  }

  if (path === "/app/recommendations") {
    return (
      <AppLayout>
        <Recommendations />
      </AppLayout>
    );
  }

  if (path === "/app/reports") {
    return (
      <AppLayout>
        <Reports />
      </AppLayout>
    );
  }

  if (path === "/app/notifications") {
    return (
      <AppLayout>
        <Notifications />
      </AppLayout>
    );
  }

  if (path === "/app/profile") {
    return (
      <AppLayout>
        <Profile />
      </AppLayout>
    );
  }

  if (path === "/app/settings") {
    return (
      <AppLayout>
        <Settings />
      </AppLayout>
    );
  }

  // ==========================================================
  // AUTHENTICATION
  // ==========================================================

  if (path === "/auth/signin") {
    return <SignIn />;
  }

  if (path === "/auth/signup") {
    return <Signup />;
  }

  if (path === "/auth/forgot-password") {
    return <ForgotPassword />;
  }

  // ==========================================================
  // LANDING PAGE
  // ==========================================================

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <HeroSection />
        <HowItWorks />
        <Capabilities />
        <WhyPlanwise />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;