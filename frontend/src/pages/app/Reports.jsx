import { useState } from "react";

import {
  FileText,
  Download,
  Eye,
  CalendarDays,
  FolderKanban,
  FileBarChart,
  CheckCircle2,
  X,
  Clock3,
  Users,
  CircleDollarSign,
  ShieldAlert,
  Lightbulb,
  Cpu,
  Layers3,
  Milestone,
  UserRoundCheck,
  MessageSquare,
  FileDown,
} from "lucide-react";

import jsPDF from "jspdf";

import "./Reports.css";

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  /*
   * ============================================================
   * COMPLETE DEMO REPORT DATA
   * ============================================================
   *
   * Later this entire object will come from the backend/API.
   */

  const reports = [
    {
      id: 1,
      name: "AI Learning Platform - Project Report",
      project: "AI Learning Platform",
      type: "Complete Project Report",
      date: "Sep 10, 2026",
      status: "Generated",

      description:
        "An AI-powered learning platform designed to provide personalized learning experiences, intelligent recommendations, progress tracking, and analytics for learners.",

      projectType: "AI / Machine Learning",

      estimation: {
        cost: "PKR 1.20M",
        effort: "960 person-hours",
        duration: "6 months",
        teamSize: "5 resources",
        complexity: "High",
        confidence: "86%",
      },

      resources: [
        {
          role: "Backend Developer",
          quantity: 2,
          purpose:
            "Build APIs, authentication, business logic, database integration, and backend services.",
          status: "Partial Gap",
        },
        {
          role: "Frontend Developer",
          quantity: 1,
          purpose:
            "Develop the learning interface, dashboards, learner workflows, and responsive UI.",
          status: "Available",
        },
        {
          role: "UI/UX Designer",
          quantity: 1,
          purpose:
            "Design user journeys, learning screens, dashboards, and interaction patterns.",
          status: "Available",
        },
        {
          role: "QA Engineer",
          quantity: 1,
          purpose:
            "Validate functionality, integrations, usability, performance, and release quality.",
          status: "Available",
        },
      ],

      risks: [
        {
          title: "Insufficient Development Capacity",
          category: "Resource Availability",
          severity: "High",
          probability: "High",
          impact:
            "Limited development capacity may increase the project timeline and delay planned milestones.",
          mitigation:
            "Allocate additional backend capacity or adjust the delivery schedule.",
        },
        {
          title: "ML Model Integration Complexity",
          category: "Technical",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Integrating the trained ML model with application services may require additional development and testing effort.",
          mitigation:
            "Define a stable ML inference interface and perform integration testing early.",
        },
        {
          title: "Requirement Changes",
          category: "Requirements",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Changes to core learning requirements can increase effort and affect milestones.",
          mitigation:
            "Finalize core requirements early and apply controlled change management.",
        },
        {
          title: "Data Quality Risk",
          category: "Data / ML",
          severity: "Medium",
          probability: "Low",
          impact:
            "Poor historical or learner data can reduce the reliability of intelligent predictions.",
          mitigation:
            "Clean, validate, and continuously monitor the quality of project data.",
        },
      ],

      technologies: [
        {
          category: "Frontend",
          name: "React.js",
          reason:
            "Suitable for building a responsive component-based learning interface.",
        },
        {
          category: "Backend",
          name: "FastAPI",
          reason:
            "Provides a structured API layer for application services and ML inference.",
        },
        {
          category: "Database",
          name: "PostgreSQL",
          reason:
            "Suitable for structured application data, users, learning records, and analytics.",
        },
        {
          category: "Machine Learning",
          name: "Scikit-learn",
          reason:
            "Can support trained estimation and recommendation models.",
        },
        {
          category: "Data Processing",
          name: "Pandas / NumPy",
          reason:
            "Useful for data preparation, feature engineering, and numerical processing.",
        },
        {
          category: "AI Analysis",
          name: "Gemini API",
          reason:
            "Can support requirement interpretation, explanations, recommendations, and planning assistance.",
        },
      ],

      architecture: [
        "User Interface",
        "FastAPI Services",
        "ML Inference",
        "PostgreSQL",
        "AI Analysis",
      ],

      planning: [
        {
          title: "Requirements & Discovery",
          description:
            "Finalize functional requirements, user journeys, project scope, and acceptance criteria.",
        },
        {
          title: "Architecture & UI Design",
          description:
            "Design system architecture, database structure, API boundaries, and user interface flows.",
        },
        {
          title: "Core Development",
          description:
            "Implement frontend workflows, backend services, authentication, database operations, and integrations.",
        },
        {
          title: "ML Integration",
          description:
            "Prepare model inference, connect prediction services, and validate model outputs inside the application.",
        },
        {
          title: "Testing & QA",
          description:
            "Perform functional, API, integration, usability, and regression testing.",
        },
        {
          title: "Deployment",
          description:
            "Prepare production configuration, deployment environment, monitoring, and release validation.",
        },
      ],

      milestones: [
        {
          phase: "Requirements",
          duration: "3 weeks",
          cost: "PKR 120K",
          percentage: "10%",
        },
        {
          phase: "Design & Architecture",
          duration: "4 weeks",
          cost: "PKR 144K",
          percentage: "12%",
        },
        {
          phase: "Development",
          duration: "12 weeks",
          cost: "PKR 576K",
          percentage: "48%",
        },
        {
          phase: "ML Integration",
          duration: "4 weeks",
          cost: "PKR 144K",
          percentage: "12%",
        },
        {
          phase: "Testing & QA",
          duration: "4 weeks",
          cost: "PKR 120K",
          percentage: "10%",
        },
        {
          phase: "Deployment",
          duration: "2 weeks",
          cost: "PKR 96K",
          percentage: "8%",
        },
      ],

      developmentRequest: {
        status: "Pending Admin Review",
        submitted: "Sep 10, 2026",
        description:
          "The user has requested development support for this project. The request requires administrative resource review before actual employee assignment.",
      },

      communication: {
        status: "Active discussion",
        description:
          "Project-specific communication with the administration is available for resource clarification, assignment questions, and development coordination.",
      },
    },

    {
      id: 2,
      name: "E-Commerce Marketplace - Estimation Report",
      project: "E-Commerce Marketplace",
      type: "Estimation Report",
      date: "Sep 08, 2026",
      status: "Generated",

      description:
        "A scalable e-commerce marketplace for product discovery, shopping, customer accounts, order management, and administrative operations.",

      projectType: "E-Commerce",

      estimation: {
        cost: "PKR 850K",
        effort: "680 person-hours",
        duration: "5 months",
        teamSize: "4 resources",
        complexity: "Medium",
        confidence: "88%",
      },

      resources: [
        {
          role: "Backend Developer",
          quantity: 1,
          purpose:
            "Develop APIs, authentication, order processing, product management, and backend services.",
          status: "Available",
        },
        {
          role: "Frontend Developer",
          quantity: 1,
          purpose:
            "Build storefront, product browsing, cart, checkout, and account interfaces.",
          status: "Available",
        },
        {
          role: "UI/UX Designer",
          quantity: 1,
          purpose:
            "Design customer shopping journeys and responsive interface layouts.",
          status: "Available",
        },
        {
          role: "QA Engineer",
          quantity: 1,
          purpose:
            "Validate shopping workflows, payments, orders, APIs, and release quality.",
          status: "Available",
        },
      ],

      risks: [
        {
          title: "Payment Integration Risk",
          category: "Technical",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Third-party payment integration issues may affect checkout completion.",
          mitigation:
            "Use sandbox testing, clear API contracts, and transaction failure handling.",
        },
        {
          title: "Requirement Changes",
          category: "Requirements",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Changes to shopping or order workflows may increase development effort.",
          mitigation:
            "Finalize core commerce workflows before development begins.",
        },
      ],

      technologies: [
        {
          category: "Frontend",
          name: "React.js",
          reason:
            "Component-based architecture is suitable for a dynamic marketplace interface.",
        },
        {
          category: "Backend",
          name: "FastAPI",
          reason:
            "Provides structured APIs for users, products, carts, and orders.",
        },
        {
          category: "Database",
          name: "PostgreSQL",
          reason:
            "Suitable for relational commerce and transaction data.",
        },
        {
          category: "Security",
          name: "JWT Authentication",
          reason:
            "Supports secure authenticated access to customer and administrative resources.",
        },
      ],

      architecture: [
        "Customer Interface",
        "FastAPI API",
        "Commerce Services",
        "PostgreSQL",
        "Payment Service",
      ],

      planning: [
        {
          title: "Commerce Requirements",
          description:
            "Define catalog, customer, cart, checkout, order, and administration requirements.",
        },
        {
          title: "UI & Architecture",
          description:
            "Design customer experience and define application architecture.",
        },
        {
          title: "Marketplace Development",
          description:
            "Implement catalog, shopping cart, checkout, customer accounts, and management APIs.",
        },
        {
          title: "Testing",
          description:
            "Validate core shopping flows, APIs, security, and edge cases.",
        },
        {
          title: "Deployment",
          description:
            "Prepare production deployment and operational configuration.",
        },
      ],

      milestones: [
        {
          phase: "Requirements",
          duration: "3 weeks",
          cost: "PKR 85K",
          percentage: "10%",
        },
        {
          phase: "Design",
          duration: "3 weeks",
          cost: "PKR 102K",
          percentage: "12%",
        },
        {
          phase: "Development",
          duration: "12 weeks",
          cost: "PKR 408K",
          percentage: "48%",
        },
        {
          phase: "Testing",
          duration: "5 weeks",
          cost: "PKR 170K",
          percentage: "20%",
        },
        {
          phase: "Deployment",
          duration: "2 weeks",
          cost: "PKR 85K",
          percentage: "10%",
        },
      ],

      developmentRequest: {
        status: "Not Requested",
        submitted: "—",
        description:
          "Development has not yet been requested for this project.",
      },

      communication: {
        status: "No active discussion",
        description:
          "No project-specific administrative communication has been initiated.",
      },
    },

    {
      id: 3,
      name: "Healthcare Mobile App - Planning Report",
      project: "Healthcare Mobile App",
      type: "Planning Report",
      date: "Sep 05, 2026",
      status: "Generated",

      description:
        "A mobile healthcare application focused on patient interaction, appointment workflows, healthcare information, and secure user access.",

      projectType: "Mobile Application",

      estimation: {
        cost: "PKR 1.05M",
        effort: "840 person-hours",
        duration: "7 months",
        teamSize: "4 resources",
        complexity: "High",
        confidence: "84%",
      },

      resources: [
        {
          role: "Mobile Developer",
          quantity: 2,
          purpose:
            "Develop mobile application workflows, navigation, API integration, and device-specific functionality.",
          status: "Partial Gap",
        },
        {
          role: "UI/UX Designer",
          quantity: 1,
          purpose:
            "Design accessible healthcare workflows and mobile user interfaces.",
          status: "Available",
        },
        {
          role: "QA Engineer",
          quantity: 1,
          purpose:
            "Test mobile workflows, usability, compatibility, and release quality.",
          status: "Available",
        },
      ],

      risks: [
        {
          title: "Healthcare Data Security",
          category: "Security",
          severity: "High",
          probability: "Medium",
          impact:
            "Security weaknesses could expose sensitive application data.",
          mitigation:
            "Apply strong authentication, authorization, encryption, validation, and security testing.",
        },
        {
          title: "Mobile Compatibility",
          category: "Technical",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Differences between mobile devices and operating-system versions may affect usability.",
          mitigation:
            "Use device compatibility testing and maintain supported platform versions.",
        },
      ],

      technologies: [
        {
          category: "Mobile",
          name: "React Native",
          reason:
            "Supports cross-platform mobile application development.",
        },
        {
          category: "Backend",
          name: "FastAPI",
          reason:
            "Provides structured APIs for mobile application services.",
        },
        {
          category: "Database",
          name: "PostgreSQL",
          reason:
            "Suitable for structured healthcare application data.",
        },
        {
          category: "Security",
          name: "JWT + Role-Based Access",
          reason:
            "Supports controlled access to protected healthcare functionality.",
        },
      ],

      architecture: [
        "Mobile Application",
        "FastAPI API",
        "Application Services",
        "PostgreSQL",
        "Security Layer",
      ],

      planning: [
        {
          title: "Healthcare Requirements",
          description:
            "Define patient workflows, appointments, access rules, and core application requirements.",
        },
        {
          title: "Mobile UX",
          description:
            "Create accessible mobile-first user flows and interface designs.",
        },
        {
          title: "Application Development",
          description:
            "Develop mobile features, backend APIs, authentication, and data services.",
        },
        {
          title: "Security & QA",
          description:
            "Validate access control, data protection, functionality, and device compatibility.",
        },
        {
          title: "Release",
          description:
            "Prepare production configuration and mobile release processes.",
        },
      ],

      milestones: [
        {
          phase: "Requirements",
          duration: "4 weeks",
          cost: "PKR 105K",
          percentage: "10%",
        },
        {
          phase: "UX & Architecture",
          duration: "5 weeks",
          cost: "PKR 158K",
          percentage: "15%",
        },
        {
          phase: "Development",
          duration: "18 weeks",
          cost: "PKR 525K",
          percentage: "50%",
        },
        {
          phase: "Security & QA",
          duration: "7 weeks",
          cost: "PKR 158K",
          percentage: "15%",
        },
        {
          phase: "Release",
          duration: "4 weeks",
          cost: "PKR 104K",
          percentage: "10%",
        },
      ],

      developmentRequest: {
        status: "Not Requested",
        submitted: "—",
        description:
          "Development has not yet been requested for this project.",
      },

      communication: {
        status: "No active discussion",
        description:
          "No project-specific administrative communication has been initiated.",
      },
    },

    {
      id: 4,
      name: "Company Management Portal - Project Report",
      project: "Company Management Portal",
      type: "Complete Project Report",
      date: "Sep 02, 2026",
      status: "Generated",

      description:
        "A centralized business management portal for internal operations, employee workflows, reporting, and administrative management.",

      projectType: "Web Application",

      estimation: {
        cost: "PKR 620K",
        effort: "496 person-hours",
        duration: "4 months",
        teamSize: "4 resources",
        complexity: "Medium",
        confidence: "90%",
      },

      resources: [
        {
          role: "Backend Developer",
          quantity: 1,
          purpose:
            "Develop business APIs, authentication, data operations, and administrative services.",
          status: "Available",
        },
        {
          role: "Frontend Developer",
          quantity: 1,
          purpose:
            "Build management dashboards and business workflows.",
          status: "Available",
        },
        {
          role: "UI/UX Designer",
          quantity: 1,
          purpose:
            "Design internal management interfaces and workflows.",
          status: "Available",
        },
        {
          role: "QA Engineer",
          quantity: 1,
          purpose:
            "Validate functionality, permissions, workflows, and reporting.",
          status: "Available",
        },
      ],

      risks: [
        {
          title: "Access Control Risk",
          category: "Security",
          severity: "Medium",
          probability: "Medium",
          impact:
            "Incorrect permissions could expose administrative functionality.",
          mitigation:
            "Implement role-based authorization and backend permission checks.",
        },
        {
          title: "Workflow Complexity",
          category: "Technical",
          severity: "Low",
          probability: "Low",
          impact:
            "Complex internal workflows may require additional refinement.",
          mitigation:
            "Validate workflows with stakeholders before implementation.",
        },
      ],

      technologies: [
        {
          category: "Frontend",
          name: "React.js",
          reason:
            "Suitable for responsive dashboards and reusable management components.",
        },
        {
          category: "Backend",
          name: "FastAPI",
          reason:
            "Provides a clean API architecture for business services.",
        },
        {
          category: "Database",
          name: "PostgreSQL",
          reason:
            "Suitable for structured organizational data.",
        },
        {
          category: "Security",
          name: "JWT + RBAC",
          reason:
            "Supports authenticated and role-controlled access.",
        },
      ],

      architecture: [
        "Management Portal",
        "FastAPI Services",
        "Business Logic",
        "PostgreSQL",
        "Authentication",
      ],

      planning: [
        {
          title: "Business Requirements",
          description:
            "Define internal workflows, roles, reporting requirements, and acceptance criteria.",
        },
        {
          title: "System Design",
          description:
            "Define application structure, database design, API boundaries, and UI workflows.",
        },
        {
          title: "Development",
          description:
            "Implement management features, dashboards, APIs, authentication, and database operations.",
        },
        {
          title: "Testing",
          description:
            "Validate business workflows, permissions, reports, and integrations.",
        },
        {
          title: "Deployment",
          description:
            "Prepare production deployment and administrative configuration.",
        },
      ],

      milestones: [
        {
          phase: "Requirements",
          duration: "2 weeks",
          cost: "PKR 62K",
          percentage: "10%",
        },
        {
          phase: "Design",
          duration: "3 weeks",
          cost: "PKR 93K",
          percentage: "15%",
        },
        {
          phase: "Development",
          duration: "10 weeks",
          cost: "PKR 310K",
          percentage: "50%",
        },
        {
          phase: "Testing",
          duration: "4 weeks",
          cost: "PKR 93K",
          percentage: "15%",
        },
        {
          phase: "Deployment",
          duration: "3 weeks",
          cost: "PKR 62K",
          percentage: "10%",
        },
      ],

      developmentRequest: {
        status: "Not Requested",
        submitted: "—",
        description:
          "Development has not yet been requested for this project.",
      },

      communication: {
        status: "No active discussion",
        description:
          "No project-specific administrative communication has been initiated.",
      },
    },
  ];

  /*
   * ============================================================
   * VIEW REPORT
   * ============================================================
   */

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  /*
   * ============================================================
   * PDF HELPERS
   * ============================================================
   */

  const addWrappedText = (
    doc,
    text,
    x,
    y,
    maxWidth,
    lineHeight = 5.5,
    fontSize = 9
  ) => {
    doc.setFontSize(fontSize);

    const lines = doc.splitTextToSize(
      String(text || ""),
      maxWidth
    );

    doc.text(lines, x, y);

    return y + lines.length * lineHeight;
  };

  const ensureSpace = (doc, y, requiredSpace = 25) => {
    const pageHeight = doc.internal.pageSize.getHeight();

    if (y + requiredSpace > pageHeight - 18) {
      doc.addPage();
      return 20;
    }

    return y;
  };

  const addSectionTitle = (doc, title, y) => {
    y = ensureSpace(doc, y, 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(113, 29, 60);
    doc.text(title, 18, y);

    doc.setDrawColor(177, 138, 82);
    doc.setLineWidth(0.5);
    doc.line(18, y + 3, 192, y + 3);

    return y + 11;
  };

  const addLabelValue = (
    doc,
    label,
    value,
    x,
    y,
    width = 82
  ) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(120, 100, 100);
    doc.text(label, x, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(44, 27, 27);

    const lines = doc.splitTextToSize(
      String(value || "—"),
      width
    );

    doc.text(lines, x, y + 5);

    return y + Math.max(12, lines.length * 4.5 + 5);
  };

  const addBullet = (
    doc,
    text,
    x,
    y,
    width
  ) => {
    y = ensureSpace(doc, y, 12);

    doc.setFillColor(177, 138, 82);
    doc.circle(x + 1.5, y - 1.2, 1, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 55, 55);

    const lines = doc.splitTextToSize(
      text,
      width - 8
    );

    doc.text(lines, x + 6, y);

    return y + lines.length * 4.7 + 4;
  };

  /*
   * ============================================================
   * GENERATE PDF
   * ============================================================
   */

  const generatePdf = (report) => {
    setIsGenerating(true);

    setTimeout(() => {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        doc.internal.pageSize.getWidth();

      /*
       * HEADER
       */

      doc.setFillColor(44, 27, 27);
      doc.rect(0, 0, pageWidth, 30, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text("PLANWISE AI", 18, 13);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(218, 198, 180);
      doc.text(
        "PROJECT ESTIMATION & PLANNING REPORT",
        18,
        20
      );

      doc.setFontSize(7);
      doc.text(
        `Generated: ${report.date}`,
        pageWidth - 18,
        20,
        { align: "right" }
      );

      /*
       * REPORT TITLE
       */

      let y = 43;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(21);
      doc.setTextColor(44, 27, 27);

      const titleLines = doc.splitTextToSize(
        report.project,
        170
      );

      doc.text(titleLines, 18, y);

      y += titleLines.length * 8 + 3;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(113, 90, 90);

      doc.text(
        report.type,
        18,
        y
      );

      y += 12;

      /*
       * PROJECT OVERVIEW BOX
       */

      doc.setFillColor(250, 246, 239);
      doc.setDrawColor(225, 215, 204);
      doc.roundedRect(
        18,
        y,
        174,
        43,
        3,
        3,
        "FD"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(113, 29, 60);
      doc.text(
        "PROJECT OVERVIEW",
        24,
        y + 9
      );

      y += 16;

      const col1 = 24;
      const col2 = 108;

      y = addLabelValue(
        doc,
        "PROJECT TYPE",
        report.projectType,
        col1,
        y,
        70
      );

      addLabelValue(
        doc,
        "REPORT STATUS",
        report.status,
        col2,
        y - 12,
        70
      );

      y += 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(70, 55, 55);

      const descriptionLines =
        doc.splitTextToSize(
          report.description,
          162
        );

      doc.text(
        descriptionLines,
        24,
        y + 2
      );

      y +=
        descriptionLines.length * 4.5 +
        16;

      /*
       * ESTIMATION
       */

      y = addSectionTitle(
        doc,
        "1. Estimation Summary",
        y
      );

      const estimate = report.estimation;

      const estimateItems = [
        ["Estimated Cost", estimate.cost],
        ["Estimated Effort", estimate.effort],
        ["Estimated Duration", estimate.duration],
        ["Required Team", estimate.teamSize],
        ["Complexity", estimate.complexity],
        ["Confidence", estimate.confidence],
      ];

      for (let i = 0; i < estimateItems.length; i += 2) {
        y = ensureSpace(doc, y, 22);

        doc.setFillColor(255, 252, 247);
        doc.setDrawColor(230, 220, 210);

        doc.roundedRect(
          18,
          y - 5,
          83,
          17,
          2,
          2,
          "FD"
        );

        doc.roundedRect(
          109,
          y - 5,
          83,
          17,
          2,
          2,
          "FD"
        );

        addLabelValue(
          doc,
          estimateItems[i][0],
          estimateItems[i][1],
          23,
          y,
          72
        );

        if (estimateItems[i + 1]) {
          addLabelValue(
            doc,
            estimateItems[i + 1][0],
            estimateItems[i + 1][1],
            114,
            y,
            72
          );
        }

        y += 20;
      }

      doc.setFontSize(7.5);
      doc.setTextColor(125, 108, 108);

      y = addWrappedText(
        doc,
        "These values represent intelligent estimates based on the current project analysis. They should be treated as planning ranges rather than guaranteed delivery commitments.",
        18,
        y + 1,
        174,
        4.3,
        7.5
      );

      y += 8;

      /*
       * RESOURCES
       */

      y = addSectionTitle(
        doc,
        "2. Resource Planning",
        y
      );

      for (const resource of report.resources) {
        y = ensureSpace(doc, y, 28);

        doc.setFillColor(250, 246, 239);
        doc.setDrawColor(225, 215, 204);

        doc.roundedRect(
          18,
          y - 5,
          174,
          25,
          2,
          2,
          "FD"
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(44, 27, 27);

        doc.text(
          resource.role,
          23,
          y + 2
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(113, 29, 60);

        doc.text(
          `Required: ${resource.quantity}`,
          188,
          y + 2,
          { align: "right" }
        );

        y = addWrappedText(
          doc,
          resource.purpose,
          23,
          y + 8,
          120,
          4.2,
          7.8
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(134, 102, 49);

        doc.text(
          `Status: ${resource.status}`,
          188,
          y - 1,
          { align: "right" }
        );

        y += 8;
      }

      /*
       * RISKS
       */

      y = addSectionTitle(
        doc,
        "3. Risk Analysis",
        y
      );

      for (const risk of report.risks) {
        y = ensureSpace(doc, y, 42);

        doc.setFillColor(255, 251, 246);
        doc.setDrawColor(229, 217, 204);

        doc.roundedRect(
          18,
          y - 5,
          174,
          36,
          2,
          2,
          "FD"
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(44, 27, 27);

        doc.text(
          risk.title,
          23,
          y + 2
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(120, 100, 100);

        doc.text(
          `${risk.category} • Severity: ${risk.severity} • Probability: ${risk.probability}`,
          23,
          y + 7
        );

        y = addWrappedText(
          doc,
          `Potential Impact: ${risk.impact}`,
          23,
          y + 14,
          164,
          4.2,
          7.6
        );

        y = addWrappedText(
          doc,
          `Mitigation: ${risk.mitigation}`,
          23,
          y + 3,
          164,
          4.2,
          7.6
        );

        y += 8;
      }

      /*
       * TECHNOLOGY
       */

      y = addSectionTitle(
        doc,
        "4. Technology Recommendations",
        y
      );

      for (const technology of report.technologies) {
        y = ensureSpace(doc, y, 24);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(113, 29, 60);

        doc.text(
          technology.category.toUpperCase(),
          18,
          y
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(44, 27, 27);

        doc.text(
          technology.name,
          60,
          y
        );

        y = addWrappedText(
          doc,
          technology.reason,
          60,
          y + 5,
          132,
          4.3,
          7.8
        );

        y += 5;
      }

      /*
       * ARCHITECTURE
       */

      y = addSectionTitle(
        doc,
        "5. Recommended Architecture",
        y
      );

      y = addWrappedText(
        doc,
        "The recommended high-level architecture separates the user interface, application services, machine-learning inference, persistent storage, and AI-assisted analysis responsibilities.",
        18,
        y,
        174,
        4.5,
        8
      );

      y += 7;

      report.architecture.forEach(
        (node, index) => {
          y = ensureSpace(doc, y, 16);

          doc.setFillColor(250, 246, 239);
          doc.setDrawColor(225, 215, 204);

          doc.roundedRect(
            18,
            y - 5,
            174,
            12,
            2,
            2,
            "FD"
          );

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.5);
          doc.setTextColor(44, 27, 27);

          doc.text(
            `${index + 1}. ${node}`,
            24,
            y + 2
          );

          y += 16;
        }
      );

      /*
       * PLANNING
       */

      y = addSectionTitle(
        doc,
        "6. Project Planning Recommendations",
        y
      );

      for (const item of report.planning) {
        y = ensureSpace(doc, y, 28);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(44, 27, 27);

        doc.text(
          item.title,
          18,
          y
        );

        y = addWrappedText(
          doc,
          item.description,
          18,
          y + 5,
          174,
          4.4,
          8
        );

        y += 5;
      }

      /*
       * MILESTONES + FINANCIAL PLANNING
       */

      y = addSectionTitle(
        doc,
        "7. Milestones & Financial Cost Planning",
        y
      );

      y = addWrappedText(
        doc,
        "The estimated project cost is distributed across major delivery phases for planning purposes. This represents estimated financial allocation, not actual project spending.",
        18,
        y,
        174,
        4.4,
        8
      );

      y += 8;

      /*
       * Table Header
       */

      y = ensureSpace(doc, y, 20);

      doc.setFillColor(44, 27, 27);
      doc.rect(
        18,
        y - 5,
        174,
        9,
        "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);

      doc.text("PHASE", 22, y + 1);
      doc.text("DURATION", 70, y + 1);
      doc.text("EST. COST", 113, y + 1);
      doc.text("SHARE", 164, y + 1);

      y += 11;

      report.milestones.forEach(
        (milestone, index) => {
          y = ensureSpace(doc, y, 15);

          if (index % 2 === 0) {
            doc.setFillColor(250, 246, 239);
            doc.rect(
              18,
              y - 5,
              174,
              10,
              "F"
            );
          }

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.8);
          doc.setTextColor(60, 48, 48);

          doc.text(
            milestone.phase,
            22,
            y + 1
          );

          doc.text(
            milestone.duration,
            70,
            y + 1
          );

          doc.text(
            milestone.cost,
            113,
            y + 1
          );

          doc.text(
            milestone.percentage,
            164,
            y + 1
          );

          y += 10;
        }
      );

      /*
       * DEVELOPMENT REQUEST
       */

      y += 5;

      y = addSectionTitle(
        doc,
        "8. Development Request",
        y
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(44, 27, 27);

      doc.text(
        `Status: ${report.developmentRequest.status}`,
        18,
        y
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 82, 82);

      doc.text(
        `Submitted: ${report.developmentRequest.submitted}`,
        18,
        y + 6
      );

      y = addWrappedText(
        doc,
        report.developmentRequest.description,
        18,
        y + 13,
        174,
        4.4,
        8
      );

      y += 7;

      /*
       * COMMUNICATION
       */

      y = addSectionTitle(
        doc,
        "9. Project Communication",
        y
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(44, 27, 27);

      doc.text(
        `Communication Status: ${report.communication.status}`,
        18,
        y
      );

      y = addWrappedText(
        doc,
        report.communication.description,
        18,
        y + 7,
        174,
        4.4,
        8
      );

      y += 8;

      /*
       * FINAL NOTE
       */

      y = ensureSpace(doc, y, 32);

      doc.setFillColor(250, 246, 239);
      doc.setDrawColor(177, 138, 82);

      doc.roundedRect(
        18,
        y,
        174,
        24,
        2,
        2,
        "FD"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(113, 29, 60);

      doc.text(
        "REPORT NOTE",
        24,
        y + 8
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(85, 70, 70);

      const noteLines =
        doc.splitTextToSize(
          "This report combines the currently available project estimation, risk, resource, technology, architecture, planning, milestone, and development-request information.",
          158
        );

      doc.text(
        noteLines,
        24,
        y + 14
      );

      /*
       * FOOTER ON EVERY PAGE
       */

      const totalPages =
        doc.internal.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        doc.setPage(page);

        const pageHeight =
          doc.internal.pageSize.getHeight();

        doc.setDrawColor(225, 215, 204);
        doc.setLineWidth(0.3);

        doc.line(
          18,
          pageHeight - 13,
          192,
          pageHeight - 13
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(130, 115, 115);

        doc.text(
          "PlanWise AI • Intelligent Project Estimation & Planning",
          18,
          pageHeight - 7
        );

        doc.text(
          `Page ${page} of ${totalPages}`,
          192,
          pageHeight - 7,
          { align: "right" }
        );
      }

      const safeName =
        report.project
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase();

      doc.save(
        `${safeName}-planwise-report.pdf`
      );

      setIsGenerating(false);
    }, 250);
  };

  /*
   * ============================================================
   * TEXT DOWNLOAD
   * ============================================================
   */

  const generateTextReport = (report) => {
    const lines = [];

    lines.push("PLANWISE AI");
    lines.push(
      "INTELLIGENT PROJECT ESTIMATION & PLANNING REPORT"
    );
    lines.push("=".repeat(72));
    lines.push("");

    lines.push(`PROJECT: ${report.project}`);
    lines.push(`REPORT TYPE: ${report.type}`);
    lines.push(`PROJECT TYPE: ${report.projectType}`);
    lines.push(`GENERATED: ${report.date}`);
    lines.push(`STATUS: ${report.status}`);
    lines.push("");

    lines.push("PROJECT DESCRIPTION");
    lines.push("-".repeat(72));
    lines.push(report.description);
    lines.push("");

    lines.push("1. ESTIMATION SUMMARY");
    lines.push("-".repeat(72));
    lines.push(
      `Estimated Cost: ${report.estimation.cost}`
    );
    lines.push(
      `Estimated Effort: ${report.estimation.effort}`
    );
    lines.push(
      `Estimated Duration: ${report.estimation.duration}`
    );
    lines.push(
      `Required Team: ${report.estimation.teamSize}`
    );
    lines.push(
      `Complexity: ${report.estimation.complexity}`
    );
    lines.push(
      `Confidence: ${report.estimation.confidence}`
    );
    lines.push("");

    lines.push("2. RESOURCE PLANNING");
    lines.push("-".repeat(72));

    report.resources.forEach(
      (resource, index) => {
        lines.push(
          `${index + 1}. ${resource.role}`
        );
        lines.push(
          `   Required: ${resource.quantity}`
        );
        lines.push(
          `   Status: ${resource.status}`
        );
        lines.push(
          `   Purpose: ${resource.purpose}`
        );
        lines.push("");
      }
    );

    lines.push("3. RISK ANALYSIS");
    lines.push("-".repeat(72));

    report.risks.forEach(
      (risk, index) => {
        lines.push(
          `${index + 1}. ${risk.title}`
        );
        lines.push(
          `   Category: ${risk.category}`
        );
        lines.push(
          `   Severity: ${risk.severity}`
        );
        lines.push(
          `   Probability: ${risk.probability}`
        );
        lines.push(
          `   Potential Impact: ${risk.impact}`
        );
        lines.push(
          `   Mitigation: ${risk.mitigation}`
        );
        lines.push("");
      }
    );

    lines.push("4. TECHNOLOGY RECOMMENDATIONS");
    lines.push("-".repeat(72));

    report.technologies.forEach(
      (technology, index) => {
        lines.push(
          `${index + 1}. ${technology.name}`
        );
        lines.push(
          `   Category: ${technology.category}`
        );
        lines.push(
          `   Reason: ${technology.reason}`
        );
        lines.push("");
      }
    );

    lines.push("5. RECOMMENDED ARCHITECTURE");
    lines.push("-".repeat(72));

    report.architecture.forEach(
      (node, index) => {
        lines.push(
          `${index + 1}. ${node}`
        );
      }
    );

    lines.push("");

    lines.push(
      "6. PROJECT PLANNING RECOMMENDATIONS"
    );
    lines.push("-".repeat(72));

    report.planning.forEach(
      (item, index) => {
        lines.push(
          `${index + 1}. ${item.title}`
        );
        lines.push(
          `   ${item.description}`
        );
        lines.push("");
      }
    );

    lines.push(
      "7. MILESTONES & FINANCIAL COST PLANNING"
    );
    lines.push("-".repeat(72));

    report.milestones.forEach(
      (milestone, index) => {
        lines.push(
          `${index + 1}. ${milestone.phase}`
        );
        lines.push(
          `   Duration: ${milestone.duration}`
        );
        lines.push(
          `   Estimated Cost: ${milestone.cost}`
        );
        lines.push(
          `   Cost Share: ${milestone.percentage}`
        );
        lines.push("");
      }
    );

    lines.push("8. DEVELOPMENT REQUEST");
    lines.push("-".repeat(72));
    lines.push(
      `Status: ${report.developmentRequest.status}`
    );
    lines.push(
      `Submitted: ${report.developmentRequest.submitted}`
    );
    lines.push(
      report.developmentRequest.description
    );
    lines.push("");

    lines.push("9. PROJECT COMMUNICATION");
    lines.push("-".repeat(72));
    lines.push(
      `Status: ${report.communication.status}`
    );
    lines.push(
      report.communication.description
    );
    lines.push("");

    lines.push("REPORT NOTE");
    lines.push("-".repeat(72));
    lines.push(
      "This report combines the currently available project estimation, risk, resource, technology, architecture, planning, milestone, and development-request information."
    );
    lines.push("");
    lines.push("Generated by PlanWise AI.");

    const text = lines.join("\n");

    const blob = new Blob(
      [text],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    const safeName =
      report.project
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

    anchor.href = url;
    anchor.download =
      `${safeName}-planwise-report.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="reports-page">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="reports-header">
        <div>
          <span className="page-eyebrow">
            PROJECT REPORTS
          </span>

          <h1>Reports</h1>

          <p>
            View, review, and download complete project
            estimation, risk, planning, resource, and
            financial reports.
          </p>
        </div>
      </div>

      {/* =====================================================
          REPORT SUMMARY
          ===================================================== */}

      <div className="reports-summary">
        <div className="report-summary-card">
          <div className="report-summary-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Reports</span>
            <strong>{reports.length}</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon">
            <FolderKanban size={21} />
          </div>

          <div>
            <span>Projects Covered</span>
            <strong>
              {new Set(
                reports.map(
                  (report) => report.project
                )
              ).size}
            </strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon">
            <FileBarChart size={21} />
          </div>

          <div>
            <span>Report Types</span>
            <strong>
              {new Set(
                reports.map(
                  (report) => report.type
                )
              ).size}
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          REPORT LIST
          ===================================================== */}

      <section className="reports-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              GENERATED REPORTS
            </span>

            <h2>Available Reports</h2>

            <p>
              Each report contains the available project
              estimation, planning, risk, resource,
              technology, milestone, and financial information.
            </p>
          </div>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Project</th>
                <th>Type</th>
                <th>Generated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="report-name-cell">
                      <div className="report-file-icon">
                        <FileText size={18} />
                      </div>

                      <div>
                        <strong>
                          {report.name}
                        </strong>

                        <span>
                          PDF + Text Report
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="report-project">
                      {report.project}
                    </span>
                  </td>

                  <td>
                    <span className="report-type">
                      {report.type}
                    </span>
                  </td>

                  <td>
                    <div className="report-date">
                      <CalendarDays size={15} />

                      <span>
                        {report.date}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="report-status">
                      <CheckCircle2 size={14} />
                      Generated
                    </span>
                  </td>

                  <td>
                    <div className="report-actions">
                      <button
                        type="button"
                        className="report-action-btn"
                        title="View complete report"
                        onClick={() =>
                          handleViewReport(report)
                        }
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        className="report-action-btn primary"
                        title="Download PDF report"
                        disabled={isGenerating}
                        onClick={() =>
                          generatePdf(report)
                        }
                      >
                        <Download size={16} />

                        <span>
                          {isGenerating
                            ? "Preparing..."
                            : "PDF"}
                        </span>
                      </button>

                      <button
                        type="button"
                        className="report-action-btn text"
                        title="Download text report"
                        onClick={() =>
                          generateTextReport(report)
                        }
                      >
                        <FileDown size={16} />
                        <span>TXT</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          REPORT INFORMATION
          ===================================================== */}

      <div className="reports-info">
        <div className="reports-info-icon">
          <FileBarChart size={20} />
        </div>

        <div>
          <strong>
            Complete project reporting
          </strong>

          <p>
            Downloadable reports combine estimation results,
            resource planning, risks, recommendations,
            architecture, milestones, financial planning,
            and development-request information into a
            structured project document.
          </p>
        </div>
      </div>

      {/* =====================================================
          REPORT VIEW MODAL
          ===================================================== */}

      {selectedReport && (
        <div
          className="report-modal-overlay"
          onClick={closeReport}
        >
          <div
            className="report-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="report-modal-header">
              <div className="report-modal-heading">
                <div className="report-modal-icon">
                  <FileBarChart size={21} />
                </div>

                <div>
                  <span>PROJECT REPORT</span>

                  <h2>
                    {selectedReport.project}
                  </h2>

                  <p>
                    {selectedReport.type}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="report-modal-close"
                onClick={closeReport}
                aria-label="Close report"
              >
                <X size={19} />
              </button>
            </div>

            <div className="report-modal-body">
              {/* PROJECT OVERVIEW */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <FolderKanban size={17} />

                  <div>
                    <span>PROJECT OVERVIEW</span>
                    <h3>Project Information</h3>
                  </div>
                </div>

                <div className="report-detail-grid">
                  <div>
                    <span>Project Name</span>
                    <strong>
                      {selectedReport.project}
                    </strong>
                  </div>

                  <div>
                    <span>Project Type</span>
                    <strong>
                      {selectedReport.projectType}
                    </strong>
                  </div>

                  <div>
                    <span>Report Type</span>
                    <strong>
                      {selectedReport.type}
                    </strong>
                  </div>

                  <div>
                    <span>Generated</span>
                    <strong>
                      {selectedReport.date}
                    </strong>
                  </div>
                </div>

                <div className="report-description-box">
                  <span>DESCRIPTION</span>

                  <p>
                    {selectedReport.description}
                  </p>
                </div>
              </section>

              {/* ESTIMATION */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <CircleDollarSign size={17} />

                  <div>
                    <span>ESTIMATION</span>
                    <h3>Intelligent Estimate</h3>
                  </div>
                </div>

                <div className="report-estimate-grid">
                  <div>
                    <Clock3 size={17} />
                    <span>Duration</span>
                    <strong>
                      {selectedReport.estimation.duration}
                    </strong>
                  </div>

                  <div>
                    <CircleDollarSign size={17} />
                    <span>Cost</span>
                    <strong>
                      {selectedReport.estimation.cost}
                    </strong>
                  </div>

                  <div>
                    <Layers3 size={17} />
                    <span>Effort</span>
                    <strong>
                      {selectedReport.estimation.effort}
                    </strong>
                  </div>

                  <div>
                    <Users size={17} />
                    <span>Team</span>
                    <strong>
                      {selectedReport.estimation.teamSize}
                    </strong>
                  </div>

                  <div>
                    <ShieldAlert size={17} />
                    <span>Complexity</span>
                    <strong>
                      {selectedReport.estimation.complexity}
                    </strong>
                  </div>

                  <div>
                    <CheckCircle2 size={17} />
                    <span>Confidence</span>
                    <strong>
                      {selectedReport.estimation.confidence}
                    </strong>
                  </div>
                </div>
              </section>

              {/* RESOURCES */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <Users size={17} />

                  <div>
                    <span>RESOURCE PLANNING</span>
                    <h3>Required Team Resources</h3>
                  </div>
                </div>

                <div className="report-resource-list">
                  {selectedReport.resources.map(
                    (resource) => (
                      <div
                        className="report-resource-item"
                        key={resource.role}
                      >
                        <div>
                          <strong>
                            {resource.role}
                          </strong>

                          <span>
                            Required:{" "}
                            {resource.quantity}
                          </span>

                          <p>
                            {resource.purpose}
                          </p>
                        </div>

                        <em>
                          {resource.status}
                        </em>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* RISKS */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <ShieldAlert size={17} />

                  <div>
                    <span>RISK ANALYSIS</span>
                    <h3>Identified Project Risks</h3>
                  </div>
                </div>

                <div className="report-risk-list">
                  {selectedReport.risks.map(
                    (risk) => (
                      <div
                        className="report-risk-item"
                        key={risk.title}
                      >
                        <div className="report-risk-top">
                          <strong>
                            {risk.title}
                          </strong>

                          <span
                            className={`report-risk-severity ${risk.severity.toLowerCase()}`}
                          >
                            {risk.severity}
                          </span>
                        </div>

                        <small>
                          {risk.category} •{" "}
                          Probability:{" "}
                          {risk.probability}
                        </small>

                        <p>
                          <b>Impact:</b>{" "}
                          {risk.impact}
                        </p>

                        <p>
                          <b>Mitigation:</b>{" "}
                          {risk.mitigation}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* TECHNOLOGY */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <Cpu size={17} />

                  <div>
                    <span>RECOMMENDATIONS</span>
                    <h3>
                      Technology Recommendations
                    </h3>
                  </div>
                </div>

                <div className="report-technology-grid">
                  {selectedReport.technologies.map(
                    (technology) => (
                      <div
                        className="report-technology-item"
                        key={technology.name}
                      >
                        <span>
                          {technology.category}
                        </span>

                        <strong>
                          {technology.name}
                        </strong>

                        <p>
                          {technology.reason}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* ARCHITECTURE */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <Layers3 size={17} />

                  <div>
                    <span>ARCHITECTURE</span>
                    <h3>
                      Recommended Architecture
                    </h3>
                  </div>
                </div>

                <div className="report-architecture-flow">
                  {selectedReport.architecture.map(
                    (node, index) => (
                      <div
                        key={node}
                        className="report-architecture-node"
                      >
                        <span>
                          {index + 1}
                        </span>

                        <strong>
                          {node}
                        </strong>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* PLANNING */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <Lightbulb size={17} />

                  <div>
                    <span>PLANNING</span>
                    <h3>
                      Planning Recommendations
                    </h3>
                  </div>
                </div>

                <div className="report-planning-list">
                  {selectedReport.planning.map(
                    (item, index) => (
                      <div
                        className="report-planning-item"
                        key={item.title}
                      >
                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <p>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* MILESTONES */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <Milestone size={17} />

                  <div>
                    <span>
                      MILESTONES & FINANCIALS
                    </span>

                    <h3>
                      Cost Planning by Phase
                    </h3>
                  </div>
                </div>

                <div className="report-milestone-list">
                  {selectedReport.milestones.map(
                    (milestone) => (
                      <div
                        className="report-milestone-item"
                        key={milestone.phase}
                      >
                        <div>
                          <strong>
                            {milestone.phase}
                          </strong>

                          <span>
                            {milestone.duration}
                          </span>
                        </div>

                        <strong>
                          {milestone.cost}
                        </strong>

                        <em>
                          {milestone.percentage}
                        </em>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* DEVELOPMENT REQUEST */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <UserRoundCheck size={17} />

                  <div>
                    <span>
                      DEVELOPMENT REQUEST
                    </span>

                    <h3>
                      Development Coordination
                    </h3>
                  </div>
                </div>

                <div className="report-status-box">
                  <strong>
                    {selectedReport.developmentRequest.status}
                  </strong>

                  <span>
                    Submitted:{" "}
                    {
                      selectedReport
                        .developmentRequest
                        .submitted
                    }
                  </span>

                  <p>
                    {
                      selectedReport
                        .developmentRequest
                        .description
                    }
                  </p>
                </div>
              </section>

              {/* COMMUNICATION */}

              <section className="report-modal-section">
                <div className="report-modal-section-heading">
                  <MessageSquare size={17} />

                  <div>
                    <span>
                      PROJECT COMMUNICATION
                    </span>

                    <h3>
                      Administrative Coordination
                    </h3>
                  </div>
                </div>

                <div className="report-communication-box">
                  <strong>
                    {selectedReport.communication.status}
                  </strong>

                  <p>
                    {selectedReport.communication.description}
                  </p>
                </div>
              </section>
            </div>

            {/* MODAL FOOTER */}

            <div className="report-modal-footer">
              <button
                type="button"
                className="report-modal-secondary"
                onClick={() =>
                  generateTextReport(
                    selectedReport
                  )
                }
              >
                <FileDown size={16} />
                Download TXT
              </button>

              <button
                type="button"
                className="report-modal-primary"
                disabled={isGenerating}
                onClick={() =>
                  generatePdf(selectedReport)
                }
              >
                <Download size={16} />

                {isGenerating
                  ? "Preparing PDF..."
                  : "Download PDF"}
              </button>

              <button
                type="button"
                className="report-modal-close-btn"
                onClick={closeReport}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;