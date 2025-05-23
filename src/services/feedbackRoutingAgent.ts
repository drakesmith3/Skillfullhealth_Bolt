interface FeedbackSubmission {
  id: string;
  submitterName: string;
  submitterEmail: string;
  feedbackType: 'professional' | 'tutor' | 'employer' | 'facility' | 'general';
  targetName?: string; // Name of person/entity being reviewed
  targetEmail?: string;
  facilityName?: string;
  rating: number;
  feedback: string;
  dateSubmitted: string;
  source: 'GeneralFeedbackForm' | 'DirectFeedback';
  isAnonymous: boolean;
}

interface MatchedFeedback extends FeedbackSubmission {
  targetUserId: string;
  targetUserType: 'professional' | 'tutor' | 'employer';
  routed: true;
}

interface UnmatchedFeedback extends FeedbackSubmission {
  routed: false;
  needsManualReview: boolean;
  potentialMatches?: Array<{
    userId: string;
    name: string;
    email: string;
    userType: string;
    confidence: number;
  }>;
}

class FeedbackRoutingAgent {
  private static instance: FeedbackRoutingAgent;
  private processingInterval: NodeJS.Timeout | null = null;
  private isActive: boolean = false;

  private constructor() {}

  public static getInstance(): FeedbackRoutingAgent {
    if (!FeedbackRoutingAgent.instance) {
      FeedbackRoutingAgent.instance = new FeedbackRoutingAgent();
    }
    return FeedbackRoutingAgent.instance;
  }

  public start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('Feedback Routing AI Agent started');
    
    // Process feedback every 5 minutes
    this.processingInterval = setInterval(() => {
      this.processPendingFeedback();
    }, 5 * 60 * 1000);

    // Initial processing
    this.processPendingFeedback();
  }

  public stop(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    this.isActive = false;
    console.log('Feedback Routing AI Agent stopped');
  }
  // Main processing function - made public for admin control
  public async processPendingFeedback(): Promise<void> {
    try {
      // Get unprocessed feedback from storage/database
      const pendingFeedback = this.getPendingFeedback();
      
      if (pendingFeedback.length === 0) return;

      console.log(`Processing ${pendingFeedback.length} pending feedback submissions`);

      for (const feedback of pendingFeedback) {
        await this.routeFeedback(feedback);
      }
    } catch (error) {
      console.error('Feedback Routing Agent: Error processing feedback:', error);
    }
  }

  // Core routing logic
  private async routeFeedback(feedback: FeedbackSubmission): Promise<void> {
    // Try to match feedback to registered users
    const matchResult = await this.findUserMatch(feedback);
    
    if (matchResult.found) {
      // MATCHED: Route to user's dashboard
      const matchedFeedback: MatchedFeedback = {
        ...feedback,
        targetUserId: matchResult.userId,
        targetUserType: matchResult.userType,
        routed: true
      };
      
      await this.routeToUserDashboard(matchedFeedback);
      console.log(`Routed feedback to ${matchResult.userType} dashboard: ${matchResult.userId}`);
      
    } else {
      // UNMATCHED: Store for manual review or create entry
      const unmatchedFeedback: UnmatchedFeedback = {
        ...feedback,
        routed: false,
        needsManualReview: matchResult.potentialMatches && matchResult.potentialMatches.length > 0,
        potentialMatches: matchResult.potentialMatches
      };
      
      await this.handleUnmatchedFeedback(unmatchedFeedback);
      console.log(`Stored unmatched feedback for: ${feedback.targetName || 'Unknown'}`);
    }

    // Mark as processed
    this.markFeedbackAsProcessed(feedback.id);
  }

  // AI matching algorithm
  private async findUserMatch(feedback: FeedbackSubmission): Promise<{
    found: boolean;
    userId?: string;
    userType?: 'professional' | 'tutor' | 'employer';
    confidence?: number;
    potentialMatches?: Array<{
      userId: string;
      name: string;
      email: string;
      userType: string;
      confidence: number;
    }>;
  }> {
    // Get registered users from database/storage
    const registeredUsers = this.getRegisteredUsers();
    const potentialMatches = [];

    for (const user of registeredUsers) {
      const confidence = this.calculateMatchConfidence(feedback, user);
      
      if (confidence >= 0.3) { // 30% confidence threshold
        potentialMatches.push({
          userId: user.id,
          name: user.name,
          email: user.email,
          userType: user.type,
          confidence
        });
      }
    }

    // Sort by confidence
    potentialMatches.sort((a, b) => b.confidence - a.confidence);

    // High confidence match (>= 80%)
    if (potentialMatches.length > 0 && potentialMatches[0].confidence >= 0.8) {
      return {
        found: true,
        userId: potentialMatches[0].userId,
        userType: potentialMatches[0].userType as 'professional' | 'tutor' | 'employer',
        confidence: potentialMatches[0].confidence
      };
    }

    return {
      found: false,
      potentialMatches: potentialMatches.slice(0, 5) // Top 5 potential matches
    };
  }

  // AI confidence scoring
  private calculateMatchConfidence(feedback: FeedbackSubmission, user: any): number {
    let confidence = 0;
    const weights = {
      exactNameMatch: 0.4,      // 40% - Exact name match
      emailMatch: 0.3,          // 30% - Email match
      fuzzyNameMatch: 0.15,     // 15% - Similar name
      facilityMatch: 0.1,       // 10% - Same facility
      roleMatch: 0.05           // 5% - Role/specialty match
    };

    // Exact name match
    if (feedback.targetName && user.name) {
      if (feedback.targetName.toLowerCase().trim() === user.name.toLowerCase().trim()) {
        confidence += weights.exactNameMatch;
      } else {
        // Fuzzy name matching
        const similarity = this.calculateStringSimilarity(
          feedback.targetName.toLowerCase(),
          user.name.toLowerCase()
        );
        if (similarity >= 0.8) {
          confidence += weights.fuzzyNameMatch * similarity;
        }
      }
    }

    // Email match
    if (feedback.targetEmail && user.email) {
      if (feedback.targetEmail.toLowerCase() === user.email.toLowerCase()) {
        confidence += weights.emailMatch;
      }
    }

    // Facility match
    if (feedback.facilityName && user.currentFacility) {
      const facilitySimilarity = this.calculateStringSimilarity(
        feedback.facilityName.toLowerCase(),
        user.currentFacility.toLowerCase()
      );
      if (facilitySimilarity >= 0.7) {
        confidence += weights.facilityMatch * facilitySimilarity;
      }
    }

    // Role/User type match
    if (feedback.feedbackType === user.type) {
      confidence += weights.roleMatch;
    }

    return Math.min(confidence, 1.0); // Cap at 100%
  }

  // String similarity using Levenshtein distance
  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Route matched feedback to user dashboards
  private async routeToUserDashboard(matchedFeedback: MatchedFeedback): Promise<void> {
    const dashboardFeedback = {
      id: matchedFeedback.id,
      submitterName: matchedFeedback.isAnonymous ? 'Anonymous' : matchedFeedback.submitterName,
      rating: matchedFeedback.rating,
      feedback: matchedFeedback.feedback,
      dateReceived: matchedFeedback.dateSubmitted,
      source: matchedFeedback.source,
      type: 'received_feedback'
    };

    // Store in user's dashboard notifications/feedback section
    const userFeedbackKey = `user_feedback_${matchedFeedback.targetUserId}`;
    const existingFeedback = JSON.parse(localStorage.getItem(userFeedbackKey) || '[]');
    existingFeedback.push(dashboardFeedback);
    localStorage.setItem(userFeedbackKey, JSON.stringify(existingFeedback));

    // Create notification for the user
    this.createNotificationForUser(matchedFeedback.targetUserId, {
      type: 'feedback_received',
      title: 'New Feedback Received',
      message: `You received a ${matchedFeedback.rating}-star review from ${dashboardFeedback.submitterName}`,
      timestamp: new Date().toISOString(),
      read: false
    });

    // Update routing statistics
    this.updateRoutingStats('matched', matchedFeedback.targetUserType);
  }

  // Handle unmatched feedback
  private async handleUnmatchedFeedback(unmatchedFeedback: UnmatchedFeedback): Promise<void> {
    // Store unmatched feedback for admin review
    const unmatchedKey = 'unmatched_feedback';
    const existingUnmatched = JSON.parse(localStorage.getItem(unmatchedKey) || '[]');
    existingUnmatched.push(unmatchedFeedback);
    localStorage.setItem(unmatchedKey, JSON.stringify(existingUnmatched));

    // If high-confidence potential matches exist, flag for manual review
    if (unmatchedFeedback.potentialMatches && unmatchedFeedback.potentialMatches.length > 0) {
      const reviewKey = 'feedback_manual_review';
      const manualReview = JSON.parse(localStorage.getItem(reviewKey) || '[]');
      manualReview.push({
        feedbackId: unmatchedFeedback.id,
        potentialMatches: unmatchedFeedback.potentialMatches,
        needsReview: true,
        dateAdded: new Date().toISOString()
      });
      localStorage.setItem(reviewKey, JSON.stringify(manualReview));
    }

    // Create entry in unregistered entities database
    await this.createUnregisteredEntityEntry(unmatchedFeedback);

    // Update routing statistics
    this.updateRoutingStats('unmatched', unmatchedFeedback.feedbackType);
  }

  // Create entry for unregistered entities
  private async createUnregisteredEntityEntry(feedback: UnmatchedFeedback): Promise<void> {
    const entityKey = 'unregistered_entities';
    const entities = JSON.parse(localStorage.getItem(entityKey) || '[]');
    
    // Check if entity already exists
    const existingEntity = entities.find(entity => 
      entity.name.toLowerCase() === feedback.targetName?.toLowerCase() &&
      entity.type === feedback.feedbackType
    );

    if (existingEntity) {
      // Add feedback to existing entity
      existingEntity.feedbacks.push({
        id: feedback.id,
        submitterName: feedback.isAnonymous ? 'Anonymous' : feedback.submitterName,
        rating: feedback.rating,
        feedback: feedback.feedback,
        dateReceived: feedback.dateSubmitted
      });
      existingEntity.averageRating = this.calculateAverageRating(existingEntity.feedbacks);
      existingEntity.totalFeedbacks = existingEntity.feedbacks.length;
    } else {
      // Create new entity entry
      entities.push({
        id: `unregistered_${Date.now()}`,
        name: feedback.targetName || 'Unknown',
        type: feedback.feedbackType,
        facilityName: feedback.facilityName,
        feedbacks: [{
          id: feedback.id,
          submitterName: feedback.isAnonymous ? 'Anonymous' : feedback.submitterName,
          rating: feedback.rating,
          feedback: feedback.feedback,
          dateReceived: feedback.dateSubmitted
        }],
        averageRating: feedback.rating,
        totalFeedbacks: 1,
        dateFirstFeedback: feedback.dateSubmitted,
        invitationSent: false
      });
    }

    localStorage.setItem(entityKey, JSON.stringify(entities));
  }

  // Helper methods
  private getPendingFeedback(): FeedbackSubmission[] {
    // In real implementation, this would fetch from database
    const pendingKey = 'pending_feedback';
    return JSON.parse(localStorage.getItem(pendingKey) || '[]');
  }

  private getRegisteredUsers(): any[] {
    // In real implementation, this would fetch from user database
    // For now, return mock data
    return [
      {
        id: 'user_001',
        name: 'Dr. Adunni Olatunji',
        email: 'adunni.olatunji@email.com',
        type: 'professional',
        currentFacility: 'Lagos University Teaching Hospital'
      },
      {
        id: 'user_002',
        name: 'Nurse Kemi Adebayo',
        email: 'kemi.adebayo@email.com',
        type: 'professional',
        currentFacility: 'Korle Bu Teaching Hospital'
      }
      // ... more users
    ];
  }

  private markFeedbackAsProcessed(feedbackId: string): void {
    const processedKey = 'processed_feedback_ids';
    const processed = JSON.parse(localStorage.getItem(processedKey) || '[]');
    processed.push(feedbackId);
    localStorage.setItem(processedKey, JSON.stringify(processed));
  }

  private createNotificationForUser(userId: string, notification: any): void {
    const notificationKey = `user_notifications_${userId}`;
    const notifications = JSON.parse(localStorage.getItem(notificationKey) || '[]');
    notifications.unshift(notification); // Add to beginning
    localStorage.setItem(notificationKey, JSON.stringify(notifications));
  }

  private calculateAverageRating(feedbacks: any[]): number {
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return Math.round((total / feedbacks.length) * 10) / 10; // Round to 1 decimal
  }

  private updateRoutingStats(type: 'matched' | 'unmatched', category: string): void {
    const statsKey = 'feedback_routing_stats';
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"matched": 0, "unmatched": 0, "categories": {}}');
    
    stats[type]++;
    if (!stats.categories[category]) stats.categories[category] = { matched: 0, unmatched: 0 };
    stats.categories[category][type]++;
    
    localStorage.setItem(statsKey, JSON.stringify(stats));
  }

  // Public methods for admin interface
  public getRoutingStats(): any {
    return JSON.parse(localStorage.getItem('feedback_routing_stats') || '{"matched": 0, "unmatched": 0, "categories": {}}');
  }

  public getUnmatchedFeedback(): UnmatchedFeedback[] {
    return JSON.parse(localStorage.getItem('unmatched_feedback') || '[]');
  }

  public getManualReviewQueue(): any[] {
    return JSON.parse(localStorage.getItem('feedback_manual_review') || '[]');
  }

  public getUnregisteredEntities(): any[] {
    return JSON.parse(localStorage.getItem('unregistered_entities') || '[]');
  }

  // Manual matching by admin
  public async manuallyMatchFeedback(feedbackId: string, userId: string, userType: string): Promise<void> {
    // Implementation for manual matching
    console.log(`Manually matching feedback ${feedbackId} to user ${userId}`);
  }
}

export default FeedbackRoutingAgent;