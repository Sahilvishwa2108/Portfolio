"use client";
import { useState, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Achivements() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cards = certificatesData.certificates.map((certificate, index) => (
    <motion.div key={certificate.src} variants={itemVariants}>
      <BackgroundGradient className="rounded-3xl">
        <Card card={{ ...certificate, category: certificate.category.toString() }} index={index} />
      </BackgroundGradient>
    </motion.div>
  ));

  return (
    <div ref={ref} className="w-full h-full py-20">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="text-center">
          <motion.h2
            className="text-base text-teal-600 font-semibold tracking-wide uppercase mb-10"
            variants={itemVariants}
          >
            CERTIFICATIONS
          </motion.h2>
        </div>
        <Carousel items={cards} />
      </motion.div>
    </div>
  );
}
