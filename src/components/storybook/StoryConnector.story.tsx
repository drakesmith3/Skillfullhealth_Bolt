
import React from "react";
import StoryConnector from "../StoryConnector";

const StoryConnectorStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Story Connector Component</h1>
      <p className="mb-8">
        The StoryConnector component creates visual connections between sections of the narrative,
        enhancing the storytelling experience with animated lines, dust particles, and optional sound effects.
      </p>
      
      <div className="border border-gray-300 rounded-lg min-h-96 flex flex-col items-center justify-center bg-gray-50 relative p-8">
        <div className="h-64 relative w-full my-8">
          <StoryConnector from="Patient X" to="Hospital Y" color="bg-red-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="h-64 relative">
            <StoryConnector from="Feedback" to="Improvement" color="bg-amber-500" />
          </div>
          <div className="h-64 relative">
            <StoryConnector from="Student" to="Skills" color="bg-blue-500" />
          </div>
          <div className="h-64 relative">
            <StoryConnector from="Start" to="Finish" color="bg-green-500" />
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
                <td className="border p-2">from</td>
                <td className="border p-2">string</td>
                <td className="border p-2">-</td>
                <td className="border p-2">Text displayed at the top of the connector</td>
              </tr>
              <tr>
                <td className="border p-2">to</td>
                <td className="border p-2">string</td>
                <td className="border p-2">-</td>
                <td className="border p-2">Text displayed at the bottom of the connector</td>
              </tr>
              <tr>
                <td className="border p-2">color</td>
                <td className="border p-2">string</td>
                <td className="border p-2">bg-red-600</td>
                <td className="border p-2">Tailwind color class for the connection line</td>
              </tr>
              <tr>
                <td className="border p-2">delay</td>
                <td className="border p-2">number</td>
                <td className="border p-2">0</td>
                <td className="border p-2">Delay in seconds before animation starts</td>
              </tr>
              <tr>
                <td className="border p-2">icon</td>
                <td className="border p-2">React.ReactNode</td>
                <td className="border p-2">BookOpen icon</td>
                <td className="border p-2">Custom icon to display in the center of the connector</td>
              </tr>
              <tr>
                <td className="border p-2">withSound</td>
                <td className="border p-2">boolean</td>
                <td className="border p-2">true</td>
                <td className="border p-2">Whether to play sound effects during animation</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Animated line growth with easing effects</li>
          <li>Central icon animation with scale effect</li>
          <li>Customizable dust particle effects</li>
          <li>Optional page-turning sound effect</li>
          <li>Intersection Observer for performance optimization</li>
          <li>Visual connection between story elements</li>
          <li>Customizable colors and timing</li>
        </ul>
      </div>
    </div>
  );
};

export default StoryConnectorStory;
