import React from 'react';

const ProfileHeaderCard = () => {
    return (
        <div className="profile-user-info">
            <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                alt="Sarah Johnson"
                className="profile-avatar"
            />
            <div className="profile-details">
                <div className="profile-name-row">
                    <h2 className="profile-name">Sarah Johnson</h2>
                    <span className="role-badge">Agent</span>
                </div>
                <span className="profile-email">sarah.johnson@email.com</span>
                <button className="change-photo-btn">Change Profile Picture</button>
            </div>
        </div>
    );
};

export default ProfileHeaderCard;
