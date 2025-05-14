
import React from "react";
import JoinCommunity from "../JoinCommunity";

const JoinCommunityStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Join Community Component</h1>
      <p className="mb-8">This call-to-action section invites different healthcare stakeholders to join the GLOHSEN community.</p>
      
      <div className="border border-gray-300 rounded-lg min-h-[600px] flex items-center justify-center bg-gray-50">
        <JoinCommunity />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The JoinCommunity component doesn't accept any props. It displays different roles in the healthcare ecosystem.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Grid of role cards with icons and descriptions</li>
          <li>Visual representation of the different stakeholders in healthcare</li>
          <li>Call-to-action buttons for sign-up and learning more</li>
          <li>Responsive layout that adapts to all screen sizes</li>
        </ul>
      </div>
    </div>
  );
};

export default JoinCommunityStory;
