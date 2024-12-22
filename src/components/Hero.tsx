"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { LetterPullup } from "@/components/ui/letter-pullup";
import { Button } from "@/components/ui/moving-border";
import BlurIn from "@/components/ui/blur-in";
import Link from "next/link";

function Hero() {
  const [firstLineComplete, setFirstLineComplete] = useState(false);
  const [secondLineComplete, setSecondLineComplete] = useState(false);
  const [thirdLineComplete, setThirdLineComplete] = useState(false);

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
          className="-mt-16 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="h-80 pt-16">
            <b>
              <LetterPullup
                words={"Hey there,"}
                delay={0.02}
                onComplete={() => setFirstLineComplete(true)}
              />
              {firstLineComplete && (
                <>
                  <LetterPullup
                    words={"I'm"}
                    delay={0.05}
                    onComplete={() => setSecondLineComplete(true)}
                  />
                </>
              )}
              {secondLineComplete && (
                <LetterPullup
                  words={"SAHIL VISHWAKARMA"}
                  delay={0.05}
                  onComplete={() => setThirdLineComplete(true)}
                />
              )}
            </b>
          </div>
        </motion.h1>
      </LampContainer>
      {thirdLineComplete && (
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center items-center z-50">
          <Link href="https://drive.google.com/file/d/1XBDUNiAFqqSSmTG0vVb4het3jOX01-Ss/view?usp=sharing" target="_blank">
          <Button
            borderRadius="1.75rem"
            className="bg-black border-neutral-600 text-white text-md"
          >
            <BlurIn word="Resume" />
          </Button>
          </Link>
          <Link href="mailto:sahilvishwa2108@gmail.com">
          <Button
            borderRadius="1.75rem"
            className="bg-white text-black border-black  text-md"
          >
            <BlurIn word="Hire Me" />
          </Button>
          </Link>
        </div>
      )}
    </>
  );
}


export default Hero;
