
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface OrigamiButterflyProps {
  isTransforming: boolean;
  scrollProgress: number;
}

const OrigamiButterfly: React.FC<OrigamiButterflyProps> = ({ 
  isTransforming, 
  scrollProgress 
}) => {
  const butterflyRef = useRef<SVGSVGElement>(null);
  const wingLeftRef = useRef<SVGPathElement>(null);
  const wingRightRef = useRef<SVGPathElement>(null);
  const antennaeRef = useRef<SVGGElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize flutter animation on mount
  useEffect(() => {
    if (!butterflyRef.current || !wingLeftRef.current || !wingRightRef.current) return;
    
    // Create flutter animation timeline
    animationRef.current = gsap.timeline({ 
      repeat: -1, 
      yoyo: true, 
      defaults: { duration: 0.5, ease: "sine.inOut" } 
    });
    
    // Flutter wings
    animationRef.current.to(wingLeftRef.current, {
      rotate: -15,
      transformOrigin: "right center",
    }, 0);
    
    animationRef.current.to(wingRightRef.current, {
      rotate: 15,
      transformOrigin: "left center",
    }, 0);
    
    // Slight body movement
    animationRef.current.to(butterflyRef.current, {
      y: "-=2",
      duration: 0.5,
    }, 0);
    
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Handle hover animation
  useEffect(() => {
    if (!butterflyRef.current) return;
    
    // Create perch animation (subtle movement while perched)
    const perchAnimation = gsap.timeline({ 
      repeat: -1, 
      yoyo: true, 
      defaults: { duration: 2, ease: "power1.inOut" } 
    });
    
    perchAnimation.to(butterflyRef.current, {
      rotate: 2,
      transformOrigin: "center bottom",
    });
    
    return () => {
      perchAnimation.kill();
    };
  }, []);

  // Handle transformation effect
  useEffect(() => {
    if (!butterflyRef.current || !wingLeftRef.current || !wingRightRef.current || !antennaeRef.current) return;
    
    if (isTransforming) {
      // Speed up flutter and add rotation
      if (animationRef.current) {
        animationRef.current.timeScale(3);
      }
      
      // Create transformation animation
      const transformTL = gsap.timeline({ 
        defaults: { duration: 1.2, ease: "power2.inOut" } 
      });
      
      // Add glow effect
      transformTL.to(butterflyRef.current, {
        filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))",
        scale: 1.2,
        duration: 0.5
      });
      
      // Prepare for transformation
      transformTL.to([wingLeftRef.current, wingRightRef.current], {
        fill: "#FDB9C8", // Pink color (for female character)
        stroke: "#FF8AAA",
        filter: "blur(3px)",
        opacity: 0.9,
        scale: 1.5,
        duration: 0.8
      }, "transform");
      
      transformTL.to(antennaeRef.current, {
        opacity: 0,
        duration: 0.3
      }, "transform");
      
      // Add sparkle effect (this would be enhanced with actual particles in a full implementation)
      const sparkleCount = 6;
      for (let i = 0; i < sparkleCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'absolute w-2 h-2 bg-amber-400 rounded-full';
        butterflyRef.current.parentElement?.appendChild(spark);
        
        gsap.set(spark, {
          x: Math.random() * 40 - 20,
          y: Math.random() * 40 - 20,
          scale: 0,
          opacity: 0
        });
        
        gsap.to(spark, {
          x: Math.random() * 80 - 40,
          y: Math.random() * 80 - 40,
          scale: Math.random() + 0.5,
          opacity: 1,
          duration: 0.6,
          delay: 0.3 + i * 0.1,
          onComplete: () => {
            gsap.to(spark, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => spark.remove()
            });
          }
        });
      }
    } else {
      // Reset flutter speed if not transforming
      if (animationRef.current) {
        animationRef.current.timeScale(1);
      }
    }
  }, [isTransforming]);

  // React to scroll progress
  useEffect(() => {
    if (!butterflyRef.current || !animationRef.current) return;
    
    // Adjust flutter based on scroll
    const flutterIntensity = Math.min(1 + scrollProgress * 2, 3);
    animationRef.current.timeScale(flutterIntensity);
    
    // Maybe fly slightly away from the header as scrolling begins
    if (scrollProgress > 0 && scrollProgress < 0.1) {
      gsap.to(butterflyRef.current, {
        y: -10 * (scrollProgress / 0.1),
        duration: 0.3
      });
    }
  }, [scrollProgress]);

  return (
    <div className="relative">
      <svg 
        ref={butterflyRef} 
        width="50" 
        height="50" 
        viewBox="0 0 100 100"
      >
        {/* Body */}
        <ellipse cx="50" cy="50" rx="6" ry="18" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
        
        {/* Left wing */}
        <path
          ref={wingLeftRef}
          d="M 50,38 
             C 30,20 10,30 5,48 
             C 0,70 20,85 50,60 
             Z"
          fill="#F48FB1"
          stroke="#EC407A"
          strokeWidth="1"
          className="origin-right"
        />
        
        {/* Right wing */}
        <path
          ref={wingRightRef}
          d="M 50,38 
             C 70,20 90,30 95,48 
             C 100,70 80,85 50,60 
             Z"
          fill="#F48FB1"
          stroke="#EC407A"
          strokeWidth="1"
          className="origin-left"
        />
        
        {/* Antennae */}
        <g ref={antennaeRef}>
          <path d="M 47,35 C 45,25 40,20 35,18" fill="none" stroke="#5D4037" strokeWidth="1" />
          <path d="M 53,35 C 55,25 60,20 65,18" fill="none" stroke="#5D4037" strokeWidth="1" />
          <circle cx="35" cy="18" r="2" fill="#9C27B0" />
          <circle cx="65" cy="18" r="2" fill="#9C27B0" />
        </g>
        
        {/* Wing patterns */}
        <path d="M 25,40 C 35,45 40,55 35,65" fill="none" stroke="#EC407A" strokeWidth="1" opacity="0.6" />
        <path d="M 75,40 C 65,45 60,55 65,65" fill="none" stroke="#EC407A" strokeWidth="1" opacity="0.6" />
        <circle cx="20" cy="45" r="3" fill="#9C27B0" opacity="0.7" />
        <circle cx="80" cy="45" r="3" fill="#9C27B0" opacity="0.7" />
        <circle cx="30" cy="55" r="2" fill="#9C27B0" opacity="0.7" />
        <circle cx="70" cy="55" r="2" fill="#9C27B0" opacity="0.7" />
      </svg>
      
      {/* Shadow */}
      <div 
        className="absolute w-16 h-2 bg-black/10 rounded-full blur-sm -bottom-1 left-1/2 transform -translate-x-1/2"
        style={{
          opacity: isTransforming ? 0 : 0.2,
          scale: isTransforming ? 0 : 1,
          transition: "opacity 0.5s, scale 0.5s"
        }}
      ></div>
    </div>
  );
};

export default OrigamiButterfly;
