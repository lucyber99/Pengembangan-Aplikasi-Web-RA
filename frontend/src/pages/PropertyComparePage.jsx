import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompareProperty from '../components/CompareProperty';
import InsightCompare from '../components/InsightCompare';
import PropertySelectionModal from '../components/PropertySelectionModal';
import { useProperties } from '../context/PropertyContext';

const PropertyComparePage = () => {
    const { properties, comparisonList, removeFromCompare, addToCompare } = useProperties();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectProperty = (property) => {
        addToCompare(property);
        setIsModalOpen(false);
    };

    if (comparisonList.length === 0) {
        return (
            <div className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1 style={{ marginBottom: '20px' }}>No Properties Selected</h1>
                <p style={{ marginBottom: '40px', color: '#64748b' }}>
                    You haven't selected any properties to compare yet.
                    <br />
                    Go back to the listing and click "+ Compare" on properties you like.
                </p>
                <Link to="/" className="btn primary">Browse Properties</Link>
            </div>
        );
    }

    return (
        <main className="page">
            <div className="landing-hero" style={{ marginBottom: '40px' }}>
                <div className="landing-hero__content">
                    <div className="eyebrow">Comparison</div>
                    <h1>Compare Properties</h1>
                    <p className="lede">
                        Analyze features, price, and details side-by-side to find the best fit.
                    </p>
                </div>
            </div>

            <section style={{ marginBottom: '60px' }}>
                <CompareProperty
                    properties={comparisonList}
                    onRemove={removeFromCompare}
                    onAdd={() => setIsModalOpen(true)}
                />

                {comparisonList.length >= 2 && (
                    <div style={{ marginTop: '60px' }}>
                        <InsightCompare properties={comparisonList} />
                    </div>
                )}
            </section>

            <PropertySelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                properties={properties}
                onSelect={handleSelectProperty}
                currentComparisonIds={comparisonList.map(p => p.id)}
            />
        </main>
    );
};

export default PropertyComparePage;
