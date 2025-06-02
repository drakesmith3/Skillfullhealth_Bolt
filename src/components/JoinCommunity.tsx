import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

// Custom styles for dock effect
const dockStyles = `
  .dock-button-wrapper {
    perspective: 1000px;
  }
  
  .dock-button {
    min-width: 120px;
    min-height: 80px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transform-origin: bottom center;
    cursor: pointer;
    will-change: transform;
    position: relative;
    overflow: hidden;
  }
  
  .dock-button:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .dock-button:hover:before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .dock-button {
      min-width: 100px;
      min-height: 70px;
    }
  }
`;

const JoinCommunity = ({ isActive = false }) => {
  const { isDark } = useTheme();

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
              seeking superstar employees.            </p>
              {/* Dock-style Button Container */}
              <div className="flex flex-wrap justify-center items-end gap-2 max-w-4xl mx-auto px-4">
                <Link to="/signin?userType=client" className="dock-button-wrapper">
                  <Button className="dock-button bg-blue-700 hover:bg-blue-500 text-white transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-2 hover:shadow-2xl active:scale-110" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <User size={20} />
                      <span className="text-sm font-medium">I'm a Client</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=student" className="dock-button-wrapper">
                  <Button className="dock-button bg-red-700 hover:bg-red-500 text-white transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-2 hover:shadow-2xl active:scale-110" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <GraduationCap size={20} />
                      <span className="text-sm font-medium">I'm a Student</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=tutor" className="dock-button-wrapper">
                  <Button className="dock-button bg-gray-900 hover:bg-gray-500 text-white transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-2 hover:shadow-2xl active:scale-110" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <MessageCircle size={20} />
                      <span className="text-sm font-medium">I'm a Tutor</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=professional" className="dock-button-wrapper">
                  <Button className="dock-button bg-amber-600 hover:bg-amber-400 text-white transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-2 hover:shadow-2xl active:scale-110" size="lg">
                    <div className="flex flex-col items-center gap-1">
                      <Users size={20} />
                      <span className="text-sm font-medium">I'm a Professional</span>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/signin?userType=employer" className="dock-button-wrapper">
                  <Button className="dock-button bg-green-600 hover:bg-green-500 text-white transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-2 hover:shadow-2xl active:scale-110" size="lg">
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
              </p>              <Link to="/signup">
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
