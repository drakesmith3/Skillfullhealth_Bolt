
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CriteriaSliderProps {
  title: string;
  description: string;
  value: number[];
  min: number;
  max: number;
  step: number;
  onChange: (value: number[]) => void;
  labelFunction?: (value: number) => string;
  weight: number;
}

const CriteriaSlider: React.FC<CriteriaSliderProps> = ({
  title,
  description,
  value,
  min,
  max,
  step,
  onChange,
  labelFunction,
  weight
}) => {
  return (
    <div className="mb-8 p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Badge variant="outline" className="font-mono">Weight: {weight}x</Badge>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="mb-6">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onValueChange={onChange}
          className="my-5"
        />
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{labelFunction ? labelFunction(min) : min}</span>
          <span className="font-semibold text-primary">Selected: {labelFunction ? labelFunction(value[0]) : value[0]}</span>
          <span>{labelFunction ? labelFunction(max) : max}</span>
        </div>
      </div>
    </div>
  );
};

const EmployerCriteriaForm: React.FC = () => {
  // Define initial states for all criteria sliders
  const [experienceValue, setExperienceValue] = useState<number[]>([5]);
  const [basicSkillsValue, setBasicSkillsValue] = useState<number[]>([5]);
  const [advancedSkillsValue, setAdvancedSkillsValue] = useState<number[]>([5]);
  const [pastJobsValue, setPastJobsValue] = useState<number[]>([5]);
  const [willingnessValue, setWillingnessValue] = useState<number[]>([5]);
  const [locationValue, setLocationValue] = useState<number[]>([10]);
  const [awardSkillsValue, setAwardSkillsValue] = useState<number[]>([5]);
  const [remoteWorkValue, setRemoteWorkValue] = useState<number[]>([5]);
  const [availabilityValue, setAvailabilityValue] = useState<number[]>([5]);
  
  const [totalScore, setTotalScore] = useState<number>(0);
  const { toast } = useToast();
  
  // Calculate and format the score based on the multiplication algorithm
  useEffect(() => {
    // Using multiplication as specified
    const score = experienceValue[0] * basicSkillsValue[0] * advancedSkillsValue[0] * 
                 pastJobsValue[0] * willingnessValue[0] * locationValue[0] * 
                 awardSkillsValue[0] * remoteWorkValue[0] * availabilityValue[0];
                 
    setTotalScore(score);
  }, [
    experienceValue, basicSkillsValue, advancedSkillsValue, pastJobsValue, 
    willingnessValue, locationValue, awardSkillsValue, remoteWorkValue, availabilityValue
  ]);
  
  const formatScore = (score: number): string => {
    if (score >= 1000000000) {
      return "Maximum (1,000,000,000)";
    } else if (score >= 1000000) {
      return `${(score / 1000000).toFixed(1)} million`;
    } else if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}K`;
    }
    return score.toString();
  };
  
  const handleSearch = () => {
    toast({
      title: "Search initiated",
      description: "Searching for candidates matching your criteria...",
    });
    
    // This would be where we'd pass the criteria to the backend
    setTimeout(() => {
      toast({
        title: "Candidates found",
        description: "We found 3 candidates matching your criteria."
      });
    }, 1500);
  };
  
  // Label functions for different sliders
  const experienceLabel = (value: number): string => {
    if (value <= 2) return "<2 years";
    if (value <= 5) return "2-5 years";
    if (value <= 9) return "6-10 years";
    return ">10 years";
  };
  
  const distanceLabel = (value: number): string => {
    if (value <= 10) return "Within 10km";
    if (value <= 30) return "Within 30km";
    return ">50km";
  };
  
  const availabilityLabel = (value: number): string => {
    if (value <= 2) return "In a month";
    if (value <= 5) return "In 1-2 weeks";
    if (value > 5) return "Immediate";
    return "Not available";
  };

  return (
    <div>
      <Card className="mb-8 border-t-4 border-primary shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-white">
          <CardTitle className="text-xl">Employer Criteria Selection</CardTitle>
          <CardDescription>
            Set your preferences using the sliders below to find the perfect candidate.
            Each criterion contributes to the multiplication-based total score.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div>
              <h3 className="font-bold text-xl">Your Criteria Score</h3>
              <p className="text-sm text-gray-600 mt-1">
                This score will be compared to candidate profiles
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{formatScore(totalScore)}</div>
              <div className="text-sm text-gray-500 mt-1">Maximum: 1,000,000,000</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria sliders */}
      <CriteriaSlider 
        title="1. Years of Experience"
        description="Minimum years of professional experience required"
        value={experienceValue}
        min={1}
        max={10}
        step={1}
        onChange={setExperienceValue}
        labelFunction={experienceLabel}
        weight={1}
      />
      
      <CriteriaSlider 
        title="2. Basic Skills & Certificates"
        description="Minimum level of basic skills certification required (BLS, ACLS, etc.)"
        value={basicSkillsValue}
        min={1}
        max={10}
        step={1}
        onChange={setBasicSkillsValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="3. Advanced Skills & Certificates"
        description="Level of advanced skills required (fellowships, specialized certifications)"
        value={advancedSkillsValue}
        min={1}
        max={10}
        step={1}
        onChange={setAdvancedSkillsValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="4. Past Locum Jobs"
        description="Minimum number of similar jobs successfully completed"
        value={pastJobsValue}
        min={0}
        max={10}
        step={1}
        onChange={setPastJobsValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="5. Flexibility & Willingness"
        description="Candidate's willingness to volunteer, accept flexible wages, travel"
        value={willingnessValue}
        min={1}
        max={10}
        step={1}
        onChange={setWillingnessValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="6. Location Proximity"
        description="Preferred distance of candidate's residence to job location"
        value={locationValue}
        min={1}
        max={10}
        step={1}
        onChange={setLocationValue}
        labelFunction={distanceLabel}
        weight={1}
      />
      
      <CriteriaSlider 
        title="7. Awards & Special Skills"
        description="Importance of awards, communication skills, and language proficiency"
        value={awardSkillsValue}
        min={1}
        max={10}
        step={1}
        onChange={setAwardSkillsValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="8. Extended Remote Work"
        description="Willingness to work remotely for extended periods"
        value={remoteWorkValue}
        min={1}
        max={10}
        step={1}
        onChange={setRemoteWorkValue}
        weight={1}
      />
      
      <CriteriaSlider 
        title="9. Availability"
        description="How soon the candidate needs to be available to start"
        value={availabilityValue}
        min={0}
        max={10}
        step={1}
        onChange={setAvailabilityValue}
        labelFunction={availabilityLabel}
        weight={1}
      />
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleSearch}
          size="lg" 
          className="button-3d bg-[#D4AF37] text-white border-none px-8 py-6 text-lg"
        >
          <Search className="mr-2 h-5 w-5" /> Find Matching Candidates
        </Button>
      </div>
    </div>
  );
};

export default EmployerCriteriaForm;
