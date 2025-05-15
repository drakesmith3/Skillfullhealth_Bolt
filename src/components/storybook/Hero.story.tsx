
import React from "react";
import Hero from "../Hero";

const HeroStory = () => {
  return (
    <div className="p-8 font-montserrat">
      <h1 className="text-3xl font-bold mb-4 font-playfair text-brand-black">Hero Component</h1>
      <p className="mb-8 text-gray-700">
        This is the main hero section with the GLOHSEN Score prompt. It features professional typography, brand colors, 
        and smooth animations.
      </p>
      
      <div className="border border-gray-300 rounded-lg min-h-[650px] flex items-center justify-center bg-gray-50 overflow-hidden">
        <Hero />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 font-playfair">Props</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4">Prop</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Default</th>
                <th className="py-2 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 font-medium">isVisible</td>
                <td className="py-2 px-4">boolean</td>
                <td className="py-2 px-4">true</td>
                <td className="py-2 px-4">Controls whether the hero section should be visible and animate in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeroStory;
