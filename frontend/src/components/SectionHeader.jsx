const SectionHeader = ({ title, actionLabel, actionHref }) => {
  return (
    <div className="section-header row-between">
      <div>
        <h2>{title}</h2>
      </div>
      {actionLabel && (
        <a className="section-header__action" href={actionHref ?? '#'}>
          {actionLabel}
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
