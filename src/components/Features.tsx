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
      className={`features-3d-container relative min-h-screen w-full flex flex-col justify-center items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
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
    >      {/* Add the professional 3D styles */}
      {/* <Professional3DStyles /> */}

      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="features-title-3d text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 px-4">
          <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
            THE GLOHSEN STANDARD FOR ALL STAKEHOLDERS
          </span>
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black-700 max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
          GLOHSEN connects healthcare stakeholders through an integrated platform designed to elevate standards and foster professional growth.
        </p>
      </div>
      
      {/* Mobile Tab Selector */}
      <div className="lg:hidden w-full px-4 mb-6">
        <div className="flex rounded-lg bg-gray-900/50 p-1 max-w-md mx-auto backdrop-blur-sm border border-white/10">
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
      </div>      {/* Main Content Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 px-2 sm:px-4 flex-grow">
        {/* Left side: Interactive Book with enhanced 3D design */}
        <div 
          className={`features-card-3d flex flex-col items-center ${
            activeTab === 'tree' ? 'hidden lg:flex' : 'flex'
          } animate-fadeInScale p-2 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]`}
          style={{ 
            opacity: 1, 
            visibility: 'visible',
            position: 'relative',
          }}
        >          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-400 font-semibold mb-2 sm:mb-4 lg:mb-6 text-center">Interactive Book</h3>          <div 
            className="w-full animated-book-container flex-1 flex items-start justify-center"
            style={{
              position: 'relative',
              minHeight: '250px',
              paddingTop: '0%', // Move book up by 40% (reduced padding from top)
            }}
          >
            <AnimatedBook />
          </div>          {/* Text positioned closer to the book - moved up by 90% total (30% + 60%) */}
          <div className="w-full flex justify-center mt-4 sm:mt-6 lg:mt-8 px-2 sm:px-4" style={{ marginTop: '-1.5rem' }}>
            <p className={`text-center max-w-md text-xs sm:text-sm lg:text-base ${ 
              isDark ? 'text-gray-500' : 'text-gray-700'
            }`}
            style={{
              position: 'relative',
              zIndex: 10,
              marginTop: '-0.8rem', // Moved up significantly by 60% more
              paddingTop: '0.1rem' // Further reduced padding
            }}>
              Discover the core principles and opportunities within the GLOHSEN ecosystem. Each page unfolds a new dimension of our commitment to healthcare excellence.
            </p>
          </div>
        </div>        {/* Right side: Stakeholder Tree with enhanced 3D design */}
        <div 
          className={`features-card-3d flex flex-col items-center ${
            activeTab === 'book' ? 'hidden lg:flex' : 'flex'
          } animate-fadeInScale p-1 sm:p-2 lg:p-4 rounded-xl lg:rounded-2xl`}
          style={{ 
            opacity: 1,
            visibility: 'visible',
            position: 'relative',
            minHeight: 'auto' 
          }}
        >
          <h3 className="text-sm sm:text-base lg:text-lg text-amber-400 font-semibold mb-1 sm:mb-2 text-center">Stakeholder Relationship Tree</h3>          <div 
            className="w-full stakeholder-tree-container mb-1 sm:mb-2"
            style={{ 
              position: 'relative',
              overflow: 'visible',
              minHeight: 'min(450px, 65vh)', // Responsive height
              height: 'min(450px, 65vh)',    // Responsive height
              marginTop: '-50px' // Move stakeholder map up by 50% total (20% + 30%)
            }}
          >
            <StakeholderTree />
          </div>
          {/* Ensure text is visible and has space */}
          <p className={`text-center mt-1 sm:mt-2 lg:mt-3 max-w-md text-xs sm:text-sm lg:text-base px-2 ${ 
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
