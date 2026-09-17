import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  CalendarDays,
  Pencil,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeProfile.css";

function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Fahad",
    lastName: "Saleem",
    email: "fahad@planwise.ai",
    phone: "+92 300 1234567",
    location: "Islamabad, Pakistan",
    department: "Engineering",
    role: "Backend Developer",
    employeeId: "EMP-001",
    joinedDate: "August 12, 2026",
    bio:
      "Backend developer responsible for building and maintaining reliable project APIs, backend services, and system integrations.",
  });

  const [formData, setFormData] = useState(profile);

  const skills = [
    "Python",
    "FastAPI",
    "Flask",
    "PostgreSQL",
    "REST APIs",
    "SQLAlchemy",
    "Git",
    "Backend Development",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <section className="employee-profile-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="employee-profile-header">

        <div>
          <span className="employee-profile-eyebrow">
            ACCOUNT
          </span>

          <h1>Profile</h1>

          <p>
            Manage your professional information and employee
            profile details.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            className="employee-profile-edit-button"
            onClick={handleEdit}
          >
            <Pencil />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="employee-profile-header-actions">

            <button
              type="button"
              className="employee-profile-cancel-button"
              onClick={handleCancel}
            >
              <X />
              <span>Cancel</span>
            </button>

            <button
              type="button"
              className="employee-profile-save-button"
              onClick={handleSave}
            >
              <Save />
              <span>Save Changes</span>
            </button>

          </div>
        )}

      </header>


      {/* =====================================================
          PROFILE OVERVIEW
          ===================================================== */}

      <section className="employee-profile-overview">

        <div className="employee-profile-avatar">
          F
        </div>

        <div className="employee-profile-overview-info">

          <div className="employee-profile-name-row">

            <h2>
              {profile.firstName} {profile.lastName}
            </h2>

            <span className="employee-profile-active-badge">
              <CheckCircle2 />
              Active
            </span>

          </div>

          <p className="employee-profile-role">
            {profile.role}
          </p>

          <div className="employee-profile-overview-meta">

            <span>
              <BriefcaseBusiness />
              {profile.department}
            </span>

            <span>
              <ShieldCheck />
              Employee ID: {profile.employeeId}
            </span>

            <span>
              <CalendarDays />
              Joined {profile.joinedDate}
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN GRID
          ===================================================== */}

      <div className="employee-profile-grid">

        {/* ===================================================
            PERSONAL INFORMATION
            =================================================== */}

        <section className="employee-profile-card">

          <div className="employee-profile-card-header">

            <div>
              <span>
                PERSONAL
              </span>

              <h2>
                Personal Information
              </h2>
            </div>

            <div className="employee-profile-card-icon">
              <UserRound />
            </div>

          </div>


          <div className="employee-profile-form-grid">

            <div className="employee-profile-field">

              <label htmlFor="firstName">
                First Name
              </label>

              {isEditing ? (
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <div className="employee-profile-field-value">
                  {profile.firstName}
                </div>
              )}

            </div>


            <div className="employee-profile-field">

              <label htmlFor="lastName">
                Last Name
              </label>

              {isEditing ? (
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <div className="employee-profile-field-value">
                  {profile.lastName}
                </div>
              )}

            </div>


            <div className="employee-profile-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="employee-profile-field-value employee-profile-readonly">
                <Mail />
                {profile.email}
              </div>

            </div>


            <div className="employee-profile-field">

              <label htmlFor="phone">
                Phone Number
              </label>

              {isEditing ? (
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="employee-profile-field-value">
                  <Phone />
                  {profile.phone}
                </div>
              )}

            </div>


            <div className="employee-profile-field employee-profile-field-full">

              <label htmlFor="location">
                Location
              </label>

              {isEditing ? (
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />
              ) : (
                <div className="employee-profile-field-value">
                  <MapPin />
                  {profile.location}
                </div>
              )}

            </div>

          </div>

        </section>


        {/* ===================================================
            EMPLOYMENT INFORMATION
            =================================================== */}

        <section className="employee-profile-card">

          <div className="employee-profile-card-header">

            <div>
              <span>
                EMPLOYMENT
              </span>

              <h2>
                Work Information
              </h2>
            </div>

            <div className="employee-profile-card-icon">
              <BriefcaseBusiness />
            </div>

          </div>


          <div className="employee-profile-work-list">

            <div className="employee-profile-work-item">

              <span>
                Department
              </span>

              <strong>
                {profile.department}
              </strong>

            </div>


            <div className="employee-profile-work-item">

              <span>
                Position
              </span>

              <strong>
                {profile.role}
              </strong>

            </div>


            <div className="employee-profile-work-item">

              <span>
                Employee ID
              </span>

              <strong>
                {profile.employeeId}
              </strong>

            </div>


            <div className="employee-profile-work-item">

              <span>
                Joined
              </span>

              <strong>
                {profile.joinedDate}
              </strong>

            </div>

          </div>


          <div className="employee-profile-managed-note">

            <ShieldCheck />

            <div>
              <strong>
                Managed by Admin
              </strong>

              <p>
                Your role, department, employee ID, and
                employment status are controlled by the
                PlanWise administration team.
              </p>
            </div>

          </div>

        </section>


        {/* ===================================================
            ABOUT
            =================================================== */}

        <section className="employee-profile-card employee-profile-about-card">

          <div className="employee-profile-card-header">

            <div>
              <span>
                ABOUT
              </span>

              <h2>
                Professional Summary
              </h2>
            </div>

            <div className="employee-profile-card-icon">
              <UserRound />
            </div>

          </div>


          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="5"
              className="employee-profile-bio-input"
            />
          ) : (
            <p className="employee-profile-bio">
              {profile.bio}
            </p>
          )}

        </section>


        {/* ===================================================
            SKILLS
            =================================================== */}

        <section className="employee-profile-card">

          <div className="employee-profile-card-header">

            <div>
              <span>
                EXPERTISE
              </span>

              <h2>
                Professional Skills
              </h2>
            </div>

            <div className="employee-profile-card-icon">
              <ShieldCheck />
            </div>

          </div>


          <div className="employee-profile-skills">

            {skills.map((skill) => (
              <span key={skill}>
                {skill}
              </span>
            ))}

          </div>

        </section>

      </div>

    </section>
  );
}

export default EmployeeProfile;