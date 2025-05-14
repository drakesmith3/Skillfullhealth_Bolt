
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Feedback from "@/components/Feedback";
import Employers from "@/components/Employers";
import TutorsAdvisers from "@/components/TutorsAdvisers";
import GamesQuizzes from "@/components/GamesQuizzes";
import SuccessStories from "@/components/SuccessStories";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Loader2 } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SectionRef {
  ref: React.RefObject<HTMLDivElement>;
  id: string;
}

const Index: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add sections to ref array
  const addToSectionsRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Setup the parallax effect
  useEffect(() => {
    // Set loading state
    setIsLoading(true);
    
    try {
      if (!mainRef.current) {
        setIsLoading(false);
        return;
      }

      const sections = sectionsRef.current;
      if (sections.length === 0) {
        setIsLoading(false);
        return;
      }
      
      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            // Optional progress update
          }
        }
      });

      // Animate each section
      sections.forEach((section, i) => {
        // Skip first section (Hero)
        if (i === 0) return;
        
        tl.fromTo(section, 
          { 
            y: "100%", 
            opacity: 0,
            rotation: 2,
            scale: 0.9,
          }, 
          { 
            y: "0%", 
            opacity: 1, 
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          }, 
          i * 0.5
        );

        // Add page turn effect
        if (i > 0) {
          tl.add(() => {
            const audio = new Audio('/page-turn.mp3');
            audio.volume = 0.3;
            audio.play().catch((err) => {
              // Autoplay might be blocked, handled silently
              console.log("Audio play was prevented due to browser policy");
            });
          }, i * 0.5);
        }
      });

      // Finish loading after animations are set up
      setIsLoading(false);

      // Clean up ScrollTrigger on unmount
      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    } catch (err) {
      console.error("Error setting up animations:", err);
      setError("Failed to initialize animations. Please refresh the page.");
      setIsLoading(false);
      
      // Notify user about the error - Fixed: removed 'variant' property
      toast({
        title: "Animation Error",
        description: "There was a problem setting up page animations. Some features may not work correctly."
      });
    }
  }, []);

  // Show loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700">Loading the GLOHSEN experience...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's a problem
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center max-w-md p-6">
          <div className="text-red-600 text-6xl mb-4">!</div>
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main ref={mainRef} className="relative h-screen overflow-hidden bg-gray-100">
        <ProgressIndicator totalSections={8} />

        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <Hero />
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <HowItWorks />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.1}>
            <Feedback />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.2}>
            <Employers />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.3}>
            <TutorsAdvisers />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.4}>
            <GamesQuizzes />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.5}>
            <SuccessStories />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition delay={0.6}>
            <JoinCommunity />
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
