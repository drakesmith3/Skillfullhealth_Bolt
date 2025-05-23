import React from 'react';
import { Link } from "react-router-dom";

/**
 * PreheaderHomepage - A navigation component specifically for the homepage
 * This component sits outside the horizontal scrolling mechanism to ensure
 * navigation links are always accessible
 */
const PreheaderHomepage: React.FC = () => {
  const goldButtonClasses = "bg-[#F9D75D] text-black px-5 py-2.5 rounded-md font-semibold hover:bg-[#ea384c] hover:text-white transform hover:-translate-y-1 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl text-sm";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Logo */}
      <Link to="/" aria-label="GLOHSEN Home">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 via-teal-400 to-blue-600 rounded-full animate-spin-slow shadow-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">G</span>
        </div>
      </Link>
      
      {/* Navigation Buttons */}
      <nav className="space-x-3 md:space-x-4">        <Link to="/about-us" className={goldButtonClasses}>ABOUT US</Link>
        <Link to="/login" className={goldButtonClasses}>SIGN IN</Link>
        <Link to="/signup" className={goldButtonClasses}>SIGN UP</Link>
        <Link to="/feedback" className={goldButtonClasses}>LEAVE FEEDBACK</Link>
      </nav>
    </div>
  );
};

export default PreheaderHomepage;
