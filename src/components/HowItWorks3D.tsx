
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Users, BookOpen } from "lucide-react";

const HowItWorks3D = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start("visible");
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      const top = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (top < windowHeight * 0.75) {
        controls.start("visible");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const steps = [
    {
      id: 1,
      title: "Create Account",
      description: "Sign up in minutes to join our healthcare network",
      icon: <PlusCircle className="h-8 w-8" />,
      to: "/signup",
      delay: 0.2
    },
    {
      id: 2,
      title: "Get Verified",
      description: "Complete your profile and verification process",
      icon: <BookOpen className="h-8 w-8" />,
      to: "/signup",
      delay: 0.4
    },
    {
      id: 3,
      title: "Browse Opportunities",
      description: "Find jobs that match your skills and preferences",
      icon: <Search className="h-8 w-8" />,
      to: "/jobs",
      delay: 0.6
    },
    {
      id: 4,
      title: "Connect",
      description: "Join discussions and grow your professional network",
      icon: <Users className="h-8 w-8" />,
      to: "/community",
      delay: 0.8
    }
  ];

  const CardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div ref={containerRef} className="relative py-12 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      {/* Background circles for 3D effect */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
        <div className="w-[800px] h-[800px] rounded-full border-4 border-dashed border-gray-300 animate-spin-slow" style={{ animationDuration: '40s' }} />
        <div className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-gray-400 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
        <div className="w-[400px] h-[400px] rounded-full border border-dashed border-gray-500 animate-spin-slow" style={{ animationDuration: '20s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-10 font-playfair text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          HOW IT WORKS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              custom={step.delay}
              variants={CardVariants}
              initial="hidden"
              animate={controls}
              className="relative"
            >
              <Link to={step.to} className="block">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 h-full flex flex-col">
                  <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {step.id}
                  </div>
                  <div className="h-16 w-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    {React.cloneElement(step.icon, { className: "h-8 w-8 text-[#D4AF37]" })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center mb-6 flex-grow">{step.description}</p>
                  <Button className="button-3d w-full bg-[#D4AF37] text-white">
                    Get Started
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks3D;
