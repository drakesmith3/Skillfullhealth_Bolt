
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WalkingDoodleProps {
  isVisible: boolean;
  scrollProgress: number;
  emotion: 'neutral' | 'curious' | 'frustrated' | 'happy' | 'surprised' | 'excited';
}

const WalkingDoodle: React.FC<WalkingDoodleProps> = ({ 
  isVisible, 
  scrollProgress,
  emotion = 'neutral'
}) => {
  const [walking, setWalking] = useState(true);
  const doodleRef = useRef<HTMLDivElement>(null);
  const walkingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [frame, setFrame] = useState(0);

  // Emotion colors for different character states
  const emotionColors = {
    neutral: "#FDB9C8", // Light pink
    curious: "#B6E3FF", // Light blue
    frustrated: "#FFB6B6", // Light red
    happy: "#BDFFC1", // Light green
    surprised: "#D9B6FF", // Light purple
    excited: "#FFE1B6"  // Light orange
  };

  const skinColor = "#FFD5B8"; // Base skin tone

  // Set up walking animation on mount and cleanup on unmount
  useEffect(() => {
    if (!isVisible) return;
    
    // Walking animation frames
    walkingInterval.current = setInterval(() => {
      setFrame(prevFrame => (prevFrame + 1) % 4);
    }, 150);
    
    return () => {
      if (walkingInterval.current) {
        clearInterval(walkingInterval.current);
      }
    };
  }, [isVisible]);
  
  // React to scroll progress and update animation state
  useEffect(() => {
    if (!isVisible || !doodleRef.current) return;
    
    // Update walking state based on scroll position
    // At certain scroll positions, we may want the character to stop walking
    if (scrollProgress > 0.95) {
      setWalking(false);
      if (walkingInterval.current) {
        clearInterval(walkingInterval.current);
      }
    } else {
      setWalking(true);
      if (!walkingInterval.current) {
        walkingInterval.current = setInterval(() => {
          setFrame(prevFrame => (prevFrame + 1) % 4);
        }, 150);
      }
    }
    
    // GSAP animation based on scroll progress
    gsap.to(doodleRef.current, {
      scale: 0.8 + 0.4 * Math.sin(scrollProgress * Math.PI),
      duration: 0.5,
      ease: "power1.out"
    });
    
    return () => {
      if (walkingInterval.current) {
        clearInterval(walkingInterval.current);
      }
    };
  }, [scrollProgress, isVisible]);

  // Different face expressions based on emotion
  const renderFace = () => {
    switch(emotion) {
      case 'frustrated':
        return (
          <>
            <ellipse cx="18" cy="17" rx="2" ry="3" fill="black" /> {/* Left eye */}
            <ellipse cx="32" cy="17" rx="2" ry="3" fill="black" /> {/* Right eye */}
            <path d="M16 24 Q 25 22, 34 24" stroke="black" strokeWidth="1.5" fill="transparent" /> {/* Frown */}
            <line x1="15" y1="13" x2="19" y2="11" stroke="black" strokeWidth="1.5" /> {/* Left eyebrow */}
            <line x1="35" y1="13" x2="31" y2="11" stroke="black" strokeWidth="1.5" /> {/* Right eyebrow */}
          </>
        );
      
      case 'surprised':
        return (
          <>
            <circle cx="18" cy="17" r="3" fill="black" /> {/* Left eye */}
            <circle cx="32" cy="17" r="3" fill="black" /> {/* Right eye */}
            <circle cx="25" cy="27" r="4" fill="black" /> {/* Open mouth */}
            <line x1="15" y1="11" x2="21" y2="9" stroke="black" strokeWidth="1.5" /> {/* Left eyebrow */}
            <line x1="35" y1="11" x2="29" y2="9" stroke="black" strokeWidth="1.5" /> {/* Right eyebrow */}
          </>
        );
      
      case 'happy':
        return (
          <>
            <ellipse cx="18" cy="16" rx="2" ry="2.5" fill="black" /> {/* Left eye */}
            <ellipse cx="32" cy="16" rx="2" ry="2.5" fill="black" /> {/* Right eye */}
            <path d="M15 24 Q 25 30, 35 24" stroke="black" strokeWidth="1.5" fill="transparent" /> {/* Smile */}
          </>
        );
      
      case 'curious':
        return (
          <>
            <ellipse cx="18" cy="17" rx="2" ry="2.5" fill="black" /> {/* Left eye */}
            <ellipse cx="32" cy="17" rx="2" ry="2.5" fill="black" /> {/* Right eye */}
            <path d="M20 26 Q 25 24, 30 26" stroke="black" strokeWidth="1.5" fill="transparent" /> {/* Slight smile */}
            <line x1="15" y1="12" x2="21" y2="10" stroke="black" strokeWidth="1.5" /> {/* Left raised eyebrow */}
            <line x1="29" y1="13" x2="35" y2="13" stroke="black" strokeWidth="1.5" /> {/* Right flat eyebrow */}
          </>
        );
        
      case 'excited':
        return (
          <>
            <path d="M16 17 Q 18 14, 20 17" stroke="black" strokeWidth="1.5" fill="black" /> {/* Left happy eye */}
            <path d="M30 17 Q 32 14, 34 17" stroke="black" strokeWidth="1.5" fill="black" /> {/* Right happy eye */}
            <path d="M15 24 Q 25 32, 35 24" stroke="black" strokeWidth="1.5" fill="transparent" /> {/* Big smile */}
            <path d="M37 15 L 40 10 L 42 15 M 13 15 L 10 10 L 8 15" stroke={emotionColors.excited} strokeWidth="1.5" /> {/* Excitement marks */}
          </>
        );
      
      default: // neutral
        return (
          <>
            <ellipse cx="18" cy="17" rx="2" ry="2.5" fill="black" /> {/* Left eye */}
            <ellipse cx="32" cy="17" rx="2" ry="2.5" fill="black" /> {/* Right eye */}
            <path d="M18 26 Q 25 28, 32 26" stroke="black" strokeWidth="1.5" fill="transparent" /> {/* Neutral mouth */}
          </>
        );
    }
  };

  if (!isVisible) {
    return null;
  }

  const randomWobble = Math.sin(Date.now() / 500) * 2;

  return (
    <div 
      ref={doodleRef} 
      className="relative"
      style={{ 
        width: '100px',
        height: '180px',
        transform: `translateY(${walking ? Math.sin(Date.now() / 150) * 3 : 0}px) rotate(${randomWobble}deg)` 
      }}
    >
      {/* SVG character */}
      <svg viewBox="0 0 50 90" width="100%" height="100%">
        {/* Head */}
        <circle cx="25" cy="20" r="15" fill={skinColor} stroke="black" strokeWidth="1" />
        
        {/* Face based on emotion */}
        {renderFace()}
        
        {/* Hair */}
        <path 
          d="M10 18 Q 15 5, 25 8 Q 35 5, 40 18" 
          fill={emotionColors[emotion]} 
          stroke="black" 
          strokeWidth="1" 
        />
        
        {/* Body/outfit based on emotion */}
        <rect 
          x="15" 
          y="35" 
          width="20" 
          height="25" 
          fill={emotionColors[emotion]} 
          stroke="black" 
          strokeWidth="1" 
        />
        
        {/* Neck */}
        <rect x="22" y="30" width="6" height="5" fill={skinColor} stroke="black" strokeWidth="0.5" />
        
        {/* Arms - position changes with walking animation */}
        <rect 
          x="8" 
          y="38" 
          width="7" 
          height="15" 
          fill={skinColor} 
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? Math.sin(frame * Math.PI/2) * 20 : 0}, 15, 38)`}
        />
        <rect 
          x="35" 
          y="38" 
          width="7" 
          height="15" 
          fill={skinColor} 
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? -Math.sin(frame * Math.PI/2) * 20 : 0}, 35, 38)`}
        />
        
        {/* Legs - position changes with walking animation */}
        <rect 
          x="18" 
          y="60" 
          width="6" 
          height="25" 
          fill="#6B8E9E" // Pants color
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? Math.sin(frame * Math.PI/2) * 15 : 0}, 21, 60)`}
        />
        <rect 
          x="26" 
          y="60" 
          width="6" 
          height="25" 
          fill="#6B8E9E" // Pants color
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? -Math.sin(frame * Math.PI/2) * 15 : 0}, 29, 60)`}
        />
        
        {/* Feet */}
        <ellipse 
          cx="21" 
          cy="85" 
          rx="5" 
          ry="2" 
          fill="#472D25" // Shoe color
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? Math.sin(frame * Math.PI/2) * 15 : 0}, 21, 60) translate(0, 0)`}
        />
        <ellipse 
          cx="29" 
          cy="85" 
          rx="5" 
          ry="2" 
          fill="#472D25" // Shoe color
          stroke="black" 
          strokeWidth="1"
          transform={`rotate(${walking ? -Math.sin(frame * Math.PI/2) * 15 : 0}, 29, 60) translate(0, 0)`}
        />
        
        {/* Add accessories or details based on emotion */}
        {emotion === 'frustrated' && (
          <path d="M40 15 L 43 10 L 46 15" stroke="red" strokeWidth="1" />  // Frustration mark
        )}
        {emotion === 'happy' && (
          <circle cx="40" cy="20" r="2" fill="yellow" />  // Happy sparkle
        )}
        {(emotion === 'surprised' || emotion === 'excited') && (
          <>
            <path d="M42 18 L 45 13 M 41 13 L 46 18" stroke="gold" strokeWidth="1" />  // Surprise sparkle
            <path d="M8 18 L 5 13 M 9 13 L 4 18" stroke="gold" strokeWidth="1" />  // Surprise sparkle
          </>
        )}
      </svg>
      
      {/* Thought/speech bubble for storytelling - appears based on scroll position */}
      {emotion !== 'neutral' && (
        <div className="absolute -top-12 -right-24 bg-white p-2 rounded-lg border border-gray-300 text-xs w-24 text-center opacity-80">
          {emotion === 'frustrated' && "This wait is too long!"}
          {emotion === 'curious' && "I need to understand this..."}
          {emotion === 'happy' && "Great experience!"}
          {emotion === 'surprised' && "Wow, that's amazing!"}
          {emotion === 'excited' && "This is awesome!"}
        </div>
      )}
    </div>
  );
};

export default WalkingDoodle;
