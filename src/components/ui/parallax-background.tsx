"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-1, where 1 is maximum effect
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = "",
  intensity = 0.2,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction
  let transform;
  const moveAmount = 100 * intensity;
  
  switch(direction) {
    case 'up':
      transform = useTransform(scrollYProgress, [0, 1], [0, -moveAmount]);
      break;
    case 'down':
      transform = useTransform(scrollYProgress, [0, 1], [0, moveAmount]);
      break;
    case 'left':
      transform = useTransform(scrollYProgress, [0, 1], [0, -moveAmount]);
      break;
    case 'right':
      transform = useTransform(scrollYProgress, [0, 1], [0, moveAmount]);
      break;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ 
          y: direction === 'up' || direction === 'down' ? transform : 0,
          x: direction === 'left' || direction === 'right' ? transform : 0
        }}
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};