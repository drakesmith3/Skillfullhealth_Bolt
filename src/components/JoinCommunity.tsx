
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const JoinCommunity = ({ isActive = false }) => {
  const { isDark } = useTheme();

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingDust = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-community-dust';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 6}px;
        height: ${Math.random() * 8 + 6}px;
        background: ${isDark 
          ? 'radial-gradient(circle, rgba(220,20,60,0.9) 0%, rgba(212,175,55,0.7) 30%, rgba(0,0,0,0.5) 100%)'
          : 'radial-gradient(circle, rgba(220,20,60,0.7) 0%, rgba(212,175,55,0.6) 30%, rgba(0,0,0,0.4) 100%)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: communityDustFloat ${Math.random() * 18 + 16}s linear infinite;
        box-shadow: 0 0 ${Math.random() * 18 + 12}px rgba(220,20,60,0.6);
      `;
      
      const container = document.querySelector('.community-dust-container');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 34000);
      }
    };

    const createCommunityObject = () => {
      const objects = ['heart', 'handshake', 'globe'];
      const colors = ['#DC143C', '#D4AF37', '#000000'];
      const object = objects[Math.floor(Math.random() * objects.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = document.createElement('div');
      element.className = `community-3d-object ${object}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 40 + 28}px;
        height: ${Math.random() * 40 + 28}px;
        background: ${color === '#DC143C' 
          ? 'linear-gradient(135deg, #DC143C, #B91C1C, #8B0000)'
          : color === '#D4AF37'
          ? 'linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)'
          : 'linear-gradient(135deg, #000000, #2a2a2a, #1a1a1a)'};
        ${object === 'heart' ? 'clip-path: polygon(50% 100%, 0% 50%, 50% 0%, 100% 50%);' : ''}
        ${object === 'handshake' ? 'border-radius: 8px;' : ''}
        ${object === 'globe' ? 'border-radius: 50%;' : ''}
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: communityMove ${Math.random() * 24 + 18}s linear infinite;
        transform-style: preserve-3d;
        box-shadow: 0 0 40px ${color}95;
        opacity: 0.9;
      `;
      
      const container = document.querySelector('.community-3d-container');
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 42000);
      }
    };

    const dustInterval = setInterval(createFloatingDust, 400);
    const objectInterval = setInterval(createCommunityObject, 2500);
    
    // Create initial batch
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingDust, i * 120);
    }
    
    for (let i = 0; i < 7; i++) {
      setTimeout(createCommunityObject, i * 900);
    }

    return () => {
      clearInterval(dustInterval);
      clearInterval(objectInterval);
    };
  }, [isActive, isDark]);
  const roles = [
    {
      icon: <User className="h-8 w-8 text-red-600" />,
      title: "Clients/Patients",
      description: "Share your healthcare experiences and help improve services."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-red-600" />,
      title: "Students",
      description: "Access interactive learning resources and connect with mentors."
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Healthcare Professionals",
      description: "Calculate your GLOHSEN score and advance your career."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-red-600" />,
      title: "Tutors/Advisers",
      description: "Share your knowledge and mentor the next generation."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: "Employers",
      description: "Find qualified professionals and improve your facility."
    }
  ];
  return (
    <div 
      className="w-full h-full relative py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* Background Elements */}
      <div className="community-dust-container absolute inset-0 pointer-events-none z-0"></div>
      <div className="community-3d-container absolute inset-0 pointer-events-none z-0"></div>

      {/* CSS Animations */}
      <style>{`
        @keyframes communityDustFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(45px) rotate(180deg) scale(1.4);
            opacity: 1;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-35vh) translateX(-35px) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes communityMove {
          0% {
            transform: translateY(100vh) translateX(0) rotateY(0deg) rotateX(0deg) scale(0.4);
            opacity: 0.6;
          }
          35% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(55px) rotateY(180deg) rotateX(120deg) scale(1.5);
            opacity: 1;
          }
          65% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-45vh) translateX(-45px) rotateY(360deg) rotateX(240deg) scale(0.5);
            opacity: 0;
          }
        }

        .community-3d-object {
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6));
          transform-style: preserve-3d;
        }

        .community-3d-object.heart {
          clip-path: polygon(50% 100%, 0% 50%, 50% 0%, 100% 50%);
          background: linear-gradient(135deg, #DC143C 0%, #B91C1C 50%, #8B0000 100%);
          box-shadow: 
            inset 5px 5px 10px rgba(255,255,255,0.2),
            inset -5px -5px 10px rgba(0,0,0,0.3),
            0 0 40px rgba(220,20,60,0.95);
        }

        .community-3d-object.handshake {
          border-radius: 8px;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 
            inset 5px 5px 10px rgba(255,255,255,0.3),
            inset -5px -5px 10px rgba(0,0,0,0.2),
            0 0 40px rgba(212,175,55,0.95);
        }

        .community-3d-object.globe {
          border-radius: 50%;
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 50%, #1a1a1a 100%);
          box-shadow: 
            inset 3px 3px 6px rgba(255,255,255,0.1),
            inset -3px -3px 6px rgba(0,0,0,0.5),
            0 0 40px rgba(0,0,0,0.95);
        }

        .floating-community-dust {
          filter: blur(0.8px);
          animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <div className={`absolute inset-0 flex items-center justify-center opacity-5 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <div className="text-[25rem] font-bold">G</div>
        </div>
        
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 relative z-10 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Join The GLOHSEN Community
        </h2>
        
        <p className={`text-xl mb-12 max-w-3xl mx-auto relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          There's a place for you here, no matter your role in healthcare.
        </p>        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => (
            <Card key={index} className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`mb-4 p-3 rounded-full ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}>
                  {role.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{role.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
          <Button 
            variant="outline" 
            className={`px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              isDark 
                ? 'border-red-400 text-red-400 hover:bg-red-900/20' 
                : 'border-red-600 text-red-600 hover:bg-red-50'
            }`} 
            asChild
          >
            <Link to="/blog">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
