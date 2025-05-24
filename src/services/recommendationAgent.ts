
import { UserRole } from "@/lib/unis";
import { aiActivityAgent, UserActivity } from "./aiActivityAgent";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  price: number;
  instructor: string;
  rating: number;
  tags: string[];
  enrollmentCount: number;
  createdDate: string;
}

export interface CourseRecommendation {
  course: Course;
  reason: string;
  confidence: number;
  priority: number;
  recommendationType: 'skill-based' | 'activity-based' | 'peer-based' | 'trending' | 'personalized';
}

export interface CourseCreationSuggestion {
  title: string;
  category: string;
  demand: number;
  targetAudience: string[];
  suggestedInstructor?: string;
  reasoning: string;
}

export class RecommendationAgent {
  private courses: Course[] = [];
  private userPreferences: Map<string, any> = new Map();
  private courseCreationSuggestions: CourseCreationSuggestion[] = [];

  constructor() {
    this.initializeMockCourses();
    this.generateCourseCreationSuggestions();
  }

  private initializeMockCourses(): void {
    this.courses = [
      {
        id: '1',
        title: 'Advanced Cardiac Life Support (ACLS)',
        description: 'Comprehensive ACLS training for healthcare professionals',
        category: 'Emergency Medicine',
        difficulty: 'Advanced',
        duration: '8 hours',
        price: 150,
        instructor: 'Dr. Smith',
        rating: 4.8,
        tags: ['cardiology', 'emergency', 'certification'],
        enrollmentCount: 1250,
        createdDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Medical Ethics in Clinical Practice',
        description: 'Essential ethics for healthcare decision-making',
        category: 'Ethics',
        difficulty: 'Intermediate',
        duration: '4 hours',
        price: 75,
        instructor: 'Dr. Johnson',
        rating: 4.6,
        tags: ['ethics', 'clinical-practice', 'decision-making'],
        enrollmentCount: 980,
        createdDate: '2024-02-01'
      },
      {
        id: '3',
        title: 'Evidence-Based Clinical Decision Making',
        description: 'Learn to make informed clinical decisions using evidence',
        category: 'Clinical Skills',
        difficulty: 'Advanced',
        duration: '6 hours',
        price: 120,
        instructor: 'Dr. Wilson',
        rating: 4.7,
        tags: ['evidence-based', 'clinical-skills', 'decision-making'],
        enrollmentCount: 750,
        createdDate: '2024-01-30'
      },
      {
        id: '4',
        title: 'Basic Life Support Refresher',
        description: 'Update your BLS skills and certification',
        category: 'Emergency Medicine',
        difficulty: 'Basic',
        duration: '3 hours',
        price: 50,
        instructor: 'Nurse Mary',
        rating: 4.9,
        tags: ['bls', 'basic', 'refresher'],
        enrollmentCount: 2100,
        createdDate: '2024-03-01'
      },
      {
        id: '5',
        title: 'Maternal Health and Midwifery Updates',
        description: 'Latest practices in maternal health and midwifery',
        category: 'Obstetrics & Gynecology',
        difficulty: 'Intermediate',
        duration: '5 hours',
        price: 100,
        instructor: 'Dr. Sarah',
        rating: 4.8,
        tags: ['maternal-health', 'midwifery', 'updates'],
        enrollmentCount: 650,
        createdDate: '2024-02-15'
      }
    ];
  }

  private generateCourseCreationSuggestions(): void {
    this.courseCreationSuggestions = [
      {
        title: 'Telemedicine Best Practices',
        category: 'Digital Health',
        demand: 85,
        targetAudience: ['professional', 'student'],
        reasoning: 'High search volume for telemedicine content and forum discussions about remote care'
      },
      {
        title: 'Mental Health in Healthcare Workers',
        category: 'Mental Health',
        demand: 78,
        targetAudience: ['professional'],
        reasoning: 'Increasing forum discussions about burnout and mental health support'
      },
      {
        title: 'Pediatric Emergency Procedures',
        category: 'Pediatrics',
        demand: 72,
        targetAudience: ['professional', 'student'],
        reasoning: 'Gap identified in pediatric emergency training based on user search patterns'
      }
    ];
  }

  async getPersonalizedCourseRecommendations(
    userId: string,
    userType: UserRole,
    limit: number = 5
  ): Promise<CourseRecommendation[]> {
    try {
      const userActivity = aiActivityAgent.getUserActivity(userId);
      const activityPatterns = aiActivityAgent.getActivityPatterns(userId);
      const recommendations: CourseRecommendation[] = [];
      
      // Activity-based recommendations
      if (userActivity) {
        const activityRecs = this.getActivityBasedRecommendations(userActivity);
        recommendations.push(...activityRecs);
      }
      
      // Peer-based recommendations
      const peerRecs = await this.getPeerBasedRecommendations(userId, userType);
      recommendations.push(...peerRecs);
      
      // Trending recommendations
      const trendingRecs = this.getTrendingRecommendations(userType);
      recommendations.push(...trendingRecs);
      
      // Skill gap recommendations
      if (userActivity) {
        const skillRecs = this.getSkillGapRecommendations(userActivity);
        recommendations.push(...skillRecs);
      }
      
      // Remove duplicates and sort by priority and confidence
      const uniqueRecs = this.removeDuplicateRecommendations(recommendations);
      
      return uniqueRecs
        .sort((a, b) => b.priority - a.priority || b.confidence - a.confidence)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return this.getFallbackRecommendations(userType, limit);
    }
  }

  private getActivityBasedRecommendations(userActivity: UserActivity): CourseRecommendation[] {
    const recommendations: CourseRecommendation[] = [];
    
    // Analyze recent courses for progression
    userActivity.recentCourses.forEach(courseTitle => {
      if (courseTitle.includes('BLS') || courseTitle.includes('Basic Life Support')) {
        const aclsCourse = this.courses.find(c => c.title.includes('ACLS'));
        if (aclsCourse) {
          recommendations.push({
            course: aclsCourse,
            reason: 'Natural progression from BLS to ACLS certification',
            confidence: 0.9,
            priority: 5,
            recommendationType: 'activity-based'
          });
        }
      }
    });

    // Analyze quiz patterns
    userActivity.recentQuizzes.forEach(quiz => {
      if (quiz.includes('Ethics')) {
        const ethicsCourse = this.courses.find(c => c.category === 'Ethics');
        if (ethicsCourse) {
          recommendations.push({
            course: ethicsCourse,
            reason: 'Based on your ethics quiz performance',
            confidence: 0.8,
            priority: 4,
            recommendationType: 'activity-based'
          });
        }
      }
    });

    // Analyze search history
    userActivity.searchHistory.forEach(search => {
      const searchLower = search.toLowerCase();
      this.courses.forEach(course => {
        if (course.tags.some(tag => searchLower.includes(tag))) {
          recommendations.push({
            course,
            reason: `Matches your search for "${search}"`,
            confidence: 0.7,
            priority: 3,
            recommendationType: 'activity-based'
          });
        }
      });
    });

    return recommendations;
  }

  private async getPeerBasedRecommendations(userId: string, userType: UserRole): Promise<CourseRecommendation[]> {
    const recommendations: CourseRecommendation[] = [];
    const similarUsers = aiActivityAgent.getSimilarUsers(userId);
    
    // Get popular courses among similar users
    const coursePopularity = new Map<string, number>();
    
    similarUsers.forEach(user => {
      user.recentCourses.forEach(courseTitle => {
        const course = this.courses.find(c => c.title === courseTitle);
        if (course) {
          coursePopularity.set(course.id, (coursePopularity.get(course.id) || 0) + 1);
        }
      });
    });

    // Convert to recommendations
    for (const [courseId, popularity] of coursePopularity) {
      const course = this.courses.find(c => c.id === courseId);
      if (course && popularity >= 2) {
        recommendations.push({
          course,
          reason: `Popular among ${popularity} similar professionals`,
          confidence: Math.min(0.9, popularity * 0.3),
          priority: 4,
          recommendationType: 'peer-based'
        });
      }
    }

    return recommendations;
  }

  private getTrendingRecommendations(userType: UserRole): CourseRecommendation[] {
    // Sort courses by enrollment count and recent creation
    const trending = this.courses
      .sort((a, b) => {
        const aScore = a.enrollmentCount + (new Date(a.createdDate).getTime() / 1000000);
        const bScore = b.enrollmentCount + (new Date(b.createdDate).getTime() / 1000000);
        return bScore - aScore;
      })
      .slice(0, 3);

    return trending.map(course => ({
      course,
      reason: `Trending course with ${course.enrollmentCount} enrollments`,
      confidence: 0.6,
      priority: 2,
      recommendationType: 'trending' as const
    }));
  }

  private getSkillGapRecommendations(userActivity: UserActivity): CourseRecommendation[] {
    const recommendations: CourseRecommendation[] = [];
    
    // Identify potential skill gaps based on GLOHSEN score
    if (userActivity.glohsenScore < 80) {
      // Recommend basic courses for improvement
      const basicCourses = this.courses.filter(c => c.difficulty === 'Basic');
      basicCourses.forEach(course => {
        recommendations.push({
          course,
          reason: 'Recommended to improve your GLOHSEN score',
          confidence: 0.7,
          priority: 4,
          recommendationType: 'skill-based'
        });
      });
    }

    // Profile completeness recommendations
    if (userActivity.profileCompleteness < 90) {
      const profileBoostCourse = this.courses.find(c => c.category === 'Clinical Skills');
      if (profileBoostCourse) {
        recommendations.push({
          course: profileBoostCourse,
          reason: 'Complete your professional development profile',
          confidence: 0.8,
          priority: 3,
          recommendationType: 'personalized'
        });
      }
    }

    return recommendations;
  }

  private removeDuplicateRecommendations(recommendations: CourseRecommendation[]): CourseRecommendation[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      if (seen.has(rec.course.id)) {
        return false;
      }
      seen.add(rec.course.id);
      return true;
    });
  }

  private getFallbackRecommendations(userType: UserRole, limit: number): CourseRecommendation[] {
    return this.courses.slice(0, limit).map(course => ({
      course,
      reason: 'Recommended for healthcare professionals',
      confidence: 0.5,
      priority: 1,
      recommendationType: 'trending' as const
    }));
  }

  async getCourseCreationSuggestions(tutorId?: string): Promise<CourseCreationSuggestion[]> {
    // Return suggestions based on platform needs and user demands
    return this.courseCreationSuggestions.sort((a, b) => b.demand - a.demand);
  }

  async getTopRatedCourses(limit: number = 5): Promise<Course[]> {
    return this.courses
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async searchCourses(query: string): Promise<Course[]> {
    const queryLower = query.toLowerCase();
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(queryLower) ||
      course.description.toLowerCase().includes(queryLower) ||
      course.category.toLowerCase().includes(queryLower) ||
      course.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );
  }

  // Track user interaction with recommendations
  trackRecommendationInteraction(userId: string, courseId: string, action: 'view' | 'enroll' | 'dismiss'): void {
    console.log(`User ${userId} ${action}ed course ${courseId}`);
    
    // Update AI activity agent with this interaction
    const course = this.courses.find(c => c.id === courseId);
    if (course && action === 'enroll') {
      aiActivityAgent.trackUserActivity(userId, {
        recentCourses: [course.title]
      });
    }
  }

  // Get recommendation performance metrics
  getRecommendationMetrics(): any {
    return {
      totalRecommendations: this.courses.length,
      averageRating: this.courses.reduce((sum, course) => sum + course.rating, 0) / this.courses.length,
      totalEnrollments: this.courses.reduce((sum, course) => sum + course.enrollmentCount, 0),
      courseCreationSuggestions: this.courseCreationSuggestions.length
    };
  }
}

export const recommendationAgent = new RecommendationAgent();
