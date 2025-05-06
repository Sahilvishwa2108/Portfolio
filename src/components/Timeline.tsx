"use client";
import React from "react";
import { motion } from "framer-motion";
import { TimelineDemo } from "./ui/timeline";

/**
 * Timeline component that showcases educational history
 * Uses the enhanced TimelineDemo component from ui/timeline
 */
const Timeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <TimelineDemo />
    </motion.div>
  );
};

export default Timeline;