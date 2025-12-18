import React from 'react';
import './OverviewProperty.css';

const OverviewProperty = ({ description }) => {
    return (
        <div className="overview-property">
            <h2 className="overview-property__heading">About This Property</h2>
            <div className="overview-property__content">
                {description ? (
                    description.split('\n').map((paragraph, index) => (
                        <p key={index} className="overview-property__text">
                            {paragraph}
                        </p>
                    ))
                ) : (
                    <p className="overview-property__text overview-property__text--empty">
                        No description available for this property.
                    </p>
                )}
            </div>
        </div>
    );
};

export default OverviewProperty;
