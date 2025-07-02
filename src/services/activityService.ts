import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Activity = Tables<'activities'>
type ActivityInsert = InsertTables<'activities'>

export interface ActivityWithUser extends Activity {
  user: {
    full_name: string
    profile_picture: string | null
    user_type: string
  }
}

class ActivityService {
  // Get user activities
  async getUserActivities(userId?: string, limit = 50): Promise<Activity[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user activities:', error)
      return []
    }
  }

  // Get activities feed (activities from followed users)
  async getActivitiesFeed(limit = 20): Promise<ActivityWithUser[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // For now, get recent activities from all users (in a real app, you'd filter by followed users)
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          user:profiles!activities_user_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(activity => ({
        ...activity,
        user: {
          full_name: activity.user?.full_name || 'Unknown User',
          profile_picture: activity.user?.profile_picture || null,
          user_type: activity.user?.user_type || 'professional'
        }
      }))
    } catch (error) {
      console.error('Error fetching activities feed:', error)
      return []
    }
  }

  // Create activity
  async createActivity(activityData: Omit<ActivityInsert, 'user_id' | 'created_at'>): Promise<Activity | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('activities')
        .insert({
          ...activityData,
          user_id: user.id,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating activity:', error)
      return null
    }
  }

  // Log course enrollment activity
  async logCourseEnrollment(courseTitle: string, courseId: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'course_enrollment',
      description: `Enrolled in course: ${courseTitle}`,
      metadata: { course_id: courseId, course_title: courseTitle }
    }))
  }

  // Log course completion activity
  async logCourseCompletion(courseTitle: string, courseId: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'course_completion',
      description: `Completed course: ${courseTitle}`,
      metadata: { course_id: courseId, course_title: courseTitle }
    }))
  }

  // Log job application activity
  async logJobApplication(jobTitle: string, company: string, jobId: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'job_application',
      description: `Applied for ${jobTitle} at ${company}`,
      metadata: { job_id: jobId, job_title: jobTitle, company }
    }))
  }

  // Log profile update activity
  async logProfileUpdate(updateType: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'profile_update',
      description: `Updated ${updateType}`,
      metadata: { update_type: updateType }
    }))
  }

  // Log certificate earned activity
  async logCertificateEarned(certificateName: string, issuer: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'certificate_earned',
      description: `Earned certificate: ${certificateName} from ${issuer}`,
      metadata: { certificate_name: certificateName, issuer }
    }))
  }

  // Log skill added activity
  async logSkillAdded(skillName: string, level: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'skill_added',
      description: `Added ${level} level skill: ${skillName}`,
      metadata: { skill_name: skillName, level }
    }))
  }

  // Log award received activity
  async logAwardReceived(awardTitle: string, issuer: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'award_received',
      description: `Received award: ${awardTitle} from ${issuer}`,
      metadata: { award_title: awardTitle, issuer }
    }))
  }

  // Log publication activity
  async logPublication(publicationTitle: string, publisher: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'publication',
      description: `Published: ${publicationTitle} in ${publisher}`,
      metadata: { publication_title: publicationTitle, publisher }
    }))
  }

  // Log referral activity
  async logReferral(referredUserName: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'referral',
      description: `Referred ${referredUserName} to the platform`,
      metadata: { referred_user_name: referredUserName }
    }))
  }

  // Log Glohsen score improvement
  async logScoreImprovement(newScore: number, previousScore: number): Promise<boolean> {
    const improvement = newScore - previousScore
    return !!(await this.createActivity({
      activity_type: 'score_improvement',
      description: `Glohsen Score improved by ${improvement} points (${newScore})`,
      metadata: { new_score: newScore, previous_score: previousScore, improvement }
    }))
  }

  // Log login activity
  async logLogin(): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'login',
      description: 'Logged into the platform',
      metadata: { timestamp: new Date().toISOString() }
    }))
  }

  // Log forum participation
  async logForumPost(discussionTitle: string, discussionId: string): Promise<boolean> {
    return !!(await this.createActivity({
      activity_type: 'forum_post',
      description: `Participated in discussion: ${discussionTitle}`,
      metadata: { discussion_id: discussionId, discussion_title: discussionTitle }
    }))
  }

  // Get activity statistics
  async getActivityStats(userId?: string, days = 30): Promise<{
    totalActivities: number
    activitiesByType: Record<string, number>
    recentActivities: Activity[]
  }> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const dateFrom = new Date()
      dateFrom.setDate(dateFrom.getDate() - days)

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', targetUserId)
        .gte('created_at', dateFrom.toISOString())
        .order('created_at', { ascending: false })

      if (error) throw error

      const activitiesByType: Record<string, number> = {}
      data.forEach(activity => {
        activitiesByType[activity.activity_type] = (activitiesByType[activity.activity_type] || 0) + 1
      })

      return {
        totalActivities: data.length,
        activitiesByType,
        recentActivities: data.slice(0, 10)
      }
    } catch (error) {
      console.error('Error fetching activity stats:', error)
      return {
        totalActivities: 0,
        activitiesByType: {},
        recentActivities: []
      }
    }
  }

  // Delete old activities (cleanup)
  async deleteOldActivities(daysOld = 365): Promise<boolean> {
    try {
      const dateThreshold = new Date()
      dateThreshold.setDate(dateThreshold.getDate() - daysOld)

      const { error } = await supabase
        .from('activities')
        .delete()
        .lt('created_at', dateThreshold.toISOString())

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting old activities:', error)
      return false
    }
  }

  // Get activity timeline for dashboard
  async getActivityTimeline(userId?: string, limit = 10): Promise<Activity[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', targetUserId)
        .in('activity_type', [
          'course_enrollment',
          'course_completion',
          'certificate_earned',
          'award_received',
          'score_improvement',
          'job_application'
        ])
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching activity timeline:', error)
      return []
    }
  }
}

export const activityService = new ActivityService()