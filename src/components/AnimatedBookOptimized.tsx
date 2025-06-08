import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BookOpenCheck,
  Handshake,
  GraduationCap,
  Briefcase,
  Presentation,
  User,
  LucideIcon
} from 'lucide-react';

interface PageContent {
  title: string;
  text: string;
  bgColor: string;
  textColor: string;
  titleClasses: string;
  icon: LucideIcon;
}

// Memoized page content to prevent recreation on each render
const pagesContent: PageContent[] = [
  {
    title: "THE GLOHSEN STANDARD",
    text: "Elevating Healthcare. Setting the New Standard.",
    bgColor: "bg-neutral-900 dark:bg-black",
    textColor: "text-gray-300 dark:text-gray-400",
    titleClasses: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold uppercase text-amber-400",
    icon: BookOpenCheck
  },
  {
    title: "CLIENTS",
    text: "Provide FEEDBACK on your health service: If you want to vent, this is the perfect place; If your doctor did well, (or not,) let us know.",
    bgColor: "bg-brand-off-white dark:bg-slate-800",
    textColor: "text-brand-black dark:text-brand-off-white",
    titleClasses: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold uppercase text-brand-black dark:text-brand-off-white",
    icon: Handshake
  },
  {
    title: "STUDENTS",
    text: "Play free Games & Quizzes, and CONNECT with mentors by purchasing their courses",
    bgColor: "bg-brand-red",
    textColor: "text-white",
    titleClasses: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold uppercase text-white",
    icon: GraduationCap
  },
  {
    title: "PROFESSIONALS",
    text: "Sign up to know your GLOHSEN SCORE - use Science to elevate your career.",
    bgColor: "bg-brand-black",
    textColor: "text-brand-gold",
    titleClasses: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold uppercase text-brand-gold",
    icon: Briefcase
  },
  {
    title: "TUTORS",
    text: "Use AI to do what you love doing best- TEACH, and empower the next generation of professionals.",
    bgColor: "bg-brand-off-white dark:bg-slate-800",
    textColor: "text-brand-red dark:text-brand-gold",
    titleClasses: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold uppercase text-brand-red dark:text-brand-gold",
    icon: Presentation
  },
  {
    title: "EMPLOYERS",
    text: "Find upskilled professionals for your health facility.",
    bgColor: "bg-brand-gold",
    textColor: "text-brand-black",
    titleClasses: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold uppercase text-brand-black",
    icon: User
  },
];

// Optimized constants
const TIMER_DURATION = 5000;
const SPIRAL_RINGS = 15;
const PARALLAX_SENSITIVITY = { x: 8, y: 4 }; // Reduced sensitivity for better UX
const ANIMATION_DURATION = 1000;

interface AnimatedBookOptimizedProps {
  autoPlay?: boolean;
  timerDuration?: number;
  className?: string;
}

const AnimatedBookOptimized: React.FC<AnimatedBookOptimizedProps> = ({ 
  autoPlay = true, 
  timerDuration = TIMER_DURATION,
  className = ""
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [spiralParallax, setSpiralParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastMouseEvent = useRef<{ x: number; y: number } | null>(null);

  // Memoized next page function
  const nextPage = useCallback(() => {
    if (!isMounted) return;
    setCurrentPage((prevPage) => (prevPage + 1) % pagesContent.length);
  }, [isMounted]);

  // Optimized timer management
  const resetTimer = useCallback(() => {
    if (!autoPlay || !isMounted) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(nextPage, timerDuration);
  }, [nextPage, autoPlay, timerDuration, isMounted]);

  // Throttled mouse move handler using RAF
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!bookContainerRef.current || !isMounted) return;
    
    lastMouseEvent.current = { x: event.clientX, y: event.clientY };
    
    if (rafRef.current) return; // Already scheduled
    
    rafRef.current = requestAnimationFrame(() => {
      if (!lastMouseEvent.current || !bookContainerRef.current || !isMounted) {
        rafRef.current = null;
        return;
      }
      
      const { x: clientX, y: clientY } = lastMouseEvent.current;
      const { left, top, width, height } = bookContainerRef.current.getBoundingClientRect();
      
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;
      
      // Apply bounds to prevent extreme movements
      const boundedX = Math.max(-1, Math.min(1, x)) * PARALLAX_SENSITIVITY.x;
      const boundedY = Math.max(-1, Math.min(1, y)) * PARALLAX_SENSITIVITY.y;
      
      setSpiralParallax({ x: boundedX, y: boundedY });
      rafRef.current = null;
    });
  }, [isMounted]);

  // Optimized book click handler
  const handleBookClick = useCallback(() => {
    nextPage();
    resetTimer();
  }, [nextPage, resetTimer]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isMounted) return;
    
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        handleBookClick();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setCurrentPage((prev) => (prev - 1 + pagesContent.length) % pagesContent.length);
        resetTimer();
        break;
    }
  }, [handleBookClick, resetTimer, isMounted]);

  // Mouse enter/leave handlers for better UX
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setSpiralParallax({ x: 0, y: 0 }); // Reset parallax when mouse leaves
  }, []);

  // Memoized page style calculation
  const getPageStyle = useCallback((index: number, activePage: number, totalPages: number) => {
    let rotateY = 0;
    let translateX = 0;
    let zIndex = 0;
    const isCover = index === 0;

    if (index < activePage) { 
      rotateY = isCover ? -170 : -180; 
      zIndex = index + 1; 
    } else if (index === activePage) { 
      rotateY = 0;
      zIndex = totalPages + 10; 
    } else { 
      rotateY = 0;
      translateX = (index - activePage) * 4; 
      zIndex = totalPages - (index - activePage); 
    }

    return {
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d' as const,
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg)`,
      backfaceVisibility: 'hidden' as const,
      zIndex,
      willChange: index === activePage ? 'transform' : 'auto', // Optimize for active page
    };
  }, []);

  // Memoized spiral rings to prevent recreation
  const spiralRings = useMemo(() => 
    Array.from({ length: SPIRAL_RINGS }, (_, i) => (
      <div
        key={`spiral-${i}`}
        className="w-4 h-4 sm:w-[18px] sm:h-[18px] bg-gray-300 dark:bg-gray-500 rounded-full shadow-md border border-gray-400 dark:border-gray-600"
        style={{
          transform: 'rotateX(70deg) translateZ(-2px)',
        }}
      />
    )), 
    []
  );

  // Responsive icon size calculation
  const getIconSize = useCallback((index: number) => {
    if (typeof window === 'undefined') return 120;
    
    const width = window.innerWidth;
    if (width < 640) return index === 0 ? 80 : 80;   // Mobile
    if (width < 768) return index === 0 ? 120 : 120; // Tablet
    if (width < 1024) return index === 0 ? 160 : 160; // Desktop small
    return index === 0 ? 200 : 200; // Desktop large
  }, []);

  // Effect for timer and event listeners
  useEffect(() => {
    setIsMounted(true);
    resetTimer();

    const currentBookContainer = bookContainerRef.current;
    if (currentBookContainer) {
      currentBookContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
      currentBookContainer.addEventListener('mouseenter', handleMouseEnter);
      currentBookContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    // Add keyboard support
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      setIsMounted(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      if (currentBookContainer) {
        currentBookContainer.removeEventListener('mousemove', handleMouseMove);
        currentBookContainer.removeEventListener('mouseenter', handleMouseEnter);
        currentBookContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetTimer, handleMouseMove, handleMouseEnter, handleMouseLeave, handleKeyDown]);

  // Enhanced responsive classes
  const containerClasses = `
    w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl 
    h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] 
    relative mx-auto my-8 sm:my-10 md:my-12 
    group transition-all duration-300 ease-out 
    hover:scale-[1.01] sm:hover:scale-[1.02] 
    cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/30
    ${className}
  `.trim();

  return (
    <div 
      ref={bookContainerRef}
      className={containerClasses}
      onClick={handleBookClick}
      tabIndex={0}
      role="button"
      aria-label={`Interactive book showing ${pagesContent[currentPage].title}. Page ${currentPage + 1} of ${pagesContent.length}. Press space or arrow keys to navigate.`}
      aria-live="polite"
    >
      {/* Perspective container for 3D effect */}
      <div className="relative w-full h-full" style={{ perspective: '2500px' }}>
        {/* Optimized Spiral Bind */}
        <div
          className="absolute left-[-8px] sm:left-[-10px] top-0 h-full w-4 sm:w-[20px] flex flex-col justify-around items-center"
          style={{
            transform: `translateX(${spiralParallax.x}px) translateY(${spiralParallax.y}px) translateZ(5px) rotateY(-5deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
            zIndex: 50,
            willChange: 'transform',
          }}
        >
          {spiralRings}
        </div>

        {/* Optimized Pages */}
        {pagesContent.map((page, index) => {
          const IconComponent = page.icon;
          const iconSize = getIconSize(index);
          const isActivePage = index === currentPage;
          
          return (
            <div
              key={index}
              className={`absolute w-full h-full p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center text-center transition-all ease-in-out rounded-lg ${page.bgColor} origin-left`}
              style={{
                ...getPageStyle(index, currentPage, pagesContent.length),
                transitionDuration: `${ANIMATION_DURATION}ms`,
                boxShadow: index === 0 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Inner shadow for depth (skip for cover page) */}
              {index > 0 && (
                <div className="absolute inset-0 rounded-lg shadow-[inset_3px_0px_8px_rgba(0,0,0,0.15)] dark:shadow-[inset_3px_0px_8px_rgba(0,0,0,0.4)]" />
              )}
              
              <div className="relative z-10 flex flex-col items-center h-full">
                {/* Responsive Icon */}
                <div className="pt-3 sm:pt-4 md:pt-6 pb-1 sm:pb-2">
                  <IconComponent 
                    size={iconSize}
                    className={`opacity-90 transition-opacity duration-300 ${index === 0 ? 'text-amber-500' : page.textColor} ${isActivePage ? 'opacity-100' : 'opacity-75'}`}
                    aria-hidden="true"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center items-center px-1 sm:px-2">
                  <h3
                    className={`${page.titleClasses} ${index === 0 ? 'tracking-wide' : ''} mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-center leading-tight`}
                    style={index === 0 ? {
                      textShadow: `
                        -1.5px -1.5px 1px rgba(255, 235, 190, 0.7),
                        1.5px 1.5px 1px rgba(80, 40, 0, 0.6),
                        0 0 10px rgba(255, 215, 0, 0.5),
                        0 0 2px rgba(255, 255, 255, 0.5)
                      `,
                    } : {}}
                  >
                    {page.title}
                  </h3>
                  
                  <p 
                    className={`text-xs sm:text-sm md:text-base leading-relaxed transition-opacity duration-500 ${page.textColor} ${isActivePage ? 'opacity-100' : 'opacity-70'} max-w-[250px] sm:max-w-xs md:max-w-sm px-1 sm:px-2 text-center`}
                  >
                    {page.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress indicator for accessibility */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1" aria-hidden="true">
        {pagesContent.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              index === currentPage ? 'bg-amber-400' : 'bg-gray-400 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBookOptimized;
