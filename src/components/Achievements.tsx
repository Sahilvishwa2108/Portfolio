"use client";
import React, { useEffect, useState, useRef, Suspense, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

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

// 3D Trophy Model component
const TrophyModel = ({ scale = 1.5 }) => {
  const trophyRef = useRef<THREE.Group>(null);
  
  // Simple rotation animation
  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={trophyRef} scale={[scale, scale, scale]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        {/* Trophy base */}
        <cylinderGeometry args={[0.5, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#B08D57" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Trophy stem */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#CFB53B" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Trophy cup */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.2, 0.8, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Trophy handles */}
      <mesh position={[0.4, 1.1, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      <mesh position={[-0.4, 1.1, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.15, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Star on top */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// 3D Certificate Card component - Fixed position and rotation types
const CertificateCard = ({ 
  position = [0, 0, 0] as [number, number, number], 
  rotation = [0, 0, 0] as [number, number, number], 
  scale = 1 
}) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Certificate paper */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Certificate border */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.35, 0.95, 0.01]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
      
      {/* Certificate content (simplified texture) */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Certificate seal */}
      <mesh position={[0.45, -0.3, 0.06]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
        <meshStandardMaterial color="#C0392B" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Helper function to create star geometry
const createStarGeometry = (radius = 1, innerRadius = 0.5, points = 5) => {
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
};

// 3D Badge Model component - Fixed position type
const BadgeModel = ({ 
  position = [0, 0, 0] as [number, number, number], 
  scale = 1 
}) => {
  const badgeRef = useRef<THREE.Group>(null);
  const starGeometry = useMemo(() => createStarGeometry(0.3, 0.15, 5), []);
  
  useFrame((state) => {
    if (badgeRef.current) {
      badgeRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  return (
    <group ref={badgeRef} position={position} scale={[scale, scale, scale]}>
      {/* Badge base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#4285F4" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Badge inner circle */}
      <mesh position={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Badge star emblem - Fixed to use the created geometry */}
      <mesh position={[0, 0, 0.06]}>
        <primitive object={starGeometry} attach="geometry" />
        <meshStandardMaterial color="#FBBC05" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

// 3D Scene component
const AchievementsScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.5, 0.5]}
        // Remove the config prop and directly use spring properties
        speed={1.5}
        zoom={1.2}
        damping={0.15}
        snap
      >
        <Float rotationIntensity={0.2} floatIntensity={0.5}>
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
      />
      <Environment preset="city" />
    </Canvas>
  );
};

// 3D Certificate Card for UI (framer motion) - Now with categoryNames prop
const Certificate3DCard = ({ 
  certificate, 
  onClick 
}: { 
  certificate: Certificate, 
  onClick: () => void 
}) => {
  return (
    <motion.div
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
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700/50 h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative pt-[56.25%]">
        <Image
          src={certificate.src}
          alt={certificate.title}
          fill
          className="absolute inset-0 object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
            {certificate.category.toString() in categoryNames ? categoryNames[certificate.category] : "Certificate"}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
          {certificate.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
          {certificate.content?.substring(0, 100)}
          {certificate.content && certificate.content.length > 100 ? '...' : ''}
        </p>
        
        <motion.button 
          className="mt-4 flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium"
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
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Load certificates data
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const certificatesData = await import("@/data/certificates.json")
          .then(module => module.default.certificates)
          .catch(() => []);
          
        if (certificatesData && certificatesData.length > 0) {
          // Add IDs if they don't exist
          const processedData = certificatesData.map((cert, index) => ({
            ...cert,
            id: 'id' in cert ? (cert.id as string | number) : index + 1
          }));
          setCertificates(processedData);
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
    
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="achievements" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black/80">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
              <Award className="mr-1 h-4 w-4" />
              RECOGNITION
            </span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4 dark:text-white"
            variants={itemVariants}
          >
            My Certificates & Achievements
          </motion.h2>
          
          <motion.p
            className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Professional certifications and achievements that highlight my continuous learning journey and expertise in various technological domains.
          </motion.p>
        </div>

        {/* 3D Trophy Scene - New Addition */}
        <motion.div 
          variants={itemVariants}
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
            {/* Featured Certificates - Now with 3D Effect */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              style={{ perspective: "1000px" }}
            >
              {certificates.slice(0, 3).map((certificate) => (
                <Certificate3DCard
                  key={certificate.id}
                  certificate={certificate}
                  onClick={() => openModal(certificate)}
                />
              ))}
            </motion.div>

            {/* Certificate Carousel - Enhanced with 3D effect */}
            <motion.div 
              variants={itemVariants}
              className="relative mt-12 mb-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">More Certificates</h3>
                <div className="flex gap-2">
                  <motion.button 
                    onClick={() => navigate("prev")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Previous certificates"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button 
                    onClick={() => navigate("next")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Next certificates"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                </div>
              </div>
              
              <div 
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-1 snap-x snap-mandatory"
                style={{ perspective: "1000px" }}
              >
                {certificates.slice(3).map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start"
                    onClick={() => openModal(certificate)}
                    initial={{ opacity: 0, rotateY: -10, z: -100 }}
                    animate={{ 
                      opacity: 1, 
                      rotateY: 0, 
                      z: 0,
                      transition: { delay: index * 0.05, duration: 0.4 } 
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
                      transformOrigin: "center center" 
                    }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700/50 h-full flex flex-col cursor-pointer">
                      <div className="relative pt-[56.25%]">
                        <Image
                          src={certificate.src}
                          alt={certificate.title}
                          fill
                          className="absolute inset-0 object-cover hover:scale-105 transition-transform duration-500"
                          sizes="280px"
                        />
                      </div>
                      
                      <div className="p-4" style={{ transform: "translateZ(10px)" }}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 text-[10px]">
                            {certificate.category.toString() in categoryNames ? categoryNames[certificate.category] : "Certificate"}
                          </span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
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
      </motion.div>

      {/* Certificate Modal - Enhanced with 3D effect */}
      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 5 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 5 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
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
              <div className="p-6" style={{ transform: "translateZ(20px)" }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                      {selectedCertificate.category.toString() in categoryNames ? categoryNames[selectedCertificate.category] : "Certificate"}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {selectedCertificate.title}
                    </h3>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link href={selectedCertificate.src} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-sm">
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      View Full Size
                    </Link>
                  </motion.div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
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