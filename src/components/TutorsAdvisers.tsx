
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const TutorsAdvisers = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tutorRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !tutorRef.current || !studentRef.current || !arrowRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo([tutorRef.current, studentRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(arrowRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.inOut" },
        "-=0.2"
      )
      .fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    
  }, []);

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingDust = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-tutors-dust';
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
        animation: tutorsDustFloat ${Math.random() * 14 + 12}s linear infinite;
        box-shadow: 0 0 ${Math.random() * 12 + 8}px rgba(220,20,60,0.5);
      `;
      
      const container = document.querySelector('.tutors-dust-container');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 26000);
      }
    };

    const createEducationObject = () => {
      const objects = ['book', 'graduation', 'lightbulb'];
      const colors = ['#DC143C', '#D4AF37', '#000000'];
      const object = objects[Math.floor(Math.random() * objects.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = document.createElement('div');
      element.className = `education-3d-object ${object}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 32 + 20}px;
        height: ${Math.random() * 32 + 20}px;
        background: ${color === '#DC143C' 
          ? 'linear-gradient(135deg, #DC143C, #B91C1C, #8B0000)'
          : color === '#D4AF37'
          ? 'linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)'
          : 'linear-gradient(135deg, #000000, #2a2a2a, #1a1a1a)'};
        ${object === 'book' ? 'border-radius: 4px;' : ''}
        ${object === 'graduation' ? 'clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);' : ''}
        ${object === 'lightbulb' ? 'border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;' : ''}
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: educationMove ${Math.random() * 20 + 14}s linear infinite;
        transform-style: preserve-3d;
        box-shadow: 0 0 30px ${color}80;
        opacity: 0.8;
      `;
      
      const container = document.querySelector('.education-3d-container');
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 34000);
      }
    };

    const dustInterval = setInterval(createFloatingDust, 600);
    const objectInterval = setInterval(createEducationObject, 2000);
    
    // Create initial batch
    for (let i = 0; i < 10; i++) {
      setTimeout(createFloatingDust, i * 180);
    }
    
    for (let i = 0; i < 5; i++) {
      setTimeout(createEducationObject, i * 700);
    }

    return () => {
      clearInterval(dustInterval);
      clearInterval(objectInterval);
    };
  }, [isActive, isDark]);
  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* Background Elements */}
      <div className="tutors-dust-container absolute inset-0 pointer-events-none z-0"></div>
      <div className="education-3d-container absolute inset-0 pointer-events-none z-0"></div>      {/* CSS Animations */}
      <style>{`
        @keyframes tutorsDustFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(35px) rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-25vh) translateX(-25px) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes educationMove {
          0% {
            transform: translateY(100vh) translateX(0) rotateY(0deg) rotateX(0deg) scale(0.6);
            opacity: 0.4;
          }
          25% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(50vh) translateX(45px) rotateY(180deg) rotateX(60deg) scale(1.3);
            opacity: 1;
          }
          75% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-35vh) translateX(-35px) rotateY(360deg) rotateX(120deg) scale(0.7);
            opacity: 0;
          }
        }

        .education-3d-object {
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4));
          transform-style: preserve-3d;
        }

        .education-3d-object.book {
          border-radius: 4px;
          background: linear-gradient(135deg, #DC143C 0%, #B91C1C 50%, #8B0000 100%);
          box-shadow: 
            inset 3px 3px 6px rgba(255,255,255,0.2),
            inset -3px -3px 6px rgba(0,0,0,0.3),
            0 0 30px rgba(220,20,60,0.8);
        }

        .education-3d-object.graduation {
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 
            inset 3px 3px 6px rgba(255,255,255,0.3),
            inset -3px -3px 6px rgba(0,0,0,0.2),
            0 0 30px rgba(212,175,55,0.8);
        }

        .education-3d-object.lightbulb {
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 50%, #1a1a1a 100%);
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.5),
            0 0 30px rgba(0,0,0,0.9);
        }

        .floating-tutors-dust {
          filter: blur(0.6px);
          animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        }
      `}</style>

      <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center z-10 relative ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Empowering Tutors & Students
      </h2>      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 z-10 relative">
        <div className="relative w-full md:w-2/3 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          {/* Tutor */}
          <div ref={tutorRef} className="relative">
            <div className="bg-white p-3 rounded-full shadow-xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80" 
                alt="Professor teaching" 
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-sm font-medium px-2 py-1 rounded-full shadow-md z-20">
              Tutor Z
            </div>
            <div className="absolute -bottom-2 -right-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div 
            ref={arrowRef}
            className="hidden md:block w-20 h-4 bg-red-600 shadow-lg"
          ></div>
          
          {/* Student */}
          <div ref={studentRef} className="relative mt-8 md:mt-0">
            <div className="bg-white p-3 rounded-full shadow-xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" 
                alt="Nursing student" 
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="absolute top-0 right-0 bg-red-600 text-white text-sm font-medium px-2 py-1 rounded-full shadow-md z-20">
              Student A
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm text-gray-700 whitespace-nowrap">
              Nursing Student
            </div>
          </div>
        </div>
        
        <div ref={contentRef} className="w-full md:w-1/3 mt-8 md:mt-0">
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>The Clotting Cascade Course</h3>
          
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Student A was struggling with understanding the blood clotting process. Through GLOHSEN, she connected with Tutor Z, who specializes in Nursing Physiology.
          </p>
          
          <div className={`border-l-4 border-amber-500 p-4 mb-6 ${isDark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
            <p className={`italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              "The interactive CLOTQUEST game made understanding the complex clotting cascade simple and fun!"
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>- Student A</p>
          </div>
          
          <Button className="bg-amber-500 hover:bg-amber-600 w-full shadow-lg transition-all duration-300 hover:shadow-xl">
            <GraduationCap className="mr-2" />
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorsAdvisers;
