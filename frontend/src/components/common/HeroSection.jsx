function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">

        <div className="hero-content">
          <span className="hero-eyebrow">
            Intelligent Project Planning
          </span>

          <h1 className="hero-title">
            Turn Your Software Idea Into a
            <span> Smarter Project Plan.</span>
          </h1>

          <p className="hero-description">
            PlanWise AI analyzes your project idea and provides
            intelligent estimates, risk insights, and planning
            recommendations to help you make better project decisions.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">
              Create New Estimate
            </button>

            <button className="btn-secondary">
              Explore How It Works
            </button>
          </div>

          <div className="hero-note">
            <span>✓</span>
            Simple input. Intelligent analysis. Complete planning.
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">

            <div className="hero-panel-header">
              <div>
                <span className="hero-panel-label">
                  Project Overview
                </span>

                <h3>
                  AI Project Analysis
                </h3>
              </div>

              <span className="badge badge-success">
                Ready
              </span>
            </div>

            <div className="hero-project">
              <span className="hero-project-label">
                Project Type
              </span>

              <strong>
                AI / Machine Learning
              </strong>
            </div>

            <div className="hero-metrics">

              <div className="hero-metric">
                <span>Estimated Effort</span>
                <strong>1,240 hrs</strong>
              </div>

              <div className="hero-metric">
                <span>Duration</span>
                <strong>16 weeks</strong>
              </div>

              <div className="hero-metric">
                <span>Team Size</span>
                <strong>4 members</strong>
              </div>

            </div>

            <div className="hero-analysis">
              <div className="hero-analysis-heading">
                <span>Project Confidence</span>
                <strong>87%</strong>
              </div>

              <div className="hero-progress">
                <div className="hero-progress-bar"></div>
              </div>

              <p>
                Based on project characteristics and historical
                estimation data.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;