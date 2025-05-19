export interface EmployerCriteria {
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

export interface CriteriaWeights {
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
}

export interface CriteriaSliderProps {
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

export interface EmployerCriteriaFormProps {
  onSubmit: (criteria: EmployerCriteria) => Promise<void>;
  initialCriteria?: Partial<EmployerCriteria>;
  isLoading?: boolean;
  error?: string | null;
}
