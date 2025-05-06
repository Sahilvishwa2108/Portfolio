"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Text,
  PerspectiveCamera,
  MeshDistortMaterial,
  Environment,
  Sphere,
  Torus,
  MeshWobbleMaterial
} from "@react-three/drei";
import { Group } from "three";
import Link from "next/link";

// Define type interfaces
interface AnimatedTextProps {
  showGreeting: boolean;
  showName: boolean;
  showIntro?: boolean; // Added missing property
}

interface Particle {
  position: [number, number, number];
  size: number;
  color: string;
  id: number;
}

const Hero = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Either use the mousePosition state or simply remove it
  // Option 1: Remove the state and related handlers if not needed
  
  // Animation states
  const [showGreeting, setShowGreeting] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  
  // Parallax effect for content
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Option 2: Keep the mouse tracking but use it somewhere
  // This creates a ref that makes the state "used" for ESLint
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  const handleMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
    // Now we're using the ref instead of the state
  };

  // Trigger animations sequentially
  useEffect(() => {
    const timeoutGreeting = setTimeout(() => setShowGreeting(true), 500);
    const timeoutIntro = setTimeout(() => setShowIntro(true), 1200);
    const timeoutName = setTimeout(() => setShowName(true), 1900);
    const timeoutCTA = setTimeout(() => setShowCTA(true), 2500);
    const loadedTimeout = setTimeout(() => setIsLoaded(true), 1000);

    return () => {
      clearTimeout(timeoutGreeting);
      clearTimeout(timeoutIntro);
      clearTimeout(timeoutName);
      clearTimeout(timeoutCTA);
      clearTimeout(loadedTimeout);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* 3D Background remains unchanged */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 pointer-events-none">
        <Canvas dpr={[1, 2]} className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={55} />
          <Suspense fallback={null}>
            <color attach="background" args={["#050505"]} />
            
            {/* Dynamic 3D scene */}
            <DynamicBackground />
            
            {/* Ambient light */}
            <ambientLight intensity={0.2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            
            {/* Environment map for realistic reflections */}
            <Environment preset="city" />
            
            {/* Animated text in 3D space */}
            <AnimatedText
              showGreeting={showGreeting}
              showIntro={showIntro}
              showName={showName}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Text content overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl w-full flex flex-col items-center">
          {/* Animated text with gradient - unchanged */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            {/* Line 1: "Hey, I'm" */}
            <motion.div 
              className="overflow-hidden mb-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="text-xl md:text-2xl text-teal-400 font-medium">
                <AnimatedLetters text="Hey, I'm" />
              </h2>
            </motion.div>
            
            {/* Line 3: "Sahil Vishwakarma" */}
            <motion.div 
              className="overflow-hidden mt-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-300 to-cyan-300">
                <AnimatedLetters text="Sahil Vishwakarma" delay={1.9} />
              </h1>
            </motion.div>
            
          </motion.div>
        </div>
        
        {/* Scroll indicator remains unchanged */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop"
            }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
            <svg 
              className="w-6 h-6 text-teal-500" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* BUTTONS - Properly positioned at 60% from top, centered */}
      <div className="relative top-[77%] left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 justify-center items-center z-[9999] pointer-events-auto">
        <AnimatePresence>
          {showCTA && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href="https://drive.google.com/file/d/1XBDUNiAFqqSSmTG0vVb4het3jOX01-Ss/view?usp=sharing" target="_blank">
                  <GlowingButton className="bg-black border-neutral-600 text-white">
                    <BlurIn word="Resume" />
                  </GlowingButton>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="mailto:sahilvishwa2108@gmail.com">
                  <GlowingButton className="bg-white text-black border-black">
                    <BlurIn word="Hire Me" />
                  </GlowingButton>
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Letter-by-letter animation component
const AnimatedLetters = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.05,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};


// 3D Text Component - Adjusted positioning for better overall layout
const AnimatedText = ({ showGreeting, showName }: AnimatedTextProps) => {
  const { size } = useThree();
  const textRef = useRef<Group>(null);
  
  // Calculate responsive text sizing
  const fontSize = {
    greeting: size.width < 600 ? 0.7 : 0.9,
    name: size.width < 600 ? 0.9 : 1.3,
  };
  
  // Fixed positions with more vertical separation
  const positions: {
    greeting: [number, number, number];
    name: [number, number, number];
  } = {
    greeting: [0, 2.2, 0],  // Moved up for better spacing
    name: [0, -0.8, 0],     // Moved down for better spacing
  };

  // Automatic gentle animation
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.getElapsedTime();
      textRef.current.rotation.y = Math.sin(time * 0.3) * 0.08;
      textRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;
    }
  });
  
  return (
    <group ref={textRef} position={[0, 0, 5]}>
      {showGreeting && (
        <Float
          speed={1.5}
          rotationIntensity={0.15}
          floatIntensity={0.4}
          floatingRange={[-0.08, 0.08]}
        >
          <Text
            fontSize={fontSize.greeting}
            position={positions.greeting}
            color="#14b8a6"
            letterSpacing={0.05}
            textAlign="center"
            outlineWidth={0.01}
            outlineColor="#0d9488"
            maxWidth={8}
          >
            Hey, I&apos;m
            <meshStandardMaterial 
              color="#14b8a6" 
              metalness={0.6}
              roughness={0.2}
              emissive="#14b8a6"
              emissiveIntensity={0.3}
            />
          </Text>
        </Float>
      )}

      {showName && (
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.4}
          floatingRange={[-0.15, 0.15]}
        >
          <Text
            fontSize={fontSize.name}
            position={positions.name}
            color="white"
            letterSpacing={0.08}
            textAlign="center"
            outlineWidth={0.02}
            outlineColor="#0d9488"
            maxWidth={8}
          >
            SAHIL VISHWAKARMA
            <meshPhysicalMaterial 
              color="white" 
              metalness={0.7}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.2}
              emissive="#14b8a6"
              emissiveIntensity={0.2}
            />
          </Text>
        </Float>
      )}
    </group>
  );
};

// Dynamic 3D Background - Unchanged
const DynamicBackground = () => {
  const groupRef = useRef<Group>(null);
  
  // Create particles
  const particles: Particle[] = [];
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 15;
    const z = (Math.random() - 0.5) * 10;
    const size = Math.random() * 0.5 + 0.1;
    const color = [
      "#14b8a6", // teal-500
      "#0ea5e9", // sky-500
      "#a855f7", // purple-500
      "#121212", // dark-900
      "#1e293b", // slate-800
    ][Math.floor(Math.random() * 5)];
    
    particles.push({ position: [x, y, z], size, color, id: i });
  }
  
  // Automatic gentle animation using clock instead of mouse
  useFrame((state) => {
    if (groupRef.current) {
      // Create gentle automatic rotation using sine and cosine for smooth oscillation
      const time = state.clock.getElapsedTime();
      
      // Slow, gentle automatic movement
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.05;
      groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      {particles.map((particle) => (
        <Float
          key={particle.id}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={2}
          position={particle.position}
        >
          {particle.id % 3 === 0 ? (
            <Sphere args={[particle.size, 16, 16]}>
              <MeshDistortMaterial
                color={particle.color}
                speed={2}
                distort={0.4}
                opacity={0.7}
                transparent
              />
            </Sphere>
          ) : particle.id % 3 === 1 ? (
            <Torus args={[particle.size, particle.size / 3, 16, 32]} rotation={[Math.random() * Math.PI, 0, 0]}>
              <MeshWobbleMaterial
                color={particle.color}
                factor={0.4}
                speed={2}
                opacity={0.7}
                transparent
              />
            </Torus>
          ) : (
            <mesh>
              <icosahedronGeometry args={[particle.size, 1]} />
              <meshStandardMaterial
                color={particle.color}
                metalness={0.8}
                roughness={0.2}
                opacity={0.7}
                transparent
              />
            </mesh>
          )}
        </Float>
      ))}
      
      {/* Main glowing orb */}
      <Float
        speed={1}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[0, 0, -5]}
      >
        <Sphere args={[3, 64, 64]}>
          <MeshDistortMaterial
            color="#14b8a6"
            speed={3}
            distort={0.4}
            opacity={0.15}
            transparent
          />
        </Sphere>
      </Float>
    </group>
  );
};


// GlowingButton component with hover effect
interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: React.ReactNode | string | undefined;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, className, ...props }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      <button 
        className={`relative px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center font-semibold ${className || ''}`} 
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

// Text animation component
interface BlurInProps {
  word: string;
}

const BlurIn: React.FC<BlurInProps> = ({ word }) => {
  return (
    <span className="inline-block overflow-hidden font-medium">
      <motion.span
        initial={{ filter: "blur(8px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  );
};

export default Hero;