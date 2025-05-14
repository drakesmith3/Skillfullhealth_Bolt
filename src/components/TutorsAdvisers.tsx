
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Star } from "lucide-react";

const TutorsAdvisers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tutorRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !tutorRef.current || !studentRef.current || !arrowRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo([tutorRef.current, studentRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(arrowRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.inOut" },
        "-=0.2"
      )
      .fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-4 md:p-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Empowering Tutors & Students
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative w-full md:w-2/3 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          {/* Tutor */}
          <div ref={tutorRef} className="relative">
            <div className="bg-white p-3 rounded-full shadow-lg z-10">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80" 
                alt="Professor teaching" 
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-sm font-medium px-2 py-1 rounded-full shadow-md z-20">
              Tutor Z
            </div>
            <div className="absolute -bottom-2 -right-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div 
            ref={arrowRef}
            className="hidden md:block w-20 h-4 bg-red-600"
          ></div>
          
          {/* Student */}
          <div ref={studentRef} className="relative mt-8 md:mt-0">
            <div className="bg-white p-3 rounded-full shadow-lg z-10">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" 
                alt="Nursing student" 
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="absolute top-0 right-0 bg-red-600 text-white text-sm font-medium px-2 py-1 rounded-full shadow-md z-20">
              Student A
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm text-gray-700 whitespace-nowrap">
              Nursing Student
            </div>
          </div>
        </div>
        
        <div ref={contentRef} className="w-full md:w-1/3 mt-8 md:mt-0">
          <h3 className="text-2xl font-bold mb-4">The Clotting Cascade Course</h3>
          
          <p className="text-gray-600 mb-6">
            Student A was struggling with understanding the blood clotting process. Through GLOHSEN, she connected with Tutor Z, who specializes in Nursing Physiology.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p className="italic text-gray-700">
              "The interactive CLOTQUEST game made understanding the complex clotting cascade simple and fun!"
            </p>
            <p className="text-sm text-gray-500 mt-2">- Student A</p>
          </div>
          
          <Button className="bg-amber-500 hover:bg-amber-600 w-full">
            <GraduationCap className="mr-2" />
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorsAdvisers;
