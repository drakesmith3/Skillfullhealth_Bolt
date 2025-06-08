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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'tree'>('book');
  const [isMounted, setIsMounted] = useState(true);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const { isDark } = useTheme();
  const { playClick: localPlayClick } = useClickSound(); // Rename to avoid conflict if needed, though direct use of prop is better
  
  // Memoized click handler that prioritizes the prop sound function
  const handleClickWithSound = useCallback(() => {
    if (!isMounted) return;
    
    if (typeof playClickSound === 'function') {
      playClickSound(); // Use the sound function passed from Home.tsx
    } else {
      localPlayClick(); // Fallback to the local sound hook if no prop is provided
    }
  }, [playClickSound, localPlayClick, isMounted]);

  // Memoized tab switcher for mobile
  const switchTab = useCallback((tab: 'book' | 'tree') => {
    if (!isMounted) return;
    setActiveTab(tab);
    handleClickWithSound(); // Play sound on tab switch using the centralized handler
  }, [isMounted, handleClickWithSound]);

  // Memoized background styles for performance
  const backgroundStyles = useMemo(() => ({
    background: isDark 
      ? 'linear-gradient(135deg, #1a1a1a 0%, #4a1a1a 30%, #2a2a2a 70%, #0f0f0f 100%)'
      : 'linear-gradient(135deg, #fef7f0 0%, #fce4d6 20%, #f9d5d5 40%, #f5e6dc 60%, #fefefe 100%)',
    zIndex: isActive ? 20 : 0,
    visibility: isActive ? 'visible' as const : 'hidden' as const,
    transitionProperty: 'opacity, visibility, background, transform',
    transitionDuration: '1000ms',
  }), [isDark, isActive]);

  // Optimized resize handler with throttling
  const handleResize = useCallback(() => {
    if (!isMounted || !isActive) return;
    
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      if (isMounted) {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  }, [isActive, isMounted]);

  // Enhanced visibility management when section becomes active
  useEffect(() => {
    if (!sectionRef.current || !isMounted) return;
    
    const section = sectionRef.current;
    
    if (isActive) {
      // Use RAF for smooth transitions
      requestAnimationFrame(() => {
        section.classList.add('opacity-100');
        section.classList.remove('opacity-0');
      });
      
      // Delayed resize event for child components
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          handleResize();
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      section.classList.add('opacity-0');
      section.classList.remove('opacity-100');
    }
  }, [isActive, isMounted, handleResize]);

  // Optimized tab change handler
  useEffect(() => {
    if (!isActive || !isMounted) return;
    
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        handleResize();
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [activeTab, isActive, isMounted, handleResize]);

  // Mount state tracking for cleanup
  useEffect(() => {
    return () => {
      setIsMounted(false);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Memoized tab navigation for mobile
  const TabNavigation = useMemo(() => (
    <div className="lg:hidden flex justify-center mb-6">
      <div className="flex bg-card/50 backdrop-blur-sm rounded-lg p-1 border border-border/20">
        <button
          onClick={() => {
            console.log('Book tab clicked');
            switchTab('book');
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'book'
              ? 'bg-primary/20 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label="View Interactive Book"
        >
          📖 Book
        </button>
        <button
          onClick={() => {
            console.log('Tree tab clicked');
            switchTab('tree');
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'tree'
              ? 'bg-primary/20 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
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
      </header>

      {/* Mobile Tab Navigation */}
      {TabNavigation}

      {/* Main Content Grid */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 xl:gap-12">
        {/* Interactive Book Card */}
        <section
          className={`features-card-3d rounded-xl lg:rounded-2xl flex flex-col space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 ${
            activeTab === 'tree' ? 'hidden lg:flex' : 'flex'
          }`}
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
          aria-labelledby="book-heading"
        >
          <h3 
            id="book-heading"
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-700 dark:text-amber-400 font-semibold text-center"
          >
            📖 Interactive Book
          </h3>
          
          <div className="w-full flex-1 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
            {(isActive && (activeTab === 'book' || window.innerWidth >= 1024)) && (
              <AnimatedBook />
            )}
          </div>
          
          <p className="text-center max-w-md text-sm lg:text-base text-foreground/80 mx-auto leading-relaxed">
            Discover the core principles and opportunities within the GLOHSEN ecosystem. Each page unfolds a new dimension of our commitment to healthcare excellence.
          </p>
        </section>

        {/* Stakeholder Relationship Tree Card */}
        <section
          className={`features-card-3d rounded-xl lg:rounded-2xl flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 ${
            activeTab === 'book' ? 'hidden lg:flex' : 'flex'
          }`}
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
          aria-labelledby="tree-heading"
        >
          <h3 
            id="tree-heading"
            className="text-sm sm:text-base lg:text-lg text-amber-700 dark:text-amber-400 font-semibold text-center" 
            style={{ fontSize: '1.3em' }}
          >
            🌳 Stakeholder Relationship Tree
          </h3>
          
          <div className="flex-1 flex items-center justify-center stakeholder-tree-container overflow-visible min-h-[300px] lg:min-h-[65vh]">
            {(isActive && (activeTab === 'tree' || window.innerWidth >= 1024)) && (
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
      </main>      {/* Enhanced CSS animations */}
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
