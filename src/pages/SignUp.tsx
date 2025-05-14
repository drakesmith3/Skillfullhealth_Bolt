
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { UserCheck, Hospital, GraduationCap, MessageCircle, User } from "lucide-react";

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState<string>("professional");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Thank you for joining the GLOHSEN community!"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              Join the GLOHSEN Community
            </span>
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Create your account to access personalized features and connect with the global healthcare network
          </p>
          
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
              <CardDescription className="text-center">
                Select your primary role to customize your experience
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="professional" className="w-full" onValueChange={setUserType}>
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                  <TabsTrigger value="professional" className="flex flex-col items-center gap-1 py-3">
                    <UserCheck className="h-5 w-5" />
                    <span>Professional</span>
                  </TabsTrigger>
                  <TabsTrigger value="employer" className="flex flex-col items-center gap-1 py-3">
                    <Hospital className="h-5 w-5" />
                    <span>Employer</span>
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex flex-col items-center gap-1 py-3">
                    <GraduationCap className="h-5 w-5" />
                    <span>Student</span>
                  </TabsTrigger>
                  <TabsTrigger value="tutor" className="flex flex-col items-center gap-1 py-3">
                    <MessageCircle className="h-5 w-5" />
                    <span>Tutor</span>
                  </TabsTrigger>
                  <TabsTrigger value="patient" className="flex flex-col items-center gap-1 py-3">
                    <User className="h-5 w-5" />
                    <span>Patient</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Sign up form - same for all user types with minor differences */}
                {["professional", "employer", "student", "tutor", "patient"].map((type) => (
                  <TabsContent key={type} value={type}>
                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
                          required
                        />
                      </div>
                      
                      {type === "professional" && (
                        <div className="space-y-2">
                          <Label htmlFor="credentials">Professional Credentials</Label>
                          <Input
                            id="credentials"
                            placeholder="E.g., MD, RN, PT, etc."
                          />
                        </div>
                      )}
                      
                      {type === "employer" && (
                        <div className="space-y-2">
                          <Label htmlFor="facility">Facility Name</Label>
                          <Input
                            id="facility"
                            placeholder="Enter your healthcare facility name"
                          />
                        </div>
                      )}
                      
                      {type === "student" && (
                        <div className="space-y-2">
                          <Label htmlFor="institution">Educational Institution</Label>
                          <Input
                            id="institution"
                            placeholder="Enter your school or university"
                          />
                        </div>
                      )}
                      
                      {type === "tutor" && (
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Teaching Specialty</Label>
                          <Input
                            id="specialty"
                            placeholder="E.g., Nursing, Anatomy, Clinical Skills"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the Terms of Service and Privacy Policy
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>Creating your account...</>
                        ) : (
                          <>Create {userType === "professional" ? "Professional" : 
                               userType === "employer" ? "Employer" : 
                               userType === "student" ? "Student" : 
                               userType === "tutor" ? "Tutor" : "Patient"} Account</>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account? <a href="#" className="text-red-600 font-medium hover:underline">Sign in</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
