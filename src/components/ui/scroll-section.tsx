"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'zoom' | 'none';
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = "",
  delay = 0,
  threshold = 0.1,
  animation = 'fade'
}) => {
  const { ref, isActive } = useOptimizedAnimation(threshold, true);
  
  // Define animation variants based on the type
  const getVariants = () => {
    switch(animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, delay } }
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
        };
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay } }
        };
      case 'none':
      default:
        return {
          hidden: {},
          visible: {},
        };
    }
  };

  return (
    <section 
      id={id} 
      ref={ref} 
      className={className}
    >
      <motion.div
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={getVariants()}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};