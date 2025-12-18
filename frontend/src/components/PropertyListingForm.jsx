import React, { useState } from 'react';
import './PropertyListingForm.css';

const PropertyListingForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="property-form-container">
            <div className="property-form-header">
                <h1>Property Listing Form</h1>
                <p>Add, edit, or manage your property listings with ease</p>
            </div>

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

                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                        type="text"
                        name="price"
                        className="form-input"
                        placeholder="$ 850,000"
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
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial</option>
                    </select>
                </div>
            </div>

            <div className="form-section">
                <h2 className="form-section-title">Location</h2>
                <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-input"
                        placeholder="e.g., 123 Main Street, Beverly Hills, CA"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-section">
                <h2 className="form-section-title">Property Photos</h2>

                <div className="photo-upload-area">
                    <div className="upload-icon">💀</div>
                    <div className="upload-text">Click to upload photos</div>
                    <div className="upload-subtext">JPG, PNG up to 10MB each</div>
                    <button className="upload-btn">Browse Files</button>
                </div>

            </div>

            <div className="form-actions">
                <button className="btn-action btn-delete">Cancel</button>
                <button className="btn-action btn-publish">Post Property</button>
            </div>
        </div>
    );
};

export default PropertyListingForm;
