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

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;        background: ${isDark 
          ? 'radial-gradient(circle, rgba(184,134,11,0.55) 0%, rgba(50,25,85,0.35) 50%, rgba(40,20,80,0.25) 100%)' // Updated dark mode particle background
          : 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,182,193,0.3) 50%, rgba(212,175,55,0.2) 100%)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatUp ${Math.random() * 8 + 6}s linear infinite;
        backdrop-filter: blur(1px);
        box-shadow: 0 0 ${Math.random() * 10 + 5}px ${isDark ? 'rgba(184,134,11,0.3)' : 'rgba(255,215,0,0.3)'}; // Updated dark mode particle shadow
      `;
      
      const container = document.querySelector('.floating-particles-container');
      if (container) {
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 14000);
      }
    };

    // Create 3D floating background elements for light mode
    const create3DFloatingElement = () => {
      if (isDark) return; // Only in light mode
        const colors = ['#D4AF37', '#000000', '#DC143C', '#8B0000']; // Gold, Black, Red, Dark Red
      const shapes = ['cube', 'sphere', 'pyramid'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      const element = document.createElement('div');
      element.className = `floating-3d-element ${shape}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: ${color === '#D4AF37' 
          ? 'linear-gradient(45deg, #D4AF37, #FFD700, #B8860B)'
          : color === '#000000'
          ? 'linear-gradient(45deg, #000000, #333333, #111111)'
          : color === '#DC143C'
          ? 'linear-gradient(45deg, #DC143C, #FF6347, #B22222)'
          : 'linear-gradient(45deg, #8B0000, #DC143C, #B22222)'};
        ${shape === 'sphere' ? 'border-radius: 50%;' : ''}
        ${shape === 'pyramid' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float3D ${Math.random() * 12 + 8}s linear infinite;
        transform-style: preserve-3d;
        box-shadow: 0 0 20px ${color}40;
        opacity: 0.7;
      `;
      
      const container = document.querySelector('.floating-3d-container');
      if (container) {
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 20000);
      }
    };

    // Create particles at intervals
    const particleInterval = setInterval(createFloatingParticle, 800);
    const floating3DInterval = setInterval(create3DFloatingElement, 1200);
    
    // Create initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(createFloatingParticle, i * 200);
    }
    
    // Create initial 3D elements for light mode
    if (!isDark) {
      for (let i = 0; i < 5; i++) {
        setTimeout(create3DFloatingElement, i * 400);
      }
    }

    return () => {
      clearInterval(particleInterval);
      clearInterval(floating3DInterval);
    };
  }, [isActive, isDark]);  // Interactive wheel rotation control with improved timing and smoother transitions
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
  );  // Calculate synchronized rotation duration
  const getRotationDuration = useCallback(() => {
    return WHEEL_CONFIG.ROTATION_DURATION / Math.abs(rotationSpeed);
  }, [rotationSpeed]);

return (
    <section className={`flex flex-col items-center justify-center w-full py-20 min-h-[900px] relative overflow-hidden transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-80'}`} 
    style={{
      background: isDark 
        ? 'radial-gradient(circle at center, #101010 0%, rgba(40,20,80,0.35) 30%, rgba(184,134,11,0.2) 60%, #0A0A0A 100%)' // Updated dark mode section background
        : 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,215,0,0.15) 25%, rgba(212,175,55,0.1) 50%, rgba(255,182,193,0.2) 75%, rgba(248,248,255,0.9) 100%)'
    }}>
        {/* Floating Particles Container */}
      <div className="floating-particles-container absolute inset-0 pointer-events-none" />
      
      {/* 3D Floating Elements Container for Light Mode */}
      <div className="floating-3d-container absolute inset-0 pointer-events-none" />
        {/* Enhanced glassmorphism background layers */}
      <div className={`absolute inset-0 opacity-30 ${
        isDark 
          ? 'from-indigo-900/25 via-yellow-800/20 to-black/50' // Updated dark mode overlay gradient
          : 'bg-gradient-to-br from-yellow-50/30 via-red-50/20 to-gray-50/25'
      }`} />        <h1        className={`text-center text-5xl md:text-6xl font-bold mb-8 font-serif tracking-wide uppercase border-b-4 border-[#D4AF37] pb-4 w-full max-w-3xl mx-auto shadow-sm metallic-heading transition-all duration-500 ${
          isDark ? 'text-[#FFD700]' : 'text-transparent'
        }`}        style={{ 
          textShadow: isDark 
            ? "none" // Remove all effects for clean visibility
            : "0px 2px 4px rgba(220,20,60,0.3), 0px 1px 2px rgba(212,175,55,0.5)",
          color: isDark ? "#FFD700" : "transparent", // Simple gold color for dark mode
          background: isDark 
            ? "transparent" 
            : "linear-gradient(135deg, #DC143C 0%, #FF4444 25%, #D4AF37 50%, #FFD700 75%, #DC143C 100%)",
          backgroundClip: isDark ? "initial" : "text",
          WebkitBackgroundClip: isDark ? "initial" : "text",
          fontWeight: isDark ? 700 : 900
        }}
      >
        {WHEEL_CONFIG.MAIN_TITLE}
      </h1>
      <div
        className="relative mx-auto metallic-perspective"
        style={{
          width: 800,
          height: 800,
          maxWidth: "100vw",
          maxHeight: "90vw",
          perspective: 1800,
        }}
      >        {/* Background cycles with enhanced glassmorphism */}
        <div
          className={`background-cycle cycle-outer metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 750,
            height: 750,
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
            width: 650,
            height: 650,
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
            width: 550,
            height: 550,
            border: `1.5px solid ${isDark ? 'rgba(200,200,220,0.25)' : 'rgba(255,255,255,0.5)'}`, // Updated dark mode border
            borderRadius: "50%",            background: isDark
              ? "radial-gradient(circle, rgba(20,20,20,0.3) 0%, rgba(40,20,80,0.35) 25%, rgba(184,134,11,0.25) 50%, rgba(50,25,85,0.25) 75%, rgba(15,15,15,0.2) 100%)" // Updated dark mode background
              : "radial-gradient(circle,rgba(255,255,255,0.2) 0%,rgba(255,215,0,0.12) 25%,rgba(212,175,55,0.08) 50%,rgba(255,182,193,0.1) 75%,rgba(248,248,255,0.15) 100%)",
            backdropFilter: "blur(25px) saturate(220%)",            boxShadow: isDark
              ? "0 0 40px 8px #B8860B inset, 0 0 70px 2px rgba(184,134,11,0.22)" // Updated dark mode boxShadow
              : "0 0 30px 6px #D4AF37 inset",
            zIndex: -1,
          }}
        ></div>

        {/* Central Light Bulb - Theme Responsive */}
        <div
          className="central-light-bulb"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
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
                width: 120,
                height: 120,
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
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 375,
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
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
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
                width: 180,
                transformStyle: "preserve-3d",
                zIndex: 3, // Higher z-index to place text content above numbers
              }}
            >              <div
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
                  style={{
                    // animation: `counter-rotate ${getRotationDuration()}s linear infinite ${getCounterRotationDirection()}`, // Removed animation
                    transformOrigin: "center center", 
                    width: 60,
                    height: 60,
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
                    style={{
                      fontWeight: isDark ? 700 : 900, // Much bolder in light mode
                      fontSize: 18, // Reduced from 22 for better proportion
                      marginBottom: 10,                      color: isDark ? "#DC143C" : "#B8860B", // Light mode: Gold, Dark mode: Bolder red color
                      textShadow: isDark 
                        ? "0 0 15px #DC143C, 0 0 30px #FF0000, 0 0 45px #DC143C, 0 0 60px #B22222" // Stronger red neon glow
                        : "0px 2px 4px rgba(0,0,0,0.3), 0px 1px 2px rgba(255,255,255,0.8)", // Stronger shadow for light mode
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      letterSpacing: 0.5,
                      textAlign: "center",
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    {step.title}
                  </h3>                <div
                    className="step-desc"
                    style={{
                      fontSize: 14,
                      color: isDark ? "#FFD700" : "#B8860B", // Light mode: Gold, Dark mode: Gold neon color
                      marginBottom: 20,
                      lineHeight: 1.6,
                      textAlign: "center",
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",                      fontWeight: isDark ? 400 : 600, // Bolder in light mode
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
                      padding: "12px 20px",
                      width: "160px",
                      margin: "0 auto",
                      borderRadius: 8,
                      fontWeight: isDark ? 700 : 800,
                      fontSize: 14,
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
        @keyframes floatUp {
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
        }
        @keyframes float3D {
          0% { 
            transform: translateY(100vh) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) translateX(-20px) rotateX(180deg) rotateY(180deg) rotateZ(180deg) scale(1);
          }
          90% {
            opacity: 0.7;
          }
          100% { 
            transform: translateY(-10vh) translateX(20px) rotateX(360deg) rotateY(360deg) rotateZ(360deg) scale(1.2);
            opacity: 0;
          }
        }
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
          }
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
            : '#FFFFFF'}; /* Light mode: Solid white background */
          border-radius: 20px;
          box-shadow: ${isDark
            ? '0 15px 50px 0 rgba(31,38,135,0.35), 0 0 40px 6px #D4AF37 inset, 0 0 80px 2px rgba(212,175,55,0.1)'
            : '0 10px 25px rgba(0, 0, 0, 0.1)'}; /* Light mode: Adjusted shadow for white card */
          border: ${isDark 
            ? '2px solid rgba(212,175,55,0.3)' 
            : '1px solid #D4AF37'}; /* Light mode: Subtle gold border */
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
        
        /* Floating particles */
        .floating-particle {
          will-change: transform, opacity;
          pointer-events: none;
        }
          /* Responsive adjustments */
        @media (max-width: 768px) {
          .step-card {
            width: 160px !important;
          }
          
          .step-card:hover {
            transform: scale(1.05) translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksWheel;

