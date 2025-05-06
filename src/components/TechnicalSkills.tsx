"use client";
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
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

// Updated skill data structure with more categories
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

// Update categories for filtering
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

// Convert icon to texture for 3D rendering
const createSkillIconTexture = (Icon: IconType, color: string): string => {
  // This function creates an SVG with the icon and returns a data URL
  // In a real implementation, you'd use a canvas to render the icon
  // For this example, we'll create a simple placeholder that would be replaced with actual rendering
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${color.replace('#', '%23')}" opacity="0.8"/></svg>`;
};

// Floating skill node in 3D space
const SkillNode = ({ 
  skill, 
  position, 
  isHighlighted, 
  onClick 
}: { 
  skill: Skill, 
  position: [number, number, number], 
  isHighlighted: boolean,
  onClick: () => void 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animate on hover and when highlighted
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Add floating motion
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    
    // Rotate gently
    meshRef.current.rotation.y += 0.005;
    
    // Scale based on hover/highlight state
    const targetScale = hovered || isHighlighted ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Glow effect through opacity
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const targetEmissive = isHighlighted ? 0.5 : hovered ? 0.3 : 0.1;
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        targetEmissive,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color={skill.color} 
          transparent
          opacity={0.8}
          emissive={skill.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Show text label when hovered or highlighted */}
      {(hovered || isHighlighted) && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {skill.name}
        </Text>
      )}
    </group>
  );
};

// Detail panel that appears when a skill is selected
const SkillDetail = ({ skill }: { skill: Skill | null }) => {
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
};

// 3D Skill Cloud Component
const SkillCloud = ({ 
  skills, 
  onSelectSkill 
}: { 
  skills: Skill[], 
  onSelectSkill: (skill: Skill) => void 
}) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { camera } = useThree();
  const orbitControlsRef = useRef<any>(null);
  
  // Distribute skills in 3D space - this creates a sphere-like arrangement
  const skillPositions = skills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    
    return [
      5 * Math.cos(theta) * Math.sin(phi),
      5 * Math.sin(theta) * Math.sin(phi),
      5 * Math.cos(phi)
    ] as [number, number, number];
  });

  return (
    <>
      <OrbitControls 
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={6}
        maxDistance={15}
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial 
          color="#8884ff" 
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={skillPositions[i]}
          isHighlighted={selectedSkill?.name === skill.name}
          onClick={() => {
            setSelectedSkill(skill);
            onSelectSkill(skill);
            
            // Temporarily disable auto-rotation when a skill is selected
            if (orbitControlsRef.current) {
              orbitControlsRef.current.autoRotate = false;
              setTimeout(() => {
                if (orbitControlsRef.current) orbitControlsRef.current.autoRotate = true;
              }, 3000);
            }
          }}
        />
      ))}
    </>
  );
};

// Loading spinner for Suspense
const Loader = () => (
  <div className="flex justify-center items-center h-96">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
  </div>
);

// Main Technical Skills component
const TechnicalSkills = () => {
  const [category, setCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Get all skills or filter by category
  const getDisplayedSkills = () => {
    if (category === 'all') {
      return [
        ...skillsData.frontend,
        ...skillsData.backend,
        ...skillsData.tools,
        ...skillsData.frameworks
      ];
    }
    return skillsData[category as keyof typeof skillsData] || [];
  };

  const displayedSkills = getDisplayedSkills();

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
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h2 className="text-xl md:text-2xl text-teal-600 font-semibold dark:text-teal-400">
              TECH STACK
            </h2>
            <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-3 dark:text-white"
          >
            My Technical Skills
          </motion.h3>
        </div>

        {/* Category filter tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setSelectedSkill(null); // Reset selected skill when changing category
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
        </div>

        {/* 3D Skill Cloud with help text */}
        <div className="text-center mb-4 text-sm text-gray-500 dark:text-gray-400">
          <p>Click and drag to rotate | Scroll to zoom | Click on a skill to view details</p>
        </div>

        {/* Main 3D visualization with detail panel */}
        <div ref={containerRef} className="relative" style={{ height: '600px' }}>
          {/* The 3D canvas */}
          <Canvas className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <Suspense fallback={null}>
              <SkillCloud 
                skills={displayedSkills} 
                onSelectSkill={setSelectedSkill} 
              />
            </Suspense>
          </Canvas>
          
          {/* Detail panel that shows when a skill is selected */}
          <AnimatePresence>
            {selectedSkill && <SkillDetail skill={selectedSkill} />}
          </AnimatePresence>
          
          {/* Mobile view hint */}
          <div className="md:hidden text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Tap and drag to explore skills in 3D space</p>
          </div>
        </div>

        {/* Summary counts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Frontend</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {skillsData.frontend.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Backend</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {skillsData.backend.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Tools</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {skillsData.tools.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Frameworks</h4>
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              {skillsData.frameworks.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;