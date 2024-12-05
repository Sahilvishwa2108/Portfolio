"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LetterPullupProps {
  className?: string;
  words: string;
  delay?: number;
  onComplete?: () => void; // Add this line to accept a callback
}

export const LetterPullup = ({ words, delay = 0.05, className, onComplete }: LetterPullupProps) => {
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 50, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay, // By default, delay each letter's animation by 0.05 seconds
      },
    }),
  };

  return (
    <div className="flex justify-center">
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={cn(
            "font-display text-center tracking-[-0.02em] drop-shadow-sm",
            letters.join("") === "SAHIL VISHWAKARMA" ? "dark:text-teal-600" : "dark:text-white",
            className,
          )}
          onAnimationComplete={() => {
            if (i === letters.length - 1 && onComplete) {
              onComplete();
            }
          }}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
};
