"use client";
import { useEffect, useState, useRef } from "react";
import { projects } from "@/data";
import { motion, useAnimation, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

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
  iconLists: string[];
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
  
  // Extract technology name from icon path
  const getTechName = (icon: string) => {
    const tech = icon.replace("/", "").replace(".svg", "");
    return tech === "re" ? "React" : 
           tech === "next" ? "Next.js" :
           tech === "tail" ? "Tailwind CSS" :
           tech === "ts" ? "TypeScript" :
           tech === "js" ? "JavaScript" :
           tech === "c" ? "Cloudinary" :
           tech === "three" ? "Three.js" :
           tech === "fm" ? "Framer Motion" :
           tech === "html" ? "HTML" :
           tech === "css" ? "CSS" :
           tech === "vercel" ? "Vercel" : tech;
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
      {/* 3D Card with depth effect */}
      <div className="relative bg-white dark:bg-gray-800/90 shadow-xl transition-shadow hover:shadow-2xl rounded-xl overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700/50">
        {/* Project Image with Overlay */}
        <div 
          className="relative h-56 overflow-hidden group"
          style={{ transform: "translateZ(20px)" }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
            <div className="flex space-x-3 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {project.github && (
                <Link href={project.github} target="_blank" className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
              )}
              <Link href={project.link} target="_blank" className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Featured badge - conditionally shown */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium rounded shadow-lg">
              Featured
            </div>
          )}
        </div>
        
        {/* Content with depth effect */}
        <div 
          className="p-6 flex-1 flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm line-clamp-3">
            {project.des}
          </p>
          
          {/* Tech Stack with enhanced styling */}
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {project.iconLists.map((icon, i) => {
              const techName = getTechName(icon);
              
              return (
                <div 
                  key={i} 
                  className="flex items-center rounded-full px-3 py-1 text-xs"
                  style={{
                    background: "rgba(var(--card-rgb), 0.1)",
                    borderBottom: "1px solid rgba(var(--card-border-rgb), 0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <Image 
                    src={icon} 
                    alt={techName} 
                    width={14} 
                    height={14} 
                    className="mr-1" 
                  />
                  <span className="text-gray-600 dark:text-gray-300">{techName}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer with Link - elevated with 3D effect */}
        <Link 
          href={project.link} 
          target="_blank" 
          className="py-4 px-6 text-center text-sm font-medium bg-gradient-to-r from-teal-500/10 to-blue-500/10 hover:from-teal-500/20 hover:to-blue-500/20 text-teal-600 dark:text-teal-400 transition-colors group flex items-center justify-center"
          style={{ transform: "translateZ(10px)" }}
        >
          View Project
          <motion.svg 
            className="ml-2 h-4 w-4" 
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
        const techStack = project.iconLists.map(icon => {
          // Extract technology name from icon path
          const tech = icon.replace("/", "").replace(".svg", "");
          return tech === "re" ? "React" : 
                 tech === "next" ? "Next.js" :
                 tech === "tail" ? "Tailwind CSS" :
                 tech === "ts" ? "TypeScript" :
                 tech === "js" ? "JavaScript" :
                 tech === "c" ? "Cloudinary" :
                 tech === "three" ? "Three.js" :
                 tech === "fm" ? "Framer Motion" :
                 tech === "html" ? "HTML" :
                 tech === "css" ? "CSS" :
                 tech === "vercel" ? "Vercel" : tech;
        });
        
        return techStack.includes(activeFilter);
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 z-[-1]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid with 3D cards */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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