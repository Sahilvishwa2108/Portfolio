'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedNameText } from './ui/animated-name';

// Optimized particle count for performance
const PARTICLE_COUNT = 500;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate static positions once - no velocities needed for stable effect
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Create a more uniform sphere distribution
      const radius = 1.5 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1); // Uniform distribution on sphere
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Simple, smooth rotation only - no position updates for stability
    ref.current.rotation.x = time * 0.03;
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Secondary particle layer for depth
function ParticleFieldSecondary() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    
    for (let i = 0; i < 300; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    // Rotate in opposite direction for parallax effect
    ref.current.rotation.x = -time * 0.02;
    ref.current.rotation.y = -time * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Mobile-responsive typing text with fallback for small screens
function TypingText({ text, mobileText, delay = 0 }: { text: string; mobileText?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const displayText = isMobile && mobileText ? mobileText : text;

  // Hide cursor after typing animation completes
  useEffect(() => {
    if (isVisible) {
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, displayText.length * 50 + 500);
      
      return () => clearTimeout(cursorTimer);
    }
  }, [isVisible, displayText.length]);

  return (
    <span className="inline-flex items-center justify-center flex-wrap">
      <span 
        className={`overflow-hidden text-center ${isVisible ? 'typewriter-text' : 'opacity-0'} ${isMobile ? 'whitespace-normal' : 'whitespace-nowrap'}`}
        style={{
          '--char-count': displayText.length,
        } as React.CSSProperties}
      >
        {displayText}
      </span>
      {isVisible && showCursor && (
        <span className="typewriter-cursor ml-0.5 w-0.5 h-4 sm:h-6 bg-teal-400" />
      )}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'transparent' }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          gl={{ 
            antialias: false, // Disable for performance
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]} // Limit pixel ratio for performance
          frameloop="always"
        >
          <ParticleField />
          <ParticleFieldSecondary />
        </Canvas>
      </div>

      {/* Simplified background blurs - responsive sizing for mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-teal-500/15 rounded-full blur-2xl sm:blur-3xl will-change-transform" 
             style={{ animation: 'pulse-slow 4s ease-in-out infinite' }} />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/15 rounded-full blur-2xl sm:blur-3xl will-change-transform" 
             style={{ animation: 'pulse-slow 4s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/15 rounded-full blur-2xl sm:blur-3xl will-change-transform" 
             style={{ animation: 'pulse-slow 4s ease-in-out infinite 2s' }} />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-teal-400 font-medium shadow-lg hover:bg-white/10 transition-all duration-300">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          <span className="block text-white mb-2 sm:mb-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Hi, I&apos;m</span>
          <AnimatedNameText />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-10 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center px-2"
        >
          <TypingText 
            text="Full Stack Developer | AI Enthusiast | Problem Solver" 
            mobileText="Developer • AI • Problem Solver"
            delay={1500} 
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mb-8 sm:mb-12 px-4"
        >
          <Link href="#recent-projects" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base overflow-hidden btn-glow-effect"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              {/* Inner border glow */}
              <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="relative">
                  View My Work
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>

          <Link 
            href="https://github.com/Sahilvishwa2108/Resume/raw/master/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            download="Sahil_Vishwakarma_Resume.pdf"
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base overflow-hidden"
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-[1px] bg-gradient-to-r from-teal-500/50 via-blue-500/50 to-purple-500/50">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gray-900/90 backdrop-blur-xl" />
              </div>
              
              {/* Hover gradient fill */}
              <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl animate-border-spin bg-[conic-gradient(from_0deg,#14b8a6,#3b82f6,#8b5cf6,#14b8a6)] p-[1px]">
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gray-900/95" />
                </div>
              </div>
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" style={{ animationDuration: '1s' }} />
                <span className="relative">
                  Download Resume
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                </span>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-4 sm:gap-6 justify-center items-center"
        >
          {[
            { icon: Github, href: 'https://github.com/Sahilvishwa2108', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/sahilvishwakarma2108', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:sahilvishwakarma2108@gmail.com', label: 'Email' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="p-2.5 sm:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-teal-400 hover:border-teal-400/50 hover:bg-white/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator - hidden on very small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 hidden xs:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5 sm:gap-2 text-gray-400"
          >
            <span className="text-xs sm:text-sm">Scroll to explore</span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-1.5 sm:p-2">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
