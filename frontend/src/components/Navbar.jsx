const Navbar = ({ apiBase }) => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div className="navbar__logo">E</div>
          <div>
            <div className="navbar__title">Estatery</div>
            <div className="navbar__subtitle">Find your place to live</div>
          </div>
        </div>

        <nav className="navbar__links" aria-label="Primary">
          <a href="#properties" className="navbar__link navbar__link--active">
            Rent
          </a>
          <a href="#properties" className="navbar__link">
            Buy
          </a>
          <a href="#properties" className="navbar__link">
            Sell
          </a>
          <a href="#favorites" className="navbar__link">
            Favorites
          </a>
          <a href="#dashboard" className="navbar__link">
            Manage Property
          </a>
          <a href="#features" className="navbar__link">
            Resources
          </a>
        </nav>

        <div className="navbar__actions">
          <div className="navbar__api-compact">
            <span className="dot ok" aria-hidden />
            <span className="navbar__api-value">{apiBase || 'http://localhost:6543'}</span>
          </div>
          <a className="btn nav-btn" href="#login">
            Sign in
          </a>
          <div className="navbar__avatar" aria-label="Profile">
            <span>JD</span>
          </div>
          <button className="navbar__menu" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
