
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { Calculator, Download, Share2, Trophy } from "lucide-react";

interface ScoreCategory {
  name: string;
  value: number;
  weight: number;
  color: string;
}

const CalculateScore: React.FC = () => {
  const [experience, setExperience] = useState<number>(5);
  const [education, setEducation] = useState<string>("bachelor");
  const [certifications, setCertifications] = useState<number>(3);
  const [continuingEd, setContinuingEd] = useState<number>(50);
  const [patientFeedback, setPatientFeedback] = useState<number>(85);
  const [peerReviews, setPeerReviews] = useState<number>(70);
  
  const [showResults, setShowResults] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [scoreCategories, setScoreCategories] = useState<ScoreCategory[]>([]);
  
  const calculateGlohsenScore = () => {
    const educationValues = {
      certificate: 60,
      associate: 70,
      bachelor: 80,
      master: 90,
      doctorate: 100
    };
    
    // Calculate category scores
    const experienceScore = Math.min(100, experience * 10);
    const educationScore = educationValues[education as keyof typeof educationValues];
    const certificationScore = Math.min(100, certifications * 20);
    const continuingEdScore = Math.min(100, continuingEd);
    
    const categories: ScoreCategory[] = [
      { name: "Experience", value: experienceScore, weight: 0.25, color: "bg-red-600" },
      { name: "Education", value: educationScore, weight: 0.20, color: "bg-amber-500" },
      { name: "Certifications", value: certificationScore, weight: 0.15, color: "bg-blue-500" },
      { name: "Continuing Education", value: continuingEdScore, weight: 0.15, color: "bg-green-500" },
      { name: "Patient Feedback", value: patientFeedback, weight: 0.15, color: "bg-purple-500" },
      { name: "Peer Reviews", value: peerReviews, weight: 0.10, color: "bg-indigo-500" }
    ];
    
    // Calculate weighted score
    const score = categories.reduce((total, category) => {
      return total + (category.value * category.weight);
    }, 0);
    
    setFinalScore(Math.round(score));
    setScoreCategories(categories);
    setShowResults(true);
    
    // Show success toast
    toast({
      title: "GLOHSEN Score Calculated",
      description: "Your professional score has been calculated successfully."
    });
  };
  
  const resetCalculator = () => {
    setExperience(5);
    setEducation("bachelor");
    setCertifications(3);
    setContinuingEd(50);
    setPatientFeedback(85);
    setPeerReviews(70);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
              Calculate Your GLOHSEN Score
            </span>
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Discover how you measure against the global healthcare standard
          </p>
          
          {showResults ? (
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your GLOHSEN Score Results</CardTitle>
                <CardDescription>
                  Based on your professional profile and achievements
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-56 h-56 flex items-center justify-center mb-4">
                    <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
                    <div 
                      className="absolute inset-0 border-8 rounded-full" 
                      style={{ 
                        borderColor: "transparent", 
                        borderTopColor: getScoreColor(finalScore),
                        transform: `rotate(${finalScore * 1.8}deg)` 
                      }}
                    ></div>
                    <div className="text-6xl font-bold text-gray-800">{finalScore}</div>
                  </div>
                  <div className="mb-2 text-xl font-medium">
                    {getScoreRating(finalScore)}
                  </div>
                  <p className="text-gray-600 text-center max-w-md">
                    {getScoreDescription(finalScore)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Score Breakdown</h3>
                  
                  {scoreCategories.map((category, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>{category.value.toFixed(0)}/100</span>
                      </div>
                      <Progress className="h-2" value={category.value} indicatorClassName={category.color} />
                      <div className="text-xs text-gray-500">
                        Weight: {(category.weight * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Results
                </Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={resetCalculator}>
                  Recalculate
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Professional Profile Assessment</CardTitle>
                <CardDescription>
                  Enter your information to calculate your GLOHSEN score
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="experience">
                    Years of Professional Experience: {experience}
                  </Label>
                  <Slider 
                    id="experience"
                    min={0} 
                    max={20} 
                    step={1}
                    value={[experience]}
                    onValueChange={(value) => setExperience(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 years</span>
                    <span>10 years</span>
                    <span>20+ years</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Highest Level of Education</Label>
                  <RadioGroup 
                    value={education} 
                    onValueChange={setEducation}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="certificate" id="certificate" />
                      <Label htmlFor="certificate">Certificate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="associate" id="associate" />
                      <Label htmlFor="associate">Associate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bachelor" id="bachelor" />
                      <Label htmlFor="bachelor">Bachelor's</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="master" id="master" />
                      <Label htmlFor="master">Master's</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="doctorate" id="doctorate" />
                      <Label htmlFor="doctorate">Doctorate</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="certifications">
                    Number of Professional Certifications: {certifications}
                  </Label>
                  <Slider 
                    id="certifications"
                    min={0} 
                    max={10} 
                    step={1}
                    value={[certifications]}
                    onValueChange={(value) => setCertifications(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>5</span>
                    <span>10+</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="continuingEd">
                    Continuing Education Hours (Past Year): {continuingEd}
                  </Label>
                  <Slider 
                    id="continuingEd"
                    min={0} 
                    max={100} 
                    step={5}
                    value={[continuingEd]}
                    onValueChange={(value) => setContinuingEd(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 hrs</span>
                    <span>50 hrs</span>
                    <span>100+ hrs</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="patientFeedback">
                    Patient Feedback Rating: {patientFeedback}%
                  </Label>
                  <Slider 
                    id="patientFeedback"
                    min={0} 
                    max={100} 
                    step={5}
                    value={[patientFeedback]}
                    onValueChange={(value) => setPatientFeedback(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="peerReviews">
                    Peer Review Rating: {peerReviews}%
                  </Label>
                  <Slider 
                    id="peerReviews"
                    min={0} 
                    max={100} 
                    step={5}
                    value={[peerReviews]}
                    onValueChange={(value) => setPeerReviews(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={calculateGlohsenScore} 
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate My GLOHSEN Score
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper functions for score interpretation
function getScoreColor(score: number): string {
  if (score >= 90) return "#dc2626"; // Red-600 for exceptional
  if (score >= 80) return "#f59e0b"; // Amber-500 for excellent
  if (score >= 70) return "#10b981"; // Emerald-500 for good
  if (score >= 60) return "#3b82f6"; // Blue-500 for average
  return "#6b7280"; // Gray-500 for below average
}

function getScoreRating(score: number): string {
  if (score >= 90) return "Exceptional Professional";
  if (score >= 80) return "Excellent Professional";
  if (score >= 70) return "Competent Professional";
  if (score >= 60) return "Developing Professional";
  return "Emerging Professional";
}

function getScoreDescription(score: number): string {
  if (score >= 90) {
    return "You're among the top healthcare professionals globally. Your expertise, experience, and patient care are exemplary.";
  }
  if (score >= 80) {
    return "You demonstrate excellent professional skills and knowledge with strong patient outcomes and peer recognition.";
  }
  if (score >= 70) {
    return "You show solid competence across multiple areas with good patient satisfaction and consistent professional growth.";
  }
  if (score >= 60) {
    return "You're developing your skills with areas of strength and opportunities for continued professional development.";
  }
  return "You're in the early stages of your professional journey with significant room for growth and development.";
}

export default CalculateScore;
