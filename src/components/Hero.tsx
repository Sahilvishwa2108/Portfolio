"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { LetterPullup } from "@/components/ui/letter-pullup";
import { Button } from "@/components/ui/moving-border";
import BlurIn from "@/components/ui/blur-in";

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
            {thirdLineComplete && (
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
            )}
          </div>
        </motion.h1>
      </LampContainer>
    </>
  );
}

export default Hero;
