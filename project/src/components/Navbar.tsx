import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Menu, X, ChevronRight, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { 
      scale: 1.05, 
      color: '#2D9D78', // accent-green color
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { 
      x: 8, 
      color: '#2D9D78', 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(45, 157, 120, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="mr-2"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-8 w-8 text-accent-green" />
            </motion.div>
            <motion.span 
              className="text-xl font-semibold text-charcoal-900"
              whileHover={{ color: '#2D9D78' }}
              transition={{ duration: 0.3 }}
            >
              Ethio Links <span className="text-accent-green">Ventures</span>
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6 mr-4">
              {['home', 'services', 'about', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  className="relative px-3 py-2 text-charcoal-700 capitalize"
                  onClick={() => scrollToSection(item)}
                  variants={menuItemVariants}
                  initial="visible"
                  whileHover="hover"
                >
                  <span>{item}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-yellow"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  />
                </motion.button>
              ))}
            </div>
            
            {currentUser ? (
              <motion.button
                className="px-5 py-2 rounded-md bg-accent-green text-white font-medium shadow-sm"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLogout}
              >
                Sign Out
              </motion.button>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="shadow-sm"
                >
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md border border-accent-green text-accent-green font-medium flex items-center"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="shadow-sm"
                >
                  <Link 
                    to="/signup"
                    className="px-4 py-2 rounded-md bg-accent-green text-white font-medium flex items-center"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button 
              className="text-charcoal-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-5 bg-white shadow-lg rounded-b-lg">
          <div className="flex flex-col space-y-4">
            {['home', 'services', 'about', 'contact'].map((item) => (
              <motion.button
                key={item}
                className="text-left py-2 px-4 text-charcoal-700 capitalize flex items-center"
                onClick={() => scrollToSection(item)}
                variants={mobileMenuItemVariants}
                initial="visible"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <motion.span>{item}</motion.span>
                <motion.div
                  variants={{
                    hover: { opacity: 1, x: 4 },
                    visible: { opacity: 0, x: 0 }
                  }}
                >
                  <ChevronRight className="h-4 w-4 ml-2" />
                </motion.div>
              </motion.button>
            ))}
            
            {currentUser ? (
              <motion.button
                className="py-2 px-4 rounded-md bg-accent-green text-white font-medium text-center shadow-sm"
                onClick={handleLogout}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Out
              </motion.button>
            ) : (
              <div className="flex flex-col space-y-3 border-t border-gray-200 pt-4 mt-2">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="shadow-sm"
                >
                  <Link 
                    to="/login" 
                    className="flex items-center py-2 px-4 rounded-md border border-accent-green text-accent-green font-medium"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="shadow-sm"
                >
                  <Link 
                    to="/signup"
                    className="flex items-center py-2 px-4 rounded-md bg-accent-green text-white font-medium"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};