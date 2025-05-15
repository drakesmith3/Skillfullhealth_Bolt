
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface StoryConnectorProps {
  from: string;
  to: string;
  color?: string;
  delay?: number;
}

const StoryConnector: React.FC<StoryConnectorProps> = ({
  from,
  to,
  color = "bg-red-600",
  delay = 0
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!lineRef.current) return;
    
    const animate = () => {
      gsap.fromTo(
        lineRef.current,
        { height: 0, opacity: 0 },
        { 
          height: "100%", 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.inOut",
          delay: delay
        }
      );
    };
    
    // Create observer to trigger animation when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(lineRef.current);
    
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center pointer-events-none">
      <div className="relative px-2 py-1 mb-2 bg-white rounded-md shadow-sm text-xs font-medium text-gray-700">
        {from}
      </div>
      <div 
        ref={lineRef} 
        className={`w-1 h-16 ${color} opacity-0`}
      ></div>
      <div className="relative px-2 py-1 mt-2 bg-white rounded-md shadow-sm text-xs font-medium text-gray-700">
        {to}
      </div>
    </div>
  );
};

export default StoryConnector;
