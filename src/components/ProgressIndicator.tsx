
import React, { useState, useEffect } from "react";

const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const totalSections = 8; // Total number of content sections

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollHeight = document.body.scrollHeight - windowHeight;
      
      // Calculate which section we're currently viewing
      const sectionIndex = Math.min(
        Math.floor((scrollPosition / totalScrollHeight) * totalSections),
        totalSections - 1
      );
      
      setActiveSection(sectionIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection 
                ? "bg-red-600 scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => {
              // Calculate the scroll position for this section
              const targetPos = (index / totalSections) * 
                (document.body.scrollHeight - window.innerHeight);
              window.scrollTo({ top: targetPos, behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
