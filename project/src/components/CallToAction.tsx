import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Send } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling halfway down the page
      const scrollTrigger = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > scrollTrigger);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="cta" className="py-16 md:py-24 bg-gradient-to-b from-sand-50 to-white">
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
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                        placeholder="Your name"
                        required
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                        placeholder="your@email.com"
                        required
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
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                      placeholder="How can we help you?"
                      required
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
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-charcoal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                      placeholder="Tell us about your import needs..."
                      required
                    ></textarea>
                  </motion.div>

                  {submitError && (
                    <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md">
                      {submitError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-accent-green text-white rounded-full font-medium hover:bg-accent-green/90 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
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
                target="_blank" 
                rel="noopener noreferrer"
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