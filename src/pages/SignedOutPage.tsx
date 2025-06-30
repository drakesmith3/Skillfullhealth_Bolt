import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, LogIn, Loader2 } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext'; // Add useAuth import

const SignedOutPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { signOut, loading, user } = useAuth(); // Use Supabase auth
  const [signingOut, setSigningOut] = useState(true);

  useEffect(() => {
    const performSignOut = async () => {
      try {
        // Sign out from Supabase
        await signOut();

        // Clear any remaining localStorage items
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('profileCompleted');
        sessionStorage.clear();

        setSigningOut(false);
      } catch (error) {
        console.error('Error signing out:', error);
        // Still clear localStorage even if Supabase signout fails
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('profileCompleted');
        sessionStorage.clear();
        setSigningOut(false);
      }
    };

    // Only perform sign out if user is still authenticated
    if (user) {
      performSignOut();
    } else {
      // If no user, just clear localStorage and show success
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      localStorage.removeItem('profileCompleted');
      sessionStorage.clear();
      setSigningOut(false);
    }
  }, [signOut, user]);

  // Show loading state while signing out
  if (signingOut || loading) {
    return (
      <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <PreHeader currentPage="Signing Out" />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-8">
          <Loader2 className="w-16 h-16 text-blue-500 mb-6 animate-spin" />
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            SIGNING OUT...
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Please wait while we securely sign you out of your account.
          </p>
        </main>
        <Footer isActive={false} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PreHeader currentPage="Signed Out" />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
          YOU HAVE SUCCESSFULLY SIGNED OUT
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Thank you for using GLOHSEN. You can navigate to other parts of the platform using the links below.
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

        {/* Optional: Add a card with sign out confirmation details */}
        <Card className="mt-8 max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Secure Sign Out Complete</h3>
              <p className="text-sm text-gray-600">
                Your session has been terminated and all authentication tokens have been cleared.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer isActive={false} />
    </div>
  );
};

export default SignedOutPage;
