
import React from "react";
import GamesQuizzes from "../GamesQuizzes";

const GamesQuizzesStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Games & Quizzes Component</h1>
      <p className="mb-8">This component showcases the interactive educational games available on the GLOHSEN platform.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <GamesQuizzes />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The GamesQuizzes component doesn't accept any props. It features a carousel of educational games.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Interactive carousel using Shadcn UI components</li>
          <li>Animated content reveal using GSAP</li>
          <li>Responsive design for all screen sizes</li>
          <li>Visual game cards with play buttons, ratings, and categories</li>
        </ul>
      </div>
    </div>
  );
};

export default GamesQuizzesStory;
