
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, User, Briefcase, Users } from "lucide-react";

interface HowItWorksProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isActive }) => {
  return (
    <div className={`relative container mx-auto px-4 py-16 ${isActive ? 'animate-fade-in' : ''}`}>
      <h2 className="text-5xl font-bold text-center mb-16">HOW IT WORKS</h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Circular background */}
        <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20"></div>
        
        {/* Steps container */}
        <div className="relative grid grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="relative col-start-2 row-start-1">
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10">
              1
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
              <div className="mb-4 flex justify-center">
                <User className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Create Account</h3>
              <p className="text-gray-600 text-center text-sm mb-4">
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
          <div className="relative col-start-2 row-start-2">
            <div className="absolute -right-6 -bottom-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10">
              2
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
              <div className="mb-4 flex justify-center">
                <Check className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Get Verified</h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                Complete your profile and verification process
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative col-start-1 row-start-2">
            <div className="absolute -left-6 -bottom-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10">
              3
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
              <div className="mb-4 flex justify-center">
                <Briefcase className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Browse Opportunities</h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                Find jobs that match your skills and preferences
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="relative col-start-1 row-start-1">
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl z-10">
              4
            </div>
            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
              <div className="mb-4 flex justify-center">
                <Users className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Connect</h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                Join discussions and grow your professional network
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
