import React from 'react';
import { LogOut } from 'lucide-react';

const SignOutCard = () => {
    return (
        <div className="sign-out-card">
            <div className="sign-out-header">
                <div className="sign-out-icon-wrapper">
                    <LogOut size={24} />
                </div>
                <div className="sign-out-content">
                    <h3>Sign Out</h3>
                    <p>
                        Sign out of your account on this device. You can always sign back in anytime.
                    </p>
                </div>
            </div>

            <button className="btn-danger">
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
    );
};

export default SignOutCard;
