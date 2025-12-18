import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyListingForm from '../components/PropertyListingForm';
import { useProperties } from '../context/PropertyContext';

const PropertyCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { properties, addProperty, updateProperty } = useProperties();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (id) {
            const prop = properties.find(p => p.id === parseInt(id) || p.id === id);
            if (prop) {
                setInitialData(prop);
            }
        }
    }, [id, properties]);

    const handleFormSubmit = (propertyData) => {
        if (id) {
            updateProperty(parseInt(id), propertyData);
            alert("Property Updated Successfully!");
        } else {
            addProperty(propertyData);
            alert("Property Added Successfully!");
        }
        navigate('/'); // Redirect to home/listing page
    };

    if (id && !initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <PropertyListingForm onSubmit={handleFormSubmit} initialData={initialData || {}} />
        </div>
    );
};

export default PropertyCreate;
