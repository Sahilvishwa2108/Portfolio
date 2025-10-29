'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollSectionProps {
  id?: string;
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  className?: string;
  delay?: number;
}

export function ScrollSection({
  id,
  children,
  animation = 'fade',
  className = '',
  delay = 0,
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
      className={className}
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={{ once: true, margin: '-100px' }}
      transition={selectedAnimation.transition}
    >
      {children}
    </motion.section>
  );
}
