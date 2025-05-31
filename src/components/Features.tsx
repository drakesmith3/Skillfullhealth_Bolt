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
      // Reduced padding in className below
      className={`features-3d-container relative min-h-screen w-full flex flex-col justify-center items-center py-2 md:py-4 transition-all duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #4a1a1a 30%, #2a2a2a 70%, #0f0f0f 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fce4d6 20%, #f9d5d5 40%, #f5e6dc 60%, #fefefe 100%)',
        zIndex: isActive ? 20 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        transitionProperty: 'opacity, visibility, background, transform',
        transitionDuration: '1000ms',
      }}
    >
      {/* Add the professional 3D styles */}
      {/* <Professional3DStyles /> */}

      {/* Reduced margin in className below*/}
      <h2 className="features-title-3d text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold mb-2 sm:mb-3 text-center px-4">
        <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
          THE GLOHSEN STANDARD FOR ALL STAKEHOLDERS
        </span>
      </h2>
      
      {/* Reduced margin in className below*/}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black-700 max-w-3xl text-center mb-2 sm:mb-3 px-4">
        GLOHSEN connects healthcare stakeholders through an integrated platform designed to elevate standards and foster professional growth.
      </p>
      
      {/* Reduced margin in className below*/}
      <div className="lg:hidden w-full px-4 mb-2">
        <div className="flex rounded-lg bg-gray-900/50 p-1 max-w-sm mx-auto backdrop-blur-sm border border-white/10">
          <button
            onClick={() => setActiveTab('book')}
            className={`features-tab-3d flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'book' 
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg active' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Interactive Book
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className={`features-tab-3d flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'tree' 
                ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg active' 
                : 'text-gray-400 hover:text-black-700'
            }`}
          >
            Stakeholder Map
          </button>
        </div>
      </div>

      {/* Reduced gap in className below*/}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 px-4 flex-grow">
        {/* Left side: Interactive Book with enhanced 3D design */}
        {/* Reduced padding in className below*/}
        <div 
          className={`features-card-3d flex flex-col items-center ${
            activeTab === 'tree' ? 'hidden lg:flex' : 'flex'
          } animate-fadeInScale p-1 sm:p-2 rounded-2xl`}
          style={{ 
            opacity: 1, 
            visibility: 'visible',
            position: 'relative',
            minHeight: 'auto' // Allow content to define height
          }}
        >
          {/* Reduced margin in className below*/}
          <h3 className="text-md sm:text-lg text-amber-400 font-semibold mb-1 sm:mb-1">Interactive Book</h3>
          <div 
            className="w-full animated-book-container mb-4" // Increased bottom margin to mb-4
            style={{
              position: 'relative',
              minHeight: 'min(300px, 50vh)', 
              height: 'min(300px, 50vh)' // Reduced height
            }}
          >
            <AnimatedBook />
          </div>
          <p className={`text-center mt-2 max-w-md text-xs sm:text-sm ${ // Increased top margin to mt-2
            isDark ? 'text-gray-500' : 'text-gray-700'
          }`}>
            Click through our interactive book to explore the features available to each stakeholder group.
          </p>
        </div>

        {/* Right side: Stakeholder Tree with enhanced 3D design */}
        {/* Reduced padding in className below*/}
        <div 
          className={`features-card-3d flex flex-col items-center ${
            activeTab === 'book' ? 'hidden lg:flex' : 'flex'
          } animate-fadeInScale p-1 sm:p-2 rounded-2xl`}
          style={{ 
            opacity: 1,
            visibility: 'visible',
            position: 'relative',
            minHeight: 'auto' // Allow content to define height
          }}
        >
          {/* Reduced margin in className below*/}
          <h3 className="text-md sm:text-lg text-amber-400 font-semibold mb-1 sm:mb-1">Stakeholder Relationship Tree</h3>
          <div 
            className="w-full stakeholder-tree-container mb-4" // Increased bottom margin to mb-4
            style={{ 
              position: 'relative',
              overflow: 'visible',
              minHeight: 'min(300px, 50vh)', 
              height: 'min(300px, 50vh)' // Reduced height
            }}
          >
            <StakeholderTree />
          </div>
          <p className={`text-center mt-2 max-w-md text-xs sm:text-sm ${ // Increased top margin to mt-2
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <span className="hidden md:inline">Hover over</span>
            <span className="md:hidden">Tap on</span> each node to learn how GLOHSEN connects with different healthcare stakeholders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
