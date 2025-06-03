import React from 'react';
import { SectionProps } from '../pages/Home';
import ReturnToTopButton from './ReturnToTopButton';

// Higher-order component to add ReturnToTopButton to sections
export const withReturnToTopButton = (
  WrappedComponent: React.ComponentType<SectionProps>
) => {
  const WithReturnToTopButton = (props: SectionProps) => {
    const { scrollToSection, sectionName, ...restProps } = props;
    
    // Don't show ReturnToTopButton on the Header section
    const shouldShowButton = sectionName !== "Header" && scrollToSection;
    
    return (
      <div className="relative w-full h-full">
        {shouldShowButton && <ReturnToTopButton scrollToSection={scrollToSection} />}
        <WrappedComponent {...props} />
      </div>
    );
  };
  
  return WithReturnToTopButton;
};
