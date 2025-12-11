'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedNameProps {
  className?: string;
}

export function AnimatedName({ className = '' }: AnimatedNameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth initial animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SVG path for "Sahil Vishwakarma" in elegant cursive style
  // Each path represents a letter with stroke animation
  const namePathData = {
    // "Sahil" - First name paths
    S: "M35 25 C20 25 15 35 15 45 C15 55 25 60 35 60 C45 60 55 55 55 45",
    a1: "M70 40 C65 40 60 45 60 55 C60 65 65 70 75 70 C85 70 90 65 90 55 L90 40 L90 70",
    h: "M105 20 L105 70 M105 45 C105 40 115 35 125 40 L125 70",
    i1: "M140 40 L140 70 M140 28 L140 30",
    l1: "M155 20 L155 70",
    
    // "Vishwakarma" - Last name paths
    V: "M195 25 L215 70 L235 25",
    i2: "M250 40 L250 70 M250 28 L250 30",
    s: "M275 45 C265 45 265 52 275 55 C285 58 285 65 275 65",
    h2: "M300 20 L300 70 M300 45 C300 40 310 35 320 40 L320 70",
    w: "M340 40 L350 70 L360 50 L370 70 L380 40",
    a2: "M400 40 C395 40 390 45 390 55 C390 65 395 70 405 70 C415 70 420 65 420 55 L420 40 L420 70",
    k: "M435 20 L435 70 M460 40 L435 55 L465 70",
    a3: "M480 40 C475 40 470 45 470 55 C470 65 475 70 485 70 C495 70 500 65 500 55 L500 40 L500 70",
    r: "M515 40 L515 70 M515 50 C515 42 525 38 535 42",
    m: "M550 40 L550 70 M550 50 C550 42 558 38 565 45 L565 70 M565 50 C565 42 573 38 580 45 L580 70",
    a4: "M600 40 C595 40 590 45 590 55 C590 65 595 70 605 70 C615 70 620 65 620 55 L620 40 L620 70",
  };

  // Animation variants for path drawing
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.8,
          delay: delay,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.2,
          delay: delay,
        },
      },
    }),
  };

  // Glow effect animation
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.5],
      transition: {
        duration: 2,
        delay: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const letters = Object.entries(namePathData);
  const totalDuration = letters.length * 0.15;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 640 90"
        className="w-full h-auto max-w-4xl mx-auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        {/* Gradient definitions */}
        <defs>
          {/* Main gradient for text */}
          <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          {/* Animated gradient */}
          <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for hover */}
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow layer */}
        {isLoaded && (
          <motion.g
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            filter="url(#strongGlow)"
          >
            {letters.map(([key, path], index) => (
              <motion.path
                key={`glow-${key}`}
                d={path}
                fill="none"
                stroke="url(#nameGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{
                  pathLength: { duration: 0.5, delay: index * 0.15 },
                  opacity: { duration: 0.3, delay: index * 0.15 + totalDuration },
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Main text paths */}
        <g filter="url(#glow)">
          {letters.map(([key, path], index) => (
            <motion.path
              key={key}
              d={path}
              fill="none"
              stroke="url(#animatedGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={index * 0.15}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.5))',
              }}
            />
          ))}
        </g>

        {/* Sparkle effects */}
        {isLoaded && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`sparkle-${i}`}
                r="2"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  cx: [100 + i * 120, 100 + i * 120 + 20, 100 + i * 120],
                  cy: [30 + (i % 2) * 30, 40 + (i % 2) * 20, 30 + (i % 2) * 30],
                }}
                transition={{
                  duration: 2,
                  delay: totalDuration + 0.5 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Underline animation */}
      <motion.div
        className="h-1 mx-auto rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
        initial={{ width: 0, opacity: 0 }}
        animate={isLoaded ? { width: '80%', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{
          duration: 1,
          delay: totalDuration + 0.5,
          ease: "easeOut",
        }}
        style={{
          boxShadow: '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        }}
      />
    </div>
  );
}

// Alternative: Text-based SVG animation with actual font rendering
export function AnimatedNameText({ className = '' }: AnimatedNameProps) {
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
        delay: i * 0.15,
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
        delay: i * 0.15,
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
    <div className={`relative ${className}`}>
      <motion.div 
        className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6"
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
              className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
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
              className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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
          delay: (firstName.length + lastName.length) * 0.08 + 0.3,
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

// Signature-style SVG drawing animation
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
