const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <div className="navbar__logo">E</div>
          <div>
            <div className="site-footer__title">Estatery</div>
            <p className="site-footer__text">
              The smart real-estate platform for buyers and agents. Browse, favorite, and close deals
              faster.
            </p>
          </div>
        </div>
      </div>

      <div className="site-footer__columns">
        <div className="site-footer__col">
          <div className="site-footer__heading">Community</div>
          <ul>
            <li><a href="#join">Join Us</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#press">Press</a></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading">Support</div>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#legal">Legal</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading">Connect</div>
          <ul className="site-footer__social">
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
