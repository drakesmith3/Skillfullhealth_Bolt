
import React from "react";
import ProgressIndicator from "../ProgressIndicator";

const ProgressIndicatorStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Progress Indicator Component</h1>
      <p className="mb-8">This component shows the user's current position in the story as they scroll.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-center">
            The progress indicator appears on the right side of the viewport during scrolling.<br />
            It is only visible on medium and larger screens.
          </p>
        </div>
        
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <ProgressIndicator />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The ProgressIndicator component doesn't accept any props. It automatically tracks scroll position.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Visual dots representing each section of the page</li>
          <li>Active dot highlights the current section</li>
          <li>Clickable dots for quick navigation to specific sections</li>
          <li>Responsive design that only displays on medium and larger screens</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressIndicatorStory;
