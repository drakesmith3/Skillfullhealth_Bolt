import type { User, AuthError as SupabaseAuthError } from '@supabase/supabase-js'

export type AuthError = SupabaseAuthError

export interface SignUpData {
  email: string
  password: string
  passwordConfirmation: string
  FirstName: string
  LastName: string
  fullName?: string
  profession?: string
  institution?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User | null
  error?: AuthError | null
}
