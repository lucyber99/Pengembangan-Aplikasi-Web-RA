import React, { useEffect, useState } from 'react';
import './PropertyListingForm.css';

const PropertyListingForm = ({ onSubmit, onCancel, initialData = {}, submitLabel }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        type: initialData.type || '',
        address: initialData.address || initialData.location || '', // Mapping address to location
        beds: initialData.beds || '',
        baths: initialData.baths || '',
        area: initialData.area || '',
        photoUrl: initialData.photoUrl || ''
    });

    useEffect(() => {
        setFormData({
            title: initialData.title || '',
            description: initialData.description || '',
            price: initialData.price || '',
            type: initialData.type || '',
            address: initialData.address || initialData.location || '',
            beds: initialData.beds || '',
            baths: initialData.baths || '',
            area: initialData.area || '',
            photoUrl: initialData.photoUrl || ''
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photoUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.title || !formData.price) {
            alert("Title and Price are required!");
            return;
        }

        // Prepare data matching the structure
        const submissionData = {
            ...formData,
            location: formData.address, // Ensure location field is populated
            // Keep numerical values as numbers if possible, though state is string
        };

        if (onSubmit) {
            onSubmit(submissionData);
        }
    };

    return (
        <div className="property-form-container">
            <div className="property-form-header">
                <h1>{initialData.id ? 'Edit Property' : 'Add New Property'}</h1>
                <p>{initialData.id ? 'Update your property details' : 'List your property to reach millions of buyers'}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2 className="form-section-title">Basic Information</h2>

                    <div className="form-group">
                        <label className="form-label">Property Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="e.g., Modern Sunset Villa"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Provide a detailed description of the property..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-grid-3">
                        <div className="form-group">
                            <label className="form-label">Price (IDR)</label>
                            <input
                                type="number"
                                name="price"
                                className="form-input"
                                placeholder="850000000"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Property Type</label>
                            <select
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="">Select type</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title">Property Details</h2>
                    <div className="form-grid-3">
                        <div className="form-group">
                            <label className="form-label">Bedrooms</label>
                            <input
                                type="number"
                                name="beds"
                                className="form-input"
                                placeholder="3"
                                value={formData.beds}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Bathrooms</label>
                            <input
                                type="number"
                                name="baths"
                                className="form-input"
                                placeholder="2"
                                value={formData.baths}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Area (sqm)</label>
                            <input
                                type="number"
                                name="area"
                                className="form-input"
                                placeholder="120"
                                value={formData.area}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title">Location</h2>
                    <div className="form-group">
                        <label className="form-label">Address / Location</label>
                        <input
                            type="text"
                            name="address"
                            className="form-input"
                            placeholder="e.g., BSD, Tangerang"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title">Property Photos</h2>

                    <div className="form-group">
                        <label className="form-label">Property Photo</label>
                        <div className="photo-upload-area" onClick={() => document.getElementById('photo-upload').click()}>
                            <div className="upload-icon">
                                <span>+</span>
                            </div>
                            <div className="upload-text">
                                {formData.photoUrl ? 'Change Photo' : 'Upload Photo'}
                            </div>
                            <div className="upload-subtext">
                                {formData.photoUrl ? 'Click to replace' : 'SVG, PNG, JPG or GIF (max. 5MB)'}
                            </div>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <button type="button" className="upload-btn">Browse Files</button>
                        </div>

                        {formData.photoUrl && (
                            <div className="photo-preview" style={{ marginTop: '16px' }}>
                                <img
                                    src={formData.photoUrl}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-action btn-delete"
                        onClick={() => {
                            if (typeof onCancel === 'function') onCancel();
                            else window.history.back();
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-action btn-publish">
                        {submitLabel || (initialData.id ? 'Update Property' : 'Post Property')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyListingForm;
