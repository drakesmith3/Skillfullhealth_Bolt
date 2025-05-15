
import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressIndicatorProps {
  totalSections?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  totalSections = 8 // Default to 8 sections
}) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [showChapterTitle, setShowChapterTitle] = useState<boolean>(false);
  const [hoverSection, setHoverSection] = useState<number | null>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);

  // Chapter titles for storytelling
  const chapterTitles = [
    "The GLOHSEN Standard",
    "How It Works",
    "Patient Feedback",
    "For Employers",
    "Tutors & Advisers",
    "Games & Quizzes",
    "Success Stories",
    "Join Our Community"
  ];

  // Memoize the scroll handler to avoid recreating it on each render
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalScrollHeight = document.body.scrollHeight - windowHeight;
    
    if (totalScrollHeight <= 0) return; // Prevent division by zero
    
    // Calculate which section we're currently viewing
    const sectionIndex = Math.min(
      Math.floor((scrollPosition / totalScrollHeight) * totalSections),
      totalSections - 1
    );
    
    setActiveSection(sectionIndex);
  }, [totalSections]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial calculation
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (index: number): void => {
    // Calculate the scroll position for this section
    const windowHeight = window.innerHeight;
    const totalScrollHeight = document.body.scrollHeight - windowHeight;
    const targetPos = (index / totalSections) * totalScrollHeight;
    
    // Play page turn sound
    const audio = new Audio('/page-turn.mp3');
    audio.volume = 0.2;
    audio.play().catch((err) => {
      console.warn("Audio play was prevented due to browser policy.", err);
    });
    
    window.scrollTo({ 
      top: targetPos, 
      behavior: "smooth" 
    });
  };
  
  const handleIndicatorMouseEnter = (index: number) => {
    setHoverSection(index);
    setShowChapterTitle(true);
  };
  
  const handleIndicatorMouseLeave = () => {
    setHoverSection(null);
    setShowChapterTitle(false);
  };
  
  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
      role="navigation"
      aria-label="Story navigation"
    >
      <div className="mb-4 flex flex-col items-center">
        <BookOpen className="h-6 w-6 text-red-600 mb-2" />
        <div className="w-0.5 h-6 bg-red-600/30"></div>
      </div>
      
      <AnimatePresence>
        {showNavigation && (
          <motion.div 
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: totalSections }).map((_, index) => (
              <div key={index} className="relative group">
                {/* Active/hover chapter indicator */}
                <AnimatePresence>
                  {(showChapterTitle && hoverSection === index) || activeSection === index ? (
                    <motion.div 
                      className="absolute right-8 top-0 whitespace-nowrap bg-white/90 px-3 py-1 rounded-md shadow-sm text-sm font-medium text-gray-800 transform -translate-y-1/2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {chapterTitles[index]}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSection 
                      ? "bg-red-600 scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  } ${index < activeSection ? "border-2 border-red-600/50" : ""}`}
                  onClick={() => scrollToSection(index)}
                  onMouseEnter={() => handleIndicatorMouseEnter(index)}
                  onMouseLeave={handleIndicatorMouseLeave}
                  aria-label={`Go to chapter: ${chapterTitles[index]}`}
                  aria-current={index === activeSection ? "true" : "false"}
                />
                
                {/* Connecting line between indicators */}
                {index < totalSections - 1 && (
                  <div className={`h-3 w-0.5 mx-auto my-1 ${
                    index < activeSection ? "bg-red-600/50" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={toggleNavigation} 
        className="mt-4 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label={showNavigation ? "Hide navigation" : "Show navigation"}
      >
        {showNavigation ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default React.memo(ProgressIndicator);
