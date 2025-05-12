import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const scrollToSection = (id: string) => {
    console.log(`Footer: Attempting to scroll to section with id: ${id}`);
    
    if (isHomePage) {
      // If already on home page, scroll to section
      const element = document.getElementById(id);
      if (element) {
        console.log(`Footer: Found element with id ${id}, scrolling to it`);
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Footer: Element with id ${id} not found in the document`);
      }
    } else {
      // If on another page, navigate to home with hash
      console.log(`Footer: Not on home page, navigating to /#${id}`);
      navigate(`/#${id}`);
    }
  };
  
  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
    { name: 'Get a Quote', id: 'cta' }
  ];
  
  const services = [
    { name: 'B2B Buyer-Seller Connection', id: 'services' },
    { name: 'Customs Clearance Assistance', id: 'services' },
    { name: 'Local Import Consulting', id: 'services' },
    { name: 'Freight & Logistics', id: 'services' },
    { name: 'Trade Documentation', id: 'services' },
    { name: 'Market Research', id: 'services' }
  ];
  
  const socialMedia = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, url: 'https://facebook.com/siduprovider' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com/siduprovider' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/company/siduprovider' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com/siduprovider' }
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' }
  ];

  return (
    <footer className="bg-charcoal-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Information */}
          <div>
            <div 
              className="flex items-center mb-5 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <Logo width={32} height={32} className="mr-2" />
              <span className="text-xl font-semibold">
                SIDU <span className="text-accent-green">Provider</span>
              </span>
            </div>
            <p className="text-charcoal-300 mb-5">
              Connecting global trade through Ethiopia. Your trusted partner in sourcing and customs clearance.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal-300 hover:text-accent-yellow"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={item.name}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-charcoal-300 hover:text-accent-green transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-charcoal-300 hover:text-accent-green transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Our Services</h3>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-charcoal-300 hover:text-accent-green transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-yellow mr-3 mt-0.5" />
                <span className="text-charcoal-300">
                  Bole Road, Addis Ababa<br />
                  Ethiopia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent-yellow mr-3" />
                <a href="tel:+251911234567" className="text-charcoal-300 hover:text-white">
                  +251 911 234 567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent-yellow mr-3" />
                <a href="mailto:info@siduprovider.com" className="text-charcoal-300 hover:text-white">
                  info@siduprovider.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-charcoal-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SIDU Provider. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {legalLinks.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path} 
                  className="text-charcoal-400 hover:text-accent-green text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};