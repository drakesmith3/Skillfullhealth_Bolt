
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Setup the parallax effect
  useEffect(() => {
    if (!mainRef.current) return;

    const sections = sectionsRef.current;
    
    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        pinSpacing: true,
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
          audio.play().catch(() => {
            // Autoplay might be blocked, handled silently
            console.log("Audio play was prevented due to browser policy");
          });
        }, i * 0.5);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const addToSectionsRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <Header />
      <main ref={mainRef} className="relative h-screen overflow-hidden bg-gray-100">
        <ProgressIndicator />

        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <Hero />
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <HowItWorks />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <Feedback />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <Employers />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <TutorsAdvisers />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <GamesQuizzes />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <SuccessStories />
          </PageTransition>
        </div>
        
        <div ref={addToSectionsRef} className="absolute w-full h-full">
          <PageTransition>
            <JoinCommunity />
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
