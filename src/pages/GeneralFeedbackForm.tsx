import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, Star, ArrowRight, Check, Info } from "lucide-react";
import QRCode from 'react-qr-code';

const FeedbackForm: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<string>("positive");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('facilities');
  
  // Add state for selected options and custom inputs
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [selectedTutor, setSelectedTutor] = useState<string>("");
  const [customProfessionalName, setCustomProfessionalName] = useState<string>("");
  const [customFacilityName, setCustomFacilityName] = useState<string>("");
  const [customTutorName, setCustomTutorName] = useState<string>("");
  
  const hospitalOptions = [
    { value: "hospital-y", label: "Hospital Y" },
    { value: "medical-center-z", label: "Medical Center Z" },
    { value: "clinic-a", label: "Clinic A" },
    { value: "community-hospital", label: "Community Hospital" },
    { value: "private-practice", label: "Private Practice" },
    { value: "other", label: "Other (specify)" }
  ];
  
  const professionalOptions = [
    { value: "dr-johnson", label: "Dr. Sarah Johnson" },
    { value: "dr-chen", label: "Dr. Michael Chen" },
    { value: "dr-patel", label: "Dr. Aisha Patel" },
    { value: "dr-smith", label: "Dr. Robert Smith" },
    { value: "dr-lopez", label: "Dr. Maria Lopez" },
    { value: "other", label: "Other (specify)" }
  ];
  
  const tutorOptions = [
    { value: "prof-wilson", label: "Prof. James Wilson" },
    { value: "dr-taylor", label: "Dr. Elizabeth Taylor" },
    { value: "mr-brown", label: "Mr. Robert Brown" },
    { value: "mrs-davis", label: "Mrs. Jennifer Davis" },
    { value: "prof-adams", label: "Prof. David Adams" },
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

  // Mock recent feedback data
  const mockRecentFeedback = [
    {
      id: 1,
      initials: "SJ",
      name: "Central Hospital",
      verified: true,
      timeAgo: "10 minutes ago",
      type: "facilities",
      comment: "Excellent care and attention to detail. Would highly recommend.",
      rating: 5,
      likes: 39
    },
    {
      id: 2,
      initials: "ML",
      name: "Riverside Medical Center",
      verified: true,
      timeAgo: "1 hour ago",
      type: "facilities",
      comment: "Very professional and thorough. Made me feel comfortable throughout the process.",
      rating: 3,
      likes: 27
    },
    {
      id: 3,
      initials: "JD",
      name: "Metropolitan Clinic",
      verified: true,
      timeAgo: "2 hours ago",
      type: "facilities",
      comment: "Great experience overall. The staff was friendly and knowledgeable.",
      rating: 3,
      likes: 13
    },
    {
      id: 4,
      initials: "AW",
      name: "Oakwood Health",
      verified: false,
      timeAgo: "3 hours ago",
      type: "facilities",
      comment: "Impressed with the level of expertise and care provided.",
      rating: 3,
      likes: 21
    },
    {
      id: 5,
      initials: "RK",
      name: "Sunrise Medical Group",
      verified: false,
      timeAgo: "4 hours ago",
      type: "facilities",
      comment: "Could improve on wait times, but the service itself was good.",
      rating: 3,
      likes: 45
    }
  ];
  
  useEffect(() => {
    // Initialize feedback list
    setFeedbackList(mockRecentFeedback);
  }, []);
  
  const fetchMoreFeedback = () => {
    // Simulate API call to fetch more feedback
    setTimeout(() => {
      const newFeedback = [
        {
          id: 6,
          initials: "BP",
          name: "Valley Health Center",
          verified: true,
          timeAgo: "5 hours ago",
          type: "facilities",
          comment: "The doctors were very attentive and explained everything clearly.",
          rating: 4,
          likes: 33
        },
        {
          id: 7,
          initials: "TM",
          name: "Evergreen Medical",
          verified: false,
          timeAgo: "6 hours ago",
          type: "facilities",
          comment: "Good facilities but some staff could be more professional.",
          rating: 3,
          likes: 18
        },
        {
          id: 8,
          initials: "NC",
          name: "Westview Hospital",
          verified: true,
          timeAgo: "7 hours ago",
          type: "facilities",
          comment: "Incredibly clean facilities and attentive nursing staff.",
          rating: 5,
          likes: 42
        },
        {
          id: 9,
          initials: "LR",
          name: "City Medical Center",
          verified: false,
          timeAgo: "8 hours ago",
          type: "facilities",
          comment: "Long wait times but excellent care once seen.",
          rating: 3,
          likes: 24
        },
        {
          id: 10,
          initials: "KD",
          name: "Harbor Health Clinic",
          verified: true,
          timeAgo: "9 hours ago",
          type: "facilities",
          comment: "Very organized and efficient. Will definitely return.",
          rating: 4,
          likes: 36
        }
      ];
      
      setFeedbackList((prev) => [...prev, ...newFeedback]);
      
      if (feedbackList.length + newFeedback.length >= 40) {
        setHasMore(false);
      }
    }, 1000);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare form data with custom inputs if needed
    const formData = {
      tab: activeTab,
      professional: selectedProfessional === "other" ? customProfessionalName : selectedProfessional,
      facility: selectedFacility === "other" ? customFacilityName : selectedFacility,
      tutor: selectedTutor === "other" ? customTutorName : selectedTutor,
      feedbackType
    };
    
    console.log("Submitting feedback:", formData);
    
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
    // Reset form state
    setSelectedProfessional("");
    setSelectedFacility("");
    setSelectedTutor("");
    setCustomProfessionalName("");
    setCustomFacilityName("");
    setCustomTutorName("");
    setFeedbackType("positive");
  };

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "You can now share this QR code with others to collect feedback."
    });
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <PreHeader currentPage="Feedback" />
        
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
        
        <Footer isActive={false} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <PreHeader currentPage="Feedback" />
      
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
          
          <Card className="shadow-xl border-0 mb-10">
            <CardHeader className="bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Feedback</CardTitle>
              <CardDescription className="text-white opacity-90">
                Share your experience about healthcare professionals, facilities, and educational resources. 
                Your feedback helps us improve the platform for everyone.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 pb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 text-sm">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <p className="text-amber-800">
                    By submitting feedback, you agree to our <a href="#" className="underline font-medium">Privacy Policy</a> and <a href="#" className="underline font-medium">Terms of Service</a>, 
                    including the requirement to provide evidence if your feedback is disputed.
                  </p>
                </div>
              </div>
            
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="professionals" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                    Professionals
                  </TabsTrigger>
                  <TabsTrigger value="facilities" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                    Hospitals/Facilities/Pharmacy
                  </TabsTrigger>
                  <TabsTrigger value="tutors" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                    Tutors/Advisers
                  </TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  <TabsContent value="professionals" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="professional">Healthcare Professional</Label>
                        <Select 
                          required
                          value={selectedProfessional}
                          onValueChange={setSelectedProfessional}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a healthcare professional" />
                          </SelectTrigger>
                          <SelectContent>
                            {professionalOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {selectedProfessional === "other" && (
                          <div className="mt-2">
                            <Label htmlFor="customProfessionalName">Specify Healthcare Professional</Label>
                            <Input 
                              id="customProfessionalName"
                              value={customProfessionalName}
                              onChange={(e) => setCustomProfessionalName(e.target.value)}
                              placeholder="Enter healthcare professional's name"
                              required
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialty" />
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
                      
                      <RatingSection 
                        feedbackType={feedbackType} 
                        setFeedbackType={setFeedbackType} 
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="facilities" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="facility">Healthcare Facility</Label>
                        <Select 
                          required
                          value={selectedFacility}
                          onValueChange={setSelectedFacility}
                        >
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
                        
                        {selectedFacility === "other" && (
                          <div className="mt-2">
                            <Label htmlFor="customFacilityName">Specify Healthcare Facility</Label>
                            <Input 
                              id="customFacilityName"
                              value={customFacilityName}
                              onChange={(e) => setCustomFacilityName(e.target.value)}
                              placeholder="Enter healthcare facility's name"
                              required
                            />
                          </div>
                        )}
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
                      
                      <RatingSection 
                        feedbackType={feedbackType} 
                        setFeedbackType={setFeedbackType} 
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tutors" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="tutor">Tutor / Adviser</Label>
                        <Select 
                          required
                          value={selectedTutor}
                          onValueChange={setSelectedTutor}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tutor or adviser" />
                          </SelectTrigger>
                          <SelectContent>
                            {tutorOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {selectedTutor === "other" && (
                          <div className="mt-2">
                            <Label htmlFor="customTutorName">Specify Tutor / Adviser</Label>
                            <Input 
                              id="customTutorName"
                              value={customTutorName}
                              onChange={(e) => setCustomTutorName(e.target.value)}
                              placeholder="Enter tutor or adviser's name"
                              required
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="course">Course / Subject</Label>
                        <Input type="text" id="course" placeholder="Enter course or subject name" />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="courseDate">Date of Course</Label>
                        <Input type="date" id="courseDate" required />
                      </div>
                      
                      <RatingSection 
                        feedbackType={feedbackType} 
                        setFeedbackType={setFeedbackType} 
                      />
                    </div>
                  </TabsContent>
                  
                  <div className="pt-6">
                    <div className="flex justify-between items-center">
                      <Button 
                        type="submit" 
                        className="bg-red-600 hover:bg-red-700"
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
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={generateQRCode}
                        className="border-amber-500 text-amber-700 hover:bg-amber-50"
                      >
                        Generate Feedback QR Code
                      </Button>
                    </div>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="mt-16" id="recent">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageCircle className="text-red-600" />
                <span>Recent Feedback</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                  Live
                </span>
              </h2>
            </div>
            
            <InfiniteScroll
              dataLength={feedbackList.length}
              next={fetchMoreFeedback}
              hasMore={hasMore}
              loader={<p className="text-center py-4">Loading more feedback...</p>}
              endMessage={<p className="text-center py-4 text-gray-500">All feedback loaded</p>}
              className="space-y-4"
            >
              {feedbackList.map((item) => (
                <FeedbackItem key={item.id} item={item} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </main>
      
      <Footer isActive={false} />
    </div>
  );
};

// Extracted components
const RatingSection = ({ feedbackType, setFeedbackType }: { feedbackType: string, setFeedbackType: React.Dispatch<React.SetStateAction<string>> }) => (
  <>
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
        placeholder="Please share details about your experience..."
        className="min-h-[150px]"
        required
      />
    </div>
    
    <div className="space-y-3">
      <Label>Rate the following aspects of your experience:</Label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Wait Time</p>
          <StarRating />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Staff Courtesy</p>
          <StarRating />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Communication</p>
          <StarRating />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Cleanliness & Comfort</p>
          <StarRating />
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
  </>
);

const StarRating = () => {
  const [rating, setRating] = useState(0);
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`cursor-pointer ${
            star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

const FeedbackItem = ({ item }: { item: any }) => (
  <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-medium">
            {item.initials}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <span>{item.timeAgo}</span>
              <span className="mx-1">•</span>
              <span className="capitalize">{item.type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {item.verified && (
            <div className="flex items-center">
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check size={12} className="text-amber-500" />
                Verified
              </span>
            </div>
          )}
          <div className="flex ml-2">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < item.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-3">{item.comment}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600 h-8 px-2">
            <ThumbsUp size={16} className="mr-1" /> {item.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 h-8 px-2">
            <ThumbsDown size={16} className="mr-1" />
          </Button>
        </div>
        <Button 
          variant="ghost"
          size="sm" 
          className="text-red-600 hover:text-red-700 flex items-center gap-1 h-8"
        >
          <span>Join Discussion</span>
          <ArrowRight size={14} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default FeedbackForm;
