
export interface ReferralData {
  referrerId: string;
  refereeId: string;
  refereeEmail: string;
  refereeName: string;
  referralDate: string;
  status: 'pending' | 'completed' | 'expired';
  bonusEarned: number;
  level: number;
}

export interface MLMStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  monthlyEarnings: number;
  rankLevel: string;
  nextRankRequirement: number;
}

export interface CommissionStructure {
  level1: number; // Direct referrals
  level2: number; // Second level
  level3: number; // Third level
  bonusThresholds: {
    bronze: { referrals: 5, bonus: 100 };
    silver: { referrals: 15, bonus: 300 };
    gold: { referrals: 30, bonus: 750 };
    platinum: { referrals: 50, bonus: 1500 };
  };
}

export class MLMSystem {
  private referrals: Map<string, ReferralData[]> = new Map();
  private commissionStructure: CommissionStructure = {
    level1: 0.25, // 25% commission on direct referrals
    level2: 0.10, // 10% commission on second level
    level3: 0.05, // 5% commission on third level
    bonusThresholds: {
      bronze: { referrals: 5, bonus: 100 },
      silver: { referrals: 15, bonus: 300 },
      gold: { referrals: 30, bonus: 750 },
      platinum: { referrals: 50, bonus: 1500 }
    }
  };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Mock referral data
    const mockReferrals: ReferralData[] = [
      {
        referrerId: 'prof_001',
        refereeId: 'prof_002',
        refereeEmail: 'jane.doe@example.com',
        refereeName: 'Dr. Jane Doe',
        referralDate: '2024-01-15',
        status: 'completed',
        bonusEarned: 250,
        level: 1
      },
      {
        referrerId: 'prof_001',
        refereeId: 'prof_003',
        refereeEmail: 'mike.smith@example.com',
        refereeName: 'Dr. Mike Smith',
        referralDate: '2024-02-01',
        status: 'completed',
        bonusEarned: 250,
        level: 1
      }
    ];

    this.referrals.set('prof_001', mockReferrals);
  }

  public generateReferralCode(userId: string): string {
    return `GLOHSEN_${userId.toUpperCase()}_${Date.now().toString(36)}`;
  }

  public processReferral(referrerId: string, refereeEmail: string, refereeName: string): ReferralData {
    const referralData: ReferralData = {
      referrerId,
      refereeId: `temp_${Date.now()}`,
      refereeEmail,
      refereeName,
      referralDate: new Date().toISOString(),
      status: 'pending',
      bonusEarned: 0,
      level: 1
    };

    const existingReferrals = this.referrals.get(referrerId) || [];
    existingReferrals.push(referralData);
    this.referrals.set(referrerId, existingReferrals);

    return referralData;
  }

  public completeReferral(referrerId: string, refereeId: string): boolean {
    const referrals = this.referrals.get(referrerId);
    if (!referrals) return false;

    const referral = referrals.find(r => r.refereeId === refereeId || r.refereeId.startsWith('temp_'));
    if (!referral) return false;

    referral.status = 'completed';
    referral.refereeId = refereeId;
    referral.bonusEarned = this.calculateReferralBonus(referrerId, 1);

    // Process multi-level commissions
    this.processMultiLevelCommissions(referrerId, referral.bonusEarned);

    return true;
  }

  private calculateReferralBonus(referrerId: string, level: number): number {
    const baseBonus = 1000; // Base bonus amount
    
    switch (level) {
      case 1:
        return baseBonus * this.commissionStructure.level1;
      case 2:
        return baseBonus * this.commissionStructure.level2;
      case 3:
        return baseBonus * this.commissionStructure.level3;
      default:
        return 0;
    }
  }

  private processMultiLevelCommissions(referrerId: string, baseAmount: number): void {
    // This would typically involve finding the referrer's upline
    // For now, we'll simulate the process
    console.log(`Processing multi-level commissions for ${referrerId} with base amount ${baseAmount}`);
    
    // Level 2 commission (referrer's referrer)
    const level2Commission = baseAmount * (this.commissionStructure.level2 / this.commissionStructure.level1);
    console.log(`Level 2 commission: ${level2Commission}`);
    
    // Level 3 commission (referrer's referrer's referrer)
    const level3Commission = baseAmount * (this.commissionStructure.level3 / this.commissionStructure.level1);
    console.log(`Level 3 commission: ${level3Commission}`);
  }

  public getMLMStats(userId: string): MLMStats {
    const referrals = this.referrals.get(userId) || [];
    const completedReferrals = referrals.filter(r => r.status === 'completed');
    const totalEarnings = completedReferrals.reduce((sum, r) => sum + r.bonusEarned, 0);
    
    // Calculate current month earnings
    const currentMonth = new Date().getMonth();
    const monthlyEarnings = completedReferrals
      .filter(r => new Date(r.referralDate).getMonth() === currentMonth)
      .reduce((sum, r) => sum + r.bonusEarned, 0);

    const rankLevel = this.calculateRankLevel(completedReferrals.length);
    const nextRankRequirement = this.getNextRankRequirement(completedReferrals.length);

    return {
      totalReferrals: referrals.length,
      activeReferrals: completedReferrals.length,
      totalEarnings,
      monthlyEarnings,
      rankLevel,
      nextRankRequirement
    };
  }

  private calculateRankLevel(referralCount: number): string {
    const { bonusThresholds } = this.commissionStructure;
    
    if (referralCount >= bonusThresholds.platinum.referrals) return 'Platinum';
    if (referralCount >= bonusThresholds.gold.referrals) return 'Gold';
    if (referralCount >= bonusThresholds.silver.referrals) return 'Silver';
    if (referralCount >= bonusThresholds.bronze.referrals) return 'Bronze';
    return 'Starter';
  }

  private getNextRankRequirement(referralCount: number): number {
    const { bonusThresholds } = this.commissionStructure;
    
    if (referralCount < bonusThresholds.bronze.referrals) {
      return bonusThresholds.bronze.referrals - referralCount;
    }
    if (referralCount < bonusThresholds.silver.referrals) {
      return bonusThresholds.silver.referrals - referralCount;
    }
    if (referralCount < bonusThresholds.gold.referrals) {
      return bonusThresholds.gold.referrals - referralCount;
    }
    if (referralCount < bonusThresholds.platinum.referrals) {
      return bonusThresholds.platinum.referrals - referralCount;
    }
    return 0;
  }

  public getReferralHistory(userId: string): ReferralData[] {
    return this.referrals.get(userId) || [];
  }

  public calculatePotentialEarnings(referralCount: number): number {
    return referralCount * this.calculateReferralBonus('', 1);
  }

  public getCommissionStructure(): CommissionStructure {
    return this.commissionStructure;
  }
}

export const mlmSystem = new MLMSystem();
export default mlmSystem;
