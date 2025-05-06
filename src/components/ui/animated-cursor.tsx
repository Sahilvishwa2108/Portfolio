"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export const AnimatedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    // Don't show custom cursor on mobile/touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      
      const handleMouseEnter = () => {
        setIsVisible(true);
      };
      
      const handleMouseLeave = () => {
        setIsVisible(false);
      };
      
      // Link hover effect
      const handleLinkHover = () => {
        setCursorVariant('link');
      };
      
      const handleLinkLeave = () => {
        setCursorVariant('default');
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      // Find all interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleLinkHover);
          el.removeEventListener('mouseleave', handleLinkLeave);
        });
      };
    }
  }, [handleMouseMove]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      borderWidth: 2,
      opacity: 0.6,
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        border: '1px solid rgba(20, 184, 166, 0.6)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        mixBlendMode: 'difference',
      }}
    />
  );
};