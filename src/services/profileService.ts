import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'
import type { ProfessionalProfile, Skill, Certificate, Education, Experience, Award, Publication } from '../types/dashboard.d'

type Profile = Tables<'profiles'>
type ProfileInsert = InsertTables<'profiles'>
type ProfileUpdate = UpdateTables<'profiles'>

class ProfileService {
  // Get current user's profile
  async getCurrentUserProfile(): Promise<ProfessionalProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // First check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (checkError) {
        console.error('Error checking profile existence:', checkError)
        return null
      }

      // If profile doesn't exist, create a basic one
      if (!existingProfile) {
        const newProfile = await this.upsertProfile({
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email!,
          user_type: 'professional',
          specialty: '',
          profile_completeness: 10
        })

        if (!newProfile) return null

        // Return the new profile with empty related data
        return this.transformToProfileFormat({
          ...newProfile,
          skills: [],
          certificates: [],
          education: [],
          experience: [],
          awards: [],
          publications: [],
          languages: []
        })
      }

      // Profile exists, fetch with related data
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          skills (*),
          certificates (*),
          education (*),
          experience (*),
          awards (*),
          publications (*),
          languages (*)
        `)
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching full profile:', error)
        // Return basic profile if related data fetch fails
        return this.transformToProfileFormat({
          ...existingProfile,
          skills: [],
          certificates: [],
          education: [],
          experience: [],
          awards: [],
          publications: [],
          languages: []
        })
      }

      return this.transformToProfileFormat(profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Get profile by user ID
  async getProfileByUserId(userId: string): Promise<ProfessionalProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          skills (*),
          certificates (*),
          education (*),
          experience (*),
          awards (*),
          publications (*),
          languages (*)
        `)
        .eq('id', userId)
        .single()

      if (error) throw error

      return this.transformToProfileFormat(profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Create or update profile
  async upsertProfile(profileData: Partial<ProfileInsert>): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error upserting profile:', error)
      return null
    }
  }

  // Update profile
  async updateProfile(updates: ProfileUpdate): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating profile:', error)
      return null
    }
  }

  // Add skill
  async addSkill(skill: Omit<InsertTables<'skills'>, 'profile_id'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('skills')
        .insert({
          ...skill,
          profile_id: user.id
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error adding skill:', error)
      return false
    }
  }

  // Update skill
  async updateSkill(skillId: string, updates: UpdateTables<'skills'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', skillId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating skill:', error)
      return false
    }
  }

  // Delete skill
  async deleteSkill(skillId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting skill:', error)
      return false
    }
  }

  // Add certificate
  async addCertificate(certificate: Omit<InsertTables<'certificates'>, 'profile_id'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('certificates')
        .insert({
          ...certificate,
          profile_id: user.id
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error adding certificate:', error)
      return false
    }
  }

  // Update certificate
  async updateCertificate(certId: string, updates: UpdateTables<'certificates'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('certificates')
        .update(updates)
        .eq('id', certId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating certificate:', error)
      return false
    }
  }

  // Add education
  async addEducation(education: Omit<InsertTables<'education'>, 'profile_id'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('education')
        .insert({
          ...education,
          profile_id: user.id
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error adding education:', error)
      return false
    }
  }

  // Add experience
  async addExperience(experience: Omit<InsertTables<'experience'>, 'profile_id'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('experience')
        .insert({
          ...experience,
          profile_id: user.id
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error adding experience:', error)
      return false
    }
  }

  // Calculate profile completeness
  async calculateProfileCompleteness(userId: string): Promise<number> {
    try {
      const profile = await this.getProfileByUserId(userId)
      if (!profile) return 0

      let score = 0
      const maxScore = 100

      // Basic info (40 points)
      if (profile.fullName) score += 5
      if (profile.headline) score += 5
      if (profile.specialty) score += 5
      if (profile.bio) score += 5
      if (profile.location?.city) score += 5
      if (profile.profilePicture) score += 5
      if (profile.contact.email) score += 5
      if (profile.contact.phone) score += 5

      // Skills (20 points)
      if (profile.skills.length >= 3) score += 10
      if (profile.skills.length >= 5) score += 10

      // Education (15 points)
      if (profile.education.length >= 1) score += 15

      // Experience (15 points)
      if (profile.experience.length >= 1) score += 15

      // Certificates (10 points)
      if (profile.certificates.length >= 1) score += 10

      return Math.min(score, maxScore)
    } catch (error) {
      console.error('Error calculating profile completeness:', error)
      return 0
    }
  }

  // Update profile completeness
  async updateProfileCompleteness(userId: string): Promise<void> {
    try {
      const completeness = await this.calculateProfileCompleteness(userId)
      await supabase
        .from('profiles')
        .update({ profile_completeness: completeness })
        .eq('id', userId)
    } catch (error) {
      console.error('Error updating profile completeness:', error)
    }
  }

  // Search profiles
  async searchProfiles(query: string, userType?: string): Promise<ProfessionalProfile[]> {
    try {
      let queryBuilder = supabase
        .from('profiles')
        .select(`
          *,
          skills (*),
          certificates (*),
          education (*),
          experience (*),
          awards (*),
          publications (*),
          languages (*)
        `)

      if (userType) {
        queryBuilder = queryBuilder.eq('user_type', userType)
      }

      if (query) {
        queryBuilder = queryBuilder.or(`
          full_name.ilike.%${query}%,
          specialty.ilike.%${query}%,
          profession.ilike.%${query}%,
          institution.ilike.%${query}%
        `)
      }

      const { data, error } = await queryBuilder.limit(50)

      if (error) throw error

      return data.map(profile => this.transformToProfileFormat(profile))
    } catch (error) {
      console.error('Error searching profiles:', error)
      return []
    }
  }

  // Transform database format to ProfessionalProfile format
  private transformToProfileFormat(data: any): ProfessionalProfile {
    return {
      userId: data.id,
      fullName: data.full_name || '',
      headline: data.headline,
      specialty: data.specialty || '',
      bio: data.bio,
      location: {
        city: data.location_city || '',
        state: data.location_state,
        country: data.location_country || ''
      },
      contact: {
        email: data.email,
        phone: data.phone_number
      },
      skills: data.skills?.map((skill: any) => ({
        name: skill.name,
        level: skill.level,
        yearsOfExperience: skill.years_of_experience,
        endorsements: skill.endorsements
      })) || [],
      certificates: data.certificates?.map((cert: any) => ({
        name: cert.name,
        status: cert.status,
        expiryDate: cert.expiry_date,
        url: cert.url
      })) || [],
      education: data.education?.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        startDate: edu.start_date,
        endDate: edu.end_date,
        current: edu.current,
        description: edu.description
      })) || [],
      experience: data.experience?.map((exp: any) => ({
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.start_date,
        endDate: exp.end_date,
        current: exp.current,
        description: exp.description
      })) || [],
      awards: data.awards?.map((award: any) => ({
        title: award.title,
        issuer: award.issuer,
        date: award.date,
        description: award.description
      })) || [],
      publications: data.publications?.map((pub: any) => ({
        title: pub.title,
        publisher: pub.publisher,
        date: pub.date,
        url: pub.url,
        citations: pub.citations
      })) || [],
      languages: data.languages?.map((lang: any) => ({
        name: lang.name,
        proficiency: lang.proficiency
      })) || [],
      profilePicture: data.profile_picture,
      glohsenScore: data.glohsen_score,
      profileCompleteness: data.profile_completeness
    }
  }
}

export const profileService = new ProfileService()