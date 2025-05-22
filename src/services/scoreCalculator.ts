
import type { CandidateData, ScoreBreakdown } from '@/types/score';
import type { ProfessionalProfile } from '@/types/dashboard';

// Export these types so they can be imported elsewhere
export type { CandidateData, ScoreBreakdown };

// Calculate GLOHSEN score from candidate data using the detailed algorithm
export const calculateGlohsenScore = (data: CandidateData): ScoreBreakdown => {
  // 1. Years of Experience (max 10 points)
  const experienceScore = calculateExperienceScore(data.yearsExperience);
  
  // 2. Employer Match Score (max 110 points)
  const employerMatchScore = data.employerMatchScore;
  
  // 3. Skills and Certificates (max 15 points)
  const skillsScore = data.skillCertificates.required + data.skillCertificates.additional;
  
  // 4. Locum Jobs (max 10 points)
  const locumJobsScore = calculateLocumJobsScore(data.locumJobs);
  
  // 5. Platform Activity (max 10 points)
  const platformActivityScore = Math.min(data.platformActivity, 10);
  
  // 6. Volunteering (max 10 points)
  const volunteeringScore = calculateVolunteeringScore(data.volunteering);
  
  // 7. Location Score (max 5 points)
  const locationScore = Math.min(data.locationProximity, 5);
  
  // 8. Awards & Communication (max 10 points)
  const awardsScore = calculateAwardsScore(data.awards);
  
  // 9. Remote Work (max 10 points)
  const remoteWorkScore = data.remoteWork ? 10 : 3;
  
  // 10. Availability (max 10 points)
  const availabilityScore = calculateAvailabilityScore(data.availability);
  
  // Calculate total score (max 200 points)
  const totalScore = 
    experienceScore + 
    employerMatchScore + 
    skillsScore + 
    locumJobsScore + 
    platformActivityScore + 
    volunteeringScore + 
    locationScore + 
    awardsScore + 
    remoteWorkScore + 
    availabilityScore;
  
  return {
    experience: experienceScore,
    employerMatch: employerMatchScore,
    skills: skillsScore,
    locumJobs: locumJobsScore,
    platformActivity: platformActivityScore,
    volunteering: volunteeringScore,
    location: locationScore,
    awards: awardsScore,
    remoteWork: remoteWorkScore,
    availability: availabilityScore,
    total: totalScore
  };
};

// Helper functions for score calculation
const calculateExperienceScore = (years: number): number => {
  if (years <= 2) return 1;
  if (years <= 5) return 3;
  if (years <= 10) return 6;
  return 10;
};

const calculateLocumJobsScore = (jobs: number): number => {
  if (jobs === 0) return 0;
  if (jobs <= 2) return 2;
  if (jobs <= 4) return 4;
  return 10;
};

const calculateVolunteeringScore = (volunteering: {
  volunteer: boolean;
  lesserWage: boolean;
  distantLocation: boolean;
}): number => {
  let score = 0;
  if (volunteering.volunteer) score += 3;
  if (volunteering.lesserWage) score += 3;
  if (volunteering.distantLocation) score += 4;
  return score;
};

const calculateAwardsScore = (awards: {
  leadershipAwards: number;
  advancedCommunication: boolean;
  languages: number;
}): number => {
  let score = 0;
  score += Math.min(awards.leadershipAwards, 4); // Max 4 points
  if (awards.advancedCommunication) score += 3;
  score += Math.min(awards.languages, 3); // Max 3 points (1 point per language, up to 3)
  return Math.min(score, 10); // Cap at 10 points
};

const calculateAvailabilityScore = (availability: 'immediate' | '1-2weeks' | 'month' | 'unavailable'): number => {
  switch (availability) {
    case 'immediate': return 10;
    case '1-2weeks': return 5;
    case 'month': return 3;
    case 'unavailable': return 0;
    default: return 0;
  }
};

// Example candidate data for demonstration
export const getExampleCandidateData = (): CandidateData => ({
  yearsExperience: 8,
  employerMatchScore: 85,
  skillCertificates: {
    required: 10,
    additional: 3
  },
  locumJobs: 5,
  platformActivity: 10,
  volunteering: {
    volunteer: true,
    lesserWage: true,
    distantLocation: true
  },
  locationProximity: 5,
  awards: {
    leadershipAwards: 3,
    advancedCommunication: true,
    languages: 2
  },
  remoteWork: true,
  availability: 'immediate'
});

// Calculate example score for demonstration
export const calculateExampleScore = (): ScoreBreakdown => {
  return calculateGlohsenScore(getExampleCandidateData());
};

// Calculate GLOHSEN score from professional profile
export const calculateScoreFromProfile = (profile: ProfessionalProfile): ScoreBreakdown => {
  // Convert profile to candidate data format
  const candidateData: CandidateData = {
    yearsExperience: profile.experience?.reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.current ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
      const yearDiff = endDate.getFullYear() - startDate.getFullYear();
      return total + yearDiff;
    }, 0) || 0,
    employerMatchScore: profile.glohsenScore ? profile.glohsenScore - 50 : 70, // Example calculation
    skillCertificates: {
      required: profile.skills?.length || 0,
      additional: profile.certificates?.length || 0
    },
    locumJobs: 3, // This would normally come from job history
    platformActivity: 8, // This would normally come from platform data
    volunteering: {
      volunteer: true, // This would normally come from profile data
      lesserWage: false,
      distantLocation: false
    },
    locationProximity: profile.location?.city ? 5 : 0,
    awards: {
      leadershipAwards: profile.awards?.length || 0,
      advancedCommunication: true,
      languages: profile.languages?.length || 0
    },
    remoteWork: true,
    availability: 'immediate'
  };
  
  return calculateGlohsenScore(candidateData);
};
