import React from 'react';
import { SectionProps } from '../pages/Home';
import ReturnToTopButton from './ReturnToTopButton';

// Higher-order component to add ReturnToTopButton to sections
export const withReturnToTopButton = (
  WrappedComponent: React.ComponentType<SectionProps>,
  isHeaderSection: boolean = false
) => {
  const WithReturnToTopButton = (props: SectionProps) => {
    const { scrollToSection, ...restProps } = props;
    
    return (
      <div className="relative w-full h-full">
        {!isHeaderSection && scrollToSection && <ReturnToTopButton scrollToSection={scrollToSection} />}
        <WrappedComponent {...props} />
      </div>
    );
  };
  
  return WithReturnToTopButton;
};
