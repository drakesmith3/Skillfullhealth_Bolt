
import React from 'react';

interface Card3DProps {
  title: string;
  value: string | React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'default';
  className?: string;
}

const Card3D: React.FC<Card3DProps> = ({ title, value, variant = 'primary', className = '' }) => {
  return (
    <div className={`rounded-lg p-3 shadow-md transform transition-transform hover:scale-105 ${className}`}>
      <div className="flex flex-col">
        <span className="text-xs font-bold">{title}</span>
        {typeof value === 'string' ? (
          <span className="text-xs mt-1">{value}</span>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default Card3D;
