import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Feedback = Tables<'feedback'>
type FeedbackInsert = InsertTables<'feedback'>
type FeedbackUpdate = UpdateTables<'feedback'>

export interface FeedbackWithUsers extends Feedback {
  from_user: {
    full_name: string
    profile_picture: string | null
    user_type: string
  }
  to_user?: {
    full_name: string
    profile_picture: string | null
    user_type: string
  }
}

class FeedbackService {
  // Get feedback for a user
  async getFeedbackForUser(userId: string, type?: string): Promise<FeedbackWithUsers[]> {
    try {
      let queryBuilder = supabase
        .from('feedback')
        .select(`
          *,
          from_user:profiles!feedback_from_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          ),
          to_user:profiles!feedback_to_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .eq('to_user_id', userId)

      if (type) {
        queryBuilder = queryBuilder.eq('feedback_type', type)
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(feedback => ({
        ...feedback,
        from_user: {
          full_name: feedback.from_user?.full_name || 'Anonymous',
          profile_picture: feedback.from_user?.profile_picture || null,
          user_type: feedback.from_user?.user_type || 'professional'
        },
        to_user: feedback.to_user ? {
          full_name: feedback.to_user.full_name || '',
          profile_picture: feedback.to_user.profile_picture || null,
          user_type: feedback.to_user.user_type || 'professional'
        } : undefined
      }))
    } catch (error) {
      console.error('Error fetching feedback:', error)
      return []
    }
  }

  // Get feedback by a user
  async getFeedbackByUser(userId?: string): Promise<FeedbackWithUsers[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          from_user:profiles!feedback_from_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          ),
          to_user:profiles!feedback_to_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .eq('from_user_id', targetUserId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(feedback => ({
        ...feedback,
        from_user: {
          full_name: feedback.from_user?.full_name || 'Anonymous',
          profile_picture: feedback.from_user?.profile_picture || null,
          user_type: feedback.from_user?.user_type || 'professional'
        },
        to_user: feedback.to_user ? {
          full_name: feedback.to_user.full_name || '',
          profile_picture: feedback.to_user.profile_picture || null,
          user_type: feedback.to_user.user_type || 'professional'
        } : undefined
      }))
    } catch (error) {
      console.error('Error fetching user feedback:', error)
      return []
    }
  }

  // Create feedback
  async createFeedback(feedbackData: Omit<FeedbackInsert, 'from_user_id'>): Promise<Feedback | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('feedback')
        .insert({
          ...feedbackData,
          from_user_id: user.id
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating feedback:', error)
      return null
    }
  }

  // Update feedback
  async updateFeedback(feedbackId: string, updates: FeedbackUpdate): Promise<Feedback | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('feedback')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', feedbackId)
        .eq('from_user_id', user.id) // Ensure user owns the feedback
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating feedback:', error)
      return null
    }
  }

  // Delete feedback
  async deleteFeedback(feedbackId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', feedbackId)
        .eq('from_user_id', user.id) // Ensure user owns the feedback

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting feedback:', error)
      return false
    }
  }

  // Get average rating for a user
  async getAverageRating(userId: string, type?: string): Promise<number> {
    try {
      let queryBuilder = supabase
        .from('feedback')
        .select('rating')
        .eq('to_user_id', userId)

      if (type) {
        queryBuilder = queryBuilder.eq('feedback_type', type)
      }

      const { data, error } = await queryBuilder

      if (error) throw error

      if (data.length === 0) return 0

      const total = data.reduce((sum, feedback) => sum + feedback.rating, 0)
      return Math.round((total / data.length) * 10) / 10 // Round to 1 decimal place
    } catch (error) {
      console.error('Error calculating average rating:', error)
      return 0
    }
  }

  // Get feedback statistics
  async getFeedbackStats(userId: string): Promise<{
    totalFeedback: number
    averageRating: number
    ratingDistribution: Record<number, number>
    feedbackByType: Record<string, number>
  }> {
    try {
      const feedback = await this.getFeedbackForUser(userId)
      
      const ratingDistribution: Record<number, number> = {}
      const feedbackByType: Record<string, number> = {}

      feedback.forEach(f => {
        ratingDistribution[f.rating] = (ratingDistribution[f.rating] || 0) + 1
        feedbackByType[f.feedback_type] = (feedbackByType[f.feedback_type] || 0) + 1
      })

      const averageRating = await this.getAverageRating(userId)

      return {
        totalFeedback: feedback.length,
        averageRating,
        ratingDistribution,
        feedbackByType
      }
    } catch (error) {
      console.error('Error fetching feedback stats:', error)
      return {
        totalFeedback: 0,
        averageRating: 0,
        ratingDistribution: {},
        feedbackByType: {}
      }
    }
  }

  // Submit course feedback
  async submitCourseFeedback(courseId: string, rating: number, comment?: string): Promise<boolean> {
    return !!(await this.createFeedback({
      to_user_id: courseId, // Using to_user_id to store course_id for course feedback
      rating,
      comment,
      feedback_type: 'COURSE'
    }))
  }

  // Submit job feedback
  async submitJobFeedback(employerId: string, rating: number, comment?: string): Promise<boolean> {
    return !!(await this.createFeedback({
      to_user_id: employerId,
      rating,
      comment,
      feedback_type: 'JOB'
    }))
  }

  // Submit employer feedback
  async submitEmployerFeedback(employerId: string, rating: number, comment?: string): Promise<boolean> {
    return !!(await this.createFeedback({
      to_user_id: employerId,
      rating,
      comment,
      feedback_type: 'EMPLOYER'
    }))
  }

  // Submit general feedback
  async submitGeneralFeedback(rating: number, comment?: string): Promise<boolean> {
    return !!(await this.createFeedback({
      to_user_id: null, // General feedback doesn't target a specific user
      rating,
      comment,
      feedback_type: 'GENERAL'
    }))
  }

  // Get recent feedback
  async getRecentFeedback(limit = 10): Promise<FeedbackWithUsers[]> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          from_user:profiles!feedback_from_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          ),
          to_user:profiles!feedback_to_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .not('to_user_id', 'is', null) // Exclude general feedback
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(feedback => ({
        ...feedback,
        from_user: {
          full_name: feedback.from_user?.full_name || 'Anonymous',
          profile_picture: feedback.from_user?.profile_picture || null,
          user_type: feedback.from_user?.user_type || 'professional'
        },
        to_user: feedback.to_user ? {
          full_name: feedback.to_user.full_name || '',
          profile_picture: feedback.to_user.profile_picture || null,
          user_type: feedback.to_user.user_type || 'professional'
        } : undefined
      }))
    } catch (error) {
      console.error('Error fetching recent feedback:', error)
      return []
    }
  }

  // Check if user can leave feedback (hasn't already left feedback)
  async canLeaveFeedback(toUserId: string, type: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { data, error } = await supabase
        .from('feedback')
        .select('id')
        .eq('from_user_id', user.id)
        .eq('to_user_id', toUserId)
        .eq('feedback_type', type)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw error
      }

      return !data // Can leave feedback if no existing feedback found
    } catch (error) {
      console.error('Error checking feedback permission:', error)
      return false
    }
  }
}

export const feedbackService = new FeedbackService()