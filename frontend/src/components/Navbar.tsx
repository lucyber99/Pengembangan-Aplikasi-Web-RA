type NavbarProps = {
  apiBase?: string;
};

const Navbar = ({ apiBase }: NavbarProps) => {
  const links = [
    { label: 'Properties', href: '#properties' },
    { label: 'Favorites', href: '#favorites' },
    { label: 'Dashboard', href: '#dashboard' },
  ];

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">RA</div>
        <div>
          <div className="navbar__title">ListingRA</div>
          <div className="navbar__subtitle">Platform jual/sewa properti</div>
        </div>
      </div>

      <nav className="navbar__links" aria-label="Primary">
        {links.map((item) => (
          <a key={item.label} href={item.href} className="navbar__link">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar__api">
        <span className="dot ok" aria-hidden />
        <div className="navbar__api-text">
          <div className="navbar__api-label">API base</div>
          <div className="navbar__api-value">{apiBase ?? 'http://localhost:6543'}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
