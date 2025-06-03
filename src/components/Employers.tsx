import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Briefcase, Building, Trophy } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useClickSound } from "../hooks/useClickSound";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  isActive?: boolean;
  playClickSound?: () => void;
}

const Employers = ({ isActive = false, playClickSound }: SectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);  const hospitalRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const { playClick } = useClickSound();

  const handleClick = () => {
    playClickSound?.();
    playClick();
  };
  
  useEffect(() => {
    if (!containerRef.current || !hospitalRef.current || !contentRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(hospitalRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    
  }, []);

  return (
    <section 
      ref={containerRef}
      id="Employers"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center py-12 px-4 overflow-hidden ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center space-y-8 max-w-6xl mx-auto">        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center px-2 sm:px-4">
          <span className={`${
            isDark 
              ? 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text' 
              : 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text'
          }`}>
            HOSPITAL Y'S TRANSFORMATION
          </span>
        </h2>
          {/* Subtitle */}
        <p className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
          isDark ? 'text-white/90' : 'text-white/90'
        }`}>
          GLOHSEN Helps Employers Find & Develop Talent
        </p>        {/* Main Content Container with Background */}
        <div className="bg-white/20 rounded-lg p-8 text-center backdrop-blur-[40px]">
          <div className="space-y-8">            <div className="text-center space-y-4">
              <h3 className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-white'
              }`}>From Crisis to Excellence</h3>
              <p className={`text-xl opacity-90 max-w-3xl mx-auto ${
                isDark ? 'text-white' : 'text-white'
              }`}>
                Hospital Y saw Patient X's viral feedback and realized change was needed. 
                They turned to GLOHSEN for comprehensive staffing solutions.
              </p>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-lg p-6 text-center backdrop-blur-[40px]">
                <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>Smart Recruitment</h4>
                <p className={`opacity-90 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>
                  Find pre-screened, upskilled professionals using our GLOHSEN Score system.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6 text-center backdrop-blur-[40px]">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>Staff Development</h4>
                <p className={`opacity-90 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>
                  Continuous learning programs that keep your team at the cutting edge.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6 text-center backdrop-blur-[40px]">
                <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h4 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>Performance Tracking</h4>
                <p className={`opacity-90 ${
                  isDark ? 'text-white' : 'text-white'
                }`}>
                  Monitor KPIs and professional growth with our algorithmic scoring.
                </p>
              </div>
            </div>            <div className="text-center">              <Link to="/SignUpPage" onClick={handleClick}>
                <Button className="bg-red-600 hover:bg-red-700 text-white" size="lg">
                  Register as an Employer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden image for animation reference */}
      <img 
        ref={hospitalRef}
        src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80"
        alt="Hospital transformation"
        className="hidden"
      />
    </section>
  );
};

export default Employers;
