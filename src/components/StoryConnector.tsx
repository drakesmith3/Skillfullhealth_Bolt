
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface ButterflyProps {
  sectionIndex: number;
  totalSections: number;
  isActive: boolean;
}

// Enhanced 3D Hyperrealistic Butterfly SVG with vertical wing orientation and multicolored design
const ButterflySVG = ({ className = "", style = {} }) => (
  <svg
    width="50"
    height="80"
    viewBox="0 0 100 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  ><defs>
      {/* Gold & Black gradients with red sashes */}
      <radialGradient id="upperWingGradient" cx="0.3" cy="0.2" r="0.8">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="30%" stopColor="#F4C430"/>
        <stop offset="60%" stopColor="#FFA500"/>
        <stop offset="85%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#1C1C1C"/>
      </radialGradient>
      
      <radialGradient id="lowerWingGradient" cx="0.4" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="25%" stopColor="#DAA520"/>
        <stop offset="50%" stopColor="#B8860B"/>
        <stop offset="75%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#2F2F2F"/>
      </radialGradient>
      
      <linearGradient id="redSashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF0000"/>
        <stop offset="50%" stopColor="#DC143C"/>
        <stop offset="100%" stopColor="#8B0000"/>
      </linearGradient>
      
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="50%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#1C1C1C"/>
      </linearGradient>
      
      {/* Wing shadows and 3D effects */}
      <filter id="wingShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feMorphology operator="dilate" radius="1"/>
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="highlight" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 0.3 0.6 1"/>
        </feComponentTransfer>
      </filter>
    </defs>

    {/* Left Wings Group */}
    <g className="left-wings">      {/* Upper Left Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q -25,-40 -35,-70 Q -30,-75 -20,-72 Q -15,-68 -10,-60 Q -5,-45 0,0 Z"
          fill="url(#upperWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.95"
        />
        {/* Red sash at outer edge */}
        <path
          d="M -30,-65 Q -25,-68 -20,-65 Q -25,-60 -30,-65"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M -32,-55 Q -27,-58 -22,-55 Q -27,-50 -32,-55"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q -15,-25 -25,-50" stroke="#FFD700" strokeWidth="0.8" opacity="0.8"/>
        <path d="M 0,0 Q -10,-20 -20,-45" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q -5,-15 -15,-35" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black accent spots */}
        <circle cx="-15" cy="-30" r="2" fill="#000000" opacity="0.7"/>
        <circle cx="-20" cy="-50" r="1.5" fill="#1C1C1C" opacity="0.6"/>
      </g>      {/* Lower Left Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q -20,25 -30,55 Q -25,60 -15,57 Q -10,53 -5,45 Q -2,25 0,0 Z"
          fill="url(#lowerWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Red sash at outer edge */}
        <path
          d="M -25,50 Q -20,53 -15,50 Q -20,45 -25,50"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M -27,40 Q -22,43 -17,40 Q -22,35 -27,40"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q -12,15 -22,35" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q -8,12 -18,30" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black eye spot with gold center */}
        <circle cx="-18" cy="35" r="4" fill="#000000" opacity="0.8"/>
        <circle cx="-18" cy="35" r="2.5" fill="#FFD700" opacity="0.9"/>
        <circle cx="-17" cy="34" r="1" fill="#000000" opacity="0.8"/>
      </g>    </g>

    {/* Right Wings Group */}
    <g className="right-wings">
      {/* Upper Right Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q 25,-40 35,-70 Q 30,-75 20,-72 Q 15,-68 10,-60 Q 5,-45 0,0 Z"
          fill="url(#upperWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.95"
        />
        {/* Red sash at outer edge */}
        <path
          d="M 30,-65 Q 25,-68 20,-65 Q 25,-60 30,-65"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M 32,-55 Q 27,-58 22,-55 Q 27,-50 32,-55"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q 15,-25 25,-50" stroke="#FFD700" strokeWidth="0.8" opacity="0.8"/>
        <path d="M 0,0 Q 10,-20 20,-45" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q 5,-15 15,-35" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black accent spots */}
        <circle cx="15" cy="-30" r="2" fill="#000000" opacity="0.7"/>
        <circle cx="20" cy="-50" r="1.5" fill="#1C1C1C" opacity="0.6"/>
      </g>      {/* Lower Right Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q 20,25 30,55 Q 25,60 15,57 Q 10,53 5,45 Q 2,25 0,0 Z"
          fill="url(#lowerWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Red sash at outer edge */}
        <path
          d="M 25,50 Q 20,53 15,50 Q 20,45 25,50"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M 27,40 Q 22,43 17,40 Q 22,35 27,40"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q 12,15 22,35" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q 8,12 18,30" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black eye spot with gold center */}
        <circle cx="18" cy="35" r="4" fill="#000000" opacity="0.8"/>
        <circle cx="18" cy="35" r="2.5" fill="#FFD700" opacity="0.9"/>        <circle cx="17" cy="34" r="1" fill="#000000" opacity="0.8"/>
      </g>
    </g>

    {/* Body - Enhanced 3D effect with gold & black styling */}
    <g transform="translate(50,20)">
      <ellipse cx="0" cy="30" rx="3" ry="45" fill="url(#bodyGradient)" stroke="#000000" strokeWidth="1"/>
      <ellipse cx="0" cy="25" rx="2" ry="8" fill="#FFD700" opacity="0.8"/> {/* Thorax */}
      <circle cx="0" cy="15" r="3" fill="#000000" stroke="#FFD700" strokeWidth="0.5"/> {/* Head */}
      
      {/* Antennae */}
      <path d="M -1,12 Q -3,8 -2,5" stroke="#000000" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M 1,12 Q 3,8 2,5" stroke="#000000" strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="-2" cy="5" r="0.5" fill="#FFD700"/>
      <circle cx="2" cy="5" r="0.5" fill="#FFD700"/>
      
      {/* Body segments */}
      <path d="M 0,20 L 0,65" stroke="#FFD700" strokeWidth="0.3" opacity="0.8"/>
      <circle cx="0" cy="25" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="35" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="45" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="55" r="0.5" fill="#FFD700" opacity="0.9"/>
    </g>
  </svg>
);

const Butterfly: React.FC<ButterflyProps> = ({ sectionIndex, totalSections, isActive }) => {
  const butterflyRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<SVGGElement>(null);
  const rightWingRef = useRef<SVGGElement>(null);
  
  useEffect(() => {
    if (!butterflyRef.current) return;
    
    // Enhanced wing flutter animation
    const animateWings = () => {
      if (leftWingRef.current && rightWingRef.current) {
        gsap.to([leftWingRef.current, rightWingRef.current], {
          rotationY: 15,
          duration: 0.2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.05
        });
      }
    };
    
    // Start wing animation
    animateWings();
    
    // Define horizontal storytelling motion path for the butterfly
    let path;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (sectionIndex === 0) {
      // Start position - top center of first section
      path = [{ x: windowWidth / 2 - 60, y: 80 }];
    } else if (sectionIndex === totalSections - 1) {
      // Final position - gracefully settle in the bottom right
      path = [
        { x: windowWidth / 2 - 60, y: 80 },
        { x: windowWidth * 0.6, y: windowHeight * 0.3 },
        { x: windowWidth * 0.75, y: windowHeight * 0.5 },
        { x: windowWidth - 140, y: windowHeight - 120 }
      ];
    } else {
      // Horizontal storytelling path - butterfly moves across the story
      const progress = sectionIndex / (totalSections - 1);
      
      // Create a flowing horizontal path that follows the story progression
      path = [
        { x: windowWidth / 2 - 60, y: 80 },
        { x: windowWidth * (0.2 + 0.6 * progress), y: 120 + 40 * Math.sin(sectionIndex * 1.5) },
        { x: windowWidth * (0.3 + 0.5 * progress), y: 160 + 60 * Math.cos(sectionIndex * 1.2) },
        { x: windowWidth * (0.4 + 0.4 * progress), y: 100 + 30 * Math.sin(sectionIndex * 2) }
      ];
    }

    // Animate butterfly with storytelling awareness
    gsap.to(butterflyRef.current, {
      motionPath: {
        path,
        autoRotate: true,
        curviness: 2
      },
      opacity: isActive ? 1 : 0.8,
      scale: isActive ? 1.1 : 0.9,
      duration: 1.8,
      ease: 'power2.inOut',
      // Add a slight bounce when transitioning between story sections
      yoyo: sectionIndex > 0 && sectionIndex < totalSections - 1,
      repeat: sectionIndex > 0 && sectionIndex < totalSections - 1 ? 1 : 0,
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

