"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamic import with reduced initial loading priority
const DynamicScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    ),
    // Lower priority to speed up initial page load
    loading: () => null
  }
);

const Hero = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation states with delayed initialization
  const [showGreeting, setShowGreeting] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [scene3DLoaded, setScene3DLoaded] = useState(false);
  
  // Parallax effect for content
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse position tracking
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  // Trigger animations sequentially with improved timing for perceived performance
  useEffect(() => {
    // Start loading the 3D scene in background
    const scene3DTimeout = setTimeout(() => setScene3DLoaded(true), 100);
    
    // Start animations in sequence, but don't wait for 3D scene
    const timeoutGreeting = setTimeout(() => setShowGreeting(true), 300);
    const timeoutIntro = setTimeout(() => setShowIntro(true), 800);
    const timeoutName = setTimeout(() => setShowName(true), 1300);
    const timeoutCTA = setTimeout(() => setShowCTA(true), 1800);
    
    // Mark as loaded when animations are done
    const loadedTimeout = setTimeout(() => setIsLoaded(true), 2000);

    return () => {
      clearTimeout(scene3DTimeout);
      clearTimeout(timeoutGreeting);
      clearTimeout(timeoutIntro);
      clearTimeout(timeoutName);
      clearTimeout(timeoutCTA);
      clearTimeout(loadedTimeout);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={(e) => {
        if (!isMobile) {
          handleMouseMove(e);
        }
      }}
      ref={containerRef}
    >
      {/* Gradient background shown immediately */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 pointer-events-none">
        {/* Only render 3D scene when ready to avoid initial load jank */}
        {scene3DLoaded && (
          <DynamicScene showGreeting={showGreeting} showName={showName} />
        )}
      </div>

      {/* Initial content placeholder with nice gradient */}
      {!scene3DLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Loading...
            </h1>
          </div>
        </div>
      )}

      {/* Content layout - kept simple until animations trigger */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40"
        style={{ y, opacity }}
      >
        {/* Content handled by AnimatedText in HeroScene.tsx */}
      </motion.div>
      
      {/* Buttons with simplified animation */}
      <div className={`absolute ${isMobile ? 'bottom-28' : 'top-[77%]'} left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 justify-center items-center z-[9999] pointer-events-auto`}>
        <AnimatePresence>
          {showCTA && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href="https://drive.google.com/file/d/1XBDUNiAFqqSSmTG0vVb4het3jOX01-Ss/view?usp=sharing" target="_blank">
                  <GlowingButton className="bg-black border-neutral-600 text-white">
                    <BlurIn word="Resume" />
                  </GlowingButton>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="mailto:sahilvishwa2108@gmail.com">
                  <GlowingButton className="bg-white text-black border-black">
                    <BlurIn word="Hire Me" />
                  </GlowingButton>
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 justify-center items-center z-[9999] pointer-events-auto ${isMobile ? 'bottom-4' : 'bottom-8'}`}>
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <span className="text-gray-300 text-sm mb-2 font-medium">
                <motion.span
                  initial={{ filter: "blur(4px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-block"
                >
                  Scroll Down
                </motion.span>
              </span>
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "loop"
                }}
                className="p-1 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20"
              >
                <svg 
                  className="w-6 h-6 text-teal-400" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// GlowingButton component with hover effect - improving touch feedback
interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: React.ReactNode | string | undefined;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, className, ...props }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 active:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      <button 
        className={`relative px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center font-semibold ${className || ''}`} 
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

// Text animation component
interface BlurInProps {
  word: string;
}

const BlurIn: React.FC<BlurInProps> = ({ word }) => {
  return (
    <span className="inline-block overflow-hidden font-medium">
      <motion.span
        initial={{ filter: "blur(8px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  );
};

export default Hero;