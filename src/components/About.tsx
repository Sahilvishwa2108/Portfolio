"use client"
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Float } from "@react-three/drei";
import { Mesh } from 'three';
import Image from "next/image"; // Added Image import from Next.js

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for content
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.3, 0.9], [0, 0.5, 1, 1, 0]);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black -z-10"></div>
      
      {/* 3D Model Container (Fixed position) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[80vh] max-w-4xl mx-auto opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            
            <Float
              speed={3} // Animation speed, defaults to 1
              rotationIntensity={1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, defaults to 1
            >
              <Model />
            </Float>
            
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center mb-16 mt-10"
          style={{ opacity }}
        >
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            ABOUT ME
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mt-2 dark:text-white text-black mb-4">
            Where I&apos;ve Worked
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            style={{ y, opacity }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-500 to-blue-600 p-1 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-blue-600/30 backdrop-blur-sm"></div>
              <div className="profile-image-container">
                <Image 
                  src="/your-profile-image.jpg" // Replace with your image
                  alt="Sahil Vishwakarma"
                  width={200} 
                  height={200}
                  priority
                  className="rounded-xl relative z-10 w-full"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-200 dark:bg-teal-900/30 rounded-full blur-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-xl -z-10"></div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]), opacity }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Full Stack Developer & UI/UX Enthusiast</h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              I&apos;m a passionate Full Stack Developer with expertise in creating modern web applications. 
              My journey in programming began with a curiosity about how websites work, and it has evolved 
              into a deep passion for building efficient, user-friendly digital experiences.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              I specialize in React, Next.js, and TypeScript for frontend development, while utilizing 
              Node.js and various databases for backend solutions. My approach combines technical precision 
              with creative problem-solving to build applications that are not just functional, but also 
              intuitive and engaging for users.
            </p>

            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">What I bring to the table:</h4>
              <ul className="space-y-2">
                {[
                  "Modern frontend development with React & Next.js",
                  "Responsive designs using Tailwind CSS",
                  "RESTful API development",
                  "Database design and management",
                  "Performance optimization",
                  "Clean, maintainable code"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <svg className="h-5 w-5 text-teal-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              className="pt-4"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a 
                href="#recent-projects" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                View My Work
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3D Model Component
function Model() {
  const mesh = useRef<Mesh>(null);
  const group1 = useRef<Mesh>(null);
  const group2 = useRef<Mesh>(null);
  const group3 = useRef<Mesh>(null);
  
  // Animate the 3D model
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
    
    if (group1.current) {
      group1.current.rotation.y = state.clock.getElapsedTime();
    }
    
    if (group2.current) {
      group2.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    }
    
    if (group3.current) {
      group3.current.rotation.z = state.clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <group ref={mesh}>
      {/* Core cube */}
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.2} />
      </RoundedBox>
      
      {/* Orbiting elements */}
      <group ref={group1} rotation={[0, 0, 0]}>
        <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.1} position={[0, 0, 2]} smoothness={4}>
          <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      <group ref={group2} rotation={[0, 0, 0]}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} position={[2, 0, 0]} smoothness={4}>
          <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      <group ref={group3} rotation={[0, 0, 0]}>
        <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} position={[0, 2, 0]} smoothness={4}>
          <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.2} />
        </RoundedBox>
      </group>
      
      {/* Inner elements */}
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.2} position={[0, 0, 0]} smoothness={4}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} metalness={1} roughness={0} />
      </RoundedBox>
    </group>
  );
}

export default AboutSection;