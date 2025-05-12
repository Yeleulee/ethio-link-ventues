import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Information */}
          <div>
            <div className="flex items-center mb-5">
              <Globe className="h-7 w-7 text-accent-green mr-2" />
              <span className="text-xl font-semibold">
                Ethio Links <span className="text-accent-green">Ventures</span>
              </span>
            </div>
            <p className="text-charcoal-300 mb-5">
              Connecting global trade through Ethiopia. Your trusted partner in sourcing and customs clearance.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-charcoal-300 hover:text-accent-yellow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-charcoal-300 hover:text-accent-yellow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-charcoal-300 hover:text-accent-yellow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-charcoal-300 hover:text-accent-yellow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Case Studies', 'FAQs', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-charcoal-300 hover:text-accent-green transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Our Services</h3>
            <ul className="space-y-3">
              {[
                'B2B Buyer-Seller Connection',
                'Customs Clearance Assistance',
                'Local Import Consulting',
                'Freight & Logistics',
                'Trade Documentation',
                'Market Research'
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-charcoal-300 hover:text-accent-green transition-colors"
                  >
                    {item}
                  </a>
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
                <a href="mailto:info@ethiolinks.com" className="text-charcoal-300 hover:text-white">
                  info@ethiolinks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-charcoal-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Ethio Links Ventures. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-charcoal-400 hover:text-accent-green text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-charcoal-400 hover:text-accent-green text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-charcoal-400 hover:text-accent-green text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};