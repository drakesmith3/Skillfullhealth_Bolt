
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, MessageCircle, User } from "lucide-react";

const SuccessStories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !testimonialsRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(testimonialsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
    
  }, []);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
      quote: "My GLOHSEN score helped me stand out in a competitive job market. I'm now working at my dream hospital!",
      rating: 5
    },
    {
      name: "Hospital Y",
      role: "Healthcare Facility",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=150&q=80",
      quote: "After implementing GLOHSEN's recommendations, our patient satisfaction scores increased by 42%.",
      rating: 5
    },
    {
      name: "Nursing Student A",
      role: "Final Year Student",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
      quote: "The interactive courses and mentorship from Tutor Z helped me ace my exams and secure a placement.",
      rating: 5
    },
    {
      name: "Professor Z",
      role: "Physiology Tutor",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80",
      quote: "I've been able to reach more students and make a bigger impact through GLOHSEN's platform.",
      rating: 5
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-amber-50 to-white flex flex-col justify-center items-center p-4 md:p-8"
    >
      <h2 
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800"
      >
        Success Stories
      </h2>
      
      <ScrollArea className="w-full max-w-4xl h-[400px] rounded-lg px-4">
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-red-600 to-amber-500 p-1"></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative mb-6">
                    <MessageCircle className="absolute top-0 left-0 h-6 w-6 text-red-100 transform -translate-x-1" />
                    <p className="text-gray-700 pl-5 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Verified Member</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex items-center justify-center mt-8">
        <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        <div className="w-2 h-2 bg-red-600 rounded-full mx-1"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default SuccessStories;
