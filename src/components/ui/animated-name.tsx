'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedNameProps {
  className?: string;
}

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// ============================================
// MOBILE VERSION - Modern Stacked Design
// ============================================
function MobileAnimatedName() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const firstName = "Sahil";
  const lastName = "Vishwakarma";

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Letter animation - elegant reveal
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Glow animation for mobile
  const glowAnimation = {
    animate: {
      textShadow: [
        '0 0 10px rgba(20, 184, 166, 0.4), 0 0 20px rgba(20, 184, 166, 0.2)',
        '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)',
        '0 0 10px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
        '0 0 10px rgba(20, 184, 166, 0.4), 0 0 20px rgba(20, 184, 166, 0.2)',
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Underline draw animation
  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 1.5,
      },
    },
  };

  return (
    <div className="relative w-full px-2">
      {/* Animated background glow for mobile */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </motion.div>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-1"
          >
            {/* First Name - Larger */}
            <div className="flex justify-center">
              {firstName.split('').map((letter, i) => (
                <motion.span
                  key={`mobile-first-${i}`}
                  variants={letterVariants}
                  className="inline-block text-4xl xs:text-5xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <motion.span animate={glowAnimation.animate}>
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </div>

            {/* Decorative line between names */}
            <motion.div
              className="flex items-center gap-2 my-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                className="h-[2px] w-8 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="h-[2px] w-8 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Last Name - Slightly smaller for balance */}
            <div className="flex justify-center flex-wrap">
              {lastName.split('').map((letter, i) => (
                <motion.span
                  key={`mobile-last-${i}`}
                  variants={letterVariants}
                  className="inline-block text-3xl xs:text-4xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #14b8a6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <motion.span animate={glowAnimation.animate}>
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </div>

            {/* Animated underline */}
            <motion.div
              variants={underlineVariants}
              className="h-[3px] w-3/4 mt-2 rounded-full origin-center overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, transparent, #14b8a6, #3b82f6, #8b5cf6, transparent)',
              }}
            >
              <motion.div
                className="h-full w-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 2,
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                }}
              />
            </motion.div>

            {/* Floating particles for mobile */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2 + i * 0.3,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// DESKTOP VERSION - Original Text Animation
// ============================================
function DesktopAnimatedName() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const firstName = "Sahil";
  const lastName = "Vishwakarma";
  
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const strokeVariants = {
    hidden: {
      strokeDashoffset: 100,
      strokeDasharray: "0 100",
    },
    visible: (i: number) => ({
      strokeDashoffset: 0,
      strokeDasharray: "100 0",
      transition: {
        duration: 1.5,
        delay: i * 0.12,
        ease: "easeInOut",
      },
    }),
  };

  const glowPulse = {
    animate: {
      textShadow: [
        "0 0 20px rgba(20, 184, 166, 0.5)",
        "0 0 40px rgba(59, 130, 246, 0.7)",
        "0 0 20px rgba(139, 92, 246, 0.5)",
        "0 0 40px rgba(20, 184, 166, 0.7)",
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      <motion.div 
        className="flex flex-wrap justify-center items-center gap-x-6"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* First name */}
        <div className="flex">
          {firstName.split('').map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              custom={i}
              variants={letterVariants}
              className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundSize: '200% 100%',
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <motion.span
                animate={glowPulse.animate}
                className="relative"
              >
                {letter}
                {/* Stroke effect overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ overflow: 'visible' }}
                >
                  <motion.text
                    x="50%"
                    y="80%"
                    textAnchor="middle"
                    className="text-6xl md:text-7xl lg:text-8xl font-bold"
                    fill="none"
                    stroke="url(#strokeGradient)"
                    strokeWidth="1"
                    custom={i}
                    variants={strokeVariants}
                  >
                    {letter}
                  </motion.text>
                </svg>
              </motion.span>
            </motion.span>
          ))}
        </div>

        {/* Last name */}
        <div className="flex">
          {lastName.split('').map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              custom={i + firstName.length}
              variants={letterVariants}
              className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundSize: '200% 100%',
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <motion.span animate={glowPulse.animate}>
                {letter}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Animated underline */}
      <motion.div
        className="h-1 mt-2 mx-auto rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={isLoaded ? { width: '100%' } : { width: 0 }}
        transition={{
          duration: 1.5,
          delay: (firstName.length + lastName.length) * 0.12 + 0.3,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        <motion.div
          className="h-full w-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)',
          }}
        />
      </motion.div>

      {/* SVG definitions for gradients */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ============================================
// MAIN EXPORT - Responsive Component
// ============================================
export function AnimatedNameText({ className = '' }: AnimatedNameProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
          Sahil Vishwakarma
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isMobile ? <MobileAnimatedName /> : <DesktopAnimatedName />}
    </div>
  );
}

// Keep legacy exports for backward compatibility
export function AnimatedName({ className = '' }: AnimatedNameProps) {
  return <AnimatedNameText className={className} />;
}

export function SignatureAnimation({ className = '' }: AnimatedNameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Signature-style path that looks like handwriting
  const signaturePath = `
    M 20 60 
    C 25 30 45 25 50 45 
    C 55 65 35 75 30 55 
    Q 28 45 40 40 
    L 55 70 
    M 60 35 L 60 70 
    Q 60 45 85 40 
    L 85 70 
    M 95 70 L 95 35 
    M 95 50 Q 95 70 120 55 
    L 120 35 L 120 70 
    M 130 20 L 130 70
    
    M 160 70 L 175 25 L 190 70
    M 200 50 Q 200 35 215 35 
    Q 230 35 230 50 
    Q 230 65 215 65 
    Q 200 65 200 50
    M 200 50 L 200 70
    M 240 50 L 240 70 
    Q 240 45 265 40 
    L 265 70
    M 275 20 L 275 70 
    M 275 50 Q 275 35 300 40 
    L 300 70
    M 310 35 
    Q 310 70 340 55 
    M 320 50 L 345 50
    M 355 50 Q 355 35 375 35 
    Q 395 35 395 50 
    Q 395 65 375 65 
    Q 355 65 355 50
    M 395 50 L 395 70
    M 405 70 L 405 50 
    Q 405 35 425 40 
    L 425 70
    M 435 50 Q 435 35 450 35 
    L 455 35 
    M 435 50 Q 435 65 455 70 
    L 460 70
    M 470 50 L 470 35 
    Q 470 70 495 55 
    L 495 35 L 495 70
    M 505 50 Q 505 35 520 35 
    Q 535 35 535 50 
    Q 535 65 520 65 
    Q 505 65 505 50
    M 535 50 L 535 70
  `;

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 560 100"
        className="w-full max-w-4xl mx-auto"
        style={{ overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6">
              <animate
                attributeName="stop-color"
                values="#14b8a6;#3b82f6;#8b5cf6;#14b8a6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#3b82f6">
              <animate
                attributeName="stop-color"
                values="#3b82f6;#8b5cf6;#14b8a6;#3b82f6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6">
              <animate
                attributeName="stop-color"
                values="#8b5cf6;#14b8a6;#3b82f6;#8b5cf6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <filter id="signatureGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow path */}
        <motion.path
          d={signaturePath}
          fill="none"
          stroke="url(#signatureGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#signatureGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isLoaded ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Main signature path */}
        <motion.path
          d={signaturePath}
          fill="none"
          stroke="url(#signatureGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#signatureGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isLoaded ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.1 }}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(20, 184, 166, 0.8))',
          }}
        />

        {/* Animated pen tip/spark following the path */}
        <motion.circle
          r="4"
          fill="white"
          filter="url(#signatureGlow)"
          initial={{ opacity: 0 }}
          animate={isLoaded ? {
            opacity: [0, 1, 1, 0],
            offsetDistance: ['0%', '100%'],
          } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{
            offsetPath: `path("${signaturePath}")`,
            offsetRotate: '0deg',
          }}
        />
      </svg>
    </div>
  );
}
