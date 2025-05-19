import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpenCheck,
  Handshake,
  GraduationCap,
  Briefcase,
  Presentation,
  Building,
  LucideIcon // Changed from "Icon as LucideIcon"
} from 'lucide-react';

interface PageContent {
  title: string;
  text: string;
  bgColor: string;
  textColor: string; // Primarily for the paragraph/subtitle text
  titleClasses: string; // Includes font, size, case, and base color for the title
  icon: LucideIcon;
}

const pagesContent: PageContent[] = [
  {
    title: "THE GLOHSEN STANDARD",
    text: "Elevating Healthcare. Setting the New Standard.", // Updated concise subtitle
    bgColor: "bg-neutral-900 dark:bg-black", // Darker, luxurious cover background
    textColor: "text-gray-300 dark:text-gray-400", // Subtitle color on cover
    titleClasses: "text-4xl md:text-5xl font-playfair font-bold uppercase text-amber-400", // Base gold color for title
    icon: BookOpenCheck
  },
  {
    title: "CLIENTS",
    text: "Provide FEEDBACK on your health service: If you want to vent, this is the perfect place; If your doctor did well, (or not,) let us know.",
    bgColor: "bg-brand-off-white dark:bg-slate-800",
    textColor: "text-brand-black dark:text-brand-off-white",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-brand-black dark:text-brand-off-white",
    icon: Handshake
  },
  {
    title: "STUDENTS",
    text: "Play free Games & Quizzes, and CONNECT with mentors by purchasing their courses",
    bgColor: "bg-brand-red",
    textColor: "text-white",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-white",
    icon: GraduationCap
  },
  {
    title: "PROFESSIONALS",
    text: "Sign up to know your GLOHSEN SCORE - use Science to elevate your career.",
    bgColor: "bg-brand-black",
    textColor: "text-brand-gold",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-brand-gold",
    icon: Briefcase
  },
  {
    title: "TUTORS",
    text: "Use AI to do what you love doing best- TEACH, and empower the next generation of professionals.",
    bgColor: "bg-brand-off-white dark:bg-slate-800",
    textColor: "text-brand-red dark:text-brand-gold",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-brand-red dark:text-brand-gold",
    icon: Presentation
  },
  {
    title: "EMPLOYERS",
    text: "Find upskilled professionals for your health facility.",
    bgColor: "bg-brand-gold",
    textColor: "text-brand-black",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-brand-black",
    icon: Building
  },
];

const AnimatedBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [spiralParallax, setSpiralParallax] = useState({ x: 0, y: 0 });
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer ID

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pagesContent.length);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(nextPage, 5000);
  };

  useEffect(() => {
    resetTimer(); // Initial timer setup

    const handleMouseMove = (event: MouseEvent) => {
      if (bookContainerRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } = bookContainerRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;
        setSpiralParallax({ x: x * 10, y: y * 5 });
      }
    };

    const currentBookContainer = bookContainerRef.current;
    if (currentBookContainer) {
      currentBookContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (currentBookContainer) {
        currentBookContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []); // Empty dependency array, timer managed via ref and reset function
  // Add debugging for component visibility
  useEffect(() => {
    if (bookContainerRef.current) {
      console.log('AnimatedBook container dimensions:', {
        width: bookContainerRef.current.offsetWidth,
        height: bookContainerRef.current.offsetHeight,
        visible: bookContainerRef.current.offsetParent !== null,
        display: window.getComputedStyle(bookContainerRef.current).display
      });
      
      // Ensure the container is visible
      bookContainerRef.current.style.visibility = 'visible';
      bookContainerRef.current.style.opacity = '1';
      
      // Force repaint to ensure visibility
      void bookContainerRef.current.offsetHeight;
    } else {
      console.warn('AnimatedBook: container ref not available');
    }
    
    // Try to force resize event to trigger layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }, []);

  const handleBookClick = () => {
    nextPage();
    resetTimer(); // Reset timer on manual page turn
  };

  const getPageStyle = (index: number, activePage: number, totalPages: number) => {
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

    // Add 3D page curl/book-flip effect for transitions
    const isTurning = Math.abs(index - activePage) === 1;
    const shadow = isTurning ? '0 8px 32px rgba(0,0,0,0.18), 0 1.5px 8px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.10)';
    const boxShadow = `${shadow}${index === activePage ? ', 0 0 0 2px #FFD700' : ''}`;
    const filter = isTurning ? 'brightness(0.98) blur(0.5px)' : 'none';
    const perspective = '1200px';
    const scale = isTurning ? 0.98 : 1;
    const skewY = isTurning ? (index < activePage ? 2 : -2) : 0;

    return {
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d' as 'preserve-3d',
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale}) skewY(${skewY}deg)`,
      backfaceVisibility: 'hidden' as 'hidden',
      zIndex,
      boxShadow,
      filter,
      perspective,
      transition: 'transform 0.9s cubic-bezier(0.77,0,0.175,1), box-shadow 0.7s, filter 0.7s',
    };
  };

  const numSpiralRings = 15; // Number of rings for the spiral bind
  return (
    <div 
      ref={bookContainerRef}
      className="w-full max-w-2xl h-[400px] md:h-[500px] relative mx-auto my-12 group transition-all duration-300 ease-out hover:scale-[1.02]"
      onClick={handleBookClick} // Added onClick handler here
      style={{
        minHeight: '400px',
        opacity: 1,
        visibility: 'visible',
        zIndex: 5
      }}
    >
      {/* Perspective container for 3D effect */}
      <div className="relative w-full h-full" style={{ perspective: '2500px' }}>
        {/* Spiral Bind */}
        <div
          className="absolute left-[-10px] top-0 h-full w-[20px] flex flex-col justify-around items-center"
          style={{
            transform: `translateX(${spiralParallax.x}px) translateY(${spiralParallax.y}px) translateZ(5px) rotateY(-5deg)`,
            transition: 'transform 0.1s ease-out',
            zIndex: 50 // Ensure spiral is visually connected and sometimes in front of cover edge
          }}
        >
          {Array.from({ length: numSpiralRings }).map((_, i) => (
            <div
              key={`spiral-${i}`}
              className="w-[18px] h-[18px] bg-gray-300 dark:bg-gray-500 rounded-full shadow-md border border-gray-400 dark:border-gray-600"
              style={{
                transform: 'rotateX(70deg) translateZ(-2px)', // Gives the ring a 3D look
              }}
            ></div>
          ))}
        </div>

        {pagesContent.map((page, index) => {
          const IconComponent = page.icon;
          return (
            <div
              key={index}
              className={`absolute w-full h-full p-4 md:p-8 flex flex-col justify-center items-center text-center shadow-xl transition-all duration-1000 ease-in-out rounded-lg ${page.bgColor} origin-left`}
              style={getPageStyle(index, currentPage, pagesContent.length)}
            >
              <div className={`absolute inset-0 rounded-lg ${index > 0 ? 'shadow-[inset_3px_0px_8px_rgba(0,0,0,0.15)] dark:shadow-[inset_3px_0px_8px_rgba(0,0,0,0.4)]' : ''}`}></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <IconComponent 
                  size={index === 0 ? 40 : 36} // Slightly larger icon on cover
                  className={`mb-2 md:mb-3 opacity-90 ${index === 0 ? 'text-amber-500' : page.textColor}`} 
                />
                <h3
                  className={`${page.titleClasses} ${index === 0 ? 'tracking-wide' : ''}`} // Added tracking for cover title
                  style={index === 0 ? { // Embossed metallic gold effect for the cover page title
                    textShadow: `
                      -1.5px -1.5px 1px rgba(255, 235, 190, 0.7), /* Light peach-gold highlight (top-left) */
                      1.5px 1.5px 1px rgba(80, 40, 0, 0.6),    /* Dark brown shadow for depth (bottom-right) */
                      0 0 10px rgba(255, 215, 0, 0.5),         /* Diffused gold glow */
                      0 0 2px rgba(255, 255, 255, 0.5)         /* Sharp inner metallic highlight */
                    `,
                  } : {}}
                >
                  {page.title}
                </h3>
                <p 
                  className={`text-xs md:text-sm leading-relaxed transition-opacity duration-500 ${page.textColor} ${index === currentPage ? 'opacity-100' : 'opacity-70'} mt-2 md:mt-3`}
                >
                  {page.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBook;
