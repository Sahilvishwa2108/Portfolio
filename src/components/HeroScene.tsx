"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
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
  return (
    <Canvas dpr={[1, 1.5]} className="w-full h-full" performance={{ min: 0.5 }}>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={55} />
      <Suspense fallback={null}>
        <color attach="background" args={["#050505"]} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <DynamicBackground particleCount={10} />
        </ErrorBoundary>
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        {/* Change Environment preset from "city" to another available preset */}
        <Environment preset="sunset" />
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