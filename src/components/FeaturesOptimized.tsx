import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import AnimatedBook from './AnimatedBook';
import StakeholderTree from './StakeholderTree';
import { useTheme } from '../contexts/ThemeContext';
import { useClickSound } from '../hooks/useClickSound';

interface FeaturesOptimizedProps {
  isActive?: boolean;
  sectionName?: string;
  playClickSound?: () => void; // This is the prop passed from Home.tsx
}

const FeaturesOptimized: React.FC<FeaturesOptimizedProps> = ({ 
  isActive = false, 
  playClickSound // Destructure the prop here
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);  const [activeTab, setActiveTab] = useState<'book' | 'tree'>('book');
  const mountedRef = useRef(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const { isDark } = useTheme();
  const { playClick: localPlayClick } = useClickSound(); // Rename to avoid conflict if needed, though direct use of prop is better  // Track screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsLargeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(newIsLargeScreen);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  // Optimized resize handler with throttling
  const handleResize = useCallback(() => {
    if (!mountedRef.current || !isActive) return;
    
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  }, [isActive]);  // Memoized click handler that prioritizes the prop sound function
  const handleClickWithSound = useCallback(() => {
    if (!mountedRef.current) return;
    
    if (typeof playClickSound === 'function') {
      playClickSound(); // Use the sound function passed from Home.tsx
    } else {
      localPlayClick(); // Fallback to the local sound hook if no prop is provided
    }
  }, [playClickSound, localPlayClick]);// Memoized tab switcher for mobile with smooth transition
  const switchTab = useCallback((tab: 'book' | 'tree') => {
    if (!mountedRef.current) return;
    
    // Always play sound effect when button is clicked
    handleClickWithSound();
    
    if (activeTab === tab) return;
    
    // Update the active tab
    setActiveTab(tab);
    
    // Force a resize event to ensure components update correctly
    setTimeout(() => {
      if (mountedRef.current) {
        handleResize();
      }
    }, 100);
  }, [handleClickWithSound, activeTab, handleResize]);

  // Memoized background styles for performance
  const backgroundStyles = useMemo(() => ({
    background: isDark 
      ? 'linear-gradient(135deg, #1a1a1a 0%, #4a1a1a 30%, #2a2a2a 70%, #0f0f0f 100%)'
      : 'linear-gradient(135deg, #fef7f0 0%, #fce4d6 20%, #f9d5d5 40%, #f5e6dc 60%, #fefefe 100%)',
    zIndex: isActive ? 20 : 0,
    visibility: isActive ? 'visible' as const : 'hidden' as const,
    transitionProperty: 'opacity, visibility, background, transform',
    transitionDuration: '1000ms',
  }), [isDark, isActive]);  // Enhanced visibility management when section becomes active
  useEffect(() => {
    if (!sectionRef.current || !mountedRef.current) return;
    
    const section = sectionRef.current;
    
    if (isActive) {
      // Use RAF for smooth transitions
      requestAnimationFrame(() => {
        section.classList.add('opacity-100');
        section.classList.remove('opacity-0');
      });
      
      // Delayed resize event for child components
      const timeoutId = setTimeout(() => {
        if (mountedRef.current) {
          handleResize();
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      section.classList.add('opacity-0');
      section.classList.remove('opacity-100');
    }
  }, [isActive, handleResize]);
  // Optimized tab change handler
  useEffect(() => {
    if (!isActive || !mountedRef.current) return;
    
    const timeoutId = setTimeout(() => {
      if (mountedRef.current) {
        handleResize();
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [activeTab, isActive, handleResize]);
  // Mount state tracking for cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);// Memoized tab navigation for mobile with improved styling
  const TabNavigation = useMemo(() => (
    <div className="lg:hidden flex justify-center mb-6">
      <div className="flex bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-1 border border-amber-400/20 shadow-lg">        <button
          onClick={() => switchTab('book')}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${
            activeTab === 'book'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30 scale-105'
              : 'text-amber-300 hover:text-amber-100 hover:bg-white/10'
          }`}
          aria-label="View Interactive Book"
        >
          📖 Book
        </button>
        <button
          onClick={() => switchTab('tree')}
          className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${
            activeTab === 'tree'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30 scale-105'
              : 'text-amber-300 hover:text-amber-100 hover:bg-white/10'
          }`}
          aria-label="View Stakeholder Tree"
        >
          🌳 Network
        </button>
      </div>
    </div>
  ), [activeTab, switchTab]);
  // Memoized flip words animation - using exact same structure as Features.tsx
  const FlipWords = useMemo(() => (
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
  ), [isDark]);

  return (
    <div 
      ref={sectionRef}
      className={`features-3d-container relative flex flex-col justify-start items-center p-2 sm:p-4 md:p-6 lg:p-8 transition-all duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={backgroundStyles}
      role="region"
      aria-label="GLOHSEN Features Section"
      aria-hidden={!isActive}
    >
      {/* Header Section */}
      <header className="w-full text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="features-title-3d flex flex-wrap justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 px-4">
          <span className={isDark
            ? 'animated-shine-text'
            : 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text'}>
            THE GLOHSEN STANDARD FOR ALL
          </span>
          {FlipWords}
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
          GLOHSEN connects healthcare stakeholders through an integrated platform designed to elevate standards and foster professional growth.
        </p>
      </header>      {/* Mobile Tab Navigation */}
      {TabNavigation}      {/* Main Content Grid */}
      <main className="w-full lg:grid lg:grid-cols-2 lg:gap-4 lg:sm:gap-6 lg:md:gap-8 lg:xl:gap-12">
        <div className="lg:hidden relative w-full">
          {/* Mobile: Show only active tab content */}
          {activeTab === 'book' && (
            <section
              className="features-card-3d rounded-xl flex flex-col space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg transition-all duration-500 ease-in-out"
              aria-labelledby="book-heading"
            >
              <h3 
                id="book-heading"
                className="text-base sm:text-lg md:text-xl text-amber-700 dark:text-amber-400 font-semibold text-center"
              >
                📖 Interactive Book
              </h3>
              
              <div className="w-full flex-1 flex items-center justify-center min-h-[300px]">
                {isActive && mountedRef.current && <AnimatedBook />}
              </div>
              
              <p className="text-center max-w-md text-sm text-foreground/80 mx-auto leading-relaxed">
                Discover the core principles and opportunities within the GLOHSEN ecosystem. Each page unfolds a new dimension of our commitment to healthcare excellence.
              </p>
            </section>
          )}
          
          {activeTab === 'tree' && (
            <section
              className="features-card-3d rounded-xl flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg transition-all duration-500 ease-in-out"
              aria-labelledby="tree-heading"
            >
              <h3 
                id="tree-heading"
                className="text-sm sm:text-base text-amber-700 dark:text-amber-400 font-semibold text-center" 
                style={{ fontSize: '1.3em' }}
              >
                🌳 Stakeholder Relationship Tree
              </h3>
              
              <div className="flex-1 flex items-center justify-center stakeholder-tree-container overflow-visible min-h-[300px]">
                {isActive && mountedRef.current && (
                  <div 
                    style={{ 
                      transform: 'scale(1.4)', 
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <StakeholderTree playClickSound={handleClickWithSound} /> 
                  </div>
                )}
              </div>
              
              <p className="text-center max-w-md text-xs sm:text-sm text-foreground/80 mx-auto leading-relaxed">
                <span className="md:hidden">Tap on</span> each node to learn how GLOHSEN connects with different healthcare stakeholders.
              </p>
            </section>
          )}
        </div>

        {/* Desktop: Show both sections side by side */}
        <div className="hidden lg:contents">
          {/* Interactive Book Card */}<section
          className={`features-card-3d rounded-xl lg:rounded-2xl flex flex-col space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out ${
            activeTab === 'tree' ? 'lg:flex' : 'flex'
          }`}
          style={{ 
            opacity: (activeTab === 'book' || isLargeScreen) ? 1 : 0,
            transform: (activeTab === 'book' || isLargeScreen) ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(0.95)',
            pointerEvents: (activeTab === 'book' || isLargeScreen) ? 'auto' : 'none',
            position: 'relative',
            transformStyle: 'preserve-3d',
            zIndex: activeTab === 'book' ? 10 : 1,
            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out'
          }}
          aria-labelledby="book-heading"
        >
          <h3 
            id="book-heading"
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-700 dark:text-amber-400 font-semibold text-center"
          >
            📖 Interactive Book
          </h3>            <div className="w-full flex-1 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
            {isActive && mountedRef.current && <AnimatedBook />}
          </div>
          
          <p className="text-center max-w-md text-sm lg:text-base text-foreground/80 mx-auto leading-relaxed">
            Discover the core principles and opportunities within the GLOHSEN ecosystem. Each page unfolds a new dimension of our commitment to healthcare excellence.
          </p>
        </section>

        {/* Stakeholder Relationship Tree Card */}        <section
          className={`features-card-3d rounded-xl lg:rounded-2xl flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out ${
            activeTab === 'book' ? 'lg:flex' : 'flex'
          }`}
          style={{ 
            opacity: (activeTab === 'tree' || isLargeScreen) ? 1 : 0,
            transform: (activeTab === 'tree' || isLargeScreen) ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.95)',
            pointerEvents: (activeTab === 'tree' || isLargeScreen) ? 'auto' : 'none',
            position: 'relative',
            transformStyle: 'preserve-3d',
            zIndex: activeTab === 'tree' ? 10 : 1,
            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out'
          }}
          aria-labelledby="tree-heading"
        >
          <h3 
            id="tree-heading"
            className="text-sm sm:text-base lg:text-lg text-amber-700 dark:text-amber-400 font-semibold text-center" 
            style={{ fontSize: '1.3em' }}
          >
            🌳 Stakeholder Relationship Tree
          </h3>          <div className="flex-1 flex items-center justify-center stakeholder-tree-container overflow-visible min-h-[300px] lg:min-h-[65vh]">
            {isActive && mountedRef.current && (
              <div 
                style={{ 
                  transform: 'scale(1.4)', 
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Pass the centralized sound handler to StakeholderTree */}
                <StakeholderTree playClickSound={handleClickWithSound} /> 
              </div>
            )}
          </div>
            <p className="text-center max-w-md text-xs sm:text-sm lg:text-base text-foreground/80 mx-auto leading-relaxed">
            <span className="hidden md:inline">Hover over</span>
            <span className="md:hidden">Tap on</span> each node to learn how GLOHSEN connects with different healthcare stakeholders.
          </p>
        </section>
        </div>
      </main>{/* Enhanced CSS animations */}
      <style>{`
        .features-3d-container {
          perspective: 1000px;
        }
        
        .features-card-3d {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .features-card-3d:hover {
          transform: translateY(-8px) rotateX(2deg) rotateY(2deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .features-title-3d {
          text-shadow: ${isDark 
            ? '0 2px 4px rgba(255, 215, 0, 0.3)' 
            : '0 2px 4px rgba(220, 20, 60, 0.2)'
          };
        }
        
        /* Ensure stakeholder tree is interactive */
        .stakeholder-tree-container svg {
          overflow: visible !important;
        }

        .stakeholder-tree-container svg g circle {
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .stakeholder-tree-container svg g circle:hover {
          filter: brightness(1.2) drop-shadow(0 0 5px rgba(255,255,255,0.5));
          transform: scale(1.1);
        }

      `}</style>
    </div>
  );
};

export default FeaturesOptimized;
