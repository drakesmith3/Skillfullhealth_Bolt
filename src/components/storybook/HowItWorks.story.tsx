
import React from "react";
import HowItWorks from "../HowItWorks";

const HowItWorksStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">How It Works Component</h1>
      <p className="mb-8">This section explains the GLOHSEN process in three simple steps.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <HowItWorks />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The HowItWorks component doesn't accept any props currently. It's a standalone component with fixed content.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksStory;
