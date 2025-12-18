import React from 'react';

const PropertySelectionModal = ({ isOpen, onClose, properties, onSelect, currentComparisonIds }) => {
    if (!isOpen) return null;

    // Filter out properties that are already in the comparison list
    const availableProperties = properties.filter(p => !currentComparisonIds.includes(p.id));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Select Property to Compare</h3>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#64748b'
                    }}>&times;</button>
                </div>

                <div style={{
                    padding: '24px',
                    overflowY: 'auto',
                    display: 'grid',
                    gap: '16px'
                }}>
                    {availableProperties.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#64748b' }}>No more properties available to add.</p>
                    ) : (
                        availableProperties.map(property => (
                            <div key={property.id} onClick={() => onSelect(property)} style={{
                                display: 'flex',
                                gap: '16px',
                                padding: '12px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                            >
                                <img src={property.photoUrl} alt={property.title} style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }} />
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{property.title}</h4>
                                    <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: '0.875rem' }}>{property.location}</p>
                                    <p style={{ margin: 0, fontWeight: 600, color: '#2563eb' }}>
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(property.price)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertySelectionModal;
