import React from 'react';
import './CompareProperty.css';

const CompareProperty = ({ properties, onRemove }) => {
    const formatPrice = (value) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);

    if (!properties || properties.length === 0) {
        return null;
    }

    return (
        <div className="compare-container">
            <div className="compare-header">
                <h2>Compare Properties</h2>
                <span className="compare-count">Comparing {properties.length} properties side by side</span>
            </div>

            <div className="compare-grid">
                {properties.map((property) => (
                    <div key={property.id} className="compare-card">
                        <button
                            className="compare-remove"
                            onClick={() => onRemove(property.id)}
                            aria-label="Remove from comparison"
                        >
                            &times;
                        </button>
                        <div
                            className="compare-image"
                            style={{ backgroundImage: `url(${property.photoUrl})` }}
                        >
                        </div>

                        <div className="compare-content">
                            <h3 className="compare-title">{property.title}</h3>
                            <div className="compare-location">{property.location}</div>

                            <div className="compare-row compare-price">
                                <span>Price</span>
                                <strong>{formatPrice(property.price)}</strong>
                            </div>
                            <div className="compare-row">
                                <span>Type</span>
                                <span>{property.type}</span>
                            </div>
                            <div className="compare-row">
                                <span>Bedrooms</span>
                                <span>{property.beds} Beds</span>
                            </div>
                            <div className="compare-row">
                                <span>Bathrooms</span>
                                <span>{property.baths} Bath</span>
                            </div>
                            <div className="compare-row">
                                <span>Area</span>
                                <span>{property.area} m²</span>
                            </div>

                            <button className="btn primary compare-btn">View Details</button>
                        </div>
                    </div>
                ))}

                {/* Placeholders if needed to fill space visually, though not required by prompt */}
            </div>
        </div>
    );
};

export default CompareProperty;
