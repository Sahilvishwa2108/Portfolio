"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useInView
} from "framer-motion";

interface TimelineEntry {
  title: string;
  subtitle: string;
  description: string;
  additionalInfo?: string;
  color: string;
  icon: string;
  year: number;
}

// Modern timeline item with glass morphism and interactive hover
const TimelineItem = ({ item, index }: { item: TimelineEntry; index: number }) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Alternate sides for desktop
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={entryRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut",
        delay: index * 0.1 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 mb-16`}
    >
      {/* Year and Icon Column */}
      <div className="relative flex-shrink-0 md:w-48">
        {/* Year Badge with glass morphism */}
        <motion.div 
          className={`
            glass-morphism-strong px-4 py-2 rounded-2xl shadow-xl
            relative z-20 flex items-center justify-center md:justify-${isEven ? 'end' : 'start'}
            w-20 h-20 md:w-28 md:h-28 mx-auto md:mx-0
          `}
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered ? `0 0 30px ${item.color.includes('teal') ? 'rgba(20, 184, 166, 0.5)' : item.color.includes('purple') ? 'rgba(139, 92, 246, 0.5)' : 'rgba(59, 130, 246, 0.5)'}` : 'none'
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-20`} />
          
          {/* Icon */}
          <div className={`
            text-3xl md:text-4xl z-10
            bg-gradient-to-br ${item.color} bg-clip-text text-transparent
          `}>
            {item.icon}
          </div>
          
          {/* Year text */}
          <div className={`absolute -bottom-3 transform translate-y-full text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
            {item.year}
          </div>
        </motion.div>
        
        {/* Animated Timeline connector */}
        <motion.div 
          className={`absolute left-1/2 md:left-auto md:${isEven ? 'right' : 'left'}-0 md:top-1/2 top-0 h-full md:h-px w-px md:w-8 bg-gradient-to-b md:bg-gradient-to-r ${item.color} transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-10 opacity-50`}
          initial={{ scaleY: 0, scaleX: 0 }}
          animate={isInView ? { scaleY: 1, scaleX: 1 } : { scaleY: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
        />
      </div>
      
      {/* Content Card with glass morphism and enhanced hover */}
      <div className="flex-grow">
        <motion.div 
          className={`
            relative glass-morphism-strong p-6 md:p-8 rounded-2xl 
            overflow-hidden group
            transition-all duration-300
            transform-gpu ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
            h-full
          `}
          animate={{
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered ? '0 20px 50px -15px rgba(20, 184, 166, 0.3)' : '0 10px 40px -15px rgba(0, 0, 0, 0.7)'
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Colored top accent line with gradient */}
          <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`}></div>
          
          {/* Glow effect on hover */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {item.title}
            </h3>
            
            <h4 className={`
              font-bold text-lg md:text-xl mb-4
              bg-gradient-to-r ${item.color} bg-clip-text text-transparent
            `}>
              {item.subtitle}
            </h4>
            
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">{item.description}</p>
              
              {item.additionalInfo && (
                <motion.div 
                  className="mt-4 px-4 py-3 glass-morphism rounded-xl text-sm font-semibold border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.additionalInfo}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Decorative elements with improved animations */}
          <motion.div 
            className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-2xl`}
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.15 : 0.1
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Modern Timeline component with glass morphism
export const TimelineComp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Timeline data
  const timelineData: TimelineEntry[] = [
    {
      year: 2026,
      title: "Expected - 2026",
      subtitle: "Lakshmi Narain College of Technology, Bhopal",
      description: "B.Tech in Computer Science Engineering",
      additionalInfo: "CGPA: 8.0",
      color: "from-teal-500 to-cyan-500",
      icon: "🎓"
    },
    {
      year: 2021,
      title: "2021",
      subtitle: "Jawahar Navodaya Vidyalaya, Khurai",
      description: "XII (PCM) with Computer Science - CBSE",
      additionalInfo: "Grade: 91.4%",
      color: "from-purple-500 to-indigo-500",
      icon: "📚"
    },
    {
      year: 2019,
      title: "2019",
      subtitle: "Jawahar Navodaya Vidyalaya, Khurai",
      description: "X - CBSE",
      additionalInfo: "Grade: 92.6%",
      color: "from-blue-500 to-indigo-500",
      icon: "✨"
    }
  ];

  return (
    <section 
      id="timeline" 
      className="w-full section-bg py-24 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl font-semibold gradient-text">
              MY JOURNEY
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-2 rounded-full"></div>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mt-4 text-white"
          >
            Educational <span className="gradient-text">Timeline</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
          >
            My academic journey and milestones that shaped my career path
          </motion.p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          <div className="relative z-10 space-y-16">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
          
          {/* Central connecting line (mobile only) */}
          <div className="absolute left-1/2 top-12 bottom-12 w-px md:hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500 opacity-30"
            />
          </div>
        </div>

        {/* Stats at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6"
        >
          <div className="glass-morphism-strong p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">2026</div>
            <div className="text-sm text-gray-400">Graduation</div>
          </div>
          <div className="glass-morphism-strong p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">8.0</div>
            <div className="text-sm text-gray-400">CGPA</div>
          </div>
          <div className="glass-morphism-strong p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">CSE</div>
            <div className="text-sm text-gray-400">Major</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export function TimelineDemo() {
  return <TimelineComp />;
}