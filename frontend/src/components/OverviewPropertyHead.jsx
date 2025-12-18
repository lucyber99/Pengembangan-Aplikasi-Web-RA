import React from 'react';
import './OverviewPropertyHead.css';

const DetailPropertyHead = ({ property }) => {
    const formatPrice = (value) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <div className="overview-head">
            <div className="overview-head__main">
                <h1 className="overview-head__title">{property.title}</h1>
                <div className="overview-head__location">{property.location}</div>

                <div className="overview-head__tags">
                    <span className="overview-head__tag overview-head__tag--type">{property.type}</span>
                    {property.status && (
                        <span className={`overview-head__tag overview-head__tag--status`}>
                            {property.status}
                        </span>
                    )}
                </div>
                <div className="overview-head__stats">
                    <div className="overview-head__price">{formatPrice(property.price)}</div>
                    <div className="overview-head__meta">
                        <div className="overview-head__meta-item">
                            <span className="overview-head__meta-value">{property.beds} Beds</span>
                            
                        </div>
                        <div className="overview-head__meta-item">
                            <span className="overview-head__meta-value">{property.baths} Baths</span>
                            
                        </div>
                        <div className="overview-head__meta-item">
                            <span className="overview-head__meta-value">{property.area}m²</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='overview-head__image'>
                <img src={property.photoUrl} alt={property.title} />
            </div>

        </div>
    );
};

export default DetailPropertyHead;
