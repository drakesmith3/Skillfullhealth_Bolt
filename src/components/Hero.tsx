
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
  const logoRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (!isVisible || !textRef.current || !cardRef.current || !bookRef.current || !imageRef.current || !logoRef.current) {
      return () => clearTimeout(timer);
    }

    // Create animation timeline
    const tl = gsap.timeline();

    // Animate hero elements in
    tl.fromTo(logoRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(imageRef.current, 
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
        
        // Use brand gold color for particles
        particle.style.backgroundColor = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2})`; // Gold color with random opacity
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
      <div className="w-full h-full flex items-center justify-center bg-brand-offwhite">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-brand-offwhite to-white flex flex-col md:flex-row justify-center items-center overflow-hidden p-8 md:p-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-brand-red/10 blur-3xl"></div>
        <div className="absolute left-20 bottom-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl"></div>
      </div>

      {/* Logo */}
      <div 
        ref={logoRef} 
        className="absolute top-8 left-8 z-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
            <span className="text-white font-playfair font-bold text-xl">G</span>
          </div>
          <span className="font-playfair font-bold text-xl text-brand-black">GLOHSEN</span>
        </div>
      </div>

      {/* Healthcare professionals image */}
      <div 
        ref={imageRef} 
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0 px-6"
      >
        <div className="relative rounded-xl shadow-2xl overflow-hidden max-w-md">
          <img 
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Healthcare professionals collaborating" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <p className="text-base md:text-lg font-montserrat font-medium">Healthcare professionals collaborating for excellence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start px-6">
        <div ref={textRef} className="relative z-10 text-center md:text-left max-w-xl">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-brand-red to-brand-gold text-transparent bg-clip-text">
              THE GLOHSEN STANDARD
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Revolutionizing healthcare through connection, education, and excellence for the 21st century African marketplace
          </p>
        </div>

        <div ref={cardRef} className="relative z-10 w-full max-w-lg">
          <Card className="border-2 border-brand-red/20 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-center mb-4 gap-3">
                <Award className="h-8 w-8 text-brand-red" />
                <h3 className="text-xl md:text-2xl font-playfair font-bold text-brand-black">WHAT IS YOUR GLOHSEN SCORE?</h3>
              </div>
              <p className="text-gray-700 mb-6 text-center font-montserrat leading-relaxed">
                Discover how you measure against the global healthcare standard across 10 key parameters of professional excellence.
              </p>
              <div className="flex justify-center">
                <Button className="bg-brand-red hover:bg-brand-red/90 text-white font-montserrat text-lg px-8 py-6 rounded-md group shadow-lg" asChild>
                  <Link to="/calculate-score">
                    Calculate Your Score
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book illustration */}
        <div ref={bookRef} className="relative z-10 mt-12 w-full max-w-3xl h-48 md:h-64 perspective-1000">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full max-w-3xl h-full bg-gradient-to-r from-brand-gold/10 to-brand-gold/20 rounded-lg shadow-xl flex items-center justify-center transform-style-3d relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-red/20 to-transparent"></div>
              <h3 className="text-2xl md:text-3xl font-playfair text-gray-800 text-center px-4">
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
