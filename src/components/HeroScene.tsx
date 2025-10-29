"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { DynamicBackground } from "./hero/DynamicBackground";
import { AnimatedText } from "./hero/AnimatedText";
import { ErrorBoundary } from "react-error-boundary";

// Simple fallback component
const ErrorFallback = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="red" />
  </mesh>
);

interface HeroSceneProps {
  showGreeting: boolean;
  showName: boolean;
}

export const HeroScene = ({ showGreeting, showName }: HeroSceneProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <Canvas 
      dpr={[1, isMobile ? 1.5 : 2]} // Limit DPR on mobile
      className="w-full h-full" 
      performance={{ min: 0.3, max: isMobile ? 0.7 : 1 }} // Reduce performance target on mobile
    >
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, isMobile ? 17 : 15]} // Adjust camera position for mobile
        fov={isMobile ? 60 : 55} // Wider FOV on mobile
      />
      <Suspense fallback={null}>
        <color attach="background" args={["#050505"]} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <DynamicBackground particleCount={isMobile ? 8 : 15} />
        </ErrorBoundary>
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        {/* Use a simpler environment preset on mobile */}
        <Environment preset={isMobile ? "night" : "sunset"} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <AnimatedText
            showGreeting={showGreeting}
            showName={showName}
          />
        </ErrorBoundary>
      </Suspense>
    </Canvas>
  );
};