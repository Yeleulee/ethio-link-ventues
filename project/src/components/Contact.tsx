import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5 text-accent-yellow" />,
      title: 'Call Us',
      description: 'Talk to our team directly',
      action: {
        text: '+251 911 234 567',
        url: 'tel:+251911234567'
      }
    },
    {
      icon: <Mail className="h-5 w-5 text-accent-yellow" />,
      title: 'Email',
      description: 'Drop us a line anytime',
      action: {
        text: 'info@siduprovider.com',
        url: 'mailto:info@siduprovider.com'
      }
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent-yellow" />,
      title: 'Office',
      description: 'Visit our headquarters',
      action: {
        text: 'Bole Road, Addis Ababa',
        url: 'https://maps.google.com?q=Bole+Road+Addis+Ababa+Ethiopia'
      }
    }
  ];

  const socialMediaButtons = [
    {
      name: 'Telegram',
      color: 'blue',
      url: 'https://t.me/siduprovider',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M21.5 15.5a3 3 0 1 1-5.6 1.5 3 3 0 0 1 5.6-1.5"></path>
          <path d="M19.5 12.5v-7a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10"></path>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      color: 'green',
      url: 'https://wa.me/251911234567',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-4a1 1 0 0 0-1 1"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-10 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              d="M40,90 Q90,10 140,90 Q190,170 140,170 Q90,170 40,90 Z"
            />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            className="text-accent-yellow inline-block mb-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We're Here To Help
          </motion.h2>
          <motion.p
            className="text-charcoal-200"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have questions or need assistance with your import or export needs?
            Our team is ready to assist you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="bg-charcoal-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-charcoal-700 w-12 h-12 flex items-center justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-charcoal-300 mb-4">{method.description}</p>
              <a 
                href={method.action.url} 
                className="text-accent-yellow hover:underline"
                target={method.title === 'Office' ? '_blank' : undefined}
                rel={method.title === 'Office' ? 'noopener noreferrer' : undefined}
              >
                {method.action.text}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="flex-1 bg-charcoal-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <p className="text-charcoal-300 mb-6">
              We'll get back to you as soon as possible. You can also reach out through our messaging platforms:
            </p>
            <div className="flex flex-col space-y-3">
              {socialMediaButtons.map((btn, index) => (
                <motion.a 
                  key={index}
                  href={btn.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-${btn.color}-600/30 hover:bg-${btn.color}-600/50 text-white p-3 rounded-xl shadow-lg transition-all flex items-center justify-center`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={btn.name}
                >
                  {btn.icon}
                  <span>Send message on {btn.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 bg-charcoal-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Our Location</h3>
            <div className="h-64 rounded-lg overflow-hidden mb-4">
              <iframe
                title="SIDU Provider Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5474363461!2d38.79339591535177!3d9.005266091794284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%20Rd%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1652354245140!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-charcoal-300">
              Bole Road, Addis Ababa, Ethiopia<br />
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 2:00 PM<br />
              Sunday: Closed
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 