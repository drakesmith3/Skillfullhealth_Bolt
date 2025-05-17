
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface OrigamiButterflyProps {
  isTransforming: boolean;
  scrollProgress?: number;
}

const OrigamiButterfly: React.FC<OrigamiButterflyProps> = ({ isTransforming, scrollProgress = 0 }) => {
  const butterflyRef = useRef<SVGSVGElement>(null);
  const wingLeftRef = useRef<SVGPathElement>(null);
  const wingRightRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<SVGPathElement>(null);

  // Animation setup
  useEffect(() => {
    if (!butterflyRef.current) return;

    const tl = gsap.timeline({ paused: true });
    
    // Initial state - folded origami
    tl.set([wingLeftRef.current, wingRightRef.current], { 
      rotation: 0, 
      transformOrigin: "center" 
    });
    
    // Animation to spread wings
    tl.to(wingLeftRef.current, { 
      rotation: -25, 
      x: -5, 
      duration: 1.5, 
      ease: "elastic.out(1, 0.5)" 
    }, 0);
    
    tl.to(wingRightRef.current, { 
      rotation: 25, 
      x: 5, 
      duration: 1.5, 
      ease: "elastic.out(1, 0.5)" 
    }, 0);
    
    // Control animation based on props
    if (isTransforming) {
      tl.progress(scrollProgress).play();
    } else {
      tl.progress(0);
    }

    return () => {
      tl.kill();
    };
  }, [isTransforming, scrollProgress]);

  // Floating animation for butterfly
  useEffect(() => {
    if (!butterflyRef.current || !isTransforming) return;

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    
    floatTl.to(butterflyRef.current, { 
      y: "-=10", 
      duration: 2, 
      ease: "sine.inOut" 
    });
    
    floatTl.to(butterflyRef.current, { 
      y: "+=10", 
      duration: 2, 
      ease: "sine.inOut" 
    });

    return () => {
      floatTl.kill();
    };
  }, [isTransforming]);

  return (
    <svg 
      ref={butterflyRef}
      width="100" 
      height="80" 
      viewBox="0 0 100 80" 
      className={`transition-all duration-500 ${isTransforming ? 'scale-110' : 'scale-100'}`}
    >
      {/* Body */}
      <path 
        ref={bodyRef}
        d="M50 15 L52 65 L48 65 L50 15" 
        fill="#e74c3c" 
        stroke="#c0392b" 
        strokeWidth="1"
      />
      
      {/* Left wing */}
      <path 
        ref={wingLeftRef}
        d="M50 30 Q30 10 10 30 Q5 45 10 60 Q30 80 50 60 Z" 
        fill="#f39c12" 
        stroke="#e67e22" 
        strokeWidth="1"
        className="origin-center transition-all duration-300"
      />
      
      {/* Right wing */}
      <path 
        ref={wingRightRef}
        d="M50 30 Q70 10 90 30 Q95 45 90 60 Q70 80 50 60 Z" 
        fill="#f39c12" 
        stroke="#e67e22" 
        strokeWidth="1"
        className="origin-center transition-all duration-300"
      />
      
      {/* Wing patterns - left */}
      <path 
        d="M50 40 Q40 30 30 40 Q25 50 30 55 Q40 65 50 50 Z" 
        fill="#e67e22" 
        opacity="0.5"
        className="transition-opacity duration-500"
      />
      
      {/* Wing patterns - right */}
      <path 
        d="M50 40 Q60 30 70 40 Q75 50 70 55 Q60 65 50 50 Z" 
        fill="#e67e22" 
        opacity="0.5"
        className="transition-opacity duration-500"
      />
      
      {/* Antennae */}
      <path 
        d="M48 15 Q45 5 40 3" 
        fill="none" 
        stroke="#c0392b" 
        strokeWidth="1"
      />
      <path 
        d="M52 15 Q55 5 60 3" 
        fill="none" 
        stroke="#c0392b" 
        strokeWidth="1"
      />
      
      {/* Antenna tips */}
      <circle cx="40" cy="3" r="1.5" fill="#c0392b" />
      <circle cx="60" cy="3" r="1.5" fill="#c0392b" />
    </svg>
  );
};

export default OrigamiButterfly;
