import React, { useState, useEffect, useRef, useCallback, ComponentType } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '../components/Header';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Feedback from '../components/Feedback';
import Employers from '../components/Employers';
import TutorsAdvisers from '../components/TutorsAdvisers';
import GamesAndQuizzes from '../components/GamesQuizzes';
import SuccessStories from '../components/SuccessStories';
import JoinCommunity from '../components/JoinCommunity';
import Footer from '../components/Footer';
import ScrollSound from '../components/ScrollSound';
import ProgressIndicator from '../components/ProgressIndicator';
import StoryAnimations from '../components/StoryAnimations';

// Ensure ScrollTrigger is registered globally
gsap.registerPlugin(ScrollTrigger);

// Define a common props type for section components
export interface SectionProps {
  isActive: boolean;
  sectionName: string;
}

// Define the sections in the desired story order
const sectionsComponents: { component: ComponentType<SectionProps>; name: string }[] = [
  { component: Header as ComponentType<SectionProps>, name: "Header" },
  { component: Features as ComponentType<SectionProps>, name: "Features" },
  { component: HowItWorks as ComponentType<SectionProps>, name: "HowItWorks" },
  { component: Feedback as ComponentType<SectionProps>, name: "Feedback" },
  { component: Employers as ComponentType<SectionProps>, name: "Employers" },
  { component: TutorsAdvisers as ComponentType<SectionProps>, name: "TutorsAdvisers" },
  { component: GamesAndQuizzes as ComponentType<SectionProps>, name: "GamesAndQuizzes" },
  { component: SuccessStories as ComponentType<SectionProps>, name: "SuccessStories" },
  { component: JoinCommunity as ComponentType<SectionProps>, name: "JoinCommunity" },
];

const sectionNames = sectionsComponents.map(s => s.name);

// Easing function for Lenis
const power2EaseInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function Home(): JSX.Element { 
  // Core refs
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSectionRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const hasInteracted = useRef(false);
  const lastPlayedSectionRef = useRef(-1);
  const isInitializedRef = useRef(false);

  // State
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const numSections = sectionsComponents.length;

  // Keep sectionsRef in sync with sections
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, numSections);
  }, [numSections]);

  // Audio setup
  useEffect(() => {
    // Use direct path to audio file
    const audio = new Audio('/page-turn.mp3');
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

  // Setup interaction tracking
  useEffect(() => {
    const markInteraction = () => {
      hasInteracted.current = true;
      window.removeEventListener('click', markInteraction);
      window.removeEventListener('keydown', markInteraction);
      window.removeEventListener('touchstart', markInteraction);
    };
    
    window.addEventListener('click', markInteraction);
    window.addEventListener('keydown', markInteraction);
    window.addEventListener('touchstart', markInteraction);
    
    return () => {
      window.removeEventListener('click', markInteraction);
      window.removeEventListener('keydown', markInteraction);
      window.removeEventListener('touchstart', markInteraction);
    };
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = useCallback((sectionIndex: number) => {
    if (!lenisRef.current || !mainRef.current) return;
    
    const targetScroll = sectionIndex * mainRef.current.offsetWidth;
    
    // Use smooth scrolling
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.5,
      easing: power2EaseInOut,
    });
    
    // Update active section
    setCurrentSection(sectionIndex);
    currentSectionRef.current = sectionIndex;
    
    // Play sound effect if appropriate
    if (audioRef.current && isSoundEnabled && hasInteracted.current && 
        sectionIndex !== lastPlayedSectionRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.warn('Audio play error:', err));
      lastPlayedSectionRef.current = sectionIndex;
    }
  }, [isSoundEnabled]);

  // Function to scroll back to top
  const handleScrollToTop = useCallback(() => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(0, {
      duration: 1.5,
      easing: power2EaseInOut
    });
    
    setCurrentSection(0);
    currentSectionRef.current = 0;
  }, []);  // Loading simulation - allows time for resources to load
  useEffect(() => {
    // Prevent body scrolling while Home component is mounted
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Increased loading time to allow for resources to load properly
    
    return () => {
      clearTimeout(timer);
      // Restore scrolling when component unmounts
      document.body.style.overflow = '';
    };
  }, []);
  // GSAP and Lenis initialization
  useEffect(() => {
    // Exit if still loading or already initialized
    if (isLoading || isInitializedRef.current) return undefined;
    
    console.log("Setting up horizontal parallax scrolling...");
    
    // Clean up any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const mainElement = mainRef.current;
    const contentElement = contentRef.current;
    
    if (!mainElement || !contentElement || numSections === 0) {
      console.error("Missing required elements for scroll setup");
      return undefined;
    }    // Initialize Lenis for smooth scrolling after a delay
    // This ensures DOM is fully ready
    const initLenis = () => {
      const lenis = new Lenis({
        smoothWheel: true,
        orientation: 'horizontal',
        gestureOrientation: 'horizontal',
        syncTouch: true,
        infinite: false,
        duration: 2.0, // Slower scrolling for better control
      });
      
      // Temporarily disable scrolling
      lenis.stop();
      
      lenisRef.current = lenis;
      
      // Set up RAF loop with ID tracking for cleanup
      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      
      // Re-enable scrolling after a delay to let the user see the first section
      setTimeout(() => {
        lenis.start();
      }, 5000); // 5 second delay before allowing scrolling
      
      return rafId;
    };
    
    let rafId = initLenis();
    
    // Create GSAP context and setup ScrollTrigger
    const setupGsap = () => {
      if (!mainElement || !contentElement) return null;
      
      const ctx = gsap.context(() => {        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainElement,
            pin: true,
            scrub: 1.5, // Increased scrub time for smoother animations
            start: "top top",
            end: () => `+=${contentElement.offsetWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            preventOverlaps: true, // Prevent overlapping animations
            fastScrollEnd: false,  // Disable fast scroll end for smoother experience
            onEnter: () => console.log("ScrollTrigger onEnter"),
            onLeave: () => console.log("ScrollTrigger onLeave"),
              // Calculate current section based on scroll progress
              let newSectionIndex = Math.round(self.progress * (numSections - 1));
              newSectionIndex = Math.max(0, Math.min(numSections - 1, newSectionIndex));
              
              if (newSectionIndex !== currentSectionRef.current) {
                setCurrentSection(newSectionIndex);
                currentSectionRef.current = newSectionIndex;
                
                // Play sound if appropriate
                if (audioRef.current && isSoundEnabled && hasInteracted.current && 
                    newSectionIndex !== lastPlayedSectionRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().catch(error => console.warn("Audio play failed:", error));
                  lastPlayedSectionRef.current = newSectionIndex;
                }
              }
            },            snap: {
              snapTo: (progress) => {
                if (numSections <= 1) return 0;
                
                // More controlled snapping behavior
                // Ensure we don't snap to the last section too easily
                const sectionIndex = Math.round(progress * (numSections - 1));
                
                // Make it harder to reach the last section
                if (sectionIndex === numSections - 1 && progress < 0.95) {
                  return (sectionIndex - 1) / (numSections - 1);
                }
                
                return sectionIndex / (numSections - 1);
              },
              duration: 0.5, // Increased duration for smoother snapping
              delay: 0.2,    // Increased delay before snapping
              ease: "power2.inOut",
              inertia: true, // Add inertia for more natural feeling
            },
          },
        });
        
        // Animate content horizontally
        tl.to(contentElement, {
          x: () => -Math.max(0, contentElement.offsetWidth - mainElement.offsetWidth),
          ease: "none",
        });
        
        tlRef.current = tl;
      }, mainElement);
      
      return ctx;
    };    // Delay setup slightly to ensure DOM is ready
    let gsapCtx: gsap.Context | null = null;
    const initTimeout = setTimeout(() => {
      // Force another delay to ensure the DOM is properly rendered
      setTimeout(() => {
        gsapCtx = setupGsap();
        isInitializedRef.current = true;
        console.log("GSAP and ScrollTrigger initialized");
        
        // Force a refresh after initialization and once more after a delay
        // This double refresh helps ensure measurements are correct
        if (gsapCtx) {
          ScrollTrigger.refresh(true); // Force refresh initially
          
          setTimeout(() => {
            ScrollTrigger.refresh(true); // Second refresh after elements are painted
            window.dispatchEvent(new Event('resize')); // Force recalculation of sizes
          }, 1000);
        }
      }, 500);
    }, 2000); // Longer initial delay
    
    // Cleanup function
    return () => {
      console.log("Cleaning up parallax scrolling...");
      clearTimeout(initTimeout);
      
      if (typeof rafId === 'number') {
        cancelAnimationFrame(rafId);
      }
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      
      if (gsapCtx) {
        gsapCtx.revert();
      }
      
      // Kill all ScrollTrigger instances to avoid memory leaks
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      tlRef.current = null;
      isInitializedRef.current = false;
    };
  }, [isLoading, numSections, isSoundEnabled]);

  // Toggle sound callback
  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newSoundState = !prev;
      if (audioRef.current) {
        audioRef.current.muted = !newSoundState;
      }
      return newSoundState;
    });
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-red-700 dark:bg-neutral-900 flex flex-col justify-center items-center z-[100]">
        <svg className="animate-spin h-12 w-12 text-gold-500 dark:text-gold-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gold-500 dark:text-gold-400 text-lg font-semibold">Crafting Your GLOHSEN Story...</p>
      </div>
    );
  }
  // Main content
  return (
    <div className="relative">
      {/* Progress indicator sidebar */}
      <ProgressIndicator
        currentSection={currentSection}
        totalSections={numSections}
        scrollToSection={scrollToSection}
        chapterTitles={sectionNames}
      />
      
      {/* Sound toggle button */}
      <ScrollSound 
        isSoundEnabled={isSoundEnabled} 
        toggleSound={toggleSound} 
      />
      
      {/* Animated characters that respond to scrolling */}
      <StoryAnimations 
        currentSection={currentSection} 
        totalSections={numSections} 
      />
      
      {/* Main content container - fixed position for parallax */}
      <main 
        ref={mainRef} 
        className="w-screen h-screen fixed top-0 left-0 overflow-hidden"
        style={{ zIndex: 10 }} // Ensure it's above background elements
      >
        <div
          ref={contentRef}
          className="h-full flex flex-nowrap"
          style={{ 
            width: `${numSections * 100}vw`,
            willChange: 'transform', // Performance optimization
            transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
          }}
        >
          {/* Map through sections and render each one */}
          {sectionsComponents.map((SectionItem, index) => (
            <section
              key={SectionItem.name}
              className="parallax-section w-screen h-screen flex-shrink-0"
              ref={(el) => (sectionsRef.current[index] = el)}
            >
              <SectionItem.component
                isActive={index === currentSection}
                sectionName={SectionItem.name}
              />
            </section>
          ))}
        </div>
      </main>
        {/* Footer positioned relative to the document flow */}
      <div className="relative z-20 mt-[150vh] pointer-events-none">
        <div className="pointer-events-auto">
          <Footer isActive={currentSection === numSections - 1} />
        </div>
      </div>
    </div>
  );
}

export default Home;
