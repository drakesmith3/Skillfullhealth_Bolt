import { supabase } from '../config/supabase'
import type { User, AuthError as SupabaseAuthError } from '@supabase/supabase-js'

// Use Supabase's AuthError type
export type AuthError = SupabaseAuthError

export interface SignUpData {
  email: string
  password: string
  fullName?: string
  profession?: string
  institution?: string
  firstName?: string
  lastName?: string
  PhoneNumber?: string
  userType?: string
  setup2FA?: boolean
  affiliateLink?: string
  uplineUIN?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user?: User | null
  error?: AuthError | null
}

class AuthService {
  // Sign up new user
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            first_name: data.firstName,
            last_name: data.lastName,
            profession: data.profession,
            institution: data.institution,
            user_type: data.userType,
            phone_number: data.PhoneNumber,
            setup_2fa: data.setup2FA,
            affiliate_link: data.affiliateLink,
            upline_uin: data.uplineUIN,
            registration_date: new Date().toISOString(),
          }
        }
      })

      return { user: authData.user, error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // Sign in user
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      return { user: authData.user, error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // Sign out user
  async signOut(): Promise<{ error?: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error?: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error?: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null)
    })
  }
}

export const authService = new AuthService()
