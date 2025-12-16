const Hero = ({ title, highlight, subtitle, ctaLabel, ctaHref, status }) => {
  return (
    <section className="hero-block">
      <p className="eyebrow">Find your place to live</p>
      <h1>
        {title}{' '}
        <span className="hero-block__highlight">
          {highlight}
        </span>
      </h1>
      <p className="lede">{subtitle}</p>
      <div className="hero-block__actions">
        {ctaLabel && (
          <a className="btn primary" href={ctaHref ?? '#properties'}>
            {ctaLabel}
          </a>
        )}
        {status}
      </div>
    </section>
  );
};

export default Hero;
