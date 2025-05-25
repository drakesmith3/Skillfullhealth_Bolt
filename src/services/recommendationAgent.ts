
export interface UserProfile {
  userId: string;
  userType: 'professional' | 'student' | 'client' | 'tutor' | 'employer';
  specialization: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  completedCourses: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  goals: string[];
  location: string;
  glohsenScore: number;
}

export interface Recommendation {
  id: string;
  type: 'course' | 'job' | 'networking' | 'skill' | 'certification';
  title: string;
  description: string;
  relevanceScore: number;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface RecommendationResponse {
  userId: string;
  recommendations: Recommendation[];
  totalRecommendations: number;
  generatedAt: string;
  confidence: number;
}

export class RecommendationAgent {
  private userProfiles: Map<string, UserProfile> = new Map();
  private courses: any[] = [];
  private jobs: any[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Mock user profile
    const mockProfile: UserProfile = {
      userId: 'prof_001',
      userType: 'professional',
      specialization: 'Emergency Medicine',
      experienceLevel: 'intermediate',
      interests: ['Cardiology', 'Trauma Care', 'Emergency Procedures'],
      completedCourses: ['BLS_Basic', 'First_Aid'],
      preferredLearningStyle: 'visual',
      goals: ['Get ACLS Certification', 'Improve Emergency Response'],
      location: 'Lagos, Nigeria',
      glohsenScore: 77
    };

    this.userProfiles.set('prof_001', mockProfile);

    // Mock courses
    this.courses = [
      {
        id: 'course_001',
        title: 'Advanced Cardiovascular Life Support (ACLS)',
        category: 'Emergency Medicine',
        difficulty: 'advanced',
        duration: '16 hours',
        description: 'Advanced training in cardiac emergency management'
      },
      {
        id: 'course_002',
        title: 'Trauma Management Essentials',
        category: 'Emergency Medicine',
        difficulty: 'intermediate',
        duration: '12 hours',
        description: 'Comprehensive trauma care protocols'
      },
      {
        id: 'course_003',
        title: 'Pediatric Emergency Medicine',
        category: 'Emergency Medicine',
        difficulty: 'advanced',
        duration: '20 hours',
        description: 'Specialized care for pediatric emergencies'
      }
    ];

    // Mock jobs
    this.jobs = [
      {
        id: 'job_001',
        title: 'Emergency Medicine Physician - Lagos General',
        location: 'Lagos, Nigeria',
        type: 'locum',
        specialization: 'Emergency Medicine',
        experienceRequired: 'intermediate'
      },
      {
        id: 'job_002',
        title: 'Trauma Surgeon - Abuja Medical Center',
        location: 'Abuja, Nigeria',
        type: 'permanent',
        specialization: 'Trauma Surgery',
        experienceRequired: 'advanced'
      }
    ];
  }

  public generateRecommendations(userId: string): RecommendationResponse {
    const userProfile = this.userProfiles.get(userId);
    
    if (!userProfile) {
      return {
        userId,
        recommendations: [],
        totalRecommendations: 0,
        generatedAt: new Date().toISOString(),
        confidence: 0
      };
    }

    const recommendations: Recommendation[] = [];

    // Course recommendations
    const courseRecs = this.generateCourseRecommendations(userProfile);
    recommendations.push(...courseRecs);

    // Job recommendations
    const jobRecs = this.generateJobRecommendations(userProfile);
    recommendations.push(...jobRecs);

    // Skill recommendations
    const skillRecs = this.generateSkillRecommendations(userProfile);
    recommendations.push(...skillRecs);

    // Sort by relevance score
    recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      userId,
      recommendations: recommendations.slice(0, 10), // Top 10 recommendations
      totalRecommendations: recommendations.length,
      generatedAt: new Date().toISOString(),
      confidence: this.calculateConfidence(userProfile, recommendations)
    };
  }

  private generateCourseRecommendations(profile: UserProfile): Recommendation[] {
    const recommendations: Recommendation[] = [];

    this.courses.forEach(course => {
      let relevanceScore = 0;

      // Check specialization match
      if (course.category === profile.specialization) {
        relevanceScore += 0.4;
      }

      // Check interest alignment
      profile.interests.forEach(interest => {
        if (course.title.toLowerCase().includes(interest.toLowerCase()) ||
            course.description.toLowerCase().includes(interest.toLowerCase())) {
          relevanceScore += 0.2;
        }
      });

      // Check if not already completed
      if (!profile.completedCourses.includes(course.id)) {
        relevanceScore += 0.3;
      }

      // Check experience level appropriateness
      if (this.isAppropriateLevel(course.difficulty, profile.experienceLevel)) {
        relevanceScore += 0.1;
      }

      if (relevanceScore > 0.3) {
        recommendations.push({
          id: `rec_course_${course.id}`,
          type: 'course',
          title: course.title,
          description: course.description,
          relevanceScore,
          reasoning: `Matches your specialization in ${profile.specialization} and aligns with your interests`,
          priority: relevanceScore > 0.7 ? 'high' : relevanceScore > 0.5 ? 'medium' : 'low',
          estimatedTime: course.duration,
          difficulty: course.difficulty,
          category: course.category
        });
      }
    });

    return recommendations;
  }

  private generateJobRecommendations(profile: UserProfile): Recommendation[] {
    const recommendations: Recommendation[] = [];

    this.jobs.forEach(job => {
      let relevanceScore = 0;

      // Location proximity
      if (job.location.includes(profile.location.split(',')[0])) {
        relevanceScore += 0.3;
      }

      // Specialization match
      if (job.specialization === profile.specialization || 
          profile.interests.some(interest => 
            job.title.toLowerCase().includes(interest.toLowerCase()))) {
        relevanceScore += 0.4;
      }

      // Experience level match
      if (this.isAppropriateLevel(job.experienceRequired, profile.experienceLevel)) {
        relevanceScore += 0.3;
      }

      if (relevanceScore > 0.4) {
        recommendations.push({
          id: `rec_job_${job.id}`,
          type: 'job',
          title: job.title,
          description: `${job.type} position in ${job.location}`,
          relevanceScore,
          reasoning: `Matches your location and specialization`,
          priority: relevanceScore > 0.7 ? 'high' : relevanceScore > 0.5 ? 'medium' : 'low',
          category: 'Career Opportunities'
        });
      }
    });

    return recommendations;
  }

  private generateSkillRecommendations(profile: UserProfile): Recommendation[] {
    const skillRecommendations = [
      {
        skill: 'Advanced Cardiac Monitoring',
        relevance: profile.interests.includes('Cardiology') ? 0.8 : 0.3,
        description: 'Enhanced cardiac monitoring and interpretation skills'
      },
      {
        skill: 'Telemedicine Proficiency',
        relevance: 0.6,
        description: 'Remote consultation and digital health skills'
      },
      {
        skill: 'Leadership in Emergency Settings',
        relevance: profile.experienceLevel === 'advanced' ? 0.7 : 0.4,
        description: 'Team leadership during critical situations'
      }
    ];

    return skillRecommendations
      .filter(skill => skill.relevance > 0.4)
      .map(skill => ({
        id: `rec_skill_${skill.skill.replace(/\s+/g, '_').toLowerCase()}`,
        type: 'skill' as const,
        title: skill.skill,
        description: skill.description,
        relevanceScore: skill.relevance,
        reasoning: 'Based on your current skill gaps and career progression',
        priority: skill.relevance > 0.7 ? 'high' as const : 'medium' as const,
        category: 'Skill Development'
      }));
  }

  private isAppropriateLevel(requiredLevel: string, userLevel: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const userIndex = levels.indexOf(userLevel);
    const requiredIndex = levels.indexOf(requiredLevel);
    
    // User should be at the required level or one level below/above
    return Math.abs(userIndex - requiredIndex) <= 1;
  }

  private calculateConfidence(profile: UserProfile, recommendations: Recommendation[]): number {
    if (recommendations.length === 0) return 0;
    
    const avgRelevance = recommendations.reduce((sum, rec) => sum + rec.relevanceScore, 0) / recommendations.length;
    const profileCompleteness = this.calculateProfileCompleteness(profile);
    
    return (avgRelevance * 0.7) + (profileCompleteness * 0.3);
  }

  private calculateProfileCompleteness(profile: UserProfile): number {
    let completeness = 0;
    const fields = ['specialization', 'interests', 'goals', 'location'];
    
    fields.forEach(field => {
      if (profile[field as keyof UserProfile] && 
          (Array.isArray(profile[field as keyof UserProfile]) ? 
           (profile[field as keyof UserProfile] as any[]).length > 0 : 
           profile[field as keyof UserProfile])) {
        completeness += 0.25;
      }
    });
    
    return completeness;
  }

  public updateUserProfile(userId: string, updates: Partial<UserProfile>): void {
    const existing = this.userProfiles.get(userId);
    if (existing) {
      this.userProfiles.set(userId, { ...existing, ...updates });
    }
  }

  public getRecommendationStats(): any {
    return {
      totalUsers: this.userProfiles.size,
      averageRecommendations: 8.5,
      topCategories: ['Emergency Medicine', 'Cardiology', 'Trauma Care'],
      successRate: 0.82
    };
  }
}

export const recommendationAgent = new RecommendationAgent();

// Singleton pattern for admin dashboard compatibility
export class RecommendationAgentSingleton {
  private static instance: RecommendationAgent;

  static getInstance(): RecommendationAgent {
    if (!RecommendationAgentSingleton.instance) {
      RecommendationAgentSingleton.instance = new RecommendationAgent();
    }
    return RecommendationAgentSingleton.instance;
  }

  static getStats() {
    return RecommendationAgentSingleton.getInstance().getRecommendationStats();
  }

  static generateRecommendations(userId: string) {
    return RecommendationAgentSingleton.getInstance().generateRecommendations(userId);
  }
}

export default RecommendationAgentSingleton;
