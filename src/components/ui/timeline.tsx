"use client";
import React, { useRef } from "react";
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

// Enhanced timeline item with 3D effects and improved layout
const TimelineItem = ({ item, index }: { item: TimelineEntry; index: number }) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, { once: false, amount: 0.3 });
  
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
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 mb-16`}
    >
      {/* Year and Icon Column */}
      <div className="relative flex-shrink-0 md:w-48">
        {/* Year Badge */}
        <div className={`
          bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-xl
          border border-gray-100 dark:border-gray-700
          relative z-20 flex items-center justify-center md:justify-${isEven ? 'end' : 'start'}
          transform-gpu ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          transition-all duration-500 delay-100
          w-16 h-16 md:w-24 md:h-24 mx-auto md:mx-0
        `}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-gray-700/50 dark:to-transparent rounded-lg border border-white/20 dark:border-gray-600/20" />
          
          {/* Icon */}
          <div className={`
            text-2xl md:text-3xl z-10
            bg-gradient-to-br ${item.color} bg-clip-text text-transparent
          `}>
            {item.icon}
          </div>
          
          {/* Year text */}
          <div className="absolute -bottom-2 transform translate-y-full text-sm font-bold text-gray-900 dark:text-gray-200">
            {item.year}
          </div>
        </div>
        
        {/* Timeline connector */}
        <div className="absolute left-1/2 md:left-auto md:right-0 md:top-1/2 top-0 h-full md:h-px w-px md:w-8 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-teal-500 to-transparent transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-10"></div>
      </div>
      
      {/* Content Card with 3D hover effect */}
      <div className="flex-grow">
        <div className={`
          relative bg-white dark:bg-gray-800/90 p-6 md:p-8 rounded-xl 
          shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]
          border border-gray-100 dark:border-gray-700
          overflow-hidden group
          hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]
          transition-all duration-300
          transform-gpu ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          h-full
        `}>
          {/* Colored top accent line */}
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color}`}></div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {item.title}
            </h3>
            
            <h4 className={`
              font-bold text-lg md:text-xl mb-3
              bg-gradient-to-r ${item.color} bg-clip-text text-transparent
            `}>
              {item.subtitle}
            </h4>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-3">
              <p>{item.description}</p>
              
              {item.additionalInfo && (
                <div className="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm font-medium">
                  {item.additionalInfo}
                </div>
              )}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-gray-100/10 to-white/5 dark:from-gray-700/10 dark:to-gray-800/5 transform group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full max-w-[300px] max-h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-transparent to-white/5 dark:to-gray-700/5 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-700 blur-xl"></div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced parent Timeline component - Fixed the unused height state
export const TimelineComp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed unused state: const [height, setHeight] = useState(0);
  
  // Timeline data
  const timelineData: TimelineEntry[] = [
    {
      year: 2026,
      title: "Expected - 2026",
      subtitle: "Lakshmi Narain College of Technology, Bhopal",
      description: "B.Tech in Computer Science Engineering",
      additionalInfo: "CGPA: 8.0",
      color: "from-teal-500 to-cyan-500",
      icon: "👨‍🎓"
    },
    {
      year: 2021,
      title: "2021",
      subtitle: "Jawahar Navodaya Vidyalaya, Khurai",
      description: "XII (PCM) with Computer Science - CBSE",
      additionalInfo: "Grade: 91.4%",
      color: "from-purple-500 to-indigo-500",
      icon: "🎓"
    },
    {
      year: 2019,
      title: "2019",
      subtitle: "Jawahar Navodaya Vidyalaya, Khurai",
      description: "X - CBSE",
      additionalInfo: "Grade: 92.6%",
      color: "from-blue-500 to-indigo-500",
      icon: "📚"
    }
  ];

  // Removed the useEffect that was setting the unused height state
  // useEffect(() => {
  //   if (containerRef.current) {
  //     setHeight(containerRef.current.scrollHeight);
  //   }
  // }, []);

  return (
    <section 
      id="timeline" 
      className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-24"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
              MY JOURNEY
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
          >
            Educational Timeline
          </motion.h3>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          <div className="relative z-10 space-y-16">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
          
          {/* Central connecting line (decorative) */}
          <div className="absolute left-1/2 top-12 bottom-12 w-px md:hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export function TimelineDemo() {
  return <TimelineComp />;
}