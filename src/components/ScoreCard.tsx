
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Info, Award, ChartBar } from "lucide-react";

const ScoreCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  
  const glohsenScore = 97;
  const maxScore = 200;
  const percentage = (glohsenScore / maxScore) * 100;
  
  // Implementing the 10 parameters for GLOHSEN score as described in the requirements
  const scoreCategories = [
    { name: "Experience", score: 6, maxScore: 10, description: "Years of professional experience" },
    { name: "Employer Requests Match", score: 30, maxScore: 110, description: "How well you match specific employer requests" },
    { name: "Skills & Certificates", score: 13, maxScore: 15, description: "Compulsory and additional relevant skills" },
    { name: "Locum Jobs", score: 10, maxScore: 10, description: "Number of locum jobs executed through the platform" },
    { name: "Platform Activity", score: 8, maxScore: 10, description: "Contributions to Q&A and platform engagement" },
    { name: "Volunteer Willingness", score: 10, maxScore: 10, description: "Willingness to volunteer or accept challenges" },
    { name: "Location", score: 5, maxScore: 5, description: "Proximity to job locations" },
    { name: "Communication Skills", score: 9, maxScore: 10, description: "Advanced communication & language skills" },
    { name: "Extended Availability", score: 6, maxScore: 10, description: "Willingness to work for extended periods" },
    { name: "Immediate Availability", score: 10, maxScore: 10, description: "Availability to start work immediately" }
  ];
  
  const handleCalculateScore = () => {
    toast({
      title: "GLOHSEN Score Details",
      description: "Your score is calculated based on 10 key criteria including experience, skills, and availability.",
    });
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-center font-playfair">WHAT IS YOUR GLOHSEN SCORE?</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <div className="text-sm font-bold">Name</div>
          <div className="font-semibold">Dr. Olusiji</div>
        </div>
        
        <div className="text-center flex-1 relative">
          <div className="text-sm font-bold">GLOHSEN Score</div>
          <div className="font-semibold text-[#EA384C] text-3xl">{glohsenScore}</div>
          <Progress value={percentage} className="h-2 mt-1" />
          <div className="text-xs text-gray-500 mt-1">{glohsenScore} of {maxScore} points</div>
          <div className="absolute -top-1 -right-1 cursor-pointer group">
            <Info className="h-4 w-4 text-gray-400" />
            <div className="hidden group-hover:block absolute right-0 w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
              Score calculated using the GLOHSEN Ranking Points System
            </div>
          </div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-sm font-bold">Potential Earnings</div>
          <div className="font-semibold">₦10,000,000</div>
          <div className="text-xs text-gray-500">Based on current score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <Award className="h-5 w-5 text-[#D4AF37]" />
          <div>
            <div className="text-sm font-medium">Employer Criteria Match</div>
            <div className="text-xs text-gray-500">85/110 points</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <ChartBar className="h-5 w-5 text-blue-500" />
          <div>
            <div className="text-sm font-medium">Platform Ranking</div>
            <div className="text-xs text-gray-500">Top 15% of professionals</div>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-bold mb-4 text-sm flex items-center">
            Score Breakdown
            <span className="text-xs text-gray-500 ml-2">(Based on the GLOHSEN Ranking Points System)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {scoreCategories.map((category, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium flex items-center">
                    {category.name}
                    <span className="ml-1 text-gray-400 cursor-pointer relative">
                      <Info className="h-3 w-3" />
                      <span className="hidden group-hover:block absolute left-full ml-2 top-0 w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                        {category.description}
                      </span>
                    </span>
                  </span>
                  <span className={`font-medium ${category.score === category.maxScore ? 'text-green-600' : ''}`}>
                    {category.score}/{category.maxScore}
                  </span>
                </div>
                <Progress 
                  value={(category.score / category.maxScore) * 100} 
                  className={`h-1.5 ${category.score === category.maxScore ? 'bg-green-100' : ''}`}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>For more information on how scores are calculated, see the <a href="#" className="text-blue-500 hover:underline">GLOHSEN Score Guide</a></p>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex flex-col space-y-2">
        <Button 
          onClick={handleCalculateScore}
          className="w-full button-3d bg-accent hover:bg-accent/90 text-black font-semibold py-2 rounded-md transition-colors"
        >
          {showDetails ? "HIDE DETAILS" : "VIEW SCORE DETAILS"}
        </Button>
        
        <Button 
          className="w-full button-3d bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-md transition-colors"
        >
          IMPROVE YOUR SCORE
        </Button>
      </div>
    </div>
  );
};

export default ScoreCard;
