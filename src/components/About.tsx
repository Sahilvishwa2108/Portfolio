"use client"
import React, { useRef, Suspense, useEffect, useState } from "react"; // Add useState and useEffect
import { motion, useScroll, useTransform } from "framer-motion"; // Add useScroll and useTransform
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Float } from "@react-three/drei";
import { Mesh } from 'three';
import Image from "next/image";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

const AboutSection = () => {
  // Use the optimized animation hook for better performance
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1);
  const { ref: contentRef, isActive: isContentActive } = useOptimizedAnimation(0.15, true);
  
  // Add these for scroll fade effect
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scrollYProgress to opacity - fade out as section leaves viewport
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  return (
    <section 
      id="about" 
      className="min-h-screen py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black -z-10"></div>
      
      {/* 3D Model Container with scroll opacity */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <div className="w-full h-[70vh] max-w-4xl mx-auto opacity-30">
          <Suspense fallback={null}>
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 40 }}
              dpr={[1, 2]} // Limit DPR for performance
              gl={{ antialias: true, powerPreference: 'high-performance' }} // Optimize rendering
              performance={{ min: 0.5 }} // Allow frame rate to drop during interaction
            >
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
              
              <Float
                speed={2} // Reduced speed for smoother animation
                rotationIntensity={0.8} // Reduced intensity
                floatIntensity={0.8} 
              >
                <Model />
              </Float>
              
              <Environment preset="city" />
            </Canvas>
          </Suspense>
        </div>
      </motion.div>

      {/* Content container with scroll opacity */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        {/* Section Header with consistent styling */}
        <div className="text-center mb-16" ref={sectionRef}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
              ABOUT ME
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
          >
            Who I Am
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Get to know my background, skills, and what drives me as a developer
          </motion.p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isContentActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-500 to-blue-600 p-1 shadow-xl transform transition-transform hover:scale-[1.02] duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-blue-600/30 backdrop-blur-sm"></div>
              <div className="profile-image-container">
                <Image 
                  src="/your-profile-image.jpg" // Replace with your image
                  alt="Sahil Vishwakarma"
                  width={500}
                  height={500}
                  priority
                  className="rounded-xl relative z-10 w-full object-cover"
                />
              </div>
              
              {/* Interactive shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-200 dark:bg-teal-900/30 rounded-full blur-2xl -z-10 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-2xl -z-10"></div>
            
            {/* Floating badges */}
            <motion.div 
              className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center w-10 h-10 text-lg text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                </svg>
              </span>
            </motion.div>
            
            <motion.div 
              className="absolute -left-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center w-10 h-10 text-lg text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Content with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isContentActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              Full Stack Developer & UI/UX Enthusiast
            </h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isContentActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300"
            >
              I&apos;m a passionate Full Stack Developer with expertise in creating modern web applications. 
              My journey in programming began with a curiosity about how websites work, and it has evolved 
              into a deep passion for building efficient, user-friendly digital experiences.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isContentActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-300"
            >
              I specialize in React, Next.js, and TypeScript for frontend development, while utilizing 
              Node.js and various databases for backend solutions. My approach combines technical precision 
              with creative problem-solving to build applications that are not just functional, but also 
              intuitive and engaging for users.
            </motion.p>

            <div className="pt-4">
              <motion.h4 
                initial={{ opacity: 0 }}
                animate={isContentActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg font-semibold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
              >
                What I bring to the table:
              </motion.h4>
              
              <ul className="space-y-2">
                {[
                  "Modern frontend development with React & Next.js",
                  "Responsive designs using Tailwind CSS",
                  "RESTful API development",
                  "Database design and management",
                  "Performance optimization",
                  "Clean, maintainable code"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isContentActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-start"
                  >
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center mr-3">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.1 }}
            >
              <a 
                href="#projects" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 hover:translate-y-[-2px]"
              >
                View My Work
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Optimized 3D Model Component
function Model() {
  const mesh = useRef<Mesh>(null);
  const group1 = useRef<Mesh>(null);
  const group2 = useRef<Mesh>(null);
  const group3 = useRef<Mesh>(null);
  
  // Optimized animation with reduced complexity
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (mesh.current) {
      // Smoother, more efficient rotation
      mesh.current.rotation.y = t * 0.1;
      mesh.current.position.y = Math.sin(t * 0.3) * 0.15;
    }
    
    if (group1.current) {
      group1.current.rotation.y = t * 0.5;
    }
    
    if (group2.current) {
      group2.current.rotation.x = t * 0.3;
    }
    
    if (group3.current) {
      group3.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group ref={mesh}>
      {/* Core cube with reduced complexity */}
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={2}>
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.2} />
      </RoundedBox>
      
      {/* Orbiting elements with reduced complexity */}
      <group ref={group1}>
        <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.1} position={[0, 0, 2]} smoothness={2}>
          <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      <group ref={group2}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} position={[2, 0, 0]} smoothness={2}>
          <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      <group ref={group3}>
        <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} position={[0, 2, 0]} smoothness={2}>
          <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      {/* Inner element with reduced complexity */}
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.2} position={[0, 0, 0]} smoothness={2}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} metalness={1} roughness={0} />
      </RoundedBox>
    </group>
  );
}

export default AboutSection;