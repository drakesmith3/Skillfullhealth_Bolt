import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const JoinCommunity = ({ isActive = false }) => {
  const { isDark } = useTheme();

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
              seeking superstar employees.
            </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <Link to="/signin?userType=client">
                <Button className="bg-blue-600 hover:bg-blue-900 w-full" size="lg">
                  I'm a Client
                </Button>
              </Link>
              <Link to="/signin?userType=student">
                <Button className="bg-red-600 hover:bg-red-900 w-full" size="lg">
                  I'm a Student
                </Button>
              </Link>
              <Link to="/signin?userType=tutor">
                <Button className="bg-gray-600 hover:bg-gray-900 w-full" size="lg">
                  I'm a Tutor
                </Button>
              </Link>
              <Link to="/signin?userType=professional">
                <Button className="bg-amber-600 hover:bg-amber-900 w-full" size="lg">
                  I'm a Professional
                </Button>
              </Link>
              <Link to="/signin?userType=employer">
                <Button className="bg-green-600 hover:bg-green-900 w-full" size="lg">
                  I'm an Employer
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
