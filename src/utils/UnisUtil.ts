
/**
 * UNIS (Unique Identification Number System) Utility
 * 
 * This utility handles the generation and validation of unique identification numbers
 * that are tied to email address and phone number combinations.
 */

// Interface for user identity data
export interface UserIdentity {
  email: string;
  phone: string;
  unis?: string;
}

/**
 * Generates a UNIS (Unique Identification Number) based on email and phone
 * 
 * @param email - User's email address
 * @param phone - User's phone number
 * @returns A unique identification string
 */
export const generateUnis = (email: string, phone: string): string => {
  // Normalize inputs
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone.replace(/[^0-9+]/g, '');
  
  // Combine the normalized values and hash them
  const combined = `${normalizedEmail}:${normalizedPhone}`;
  let hash = 0;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert hash to a string representation (prefix with U for UNIS)
  const hashStr = Math.abs(hash).toString(36).toUpperCase();
  const timestamp = Date.now().toString(36).slice(-6).toUpperCase();
  
  return `U${hashStr}${timestamp}`;
};

/**
 * Validates if the provided user identity information is unique
 * 
 * @param identity - User's identity information
 * @param existingIdentities - Array of existing identities to check against
 * @returns Object with validation result and reason if invalid
 */
export const validateUnisUniqueness = (
  identity: UserIdentity,
  existingIdentities: UserIdentity[]
): { isValid: boolean; reason?: string } => {
  // Check if email already exists
  const emailExists = existingIdentities.some(
    existing => existing.email.toLowerCase() === identity.email.toLowerCase()
  );
  
  if (emailExists) {
    return {
      isValid: false,
      reason: "This email address is already registered in our system."
    };
  }
  
  // Check if phone already exists
  const normalizedPhone = identity.phone.replace(/[^0-9+]/g, '');
  const phoneExists = existingIdentities.some(
    existing => existing.phone.replace(/[^0-9+]/g, '') === normalizedPhone
  );
  
  if (phoneExists) {
    return {
      isValid: false,
      reason: "This phone number is already registered in our system."
    };
  }
  
  return { isValid: true };
};

/**
 * Creates a complete UNIS record from user information
 * 
 * @param identity - User's identity information without UNIS
 * @returns Updated identity with UNIS
 */
export const createUnisRecord = (identity: Omit<UserIdentity, 'unis'>): UserIdentity => {
  const unis = generateUnis(identity.email, identity.phone);
  return {
    ...identity,
    unis
  };
};
