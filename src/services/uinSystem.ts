// UIN (Unique Identification Number) System for MLM
// Format: 1A1, 1A2, 1B22, 1C4543, 4Z378993, etc.

export interface UINUser {
  uin: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  uplineUIN?: string;
  downlines: string[];
  registrationDate: Date;
  isActive: boolean;
  totalEarnings: number;
  mlmLevel: number;
}

export interface MLMTreeNode {
  uin: string;
  user: UINUser;
  upline?: MLMTreeNode;
  downlines: MLMTreeNode[];
  level: number;
  totalDownlines: number;
  directDownlines: number;
}

export class UINSystem {
  private users: Map<string, UINUser> = new Map();
  private emailToUIN: Map<string, string> = new Map();
  private phoneToUIN: Map<string, string> = new Map();
  private currentSequence: number = 1;
  private currentLetter: string = 'A';
  private currentPrefix: number = 1;

  // NUMERO UNO - The first user (organization account)
  public static readonly NUMERO_UNO_UIN = '1A1';

  constructor() {
    this.initializeNumeroUno();
  }

  private initializeNumeroUno(): void {
    const numeroUno: UINUser = {
      uin: UINSystem.NUMERO_UNO_UIN,
      email: 'admin@glohsen.com',
      phoneNumber: '+1000000000',
      firstName: 'GLOHSEN',
      lastName: 'Organization',
      role: 'admin',
      downlines: [],
      registrationDate: new Date('2024-01-01'),
      isActive: true,
      totalEarnings: 0,
      mlmLevel: 0
    };

    this.users.set(UINSystem.NUMERO_UNO_UIN, numeroUno);
    this.emailToUIN.set(numeroUno.email, UINSystem.NUMERO_UNO_UIN);
    this.phoneToUIN.set(numeroUno.phoneNumber, UINSystem.NUMERO_UNO_UIN);
  }

  // Generate next UIN in sequence
  private generateNextUIN(): string {
    const uin = `${this.currentPrefix}${this.currentLetter}${this.currentSequence}`;
    
    // Increment sequence
    this.currentSequence++;
    
    // If sequence gets too high, move to next letter
    if (this.currentSequence > 9999) {
      this.currentSequence = 1;
      this.currentLetter = String.fromCharCode(this.currentLetter.charCodeAt(0) + 1);
      
      // If we exhaust letters in current prefix, move to next prefix
      if (this.currentLetter > 'Z') {
        this.currentPrefix++;
        this.currentLetter = 'A';
      }
    }
    
    return uin;
  }

  // Check if email and phone are unique
  public isEmailUnique(email: string): boolean {
    return !this.emailToUIN.has(email.toLowerCase());
  }

  public isPhoneUnique(phoneNumber: string): boolean {
    return !this.phoneToUIN.has(phoneNumber);
  }

  // Validate upline UIN exists
  public validateUplineUIN(uplineUIN: string): boolean {
    return this.users.has(uplineUIN);
  }

  // Register new user in MLM system
  public registerUser(
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    role: string,
    uplineUIN?: string
  ): { success: boolean; uin?: string; error?: string } {
    
    // Validate unique email and phone
    if (!this.isEmailUnique(email)) {
      return { success: false, error: 'Email already exists in the system' };
    }

    if (!this.isPhoneUnique(phoneNumber)) {
      return { success: false, error: 'Phone number already exists in the system' };
    }

    // For professionals, upline UIN is required
    if (role === 'professional' && !uplineUIN) {
      return { success: false, error: 'Professionals must provide an upline UIN' };
    }

    // Validate upline exists if provided
    if (uplineUIN && !this.validateUplineUIN(uplineUIN)) {
      return { success: false, error: 'Invalid upline UIN' };
    }

    // If no upline provided, assign to NUMERO UNO
    const finalUplineUIN = uplineUIN || UINSystem.NUMERO_UNO_UIN;

    // Generate new UIN
    const newUIN = this.generateNextUIN();

    // Calculate MLM level (upline level + 1)
    const uplineUser = this.users.get(finalUplineUIN);
    const mlmLevel = uplineUser ? uplineUser.mlmLevel + 1 : 1;

    // Create new user
    const newUser: UINUser = {
      uin: newUIN,
      email: email.toLowerCase(),
      phoneNumber,
      firstName,
      lastName,
      role,
      uplineUIN: finalUplineUIN,
      downlines: [],
      registrationDate: new Date(),
      isActive: true,
      totalEarnings: 0,
      mlmLevel
    };

    // Add to maps
    this.users.set(newUIN, newUser);
    this.emailToUIN.set(email.toLowerCase(), newUIN);
    this.phoneToUIN.set(phoneNumber, newUIN);

    // Add to upline's downlines
    if (uplineUser) {
      uplineUser.downlines.push(newUIN);
    }

    return { success: true, uin: newUIN };
  }

  // Get user by UIN
  public getUserByUIN(uin: string): UINUser | undefined {
    return this.users.get(uin);
  }

  // Get user by email
  public getUserByEmail(email: string): UINUser | undefined {
    const uin = this.emailToUIN.get(email.toLowerCase());
    return uin ? this.users.get(uin) : undefined;
  }

  // Get MLM tree for a user (upline + downlines up to 4 generations)
  public getMLMTree(uin: string): MLMTreeNode | null {
    const user = this.users.get(uin);
    if (!user) return null;

    const buildTree = (currentUIN: string, level: number, maxDepth: number = 4): MLMTreeNode | null => {
      const currentUser = this.users.get(currentUIN);
      if (!currentUser || level > maxDepth) return null;

      const downlineNodes: MLMTreeNode[] = [];
      for (const downlineUIN of currentUser.downlines) {
        const downlineNode = buildTree(downlineUIN, level + 1, maxDepth);
        if (downlineNode) {
          downlineNodes.push(downlineNode);
        }
      }

      return {
        uin: currentUIN,
        user: currentUser,
        downlines: downlineNodes,
        level,
        totalDownlines: this.getTotalDownlines(currentUIN),
        directDownlines: currentUser.downlines.length
      };
    };

    // Get upline (only 1 generation above)
    let uplineNode: MLMTreeNode | undefined;
    if (user.uplineUIN && user.uplineUIN !== UINSystem.NUMERO_UNO_UIN) {
      const uplineUser = this.users.get(user.uplineUIN);
      if (uplineUser) {
        uplineNode = {
          uin: user.uplineUIN,
          user: uplineUser,
          downlines: [],
          level: user.mlmLevel - 1,
          totalDownlines: this.getTotalDownlines(user.uplineUIN),
          directDownlines: uplineUser.downlines.length
        };
      }
    }

    const mainTree = buildTree(uin, user.mlmLevel);
    if (mainTree && uplineNode) {
      mainTree.upline = uplineNode;
    }

    return mainTree;
  }

  // Get total downlines count (all generations)
  private getTotalDownlines(uin: string): number {
    const user = this.users.get(uin);
    if (!user) return 0;

    let total = user.downlines.length;
    for (const downlineUIN of user.downlines) {
      total += this.getTotalDownlines(downlineUIN);
    }
    return total;
  }

  // Get upline chain (up to 4 levels)
  public getUplineChain(uin: string, levels: number = 4): UINUser[] {
    const uplines: UINUser[] = [];
    let currentUIN = uin;

    for (let i = 0; i < levels; i++) {
      const user = this.users.get(currentUIN);
      if (!user || !user.uplineUIN) break;

      const upline = this.users.get(user.uplineUIN);
      if (!upline) break;

      uplines.push(upline);
      currentUIN = user.uplineUIN;
    }

    return uplines;
  }

  // Generate affiliate link for a user
  public generateAffiliateLink(uin: string, baseUrl: string = 'https://glohsen.com'): string {
    return `${baseUrl}/signup?affiliate=${uin}&uin=${uin}`;
  }

  // Get all users (for admin purposes)
  public getAllUsers(): UINUser[] {
    return Array.from(this.users.values());
  }

  // Update user earnings
  public updateUserEarnings(uin: string, amount: number): boolean {
    const user = this.users.get(uin);
    if (!user) return false;

    user.totalEarnings += amount;
    return true;
  }
}

// Export singleton instance
export const uinSystem = new UINSystem();
export default uinSystem;
