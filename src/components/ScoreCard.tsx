
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ScoreCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  
  const glohsenScore = 97;
  const maxScore = 200;
  const percentage = (glohsenScore / maxScore) * 100;
  
  const scoreCategories = [
    { name: "Experience", score: 10, maxScore: 10 },
    { name: "Employer Requests Match", score: 110, maxScore: 110 },
    { name: "Skills & Certificates", score: 13, maxScore: 15 },
    { name: "Locum Jobs", score: 10, maxScore: 10 },
    { name: "Platform Activity", score: 8, maxScore: 10 },
    { name: "Volunteer Willingness", score: 10, maxScore: 10 },
    { name: "Location", score: 5, maxScore: 5 },
    { name: "Awards & Skills", score: 9, maxScore: 10 },
    { name: "Remote Work", score: 10, maxScore: 10 },
    { name: "Availability", score: 10, maxScore: 10 }
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
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="text-sm font-bold">Name</div>
          <div className="font-semibold">Dr Olusiji</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-sm font-bold">Glohsen Score</div>
          <div className="font-semibold text-primary text-2xl">{glohsenScore}</div>
          <Progress value={percentage} className="h-2 mt-1" />
          <div className="text-xs text-gray-500 mt-1">{glohsenScore} of {maxScore} points</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-sm font-bold">Earnings</div>
          <div className="font-semibold">₦10,000,000</div>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-bold mb-2 text-sm">Score Breakdown</h3>
          <div className="space-y-2">
            {scoreCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{category.name}</span>
                  <span>{category.score}/{category.maxScore}</span>
                </div>
                <Progress value={(category.score / category.maxScore) * 100} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 flex flex-col space-y-2">
        <Button 
          onClick={handleCalculateScore}
          className="w-full button-3d bg-accent text-black font-semibold py-2 rounded-md hover:bg-accent/90 transition-colors"
        >
          {showDetails ? "HIDE DETAILS" : "VIEW SCORE DETAILS"}
        </Button>
        <Button 
          className="w-full button-3d bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          SIGN IN/SIGN UP TO KNOW YOURS
        </Button>
      </div>
    </div>
  );
};

export default ScoreCard;
