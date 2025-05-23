import React from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const SignedOutPage: React.FC = () => {
  const location = useLocation();
  // Assuming a default user or ability to fetch basic info if needed for PreHeader/Footer
  // For simplicity, using a generic approach or you might pass state via navigation
  const userName = location.state?.userName || "Guest"; 

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="Signed Out" userName={userName} />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          YOU HAVE SUCCESSFULLY SIGNED OUT
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Thank you for using GLOHSEN. You can use the links above or below to navigate to other parts of the platform.
        </p>
      </div>
      <Footer isActive={false} />
    </div>
  );
};

export default SignedOutPage;
