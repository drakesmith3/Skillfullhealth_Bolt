// Social features utility for friend management and messaging
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  level: number;
  status: 'pending' | 'accepted' | 'blocked';
  addedDate: string;
  mutualFriends: number;
  gameStats: {
    gamesPlayed: number;
    averageScore: number;
    favoriteGame: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'game_invite' | 'achievement' | 'system';
  isRead: boolean;
  metadata?: {
    gameId?: string;
    achievementId?: string;
    inviteData?: any;
  };
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isActive: boolean;
  type: 'direct' | 'group';
  groupName?: string;
  groupAvatar?: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  message?: string;
  mutualFriends: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  accountType: 'CLIENT' | 'PROFESSIONAL' | 'STUDENT';
  level: number;
  totalScore: number;
  joinDate: string;
  isOnline: boolean;
  lastSeen: string;
  preferences: {
    allowFriendRequests: boolean;
    showOnlineStatus: boolean;
    allowGameInvites: boolean;
    soundEnabled: boolean;
  };
  gameStats: {
    gamesPlayed: number;
    averageScore: number;
    favoriteGame: string;
    achievements: string[];
    currentStreak: number;
    longestStreak: number;
  };
}

export class SocialManager {
  private static instance: SocialManager;
  private friends: Friend[] = [];
  private conversations: Conversation[] = [];
  private friendRequests: FriendRequest[] = [];
  private currentUser: UserProfile | null = null;

  private constructor() {
    this.initializeMockData();
  }

  public static getInstance(): SocialManager {
    if (!SocialManager.instance) {
      SocialManager.instance = new SocialManager();
    }
    return SocialManager.instance;
  }

  private initializeMockData() {
    // Mock current user
    this.currentUser = {
      id: 'user_123',
      name: 'Current User',
      avatar: '/api/placeholder/100/100',
      email: 'user@example.com',
      accountType: 'STUDENT',
      level: 15,
      totalScore: 8450,
      joinDate: '2024-01-15',
      isOnline: true,
      lastSeen: new Date().toISOString(),
      preferences: {
        allowFriendRequests: true,
        showOnlineStatus: true,
        allowGameInvites: true,
        soundEnabled: true
      },
      gameStats: {
        gamesPlayed: 127,
        averageScore: 82.5,
        favoriteGame: 'Diagnosis Detective',
        achievements: ['first_diagnosis', 'speed_demon', 'perfectionist'],
        currentStreak: 7,
        longestStreak: 23
      }
    };

    // Mock friends
    this.friends = [
      {
        id: 'friend_1',
        name: 'Dr. Sarah Chen',
        avatar: '/api/placeholder/100/100',
        isOnline: true,
        lastSeen: '2 minutes ago',
        level: 22,
        status: 'accepted',
        addedDate: '2024-01-20',
        mutualFriends: 5,
        gameStats: {
          gamesPlayed: 245,
          averageScore: 91.2,
          favoriteGame: 'Medical Mysteries'
        }
      },
      {
        id: 'friend_2',
        name: 'Alex Rodriguez',
        avatar: '/api/placeholder/100/100',
        isOnline: false,
        lastSeen: '1 hour ago',
        level: 18,
        status: 'accepted',
        addedDate: '2024-02-01',
        mutualFriends: 3,
        gameStats: {
          gamesPlayed: 156,
          averageScore: 78.9,
          favoriteGame: 'Anatomy Master'
        }
      },
      {
        id: 'friend_3',
        name: 'Emily Watson',
        avatar: '/api/placeholder/100/100',
        isOnline: true,
        lastSeen: 'Online',
        level: 20,
        status: 'accepted',
        addedDate: '2024-01-25',
        mutualFriends: 8,
        gameStats: {
          gamesPlayed: 198,
          averageScore: 85.7,
          favoriteGame: 'Pharmacology Quest'
        }
      }
    ];

    // Mock friend requests
    this.friendRequests = [
      {
        id: 'req_1',
        senderId: 'user_456',
        senderName: 'Michael Brown',
        senderAvatar: '/api/placeholder/100/100',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        message: 'Hey! I saw your score on the Cardiology Challenge. Would love to be friends and maybe compete together!',
        mutualFriends: 2
      },
      {
        id: 'req_2',
        senderId: 'user_789',
        senderName: 'Lisa Johnson',
        senderAvatar: '/api/placeholder/100/100',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        mutualFriends: 1
      }
    ];

    // Mock conversations
    this.conversations = [
      {
        id: 'conv_1',
        participants: ['user_123', 'friend_1'],
        lastMessage: {
          id: 'msg_1',
          senderId: 'friend_1',
          receiverId: 'user_123',
          content: 'Great job on that last diagnosis! Want to try the new Neurology challenge together?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          type: 'text',
          isRead: false
        },
        unreadCount: 2,
        isActive: true,
        type: 'direct'
      },
      {
        id: 'conv_2',
        participants: ['user_123', 'friend_2'],
        lastMessage: {
          id: 'msg_2',
          senderId: 'user_123',
          receiverId: 'friend_2',
          content: 'Thanks for the game recommendation!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: 'text',
          isRead: true
        },
        unreadCount: 0,
        isActive: true,
        type: 'direct'
      }
    ];
  }

  // Friend management methods
  public getFriends(): Friend[] {
    return this.friends.filter(friend => friend.status === 'accepted');
  }

  public getFriendRequests(): FriendRequest[] {
    return this.friendRequests;
  }

  public sendFriendRequest(userId: string, message?: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API call
        console.log(`Friend request sent to user ${userId}`, message);
        resolve(true);
      }, 500);
    });
  }

  public acceptFriendRequest(requestId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestIndex = this.friendRequests.findIndex(req => req.id === requestId);
        if (requestIndex !== -1) {
          const request = this.friendRequests[requestIndex];
          
          // Add to friends list
          this.friends.push({
            id: request.senderId,
            name: request.senderName,
            avatar: request.senderAvatar,
            isOnline: Math.random() > 0.5,
            lastSeen: 'Just now',
            level: Math.floor(Math.random() * 20) + 1,
            status: 'accepted',
            addedDate: new Date().toISOString(),
            mutualFriends: request.mutualFriends,
            gameStats: {
              gamesPlayed: Math.floor(Math.random() * 200) + 50,
              averageScore: Math.floor(Math.random() * 30) + 70,
              favoriteGame: 'Various Games'
            }
          });

          // Remove from requests
          this.friendRequests.splice(requestIndex, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  public rejectFriendRequest(requestId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestIndex = this.friendRequests.findIndex(req => req.id === requestId);
        if (requestIndex !== -1) {
          this.friendRequests.splice(requestIndex, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  // Messaging methods
  public getConversations(): Conversation[] {
    return this.conversations.sort((a, b) => 
      new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );
  }

  public getConversation(conversationId: string): Conversation | null {
    return this.conversations.find(conv => conv.id === conversationId) || null;
  }

  public sendMessage(conversationId: string, content: string, type: Message['type'] = 'text'): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const message: Message = {
          id: `msg_${Date.now()}`,
          senderId: this.currentUser?.id || 'user_123',
          receiverId: '', // Will be set based on conversation
          content,
          timestamp: new Date().toISOString(),
          type,
          isRead: false
        };

        // Update conversation
        const conversation = this.conversations.find(conv => conv.id === conversationId);
        if (conversation) {
          conversation.lastMessage = message;
          conversation.unreadCount = 0; // Reset for sender
        }

        resolve(message);
      }, 300);
    });
  }

  public markAsRead(conversationId: string): void {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
    }
  }

  // User profile methods
  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public updateUserPreferences(preferences: Partial<UserProfile['preferences']>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.currentUser) {
          this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  }

  // Game invitation methods
  public sendGameInvite(friendId: string, gameId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Game invite sent to ${friendId} for game ${gameId}`);
        resolve(true);
      }, 500);
    });
  }

  // Online status methods
  public updateOnlineStatus(isOnline: boolean): void {
    if (this.currentUser) {
      this.currentUser.isOnline = isOnline;
      this.currentUser.lastSeen = isOnline ? 'Online' : new Date().toISOString();
    }
  }

  public getTotalUnreadMessages(): number {
    return this.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }
}

// Export singleton instance
export const socialManager = SocialManager.getInstance();
