
import React from "react";
import Footer from "../Footer";

const FooterStory = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Footer Component</h1>
      <p className="mb-8">This component provides site-wide links and contact information at the bottom of the page.</p>
      
      <div className="border border-gray-300 rounded-lg bg-gray-50">
        <Footer />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Props</h2>
        <p>
          The Footer component doesn't accept any props. It contains static content with links and contact information.
        </p>
        
        <h2 className="text-xl font-bold mt-4 mb-2">Features</h2>
        <ul className="list-disc pl-5">
          <li>Responsive multi-column layout</li>
          <li>Social media links</li>
          <li>Site navigation links organized by category</li>
          <li>Contact information with icon indicators</li>
          <li>Copyright and legal links</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterStory;
