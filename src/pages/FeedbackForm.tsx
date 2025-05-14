
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { MessageCircle, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle } from "lucide-react";

const FeedbackForm: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<string>("positive");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const hospitalOptions = [
    { value: "hospital-y", label: "Hospital Y" },
    { value: "medical-center-z", label: "Medical Center Z" },
    { value: "clinic-a", label: "Clinic A" },
    { value: "community-hospital", label: "Community Hospital" },
    { value: "private-practice", label: "Private Practice" },
    { value: "other", label: "Other (specify)" }
  ];
  
  const departmentOptions = [
    { value: "emergency", label: "Emergency" },
    { value: "primary-care", label: "Primary Care" },
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "obstetrics", label: "Obstetrics & Gynecology" },
    { value: "surgery", label: "Surgery" },
    { value: "radiology", label: "Radiology" },
    { value: "other", label: "Other" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your healthcare experience with us."
      });
    }, 1500);
  };
  
  const handleNewFeedback = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="pt-6 pb-8 flex flex-col items-center text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Thank You for Your Feedback</h2>
                <p className="text-gray-600 mb-6">
                  Your experience has been recorded and will help improve healthcare services for everyone.
                </p>
                
                <div className="space-y-8 w-full max-w-md">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">
                      Your feedback ID: <span className="font-mono font-medium">FDB-{Math.floor(Math.random() * 900000) + 100000}</span>
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={handleNewFeedback}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Submit Another Feedback
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => window.location.href = '/'}
                    >
                      Return to Home Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              Share Your Healthcare Experience
            </span>
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Your voice matters. Help improve healthcare for everyone by providing your honest feedback.
          </p>
          
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Healthcare Facility Feedback</CardTitle>
              <CardDescription>
                Tell us about your recent experience at a healthcare facility
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="facility">Healthcare Facility</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a healthcare facility" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitalOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="department">Department / Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department or service" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="visitDate">Date of Visit</Label>
                  <Input type="date" id="visitDate" required />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Overall Experience</Label>
                  <RadioGroup 
                    value={feedbackType} 
                    onValueChange={setFeedbackType}
                    className="flex space-x-4"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="positive" id="positive" />
                      <Label htmlFor="positive" className="flex items-center">
                        <ThumbsUp className="mr-1 h-4 w-4 text-green-500" />
                        Positive
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed">Mixed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="negative" id="negative" />
                      <Label htmlFor="negative" className="flex items-center">
                        <ThumbsDown className="mr-1 h-4 w-4 text-red-500" />
                        Negative
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="feedback">Describe Your Experience</Label>
                  <Textarea 
                    id="feedback" 
                    placeholder="Please share details about what happened during your visit..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Rate the following aspects of your experience:</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Wait Time</p>
                      <div className="flex items-center">
                        <span className="text-xs text-red-600">Poor</span>
                        <div className="flex-grow mx-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <span className="text-xs text-green-600">Excellent</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Staff Courtesy</p>
                      <div className="flex items-center">
                        <span className="text-xs text-red-600">Poor</span>
                        <div className="flex-grow mx-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <span className="text-xs text-green-600">Excellent</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Doctor/Provider Communication</p>
                      <div className="flex items-center">
                        <span className="text-xs text-red-600">Poor</span>
                        <div className="flex-grow mx-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <span className="text-xs text-green-600">Excellent</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Cleanliness & Comfort</p>
                      <div className="flex items-center">
                        <span className="text-xs text-red-600">Poor</span>
                        <div className="flex-grow mx-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <span className="text-xs text-green-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    For urgent medical issues or complaints that require immediate attention, 
                    please contact the healthcare facility directly. This feedback system is not monitored 24/7.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="contact" />
                  <label
                    htmlFor="contact"
                    className="text-sm font-medium leading-none"
                  >
                    I'm willing to be contacted about my feedback
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none"
                  >
                    I confirm this feedback is based on my personal experience and is truthful
                  </label>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Submitting Feedback...</>
                  ) : (
                    <>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeedbackForm;
