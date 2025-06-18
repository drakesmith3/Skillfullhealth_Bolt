
import React, { useRef, useMemo, useImperativeHandle, forwardRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import asclepiusRodShape from '../utils/asclepiusRodShape';
import { useTheme } from '../contexts/ThemeContext';

interface ParticleSystemProps {
  particleCount: number;
  isTransformed: boolean;
}

const ParticleSystem = forwardRef<any, ParticleSystemProps>(({ particleCount, isTransformed }, ref) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [isFlapping, setIsFlapping] = useState(false);
  const { isDark } = useTheme();
  
  // Initialize particle positions
  const { positions, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random initial positions in a sphere
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;
      
      // Theme-aware color variations
      const colorType = Math.random();
        if (!isDark) {
        // Light mode: RED, GOLD, BLACK colors for high visibility
        if (colorType < 0.33) {
          // Vibrant Red - Highly visible in light mode
          colors[i3] = 0.9;      // R
          colors[i3 + 1] = 0.0;  // G
          colors[i3 + 2] = 0.0;  // B
        } else if (colorType < 0.66) {
          // Rich Gold - Highly visible in light mode
          colors[i3] = 1.0;      // R
          colors[i3 + 1] = 0.8;  // G  
          colors[i3 + 2] = 0.0;  // B
        } else {
          // Deep Black - Highly visible in light mode
          colors[i3] = 0.0;      // R
          colors[i3 + 1] = 0.0;  // G
          colors[i3 + 2] = 0.0;  // B
        }
      } else {
        // Dark mode: Keep existing colors (gold, red, dark gray)
        if (colorType < 0.4) {
          // Bright Gold - High contrast for dark theme
          colors[i3] = 1.0;     // R
          colors[i3 + 1] = 0.9;  // G  
          colors[i3 + 2] = 0.1;  // B
        } else if (colorType < 0.7) {
          // Vibrant Red - Highly visible in dark theme
          colors[i3] = 1.0;      // R
          colors[i3 + 1] = 0.15; // G
          colors[i3 + 2] = 0.15; // B
        } else {
          // Deep Black/Dark Gray - Adjusted for dark theme visibility
          colors[i3] = 0.2;      // R
          colors[i3 + 1] = 0.2;  // G
          colors[i3 + 2] = 0.2;  // B
        }
      }
    }
    
    return { positions, originalPositions, colors };
  }, [particleCount, isDark]);

  // Mouse interaction effect
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    // Mouse attraction effect
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (!isTransformed) {
        // Free floating particles with mouse attraction
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
          const force = (5 - distance) / 5;
          positions[i3] += dx * force * 0.02;
          positions[i3 + 1] += dy * force * 0.02;
        }
        
        // Natural floating motion
        positions[i3] += Math.sin(time + i * 0.1) * 0.01;
        positions[i3 + 1] += Math.cos(time + i * 0.15) * 0.01;
        positions[i3 + 2] += Math.sin(time + i * 0.2) * 0.005;      } else if (isFlapping) {
        // Caduceus animation - gentle dual-snake spiral and staff glow
        const caduceusPos = asclepiusRodShape[i];
        if (caduceusPos) {
          const spiralEffect = Math.sin(time * 3) * 0.08;
          const glowPulse = Math.sin(time * 5) * 0.04;
          positions[i3] = caduceusPos.x + spiralEffect * Math.cos(time + i * 0.1);
          positions[i3 + 1] = caduceusPos.y;
          positions[i3 + 2] = caduceusPos.z + glowPulse + spiralEffect * Math.sin(time + i * 0.1);
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });  const transformToCaduceus = () => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate particles to Caduceus shape
    for (let i = 0; i < Math.min(particleCount, asclepiusRodShape.length); i++) {
      const i3 = i * 3;
      const targetPos = asclepiusRodShape[i];
      
      gsap.to(positions, {
        duration: 2.5,
        ease: "power2.out",
        delay: Math.random() * 0.8,
        [i3]: targetPos.x,
        [i3 + 1]: targetPos.y,
        [i3 + 2]: targetPos.z,
        onUpdate: () => {
          if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
          }
        },
        onComplete: () => {
          if (i === Math.min(particleCount, asclepiusRodShape.length) - 1) {
            setIsFlapping(true);
          }
        }
      });
    }
  };

  const resetParticles = () => {
    if (!pointsRef.current) return;
    
    setIsFlapping(false);
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate back to original positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      gsap.to(positions, {
        duration: 1,
        ease: "power2.out",
        delay: Math.random() * 0.3,
        [i3]: originalPositions[i3],
        [i3 + 1]: originalPositions[i3 + 1],
        [i3 + 2]: originalPositions[i3 + 2],
        onUpdate: () => {
          if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
          }
        }
      });
    }
  };  useImperativeHandle(ref, () => ({
    transformToCaduceus,
    resetParticles
  }));

  return (    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={isDark ? 0.06 : 0.08}
        sizeAttenuation={true}
        transparent={true}
        opacity={isDark ? 0.9 : 1.0}
        vertexColors={true}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </Points>
  );
});

ParticleSystem.displayName = 'ParticleSystem';

export default ParticleSystem;
