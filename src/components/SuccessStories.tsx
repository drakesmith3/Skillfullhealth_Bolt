
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, MessageCircle, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const SuccessStories = ({ isActive = false }) => {
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

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingDust = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-success-dust';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 4}px;
        height: ${Math.random() * 6 + 4}px;
        background: ${isDark 
          ? 'radial-gradient(circle, rgba(220,20,60,0.8) 0%, rgba(212,175,55,0.6) 30%, rgba(0,0,0,0.4) 100%)'
          : 'radial-gradient(circle, rgba(220,20,60,0.6) 0%, rgba(212,175,55,0.5) 30%, rgba(0,0,0,0.3) 100%)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: successDustFloat ${Math.random() * 15 + 13}s linear infinite;
        box-shadow: 0 0 ${Math.random() * 12 + 8}px rgba(220,20,60,0.5);
      `;
      
      const container = document.querySelector('.success-dust-container');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 28000);
      }
    };

    const createSuccessObject = () => {
      const objects = ['trophy', 'medal', 'certificate'];
      const colors = ['#DC143C', '#D4AF37', '#000000'];
      const object = objects[Math.floor(Math.random() * objects.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = document.createElement('div');
      element.className = `success-3d-object ${object}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 30 + 18}px;
        height: ${Math.random() * 30 + 18}px;
        background: ${color === '#DC143C' 
          ? 'linear-gradient(135deg, #DC143C, #B91C1C, #8B0000)'
          : color === '#D4AF37'
          ? 'linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)'
          : 'linear-gradient(135deg, #000000, #2a2a2a, #1a1a1a)'};
        ${object === 'trophy' ? 'clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);' : ''}
        ${object === 'medal' ? 'border-radius: 50%;' : ''}
        ${object === 'certificate' ? 'border-radius: 4px;' : ''}
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: successMove ${Math.random() * 19 + 15}s linear infinite;
        transform-style: preserve-3d;
        box-shadow: 0 0 28px ${color}85;
        opacity: 0.8;
      `;
      
      const container = document.querySelector('.success-3d-container');
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 34000);
      }
    };

    const dustInterval = setInterval(createFloatingDust, 650);
    const objectInterval = setInterval(createSuccessObject, 1900);
    
    // Create initial batch
    for (let i = 0; i < 9; i++) {
      setTimeout(createFloatingDust, i * 200);
    }
    
    for (let i = 0; i < 4; i++) {
      setTimeout(createSuccessObject, i * 750);
    }

    return () => {
      clearInterval(dustInterval);
      clearInterval(objectInterval);
    };
  }, [isActive, isDark]);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
      quote: "My GLOHSEN score helped me stand out in a competitive job market. I'm now working at my dream hospital!",
      rating: 5
    },
    {
      name: "Hospital Y",
      role: "Healthcare Facility",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=150&q=80",
      quote: "After implementing GLOHSEN's recommendations, our patient satisfaction scores increased by 42%.",
      rating: 5
    },
    {
      name: "Nursing Student A",
      role: "Final Year Student",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
      quote: "The interactive courses and mentorship from Tutor Z helped me ace my exams and secure a placement.",
      rating: 5
    },
    {
      name: "Professor Z",
      role: "Physiology Tutor",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80",
      quote: "I've been able to reach more students and make a bigger impact through GLOHSEN's platform.",
      rating: 5
    }
  ];
  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* Background Elements */}
      <div className="success-dust-container absolute inset-0 pointer-events-none z-0"></div>
      <div className="success-3d-container absolute inset-0 pointer-events-none z-0"></div>

      {/* CSS Animations */}
      <style>{`
        @keyframes successDustFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(32px) rotate(180deg) scale(1.15);
            opacity: 0.8;
          }
          88% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-22vh) translateX(-22px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }

        @keyframes successMove {
          0% {
            transform: translateY(100vh) translateX(0) rotateY(0deg) rotateX(0deg) scale(0.6);
            opacity: 0.3;
          }
          20% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(42px) rotateY(180deg) rotateX(45deg) scale(1.25);
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-32vh) translateX(-32px) rotateY(360deg) rotateX(90deg) scale(0.75);
            opacity: 0;
          }
        }

        .success-3d-object {
          filter: drop-shadow(0 9px 18px rgba(0,0,0,0.4));
          transform-style: preserve-3d;
        }

        .success-3d-object.trophy {
          clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 
            inset 3px 3px 6px rgba(255,255,255,0.3),
            inset -3px -3px 6px rgba(0,0,0,0.2),
            0 0 28px rgba(212,175,55,0.85);
        }

        .success-3d-object.medal {
          border-radius: 50%;
          background: linear-gradient(135deg, #DC143C 0%, #B91C1C 50%, #8B0000 100%);
          box-shadow: 
            inset 3px 3px 6px rgba(255,255,255,0.2),
            inset -3px -3px 6px rgba(0,0,0,0.3),
            0 0 28px rgba(220,20,60,0.85);
        }

        .success-3d-object.certificate {
          border-radius: 4px;
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 50%, #1a1a1a 100%);
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.5),
            0 0 28px rgba(0,0,0,0.85);
        }

        .floating-success-dust {
          filter: blur(0.5px);
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>

      <h2 
        ref={titleRef}
        className={`text-3xl md:text-4xl font-bold mb-10 text-center z-10 relative ${isDark ? 'text-white' : 'text-gray-800'}`}
      >
        Success Stories
      </h2>      
      <ScrollArea className={`w-full max-w-4xl h-[400px] rounded-lg px-4 z-10 relative ${isDark ? 'bg-gray-800/20' : 'bg-white/20'}`}>
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-red-600 to-amber-500 p-1"></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div>
                      <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{testimonial.name}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative mb-6">
                    <MessageCircle className={`absolute top-0 left-0 h-6 w-6 transform -translate-x-1 ${
                      isDark ? 'text-red-300' : 'text-red-100'
                    }`} />
                    <p className={`pl-5 italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Verified Member</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex items-center justify-center mt-8 z-10 relative">
        <div className={`w-2 h-2 rounded-full mx-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
        <div className="w-2 h-2 bg-red-600 rounded-full mx-1"></div>
        <div className={`w-2 h-2 rounded-full mx-1 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
      </div>
    </div>
  );
};

export default SuccessStories;
