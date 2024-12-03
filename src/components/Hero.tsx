"use client";
import React from "react";
import { Button } from "./ui/moving-border";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

function Hero() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Hey there,
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-1 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        I am <b>Sahil Vishwakarma</b>
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-2">
          <Button
            borderRadius="1.75rem"
            className="bg-black border-neutral-600 text-white text-md"
          >
            Hire me
          </Button>
          <Button
            borderRadius="1.75rem"
            className="bg-white text-black border-black  text-md"
          >
            Resume
          </Button>
        </div>
      </motion.h1>
    </LampContainer>
  );
}

export default Hero;
