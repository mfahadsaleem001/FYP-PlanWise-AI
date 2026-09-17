function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <a href="/" className="navbar-brand">
          <span className="navbar-brand-mark">P</span>

          <span className="navbar-brand-text">
            PlanWise <span>AI</span>
          </span>
        </a>

        <nav className="navbar-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#why-planwise">About</a>
        </nav>

        <div className="navbar-actions">
          <a href="/auth/signin" className="btn-text">
            Sign In
          </a>

          <a href="/auth/signin" className="btn-primary">
            Get Started
          </a>
        </div>

      </div>
    </header>
  );
}

export default Navbar;