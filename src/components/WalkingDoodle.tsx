
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface WalkingDoodleProps {
  isVisible: boolean;
  scrollProgress?: number;
}

const WalkingDoodle: React.FC<WalkingDoodleProps> = ({ isVisible, scrollProgress = 0 }) => {
  const doodleRef = useRef<SVGSVGElement>(null);
  const legLeftRef = useRef<SVGPathElement>(null);
  const legRightRef = useRef<SVGPathElement>(null);
  const armLeftRef = useRef<SVGPathElement>(null);
  const armRightRef = useRef<SVGPathElement>(null);

  // Set up walking animation
  useEffect(() => {
    if (!doodleRef.current || !isVisible) return;

    const walkingTimeline = gsap.timeline({ 
      repeat: -1, 
      yoyo: true 
    });
    
    // Leg animation
    walkingTimeline.to(legLeftRef.current, { 
      rotation: 15, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, 0);
    
    walkingTimeline.to(legRightRef.current, { 
      rotation: -15, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, 0);
    
    // Arm animation
    walkingTimeline.to(armLeftRef.current, { 
      rotation: -10, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, 0);
    
    walkingTimeline.to(armRightRef.current, { 
      rotation: 10, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, 0);
    
    // Reverse animation for walking cycle
    walkingTimeline.to(legLeftRef.current, { 
      rotation: -15, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    });
    
    walkingTimeline.to(legRightRef.current, { 
      rotation: 15, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, "<");
    
    walkingTimeline.to(armLeftRef.current, { 
      rotation: 10, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, "<");
    
    walkingTimeline.to(armRightRef.current, { 
      rotation: -10, 
      transformOrigin: "top center", 
      duration: 0.5,
      ease: "sine.inOut" 
    }, "<");

    return () => {
      walkingTimeline.kill();
    };
  }, [isVisible]);

  // Control doodle position based on scroll progress
  useEffect(() => {
    if (!doodleRef.current || !isVisible) return;
    
    gsap.to(doodleRef.current, {
      x: `${scrollProgress * 100}%`,
      duration: 0.5,
      ease: "power1.out"
    });
    
  }, [scrollProgress, isVisible]);

  if (!isVisible) return null;

  return (
    <svg
      ref={doodleRef}
      width="120"
      height="200"
      viewBox="0 0 120 200"
      className="absolute bottom-10 left-0 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Head */}
      <circle cx="60" cy="40" r="25" fill="#F8B195" stroke="#333" strokeWidth="2" />
      
      {/* Face */}
      <circle cx="50" cy="35" r="3" fill="#333" /> {/* Left eye */}
      <circle cx="70" cy="35" r="3" fill="#333" /> {/* Right eye */}
      <path d="M50 50 Q60 55 70 50" fill="none" stroke="#333" strokeWidth="2" /> {/* Smile */}
      
      {/* Body */}
      <rect x="45" y="65" width="30" height="50" rx="5" fill="#355C7D" stroke="#333" strokeWidth="2" />
      
      {/* Arms */}
      <path 
        ref={armLeftRef}
        d="M45 70 L20 100" 
        fill="none" 
        stroke="#333" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <path 
        ref={armRightRef}
        d="M75 70 L100 100" 
        fill="none" 
        stroke="#333" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      
      {/* Legs */}
      <path 
        ref={legLeftRef}
        d="M50 115 L40 160" 
        fill="none" 
        stroke="#333" 
        strokeWidth="5" 
        strokeLinecap="round" 
      />
      <path 
        ref={legRightRef}
        d="M70 115 L80 160" 
        fill="none" 
        stroke="#333" 
        strokeWidth="5" 
        strokeLinecap="round" 
      />
      
      {/* Feet */}
      <ellipse cx="35" cy="165" rx="8" ry="5" fill="#333" />
      <ellipse cx="85" cy="165" rx="8" ry="5" fill="#333" />
      
      {/* Speech bubble - will be used to show story context */}
      <g className="opacity-80">
        <path d="M90 20 Q110 20 110 35 L110 50 Q110 65 90 65 L75 65 L70 75 L65 65 L50 65 Q30 65 30 50 L30 35 Q30 20 50 20 Z" fill="white" stroke="#333" strokeWidth="2" />
        <text x="70" y="45" fontSize="10" textAnchor="middle" fill="#333">GLOHSEN!</text>
      </g>
    </svg>
  );
};

export default WalkingDoodle;
