
import React from "react";
import PageTransition from "../PageTransition";

const PageTransitionStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Page Transition Component</h1>
      <p className="mb-8">
        The PageTransition component creates a book-like page turning effect with dust particles and sound effects,
        providing an immersive storytelling experience.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-300 rounded-lg min-h-96 flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full h-64">
            <PageTransition delay={0.2} color="red-600">
              <div className="w-full h-full flex items-center justify-center">
                <h3 className="text-2xl font-medium text-gray-800">Red Theme</h3>
              </div>
            </PageTransition>
          </div>
        </div>
        
        <div className="border border-gray-300 rounded-lg min-h-96 flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full h-64">
            <PageTransition delay={0.4} color="blue-500">
              <div className="w-full h-full flex items-center justify-center">
                <h3 className="text-2xl font-medium text-gray-800">Blue Theme</h3>
              </div>
            </PageTransition>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Prop</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Default</th>
                <th className="border p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">children</td>
                <td className="border p-2">React.ReactNode</td>
                <td className="border p-2">-</td>
                <td className="border p-2">Content to display inside the page transition</td>
              </tr>
              <tr>
                <td className="border p-2">delay</td>
                <td className="border p-2">number</td>
                <td className="border p-2">0</td>
                <td className="border p-2">Delay in seconds before animation starts</td>
              </tr>
              <tr>
                <td className="border p-2">withSound</td>
                <td className="border p-2">boolean</td>
                <td className="border p-2">true</td>
                <td className="border p-2">Whether to play page turn sound effects</td>
              </tr>
              <tr>
                <td className="border p-2">color</td>
                <td className="border p-2">string</td>
                <td className="border p-2">red-600</td>
                <td className="border p-2">Tailwind color class for the page binding and dust particles</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>3D page turning animation using GSAP</li>
          <li>Dynamic dust particle effects with randomized properties</li>
          <li>Page binding effect along the left edge</li>
          <li>Content fade-in animation</li>
          <li>Realistic page turning sound effect</li>
          <li>Color theme customization</li>
          <li>Hardware-accelerated animations</li>
        </ul>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Usage</h2>
        <p>
          Wrap content in the PageTransition component to create a book-like transition effect.
          This is particularly effective when used in a scrolling narrative or storytelling application.
        </p>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
          {`<PageTransition delay={0.3} color="amber-500">
  <YourContent />
</PageTransition>`}
        </pre>
      </div>
    </div>
  );
};

export default PageTransitionStory;
