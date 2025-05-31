import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Briefcase } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Employers = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
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

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    // const createFloatingDust = () => {
    //   const particle = document.createElement(\'div\');
    //   particle.className = \'floating-employers-dust\';
    //   particle.style.cssText = `
    //     position: absolute;
    //     width: ${Math.random() * 5 + 3}px;
    //     height: ${Math.random() * 5 + 3}px;
    //     background: ${isDark 
    //       ? \'radial-gradient(circle, rgba(220,20,60,0.7) 0%, rgba(212,175,55,0.5) 30%, rgba(0,0,0,0.3) 100%)\'
    //       : \'radial-gradient(circle, rgba(220,20,60,0.5) 0%, rgba(212,175,55,0.4) 30%, rgba(0,0,0,0.2) 100%)\'};
    //     border-radius: 50%;
    //     pointer-events: none;
    //     z-index: 1;
    //     left: ${Math.random() * 100}%;
    //     top: ${Math.random() * 100}%;
    //     animation: employersDustFloat ${Math.random() * 12 + 10}s linear infinite;
    //     box-shadow: 0 0 ${Math.random() * 10 + 6}px rgba(220,20,60,0.4);
    //   `;
      
    //   const container = document.querySelector(\'.employers-dust-container\');
    //   if (container) {
    //     container.appendChild(particle);
        
    //     setTimeout(() => {
    //       if (particle.parentNode) {
    //         particle.parentNode.removeChild(particle);
    //       }
    //     }, 22000);
    //   }
    // };

    // const createBusinessObject = () => {
    //   const objects = [\'briefcase\', \'building\', \'chart\'];
    //   const colors = [\'#DC143C\', \'#D4AF37\', \'#000000\'];
    //   const object = objects[Math.floor(Math.random() * objects.length)];
    //   const color = colors[Math.floor(Math.random() * colors.length)];
      
    //   const element = document.createElement(\'div\');
    //   element.className = `business-3d-object ${object}`;
    //   element.style.cssText = `
    //     position: absolute;
    //     width: ${Math.random() * 28 + 16}px;
    //     height: ${Math.random() * 28 + 16}px;
    //     background: ${color === \'#DC143C\' 
    //       ? \'linear-gradient(135deg, #DC143C, #B91C1C, #8B0000)\'
    //       : color === \'#D4AF37\'
    //       ? \'linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)\'
    //       : \'linear-gradient(135deg, #000000, #2a2a2a, #1a1a1a)\'};
    //     ${object === \'briefcase\' ? \'border-radius: 8px;\' : \'\'}
    //     ${object === \'building\' ? \'clip-path: polygon(0 100%, 20% 0%, 80% 0%, 100% 100%);\' : \'\'}
    //     ${object === \'chart\' ? \'clip-path: polygon(0% 100%, 25% 75%, 50% 50%, 75% 25%, 100% 0%, 100% 100%);\' : \'\'}
    //     pointer-events: none;
    //     z-index: 0;
    //     left: ${Math.random() * 100}%;
    //     top: ${Math.random() * 100}%;
    //     animation: businessMove ${Math.random() * 18 + 12}s linear infinite;
    //     transform-style: preserve-3d;
    //     box-shadow: 0 0 25px ${color}70;
    //     opacity: 0.7;
    //   `;
      
    //   const container = document.querySelector(\'.business-3d-container\');
    //   if (container) {
    //     container.appendChild(element);
        
    //     setTimeout(() => {
    //       if (element.parentNode) {
    //         element.parentNode.removeChild(element);
    //       }
    //     }, 30000);
    //   }
    // };

    // const dustInterval = setInterval(createFloatingDust, 700);
    // const objectInterval = setInterval(createBusinessObject, 1800);
    
    // // Create initial batch
    // for (let i = 0; i < 8; i++) {
    //   setTimeout(createFloatingDust, i * 200);
    // }
    
    // for (let i = 0; i < 4; i++) {
    //   setTimeout(createBusinessObject, i * 600);
    // }

    // return () => {
    //   clearInterval(dustInterval);
    //   clearInterval(objectInterval);
    // };
  }, [isActive, isDark]);

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Streamlined Hiring",
      description: "Find pre-qualified healthcare professionals with verified GLOHSEN scores."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-red-600" />,
      title: "Quality Assurance",
      description: "All professionals are vetted through our proprietary scoring system."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: "HR Workflow Solutions",
      description: "Manage recruitment, onboarding, and performance tracking in one place."
    }
  ];
  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative flex flex-col md:flex-row items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* Background Elements */}
      {/* <div className="employers-dust-container absolute inset-0 pointer-events-none z-0"></div> */}
      {/* <div className="business-3d-container absolute inset-0 pointer-events-none z-0"></div> */}
      {/* CSS Animations */}
      <style>{`
        /* @keyframes employersDustFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg) scale(1.1);
            opacity: 0.7;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20vh) translateX(-20px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }

        @keyframes businessMove {
          0% {
            transform: translateY(100vh) translateX(0) rotateY(0deg) rotateX(0deg) scale(0.7);
            opacity: 0.3;
          }
          20% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(40px) rotateY(180deg) rotateX(45deg) scale(1.2);
            opacity: 0.9;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-30vh) translateX(-30px) rotateY(360deg) rotateX(90deg) scale(0.8);
            opacity: 0;
          }
        }

        .business-3d-object {
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
          transform-style: preserve-3d;
        }

        .business-3d-object.briefcase {
          border-radius: 8px;
          background: linear-gradient(135deg, #DC143C 0%, #B91C1C 50%, #8B0000 100%);
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.2),
            inset -2px -2px 4px rgba(0,0,0,0.3),
            0 0 25px rgba(220,20,60,0.7);
        }

        .business-3d-object.building {
          clip-path: polygon(0 100%, 20% 0%, 80% 0%, 100% 100%);
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.3),
            inset -2px -2px 4px rgba(0,0,0,0.2),
            0 0 25px rgba(212,175,55,0.7);
        }

        .business-3d-object.chart {
          clip-path: polygon(0% 100%, 25% 75%, 50% 50%, 75% 25%, 100% 0%, 100% 100%);
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 50%, #1a1a1a 100%);
          box-shadow: 
            inset 1px 1px 2px rgba(255,255,255,0.1),
            inset -1px -1px 2px rgba(0,0,0,0.5),
            0 0 25px rgba(0,0,0,0.8);
        }

        .floating-employers-dust {
          filter: blur(0.5px);
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        } */
      `}</style>
      <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <div className="relative">
          <img 
            ref={hospitalRef}
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80" 
            alt="Hospital team meeting" 
            className="rounded-lg shadow-xl max-w-full h-auto"
          />
          <div className="absolute -bottom-4 -right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-lg">
            Hospital Y
          </div>
        </div>
      </div>
      
      <div ref={contentRef} className="w-full md:w-1/2 max-w-lg px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          For Employers
        </h2>
        
        <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          After seeing patient feedback, Hospital Y turned to GLOHSEN to improve their staffing quality and patient satisfaction.
        </p>
        
        <div className="space-y-6 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-1">{benefit.icon}</div>
              <div>
                <h3 className={`font-bold text-xl mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{benefit.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button className={`${isDark ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'} px-6 py-3 text-lg`}>
          Register as an Employer
        </Button>
      </div>
    </div>
  );
};

export default Employers;
