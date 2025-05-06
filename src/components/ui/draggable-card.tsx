"use client";

import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

interface DraggableCardProps {
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  demoLink: string;
  className?: string;
}

export function DraggableCard({
  title,
  description,
  imageSrc,
  technologies,
  demoLink,
  className,
}: DraggableCardProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  }

  return (
    <div 
      ref={constraintsRef} 
      className={cn(
        "w-full h-[450px] flex items-center justify-center perspective cursor-grab", 
        className
      )}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="w-[280px] md:w-[320px] h-[400px] rounded-2xl border border-white/[0.1] bg-black/80 overflow-hidden relative flex flex-col"
      >
        {/* Project image */}
        <div className="w-full h-1/2 relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">{description}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {technologies.map((tech, i) => (
              <span 
                key={i}
                className="text-xs bg-white/10 text-teal-300 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Demo button */}
          <a 
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            View Demo
          </a>
        </div>
        
        {/* Shine effect */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-300",
            isDragging ? "opacity-20" : ""
          )}
        ></div>
      </motion.div>
    </div>
  );
}