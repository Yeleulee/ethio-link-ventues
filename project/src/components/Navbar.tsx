import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight, LogIn, UserPlus, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle hash changes and scroll to section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # symbol
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    console.log(`Attempting to scroll to section with id: ${id}`);
    
    if (isHomePage) {
      // If already on home page, scroll to section
      const element = document.getElementById(id);
      if (element) {
        console.log(`Found element with id ${id}, scrolling to it`);
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      } else {
        console.warn(`Element with id ${id} not found in the document`);
      }
    } else {
      // If on another page, navigate to home with hash
      console.log(`Not on home page, navigating to /#${id}`);
      navigate(`/#${id}`);
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

  // Define navigation items with their section IDs - make sure these match the actual IDs in the components
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  // Check if all section IDs actually exist in the document
  useEffect(() => {
    if (isHomePage) {
      navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (!element) {
          console.warn(`Section with ID "${item.id}" not found in the document`);
        }
      });
    }
  }, [isHomePage]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="mr-3"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              <Logo width={40} height={40} />
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-charcoal-900"
              whileHover={{ color: '#2D9D78' }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              SIDU <span className="text-accent-green">Provider</span>
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6 mr-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="relative px-3 py-2 text-charcoal-700 capitalize font-medium"
                  onClick={() => {
                    console.log(`Desktop menu: clicked on ${item.name} with id ${item.id}`);
                    scrollToSection(item.id);
                  }}
                  variants={menuItemVariants}
                  initial="visible"
                  whileHover="hover"
                >
                  <span>{item.name}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  />
                </motion.button>
              ))}
            </div>
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
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="text-left py-2 px-4 text-charcoal-700 flex items-center"
                onClick={() => {
                  console.log(`Mobile menu: clicked on ${item.name} with id ${item.id}`);
                  scrollToSection(item.id);
                }}
                variants={mobileMenuItemVariants}
                initial="visible"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <motion.span>{item.name}</motion.span>
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
              <div className="flex flex-col space-y-3 border-t border-gray-200 pt-4 mt-2">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="shadow-sm"
                >
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 px-4 rounded-md border border-accent-green text-accent-green font-medium"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </motion.div>
                <motion.button
                  className="flex items-center py-2 px-4 rounded-md bg-accent-green text-white font-medium"
                  onClick={handleLogout}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign Out
                </motion.button>
              </div>
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