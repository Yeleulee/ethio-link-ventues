import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const result = await login(email, password);
      
      if (result && result.user) {
        // Set success flag and wait briefly before navigating
        setLoginSuccess(true);
        
        // Allow time for auth state to update
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Login failed: No user returned');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later or reset your password');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again');
      } else {
        setError(err.message || 'Failed to sign in. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      
      const result = await loginWithGoogle();
      
      if (result && result.user) {
        // Set success flag and wait briefly before navigating
        setLoginSuccess(true);
        
        // Allow time for auth state to update
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Google login failed: No user returned');
      }
    } catch (err: any) {
      console.error('Google login error:', err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Sign-in popup was blocked by your browser. Please enable popups for this site');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again');
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.01,
      boxShadow: "0 0 0 2px rgba(45, 157, 120, 0.25)",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sand-50 p-4">
        <motion.div 
          className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful!</h2>
          <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
          <div className="animate-pulse flex justify-center">
            <div className="h-2 w-16 bg-accent-green rounded"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sand-50 p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.h2 
              className="text-3xl font-bold text-charcoal-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="text-charcoal-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to your SIDU Provider account
            </motion.p>
          </div>

          {error && (
            <motion.div 
              className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <motion.div 
              className="relative rounded-lg border border-gray-200 focus-within:border-accent-green bg-white"
              variants={inputVariants}
              whileFocus="focus"
            >
              <div className="flex items-center px-3">
                <Mail className="h-5 w-5 text-charcoal-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-3 border-0 focus:outline-none focus:ring-0 text-charcoal-900"
                  placeholder="Email address"
                />
              </div>
            </motion.div>

            <motion.div 
              className="relative rounded-lg border border-gray-200 focus-within:border-accent-green bg-white"
              variants={inputVariants}
              whileFocus="focus"
            >
              <div className="flex items-center px-3">
                <Lock className="h-5 w-5 text-charcoal-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-3 border-0 focus:outline-none focus:ring-0 text-charcoal-900"
                  placeholder="Password"
                />
              </div>
            </motion.div>

            <div className="flex justify-end">
              <Link 
                to="#" 
                className="text-sm text-accent-green hover:text-accent-green/90 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={loading}
              className="relative w-full flex items-center justify-center py-3 px-4 bg-accent-green text-white font-medium rounded-lg shadow-sm disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </div>
              )}
            </motion.button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-charcoal-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              disabled={googleLoading}
              onClick={handleGoogleSignIn}
              className="relative w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 text-charcoal-800 font-medium rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-70"
            >
              {googleLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                    <path fill="none" d="M1 1h22v22H1z" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </motion.button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-charcoal-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent-green hover:text-accent-green/90 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 