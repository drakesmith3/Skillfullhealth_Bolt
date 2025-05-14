
import React from "react";
import PageTransition from "../PageTransition";

const PageTransitionStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Page Transition Component</h1>
      <p className="mb-8">This component creates a book-like page turning effect for content.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl h-96">
          <PageTransition>
            <div className="p-8 h-full flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800">Sample Content</h2>
            </div>
          </PageTransition>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The PageTransition component accepts:
        </p>
        <ul className="list-disc pl-5">
          <li><code>children</code>: React.ReactNode - The content to be displayed with the page transition effect</li>
        </ul>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Book-like page rotation effect using GSAP</li>
          <li>Dust particle animations for added realism</li>
          <li>3D perspective transformation</li>
          <li>Shadow effects for depth</li>
        </ul>
      </div>
    </div>
  );
};

export default PageTransitionStory;
