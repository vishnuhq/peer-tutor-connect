/**
 * Login Component
 * Landing page with login form
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Users, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/courses');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (!email || !email.includes('@stevens.edu')) {
      setError('Please enter a valid Stevens email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect happens in useEffect
    } catch (err) {
      console.error('Login error:', err);
      // Keep form visible and show error
      setIsLoading(false);

      // Handle different error scenarios
      if (err.response) {
        setError(err.response.data?.error || 'Email or password is incorrect');
      } else if (err.request) {
        setError('Cannot connect to server. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-center justify-center" style={{ padding: '2rem 1rem' }}>
      <div className="w-full" style={{ maxWidth: '28rem' }}>
        {/* Hero Section */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-teal-600 to-emerald-600 shadow-lg" style={{ width: '5rem', height: '5rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
            <Users style={{ width: '2.5rem', height: '2.5rem' }} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            Peer-Tutor Connect
          </h1>
          <p className="text-gray-600" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
            Connect with peers and get quick help in your courses
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-2xl border border-gray-100" style={{ borderRadius: '1rem', padding: '2.5rem' }}>
          <h2 className="font-semibold text-gray-900 text-center" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
                style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}
              >
                University Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="firstname.lastname@stevens.edu"
                required
                autoComplete="email"
                className="w-full border border-gray-300 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '1rem' }}
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
                style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '1rem' }}
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 flex items-start" style={{ gap: '0.75rem', borderRadius: '0.5rem', padding: '1rem' }}>
                <AlertCircle style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0, marginTop: '0.125rem' }} />
                <p style={{ fontSize: '0.875rem' }}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ padding: '1rem', borderRadius: '0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              aria-label={isLoading ? 'Signing in...' : 'Sign in to your account'}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin text-white" style={{ width: '1.25rem', height: '1.25rem', marginLeft: '-0.25rem', marginRight: '0.75rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden="true" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Account Info */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100" style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: '0.75rem' }}>
            <p className="text-teal-900 font-semibold flex items-center gap-2" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Demo Account
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p className="text-teal-700 font-mono bg-white" style={{ fontSize: '0.75rem', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Email: aditi.sharma@stevens.edu
              </p>
              <p className="text-teal-700 font-mono bg-white" style={{ fontSize: '0.75rem', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Password: password123
              </p>
            </div>
            <p className="text-teal-600 italic" style={{ fontSize: '0.75rem', marginTop: '0.75rem' }}>
              All seeded accounts use password123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600" style={{ fontSize: '0.875rem', marginTop: '2rem' }}>
          Stevens Institute of Technology
        </p>
      </div>
    </div>
  );
};

export default Login;
