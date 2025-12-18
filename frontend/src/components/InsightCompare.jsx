import React from 'react';
import './InsightCompare.css';

const InsightCompare = ({ properties }) => {
    if (!properties || properties.length < 2) {
        return null;
    }

    // Calculate Insights
    const getLowestPrice = () => {
        return properties.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
    };

    const getLargestArea = () => {
        return properties.reduce((prev, curr) => (prev.area > curr.area ? prev : curr));
    };

    const getMostBedrooms = () => {
        return properties.reduce((prev, curr) => (prev.beds > curr.beds ? prev : curr));
    }

    const lowestPrice = getLowestPrice();
    const largestArea = getLargestArea();
    const mostBeds = getMostBedrooms();

    const formatPrice = (value) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

    return (
        <div className="insight-compare">
            <h3 className="insight-title">Quick Comparison</h3>

            <div className="insight-grid">
                {/* Lowest Price Row */}
                <div className="insight-row">
                    <span className="insight-label">Lowest Price</span>
                    <span className="insight-winner">{lowestPrice.title}</span>
                    <span className="insight-value">{formatPrice(lowestPrice.price)}</span>
                    <span className="insight-diff">Best value deal</span>
                </div>

                {/* Largest Area Row */}
                <div className="insight-row">
                    <span className="insight-label">Most Spacious</span>
                    <span className="insight-winner">{largestArea.title}</span>
                    <span className="insight-value">{largestArea.area} m²</span>
                    <span className="insight-diff">Largest living space</span>
                </div>

                {/* Most Bedrooms Row */}
                <div className="insight-row">
                    <span className="insight-label">Most Bedrooms</span>
                    <span className="insight-winner">{mostBeds.title}</span>
                    <span className="insight-value">{mostBeds.beds} Bedrooms</span>
                    <span className="insight-diff">Great for families</span>
                </div>
            </div>
        </div>
    );
};

export default InsightCompare;
