
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";

const Feedback = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

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
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Your Voice Matters
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Character and speech bubble */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div ref={characterRef} className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" 
              alt="Frustrated patient" 
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
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 feedback-element">Share Your Experience</h3>
              <p className="text-gray-600 mb-6 feedback-element">
                Whether good or bad, your feedback helps improve healthcare services for everyone.
              </p>
              
              <div className="space-y-4">
                <div className="feedback-element">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Healthcare Facility
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Hospital Y</option>
                    <option>Medical Center Z</option>
                    <option>Clinic A</option>
                    <option>Other (specify)</option>
                  </select>
                </div>
                
                <div className="feedback-element">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Experience
                  </label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                    placeholder="Describe your experience..."
                  ></textarea>
                </div>
                
                <div className="flex justify-between feedback-element">
                  <div className="flex items-center">
                    <ThumbsUp className="mr-2 text-gray-400" size={20} />
                    <span className="text-sm text-gray-600">Positive</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsDown className="mr-2 text-gray-400" size={20} />
                    <span className="text-sm text-gray-600">Negative</span>
                  </div>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 mt-2 feedback-element" asChild>
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
    </div>
  );
};

export default Feedback;
