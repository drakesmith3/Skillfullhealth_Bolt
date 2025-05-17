import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OrigamiButterfly from './OrigamiButterfly';
import WalkingDoodle from './WalkingDoodle';

interface StoryAnimationsProps {
  currentSection: number;
  totalSections: number;
}

const StoryAnimations: React.FC<StoryAnimationsProps> = ({ 
  currentSection, 
  totalSections 
}) => {
  const [showButterfly, setShowButterfly] = useState(true);
  const [showDoodle, setShowDoodle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate normalized scroll progress (0 to 1)
  const scrollProgress = totalSections > 1 
    ? currentSection / (totalSections - 1) 
    : 0;

  useEffect(() => {
    // First section shows butterfly
    if (currentSection === 0) {
      setShowButterfly(true);
      setShowDoodle(false);
    } 
    // Transform butterfly to doodle when leaving first section
    else if (currentSection === 1) {
      const timeline = gsap.timeline({
        onComplete: () => {
          setShowButterfly(false);
          setShowDoodle(true);
        }
      });
      
      if (containerRef.current) {
        timeline.to(containerRef.current, {
          rotate: 720,
          scale: 0.1,
          opacity: 0.5,
          duration: 1,
          ease: "power2.inOut"
        });
      }
    } 
    // Other sections show doodle
    else {
      setShowButterfly(false);
      setShowDoodle(true);
    }
  }, [currentSection]);

  return (
    <div className="fixed top-1/3 z-30 pointer-events-none" style={{ perspective: "1000px" }}>
      <div ref={containerRef} className="relative transition-all duration-700">
        {showButterfly && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <OrigamiButterfly 
              isTransforming={currentSection > 0} 
              scrollProgress={scrollProgress}
            />
          </div>
        )}
        
        {showDoodle && (
          <div className="absolute top-20 left-0 w-full">
            <WalkingDoodle 
              isVisible={showDoodle} 
              scrollProgress={scrollProgress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryAnimations;
