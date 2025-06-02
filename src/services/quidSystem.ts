// QUID Currency and Transaction System for GLOHSEN Platform

export interface QUIDExchangeRate {
  currency: string;
  country: string;
  symbol: string;
  rate: number; // Amount in local currency that equals 1 QUID
}

export interface QUIDTransaction {
  id: string;
  fromUIN: string;
  toUIN: string;
  amount: number; // Amount in QUID
  transactionFee: number; // Fee in QUID
  mlmDeduction: number; // MLM bonus deduction in QUID
  netAmount: number; // Net amount received in QUID
  currency: string; // Original currency if applicable
  originalAmount?: number; // Original amount in local currency
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'bonus' | 'escrow_release';
  status: 'pending' | 'completed' | 'failed' | 'escrowed';
  timestamp: Date;
  description: string;
  escrowId?: string; // For escrow transactions
}

export interface QUIDPurse {
  uin: string;
  balance: number; // Balance in QUID
  escrowBalance: number; // Amount in escrow
  totalEarnings: number; // Lifetime earnings
  totalSpent: number; // Lifetime spending
  currency: string; // Preferred withdrawal currency
  lastActivity: Date;
}

export interface MLMBonus {
  recipientUIN: string;
  sourceTransactionId: string;
  amount: number; // Bonus amount in QUID
  level: number; // MLM level (1-4)
  percentage: number; // Percentage of original transaction
  timestamp: Date;
}

export class QUIDSystem {
  private purses: Map<string, QUIDPurse> = new Map();
  private transactions: QUIDTransaction[] = [];  private exchangeRates: QUIDExchangeRate[] = [
    { currency: 'USD', country: 'USA', symbol: 'Q', rate: 10 },
    { currency: 'QUD', country: 'Nigeria', symbol: 'Q', rate: 10000 },
    { currency: 'GBP', country: 'UK', symbol: 'Q', rate: 10 },    { currency: 'CAD', country: 'Canada', symbol: 'Q', rate: 10 },
    { currency: 'EUR', country: 'Europe', symbol: 'Q', rate: 10 }
  ];

  // Transaction fee percentage
  private readonly TRANSACTION_FEE_RATE = 0.015; // 1.5%
  
  // MLM bonus rates
  private readonly MLM_TOTAL_RATE = 0.0125; // 1.25% total
  private readonly MLM_INDIVIDUAL_RATE = 0.0025; // 0.25% per upline
  private readonly MLM_NUMERO_UNO_RATE = 0.0025; // 0.25% for NUMERO UNO

  constructor() {
    this.initializeSystemPurse();
  }

  private initializeSystemPurse(): void {
    // Initialize NUMERO UNO purse
    this.purses.set('1A1', {
      uin: '1A1',
      balance: 0,
      escrowBalance: 0,
      totalEarnings: 0,
      totalSpent: 0,
      currency: 'USD',
      lastActivity: new Date()
    });
  }

  // Create purse for new user
  public createPurse(uin: string, preferredCurrency: string = 'USD'): QUIDPurse {
    const purse: QUIDPurse = {
      uin,
      balance: 0,
      escrowBalance: 0,
      totalEarnings: 0,
      totalSpent: 0,
      currency: preferredCurrency,
      lastActivity: new Date()
    };

    this.purses.set(uin, purse);
    return purse;
  }

  // Get purse by UIN
  public getPurse(uin: string): QUIDPurse | undefined {
    return this.purses.get(uin);
  }

  // Convert local currency to QUID
  public convertToQUID(amount: number, currency: string): number {
    const rate = this.exchangeRates.find(r => r.currency === currency);
    if (!rate) throw new Error(`Unsupported currency: ${currency}`);
    
    return amount / rate.rate;
  }

  // Convert QUID to local currency
  public convertFromQUID(quidAmount: number, currency: string): number {
    const rate = this.exchangeRates.find(r => r.currency === currency);
    if (!rate) throw new Error(`Unsupported currency: ${currency}`);
    
    return quidAmount * rate.rate;
  }

  // Process deposit
  public deposit(
    uin: string, 
    amount: number, 
    currency: string,
    description: string = 'Deposit'
  ): QUIDTransaction {
    const purse = this.purses.get(uin);
    if (!purse) throw new Error('Purse not found');

    const quidAmount = this.convertToQUID(amount, currency);
    const transactionFee = quidAmount * this.TRANSACTION_FEE_RATE;
    const netAmount = quidAmount - transactionFee;

    const transaction: QUIDTransaction = {
      id: this.generateTransactionId(),
      fromUIN: 'SYSTEM',
      toUIN: uin,
      amount: quidAmount,
      transactionFee,
      mlmDeduction: 0,
      netAmount,
      currency,
      originalAmount: amount,
      type: 'deposit',
      status: 'completed',
      timestamp: new Date(),
      description
    };

    // Update purse
    purse.balance += netAmount;
    purse.totalEarnings += netAmount;
    purse.lastActivity = new Date();

    this.transactions.push(transaction);
    return transaction;
  }

  // Process payment with MLM bonuses
  public processPayment(
    fromUIN: string,
    toUIN: string,
    quidAmount: number,
    description: string,
    uplineChain: string[] = []
  ): QUIDTransaction {
    const fromPurse = this.purses.get(fromUIN);
    const toPurse = this.purses.get(toUIN);

    if (!fromPurse || !toPurse) throw new Error('Invalid UIN');
    if (fromPurse.balance < quidAmount) throw new Error('Insufficient balance');

    // Calculate fees
    const transactionFee = quidAmount * this.TRANSACTION_FEE_RATE;
    const mlmDeduction = quidAmount * this.MLM_TOTAL_RATE;
    const netAmount = quidAmount - transactionFee - mlmDeduction;

    const transaction: QUIDTransaction = {
      id: this.generateTransactionId(),
      fromUIN,
      toUIN,
      amount: quidAmount,
      transactionFee,
      mlmDeduction,
      netAmount,
      currency: toPurse.currency,
      type: 'payment',
      status: 'completed',
      timestamp: new Date(),
      description
    };

    // Update purses
    fromPurse.balance -= quidAmount;
    fromPurse.totalSpent += quidAmount;
    fromPurse.lastActivity = new Date();

    toPurse.balance += netAmount;
    toPurse.totalEarnings += netAmount;
    toPurse.lastActivity = new Date();

    // Distribute MLM bonuses
    this.distributeMlmBonuses(transaction.id, quidAmount, uplineChain);

    this.transactions.push(transaction);
    return transaction;
  }

  // Distribute MLM bonuses to upline chain
  private distributeMlmBonuses(transactionId: string, originalAmount: number, uplineChain: string[]): void {
    const bonusPerUpline = originalAmount * this.MLM_INDIVIDUAL_RATE;
    const numeroUnoBonus = originalAmount * this.MLM_NUMERO_UNO_RATE;

    // Give bonus to up to 4 uplines
    for (let i = 0; i < Math.min(4, uplineChain.length); i++) {
      const uplineUIN = uplineChain[i];
      const uplinePurse = this.purses.get(uplineUIN);
      
      if (uplinePurse) {
        uplinePurse.balance += bonusPerUpline;
        uplinePurse.totalEarnings += bonusPerUpline;
        uplinePurse.lastActivity = new Date();

        // Create bonus transaction record
        const bonusTransaction: QUIDTransaction = {
          id: this.generateTransactionId(),
          fromUIN: 'MLM_SYSTEM',
          toUIN: uplineUIN,
          amount: bonusPerUpline,
          transactionFee: 0,
          mlmDeduction: 0,
          netAmount: bonusPerUpline,
          currency: uplinePurse.currency,
          type: 'bonus',
          status: 'completed',
          timestamp: new Date(),
          description: `MLM Level ${i + 1} Bonus from transaction ${transactionId}`
        };

        this.transactions.push(bonusTransaction);
      }
    }

    // Give remaining bonus to NUMERO UNO
    const numeroUnoPurse = this.purses.get('1A1');
    if (numeroUnoPurse) {
      // Calculate remaining bonus (if less than 4 uplines)
      const remainingLevels = 4 - Math.min(4, uplineChain.length);
      const totalNumeroUnoBonus = numeroUnoBonus + (remainingLevels * bonusPerUpline);

      numeroUnoPurse.balance += totalNumeroUnoBonus;
      numeroUnoPurse.totalEarnings += totalNumeroUnoBonus;
      numeroUnoPurse.lastActivity = new Date();

      const bonusTransaction: QUIDTransaction = {
        id: this.generateTransactionId(),
        fromUIN: 'MLM_SYSTEM',
        toUIN: '1A1',
        amount: totalNumeroUnoBonus,
        transactionFee: 0,
        mlmDeduction: 0,
        netAmount: totalNumeroUnoBonus,
        currency: numeroUnoPurse.currency,
        type: 'bonus',
        status: 'completed',
        timestamp: new Date(),
        description: `MLM NUMERO UNO Bonus from transaction ${transactionId}`
      };

      this.transactions.push(bonusTransaction);
    }
  }

  // Process escrow transaction (for jobs and courses)
  public createEscrowTransaction(
    fromUIN: string,
    toUIN: string,
    quidAmount: number,
    description: string,
    escrowId: string
  ): QUIDTransaction {
    const fromPurse = this.purses.get(fromUIN);
    if (!fromPurse) throw new Error('Invalid sender UIN');
    if (fromPurse.balance < quidAmount) throw new Error('Insufficient balance');

    const transactionFee = quidAmount * this.TRANSACTION_FEE_RATE;
    const totalDeduction = quidAmount + transactionFee;

    const transaction: QUIDTransaction = {
      id: this.generateTransactionId(),
      fromUIN,
      toUIN,
      amount: quidAmount,
      transactionFee,
      mlmDeduction: 0,
      netAmount: quidAmount,
      currency: fromPurse.currency,
      type: 'payment',
      status: 'escrowed',
      timestamp: new Date(),
      description,
      escrowId
    };

    // Deduct from sender
    fromPurse.balance -= totalDeduction;
    fromPurse.totalSpent += totalDeduction;
    fromPurse.lastActivity = new Date();

    // Add to recipient's escrow balance
    const toPurse = this.purses.get(toUIN);
    if (toPurse) {
      toPurse.escrowBalance += quidAmount;
    }

    this.transactions.push(transaction);
    return transaction;
  }

  // Release escrow
  public releaseEscrow(
    escrowId: string,
    uplineChain: string[] = []
  ): QUIDTransaction | null {
    const escrowTransaction = this.transactions.find(
      t => t.escrowId === escrowId && t.status === 'escrowed'
    );

    if (!escrowTransaction) return null;

    const toPurse = this.purses.get(escrowTransaction.toUIN);
    if (!toPurse) return null;

    // Calculate MLM deduction
    const mlmDeduction = escrowTransaction.amount * this.MLM_TOTAL_RATE;
    const netAmount = escrowTransaction.amount - mlmDeduction;

    // Update transaction
    escrowTransaction.status = 'completed';
    escrowTransaction.mlmDeduction = mlmDeduction;
    escrowTransaction.netAmount = netAmount;

    // Update recipient purse
    toPurse.escrowBalance -= escrowTransaction.amount;
    toPurse.balance += netAmount;
    toPurse.totalEarnings += netAmount;
    toPurse.lastActivity = new Date();

    // Distribute MLM bonuses
    this.distributeMlmBonuses(escrowTransaction.id, escrowTransaction.amount, uplineChain);

    return escrowTransaction;
  }

  // Get transaction history
  public getTransactionHistory(uin: string): QUIDTransaction[] {
    return this.transactions.filter(t => t.fromUIN === uin || t.toUIN === uin);
  }

  // Get exchange rates
  public getExchangeRates(): QUIDExchangeRate[] {
    return this.exchangeRates;
  }

  // Generate unique transaction ID
  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  // Get all purses (for admin)
  public getAllPurses(): QUIDPurse[] {
    return Array.from(this.purses.values());
  }

  // Format QUID amount for display
  public formatQUID(amount: number): string {
    return `Q${amount.toFixed(2)}`;
  }
}

// Export singleton instance
export const quidSystem = new QUIDSystem();
export default quidSystem;
