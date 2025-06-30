export const APP_CONSTS = {
  AUTH: {
    MIN_PASSWORD_LENGTH: 6,
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
  ROUTES: {
    SIGININ: '/signin',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
  },
  STORAGE: {
    AUTH_TOKEN: 'auth-token',
    USER_PREFERENCES: 'user-preferences',
  }
} as const
