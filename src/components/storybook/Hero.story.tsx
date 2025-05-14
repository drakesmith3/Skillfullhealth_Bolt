
import React from "react";
import Hero from "../Hero";

const HeroStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hero Component</h1>
      <p className="mb-8">This is the main hero section with the GLOHSEN Score prompt.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <Hero />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The Hero component doesn't accept any props currently. It's a standalone component with its own state.
        </p>
      </div>
    </div>
  );
};

export default HeroStory;
