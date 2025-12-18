import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ apiBase }) => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" style={{ textDecoration: 'none' }}>
          <div className="navbar__logo">E</div>
          <div>
            <div className="navbar__title">Estatery</div>
            <div className="navbar__subtitle">Find your place to live</div>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()}>
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()}
          >
            Properties
          </NavLink>
          <NavLink
            to="/agent/dashboard"
            className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()}
          >
            Dashboard
          </NavLink>
          <a href="/#features" className="navbar__link">
            Resources
          </a>
        </nav>

        <div className="navbar__actions">
          <div className="navbar__api-compact">
            <span className="dot ok" aria-hidden />
            <span className="navbar__api-value">{apiBase || 'http://localhost:6543'}</span>
          </div>
          <Link className="btn nav-btn" to="/login">
            Sign in
          </Link>
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
