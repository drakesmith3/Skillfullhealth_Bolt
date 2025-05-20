
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, User, Briefcase, Users, FileText } from "lucide-react";

interface HowItWorksProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isActive, scrollToSection }) => {
  const handleNextSection = () => {
    if (scrollToSection) {
      scrollToSection(3); // Scroll to next section (index 3)
    }
  };

  return (
    <div className={`relative container mx-auto px-4 py-16 ${isActive ? 'animate-fade-in' : ''}`}>
      <h2 className="text-5xl font-bold text-center mb-16 text-[#D4AF37]">HOW IT WORKS</h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Circular background */}
        <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20"></div>
        
        {/* Central image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="GLOHSEN" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* Steps container */}
        <div className="relative grid grid-cols-2 gap-8 p-4">
          {/* Step 1 */}
          <div className="relative col-start-2 row-start-1 mb-16">
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
              1
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border border-[#D4AF37]/20">
              <div className="mb-4 flex justify-center">
                <User className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Create Account</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
                Sign up in minutes to join our healthcare network
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative col-start-1 row-start-1 mb-16">
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
              2
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border border-[#D4AF37]/20">
              <div className="mb-4 flex justify-center">
                <Check className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Get Verified</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
                Complete your profile and verification process
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative col-start-2 row-start-2 mt-16">
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
              3
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border border-[#D4AF37]/20">
              <div className="mb-4 flex justify-center">
                <FileText className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Complete CME Courses</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
                Enhance your skills with our specialized courses
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="relative col-start-1 row-start-2 mt-16">
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
              4
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border border-[#D4AF37]/20">
              <div className="mb-4 flex justify-center">
                <Briefcase className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Find Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
                Browse and apply for healthcare positions
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  View Jobs
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="relative col-start-2 row-start-3 mt-16">
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10 shadow-lg">
              5
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border border-[#D4AF37]/20">
              <div className="mb-4 flex justify-center">
                <Users className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Connect & Grow</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4">
                Join discussions and grow your professional network
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Connect Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator button */}
      <div className="mt-20 text-center">
        <Button 
          onClick={handleNextSection}
          variant="ghost" 
          className="group flex flex-col items-center animate-bounce"
        >
          <span className="text-sm mb-2 opacity-70">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-y-1 transition-transform">
            <path d="M12 5v14m-7-7l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default HowItWorks;
