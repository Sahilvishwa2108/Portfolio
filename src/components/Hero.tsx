"use client";
import React, { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { LetterPullup } from "@/components/ui/letter-pullup";
import { Button } from "@/components/ui/moving-border";
import BlurIn from "@/components/ui/blur-in";

function Hero() {
  const [firstLineComplete, setFirstLineComplete] = useState(false);

  return (
    <>
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
          <b>
            <LetterPullup
              words={"Hey there,"}
              delay={0.05}
              onComplete={() => setFirstLineComplete(true)}
            />
          </b>
        </motion.h1>
        {firstLineComplete && (
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
            <b>
              <LetterPullup words={"This is Sahil Vishwakarma"} delay={0.03} />
            </b>
          </motion.h1>
        )}
        {firstLineComplete && (
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
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8 justify-center items-center">
              <Button
                borderRadius="1.75rem"
                className="bg-black border-neutral-600 text-white text-md"
              >
                <BlurIn word="Hire me" />
              </Button>
              <Button
                borderRadius="1.75rem"
                className="bg-white text-black border-black  text-md"
              >
                <BlurIn word="Resume" />
              </Button>
            </div>
          </motion.h1>
        )}
      </LampContainer>
      <GoogleGeminiEffectDemo />
    </>
  );
}

function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export default Hero;
