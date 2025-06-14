import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useClickSound } from "../hooks/useClickSound";

// Enhanced dock effect with fluid animations and professional finish
const dockStyles = `
  .dock-container {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .dock-button-wrapper {
    perspective: 1200px;
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .dock-button {
    min-width: 110px;
    min-height: 75px;
    border-radius: 18px;
    backdrop-filter: blur(15px) saturate(150%);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.35),
      0 4px 16px rgba(0, 0, 0, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.15),
      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
    transform-origin: bottom center;
    cursor: pointer;
    will-change: transform, box-shadow, border-color;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateZ(0) scale(1);
  }
  
  .dock-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 18px;
  }
  
  .dock-button:after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .dock-button-wrapper:hover .dock-button {
    transform: translateY(-12px) scale(1.15) rotateX(5deg);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 10px 30px rgba(0, 0, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.25),
      inset 0 -2px 0 rgba(0, 0, 0, 0.15);
  }
  
  .dock-button-wrapper:hover .dock-button:before {
    left: 100%;
  }
  
  .dock-button-wrapper:hover .dock-button:after {
    opacity: 1;
  }
  
  .dock-button-wrapper:active .dock-button {
    transform: translateY(-8px) scale(1.08) rotateX(2deg);
    transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  /* Magnetic effect for neighboring buttons */
  .dock-container:hover .dock-button-wrapper:not(:hover) .dock-button {
    transform: translateY(-2px) scale(1.02);
  }
  
  /* Staggered animation entrance */
  .dock-button-wrapper:nth-child(1) { animation-delay: 0.1s; }
  .dock-button-wrapper:nth-child(2) { animation-delay: 0.2s; }
  .dock-button-wrapper:nth-child(3) { animation-delay: 0.3s; }
  .dock-button-wrapper:nth-child(4) { animation-delay: 0.4s; }
  .dock-button-wrapper:nth-child(5) { animation-delay: 0.5s; }
  
  @keyframes dockButtonEnter {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .dock-button-wrapper {
    animation: dockButtonEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  
  /* Enhanced ripple effect */
  .dock-button-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Responsive design improvements */
  @media (max-width: 768px) {
    .dock-container {
      gap: 6px;
      padding: 16px;
      border-radius: 20px;
    }
    
    .dock-button {
      min-width: 95px;
      min-height: 65px;
      border-radius: 16px;
    }
    
    .dock-button-wrapper:hover .dock-button {
      transform: translateY(-8px) scale(1.1) rotateX(3deg);
    }
  }
  
  @media (max-width: 640px) {
    .dock-container {
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }
    
    .dock-button {
      min-width: 85px;
      min-height: 60px;
    }
  }
`;

const JoinCommunity = ({ isActive = false, playClickSound }) => {  const { isDark } = useTheme();
  const { playClick } = useClickSound();
    // Handle click with sound and ripple effect
  const handleClick = (e) => {
    if (playClickSound) {
      playClickSound();
    } else {
      playClick();
    }
    
    // Create ripple effect
    const button = e.currentTarget.querySelector('.dock-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.className = 'dock-button-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  };

  // Add styles to head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = dockStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section 
      id="JoinCommunity"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center py-12 px-4 overflow-hidden ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
        {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center px-2 sm:px-4">
          <span className={`${
            isDark 
              ? 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text' 
              : 'bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text'
          }`}>
            JOIN THE GLOHSEN COMMUNITY
          </span>
        </h2>
        
        {/* Subtitle */}
        <p className={`text-lg sm:text-xl md:text-xl mb-8 max-w-4xl mx-auto ${
          isDark ? 'text-white/90' : 'text-white/90'
        }`}>
          There's a Place for You Here No Matter Your Role in Healthcare
        </p>
        
        {/* Main Content Container with Background */}
        <div className="bg-white/20 rounded-lg p-8 text-center backdrop-blur-[40px]">
          <div className="text-center space-y-8">
            <p className={`text-2xl opacity-95 max-w-4xl mx-auto leading-relaxed ${
              isDark ? 'text-white' : 'text-white'
            }`}>
              ...whether you're a patient seeking better care, a student striving for success, 
              a tutor leveraging AI to teach, a professional looking to upskill, or simply an employer 
              seeking superstar employees.            </p>              {/* Enhanced Dock-style Button Container */}
              <div className="dock-container max-w-4xl mx-auto">
                <Link to="/signin?userType=client" className="dock-button-wrapper" onClick={handleClick}>
                  <Button className="dock-button bg-blue-700 hover:bg-blue-500 text-white" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <User size={20} />
                      <span className="text-sm font-medium">I'm a Client</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=student" className="dock-button-wrapper" onClick={handleClick}>
                  <Button className="dock-button bg-red-700 hover:bg-red-500 text-white" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <GraduationCap size={20} />
                      <span className="text-sm font-medium">I'm a Student</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=tutor" className="dock-button-wrapper" onClick={handleClick}>
                  <Button className="dock-button bg-gray-900 hover:bg-gray-500 text-white" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <MessageCircle size={20} />
                      <span className="text-sm font-medium">I'm a Tutor</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=professional" className="dock-button-wrapper" onClick={handleClick}>
                  <Button className="dock-button bg-amber-600 hover:bg-amber-400 text-white" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <Users size={20} />
                      <span className="text-sm font-medium">I'm a Professional</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=employer" className="dock-button-wrapper" onClick={handleClick}>
                  <Button className="dock-button bg-green-600 hover:bg-green-500 text-white" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <Briefcase size={20} />
                      <span className="text-sm font-medium">I'm an Employer</span>
                    </div>
                  </Button>
                </Link>
              </div>
            
            <div className="bg-white/20 rounded-lg p-8 max-w-2xl mx-auto backdrop-blur-[40px]">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-white'
              }`}>Ready to Transform Healthcare?</h3>
              <p className={`text-lg opacity-90 mb-6 ${
                isDark ? 'text-white' : 'text-white'
              }`}>
                Join 10,000+ healthcare professionals who are already building a better future with GLOHSEN.
              </p>              <Link to="/signup" onClick={handleClick}>
                <Button className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white w-full" size="lg">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
