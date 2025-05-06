"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface LetterPullupProps {
  className?: string;
  words: string;
  delay?: number;
  onComplete?: () => void;
}

export const LetterPullup = ({ words, delay = 0.05, className, onComplete }: LetterPullupProps) => {
  const letters = words.split("");
  
  useEffect(() => {
    // Wait for animation to complete
    const timeout = setTimeout(() => {
      // Trigger onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    }, letters.length * delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [letters.length, delay, onComplete]);
  
  return (
    <div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * delay }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};