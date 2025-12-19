const formatPrice = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

const PropertyCard = ({ property, favorite = false, isFavorite = false, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id, isFavorite || favorite);
    }
  };

  const showFavorite = favorite || isFavorite;

  return (
    <article className="property-card">
      <div
        className="property-card__image"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35)), url(${property.photoUrl})` }}
        role="img"
        aria-label={property.title}
      >
        <div className="property-card__badge">{property.type}</div>
        {onToggleFavorite ? (
          <button
            className={`property-card__favorite ${showFavorite ? 'property-card__favorite--active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={showFavorite ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
            title={showFavorite ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
          >
            {showFavorite ? '★' : '☆'}
          </button>
        ) : (
          showFavorite && <div className="property-card__favorite property-card__favorite--active">★</div>
        )}
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
