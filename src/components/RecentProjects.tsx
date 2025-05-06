"use client";
import { useEffect, useState, useRef } from "react";
import { projects } from "@/data";
import { motion, useAnimation, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

// Create a mapping of icon components to their display names
const iconToTechName: Record<string, string> = {
  "SiNextdotjs": "Next.js",
  "SiReact": "React",
  "SiTailwindcss": "Tailwind CSS",
  "SiTypescript": "TypeScript",
  "SiJavascript": "JavaScript",
  "SiNodedotjs": "Node.js",
  "SiMongodb": "MongoDB",
  "SiExpress": "Express",
  "SiVercel": "Vercel",
  "SiHtml5": "HTML",
  "SiCss3": "CSS",
  "SiCloudinary": "Cloudinary",
  "SiFirebase": "Firebase",
  "SiAppwrite": "Appwrite",
  "SiDocker": "Docker"
};

// Use this function to get tech name from icon component
const getTechNameFromIcon = (Icon: IconType): string => {
  // Extract name from function as string
  const iconString = Icon.toString();
  
  // Try to match React Icon naming pattern (Si + name)
  const match = iconString.match(/Si([A-Za-z]+)/);
  const extractedName = match ? match[0] : "";
  
  // Return mapped name or fallback
  return iconToTechName[extractedName] || extractedName || "Tech";
};

// Technology categories for filtering
const allCategories = [
  "All",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Node.js"
];

// Project type definition
interface Project {
  id: string | number;
  title: string;
  des: string;
  img: string;
  link: string;
  github?: string;
  featured?: boolean;
  iconList: IconType[]; // Change from iconLists to iconList
}

// Enhanced 3D project card component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });
  
  // Transform values for 3D rotation effect
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      mouseX.set(posX);
      mouseY.set(posY);
    }
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -10 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl overflow-hidden flex flex-col h-full transform-gpu will-change-transform"
    >
      {/* 3D Card with improved depth effect */}
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-900 shadow-xl transition-all duration-500 hover:shadow-2xl rounded-xl overflow-hidden flex flex-col h-full border border-white/20 dark:border-gray-700/30 backdrop-filter backdrop-blur-md">
        {/* Project Image with Enhanced Overlay */}
        <div 
          className="relative h-64 overflow-hidden group"
          style={{ transform: "translateZ(20px)" }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-fill transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-105"
          />
          
          {/* Improved gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="flex space-x-4 transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {project.github && (
                <Link href={project.github} target="_blank" className="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <Github className="h-5 w-5" />
                </Link>
              )}
              <Link href={project.link} target="_blank" className="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white hover:text-white transition-colors hover:scale-110 transform duration-200">
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Enhanced featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20 animate-pulse">
              Featured
            </div>
          )}
        </div>
        
        {/* Enhanced content with depth effect */}
        <div 
          className="p-7 flex-1 flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Title with improved styling */}
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {project.title}
          </h3>
          
          {/* Description with better typography */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm line-clamp-3 leading-relaxed">
            {project.des}
          </p>
          
          {/* Tech Stack with icons only and improved styling */}
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {project.iconList.map((Icon, i) => {
              return (
                <div 
                  key={i} 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white/80 to-white/30 dark:from-gray-700/80 dark:to-gray-800/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                  title={getTechNameFromIcon(Icon)}
                >
                  <Icon size={18} className="text-gray-700 dark:text-gray-200" />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Enhanced Footer with Link */}
        <Link 
          href={project.link} 
          target="_blank" 
          className="py-4 px-6 text-center text-sm font-medium bg-gradient-to-r from-teal-500/10 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/40 text-teal-600 dark:text-teal-300 transition-all duration-300 group flex items-center justify-center"
          style={{ transform: "translateZ(10px)" }}
        >
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-bold">
            View Project
          </span>
          <motion.svg 
            className="ml-2 h-5 w-5 text-teal-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 1.5, 
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </motion.svg>
        </Link>
      </div>
    </motion.div>
  );
};

const RecentProjects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => {
        // Check if any of the icons match the filter
        return project.iconList.some(Icon => {
          const techName = getTechNameFromIcon(Icon);
          return techName === activeFilter;
        });
      });
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);

  return (
    <section ref={ref} id="projects" className="projects-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-base text-teal-600 font-semibold tracking-wide uppercase"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
          >
            MY WORK
          </motion.h2>
          <motion.h3
            className="text-3xl md:text-4xl font-bold mt-2 dark:text-white text-black"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ delay: 0.1 }}
          >
            Recent Projects
          </motion.h3>
          <motion.p
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ delay: 0.2 }}
          >
            Explore my latest work built with modern technologies and best practices.
          </motion.p>
          
          {/* Enhanced Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mt-8"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ delay: 0.3 }}
          >
            {allCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeFilter === category
                    ? "text-white"
                    : "bg-white dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 z-0"
                    layoutId="activeFilterBackground"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid with 3D cards */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
            style={{ perspective: "1000px" }}
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show message when no projects match filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No projects found matching this filter.
            </p>
            <button 
              onClick={() => setActiveFilter("All")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentProjects;