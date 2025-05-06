"use client";
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 origin-left z-[9999]"
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
    />
  );
};