import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-navy-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Contact SIDU™ PROVIDER</h2>
          <p className="text-xl mt-4 text-gray-300">
            Reach out to us for all your logistics, employment, and service needs
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                <Phone className="w-6 h-6 text-navy-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-gray-300">Quick response during business hours</p>
              </div>
            </div>
            <a 
              href="tel:+251922496605" 
              className="text-2xl font-bold hover:text-yellow-400 transition-colors block"
            >
              092249605
            </a>
            <p className="text-sm text-gray-300 mt-2">
              📞 Contact Us Today
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-navy-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Message Us</h3>
                <p className="text-gray-300">📲 Available on Telegram and WhatsApp</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Telegram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 15.5a3 3 0 1 1-5.6 1.5 3 3 0 0 1 5.6-1.5"></path>
                  <path d="M19.5 12.5v-7a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                  <path d="M9 10a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-4a1 1 0 0 0-1 1"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-semibold text-yellow-400">
            Let SIDU™ be your step toward better work, smoother logistics, and stronger local impact.
          </p>
          <p className="mt-2 text-gray-300">
            Connecting People, Jobs & Services — Fast and Trusted!
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 