
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BookOpen } from "lucide-react";

interface StoryConnectorProps {
  from: string;
  to: string;
  color?: string;
  delay?: number;
  icon?: React.ReactNode;
  withSound?: boolean;
}

const StoryConnector: React.FC<StoryConnectorProps> = ({
  from,
  to,
  color = "bg-red-600",
  delay = 0,
  icon = <BookOpen className="h-5 w-5 text-white" />,
  withSound = true
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!lineRef.current || !iconContainerRef.current || !particlesRef.current) return;
    
    const animate = () => {
      // Create timeline for animation sequence
      const tl = gsap.timeline();
      
      // Line growth animation
      tl.fromTo(
        lineRef.current,
        { height: 0, opacity: 0 },
        { 
          height: "100%", 
          opacity: 1, 
          duration: 1, 
          ease: "power2.inOut",
          delay: delay
        }
      );
      
      // Icon animation
      tl.fromTo(
        iconContainerRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        },
        "-=0.3" // Overlap slightly with previous animation
      );
      
      // Create dust particles when animation completes
      tl.call(() => {
        createDustParticles();
        if (withSound) {
          playPageTurnSound();
        }
      });
    };
    
    // Create dust particles function
    const createDustParticles = () => {
      const particlesContainer = particlesRef.current;
      if (!particlesContainer) return;
      
      // Clear previous particles
      particlesContainer.innerHTML = '';
      
      // Create new particles
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 4 + 1;
        particle.className = "absolute rounded-full";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color.replace("bg-", "");
        particle.style.backgroundColor = getComputedColor();
        particle.style.left = `${50}%`;
        particle.style.top = `${50}%`;
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          ease: "power2.out",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    };
    
    // Get computed color based on tailwind class
    const getComputedColor = () => {
      if (color.includes("red")) return "rgba(220, 38, 38, 0.7)";
      if (color.includes("amber")) return "rgba(245, 158, 11, 0.7)";
      if (color.includes("blue")) return "rgba(59, 130, 246, 0.7)";
      if (color.includes("green")) return "rgba(16, 185, 129, 0.7)";
      return "rgba(156, 163, 175, 0.7)"; // Default gray
    };
    
    // Play page turn sound
    const playPageTurnSound = () => {
      const audio = new Audio('/page-turn.mp3');
      audio.volume = 0.2;
      audio.play().catch((err) => {
        console.warn("Audio play was prevented due to browser policy.", err);
      });
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
  }, [color, delay, withSound]);
  
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center pointer-events-none h-32">
      <div className="relative px-3 py-1 mb-2 bg-white rounded-md shadow-sm text-xs font-medium text-gray-700">
        {from}
      </div>
      <div className="relative h-full w-1 flex flex-col items-center">
        <div 
          ref={lineRef} 
          className={`w-1 h-full ${color} opacity-0`}
        ></div>
        <div 
          ref={iconContainerRef} 
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${color.replace("bg-", "bg-")} flex items-center justify-center shadow-md opacity-0`}
        >
          {icon}
        </div>
        <div 
          ref={particlesRef}
          className="absolute top-1/2 left-1/2 w-0 h-0"
        ></div>
      </div>
      <div className="relative px-3 py-1 mt-2 bg-white rounded-md shadow-sm text-xs font-medium text-gray-700">
        {to}
      </div>
    </div>
  );
};

export default StoryConnector;
