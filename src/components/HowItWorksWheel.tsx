import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

// Define props interface for section compatibility
interface SectionProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
}

// Centralized configuration for all wordings and settings
const WHEEL_CONFIG = {
  // Main heading
  MAIN_TITLE: "HOW IT WORKS",  // Animation timing - centralized for perfect synchronization
  ROTATION_DURATION: 53, // seconds for one full rotation (slowed down by 4 more seconds from 49 to 53)
  SPEED_MULTIPLIER: {
    NORMAL: 1,
    FAST: 1.5, // Reduced from 2 to make it less jarring
    SLOW: 0.7
  },
  SPEED_RESET_DELAY: 3000, // milliseconds
    // Step data with centralized content
  STEPS: [
    {
      id: 1,
      title: "Create Account. Get Verified",
      description: "Sign up. Join a healthcare network that truly cares for your professional growth.",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2v-6zm0 8h-2v2h2v-2z",
      buttonText: "Get Started",
      position: { top: 50, left: "50%", transform: "translateX(-50%)" },
      markerPosition: { top: 0, left: "50%", transform: "translateX(-50%)" }
    },
    {
      id: 2,
      title: "Share Your Experience",
      description: "Leave valuable feedback about your healthcare experiences to help others make informed decisions.",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      buttonText: "Share Now",
      position: { top: "50%", right: 50, transform: "translateY(-50%)" },
      markerPosition: { top: "50%", right: 0, transform: "translateY(-50%)" }
    },
    {
      id: 3,
      title: "Earn & Grow",
      description: "Get rewarding opportunities, win competitions, create courses, and accelerate your career growth.",
      icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
      buttonText: "Explore Jobs",
      position: { bottom: 50, left: "50%", transform: "translateX(-50%)" },
      markerPosition: { bottom: 0, left: "50%", transform: "translateX(-50%)" }    },
    {
      id: 4,
      title: "Connect & Network",
      description: "Join vibrant discussions, find mentors, and build meaningful professional relationships that last.",
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
      buttonText: "Join Community",
      position: { top: "50%", left: 50, transform: "translateY(-50%)" },
      markerPosition: { top: "50%", left: 0, transform: "translateY(-50%)" }
    }
  ]
} as const;

const HowItWorksWheel: React.FC<SectionProps> = ({ isActive, sectionName, scrollToSection }) => {  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  // State for interactive wheel control
  const [rotationSpeed, setRotationSpeed] = useState<number>(WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL);
  const [isHovered, setIsHovered] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const speedResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Add a new state for rotation direction
  const [rotationDirection, setRotationDirection] = useState<number>(1); // 1 for clockwise, -1 for counterclockwise
  // Enhanced floating background particles and 3D medical elements animation
  useEffect(() => {
    if (!isActive) return; // Added return statement here

    // const createFloatingParticle = () => {
    //   const particle = document.createElement(\'div\');
    //   particle.className = \'floating-particle\';
    //   particle.style.cssText = `
    //     position: absolute;
    //     width: ${Math.random() * 6 + 2}px;
    //     height: ${Math.random() * 6 + 2}px;
    //     background: ${isDark 
    //       ? \'radial-gradient(circle, rgba(184,134,11,0.55) 0%, rgba(50,25,85,0.35) 50%, rgba(40,20,80,0.25) 100%)\'
    //       : \'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,182,193,0.3) 50%, rgba(212,175,55,0.2) 100%)\'};
    //     border-radius: 50%;
    //     pointer-events: none;
    //     z-index: 1;
    //     left: ${Math.random() * 100}%;
    //     top: ${Math.random() * 100}%;
    //     animation: floatUp ${Math.random() * 8 + 6}s linear infinite;
    //     backdrop-filter: blur(1px);
    //     box-shadow: 0 0 ${Math.random() * 10 + 5}px ${isDark ? \'rgba(184,134,11,0.3)\' : \'rgba(255,215,0,0.3)\'};
    //   `;
      
    //   const container = document.querySelector(\'.floating-particles-container\');
    //   if (container) {
    //     container.appendChild(particle);
        
    //     // Remove particle after animation
    //     setTimeout(() => {
    //       if (particle.parentNode) {
    //         particle.parentNode.removeChild(particle);
    //       }
    //     }, 14000);
    //   }
    // };

    // // Create sophisticated 3D floating medical icons for background
    // const create3DMedicalIcon = () => {
    //   const medicalIcons = [
    //     // Heart/ECG Monitor
    //     { 
    //       path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    //       colors: ["#FF1744", "#FF4569", "#FF6B8A"],
    //       name: "heart",
    //       secondaryPath: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    //     },
    //     // Stethoscope
    //     { 
    //       path: "M12 1C8.7 1 6 3.7 6 7v8c0 .6-.4 1-1 1s-1-.4-1-1c0-.6-.4-1-1-1s-1 .4-1 1c0 1.7 1.3 3 3 3s3-1.3 3-3V7c0-2.2 1.8-4 4-4s4 1.8 4 4v8c0 1.7 1.3 3 3 3s3-1.3 3-3c0-.6-.4-1-1-1s-1 .4-1 1c0 .6-.4 1-1 1s-1-.4-1-1V7c0-3.3-2.7-6-6-6z",
    //       colors: ["#00C851", "#28A745", "#20C997"],
    //       name: "stethoscope",
    //       secondaryPath: "M18 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    //     },
    //     // Medical Cross
    //     { 
    //       path: "M17.5 12c0 .8-.7 1.5-1.5 1.5h-3v3c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-3H7c-.8 0-1.5-.7-1.5-1.5S6.2 10.5 7 10.5h3v-3c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v3h3c.8 0 1.5.7 1.5 1.5z",
    //       colors: ["#FF3547", "#DC143C", "#B71C1C"],
    //       name: "medical-cross",
    //       secondaryPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    //     },
    //     // Pills/Medicine
    //     { 
    //       path: "M21.5 9h-6C14.7 9 14 8.3 14 7.5S14.7 6 15.5 6h6c.8 0 1.5.7 1.5 1.5S22.3 9 21.5 9zM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3.5-3h-6C1.7 9 1 8.3 1 7.5S1.7 6 2.5 6h6C9.3 6 10 6.7 10 7.5S9.3 9 8.5 9z",
    //       colors: ["#2196F3", "#1976D2", "#0D47A1"],
    //       name: "pills",
    //       secondaryPath: "M18 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-12 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
    //     },
    //     // Medical Bag
    //     { 
    //       path: "M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68A2.996 2.996 0 0 0 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z",
    //       colors: ["#8D6E63", "#6D4C41", "#4E342E"],
    //       name: "medical-bag",
    //       secondaryPath: "M15 9c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-6 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"
    //     },
    //     // Syringe
    //     { 
    //       path: "M6 12h12v2H6v-2zm2-4h8v2H8V8zm2 8h4v2h-4v-2z M19 13h-2V9h2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1z M7 13H5c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h2v4z",
    //       colors: ["#9E9E9E", "#757575", "#424242"],
    //       name: "syringe",
    //       secondaryPath: "M21 7l-4-4-1.41 1.41L17.17 6H10v2h7.17l-1.58 1.59L17 11l4-4z"
    //     }
    //   ];
      
    //   const icon = medicalIcons[Math.floor(Math.random() * medicalIcons.length)];
    //   const size = Math.random() * 20 + 20; // 20-40px for better visibility but not interference
    //   const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity
      
    //   const element = document.createElement(\'div\');
    //   element.className = \'floating-3d-medical-icon\';
    //   element.style.cssText = `
    //     position: absolute;
    //     width: ${size}px;
    //     height: ${size}px;
    //     left: ${Math.random() * 100}%;
    //     top: ${Math.random() * 100}%;
    //     pointer-events: none;
    //     z-index: 1;
    //     opacity: ${opacity};
    //     animation: float3DMedical ${Math.random() * 15 + 20}s linear infinite;
    //     filter: drop-shadow(0 0 8px ${icon.colors[0]}) blur(0.5px);
    //     transform-style: preserve-3d;
    //     transition: all 0.3s ease;
    //   `;
      
    //   // Create complex SVG with multiple layers
    //   element.innerHTML = `
    //     <svg viewBox="0 0 24 24" style="width: 100%; height: 100%; position: relative;">
    //       <defs>
    //         <linearGradient id="grad-${icon.name}-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
    //           <stop offset="0%" style="stop-color:${icon.colors[0]};stop-opacity:1" />
    //           <stop offset="50%" style="stop-color:${icon.colors[1]};stop-opacity:0.8" />
    //           <stop offset="100%" style="stop-color:${icon.colors[2]};stop-opacity:0.6" />
    //         </linearGradient>
    //         <filter id="glow-${icon.name}-${Date.now()}">
    //           <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
    //           <feMerge> 
    //             <feMergeNode in="coloredBlur"/>
    //             <feMergeNode in="SourceGraphic"/>
    //           </feMerge>
    //         </filter>
    //       </defs>
    //       ${icon.secondaryPath ? `<path d="${icon.secondaryPath}" fill="${icon.colors[2]}" opacity="0.4"/>` : \'\'}
    //       <path d="${icon.path}" fill="url(#grad-${icon.name}-${Date.now()})" filter="url(#glow-${icon.name}-${Date.now()})"/>
    //     </svg>
    //   `;
      
    //   // Add hover effect
    //   element.addEventListener(\'mouseenter\', () => {
    //     element.style.transform = \'scale(1.3) rotateY(180deg)\';
    //     element.style.filter = `drop-shadow(0 0 15px ${icon.colors[0]}) brightness(1.3)`;
    //   });
      
    //   element.addEventListener(\'mouseleave\', () => {
    //     element.style.transform = \'scale(1) rotateY(0deg)\';
    //     element.style.filter = `drop-shadow(0 0 8px ${icon.colors[0]}) blur(0.5px)`;
    //   });
      
    //   const container = document.querySelector(\'.floating-3d-container\');
    //   if (container) {
    //     container.appendChild(element);
        
    //     // Remove after animation cycle
    //     setTimeout(() => {
    //       if (element.parentNode) {
    //         element.parentNode.removeChild(element);
    //       }
    //     }, 35000); // Longer lifecycle for better effect
    //   }
    // };

    // // Create particles at intervals
    // const particleInterval = setInterval(createFloatingParticle, 800);
    // const medicalIconInterval = setInterval(create3DMedicalIcon, 1500);
    
    // // Create initial batch
    // for (let i = 0; i < 8; i++) {
    //   setTimeout(createFloatingParticle, i * 200);
    // }
    
    // // Create initial medical icons
    // for (let i = 0; i < 6; i++) {
    //   setTimeout(create3DMedicalIcon, i * 600);
    // }

    // return () => {
    //   clearInterval(particleInterval);
    //   clearInterval(medicalIconInterval);
    // };
  }, [isActive, isDark]);
  // Enhanced wheel click handler with smooth rotation reversal
  const handleWheelClick = useCallback((event: React.MouseEvent) => {
    if (!wheelRef.current) return;
    
    // Clear any existing timeout
    if (speedResetTimeoutRef.current) {
      clearTimeout(speedResetTimeoutRef.current);
    }
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = event.clientX;
    const clickY = event.clientY;
    
    // Calculate distance from center to determine if click is inside the wheel
    const distanceFromCenter = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );
    const wheelRadius = rect.width / 2;
      // Only reverse if clicked inside the wheel (not on the edges/step cards)
    if (distanceFromCenter < wheelRadius * 0.6) {
      // Smooth direction reversal - maintain the new direction permanently
      setRotationDirection(prev => -prev);
      setRotationSpeed(prev => {
        const newDirection = prev > 0 ? -1 : 1;
        return newDirection * WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL;
      });
      
      // No timeout reset - let the new direction persist
    } else {
      // Original edge click behavior for speed control
      const isLeftSide = clickX < centerX;
      
      if (event.type === 'click') {
        const newSpeed = isLeftSide ? 
          rotationDirection * WHEEL_CONFIG.SPEED_MULTIPLIER.FAST : 
          -rotationDirection * WHEEL_CONFIG.SPEED_MULTIPLIER.FAST;
        setRotationSpeed(newSpeed);
      } else if (event.type === 'contextmenu') {
        event.preventDefault();
        const newSpeed = isLeftSide ? 
          -rotationDirection * WHEEL_CONFIG.SPEED_MULTIPLIER.FAST : 
          rotationDirection * WHEEL_CONFIG.SPEED_MULTIPLIER.FAST;
        setRotationSpeed(newSpeed);
      }
      
      speedResetTimeoutRef.current = setTimeout(() => {
        setRotationSpeed(prevSpeed => {
          const newSpeed = prevSpeed > 0 ? 
            WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL : 
            -WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL;
          return newSpeed;
        });
      }, WHEEL_CONFIG.SPEED_RESET_DELAY);
    }
  }, [rotationDirection]);

  // Button link handlers using centralized step data
  const handleStepClick = useCallback(
    (step: number) => {
      switch (step) {
        case 1:
        case 2:
          navigate("/signup");
          break;
        case 3:
          navigate("/jobs");
          break;
        case 4:
          navigate("/community");
          break;
        default:
          break;
      }
    },
    [navigate]
  ); // Removed comma here

  // Calculate synchronized rotation duration
  const getRotationDuration = useCallback(() => {
    return WHEEL_CONFIG.ROTATION_DURATION / Math.abs(rotationSpeed);
  }, [rotationSpeed]);

  return (
    <section className={`flex flex-col items-center justify-center w-full py-8 md:py-12 min-h-screen relative overflow-hidden transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-80'}`} 
    style={{
      background: isDark 
        ? 'radial-gradient(circle at center, #101010 0%, rgba(40,20,80,0.35) 30%, rgba(184,134,11,0.2) 60%, #0A0A0A 100%)' // Updated dark mode section background
        : 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,215,0,0.15) 25%, rgba(212,175,55,0.1) 50%, rgba(255,182,193,0.2) 75%, rgba(248,248,255,0.9) 100%)'
    }}>
        {/* Floating Particles Container */}
      {/* <div className="floating-particles-container absolute inset-0 pointer-events-none" /> */}
        {/* Medical Icons Floating Container */}
      {/* <div className="floating-3d-container absolute inset-0 pointer-events-none" /> */}
        {/* Enhanced glassmorphism background layers */}
      <div className={`absolute inset-0 opacity-30 ${
        isDark 
          ? 'from-indigo-900/25 via-yellow-800/20 to-black/50' // Updated dark mode overlay gradient
          : 'bg-gradient-to-br from-yellow-50/30 via-red-50/20 to-gray-50/25'
      }`} />        {/* World-Class Professional Animated Title Section */}
        <div className="title-container relative mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-[95vw] sm:max-w-5xl md:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 overflow-hidden">
          {/* Advanced Background Geometric Elements */}
          <div className="title-bg-elements absolute inset-0 pointer-events-none">
            {/* Animated geometric shapes */}
            <div className={`absolute top-2 sm:top-4 left-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-10 sm:opacity-15 md:opacity-20 ${
              isDark ? 'bg-gradient-to-br from-[#FFD700] to-[#B8860B]' : 'bg-gradient-to-br from-[#DC143C] to-[#FF6B6B]'
            } transform rotate-45 animate-spin`} style={{ animationDuration: '20s' }} />
            <div className={`absolute top-3 sm:top-6 md:top-8 right-1/4 w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-8 sm:opacity-12 md:opacity-15 ${
              isDark ? 'bg-gradient-to-tr from-[#D4AF37] to-[#FFD700]' : 'bg-gradient-to-tr from-[#FF4444] to-[#DC143C]'
            } rounded-full animate-bounce`} style={{ animationDuration: '3s' }} />
            <div className={`absolute bottom-2 sm:bottom-4 left-1/3 w-12 h-0.5 sm:w-16 sm:h-0.5 md:w-20 md:h-1 ${
              isDark ? 'bg-gradient-to-r from-transparent via-[#FFD700] to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-[#DC143C] to-transparent'
            } animate-pulse`} />
            <div className={`absolute bottom-3 sm:bottom-6 md:bottom-8 right-1/3 w-14 h-0.5 sm:w-20 sm:h-0.5 md:w-24 md:h-1 ${
              isDark ? 'bg-gradient-to-r from-transparent via-[#B8860B] to-transparent' 
                     : 'bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent'
            } animate-pulse`} style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Main Title with World-Class Professional Design */}
          <div className="relative z-10">            <h1 className={`text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold uppercase relative transition-all duration-1000`}
            style={{ 
              textShadow: "none",
              color: "#DC143C", // Bright red color for both modes
              background: "transparent",
              backgroundClip: "initial",
              WebkitBackgroundClip: "initial",
              filter: 'none'
            }}>
              <span className="title-word inline-block transform transition-all duration-500 hover:scale-105 sm:hover:scale-110 md:hover:scale-125 hover:rotate-1 sm:hover:rotate-2 md:hover:rotate-3 cursor-pointer"
                    style={{ animation: 'titleWordFloat 6s ease-in-out infinite' }}>
                HOW
              </span>
              <span className="title-separator mx-2 sm:mx-4 md:mx-6 lg:mx-8 inline-block opacity-80 transform transition-all duration-300"
                    style={{ animation: 'titleGlow 3s ease-in-out infinite alternate' }}>
                ❖
              </span>
              <span className="title-word inline-block transform transition-all duration-500 hover:scale-105 sm:hover:scale-110 md:hover:scale-125 hover:rotate-1 sm:hover:rotate-2 md:hover:rotate-3 cursor-pointer"
                    style={{ animation: 'titleWordFloat 6s ease-in-out infinite 2s' }}>
                IT
              </span>
              <span className="title-separator mx-2 sm:mx-4 md:mx-6 lg:mx-8 inline-block opacity-80 transform transition-all duration-300"
                    style={{ animation: 'titleGlow 3s ease-in-out infinite alternate 1s' }}>
                ❖
              </span>
              <span className="title-word inline-block transform transition-all duration-500 hover:scale-105 sm:hover:scale-110 md:hover:scale-125 hover:rotate-1 sm:hover:rotate-2 md:hover:rotate-3 cursor-pointer"
                    style={{ animation: 'titleWordFloat 6s ease-in-out infinite 4s' }}>
                WORKS
              </span>
            </h1>
            
          {/* Enhanced Decorative Elements */}
          <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10 space-x-3 sm:space-x-4 md:space-x-6 relative z-10">
            <div className={`w-12 h-0.5 sm:w-16 sm:h-0.5 md:w-20 md:h-1 lg:w-24 lg:h-1 ${
              isDark ? 'bg-gradient-to-r from-transparent via-[#FFD700] to-[#D4AF37]' 
                     : 'bg-gradient-to-r from-transparent via-[#DC143C] to-[#FF4444]'
            }`} style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
            <div className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
              isDark ? 'bg-[#FFD700] shadow-lg sm:shadow-xl md:shadow-2xl shadow-[#FFD700]/60' 
                     : 'bg-[#DC143C] shadow-lg sm:shadow-xl md:shadow-2xl shadow-[#DC143C]/60'
            } relative`} style={{ animation: 'centerGemPulse 3s ease-in-out infinite' }}>
              <div className={`absolute inset-0 rounded-full ${
                isDark ? 'bg-[#FFD700]' : 'bg-[#DC143C]'
              } opacity-50`} style={{ animation: 'centerGemRing 2s ease-in-out infinite' }} />
            </div>
            <div className={`w-12 h-0.5 sm:w-16 sm:h-0.5 md:w-20 md:h-1 lg:w-24 lg:h-1 ${
              isDark ? 'bg-gradient-to-l from-transparent via-[#FFD700] to-[#D4AF37]' 
                     : 'bg-gradient-to-l from-transparent via-[#DC143C] to-[#FF4444]'
            }`} style={{ animation: 'pulseGlow 2s ease-in-out infinite 1s' }} />
          </div>
          
          {/* Floating Medical Icons for Title */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-5 sm:opacity-8 md:opacity-10 ${
                  isDark ? 'text-[#FFD700]' : 'text-[#DC143C]'
                }`}
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${8 + (i % 2) * 70}%`,
                  animation: `titleIconFloat ${8 + i * 2}s ease-in-out infinite ${i}s`
                }}
              >
                {i === 0 && <span>🏥</span>}
                {i === 1 && <span>💊</span>}
                {i === 2 && <span>⚕️</span>}
                {i === 3 && <span>🩺</span>}
              </div>
            ))}          </div>
        </div>
      </div>
        
      <div
        className="relative mx-auto metallic-perspective flex-grow"
        style={{
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
          maxWidth: "95vw",
          maxHeight: "85vh",
          perspective: 1800,
        }}
      >
        {/* Background cycles with enhanced glassmorphism */}
        <div
          className={`background-cycle cycle-outer metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 'min(750px, 93.75%)',
            height: 'min(750px, 93.75%)',
            border: `2.5px dashed ${isDark ? 'rgba(184,134,11,0.65)' : 'rgba(212,175,55,0.5)'}`, // Updated dark mode border
            borderRadius: "50%",
            backdropFilter: "blur(12px) saturate(180%)",            background: isDark
              ? "radial-gradient(circle, rgba(10,10,10,0.2) 0%, rgba(40,20,80,0.25) 35%, rgba(184,134,11,0.15) 70%, rgba(5,5,5,0.3) 100%)" // Updated dark mode background
              : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,215,0,0.08) 35%, rgba(212,175,55,0.05) 70%, rgba(255,182,193,0.1) 100%)",
            boxShadow: isDark
              ? "0 8px 32px 0 rgba(40,20,80,0.3), 0 0 70px 12px #B8860B inset, 0 0 100px 5px rgba(184,134,11,0.12)" // Updated dark mode boxShadow
              : "0 8px 32px 0 rgba(31,38,135,0.18), 0 0 60px 10px #D4AF37 inset",
            zIndex: -1,
          }}
        ></div>        <div
          className={`background-cycle cycle-middle metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 'min(650px, 81.25%)',
            height: 'min(650px, 81.25%)',
            border: `3.5px solid ${isDark ? 'rgba(184,134,11,0.55)' : 'rgba(212,175,55,0.25)'}`, // Updated dark mode border
            borderRadius: "50%",            background: isDark
              ? "radial-gradient(circle, rgba(15,15,15,0.25) 0%, rgba(40,20,80,0.3) 30%, rgba(184,134,11,0.2) 60%, rgba(10,10,10,0.25) 100%)" // Updated dark mode background
              : "radial-gradient(circle,rgba(255,255,255,0.18) 0%,rgba(255,215,0,0.1) 30%,rgba(212,175,55,0.06) 60%,rgba(255,182,193,0.08) 100%)",
            backdropFilter: "blur(20px) saturate(200%)",
            boxShadow: isDark
              ? "0 0 50px 10px #B8860B inset, 0 0 80px 3px rgba(184,134,11,0.18)" // Updated dark mode boxShadow
              : "0 0 40px 8px #D4AF37 inset",
            zIndex: -1,
          }}
        ></div>        <div
          className={`background-cycle cycle-inner metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 'min(550px, 68.75%)',
            height: 'min(550px, 68.75%)',
            border: `1.5px solid ${isDark ? 'rgba(200,200,220,0.25)' : 'rgba(255,255,255,0.5)'}`, // Updated dark mode border
            borderRadius: "50%",            background: isDark
              ? "radial-gradient(circle, rgba(20,20,20,0.3) 0%, rgba(40,20,80,0.35) 25%, rgba(184,134,11,0.25) 50%, rgba(50,25,85,0.25) 75%, rgba(15,15,15,0.2) 100%)" // Updated dark mode background
              : "radial-gradient(circle,rgba(255,255,255,0.2) 0%,rgba(255,215,0,0.12) 25%,rgba(212,175,55,0.08) 50%,rgba(255,182,193,0.1) 75%,rgba(248,248,255,0.15) 100%)",
            backdropFilter: "blur(25px) saturate(220%)",            boxShadow: isDark
              ? "0 0 40px 8px #B8860B inset, 0 0 70px 2px rgba(184,134,11,0.22)" // Updated dark mode boxShadow
              : "0 0 30px 6px #D4AF37 inset",
            zIndex: -1,
          }}
        ></div>        {/* Central Light Bulb - Theme Responsive */}
        <div
          className="central-light-bulb"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 'min(80px, 10vw)',
            height: 'min(80px, 10vw)',
            zIndex: 10,
            animation: `lightBulbGlow ${getRotationDuration()}s ease-in-out infinite`,
          }}
        >
          {/* Light bulb SVG with theme-responsive glow */}
          <svg
            viewBox="0 0 24 24"
            style={{
              width: "100%",
              height: "100%",
              filter: isDark 
                ? "drop-shadow(0 0 15px #B8860B) drop-shadow(0 0 30px #A07C1F) drop-shadow(0 0 45px #B8860B)" // Updated dark mode filter
                : "drop-shadow(0 0 8px rgba(212,175,55,0.3)) drop-shadow(0 0 15px rgba(212,175,55,0.2))",
              transition: "all 0.5s ease",
            }}
          >
            <defs>
              <radialGradient id="bulbGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor={isDark ? "#D4AF37" : "#D4AF37"} /> 
                <stop offset="70%" stopColor={isDark ? "#B8860B" : "#B8860B"} />
                <stop offset="100%" stopColor={isDark ? "#A07C1F" : "#8B7355"} />
              </radialGradient>
              <radialGradient id="baseGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C0C0C0" />
                <stop offset="100%" stopColor="#808080" />
              </radialGradient>
            </defs>
            
            {/* Light bulb glass */}
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
              fill="url(#bulbGradient)"
              opacity={isDark ? 0.9 : 0.6} // Updated dark mode opacity
            />
            
            {/* Light bulb base/screw */}
            <rect x="9" y="18" width="6" height="1.5" fill="url(#baseGradient)" />
            <rect x="9" y="19.5" width="6" height="1" fill="url(#baseGradient)" />
            <rect x="9" y="20.5" width="6" height="1.5" fill="url(#baseGradient)" />
            
            {/* Filament lines for detail */}
            <path
              d="M10 8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8z"
              fill={isDark ? "#D4AF37" : "rgba(212,175,55,0.4)"} // Updated dark mode filament fill
              opacity={isDark ? 0.8 : 0.3}
            />
            <path
              d="M13 10c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1v-2z"
              fill={isDark ? "#D4AF37" : "rgba(212,175,55,0.4)"} // Updated dark mode filament fill
              opacity={isDark ? 0.6 : 0.2}
            />
          </svg>
            {/* Additional glow effect for dark mode */}
          {isDark && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 'min(120px, 15vw)',
                height: 'min(120px, 15vw)',
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184,134,11,0.25) 0%, rgba(160,124,31,0.15) 50%, transparent 100%)", // Updated dark mode glow background
                animation: `lightBulbPulse ${getRotationDuration() * 0.5}s ease-in-out infinite alternate`,
                zIndex: -1,
              }}
            />
          )}
        </div>{/* Enhanced connecting lines with theme support */}
        <div
          className="connecting-lines"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            zIndex: -2,
          }}
        >
          {[0, 90, 180, 270].map((rotation, index) => (
            <div
              key={index}
              className={`connecting-line metallic-line transition-all duration-700 ${
                isDark ? 'dark-line' : 'light-line'
              }`}
              style={{                position: "absolute",
                top: "50%",
                left: "50%",
                width: 'min(375px, 46.875%)',
                height: 2,
                background: isDark
                  ? "linear-gradient(90deg, rgba(184,134,11,0.3), rgba(184,134,11,0.75), rgba(200,200,220,0.2))" // Updated dark mode background
                  : "linear-gradient(90deg,rgba(212,175,55,0.18),rgba(212,175,55,0.5))",
                boxShadow: isDark
                  ? "0 0 10px 2px #B8860B, 0 0 20px 1px rgba(184,134,11,0.25)" // Updated dark mode boxShadow
                  : "0 0 8px 2px #D4AF37",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "left center",
                filter: isDark ? "brightness(1.2)" : "brightness(1)",
              }}
            ></div>
          ))}
        </div>        {/* Interactive rotating wheel with synchronized timing */}        <div          ref={wheelRef}
          className="wheel group metallic-3d cursor-pointer"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: `rotate ${getRotationDuration()}s linear infinite`,
            animationDirection: rotationSpeed >= 0 ? "normal" : "reverse",
            zIndex: 1,
            transformStyle: "preserve-3d",            background: isDark
              ? "transparent"
              : "conic-gradient(from 0deg, #1A1A1A 0%, #333333 50%, #1A1A1A 100%)", // Light mode: Black gradient
            boxShadow: isDark
              ? "0 20px 60px 0 rgba(40,20,80,0.35), 0 0 100px 12px #B8860B inset, 0 0 180px 5px rgba(184,134,11,0.15)"
              : "0 25px 80px 0 rgba(10,10,10,0.25), 0 0 120px 15px #2C2C2C inset, 0 0 200px 8px rgba(10,10,10,0.15)", // Adjusted shadow for black wheel
            border: isDark
              ? "none"
              : "3px solid transparent",
            backgroundClip: isDark ? "initial" : "padding-box",
            filter: isDark ? "brightness(1.1) contrast(1.1)" : "brightness(1.1) contrast(1.2) saturate(1.1)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={handleWheelClick}
          onContextMenu={handleWheelClick}onMouseEnter={(e) => {
            setIsHovered(true);
            const wheelElement = e.currentTarget;
            
            // Pause wheel rotation
            wheelElement.style.animationPlayState = "paused";
            
            // Pause all text and marker counter-rotations
            const allAnimatedElements = wheelElement.querySelectorAll(
              ".step-card-content, .marker-content" // Fixed selector
            );
            allAnimatedElements.forEach((el) => {
              (el as HTMLElement).style.animationPlayState = "paused";
            });
          }}          onMouseLeave={(e) => {
            setIsHovered(false);
            const wheelElement = e.currentTarget;
            
            // Resume wheel rotation
            wheelElement.style.animationPlayState = "running";
            
            // Resume all text and marker counter-rotations
            const allAnimatedElements = wheelElement.querySelectorAll(
              ".step-card-content, .marker-content" // Fixed selector
            );
            allAnimatedElements.forEach((el) => {
              (el as HTMLElement).style.animationPlayState = "running";
            });
          }}
        >          {/* Synchronized Step Markers using centralized data */}
          {WHEEL_CONFIG.STEPS.map((step) => (
            <div
              key={`marker-${step.id}`}
              className="step-marker"
              style={{
                position: "absolute",
                ...step.markerPosition,
                zIndex: 1, // Lower z-index to place numbers behind text
              }}
            >              <div                className={`marker-content transition-all duration-500 ${
                  isDark ? 'dark-marker' : 'light-marker'
                }`}
                style={{ 
                  animation: `counter-rotate ${getRotationDuration()}s linear infinite`,
                  animationDirection: rotationSpeed >= 0 ? "normal" : "reverse",
                  background: isDark
                    ? "linear-gradient(135deg, #000000 0%, #1a1a1a 60%, #333333 100%)" // Dark mode: Black gradient
                    : "#1A1A1A", // Light mode: Dark grey background for contrast
                  color: isDark ? "#FFD700" : "#FFD700", // Light mode: Gold text color for numbers
                  width: "min(50px, 6.25vw)",
                  height: "min(50px, 6.25vw)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "min(18px, 2.25vw)",
                  boxShadow: isDark
                    ? "0 7px 22px rgba(255,215,0,0.35), 0 0 25px 4px rgba(255,215,0,0.18) inset, 0 0 15px #FFD700"
                    : "0 6px 20px rgba(0,0,0,0.4), 0 0 10px 2px rgba(255,215,0,0.3) inset", // Light mode: Adjusted shadow for dark bg
                  border: isDark ? "2px solid rgba(255,215,0,0.4)" : "2px solid rgba(255,215,0,0.5)", // Light mode: Gold border
                  backdropFilter: "blur(10px)",                  textShadow: isDark 
                    ? "0 0 8px #FFD700, 0 0 16px #D4AF37"
                    : "0 0 5px #FFD700", // Light mode: Subtle gold text glow
                }}
              >
                {step.id}
              </div>
            </div>
          ))}          {/* Synchronized Step Cards using centralized content */}
          {WHEEL_CONFIG.STEPS.map((step) => (
            <div
              key={`card-${step.id}`}
              className="step-card"              style={{
                position: "absolute",
                ...step.position,
                width: 'min(180px, 22.5vw)',
                transformStyle: "preserve-3d",
                zIndex: 3, // Higher z-index to place text content above numbers
              }}
            ><div
                className="step-card-content"
                style={{
                  animation: `counter-rotate ${getRotationDuration()}s linear infinite`,
                  animationDirection: rotationSpeed >= 0 ? "normal" : "reverse",
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  display: "block", 
                }}
              >
                <div
                  className="step-icon" // This div will now counter-rotate via its parent
                  style={{                    // animation: `counter-rotate ${getRotationDuration()}s linear infinite ${getCounterRotationDirection()}`, // Removed animation
                    transformOrigin: "center center", 
                    width: 'min(60px, 7.5vw)',
                    height: 'min(60px, 7.5vw)',
                    background: isDark
                      ? "linear-gradient(135deg, rgba(184,134,11,0.4) 0%, rgba(40,20,80,0.35) 100%)" // Dark mode background
                      : "linear-gradient(135deg, #FFD700, #DC143C, #000000)", // Light mode: GOLD-RED-BLACK gradient
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px",
                    backdropFilter: "blur(8px)",
                    boxShadow: isDark
                      ? "0 9px 18px rgba(184,134,11,0.18), 0 0 25px 4px rgba(184,134,11,0.1) inset"
                      : "0 8px 15px rgba(212,175,55,0.1)",
                    border: isDark ? "1px solid rgba(200,200,220,0.25)" : "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{
                      width: 30,
                      height: 30,
                      fill: isDark ? "#D4AF37" : "#FFFFFF", // Light mode: White icon fill for contrast
                      filter: isDark
                        ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
                        : "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                      animation: isDark ? 'none' : 'iconPulse 2s infinite ease-in-out',
                    }}
                  >
                    <path d={step.icon} />
                  </svg>
                </div>
                  {/* Text content with counter-rotation to stay upright */}
                <div
                  className="step-text-content" // This div will now counter-rotate via its parent
                  style={{
                    // animation: `counter-rotate ${getRotationDuration()}s linear infinite ${getCounterRotationDirection()}`, // Removed animation
                    transformOrigin: "center center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                >                  <h3
                    className="step-title"
                    style={{                      fontWeight: isDark ? 700 : 900, // Much bolder in light mode
                      fontSize: 'min(18px, 2.25vw)', // Reduced from 22 for better proportion
                      marginBottom: 'min(10px, 1.25vw)',
                      color: isDark ? "#DC143C" : "#DC143C", // Light mode: Red titles, Dark mode: Red titles
                      textShadow: isDark 
                        ? "0 0 15px #DC143C, 0 0 30px #FF0000, 0 0 45px #DC143C, 0 0 60px #B22222" // Stronger red neon glow
                        : "none", // Light mode: No text shadow
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      letterSpacing: 0.5,
                      textAlign: "center",
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {step.title}                  </h3>                <div
                    className="step-desc"
                    style={{
                      fontSize: 'min(14px, 1.75vw)',
                      color: isDark ? "#FFD700" : "#000000", // Light mode: Black descriptions, Dark mode: Gold neon color
                      marginBottom: 'min(20px, 2.5vw)',
                      lineHeight: 1.6,
                      textAlign: "center",
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: isDark ? 400 : 600, // Bolder in light mode
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      maxWidth: "170px",
                      margin: "0 auto 20px auto",
                      textShadow: isDark 
                        ? "0 0 8px #FFD700, 0 0 16px #D4AF37, 0 0 24px #B8860B, 0 0 32px #AA8C2C" // Gold neon glow
                        : "0px 1px 2px rgba(0,0,0,0.2), 0px 0px 1px rgba(255,255,255,0.8)", // Stronger text shadow for light mode
                    }}
                  >
                    {step.description}
                  </div>                  <button
                    className="get-started-btn metallic-shine-btn"
                    style={{
                      background: isDark 
                        ? "linear-gradient(135deg, #FFD700, #B8860B)" // Dark mode: Gold gradient
                        : "linear-gradient(135deg, #CFB53B, #B8860B, #CFB53B)", // Light mode: Metallic gold gradient
                      color: isDark ? "#000000" : "#FFFFFF", // Dark mode: Black text, Light mode: White text
                      border: "none",
                      padding: "min(12px, 1.5vw) min(20px, 2.5vw)",
                      width: "min(160px, 20vw)",
                      margin: "0 auto",
                      borderRadius: 8,
                      fontWeight: isDark ? 700 : 800,
                      fontSize: 'min(14px, 1.75vw)',
                      letterSpacing: 0.8,
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isDark
                        ? "0 6px 20px rgba(0,0,0,0.6), 0 0 25px 5px rgba(255,255,255,0.1) inset, 0 0 15px #FFFFFF"
                        : "0 4px 15px rgba(212,175,55,0.3)",
                      display: "block",
                      position: "relative",
                      overflow: "hidden",
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      textAlign: "center",
                      textShadow: isDark 
                        ? "none" // Dark mode: No text shadow
                        : "0px 1px 2px rgba(0,0,0,0.2)",
                      animation: isDark ? 'none' : 'buttonShine 2.5s infinite ease-in-out',
                    }}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>
                      {step.buttonText}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{/* Enhanced CSS with synchronized timing and glassmorphism */}
      <style>
        {`
        /* Keyframes for rotation and floating particles */
        @keyframes rotate { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }        @keyframes counter-rotate { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(-360deg); } 
        }
        /* @keyframes floatUp {
          0% { 
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-20vh) scale(1.2);
            opacity: 0;
          }
        }        @keyframes float3DMedical {
          0% { 
            transform: translateY(100vh) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.3);
            opacity: 0;
          }
          5% {
            opacity: 0.6;
          }
          25% {
            transform: translateY(75vh) translateX(-30px) rotateX(90deg) rotateY(90deg) rotateZ(45deg) scale(0.8);
          }
          50% {
            transform: translateY(50vh) translateX(20px) rotateX(180deg) rotateY(180deg) rotateZ(180deg) scale(1);
          }
          75% {
            transform: translateY(25vh) translateX(-10px) rotateX(270deg) rotateY(270deg) rotateZ(315deg) scale(0.9);
          }
          95% {
            opacity: 0.6;
          }
          100% { 
            transform: translateY(-5vh) translateX(15px) rotateX(360deg) rotateY(360deg) rotateZ(360deg) scale(0.4);
            opacity: 0;
          }
        } */
          /* World-Class Professional Title Animations */
        @keyframes titleWordFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotateY(0deg);
          }
          25% { 
            transform: translateY(-8px) scale(1.02) rotateY(2deg);
          }
          50% { 
            transform: translateY(-4px) scale(1.01) rotateY(0deg);
          }
          75% { 
            transform: translateY(-12px) scale(1.03) rotateY(-2deg);
          }
        }
        
        @keyframes titleGlow {
          0%, 100% { 
            text-shadow: ${isDark 
              ? "0 0 30px #FFD700, 0 0 60px #D4AF37, 0 0 90px #B8860B, 0 4px 8px rgba(0,0,0,0.8)" 
              : "0px 6px 12px rgba(0,0,0,0.4), 0px 3px 6px rgba(220,20,60,0.6)"};
          }
          50% { 
            text-shadow: ${isDark 
              ? "0 0 40px #FFD700, 0 0 80px #D4AF37, 0 0 120px #B8860B, 0 0 160px #AA8C2C, 0 6px 12px rgba(0,0,0,0.9)" 
              : "0px 8px 16px rgba(0,0,0,0.5), 0px 4px 8px rgba(220,20,60,0.8), 0 0 30px rgba(220,20,60,0.3)"};
          }
        }
        
        @keyframes titleShine {
          0% { 
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% { 
            transform: translateX(200%) skewX(-12deg);
            opacity: 0;
          }
        }
        
        @keyframes subtitleFloat {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 0.9;
          }
          50% { 
            transform: translateY(-3px);
            opacity: 1;
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.7;
            filter: ${isDark ? 'blur(0px) brightness(1)' : 'blur(0px) brightness(1)'};
          }
          50% { 
            opacity: 1;
            filter: ${isDark ? 'blur(1px) brightness(1.3)' : 'blur(1px) brightness(1.1)'};
          }
        }
        
        @keyframes centerGemPulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            box-shadow: ${isDark 
              ? '0 0 20px #FFD700, 0 0 40px #D4AF37, 0 0 60px #B8860B' 
              : '0 0 20px #DC143C, 0 0 40px #FF4444'};
          }
          33% { 
            transform: scale(1.1) rotate(120deg);
            box-shadow: ${isDark 
              ? '0 0 30px #FFD700, 0 0 60px #D4AF37, 0 0 90px #B8860B' 
              : '0 0 30px #DC143C, 0 0 60px #FF4444'};
          }
          66% { 
            transform: scale(1.05) rotate(240deg);
            box-shadow: ${isDark 
              ? '0 0 25px #FFD700, 0 0 50px #D4AF37, 0 0 75px #B8860B' 
              : '0 0 25px #DC143C, 0 0 50px #FF4444'};
          }
        }
        
        @keyframes centerGemRing {
          0% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(2);
            opacity: 0.2;
          }
          100% { 
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes titleIconFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          25% { 
            transform: translateY(-10px) rotate(5deg) scale(1.1);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-5px) rotate(-3deg) scale(1.05);
            opacity: 0.15;
          }
          75% { 
            transform: translateY(-15px) rotate(8deg) scale(1.15);
            opacity: 0.25;
          }
        }
        
        /* Medical Icon Hover Effects */
        /* .floating-medical-icon:hover svg {
          transform: scale(1.2) rotate(15deg);
          filter: drop-shadow(0 4px 8px currentColor) brightness(1.2);
        } */
        @keyframes lightBulbGlow {
          0%, 100% { 
            filter: ${isDark
              ? "drop-shadow(0 0 15px #B8860B) drop-shadow(0 0 30px #A07C1F) drop-shadow(0 0 45px #B8860B)"
              : "drop-shadow(0 0 8px rgba(212,175,55,0.3)) drop-shadow(0 0 15px rgba(212,175,55,0.2))"};
          }
          50% { 
            filter: ${isDark 
              ? "drop-shadow(0 0 25px #B8860B) drop-shadow(0 0 50px #A07C1F) drop-shadow(0 0 75px #B8860B)"
              : "drop-shadow(0 0 12px rgba(212,175,55,0.4)) drop-shadow(0 0 20px rgba(212,175,55,0.3))"};
          }
        }
        @keyframes lightBulbPulse {
          0% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }
        
        @keyframes buttonShine {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(207, 181, 59, 0.3), 0 0 5px rgba(207, 181, 59, 0.2) inset;
          }
          50% {
            box-shadow: 0 6px 20px rgba(207, 181, 59, 0.5), 0 0 15px rgba(207, 181, 59, 0.4) inset;
          }
        }
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);

            filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.1)) brightness(1);
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.2)) brightness(1.2);
          }        }
        
        /* Professional Title Styling */
        .professional-title {
          animation: titleGlow 4s ease-in-out infinite;
          position: relative;
        }
        
        .professional-title .title-word {
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .professional-title .title-word:hover {
          animation: titleWordHover 0.6s ease-in-out;
        }
        
        .title-container {
          position: relative;
          overflow: hidden;
        }
        
        .title-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
 
            transparent, 
            ${isDark ? 'rgba(255,215,0,0.1)' : 'rgba(220,20,60,0.1)'}, 
            transparent);
          animation: titleShine 3s ease-in-out infinite;
          z-index: 1;
        }
        
        @keyframes titleShine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        
        /* Enhanced metallic heading with theme support */
        .metallic-heading {
          background: ${isDark 
            ? 'transparent' // Simple transparent background for dark mode
            : 'linear-gradient(90deg, #fff 0%, #D4AF37 40%, #AA8C2C 60%, #fff 100%)'};
          -webkit-background-clip: ${isDark ? 'initial' : 'text'};
          -webkit-text-fill-color: ${isDark ? '#FFD700' : 'transparent'}; // Simple gold color for dark mode
          background-clip: ${isDark ? 'initial' : 'text'};
          transition: all 0.7s ease;
        }
        
        /* Enhanced perspective and gradient effects */
        .metallic-perspective {
          perspective: 1800px;
          filter: ${isDark ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)'};
          transition: all 0.7s ease;
        }
        
        .metallic-gradient {
          background: ${isDark
            ? 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 40%, rgba(30,39,56,0.3) 80%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(135deg, #F4E9C9 0%, #D4AF37 60%, #AA8C2C 100%)'};
          transition: all 0.7s ease;
        }
        
        .metallic-3d {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced glassmorphism effects */
        .light-glassmorphism {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .dark-glassmorphism {
          background: rgba(30,39,56,0.2);
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid rgba(212,175,55,0.3);
        }
          /* Enhanced step card styling */
        .step-card {
          background: ${isDark 
            ? 'rgba(30,39,56,0.6)' 
            : 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)'}; /* Light mode: Solid gold gradient background */
          border-radius: 20px;
          box-shadow: ${isDark
            ? '0 15px 50px 0 rgba(31,38,135,0.35), 0 0 40px 6px #D4AF37 inset, 0 0 80px 2px rgba(212,175,55,0.1)'
            : '0 15px 40px rgba(212,175,55,0.4), 0 0 30px rgba(255,215,0,0.3), 0 0 60px rgba(184,134,11,0.2)'}; /* Light mode: Enhanced gold glow shadow */
          border: ${isDark 
            ? '2px solid rgba(212,175,55,0.3)' 
            : '2px solid #B8860B'}; /* Light mode: Darker gold border */
          backdrop-filter: ${isDark ? 'blur(25px) saturate(220%)' : 'none'}; /* Light mode: No backdrop filter */
          -webkit-backdrop-filter: ${isDark ? 'blur(25px) saturate(220%)' : 'none'}; /* Light mode: No backdrop filter */
          transition: all 0.5s cubic-bezier(.4,2,.3,1);
        }
        
        .step-card:hover {
          transform: rotateY(${isDark ? '10deg' : '8deg'}) scale(1.08) translateY(-12px);
          box-shadow: ${isDark
            ? '0 30px 80px 0 rgba(31,38,135,0.45), 0 0 60px 12px #D4AF37 inset, 0 0 120px 5px rgba(212,175,55,0.2)'
            : '0 15px 35px rgba(0, 0, 0, 0.15)'}; /* Light mode: Adjusted hover shadow */
          border-color: ${isDark ? 'rgba(212,175,55,0.5)' : '#B8860B'}; /* Light mode: Darker gold border on hover */
        }
        
        /* Enhanced button styling with metallic shine effect */
        .metallic-shine-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(212,175,55,0.3)'};
        }
        
        .metallic-shine-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.4)'}, 
            transparent);
          transition: left 0.8s ease-in-out;
          z-index: 1;
        }
        
        .metallic-shine-btn:hover {
          transform: scale(1.06) rotateZ(-2deg) translateY(-3px);
          background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%) !important;
          box-shadow: ${isDark
            ? '0 15px 45px rgba(220,20,60,0.5), 0 0 45px 10px rgba(220,20,60,0.3) inset, 0 0 80px 5px rgba(220,20,60,0.1)'
            : '0 12px 36px rgba(220,20,60,0.4), 0 0 36px 8px rgba(220,20,60,0.2) inset'};
          color: #fff !important;
          border-color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(220,20,60,0.5)'};
        }
        
        .metallic-shine-btn:hover::before {
          left: 100%;
        }
          .get-started-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(212,175,55,0.3)'};
        }        
        .get-started-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)'}, transparent);
          transition: left 0.8s ease-in-out;
          z-index: 1;
        }
        
        .get-started-btn:hover {
          transform: scale(1.06) rotateZ(-2deg) translateY(-3px);
          background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%) !important;
          box-shadow: ${isDark
            ? '0 15px 45px rgba(220,20,60,0.5), 0 0 45px 10px rgba(220,20,60,0.3) inset, 0 0 80px 5px rgba(220,20,60,0.1)'
            : '0 12px 36px rgba(220,20,60,0.4), 0 0 36px 8px rgba(220,20,60,0.2) inset'};
          color: #fff !important;
          border-color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(220,20,60,0.5)'};
        }
        
        .get-started-btn:hover::before {
          left: 100%;
        }
          /* Enhanced SVG icon styling */
        .step-icon svg {
          filter: drop-shadow(0px 3px 6px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(212,175,55,0.18)'});
          transition: all 0.5s cubic-bezier(.4,2,.3,1);
        }
          /* Dark mode neon enhancements */
        ${isDark ? `
        .step-title {
          animation: whiteNeonPulse 2s ease-in-out infinite alternate !important;
        }
          .step-desc {
          animation: goldNeonPulse 2.5s ease-in-out infinite alternate !important;
        }
        
        .marker-content {
          animation: goldNeonPulse 3s ease-in-out infinite alternate, counter-rotate ${getRotationDuration()}s linear infinite normal !important;
        }
        
        .metallic-heading {
          animation: multiColorNeonPulse 3s ease-in-out infinite alternate !important;
        }
        
        @keyframes whiteNeonPulse {
          0% { 
            text-shadow: 0 0 10px #FFFFFF, 0 0 20px #F5F5F5, 0 0 30px #E0E0E0, 0 0 40px #D3D3D3;
          }
          100% { 
            text-shadow: 0 0 15px #FFFFFF, 0 0 25px #F8F8FF, 0 0 35px #F0F8FF, 0 0 45px #E6E6FA;
          }
        }
        
        @keyframes redNeonPulse {
          0% { 
            text-shadow: 0 0 10px #FF4444, 0 0 20px #FF0000, 0 0 30px #DC143C, 0 0 40px #B22222;
          }
          100% { 
            text-shadow: 0 0 15px #FF6666, 0 0 25px #FF3333, 0 0 35px #FF1493, 0 0 45px #DC143C;
          }
        }
        
        @keyframes goldNeonPulse {
          0% { 
            text-shadow: 0 0 8px #FFD700, 0 0 16px #D4AF37, 0 0 24px #B8860B, 0 0 32px #AA8C2C;
          }
          100% { 
            text-shadow: 0 0 12px #FFFF00, 0 0 20px #FFD700, 0 0 28px #FFA500, 0 0 36px #D4AF37;
          }
        }
        
        @keyframes multiColorNeonPulse {
          0% { 
            text-shadow: 0 0 15px #FF4444, 0 0 25px #FFD700, 0 0 35px #F5F5F5, 0 0 45px #000000, 0 0 55px #DC143C;
          }
          50% { 
            text-shadow: 0 0 20px #FF6666, 0 0 30px #FFFF00, 0 0 40px #FFFFFF, 0 0 50px #333333, 0 0 60px #FF1493;
          }
          100% { 
            text-shadow: 0 0 18px #DC143C, 0 0 28px #FFA500, 0 0 38px #F0F8FF, 0 0 48px #1a1a1a, 0 0 58px #B22222;
          }
        }
        ` : ''}
        
        .step-card:hover .step-icon svg {
          transform: rotate(-12deg) scale(1.2);
          filter: drop-shadow(0px 4px 8px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(212,175,55,0.25)'});
        }
        
        /* Enhanced connecting lines */
        .metallic-line {
          transition: all 0.7s ease;
          filter: ${isDark ? 'brightness(1.3) saturate(1.2)' : 'brightness(1)'};
        }
        
        /* Marker content styling */
        .marker-content {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .marker-content:hover {
          transform: scale(1.1) !important;
        }
        
        /* Enhanced wheel interaction feedback */
        .wheel:hover {
          filter: ${isDark ? 'brightness(1.2) contrast(1.2)' : 'brightness(1.05)'};
        }
        
        /* Floating particles */        .floating-particle {
          will-change: transform, opacity;
          pointer-events: none;
        }
          /* Comprehensive Responsive Design for All Screen Sizes and Zoom Levels */
        
        /* Extra Small Mobile Devices (320px and below) */
        @media (max-width: 320px) {
          .title-container {
            padding: 0.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .professional-title {
            font-size: 1.5rem !important;
            line-height: 0.8 !important;
          }
          
          .title-separator {
            margin: 0.25rem !important;
          }
          
          .step-card {
            width: 120px !important;
          }
          
          .step-title {
            font-size: 12px !important;
          }
          
          .step-desc {
            font-size: 10px !important;
          }
          
          .get-started-btn {
            width: 100px !important;
            padding: 6px 10px !important;
            font-size: 10px !important;
          }
        }
        
        /* Small Mobile Devices (321px - 480px) */
        @media (min-width: 321px) and (max-width: 480px) {
          .title-container {
            padding: 0.75rem !important;
            margin-bottom: 2rem !important;
          }
          
          .professional-title {
            font-size: 2rem !important;
            line-height: 0.85 !important;
          }
          
          .title-separator {
            margin: 0.5rem !important;
          }
          
          .step-card {
            width: 140px !important;
          }
          
          .step-title {
            font-size: 14px !important;
          }
          
          .step-desc {
            font-size: 11px !important;
          }
          
          .get-started-btn {
            width: 120px !important;
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
        }
        
        /* Mobile Devices (481px - 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .title-container {
            padding: 1rem !important;
            margin-bottom: 2.5rem !important;
          }
          
          .professional-title {
            font-size: 2.5rem !important;
            line-height: 0.85 !important;
          }
          
          .title-separator {
            margin: 0.75rem !important;
          }
          
          .step-card {
            width: 160px !important;
          }
          
          .step-card:hover {
            transform: scale(1.05) translateY(-8px);
          }
          
          .step-title {
            font-size: 16px !important;
          }
          
          .step-desc {
            font-size: 12px !important;
          }
          
          .get-started-btn {
            width: 140px !important;
            padding: 10px 16px !important;
            font-size: 12px !important;
          }
        }
        
        /* Tablets (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .title-container {
            margin-bottom: 3rem !important;
          }
          
          .professional-title {
            font-size: 3.5rem !important;
          }
          
          .step-card {
            width: 170px !important;
          }
        }
        
        /* Desktop Zoom Level Handling (80% - 125%) */
        @media (min-width: 1025px) {
          /* 80% Zoom (Effective resolution: 1280x1024) */
          @media (min-resolution: 0.8dppx) {
            .title-container {
              max-width: 85vw !important;
              padding: 1rem !important;
            }
            
            .professional-title {
              font-size: 4rem !important;
              letter-spacing: 0.08em !important;
            }
            
            .title-separator {
              margin: 1rem !important;
            }
            
            .step-card {
              width: 160px !important;
            }
            
            .step-title {
              font-size: 16px !important;
            }
            
            .step-desc {
              fontSize: 13px !important;
            }
            
            .get-started-btn {
              width: 140px !important;
              padding: 10px 16px !important;
              font-size: 12px !important;
            }
          }
          
          /* 90% Zoom (Effective resolution: 1422x1138) */
          @media (min-resolution: 0.9dppx) {
            .title-container {
              max-width: 80vw !important;
            }
            
            .professional-title {
              font-size: 5rem !important;
              letter-spacing: 0.1em !important;
            }
            
            .step-card {
              width: 170px !important;
            }
          }
          
          /* 110% Zoom (Effective resolution: 1454x1165) */
          @media (min-resolution: 1.1dppx) {
            .title-container {
              max-width: 75vw !important;
            }
            
            .professional-title {
              font-size: 4.5rem !important;
              letter-spacing: 0.12em !important;
            }
            
            .step-card {
              width: 150px !important;
            }
          }
          
          /* 125% Zoom (Effective resolution: 1280x1024) */
          @media (min-resolution: 1.25dppx) {
            .title-container {
              max-width: 70vw !important;
              padding: 0.75rem !important;
            }
            
            .professional-title {
              font-size: 4rem !important;
              letter-spacing: 0.08em !important;
            }
            
            .title-separator {
              margin: 0.75rem !important;
            }
            
            .step-card {
              width: 140px !important;
            }
            
            .step-title {
              font-size: 15px !important;
            }
            
            .step-desc {
              font-size: 12px !important;
            }
            
            .get-started-btn {
              width: 130px !important;
              padding: 8px 14px !important;
              font-size: 11px !important;
            }
          }
        }
        
        /* Large Desktop Screens (1441px and above) */
        @media (min-width: 1441px) {
          .title-container {
            max-width: 1200px !important;
          }
          
          .professional-title {
            font-size: 6rem !important;
          }
          
          .step-card {
            width: 190px !important;
          }
        }
        
        /* Ultra-wide Screens (1920px and above) */
        @media (min-width: 1920px) {
          .title-container {
            max-width: 1400px !important;
          }
          
          .professional-title {
            font-size: 7rem !important;
          }
          
          .step-card {
            width: 200px !important;
          }
        }
        
        /* Landscape Orientation Adjustments */
        @media (orientation: landscape) and (max-height: 600px) {
          section {
            padding: 1rem 0 !important;
            min-height: 500px !important;
          }
          
          .title-container {
            margin-bottom: 1.5rem !important;
          }
          
          .professional-title {
            font-size: 2.5rem !important;
          }
          
          .step-card {
            width: 140px !important;
          }
        }
        
        /* High DPI Displays (Retina, etc.) */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .professional-title {
            text-rendering: optimizeLegibility !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
          
          .step-title, .step-desc {
            text-rendering: optimizeLegibility !important;
            -webkit-font-smoothing: antialiased !important;
          }
        }
        
        /* Accessibility: Reduce Motion for Users with Motion Sensitivity */
        @media (prefers-reduced-motion: reduce) {
          .professional-title,
          .title-word,
          .title-separator,
          .step-card,
          .get-started-btn {
            animation: none !important;
            transition: opacity 0.3s ease !important;
          }
          
          .wheel {
            animation: none !important;
          }
          
          .step-card-content,
          .marker-content {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksWheel;

