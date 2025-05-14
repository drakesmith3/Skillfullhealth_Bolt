
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageCornerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the page with a slight rotation to create the book effect
    gsap.set(containerRef.current, { 
      rotationY: -5,
      transformOrigin: "left center",
      boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.2)"
    });
    
    // Create dust particles effect
    if (containerRef.current && pageCornerRef.current) {
      const particles: HTMLDivElement[] = [];
      
      // Create particle elements
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 rounded-full bg-gray-300 opacity-0";
        pageCornerRef.current.appendChild(particle);
        particles.push(particle);
      }
      
      // Animate particles
      particles.forEach(particle => {
        gsap.to(particle, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-30, 30),
          opacity: gsap.utils.random(0.3, 0.7),
          duration: gsap.utils.random(1, 2),
          delay: gsap.utils.random(0, 0.5) + delay,
          repeat: -1,
          repeatDelay: gsap.utils.random(1, 3),
          ease: "power2.out"
        });
      });
      
      // Clean up animations and particles on unmount
      return () => {
        particles.forEach(particle => {
          gsap.killTweensOf(particle);
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }
  }, [delay]);

  return (
    <div className="w-full h-full perspective-1000 relative" aria-live="polite">
      <div 
        ref={containerRef} 
        className="w-full h-full bg-white rounded-lg p-6 transition-all duration-500 shadow-xl overflow-hidden"
      >
        {children}
        <div 
          ref={pageCornerRef}
          className="absolute top-0 right-0 w-20 h-20 bg-transparent opacity-40"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default React.memo(PageTransition);
