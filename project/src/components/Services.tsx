import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, Building, Truck } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
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
      title: "B2B Buyer-Seller Connection",
      description: "We connect international buyers with verified Ethiopian suppliers, ensuring quality products at competitive prices."
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "Customs Clearance Assistance",
      description: "Navigate complex customs regulations with our expert assistance, ensuring smooth and timely clearance of your goods."
    },
    {
      icon: <Building className="w-10 h-10" />,
      title: "Local Import Consulting",
      description: "Benefit from our deep understanding of Ethiopian import regulations and market dynamics to optimize your sourcing strategy."
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Freight & Logistics Coordination",
      description: "End-to-end logistics solutions ensuring your goods move efficiently from origin to destination with real-time tracking."
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
          <span className="text-accent-green font-medium">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-charcoal-900">Our Specialized Services</h2>
          <p className="text-charcoal-700 max-w-2xl mx-auto mt-4">
            We provide comprehensive solutions to streamline your trade operations in Ethiopia, from sourcing to delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};