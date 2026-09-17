function Footer() {
  return (
    <footer className="footer">
      <div className="page-container">

        <div className="footer-main">

          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <span className="footer-logo-mark">P</span>

              <span className="footer-logo-text">
                PlanWise <span>AI</span>
              </span>
            </a>

            <p>
              Intelligent project estimation and planning
              for better software project decisions.
            </p>
          </div>

          <div className="footer-links-group">

            <div className="footer-column">
              <h4>Product</h4>

              <a href="#how-it-works">
                How It Works
              </a>

              <a href="#capabilities">
                Capabilities
              </a>

              <a href="#why-planwise">
                About PlanWise
              </a>
            </div>

            <div className="footer-column">
              <h4>Platform</h4>

              <a href="#faq">
                FAQ
              </a>

              <a href="#final-cta">
                Create Estimate
              </a>

              <a href="/">
                Sign In
              </a>
            </div>

            <div className="footer-column">
              <h4>Project</h4>

              <span>AI-Powered</span>
              <span>Data-Driven</span>
              <span>Planning Focused</span>
            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 PlanWise AI. All rights reserved.
          </span>

          <span>
            Built for smarter project planning.
          </span>

        </div>

      </div>
    </footer>
  );
}

export default Footer;