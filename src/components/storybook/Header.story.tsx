
import React from "react";
import Header from "../Header";

const HeaderStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Header Component</h1>
      <p className="mb-8">This component serves as the main navigation bar for the GLOHSEN website.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[300px] relative bg-gray-50">
        <div className="pt-20 px-4 text-center">
          <p className="text-gray-400">
            The header is fixed at the top of the viewport and changes appearance on scroll.
          </p>
        </div>
        
        <Header />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The Header component doesn't accept any props. It has internal state for scroll position and mobile menu.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Responsive navigation with mobile menu toggle</li>
          <li>Changes appearance on scroll for better visibility</li>
          <li>Smooth transitions between states</li>
          <li>Fixed positioning for consistent access</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderStory;
