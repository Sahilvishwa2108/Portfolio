"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { Code2, Rocket, Brain, Heart, Award, Zap } from "lucide-react";

const AboutSection = () => {
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1);
  const { ref: contentRef, isActive: isContentActive } = useOptimizedAnimation(0.15, true);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Fast Performance",
      description: "Optimized for speed and efficiency",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Brain,
      title: "Problem Solver",
      description: "Creative solutions to complex challenges",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "User Focused",
      description: "Building delightful user experiences",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Attention to detail in every project",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Zap,
      title: "Always Learning",
      description: "Staying updated with latest tech",
      color: "from-yellow-500 to-green-500"
    }
  ];
  
  return (
    <section
      id="about"
      className="min-h-screen py-24 relative overflow-hidden section-bg"
      ref={containerRef}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <div className="text-center mb-16" ref={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl font-semibold gradient-text">
              ABOUT ME
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-2 rounded-full"></div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mt-4 text-white"
          >
            Crafting Digital{" "}
            <span className="gradient-text">Experiences</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg"
          >
            A passionate developer dedicated to building innovative solutions and creating seamless user experiences
          </motion.p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Left side - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isContentActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="relative"
          >
            <div className="glass-morphism-strong rounded-3xl p-8 hover-lift">
              {/* Profile Image Container */}
              <div className="relative mb-8 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/your-profile-image.jpg"
                    alt="Sahil Vishwakarma"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center mb-6">
                <h4 className="text-3xl font-bold text-white mb-2">
                  Sahil Vishwakarma
                </h4>
                <p className="text-xl gradient-text font-semibold">
                  Full Stack Developer
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Bhopal, India</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">30+</div>
                  <div className="text-sm text-gray-400 mt-1">Projects</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-2xl font-bold text-blue-400">4+</div>
                  <div className="text-sm text-gray-400 mt-1">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">25+</div>
                  <div className="text-sm text-gray-400 mt-1">Certificates</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isContentActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="space-y-6"
          >
            {/* Main Description */}
            <div className="glass-morphism-strong rounded-2xl p-6 md:p-8">
              <h5 className="text-2xl font-bold text-white mb-4">
                Who I Am
              </h5>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I&apos;m a <span className="text-teal-400 font-semibold">Full Stack Developer</span> with a passion for creating 
                  elegant solutions to complex problems. My journey in tech started with curiosity and has evolved into 
                  a deep commitment to building applications that make a difference.
                </p>
                <p>
                  I specialize in <span className="text-blue-400 font-semibold">React, Next.js, and TypeScript</span> for 
                  frontend development, while leveraging <span className="text-purple-400 font-semibold">Node.js and modern databases</span> for 
                  robust backend solutions. Every project is an opportunity to learn, grow, and push boundaries.
                </p>
                <p>
                  Beyond code, I&apos;m passionate about <span className="text-pink-400 font-semibold">UI/UX design</span>, 
                  performance optimization, and staying at the forefront of web technologies.
                </p>
              </div>
            </div>

            {/* What I Do Section */}
            <div className="glass-morphism-strong rounded-2xl p-6 md:p-8">
              <h5 className="text-2xl font-bold text-white mb-6">
                What I Bring
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                        hoveredCard === index
                          ? "bg-white/10 scale-105"
                          : "bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-1">
                            {item.title}
                          </h6>
                          <p className="text-sm text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {hoveredCard === index && (
                        <motion.div
                          layoutId="highlight-border"
                          className={`absolute inset-0 rounded-xl border-2 bg-gradient-to-br ${item.color} opacity-20`}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4"
            >
              <a
                href="#projects"
                className="flex-1 group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-center transition-all hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="#contact"
                className="flex-1 group relative overflow-hidden px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-center transition-all hover:scale-105 hover:border-white/40 hover:bg-white/5"
              >
                <span className="relative z-10">Get In Touch</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export { AboutSection as About };