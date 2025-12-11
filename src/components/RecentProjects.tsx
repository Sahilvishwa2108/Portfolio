"use client";
import { useRef } from "react";
import { projects } from "@/data";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

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

// Project type definition
interface Project {
  id: string | number;
  title: string;
  des: string;
  img: string;
  link: string;
  github?: string;
  featured?: boolean;
  iconList: IconType[];
}

// Optimized 3D project card component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, isActive } = useOptimizedAnimation(0.2);
  
  // Combine refs
  const combinedRef = (node: HTMLDivElement) => {
    cardRef.current = node;
    if (typeof inViewRef === 'function') {
      inViewRef(node);
    }
  };
  
  // Only create springs when the card is in view
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });
  
  // Transform values for 3D rotation effect
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  
  // Handle mouse movement for 3D effect - only when active
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isActive && cardRef.current) {
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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      ref={combinedRef}
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl overflow-hidden flex flex-col h-full transform-gpu will-change-transform"
    >
      <div className="relative glass-morphism-strong shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 rounded-xl overflow-hidden flex flex-col h-full border border-white/10 hover-lift">
        {/* Project Image with Enhanced Overlay */}
        <div 
          className="relative h-64 overflow-hidden group"
          style={{ transform: "translateZ(20px)" }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-fill"
            priority={index < 3} // Only prioritize first 3 images
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
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
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
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
          <h3 className="text-xl font-bold mb-3 text-white">
            {project.title}
          </h3>
          
          {/* Description with better typography */}
          <p className="text-gray-400 mb-6 text-sm line-clamp-3 leading-relaxed">
            {project.des}
          </p>
          
          {/* Tech Stack with icons only and improved styling */}
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {project.iconList.map((Icon, i) => {
              return (
                <div 
                  key={i} 
                  className="flex items-center justify-center w-10 h-10 rounded-full glass-morphism shadow-lg hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300 hover:scale-110 border border-teal-500/20"
                  title={getTechNameFromIcon(Icon)}
                >
                  <Icon size={18} className="text-teal-400" />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Enhanced Footer with Link */}
        <Link 
          href={project.link} 
          target="_blank" 
          className="py-4 px-6 text-center text-sm font-medium bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 hover:from-teal-500/20 hover:via-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group flex items-center justify-center border-t border-white/5"
          style={{ transform: "translateZ(10px)" }}
        >
          <span className="gradient-text font-bold">
            View Project
          </span>
          <svg 
            className="ml-2 h-5 w-5 text-teal-400 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const RecentProjects = () => {
  const { ref, isActive } = useOptimizedAnimation(0.15, true);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-bg py-24 relative">
      {/* Subtle background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-teal-500/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 top-1/2 right-0 bg-blue-500/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 left-1/3 bg-purple-500/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div 
            variants={fadeInDown}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <h2 className="gradient-text text-xl md:text-2xl font-semibold">
              MY WORK
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>
          
          <motion.h3 
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold mt-3 text-white"
          >
            Recent Projects
          </motion.h3>
          
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto"
          >
            Explore my latest work built with modern technologies and best practices.
          </motion.p>
        </div>

        {/* Projects Grid with optimized rendering */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { RecentProjects };