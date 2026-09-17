function Capabilities() {
  const capabilities = [
    {
      number: "01",
      title: "Project Estimation",
      description:
        "Get intelligent estimates for the effort, duration, cost, and team size required for your project.",
    },
    {
      number: "02",
      title: "Risk Analysis",
      description:
        "Identify relevant project risks with severity levels and practical mitigation guidance.",
    },
    {
      number: "03",
      title: "Team Recommendations",
      description:
        "Understand the roles and team structure that may be suitable for your project.",
    },
    {
      number: "04",
      title: "Technology Insights",
      description:
        "Receive technology and development recommendations based on your project requirements.",
    },
    {
      number: "05",
      title: "Planning Insights",
      description:
        "Turn analysis into useful planning recommendations for better project decisions.",
    },
  ];

  return (
    <section
      id="capabilities"
      className="capabilities-section"
    >
      <div className="page-container">

        <div className="capabilities-heading">
          <span className="section-label">
            What PlanWise Provides
          </span>

          <h2 className="section-title">
            More than an estimate.
            <span className="capabilities-title-accent">
              {" "}A complete planning perspective.
            </span>
          </h2>

          <p className="section-description">
            PlanWise AI combines estimation, analysis, and
            intelligent recommendations to help you understand
            your project before development begins.
          </p>
        </div>

        <div className="capabilities-layout">

          <div className="capability-feature">
            <div className="capability-feature-top">
              <span className="capability-feature-number">
                01
              </span>

              <span className="capability-feature-label">
                CORE CAPABILITY
              </span>
            </div>

            <h3>
              Understand the
              <br />
              project before you build it.
            </h3>

            <p>
              PlanWise analyzes your project idea and turns
              it into meaningful estimation and planning
              insights — helping you understand the scope,
              effort, timeline, team needs, and potential
              challenges.
            </p>

            <div className="capability-feature-list">
              <div>
                <span>Effort</span>
                <strong>Estimated</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>Estimated</strong>
              </div>

              <div>
                <span>Complexity</span>
                <strong>Analyzed</strong>
              </div>

              <div>
                <span>Confidence</span>
                <strong>Measured</strong>
              </div>
            </div>
          </div>

          <div className="capabilities-list">
            {capabilities.slice(1).map((capability) => (
              <article
                className="capability-item"
                key={capability.number}
              >
                <span className="capability-number">
                  {capability.number}
                </span>

                <div className="capability-content">
                  <h3>{capability.title}</h3>

                  <p>
                    {capability.description}
                  </p>
                </div>

                <span className="capability-arrow">
                  →
                </span>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Capabilities;