import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { SignUpData, SignInData, AuthResponse, AuthError } from '../services/authService'
import { authService } from '../services/authService'

// Define the AuthContext type
interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (data: SignUpData) => Promise<AuthResponse>
  signIn: (data: SignInData) => Promise<AuthResponse>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    authService.getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (data: SignUpData) => {
    setLoading(true)
    const result = await authService.signUp(data)
    if (result.user) {
      setUser(result.user)
    }
    setLoading(false)
    return result
  }

  const signIn = async (data: SignInData) => {
    setLoading(true)
    const result = await authService.signIn(data)
    if (result.user) {
      setUser(result.user)
    }
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    await authService.signOut()
    setUser(null)
    setLoading(false)
  }

  const resetPassword = async (email: string) => {
    return authService.resetPassword(email)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
