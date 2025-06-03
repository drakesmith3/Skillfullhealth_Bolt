import React, { useEffect, useRef, useState } from 'react';
import AnimatedBook from './AnimatedBook';
import StakeholderTree from './StakeholderTree';
import { useTheme } from '../contexts/ThemeContext';

interface FeaturesProps {
  isActive?: boolean;
  sectionName?: string;
}

const Features: React.FC<FeaturesProps> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'tree'>('book');
  const { isDark } = useTheme();
  
  // Enhanced 3D animations when section becomes active
  useEffect(() => {
    if (!sectionRef.current) return;
    
    if (isActive) {
      sectionRef.current.classList.add('opacity-100');
      sectionRef.current.classList.remove('opacity-0');
      
      // Create floating 3D elements
      // createFloating3DElements(); // Commented out
      
      // Force redraw of children to ensure visibility
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    } else {
      sectionRef.current.classList.add('opacity-0');
      sectionRef.current.classList.remove('opacity-100');
      
      // Clean up floating elements
      // cleanupFloatingElements(); // Commented out
    }
  }, [isActive]);

  // Debug component visibility
  useEffect(() => {
    console.log('Features component active:', isActive);
    console.log('Active tab:', activeTab);
    
    // Force a check on active tab change
    if (isActive) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [isActive, activeTab]);
  
  // Debug visibility of child components when section is active
  useEffect(() => {
    if (isActive) {
      console.log('Features component is active, showing children');
      
      // Force a redraw after a short delay to ensure components render correctly
      setTimeout(() => {
        console.log('Forcing redraw of Features component children');
        window.dispatchEvent(new Event('resize'));
        
        if (activeTab === 'book') {
          console.log('Focusing on AnimatedBook display');
        } else {
          console.log('Focusing on StakeholderTree display');
        }
      }, 500);
    }
  }, [isActive, activeTab]);
  return (
    <div 
      ref={sectionRef}
      className={`features-3d-container relative flex flex-col justify-start items-center max-w-6xl mx-auto p-2 sm:p-4 md:p-6 lg:p-8 transition-all duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        // minHeight removed to prevent full-viewport spacing
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #4a1a1a 30%, #2a2a2a 70%, #0f0f0f 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fce4d6 20%, #f9d5d5 40%, #f5e6dc 60%, #fefefe 100%)',
        zIndex: isActive ? 20 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        transitionProperty: 'opacity, visibility, background, transform',
        transitionDuration: '1000ms',
      }}
    >      {/* Add the professional 3D styles */}
      {/* <Professional3DStyles /> */}

      {/* Header Section */}
      <div className="w-full text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="features-title-3d flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 px-4">
          <span className={isDark
            ? 'animated-shine-text'
            : 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text'}>
            THE GLOHSEN STANDARD FOR ALL
          </span>
          <span className="features-flip-container mx-4">
            <div className={`features-flip-items ${isDark
              ? 'animated-shine-text'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-400 to-red-600'}`}>
               <div>STAKEHOLDERS</div>
               <div>CLIENTS</div>
               <div>PROFESSIONALS</div>
               <div>STUDENTS</div>
               <div>TUTORS</div>
               <div>EMPLOYERS</div>
             </div>
          </span>
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground max-w-4xl mx-auto">
          GLOHSEN connects healthcare stakeholders through an integrated platform designed to elevate standards and foster professional growth.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 xl:gap-12">

        {/* Interactive Book Card */}
        <div
          className={`features-card-3d animate-fadeInScale rounded-xl lg:rounded-2xl flex flex-col space-y-4 p-4 sm:p-6 md:p-8 ${
            activeTab === 'tree' ? 'hidden lg:flex' : 'flex'
          }`}
          style={{ opacity: 1, visibility: 'visible', position: 'relative' }}
        >
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-700 dark:text-amber-400 font-semibold text-center">
            Interactive Book
          </h3>
          <div className="w-full flex-1 flex items-center justify-center">
            <AnimatedBook />
          </div>
          <p className="text-center max-w-md text-sm lg:text-base text-foreground mx-auto">
            Discover the core principles and opportunities within the GLOHSEN ecosystem. Each page unfolds a new dimension of our commitment to healthcare excellence.
          </p>
        </div>

        {/* Stakeholder Relationship Tree Card */}
        <div
          className={`features-card-3d animate-fadeInScale rounded-xl lg:rounded-2xl flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 ${
            activeTab === 'book' ? 'hidden lg:flex' : 'flex'
          }`}
          style={{ opacity: 1, visibility: 'visible', position: 'relative' }}
        >
          <h3 className="text-sm sm:text-base lg:text-lg text-amber-700 dark:text-amber-400 font-semibold text-center" style={{ fontSize: '1.3em' }}>
            Stakeholder Relationship Tree
          </h3>
          <div className="w-full stakeholder-tree-container flex justify-center h-auto min-h-[65vh] overflow-auto" style={{ transform: 'scale(1.4)', transformOrigin: 'center' }}>
            <StakeholderTree />
          </div>
          <p className="text-center max-w-md text-xs sm:text-sm lg:text-base text-foreground mx-auto">
            <span className="hidden md:inline">Hover over</span>
            <span className="md:hidden">Tap on</span> each node to learn how GLOHSEN connects with different healthcare stakeholders.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Features;
