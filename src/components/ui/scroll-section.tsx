'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollSectionProps {
  id?: string;
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  className?: string;
  delay?: number;
  showDivider?: boolean;
}

export function ScrollSection({
  id,
  children,
  animation = 'fade',
  className = '',
  delay = 0,
  showDivider = true,
}: ScrollSectionProps) {
  const animations = {
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.6, delay },
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
    },
    'slide-left': {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay },
    },
    'slide-right': {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.section
      id={id}
      className={`relative ${className}`}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={{ once: true, margin: '-100px' }}
      transition={selectedAnimation.transition}
    >
      {/* Section Gradient Divider - Top */}
      {showDivider && (
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.02] via-blue-500/[0.015] to-transparent" />
          {/* Soft glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        </div>
      )}
      
      {/* Mesh background overlay for depth */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}
