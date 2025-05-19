import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, Briefcase, BookOpen, Lock, Mail, Users, HeartHandshake } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/lib/unis";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to check profile completion status
  const checkProfileCompletionStatus = (userRole: UserRole): { isComplete: boolean; completionPercentage: number } => {
    console.log(`[SignInPage] Checking profile completion for ${userRole}`);
    // Simulate that 'STUDENT' has a complete profile, others are incomplete for testing
    if (userRole === 'STUDENT') {
      return {
        isComplete: true, 
        completionPercentage: 100,
      };
    }
    return {
      isComplete: false, 
      completionPercentage: 30, // Example percentage for incomplete profiles
    };
  };

  // Generic login handler
  const handleLogin = (userRole: UserRole, roleSpecificDashboardPath: string) => {
    setIsLoading(true);
    console.log(`[SignInPage] Attempting login for role: ${userRole}`);
    
    // Simulate API call for login
    setTimeout(() => {
      setIsLoading(false);
      console.log(`[SignInPage] Mock login successful for ${userRole}`);
      
      const profileStatus = checkProfileCompletionStatus(userRole);
      
      toast({
        title: "Login successful",
        description: `Welcome back to GLOHSEN ${userRole.charAt(0) + userRole.slice(1).toLowerCase()} Portal`,
      });
      
      if (!profileStatus.isComplete) {
        console.log(`[SignInPage] Profile incomplete for ${userRole}. Redirecting to profile completion.`);
        sessionStorage.setItem('redirectToProfileCompletion', 'true');
        sessionStorage.setItem('userRole', userRole);
        
        navigate('/profile-completion', { 
          state: { 
            userRole: userRole,
            isNewUser: false, // For sign-in, isNewUser is false
            completionPercentage: profileStatus.completionPercentage
          } 
        });
      } else {
        console.log(`[SignInPage] Profile complete for ${userRole}. Redirecting to dashboard: ${roleSpecificDashboardPath}`);
        sessionStorage.removeItem('redirectToProfileCompletion');
        sessionStorage.removeItem('userRole');
        navigate(roleSpecificDashboardPath);
      }
    }, 1500);
  };

  // Specific event handlers for each form, calling the generic handleLogin
  const handleProfessionalLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('PROFESSIONAL', '/dashboard/professional');
  };
  const handleEmployerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('EMPLOYER', '/dashboard/employer');
  };
  const handleTutorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('TUTOR', '/dashboard/tutor');
  };
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('STUDENT', '/dashboard/student');
  };
  const handleClientLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('CLIENT', '/dashboard/client'); // Ensure '/dashboard/client' is a valid route or adjust as needed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <span className="font-bold text-2xl text-d4af37">GLOHSEN</span>
      </Link>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Access your GLOHSEN account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="professional" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="professional" className="flex flex-col items-center py-2 gap-1">
                <UserCheck size={18} />
                <span className="text-xs">Professional</span>
              </TabsTrigger>
              <TabsTrigger value="employer" className="flex flex-col items-center py-2 gap-1">
                <Briefcase size={18} />
                <span className="text-xs">Employer</span>
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex flex-col items-center py-2 gap-1">
                <BookOpen size={18} />
                <span className="text-xs">Tutor</span>
              </TabsTrigger>
              <TabsTrigger value="student" className="flex flex-col items-center py-2 gap-1">
                <Users size={18} />
                <span className="text-xs">Student</span>
              </TabsTrigger>
              <TabsTrigger value="client" className="flex flex-col items-center py-2 gap-1">
                <HeartHandshake size={18} />
                <span className="text-xs">Client</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="professional">
              <form onSubmit={handleProfessionalLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pro-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="pro-email" placeholder="you@example.com" type="email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="pro-password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-d4af37 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="pro-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="enable-2fa-pro" />
                  <Label htmlFor="enable-2fa-pro" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Healthcare Professional"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="employer">
              <form onSubmit={handleEmployerLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emp-email">Company Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="emp-email" placeholder="company@example.com" type="email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="emp-password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-d4af37 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="emp-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="enable-2fa-emp" />
                  <Label htmlFor="enable-2fa-emp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Employer"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="tutor">
              <form onSubmit={handleTutorLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tutor-email">Academic Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="tutor-email" placeholder="tutor@university.edu" type="email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="tutor-password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-d4af37 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="tutor-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="enable-2fa-tutor" />
                  <Label htmlFor="enable-2fa-tutor" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Tutor/Adviser"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="student">
              <form onSubmit={handleStudentLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="student-email" placeholder="you@example.com" type="email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-d4af37 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="student-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="enable-2fa-student" />
                  <Label htmlFor="enable-2fa-student" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Student"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="client">
              <form onSubmit={handleClientLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="client-email" placeholder="you@example.com" type="email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="client-password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-d4af37 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="client-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="enable-2fa-client" />
                  <Label htmlFor="enable-2fa-client" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In as Client"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center w-full text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-d4af37 hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
