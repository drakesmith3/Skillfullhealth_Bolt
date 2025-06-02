import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp, ThumbsDown, Check, Info, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "../contexts/ThemeContext";

const Feedback = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("facilities");
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !characterRef.current || !speechBubbleRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(characterRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      )
      .fromTo(speechBubbleRef.current,
        { scale: 0, opacity: 0, transformOrigin: "bottom left" },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    
  }, []);

  return (    <div 
      ref={containerRef}
      className="w-full h-full relative flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden min-h-screen"      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background 0.5s ease-in-out'
      }}>{/* White overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)'
        }}
      ></div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center z-20 relative px-2 sm:px-4">
        <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
          CLIENT FEEDBACK
        </span>
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 z-20 relative px-2 sm:px-4">
        <div className="relative w-full lg:w-2/3 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Character */}
          <div ref={characterRef} className="relative">
            <div className="bg-white p-2 sm:p-3 rounded-full shadow-xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80&w=400" 
                alt="Healthcare professional" 
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full"
              />
            </div>
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs sm:text-sm font-medium px-2 py-1 rounded-full shadow-md z-20">
              Patient A
            </div>
            <div className="absolute -bottom-2 -right-2 flex">
              {[1, 2].map((star) => (
                <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
              ))}
              {[3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
              ))}
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="hidden lg:block w-16 xl:w-20 h-3 sm:h-4 bg-red-600 shadow-lg"></div>
          
          {/* Speech Bubble */}
          <div ref={speechBubbleRef} className="relative">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md max-w-[280px] sm:max-w-[320px] z-20">
              <p className="text-gray-800 mb-0 text-sm sm:text-base">
                "I waited for hours at Hospital Y, and the doctor barely spent 2 minutes with me. No one listened to my concerns!"
              </p>
              <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
            <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-2 sm:px-3 py-1 rounded-full shadow-md text-xs sm:text-sm text-gray-700 whitespace-nowrap">
              Poor Experience
            </div>
          </div>
        </div>
        
        <div ref={contentRef} className="w-full lg:w-1/3 mt-6 lg:mt-0 px-2 sm:px-4">
          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-center lg:text-left ${isDark ? 'text-white' : 'text-gray-800'}`}>Share Your Healthcare Experience</h3>
          
          <p className={`mb-4 sm:mb-6 text-sm sm:text-base text-center lg:text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Help improve healthcare services by sharing your honest feedback about hospitals, professionals, and tutors.
          </p>
          
          <div className={`border-l-4 border-red-600 p-3 sm:p-4 mb-4 sm:mb-6 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
            <p className={`italic text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              "Your feedback creates accountability and drives positive change in healthcare!"
            </p>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>- GLOHSEN Team</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <Tabs 
              defaultValue="facilities" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full mb-3 h-8 sm:h-9">
                <TabsTrigger value="professionals" className="text-xs sm:text-sm px-1 sm:px-2">
                  Doctors
                </TabsTrigger>
                <TabsTrigger value="facilities" className="text-xs sm:text-sm px-1 sm:px-2">
                  Hospitals
                </TabsTrigger>
                <TabsTrigger value="tutors" className="text-xs sm:text-sm px-1 sm:px-2">
                  Tutors
                </TabsTrigger>
              </TabsList>
              
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="text-amber-400 cursor-pointer hover:text-amber-500" 
                      size={18} 
                      fill="currentColor"
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <div className="flex items-center cursor-pointer hover:text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                    <ThumbsUp className="mr-1" size={12} />
                    Positive
                  </div>
                  <div className="flex items-center cursor-pointer hover:text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                    <ThumbsDown className="mr-1" size={12} />
                    Negative
                  </div>
                </div>
              </div>
            </Tabs>
          </div>

          <Link to="/feedback">
            <Button className="bg-red-600 hover:bg-red-700 w-full shadow-lg transition-all duration-300 hover:shadow-xl py-2 sm:py-3 text-sm sm:text-base">
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Share Detailed Feedback
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Feedback Preview Section */}
      <div className="w-full max-w-6xl mt-8 lg:mt-12 z-20 relative px-2 sm:px-4">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
            <MessageCircle size={20} />
            Recent Community Feedback
          </h3>
          <Link to="/feedback#recent" className="text-sm text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold text-sm">
                  JD
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Central Hospital</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Check size={14} className="text-amber-500" />
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-1">Verified</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">Great experience overall. Staff was friendly and knowledgeable. The new patient care system really works!</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="text-amber-400" size={14} fill="currentColor" />
                ))}
                <Star className="text-gray-300" size={14} />
              </div>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6 px-3">
                <MessageCircle size={12} />
                Discuss
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                  MK
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Dr. Johnson</p>
                  <p className="text-xs sm:text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Check size={14} className="text-amber-500" />
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-1">Verified</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">Very thorough and professional. Took time to explain my condition clearly and answered all my questions.</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-amber-400" size={14} fill="currentColor" />
                ))}
              </div>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6 px-3">
                <MessageCircle size={12} />
                Discuss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;