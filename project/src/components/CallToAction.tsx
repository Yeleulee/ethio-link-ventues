import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling halfway down the page
      const scrollTrigger = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > scrollTrigger);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-sand-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-green font-medium">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-charcoal-900">
                Ready to Streamline Your Import Process?
              </h2>
              <p className="text-charcoal-700 mt-4 mb-8">
                Contact us today to discuss how we can help optimize your trade operations in Ethiopia.
              </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-charcoal-700 mb-1" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-charcoal-700 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-charcoal-700 mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-charcoal-700 mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    placeholder="Tell us about your import needs..."
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 bg-accent-green text-white rounded-full font-medium hover:bg-accent-green/90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 z-40 transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-charcoal-900 font-medium mb-3 sm:mb-0">
              Let's streamline your next shipment
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="tel:+251911234567"
                className="flex items-center px-4 py-2 bg-accent-green text-white rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </motion.a>
              <motion.a
                href="https://wa.me/251911234567"
                className="flex items-center px-4 py-2 bg-secondary-500 text-white rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};