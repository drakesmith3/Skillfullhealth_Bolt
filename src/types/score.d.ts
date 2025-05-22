
export interface CandidateData {
  yearsExperience: number;
  employerMatchScore: number;
  skillCertificates: {
    required: number;
    additional: number;
  };
  locumJobs: number;
  platformActivity: number;
  volunteering: {
    volunteer: boolean;
    lesserWage: boolean;
    distantLocation: boolean;
  };
  locationProximity: number;
  awards: {
    leadershipAwards: number;
    advancedCommunication: boolean;
    languages: number;
  };
  remoteWork: boolean;
  availability: 'immediate' | '1-2weeks' | 'month' | 'unavailable';
}

export interface ScoreBreakdown {
  experience: number;
  employerMatch: number;
  skills: number;
  locumJobs: number;
  platformActivity: number;
  volunteering: number;
  location: number;
  awards: number;
  remoteWork: number;
  availability: number;
  total: number;
}

export interface ScoreHistory {
  date: string;
  score: number;
}

export interface Certificate {
  name: string;
  status: "CURRENT" | "EXPIRED" | "PENDING";
  expiryDate: string;
  url: string;
}
