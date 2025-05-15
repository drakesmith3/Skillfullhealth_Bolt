
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { audioPlayer } from "@/utils/AudioPlayer";

interface PageTransitionProps {
  children: React.ReactNode;
  delay?: number;
  withSound?: boolean;
  color?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children,
  delay = 0,
  withSound = true,
  color = "red-600" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageCornerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !pageCornerRef.current || !contentRef.current || !particlesRef.current) return;
    
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
    
    // Create the animation timeline
    const tl = gsap.timeline({ delay });
    
    // Book page turn animation
    tl.fromTo(containerRef.current,
      { rotationY: -40 },
      { 
        rotationY: -5, 
        duration: 1,
        ease: "power3.out", 
        onComplete: () => {
          // Play sound effect when page turn completes
          if (withSound) {
            audioPlayer.play('/page-turn.mp3', 0.2);
          }
          // Create dust particles
          createDustParticles();
        }
      }
    );
    
    // Function to create dust particle effect
    const createDustParticles = () => {
      const particlesContainer = particlesRef.current;
      if (!particlesContainer) return;
      
      // Clear previous particles
      particlesContainer.innerHTML = '';
      
      // Generate particles with different colors and sizes
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 4 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        const colorVal = getComputedColor();
        
        particle.className = "absolute rounded-full";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colorVal;
        particle.style.opacity = opacity.toString();
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particlesContainer.appendChild(particle);
        
        // Animate particles floating away
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: Math.random() * 3 + 1,
          delay: Math.random() * 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    };
    
    // Get computed color based on the color prop
    const getComputedColor = () => {
      if (color.includes("red")) return "rgba(220, 38, 38, 0.7)";
      if (color.includes("amber")) return "rgba(245, 158, 11, 0.7)";
      if (color.includes("blue")) return "rgba(59, 130, 246, 0.7)";
      if (color.includes("green")) return "rgba(16, 185, 129, 0.7)";
      return "rgba(156, 163, 175, 0.7)"; // Default gray
    };
    
    // Clean up animations and particles on unmount
    return () => {
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(contentRef.current);
    };
  }, [delay, withSound, color]);

  return (
    <div className="w-full h-full perspective-1000 relative" aria-live="polite">
      <div 
        ref={containerRef} 
        className="w-full h-full bg-white rounded-lg p-6 transition-all duration-500 shadow-xl overflow-hidden"
      >
        <div ref={contentRef} className="w-full h-full opacity-0">
          {children}
        </div>
        <div 
          ref={pageCornerRef}
          className="absolute top-0 right-0 w-40 h-40 bg-transparent opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        {/* Particles container */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        />
        {/* Page "binding" effect */}
        <div className={`absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-${color}/10 to-transparent`} />
      </div>
    </div>
  );
};

export default React.memo(PageTransition);
