
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  isVisible?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isVisible = true }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (!isVisible || !textRef.current || !cardRef.current || !bookRef.current || !imageRef.current) {
      return () => clearTimeout(timer);
    }

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate hero elements in
    tl.fromTo(imageRef.current, 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(textRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(cardRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(bookRef.current, 
      { rotationY: -70, opacity: 0 },
      { rotationY: 0, opacity: 1, duration: 1.5, ease: "back.out(1.5)" },
      "-=0.7"
    );

    // Create dust particles
    const createDustParticles = () => {
      const particleContainer = document.createElement("div");
      particleContainer.className = "absolute inset-0 pointer-events-none overflow-hidden";
      bookRef.current?.appendChild(particleContainer);
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 5 + 2;
        particle.className = "absolute rounded-full";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.2})`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particleContainer.appendChild(particle);
        
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    };
    
    // Trigger dust particles effect
    createDustParticles();
    
    // Play page turn sound when animation completes
    tl.eventCallback("onComplete", () => {
      const audio = new Audio('/page-turn.mp3');
      audio.volume = 0.2;
      audio.play().catch((err) => {
        console.warn("Audio play was prevented due to browser policy.", err);
      });
    });

    // Cleanup function
    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [isVisible]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row justify-center items-center overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute left-20 bottom-20 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"></div>
      </div>

      {/* Healthcare professionals image */}
      <div 
        ref={imageRef} 
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0"
      >
        <div className="relative rounded-lg shadow-xl overflow-hidden max-w-md">
          <img 
            src="/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png" 
            alt="Healthcare professionals collaborating" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
            <div className="p-4 text-white">
              <p className="text-sm font-medium">Professionals collaborating for better healthcare</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div ref={textRef} className="relative z-10 text-center md:text-left max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              THE GLOHSEN STANDARD
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Revolutionizing healthcare through connection, education, and excellence
          </p>
        </div>

        <div ref={cardRef} className="relative z-10 w-full max-w-md">
          <Card className="border-2 border-red-600/20 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold">WHAT IS YOUR GLOHSEN SCORE?</h3>
              </div>
              <p className="text-gray-600 mb-4 text-center">
                Discover how you measure against the global healthcare standard across 10 key parameters.
              </p>
              <div className="flex justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6 group" asChild>
                  <Link to="/calculate-score">
                    Calculate Your Score
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book illustration */}
        <div ref={bookRef} className="relative z-10 mt-12 w-full max-w-3xl h-48 md:h-64 perspective-1000">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full max-w-3xl h-full bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg shadow-xl flex items-center justify-center transform-style-3d relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-red-600/20 to-transparent"></div>
              <h3 className="text-2xl md:text-3xl font-serif text-gray-800 text-center px-4">
                Your health journey begins here...
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero);
