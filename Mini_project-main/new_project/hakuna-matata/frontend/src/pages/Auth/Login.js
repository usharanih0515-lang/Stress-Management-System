import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Leaf, LockKeyhole, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name] || errors.submit) setErrors(prev => ({ ...prev, [name]: '', submit: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.email) nextErrors.email = 'Email address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.password) nextErrors.password = 'Password is required.';
    else if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) navigate('/dashboard');
      else setErrors({ submit: result.error });
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally { setIsLoading(false); }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await login('demo@example.com', 'password123');
      if (result.success) navigate('/dashboard');
      else setErrors({ submit: 'No demo account found. Please register first.' });
    } catch (error) { setErrors({ submit: 'Demo login failed.' }); }
    finally { setIsLoading(false); }
  };

  return (
    <main className="auth-shell">
      <section className="auth-story" aria-label="Wellness introduction">
        <div className="story-orbit story-orbit-one" /><div className="story-orbit story-orbit-two" />
        <div className="story-content">
          <div className="brand-lockup brand-lockup-light"><span className="brand-mark"><Leaf size={19} /></span><span>Hakuna Matata</span></div>
          <div className="story-copy"><p className="eyebrow">A calmer way forward</p><h1>Take a Moment for Yourself</h1><p>Manage stress, understand your wellbeing, and build healthier daily habits.</p></div>
          <div className="wellness-visual" aria-hidden="true"><div className="visual-sun" /><div className="visual-breathing-ring visual-ring-back" /><div className="visual-breathing-ring visual-ring-front" /><div className="visual-person"><div className="person-head" /><div className="person-body" /><div className="person-leg person-leg-left" /><div className="person-leg person-leg-right" /></div><span className="visual-caption">Breathe in. Be present.</span></div>
        </div>
        <div className="story-footer"><span /> Small steps create lasting change</div>
      </section>

      <section className="auth-panel"><div className="auth-card">
        <div className="brand-lockup brand-lockup-dark"><span className="brand-mark"><Leaf size={18} /></span><span>Hakuna Matata</span></div>
        <div className="auth-heading"><p className="eyebrow">Your space to reset</p><h2>Welcome Back</h2><p>Sign in to continue your wellness journey.</p></div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {errors.submit && <div className="form-alert" role="alert">{errors.submit}</div>}
          <div className="field-group"><label htmlFor="email">Email Address</label><div className={`input-wrap ${errors.email ? 'has-error' : ''}`}><Mail className="input-icon" size={19} /><input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" aria-invalid={Boolean(errors.email)} /></div>{errors.email && <p className="field-error">{errors.email}</p>}</div>
          <div className="field-group"><label htmlFor="password">Password</label><div className={`input-wrap ${errors.password ? 'has-error' : ''}`}><LockKeyhole className="input-icon" size={19} /><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={formData.password} onChange={handleChange} placeholder="Enter your password" aria-invalid={Boolean(errors.password)} /><button type="button" className="icon-button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.password && <p className="field-error">{errors.password}</p>}</div>
          <div className="form-options"><label className="check-label" htmlFor="rememberMe"><input id="rememberMe" name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleChange} /><span>Remember me</span></label><button type="button" className="text-link">Forgot password?</button></div>
          <button type="submit" disabled={isLoading} className="primary-auth-button">{isLoading ? 'Signing in...' : 'Sign In'}{!isLoading && <ArrowRight size={18} />}</button>
          <button type="button" onClick={handleDemoLogin} disabled={isLoading} className="secondary-auth-button">Try Demo Account</button>
        </form>
        <p className="auth-switch">Don't have an account? <button type="button" onClick={() => navigate('/register')} className="text-link">Create an account</button></p>
      </div></section>
    </main>
  );
};

export default Login;
/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Make sure this path is correct
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the useAuth hook - this is the correct way
  const { login } = useAuth();
  const navigate = useNavigate();

  console.log('🔑 Login component rendered - useAuth hook loaded:', !!login);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('🚀 Attempting login with:', formData.email);
      const result = await login(formData.email, formData.password);
      console.log('📬 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('❌ Login failed:', result.error);
        setErrors({ submit: result.error });
      }
    } catch (error) {
      console.error('💥 Login error caught:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await login('demo@example.com', 'password123');
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: 'No demo account found. Please register first.' });
      }
    } catch (error) {
      setErrors({ submit: 'Demo login failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{errors.submit}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Try Demo Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; */