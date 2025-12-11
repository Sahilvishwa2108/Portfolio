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
    degree: 'Bachelor of Technology - Computer Science Engineering',
    institution: 'Lakshmi Narain College of Technology',
    location: 'Bhopal, Madhya Pradesh',
    period: 'Expected July 2026',
    grade: 'CGPA: 8.15/10',
    description: 'Final year CSE student with hands-on experience in MERN Stack, Next.js, and TypeScript. Specializing in building enterprise-grade full-stack applications and scalable SaaS solutions.',
    achievements: [
      'Smart India Hackathon (SIH) 2024 Participant',
      'Built 8+ production-ready full-stack applications',
      'Completed 6-month Frontend Developer Internship at TechGenesis',
      'Freelance project: Enterprise SaaS with 50+ concurrent users',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    color: 'from-teal-500 to-cyan-500',
    icon: GraduationCap,
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (XII) - CBSE',
    institution: 'Jawahar Navodaya Vidyalaya, Sagar',
    location: 'Sagar, Madhya Pradesh',
    period: 'April 2021',
    grade: 'Percentage: 91.4%',
    description: 'Completed with Computer Science as optional subject. This early exposure built a strong foundation in Python programming, DBMS, and Computer Networks that sparked my passion for software development.',
    achievements: [
      'Scored 91.4% in CBSE Board Examination',
      'Computer Science topper in the school',
      'Strong foundation in Python, DBMS & Networking',
      'District-level Science Exhibition participant',
    ],
    skills: ['Python', 'DBMS', 'Computer Networks', 'Mathematics'],
    color: 'from-blue-500 to-indigo-500',
    icon: BookOpen,
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (X) - CBSE',
    institution: 'Jawahar Navodaya Vidyalaya, Sagar',
    location: 'Sagar, Madhya Pradesh',
    period: 'April 2019',
    grade: 'Percentage: 92.6%',
    description: 'Achieved distinction with excellent academic performance across all subjects. This strong academic foundation laid the groundwork for pursuing Computer Science Engineering.',
    achievements: [
      'Scored 92.6% in CBSE Board Examination',
      'School merit holder - distinction in all subjects',
      'Foundation for analytical and problem-solving skills',
    ],
    skills: ['Mathematics', 'Science', 'Critical Thinking', 'Problem Solving'],
    color: 'from-purple-500 to-pink-500',
    icon: Award,
  },
];

// Timeline Item Component - Modern Premium Design
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
          className="cursor-pointer perspective-1200"
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="relative transition-all duration-700 ease-out preserve-3d"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Side - Ultra Modern Card */}
            <div 
              className="w-full backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="relative group">
                {/* Animated gradient border */}
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.color} opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                
                {/* Card Glass Container */}
                <div className="relative rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
                  
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
                  
                  <div className="relative p-8">
                    {/* Header with Icon */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse justify-end' : 'flex-row'} items-start gap-5 mb-6`}>
                      {/* Floating Icon Badge */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      
                      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {item.degree}
                        </h3>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 border border-white/10`}>
                          <span className="text-sm font-bold text-white">{item.grade}</span>
                        </div>
                      </div>
                    </div>

                    {/* Institution */}
                    <h4 className={`text-lg font-semibold text-gray-200 mb-5 ${isLeft ? 'text-right' : 'text-left'}`}>
                      {item.institution}
                    </h4>

                    {/* Meta Info Pills */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-3 mb-6`}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-gray-300 font-medium">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{item.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isLeft ? 'text-right' : 'text-left'}`}>
                      {item.description}
                    </p>

                    {/* Skills Tags - Modern Chips */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-2 mb-6`}>
                      {item.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-teal-500/30 hover:bg-white/10 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA Footer */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center gap-3 pt-5 border-t border-white/10`}>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                        <Award className="w-4 h-4 text-teal-400" />
                        <span className="text-xs text-gray-300 font-medium">Click for achievements</span>
                      </div>
                      <div className="flex-1" />
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`text-teal-400 ${isLeft ? 'rotate-180' : ''}`}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side - Achievements */}
            <div 
              className="absolute inset-0 w-full backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="relative group h-full">
                {/* Animated gradient border */}
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.color} opacity-30 group-hover:opacity-50 transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Key Achievements</h4>
                        <p className="text-sm text-gray-400">Highlights & Accomplishments</p>
                      </div>
                    </div>

                    {/* Achievements List */}
                    <ul className="space-y-4 mb-6">
                      {item.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 group/item"
                        >
                          <div className={`mt-0.5 p-2 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20 border border-white/10 group-hover/item:scale-110 transition-transform duration-300`}>
                            <Award className="w-4 h-4 text-teal-400" />
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed flex-1">
                            {achievement}
                          </p>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Back Button */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <p className="text-sm text-gray-400">Click to flip back</p>
                    </div>
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
      className="relative py-24 overflow-hidden"
      id="timeline"
    >
      {/* Smooth Background - Matching global theme */}
      <div className="absolute inset-0">
        {/* Subtle mesh gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" />
        <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.02] rounded-full blur-3xl" />
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
