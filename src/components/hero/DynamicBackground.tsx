"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { Group } from "three";

interface Particle {
  position: [number, number, number];
  size: number;
  color: string;
  id: number;
}

interface DynamicBackgroundProps {
  particleCount?: number;
}

export const DynamicBackground = ({ particleCount = 20 }: DynamicBackgroundProps) => {
  const groupRef = useRef<Group>(null);
  
  // Create particles
  const particles: Particle[] = [];
  
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