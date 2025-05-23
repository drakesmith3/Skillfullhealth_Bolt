
import React from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SignedOutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="signed-out" />
      
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-[#D4AF37]/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Successfully Signed Out
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                You have been successfully signed out of your GLOHSEN account. 
                Thank you for using our platform!
              </p>
              
              <div className="space-y-3">
                <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                  <Link to="/signin">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In Again
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Homepage
                  </Link>
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Need help? <Link to="/contact" className="text-[#D4AF37] hover:text-[#B8941F]">Contact Support</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default SignedOutPage;
