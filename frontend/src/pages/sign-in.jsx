import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, Mail, Lock, User, Briefcase, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import SocialAuthButton from '../components/ui/SocialAuthButton';

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-page__blur auth-page__blur--tl" />
      <div className="auth-page__blur auth-page__blur--br" />

      <div className="auth-card">
        <header className="auth-header">
          <button onClick={() => navigate(-1)} className="auth-back" aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
        </header>

        <div className="auth-body">
          <div className="auth-hero">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your property journey.</p>
          </div>

          <div className="auth-section">
            <label className="auth-label">Sign in as...</label>
            <div className="role-grid">
              <button
                type="button"
                onClick={() => setSelectedRole('buyer')}
                className={`role-card ${selectedRole === 'buyer' ? 'active' : ''}`}
              >
                {selectedRole === 'buyer' && (
                  <span className="role-card__check">
                    <Check size={14} />
                  </span>
                )}
                <div className="role-card__icon role-card__icon--buyer">
                  <User size={26} />
                </div>
                <div className="role-card__title">Buyer</div>
                <div className="role-card__subtitle">Looking for property</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('agent')}
                className={`role-card ${selectedRole === 'agent' ? 'active' : ''}`}
              >
                {selectedRole === 'agent' && (
                  <span className="role-card__check">
                    <Check size={14} />
                  </span>
                )}
                <div className="role-card__icon role-card__icon--agent">
                  <Briefcase size={26} />
                </div>
                <div className="role-card__title">Agent</div>
                <div className="role-card__subtitle">Listing properties</div>
              </button>
            </div>
          </div>

          <div className="auth-section">
            <label className="auth-label">Email Address</label>
            <div className="input-field">
              <Mail size={18} />
              <input type="email" defaultValue="john@example.com" placeholder="john@example.com" />
            </div>
          </div>

          <div className="auth-section">
            <label className="auth-label">Password</label>
            <div className="input-field">
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="password123"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="input-field__suffix"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          <div className="auth-row">
            <label className="checkbox">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span className="checkbox__box">{rememberMe && <Check size={14} />}</span>
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot?
            </Link>
          </div>

          <Button variant="primary" size="lg" fullWidth type="button" rightIcon={<ArrowRight size={18} />}>
            Sign In
          </Button>

          <Divider label="Or sign in with" />

          <div className="social-row">
            <SocialAuthButton provider="google" onClick={() => {}} label="Google" />
            <SocialAuthButton provider="apple" onClick={() => {}} label="Apple" />
          </div>

          <div className="auth-footer">
            <span>Don't have an account?</span>
            <Link to="/register" className="auth-link auth-link--bold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
