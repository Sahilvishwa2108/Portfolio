'use client'
import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";

export function TimelineDemo() {
  const data = [
    {
      title: "Expected - 2026",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <p className="text-3xl font-bold text-teal-500">
            Lakshmi Narain College of Technology, Bhopal
          </p>
          <p className="text-xl text-gray-300">
            B.Tech in Computer Science Engineering
          </p>
          <p className="text-lg text-gray-400 mb-10">
            CGPA: 8.0
          </p>
          <div className="grid grid-cols-2 gap-8">
            <Image
              src="/projects/amazon.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/projects/amazon.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "2021",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <p className="text-3xl font-bold text-teal-500">
            Jawahar Navodaya Vidyalaya, Khurai
          </p>
          <p className="text-xl text-gray-300">
            XII (PCM) with Computer Science - CBSE
          </p>
          <p className="text-lg text-gray-400 mb-10">
            Grade: 91.4%
          </p>
          <div className="grid grid-cols-2 gap-8">
            <Image
              src="/projects/amazon.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/projects/amazon.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "2019",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <p className="text-3xl font-bold text-teal-500">
            Jawahar Navodaya Vidyalaya, Khurai
          </p>
          <p className="text-xl text-gray-300">
            X - CBSE
          </p>
          <p className="text-lg text-gray-400 mb-10">
            Grade: 92.6%
          </p>
          <div className="grid grid-cols-2 gap-8">
            <Image
              src="/projects/amazon.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/projects/amazon.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
    {
      title: "2014",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <p className="text-3xl font-bold text-teal-500">
            S.P.M Convent School, Garhakota
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Class - V (Primary School)
          </p>
          <div className="grid grid-cols-2 gap-8">
            <Image
              src="/projects/amazon.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <Image
              src="/projects/amazon.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
