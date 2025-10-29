"use client";
import React from "react";
import { workExperience } from "@/data";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

interface WorkExperienceItem {
  id: number;
  title: string;
  desc: string;
  className?: string;
  thumbnail: string;
  skills?: string[];
  duration?: string;
}

const ExperienceCard = ({ experience, index }: { experience: WorkExperienceItem; index: number }) => {
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
                   rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-700`}
      ></div>
      
      {/* Card content with glass morphism */}
      <div className="relative glass-morphism-strong rounded-2xl p-6 hover-lift">
        <div className="flex lg:flex-row flex-col lg:items-center gap-6">
          {/* Logo container */}
          <div className="lg:w-32 w-20 h-20 lg:h-32 relative flex-shrink-0 
                         glass-morphism rounded-2xl p-4 flex items-center justify-center
                         shadow-lg">
            <Image
              src={experience.thumbnail}
              alt={experience.title}
              width={128}
              height={128}
              unoptimized
              className="w-full h-auto object-contain drop-shadow-md"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-2xl"></div>
          </div>
          
          {/* Content section */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-bold gradient-text">
                {experience.title}
              </h3>
              <span className="text-sm text-gray-400 font-medium">
                {experience.duration || "2023 - Present"}
              </span>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {experience.desc}
            </p>
            
            {/* Enhanced skills badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.skills ? (
                experience.skills.map((skill: string, i: number) => (
                  <span 
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium glass-morphism
                              ${i % 3 === 0 ? 'text-teal-300 border border-teal-500/30' :
                                i % 3 === 1 ? 'text-blue-300 border border-blue-500/30' :
                                'text-purple-300 border border-purple-500/30'}`}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <>
                  <span className="text-xs glass-morphism text-teal-300 border border-teal-500/30 px-3 py-1.5 rounded-full font-medium">
                    {isEven ? 'Frontend' : 'Design'}
                  </span>
                  <span className="text-xs glass-morphism text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-full font-medium">
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

  return (
    <section 
      className="py-24 overflow-hidden relative section-bg"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" ref={ref}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <h2 className="text-xl md:text-2xl font-semibold gradient-text">
                PROFESSIONAL JOURNEY
              </h2>
              <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-2 rounded-full"></div>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mt-4 text-white"
            >
              Where I&apos;ve <span className="gradient-text">Worked</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg"
            >
              My professional experiences working with amazing teams and clients
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
      </div>
    </section>
  );
};

export { Experience };