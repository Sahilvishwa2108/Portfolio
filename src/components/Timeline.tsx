'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Timeline data with enhanced color schemes
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
    // Enhanced color scheme
    primaryColor: 'from-teal-500 to-cyan-500',
    accentColor: 'text-teal-400',
    secondaryColor: 'text-cyan-300',
    gradeColor: 'from-emerald-400 to-teal-400',
    iconBg: 'from-teal-500 via-cyan-500 to-blue-500',
    skillColors: ['bg-teal-500/20 text-teal-300 border-teal-500/30', 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', 'bg-blue-500/20 text-blue-300 border-blue-500/30'],
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
    // Enhanced color scheme
    primaryColor: 'from-blue-500 to-indigo-500',
    accentColor: 'text-blue-400',
    secondaryColor: 'text-indigo-300',
    gradeColor: 'from-blue-400 to-indigo-400',
    iconBg: 'from-blue-500 via-indigo-500 to-purple-500',
    skillColors: ['bg-blue-500/20 text-blue-300 border-blue-500/30', 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', 'bg-violet-500/20 text-violet-300 border-violet-500/30'],
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
    // Enhanced color scheme
    primaryColor: 'from-purple-500 to-pink-500',
    accentColor: 'text-purple-400',
    secondaryColor: 'text-pink-300',
    gradeColor: 'from-purple-400 to-pink-400',
    iconBg: 'from-purple-500 via-pink-500 to-rose-500',
    skillColors: ['bg-purple-500/20 text-purple-300 border-purple-500/30', 'bg-pink-500/20 text-pink-300 border-pink-500/30', 'bg-rose-500/20 text-rose-300 border-rose-500/30'],
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
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.primaryColor} opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.primaryColor} opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                
                {/* Card Glass Container */}
                <div className="relative rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.primaryColor}`} />
                  
                  {/* Corner glow accents */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.primaryColor} opacity-10 blur-3xl`} />
                  <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${item.iconBg} opacity-5 blur-3xl`} />
                  
                  <div className="relative p-8">
                    {/* Header with Icon */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse justify-end' : 'flex-row'} items-start gap-5 mb-6`}>
                      {/* 3D Style Icon Badge */}
                      <div className="relative group/icon">
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.iconBg} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 group-hover/icon:scale-110 transition-all duration-500`} />
                        {/* Icon container with 3D effect */}
                        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.iconBg} shadow-xl transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500`}>
                          {/* Inner shadow for depth */}
                          <div className="absolute inset-[2px] rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
                          <Icon className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
                        </div>
                        {/* Reflection effect */}
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r ${item.primaryColor} opacity-30 blur-sm rounded-full`} />
                      </div>
                      
                      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                        {/* Degree title with gradient on hover */}
                        <h3 className={`text-xl sm:text-2xl font-bold mb-3 leading-tight transition-all duration-300 bg-gradient-to-r ${item.primaryColor} bg-clip-text text-transparent`}>
                          {item.degree}
                        </h3>
                        {/* Grade badge with vibrant gradient */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradeColor} shadow-lg`}>
                          <span className="text-sm font-bold text-gray-900">{item.grade}</span>
                        </div>
                      </div>
                    </div>

                    {/* Institution with accent color */}
                    <h4 className={`text-lg font-semibold ${item.secondaryColor} mb-5 ${isLeft ? 'text-right' : 'text-left'}`}>
                      {item.institution}
                    </h4>

                    {/* Meta Info Pills with different colors */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-3 mb-6`}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-300 font-medium">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-300">{item.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-400 text-sm leading-relaxed mb-6 ${isLeft ? 'text-right' : 'text-left'}`}>
                      {item.description}
                    </p>

                    {/* Skills Tags - Colorful Chips */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} flex-wrap gap-2 mb-6`}>
                      {item.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${item.skillColors[i % item.skillColors.length]} hover:scale-105 transition-all duration-300 cursor-default`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Achievement Button - Premium Design */}
                    <div className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center gap-3 pt-5 border-t border-white/10`}>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden cursor-pointer`}
                      >
                        {/* Button gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.primaryColor} opacity-20 group-hover:opacity-30 transition-opacity`} />
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        {/* Border */}
                        <div className={`absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors`} />
                        
                        {/* Trophy icon with glow */}
                        <div className="relative">
                          <Award className={`w-5 h-5 ${item.accentColor} drop-shadow-lg`} />
                          <div className={`absolute inset-0 ${item.accentColor} blur-sm opacity-50`}>
                            <Award className="w-5 h-5" />
                          </div>
                        </div>
                        
                        <span className={`text-sm font-semibold ${item.accentColor} relative z-10`}>
                          View Achievements
                        </span>
                        
                        {/* Animated arrow */}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className={`${item.accentColor} text-lg`}
                        >
                          →
                        </motion.span>
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
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${item.primaryColor} opacity-30 group-hover:opacity-50 transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.primaryColor}`} />
                  
                  {/* Corner glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.iconBg} opacity-10 blur-3xl`} />
                  
                  <div className="p-8">
                    {/* Header with gradient text */}
                    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.iconBg} rounded-xl blur-lg opacity-50`} />
                        <div className={`relative p-3 rounded-xl bg-gradient-to-br ${item.iconBg}`}>
                          <TrendingUp className="w-6 h-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-xl font-bold bg-gradient-to-r ${item.gradeColor} bg-clip-text text-transparent`}>Key Achievements</h4>
                        <p className={`text-sm ${item.secondaryColor}`}>Highlights & Accomplishments</p>
                      </div>
                    </div>

                    {/* Achievements List with colorful indicators */}
                    <ul className="space-y-4 mb-6">
                      {item.achievements.map((achievement, i) => {
                        const colors = ['text-emerald-400', 'text-amber-400', 'text-rose-400', 'text-violet-400'];
                        const bgColors = ['bg-emerald-500/20 border-emerald-500/30', 'bg-amber-500/20 border-amber-500/30', 'bg-rose-500/20 border-rose-500/30', 'bg-violet-500/20 border-violet-500/30'];
                        
                        return (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 group/item"
                          >
                            <div className={`mt-0.5 p-2 rounded-lg ${bgColors[i % bgColors.length]} border group-hover/item:scale-110 transition-transform duration-300`}>
                              <Award className={`w-4 h-4 ${colors[i % colors.length]}`} />
                            </div>
                            <p className="text-gray-200 text-sm leading-relaxed flex-1">
                              {achievement}
                            </p>
                          </motion.li>
                        );
                      })}
                    </ul>

                    {/* Back Button with animation */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.gradeColor}`} 
                      />
                      <p className={`text-sm ${item.accentColor}`}>Click to flip back</p>
                      <motion.span
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className={`${item.accentColor} text-lg ml-auto`}
                      >
                        ←
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center Timeline Node - Enhanced */}
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
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.primaryColor} opacity-30`}
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
          
          {/* Main Node with 3D effect */}
          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-2xl`}>
            {/* Inner highlight */}
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/20 to-transparent" />
            {/* Inner Circle */}
            <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center border-2 border-gray-700 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent" />
              <Icon className={`w-7 h-7 ${item.accentColor} drop-shadow-lg relative z-10`} />
            </div>
            {/* Bottom reflection */}
            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-gradient-to-r ${item.primaryColor} opacity-20 blur-md rounded-full`} />
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

      {/* Progress Indicator - Enhanced with item colors */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20 bg-gray-900/70 backdrop-blur-md p-3 rounded-full border border-white/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        {educationData.map((item, index) => {
          const dotColors = ['bg-teal-500', 'bg-blue-500', 'bg-purple-500'];
          const glowColors = ['bg-teal-400', 'bg-blue-400', 'bg-purple-400'];
          
          return (
            <motion.button
              key={item.id}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? `${dotColors[index]} scale-125`
                  : 'bg-gray-600 hover:bg-gray-400 scale-100'
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
                  className={`absolute inset-0 rounded-full ${glowColors[index]}`}
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
          );
        })}
      </motion.div>
    </section>
  );
}
