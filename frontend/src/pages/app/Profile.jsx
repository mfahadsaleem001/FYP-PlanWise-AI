import { useRef, useState } from "react";
import { useToast } from "../../components/common/ToastProvider";
import {
  UserRound,
  Mail,
  Phone,
  Camera,
  Pencil,
  LockKeyhole,
  ShieldCheck,
  KeyRound,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const [profile, setProfile] = useState({
    name: "Fahad Saleem",
    email: "fahad@example.com",
    phone: "",
    profileImage: null,
  });

  const [editForm, setEditForm] = useState({
    name: "Fahad Saleem",
    email: "fahad@example.com",
    phone: "",
    profileImage: null,
  });

  const [showEditModal, setShowEditModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ============================================================
  // PROFILE PHOTO
  // ============================================================

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setEditForm((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));

    setProfileMessage("");
    event.target.value = "";
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));

    showToast("Profile photo updated successfully.", "success");
    event.target.value = "";
  };

  // ============================================================
  // EDIT PROFILE
  // ============================================================

  const openEditProfile = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      profileImage: profile.profileImage,
    });

    setProfileMessage("");
    setShowEditModal(true);
  };

  const closeEditProfile = () => {
    setShowEditModal(false);
    setProfileMessage("");
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (!editForm.name.trim()) {
      setProfileMessage("Name is required.");
      return;
    }

    if (!editForm.email.trim()) {
      setProfileMessage("Email is required.");
      return;
    }

    setProfile({
      name: editForm.name.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim(),
      profileImage: editForm.profileImage,
    });

    setProfileMessage("");
    setShowEditModal(false);

    showToast("Profile updated successfully.", "success");
  };

  // ============================================================
  // CHANGE PASSWORD
  // ============================================================

  const openPasswordModal = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("");
    setPasswordError("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("");
    setPasswordError("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    const currentPassword =
      passwordData.currentPassword.trim();

    const newPassword = passwordData.newPassword;
    const confirmPassword = passwordData.confirmPassword;

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 4 || newPassword.length > 12) {
      setPasswordError(
        "Password must be between 4 and 12 characters."
      );
      return;
    }

    if (!confirmPassword) {
      setPasswordError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    // Demo success only — no backend password update.
    setPasswordMessage("Password changed successfully.");

    showToast("Password changed successfully.", "success");

    setTimeout(() => {
      closePasswordModal();
    }, 1200);
  };

  // ============================================================
  // AVATAR
  // ============================================================

  const renderAvatar = (className = "profile-avatar") => {
    if (profile.profileImage) {
      return (
        <img
          src={profile.profileImage}
          alt={profile.name}
          className={`${className} profile-avatar-image`}
        />
      );
    }

    return (
      <div className={className}>
        {profile.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="profile-page">
      {/* PAGE HEADER */}

      <div className="profile-page-header">
        <div>
          <span className="profile-eyebrow">ACCOUNT</span>
          <h1>Profile</h1>
          <p>
            Manage your personal information and account
            security.
          </p>
        </div>

        <button
          type="button"
          className="profile-edit-btn"
          onClick={openEditProfile}
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* PROFILE OVERVIEW */}

      <section className="profile-overview-card">
        <div className="profile-overview-left">
          <div className="profile-main-avatar-wrapper">
            {renderAvatar("profile-main-avatar")}

            <button
              type="button"
              className="profile-camera-btn"
              title="Change profile photo"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={15} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-hidden-file-input"
              onChange={handleProfilePhotoUpload}
            />
          </div>

          <div className="profile-overview-info">
            <h2>{profile.name}</h2>

            <span className="profile-role">
              Project Manager
            </span>

            <div className="profile-contact-row">
              <span>
                <Mail size={14} />
                {profile.email}
              </span>

              {profile.phone && (
                <span>
                  <Phone size={14} />
                  {profile.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-account-status">
          <span className="status-dot"></span>

          <div>
            <strong>Active Account</strong>
            <span>Account in good standing</span>
          </div>
        </div>
      </section>

      {/* PROFILE INFORMATION */}

      <section className="profile-section">
        <div className="profile-section-header">
          <div>
            <span className="profile-section-label">
              PERSONAL INFORMATION
            </span>

            <h2>Profile Information</h2>

            <p>
              Your basic account information used across
              PlanWise.
            </p>
          </div>

          <button
            type="button"
            className="profile-section-edit-btn"
            onClick={openEditProfile}
          >
            <Pencil size={15} />
            Edit
          </button>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <div className="profile-info-icon">
              <UserRound size={17} />
            </div>

            <div>
              <span>Full Name</span>
              <strong>{profile.name}</strong>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <Mail size={17} />
            </div>

            <div>
              <span>Email Address</span>
              <strong>{profile.email}</strong>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <Phone size={17} />
            </div>

            <div>
              <span>Phone Number</span>
              <strong>{profile.phone || "Not provided"}</strong>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-icon">
              <UserRound size={17} />
            </div>

            <div>
              <span>Account Role</span>
              <strong>Project Manager</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNT ACTIVITY */}

      <section className="profile-section">
        <div className="profile-section-header">
          <div>
            <span className="profile-section-label">
              ACCOUNT OVERVIEW
            </span>

            <h2>Workspace Activity</h2>

            <p>
              A quick overview of your PlanWise activity.
            </p>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <span>Total Projects</span>
            <strong>12</strong>
            <small>Projects created</small>
          </div>

          <div className="profile-stat-card">
            <span>Estimates Generated</span>
            <strong>18</strong>
            <small>AI-assisted estimates</small>
          </div>

          <div className="profile-stat-card">
            <span>Reports Generated</span>
            <strong>9</strong>
            <small>Planning reports</small>
          </div>

          <div className="profile-stat-card">
            <span>Member Since</span>
            <strong>2026</strong>
            <small>PlanWise account</small>
          </div>
        </div>
      </section>

      {/* SECURITY */}

      <section className="profile-section">
        <div className="profile-section-header">
          <div>
            <span className="profile-section-label">
              SECURITY
            </span>

            <h2>Account Security</h2>

            <p>
              Keep your account protected with secure
              authentication settings.
            </p>
          </div>
        </div>

        <div className="profile-security-card">
          <div className="profile-security-icon">
            <LockKeyhole size={20} />
          </div>

          <div className="profile-security-content">
            <h3>Password</h3>

            <p>
              Update your password regularly to keep your
              account secure.
            </p>

            <span className="profile-password-hint">
              Password must contain 4–12 characters.
            </span>
          </div>

          <button
            type="button"
            className="profile-password-btn"
            onClick={openPasswordModal}
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>

        <div className="profile-security-status">
          <ShieldCheck size={17} />

          <div>
            <strong>Security status</strong>
            <span>
              Your account security settings are active.
            </span>
          </div>
        </div>
      </section>

      {/* EDIT PROFILE MODAL */}

      {showEditModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditProfile();
            }
          }}
        >
          <div className="profile-modal">
            <div className="profile-modal-header">
              <div>
                <span className="profile-modal-eyebrow">
                  ACCOUNT
                </span>

                <h2>Edit Profile</h2>

                <p>
                  Update your personal information.
                </p>
              </div>

              <button
                type="button"
                className="profile-modal-close"
                onClick={closeEditProfile}
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="profile-modal-body"
              onSubmit={handleSaveProfile}
            >
              <div className="profile-photo-editor">
                <div className="profile-photo-preview">
                  {editForm.profileImage ? (
                    <img
                      src={editForm.profileImage}
                      alt="Profile preview"
                      className="profile-avatar-image"
                    />
                  ) : (
                    <span>
                      {editForm.name.charAt(0).toUpperCase() ||
                        "F"}
                    </span>
                  )}
                </div>

                <div>
                  <strong>Profile Photo</strong>

                  <p>
                    Optional. JPG, PNG or other image formats.
                  </p>

                  <button
                    type="button"
                    className="profile-upload-btn"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >
                    <Camera size={15} />
                    Choose Photo
                  </button>
                </div>
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-field">
                  <label htmlFor="profile-name">
                    Full Name
                  </label>

                  <div className="profile-input-wrapper">
                    <UserRound size={16} />

                    <input
                      id="profile-name"
                      type="text"
                      value={editForm.name}
                      onChange={(event) =>
                        setEditForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="profile-form-field">
                  <label htmlFor="profile-email">
                    Email Address
                  </label>

                  <div className="profile-input-wrapper">
                    <Mail size={16} />

                    <input
                      id="profile-email"
                      type="email"
                      value={editForm.email}
                      onChange={(event) =>
                        setEditForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="profile-form-field profile-form-field-full">
                  <label htmlFor="profile-phone">
                    Phone Number
                  </label>

                  <div className="profile-input-wrapper">
                    <Phone size={16} />

                    <input
                      id="profile-phone"
                      type="tel"
                      value={editForm.phone}
                      onChange={(event) =>
                        setEditForm((prev) => ({
                          ...prev,
                          phone: event.target.value,
                        }))
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {profileMessage && (
                <div className="profile-form-message error">
                  <AlertCircle size={16} />
                  {profileMessage}
                </div>
              )}

              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-modal-cancel"
                  onClick={closeEditProfile}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-modal-save"
                >
                  <CheckCircle2 size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}

      {showPasswordModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePasswordModal();
            }
          }}
        >
          <div className="profile-modal password-modal">
            <div className="profile-modal-header">
              <div>
                <span className="profile-modal-eyebrow">
                  SECURITY
                </span>

                <h2>Change Password</h2>

                <p>
                  Create a new password for your account.
                </p>
              </div>

              <button
                type="button"
                className="profile-modal-close"
                onClick={closePasswordModal}
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="profile-modal-body"
              onSubmit={handleChangePassword}
            >
              <div className="password-security-note">
                <ShieldCheck size={18} />

                <div>
                  <strong>Password requirements</strong>

                  <span>
                    Use between 4 and 12 characters.
                  </span>
                </div>
              </div>

              {/* CURRENT PASSWORD */}

              <div className="profile-form-field">
                <label htmlFor="current-password">
                  Current Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(event) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: event.target.value,
                      }))
                    }
                    autoComplete="current-password"
                    maxLength={12}
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    className="password-visibility-btn"
                    title={
                      showCurrentPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowCurrentPassword((prev) => !prev)
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}

              <div className="profile-form-field">
                <label htmlFor="new-password">
                  New Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(event) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: event.target.value,
                      }))
                    }
                    autoComplete="new-password"
                    minLength={4}
                    maxLength={12}
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    className="password-visibility-btn"
                    title={
                      showNewPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                <span className="password-field-hint">
                  4–12 characters
                </span>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="profile-form-field">
                <label htmlFor="confirm-password">
                  Confirm New Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    id="confirm-password"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={passwordData.confirmPassword}
                    onChange={(event) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }))
                    }
                    autoComplete="new-password"
                    minLength={4}
                    maxLength={12}
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    className="password-visibility-btn"
                    title={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR */}

              {passwordError && (
                <div className="profile-form-message error">
                  <AlertCircle size={16} />
                  {passwordError}
                </div>
              )}

              {/* SUCCESS */}

              {passwordMessage && (
                <div className="profile-form-message success">
                  <CheckCircle2 size={16} />
                  {passwordMessage}
                </div>
              )}

              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="profile-modal-cancel"
                  onClick={closePasswordModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-modal-save"
                >
                  <LockKeyhole size={16} />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;