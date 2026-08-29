import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Leaf, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' })); setError('');
  };
  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email) nextErrors.email = 'Email address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.terms) nextErrors.terms = 'Please accept the terms to continue.';
    setFieldErrors(nextErrors); return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); if (!validateForm()) return; setLoading(true);
    try { const result = await register(formData.email, formData.password, formData.name); if (result.success) navigate('/dashboard'); else setError(result.error || 'Failed to create account. Please try again.'); }
    catch (requestError) { setError('Failed to create account. Please try again.'); } finally { setLoading(false); }
  };

  return (
    <main className="auth-shell auth-shell-register">
      <section className="auth-story" aria-label="Wellness introduction"><div className="story-orbit story-orbit-one" /><div className="story-orbit story-orbit-two" /><div className="story-content"><div className="brand-lockup brand-lockup-light"><span className="brand-mark"><Leaf size={19} /></span><span>Hakuna Matata</span></div><div className="story-copy"><p className="eyebrow">Begin with intention</p><h1>Your wellbeing journey starts here.</h1><p>Create a gentle daily rhythm with tools designed to help you pause, reflect, and feel more in control.</p></div><div className="story-points"><div><span><Check size={15} /></span><p>Understand your stress patterns</p></div><div><span><Check size={15} /></span><p>Build restorative habits</p></div><div><span><Check size={15} /></span><p>Make space for what matters</p></div></div></div><div className="story-footer"><span /> A little care, every day</div></section>
      <section className="auth-panel"><div className="auth-card register-card"><div className="brand-lockup brand-lockup-dark"><span className="brand-mark"><Leaf size={18} /></span><span>Hakuna Matata</span></div><div className="auth-heading"><p className="eyebrow">Make room for wellbeing</p><h2>Create Your Account</h2><p>Start your journey toward better stress management.</p></div>
        <form className="auth-form register-form" onSubmit={handleSubmit} noValidate>{error && <div className="form-alert" role="alert">{error}</div>}
          <div className="field-group"><label htmlFor="name">Name</label><div className={`input-wrap ${fieldErrors.name ? 'has-error' : ''}`}><UserRound className="input-icon" size={19} /><input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" aria-invalid={Boolean(fieldErrors.name)} /></div>{fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}</div>
          <div className="field-group"><label htmlFor="email">Email Address</label><div className={`input-wrap ${fieldErrors.email ? 'has-error' : ''}`}><Mail className="input-icon" size={19} /><input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" aria-invalid={Boolean(fieldErrors.email)} /></div>{fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}</div>
          <div className="field-group"><label htmlFor="password">Password</label><div className={`input-wrap ${fieldErrors.password ? 'has-error' : ''}`}><LockKeyhole className="input-icon" size={19} /><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="Create a password" aria-invalid={Boolean(fieldErrors.password)} /><button type="button" className="icon-button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}</div>
          <div className="field-group"><label htmlFor="confirmPassword">Confirm Password</label><div className={`input-wrap ${fieldErrors.confirmPassword ? 'has-error' : ''}`}><LockKeyhole className="input-icon" size={19} /><input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" aria-invalid={Boolean(fieldErrors.confirmPassword)} /></div>{fieldErrors.confirmPassword && <p className="field-error">{fieldErrors.confirmPassword}</p>}</div>
          <div className="terms-row"><input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} aria-invalid={Boolean(fieldErrors.terms)} /><label htmlFor="terms">I agree to the <a href="#terms">Terms and Conditions</a></label></div>{fieldErrors.terms && <p className="field-error terms-error">{fieldErrors.terms}</p>}
          <button type="submit" disabled={loading} className="primary-auth-button">{loading ? 'Creating Account...' : 'Create Account'}{!loading && <ArrowRight size={18} />}</button>
        </form><p className="auth-switch">Already have an account? <Link to="/login" className="text-link">Sign in</Link></p>
      </div></section>
    </main>
  );
};
export default Register;
/* import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('📝 Register form submitted:', formData);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.email, formData.password, formData.name);
      
      console.log('📨 Register result:', result);
      
      if (result.success) {
        console.log('✅ Registration successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('❌ Registration failed:', result.error);
        setError(result.error || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('💥 Register catch error:', error);
      setError('Failed to create account. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary/80">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register; */