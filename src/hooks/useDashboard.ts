import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUserDisplay } from './useProfile'
import { dashboardService } from '../services/dashboardService'
import type { 
  DashboardStats, 
  CourseData, 
  ActivityData, 
  DeadlineData, 
  TransactionData,
  NotificationData 
} from '../services/dashboardService'

export interface UseDashboardResult {
  stats: DashboardStats
  courses: CourseData[]
  activities: ActivityData[]
  deadlines: DeadlineData[]
  transactions: TransactionData[]
  notifications: NotificationData[]
  loading: boolean
  error: string | null
  refreshDashboard: () => Promise<void>
}

export function useDashboard(): UseDashboardResult {
  const { user } = useAuth()
  const { userType } = useUserDisplay()
  
  const [stats, setStats] = useState<DashboardStats>({})
  const [courses, setCourses] = useState<CourseData[]>([])
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [deadlines, setDeadlines] = useState<DeadlineData[]>([])
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    if (!user || !userType) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      setLoading(true)

      // Fetch all dashboard data in parallel
      const [
        dashboardStats,
        userCourses,
        userActivities,
        upcomingDeadlines,
        userTransactions,
        userNotifications
      ] = await Promise.all([
        dashboardService.getDashboardStats(userType),
        dashboardService.getUserCourses(),
        dashboardService.getUserActivities(10),
        dashboardService.getUpcomingDeadlines(),
        dashboardService.getUserTransactions(10),
        dashboardService.getUserNotifications(10)
      ])

      setStats(dashboardStats)
      setCourses(userCourses)
      setActivities(userActivities)
      setDeadlines(upcomingDeadlines)
      setTransactions(userTransactions)
      setNotifications(userNotifications)

      // Update last activity
      await dashboardService.updateLastActivity()
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }, [user, userType])

  const refreshDashboard = async () => {
    await fetchDashboardData()
  }

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return {
    stats,
    courses,
    activities,
    deadlines,
    transactions,
    notifications,
    loading,
    error,
    refreshDashboard
  }
}

// Specialized hook for student dashboard data
export function useStudentDashboard() {
  const dashboard = useDashboard()
  
  // Helper function to ensure valid numbers
  const ensureValidNumber = (value: any, defaultValue: number = 0): number => {
    const num = Number(value)
    return isNaN(num) || !isFinite(num) ? defaultValue : num
  }
  
  return {
    ...dashboard,
    // Student-specific computed values with NaN protection
    progressData: dashboard.courses.length > 0 ? dashboard.courses.map((course, index) => ({
      month: new Date(course.enrollmentDate || Date.now()).toLocaleDateString('en-US', { month: 'short' }) || `Month ${index + 1}`,
      completed: course.status === 'Completed' ? 1 : 0,
      inProgress: course.status !== 'Completed' ? 1 : 0
    })) : [
      { month: 'Jan', completed: 0, inProgress: 1 },
      { month: 'Feb', completed: 1, inProgress: 2 },
      { month: 'Mar', completed: 2, inProgress: 1 }
    ],
    
    performanceData: dashboard.courses.length > 0 ? dashboard.courses.map(course => ({
      subject: course.title?.split(' ')[0] || 'Subject', // First word as subject
      score: ensureValidNumber(course.progress * 0.8 + 20, 75) // Convert progress to score, default to 75
    })) : [
      { subject: 'Anatomy', score: 85 },
      { subject: 'Physiology', score: 78 },
      { subject: 'Pharmacology', score: 92 },
      { subject: 'Pathology', score: 88 }
    ],

    studyTimeData: Array.from({ length: 7 }, (_, i) => {
      const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
      const hours = Math.random() * 3 + 1 // 1-4 hours
      return { day, hours: ensureValidNumber(Math.round(hours * 10) / 10, 2.5) }
    })
  }
}

// Specialized hook for professional dashboard data
export function useProfessionalDashboard() {
  const dashboard = useDashboard()
  
  return {
    ...dashboard,
    // Professional-specific computed values
    profileStrength: dashboard.stats.profileCompleteness || 0,
    networkGrowth: Math.floor(Math.random() * 10) + 5, // Mock network growth
    skillEndorsements: Math.floor(Math.random() * 50) + 10 // Mock endorsements
  }
}

// Specialized hook for employer dashboard data
export function useEmployerDashboard() {
  const dashboard = useDashboard()
  
  return {
    ...dashboard,
    // Employer-specific computed values
    hiringFunnel: {
      applied: dashboard.stats.totalApplications || 0,
      screened: Math.floor((dashboard.stats.totalApplications || 0) * 0.6),
      interviewed: Math.floor((dashboard.stats.totalApplications || 0) * 0.3),
      hired: dashboard.stats.hiredCandidates || 0
    }
  }
}

// Specialized hook for tutor dashboard data
export function useTutorDashboard() {
  const dashboard = useDashboard()
  
  return {
    ...dashboard,
    // Tutor-specific computed values
    monthlyEarnings: dashboard.stats.totalRevenue || 0,
    studentSatisfaction: dashboard.stats.averageRating || 0,
    courseCompletionRate: dashboard.courses.length > 0 ? 
      dashboard.courses.filter(c => c.status === 'Completed').length / dashboard.courses.length * 100 : 0
  }
}