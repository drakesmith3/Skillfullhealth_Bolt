
import React from 'react';

export interface Card3DProps {
  title?: string;
  value?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Card3D: React.FC<Card3DProps> = ({ title, value, variant = 'primary', className = "" }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-[#D4AF37] to-amber-300 text-black';
      case 'secondary':
        return 'bg-gradient-to-br from-[#ea384c] to-red-400 text-white';
      case 'tertiary':
        return 'bg-gradient-to-br from-gray-700 to-gray-900 text-white';
      default:
        return 'bg-gradient-to-br from-[#D4AF37] to-amber-300 text-black';
    }
  };

  return (
    <div className={`rounded-lg shadow-md ${getVariantStyles()} p-4 transform transition-transform duration-300 hover:-translate-y-1 ${className}`}>
      {title && <h3 className="text-sm font-bold">{title}</h3>}
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
};

export default Card3D;
