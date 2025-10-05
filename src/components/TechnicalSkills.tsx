"use client";
import React, { useState, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
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

// Skill data
const skillsData = {
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", level: 85 },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 80 },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 95 },
    { name: "Framer Motion", icon: SiFramer, color: "#FF0055", level: 75 },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 90 },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 85 },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 88 },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
    { name: "Express", icon: SiExpress, color: "#FFFFFF", level: 80 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70 },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 75 },
    { name: "Redis", icon: SiRedis, color: "#DC382D", level: 65 },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 70 },
    { name: "Java", icon: DiJava, color: "#007396", level: 80 },
    { name: "Socket.io", icon: SiSocketdotio, color: "#FFFFFF", level: 65 },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF", level: 85 },
    { name: "Docker", icon: SiDocker, color: "#2496ED", level: 70 },
    { name: "Linux", icon: SiLinux, color: "#FCC624", level: 75 },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 80 },
    { name: "AWS", icon: SiAmazon, color: "#FF9900", level: 65 },
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

// Memoized skill detail panel
const SkillDetail = React.memo(({ skill }: { skill: Skill | null }) => {
  if (!skill) return null;
  
  const Icon = skill.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-morphism-strong p-6 rounded-2xl max-w-xs z-50 hidden md:flex flex-col"
    >
      <div className="flex flex-col items-center">
        <div className="text-5xl mb-4" style={{ color: skill.color }}>
          <Icon />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white text-center">
          {skill.name}
        </h3>
        
        <div className="w-full bg-white/10 rounded-full h-3 mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-3 rounded-full" 
            style={{ backgroundColor: skill.color }}
          ></motion.div>
        </div>
        
        <p className="text-sm text-gray-300">
          Proficiency: <span className="font-bold" style={{ color: skill.color }}>{skill.level}%</span>
        </p>
      </div>
    </motion.div>
  );
});

SkillDetail.displayName = 'SkillDetail';

// 3D skill sphere component
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
  
  // Make sphere face camera
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
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial 
        color={skill.color} 
        opacity={0.85}
        transparent
        emissive={skill.color}
        emissiveIntensity={selected || hover ? 0.8 : 0.3}
        metalness={0.3}
        roughness={0.2}
      />
      
      {/* Icon on sphere */}
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
          style={{ pointerEvents: 'none', width: '24px', height: '24px' }}
        >
          <Icon size={16} />
        </div>
      </Html>
      
      {/* Name label */}
      {(hover || selected) && (
        <Html
          center
          position={[0, 1.3, 0]}
          distanceFactor={15}
          sprite
        >
          <div 
            className="px-3 py-2 glass-morphism-strong text-white rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg"
            style={{ pointerEvents: 'none' }}
          >
            {skill.name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

// 3D Skills Cloud - Stable and optimized
const SkillCloud = ({ 
  skills, 
  onSelectSkill 
}: { 
  skills: Skill[], 
  onSelectSkill: (skill: Skill) => void 
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const orbitControlsRef = useRef<any>(null);
  
  // Efficient position calculation
  const skillPositions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      return [
        5 * Math.cos(theta) * Math.sin(phi),
        5 * Math.sin(theta) * Math.sin(phi),
        5 * Math.cos(phi)
      ] as [number, number, number];
    });
  }, [skills]);

  return (
    <>
      <OrbitControls 
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minDistance={8}
        maxDistance={18}
        rotateSpeed={0.6}
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 8]} intensity={1.2} />
      <directionalLight position={[-10, -10, -8]} intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#14b8a6" />
      
      {/* Skill spheres */}
      {skills.map((skill, i) => (
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
      
      {/* Central connecting lines effect - optional, can be removed if causing issues */}
    </>
  );
};

// Main Technical Skills component
const TechnicalSkills = () => {
  const [category, setCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1);

  // Memoize displayed skills
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

  return (
    <section id="skills" className="py-24 relative overflow-hidden section-bg">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16" ref={sectionRef}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl font-semibold gradient-text">
              TECH STACK
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-2 rounded-full"></div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mt-4 text-white"
          >
            My Technical <span className="gradient-text">Arsenal</span>
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg"
          >
            Explore my toolkit of technologies and frameworks - interact with the 3D visualization
          </motion.p>
        </div>

        {/* Category filter tabs */}
        <motion.div 
          className="flex justify-center flex-wrap gap-3 mb-12"
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
                px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                ${category === cat.id
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/50"
                  : "glass-morphism text-gray-300 hover:bg-white/10"
                }
              `}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Skills visualization */}
        <motion.div 
          className="relative glass-morphism-strong rounded-3xl p-4 overflow-hidden shadow-2xl"
          style={{ height: '600px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Canvas className="rounded-2xl">
            <Suspense fallback={
              <Html center>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-t-teal-500 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                </div>
              </Html>
            }>
              <SkillCloud 
                skills={displayedSkills} 
                onSelectSkill={setSelectedSkill}
              />
            </Suspense>
          </Canvas>
          
          {/* Detail panel */}
          <AnimatePresence>
            {selectedSkill && <SkillDetail skill={selectedSkill} />}
          </AnimatePresence>
          
          {/* Instructions */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-morphism px-4 py-2 rounded-full text-sm text-gray-300">
            <span className="hidden md:inline">Click on spheres • Drag to rotate • Scroll to zoom</span>
            <span className="md:hidden">Tap to select • Drag to explore</span>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Frontend", count: skillsData.frontend.length, gradient: "from-teal-500 to-cyan-500" },
            { label: "Backend", count: skillsData.backend.length, gradient: "from-blue-500 to-indigo-500" },
            { label: "Tools", count: skillsData.tools.length, gradient: "from-purple-500 to-pink-500" },
            { label: "Frameworks", count: skillsData.frameworks.length, gradient: "from-pink-500 to-rose-500" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="glass-morphism-strong p-6 rounded-2xl text-center hover-lift"
            >
              <h4 className="text-lg font-semibold text-gray-300 mb-2">{stat.label}</h4>
              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.count}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
