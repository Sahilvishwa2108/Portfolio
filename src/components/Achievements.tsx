"use client";
import React, { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { certificates as certificatesData } from "@/data";

// Define a proper certificate type
interface Certificate {
  id?: number | string;
  src: string;
  title: string;
  category: number | string;
  content?: string;
  description?: string;
}

// Categories mapping
const categoryNames: Record<number | string, string> = {
  1: "Java",
  2: "Database",
  3: "Presentation Skills",
  4: "Java",
  5: "Web Development",
  6: "Cyber Security",
  7: "Cyber Security",
  8: "Cyber Security",
  9: "Cyber Security",
  10: "Cyber Security",
  11: "Networking",
  12: "Networking",
  13: "Networking",
  14: "Cloud Security",
  15: "Networking",
  16: "Software Engineering",
  17: "Cloud Computing",
  18: "Java",
  19: "C++",
  20: "Angular",
  21: "Communication",
  22: "Soft Skills",
  23: "HTML",
  24: "JavaScript",
  25: "Bootstrap",
  26: "TypeScript",
  27: "CSS"
};

// Optimized 3D Trophy Model component
const TrophyModel = ({ scale = 1.5 }) => {
  const trophyRef = useRef<THREE.Group>(null);
  
  // Simple rotation animation with reduced speed
  useFrame((state) => {
    if (trophyRef.current) {
      // Slower, smoother rotation
      trophyRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={trophyRef} scale={[scale, scale, scale]}>
      {/* Trophy base - simplified geometry */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.2, 24]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#B08D57" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Trophy stem - simplified geometry */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#CFB53B" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Trophy cup - simplified geometry */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.2, 0.8, 24]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Trophy handles - simplified geometry */}
      <mesh position={[0.4, 1.1, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.05, 12, 24, Math.PI]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      <mesh position={[-0.4, 1.1, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.05, 12, 24, Math.PI]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Star on top - simplified */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// Optimized 3D Certificate Card component
const CertificateCard = ({ 
  position = [0, 0, 0] as [number, number, number], 
  rotation = [0, 0, 0] as [number, number, number], 
  scale = 1 
}) => {
  // Simplified to use fewer geometries
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Combined certificate elements into fewer meshes */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Certificate border */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.35, 0.95, 0.01]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
      
      {/* Certificate seal - simplified */}
      <mesh position={[0.45, -0.3, 0.06]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#C0392B" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Hook to create star geometry - moved outside component to avoid React hooks rules
const useStarGeometry = (radius = 1, innerRadius = 0.5, points = 5) => {
  return useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const step = Math.PI / points;
    
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? radius : innerRadius;
      const angle = i * step;
      vertices.push(r * Math.cos(angle), r * Math.sin(angle), 0);
    }
    
    const indices = [];
    for (let i = 0; i < points * 2 - 2; i++) {
      indices.push(0, i + 1, i + 2);
    }
    
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, [radius, innerRadius, points]);
};

// Optimized 3D Badge Model component
const BadgeModel = ({ 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1 
}) => {
  const badgeRef = useRef<THREE.Group>(null);
  const starGeometry = useStarGeometry(0.3, 0.15, 5);
  
  // Reduced animation complexity
  useFrame((state) => {
    if (badgeRef.current) {
      badgeRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
    }
  });
  
  return (
    <group ref={badgeRef} position={position} scale={[scale, scale, scale]}>
      {/* Badge base - simplified geometry */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 24]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#4285F4" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Badge inner circle - simplified */}
      <mesh position={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 24]} /> {/* Reduced segments */}
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Badge star emblem */}
      <mesh position={[0, 0, 0.06]}>
        <primitive object={starGeometry} attach="geometry" />
        <meshStandardMaterial color="#FBBC05" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Optimized 3D Scene component
const AchievementsScene = () => {
  // Use simpler lighting setup for better performance
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 5], fov: 45 }} // Reduced FOV for better focus
      gl={{ antialias: true, powerPreference: 'high-performance' }} // Performance optimization
      performance={{ min: 0.5 }} // Allow frame rate to drop during interaction
    >
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[512, 512]} // Reduced shadow resolution for performance
      />
      
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.5, 0.5]}
        speed={1.5}
        zoom={1.2}
        damping={0.15}
      >
        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
          <TrophyModel scale={1.5} />
          
          <CertificateCard 
            position={[-2.5, -0.5, -1]} 
            rotation={[0.1, 0.4, 0.1]} 
            scale={0.8} 
          />
          <CertificateCard 
            position={[2.5, -0.3, -1]} 
            rotation={[0.1, -0.4, -0.1]} 
            scale={0.8} 
          />
          <BadgeModel 
            position={[-1.5, 1, -1]} 
            scale={0.8} 
          />
        </Float>
      </PresentationControls>
      
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={5} 
        blur={2.5} 
        resolution={256} // Reduced for performance
      />
      <Environment preset="city" />
    </Canvas>
  );
};

// Optimized Certificate Card for UI with framer motion
const Certificate3DCard = ({ 
  certificate, 
  onClick,
  index = 0
}: { 
  certificate: Certificate, 
  onClick: () => void,
  index?: number
}) => {
  const { ref, isActive } = useOptimizedAnimation(0.1, false);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay: index * 0.1 } 
      } : { opacity: 0, y: 20 }}
      whileHover={{ 
        rotateY: 5, 
        rotateX: -5, 
        scale: 1.02, 
        z: 20,
        transition: { duration: 0.3 } 
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px" 
      }}
      className="glass-morphism-strong rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 border border-white/10 h-full flex flex-col cursor-pointer hover-lift transform-gpu"
      onClick={onClick}
    >
      <div className="relative pt-[56.25%]">
        <Image
          src={certificate.src}
          alt={certificate.title}
          fill
          className="absolute inset-0 object-fill hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"} // Prioritize first few images
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 flex items-end"
        >
          <div className="p-4 text-white">
            <p className="text-sm font-medium">View Certificate</p>
          </div>
        </motion.div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow" style={{ transform: "translateZ(10px)" }}>
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 text-xs rounded-full glass-morphism border border-teal-500/20 text-teal-300">
            {certificate.category.toString() in categoryNames ? categoryNames[certificate.category] : "Certificate"}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-white mb-2">
          {certificate.title}
        </h3>
        
        <p className="text-gray-400 text-sm flex-grow">
          {certificate.content?.substring(0, 100)}
          {certificate.content && certificate.content.length > 100 ? '...' : ''}
        </p>
        
        <motion.button 
          className="mt-4 flex items-center gradient-text text-sm font-medium"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export function Achievements() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use optimized animation hook for better performance
  const { ref: sectionRef, isActive } = useOptimizedAnimation(0.1);
  const { ref: carouselSectionRef, isActive: isCarouselActive } = useOptimizedAnimation(0.1, true);

  // Add these for scroll fade effect
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scrollYProgress to opacity - fade out as section leaves viewport
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Load certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        // Use the imported certificates data directly
        if (certificatesData && certificatesData.length > 0) {
          setCertificates(certificatesData);
        } else {
          console.warn("No certificates data found");
        }
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCertificates();
  }, []);

  // Open certificate modal
  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close certificate modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Navigate through carousel
  const navigate = (direction: "next" | "prev") => {
    // Scroll carousel smoothly
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: direction === "next" ? carouselRef.current.scrollLeft + carouselRef.current.offsetWidth : carouselRef.current.scrollLeft - carouselRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="achievements" 
      className="section-bg w-full py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 top-1/2 -left-48 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 right-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section header using the optimized animation pattern */}
          <div className="text-center mb-16" ref={sectionRef}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <h2 className="gradient-text text-xl md:text-2xl font-semibold">
                RECOGNITION
              </h2>
              <div className="h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 mt-1 rounded-full"></div>
            </motion.div>

            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mt-3 text-white"
            >
              My Certificates & Achievements
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-gray-400 max-w-2xl mx-auto"
            >
              Professional certifications and achievements that highlight my continuous learning journey and expertise in various technological domains.
            </motion.p>
          </div>

          {/* 3D Trophy Scene - Optimized rendering */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[300px] mb-16 relative"
            style={{
              perspective: "1000px",
            }}
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-t-transparent border-teal-500 rounded-full animate-spin"></div>
              </div>
            }>
              <AchievementsScene />
            </Suspense>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No certificates found.</p>
            </div>
          ) : (
            <>
              {/* Featured Certificates with optimized rendering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {certificates.slice(0, 3).map((certificate, index) => (
                  <Certificate3DCard
                    key={certificate.id}
                    certificate={certificate}
                    onClick={() => openModal(certificate)}
                    index={index}
                  />
                ))}
              </div>

              {/* Certificate Carousel - Optimized rendering */}
              <motion.div 
                ref={carouselSectionRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isCarouselActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mt-12 mb-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">More Certificates</h3>
                  <div className="flex gap-2">
                    <motion.button 
                      onClick={() => navigate("prev")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full glass-morphism hover:bg-teal-500/10 transition-colors border border-white/10"
                      aria-label="Previous certificates"
                    >
                      <ChevronLeft className="h-5 w-5 text-teal-400" />
                    </motion.button>
                    <motion.button 
                      onClick={() => navigate("next")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full glass-morphism hover:bg-teal-500/10 transition-colors border border-white/10"
                      aria-label="Next certificates"
                    >
                      <ChevronRight className="h-5 w-5 text-teal-400" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Virtualized carousel for better performance */}
                <div 
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-1 snap-x snap-mandatory"
                  style={{ perspective: "1000px" }}
                >
                  {certificates.slice(3).map((certificate, index) => (
                    <motion.div
                      key={certificate.id}
                      className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start transform-gpu" // Combined classes
                      onClick={() => openModal(certificate)}
                      initial={{ opacity: 0, rotateY: -10, z: -100 }}
                      animate={{ 
                        opacity: 1, 
                        rotateY: 0, 
                        z: 0,
                        transition: { delay: Math.min(index * 0.05, 0.5), duration: 0.4 } 
                      }}
                      whileHover={{ 
                        rotateY: 5, 
                        rotateX: -3, 
                        scale: 1.04, 
                        z: 10,
                        transition: { duration: 0.2 } 
                      }}
                      style={{ 
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        willChange: "transform" // Optimization hint
                      }}
                    >
                      <div className="glass-morphism-strong rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 border border-white/10 h-full flex flex-col cursor-pointer">
                        <div className="relative pt-[56.25%]">
                          <Image
                            src={certificate.src}
                            alt={certificate.title}
                            fill
                            className="absolute inset-0 object-fill hover:scale-105 transition-transform duration-500"
                            sizes="280px"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="p-4" style={{ transform: "translateZ(10px)" }}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="px-2 py-0.5 text-xs rounded-full glass-morphism border border-teal-500/20 text-teal-300 text-[10px]">
                              {certificate.category.toString() in categoryNames ? categoryNames[certificate.category] : "Certificate"}
                            </span>
                          </div>
                          
                          <h4 className="font-medium text-white text-sm line-clamp-1">
                            {certificate.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Certificate Modal - Optimized for performance */}
      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Faster transition
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 5 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 5 }}
              transition={{ type: "spring", damping: 20 }}
              className="glass-morphism-strong rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform-gpu border border-white/10"
              style={{ willChange: "transform" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Certificate image with proper aspect ratio */}
                <div className="relative w-full pt-[65%] bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={selectedCertificate.src}
                    alt={selectedCertificate.title}
                    fill
                    className="absolute inset-0 object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority={true} // Always load modal image immediately
                  />
                </div>
                
                {/* Close button */}
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full p-2 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
              </div>
              
              {/* Certificate details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full glass-morphism border border-teal-500/20 text-teal-300">
                      {selectedCertificate.category.toString() in categoryNames ? categoryNames[selectedCertificate.category] : "Certificate"}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      {selectedCertificate.title}
                    </h3>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link href={selectedCertificate.src} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white transition-all text-sm">
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      View Full Size
                    </Link>
                  </motion.div>
                </div>
                
                <p className="text-gray-400">
                  {selectedCertificate.content || "Professional certification highlighting expertise and skill development."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}