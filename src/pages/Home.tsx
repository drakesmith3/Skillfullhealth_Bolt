
import React, { useState, useEffect, useRef, useCallback, ComponentType } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../components/Header";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Feedback from "../components/Feedback";
import Employers from "../components/Employers";
import TutorsAdvisers from "../components/TutorsAdvisers";
import GamesAndQuizzes from "../components/GamesQuizzes";
import SuccessStories from "../components/SuccessStories";
import JoinCommunity from "../components/JoinCommunity";
import Footer from "../components/Footer";
import ScrollSound from "../components/ScrollSound";
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

function Home(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const lenisRef = useRef<Lenis | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);

  const numSections = sectionsComponents.length;

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  // Setup scroll tracking
  useEffect(() => {
    if (isLoading || !lenisRef.current) return;

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = container.scrollHeight - windowHeight;
      
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollTop / totalHeight, 0), 1);
        setScrollProgress(progress);
        
        const newSectionIndex = Math.min(
          Math.floor(progress * numSections),
          numSections - 1
        );
        
        if (newSectionIndex !== currentSection) {
          setCurrentSection(newSectionIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, currentSection, numSections]);

  // Scroll to section function
  const scrollToSection = useCallback((sectionIndex: number) => {
    const validIndex = Math.max(0, Math.min(sectionIndex, numSections - 1));
    const sectionElement = sectionsRef.current[validIndex];
    
    if (!sectionElement || !lenisRef.current) return;

    isScrollingProgrammatically.current = true;
    
    lenisRef.current.scrollTo(sectionElement, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        isScrollingProgrammatically.current = false;
        setCurrentSection(validIndex);
      }
    });
  }, [numSections]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <ScrollSound isEnabled={isSoundEnabled} onToggle={toggleSound} />
      <ProgressIndicator 
        sections={sectionNames}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />
      <StoryAnimations 
        currentSection={currentSection} 
        totalSections={numSections} 
      />
      <ReturnToTopButton />

      {sectionsComponents.map(({ component: Component, name }, index) => (
        <div
          key={name}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="min-h-screen"
          id={`section-${index}`}
        >
          <Component 
            isActive={currentSection === index}
            sectionName={name}
            scrollToSection={scrollToSection}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
