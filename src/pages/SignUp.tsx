
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { UserCheck, Hospital, GraduationCap, MessageCircle, User, Mail, Lock, Phone, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateUnisId, createUnisRecord } from "@/utils/UnisUtil";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for the signup form with Zod validation
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  credentials: z.string().optional(),
  facility: z.string().optional(),
  institution: z.string().optional(),
  specialty: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState<string>("professional");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      credentials: "",
      facility: "",
      institution: "",
      specialty: "",
      terms: false,
    },
  });
  
  const onSubmit = (data: SignupFormData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Generate UNIS ID for the user
        const unisId = generateUnisId(data.email, data.phone);
        
        // Create UNIS record
        const unisRecord = createUnisRecord(
          data.email,
          data.phone,
          "user-" + Math.random().toString(36).substring(2, 15), // Simulate a user ID
          userType
        );
        
        if (!unisRecord) {
          toast({
            title: "Registration error",
            description: "This email or phone is already registered in our system.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        toast({
          title: "Account created successfully",
          description: "Welcome to the GLOHSEN community!",
        });
        
        // Reset the form
        reset();
        
        // Redirect to dashboard based on user type (simulate login)
        setTimeout(() => {
          navigate(`/dashboard/${userType}`);
        }, 1500);
      } catch (error) {
        console.error("Signup error:", error);
        toast({
          title: "Something went wrong",
          description: "An error occurred during the registration process. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              Join the GLOHSEN Community
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
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
                
                {/* Sign up form for all user types */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                          {...register("firstName")}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                          {...register("lastName")}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
                          className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                          {...register("password")}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                          {...register("confirmPassword")}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Role-specific fields */}
                  <TabsContent value="professional">
                    <div className="space-y-2">
                      <Label htmlFor="credentials">Professional Credentials</Label>
                      <div className="relative">
                        <FileCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="credentials"
                          placeholder="E.g., MD, RN, PT, etc."
                          className="pl-10"
                          {...register("credentials")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="employer">
                    <div className="space-y-2">
                      <Label htmlFor="facility">Facility Name</Label>
                      <div className="relative">
                        <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="facility"
                          placeholder="Enter your healthcare facility name"
                          className="pl-10"
                          {...register("facility")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="student">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Educational Institution</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="institution"
                          placeholder="Enter your school or university"
                          className="pl-10"
                          {...register("institution")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tutor">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Teaching Specialty</Label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="specialty"
                          placeholder="E.g., Nursing, Anatomy, Clinical Skills"
                          className="pl-10"
                          {...register("specialty")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      {...register("terms")} 
                    />
                    <label
                      htmlFor="terms"
                      className={`text-sm font-medium leading-none ${
                        errors.terms ? "text-red-500" : ""
                      }`}
                    >
                      I agree to the <a href="/terms-of-service" className="text-red-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-red-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating your account...
                      </>
                    ) : (
                      <>Create {userType.charAt(0).toUpperCase() + userType.slice(1)} Account</>
                    )}
                  </Button>
                </form>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account? <span className="text-red-600 font-medium hover:underline cursor-pointer">Sign in</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Why Join GLOHSEN?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Global Network</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with healthcare professionals, employers, and students from around the world.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-amber-100 dark:bg-amber-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">GLOHSEN Score</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Showcase your skills and experience with our proprietary scoring system recognized by employers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Career Growth</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access specialized courses, mentorship opportunities, and job listings tailored to your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// For the missing TrendingUp icon
const TrendingUp = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default SignUp;
