
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Briefcase } from "lucide-react";

const Employers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      className="w-full h-full bg-white flex flex-col md:flex-row items-center justify-center p-4 md:p-8"
    >
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          For Employers
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          After seeing patient feedback, Hospital Y turned to GLOHSEN to improve their staffing quality and patient satisfaction.
        </p>
        
        <div className="space-y-6 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-1">{benefit.icon}</div>
              <div>
                <h3 className="font-bold text-xl mb-1">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg">
          Register as an Employer
        </Button>
      </div>
    </div>
  );
};

export default Employers;
