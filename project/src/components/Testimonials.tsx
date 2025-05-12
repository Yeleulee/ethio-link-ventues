import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Abebe Kebede",
      role: "Import Manager",
      company: "Addis Trading Co.",
      content: "Ethio Links Ventures transformed our import process. Their customs expertise saved us thousands in potential delays and fees. Highly recommended for any business importing to Ethiopia."
    },
    {
      id: 2,
      name: "Sara Mohammed",
      role: "CEO",
      company: "Global Connect Ltd",
      content: "We've worked with many logistics providers, but none understand the Ethiopian market like Ethio Links. Their team's knowledge and connections make them indispensable partners for our operation."
    },
    {
      id: 3,
      name: "Daniel Tesfaye",
      role: "Operations Director",
      company: "East Africa Supplies",
      content: "The level of personal attention from Ethio Links is outstanding. They handled our complex shipment with precision and kept us informed every step of the way. A truly reliable partner."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-green font-medium">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-charcoal-900">What Our Clients Say</h2>
          <p className="text-charcoal-700 max-w-2xl mx-auto mt-4">
            Hear from businesses that have transformed their import operations with our services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-sand-50 rounded-xl p-8 md:p-10 shadow-md relative"
          >
            <div className="absolute top-8 left-8 text-accent-yellow opacity-30">
              <Quote className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-charcoal-800 mb-6 leading-relaxed">
                "{testimonials[activeIndex].content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-charcoal-900">{testimonials[activeIndex].name}</p>
                  <p className="text-charcoal-700 text-sm">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-accent-green' : 'bg-charcoal-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12">
            <motion.button
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal-700 hover:text-accent-green focus:outline-none"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12">
            <motion.button
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal-700 hover:text-accent-green focus:outline-none"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};