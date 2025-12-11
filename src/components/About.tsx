"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { 
  Code2, 
  Rocket, 
  Brain, 
  Layers, 
  Terminal,
  Database,
  Globe,
  Sparkles,
  GraduationCap,
  MapPin,
  Briefcase,
  Trophy
} from "lucide-react";

const AboutSection = () => {
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1, true);
  const { ref: contentRef, isActive: isContentActive } = useOptimizedAnimation(0.1, true);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  // Core competencies with modern icons
  const coreSkills = [
    {
      icon: Globe,
      title: "Full Stack Development",
      description: "End-to-end web applications with Next.js, React & Node.js",
      gradient: "from-teal-500 to-cyan-500",
      hoverBg: "teal"
    },
    {
      icon: Database,
      title: "Database Architecture",
      description: "PostgreSQL, MongoDB, Redis with Prisma ORM",
      gradient: "from-blue-500 to-indigo-500",
      hoverBg: "blue"
    },
    {
      icon: Layers,
      title: "Modern UI/UX",
      description: "Responsive interfaces with Tailwind CSS & Framer Motion",
      gradient: "from-purple-500 to-pink-500",
      hoverBg: "purple"
    },
    {
      icon: Terminal,
      title: "DevOps & Tools",
      description: "Docker, Git, GitHub Actions, CI/CD pipelines",
      gradient: "from-orange-500 to-amber-500",
      hoverBg: "orange"
    }
  ];

  // Quick stats
  const stats = [
    { value: "8+", label: "Projects Built", icon: Code2 },
    { value: "3+", label: "Years Coding", icon: Rocket },
    { value: "5+", label: "Hackathons", icon: Trophy },
    { value: "4+", label: "Certifications", icon: GraduationCap }
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden section-bg"
    >
      {/* Subtle background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16" ref={sectionRef}>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6"
          >
            <Sparkles className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-teal-400 font-semibold tracking-wide">ABOUT ME</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
          >
            <span className="text-white">Turning Ideas Into </span>
            <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
          >
            A passionate developer building enterprise-grade applications with modern technologies
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Profile Card (4 cols) */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isContentActive ? "visible" : "hidden"}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 h-full"
          >
            <div className="h-full">
              <div className="relative group h-full">
                {/* Gradient border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500" />
                
                {/* Card */}
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden h-full flex flex-col">
                  {/* Profile Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/your-profile-image.jpg"
                      alt="Sahil Vishwakarma"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                    
                    {/* Floating badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-400 text-xs font-semibold">
                      Open to Work
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6 -mt-12 relative z-10 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Sahil Vishwakarma
                    </h3>
                    <p className="text-lg bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent font-semibold mb-4">
                      Full Stack Developer
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span>Bhopal, Madhya Pradesh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span>LNCT Bhopal - CSE &apos;26</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-400" />
                        <span>Freelance Developer</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-2 mt-auto pt-6 border-t border-white/10">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center group/stat cursor-default">
                          <div className="text-xl font-bold text-white group-hover/stat:text-teal-400 transition-colors">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content (8 cols) */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isContentActive ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Bio Card */}
            <div className="relative group rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">The Developer Behind the Code</h4>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I&apos;m a <span className="text-teal-400 font-semibold">final year Computer Science student</span> at LNCT Bhopal with a deep passion for building 
                    <span className="text-blue-400 font-semibold"> enterprise-grade web applications</span>. My journey started at Jawahar Navodaya Vidyalaya, Sagar, 
                    where Computer Science as an optional subject sparked my love for programming.
                  </p>
                  <p>
                    With hands-on experience in <span className="text-purple-400 font-semibold">MERN Stack, Next.js, and TypeScript</span>, I specialize in creating 
                    scalable solutions — from <span className="text-pink-400 font-semibold">SaaS platforms handling 50+ concurrent users</span> to AI-powered feedback systems.
                  </p>
                  <p>
                    Beyond code, I&apos;ve actively participated in <span className="text-orange-400 font-semibold">Smart India Hackathon 2024</span> and multiple competitive hackathons, 
                    building innovative solutions like oil spill detection systems using ML.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreSkills.map((skill, index) => {
                const Icon = skill.icon;
                
                return (
                  <motion.div
                    key={index}
                    className="relative group cursor-default overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Background gradient that appears on hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-transparent transition-all duration-300" />
                    <div 
                      className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
                    />
                    
                    <div className="relative h-full p-6 bg-white/[0.02] backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className={`
                          p-3 rounded-xl bg-gradient-to-br ${skill.gradient} 
                          transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg
                        `}
                        style={{ boxShadow: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 10px 40px -10px ${skill.gradient.includes('teal') ? '#14b8a6' : skill.gradient.includes('blue') ? '#3b82f6' : skill.gradient.includes('purple') ? '#8b5cf6' : '#f97316'}50`}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-white mb-1 transition-all duration-300">
                            {skill.title}
                          </h5>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tech Stack Highlight */}
            <div className="relative group rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-4">Primary Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Next.js', color: '#fff' },
                    { name: 'React', color: '#61dafb' },
                    { name: 'TypeScript', color: '#3178c6' },
                    { name: 'Node.js', color: '#339933' },
                    { name: 'PostgreSQL', color: '#336791' },
                    { name: 'MongoDB', color: '#47a248' },
                    { name: 'Prisma', color: '#2d3748' },
                    { name: 'Tailwind CSS', color: '#06b6d4' },
                    { name: 'Redis', color: '#dc382d' },
                    { name: 'Docker', color: '#2496ed' },
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isContentActive ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                      style={{
                        boxShadow: `0 0 20px ${tech.color}10`,
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection as About };
