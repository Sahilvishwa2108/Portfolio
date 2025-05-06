"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { DynamicBackground } from "./hero/DynamicBackground";
import { AnimatedText } from "./hero/AnimatedText";

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
        <DynamicBackground particleCount={10} /> {/* Reduced particle count */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="city" />
        <AnimatedText
          showGreeting={showGreeting}
          showName={showName}
        />
      </Suspense>
    </Canvas>
  );
};