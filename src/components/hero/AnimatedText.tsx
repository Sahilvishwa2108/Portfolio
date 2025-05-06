"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { Group } from "three";

interface AnimatedTextProps {
  showGreeting: boolean;
  showName: boolean;
  showIntro?: boolean;
}

export const AnimatedText = ({ showGreeting, showName }: AnimatedTextProps) => {
  const { size } = useThree();
  const textRef = useRef<Group>(null);
  
  // Calculate responsive text sizing
  const fontSize = {
    greeting: size.width < 600 ? 0.7 : 0.9,
    name: size.width < 600 ? 0.9 : 1.3,
  };
  
  // Fixed positions with more vertical separation
  const positions: {
    greeting: [number, number, number];
    name: [number, number, number];
  } = {
    greeting: [0, 2.2, 0],  // Moved up for better spacing
    name: [0, -0.8, 0],     // Moved down for better spacing
  };

  // Automatic gentle animation
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.getElapsedTime();
      textRef.current.rotation.y = Math.sin(time * 0.3) * 0.08;
      textRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;
    }
  });
  
  return (
    <group ref={textRef} position={[0, 0, 5]}>
      {showGreeting && (
        <Float
          speed={1.5}
          rotationIntensity={0.15}
          floatIntensity={0.4}
          floatingRange={[-0.08, 0.08]}
        >
          <Text
            fontSize={fontSize.greeting}
            position={positions.greeting}
            color="#14b8a6"
            letterSpacing={0.05}
            textAlign="center"
            outlineWidth={0.01}
            outlineColor="#0d9488"
            maxWidth={8}
          >
            Hey, I&apos;m
            <meshStandardMaterial 
              color="#14b8a6" 
              metalness={0.6}
              roughness={0.2}
              emissive="#14b8a6"
              emissiveIntensity={0.3}
            />
          </Text>
        </Float>
      )}

      {showName && (
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.4}
          floatingRange={[-0.15, 0.15]}
        >
          <Text
            fontSize={fontSize.name}
            position={positions.name}
            color="white"
            letterSpacing={0.08}
            textAlign="center"
            outlineWidth={0.02}
            outlineColor="#0d9488"
            maxWidth={8}
          >
            SAHIL VISHWAKARMA
            <meshPhysicalMaterial 
              color="white" 
              metalness={0.7}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.2}
              emissive="#14b8a6"
              emissiveIntensity={0.2}
            />
          </Text>
        </Float>
      )}
    </group>
  );
};