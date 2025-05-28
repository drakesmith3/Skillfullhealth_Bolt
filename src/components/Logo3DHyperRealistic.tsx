import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

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
  // Medical icons data with orbital parameters (made smaller with new colors)
  const medicalIcons = [
    { 
      path: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 8L21 9ZM3 9L5 8L3 7V9ZM12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21ZM5.5 7.5C6.3 6.7 7.6 6.7 8.4 7.5C9.2 8.3 9.2 9.6 8.4 10.4C7.6 11.2 6.3 11.2 5.5 10.4C4.7 9.6 4.7 8.3 5.5 7.5ZM18.5 16.5C19.3 15.7 20.6 15.7 21.4 16.5C22.2 17.3 22.2 18.6 21.4 19.4C20.6 20.2 19.3 20.2 18.5 19.4C17.7 18.6 17.7 17.3 18.5 16.5Z",
      name: "stethoscope",
      radius: 45,
      speed: 1,
      scale: 0.4,
      color: "#DC2626" // RED
    },
    {
      path: "M20 6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H20C21.1 18 22 17.1 22 16V8C22 6.9 21.1 6 20 6ZM20 16H4V8H20V16ZM6 10H8V14H6V10ZM10 10H12V14H10V10ZM14 10H16V14H14V10ZM18 10H20V14H18V10Z",
      name: "thermometer",
      radius: 50,
      speed: 0.8,
      scale: 0.35,
      color: "#F59E0B" // GOLD
    },
    {
      path: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
      name: "reflex-hammer",
      radius: 55,
      speed: 1.2,
      scale: 0.45,
      color: "#000000" // BLACK
    },
    {
      path: "M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z",
      name: "heartbeat",
      radius: 40,
      speed: 1.5,
      scale: 0.3,
      color: "#FAFAFA" // OFF-WHITE
    },
    {
      path: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z",
      name: "prescription",
      radius: 60,
      speed: 0.9,
      scale: 0.4,
      color: "#DC2626" // RED
    },
    {
      path: "M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z",
      name: "syringe",
      radius: 35,
      speed: 1.8,
      scale: 0.25,
      color: "#F59E0B" // GOLD
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
        repeat: -1
      });      // Earth orbital motion around sun (perfectly centered around the sun)
      gsap.to(earthRef.current, {
        motionPath: {
          path: `M${size/2 + 1},${size/2} m-10,0 a10,10 0 1,1 20,0 a10,10 0 1,1 -20,0`,
          autoRotate: false
        },
        duration: 15,
        ease: "none",
        repeat: -1
      });
    }

    // Medical icons orbital animations
    medicalIconsRef.current.forEach((iconRef, index) => {
      if (iconRef) {
        const icon = medicalIcons[index];
        
        // Create orbital path for each medical icon
        gsap.to(iconRef, {
          motionPath: {
            path: `M${size/2},${size/2} m-${icon.radius},0 a${icon.radius},${icon.radius} 0 1,1 ${icon.radius*2},0 a${icon.radius},${icon.radius} 0 1,1 -${icon.radius*2},0`,
            autoRotate: true
          },
          duration: 15 / icon.speed,
          ease: "none",
          repeat: -1,
          delay: index * 0.5 // Stagger the start times
        });

        // Icon self-rotation
        gsap.to(iconRef, {
          rotation: 360,
          duration: 4 / icon.speed,
          ease: "none",
          repeat: -1
        });

        // Floating effect
        gsap.to(iconRef, {
          y: "+=3",
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
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
  }, [size]);

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
        </g>        {/* Earth */}
        <g ref={earthRef}>
          {/* Earth shadow */}
          <ellipse
            cx={size/2 + 10}
            cy={size/2 + 2}
            rx="3"
            ry="1.5"
            fill="#000000"
            opacity="0.2"
          />
          
          {/* Earth base */}
          <circle
            cx={size/2 + 10}
            cy={size/2}
            r="6"
            fill="url(#earthOcean)"
            filter="url(#shadow3D)"
          />
          
          {/* Continents */}
          <g transform={`translate(${size/2 + 10}, ${size/2})`}>
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
          
          {/* Cloud layer */}
          <circle
            cx={size/2 + 10}
            cy={size/2}
            r="6.5"
            fill="url(#earthClouds)"
            opacity="0.4"
          />
          
          {/* Atmospheric glow */}
          <circle
            cx={size/2 + 10}
            cy={size/2}
            r="7"
            fill="none"
            stroke="#87ceeb"
            strokeWidth="0.4"
            opacity="0.3"
          />
        </g>{/* Medical Icons */}
        {medicalIcons.map((icon, index) => (
          <g
            key={icon.name}
            ref={(el) => {
              if (el) medicalIconsRef.current[index] = el;
            }}
            transform={`scale(${icon.scale})`}
            className="cursor-pointer transition-all duration-300 hover:scale-110"
          >
            {/* Icon glow background */}
            <circle
              r="4"
              fill={icon.color}
              opacity="0.1"
              filter="url(#glow)"
            />
            
            {/* Medical icon with new colors */}
            <g transform="translate(-12, -12)">
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
            
            {/* Orbital trail effect with matching color */}
            <circle
              r="0.5"
              fill={icon.color}
              opacity="0.4"
              className="animate-ping"
            />
          </g>
        ))}        {/* Orbital paths (visible on hover) with matching colors */}
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
