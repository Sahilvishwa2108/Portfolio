"use client";
import React, { useState, useEffect } from "react";
import { workExperience } from "@/data";
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
        delay: 0.3,
      },
    },
  };

  return (
    <section className="py-20" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            Professional Experience
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white text-black">
            Where I&apos;ve Worked
          </h3>
        </motion.div>

        {hasLoaded && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            {workExperience.map((card, index) => (
              <motion.div
                key={card.id}
                custom={index % 2 === 0 ? 'left' : 'right'}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                
                {/* Card content */}
                <div 
                  className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700"
                >
                  <div className="flex lg:flex-row flex-col lg:items-center gap-4">
                    <div className="lg:w-32 w-20 h-20 lg:h-32 relative flex-shrink-0 bg-gray-800 rounded-xl p-3 flex items-center justify-center">
                      <Image
                        src={card.thumbnail}
                        alt={card.title}
                        width={128}
                        height={128}
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-xl"></div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-300">
                        {card.desc}
                      </p>
                      <div className="mt-4 flex gap-2">
                        {/* You could add skills/tools used here as tags */}
                        <span className="text-xs bg-teal-900/50 text-teal-400 px-2 py-1 rounded-full">
                          {index % 2 === 0 ? 'Frontend' : 'Design'}
                        </span>
                        <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">
                          {index % 2 === 0 ? 'React' : 'UI/UX'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
