
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp, ThumbsDown, Check, Info, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Feedback = ({ isActive = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("facilities");

  useEffect(() => {
    if (!cardRef.current || !characterRef.current || !speechBubbleRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
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
      .fromTo(".feedback-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );
    
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 flex flex-col justify-center items-center p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-red-600 dark:text-red-500">
        Your Voice Matters
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Character and speech bubble */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div ref={characterRef} className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" 
              alt="Healthcare professional" 
              className="w-56 h-56 object-cover rounded-full border-4 border-white shadow-xl"
            />
          </div>
          
          <div 
            ref={speechBubbleRef}
            className="absolute top-6 right-10 md:right-0 bg-white p-4 rounded-xl shadow-lg max-w-xs z-20"
          >
            <p className="text-gray-800 mb-0">
              "I waited for hours at Hospital Y, and the doctor barely spent 2 minutes with me. No one listened to my concerns!"
            </p>
            <div className="absolute -bottom-3 left-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
          </div>
        </div>
        
        {/* Feedback form */}
        <div ref={cardRef} className="w-full md:w-1/2 max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-red-600 to-amber-500 text-white p-4 rounded-t-lg">
              <h3 className="text-2xl font-bold feedback-element">Share Your Experience</h3>
              <p className="text-gray-100 feedback-element">
                Your feedback helps improve healthcare services for everyone.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 feedback-element">
                <Tabs 
                  defaultValue="facilities" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full mb-4">
                    <TabsTrigger value="professionals" className="text-xs md:text-sm">
                      Professionals
                    </TabsTrigger>
                    <TabsTrigger value="facilities" className="text-xs md:text-sm">
                      Hospitals/Facilities
                    </TabsTrigger>
                    <TabsTrigger value="tutors" className="text-xs md:text-sm">
                      Tutors/Advisers
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="professionals">
                    <p className="text-sm text-gray-600">
                      Rate and review healthcare professionals based on your experience.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="facilities">
                    <p className="text-sm text-gray-600">
                      Share your experience with healthcare facilities and hospitals.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="tutors">
                    <p className="text-sm text-gray-600">
                      Give feedback on tutors and educational advisers.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-4">
                <div className="feedback-element">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select {activeTab === "professionals" ? "Professional" : activeTab === "facilities" ? "Healthcare Facility" : "Tutor/Adviser"}
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    {activeTab === "professionals" ? (
                      <>
                        <option>Dr. Sarah Johnson</option>
                        <option>Dr. Michael Chen</option>
                        <option>Dr. Aisha Patel</option>
                        <option>Other (specify)</option>
                      </>
                    ) : activeTab === "facilities" ? (
                      <>
                        <option>Hospital Y</option>
                        <option>Medical Center Z</option>
                        <option>Clinic A</option>
                        <option>Other (specify)</option>
                      </>
                    ) : (
                      <>
                        <option>Prof. James Wilson</option>
                        <option>Dr. Elizabeth Taylor</option>
                        <option>Mr. Robert Brown</option>
                        <option>Other (specify)</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div className="feedback-element">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Experience
                  </label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Describe your experience..."
                  ></textarea>
                </div>
                
                <div className="flex justify-between feedback-element">
                  <div className="flex items-center">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="text-amber-400 cursor-pointer" 
                          size={20} 
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center cursor-pointer hover:text-green-600">
                      <ThumbsUp className="mr-1 text-gray-400" size={18} />
                      <span className="text-sm text-gray-600">Positive</span>
                    </div>
                    <div className="flex items-center cursor-pointer hover:text-red-600">
                      <ThumbsDown className="mr-1 text-gray-400" size={18} />
                      <span className="text-sm text-gray-600">Negative</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 feedback-element">
                  <div className="flex gap-2 items-start">
                    <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>
                      By submitting feedback, you agree to our Privacy Policy and Terms of Service. 
                      If your feedback is disputed, you may be required to provide evidence.
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 mt-2 feedback-element transition-all duration-300 transform hover:translate-y-[-2px]" 
                  onClick={() => {
                    toast({
                      title: "Thank you for your feedback",
                      description: "Your experience has been recorded and will help improve healthcare services."
                    });
                  }}
                  asChild
                >
                  <Link to="/feedback">
                    <MessageCircle className="mr-2" size={18} />
                    Submit Feedback
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Feedback Preview Section */}
      <div className="w-full max-w-6xl mt-12 feedback-element">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
            <MessageCircle size={20} />
            Recent Feedback
          </h3>
          <Link to="/feedback#recent" className="text-sm text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
            See all feedback
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-medium">Central Hospital</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Check size={14} className="text-amber-500" />
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-1">Verified</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Great experience overall. Staff was friendly and knowledgeable.</p>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="text-amber-400" size={14} fill="currentColor" />
                ))}
                <Star className="text-gray-300" size={14} />
              </div>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6">
                <MessageCircle size={14} />
                Join Discussion
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  MK
                </div>
                <div>
                  <p className="font-medium">Dr. Johnson</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Check size={14} className="text-amber-500" />
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-1">Verified</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Very thorough and professional. Took time to explain my condition clearly.</p>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-amber-400" size={14} fill="currentColor" />
                ))}
              </div>
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6">
                <MessageCircle size={14} />
                Join Discussion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mt-8 flex justify-center">
        <Link to="/feedback">
          <Button className="bg-red-600 hover:bg-red-700">
            View All Feedback
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Feedback;
