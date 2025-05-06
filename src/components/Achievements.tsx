"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";

// Define a proper certificate type
interface Certificate {
  id?: number | string;
  src: string;
  title: string;
  category: number | string;
  content?: string;
  description?: string;
}

export function Achievements() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  // Remove unused state variable
  const carouselRef = useRef<HTMLDivElement>(null);

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
            {/* Featured Certificates */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {certificates.slice(0, 3).map((certificate) => (
                <motion.div
                  key={certificate.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700/50 h-full flex flex-col"
                  onClick={() => openModal(certificate)}
                >
                  <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                    <Image
                      src={certificate.src}
                      alt={certificate.title}
                      fill
                      className="absolute inset-0 object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">View Certificate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                        {categoryNames[certificate.category] || "Certificate"}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {certificate.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                      {certificate.content?.substring(0, 100)}
                      {certificate.content && certificate.content.length > 100 ? '...' : ''}
                    </p>
                    
                    <button className="mt-4 flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certificate Carousel */}
            <motion.div 
              variants={itemVariants}
              className="relative mt-12 mb-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">More Certificates</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate("prev")}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Previous certificates"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button 
                    onClick={() => navigate("next")}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Next certificates"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-1 snap-x snap-mandatory"
              >
                {certificates.slice(3).map((certificate) => (
                  <div
                    key={certificate.id}
                    className="min-w-[280px] max-w-[280px] flex-shrink-0 snap-start"
                    onClick={() => openModal(certificate)}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700/50 h-full flex flex-col cursor-pointer"
                    >
                      <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                        <Image
                          src={certificate.src}
                          alt={certificate.title}
                          fill
                          className="absolute inset-0 object-cover hover:scale-105 transition-transform duration-500"
                          sizes="280px"
                        />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 text-[10px]">
                            {categoryNames[certificate.category] || "Certificate"}
                          </span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                          {certificate.title}
                        </h4>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Certificate Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Certificate image with proper aspect ratio */}
                <div className="relative w-full pt-[65%] bg-gray-100 dark:bg-gray-900"> {/* 16:10 Aspect Ratio */}
                  <Image
                    src={selectedCertificate.src}
                    alt={selectedCertificate.title}
                    fill
                    className="absolute inset-0 object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full p-2 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Certificate details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                      {categoryNames[selectedCertificate.category] || "Certificate"}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {selectedCertificate.title}
                    </h3>
                  </div>
                  
                  <Link href={selectedCertificate.src} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-sm">
                    <ExternalLink className="mr-1.5 h-4 w-4" />
                    View Full Size
                  </Link>
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