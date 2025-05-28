import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, LogIn } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme

const SignedOutPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme

  useEffect(() => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileCompleted');
    sessionStorage.clear();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PreHeader currentPage="Signed Out" />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
          YOU HAVE SUCCESSFULLY SIGNED OUT
        </h1>        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Thank you for using GLOHSEN. You can navigate to other parts of the platform using the links above or below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/"
            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            RETURN TO HOME
          </Link>
          <Link
            to="/signin"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            SIGN IN AGAIN
          </Link>
        </div>
      </main>
      <Footer isActive={false} />
    </div>
  );
};

export default SignedOutPage;
