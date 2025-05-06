"use client";
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiRedis,
  SiGit, SiDocker, SiGithub, SiFirebase, SiCloudflare,
  SiJavascript, SiHtml5, SiCss3, SiLinux,
  SiPrisma, SiPostman, SiAmazon, SiZod, SiAuth0,
  SiSocketdotio, SiCloudinary
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { LazyLoad } from '@/components/LazyLoad';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

// Updated skill data structure with more categories
const skillsData = {
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 80 },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 95 },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF", level: 75 },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 90 },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 85 },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 88 },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
    { name: "Express", icon: SiExpress, color: "#000000", level: 80 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70 },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 75 },
    { name: "Redis", icon: SiRedis, color: "#DC382D", level: 65 },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 70 },
    { name: "Java", icon: DiJava, color: "#007396", level: 80 },
    { name: "Socket.io", icon: SiSocketdotio, color: "#010101", level: 65 },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
    { name: "GitHub", icon: SiGithub, color: "#181717", level: 85 },
    { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
    { name: "Linux", icon: SiLinux, color: "#FCC624", level: 75 },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 80 },
    { name: "AWS", icon: SiAmazon, color: "#232F3E", level: 65 },
    { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5", level: 75 },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 80 },
  ],
  frameworks: [
    { name: "NextAuth", icon: SiAuth0, color: "#EB5424", level: 75 },
    { name: "Zod", icon: SiZod, color: "#3068B7", level: 70 },
    { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", level: 75 },
  ]
};

// Update categories for filtering
const categories = [
  { id: "all", name: "All Skills" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "tools", name: "DevOps & Tools" },
  { id: "frameworks", name: "Libraries & Frameworks" }
];

interface Skill {
  name: string;
  icon: React.ComponentType;
  color: string;
  level: number;
}

// Modern 3D-looking skill card with glass effect
const SkillCard = ({ skill, delay }: { skill: Skill; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isActive } = useOptimizedAnimation(0.1, true);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: isActive ? delay : 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div 
        className={`
          relative aspect-square flex flex-col items-center justify-center p-6
          rounded-2xl bg-white dark:bg-gray-800/90 backdrop-blur-sm
          border border-gray-100 dark:border-gray-700
          transition-all duration-300 overflow-hidden
          ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
          transform perspective-1200
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background gradient glow */}
        <div 
          className={`
            absolute -inset-px rounded-2xl
            bg-gradient-to-br opacity-50 group-hover:opacity-80
            blur-sm group-hover:blur-md transition-all duration-300
          `}
          style={{ background: `linear-gradient(45deg, ${skill.color}30, transparent)` }}
        />
        
        {/* Icon */}
        <div 
          className={`
            relative z-10 text-4xl md:text-5xl mb-4
            transform group-hover:scale-110 group-hover:rotate-3
            transition-all duration-300 ease-out
          `}
          style={{ color: skill.color }}
        >
          <skill.icon />
        </div>

        {/* Skill name */}
        <h3 className="relative z-10 font-bold text-lg md:text-xl text-center text-gray-800 dark:text-white mb-2">
          {skill.name}
        </h3>

        {/* Skill level indicator - only shows on hover */}
        <div className={`
          w-full max-w-[120px] h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden
          transition-all duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isHovered ? `${skill.level}%` : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: skill.color }}
          />
        </div>
        
        {/* Level indicator text - only shows on hover */}
        <span className={`
          text-xs font-medium mt-1 transition-all duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          {skill.level}%
        </span>
        
        {/* 3D floating decorative element */}
        <div 
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full 
            bg-gradient-to-br from-white/5 to-white/0 dark:from-gray-700/5 dark:to-gray-700/0
            transform group-hover:scale-150 group-hover:rotate-12
            transition-all duration-700 ease-out"
        />
      </div>
    </motion.div>
  );
};

// Main Technical Skills component
const TechnicalSkills = () => {
  const [category, setCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Get all skills or filter by category
  const getDisplayedSkills = () => {
    if (category === 'all') {
      return [
        ...skillsData.frontend,
        ...skillsData.backend,
        ...skillsData.tools,
        ...skillsData.frameworks
      ];
    }
    return skillsData[category as keyof typeof skillsData] || [];
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black -z-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
              TECH STACK
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
          >
            My Technical Skills
          </motion.h3>
        </div>

        {/* Category filter tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${category === cat.id
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }
              `}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <div ref={containerRef} className="relative">
          <LazyLoad>
            <AnimatePresence mode="sync">
              <motion.div
                key={category} // Force re-render when category changes
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
              >
                {getDisplayedSkills().map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    delay={0.1 + (index % 10) * 0.05} 
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </LazyLoad>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;