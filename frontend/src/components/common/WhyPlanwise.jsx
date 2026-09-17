function WhyPlanwise() {
  const advantages = [
    {
      number: "01",
      title: "Simple Project Input",
      description:
        "Start with your project name, description, and type. No complicated estimation forms.",
    },
    {
      number: "02",
      title: "Data-Driven Estimation",
      description:
        "Machine learning helps generate project estimates using patterns learned from historical project data.",
    },
    {
      number: "03",
      title: "Context-Aware Insights",
      description:
        "Project characteristics are analyzed together to provide insights that are relevant to your specific idea.",
    },
    {
      number: "04",
      title: "One Planning View",
      description:
        "Bring estimates, risks, team recommendations, and planning insights together in one place.",
    },
  ];

  return (
    <section 
        id="why-planwise"
        className="why-planwise-section"
    >
      <div className="page-container">

        <div className="why-planwise-heading">
          <span className="section-label">
            Why PlanWise AI
          </span>

          <h2 className="section-title">
            Plan with more clarity.
            <span className="why-title-accent">
              {" "}Decide with more confidence.
            </span>
          </h2>

          <p className="section-description">
            Good project planning starts with understanding what
            you are building. PlanWise brings estimation and
            intelligent analysis together to give you a clearer
            starting point.
          </p>
        </div>

        <div className="why-planwise-content">

          <div className="why-planwise-statement">
            <div className="statement-mark">
              P
            </div>

            <h3>
              From an idea
              <br />
              to a clearer plan.
            </h3>

            <p>
              Instead of making decisions around disconnected
              estimates, PlanWise helps you look at your project
              from multiple planning perspectives before
              development begins.
            </p>

            <div className="statement-line"></div>

            <span className="statement-note">
              SIMPLE INPUT → INTELLIGENT ANALYSIS → PLANNING INSIGHTS
            </span>
          </div>

          <div className="why-planwise-grid">
            {advantages.map((advantage) => (
              <article
                className="why-advantage"
                key={advantage.number}
              >
                <div className="why-advantage-top">
                  <span className="why-advantage-number">
                    {advantage.number}
                  </span>

                  <span className="why-advantage-dot"></span>
                </div>

                <h3>
                  {advantage.title}
                </h3>

                <p>
                  {advantage.description}
                </p>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyPlanwise;