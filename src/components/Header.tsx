import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Logo3DHyperRealistic from "./Logo3DHyperRealistic";
import { useClickSound } from "../hooks/useClickSound";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../contexts/SoundContext";

// Copied from Hero.tsx - for dust particles (assuming this is defined above or imported)
const createDustParticles = (container: HTMLElement | null, count: number, particleColor: string) => {
  if (!container) return;
  const containerRect = container.getBoundingClientRect();
  // Ensure container has dimensions before creating particles
  if (containerRect.width === 0 || containerRect.height === 0) {
    // console.warn("Dust particle container has no dimensions yet.");
    // Optionally, retry after a short delay or when dimensions are available
    // For now, we'll just return to prevent errors.
    return;
  }
  for (let i = 0; i < count; i++) {
    const dust = document.createElement("div");
    dust.className = "dust-particle";
    const color = particleColor || "#FFD700";
    dust.style.backgroundColor = color;
    dust.style.position = "absolute";
    dust.style.width = `${Math.random() * 2.5 + 1}px`;
    dust.style.height = dust.style.width;
    dust.style.borderRadius = "50%";
    dust.style.opacity = `${Math.random() * 0.4 + 0.2}`;
    // Ensure particles are within the bounds of the container
    dust.style.left = `${Math.random() * containerRect.width}px`;
    dust.style.top = `${Math.random() * containerRect.height}px`;
    dust.style.willChange = "transform, opacity";
    container.appendChild(dust);

    gsap.to(dust, {
      x: (Math.random() - 0.5) * (containerRect.width / 5),
      y: (Math.random() - 0.5) * (containerRect.height / 5),
      opacity: 0,
      duration: Math.random() * 4 + 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
      onRepeat: () => {
        gsap.set(dust, {
          x: (Math.random() - 0.5) * (containerRect.width / 10),
          y: (Math.random() - 0.5) * (containerRect.height / 10),
          opacity: Math.random() * 0.4 + 0.2,
          // Update position on repeat to ensure they stay within potentially resized bounds
          left: `${Math.random() * containerRect.width}px`,
          top: `${Math.random() * containerRect.height}px`,
        });
      },
    });
  }
};

interface HeaderProps {
  isActive?: boolean;
  sectionName?: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isActive = false, 
  scrollToSection,
  playClickSound 
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null); // Ref for the top bar
  const { isDark } = useTheme();
  const { playClickSound: contextPlayClickSound } = useSound();
  
  // Use the click sound from context or props
  const handleClick = () => {
    if (playClickSound) {
      playClickSound();
    } else if (contextPlayClickSound) {
      contextPlayClickSound();
    }
  };

  useEffect(() => {
    if (!headerRef.current) return;
    const particleColor = "#FFD700"; // Gold
    const headerElement = headerRef.current;
    
    // Create a GSAP context for all animations
    const ctx = gsap.context(() => {
      // Delay particle creation slightly to ensure container dimensions are available
      const timer = setTimeout(() => {
          if (headerElement) {
              createDustParticles(headerElement, 100, particleColor);
          }
      }, 100);

      // GSAP animation for main content based on scroll (original logic)
      // This might be less relevant if isActive prop handles the primary animation
      if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { 
                trigger: headerElement,
                start: "top 80%", 
                toggleActions: "play none none none",
              },
            }
          );
        }
        
      return () => {
          clearTimeout(timer);
      };    }, headerElement); // Attach context to the header element
    
    return () => {
        // Revert the GSAP context to clean up all animations
        ctx.revert();
        
        // Safely remove dust particles
        if (headerElement) {
            try {
                // Get all dust particles
                const dustParticles = headerElement.querySelectorAll('.dust-particle');
                // Remove them one by one - with additional safety checks
                dustParticles.forEach(particle => {
                    try {
                        // Check if particle is still in the DOM and is a child of headerElement
                        if (particle.parentNode && particle.parentNode === headerElement && headerElement.contains(particle)) {
                            headerElement.removeChild(particle);
                        }
                    } catch (err) {
                        // Silently catch and ignore errors for individual particles
                        console.debug('Skipping dust particle cleanup for detached node');
                    }
                });
            } catch (error) {
                console.log('Safe cleanup of dust particles - error handled:', error);
            }
        }
    };
  }, []); // Run once on mount
  
  useEffect(() => {
    // Animations based on the section being active (snapped to)
    if (!contentRef.current || !topBarRef.current) return;
    
    // Create a GSAP context for the animations
    const ctx = gsap.context(() => {
      if (isActive) {
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 });
        gsap.to(topBarRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
      } else {
        // Reset or animate out when not active
        gsap.to(contentRef.current, { opacity: 0, y: 20, duration: 0.3 });
        gsap.to(topBarRef.current, { opacity: 0, y: -10, duration: 0.3 });
      }
    }, headerRef.current); // Attach context to header ref
    
    return () => {
      // Properly clean up all animations when component updates or unmounts
      ctx.revert();
    };
  }, [isActive]);

  const goldButtonClasses = "shine-button bg-[#F9D75D] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#ea384c] hover:text-white transform hover:-translate-y-1 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-sm relative overflow-hidden";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background and Dust Particles (if any) */}
      <section
        ref={headerRef}
        className="relative h-screen w-full flex flex-col justify-center items-center text-center p-0 bg-black text-white dark:bg-red-700 dark:text-gray-100 overflow-hidden antialiased"
      >
        {/* Top Bar for Logo and Navigation */}
        <div 
          ref={topBarRef}
          className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center opacity-0 transform -translate-y-5 gap-3 sm:gap-0"
        >        {/* Logo (3D Hyper-Realistic Rotating Earth) */}
          <Link to="/" aria-label="GLOHSEN Home" className="flex-shrink-0" onClick={handleClick}>
            <Logo3DHyperRealistic size={56} className="flex-shrink-0" />
          </Link>

          {/* Navigation Buttons */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 md:gap-4 max-w-full">
            <Link to="/about-us" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>ABOUT US</Link>
            <Link to="/signin" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>SIGN IN</Link>
            <Link to="/signup" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>SIGN UP</Link>
            <Link to="/feedback" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>LEAVE FEEDBACK</Link>            <Link 
              to="/games-quizzes" 
              className="shine-button bg-[#FFD700] text-black px-3 py-2 sm:px-4 md:px-5 md:py-2.5 rounded-md font-semibold hover:bg-[#ea384c] hover:text-white transform hover:-translate-y-1 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-xs sm:text-sm relative overflow-hidden"
              onClick={handleClick}
            >
              GAMES & QUIZZES
            </Link>
          </nav>
        </div>

        {/* Main Content (Centered) */}
        <div ref={contentRef} className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 opacity-0 px-4 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animated-shine-text metallic-gold-text text-center">
            <span className="micro-interact animated-shine-text metallic-gold-text block sm:inline">WELCOME TO GLOHSEN:</span>
            <br className="hidden sm:block"/> 
            <span className="micro-interact animated-shine-text metallic-gold-text block sm:inline">YOUR STORY BEGINS HERE</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 dark:text-gray-200 max-w-sm sm:max-w-xl md:max-w-2xl leading-relaxed md:leading-loose micro-interact text-center">
            Dive into a Universe of Fun & Resourcefulness, for You by Us.
            Scroll to Experience the Transforming Story of Health.
          </p>          {/* Make the bounce container clickable */}
          <div 
            className="mt-8 cursor-pointer micro-interact" 
            onClick={() => {
              handleClick();
              if (scrollToSection) {
                // Direct call to go to the next section without rebounding
                scrollToSection(1); // Scroll to the second section (index 1)
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick();
                if (scrollToSection) {
                  scrollToSection(1);
                }
              }
            }}
            aria-label="Scroll to next section"
          >
            {/* Right arrow for horizontal scroll cue */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-yellow-400 dark:text-yellow-300 animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 19.5l7.5-7.5-7.5-7.5m6 15l7.5-7.5-7.5-7.5" />
            </svg>
          </div>        </div>
      </section>
    </div>
  );
};

export default Header;
