
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, LogIn } from "lucide-react";

const SignedOutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileCompleted');
    sessionStorage.clear();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Successfully Signed Out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for using GLOHSEN. You have been successfully signed out of your account.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
            
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In Again
            </Button>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We hope to see you again soon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignedOutPage;
