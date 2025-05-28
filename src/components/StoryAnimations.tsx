import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Butterfly from './Butterfly';

interface StoryAnimationsProps {
  currentSection: number;
  totalSections: number;
}

const StoryAnimations: React.FC<StoryAnimationsProps> = ({ 
  currentSection, 
  totalSections 
}) => {
  const [showButterfly, setShowButterfly] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate normalized story progress (0 to 1)
  const storyProgress = totalSections > 1 
    ? currentSection / (totalSections - 1) 
    : 0;

  useEffect(() => {
    // First section shows butterfly introduction
    if (currentSection === 0) {
      setShowButterfly(true);
    } 
    // Transform butterfly during story transition
    else if (currentSection === 1) {
      const timeline = gsap.timeline({
        onComplete: () => {
          setShowButterfly(false);
        }
      });
      
      if (containerRef.current) {
        timeline.to(containerRef.current, {
          rotateY: 360,
          scale: 0.3,
          opacity: 0.8,
          duration: 1.2,
          ease: "power2.inOut"
        });
      }
    } 
    // Story progression sections
    else {
      setShowButterfly(false);
    }
  }, [currentSection]);
  return (
    <>
      <Butterfly sectionIndex={currentSection} totalSections={totalSections} isActive={true} />
      <div className="fixed top-1/4 z-30 pointer-events-none" style={{ perspective: "1000px" }}>
        <div ref={containerRef} className="relative transition-all duration-700">
          {/* Story chapter indicator */}
          <div className="absolute top-4 right-4 text-white/70 text-sm font-medium">
            Chapter {currentSection + 1} of {totalSections}
          </div>
          
          {/* Horizontal story connector line */}
          <div className="absolute top-1/2 left-0 w-screen h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30" />
          
          {/* Story progression dots */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
            {Array.from({ length: totalSections }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentSection 
                    ? 'bg-[#ea384c] shadow-lg scale-125' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryAnimations;
