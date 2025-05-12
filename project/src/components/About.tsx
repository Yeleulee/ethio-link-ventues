import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const specializations = [
    "Employee-Employer Matching – Skilled workers connected to the right job opportunities.",
    "Delivery Coordination – Fast, safe, and organized logistics solutions.",
    "Customs & Transit Support – Guidance through import/export processes and local transportation needs.",
    "Rental Services – Reliable rental solutions for homes, shops, and tools.",
    "Market Linkage – Helping businesses grow by reaching more customers.",
    "Business Promotion – Boost your brand's visibility and local presence.",
    "Consulting & More – Professional advice and support across various sectors."
  ];

  const benefits = [
    "Fast & trusted support",
    "Honest and smart coordination",
    "Local empowerment and business growth"
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">SIDU™ PROVIDER</h2>
          <h3 className="text-2xl md:text-3xl font-semibold mt-2 text-emerald-700">Our Mission</h3>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-navy-800">
                    <path d="M50,20 C60,20 70,30 70,40 L90,40 L70,60 L70,80 C60,80 50,70 50,60 L30,60 L50,40 L50,20 Z" 
                          fill="currentColor" />
                    <path d="M50,80 C40,80 30,70 30,60 L10,60 L30,40 L30,20 C40,20 50,30 50,40 L70,40 L50,60 L50,80 Z" 
                          fill="#1e6551" />
                  </svg>
                </div>
              </div>
            </div>

            <h4 className="text-2xl font-bold mb-4 text-navy-800">Your Trusted Bridge</h4>
            <p className="text-xl text-center mb-6">between opportunities and reliable solutions.</p>
            
            <p className="text-lg text-charcoal-700 mb-8">
              At SIDU™, we pride ourselves on being your trusted bridge between opportunities and reliable solutions. 
              Our mission is to empower local workers, service seekers, and businesses by offering fast, secure, 
              and connected services with honesty and professionalism.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h4 className="text-xl font-bold mb-4 text-navy-800 text-center">
              <span className="inline-block text-emerald-600 mr-2">🚀</span> 
              What We Offer:
            </h4>
            <div className="space-y-3">
              {specializations.map((spec, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="mr-2 mt-1 text-emerald-700 font-bold">{index + 1}.</div>
                  <p className="text-charcoal-700">{spec}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h4 className="text-xl font-bold mb-4 text-navy-800 text-center">
              <span className="inline-block text-emerald-600 mr-2">✅</span> 
              Why Choose SIDU™?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-emerald-50 p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <p className="text-charcoal-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p 
            className="text-xl font-bold text-center mt-10 text-navy-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            Let SIDU™ be your step toward better work, smoother logistics, and stronger local impact.
          </motion.p>
        </div>
      </div>
    </section>
  );
}; 