
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SecurityContextType {
  isSecure: boolean;
  sessionTimeout: number;
  lastActivity: Date;
  validateInput: (input: string) => boolean;
  sanitizeInput: (input: string) => string;
  checkPermissions: (action: string) => boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  return context;
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(new Date());
  const [isSecure, setIsSecure] = useState(true);
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes

  const validateInput = (input: string): boolean => {
    // Basic input validation
    const dangerousPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
    return !dangerousPatterns.some(pattern => pattern.test(input));
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const checkPermissions = (action: string): boolean => {
    const userType = localStorage.getItem('userType');
    const permissions: Record<string, string[]> = {
      'admin': ['all'],
      'professional': ['view_jobs', 'apply_jobs', 'view_courses'],
      'employer': ['post_jobs', 'view_candidates'],
      'tutor': ['create_courses', 'view_students'],
      'student': ['view_courses', 'enroll_courses'],
      'client': ['view_professionals', 'give_feedback']
    };

    const userPermissions = permissions[userType || 'client'] || [];
    return userPermissions.includes('all') || userPermissions.includes(action);
  };

  useEffect(() => {
    const updateActivity = () => setLastActivity(new Date());
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getTime() - lastActivity.getTime() > sessionTimeout) {
        setIsSecure(false);
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
      }
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(interval);
    };
  }, [lastActivity, sessionTimeout]);

  return (
    <SecurityContext.Provider value={{
      isSecure,
      sessionTimeout,
      lastActivity,
      validateInput,
      sanitizeInput,
      checkPermissions
    }}>
      {children}
    </SecurityContext.Provider>
  );
};
