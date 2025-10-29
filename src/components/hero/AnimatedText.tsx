"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

// Use proper named imports for animated components
const AnimatedGroup = animated.group;
const AnimatedMesh = animated.mesh;

interface AnimatedTextProps {
  showGreeting: boolean;
  showName: boolean;
  showIntro?: boolean;
}

// Separate component for animated letter to avoid hooks in loop
const AnimatedLetter = ({ 
  char, 
  index, 
  greetingVisible, 
  fontSize, 
  greetingLength 
}: { 
  char: string; 
  index: number; 
  greetingVisible: boolean; 
  fontSize: number; 
  greetingLength: number;
}) => {
  const springProps = useSpring({
    scale: greetingVisible ? 1 : 0,
    opacity: greetingVisible ? 1 : 0, 
    delay: greetingVisible ? 300 + index * 120 : 0,
    config: { mass: 1.2, tension: 280, friction: 14 }
  });
  
  return (
    <AnimatedMesh 
      key={`greeting-${index}`}
      position={[(index - greetingLength / 2 + 0.5) * fontSize * 0.6, 0, 0]}
      scale={springProps.scale}
      opacity={springProps.opacity}
    >
      <Text
        fontSize={fontSize}
        color="#14b8a6"
        outlineWidth={0.01}
        outlineColor="#0d9488"
        anchorX="center"
        anchorY="middle"
      >
        {char === ' ' ? '\u00A0' : char}
        <animated.meshStandardMaterial 
          color="#14b8a6" 
          metalness={0.6}
          roughness={0.2}
          emissive="#14b8a6"
          emissiveIntensity={0.3}
          transparent
          opacity={springProps.opacity}
        />
      </Text>
    </AnimatedMesh>
  );
};

export const AnimatedText = ({ showGreeting, showName }: AnimatedTextProps) => {
  const { size } = useThree();
  const textRef = useRef<Group>(null);
  
  // State for animations
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [greetingAnimationComplete, setGreetingAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile based on canvas size
    setIsMobile(size.width < 600);
  }, [size.width]);

  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => setGreetingVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  useEffect(() => {
    // Only make name visible after greeting animation is complete
    if (showName && greetingAnimationComplete) {
      const timer = setTimeout(() => setNameVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showName, greetingAnimationComplete]);
  
  // Track the completion of greeting animation
  useEffect(() => {
    if (greetingVisible) {
      // Calculate total animation time based on letters and delay
      const greetingAnimTime = 300 + (greetingText.length * 120) + 300; // initial delay + all letters + buffer
      const timer = setTimeout(() => {
        setGreetingAnimationComplete(true);
      }, greetingAnimTime);
      return () => clearTimeout(timer);
    }
  }, [greetingVisible]);
  
  // Calculate responsive text sizing
  const fontSize = {
    greeting: isMobile ? 0.45 : (size.width < 600 ? 0.6 : 0.75),
    name: isMobile ? 0.7 : (size.width < 600 ? 0.8 : 1.0),
  };
  
  // Adjust positions for mobile
  const positions: {
    greeting: [number, number, number];
    name: [number, number, number];
  } = {
    greeting: isMobile ? [0, 1.4, 0] : [0, 1.8, 0], 
    name: isMobile ? [0, -0.2, 0] : [0, -0.4, 0],
  };

  // Name text blur-in animation
  const nameSpring = useSpring({
    opacity: nameVisible ? 1 : 0,
    scale: nameVisible ? 1 : 0.85,
    position: nameVisible 
      ? [positions.name[0], positions.name[1], positions.name[2]]
      : [positions.name[0], positions.name[1] + 0.8, positions.name[2]],
    config: { mass: 3, tension: 130, friction: 30 }
  });

  // Reduce animation intensity on mobile
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.getElapsedTime();
      const intensityFactor = isMobile ? 0.5 : 1; // Reduce animation intensity on mobile
      textRef.current.rotation.y = Math.sin(time * 0.3) * 0.08 * intensityFactor;
      textRef.current.rotation.x = Math.cos(time * 0.2) * 0.05 * intensityFactor;
    }
  });
  
  // Split text for "Hey, I'm" letter-by-letter pop animation
  const greetingText = "Hey, I'm";
  
  return (
    <group 
      ref={textRef} 
      position={[0, 0, isMobile ? 6 : 5]} // Move closer to camera on mobile
    >
      {showGreeting && (
        <Float
          speed={isMobile ? 1.0 : 1.5}
          rotationIntensity={isMobile ? 0.1 : 0.15}
          floatIntensity={isMobile ? 0.2 : 0.4}
          floatingRange={[-0.08, 0.08]}
        >
          <group position={positions.greeting}>
            {greetingText.split('').map((char, index) => (
              <AnimatedLetter
                key={`greeting-${index}`}
                char={char}
                index={index}
                greetingVisible={greetingVisible}
                fontSize={fontSize.greeting}
                greetingLength={greetingText.length}
              />
            ))}
          </group>
        </Float>
      )}

      {showName && (
        <Float
          speed={isMobile ? 1.2 : 2}
          rotationIntensity={isMobile ? 0.1 : 0.2}
          floatIntensity={isMobile ? 0.2 : 0.4}
          floatingRange={[-0.1, 0.1]}
        >
          {/* Keep the blur-in effect for the name */}
          <AnimatedGroup 
            position={nameSpring.position}
            scale={nameSpring.scale}
          >
            <AnimatedMesh opacity={nameSpring.opacity}>
              <Text
                fontSize={fontSize.name}
                letterSpacing={0.08}
                textAlign="center"
                outlineWidth={0.02}
                outlineColor="#0d9488"
                maxWidth={isMobile ? 6 : 8}
              >
                SAHIL VISHWAKARMA
                <animated.meshPhysicalMaterial 
                  color="white" 
                  metalness={0.7}
                  roughness={0.1}
                  clearcoat={1}
                  clearcoatRoughness={0.2}
                  emissive="#14b8a6"
                  emissiveIntensity={0.2}
                  transparent
                  opacity={nameSpring.opacity}
                />
              </Text>
            </AnimatedMesh>
          </AnimatedGroup>
        </Float>
      )}
    </group>
  );
};