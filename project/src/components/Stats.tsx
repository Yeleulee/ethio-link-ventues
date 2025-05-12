import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Clock, Building2, Globe } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  description: string;
  index: number;
  inView: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, suffix, description, index, inView }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // 2 seconds duration
      const increment = 1000 / 60; // 60fps
      const totalSteps = duration / increment;
      const incrementValue = value / totalSteps;
      
      const timer = setInterval(() => {
        start += incrementValue;
        setCount(Math.min(Math.floor(start), value));
        
        if (start >= value) {
          clearInterval(timer);
        }
      }, increment);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);
  
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="text-accent-yellow mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white">
        {inView ? count : 0}{suffix}
      </div>
      <p className="text-gray-200 text-center mt-2">{description}</p>
    </motion.div>
  );
};

export const Stats: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  const stats = [
    {
      icon: <CheckCircle className="w-10 h-10" />,
      value: 100,
      suffix: "+",
      description: "Successful Imports"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      value: 24,
      suffix: "hr",
      description: "Customs Support"
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      value: 50,
      suffix: "+",
      description: "Partner Companies"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      value: 15,
      suffix: "+",
      description: "Countries Served"
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-charcoal-950 text-white">
      <div 
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem 
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              description={stat.description}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};