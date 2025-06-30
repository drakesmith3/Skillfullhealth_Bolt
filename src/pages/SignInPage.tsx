import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Footer from '../components/Footer';
import { type UserRole } from "@/lib/unis";
import PreHeader from '@/components/PreHeader';
import { useAuth } from '../contexts/AuthContext';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, loading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserRole>('professional');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const userRole = user.user_metadata?.user_type || 'professional';
      navigate(`/dashboard/${userRole}`);
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { user: authUser, error: authError } = await signIn({
        email: formData.email,
        password: formData.password
      });

      if (authError) {
        setError(authError.message);
      } else if (authUser) {
        // Get user type from metadata, fallback to selected userType
        const userRole = authUser.user_metadata?.user_type || userType;

        // Optional: Update user metadata if it doesn't exist
        if (!authUser.user_metadata?.user_type) {
          // You might want to update the user's metadata here
          console.log('User type not set in metadata, using:', userType);
        }

        // Navigate to appropriate dashboard
        navigate(`/dashboard/${userRole}`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', err);
    }
  };

  return (
    <>
      <PreHeader />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
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
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

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
                    disabled={loading}
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
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
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

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#ea384c] to-[#D4AF37] hover:from-[#d12e42] hover:to-[#B8941F] text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
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
    </>
  );
};

export default SignInPage;
