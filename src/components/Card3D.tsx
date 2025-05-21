
import React, { useState, useRef, useEffect } from 'react';

interface Card3DProps {
  className?: string;
  children: React.ReactNode;
  intensity?: number;
  roundedFull?: boolean;
}

const Card3D: React.FC<Card3DProps> = ({
  className = '',
  children,
  intensity = 10,
  roundedFull = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = -((y - centerY) / centerY);
      
      setPosition({ x: percentX * intensity, y: percentY * intensity });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setPosition({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, isHovering]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-transform duration-200 ease-out ${className} ${roundedFull ? 'rounded-full' : 'rounded-xl'}`}
      style={{
        transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) scale3d(${isHovering ? 1.05 : 1}, ${isHovering ? 1.05 : 1}, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default Card3D;
