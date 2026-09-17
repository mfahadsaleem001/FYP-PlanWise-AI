import "./App.css";

import Navbar from "./components/common/Navbar";

import HeroSection from "./components/common/HeroSection";

import HowItWorks from "./components/common/HowItWorks";

import Capabilities from "./components/common/Capabilities";

import WhyPlanwise from "./components/common/WhyPlanwise";

import FAQ from "./components/common/FAQ";

import FinalCTA from "./components/common/FinalCTA";

import Footer from "./components/common/Footer";

import SignIn from "./pages/auth/SignIn";

import Signup from "./pages/auth/Signup";

import ForgotPassword from "./pages/auth/ForgotPassword";

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

import AdminRoutes from "./routes/AdminRoutes";



function App() {

  const path = window.location.pathname;


  // ============================================================
  // ADMIN PANEL
  // ============================================================

  if (path.startsWith("/admin")) {

    return <AdminRoutes />;

  }


  // ============================================================
  // APP DASHBOARD
  // ============================================================

  if (path === "/app/dashboard") {

    return (

      <AppLayout>

        <Dashboard />

      </AppLayout>

    );

  }


  // ============================================================
  // NEW ESTIMATE
  // ============================================================

  if (path === "/app/estimate/new") {

    return (

      <AppLayout>

        <NewEstimate />

      </AppLayout>

    );

  }


  // ============================================================
  // PROJECTS PAGE
  // ============================================================

  if (path === "/app/projects") {

    return (

      <AppLayout>

        <Projects />

      </AppLayout>

    );

  }


  // ============================================================
  // PROJECT DETAILS
  // ============================================================

  if (path.startsWith("/app/projects/")) {

    return (

      <AppLayout>

        <ProjectDetails />

      </AppLayout>

    );

  }


  // ============================================================
  // RISKS
  // ============================================================

  if (path === "/app/risks") {

    return (

      <AppLayout>

        <Risks />

      </AppLayout>

    );

  }


  // ============================================================
  // RECOMMENDATIONS
  // ============================================================

  if (path === "/app/recommendations") {

    return (

      <AppLayout>

        <Recommendations />

      </AppLayout>

    );

  }


  // ============================================================
  // REPORTS
  // ============================================================

  if (path === "/app/reports") {

    return (

      <AppLayout>

        <Reports />

      </AppLayout>

    );

  }


  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  if (path === "/app/notifications") {

    return (

      <AppLayout>

        <Notifications />

      </AppLayout>

    );

  }


  // ============================================================
  // PROFILE
  // ============================================================

  if (path === "/app/profile") {

    return (

      <AppLayout>

        <Profile />

      </AppLayout>

    );

  }


  // ============================================================
  // SETTINGS
  // ============================================================

  if (path === "/app/settings") {

    return (

      <AppLayout>

        <Settings />

      </AppLayout>

    );

  }


  // ============================================================
  // SIGNIN PAGE
  // ============================================================

  if (path === "/auth/signin") {

    return <SignIn />;

  }


  // ============================================================
  // SIGNUP PAGE
  // ============================================================

  if (path === "/auth/signup") {

    return <Signup />;

  }


  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  if (path === "/auth/forgot-password") {

    return <ForgotPassword />;

  }


  // ============================================================
  // LANDING PAGE
  // ============================================================

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


export default App;