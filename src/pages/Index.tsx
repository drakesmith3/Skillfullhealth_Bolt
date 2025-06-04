import React, { useState, useEffect, useRef, useCallback, ComponentType } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../components/Header";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorksWheel";
import Feedback from "../components/Feedback";
import Employers from "../components/Employers";
import TutorsAdvisers from "../components/TutorsAdvisers";
import GamesAndQuizzes from "../components/GamesQuizzes";
import SuccessStories from "../components/SuccessStories";
import JoinCommunity from "../components/JoinCommunity";
import Footer from "../components/Footer";
import ProgressIndicator from "../components/ProgressIndicator";
import StoryAnimations from "../components/StoryAnimations";
import ReturnToTopButton from "../components/ReturnToTopButton";
import { withReturnToTopButton } from "../components/withReturnToTopButton";

// Ensure ScrollTrigger is registered globally
gsap.registerPlugin(ScrollTrigger);

// Define a common props type for section components
export interface SectionProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// Define the sections in the desired story order
const sectionsComponents: { component: ComponentType<SectionProps>; name: string }[] = [
  { component: Header as ComponentType<SectionProps>, name: "Header" },
  { component: withReturnToTopButton(Features as ComponentType<SectionProps>), name: "Features" },
  { component: withReturnToTopButton(HowItWorks as ComponentType<SectionProps>), name: "HowItWorks" },
  { component: withReturnToTopButton(Feedback as ComponentType<SectionProps>), name: "Feedback" },
  { component: withReturnToTopButton(Employers as ComponentType<SectionProps>), name: "Employers" },
  { component: withReturnToTopButton(TutorsAdvisers as ComponentType<SectionProps>), name: "TutorsAdvisers" },
  { component: withReturnToTopButton(GamesAndQuizzes as ComponentType<SectionProps>), name: "GamesAndQuizzes" },
  { component: withReturnToTopButton(SuccessStories as ComponentType<SectionProps>), name: "SuccessStories" },
  { component: withReturnToTopButton(JoinCommunity as ComponentType<SectionProps>), name: "JoinCommunity" },
  { component: Footer as ComponentType<SectionProps>, name: "Footer" },
];

const sectionNames = sectionsComponents.map(s => s.name);

// Easing function for smooth scrolling
const power2EaseInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function Index(): JSX.Element { 
  // Core refs
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSectionRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const mainScrollTriggerRef = useRef<ScrollTrigger | null>(null); 
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const isInitializedRef = useRef(false);
  const lastPlayedSectionRef = useRef<number>(-1);
  const hasInteractedRef = useRef(false);

  // State
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  console.log(`[Home] currentSection state: ${currentSection}`);

  const numSections = sectionsComponents.length;

  // Keep sectionsRef in sync with sections
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, numSections);
  }, [numSections]);
  
  // Loading simulation
  useEffect(() => {
    // Prevent body scrolling while Home component is mounted
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced loading time
    
    return () => {
      clearTimeout(timer);
      // Restore scrolling when component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  // Setup interaction tracking
  useEffect(() => {
    const markInteraction = () => {
      hasInteractedRef.current = true;
      window.removeEventListener("click", markInteraction);
      window.removeEventListener("keydown", markInteraction);
      window.removeEventListener("touchstart", markInteraction);
    };
    
    window.addEventListener("click", markInteraction);
    window.addEventListener("keydown", markInteraction);
    window.addEventListener("touchstart", markInteraction);
    
    return () => {
      window.removeEventListener("click", markInteraction);
      window.removeEventListener("keydown", markInteraction);
      window.removeEventListener("touchstart", markInteraction);
    };
  }, []);
  
  // Audio setup
  useEffect(() => {
    const audio = new Audio("/page-turn.mp3");
    audio.preload = "auto";
    audio.volume = 0.3;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Fixed scrollToSection function to prevent blank page issue
  const scrollToSection = useCallback((sectionIndex: number) => {
    // Validate section index
    const validIndex = Math.max(0, Math.min(sectionIndex, numSections - 1));
    
    if (!lenisRef.current || !mainRef.current || !contentRef.current) {
      console.warn("[Home] scrollToSection: Lenis, mainRef or contentRef not ready.");
      return;
    }
    
    if (isScrollingRef.current) {
      console.warn("[Home] scrollToSection: Already scrolling, ignoring request.");
      return;
    }
    
    console.log(`[Home] scrollToSection called with index: ${validIndex}`);
    
    isScrollingRef.current = true;
    
    const mainWidth = mainRef.current.offsetWidth;
    const targetScroll = validIndex * mainWidth;
    
    console.log(`[Home] Target scroll position: ${targetScroll}`);
    
    // Temporarily disable ScrollTrigger to prevent conflicts
    if (mainScrollTriggerRef.current) {
      mainScrollTriggerRef.current.disable();
    }
    
    // Play audio if enabled and user has interacted with the page
    if (isSoundEnabled && audioRef.current && hasInteractedRef.current && 
        validIndex !== lastPlayedSectionRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.warn("Audio play failed:", e));
      lastPlayedSectionRef.current = validIndex;
    }
    
    // Perform the scroll with Lenis - improved timing and easing
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.5, // Slightly longer for smoother animation
      easing: power2EaseInOut,
      lock: true,
      force: true,
      onComplete: () => {
        console.log(`[Home] Scroll completed to section ${validIndex}`);
        
        // Update all refs and state
        setCurrentSection(validIndex);
        currentSectionRef.current = validIndex;
        
        // Force GSAP update to sync with the new position
        ScrollTrigger.update();
        
        // Re-enable ScrollTrigger after a longer delay to ensure stability
        setTimeout(() => {
          if (mainScrollTriggerRef.current) {
            mainScrollTriggerRef.current.enable();
            ScrollTrigger.refresh(true);
          }
          
          isScrollingRef.current = false;
        }, 300); // Increased delay for stability
      },
    });
  }, [numSections, isSoundEnabled]);

  // Ensure we only expose the scroll function when everything is ready
  const safeScrollToSection = useCallback((sectionIndex: number) => {
    if (!isReady) {
      console.warn('[Home] Attempted scrollToSection before ready.');
      return;
    }
    scrollToSection(sectionIndex);
  }, [isReady, scrollToSection]);
  
  // Map vertical wheel events to horizontal scroll with snap-to-section feature - improved stability
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    
    // Track wheel events for debouncing
    let wheelTimeout: NodeJS.Timeout | null = null;
    let wheelCount = 0;
    let lastWheelDirection = 0;
    let lastWheelTime = 0;
    
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      const throttleTime = 50; // ms between wheel events to process
      
      // Throttle wheel events
      if (now - lastWheelTime < throttleTime) return;
      lastWheelTime = now;
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.5) { // Ensure dominantly vertical scroll
        // Translate vertical scroll to horizontal with enhanced smoothing
        main.scrollLeft += e.deltaY * 0.8; // Reduced multiplier for smoother scrolling
        e.preventDefault();
        
        // Determine scroll direction (positive = down/right, negative = up/left)
        const direction = e.deltaY > 0 ? 1 : -1;
        
        // If direction changes, reset the counter
        if (direction !== lastWheelDirection) {
          wheelCount = 0;
          lastWheelDirection = direction;
        }
        
        wheelCount++;
        
        // Clear existing timeout
        if (wheelTimeout) {
          clearTimeout(wheelTimeout);
        }
        
        // Set a timeout to snap to the nearest section after scrolling stops - improved timing
        wheelTimeout = setTimeout(() => {
          // Only snap if we've had enough wheel events in the same direction and not already scrolling
          if (wheelCount >= 2 && !isScrollingRef.current) {
            const currentSectionIndex = currentSectionRef.current;
            const targetSection = currentSectionIndex + (direction > 0 ? 1 : -1);
            
            // Check bounds
            if (targetSection >= 0 && targetSection < numSections) {
              scrollToSection(targetSection);
            }
          }
          
          // Reset wheel count after snapping
          wheelCount = 0;
        }, 220); // Increased delay for better detection of scroll ending
      }
    };
    
    main.addEventListener('wheel', onWheel, { passive: false });
    
    return () => {
      main.removeEventListener('wheel', onWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [numSections, scrollToSection]);

  // Toggle sound function
  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  // Main GSAP and Lenis initialization with improved settings
  useEffect(() => {
    if (isLoading || isInitializedRef.current) return;

    console.log("[Home] Initializing GSAP and Lenis for horizontal scrolling...");
    
    // Clean up any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(st => st.kill());

    const mainElement = mainRef.current;
    const contentElement = contentRef.current;

    if (!mainElement || !contentElement || numSections === 0) {
      console.error(`[Home] Missing required elements for initialization`);
      return;
    }
    
    // Initialize Lenis for smooth scrolling with improved settings
    const lenis = new Lenis({
      smoothWheel: true,
      orientation: "horizontal",
      gestureOrientation: "horizontal",
      syncTouch: true,
      infinite: false,
      duration: 1.8, // Slower for more controlled scrolling
      easing: power2EaseInOut,
      wheelMultiplier: 0.8, // Reduced multiplier for smoother scrolling
      touchMultiplier: 1.5,
      // Remove smoothTouch property which was causing errors
    });
    
    lenisRef.current = lenis;
    
    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Set up GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for better sync
    
    // Start Lenis
    lenis.start();
    console.log("[Home] Lenis scrolling initialized");
    
    // Create GSAP context for ScrollTrigger setup
    const gsapCtx = gsap.context(() => {
      // Create main timeline with ScrollTrigger - improved settings
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainElement,
          pin: true,
          scrub: 1.2, // Smoother scrubbing
          start: "top top",
          end: () => `+=${contentElement.offsetWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          preventOverlaps: true,
          fastScrollEnd: true,
          onUpdate: self => {
            if (isScrollingRef.current) return; // Don't update during programmatic scrolling
            
            // Update current section based on scroll progress
            const rawSection = Math.round(self.progress * (numSections - 1));
            const newSectionIndex = Math.max(0, Math.min(numSections - 1, rawSection));
            
            if (newSectionIndex !== currentSectionRef.current) {
              console.log(`[Home] ScrollTrigger updating section to: ${newSectionIndex}`);
              setCurrentSection(newSectionIndex);
              currentSectionRef.current = newSectionIndex;
              
              // Play audio if enabled and user has interacted with the page
              if (isSoundEnabled && audioRef.current && hasInteractedRef.current &&
                  newSectionIndex !== lastPlayedSectionRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.warn("Audio play failed:", e));
                lastPlayedSectionRef.current = newSectionIndex;
              }
            }
          },
          snap: {
            snapTo: progress => {
              if (numSections <= 1) return 0;
              // Calculate the target section based on scroll progress
              const section = Math.round(progress * (numSections - 1));
              return section / (numSections - 1);
            },
            duration: { min: 0.4, max: 0.8 }, // Slower, smoother snapping
            delay: 0.2, // Increased delay to prevent immediate snap-back
            ease: "power2.inOut", // Smoother easing
            inertia: true, // Enable inertia for natural feel
            directional: true, // Respect scroll direction
          },
        },
      });
      
      // Add animation to the timeline
      tl.to(contentElement, {
        x: () => -Math.max(0, contentElement.offsetWidth - mainElement.offsetWidth),
        ease: "none",
      });
      
      // Store references
      tlRef.current = tl;
      if (tl.scrollTrigger) {
        mainScrollTriggerRef.current = tl.scrollTrigger;
      }
    }, mainElement);
    
    // Store GSAP context for cleanup
    gsapCtxRef.current = gsapCtx;
    
    // Mark as initialized and ready
    isInitializedRef.current = true;
    setIsReady(true);
    
    // Force refresh ScrollTrigger to ensure correct positioning
    ScrollTrigger.refresh(true);
    
    // Second refresh after a delay to handle any DOM updates
    setTimeout(() => {
      ScrollTrigger.refresh(true);
      window.dispatchEvent(new Event("resize"));
    }, 600); // Longer delay for better initialization
    
    // Cleanup function
    return () => {
      console.log("[Home] Cleaning up GSAP and Lenis");
      gsap.ticker.remove(tickerCallback);
      
      if (lenisRef.current) {
        lenisRef.current.off('scroll', ScrollTrigger.update);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      
      if (gsapCtxRef.current) {
        gsapCtxRef.current.revert();
        gsapCtxRef.current = null;
      }
      
      ScrollTrigger.getAll().forEach(st => st.kill());
      tlRef.current = null;
      mainScrollTriggerRef.current = null;
      isInitializedRef.current = false;
    };
  }, [isLoading, numSections, isSoundEnabled]);

  // Handle window resize events to ensure proper layout
  useEffect(() => {
    const handleResize = () => {
      if (isReady && mainScrollTriggerRef.current) {
        // Refresh ScrollTrigger on resize to maintain proper positions
        ScrollTrigger.refresh(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  return (
    <div className="relative">
      <ProgressIndicator
        currentSection={currentSection}
        totalSections={numSections}
        scrollToSection={safeScrollToSection}
        chapterTitles={sectionNames}
      />
      <StoryAnimations
        currentSection={currentSection} 
        totalSections={numSections} 
      />
      <main 
        ref={mainRef} 
        className="w-screen h-screen fixed top-0 left-0 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          ref={contentRef}
          className="h-full flex flex-nowrap"
          style={{ 
            width: `${numSections * 100}vw`,
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
        >
          {sectionsComponents.map((SectionItem, index) => {
            const isActive = index === currentSection;
            // Only apply 3D transform to the section content, not the section container
            let rotateY = 0;
            let scale = 1;
            let skewY = 0;
            let boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            let filter = 'none';
            const isTurning = Math.abs(index - currentSection) === 1;
            if (index < currentSection) {
              rotateY = -180;
              scale = 0.98;
              skewY = 2;
              boxShadow = '0 8px 32px rgba(0,0,0,0.18), 0 1.5px 8px rgba(0,0,0,0.10)';
              filter = 'brightness(0.98) blur(0.5px)';
            } else if (index === currentSection) {
              rotateY = 0;
              scale = 1;
              skewY = 0;
              boxShadow = '0 12px 32px 0 rgba(0,0,0,0.18), 0 0 0 2px #FFD700';
              filter = 'none';
            } else {
              rotateY = 0;
              scale = 1;
              skewY = -2;
              boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
              filter = 'none';
            }
            return (
              <section
                key={SectionItem.name}
                className="parallax-section w-screen h-screen flex-shrink-0 flex items-center justify-center"
                ref={(el) => (sectionsRef.current[index] = el)}
                style={{
                  opacity: 1,
                  // No transform here! Only on the inner content below
                  zIndex: isActive ? 15 : 1,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${rotateY}deg) scale(${scale}) skewY(${skewY}deg)`,
                    backfaceVisibility: 'hidden',
                    boxShadow,
                    filter,
                    perspective: '1200px',
                    transition: 'transform 0.9s cubic-bezier(0.77,0,0.175,1), box-shadow 0.7s, filter 0.7s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Glassmorphism background for all sections
                    background: 'linear-gradient(135deg, #ea384c 0%, #F9D75D 50%, #F5F5F5 100%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    borderRadius: '32px',
                    // Use only the 3D/page-turn boxShadow for animation, not a second one                    border: '1px solid rgba(255,255,255,0.18)',
                    // Important: Ensure content visibility 
                    opacity: isActive ? 1 : (index < currentSection) ? 0 : 0.6,
                    visibility: isActive ? 'visible' : 'visible', // Keep nearby pages partially visible
                    overflow: 'visible',
                    position: 'relative' // Make sure position is relative for absolute positioning of the return button
                  }}
                >
                  <SectionItem.component
                    isActive={isActive}
                    sectionName={SectionItem.name}
                    scrollToSection={safeScrollToSection}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <div className="relative z-20 mt-[150vh] pointer-events-none">
        <div className="pointer-events-auto">
          <Footer isActive={currentSection === numSections - 1} />
        </div>
      </div>
    </div>
  );
}

export default Index;
