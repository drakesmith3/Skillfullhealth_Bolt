
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGlohsenScore } from "@/contexts/GlohsenScoreContext";
import { CandidateData } from "@/types/score";

interface ScoreCriteria {
  id: string;
  title: string;
  description: string;
  value: number;
  maxValue: number;
  color: string;
}

const GlohsenScoreCalculator = () => {
  const { toast } = useToast();
  const { updateScore } = useGlohsenScore();
  
  const [criteria, setCriteria] = useState<ScoreCriteria[]>([
    {
      id: "experience",
      title: "Years of Experience",
      description: "Number of years working as a healthcare professional.",
      value: 3,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "employer_match",
      title: "Employer Requests Match",
      description: "How well you match employer's specific requests.",
      value: 8,
      maxValue: 110,
      color: "#F9D75D"
    },
    {
      id: "skills",
      title: "Skills & Certificates",
      description: "Number of relevant skills and certificates you possess.",
      value: 8,
      maxValue: 15,
      color: "#F9D75D"
    },
    {
      id: "locum_jobs",
      title: "Locum Jobs Executed",
      description: "Number of locum jobs/certificates obtained through us.",
      value: 2,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "platform_activity",
      title: "Platform Activity",
      description: "Number of questions & answers contributed to the platform.",
      value: 4,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "volunteer",
      title: "Volunteer Willingness",
      description: "Willingness to volunteer, accept lower wages, or travel to distant locations.",
      value: 6,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "location",
      title: "Location Proximity (km)",
      description: "Distance from your residence to job location.",
      value: 2,
      maxValue: 5,
      color: "#F9D75D"
    },
    {
      id: "awards",
      title: "Awards & Communication Skills",
      description: "Awards received and advanced communication skills.",
      value: 4,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "remote",
      title: "Remote Work Willingness",
      description: "Willingness to work remotely for extended periods.",
      value: 10,
      maxValue: 10,
      color: "#F9D75D"
    },
    {
      id: "availability",
      title: "Instant Availability",
      description: "How soon you can start working.",
      value: 5,
      maxValue: 10,
      color: "#F9D75D"
    }
  ]);
  
  const handleSliderChange = (id: string, newValue: number[]) => {
    setCriteria(criteria.map(item => 
      item.id === id ? { ...item, value: newValue[0] } : item
    ));
  };
  
  const calculateTotalScore = () => {
    return criteria.reduce((sum, item) => sum + item.value, 0);
  };
  
  const totalScore = calculateTotalScore();
  const maxPossibleScore = criteria.reduce((sum, item) => sum + item.maxValue, 0);
  const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  const handleSubmitScore = () => {
    try {
      const data: CandidateData = {
        yearsExperience: criteria.find(c => c.id === "experience")?.value || 0,
        employerMatchScore: criteria.find(c => c.id === "employer_match")?.value || 0,
        skillCertificates: {
          required: criteria.find(c => c.id === "skills")?.value || 0,
          additional: 0
        },
        locumJobs: criteria.find(c => c.id === "locum_jobs")?.value || 0,
        platformActivity: criteria.find(c => c.id === "platform_activity")?.value || 0,
        volunteering: {
          volunteer: (criteria.find(c => c.id === "volunteer")?.value || 0) > 5,
          lesserWage: false,
          distantLocation: false
        },
        locationProximity: criteria.find(c => c.id === "location")?.value || 0,
        awards: {
          leadershipAwards: Math.floor(criteria.find(c => c.id === "awards")?.value || 0),
          advancedCommunication: true,
          languages: 1
        },
        remoteWork: (criteria.find(c => c.id === "remote")?.value || 0) > 5,
        availability: 'immediate'
      };
      
      updateScore(data);
      
      toast({
        title: "Score Submitted",
        description: "Your GLOHSEN score has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate score. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleSaveDraft = () => {
    localStorage.setItem('glohsen_score_draft', JSON.stringify(criteria));
    toast({
      title: "Draft Saved",
      description: "Your score information has been saved as a draft.",
    });
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Employee Score Calculator</h2>
        <p className="text-gray-500 mb-8">Calculate your GLOHSEN score based on your skills and experience.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Scoring criteria sliders */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Scoring Criteria</h3>
                <Button variant="ghost" size="sm" className="text-primary flex items-center">
                  <span className="text-xs">Adjust criteria to update your score</span>
                </Button>
              </div>
              
              <div className="space-y-6">
                {criteria.map((item) => (
                  <div key={item.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <span className="bg-[#F9D75D] text-black font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {item.value}
                      </span>
                    </div>
                    
                    <Slider
                      value={[item.value]}
                      max={item.maxValue}
                      step={1}
                      onValueChange={(newValue) => handleSliderChange(item.id, newValue)}
                      className="py-4"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button onClick={handleSaveDraft} variant="outline" className="flex-1">
                  Save Draft
                </Button>
                <Button onClick={handleSubmitScore} className="flex-1 bg-[#F9D75D] text-black hover:bg-[#F9D75D]/80">
                  Submit Score
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Right column - Score details */}
          <div className="space-y-6">
            {/* Score circle */}
            <Card className="p-6 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EEEEEE"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F9D75D"
                    strokeWidth="3"
                    strokeDasharray={`${scorePercentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">{totalScore}</div>
                  <div className="text-xs text-gray-500">/ {maxPossibleScore}</div>
                </div>
              </div>
              <h3 className="font-bold">Your Score</h3>
              <p className="text-xs text-gray-500">Based on the current criteria</p>
              <p className="text-xs text-green-500 mt-2">+15% from last assessment</p>
            </Card>
            
            {/* Score breakdown */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                {criteria.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-sm font-medium">{item.value} / {item.maxValue}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#F9D75D] h-2.5 rounded-full" 
                        style={{ width: `${(item.value / item.maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Score insights */}
            <Card className="p-6">
              <h3 className="font-bold flex items-center mb-4">
                <span className="text-[#F9D75D] mr-2">⚡</span>
                Score Insights
              </h3>
              <p className="text-sm mb-4">
                Your current score of <span className="font-bold">{totalScore}</span> places you in the 
                <span className="font-bold"> lower tier</span> of healthcare professionals.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-0.5 mr-1 flex-shrink-0" />
                  <span>Employers looking for your specialty are seeking candidates with higher scores.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-0.5 mr-1 flex-shrink-0" />
                  <span>Improving your platform activity could increase your score by up to 6 points.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-0.5 mr-1 flex-shrink-0" />
                  <span>Adding 2 more certifications would boost your Skills & Certificates score.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlohsenScoreCalculator;
