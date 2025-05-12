import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, Truck, Home, Building2, Container, HelpCircle } from 'lucide-react';

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
      className={`${color} rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mb-4 text-accent-green">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-charcoal-900">{title}</h3>
      <p className="text-charcoal-700">{description}</p>
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
    <section id="services" className="py-16 md:py-24 bg-sand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-green font-medium">SIDU™ PROVIDER</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-charcoal-900">Our Specialized Services</h2>
          <p className="text-charcoal-700 max-w-2xl mx-auto mt-4">
            Connecting People, Jobs & Services — Fast and Trusted!
          </p>
          <p className="text-charcoal-700 max-w-3xl mx-auto mt-4">
            At SIDU™, we pride ourselves on empowering local workers, service seekers, and businesses 
            through fast, secure, and connected services.
          </p>
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
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-bold text-charcoal-900">Let SIDU™ be your step toward better work, smoother logistics, and stronger local impact.</p>
          <p className="mt-4 text-charcoal-700">Contact us: 092249605</p>
        </motion.div>
      </div>
    </section>
  );
};