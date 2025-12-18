import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Mail,
  Lock,
  User,
  Briefcase,
  Check,
  Phone,
  MapPin,
  Building2,
  BadgeDollarSign,
} from 'lucide-react';

const scorePassword = (password) => {
  if (!password) return { score: 0, label: 'Too weak', hint: 'Must be at least 8 characters' };

  const lengthOk = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const checks = [lengthOk, hasLower, hasUpper, hasNumber, hasSpecial];
  const score = checks.reduce((acc, ok) => acc + (ok ? 1 : 0), 0);

  const label =
    score <= 1 ? 'Too weak' : score === 2 ? 'Weak' : score === 3 ? 'Good' : score === 4 ? 'Strong' : 'Very strong';

  const hint = lengthOk ? 'Use a mix of letters, numbers, symbols' : 'Must be at least 8 characters';
  return { score, label, hint };
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    company: '',
    budget: '',
  });

  const navigate = useNavigate();
  const strength = useMemo(() => scorePassword(form.password), [form.password]);

  const canGoNext = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
    return form.fullName.trim() && emailOk && form.password.length >= 8 && agreed;
  }, [form.fullName, form.email, form.password, agreed]);

  const handleChange = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const onPrimary = () => {
    if (step === 1) {
      if (!canGoNext) return;
      setStep(2);
      return;
    }

    // Placeholder: wire to backend later.
    navigate('/login');
  };

  const onBack = () => {
    if (step === 2) {
      setStep(1);
      return;
    }
    navigate(-1);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__blur auth-page__blur--tl" />
      <div className="auth-page__blur auth-page__blur--br" />

      <div className="auth-card">
        <header className="auth-header">
          <button onClick={onBack} className="auth-back" aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <div className="auth-step">Step {step} of 2</div>
        </header>

        <div className="auth-body">
          <div className="auth-hero">
            <h1>Create Account</h1>
            <p>Join our community to find your dream property or list your own.</p>
          </div>

          {step === 1 ? (
            <>
              <div className="auth-section">
                <label className="auth-label">I am a...</label>
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
                <label className="auth-label">Full Name</label>
                <div className="input-field">
                  <User size={18} />
                  <input value={form.fullName} onChange={handleChange('fullName')} placeholder="John Doe" />
                </div>
              </div>

              <div className="auth-section">
                <label className="auth-label">Email Address</label>
                <div className="input-field">
                  <Mail size={18} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="auth-section">
                <label className="auth-label">Password</label>
                <div className="input-field">
                  <Lock size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                <div className="password-meter" aria-label="Password strength">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <span
                      key={`bar-${idx}`}
                      className={`password-meter__bar ${
                        strength.score >= idx + 2 ? `password-meter__bar--lvl-${Math.min(4, strength.score - 1)}` : ''
                      }`.trim()}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="password-hint">
                  <span className={`password-tag password-tag--${strength.score >= 4 ? 'good' : 'muted'}`}>
                    {strength.label}
                  </span>
                  <span>{strength.hint}</span>
                </div>
              </div>

              <div className="auth-section">
                <label className="checkbox checkbox--terms">
                  <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                  <span className="checkbox__box">{agreed && <Check size={14} />}</span>
                  <span>
                    I agree to the{' '}
                    <a className="auth-link" href="#terms">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a className="auth-link" href="#privacy">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="auth-section">
                <label className="auth-label">Phone Number</label>
                <div className="input-field">
                  <Phone size={18} />
                  <input value={form.phone} onChange={handleChange('phone')} placeholder="+62 812-3456-7890" />
                </div>
              </div>

              <div className="auth-section">
                <label className="auth-label">Location</label>
                <div className="input-field">
                  <MapPin size={18} />
                  <input value={form.location} onChange={handleChange('location')} placeholder="Jakarta, Indonesia" />
                </div>
              </div>

              {selectedRole === 'agent' ? (
                <div className="auth-section">
                  <label className="auth-label">Agency / Company</label>
                  <div className="input-field">
                    <Building2 size={18} />
                    <input
                      value={form.company}
                      onChange={handleChange('company')}
                      placeholder="e.g., Estatery Realty"
                    />
                  </div>
                </div>
              ) : (
                <div className="auth-section">
                  <label className="auth-label">Budget (optional)</label>
                  <div className="input-field">
                    <BadgeDollarSign size={18} />
                    <input value={form.budget} onChange={handleChange('budget')} placeholder="e.g., IDR 1.5B" />
                  </div>
                </div>
              )}

              <div className="auth-note">
                This is a UI-only flow. Wire this up to the backend endpoint when available.
              </div>
            </>
          )}

          <button className="auth-primary" type="button" onClick={onPrimary} disabled={step === 1 && !canGoNext}>
            <span>{step === 1 ? 'Continue' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>

          <div className="divider">
            <span>Or register with</span>
          </div>

          <div className="social-row">
            <button className="social-btn" type="button">
              <span className="social-icon google" aria-hidden />
              <span>Google</span>
            </button>
            <button className="social-btn" type="button">
              <span className="social-icon apple" aria-hidden />
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="auth-link auth-link--bold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
