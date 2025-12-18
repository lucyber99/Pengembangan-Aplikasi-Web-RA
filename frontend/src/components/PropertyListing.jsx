import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyListing = ({ properties }) => {
    if (!properties || properties.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#64748b',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px dashed #cbd5e1'
            }}>
                <h3>No properties found</h3>
                <p>Try adjusting your search filters.</p>
            </div>
        );
    }

    return (
        <div className="property-grid">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyListing;
