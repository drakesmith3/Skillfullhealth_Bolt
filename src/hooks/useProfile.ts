import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { profileService } from '../services/profileService'
import { supabase } from '../config/supabase'
import type { ProfessionalProfile } from '../types/dashboard.d'
import type { Tables } from '../types/database'

export interface UseProfileResult {
  profile: ProfessionalProfile | null
  dbProfile: Tables<'profiles'> | null
  loading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
  updateProfile: (updates: Partial<Tables<'profiles'>>) => Promise<boolean>
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null)
  const [dbProfile, setDbProfile] = useState<Tables<'profiles'> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null)
      setDbProfile(null)
      setLoading(false)
      return
    }

    try {
      setError(null)
      
      // Fetch the transformed profile for UI display
      const userProfile = await profileService.getCurrentUserProfile()
      setProfile(userProfile)

      // Also fetch raw database profile for forms and updates
      const { data: rawProfile, error: dbError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()
      
      if (dbError && dbError.code !== 'PGRST116') {
        console.error('Database error:', dbError)
        setError('Failed to fetch profile data')
      } else {
        setDbProfile(rawProfile)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    setLoading(true)
    await fetchProfile()
  }

  const updateProfile = async (updates: Partial<Tables<'profiles'>>): Promise<boolean> => {
    try {
      const result = await profileService.updateProfile(updates)
      if (result) {
        await fetchProfile() // Refresh profile data
        return true
      }
      return false
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      return false
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  return {
    profile,
    dbProfile,
    loading,
    error,
    refreshProfile,
    updateProfile
  }
}

// Hook for getting user's display name and avatar
export function useUserDisplay() {
  const { user } = useAuth()
  const { profile, dbProfile, loading } = useProfile()

  const getDisplayName = (): string => {
    if (profile?.fullName) return profile.fullName
    if (dbProfile?.full_name) return dbProfile.full_name
    if (dbProfile?.first_name && dbProfile?.last_name) {
      return `${dbProfile.first_name} ${dbProfile.last_name}`
    }
    if (dbProfile?.first_name) return dbProfile.first_name
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  const getAvatarUrl = (): string | null => {
    const avatarPath = profile?.profilePicture || dbProfile?.profile_picture;
    if (!avatarPath) return null;

    // If it's already a full URL, return it
    if (avatarPath.startsWith('http')) {
      return avatarPath;
    }

    // Otherwise, construct the public URL from Supabase storage
    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(avatarPath);
    return data?.publicUrl || null;
  };

  const getUserType = (): string => {
    return dbProfile?.user_type || 'student'
  }

  const getInitials = (): string => {
    const name = getDisplayName()
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return {
    displayName: getDisplayName(),
    avatarUrl: getAvatarUrl(),
    userType: getUserType(),
    initials: getInitials(),
    profile,
    dbProfile,
    loading
  }
  }