import { supabase } from '../config/supabase'
import type { Database, Tables } from '../types/database'

export interface DashboardStats {
  // Student Stats
  coursesEnrolled?: number
  coursesCompleted?: number
  overallProgress?: number
  studyHours?: number
  quizzesTaken?: number
  avgScore?: number
  achievements?: number
  studyStreak?: number
  balance?: number
  scholarships?: number

  // Professional Stats
  profileCompleteness?: number
  jobApplications?: number
  coursesTaken?: number
  skillsCount?: number
  connectionsCount?: number
  glohsenScore?: number

  // Employer Stats
  activeJobs?: number
  totalApplications?: number
  hiredCandidates?: number
  averageTimeToHire?: number

  // Tutor Stats
  coursesCreated?: number
  totalStudents?: number
  averageRating?: number
  totalRevenue?: number
}

export interface CourseData {
  id: string
  title: string
  instructor: string
  progress: number
  status: string
  duration: string
  nextClass?: string
  modules: { completed: number; total: number }
  description?: string
  thumbnail?: string
  category?: string
  difficulty?: string
  enrollmentDate?: string
}

export interface ActivityData {
  id: string
  activity: string
  course?: string
  score?: string
  status?: string
  duration?: string
  members?: string
  time: string
  type: 'quiz' | 'lecture' | 'assignment' | 'community' | 'course' | 'job'
  metadata?: any
}

export interface DeadlineData {
  id: string
  course: string
  task: string
  date: string
  status: 'Urgent' | 'Upcoming' | 'Completed'
  priority: 'high' | 'medium' | 'low'
  type?: string
}

export interface TransactionData {
  id: string
  date: string
  type: string
  amount: number
  description: string
  status: string
  courseId?: string
}

export interface NotificationData {
  id: string
  title: string
  message: string
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  read: boolean
  created_at: string
}

class DashboardService {
  // Get dashboard stats for current user
  async getDashboardStats(userType: string): Promise<DashboardStats> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      switch (userType) {
        case 'student':
          return this.getStudentStats(user.id)
        case 'professional':
          return this.getProfessionalStats(user.id)
        case 'employer':
          return this.getEmployerStats(user.id)
        case 'tutor':
          return this.getTutorStats(user.id)
        default:
          return {}
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {}
    }
  }

  // Get student-specific stats
  private async getStudentStats(userId: string): Promise<DashboardStats> {
    try {
      // Get enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*, course:courses(*)')
        .eq('student_id', userId)

      const coursesEnrolled = enrollments?.length || 0
      const coursesCompleted = enrollments?.filter(e => e.status === 'COMPLETED').length || 0
      const totalProgress = enrollments?.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) || 0
      const overallProgress = coursesEnrolled > 0 ? Math.round(totalProgress / coursesEnrolled) : 0

      // Get activities for study hours calculation
      const { data: activities } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days

      // Calculate study hours from activities (rough estimate)
      const studyActivities = activities?.filter(a => 
        a.activity_type === 'course_view' || 
        a.activity_type === 'module_complete' || 
        a.activity_type === 'quiz_taken'
      ) || []
      const studyHours = Math.round((studyActivities.length * 0.5) * 10) / 10 // Estimate 30 min per activity

      // Get quiz/assessment data
      const quizActivities = activities?.filter(a => a.activity_type === 'quiz_taken') || []
      const quizzesTaken = quizActivities.length

      // Calculate average score (mock for now, would need assessment results table)
      const avgScore = quizActivities.length > 0 ? 
        Math.round(Math.random() * 20 + 75) : 0 // Mock: 75-95%

      // Get achievements count (from any awards or badges)
      const { count: achievements } = await supabase
        .from('awards')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId)

      // Calculate study streak (mock for now)
      const studyStreak = Math.floor(Math.random() * 20) + 5 // Mock: 5-25 days

      // Get purse data (mock for now, would need payments/wallet table)
      const balance = 15000
      const scholarships = 45000

      return {
        coursesEnrolled,
        coursesCompleted,
        overallProgress,
        studyHours,
        quizzesTaken,
        avgScore,
        achievements: achievements || 0,
        studyStreak,
        balance,
        scholarships
      }
    } catch (error) {
      console.error('Error fetching student stats:', error)
      return {}
    }
  }

  // Get professional-specific stats
  private async getProfessionalStats(userId: string): Promise<DashboardStats> {
    try {
      // Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          *,
          skills(*),
          certificates(*),
          education(*),
          experience(*)
        `)
        .eq('id', userId)
        .single()

      const profileCompleteness = profile?.profile_completeness || 0
      const skillsCount = profile?.skills?.length || 0
      const glohsenScore = profile?.glohsen_score || 0

      // Get job applications
      const { count: jobApplications } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .eq('applicant_id', userId)

      // Get course enrollments
      const { count: coursesTaken } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId)

      // Connections count (mock for now)
      const connectionsCount = Math.floor(Math.random() * 100) + 50

      return {
        profileCompleteness,
        jobApplications: jobApplications || 0,
        coursesTaken: coursesTaken || 0,
        skillsCount,
        connectionsCount,
        glohsenScore
      }
    } catch (error) {
      console.error('Error fetching professional stats:', error)
      return {}
    }
  }

  // Get employer-specific stats
  private async getEmployerStats(userId: string): Promise<DashboardStats> {
    try {
      // Get jobs data
      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')
        .eq('employer_id', userId)

      const activeJobs = jobs?.filter(j => j.status === 'ACTIVE').length || 0

      // Get applications
      const jobIds = jobs?.map(j => j.id) || []
      const { count: totalApplications } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .in('job_id', jobIds)

      // Mock additional stats
      const hiredCandidates = Math.floor((totalApplications || 0) * 0.1) // 10% hire rate
      const averageTimeToHire = 14 // 14 days average

      return {
        activeJobs,
        totalApplications: totalApplications || 0,
        hiredCandidates,
        averageTimeToHire
      }
    } catch (error) {
      console.error('Error fetching employer stats:', error)
      return {}
    }
  }

  // Get tutor-specific stats
  private async getTutorStats(userId: string): Promise<DashboardStats> {
    try {
      // Get courses created
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', userId)

      const coursesCreated = courses?.length || 0

      // Get total students from enrollments
      const courseIds = courses?.map(c => c.id) || []
      const { count: totalStudents } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .in('course_id', courseIds)

      // Calculate total revenue
      const totalRevenue = courses?.reduce((sum, course) => {
        return sum + (course.price || 0)
      }, 0) || 0

      // Mock average rating
      const averageRating = 4.2 + Math.random() * 0.7 // 4.2-4.9

      return {
        coursesCreated,
        totalStudents: totalStudents || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        totalRevenue
      }
    } catch (error) {
      console.error('Error fetching tutor stats:', error)
      return {}
    }
  }

  // Get user's enrolled courses
  async getUserCourses(): Promise<CourseData[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(
            *,
            instructor:profiles!courses_instructor_id_fkey(full_name)
          )
        `)
        .eq('student_id', user.id)
        .order('enrollment_date', { ascending: false })

      return enrollments?.map(enrollment => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        instructor: enrollment.course.instructor?.full_name || 'Unknown Instructor',
        progress: enrollment.progress_percentage || 0,
        status: this.getStatusFromProgress(enrollment.progress_percentage || 0, enrollment.status),
        duration: `${enrollment.course.duration_hours} hours`,
        modules: {
          completed: Math.floor((enrollment.progress_percentage || 0) / 100 * 20), // Estimate
          total: 20 // Mock total modules
        },
        description: enrollment.course.description,
        thumbnail: enrollment.course.thumbnail,
        category: enrollment.course.category,
        difficulty: enrollment.course.difficulty,
        enrollmentDate: enrollment.enrollment_date
      })) || []
    } catch (error) {
      console.error('Error fetching user courses:', error)
      return []
    }
  }

  // Get user activities
  async getUserActivities(limit = 10): Promise<ActivityData[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data: activities } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      return activities?.map(activity => ({
        id: activity.id,
        activity: this.formatActivityDescription(activity.activity_type, activity.description),
        course: activity.metadata?.course_name || '',
        score: activity.metadata?.score,
        status: activity.metadata?.status,
        duration: activity.metadata?.duration,
        members: activity.metadata?.members,
        time: this.formatTimeAgo(activity.created_at),
        type: this.mapActivityType(activity.activity_type),
        metadata: activity.metadata
      })) || []
    } catch (error) {
      console.error('Error fetching user activities:', error)
      return []
    }
  }

  // Get upcoming deadlines
  async getUpcomingDeadlines(): Promise<DeadlineData[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      // Get course deadlines from enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('student_id', user.id)
        .eq('status', 'ENROLLED')

      // Mock deadlines based on enrollments
      const deadlines: DeadlineData[] = []
      
      enrollments?.forEach(enrollment => {
        // Generate mock deadlines for active courses
        const course = enrollment.course
        const now = new Date()
        
        // Add some mock deadlines
        deadlines.push({
          id: `${enrollment.id}-exam`,
          course: course.title,
          task: 'Final Exam',
          date: new Date(now.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          status: Math.random() > 0.7 ? 'Urgent' : 'Upcoming',
          priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
          type: 'exam'
        })
      })

      return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error('Error fetching deadlines:', error)
      return []
    }
  }

  // Get user notifications
  async getUserNotifications(limit = 10): Promise<NotificationData[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      return notifications || []
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  // Get user transactions/purse data
  async getUserTransactions(limit = 10): Promise<TransactionData[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      // For now, return mock data since we don't have a payments table yet
      // In a real implementation, this would query a payments/transactions table
      const mockTransactions: TransactionData[] = [
        {
          id: '1',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Course Payment',
          amount: -15000,
          description: 'Medical Terminology Course',
          status: 'Completed'
        },
        {
          id: '2',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Scholarship',
          amount: 25000,
          description: 'Academic Excellence Grant',
          status: 'Received'
        },
        {
          id: '3',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'Quiz Reward',
          amount: 500,
          description: 'High Score Bonus',
          status: 'Received'
        }
      ]

      return mockTransactions
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }

  // Helper methods
  private getStatusFromProgress(progress: number, enrollmentStatus: string): string {
    if (enrollmentStatus === 'COMPLETED') return 'Completed'
    if (progress >= 90) return 'Nearly Complete'
    if (progress >= 50) return 'In Progress'
    if (progress > 0) return 'Just Started'
    return 'Not Started'
  }

  private formatActivityDescription(type: string, description: string): string {
    switch (type) {
      case 'course_enrollment':
        return 'Enrolled in course'
      case 'module_complete':
        return 'Completed module'
      case 'quiz_taken':
        return 'Completed quiz'
      case 'assignment_submit':
        return 'Submitted assignment'
      case 'discussion_post':
        return 'Posted in discussion'
      case 'course_complete':
        return 'Completed course'
      default:
        return description || 'Activity completed'
    }
  }

  private mapActivityType(activityType: string): ActivityData['type'] {
    switch (activityType) {
      case 'quiz_taken':
      case 'assessment_complete':
        return 'quiz'
      case 'module_view':
      case 'video_watch':
        return 'lecture'
      case 'assignment_submit':
        return 'assignment'
      case 'discussion_post':
      case 'group_join':
        return 'community'
      case 'course_enrollment':
      case 'course_complete':
        return 'course'
      case 'job_application':
        return 'job'
      default:
        return 'lecture'
    }
  }

  private formatTimeAgo(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks} weeks ago`
  }

  // Create activity record
  async createActivity(activityType: string, description: string, metadata?: any): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('activities')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          description,
          metadata
        })
    } catch (error) {
      console.error('Error creating activity:', error)
    }
  }

  // Update user's last activity
  async updateLastActivity(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', user.id)
    } catch (error) {
      console.error('Error updating last activity:', error)
    }
  }
}

export const dashboardService = new DashboardService()