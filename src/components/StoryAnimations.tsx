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

  // Calculate normalized scroll progress (0 to 1)
  const scrollProgress = totalSections > 1 
    ? currentSection / (totalSections - 1) 
    : 0;

  useEffect(() => {
    // First section shows butterfly
    if (currentSection === 0) {
      setShowButterfly(true);
    } 
    // Transform butterfly to doodle when leaving first section
    else if (currentSection === 1) {
      const timeline = gsap.timeline({
        onComplete: () => {
          setShowButterfly(false);
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
    }
  }, [currentSection]);

  return (
    <>
      <Butterfly sectionIndex={currentSection} totalSections={totalSections} isActive={true} />
      <div className="fixed top-1/3 z-30 pointer-events-none" style={{ perspective: "1000px" }}>
        <div ref={containerRef} className="relative transition-all duration-700">
          {/* You can add additional story/mascot animations here if needed */}
        </div>
      </div>
    </>
  );
};

export default StoryAnimations;
