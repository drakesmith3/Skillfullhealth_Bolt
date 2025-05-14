
import React from "react";
import Feedback from "../Feedback";

const FeedbackStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Feedback Component</h1>
      <p className="mb-8">This component captures user feedback about healthcare experiences.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <Feedback />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The Feedback component doesn't accept any props currently. It's a standalone component with its own animations.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Animations</h2>
        <p>
          This component uses GSAP animations triggered on scroll to animate the character, speech bubble, and form elements.
        </p>
      </div>
    </div>
  );
};

export default FeedbackStory;
