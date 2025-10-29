'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Timeline data
const educationData = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science',
    institution: 'Indian Institute of Technology',
    location: 'Delhi, India',
    period: '2020 - 2024',
    grade: 'CGPA: 8.9/10',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Completed advanced coursework in Deep Learning, Natural Language Processing, and Computer Vision.',
    achievements: [
      'Dean\'s List for Academic Excellence',
      'Best Final Year Project Award',
      'Published 2 research papers in IEEE conferences',
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Structures', 'Algorithms'],
    color: 'from-teal-500 to-cyan-500',
    icon: GraduationCap,
  },
  {
    id: 2,
    degree: 'Senior Secondary (12th)',
    institution: 'Delhi Public School',
    location: 'Mumbai, India',
    period: '2018 - 2020',
    grade: 'Percentage: 95.4%',
    description: 'Focused on Science stream with Mathematics, Physics, Chemistry, and Computer Science. Developed strong foundation in programming and problem-solving.',
    achievements: [
      'School Topper in Computer Science',
      'National Science Olympiad Gold Medalist',
      'Led the Coding Club as President',
    ],
    skills: ['C++', 'Java', 'Web Development', 'Mathematics'],
    color: 'from-blue-500 to-indigo-500',
    icon: BookOpen,
  },
  {
    id: 3,
    degree: 'Secondary (10th)',
    institution: 'St. Xavier\'s High School',
    location: 'Bangalore, India',
    period: '2016 - 2018',
    grade: 'Percentage: 96.8%',
    description: 'Excelled in all subjects with particular interest in Mathematics and Science. Participated in various inter-school competitions and science fairs.',
    achievements: [
      'School Topper with Distinction',
      'State Level Science Fair Winner',
      'Perfect score in Mathematics',
    ],
    skills: ['Problem Solving', 'Critical Thinking', 'Basic Programming'],
    color: 'from-purple-500 to-pink-500',
    icon: Award,
  },
];

// Timeline Item Component
function TimelineItem({ 
  item, 
  index, 
  isActive 
}: { 
  item: typeof educationData[0]; 
  index: number; 
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-20 relative`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      data-timeline-item
    >
      {/* Card Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div
          className="cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="relative transition-all duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Side - Modern Glassmorphism Card */}
            <div 
              className="w-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="relative group">
                {/* Gradient Border Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`} />
                
                {/* Card Content */}
                <div className="relative p-8 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                  {/* Icon and Title Section */}
                  <div className={`flex ${isLeft ? 'flex-row-reverse justify-end' : 'flex-row'} items-start gap-4 mb-6`}>
                    <div className={`relative p-3.5 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                      {/* Icon Glow Effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color} blur-md opacity-50`} />
                    </div>
                    
                    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {item.degree}
                      </h3>
                      <p className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20 text-teal-400 font-semibold text-sm border border-teal-500/30`}>
                        {item.grade}
                      </p>
                    </div>
                  </div>

                  {/* Institution & Details */}
                  <h4 className={`text-xl font-semibold text-white mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                    {item.institution}
                  </h4>

                  <div className="space-y-2.5 mb-5">
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center gap-2.5 text-gray-300`}>
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span className="text-sm font-medium">{item.period}</span>
                    </div>
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center gap-2.5 text-gray-300`}>
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-gray-400 text-sm leading-relaxed mb-5 ${isLeft ? 'text-right' : 'text-left'}`}>
                    {item.description}
                  </p>

                  {/* Skills Tags */}
                  <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-2 mb-4`}>
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm text-xs text-gray-300 border border-white/10 hover:border-teal-500/50 hover:bg-white/10 transition-all duration-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Flip Hint */}
                  <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center gap-2 mt-5 pt-4 border-t border-white/10`}>
                    <Award className="w-4 h-4 text-teal-400 animate-pulse" />
                    <p className="text-xs text-gray-400 font-medium">Click to view achievements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side - Achievements */}
            <div 
              className="absolute inset-0 w-full"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="relative group h-full">
                {/* Gradient Border Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300`} />
                
                {/* Card Content */}
                <div className="relative h-full p-8 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}>
                      <TrendingUp className="w-6 h-6 text-teal-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Key Achievements</h4>
                  </div>

                  <ul className="space-y-4 mb-6">
                    {item.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className={`mt-1 p-1.5 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20 border border-teal-500/30 group-hover/item:scale-110 transition-transform`}>
                          <Award className="w-4 h-4 text-teal-400" />
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed flex-1">
                          {achievement}
                        </p>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Flip Back Hint */}
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/10">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <p className="text-xs text-gray-400 font-medium">Click to go back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center Timeline Node */}
      <div className="hidden md:flex w-2/12 justify-center items-center relative z-10">
        <motion.div
          className="relative"
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            repeatType: 'loop',
          }}
        >
          {/* Pulsing Ring for Active State */}
          {isActive && (
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-30`}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
          
          {/* Main Node */}
          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl`}>
            {/* Inner Circle */}
            <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center border-2 border-gray-800">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty Space for Alternating Layout */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}

// Main Timeline Component
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top / window.innerHeight);
      const newActiveIndex = Math.min(
        Math.floor(scrollProgress * educationData.length),
        educationData.length - 1
      );
      setActiveIndex(Math.max(0, newActiveIndex));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      id="timeline"
    >
      {/* Smooth Background Gradient Overlays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-900 to-transparent" />
        <div className="absolute top-40 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 shadow-lg"
          >
            <GraduationCap className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-teal-400 font-semibold tracking-wide">Education Journey</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A journey of continuous learning and achievement, building a strong foundation in computer science and technology.
          </p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Center Line - Improved styling */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
          <div ref={lineRef} className="absolute top-0 left-0 w-full bg-gradient-to-b from-gray-700/50 to-gray-800/50 h-full rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal-500 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-teal-500/20"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {educationData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Progress Indicator - Enhanced Design */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20 bg-gray-900/50 backdrop-blur-sm p-3 rounded-full border border-white/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        {educationData.map((item, index) => (
          <motion.button
            key={item.id}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-teal-500 scale-125'
                : 'bg-gray-600 hover:bg-gray-500 scale-100'
            }`}
            onClick={() => {
              const element = document.querySelectorAll('[data-timeline-item]')[index];
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            whileHover={{ scale: 1.5 }}
            aria-label={`Go to ${item.degree}`}
          >
            {index === activeIndex && (
              <motion.span
                className="absolute inset-0 rounded-full bg-teal-500"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
