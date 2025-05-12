import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon, Globe, PackageOpen, Play, Pause } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [useVideoFallback, setUseVideoFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Function to handle scrolling to sections
  const scrollToSection = (id: string) => {
    console.log(`Attempting to scroll to section with id: ${id}`);
    
    if (isHomePage) {
      // If already on home page, scroll to section
      const element = document.getElementById(id);
      if (element) {
        console.log(`Found element with id ${id}, scrolling to it`);
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Element with id ${id} not found in the document`);
      }
    } else {
      // If on another page, navigate to home with hash
      console.log(`Not on home page, navigating to /#${id}`);
      navigate(`/#${id}`);
    }
  };

  useEffect(() => {
    if (videoRef.current && !useVideoFallback) {
      // Try to play the video directly first
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing video directly:", error);
          // If direct playing fails, switch to fallback approach
          setUseVideoFallback(true);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && !useVideoFallback) {
      if (isPlaying) {
        // Force video to play when the isPlaying state is true
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Playback started successfully
            console.log("Video playback started");
          }).catch(error => {
            // Auto-play was prevented
            console.error("Error playing video:", error);
            setIsPlaying(false);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, useVideoFallback]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingIconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // Updated video URL with more reliable source
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-cargo-containers-port-crane-aerial-view-39777-large.mp4";

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-sand-50 to-white overflow-hidden"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 md:right-40 opacity-10">
          <div className="h-[600px] w-[600px] rounded-full bg-accent-green blur-3xl"></div>
        </div>
        <div className="absolute bottom-1/4 left-10 md:left-40 opacity-5">
          <div className="h-[400px] w-[400px] rounded-full bg-accent-yellow blur-3xl"></div>
        </div>
        {/* Add some geometric shapes */}
        <div className="absolute top-1/3 left-1/4 opacity-5 rotate-12">
          <div className="h-32 w-32 bg-blue-400 rounded-lg blur-xl"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 opacity-5 -rotate-12">
          <div className="h-24 w-48 bg-purple-400 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="px-4 py-1.5 bg-accent-green/10 text-accent-green rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Trusted Service Provider in Ethiopia
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-900 mb-4 md:mb-6 leading-tight"
            variants={itemVariants}
          >
            Connecting Global Trade <br className="hidden md:block" />
            <span className="text-accent-green relative">
              Through Ethiopia
              <svg className="absolute inset-x-0 -bottom-1 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,5 Q40,0 80,5 T160,5 T240,5" fill="none" stroke="#2D9D78" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-charcoal-700 max-w-3xl mb-8 md:mb-10"
            variants={itemVariants}
          >
            Your trusted partner in sourcing and customs clearance. We bridge the gap between international suppliers and local businesses, streamlining your import process from start to finish.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.button 
              className="px-8 py-3.5 rounded-full bg-accent-green text-white font-medium shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(45, 157, 120, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </motion.button>
            <motion.button 
              className="px-8 py-3.5 rounded-full border border-charcoal-300 text-charcoal-800 font-medium hover:bg-charcoal-100 transition-colors group"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#2D9D78"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              <span className="group-hover:text-accent-green transition-colors">Contact Us</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto md:w-4/5 aspect-[16/9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Glass overlay for modern look */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10"></div>
            
            {useVideoFallback ? (
              <iframe 
                src="/video-fallback.html" 
                className="w-full h-full border-0"
                allow="autoplay"
                title="Logistics video"
              ></iframe>
            ) : (
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                poster="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              >
                <source src={videoUrl} type="video/mp4" />
                <source src="https://mixkit.co/wp-content/uploads/2021/04/mixkit-cargo-containers-port-crane-aerial-view-39777-large.mp4" type="video/mp4" />
                <source src="/logistics-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            {/* Play/Pause Button with glass effect */}
            <motion.button
              className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors duration-300 z-20"
              onClick={togglePlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </motion.button>
            
            {/* Content badge */}
            <motion.div 
              className="absolute left-4 bottom-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium z-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span>Logistics & Business Services</span>
            </motion.div>
          </motion.div>

          {/* Floating Icons with improved animations */}
          <motion.div 
            className="absolute -top-16 left-10 md:left-0 text-accent-yellow opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <div className="p-3 bg-yellow-100 rounded-full shadow-lg">
              <Globe className="w-12 h-12 md:w-16 md:h-16" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute -bottom-8 left-1/4 text-accent-green opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <div className="p-3 bg-green-100 rounded-full shadow-lg">
              <TruckIcon className="w-10 h-10 md:w-14 md:h-14" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute -top-10 right-10 md:right-0 text-accent-red opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <div className="p-3 bg-red-100 rounded-full shadow-lg">
              <PackageOpen className="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </motion.div>
          
          {/* Stats cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-accent-green">500+</p>
              <p className="text-sm text-charcoal-700">Successful Deliveries</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-accent-green">95%</p>
              <p className="text-sm text-charcoal-700">Customer Satisfaction</p>
            </div>
            <div className="hidden md:block bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <p className="text-4xl font-bold text-accent-green">24/7</p>
              <p className="text-sm text-charcoal-700">Customer Support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};