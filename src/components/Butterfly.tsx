import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface ButterflyProps {
  sectionIndex: number;
  totalSections: number;
  isActive: boolean;
}

// Enhanced 3D Butterfly SVG with RED, GOLD, and BLACK, and subtle 3D effects
const ButterflySVG = ({ className = "", style = {} }) => (
  <svg
    width="120"
    height="90"
    viewBox="0 0 120 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Left Wing (Red with white veins) */}
    <g filter="url(#wingShadow)">
      <path
        d="M60 45 Q20 10 15 60 Q30 70 60 45"
        fill="url(#redWing)"
        stroke="#FFD700"
        strokeWidth="2.5"
      />
      {/* White veins */}
      <path d="M60 45 Q30 30 20 55" stroke="#fff" strokeWidth="1.2" />
      <path d="M60 45 Q35 40 25 60" stroke="#fff" strokeWidth="1.2" />
    </g>
    {/* Right Wing (Red with white veins) */}
    <g filter="url(#wingShadow)">
      <path
        d="M60 45 Q100 10 105 60 Q90 70 60 45"
        fill="url(#redWing)"
        stroke="#FFD700"
        strokeWidth="2.5"
      />
      {/* White veins */}
      <path d="M60 45 Q90 30 100 55" stroke="#fff" strokeWidth="1.2" />
      <path d="M60 45 Q85 40 95 60" stroke="#fff" strokeWidth="1.2" />
    </g>
    {/* Lower Left Wing (Gold with black edge) */}
    <g filter="url(#wingShadow)">
      <path
        d="M60 45 Q30 80 50 85 Q60 70 60 45"
        fill="url(#goldWing)"
        stroke="#000"
        strokeWidth="2.5"
      />
    </g>
    {/* Lower Right Wing (Gold with black edge) */}
    <g filter="url(#wingShadow)">
      <path
        d="M60 45 Q90 80 70 85 Q60 70 60 45"
        fill="url(#goldWing)"
        stroke="#000"
        strokeWidth="2.5"
      />
    </g>
    {/* Butterfly Body (Black with gold highlight) */}
    <ellipse cx="60" cy="50" rx="6" ry="22" fill="#111" stroke="#FFD700" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="60" cy="30" rx="7" ry="7" fill="#111" stroke="#FFD700" strokeWidth="2" />
    {/* Antennae */}
    <path d="M60 25 Q55 10 50 25" stroke="#FFD700" strokeWidth="2" fill="none" />
    <path d="M60 25 Q65 10 70 25" stroke="#FFD700" strokeWidth="2" fill="none" />
    {/* 3D Glow/Highlight */}
    <ellipse cx="60" cy="38" rx="2.5" ry="1.2" fill="#fff" opacity="0.5" />
    {/* Filters and Gradients */}
    <defs>
      <radialGradient id="redWing" cx="50%" cy="50%" r="70%" fx="50%" fy="40%">
        <stop offset="0%" stopColor="#FF6F61" />
        <stop offset="80%" stopColor="#B71C1C" />
      </radialGradient>
      <radialGradient id="goldWing" cx="50%" cy="50%" r="70%" fx="50%" fy="40%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="90%" stopColor="#B8860B" />
      </radialGradient>
      <filter id="wingShadow" x="-10" y="-10" width="140" height="110" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.18" />
      </filter>
    </defs>
  </svg>
);

const Butterfly: React.FC<ButterflyProps> = ({ sectionIndex, totalSections, isActive }) => {
  const butterflyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!butterflyRef.current) return;
    // Define advanced, lively 3D motion path for the butterfly
    let path;
    if (sectionIndex === 0) {
      // Perch above header
      path = [{ x: window.innerWidth / 2 - 60, y: 60 }];
    } else if (sectionIndex === totalSections - 1) {
      // Settle in bottom right of footer
      path = [
        { x: window.innerWidth / 2 - 60, y: 60 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.7 - 80 },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.85 - 40 },
        { x: window.innerWidth - 140, y: window.innerHeight - 120 }
      ];
    } else {
      // Float in a lively, wavy, 3D path through the section
      const t = sectionIndex / (totalSections - 1);
      path = [
        { x: window.innerWidth / 2 - 60, y: 60 },
        { x: window.innerWidth * (0.2 + 0.6 * t), y: 80 + 60 * Math.sin(sectionIndex * 1.2) },
        { x: window.innerWidth * (0.3 + 0.4 * t), y: 120 + 80 * Math.cos(sectionIndex * 1.5) },
        { x: window.innerWidth * (0.5 + 0.3 * t), y: 100 + 40 * Math.sin(sectionIndex * 2) }
      ];
    }
    gsap.to(butterflyRef.current, {
      motionPath: {
        path,
        autoRotate: true,
        curviness: 1.5
      },
      opacity: isActive ? 1 : 0.7,
      scale: isActive ? 1.08 : 0.95,
      duration: 1.6,
      ease: 'power2.inOut',
    });
  }, [sectionIndex, totalSections, isActive]);

  return (
    <div
      ref={butterflyRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 120, pointerEvents: 'none' }}
      aria-label="GLOHSEN Mascot Butterfly"
    >
      <ButterflySVG />
    </div>
  );
};

export default Butterfly;
