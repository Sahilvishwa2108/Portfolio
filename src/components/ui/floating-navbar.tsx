"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Home, User, Code, Clock, Grid, Send, Github, Menu, X,
  CircleDashed, CircleCheck
} from "lucide-react";

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}

// Mapping for Lucide icons to replace 3D particles
const getEnhancedIcon = (iconName: string, isActive: boolean) => {
  const iconSize = "h-5 w-5";
  const activeColor = "text-teal-400";
  const inactiveColor = "text-gray-300";
  const iconColor = isActive ? activeColor : inactiveColor;
  
  // Match icon based on link name
  switch(iconName) {
    case "#hero":
      return isActive ? <Home className={`${iconSize} ${iconColor}`} /> : <Home className={`${iconSize} ${iconColor}`} />;
    case "#about":
      return isActive ? <User className={`${iconSize} ${iconColor}`} /> : <User className={`${iconSize} ${iconColor}`} />;
    case "#skills":
      return isActive ? <Code className={`${iconSize} ${iconColor}`} /> : <Code className={`${iconSize} ${iconColor}`} />;
    case "#timeline":
      return isActive ? <Clock className={`${iconSize} ${iconColor}`} /> : <Clock className={`${iconSize} ${iconColor}`} />;
    case "#recent-projects":
      return isActive ? <Grid className={`${iconSize} ${iconColor}`} /> : <Grid className={`${iconSize} ${iconColor}`} />;
    case "#contact":
      return isActive ? <Send className={`${iconSize} ${iconColor}`} /> : <Send className={`${iconSize} ${iconColor}`} />;
    default:
      return isActive ? <CircleCheck className={`${iconSize} ${iconColor}`} /> : <CircleDashed className={`${iconSize} ${iconColor}`} />;
  }
};

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("#hero");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track active section based on scroll position
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const sections = document.querySelectorAll("section, [id]");
        let currentSection = "#hero";
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionId = section.getAttribute("id");
          if (!sectionId) return;
          
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          // Find the section closest to the top of the viewport
          if (distance < minDistance && rect.top <= 100) {
            minDistance = distance;
            currentSection = `#${sectionId}`;
          }
        });

        setActiveNavItem(currentSection);
      }, 100); // Small debounce for performance
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for the active section
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  
  useEffect(() => {
    // Handle body scroll lock for mobile menu
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavItemClick = (link: string) => {
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    
    // Close mobile menu if it's open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navbar Container - Fixed at the center of the viewport */}
      <div className="fixed top-4 md:top-6 left-0 right-0 flex justify-center items-center z-[5000] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            ref={containerRef}
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className={cn(
              "pointer-events-auto",
              "backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
              "border border-white/[0.1] rounded-full",
              "inline-flex w-auto max-w-[95vw]", // Use inline-flex for proper width calc
              "px-3 py-2 md:px-4 md:py-2",
              className
            )}
            style={{
              background: "rgba(10, 10, 18, 0.85)",
              backdropFilter: "blur(15px) saturate(180%)",
            }}
            onMouseMove={(e) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              containerRef.current.style.setProperty("--x", `${x}px`);
              containerRef.current.style.setProperty("--y", `${y}px`);
            }}
          >
            {/* Light effect following cursor */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <div 
                className="absolute w-40 h-40 bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl opacity-50 pointer-events-none" 
                style={{
                  left: "var(--x, 50%)",
                  top: "var(--y, 50%)",
                }}
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 md:gap-4 relative z-10">
              {navItems.map((navItem, idx) => (
                <motion.button
                  key={`link=${idx}`}
                  onClick={() => handleNavItemClick(navItem.link)}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all",
                    "text-neutral-50 flex items-center gap-2",
                    navItem.link === activeNavItem 
                      ? "text-teal-400" 
                      : "hover:text-teal-300 text-gray-300 hover:shadow-[0_0_10px_rgba(20,184,166,0.15)]"
                  )}
                >
                  {/* Enhanced Lucide Icon */}
                  <div className="flex items-center justify-center relative">
                    {/* Remove background glow for active items */}
                    {getEnhancedIcon(navItem.link, navItem.link === activeNavItem)}
                  </div>
                  
                  {/* Text label */}
                  <span className="text-sm md:text-base font-medium">{navItem.name}</span>
                  
                  {/* Active indicator - keep only this for active state */}
                  {navItem.link === activeNavItem && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 mx-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* GitHub button - desktop */}
              <motion.a 
                href="https://github.com/sahilvishwa2108" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-500 to-cyan-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <button className="relative border border-white/10 text-white px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </button>
                </div>
              </motion.a>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-between w-full">
              {/* Brand or logo - optional */}
              <div className="flex items-center">
                <motion.span 
                  className="text-white font-medium text-sm"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Portfolio
                </motion.span>
              </div>
              
              {/* Active page indicator on mobile */}
              <div className="flex items-center gap-1.5">
                {/* Current section icon */}
                <div className="flex items-center justify-center bg-white/10 rounded-full p-1.5">
                  {getEnhancedIcon(activeNavItem, true)}
                </div>
                
                {/* Current section name */}
                <span className="text-teal-300 text-sm font-medium">
                  {navItems.find(item => item.link === activeNavItem)?.name || "Home"}
                </span>
              </div>
              
              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 p-1.5 rounded-full bg-white/10 text-white"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4999]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-gray-900 to-gray-950 z-[5001] overflow-auto py-16 px-6"
          >
            {/* Close button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            
            {/* Mobile menu items */}
            <div className="space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <motion.button
                    onClick={() => handleNavItemClick(item.link)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${item.link === activeNavItem 
                        ? "bg-teal-500/20 text-teal-300" 
                        : "text-gray-300 hover:bg-white/5"}
                    `}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                      {getEnhancedIcon(item.link, item.link === activeNavItem)}
                    </div>
                    <span className="text-lg font-medium">{item.name}</span>
                    
                    {item.link === activeNavItem && (
                      <motion.div 
                        layoutId="mobile-nav-indicator"
                        className="ml-auto h-2 w-2 rounded-full bg-teal-400"
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
              
              {/* GitHub link in mobile menu */}
              <motion.a
                href="https://github.com/sahilvishwa2108"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                <div className="relative overflow-hidden group w-full">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <div className="relative border border-white/10 text-white px-4 py-3 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center gap-2">
                    <Github className="h-5 w-5" />
                    <span className="text-base font-medium">Visit GitHub Profile</span>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};