import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileHeaderCard from '../components/ProfileHeaderCard';
import ProfileForm from '../components/ProfileForm';
import SignOutCard from '../components/SignOutCard';
import './ProfileSettings.css';

const ProfileSettings = () => {
    return (
        <>
            <Navbar />
            <main className="profile-page">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>Profile Settings</h1>
                        <p>Manage your account information and preferences</p>
                    </div>

                    <div className="profile-card">
                        <ProfileHeaderCard />
                        <ProfileForm />
                    </div>

                    <SignOutCard />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProfileSettings;
