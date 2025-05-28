import React, { useState, useEffect, useRef } from 'react';
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
  },  {
    title: "EMPLOYERS",
    text: "Find upskilled professionals for your health facility.",
    bgColor: "bg-brand-gold",
    textColor: "text-brand-black",
    titleClasses: "text-3xl md:text-4xl font-playfair font-bold uppercase text-brand-black",
    icon: User
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

    return {
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d' as 'preserve-3d',
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg)`,
      backfaceVisibility: 'hidden' as 'hidden',
      zIndex,
    };
  };

  const numSpiralRings = 15; // Number of rings for the spiral bind

  return (
    <div 
      ref={bookContainerRef}
      className="w-full max-w-2xl h-[400px] md:h-[500px] relative mx-auto my-12 group transition-all duration-300 ease-out hover:scale-[1.02]"
      onClick={handleBookClick} // Added onClick handler here
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
          return (            <div
              key={index}
              className={`absolute w-full h-full p-4 md:p-8 flex flex-col justify-center items-center text-center shadow-xl transition-all duration-1000 ease-in-out rounded-lg ${page.bgColor} origin-left`}
              style={getPageStyle(index, currentPage, pagesContent.length)}
            >              <div className={`absolute inset-0 rounded-lg ${index > 0 ? 'shadow-[inset_3px_0px_8px_rgba(0,0,0,0.15)] dark:shadow-[inset_3px_0px_8px_rgba(0,0,0,0.4)]' : ''}`}></div>                <div className="relative z-10 flex flex-col items-center h-full">                {/* Icon at the top */}
                <div className="pt-6 pb-2">
                  <IconComponent 
                    size={index === 0 ? 200 : 200} // Made icons double in size
                    className={`opacity-90 ${index === 0 ? 'text-amber-500' : page.textColor}`}
                  />
                </div>
                
                {/* Content in the middle */}
                <div className="flex-1 flex flex-col justify-center items-center px-2">
                <h3
                  className={`${page.titleClasses} ${index === 0 ? 'tracking-wide' : ''} mb-4 md:mb-6`} // Increased margin bottom for better spacing
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
                </h3>                <p 
                  className={`text-sm md:text-base leading-relaxed transition-opacity duration-500 ${page.textColor} ${index === currentPage ? 'opacity-100' : 'opacity-70'} max-w-xs md:max-w-sm px-2`}
                >
                  {page.text}
                </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBook;
