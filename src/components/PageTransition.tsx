
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
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !pageCornerRef.current || !contentRef.current) return;
    
    // Initialize the page with a slight rotation to create the book effect
    gsap.set(containerRef.current, { 
      rotationY: -5,
      transformOrigin: "left center",
      boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.2)"
    });
    
    // Animate the content in
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: delay + 0.3,
        ease: "power3.out"
      }
    );
    
    // Create dust particles effect
    const particles: HTMLDivElement[] = [];
    
    // Create particle elements
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full bg-gray-300 opacity-0";
      pageCornerRef.current.appendChild(particle);
      particles.push(particle);
    }
    
    // Animate particles
    particles.forEach(particle => {
      gsap.to(particle, {
        x: gsap.utils.random(-80, 80),
        y: gsap.utils.random(-50, 50),
        opacity: gsap.utils.random(0.3, 0.7),
        duration: gsap.utils.random(1, 3),
        delay: gsap.utils.random(0, 0.8) + delay,
        repeat: -1,
        repeatDelay: gsap.utils.random(0.5, 2),
        ease: "power2.out"
      });
    });
    
    // Book page turn animation
    gsap.fromTo(containerRef.current,
      { rotationY: -40 },
      { 
        rotationY: -5, 
        duration: 1,
        delay: delay,
        ease: "power3.out", 
        clearProps: "transform" 
      }
    );
    
    // Clean up animations and particles on unmount
    return () => {
      particles.forEach(particle => {
        gsap.killTweensOf(particle);
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(contentRef.current);
    };
  }, [delay]);

  return (
    <div className="w-full h-full perspective-1000 relative" aria-live="polite">
      <div 
        ref={containerRef} 
        className="w-full h-full bg-white rounded-lg p-6 transition-all duration-500 shadow-xl overflow-hidden"
      >
        <div ref={contentRef} className="w-full h-full">
          {children}
        </div>
        <div 
          ref={pageCornerRef}
          className="absolute top-0 right-0 w-40 h-40 bg-transparent opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        {/* Page "binding" effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-red-600/10 to-transparent" />
      </div>
    </div>
  );
};

export default React.memo(PageTransition);
