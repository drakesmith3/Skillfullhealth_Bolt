
import React from "react";
import Employers from "../Employers";

const EmployersStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employers Component</h1>
      <p className="mb-8">This section highlights the benefits of GLOHSEN for healthcare employers.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <Employers />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The Employers component doesn't accept any props. It uses GSAP animations triggered by scroll events.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Animated content reveal using GSAP</li>
          <li>Responsive layout for all device sizes</li>
          <li>Visual storytelling through Hospital Y example</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployersStory;
