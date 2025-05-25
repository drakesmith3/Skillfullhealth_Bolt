
export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  userType?: string;
  subject: string;
  message: string;
  timestamp: string;
  rating?: number;
  category?: string;
}

export interface UserMatch {
  userId: string;
  userType: string;
  confidence: number;
  matchReason: string;
}

export interface RoutingResult {
  matched: boolean;
  userMatch?: UserMatch;
  confidence: number;
  action: 'route_to_dashboard' | 'create_unregistered_entry' | 'manual_review';
  reasoning: string;
}

export class FeedbackRoutingAgent {
  private registeredUsers: Array<{
    id: string;
    email: string;
    name: string;
    userType: string;
  }> = [];

  constructor() {
    this.loadRegisteredUsers();
  }

  private loadRegisteredUsers(): void {
    // Mock registered users - replace with actual user database
    this.registeredUsers = [
      { id: '1', email: 'dr.sarah@example.com', name: 'Dr. Sarah Johnson', userType: 'professional' },
      { id: '2', email: 'mary.nurse@example.com', name: 'Mary Adebayo', userType: 'professional' },
      { id: '3', email: 'student.john@university.edu', name: 'John Smith', userType: 'student' },
      { id: '4', email: 'hr@hospital.com', name: 'Lagos General Hospital', userType: 'employer' }
    ];
  }

  private calculateNameSimilarity(name1: string, name2: string): number {
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');
    const n1 = normalize(name1);
    const n2 = normalize(name2);
    
    if (n1 === n2) return 1.0;
    
    // Simple Levenshtein distance-based similarity
    const matrix = Array(n2.length + 1).fill(null).map(() => Array(n1.length + 1).fill(null));
    
    for (let i = 0; i <= n1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= n2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= n2.length; j++) {
      for (let i = 1; i <= n1.length; i++) {
        const indicator = n1[i - 1] === n2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    const maxLength = Math.max(n1.length, n2.length);
    return maxLength === 0 ? 1 : (maxLength - matrix[n2.length][n1.length]) / maxLength;
  }

  private findUserMatches(submission: FeedbackSubmission): UserMatch[] {
    const matches: UserMatch[] = [];
    
    for (const user of this.registeredUsers) {
      let confidence = 0;
      let matchReason = '';
      
      // Email exact match
      if (user.email.toLowerCase() === submission.email.toLowerCase()) {
        confidence = 1.0;
        matchReason = 'Exact email match';
      }
      // Name similarity match
      else {
        const nameSimilarity = this.calculateNameSimilarity(user.name, submission.name);
        if (nameSimilarity > 0.8) {
          confidence = nameSimilarity * 0.7; // Reduce confidence for name-only matches
          matchReason = `High name similarity (${Math.round(nameSimilarity * 100)}%)`;
        }
      }
      
      // User type consistency check
      if (submission.userType && submission.userType !== user.userType) {
        confidence *= 0.5; // Reduce confidence if user types don't match
        matchReason += ` (user type mismatch)`;
      }
      
      if (confidence > 0.3) {
        matches.push({
          userId: user.id,
          userType: user.userType,
          confidence,
          matchReason
        });
      }
    }
    
    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  public routeFeedback(submission: FeedbackSubmission): RoutingResult {
    const matches = this.findUserMatches(submission);
    
    if (matches.length === 0) {
      return {
        matched: false,
        confidence: 0,
        action: 'create_unregistered_entry',
        reasoning: 'No matching registered users found'
      };
    }
    
    const bestMatch = matches[0];
    
    if (bestMatch.confidence >= 0.8) {
      return {
        matched: true,
        userMatch: bestMatch,
        confidence: bestMatch.confidence,
        action: 'route_to_dashboard',
        reasoning: `High confidence match: ${bestMatch.matchReason}`
      };
    } else if (bestMatch.confidence >= 0.5) {
      return {
        matched: true,
        userMatch: bestMatch,
        confidence: bestMatch.confidence,
        action: 'manual_review',
        reasoning: `Medium confidence match requires review: ${bestMatch.matchReason}`
      };
    } else {
      return {
        matched: false,
        confidence: bestMatch.confidence,
        action: 'create_unregistered_entry',
        reasoning: `Low confidence match, treating as unregistered: ${bestMatch.matchReason}`
      };
    }
  }

  public async routeToUserDashboard(userMatch: UserMatch, submission: FeedbackSubmission): Promise<boolean> {
    try {
      console.log(`Routing feedback to ${userMatch.userType} dashboard for user ${userMatch.userId}`);
      
      // Here you would implement the actual routing logic
      // For now, we'll just log and simulate success
      const dashboardMessage = {
        id: submission.id,
        type: 'feedback',
        subject: submission.subject,
        message: submission.message,
        timestamp: submission.timestamp,
        rating: submission.rating
      };
      
      console.log('Dashboard message created:', dashboardMessage);
      return true;
    } catch (error) {
      console.error('Error routing to dashboard:', error);
      return false;
    }
  }

  public async createUnregisteredEntry(submission: FeedbackSubmission): Promise<string> {
    try {
      const entryId = `unregistered_${Date.now()}`;
      
      const unregisteredEntry = {
        id: entryId,
        name: submission.name,
        email: submission.email,
        userType: submission.userType || 'unknown',
        feedbackId: submission.id,
        subject: submission.subject,
        message: submission.message,
        timestamp: submission.timestamp,
        status: 'pending_registration'
      };
      
      console.log('Unregistered entry created:', unregisteredEntry);
      
      // Here you would save to your unregistered users database
      return entryId;
    } catch (error) {
      console.error('Error creating unregistered entry:', error);
      throw error;
    }
  }

  public async processFeedback(submission: FeedbackSubmission): Promise<RoutingResult> {
    const routingResult = this.routeFeedback(submission);
    
    try {
      if (routingResult.action === 'route_to_dashboard' && routingResult.userMatch) {
        const success = await this.routeToUserDashboard(routingResult.userMatch, submission);
        if (!success) {
          routingResult.action = 'manual_review';
          routingResult.reasoning += ' (dashboard routing failed)';
        }
      } else if (routingResult.action === 'create_unregistered_entry') {
        await this.createUnregisteredEntry(submission);
      }
    } catch (error) {
      console.error('Error processing feedback:', error);
      routingResult.action = 'manual_review';
      routingResult.reasoning += ' (processing error occurred)';
    }
    
    return routingResult;
  }

  public getUnregisteredEntries(): any[] {
    // This would return actual unregistered entries from your database
    return [];
  }

  public getRoutingStats(): any {
    return {
      totalProcessed: 0,
      successfulMatches: 0,
      unregisteredEntries: 0,
      manualReviews: 0
    };
  }
}

export const feedbackRoutingAgent = new FeedbackRoutingAgent();

// Add singleton pattern for admin dashboard compatibility
export class FeedbackRoutingAgentSingleton {
  private static instance: FeedbackRoutingAgent;

  static getInstance(): FeedbackRoutingAgent {
    if (!FeedbackRoutingAgentSingleton.instance) {
      FeedbackRoutingAgentSingleton.instance = new FeedbackRoutingAgent();
    }
    return FeedbackRoutingAgentSingleton.instance;
  }

  static getRoutingStats() {
    return {
      matched: 45,
      unmatched: 12,
      categories: {
        professional: { matched: 25, unmatched: 5 },
        facility: { matched: 15, unmatched: 4 },
        tutor: { matched: 5, unmatched: 3 }
      }
    };
  }

  static getUnmatchedFeedback() {
    return [
      { id: 1, name: "John Doe", email: "john@example.com", subject: "Service Inquiry" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Feedback" }
    ];
  }

  static getManualReviewQueue() {
    return [
      { id: 3, name: "Dr. Wilson", email: "wilson@hospital.com", confidence: 0.6 }
    ];
  }

  static getUnregisteredEntities() {
    return [
      { id: 1, name: "New Hospital", email: "contact@newhospital.com" },
      { id: 2, name: "Health Center", email: "info@healthcenter.com" }
    ];
  }

  static async processPendingFeedback() {
    console.log("Processing pending feedback...");
    return Promise.resolve();
  }
}

// Export the singleton for admin dashboard
export default FeedbackRoutingAgentSingleton;
