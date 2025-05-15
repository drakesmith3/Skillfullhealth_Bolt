
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
import StoryConnector from "@/components/StoryConnector";
import { Loader2, RefreshCw } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [sectionsRef, setSectionsRef] = useState<HTMLDivElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTransitionReady, setPageTransitionReady] = useState<boolean>(false);

  // Add sections to ref array
  const addToSectionsRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.includes(el)) {
      setSectionsRef(prev => [...prev, el]);
    }
  };

  // First useEffect - wait for DOM elements to be ready
  useEffect(() => {
    // Short delay to ensure all refs are properly assigned
    const timer = setTimeout(() => {
      setPageTransitionReady(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Setup the parallax effect - runs after DOM is ready
  useEffect(() => {
    if (!pageTransitionReady) return;
    
    try {
      console.log("Setting up animations", {
        mainRef: mainRef.current ? "exists" : "missing",
        sectionsCount: sectionsRef.length
      });
      
      if (!mainRef.current) {
        console.error("mainRef is not assigned to a DOM element.");
        setIsLoading(false);
        return;
      }

      if (sectionsRef.length === 0) {
        console.error("sectionsRef is empty or not assigned correctly.");
        setIsLoading(false);
        return;
      }
      
      // Clear any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: false,
          markers: false,
        }
      });

      // Animate each section (except first)
      sectionsRef.forEach((section, i) => {
        // Skip first section (Hero)
        if (i === 0) return;
        
        // Create individual ScrollTrigger for each section
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=100",
          end: "top center",
          onEnter: () => {
            gsap.to(section, { 
              y: "0%", 
              opacity: 1, 
              rotation: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(section, { 
              y: "100%", 
              opacity: 0,
              rotation: 2,
              scale: 0.9, 
              duration: 0.8,
              ease: "power3.in"
            });
          }
        });
        
        // Initial state for sections (except first)
        gsap.set(section, { 
          y: "100%", 
          opacity: 0, 
          rotation: 2,
          scale: 0.9,
          willChange: "transform" // Add hardware acceleration
        });
      });

      // Finish loading after animations are set up
      setIsLoading(false);

      // Welcome notification after loading
      setTimeout(() => {
        toast({
          title: "Welcome to GLOHSEN",
          description: "Scroll to explore our healthcare professional network",
        });
      }, 1500);

      // Clean up ScrollTrigger on unmount
      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    } catch (err) {
      console.error("Error setting up animations:", err);
      setError("Failed to initialize animations. Please refresh the page.");
      setIsLoading(false);
      
      // Notify user about the error
      toast({
        title: "Animation Error",
        description: "There was a problem setting up page animations. Some features may not work correctly.",
        variant: "destructive"
      });
    }
  }, [pageTransitionReady, sectionsRef]);

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
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  // Define story connector elements
  const storyConnectors = [
    {
      from: "Introduction",
      to: "Process",
      color: "bg-red-600",
      index: 1
    },
    {
      from: "Patient X",
      to: "Feedback",
      color: "bg-amber-500",
      index: 2
    },
    {
      from: "Feedback",
      to: "Hospital Y",
      color: "bg-blue-500",
      index: 3
    },
    {
      from: "Tutors",
      to: "Student A",
      color: "bg-green-500",
      index: 4
    },
    {
      from: "Skills",
      to: "Learning",
      color: "bg-purple-500",
      index: 5
    },
    {
      from: "Success",
      to: "Join Us",
      color: "bg-indigo-500",
      index: 6
    }
  ];

  return (
    <>
      <Header />
      <main ref={mainRef} className="relative min-h-screen overflow-hidden bg-gray-100">
        <ProgressIndicator totalSections={8} />

        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <Hero />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.1} color="red-600">
            <HowItWorks />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[0].from} 
            to={storyConnectors[0].to}
            color={storyConnectors[0].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.2} color="amber-500">
            <Feedback />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[1].from} 
            to={storyConnectors[1].to}
            color={storyConnectors[1].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.3} color="blue-500">
            <Employers />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[2].from} 
            to={storyConnectors[2].to}
            color={storyConnectors[2].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.4} color="green-500">
            <TutorsAdvisers />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[3].from} 
            to={storyConnectors[3].to}
            color={storyConnectors[3].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.5} color="purple-500">
            <GamesQuizzes />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[4].from} 
            to={storyConnectors[4].to}
            color={storyConnectors[4].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.6} color="indigo-500">
            <SuccessStories />
          </PageTransition>
          <StoryConnector 
            from={storyConnectors[5].from} 
            to={storyConnectors[5].to}
            color={storyConnectors[5].color}
          />
        </div>
        
        <div ref={addToSectionsRef} className="relative w-full min-h-screen">
          <PageTransition delay={0.7} color="red-600">
            <JoinCommunity />
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
