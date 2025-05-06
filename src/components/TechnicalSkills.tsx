"use client";
import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiRedis,
  SiGit, SiDocker, SiGithub, SiFirebase, SiCloudflare,
  SiJavascript, SiHtml5, SiCss3, SiLinux,
  SiPrisma, SiPostman, SiAmazon, SiZod, SiAuth0,
  SiSocketdotio, SiCloudinary
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { IconType } from 'react-icons';
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

// Skill data moved outside component to prevent recreation on re-renders
const skillsData = {
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 80 },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 95 },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF", level: 75 },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 90 },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 85 },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 88 },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
    { name: "Express", icon: SiExpress, color: "#000000", level: 80 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70 },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 75 },
    { name: "Redis", icon: SiRedis, color: "#DC382D", level: 65 },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 70 },
    { name: "Java", icon: DiJava, color: "#007396", level: 80 },
    { name: "Socket.io", icon: SiSocketdotio, color: "#010101", level: 65 },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
    { name: "GitHub", icon: SiGithub, color: "#181717", level: 85 },
    { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
    { name: "Linux", icon: SiLinux, color: "#FCC624", level: 75 },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 80 },
    { name: "AWS", icon: SiAmazon, color: "#232F3E", level: 65 },
    { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5", level: 75 },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 80 },
  ],
  frameworks: [
    { name: "NextAuth", icon: SiAuth0, color: "#EB5424", level: 75 },
    { name: "Zod", icon: SiZod, color: "#3068B7", level: 70 },
    { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", level: 75 },
  ]
};

const categories = [
  { id: "all", name: "All Skills" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "tools", name: "DevOps & Tools" },
  { id: "frameworks", name: "Libraries & Frameworks" }
];

interface Skill {
  name: string;
  icon: IconType;
  color: string;
  level: number;
}

// Optimized skill detail panel - Memoized
const SkillDetail = React.memo(({ skill }: { skill: Skill | null }) => {
  if (!skill) return null;
  
  const Icon = skill.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xs backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4" style={{ color: skill.color }}>
          <Icon />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {skill.name}
        </h3>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Proficiency: {skill.level}%
        </p>
      </div>
    </motion.div>
  );
});

SkillDetail.displayName = 'SkillDetail';

// Performance-optimized 2D skill grid with improved styling
const SkillsGrid = ({ 
  skills, 
  onSelectSkill 
}: { 
  skills: Skill[], 
  onSelectSkill: (skill: Skill) => void 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 p-4 overflow-y-auto max-h-[calc(100%-2rem)] pb-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.03, 0.8), duration: 0.4 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
          className="bg-white dark:bg-gray-800 rounded-xl p-3 cursor-pointer flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 aspect-square"
          onClick={() => onSelectSkill(skill)}
        >
          <div className="flex items-center justify-center h-12 mb-2.5">
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ backgroundColor: `${skill.color}20` }} // Light background matching skill color
            >
              <skill.icon size={18} color={skill.color} />
            </div>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 text-center line-clamp-2">
            {skill.name}
          </p>
          
          {/* Small proficiency indicator */}
          <div className="w-full mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full" 
              style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// A 3D skill sphere with icon
const SkillSphere = ({ 
  skill, 
  position, 
  selected, 
  onClick 
}: { 
  skill: Skill, 
  position: [number, number, number], 
  selected: boolean,
  onClick: () => void  
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [hover, setHover] = useState(false);
  
  // Make the sphere face the camera
  useFrame(() => {
    if (sphereRef.current && camera) {
      sphereRef.current.quaternion.copy(camera.quaternion);
    }
  });
  
  const Icon = skill.icon;
  
  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      ref={sphereRef}
    >
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial 
        color={skill.color} 
        opacity={0.8}
        transparent
        emissive={skill.color}
        emissiveIntensity={selected || hover ? 0.7 : 0.2}
      />
      
      {/* Icon displayed on the sphere */}
      <Html
        center
        distanceFactor={15}
        sprite
        transform
        occlude
        position={[0, 0, 0.1]}
      >
        <div 
          className="text-white flex items-center justify-center"
          style={{ pointerEvents: 'none', width: '20px', height: '20px' }}
        >
          <Icon size={14} />
        </div>
      </Html>
      
      {/* Name label that appears on hover or selection */}
      {(hover || selected) && (
        <Html
          center
          position={[0, 1.2, 0]}
          distanceFactor={15}
          sprite
        >
          <div 
            className="px-2 py-1 bg-black bg-opacity-70 text-white rounded text-xs whitespace-nowrap"
            style={{ pointerEvents: 'none' }}
          >
            {skill.name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Optimized 3D visualization with reduced complexity - Only loaded if device is powerful enough
const OptimizedSkillCloud = ({ 
  skills, 
  onSelectSkill,
  performance = 'low' // low, medium, high
}: { 
  skills: Skill[], 
  onSelectSkill: (skill: Skill) => void,
  performance: string
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const orbitControlsRef = useRef<any>(null);

  // Reduce number of particles based on performance level
  const displaySkills = useMemo(() => {
    if (performance === 'high') return skills;
    if (performance === 'medium') return skills.slice(0, Math.ceil(skills.length / 2));
    return skills.slice(0, Math.min(8, skills.length)); // Show max 8 skills on low performance
  }, [skills, performance]);
  
  // Efficient position calculation with useMemo
  const skillPositions = useMemo(() => {
    return displaySkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / displaySkills.length);
      const theta = Math.sqrt(displaySkills.length * Math.PI) * phi;
      
      return [
        4 * Math.cos(theta) * Math.sin(phi),
        4 * Math.sin(theta) * Math.sin(phi),
        4 * Math.cos(phi)
      ] as [number, number, number];
    });
  }, [displaySkills]);

  return (
    <>
      <OrbitControls 
        ref={orbitControlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={6}
        maxDistance={15}
        rotateSpeed={0.5}
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      
      {/* Simple ambient background */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#8884ff" 
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Skill spheres with icons */}
      {displaySkills.map((skill, i) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          position={skillPositions[i]}
          selected={selected === skill.name}
          onClick={() => {
            setSelected(skill.name);
            onSelectSkill(skill);
          }}
        />
      ))}
    </>
  );
};

// Main Technical Skills component with performance optimizations
const TechnicalSkills = () => {
  const [category, setCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [showVisual, setShowVisual] = useState<'2d' | '3d'>('2d');
  
  // Use the optimized animation hook for better performance
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1);
  
  // Only run client-side performance check once on mount
  useEffect(() => {
    setIsMounted(true);
    
    // Simple performance check
    const checkPerformance = () => {
      const start = performance.now();
      let sum = 0;
      for (let i = 0; i < 100000; i++) {
        sum += Math.random();
      }
      const duration = performance.now() - start;
      
      // Determine performance level based on execution time
      if (duration < 5) {
        setPerformanceLevel('high');
        setShowVisual('3d');
      } else if (duration < 15) {
        setPerformanceLevel('medium');
        // Let user choose on medium devices
        const preferredVisual = localStorage.getItem('preferred-skills-visual');
        setShowVisual(preferredVisual === '3d' ? '3d' : '2d');
      } else {
        setPerformanceLevel('low');
        setShowVisual('2d');
      }
    };
    
    // Run performance check
    checkPerformance();
    
    return () => setIsMounted(false);
  }, []);

  // Memoize displayed skills to prevent recalculation
  const displayedSkills = useMemo(() => {
    if (category === 'all') {
      return [
        ...skillsData.frontend,
        ...skillsData.backend,
        ...skillsData.tools,
        ...skillsData.frameworks
      ];
    }
    return skillsData[category as keyof typeof skillsData] || [];
  }, [category]);

  // Toggle between 2D and 3D view for medium-performance devices
  const toggleVisual = () => {
    const newVisual = showVisual === '2d' ? '3d' : '2d';
    setShowVisual(newVisual);
    localStorage.setItem('preferred-skills-visual', newVisual);
  };

  if (!isMounted) {
    return null; // Prevent SSR issues with ThreeJS
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black -z-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header using the optimized animation pattern */}
        <div className="text-center mb-12" ref={sectionRef}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
              TECH STACK
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
          >
            My Technical Skills
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Technologies and tools I've worked with professionally and in personal projects
          </motion.p>
        </div>

        {/* Category filter tabs - Using improved animation pattern */}
        <motion.div 
          className="flex justify-center flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setSelectedSkill(null); 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${category === cat.id
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }
              `}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Toggle 2D/3D view for medium performance devices */}
        {performanceLevel === 'medium' && (
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button 
              onClick={toggleVisual} 
              className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-teal-100 hover:text-teal-800 dark:hover:bg-teal-900/30 dark:hover:text-teal-300 transition-colors"
            >
              Switch to {showVisual === '2d' ? '3D' : '2D'} View
            </button>
            <p className="text-xs text-gray-500 mt-1">
              3D view may affect performance on some devices
            </p>
          </motion.div>
        )}

        {/* Skills visualization - conditional rendering based on performance */}
        <motion.div 
          ref={containerRef} 
          className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-3 overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700/50"
          style={{ height: '500px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {showVisual === '3d' ? (
            <Canvas className="rounded-xl overflow-hidden">
              <Suspense fallback={
                <Html center>
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="w-8 h-8 border-4 border-t-teal-500 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                  </div>
                </Html>
              }>
                <OptimizedSkillCloud 
                  skills={displayedSkills} 
                  onSelectSkill={setSelectedSkill}
                  performance={performanceLevel}
                />
              </Suspense>
            </Canvas>
          ) : (
            <SkillsGrid 
              skills={displayedSkills} 
              onSelectSkill={setSelectedSkill} 
            />
          )}
          
          {/* Detail panel that shows when a skill is selected */}
          <AnimatePresence>
            {selectedSkill && <SkillDetail skill={selectedSkill} />}
          </AnimatePresence>
        </motion.div>

        {/* Summary counts with improved animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Frontend</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {skillsData.frontend.length}
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Backend</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {skillsData.backend.length}
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Tools</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {skillsData.tools.length}
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50"
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Frameworks</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              {skillsData.frameworks.length}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;