
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
import ThemeToggle from '../components/ThemeToggle';
import ScrollSound from '../components/ScrollSound';
import ProgressIndicator from '../components/ProgressIndicator';
import StoryAnimations from '../components/StoryAnimations';
import FloatingActionButtons from '../components/FloatingActionButtons';

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
  { component: Footer as ComponentType<SectionProps>, name: "Footer" },
];

const sectionNames = sectionsComponents.map(s => s.name);

// Easing function for Lenis
const power2EaseInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function Index(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSectionRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null); // Ref for the main GSAP timeline
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const hasInteracted = useRef(false);
  const lastPlayedSectionRef = useRef(-1);

  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Default to sound on

  const numSections = sectionsComponents.length;

  // Ensure sectionsRef array is the correct size
  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, numSections);
  }, [numSections]);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (lenisRef.current && tlRef.current && mainRef.current) {
      const targetScroll = sectionIndex * mainRef.current.offsetWidth;
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.5, // Or your preferred duration
        easing: power2EaseInOut, // Or your preferred easing
      });

      // Update GSAP timeline progress.
      // The timeline's total duration corresponds to the total scrollable width.
      // The progress for a section is its starting point divided by total scrollable width.
      const totalScrollableWidth = contentRef.current ? contentRef.current.offsetWidth - mainRef.current.offsetWidth : 0;
      if (totalScrollableWidth > 0) {
        const progress = targetScroll / totalScrollableWidth;
        tlRef.current.progress(Math.min(1, Math.max(0, progress))); // Clamp progress between 0 and 1
      } else {
        tlRef.current.progress(sectionIndex === 0 ? 0 : 1);
      }
      
      // Manually update current section state as Lenis scroll might not trigger onUpdate immediately
      // or exactly as needed for this direct navigation.
      setCurrentSection(sectionIndex);
      currentSectionRef.current = sectionIndex;
    }
  }, [isLoading, numSections]); // Dependencies for scrollToSection

  const handleScrollToTop = useCallback(() => {
    if (tlRef.current && lenisRef.current) {
      // Instantly move GSAP timeline to the start
      tlRef.current.seek(0);
      // Then, smoothly scroll Lenis to the top.
      // Lenis scroll will trigger GSAP's onUpdate, which updates currentSection.
      lenisRef.current.scrollTo(0, {
        duration: 1.5,
        easing: power2EaseInOut
      });
      // It's also good to manually set the section state if immediate feedback is needed,
      // though onUpdate should catch it.
      setCurrentSection(0);
      currentSectionRef.current = 0;
    }
  }, [isLoading]); // Add isLoading to the dependency array

  // Effect for Lenis and GSAP ScrollTrigger setup
  useEffect(() => {
    if (isLoading) return undefined; // Don't initialize if still loading

    const lenis = new Lenis({
      smoothWheel: true,
      orientation: 'horizontal', // Lenis handles horizontal scroll input
      gestureOrientation: 'horizontal', // Also for touch gestures
      syncTouch: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const mainElement = mainRef.current;
    const contentElement = contentRef.current;

    if (!mainElement || !contentElement || numSections === 0) {
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
    
    // Create a context for GSAP to use that is separate from React's DOM management
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainElement,
          pin: true,
          scrub: 1, // Smooth scrubbing
          end: () => `+=${contentElement.offsetWidth - mainElement.offsetWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            let newSectionIndex = Math.round(self.progress * (numSections - 1));
            newSectionIndex = Math.max(0, Math.min(numSections - 1, newSectionIndex));
  
            // TEMPORARY LOGGING:
            console.log(`Scroll Progress: ${self.progress.toFixed(3)}, Calculated Section Index: ${newSectionIndex}, NumSections: ${numSections}`);
  
            if (newSectionIndex !== currentSectionRef.current) {
              setCurrentSection(newSectionIndex);
              currentSectionRef.current = newSectionIndex;
              console.log(`Current Section State Updated To: ${newSectionIndex}`); // LOG STATE CHANGE
  
              if (audioRef.current && isSoundEnabled && hasInteracted.current && newSectionIndex !== lastPlayedSectionRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(error => console.warn("Audio play failed on section change:", error));
                lastPlayedSectionRef.current = newSectionIndex;
              }
            }
          },
          snap: {
            snapTo: (progress) => {
              // Calculate the closest section index
              const sectionIndex = Math.round(progress * (numSections - 1));
              // Return the normalized progress value for that section
              return sectionIndex / (numSections - 1);
            },
            duration: 0.3, // Adjusted duration
            delay: 0, // No delay for snap
            ease: "power2.out", // Adjusted ease
            inertia: false, // Disable inertia for precise stops
          },
        },
      });
  
      tl.to(contentElement, {
        x: () => -(contentElement.offsetWidth - mainElement.offsetWidth),
        ease: "none", // GSAP animation is linear, ScrollTrigger handles the scroll-linking
      });
  
      tlRef.current = tl; // Store the timeline
    }, mainElement); // Apply the context to the main element

    ScrollTrigger.refresh();

    return () => {
      // Use context killing to ensure everything is properly cleaned up
      ctx.revert(); // This will clean up ALL GSAP animations in this context
      
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      tlRef.current = null;
    };
  }, [isLoading, numSections, isSoundEnabled]); // Add isSoundEnabled if audio logic depends on it

  // Effect for user interaction listener (for audio)
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
  
  // Initialize audio and loading state
  useEffect(() => {
    const audio = new Audio('/assets/sounds/page-turn.mp3'); // Ensure this path is correct (from public folder)
    audio.preload = "auto";
    audio.volume = 0.3;
    audioRef.current = audio;

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newSoundState = !prev;
      if (audioRef.current) {
        audioRef.current.muted = !newSoundState; // Mute/unmute based on new state
      }
      return newSoundState;
    });
  }, []);


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

  return (
    <>
      <ProgressIndicator
        currentSection={currentSection}
        totalSections={numSections}
        scrollToSection={scrollToSection}
        chapterTitles={sectionNames}
      />
      <ScrollSound isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
      
      {/* Add the story animations component that handles butterfly and doodle */}
      <StoryAnimations 
        currentSection={currentSection} 
        totalSections={numSections} 
      />
      
      <main ref={mainRef} className="w-screen h-screen fixed top-0 left-0 overflow-hidden">
        <div
          ref={contentRef}
          className="h-full flex flex-nowrap"
          style={{ width: `${numSections * 100}vw` }}
        >
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
    </>
  );
}

export default Index;
