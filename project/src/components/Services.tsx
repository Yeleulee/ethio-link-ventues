import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, Truck, Home, Building2, Container, HelpCircle, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index, color = "bg-white" }) => {
  return (
    <motion.div 
      className={`${color} rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-accent-green/20 relative overflow-hidden`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient blob that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Decorative corner elements that appear on hover */}
      <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-green/60"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent-green/60"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent-green/60"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-green/60"></div>
      </div>
      
      <div className="mb-4 text-accent-green relative z-10">
        <div className="p-3 bg-accent-green/10 rounded-lg inline-block group-hover:bg-accent-green/20 transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-charcoal-900 relative z-10 group-hover:text-accent-green transition-colors duration-300">{title}</h3>
      <p className="text-charcoal-700 relative z-10">{description}</p>
      
      {/* Arrow that appears on hover */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <svg className="w-6 h-6 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const services = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Employee-Employer Matching",
      description: "Skilled workers connected to the right job opportunities.",
      color: "bg-white"
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Delivery Coordination",
      description: "Fast, safe, and organized logistics solutions.",
      color: "bg-white"
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Market Linkage",
      description: "Helping businesses grow by reaching more customers.",
      color: "bg-white"
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Rental Services",
      description: "Reliable rental solutions for homes, shops, and tools.",
      color: "bg-white"
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "Business Promotion",
      description: "Boost your brand's visibility and local presence.",
      color: "bg-white"
    },
    {
      icon: <Container className="w-10 h-10" />,
      title: "Customs & Transit Support",
      description: "Guidance through import/export processes and local transportation needs.",
      color: "bg-white"
    },
    {
      icon: <HelpCircle className="w-10 h-10" />,
      title: "Consulting & More",
      description: "Professional advice and support across various sectors.",
      color: "bg-white"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-sand-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-flex items-center justify-center mb-4">
            <Logo width={60} height={60} className="mr-3" />
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent-green/10 text-accent-green rounded-full text-sm font-medium">TRUSTED SERVICE PROVIDER</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 text-charcoal-900 relative">
                SIDU<span className="relative">™</span> <span className="text-accent-green">PROVIDER</span>
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-accent-green/80 to-accent-green/20 rounded-full"></div>
              </h2>
            </div>
          </div>
          
          <p className="text-charcoal-700 max-w-2xl mx-auto mt-8 text-lg">
            Connecting People, Jobs & Services — Fast and Trusted!
          </p>
          <p className="text-charcoal-700 max-w-3xl mx-auto mt-4">
            At SIDU™, we pride ourselves on empowering local workers, service seekers, and businesses 
            through fast, secure, and connected services.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              whileHover={{ y: -3 }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="text-blue-600 text-lg font-semibold">1</span>
              </div>
              <span className="font-medium">Professional</span>
            </motion.div>
            
            <motion.div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              whileHover={{ y: -3 }}
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <span className="text-green-600 text-lg font-semibold">2</span>
              </div>
              <span className="font-medium">Reliable</span>
            </motion.div>
            
            <motion.div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              whileHover={{ y: -3 }}
            >
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                <span className="text-yellow-600 text-lg font-semibold">3</span>
              </div>
              <span className="font-medium">Fast</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              color={service.color}
            />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-accent-green/10 to-accent-yellow/10 rounded-2xl p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-bold text-charcoal-900">Let SIDU™ be your step toward better work, smoother logistics, and stronger local impact.</p>
          <div className="mt-6 inline-flex items-center px-5 py-2.5 bg-accent-green text-white rounded-full font-medium">
            <Phone className="w-4 h-4 mr-2" />
            Contact us: 092249605
          </div>
        </motion.div>
      </div>
    </section>
  );
};