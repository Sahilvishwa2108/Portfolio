"use client";
import React, { useState, useEffect } from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from "@/hooks/useInView";

const Experience = () => {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  const cardVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === 'left' ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="p-20 w-full text-center">
      <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
        My Work Experience
      </h2>

      {hasLoaded && (
        <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
          {workExperience.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index % 2 === 0 ? 'left' : 'right'}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Button
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1.75rem"
                style={{
                  background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                  borderRadius: `calc(1.75rem * 0.96)`,
                }}
                className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                  <Image
                    src={card.thumbnail}
                    alt={card.thumbnail}
                    width={128}
                    height={128}
                    className="lg:w-32 md:w-20 w-16"
                  />
                  <div className="lg:ms-5">
                    <h1 className="text-start text-xl md:text-2xl font-bold">
                      {card.title}
                    </h1>
                    <p className="text-start text-white-100 mt-3 font-semibold">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
