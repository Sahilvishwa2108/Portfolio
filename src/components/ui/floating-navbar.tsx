"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
    icon: React.ReactNode;
  }[];
  activeNavItem: string;
  className?: string;
}

export const FloatingNav = ({ navItems, activeNavItem, className }: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavItemClick = (link: string) => {
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-16 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white bg-opacity-10 backdrop-blur-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-12",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem, idx) => (
          <button
            key={`link=${idx}`}
            onClick={() => handleNavItemClick(navItem.link)}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-base",
              navItem.link === activeNavItem ? "text-teal-600 dark:text-teal-600" : ""
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-lg">{navItem.name}</span>
          </button>
        ))}
        <a href="https://github.com/sahilvishwa2108">
          <button className="border text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-8 py-3 rounded-full">
            <span>GitHub</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};
