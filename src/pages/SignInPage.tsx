
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Globe } from "lucide-react";
import Footer from '../components/Footer';
import { type UserRole } from "@/lib/unis";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserRole>('professional');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', { ...formData, userType });
    
    // Mock authentication logic
    if (formData.email && formData.password) {
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userType);
      localStorage.setItem('userName', 'User Name'); // Mock user name
      
      // Navigate to appropriate dashboard
      navigate(`/dashboard/${userType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Simple Header */}
      <div className="w-full bg-gradient-to-r from-[#ea384c] via-[#D4AF37] to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-white animate-spin" />
            <span className="text-white text-xl font-bold">GLOHSEN</span>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#ea384c] to-[#D4AF37] bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Sign in to your GLOHSEN account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-base font-semibold">I am signing in as a</Label>
                <Select value={userType} onValueChange={(value: UserRole) => setUserType(value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="tutor">Tutor/Adviser</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-[#ea384c] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#ea384c] to-[#D4AF37] hover:from-[#d12e42] hover:to-[#B8941F] text-white font-semibold">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-base text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#ea384c] hover:underline font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default SignInPage;
