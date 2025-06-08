
import React from "react";
import HeaderWithParticles from "../HeaderWithParticles";

const HeaderStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Header With Particles Component</h1>
      <p className="mb-8">This component serves as the main hero section with particle animations for the GLOHSEN website.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] relative bg-gray-50 overflow-hidden">
        <HeaderWithParticles isActive={true} />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <ul className="list-disc pl-5">
          <li><strong>isActive:</strong> boolean - Controls visibility of header content</li>
          <li><strong>scrollToSection:</strong> function - Optional callback for section navigation</li>
          <li><strong>playClickSound:</strong> function - Optional sound effect handler</li>
        </ul>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Animated particle butterfly formation on the left side</li>
          <li>Interactive dust particles covering the entire viewport</li>
          <li>Golden animated text with shine effects</li>
          <li>Responsive navigation with modern design</li>
          <li>Black background with particle effects</li>
          <li>Mouse interaction with particle system</li>
          <li>Performance optimized particle animations</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderStory;
