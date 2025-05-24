
export interface UserActivity {
  userId: string;
  userType: 'professional' | 'student' | 'client' | 'tutor' | 'employer';
  recentQuizzes: string[];
  recentGames: string[];
  recentCourses: string[];
  searchHistory: string[];
  forumParticipation: string[];
  profileCompleteness: number;
  glohsenScore: number;
  lastActive: Date;
}

export interface ActivityPattern {
  category: string;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  recommendations: string[];
}

export class AIActivityAgent {
  private userActivities: Map<string, UserActivity> = new Map();
  private activityPatterns: Map<string, ActivityPattern[]> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Mock user activities
    const mockActivity: UserActivity = {
      userId: 'prof_001',
      userType: 'professional',
      recentQuizzes: ['BLS_Quiz_Advanced', 'Ethics_Quiz_Basic'],
      recentGames: ['Medical_Terminology_Game', 'Anatomy_Challenge'],
      recentCourses: ['BLS_Advanced', 'Medical_Ethics'],
      searchHistory: ['ACLS courses', 'Emergency medicine', 'Cardiology updates'],
      forumParticipation: ['Emergency Medicine Discussion', 'Career Advice Thread'],
      profileCompleteness: 95,
      glohsenScore: 77,
      lastActive: new Date()
    };

    this.userActivities.set('prof_001', mockActivity);
  }

  public trackUserActivity(userId: string, activity: Partial<UserActivity>): void {
    const existing = this.userActivities.get(userId);
    if (existing) {
      const updated = { ...existing, ...activity, lastActive: new Date() };
      this.userActivities.set(userId, updated);
    } else {
      const newActivity: UserActivity = {
        userId,
        userType: 'professional',
        recentQuizzes: [],
        recentGames: [],
        recentCourses: [],
        searchHistory: [],
        forumParticipation: [],
        profileCompleteness: 0,
        glohsenScore: 0,
        lastActive: new Date(),
        ...activity
      };
      this.userActivities.set(userId, newActivity);
    }

    this.analyzeActivityPatterns(userId);
  }

  private analyzeActivityPatterns(userId: string): void {
    const activity = this.userActivities.get(userId);
    if (!activity) return;

    const patterns: ActivityPattern[] = [];

    // Analyze quiz patterns
    if (activity.recentQuizzes.length > 0) {
      patterns.push({
        category: 'quizzes',
        frequency: activity.recentQuizzes.length,
        trend: this.calculateTrend(activity.recentQuizzes),
        recommendations: this.generateQuizRecommendations(activity.recentQuizzes)
      });
    }

    // Analyze course patterns
    if (activity.recentCourses.length > 0) {
      patterns.push({
        category: 'courses',
        frequency: activity.recentCourses.length,
        trend: this.calculateTrend(activity.recentCourses),
        recommendations: this.generateCourseRecommendations(activity.recentCourses)
      });
    }

    // Analyze search patterns
    if (activity.searchHistory.length > 0) {
      patterns.push({
        category: 'search',
        frequency: activity.searchHistory.length,
        trend: this.calculateTrend(activity.searchHistory),
        recommendations: this.generateSearchBasedRecommendations(activity.searchHistory)
      });
    }

    this.activityPatterns.set(userId, patterns);
  }

  private calculateTrend(items: string[]): 'increasing' | 'decreasing' | 'stable' {
    // Simple trend calculation based on recent activity
    if (items.length >= 3) return 'increasing';
    if (items.length === 1) return 'decreasing';
    return 'stable';
  }

  private generateQuizRecommendations(quizzes: string[]): string[] {
    const recommendations = [];
    
    if (quizzes.some(q => q.includes('BLS'))) {
      recommendations.push('ACLS Advanced Course');
    }
    
    if (quizzes.some(q => q.includes('Ethics'))) {
      recommendations.push('Advanced Medical Ethics Course');
    }

    return recommendations;
  }

  private generateCourseRecommendations(courses: string[]): string[] {
    const recommendations = [];
    
    if (courses.some(c => c.includes('BLS'))) {
      recommendations.push('ACLS Certification');
      recommendations.push('Emergency Medicine Updates');
    }
    
    if (courses.some(c => c.includes('Ethics'))) {
      recommendations.push('Clinical Decision Making');
      recommendations.push('Patient Communication Skills');
    }

    return recommendations;
  }

  private generateSearchBasedRecommendations(searches: string[]): string[] {
    const recommendations = [];
    
    if (searches.some(s => s.toLowerCase().includes('cardiology'))) {
      recommendations.push('Advanced Cardiology Course');
      recommendations.push('Cardiac Emergency Management');
    }
    
    if (searches.some(s => s.toLowerCase().includes('emergency'))) {
      recommendations.push('Trauma Care Certification');
      recommendations.push('Emergency Procedures Update');
    }

    return recommendations;
  }

  public getUserActivity(userId: string): UserActivity | null {
    return this.userActivities.get(userId) || null;
  }

  public getActivityPatterns(userId: string): ActivityPattern[] {
    return this.activityPatterns.get(userId) || [];
  }

  public getSimilarUsers(userId: string): UserActivity[] {
    const userActivity = this.userActivities.get(userId);
    if (!userActivity) return [];

    const similarUsers: UserActivity[] = [];
    
    for (const [id, activity] of this.userActivities) {
      if (id === userId) continue;
      
      if (activity.userType === userActivity.userType) {
        const similarity = this.calculateSimilarity(userActivity, activity);
        if (similarity > 0.3) {
          similarUsers.push(activity);
        }
      }
    }

    return similarUsers.sort((a, b) => 
      this.calculateSimilarity(userActivity, b) - this.calculateSimilarity(userActivity, a)
    );
  }

  private calculateSimilarity(user1: UserActivity, user2: UserActivity): number {
    let similarity = 0;
    let factors = 0;

    // Compare recent courses
    const commonCourses = user1.recentCourses.filter(c => user2.recentCourses.includes(c));
    similarity += (commonCourses.length / Math.max(user1.recentCourses.length, 1)) * 0.4;
    factors++;

    // Compare GLOHSEN scores
    const scoreDiff = Math.abs(user1.glohsenScore - user2.glohsenScore);
    similarity += (1 - (scoreDiff / 100)) * 0.3;
    factors++;

    // Compare profile completeness
    const completenessDiff = Math.abs(user1.profileCompleteness - user2.profileCompleteness);
    similarity += (1 - (completenessDiff / 100)) * 0.3;
    factors++;

    return similarity / factors;
  }

  public generatePersonalizedRecommendations(userId: string): string[] {
    const activity = this.userActivities.get(userId);
    const patterns = this.activityPatterns.get(userId);
    
    if (!activity || !patterns) return [];

    const recommendations = new Set<string>();

    // Add pattern-based recommendations
    patterns.forEach(pattern => {
      pattern.recommendations.forEach(rec => recommendations.add(rec));
    });

    // Add peer-based recommendations
    const similarUsers = this.getSimilarUsers(userId);
    similarUsers.slice(0, 3).forEach(user => {
      user.recentCourses.forEach(course => {
        if (!activity.recentCourses.includes(course)) {
          recommendations.add(`${course} (Popular among similar professionals)`);
        }
      });
    });

    return Array.from(recommendations);
  }

  public getEngagementMetrics(userId: string): any {
    const activity = this.userActivities.get(userId);
    if (!activity) return null;

    return {
      totalActivities: activity.recentQuizzes.length + activity.recentGames.length + activity.recentCourses.length,
      profileCompleteness: activity.profileCompleteness,
      glohsenScore: activity.glohsenScore,
      forumParticipation: activity.forumParticipation.length,
      learningStreak: this.calculateLearningStreak(activity),
      engagementLevel: this.calculateEngagementLevel(activity)
    };
  }

  private calculateLearningStreak(activity: UserActivity): number {
    // Simple calculation based on recent activities
    return Math.min(activity.recentCourses.length + activity.recentQuizzes.length, 30);
  }

  private calculateEngagementLevel(activity: UserActivity): 'low' | 'medium' | 'high' {
    const totalActivities = activity.recentQuizzes.length + activity.recentGames.length + activity.recentCourses.length;
    
    if (totalActivities >= 10) return 'high';
    if (totalActivities >= 5) return 'medium';
    return 'low';
  }
}

export const aiActivityAgent = new AIActivityAgent();
