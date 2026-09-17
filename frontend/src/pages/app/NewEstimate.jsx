import { useState } from "react";
import "./NewEstimate.css";

function NewEstimate() {

  const [projectType, setProjectType] = useState("");
  const [customProjectType, setCustomProjectType] = useState("");

  const [error, setError] = useState("");

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);

    // Clear custom type when user selects something other than Other
    if (event.target.value !== "other") {
      setCustomProjectType("");
    }

    setError("");
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Other is selected but custom type is empty
    if (
      projectType === "other" &&
      customProjectType.trim() === ""
    ) {
      setError("Please specify your project type.");
      return;
    }

    // Project type is not selected
    if (projectType === "") {
      setError("Please select a project type.");
      return;
    }

    setError("");

    // Backend / ML connection will be added later
    console.log("Estimate form is valid.");
  };


  return (
    <div className="new-estimate-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="new-estimate-header">

        <div>
          <span className="new-estimate-label">
            PROJECT ESTIMATION
          </span>

          <h1>
            Create a new estimate
          </h1>

          <p>
            Tell PlanWise AI about your software project.
            The system will use this information to generate
            an intelligent project estimate and planning analysis.
          </p>
        </div>

      </section>


      {/* =====================================================
          ESTIMATION FORM
      ===================================================== */}

      <section className="estimate-form-card">

        <div className="estimate-form-heading">

          <div>
            <span className="form-step">
              STEP 01
            </span>

            <h2>
              Project information
            </h2>

            <p>
              Provide the basic information about the project
              you want to analyze.
            </p>
          </div>

        </div>


        <form
          className="estimate-form"
          onSubmit={handleSubmit}
        >

          {/* PROJECT NAME */}

          <div className="form-field">

            <label htmlFor="projectName">
              Project Name
            </label>

            <input
              id="projectName"
              type="text"
              placeholder="e.g. AI Learning Platform"
              required
            />

            <span className="field-help">
              Give your project a clear and recognizable name.
            </span>

          </div>


          {/* PROJECT DESCRIPTION */}

          <div className="form-field">

            <label htmlFor="projectDescription">
              Project Description
            </label>

            <textarea
              id="projectDescription"
              rows="7"
              placeholder="Describe what your software project is intended to do, who will use it, and its main purpose..."
              required
            />

            <span className="field-help">
              A detailed description helps PlanWise AI understand
              your project requirements more accurately.
            </span>

          </div>


          {/* PROJECT TYPE */}

          <div className="form-field">

            <label htmlFor="projectType">
              Project Type
            </label>

            <select
              id="projectType"
              value={projectType}
              onChange={handleProjectTypeChange}
              required
            >

              <option value="" disabled>
                Select project type
              </option>

              <option value="web">
                Web Application
              </option>

              <option value="mobile">
                Mobile Application
              </option>

              <option value="desktop">
                Desktop Software
              </option>

              <option value="ai">
                AI / Machine Learning
              </option>

              <option value="saas">
                SaaS
              </option>

              <option value="ecommerce">
                E-Commerce
              </option>

              <option value="other">
                Other
              </option>

            </select>

            <span className="field-help">
              Choose the category that best describes your project.
            </span>

          </div>


          {/* CUSTOM PROJECT TYPE */}

          {projectType === "other" && (
            <div className="form-field custom-project-type-field">

              <label htmlFor="customProjectType">
                Specify Project Type
              </label>

              <input
                id="customProjectType"
                type="text"
                value={customProjectType}
                onChange={(event) => {
                  setCustomProjectType(event.target.value);
                  setError("");
                }}
                placeholder="e.g. Blockchain Application"
                required
              />

              <span className="field-help">
                Please enter the type of software project you are building.
              </span>

            </div>
          )}


          {/* ERROR */}

          {error && (
            <div className="estimate-form-error">
              {error}
            </div>
          )}


          {/* FORM ACTIONS */}

          <div className="estimate-form-actions">

            <a
              href="/app/dashboard"
              className="estimate-cancel-btn"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="estimate-submit-btn"
            >
              Generate Estimate
              <span>→</span>
            </button>

          </div>

        </form>

      </section>


      {/* =====================================================
          INFORMATION NOTE
      ===================================================== */}

      <section className="estimate-info">

        <div className="estimate-info-mark">
          i
        </div>

        <div>

          <strong>
            How PlanWise AI works
          </strong>

          <p>
            Your project information will later be analyzed by
            the estimation engine and AI planning system to
            determine effort, duration, complexity, risks,
            recommendations, and other project insights.
          </p>

        </div>

      </section>

    </div>
  );
}

export default NewEstimate;