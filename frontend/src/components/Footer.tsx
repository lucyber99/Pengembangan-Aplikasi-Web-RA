const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <div className="navbar__logo">RA</div>
        <div>
          <div className="site-footer__title">ListingRA</div>
          <p className="site-footer__text">
            Full-stack Pyramid + React untuk listing properti, inquiry, dan favorites.
          </p>
        </div>
      </div>

      <div className="site-footer__columns">
        <div className="site-footer__col">
          <div className="site-footer__heading">Developer notes</div>
          <ul>
            <li>Pastikan backend jalan di 6543</li>
            <li>Set env VITE_API_BASE di frontend</li>
            <li>Protect routes sesuai role buyer/agent</li>
          </ul>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading">Resources</div>
          <ul>
            <li><a href="#properties">Browse properties</a></li>
            <li><a href="#favorites">Favorites</a></li>
            <li><a href="#dashboard">Agent dashboard</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
