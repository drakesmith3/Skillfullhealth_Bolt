
import type { ProfessionalProfile } from '@/types/dashboard';

export interface CandidateData {
  experience: {
    years: number;
    positions: string[];
  };
  skills: string[];
  skillLevels: Record<string, number>;
  certifications: string[];
  locumJobs: number;
  platformActivity: {
    logins: number;
    applications: number;
    profileUpdates: number;
  };
  volunteering: boolean;
  location: {
    city: string;
    state: string;
    country: string;
  };
  employerMatch: number;
}

export interface ScoreBreakdown {
  experience: number;
  skills: number;
  locumJobs: number;
  platformActivity: number;
  volunteering: number;
  location: number;
  employerMatch: number;
  total: number;
}

// Calculate GLOHSEN score from candidate data
export const calculateGlohsenScore = (data: CandidateData): ScoreBreakdown => {
  // Experience score (max 10 points)
  const experienceScore = Math.min(data.experience.years, 10);
  
  // Skills score (max 15 points)
  const skillsScore = Math.min(
    Object.values(data.skillLevels).reduce((sum, level) => sum + level, 0) / 2,
    15
  );
  
  // Locum jobs score (max 10 points)
  const locumJobsScore = Math.min(data.locumJobs * 2, 10);
  
  // Platform activity score (max 10 points)
  const activityScore = Math.min(
    (data.platformActivity.logins / 10) + 
    (data.platformActivity.applications * 2) + 
    (data.platformActivity.profileUpdates * 3),
    10
  );
  
  // Volunteering score (max 10 points)
  const volunteeringScore = data.volunteering ? 10 : 0;
  
  // Location score (max 5 points)
  // This is a simplified location scoring logic
  const locationScore = data.location.country === 'Nigeria' ? 5 : 3;
  
  // Employer match score (max 110 points)
  const employerMatchScore = data.employerMatch;
  
  // Calculate total score
  const totalScore = 
    experienceScore + 
    skillsScore + 
    locumJobsScore + 
    activityScore + 
    volunteeringScore + 
    locationScore +
    employerMatchScore;
  
  return {
    experience: experienceScore,
    skills: skillsScore,
    locumJobs: locumJobsScore,
    platformActivity: activityScore,
    volunteering: volunteeringScore,
    location: locationScore,
    employerMatch: employerMatchScore,
    total: totalScore
  };
};

// Example candidate data to use when no data is provided
export const calculateExampleCandidate = (): ScoreBreakdown => {
  const exampleData: CandidateData = {
    experience: {
      years: 8,
      positions: ['Doctor', 'Specialist', 'Consultant']
    },
    skills: ['Surgery', 'Diagnosis', 'Patient Care', 'Emergency Medicine'],
    skillLevels: {
      'Surgery': 4,
      'Diagnosis': 5,
      'Patient Care': 5,
      'Emergency Medicine': 3
    },
    certifications: ['Medical License', 'Basic Life Support', 'Advanced Cardiac Life Support'],
    locumJobs: 4,
    platformActivity: {
      logins: 45,
      applications: 3,
      profileUpdates: 2
    },
    volunteering: true,
    location: {
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria'
    },
    employerMatch: 85
  };
  
  return calculateGlohsenScore(exampleData);
};

// Calculate GLOHSEN score from professional profile
export const calculateScoreFromProfile = (profile: ProfessionalProfile): ScoreBreakdown => {
  // Convert profile to candidate data format
  const candidateData: CandidateData = {
    experience: {
      years: profile.experience?.reduce((total, exp) => {
        // Calculate years in each position
        const startDate = new Date(exp.startDate);
        const endDate = exp.current ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
        return total + yearDiff;
      }, 0) || 0,
      positions: profile.experience?.map(exp => exp.position) || []
    },
    skills: profile.skills?.map(skill => skill.name) || [],
    skillLevels: profile.skills?.reduce((obj, skill) => {
      let level = 1;
      switch (skill.level) {
        case 'BEGINNER': level = 1; break;
        case 'INTERMEDIATE': level = 2; break;
        case 'ADVANCED': level = 3; break;
        case 'EXPERT': level = 4; break;
      }
      return { ...obj, [skill.name]: level };
    }, {}) || {},
    certifications: profile.certificates?.map(cert => cert.name) || [],
    locumJobs: 3, // This would normally come from job history
    platformActivity: {
      logins: 30, // This would normally come from platform data
      applications: 5,
      profileUpdates: 3
    },
    volunteering: true, // This would normally come from profile data
    location: {
      city: profile.location?.city || '',
      state: profile.location?.state || '',
      country: profile.location?.country || ''
    },
    employerMatch: profile.glohsenScore ? profile.glohsenScore - 50 : 70 // Just an example calculation
  };
  
  return calculateGlohsenScore(candidateData);
};
