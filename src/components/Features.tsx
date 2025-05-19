import React, { useEffect, useRef, useState } from 'react';
import AnimatedBook from './AnimatedBook';
import StakeholderTree from './StakeholderTree';

// Define a CSS style block to ensure components are visible
const ForceVisibilityStyle = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      /* Force visibility of key components */
      .stakeholder-tree-container, .animated-book-container {
        opacity: 1 !important;
        visibility: visible !important;
        min-height: 450px;
        position: relative;
        z-index: 10;
      }
      
      .animated-book-container svg, .stakeholder-tree-container svg {
        min-height: 400px;
        min-width: 300px;
      }
    `
  }} />
);

interface FeaturesProps {
  isActive?: boolean;
  sectionName?: string;
}

const Features: React.FC<FeaturesProps> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'tree'>('book');
  // Effect for animations when section becomes active
  useEffect(() => {
    if (!sectionRef.current) return;
    
    if (isActive) {
      // Add animation classes or modify styles when active
      sectionRef.current.classList.add('opacity-100');
      sectionRef.current.classList.remove('opacity-0');
      
      // Force redraw of children to ensure visibility
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    } else {
      // Reset animations when not active
      sectionRef.current.classList.add('opacity-0');
      sectionRef.current.classList.remove('opacity-100');
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
      className={`relative min-h-screen w-full flex flex-col justify-center items-center py-16 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'linear-gradient(135deg, #111111 0%, #3a0000 100%)',
        zIndex: isActive ? 20 : 0, // Ensure active section has higher z-index
        visibility: isActive ? 'visible' : 'hidden', // Add visibility toggle
        transitionProperty: 'opacity, visibility',
        transitionDuration: '1000ms'
      }}
    >
      {/* Add the force visibility style */}
      <ForceVisibilityStyle />
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
          THE GLOHSEN STANDARD FOR ALL STAKEHOLDERS
        </span>
      </h2>
      
      <p className="text-lg md:text-xl text-gray-300 max-w-4xl text-center mb-8 px-4">
        GLOHSEN connects healthcare stakeholders through an integrated platform designed to elevate standards and foster professional growth.
      </p>
      
      {/* Mobile Tab Switcher - Only visible on small screens */}
      <div className="lg:hidden w-full px-4 mb-6">
        <div className="flex rounded-lg bg-gray-900/50 p-1 max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab('book')}            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === 'book' 
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Interactive Book
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === 'tree' 
                ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Stakeholder Map
          </button>
        </div>
      </div>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">        {/* Left side: Interactive Book - Hidden on mobile when tree tab is active */}
        <div 
          className={`flex flex-col items-center ${activeTab === 'tree' ? 'hidden lg:flex' : 'flex'} animate-fadeInScale`}
          style={{ 
            minHeight: '500px', 
            opacity: 1, 
            visibility: 'visible',
            position: 'relative'
          }}
        >
          <h3 className="text-2xl text-amber-400 font-semibold mb-6">Interactive Book</h3>
          <div 
            className="w-full animated-book-container" 
            style={{
              minHeight: '400px',
              position: 'relative'
            }}
          >
            <AnimatedBook />
          </div>
          <p className="text-gray-300 text-center mt-4 max-w-lg">
            Click through our interactive book to explore the features available to each stakeholder group.
          </p>
        </div>
          {/* Right side: Stakeholder Tree - Hidden on mobile when book tab is active */}
        <div 
          className={`flex flex-col items-center ${activeTab === 'book' ? 'hidden lg:flex' : 'flex'} animate-fadeInScale`}
          style={{ 
            minHeight: '500px', 
            opacity: 1,
            visibility: 'visible',
            position: 'relative'
          }}
        >
          <h3 className="text-2xl text-amber-400 font-semibold mb-6">Stakeholder Relationship Tree</h3>
          <div 
            className="w-full h-[450px] md:h-[500px] stakeholder-tree-container" 
            style={{ 
              position: 'relative',
              overflow: 'visible',
              minHeight: '450px'
            }}
          >
            <StakeholderTree />
          </div>
          <p className="text-gray-300 text-center mt-4 max-w-lg">            <span className="hidden md:inline">Hover over</span>
            <span className="md:hidden">Tap on</span> each node to learn how GLOHSEN connects with different healthcare stakeholders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
