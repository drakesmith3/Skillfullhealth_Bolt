
// Define the types for the candidate data and score breakdown
export interface CandidateData {
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
    gpa?: number;
  }[];
  experience: {
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    yearsInRole: number;
  }[];
  skills: string[];
  certifications: {
    name: string;
    issuer: string;
    dateObtained: string;
    expiryDate?: string;
    active: boolean;
  }[];
  publications?: {
    title: string;
    publisher: string;
    datePublished: string;
    citations?: number;
  }[];
  awards?: {
    name: string;
    issuer: string;
    dateReceived: string;
  }[];
  platformActivity: {
    postsCreated: number;
    commentsGiven: number;
    likesReceived: number;
    profileCompleteness: number;
  };
  feedback?: {
    averageRating: number;
    totalReviews: number;
  };
  employerMatch?: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    certificationMatch: number;
  };
}

export interface ScoreBreakdown {
  total: number;
  education: number;
  experience: number;
  skills: number;
  certifications: number;
  publications: number;
  awards: number;
  platformActivity: number;
  feedback: number;
  employerMatch: number;
}

// Calculate the GLOHSEN score based on candidate data
export const calculateGlohsenScore = (data: CandidateData): ScoreBreakdown => {
  // Education score (max 20)
  const educationScore = calculateEducationScore(data.education);
  
  // Experience score (max 35)
  const experienceScore = calculateExperienceScore(data.experience);
  
  // Skills score (max 15)
  const skillsScore = Math.min(15, data.skills.length * 1.5);
  
  // Certifications score (max 15)
  const certificationsScore = Math.min(15, data.certifications.filter(c => c.active).length * 3);
  
  // Publications score (max 10)
  const publicationsScore = data.publications ? 
    Math.min(10, data.publications.length * 2) : 0;
  
  // Awards score (max 10)
  const awardsScore = data.awards ? 
    Math.min(10, data.awards.length * 2.5) : 0;
  
  // Platform activity score (max 15)
  const platformActivityScore = calculatePlatformActivityScore(data.platformActivity);
  
  // Feedback score (max 20)
  const feedbackScore = data.feedback ? 
    Math.min(20, data.feedback.averageRating * 4) : 0;
  
  // Employer match score (max 60)
  const employerMatchScore = data.employerMatch ? 
    Math.min(60, 
      (data.employerMatch.skillsMatch * 20) + 
      (data.employerMatch.experienceMatch * 20) + 
      (data.employerMatch.educationMatch * 10) + 
      (data.employerMatch.certificationMatch * 10)
    ) : 0;
  
  // Calculate total score (max 200)
  const totalScore = Math.round(
    educationScore + 
    experienceScore + 
    skillsScore + 
    certificationsScore + 
    publicationsScore + 
    awardsScore + 
    platformActivityScore + 
    feedbackScore + 
    employerMatchScore
  );
  
  return {
    total: totalScore,
    education: Math.round(educationScore),
    experience: Math.round(experienceScore),
    skills: Math.round(skillsScore),
    certifications: Math.round(certificationsScore),
    publications: Math.round(publicationsScore),
    awards: Math.round(awardsScore),
    platformActivity: Math.round(platformActivityScore),
    feedback: Math.round(feedbackScore),
    employerMatch: Math.round(employerMatchScore)
  };
};

// Helper functions

function calculateEducationScore(education: CandidateData['education']): number {
  if (!education || education.length === 0) return 0;
  
  // Weight scores based on degree level
  let score = 0;
  for (const edu of education) {
    if (edu.degree.includes('PhD') || edu.degree.includes('Doctorate')) {
      score += 20;
    } else if (edu.degree.includes('Master')) {
      score += 15;
    } else if (edu.degree.includes('Bachelor')) {
      score += 10;
    } else {
      score += 5;
    }
    
    // Extra points for GPA if available
    if (edu.gpa && edu.gpa > 3.5) {
      score += 2;
    } else if (edu.gpa && edu.gpa > 3.0) {
      score += 1;
    }
  }
  
  return Math.min(20, score);
}

function calculateExperienceScore(experience: CandidateData['experience']): number {
  if (!experience || experience.length === 0) return 0;
  
  // Calculate total years of experience
  const totalYears = experience.reduce((sum, exp) => sum + exp.yearsInRole, 0);
  
  // Base score from total years
  let score = Math.min(25, totalYears * 2.5);
  
  // Bonus points for leadership positions
  const leadershipPositions = experience.filter(exp => 
    exp.position.toLowerCase().includes('manager') || 
    exp.position.toLowerCase().includes('director') || 
    exp.position.toLowerCase().includes('head') ||
    exp.position.toLowerCase().includes('chief') ||
    exp.position.toLowerCase().includes('lead')
  );
  
  score += Math.min(10, leadershipPositions.length * 3);
  
  return Math.min(35, score);
}

function calculatePlatformActivityScore(activity: CandidateData['platformActivity']): number {
  if (!activity) return 0;
  
  const postScore = Math.min(5, activity.postsCreated * 0.5);
  const commentScore = Math.min(3, activity.commentsGiven * 0.2);
  const likesScore = Math.min(2, activity.likesReceived * 0.1);
  const completenessScore = Math.min(5, activity.profileCompleteness * 0.05);
  
  return Math.min(15, postScore + commentScore + likesScore + completenessScore);
}
