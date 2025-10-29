"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TimelineDemo } from "./ui/timeline";

/**
 * Timeline component that showcases educational history
 * Uses the enhanced TimelineDemo component from ui/timeline
 */
const Timeline = () => {
  // Add these for scroll fade effect
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scrollYProgress to opacity - fade out as section leaves viewport
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  return (
    <section 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        style={{ opacity }} // Apply the fade effect
      >
        <TimelineDemo />
      </motion.div>
    </section>
  );
};

export { Timeline };