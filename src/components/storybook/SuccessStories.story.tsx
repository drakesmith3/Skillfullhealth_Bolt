
import React from "react";
import SuccessStories from "../SuccessStories";

const SuccessStoriesStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Success Stories Component</h1>
      <p className="mb-8">This component showcases testimonials from various GLOHSEN platform users.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <SuccessStories />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The SuccessStories component doesn't accept any props. It features a scrollable area of testimonial cards.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Scrollable testimonial cards using Shadcn UI ScrollArea</li>
          <li>Animated content reveal using GSAP</li>
          <li>Responsive grid layout for different screen sizes</li>
          <li>Visual testimonial cards with user images, names, roles, and ratings</li>
        </ul>
      </div>
    </div>
  );
};

export default SuccessStoriesStory;
