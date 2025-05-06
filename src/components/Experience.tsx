"use client";
import React, { useRef } from "react";
import { workExperience } from "@/data";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { useScroll, useTransform } from "framer-motion";

const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const { ref: cardRef, isActive } = useOptimizedAnimation(0.1, false, "0px 100px");
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: index * 0.1
      }}
      className="relative transform-gpu will-change-transform"
    >
      {/* Enhanced glow effect */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${isEven ? 'from-teal-500 to-blue-600' : 'from-blue-600 to-purple-600'} 
                   rounded-2xl blur opacity-20 group-hover:opacity-70 transition duration-700`}
      ></div>
      
      {/* Card content with enhanced styling */}
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-800 
                    rounded-2xl shadow-xl p-6 border border-white/10 dark:border-gray-700/50
                    hover:shadow-2xl transition-all duration-300 backdrop-filter backdrop-blur-sm">
        <div className="flex lg:flex-row flex-col lg:items-center gap-6">
          {/* Logo container with improved styling */}
          <div className="lg:w-32 w-20 h-20 lg:h-32 relative flex-shrink-0 
                         bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 
                         rounded-xl p-4 flex items-center justify-center
                         shadow-lg border border-white/20 dark:border-gray-700/50">
            <Image
              src={experience.thumbnail}
              alt={experience.title}
              width={128}
              height={128}
              className="w-full h-auto object-contain drop-shadow-md"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-xl"></div>
          </div>
          
          {/* Content section with improved typography */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                {experience.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {experience.duration || "2023 - Present"}
              </span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {experience.desc}
            </p>
            
            {/* Enhanced skills badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.skills ? (
                experience.skills.map((skill: string, i: number) => (
                  <span 
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium
                              ${i % 3 === 0 ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' :
                                i % 3 === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                                'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'}`}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                // Fallback skills if not provided in data
                <>
                  <span className="text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 px-3 py-1.5 rounded-full font-medium">
                    {isEven ? 'Frontend' : 'Design'}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1.5 rounded-full font-medium">
                    {isEven ? 'React' : 'UI/UX'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { ref, isActive } = useOptimizedAnimation(0.15);
  
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
      className="py-24 overflow-hidden relative"
      ref={containerRef}
    >
      <motion.div
        className="relative z-10"
        style={{ opacity }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" ref={ref}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
                PROFESSIONAL JOURNEY
              </h2>
              <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
            >
              Where I&apos;ve Worked
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              My professional experiences working with amazing teams and clients.
            </motion.p>
          </div>

          {/* Experience cards with staggered animations */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-10">
            {workExperience.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
