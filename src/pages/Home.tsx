import React, { useState, useEffect, useRef, useCallback, ComponentType } from "react";
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
import { audioPlayer } from "../utils/AudioPlayer";
import ProgressIndicator from "../components/ProgressIndicator";
import StoryAnimations from "../components/StoryAnimations";
import { withReturnToTopButton } from "../components/withReturnToTopButton";
import { useSound } from "../contexts/SoundContext";

// Ensure ScrollTrigger is registered globally
gsap.registerPlugin(ScrollTrigger);

// Define a common props type for section components
export interface SectionProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// Story section titles for horizontal storytelling
const storyTitles = [
  "Welcome to GLOHSEN",
  "Discover Features", 
  "How It Works",
  "Client Feedback",
  "For Employers",
  "Tutors & Advisers",
  "Games & Quizzes",
  "Success Stories", 
  "Join Community",
  "Contact & Connect"
];

// Create a wrapper component for Footer with isHomePage prop
const HomeFooter: React.FC<SectionProps> = (props) => (
  <Footer {...props} isHomePage={true} />
);

// Define the sections in the desired story order
const sectionsComponents: { component: ComponentType<SectionProps>; name: string; title: string }[] = [
  { component: Header as ComponentType<SectionProps>, name: "Header", title: storyTitles[0] },
  { component: withReturnToTopButton(Features as ComponentType<SectionProps>), name: "Features", title: storyTitles[1] },
  { component: withReturnToTopButton(HowItWorks as ComponentType<SectionProps>), name: "HowItWorks", title: storyTitles[2] },
  { component: withReturnToTopButton(Feedback as ComponentType<SectionProps>), name: "Feedback", title: storyTitles[3] },
  { component: withReturnToTopButton(Employers as ComponentType<SectionProps>), name: "Employers", title: storyTitles[4] },
  { component: withReturnToTopButton(TutorsAdvisers as ComponentType<SectionProps>), name: "TutorsAdvisers", title: storyTitles[5] },
  { component: withReturnToTopButton(GamesAndQuizzes as ComponentType<SectionProps>), name: "GamesAndQuizzes", title: storyTitles[6] },
  { component: withReturnToTopButton(SuccessStories as ComponentType<SectionProps>), name: "SuccessStories", title: storyTitles[7] },
  { component: withReturnToTopButton(JoinCommunity as ComponentType<SectionProps>), name: "JoinCommunity", title: storyTitles[8] },
  { component: HomeFooter as ComponentType<SectionProps>, name: "Footer", title: storyTitles[9] },
];

const sectionNames = sectionsComponents.map(s => s.name);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Use global sound context
  const { playClickSound: globalPlayClickSound, isSoundEnabled: globalIsSoundEnabled } = useSound();
  
  // Use global sound state instead of local state
  const isSoundEnabled = globalIsSoundEnabled;

  // Setup user interaction tracking for audio
  useEffect(() => {
    const enableAudio = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        audioPlayer.muted = false;
      }
    };

    // Listen for first user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [hasUserInteracted]);

  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);

  const numSections = sectionsComponents.length;

  // Navigate to section function for horizontal storytelling
  const scrollToSection = useCallback((sectionIndex: number) => {
    const validIndex = Math.max(0, Math.min(sectionIndex, numSections - 1));
    
    if (validIndex === currentSection) return;

    // play a page-turn sound on section change
    if (isSoundEnabled) {
      audioPlayer.play('/page-turn.mp3', volume);
    }
    isScrollingProgrammatically.current = true;
    
    // Update section immediately with smooth transition via CSS
    setCurrentSection(validIndex);
    
    // Reset programmatic scroll flag after animation
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000);
  }, [currentSection, isSoundEnabled, volume]);

  // Setup horizontal navigation and keyboard controls
  useEffect(() => {
    if (isLoading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrollingProgrammatically.current) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          scrollToSection(Math.max(0, currentSection - 1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
          break;
        case 'Home':
          event.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToSection(numSections - 1);
          break;
      }
    };

    // Handle mouse wheel for section navigation
    const handleWheel = (event: WheelEvent) => {
      if (isSoundEnabled) {
        const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        const wheelVol = Math.min(1, Math.abs(delta) / 300);
        audioPlayer.play('/whoosh.mp3', wheelVol);
      }
      if (isScrollingProgrammatically.current) return;
      
      event.preventDefault();
      
      const wheelThreshold = 50;
      if (Math.abs(event.deltaY) > wheelThreshold || Math.abs(event.deltaX) > wheelThreshold) {
        if (event.deltaY > 0 || event.deltaX > 0) {
          // Scroll down/right - go to next section
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
        } else {
          // Scroll up/left - go to previous section
          scrollToSection(Math.max(0, currentSection - 1));
        }
      }
    };

    // Handle touch/swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - go to next section
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
        } else {
          // Swipe right - go to previous section
          scrollToSection(Math.max(0, currentSection - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLoading, currentSection, numSections, scrollToSection]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Preload storytelling sounds
  useEffect(() => {
    audioPlayer.preload([
      '/page-turn.mp3',
      '/whoosh.mp3',
      '/ambient.mp3',
      '/click.mp3'
    ]);
  }, []);
    // Ambient background music setup
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const ambient = new Audio('/ambient.mp3');
    ambient.loop = true;
    ambient.volume = volume * 0.3; // Slightly increased volume
    ambientRef.current = ambient;
    
    // Add error handling
    ambient.addEventListener('error', (e) => {
      console.warn('Ambient audio error:', e);
    });
    
    return () => { 
      ambient.pause(); 
      ambient.src = ''; // Clear src to free memory
    };
  }, [volume]);

  // Toggle ambient playback on sound toggle and user interaction
  useEffect(() => {
    if (isSoundEnabled && hasUserInteracted && ambientRef.current) {
      console.log('Starting ambient music...');
      ambientRef.current.play().catch((error) => {
        console.warn('Failed to play ambient music:', error);
      });
    } else if (ambientRef.current) {
      console.log('Stopping ambient music...');
      ambientRef.current.pause();
    }
  }, [isSoundEnabled, hasUserInteracted]);
   const toggleSound = useCallback(() => {
    const muted = audioPlayer.toggleMute();
    console.log('Sound toggled:', !muted, 'Volume:', volume);
    // Note: We no longer update local isSoundEnabled state since we use global state
  }, [volume]);
  // Create a function to play click sound for buttons
  const playClickSound = useCallback(() => {
    if (isSoundEnabled) {
      audioPlayer.play('/click.mp3', volume);
    }
    // Also use global click sound if available
    if (globalPlayClickSound) {
      globalPlayClickSound();
    }
  }, [isSoundEnabled, volume, globalPlayClickSound]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Story...</div>
      </div>
    );
  }  return (
    <React.Fragment>
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden"
      >
          <ProgressIndicator 
            currentSection={currentSection}
            totalSections={numSections}
            scrollToSection={scrollToSection}
            chapterTitles={storyTitles}          />      <StoryAnimations 
            currentSection={currentSection} 
            totalSections={numSections} 
          />      
          {/* Current section title overlay */}
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 opacity-30">
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-1">
              <h1 className="text-white/70 text-sm font-medium">
                {sectionsComponents[currentSection]?.title}
              </h1>
            </div>
          </div>{/* Horizontal storytelling container */}
          <div 
            className="flex h-full transition-transform duration-1000 ease-out"
            style={{ 
              width: `${numSections * 100}vw`,
              transform: `translateX(${-currentSection * 100}vw)`
            }}
          >
            {sectionsComponents.map(({ component: Component, name }, index) => (
              <div
                key={name}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="flex-shrink-0 w-screen h-full relative overflow-y-auto"
                id={`section-${index}`}
              >
                <Component 
                  isActive={currentSection === index}
                  sectionName={name}
                  scrollToSection={scrollToSection}
                  playClickSound={playClickSound}
                />
              </div>
            ))}
          </div>

        {/* Story navigation dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
          {sectionsComponents.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                if (isSoundEnabled) audioPlayer.play('/click.mp3', volume);
                scrollToSection(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-[#ea384c] scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to ${section.title}`}
              title={section.title}
            />
          ))}
        </div>

        {/* Story progress bar */}
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <div className="bg-white/20 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-[#ea384c] to-[#D4AF37] h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentSection + 1) / numSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 opacity-70">
          <button
            onClick={() => { if (isSoundEnabled) audioPlayer.play('/click.mp3', volume); scrollToSection(Math.max(0, currentSection - 1)); }}
            disabled={currentSection === 0}
            className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-all duration-300 ${
              currentSection === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30 hover:scale-110'
            }`}
            aria-label="Previous section"
          >
            ←
          </button>
        </div>

        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40 opacity-70">
          <button
            onClick={() => { if (isSoundEnabled) audioPlayer.play('/click.mp3', volume); scrollToSection(Math.min(numSections - 1, currentSection + 1)); }}
            disabled={currentSection === numSections - 1}
            className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-all duration-300 ${
              currentSection === numSections - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30 hover:scale-110'
            }`}
            aria-label="Next section"
          >
            →
          </button>
        </div>        {/* Storytelling instructions overlay */}
        <div className="fixed bottom-16 left-4 z-40 opacity-50">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
            <div>Use ← → arrows or swipe to navigate</div>
            <div>Mouse wheel also works</div>
          </div>        </div>
        </div>
    </React.Fragment>
  );
}

export default Home;
