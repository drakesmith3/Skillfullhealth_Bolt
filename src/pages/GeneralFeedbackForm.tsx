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
import { MessageCircle, ThumbsUp, ThumbsDown, CheckCircle2, AlertTriangle, Star, ArrowRight, Check, Info, X, Menu, HelpCircle } from "lucide-react";
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

  // Occupational Health & Safety state
  const [safetyFeedbackType, setSafetyFeedbackType] = useState<string>("general");
  const [rootCauseOpened, setRootCauseOpened] = useState<boolean>(false);
  const [incidentDescription, setIncidentDescription] = useState<string>("");
  const [companyResponse, setCompanyResponse] = useState<string>("");
  const [generalDescription, setGeneralDescription] = useState<string>("");
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  
  // Image upload states for all tabs
  const [professionalEvidenceFiles, setProfessionalEvidenceFiles] = useState<File[]>([]);
  const [facilityEvidenceFiles, setFacilityEvidenceFiles] = useState<File[]>([]);
  const [tutorEvidenceFiles, setTutorEvidenceFiles] = useState<File[]>([]);
  
  // OHS additional states to match other tabs
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>("");
  const [customWorkplaceName, setCustomWorkplaceName] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [incidentDate, setIncidentDate] = useState<string>("");
    // Walkthrough state
  const [showWalkthrough, setShowWalkthrough] = useState<boolean>(false);
  const [walkthroughStep, setWalkthroughStep] = useState<number>(0);
  const [walkthroughPosition, setWalkthroughPosition] = useState<any>({ top: 0, left: 0 });
  const [highlightUpdate, setHighlightUpdate] = useState<number>(0); // Force highlight re-render
    // Check if user is first time visitor
  useEffect(() => {
    const hasVisited = localStorage.getItem('feedback-form-visited');
    if (!hasVisited) {
      // Delay showing walkthrough to ensure elements are rendered
      setTimeout(() => {
        setShowWalkthrough(true);
        const initialPosition = getTooltipPosition();
        setWalkthroughPosition(initialPosition);
      }, 1000);
      localStorage.setItem('feedback-form-visited', 'true');
    }
  }, []);
  
  const workplaceOptions = [
    { value: "factory-a", label: "Manufacturing Plant A" },
    { value: "warehouse-b", label: "Distribution Center B" },
    { value: "office-c", label: "Corporate Office C" },
    { value: "construction-d", label: "Construction Site D" },
    { value: "laboratory-e", label: "Research Laboratory E" },
    { value: "other", label: "Other (specify)" }
  ];
  
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
      const currentMaxId = Math.max(...feedbackList.map(item => item.id));
      const newFeedback = [
        {
          id: currentMaxId + 1,
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
          id: currentMaxId + 2,
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
          id: currentMaxId + 3,
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
          id: currentMaxId + 4,
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
          id: currentMaxId + 5,
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
    const formData: any = {
      tab: activeTab,
      professional: selectedProfessional === "other" ? customProfessionalName : selectedProfessional,
      facility: selectedFacility === "other" ? customFacilityName : selectedFacility,
      tutor: selectedTutor === "other" ? customTutorName : selectedTutor,
      feedbackType
    };
    
    // Include OHS-specific fields and evidence files based on active tab
    if (activeTab === "professionals") {
      formData.evidenceFiles = professionalEvidenceFiles;
    } else if (activeTab === "facilities") {
      formData.evidenceFiles = facilityEvidenceFiles;
    } else if (activeTab === "tutors") {
      formData.evidenceFiles = tutorEvidenceFiles;
    } else if (activeTab === "factory") {
      formData.safetyType = safetyFeedbackType;
      formData.workplace = selectedWorkplace === "other" ? customWorkplaceName : selectedWorkplace;
      formData.department = selectedDepartment;
      formData.incidentDate = incidentDate;
      if (safetyFeedbackType === "general") {
        formData.generalDescription = generalDescription;
      } else {
        formData.incidentDescription = incidentDescription;
        formData.investigationOpened = rootCauseOpened;
        formData.companyResponse = companyResponse;
      }
      formData.evidenceFiles = evidenceFiles;
    }

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
    setSafetyFeedbackType("general");
    setRootCauseOpened(false);
    setIncidentDescription("");
    setCompanyResponse("");
    setGeneralDescription("");
    setEvidenceFiles([]);
    setProfessionalEvidenceFiles([]);
    setFacilityEvidenceFiles([]);
    setTutorEvidenceFiles([]);
    setSelectedWorkplace("");
    setCustomWorkplaceName("");
    setSelectedDepartment("");
    setIncidentDate("");
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
    // Walkthrough steps
  const walkthroughSteps = [
    {
      target: '[data-walkthrough="tabs"]',
      content: "Choose the appropriate feedback category. Each tab is designed for different types of feedback.",
      title: "Step 1: Select Feedback Type",
      position: "bottom"
    },
    {
      target: '[data-walkthrough="form-fields"]',
      content: "Fill in the required information. All fields marked with * are mandatory.",
      title: "Step 2: Complete Form Fields",
      position: "right"
    },    {
      target: '[data-walkthrough="evidence"]',
      content: "Upload any supporting evidence or images related to your feedback. Each feedback type has its own evidence section.",
      title: "Step 3: Add Evidence (Optional)",
      position: "left"
    },
    {
      target: '[data-walkthrough="rating"]',
      content: "Rate your overall experience and provide detailed feedback.",
      title: "Step 4: Rate Your Experience",
      position: "top"
    },
    {
      target: '[data-walkthrough="submit"]',
      content: "Review your information and submit your feedback. You'll receive a confirmation ID.",
      title: "Step 5: Submit Feedback",
      position: "top"
    }
  ];  const getTargetElement = () => {
    const currentStep = walkthroughSteps[walkthroughStep];
    if (!currentStep) return null;

    const targetSelector = currentStep.target;

    if (targetSelector === '[data-walkthrough="evidence"]') {
      // For the evidence step, we need to find the control in the active tab.
      
      // Strategy 1: Use the `activeTab` state to build a precise selector.
      const preciseSelector = `[data-walkthrough="evidence"][data-walkthrough-tab="${activeTab}"]`;
      const element = document.querySelector(preciseSelector);
      if (element) {
        return element;
      }

      // Strategy 2: If the first fails (e.g., state update delay), find the active tab panel in the DOM
      // and then find the evidence control inside it. This is more resilient.
      const activeTabPanel = document.querySelector('[role="tabpanel"][data-state="active"]');
      if (activeTabPanel) {
        const evidenceInSection = activeTabPanel.querySelector('[data-walkthrough="evidence"]');
        if (evidenceInSection) {
          return evidenceInSection;
        }
      }

      // Strategy 3: As a last resort, just find the first matching element.
      return document.querySelector(targetSelector);
    }
    
    return document.querySelector(targetSelector);
  };  const getTooltipPosition = () => {
    const targetElement = getTargetElement();
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const rect = targetElement.getBoundingClientRect();
    const currentStep = walkthroughSteps[walkthroughStep];
    
    // Account for scroll position and viewport
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Mobile-specific adjustments
    const isMobile = viewportWidth < 640; // sm breakpoint
    const tooltipWidth = isMobile ? 280 : 320;
    const tooltipHeight = isMobile ? 180 : 200;
    const margin = isMobile ? 8 : 20;
    
    let position: { top?: number | string; left?: number | string; transform?: string } = {};
    
    // On mobile, always position tooltip at bottom center for better UX
    if (isMobile) {
      position = {
        top: rect.bottom + margin,
        left: '50%',
        transform: 'translateX(-50%)'
      };
    } else {
      switch (currentStep.position) {
        case 'bottom':
          position = {
            top: rect.bottom + margin,
            left: rect.left + rect.width / 2,
            transform: 'translateX(-50%)'
          };
          break;
        case 'top':
          position = {
            top: rect.top - margin,
            left: rect.left + rect.width / 2,
            transform: 'translate(-50%, -100%)'
          };
          break;
        case 'left':
          position = {
            top: rect.top + rect.height / 2,
            left: rect.left - margin,
            transform: 'translate(-100%, -50%)'
          };
          break;
        case 'right':
          position = {
            top: rect.top + rect.height / 2,
            left: rect.right + margin,
            transform: 'translateY(-50%)'
          };
          break;
        default:
          position = {
            top: rect.bottom + margin,
            left: rect.left + rect.width / 2,
            transform: 'translateX(-50%)'
          };
      }
    }
    
    // Ensure tooltip stays within viewport bounds
    if (typeof position.left === 'number') {
      if (position.left < tooltipWidth / 2) {
        position.left = tooltipWidth / 2;
        position.transform = 'translateX(-50%)';
      } else if (position.left > viewportWidth - tooltipWidth / 2) {
        position.left = viewportWidth - tooltipWidth / 2;
        position.transform = 'translateX(-50%)';
      }
    }
    
    if (typeof position.top === 'number') {
      if (position.top < margin) {
        position.top = margin;
      } else if (position.top > viewportHeight - tooltipHeight - margin) {
        position.top = viewportHeight - tooltipHeight - margin;
      }
    }
    
    return position;
  };
  const nextWalkthroughStep = () => {
    if (walkthroughStep < walkthroughSteps.length - 1) {
      const nextStep = walkthroughStep + 1;
      setWalkthroughStep(nextStep);
      
      // Scroll to the next target element
      setTimeout(() => {
        const targetElement = getTargetElement();
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      setShowWalkthrough(false);
    }
  };

  const skipWalkthrough = () => {
    setShowWalkthrough(false);
  };
  // Scroll to current target when walkthrough step changes
  useEffect(() => {
    if (showWalkthrough) {
      const targetElement = getTargetElement();
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Update position after scrolling
        setTimeout(() => {
          const newPosition = getTooltipPosition();
          setWalkthroughPosition(newPosition);
        }, 500);
      }
    }
  }, [walkthroughStep, showWalkthrough]);  // Update position on window resize and scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      if (showWalkthrough) {
        const newPosition = getTooltipPosition();
        setWalkthroughPosition(newPosition);
      }
    };    const handleScroll = () => {
      if (showWalkthrough) {
        // Debounce scroll updates to improve performance
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const newPosition = getTooltipPosition();
          setWalkthroughPosition(newPosition);
          setHighlightUpdate(prev => prev + 1); // Force highlight re-render
        }, 10); // Small delay to debounce rapid scroll events
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true); // Use capture to catch scroll events on all elements
    document.addEventListener('scroll', handleScroll, true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [showWalkthrough, walkthroughStep]);  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Tutorial FAB - Only visible on mobile */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <Button
          onClick={() => {
            setShowWalkthrough(true);
            setWalkthroughStep(0);
            setTimeout(() => {
              const initialPosition = getTooltipPosition();
              setWalkthroughPosition(initialPosition);
            }, 100);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="sm"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Walkthrough Overlay */}
      {showWalkthrough && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={skipWalkthrough} />
          
          {/* Spotlight effect on target element */}
          <div 
            className="fixed inset-0 z-45 pointer-events-none"
            style={{
              boxShadow: getTargetElement() ? 
                `0 0 0 4px rgba(239, 68, 68, 0.5), 0 0 0 8px rgba(239, 68, 68, 0.25)` : 
                'none'
            }}
          />          {/* Tooltip - Mobile Responsive */}
          <div 
            className="fixed z-50 bg-white rounded-lg shadow-xl border-2 border-red-500 mx-2 sm:mx-0 max-w-xs sm:max-w-sm"
            style={walkthroughPosition}
          >
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight pr-2">
                  {walkthroughSteps[walkthroughStep].title}
                </h3>
                <Button variant="ghost" size="sm" onClick={skipWalkthrough} className="h-6 w-6 p-0 flex-shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                {walkthroughSteps[walkthroughStep].content}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {walkthroughSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        index === walkthroughStep ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="space-x-1 sm:space-x-2 flex">
                  <Button variant="outline" size="sm" onClick={skipWalkthrough} className="text-xs px-2 py-1">
                    Skip
                  </Button>
                  <Button size="sm" onClick={nextWalkthroughStep} className="bg-red-600 hover:bg-red-700 text-xs px-2 py-1">
                    {walkthroughStep === walkthroughSteps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Arrow pointing to target */}
            <div 
              className="absolute w-3 h-3 bg-white border-red-500 transform rotate-45"
              style={{
                ...(() => {
                  const position = walkthroughSteps[walkthroughStep].position;
                  switch (position) {
                    case 'bottom':
                      return { top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderTop: '2px solid', borderLeft: '2px solid' };
                    case 'top':
                      return { bottom: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderBottom: '2px solid', borderRight: '2px solid' };
                    case 'left':
                      return { top: '50%', right: '-6px', transform: 'translateY(-50%) rotate(45deg)', borderTop: '2px solid', borderRight: '2px solid' };
                    case 'right':
                      return { top: '50%', left: '-6px', transform: 'translateY(-50%) rotate(45deg)', borderBottom: '2px solid', borderLeft: '2px solid' };
                    default:
                      return { top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderTop: '2px solid', borderLeft: '2px solid' };
                  }
                })()
              }}
            />
          </div>          {/* Highlight target element */}
          {getTargetElement() && (
            <div 
              key={`highlight-${highlightUpdate}`} // Force re-render on scroll
              className="fixed z-45 border-4 border-red-500 rounded-lg pointer-events-none animate-pulse"
              style={(() => {
                const element = getTargetElement();
                if (!element) return {};
                const rect = element.getBoundingClientRect();
                return {
                  top: rect.top - 4,
                  left: rect.left - 4,
                  width: rect.width + 8,
                  height: rect.height + 8,
                };
              })()}
            />
          )}
        </>
      )}      <PreHeader currentPage="Feedback" />
      
      <main className="flex-grow pt-20 sm:pt-32 pb-8 sm:pb-16 px-2 sm:px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center leading-tight">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              Share Your Healthcare Experience
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-700 text-center mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Your voice matters. Help improve healthcare for everyone by providing your honest feedback.
          </p>
            <Card className="shadow-xl border-0 mb-6 sm:mb-10">
            <CardHeader className="bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-t-lg p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl leading-tight">Feedback</CardTitle>
              <CardDescription className="text-white opacity-90 text-sm sm:text-base leading-relaxed">
                Share your experience about healthcare professionals, facilities, and educational resources. 
                Your feedback helps us improve the platform and the entire ecosystem for everyone.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-3 sm:p-6 pb-3 sm:pb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 leading-relaxed">
                    By submitting feedback, you agree to our <a href="#" className="underline font-medium">Privacy Policy</a> and <a href="#" className="underline font-medium">Terms of Service</a>, 
                    including the requirement to provide evidence if your feedback is disputed.
                  </p>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList 
                  className="
                    grid grid-cols-2 gap-1 mb-6 p-1 h-auto bg-gray-50 rounded-xl
                    md:grid-cols-4 md:gap-2 md:p-2
                    border border-gray-200 shadow-sm
                  " 
                  data-walkthrough="tabs"
                >
                  <TabsTrigger 
                    value="professionals" 
                    className="
                      px-2 py-3 text-xs font-medium rounded-lg transition-all duration-200
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600
                      data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-[1.02]
                      hover:bg-gray-100 hover:text-gray-800
                      text-gray-600 bg-white border border-gray-200
                      md:px-4 md:py-3 md:text-sm
                      min-h-[3rem] flex items-center justify-center text-center leading-tight
                    "
                  >
                    <span className="block">
                      Healthcare<br className="md:hidden" />
                      <span className="md:ml-1">Professionals</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="facilities" 
                    className="
                      px-2 py-3 text-xs font-medium rounded-lg transition-all duration-200
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600
                      data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-[1.02]
                      hover:bg-gray-100 hover:text-gray-800
                      text-gray-600 bg-white border border-gray-200
                      md:px-4 md:py-3 md:text-sm
                      min-h-[3rem] flex items-center justify-center text-center leading-tight
                    "
                  >
                    <span className="block">
                      Hospitals/<br className="md:hidden" />
                      <span className="md:ml-1">Facilities/Pharmacy </span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tutors" 
                    className="
                      px-2 py-3 text-xs font-medium rounded-lg transition-all duration-200
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600
                      data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-[1.02]
                      hover:bg-gray-100 hover:text-gray-800
                      text-gray-600 bg-white border border-gray-200
                      md:px-4 md:py-3 md:text-sm
                      min-h-[3rem] flex items-center justify-center text-center leading-tight
                    "
                  >
                    <span className="block">
                      Tutors /<br className="md:hidden" />
                      <span className="md:ml-1">Advisers</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="factory" 
                    className="
                      px-2 py-3 text-xs font-medium rounded-lg transition-all duration-200
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600
                      data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-[1.02]
                      hover:bg-gray-100 hover:text-gray-800
                      text-gray-600 bg-white border border-gray-200
                      md:px-4 md:py-3 md:text-sm
                      min-h-[3rem] flex items-center justify-center text-center leading-tight
                    "
                  >
                    <span className="block">
                      Occupational<br className="md:hidden" />
                      <span className="md:ml-1">Health & Safety</span>
                    </span>
                  </TabsTrigger>
                </TabsList>                <form onSubmit={handleSubmit}>
                  <div data-walkthrough="form-fields" className="space-y-4 sm:space-y-6">
                  <TabsContent value="professionals" className="mt-0">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="professional" className="text-sm font-medium">Healthcare Professional</Label>
                        <Select 
                          required
                          value={selectedProfessional}
                          onValueChange={setSelectedProfessional}
                        >
                          <SelectTrigger className="h-11">
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
                            <Label htmlFor="customProfessionalName" className="text-sm font-medium">Specify Healthcare Professional</Label>
                            <Input 
                              id="customProfessionalName"
                              value={customProfessionalName}
                              onChange={(e) => setCustomProfessionalName(e.target.value)}
                              placeholder="Enter healthcare professional's name"
                              className="h-11 mt-1"
                              required
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="specialty" className="text-sm font-medium">Specialty</Label>
                        <Select>
                          <SelectTrigger className="h-11">
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
                      />                      <div className="space-y-3" data-walkthrough="evidence" data-walkthrough-tab="professionals">
                        <Label htmlFor="professionalEvidenceFiles">Upload Evidence Images</Label>
                        <Input
                          type="file"
                          id="professionalEvidenceFiles"
                          accept="image/*"
                          multiple
                          onChange={e => setProfessionalEvidenceFiles(Array.from(e.target.files || []))}
                        />
                        {professionalEvidenceFiles.length > 0 && (
                          <ul className="text-sm text-gray-600 mt-1">
                            {professionalEvidenceFiles.map((file, idx) => (
                              <li key={idx}>{file.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
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
                      />                      <div className="space-y-3" data-walkthrough="evidence" data-walkthrough-tab="facilities">
                        <Label htmlFor="facilityEvidenceFiles">Upload Evidence Images</Label>
                        <Input
                          type="file"
                          id="facilityEvidenceFiles"
                          accept="image/*"
                          multiple
                          onChange={e => setFacilityEvidenceFiles(Array.from(e.target.files || []))}
                        />
                        {facilityEvidenceFiles.length > 0 && (
                          <ul className="text-sm text-gray-600 mt-1">
                            {facilityEvidenceFiles.map((file, idx) => (
                              <li key={idx}>{file.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
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
                        <div className="space-y-3" data-walkthrough="evidence" data-walkthrough-tab="tutors">
                        <Label htmlFor="tutorEvidenceFiles">Upload Evidence Images</Label>
                        <Input
                          type="file"
                          id="tutorEvidenceFiles"
                          accept="image/*"
                          multiple
                          onChange={e => setTutorEvidenceFiles(Array.from(e.target.files || []))}
                        />
                        {tutorEvidenceFiles.length > 0 && (
                          <ul className="text-sm text-gray-600 mt-1">
                            {tutorEvidenceFiles.map((file, idx) => (
                              <li key={idx}>{file.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                    <TabsContent value="factory" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="workplace">Workplace / Facility</Label>
                        <Select 
                          required
                          value={selectedWorkplace}
                          onValueChange={setSelectedWorkplace}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your workplace" />
                          </SelectTrigger>
                          <SelectContent>
                            {workplaceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {selectedWorkplace === "other" && (
                          <div className="mt-2">
                            <Label htmlFor="customWorkplaceName">Specify Workplace</Label>
                            <Input 
                              id="customWorkplaceName"
                              value={customWorkplaceName}
                              onChange={(e) => setCustomWorkplaceName(e.target.value)}
                              placeholder="Enter workplace name"
                              required
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="department">Department / Area</Label>
                        <Select
                          value={selectedDepartment}
                          onValueChange={setSelectedDepartment}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department or area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="quality">Quality Control</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Feedback Category</Label>
                        <RadioGroup
                          value={safetyFeedbackType}
                          onValueChange={setSafetyFeedbackType}
                          className="flex space-x-6"
                          required
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="ohs-general" value="general" />
                            <Label htmlFor="ohs-general">General Safety</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="ohs-injury" value="injury" />
                            <Label htmlFor="ohs-injury">Injury Incident</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {safetyFeedbackType === "general" && (
                        <div className="space-y-3">
                          <Label htmlFor="generalDescription">Describe Your Safety Concern</Label>
                          <Textarea
                            id="generalDescription"
                            value={generalDescription}
                            onChange={e => setGeneralDescription(e.target.value)}
                            placeholder="Describe safety concerns, hazards, near misses, unsafe conditions..."
                            className="min-h-[150px]"
                            required
                          />
                        </div>
                      )}

                      {safetyFeedbackType === "injury" && (
                        <>
                          <div className="space-y-3">
                            <Label htmlFor="incidentDate">Date of Incident</Label>
                            <Input 
                              type="date" 
                              id="incidentDate" 
                              value={incidentDate}
                              onChange={(e) => setIncidentDate(e.target.value)}
                              required 
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="incidentDescription">Incident Description</Label>
                            <Textarea
                              id="incidentDescription"
                              value={incidentDescription}
                              onChange={e => setIncidentDescription(e.target.value)}
                              placeholder="Describe what happened, where, when, who was involved, what injuries occurred..."
                              className="min-h-[150px]"
                              required
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="rootCauseOpened"
                              checked={rootCauseOpened}
                              onCheckedChange={(checked) => setRootCauseOpened(checked === true)}
                            />
                            <Label htmlFor="rootCauseOpened">
                              Root‐cause / incident investigation has been opened
                            </Label>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="companyResponse">Company Response</Label>
                            <Textarea
                              id="companyResponse"
                              value={companyResponse}
                              onChange={e => setCompanyResponse(e.target.value)}
                              placeholder="Describe the company's response to the incident..."
                              className="min-h-[150px]"
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-3" data-walkthrough="evidence" data-walkthrough-tab="factory">
                        <Label htmlFor="evidenceFiles">Upload Evidence Images</Label>
                        <Input
                          type="file"
                          id="evidenceFiles"
                          accept="image/*"
                          multiple
                          onChange={e => setEvidenceFiles(Array.from(e.target.files || []))}
                        />
                        <p className="text-xs text-gray-500">
                          Upload photos of hazards, injuries, unsafe conditions, or related documentation
                        </p>
                        {evidenceFiles.length > 0 && (
                          <ul className="text-sm text-gray-600 mt-1">
                            {evidenceFiles.map((file, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Check className="h-3 w-3 text-green-500" />
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="anonymous" />
                        <Label htmlFor="anonymous" className="text-sm">
                          Submit this report anonymously
                        </Label>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-800">
                          <p className="font-medium">Important Safety Notice:</p>
                          <p>For immediate safety emergencies, contact your supervisor or emergency services directly. This form is for reporting and feedback purposes.</p>
                        </div>
                      </div>

                      <div className="pt-4 text-xs text-gray-500 border-t">
                        <p>This form follows ILO Convention C155 (Occupational Safety and Health) and Recommendation R164 for hazard, incident and accident reporting.</p>
                        <p className="mt-1">All submissions are handled according to our Privacy Policy and applicable labor regulations.</p>
                      </div>                    </div>
                  </TabsContent>
                  </div>
                    <div className="pt-4 sm:pt-6" data-walkthrough="submit">
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                      <Button 
                        type="submit" 
                        className="bg-red-600 hover:bg-red-700 order-1 sm:order-none flex-1 sm:flex-none"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="text-sm sm:text-base">Submitting...</span>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Submit Feedback</span>
                            <span className="sm:hidden">Submit</span>
                          </>
                        )}
                      </Button>
                      
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 order-2 sm:order-none">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={generateQRCode}
                          className="border-amber-500 text-amber-700 hover:bg-amber-50 text-xs sm:text-sm px-3 py-2"
                        >
                          <span className="hidden sm:inline">Generate QR Code</span>
                          <span className="sm:hidden">QR Code</span>
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setShowWalkthrough(true);
                            setWalkthroughStep(0);
                            setTimeout(() => {
                              const initialPosition = getTooltipPosition();
                              setWalkthroughPosition(initialPosition);
                            }, 100);
                          }}
                          className="border-blue-500 text-blue-700 hover:bg-blue-50 text-xs sm:text-sm px-3 py-2"
                        >
                          <span className="hidden sm:inline">Show Tutorial</span>
                          <span className="sm:hidden">Tutorial</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>
            <div className="mt-8 sm:mt-16" id="recent">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <MessageCircle className="text-red-600 h-5 w-5 sm:h-6 sm:w-6" />
                <span>Recent Feedback</span>
                <span className="text-xs sm:text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
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
  <div data-walkthrough="rating">
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
      >      I confirm this feedback is based on my personal experience and is truthful
    </label>
  </div>
  </div>
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
