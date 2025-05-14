
import React from "react";
import TutorsAdvisers from "../TutorsAdvisers";

const TutorsAdvisersStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tutors & Advisers Component</h1>
      <p className="mb-8">This component showcases the relationship between tutors and students on the GLOHSEN platform.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <TutorsAdvisers />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The TutorsAdvisers component doesn't accept any props. It uses GSAP animations triggered by scroll events.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Visual representation of the tutor-student relationship</li>
          <li>Animated connection arrow demonstrating the link between stakeholders</li>
          <li>Real testimonial from the student about their learning experience</li>
        </ul>
      </div>
    </div>
  );
};

export default TutorsAdvisersStory;
