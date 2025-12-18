import React from 'react';

const ProfileForm = () => {
    return (
        <div className="profile-form">
            <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="form-input-placeholder" />
            </div>

            <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-placeholder" />
            </div>

            <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="form-input-placeholder" />
            </div>

            <div className="form-group">
                <label className="form-label">Location</label>
                <div className="form-input-placeholder" />
            </div>

            <div className="form-actions">
                <button className="btn-primary">Save Changes</button>
                <button className="btn-secondary">Cancel</button>
            </div>
        </div>
    );
};

export default ProfileForm;
