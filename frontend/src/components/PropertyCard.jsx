const formatPrice = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

const PropertyCard = ({ property, favorite, isCompared, onToggleCompare }) => {
  return (
    <article className="property-card">
      <div
        className="property-card__image"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35)), url(${property.photoUrl})` }}
        role="img"
        aria-label={property.title}
      >
        <div className="property-card__badge">{property.type}</div>
        <div className="property-card__actions" style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleCompare?.(property);
            }}
            style={{
              background: isCompared ? '#2563eb' : 'rgba(255,255,255,0.9)',
              color: isCompared ? 'white' : '#1e293b',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {isCompared ? 'Added' : '+ Compare'}
          </button>
          {favorite && <div className="property-card__favorite" style={{ position: 'static' }}>★</div>}
        </div>
      </div>
      <div className="property-card__body">
        <div className="property-card__title">{property.title}</div>
        <div className="property-card__location">{property.location}</div>
        <div className="property-card__price">{formatPrice(property.price)}</div>
        <div className="property-card__meta">
          <span>{property.beds} bd</span>
          <span>{property.baths} ba</span>
          <span>{property.area} sqm</span>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
