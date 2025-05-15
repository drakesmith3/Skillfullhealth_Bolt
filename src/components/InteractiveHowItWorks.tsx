
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StepButtonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  rotationDeg: number;
  delay: number;
}

const StepButton: React.FC<StepButtonProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  rotationDeg, 
  delay 
}) => {
  // Calculate position based on rotation
  const radius = 180; // Distance from center
  const x = Math.cos((rotationDeg * Math.PI) / 180) * radius;
  const y = Math.sin((rotationDeg * Math.PI) / 180) * radius;
  
  return (
    <motion.div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transformOrigin: "center",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: delay, 
        duration: 0.5,
        type: "spring", 
        stiffness: 100 
      }}
    >
      <Link to={to}>
        <Button 
          className="rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <div className="text-2xl mb-1">{icon}</div>
          <div className="font-bold text-sm">{title}</div>
          <div className="text-xs opacity-75 mt-1 px-2 text-center">{description}</div>
        </Button>
      </Link>
    </motion.div>
  );
};

const InteractiveHowItWorks: React.FC = () => {
  return (
    <div className="relative h-[500px] w-full mx-auto flex items-center justify-center">
      {/* Center circle with GLOHSEN logo */}
      <motion.div 
        className="absolute z-10 rounded-full w-40 h-40 bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xl shadow-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100
        }}
      >
        GLOHSEN
      </motion.div>
      
      {/* Concentric circles for decoration */}
      <motion.div 
        className="absolute rounded-full w-60 h-60 border-2 border-dashed border-gray-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      />
      
      <motion.div 
        className="absolute rounded-full w-80 h-80 border-2 border-dashed border-gray-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      />
      
      <motion.div 
        className="absolute rounded-full w-[450px] h-[450px] border-2 border-dashed border-gray-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      />
      
      {/* Step buttons positioned in a circle */}
      <StepButton
        title="CREATE ACCOUNT"
        description="Sign up to join our healthcare community"
        icon={<span className="text-2xl">1</span>}
        to="/signup"
        rotationDeg={0}
        delay={0.5}
      />
      
      <StepButton
        title="GET VERIFIED"
        description="Complete your profile and verification"
        icon={<span className="text-2xl">2</span>}
        to="/signup"
        rotationDeg={90}
        delay={0.7}
      />
      
      <StepButton
        title="BROWSE"
        description="Explore opportunities that match your skills"
        icon={<span className="text-2xl">3</span>}
        to="/jobs"
        rotationDeg={180}
        delay={0.9}
      />
      
      <StepButton
        title="CONNECT"
        description="Join discussions and grow your network"
        icon={<span className="text-2xl">4</span>}
        to="/community"
        rotationDeg={270}
        delay={1.1}
      />
    </div>
  );
};

export default InteractiveHowItWorks;
