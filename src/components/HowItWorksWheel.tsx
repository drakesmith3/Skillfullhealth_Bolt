// filepath: c:\Users\sijio\glohsen-olawumi\src\components\HowItWorksWheel.tsx
import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useClickSound } from "../hooks/useClickSound";
import { useWheelAnimations } from "../hooks/useWheelAnimations";

// Define props interface for section compatibility
interface SectionProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// Centralized configuration for all wordings and settings
const WHEEL_CONFIG = {
  // Main heading
  MAIN_TITLE: "HOW IT WORKS",
  // Animation timing - centralized for perfect synchronization
  ROTATION_DURATION: 53, // seconds for one full rotation (slowed down by 4 more seconds from 49 to 53)
  SPEED_MULTIPLIER: {
    NORMAL: 1,
    FAST: 1.5, // Reduced from 2 to make it less jarring
    SLOW: 0.7
  },
  SPEED_RESET_DELAY: 3000, // milliseconds
  // Step data with centralized content and improved positioning
  STEPS: [
    {
      id: 1,
      title: "Create Account. Get Verified",
      description: "Sign up. Join a healthcare network that truly cares for your professional growth.",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2v-6zm0 8h-2v2h2v-2z",
      buttonText: "Get Started",
      position: { top: "2%", left: "50%", transform: "translateX(-50%)" }, // Moved even further from center to prevent overlap
      markerPosition: { top: "-5%", left: "50%", transform: "translateX(-50%)" } // Adjusted marker position further out
    },
    {
      id: 2,
      title: "Share Your Experience",
      description: "Leave valuable feedback about your healthcare experiences to help others make informed decisions.",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      buttonText: "Share Now",
      position: { top: "50%", right: "2%", transform: "translateY(-50%)" }, // Moved even further from center to prevent overlap
      markerPosition: { top: "50%", right: "-5%", transform: "translateY(-50%)" } // Adjusted marker position further out
    },
    {
      id: 3,
      title: "Earn & Grow",
      description: "Get rewarding opportunities, win competitions, create courses, and accelerate your career growth.",
      icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
      buttonText: "Explore Jobs",
      position: { bottom: "2%", left: "50%", transform: "translateX(-50%)" }, // Moved even further from center to prevent overlap
      markerPosition: { bottom: "-5%", left: "50%", transform: "translateX(-50%)" } // Adjusted marker position further out
    },
    {
      id: 4,
      title: "Connect & Network",
      description: "Join vibrant discussions, find mentors, and build meaningful professional relationships that last.",
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
      buttonText: "Join Community",
      position: { top: "50%", left: "2%", transform: "translateY(-50%)" }, // Moved even further from center to prevent overlap
      markerPosition: { top: "50%", left: "-5%", transform: "translateY(-50%)" } // Adjusted marker position further out
    }
  ]
} as const;

const HowItWorksWheel: React.FC<SectionProps> = ({ isActive, sectionName, scrollToSection, playClickSound }) => {  
  const navigate = useNavigate();
  const { isDark, theme } = useTheme();
  const { playClick } = useClickSound();  // Get responsive position for step cards
  const getStepPosition = useCallback((step: any) => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {      // Improved mobile positions with better spacing and less overlap
      if (step.id === 1) {
        return { top: "-5%", left: "60%", transform: "translateX(-50%)" };
      } else if (step.id === 2) {
        return { top: "60%", right: "2%", transform: "translateY(-50%)" };
      } else if (step.id === 3) {
        return { bottom: "-15%", left: "1%", transform: "translateX(-50%)" };
      } else if (step.id === 4) {
        return { top: "-5%", left: "2%", transform: "translateY(-50%)" }; // Moved further left from 12% to 8%
      }
    }
    
    return step.position; // Use default position for desktop
  }, []);// State for interactive wheel control
  const [rotationSpeed, setRotationSpeed] = useState<number>(WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL);
  const [isHovered, setIsHovered] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const speedResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [rotationDirection, setRotationDirection] = useState<number>(1); // 1 for clockwise, -1 for counterclockwise
  const rotationRef = useRef<number>(0); // Use ref instead of state for smoother animation

  // Use optimized animation hooks
  const { getRotationDuration, themeStyles, animationStyles, stepCardStyles } = useWheelAnimations(
    rotationSpeed, 
    WHEEL_CONFIG.ROTATION_DURATION, 
    isDark
  );  // Simple animation initialization with mobile-specific fixes
  useEffect(() => {
    if (!isActive || !wheelRef.current) return;

    const wheelElement = wheelRef.current;
    const isMobile = window.innerWidth < 768;
    
    // Ensure animations are running when component becomes active
    wheelElement.style.animationPlayState = 'running';
    wheelElement.style.animationDirection = 'normal'; // Ensure wheel rotates clockwise
    
    const allAnimatedElements = wheelElement.querySelectorAll('.step-card-content, .marker-content');
    allAnimatedElements.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = 'running';
      (el as HTMLElement).style.animationDirection = 'normal'; // Counter-rotate to stay upright
    });

    // Mobile-specific animation fixes
    if (isMobile) {
      // Force reset animation directions for mobile
      wheelElement.style.animation = `rotate ${WHEEL_CONFIG.ROTATION_DURATION}s linear infinite`;
      wheelElement.style.animationDirection = 'normal';
      
      allAnimatedElements.forEach((el) => {
        (el as HTMLElement).style.animation = `counter-rotate ${WHEEL_CONFIG.ROTATION_DURATION}s linear infinite`;
        (el as HTMLElement).style.animationDirection = 'normal';
      });
    }
  }, [isActive]);

  // Add resize handler to fix animations when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (!wheelRef.current) return;
      
      const wheelElement = wheelRef.current;
      const isMobile = window.innerWidth < 768;
      
      // Reset animations on resize to ensure proper mobile/desktop behavior
      wheelElement.style.animationDirection = 'normal';
      const allAnimatedElements = wheelElement.querySelectorAll('.step-card-content, .marker-content');
      allAnimatedElements.forEach((el) => {
        (el as HTMLElement).style.animationDirection = 'normal';
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);// Enhanced wheel click handler with mobile-specific improvements
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

    // Determine if click is on left or right side
    const isRightSide = clickX >= centerX;
    const isMobile = window.innerWidth < 768;

    // Only respond to clicks inside the wheel (not on the edges/step cards)
    if (distanceFromCenter < wheelRadius * 0.6) {
      const wheelElement = wheelRef.current;
        if (isRightSide) {
        // Right side click: reverse direction (counter-rotate)
        setRotationDirection(prev => -prev);
        
        // Update animation direction directly
        const newDirection = rotationDirection > 0 ? 'reverse' : 'normal';
        wheelElement.style.animationDirection = newDirection;
        
        // Update all counter-rotating elements to maintain upright orientation
        const allAnimatedElements = wheelElement.querySelectorAll('.step-card-content, .marker-content');
        allAnimatedElements.forEach((el) => {
          (el as HTMLElement).style.animationDirection = newDirection;
        });
        
      } else {
        // Left side click: speed up in current direction
        setRotationSpeed(WHEEL_CONFIG.SPEED_MULTIPLIER.FAST);
        
        // Update animation duration directly
        const newDuration = `${WHEEL_CONFIG.ROTATION_DURATION / WHEEL_CONFIG.SPEED_MULTIPLIER.FAST}s`;
        wheelElement.style.animationDuration = newDuration;
        
        // Update all counter-rotating elements
        const allAnimatedElements = wheelElement.querySelectorAll('.step-card-content, .marker-content');
        allAnimatedElements.forEach((el) => {
          (el as HTMLElement).style.animationDuration = newDuration;
        });
        
        // Reset to normal speed after delay (shorter delay for mobile)
        const resetDelay = isMobile ? WHEEL_CONFIG.SPEED_RESET_DELAY / 2 : WHEEL_CONFIG.SPEED_RESET_DELAY;
        speedResetTimeoutRef.current = setTimeout(() => {
          setRotationSpeed(WHEEL_CONFIG.SPEED_MULTIPLIER.NORMAL);
          const normalDuration = `${WHEEL_CONFIG.ROTATION_DURATION}s`;
          wheelElement.style.animationDuration = normalDuration;
          
          const allAnimatedElements = wheelElement.querySelectorAll('.step-card-content, .marker-content');
          allAnimatedElements.forEach((el) => {
            (el as HTMLElement).style.animationDuration = normalDuration;
          });
          
          // Ensure animations are running after reset (especially important for mobile)
          wheelElement.style.animationPlayState = "running";
          allAnimatedElements.forEach((el) => {
            (el as HTMLElement).style.animationPlayState = "running";
          });
        }, resetDelay);
      }
    }
  }, [rotationDirection]);

  // Button link handlers using centralized step data
  const handleStepClick = useCallback(
    (step: number) => {
      // Play click sound
      if (playClickSound) {
        playClickSound();
      } else {
        playClick();
      }

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
    [navigate, playClickSound, playClick]  );

  return (
    <section
      id={sectionName}
      className={`relative overflow-hidden w-full min-h-screen flex flex-col items-center justify-center px-8 py-12 transition-all duration-700 ${
        isDark ? 'dark-glow dark-glassmorphism' : 'light-glow light-glassmorphism'
      }`}
      style={{ background: themeStyles.sectionBackground }}
    >
      {/* Advanced 3D floating particles */}
      <div className="floating-particles-container absolute inset-0 pointer-events-none"></div>
      <div className="floating-3d-container absolute inset-0 pointer-events-none z-10"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Background geometric shapes */}
        <div className={`
          absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse
          ${isDark ? 'bg-gradient-to-br from-[#B8860B] via-[#FFD700] to-[#DAA520]' : 'bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00]'
          } transform rotate-45 animate-spin`} style={{ animationDuration: '20s' }} />
        
        <div className={`
          absolute top-20 right-20 w-60 h-60 opacity-10
          ${isDark ? 'bg-gradient-radial from-[#B8860B] to-transparent' : 'bg-gradient-radial from-[#FFD700] to-transparent'
          } rounded-full animate-bounce`} style={{ animationDuration: '3s' }} />
        
        <div className={`
          absolute bottom-20 left-20 w-40 h-40 rounded-full opacity-15
          ${isDark ? 'bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-transparent' : 'bg-gradient-to-tr from-[#FFD700] via-[#FFA500] to-transparent'
          } animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto text-center relative z-20">
        <div className="relative mb-8 w-full">          <h2
            className={`text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-8 relative z-10 transition-all duration-700 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{ 
              fontFamily: '"Orbitron", "Exo 2", sans-serif',
              textShadow: isDark 
                ? "0 0 30px #FFD700, 0 0 60px #D4AF37, 0 0 90px #B8860B, 0 4px 8px rgba(0,0,0,0.8)"
                : "0px 6px 12px rgba(0,0,0,0.4), 0px 3px 6px rgba(220,20,60,0.6)",
              filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
              <span className={`inline-block transform transition-all duration-500 ${
                isHovered ? 'scale-700 rotate-3' : ''
              }`}
                    style={{ animation: 'titleWordFloat 6s ease-in-out infinite' }}>
                HOW
              </span>
              <span className={`inline-block ${isDark ? 'text-[#FFD700]' : 'text-[#DC143C]'} transition-all duration-500 ${
                isHovered ? 'scale-70 -rotate-2' : ''
              }`}
                    style={{ animation: 'titleGlow 3s ease-in-out infinite alternate' }}>
                IT
              </span>
              <span className={`inline-block transform transition-all duration-500 ${
                isHovered ? 'scale-70 rotate-2' : ''
              }`}
                    style={{ animation: 'titleWordFloat 6s ease-in-out infinite 2s' }}>
                WORKS
              </span>
            </div>
            {/* Enhanced magical floating icons */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`absolute text-4xl z-0 opacity-80 transition-all duration-500 ${
                isHovered ? 'scale-125' : 'scale-100'
                } ${
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
            ))}
          </h2>
        </div>
      </div>      <div
        className={`relative mx-auto metallic-perspective flex-grow ${window.innerWidth < 768 ? 'mobile-wheel-container' : 'desktop-wheel-container'}`}
        style={{
          width: window.innerWidth < 768 ? 'min(600px, 85vw)' : 'min(720px, 72vw)', // Smaller on mobile
          height: window.innerWidth < 768 ? 'min(600px, 85vw)' : 'min(720px, 72vw)', // Smaller on mobile
          maxWidth: window.innerWidth < 768 ? "85vw" : "72vw", // More space on mobile
          maxHeight: window.innerWidth < 768 ? "85vw" : "72vw", // More space on mobile
          aspectRatio: "1/1", // Force perfect circle
          perspective: 1800,
          transformStyle: "preserve-3d", // Ensure 3D transforms work on mobile
          overflow: "visible", // Allow rotation to be visible
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
            width: 'min(656px, 76.8%)', // Reduced from 820px (20% smaller)
            height: 'min(656px, 76.8%)', // Reduced from 820px (20% smaller)
            border: `2.5px dashed ${isDark ? 'rgba(184,134,11,0.65)' : 'rgba(212,175,55,0.5)'}`, // Updated dark mode border
            borderRadius: "50%",
            backdropFilter: "blur(12px) saturate(180%)",
            background: isDark
              ? "radial-gradient(circle, rgba(10,10,10,0.2) 0%, rgba(40,20,80,0.25) 35%, rgba(184,134,11,0.15) 70%, rgba(5,5,5,0.3) 100%)" // Updated dark mode background
              : "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,215,0,0.08) 35%, rgba(212,175,55,0.05) 70%, rgba(255,182,193,0.1) 100%)",
            boxShadow: isDark
              ? "0 8px 32px 0 rgba(40,20,80,0.3), 0 0 70px 12px #B8860B inset, 0 0 100px 5px rgba(184,134,11,0.12)" // Updated dark mode boxShadow
              : "0 8px 32px 0 rgba(31,38,135,0.18), 0 0 60px 10px #D4AF37 inset",
            zIndex: -1,
          }}
        />

        <div
          className={`background-cycle cycle-middle metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 'min(576px, 67.2%)', // Reduced from 720px (20% smaller)
            height: 'min(576px, 67.2%)', // Reduced from 720px (20% smaller)
            border: `3.5px solid ${isDark ? 'rgba(184,134,11,0.55)' : 'rgba(212,175,55,0.25)'}`, // Updated dark mode border
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(15,15,15,0.25) 0%, rgba(40,20,80,0.3) 30%, rgba(184,134,11,0.2) 60%, rgba(10,10,10,0.25) 100%)" // Updated dark mode background
              : "radial-gradient(circle,rgba(255,255,255,0.18) 0%,rgba(255,215,0,0.1) 30%,rgba(212,175,55,0.06) 60%,rgba(255,182,193,0.08) 100%)",
            backdropFilter: "blur(20px) saturate(200%)",
            boxShadow: isDark
              ? "0 0 50px 10px #B8860B inset, 0 0 80px 3px rgba(184,134,11,0.18)" // Updated dark mode boxShadow
              : "0 0 40px 8px #D4AF37 inset",
            zIndex: -1,
          }}
        />

        <div
          className={`background-cycle cycle-inner metallic-gradient transition-all duration-700 ${
            isDark ? 'dark-glassmorphism' : 'light-glassmorphism'
          }`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 'min(496px, 57.6%)', // Reduced from 620px (20% smaller)
            height: 'min(496px, 57.6%)', // Reduced from 620px (20% smaller)
            border: `1.5px solid ${isDark ? 'rgba(200,200,220,0.25)' : 'rgba(255,255,255,0.5)'}`, // Updated dark mode border
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(20,20,20,0.3) 0%, rgba(40,20,80,0.35) 25%, rgba(184,134,11,0.25) 50%, rgba(50,25,85,0.25) 75%, rgba(15,15,15,0.2) 100%)" // Updated dark mode background
              : "radial-gradient(circle,rgba(255,255,255,0.2) 0%,rgba(255,215,0,0.12) 25%,rgba(212,175,55,0.08) 50%,rgba(255,182,193,0.1) 75%,rgba(248,248,255,0.15) 100%)",
            backdropFilter: "blur(25px) saturate(220%)",
            boxShadow: isDark
              ? "0 0 40px 8px #B8860B inset, 0 0 70px 2px rgba(184,134,11,0.22)" // Updated dark mode boxShadow
              : "0 0 30px 6px #D4AF37 inset",
            zIndex: -1,
          }}
        />        {/* Central Light Bulb - Theme Responsive with lower z-index (behind card elements) */}
        <div
          className="central-light-bulb"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 'min(80px, 10vw)',
            height: 'min(80px, 10vw)',
            zIndex: 5, // Much lower z-index to ensure it stays behind card elements at all zoom levels
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
        </div>

        {/* Enhanced connecting lines with theme support */}
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
                width: 'min(336px, 42%)', // Reduced from 420px (20% smaller)
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
            />
          ))}
        </div>        {/* Interactive rotating wheel with smooth CSS animation */}          <div          
          ref={wheelRef}
          className="wheel group metallic-3d cursor-pointer"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",            
            animation: `rotate ${WHEEL_CONFIG.ROTATION_DURATION}s linear infinite`,
            zIndex: 10, // Higher than bulb
            transformStyle: "preserve-3d",
            background: themeStyles.wheelBackground,
            boxShadow: themeStyles.wheelBoxShadow,
            border: isDark ? "none" : "3px solid transparent",
            backgroundClip: isDark ? "initial" : "padding-box",
            filter: isDark ? "brightness(1.1) contrast(1.1)" : "brightness(1.1) contrast(1.2) saturate(1.1)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}onClick={handleWheelClick}
          onContextMenu={handleWheelClick}          onMouseEnter={(e) => {
            // Only pause on desktop hover, not on mobile
            if (window.innerWidth >= 768) {
              setIsHovered(true);
              const wheelElement = e.currentTarget;
              
              // Pause wheel rotation
              wheelElement.style.animationPlayState = "paused";
              
              // Pause all text and marker counter-rotations
              const allAnimatedElements = wheelElement.querySelectorAll(
                ".step-card-content, .marker-content"
              );
              allAnimatedElements.forEach((el) => {
                (el as HTMLElement).style.animationPlayState = "paused";
              });
            }
          }}
          onMouseLeave={(e) => {
            // Only resume on desktop, not on mobile
            if (window.innerWidth >= 768) {
              setIsHovered(false);
              const wheelElement = e.currentTarget;
              
              // Resume wheel rotation
              wheelElement.style.animationPlayState = "running";
              
              // Resume all text and marker counter-rotations
              const allAnimatedElements = wheelElement.querySelectorAll(
                ".step-card-content, .marker-content"
              );
              allAnimatedElements.forEach((el) => {
                (el as HTMLElement).style.animationPlayState = "running";
              });
            }
          }}
          onTouchStart={(e) => {
            // Mobile touch handling - brief pause then resume
            if (window.innerWidth < 768) {
              const wheelElement = e.currentTarget;
              wheelElement.style.animationPlayState = "paused";
              
              const allAnimatedElements = wheelElement.querySelectorAll(
                ".step-card-content, .marker-content"
              );
              allAnimatedElements.forEach((el) => {
                (el as HTMLElement).style.animationPlayState = "paused";
              });
              
              // Resume after a short delay to allow interaction
              setTimeout(() => {
                wheelElement.style.animationPlayState = "running";
                allAnimatedElements.forEach((el) => {
                  (el as HTMLElement).style.animationPlayState = "running";
                });
              }, 200);
            }
          }}
        >
          {/* Synchronized Step Markers using centralized data with improved z-index */}
          {WHEEL_CONFIG.STEPS.map((step) => (
            <div
              key={`marker-${step.id}`}
              className="step-marker"
              style={{
                position: "absolute",
                ...step.markerPosition,
                zIndex: 20, // Higher z-index than before but lower than lightbulb
              }}
            >              <div
                className={`marker-content transition-all duration-500 ${
                  isDark ? 'dark-marker' : 'light-marker'
                }`}                
                style={{                  
                  animation: `counter-rotate ${WHEEL_CONFIG.ROTATION_DURATION}s linear infinite`,
                  background: isDark
                    ? "linear-gradient(135deg, #000000 0%, #1a1a1a 60%, #333333 100%)"
                    : "#1A1A1A",
                  color: "#FFD700", // Always gold for maximum visibility
                  width: "min(55px, 6.9vw)", // Increased for better visibility
                  height: "min(55px, 6.9vw)", // Increased for better visibility
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900", // Extra bold
                  fontSize: "min(20px, 2.5vw)", // Increased for better visibility
                  boxShadow: isDark
                    ? "0 8px 25px rgba(255,215,0,0.4), 0 0 30px 5px rgba(255,215,0,0.2) inset, 0 0 20px #FFD700"
                    : "0 7px 22px rgba(0,0,0,0.5), 0 0 15px 3px rgba(255,215,0,0.35) inset",
                  border: "3px solid rgba(255,215,0,0.6)", // Thicker border
                  backdropFilter: "blur(12px)",
                  textShadow: "0 0 10px #FFD700, 0 0 20px #D4AF37, 0 2px 4px rgba(0,0,0,0.8)", // Enhanced glow
                  padding: "8px", // Added padding for less sharp edges
                }}
              >
                {step.id}
              </div>
            </div>
          ))}          {/* Synchronized Step Cards using centralized content with improved z-index management */}
          {WHEEL_CONFIG.STEPS.map((step) => (
            <div
              key={`card-${step.id}`}
              className="step-card"              style={{
                position: "absolute",
                ...getStepPosition(step),                width: window.innerWidth < 768 ? 128 : 210, // Reduced by 20% from 160 to 128 on mobile
                height: window.innerWidth < 768 ? 176 : 300, // Reduced by 20% from 220 to 176 on mobile
                transformStyle: "preserve-3d",                zIndex: window.innerWidth < 768 
                  ? (step.id === 1 ? 45 : step.id === 2 ? 42 : step.id === 3 ? 39 : 36) // Better z-index distribution for mobile
                  : (step.id === 1 ? 30 : step.id === 2 ? 28 : step.id === 3 ? 26 : 24), // Default z-index for desktop
                padding: window.innerWidth < 768 ? "2px" : "6px", // Less padding on mobile (reduced from 4px)
              }}
            ><div
                className="step-card-content"                
                style={{                  
                  animation: `counter-rotate ${WHEEL_CONFIG.ROTATION_DURATION}s linear infinite`,
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  display: "block",
                  padding: window.innerWidth < 768 ? "6px" : "8px", // Less padding on mobile
                  borderRadius: "10px", // Rounded corners for less sharp appearance
                  maxWidth: "100%", // Ensure content doesn't overflow
                }}
              >
                <div
                  className="step-icon"                  style={{
                    transformOrigin: "center center",                    width: window.innerWidth < 768 ? 48 : 60, // Reduced by 20% from 60 to 48 on mobile
                    height: window.innerWidth < 768 ? 48 : 60, // Reduced by 20% from 60 to 48 on mobile
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: window.innerWidth < 768 ? "0 auto 12px" : "0 auto 15px", // Reduced by 20% from 15px to 12px on mobile
                    backdropFilter: "blur(8px)",
                    boxShadow: isDark
                      ? "0 9px 18px rgba(184,134,11,0.18), 0 0 25px 4px rgba(184,134,11,0.1) inset"
                      : "0 8px 15px rgba(212,175,55,0.1)",
                    border: isDark ? "1px solid rgba(200,200,220,0.25)" : "1px solid rgba(255,255,255,0.5)",
                  }}
                >                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"                    style={{                      width: window.innerWidth < 768 ? 24 : 30, // Reduced by 20% from 30 to 24 on mobile
                      height: window.innerWidth < 768 ? 24 : 30, // Reduced by 20% from 30 to 24 on mobile
                      fill: "#DC143C", // Red color for all icons as requested
                      filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
                      animation: 'iconPulse 2s infinite ease-in-out',
                    }}
                  >
                    <path d={step.icon} />
                  </svg>
                </div>

                {/* Text content with counter-rotation to stay upright */}
                <div
                  className="step-text-content"
                  style={{
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
                      fontWeight: isDark ? 700 : 900,
                      fontSize: window.innerWidth < 768 ? 13 : 20, // Reduced by 20% from 16 to 13 on mobile
                      marginBottom: window.innerWidth < 768 ? 5 : 8, // Reduced by 20% from 6 to 5 on mobile
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
                    {step.title}
                  </h3>                  <div
                    className="step-desc"
                    style={{
                      fontSize: window.innerWidth < 768 ? 10 : 14, // Reduced by 20% from 12 to 10 on mobile
                      marginBottom: window.innerWidth < 768 ? 10 : 16, // Reduced by 20% from 12 to 10 on mobile
                      maxWidth: window.innerWidth < 768 ? "120px" : "170px", // Reduced by 20% from 150px to 120px on mobile
                      margin: window.innerWidth < 768 ? "0 auto 12px auto" : "0 auto 16px auto", // Updated margins
                      lineHeight: 1.6,
                      textAlign: "center",
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: isDark ? 400 : 600, // Bolder in light mode
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                    }}
                  >
                    {step.description}
                  </div>

                  <button
                    className="get-started-btn metallic-shine-btn"
                    style={{                      background: isDark 
                        ? "linear-gradient(135deg, #FFD700, #B8860B)" // Dark mode: Gold gradient
                        : "linear-gradient(135deg, #CFB53B, #B8860B, #CFB53B)", // Light mode: Metallic gold gradient
                      color: isDark ? "#000000" : "#FFFFFF", // Dark mode: Black text, Light mode: White text
                      border: "none",
                      padding: "10px 0", // Fixed padding from working version
                      width: "90%", // Fixed width from working version
                      margin: "0 auto",
                      borderRadius: 8,
                      fontWeight: isDark ? 700 : 800,
                      fontSize: window.innerWidth < 768 ? 11 : 14, // Reduced by 20% from 14 to 11 on mobile
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
      </div>      {/* Optimized dynamic CSS for theme-specific animations */}
      <style>
        {`        /* Keyframes for rotation and floating particles */        
        @keyframes rotate { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
        
        @keyframes counter-rotate { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(-360deg); } 
        }
        
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
        
        @keyframes lightBulbPulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes titleGlow {
          0%, 100% { 
            text-shadow: ${animationStyles.titleGlow};
          }
          50% { 
            text-shadow: ${animationStyles.titleGlowHover};
          }
        }
        
        @keyframes lightBulbGlow {
          0%, 100% { 
            filter: ${themeStyles.lightBulbGlow.filter};
          }
          50% { 
            filter: ${animationStyles.lightBulbGlowIntense};
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
          .step-card {
          background: ${stepCardStyles.background};
          box-shadow: ${stepCardStyles.boxShadow};
          border: ${stepCardStyles.border};
          backdrop-filter: ${stepCardStyles.backdropFilter};
          border-radius: 18px;
          padding: 8px;
        }        /* Mobile-specific styles to prevent overlap while preserving rotation */
        @media (max-width: 768px) {
          .mobile-wheel-container {
            transform-style: preserve-3d !important;
            overflow: visible !important;
          }
          
          .step-card {
            transform: translateZ(10px) !important; /* Reduced to prevent overlap */
          }
          
          .step-card:nth-child(1) {
            z-index: 48 !important;
          }
          
          .step-card:nth-child(2) {
            z-index: 46 !important;
          }
          
          .step-card:nth-child(3) {
            z-index: 44 !important;
          }
          
          .step-card:nth-child(4) {
            z-index: 42 !important;
          }
          
          /* Ensure wheel rotates clockwise on mobile */
          .wheel {
            animation-play-state: running !important;
            animation-direction: normal !important; /* Force clockwise rotation */
            transform-origin: center center !important;
          }
          
          /* Ensure cards counter-rotate on mobile to stay upright */
          .step-card-content, .marker-content {
            animation-play-state: running !important;
            animation-direction: normal !important; /* Force counter-clockwise to offset wheel rotation */
          }
          
          .metallic-perspective {
            perspective: 1800px !important; /* Better perspective for mobile */
          }
          
          /* Ensure wheel container allows rotation on mobile */
          .wheel-container {
            overflow: visible !important;
            transform-style: preserve-3d !important;
          }
          
          /* Prevent mobile safari issues with animations */
          .step-card-content {
            -webkit-animation-fill-mode: both !important;
            animation-fill-mode: both !important;
            -webkit-backface-visibility: hidden !important;
            backface-visibility: hidden !important;
          }
        }
        
        .step-card-content {
          padding: 12px;
          border-radius: 16px;
          background: ${isDark 
            ? 'rgba(0,0,0,0.1)' 
            : 'rgba(255,255,255,0.1)'};
          backdrop-filter: blur(5px);
        }
        
        .step-card:hover {
          transform: rotateY(${isDark ? '10deg' : '8deg'}) scale(1.08) translateY(-12px);
          box-shadow: ${stepCardStyles.hoverBoxShadow};
          border-color: ${stepCardStyles.hoverBorderColor};
        }
        
        .metallic-shine-btn, .get-started-btn {
          border: 2px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(212,175,55,0.3)'};
        }
        
        .metallic-shine-btn:hover, .get-started-btn:hover {
          background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%) !important;
          box-shadow: ${isDark
            ? '0 15px 45px rgba(220,20,60,0.5), 0 0 45px 10px rgba(220,20,60,0.3) inset, 0 0 80px 5px rgba(220,20,60,0.1)'
            : '0 12px 36px rgba(220,20,60,0.4), 0 0 36px 8px rgba(220,20,60,0.2) inset'};
          color: #fff !important;
          border-color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(220,20,60,0.5)'};
        }
        `}
      </style>
    </section>
  );
};

export default HowItWorksWheel;
