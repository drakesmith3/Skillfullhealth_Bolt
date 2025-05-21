
export interface Certificate {
  name: string;
  status: 'CURRENT' | 'EXPIRED' | 'PENDING';
  expiryDate: string;
  url?: string;
}

export interface Skill {
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  yearsOfExperience: number;
  endorsements?: number;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Experience {
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  url?: string;
  citations?: number;
}

export interface ProfessionalProfile {
  userId: string;
  fullName: string;
  headline?: string;
  specialty: string;
  bio?: string;
  location?: {
    city: string;
    state?: string;
    country: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  skills: Skill[];
  certificates: Certificate[];
  education: Education[];
  experience: Experience[];
  awards?: Award[];
  publications?: Publication[];
  languages?: {
    name: string;
    proficiency: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE';
  }[];
  profilePicture?: string;
  glohsenScore?: number;
  profileCompleteness?: number;
}
