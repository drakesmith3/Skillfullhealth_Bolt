import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface Logo3DHyperRealisticProps {
  size?: number;
  className?: string;
}

const Logo3DHyperRealistic: React.FC<Logo3DHyperRealisticProps> = ({ 
  size = 80, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<SVGCircleElement>(null);
  const earthRef = useRef<SVGGElement>(null);
  const medicalIconsRef = useRef<SVGGElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const earthOrbitRadius = 25; // Define Earth's orbit radius  // Medical icons data with orbital parameters (made smaller with new colors)
  const medicalIcons = [
    { 
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 8L21 9ZM3 9L5 8L3 7V9ZM12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21ZM5.5 7.5C6.3 6.7 7.6 6.7 8.4 7.5C9.2 8.3 9.2 9.6 8.4 10.4C7.6 11.2 6.3 11.2 5.5 10.4C4.7 9.6 4.7 8.3 5.5 7.5ZM18.5 16.5C19.3 15.7 20.6 15.7 21.4 16.5C22.2 17.3 22.2 18.6 21.4 19.4C20.6 20.2 19.3 20.2 18.5 19.4C17.7 18.6 17.7 17.3 18.5 16.5Z",
      name: "stethoscope",
      radius: 38, // Furthest out
      speed: 1,
      scale: 0.4,
      color: "#DC2626" // RED
    },
    {
      path: "M20 6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H20C21.1 18 22 17.1 22 16V8C22 6.9 21.1 6 20 6ZM20 16H4V8H20V16ZM6 10H8V14H6V10ZM10 10H12V14H10V10ZM14 10H16V14H14V10ZM18 10H20V14H18V10Z",
      name: "thermometer",
      radius: 18, // Closest to sun
      speed: 0.7,
      scale: 0.35,
      color: "#F59E0B" // GOLD
    },
    {
      path: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
      name: "reflex-hammer",
      radius: 30, // Middle orbit - well separated
      speed: 1.3,
      scale: 0.45,
      color: "#000000" // BLACK
    },    {
      path: "M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z",
      name: "heartbeat",
      radius: 22, // Between thermometer and reflex-hammer - optimal separation
      speed: 0.9,
      scale: 0.3,
      color: "#FAFAFA" // OFF-WHITE
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const timeline = gsap.timeline({ repeat: -1 });

    // Sun pulsing animation with realistic solar flares
    if (sunRef.current) {
      gsap.to(sunRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Solar flare effect
      gsap.to(sunRef.current, {
        filter: "brightness(1.3) saturate(1.2)",
        duration: 0.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 1
      });
    }

    // Earth rotation and orbital motion
    if (earthRef.current) {
      // Earth self-rotation
      gsap.to(earthRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center" // Ensure rotation is around its own center
      });
      // Earth orbital motion around sun (centered around the sun)
      // The path is defined in absolute SVG coordinates.
      // CX = size/2, CY = size/2, R = earthOrbitRadius
      // Path starts at (CX - R, CY)
      // Arc 1: draws a semicircle to (CX + R, CY)
      // Arc 2: draws a semicircle back to (CX - R, CY)
      const orbitPath = `M${size/2 - earthOrbitRadius},${size/2} a${earthOrbitRadius},${earthOrbitRadius} 0 0,1 ${earthOrbitRadius * 2},0 a${earthOrbitRadius},${earthOrbitRadius} 0 0,1 -${earthOrbitRadius * 2},0`;

      gsap.to(earthRef.current, {
        motionPath: {
          path: orbitPath,
          autoRotate: false // Earth has its own self-rotation animation
        },
        duration: 15,
        ease: "none",
        repeat: -1
      });
    }    // Medical icons orbital animations
    medicalIconsRef.current.forEach((iconRef, index) => {
      if (iconRef) {
        const icon = medicalIcons[index];
        
        // Create orbital path for each medical icon centered around the sun
        const centerX = size / 2;
        const centerY = size / 2;
        const orbitalPath = `M${centerX - icon.radius},${centerY} a${icon.radius},${icon.radius} 0 1,1 ${icon.radius * 2},0 a${icon.radius},${icon.radius} 0 1,1 -${icon.radius * 2},0`;
        
        
        gsap.to(iconRef, {
          motionPath: {
            path: orbitalPath,
            autoRotate: false // Removed autoRotate to reduce erratic movement
          },
          duration: 15 / icon.speed,
          ease: "none",
          repeat: -1,
          delay: index * 1.2 // Staggered start times for better distribution
        });

        // Gentle icon self-rotation (reduced from previous)
        gsap.to(iconRef, {
          rotation: 360,
          duration: 8 / icon.speed, // Slower rotation
          ease: "none",
          repeat: -1
        });

        // Reduced floating effect
        gsap.to(iconRef, {
          y: "+=1", // Much smaller floating movement
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.6
        });
      }
    });

    // Hover effects
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(container, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(container, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf([sunRef.current, earthRef.current, ...medicalIconsRef.current]);
    };
  }, [size, earthOrbitRadius]); // Added earthOrbitRadius to dependency array

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      aria-label="GLOHSEN 3D Hyper-Realistic Logo - Earth orbiting Sun with Medical Icons"
      role="img"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          {/* Advanced gradients for hyper-realistic effects */}
          <radialGradient id="sunGradient3D" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="15%" stopColor="#fff9e6" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#ffeb3b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff9800" stopOpacity="1" />
            <stop offset="80%" stopColor="#ff5722" stopOpacity="1" />
            <stop offset="100%" stopColor="#d84315" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="earthOcean" cx="0.4" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#87ceeb" />
            <stop offset="30%" stopColor="#4682b4" />
            <stop offset="60%" stopColor="#1e90ff" />
            <stop offset="100%" stopColor="#000080" />
          </radialGradient>

          <radialGradient id="earthLand" cx="0.3" cy="0.2" r="0.9">
            <stop offset="0%" stopColor="#90ee90" />
            <stop offset="40%" stopColor="#228b22" />
            <stop offset="70%" stopColor="#006400" />
            <stop offset="100%" stopColor="#2f4f2f" />
          </radialGradient>

          <radialGradient id="earthClouds" cx="0.5" cy="0.4" r="0.8">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f0f8ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#e6f3ff" stopOpacity="0.3" />
          </radialGradient>

          {/* Lighting effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="shadow3D">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>

          <filter id="innerShadow">
            <feFlood floodColor="#000000" floodOpacity="0.2"/>
            <feComposite in="SourceGraphic" operator="out"/>
            <feGaussianBlur stdDeviation="2"/>
            <feOffset dx="1" dy="1" result="offset"/>
            <feComposite in="SourceGraphic" in2="offset" operator="over"/>
          </filter>
        </defs>

        {/* Sun with corona effect */}
        <g>
          {/* Corona/Solar flare rings */}
          <circle
            cx={size/2}
            cy={size/2}
            r="18"
            fill="none"
            stroke="url(#sunGradient3D)"
            strokeWidth="0.5"
            opacity="0.3"
            className="animate-spin"
            style={{ animationDuration: '20s' }}
          />
          <circle
            cx={size/2}
            cy={size/2}
            r="22"
            fill="none"
            stroke="#ffeb3b"
            strokeWidth="0.3"
            opacity="0.2"
            className="animate-spin"
            style={{ animationDuration: '30s', animationDirection: 'reverse' }}
          />
          
          {/* Main sun body */}
          <circle
            ref={sunRef}
            cx={size/2}
            cy={size/2}
            r="15"
            fill="url(#sunGradient3D)"
            filter="url(#glow)"
            className="transition-all duration-300"
          />
          
          {/* Sun surface details */}
          <circle cx={size/2 - 3} cy={size/2 - 2} r="1.5" fill="#fff9e6" opacity="0.6" />
          <circle cx={size/2 + 2} cy={size/2 + 3} r="1" fill="#ffeb3b" opacity="0.8" />
          <circle cx={size/2 + 4} cy={size/2 - 4} r="0.8" fill="#ff9800" opacity="0.7" />
        </g>
        {/* Earth - its <g> element will be positioned by GSAP motionPath */}
        <g ref={earthRef}>
          {/* Earth shadow, relative to Earth's new (0,0) origin */}
          <ellipse
            cx="0" 
            cy="2" // Offset slightly below the Earth's center
            rx="3"
            ry="1.5"
            fill="#000000"
            opacity="0.2"
          />
          
          {/* Earth base, centered at Earth's new (0,0) origin */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="url(#earthOcean)"
            filter="url(#shadow3D)"
          />
          
          {/* Continents, paths are relative to (0,0) of this group, transform removed */}
          <g> 
            {/* Africa/Europe */}
            <path
              d="M-2,-4 Q-1,-3 0,-1.5 Q1.5,-0.5 0.5,1.5 Q-0.5,3 -2,2.5 Q-3.5,0.5 -3,-1.5 Z"
              fill="url(#earthLand)"
              opacity="0.9"
            />
            {/* Asia */}
            <path
              d="M1.5,-2 Q3.5,-1.5 4,0 Q3.5,1.5 2,2 Q1.5,0.5 1.5,-0.5 Z"
              fill="url(#earthLand)"
              opacity="0.8"
            />
            {/* Americas */}
            <path
              d="M-4,-1.5 Q-3.5,0 -4,1.5 Q-4.5,3 -5,1.5 Q-4.5,0 -4,-1.5 Z"
              fill="url(#earthLand)"
              opacity="0.7"
            />
          </g>
          
          {/* Cloud layer, centered at Earth's new (0,0) origin */}
          <circle
            cx="0"
            cy="0"
            r="6.5"
            fill="url(#earthClouds)"
            opacity="0.4"
          />
          
          {/* Atmospheric glow, centered at Earth's new (0,0) origin */}
          <circle
            cx="0"
            cy="0"
            r="7"
            fill="none"
            stroke="#87ceeb"
            strokeWidth="0.4"
            opacity="0.3"
          />
        </g>        {/* Medical Icons */}
        {medicalIcons.map((icon, index) => (
          <g
            key={icon.name}
            ref={(el) => {
              if (el) medicalIconsRef.current[index] = el;
            }}
            className="cursor-pointer transition-all duration-300 hover:scale-110"
          >
            {/* Icon glow background - scaled */}
            <circle
              r={4 * icon.scale}
              fill={icon.color}
              opacity="0.1"
              filter="url(#glow)"
            />
            
            {/* Medical icon with new colors - scaled */}
            <g transform={`scale(${icon.scale}) translate(-12, -12)`}>
              <rect 
                width="24" 
                height="24" 
                fill={icon.color} 
                rx="3" 
                opacity="0.9" 
              />
              <path
                d={icon.path}
                fill={icon.color === "#000000" ? "#FAFAFA" : "#FFFFFF"}
                transform="scale(0.8) translate(2.4, 2.4)"
              />
            </g>
            
            {/* Orbital trail effect with matching color - scaled */}
            <circle
              r={0.5 * icon.scale}
              fill={icon.color}
              opacity="0.4"
              className="animate-ping"
            />
          </g>
        ))}
        {/* Orbital paths (visible on hover) with matching colors */}
        {isHovered && medicalIcons.map((icon, index) => (
          <circle
            key={`orbit-${index}`}
            cx={size/2}
            cy={size/2}
            r={icon.radius}
            fill="none"
            stroke={icon.color}
            strokeWidth="0.5"
            opacity="0.2"
            strokeDasharray="2,2"
            className="animate-pulse"
          />
        ))}
      </svg>
      
      {/* Particle effects overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-30 animate-ping"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Logo3DHyperRealistic;
