"use client";
import React, { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { LetterPullup } from "@/components/ui/letter-pullup";
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

function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "This",
      className: "text-7xl",
    },
    {
      text: "is",
      className: "text-7xl",
    },
    {
      text: "Sahil Vishwakarma.",
      className: "text-7xl text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <TypewriterEffectSmooth words={words} />
    </>
  );
}
export default Hero;
