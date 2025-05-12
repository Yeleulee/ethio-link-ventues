import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon, Globe, PackageOpen, Play, Pause } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

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

  // Pexels video URL - forklift cargo container video
  const videoUrl = "https://player.vimeo.com/progressive_redirect/playback/679527663/rendition/720p/file.mp4?loc=external&oauth2_token_id=57447761&signature=bc2a03cb0dec03c5812a7e2b9a78beeb1b7d2d7c0e5bac9121b7c968c5ed05cd";

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-sand-50 to-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 md:right-40 opacity-10">
          <div className="h-[600px] w-[600px] rounded-full bg-accent-green blur-3xl"></div>
        </div>
        <div className="absolute bottom-1/4 left-10 md:left-40 opacity-5">
          <div className="h-[400px] w-[400px] rounded-full bg-accent-yellow blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-900 mb-4 md:mb-6 leading-tight"
            variants={itemVariants}
          >
            Connecting Global Trade <br className="hidden md:block" />
            <span className="text-accent-green">Through Ethiopia</span>
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
              className="px-8 py-3 rounded-full bg-accent-green text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.button>
            <motion.button 
              className="px-8 py-3 rounded-full border border-charcoal-300 text-charcoal-800 font-medium"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#a32929"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-2xl mx-auto md:w-4/5 aspect-[16/9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              poster="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 to-transparent"></div>
            
            {/* Play/Pause Button */}
            <motion.button
              className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
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
          </motion.div>

          {/* Floating Icons */}
          <motion.div 
            className="absolute -top-16 left-10 md:left-0 text-accent-yellow opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <Globe className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>

          <motion.div 
            className="absolute -bottom-8 left-1/4 text-accent-green opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <TruckIcon className="w-10 h-10 md:w-14 md:h-14" />
          </motion.div>

          <motion.div 
            className="absolute -top-10 right-10 md:right-0 text-accent-red opacity-75"
            variants={floatingIconVariants}
            initial="hidden"
            animate="visible"
            whileInView={floatAnimation}
          >
            <PackageOpen className="w-10 h-10 md:w-12 md:h-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};