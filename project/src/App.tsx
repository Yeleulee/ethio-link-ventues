import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About';
import { Contact } from './components/Contact';

// Error boundary for auth-related issues
const AuthErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleErrors = (event: ErrorEvent) => {
      if (event.error && event.error.message && 
         (event.error.message.includes('auth') || 
          event.error.message.includes('firebase'))) {
        console.error('Auth-related error caught:', event.error);
        setHasError(true);
        setErrorMessage(event.error.message);
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleErrors);
    return () => window.removeEventListener('error', handleErrors);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-red-600">Authentication Error</h2>
          <p className="text-center text-gray-700">
            There was a problem with the authentication service. 
            This might be due to Firebase configuration issues.
          </p>
          <p className="text-sm text-gray-500 mt-2">{errorMessage}</p>
          <button 
            onClick={() => setHasError(false)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Protected Route component with fallback for auth errors
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
  } catch (error) {
    console.error("Error in ProtectedRoute:", error);
    return <Navigate to="/" />;
  }
};

// Public HomePage component
const HomePage: React.FC = () => (
  <Layout>
    <Hero />
    <About />
    <Services />
    <Stats />
    <Testimonials />
    <Contact />
    <CallToAction />
  </Layout>
);

function App() {
  return (
    <Router>
      <AuthErrorBoundary>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <div className="container mx-auto px-4 py-20">
                    <h1 className="text-3xl font-bold text-center mt-10">User Profile</h1>
                    <p className="text-center mt-4">Manage your profile information</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </AuthProvider>
      </AuthErrorBoundary>
    </Router>
  );
}

export default App;