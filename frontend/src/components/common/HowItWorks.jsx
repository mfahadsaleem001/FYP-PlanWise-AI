function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="how-it-works-section"
    >
      <div className="page-container">

        <div className="how-it-works-intro">
          <div>
            <span className="section-label">
              How PlanWise Works
            </span>

            <h2 className="section-title">
              From project idea to
              <span className="how-title-accent">
                {" "}a smarter plan.
              </span>
            </h2>
          </div>

          <p className="how-intro-text">
            You provide the idea. PlanWise AI handles the
            analysis and turns it into meaningful project
            planning insights.
          </p>
        </div>

        <div className="workflow">

          {/* STEP 01 */}
          <article className="workflow-card workflow-input">

            <div className="workflow-top">
              <span className="workflow-number">
                01
              </span>

              <span className="workflow-label">
                PROJECT INPUT
              </span>
            </div>

            <h3>
              Tell us what
              <br />
              you're building.
            </h3>

            <p>
              Start with the essentials. No complicated
              forms or technical calculations.
            </p>

            <div className="input-preview">

              <div className="preview-field">
                <span>Project Name</span>
                <strong>Smart Learning Platform</strong>
              </div>

              <div className="preview-field">
                <span>Project Type</span>
                <strong>Web Application</strong>
              </div>

              <div className="preview-field preview-description">
                <span>Description</span>
                <div className="preview-lines">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

            </div>

          </article>

          {/* CONNECTOR */}
          <div className="workflow-connector">
            <span>→</span>
          </div>

          {/* STEP 02 */}
          <article className="workflow-card workflow-analysis">

            <div className="workflow-top">
              <span className="workflow-number">
                02
              </span>

              <span className="workflow-label">
                INTELLIGENT ANALYSIS
              </span>
            </div>

            <h3>
              Understand the
              <br />
              project behind the idea.
            </h3>

            <p>
              PlanWise analyzes project characteristics,
              estimates scope, and identifies potential
              challenges.
            </p>

            <div className="analysis-preview">

              <div className="analysis-item">
                <span>Requirement Analysis</span>
                <strong>✓</strong>
              </div>

              <div className="analysis-item">
                <span>Complexity Assessment</span>
                <strong>✓</strong>
              </div>

              <div className="analysis-item">
                <span>Risk Identification</span>
                <strong>✓</strong>
              </div>

              <div className="analysis-line">
                <div></div>
              </div>

            </div>

          </article>

          {/* CONNECTOR */}
          <div className="workflow-connector">
            <span>→</span>
          </div>

          {/* STEP 03 */}
          <article className="workflow-card workflow-result">

            <div className="workflow-top">
              <span className="workflow-number">
                03
              </span>

              <span className="workflow-label">
                PROJECT PLAN
              </span>
            </div>

            <h3>
              Get a clearer
              <br />
              path forward.
            </h3>

            <p>
              See the information you need to make better
              project planning decisions.
            </p>

            <div className="result-preview">

              <div className="result-stat">
                <span>Effort</span>
                <strong>Estimate</strong>
              </div>

              <div className="result-stat">
                <span>Duration</span>
                <strong>Estimate</strong>
              </div>

              <div className="result-stat">
                <span>Team</span>
                <strong>Recommendation</strong>
              </div>

              <div className="result-stat">
                <span>Risks</span>
                <strong>Insights</strong>
              </div>

            </div>

          </article>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;