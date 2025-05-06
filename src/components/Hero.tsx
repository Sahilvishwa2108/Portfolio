"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { LetterPullup } from "./ui/letter-pullup"; // Import the LetterPullup component

// Dynamic import of the HeroScene component
const DynamicScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    )
  }
);

const Hero = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation states
  const [showGreeting, setShowGreeting] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  
  // Parallax effect for content
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse position tracking
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  const handleMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  const rotateText = (e: React.MouseEvent) => {
    const greeting = document.querySelector('.hero-text-3d');
    const name = document.querySelector('.hero-name-3d');
    
    if (greeting && name) {
      // Calculate rotation values based on mouse position
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      
      // Apply rotation to text elements
      greeting.setAttribute('style', `transform: perspective(500px) rotateX(${y * 0.5 + 8}deg) rotateY(${x * 0.3}deg);`);
      name.setAttribute('style', `transform: perspective(800px) rotateX(${y * 0.3 + 5}deg) rotateY(${x * 0.2}deg);`);
    }
  };

  // Trigger animations sequentially
  useEffect(() => {
    const timeoutGreeting = setTimeout(() => setShowGreeting(true), 500);
    const timeoutLine1 = setTimeout(() => setShowLine1(true), 700);
    const timeoutIntro = setTimeout(() => setShowIntro(true), 1200);
    const timeoutName = setTimeout(() => setShowName(true), 1900);
    const timeoutLine2 = setTimeout(() => setShowLine2(true), 2100);
    const timeoutCTA = setTimeout(() => setShowCTA(true), 2700);
    // Make sure this runs reliably with a shorter timeout
    const loadedTimeout = setTimeout(() => setIsLoaded(true), 800);

    return () => {
      clearTimeout(timeoutGreeting);
      clearTimeout(timeoutLine1);
      clearTimeout(timeoutIntro);
      clearTimeout(timeoutName);
      clearTimeout(timeoutLine2);
      clearTimeout(timeoutCTA);
      clearTimeout(loadedTimeout);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={(e) => {
        handleMouseMove(e);
        rotateText(e);
      }}
      ref={containerRef}
    >
      {/* 3D Background with dynamic loading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 pointer-events-none">
        <DynamicScene showGreeting={showGreeting} showName={showName} />
      </div>

      {/* Text content overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl w-full flex flex-col items-center">
          {/* Animated text with 3D effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            {/* Line 1: "Hey, I'm" */}
            <motion.div 
              className="overflow-hidden mb-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {showLine1 && (
                <h2 className="text-xl md:text-2xl text-teal-400 font-medium hero-text-3d">
                  <LetterPullup 
                    words="Hey, I'm" 
                    delay={0.05}
                    className="text-shadow-glow" 
                  />
                </h2>
              )}
            </motion.div>
            
            {/* Line 2: "Sahil Vishwakarma" with enhanced 3D effect */}
            <motion.div 
              className="overflow-hidden mt-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              {showLine2 && (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center hero-name-3d">
                  <LetterPullup 
                    words="Sahil Vishwakarma" 
                    delay={0.04}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-300 to-cyan-300 drop-shadow-[0_5px_5px_rgba(20,184,166,0.3)]" 
                  />
                </h1>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* BUTTONS - Properly positioned */}
      <div className="relative top-[77%] left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center items-center z-[9999] pointer-events-auto">
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

      {/* STANDALONE SCROLL INDICATOR - Completely independent positioning */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 justify-center items-center z-[9999] pointer-events-auto">
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

// GlowingButton component with hover effect
interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: React.ReactNode | string | undefined;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, className, ...props }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
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