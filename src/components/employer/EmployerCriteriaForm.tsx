import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { CriteriaSlider } from "./CriteriaSlider";
import type { EmployerCriteriaFormProps, EmployerCriteria } from "./types";

const DEFAULT_CRITERIA: EmployerCriteria = {
  yearsExperience: 5,
  employerMatchScore: 0,
  skillCertificates: {
    required: 5,
    additional: 2
  },
  locumJobs: 2,
  platformActivity: 5,
  volunteering: {
    volunteer: false,
    lesserWage: false,
    distantLocation: false
  },
  locationProximity: 10,
  awards: {
    leadershipAwards: 0,
    advancedCommunication: false,
    languages: 0
  },
  remoteWork: false,
  availability: "1-2weeks"
};

export const EmployerCriteriaForm: React.FC<EmployerCriteriaFormProps> = ({
  onSubmit,
  initialCriteria = {},
  isLoading = false,
  error = null
}) => {
  const [experienceValue, setExperienceValue] = useState<number[]>([initialCriteria.yearsExperience ?? 5]);
  const [basicSkillsValue, setBasicSkillsValue] = useState<number[]>([initialCriteria.skillCertificates?.required ?? 5]);
  const [advancedSkillsValue, setAdvancedSkillsValue] = useState<number[]>([initialCriteria.skillCertificates?.additional ?? 5]);
  const [pastJobsValue, setPastJobsValue] = useState<number[]>([initialCriteria.locumJobs ?? 5]);
  const [willingnessValue, setWillingnessValue] = useState<number[]>([5]);
  const [locationValue, setLocationValue] = useState<number[]>([initialCriteria.locationProximity ?? 10]);
  const [awardSkillsValue, setAwardSkillsValue] = useState<number[]>([5]);
  const [remoteWorkValue, setRemoteWorkValue] = useState<number[]>([initialCriteria.remoteWork ? 10 : 5]);
  const [availabilityValue, setAvailabilityValue] = useState<number[]>([5]);
  
  const [totalScore, setTotalScore] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setSubmitError(error);
    }
  }, [error]);

  // Calculate total score based on multiplication algorithm
  useEffect(() => {
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

  const handleSearch = async () => {
    setSubmitError(null);
    
    try {
      const criteria: EmployerCriteria = {
        yearsExperience: experienceValue[0],
        employerMatchScore: totalScore,
        skillCertificates: {
          required: basicSkillsValue[0],
          additional: advancedSkillsValue[0]
        },
        locumJobs: pastJobsValue[0],
        platformActivity: 5, // Default value
        volunteering: {
          volunteer: willingnessValue[0] > 7,
          lesserWage: willingnessValue[0] > 5,
          distantLocation: willingnessValue[0] > 8
        },
        locationProximity: locationValue[0],
        awards: {
          leadershipAwards: Math.floor(awardSkillsValue[0] / 3),
          advancedCommunication: awardSkillsValue[0] > 7,
          languages: Math.floor(awardSkillsValue[0] / 4)
        },
        remoteWork: remoteWorkValue[0] > 7,
        availability: availabilityValue[0] > 8 ? 'immediate' : 
                     availabilityValue[0] > 5 ? '1-2weeks' : 
                     availabilityValue[0] > 2 ? 'month' : 'unavailable'
      };

      await onSubmit(criteria);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit criteria');
    }
  };

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
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-1 text-sm text-red-600">{submitError}</p>
            </div>
          )}

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
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Searching...
            </span>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" /> Find Matching Candidates
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
