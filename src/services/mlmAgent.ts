// MLM PURSE-TRANSACTION AI AGENT
// Handles all transactions, purse functionalities, and MLM operations across the platform

import { uinSystem, UINUser } from './uinSystem';
import { quidSystem, QUIDTransaction, QUIDPurse } from './quidSystem';

export interface MLMTransactionRequest {
  fromUIN: string;
  toUIN: string;
  amount: number;
  currency?: string;
  type: 'payment' | 'job_payment' | 'course_payment' | 'withdrawal' | 'deposit';
  description: string;
  escrowId?: string;
}

export interface MLMTransactionResult {
  success: boolean;
  transaction?: QUIDTransaction;
  error?: string;
  mlmBonuses?: Array<{
    recipientUIN: string;
    amount: number;
    level: number;
  }>;
}

export interface MLMStats {
  totalDownlines: number;
  directDownlines: number;
  totalEarnings: number;
  mlmBonusEarnings: number;
  generationLevels: Array<{
    level: number;
    count: number;
    totalEarnings: number;
  }>;
}

export class MLMPurseTransactionAgent {
  private static instance: MLMPurseTransactionAgent;

  private constructor() {
    // Singleton pattern
  }

  public static getInstance(): MLMPurseTransactionAgent {
    if (!MLMPurseTransactionAgent.instance) {
      MLMPurseTransactionAgent.instance = new MLMPurseTransactionAgent();
    }
    return MLMPurseTransactionAgent.instance;
  }

  // Initialize new user in both UIN and QUID systems
  public initializeNewUser(
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    role: string,
    uplineUIN?: string,
    preferredCurrency: string = 'USD'
  ): { success: boolean; uin?: string; error?: string } {
    
    // Register in UIN system
    const uinResult = uinSystem.registerUser(
      email,
      phoneNumber,
      firstName,
      lastName,
      role,
      uplineUIN
    );

    if (!uinResult.success) {
      return uinResult;
    }

    // Create QUID purse
    quidSystem.createPurse(uinResult.uin!, preferredCurrency);

    return uinResult;
  }

  // Process any transaction with automatic MLM bonus distribution
  public processTransaction(request: MLMTransactionRequest): MLMTransactionResult {
    try {
      const { fromUIN, toUIN, amount, type, description, escrowId } = request;

      // Get upline chain for MLM bonuses
      const uplineChain = uinSystem.getUplineChain(toUIN, 4).map(u => u.uin);

      let transaction: QUIDTransaction;

      switch (type) {
        case 'payment':
          transaction = quidSystem.processPayment(fromUIN, toUIN, amount, description, uplineChain);
          break;

        case 'job_payment':
        case 'course_payment':
          if (!escrowId) {
            return { success: false, error: 'Escrow ID required for job/course payments' };
          }
          transaction = quidSystem.createEscrowTransaction(fromUIN, toUIN, amount, description, escrowId);
          break;

        case 'deposit':
          if (!request.currency) {
            return { success: false, error: 'Currency required for deposits' };
          }
          const quidAmount = quidSystem.convertToQUID(amount, request.currency);
          transaction = quidSystem.deposit(toUIN, amount, request.currency, description);
          break;

        default:
          return { success: false, error: 'Unsupported transaction type' };
      }

      // Calculate MLM bonuses that were distributed
      const mlmBonuses = this.calculateMLMBonuses(amount, uplineChain);

      // Update UIN system earnings
      uplineChain.forEach((uin, index) => {
        uinSystem.updateUserEarnings(uin, mlmBonuses[index]?.amount || 0);
      });

      return {
        success: true,
        transaction,
        mlmBonuses: mlmBonuses.map((bonus, index) => ({
          recipientUIN: uplineChain[index],
          amount: bonus.amount,
          level: index + 1
        }))
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Release escrow payment (for completed jobs/courses)
  public releaseEscrowPayment(escrowId: string, recipientUIN: string): MLMTransactionResult {
    try {
      const uplineChain = uinSystem.getUplineChain(recipientUIN, 4).map(u => u.uin);
      const transaction = quidSystem.releaseEscrow(escrowId, uplineChain);

      if (!transaction) {
        return { success: false, error: 'Escrow transaction not found or already released' };
      }

      // Calculate MLM bonuses
      const mlmBonuses = this.calculateMLMBonuses(transaction.amount, uplineChain);

      // Update UIN system earnings
      uplineChain.forEach((uin, index) => {
        uinSystem.updateUserEarnings(uin, mlmBonuses[index]?.amount || 0);
      });

      return {
        success: true,
        transaction,
        mlmBonuses: mlmBonuses.map((bonus, index) => ({
          recipientUIN: uplineChain[index],
          amount: bonus.amount,
          level: index + 1
        }))
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Get user's complete MLM statistics
  public getMLMStats(uin: string): MLMStats | null {
    const user = uinSystem.getUserByUIN(uin);
    if (!user) return null;

    const tree = uinSystem.getMLMTree(uin);
    if (!tree) return null;

    // Calculate generation levels
    const generationLevels: Array<{ level: number; count: number; totalEarnings: number }> = [];
    
    const calculateGenerationStats = (node: any, currentLevel: number, maxLevel: number = 4) => {
      if (currentLevel > maxLevel) return;

      const levelIndex = currentLevel - 1;
      if (!generationLevels[levelIndex]) {
        generationLevels[levelIndex] = { level: currentLevel, count: 0, totalEarnings: 0 };
      }

      generationLevels[levelIndex].count += node.downlines.length;
      
      // Calculate earnings from this generation (simplified)
      node.downlines.forEach((downline: any) => {
        generationLevels[levelIndex].totalEarnings += downline.user.totalEarnings * 0.0025; // 0.25% commission
        calculateGenerationStats(downline, currentLevel + 1, maxLevel);
      });
    };

    calculateGenerationStats(tree, 1);

    // Get MLM bonus earnings from transaction history
    const purse = quidSystem.getPurse(uin);
    const transactions = quidSystem.getTransactionHistory(uin);
    const mlmBonusEarnings = transactions
      .filter(t => t.type === 'bonus' && t.toUIN === uin)
      .reduce((total, t) => total + t.amount, 0);

    return {
      totalDownlines: tree.totalDownlines,
      directDownlines: tree.directDownlines,
      totalEarnings: user.totalEarnings,
      mlmBonusEarnings,
      generationLevels: generationLevels.filter(level => level.count > 0)
    };
  }

  // Get user's purse information
  public getUserPurse(uin: string): QUIDPurse | undefined {
    return quidSystem.getPurse(uin);
  }

  // Get user's transaction history
  public getUserTransactionHistory(uin: string): QUIDTransaction[] {
    return quidSystem.getTransactionHistory(uin);
  }

  // Generate affiliate link for user
  public generateAffiliateLink(uin: string): string {
    return uinSystem.generateAffiliateLink(uin, window.location.origin);
  }

  // Validate affiliate link and extract UIN
  public validateAffiliateLink(affiliateParam: string, uinParam: string): { valid: boolean; uplineUIN?: string } {
    if (affiliateParam !== uinParam) {
      return { valid: false };
    }

    const user = uinSystem.getUserByUIN(uinParam);
    if (!user || !user.isActive) {
      return { valid: false };
    }

    return { valid: true, uplineUIN: uinParam };
  }

  // Get all users for admin dashboard
  public getAllUsers(): UINUser[] {
    return uinSystem.getAllUsers();
  }

  // Get all purses for admin dashboard
  public getAllPurses(): QUIDPurse[] {
    return quidSystem.getAllPurses();
  }

  // Get exchange rates
  public getExchangeRates() {
    return quidSystem.getExchangeRates();
  }

  // Calculate MLM bonuses for a transaction
  private calculateMLMBonuses(amount: number, uplineChain: string[]): Array<{ amount: number; level: number }> {
    const bonusPerUpline = amount * 0.0025; // 0.25% per upline
    const bonuses: Array<{ amount: number; level: number }> = [];

    for (let i = 0; i < Math.min(4, uplineChain.length); i++) {
      bonuses.push({
        amount: bonusPerUpline,
        level: i + 1
      });
    }

    return bonuses;
  }

  // Security: Validate transaction permissions
  public validateTransactionPermissions(
    fromUIN: string,
    toUIN: string,
    amount: number,
    type: string
  ): { valid: boolean; error?: string } {
    
    const fromUser = uinSystem.getUserByUIN(fromUIN);
    const toUser = uinSystem.getUserByUIN(toUIN);
    const fromPurse = quidSystem.getPurse(fromUIN);

    if (!fromUser || !toUser) {
      return { valid: false, error: 'Invalid user UIN' };
    }

    if (!fromUser.isActive || !toUser.isActive) {
      return { valid: false, error: 'User account is not active' };
    }

    if (!fromPurse || fromPurse.balance < amount) {
      return { valid: false, error: 'Insufficient balance' };
    }

    if (amount <= 0) {
      return { valid: false, error: 'Invalid transaction amount' };
    }

    return { valid: true };
  }

  // Convert currency amounts
  public convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to QUID first, then to target currency
    const quidAmount = quidSystem.convertToQUID(amount, fromCurrency);
    return quidSystem.convertFromQUID(quidAmount, toCurrency);
  }
}

// Export singleton instance
export const mlmAgent = MLMPurseTransactionAgent.getInstance();
export default mlmAgent;
