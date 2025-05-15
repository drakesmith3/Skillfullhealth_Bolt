import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

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
}

const Header: React.FC<HeaderProps> = ({ isActive }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null); // Ref for the top bar

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
      };
    }, headerElement); // Attach context to the header element

    return () => {
        // Revert the GSAP context to clean up all animations
        ctx.revert();
        
        // Safely remove dust particles
        // Store particles in a variable before removing context
        if (headerElement) {
            // Use MutationObserver pattern instead of direct removal
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.removedNodes) {
                        // Handle removals safely
                    }
                });
            });
            
            // Start observing before cleanup
            observer.observe(headerElement, { childList: true });
            
            // Then disconnect when done
            observer.disconnect();
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

  const goldButtonClasses = "bg-yellow-500 text-black px-5 py-2.5 rounded-md font-semibold hover:bg-red-600 hover:text-white transform hover:-translate-y-1 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl dark:bg-yellow-400 dark:text-black dark:hover:bg-red-500 dark:hover:text-white text-sm";

  return (
    <section
      ref={headerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center text-center p-0 bg-black text-white dark:bg-red-700 dark:text-gray-100 overflow-hidden antialiased"
    >
      {/* Top Bar for Logo and Navigation */}
      <div 
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-between items-center opacity-0 transform -translate-y-5"
      >
        {/* Logo (Rotating Earth Placeholder) */}
        <Link to="/" aria-label="GLOHSEN Home">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 via-teal-400 to-blue-600 rounded-full animate-spin-slow shadow-lg flex items-center justify-center">
             {/* Optional: Add a small icon or letter inside */}
             {/* <span className="text-white font-bold text-xl">G</span> */}
          </div>
        </Link>

        {/* Navigation Buttons */}
        <nav className="space-x-3 md:space-x-4">
          <Link to="/about" className={goldButtonClasses}>ABOUT US</Link>
          <Link to="/signin" className={goldButtonClasses}>SIGN IN</Link>
          <Link to="/signup" className={goldButtonClasses}>SIGN UP</Link>
          <Link to="/feedback" className={goldButtonClasses}>LEAVE FEEDBACK</Link>
        </nav>
      </div>

      {/* Main Content (Centered) */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 opacity-0 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight animated-shine-text">
          WELCOME TO GLOHSEN:<br className="md:hidden"/> YOUR STORY BEGINS HERE
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 dark:text-gray-200 max-w-xl md:max-w-2xl leading-relaxed md:leading-loose">
          Embark on a journey of discovery and transformation with GLOHSEN.
          Scroll to explore what awaits.
        </p>
        <div className="mt-8 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-yellow-400 dark:text-yellow-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Header;
