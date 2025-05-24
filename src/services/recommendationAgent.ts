
interface Course {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  enrollments: number;
  tags: string[];
  createdBy: string;
  lastUpdated: string;
}

interface UserActivity {
  userId: string;
  userType: 'professional' | 'student' | 'client' | 'tutor';
  recentGames: string[];
  recentQuizzes: string[];
  coursesCompleted: string[];
  coursesInProgress: string[];
  searchHistory: string[];
  profileTags: string[];
  glohsenScore?: number;
}

interface CourseRecommendation {
  course: Course;
  reason: string;
  confidence: number;
  priority: 'High' | 'Medium' | 'Low';
}

interface CourseCreationSuggestion {
  suggestedTitle: string;
  category: string;
  demand: number;
  targetAudience: string[];
  keyTopics: string[];
  confidence: number;
}

class RecommendationAgent {
  private static instance: RecommendationAgent;
  private updateInterval: NodeJS.Timeout | null = null;
  private isActive: boolean = false;
  private lastUpdate: string | null = null;

  private constructor() {}

  public static getInstance(): RecommendationAgent {
    if (!RecommendationAgent.instance) {
      RecommendationAgent.instance = new RecommendationAgent();
    }
    return RecommendationAgent.instance;
  }

  // Start the recommendation agent
  public start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('Recommendation AI Agent started');
    
    // Update recommendations every hour
    this.updateInterval = setInterval(() => {
      this.updateRecommendations();
    }, 60 * 60 * 1000); // 1 hour

    // Initial update
    this.updateRecommendations();
  }

  // Stop the recommendation agent
  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isActive = false;
    console.log('Recommendation AI Agent stopped');
  }

  // Get agent status
  public getStatus() {
    return {
      active: this.isActive,
      lastUpdate: this.lastUpdate,
      recommendationsGenerated: this.getStoredRecommendations().length,
      courseSuggestionsGenerated: this.getStoredCourseSuggestions().length
    };
  }

  // Force update recommendations
  public async forceUpdate(): Promise<void> {
    await this.updateRecommendations();
  }

  // Get personalized course recommendations for a user
  public getPersonalizedRecommendations(userId: string, userType: string): CourseRecommendation[] {
    const userActivity = this.getUserActivity(userId);
    const allCourses = this.getMockCourses();
    const recommendations: CourseRecommendation[] = [];

    // Algorithm 1: Based on similar users
    const similarUsers = this.findSimilarUsers(userActivity);
    const popularAmongSimilar = this.getPopularCoursesAmongUsers(similarUsers);
    
    popularAmongSimilar.forEach(course => {
      if (!userActivity.coursesCompleted.includes(course.id)) {
        recommendations.push({
          course,
          reason: `Popular among ${userType}s with similar interests`,
          confidence: 0.8,
          priority: 'High'
        });
      }
    });

    // Algorithm 2: Based on recent activities
    const activityBasedCourses = this.getCoursesByActivity(userActivity);
    activityBasedCourses.forEach(course => {
      if (!userActivity.coursesCompleted.includes(course.id) && 
          !recommendations.find(r => r.course.id === course.id)) {
        recommendations.push({
          course,
          reason: 'Based on your recent games and quizzes',
          confidence: 0.7,
          priority: 'Medium'
        });
      }
    });

    // Algorithm 3: Trending courses
    const trendingCourses = this.getTrendingCourses();
    trendingCourses.forEach(course => {
      if (!userActivity.coursesCompleted.includes(course.id) && 
          !recommendations.find(r => r.course.id === course.id)) {
        recommendations.push({
          course,
          reason: 'Trending in the medical community',
          confidence: 0.6,
          priority: 'Low'
        });
      }
    });

    // Sort by priority and confidence
    return recommendations
      .sort((a, b) => {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        const scoreA = priorityWeight[a.priority] + a.confidence;
        const scoreB = priorityWeight[b.priority] + b.confidence;
        return scoreB - scoreA;
      })
      .slice(0, 10); // Return top 10 recommendations
  }

  // Get course creation suggestions for tutors
  public getCourseSuggestions(): CourseCreationSuggestion[] {
    const searchHistory = this.getAggregatedSearchHistory();
    const forumDiscussions = this.getForumTopics();
    const suggestions: CourseCreationSuggestion[] = [];

    // Analyze search patterns
    const searchDemand = this.analyzeSearchDemand(searchHistory);
    Object.entries(searchDemand).forEach(([topic, demand]) => {
      suggestions.push({
        suggestedTitle: `Advanced ${topic} Fundamentals`,
        category: this.categorizeTopicAutomatic(topic),
        demand: demand as number,
        targetAudience: this.getTargetAudienceForTopic(topic),
        keyTopics: this.getRelatedTopics(topic),
        confidence: Math.min(0.9, (demand as number) / 100)
      });
    });

    // Analyze forum discussions
    const forumDemand = this.analyzeForumDemand(forumDiscussions);
    Object.entries(forumDemand).forEach(([topic, demand]) => {
      if (!suggestions.find(s => s.suggestedTitle.includes(topic))) {
        suggestions.push({
          suggestedTitle: `Practical ${topic} for Healthcare Professionals`,
          category: this.categorizeTopicAutomatic(topic),
          demand: demand as number,
          targetAudience: ['professionals', 'students'],
          keyTopics: this.getRelatedTopics(topic),
          confidence: Math.min(0.8, (demand as number) / 50)
        });
      }
    });

    return suggestions
      .sort((a, b) => b.demand - a.demand)
      .slice(0, 5); // Return top 5 suggestions
  }

  // Private helper methods
  private updateRecommendations(): void {
    try {
      // Update recommendations for all active users
      const activeUsers = this.getActiveUsers();
      const allRecommendations: Record<string, CourseRecommendation[]> = {};

      activeUsers.forEach(user => {
        allRecommendations[user.userId] = this.getPersonalizedRecommendations(user.userId, user.userType);
      });

      // Store recommendations
      localStorage.setItem('glohsen_course_recommendations', JSON.stringify(allRecommendations));

      // Update course suggestions for tutors
      const courseSuggestions = this.getCourseSuggestions();
      localStorage.setItem('glohsen_course_suggestions', JSON.stringify(courseSuggestions));

      this.lastUpdate = new Date().toISOString();
      console.log('Recommendation Agent: Updated recommendations and course suggestions');
    } catch (error) {
      console.error('Recommendation Agent: Error updating recommendations:', error);
    }
  }

  private getUserActivity(userId: string): UserActivity {
    // Mock user activity - in real app, this would come from database
    return {
      userId,
      userType: 'professional',
      recentGames: ['cardiology-quiz', 'anatomy-game'],
      recentQuizzes: ['emergency-medicine', 'pharmacology'],
      coursesCompleted: ['basic-cardiology'],
      coursesInProgress: ['advanced-surgery'],
      searchHistory: ['emergency medicine', 'cardiology', 'surgery'],
      profileTags: ['Emergency Medicine', 'Cardiology'],
      glohsenScore: 85
    };
  }

  private findSimilarUsers(userActivity: UserActivity): UserActivity[] {
    // Mock similar users based on profile tags and activities
    return [
      {
        userId: 'user2',
        userType: userActivity.userType,
        recentGames: ['cardiology-quiz', 'surgery-simulation'],
        recentQuizzes: ['emergency-medicine', 'critical-care'],
        coursesCompleted: ['basic-cardiology', 'advanced-emergency'],
        coursesInProgress: ['surgical-techniques'],
        searchHistory: ['cardiology', 'emergency', 'critical care'],
        profileTags: ['Emergency Medicine', 'Critical Care'],
        glohsenScore: 88
      }
    ];
  }

  private getPopularCoursesAmongUsers(users: UserActivity[]): Course[] {
    const mockCourses = this.getMockCourses();
    // Return courses popular among similar users
    return mockCourses.filter(course => 
      course.category === 'Emergency Medicine' || course.category === 'Cardiology'
    ).slice(0, 3);
  }

  private getCoursesByActivity(userActivity: UserActivity): Course[] {
    const mockCourses = this.getMockCourses();
    // Return courses related to user's recent activities
    return mockCourses.filter(course => 
      userActivity.recentGames.some(game => course.tags.some(tag => game.includes(tag.toLowerCase()))) ||
      userActivity.recentQuizzes.some(quiz => course.tags.some(tag => quiz.includes(tag.toLowerCase())))
    ).slice(0, 3);
  }

  private getTrendingCourses(): Course[] {
    const mockCourses = this.getMockCourses();
    // Return trending courses based on enrollments and ratings
    return mockCourses
      .sort((a, b) => (b.enrollments * b.rating) - (a.enrollments * a.rating))
      .slice(0, 3);
  }

  private getMockCourses(): Course[] {
    return [
      {
        id: 'course-1',
        title: 'Advanced Emergency Medicine',
        category: 'Emergency Medicine',
        difficulty: 'Advanced',
        price: 299,
        rating: 4.8,
        enrollments: 1250,
        tags: ['emergency', 'critical-care', 'trauma'],
        createdBy: 'Dr. Smith',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'course-2',
        title: 'Cardiology Fundamentals',
        category: 'Cardiology',
        difficulty: 'Intermediate',
        price: 199,
        rating: 4.6,
        enrollments: 890,
        tags: ['cardiology', 'heart', 'circulation'],
        createdBy: 'Dr. Johnson',
        lastUpdated: '2024-01-10'
      },
      {
        id: 'course-3',
        title: 'Surgical Techniques Masterclass',
        category: 'Surgery',
        difficulty: 'Advanced',
        price: 399,
        rating: 4.9,
        enrollments: 650,
        tags: ['surgery', 'techniques', 'procedures'],
        createdBy: 'Dr. Williams',
        lastUpdated: '2024-01-12'
      }
    ];
  }

  private getActiveUsers(): UserActivity[] {
    // Mock active users
    return [
      {
        userId: 'user1',
        userType: 'professional',
        recentGames: ['cardiology-quiz'],
        recentQuizzes: ['emergency-medicine'],
        coursesCompleted: ['basic-cardiology'],
        coursesInProgress: ['advanced-surgery'],
        searchHistory: ['emergency medicine'],
        profileTags: ['Emergency Medicine'],
        glohsenScore: 85
      }
    ];
  }

  private getAggregatedSearchHistory(): Record<string, number> {
    // Mock aggregated search data
    return {
      'emergency medicine': 45,
      'cardiology': 38,
      'surgery': 32,
      'pharmacology': 28,
      'radiology': 25
    };
  }

  private getForumTopics(): string[] {
    // Mock forum discussion topics
    return [
      'Latest developments in emergency medicine',
      'Cardiology best practices',
      'Surgical innovation techniques',
      'Pharmacology updates'
    ];
  }

  private analyzeSearchDemand(searchHistory: Record<string, number>): Record<string, number> {
    return searchHistory;
  }

  private analyzeForumDemand(topics: string[]): Record<string, number> {
    const demand: Record<string, number> = {};
    topics.forEach(topic => {
      const key = topic.split(' ')[0]; // Use first word as key
      demand[key] = (demand[key] || 0) + 10;
    });
    return demand;
  }

  private categorizeTopicAutomatic(topic: string): string {
    const categories: Record<string, string> = {
      'emergency': 'Emergency Medicine',
      'cardiology': 'Cardiology',
      'surgery': 'Surgery',
      'pharmacology': 'Pharmacy',
      'radiology': 'Radiology'
    };
    return categories[topic.toLowerCase()] || 'General Medicine';
  }

  private getTargetAudienceForTopic(topic: string): string[] {
    const audiences: Record<string, string[]> = {
      'emergency': ['professionals', 'students'],
      'cardiology': ['professionals', 'specialists'],
      'surgery': ['professionals', 'specialists'],
      'pharmacology': ['professionals', 'students', 'pharmacists']
    };
    return audiences[topic.toLowerCase()] || ['professionals'];
  }

  private getRelatedTopics(topic: string): string[] {
    const related: Record<string, string[]> = {
      'emergency': ['trauma care', 'critical care', 'triage'],
      'cardiology': ['heart disease', 'ECG', 'cardiac surgery'],
      'surgery': ['surgical techniques', 'anesthesia', 'post-op care'],
      'pharmacology': ['drug interactions', 'dosage', 'side effects']
    };
    return related[topic.toLowerCase()] || [topic];
  }

  private getStoredRecommendations(): CourseRecommendation[] {
    try {
      const stored = localStorage.getItem('glohsen_course_recommendations');
      return stored ? Object.values(JSON.parse(stored)).flat() : [];
    } catch {
      return [];
    }
  }

  private getStoredCourseSuggestions(): CourseCreationSuggestion[] {
    try {
      const stored = localStorage.getItem('glohsen_course_suggestions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

export default RecommendationAgent;
