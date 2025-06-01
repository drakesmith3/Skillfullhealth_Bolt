import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, MessageCircle, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// Enhanced 3D Styles for Success Stories
const Professional3DSuccessStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .success-3d-container {
        perspective: 1200px;
        transform-style: preserve-3d;
      }
      
      .success-card-3d {
        transform-style: preserve-3d;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        animation: testimonialFloat 8s ease-in-out infinite;
      }
      
      .success-card-3d:hover {
        transform: translateY(-15px) rotateX(8deg) rotateY(8deg) scale(1.02);
        animation-play-state: paused;
      }
      
      .success-title-3d {
        transform-style: preserve-3d;
        animation: titleFloat 6s ease-in-out infinite;
        text-shadow: 
          0 2px 0 rgba(220, 20, 60, 0.6),
          0 4px 0 rgba(212, 175, 55, 0.5),
          0 6px 0 rgba(0, 0, 0, 0.3);
      }
      
      .success-star-3d {
        animation: starTwinkle 3s ease-in-out infinite;
        filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
      }
      
      .success-floating-element {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
        animation: successDustFloat 25s linear infinite;
      }
      
      .success-dust-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      }
      
      @keyframes successDustFloat {
        0%, 100% {
          transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1);
          opacity: 0.7;
        }
        25% {
          transform: translateY(-30px) rotateX(15deg) rotateY(90deg) scale(1.2);
          opacity: 1;
        }
        50% {
          transform: translateY(-60px) rotateX(0deg) rotateY(180deg) scale(0.8);
          opacity: 0.5;
        }
        75% {
          transform: translateY(-30px) rotateX(-15deg) rotateY(270deg) scale(1.1);
          opacity: 0.8;
        }
      }
      
      @keyframes testimonialFloat {
        0%, 100% {
          transform: translateY(0px) rotateX(0deg);
        }
        33% {
          transform: translateY(-8px) rotateX(2deg);
        }
        66% {
          transform: translateY(-4px) rotateX(-1deg);
        }
      }
      
      @keyframes starTwinkle {
        0%, 100% {
          transform: scale(1) rotate(0deg);
          opacity: 0.9;
        }
        25% {
          transform: scale(1.3) rotate(90deg);
          opacity: 1;
        }
        50% {
          transform: scale(0.7) rotate(180deg);
          opacity: 0.7;
        }
        75% {
          transform: scale(1.1) rotate(270deg);
          opacity: 0.95;
        }
      }
      
      @keyframes titleFloat {
        0%, 100% {
          transform: translateY(0px) rotateX(0deg);
        }
        50% {
          transform: translateY(-8px) rotateX(3deg);
        }
      }
      
      @media (max-width: 768px) {
        .success-card-3d:hover {
          transform: translateY(-8px) rotateX(3deg) rotateY(3deg) scale(1.01);
        }
      }
      
      @media (prefers-reduced-motion: reduce) {
        .success-floating-element,
        .success-title-3d,
        .success-card-3d,
        .success-star-3d {
          animation: none;
        }
      }
    `
  }} />
);

interface SuccessStoriesProps {
  isActive?: boolean;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !testimonialsRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(testimonialsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
    
  }, []);

  // Enhanced floating background elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.className = 'success-floating-element';
      
      const symbols = ['⭐', '🏆', '📜', '💎', '🎯', '✨'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      element.innerHTML = symbol;
      element.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${Math.random() * 25 + 15}px;
        animation-delay: ${Math.random() * 25}s;
        animation-duration: ${Math.random() * 15 + 20}s;
      `;
      
      const container = document.querySelector('.success-dust-container');
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 35000);
      }
    };

    // Create initial elements
    const elementCount = window.innerWidth > 768 ? 10 : 5;
    
    for (let i = 0; i < elementCount; i++) {
      setTimeout(() => createFloatingElement(), Math.random() * 5000);
    }

    // Continue creating elements periodically
    const floatingInterval = setInterval(createFloatingElement, 4000);

    return () => {
      clearInterval(floatingInterval);
    };
  }, [isActive]);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      quote: "My GLOHSEN score helped me stand out in a competitive job market. I'm now working at my dream hospital!",
      rating: 5
    },
    {
      name: "Hospital Y",
      role: "Healthcare Facility",
      quote: "After implementing GLOHSEN's recommendations, our patient satisfaction scores increased by 42%.",
      rating: 5
    },
    {
      name: "Nursing Student A",
      role: "Final Year Student",
      quote: "The interactive courses and mentorship from Tutor Z helped me ace my exams and secure a placement.",
      rating: 5
    },
    {
      name: "Professor Z",
      role: "Physiology Tutor",
      quote: "I've been able to reach more students and make a bigger impact through GLOHSEN's platform.",
      rating: 5
    }
  ];  return (
    <div 
      ref={containerRef}
      className="success-3d-container w-full min-h-screen relative flex flex-col justify-center items-center py-4 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out',
      }}
    >
      {/* Professional 3D Styles */}
      <Professional3DSuccessStyles />
      
      {/* Background floating elements container */}
      <div className="success-dust-container absolute inset-0 pointer-events-none z-0"></div>      <h2 
        ref={titleRef}
        className="success-title-3d text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center px-2 sm:px-4"
      >
        <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
          SUCCESS STORIES
        </span>
      </h2><div 
        ref={testimonialsRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 flex-grow px-2 sm:px-4"
      >        {testimonials.map((testimonial, index) => (
          <Link 
            key={index}
            to="/testimonials"
            className="block transition-transform duration-300 hover:scale-105"
          >
            <Card 
              className="success-card-3d p-3 sm:p-4 lg:p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{
                background: isDark
                  ? 'rgba(45, 21, 21, 0.3)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500" />
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${
                    isDark ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-xs sm:text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>              
              <div className="flex space-x-1 mb-2 sm:mb-3">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className="success-star-3d h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              
              <ScrollArea className="h-20 sm:h-24 lg:h-32">
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{testimonial.quote}"
                </p>
              </ScrollArea>
              
              <div className="flex items-center justify-between pt-1 sm:pt-2">
                <MessageCircle className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <span className={`text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Verified Review
                </span>              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
