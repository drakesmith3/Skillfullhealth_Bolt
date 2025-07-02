import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Course = Tables<'courses'>
type CourseInsert = InsertTables<'courses'>
type CourseUpdate = UpdateTables<'courses'>
type Enrollment = Tables<'enrollments'>
type EnrollmentInsert = InsertTables<'enrollments'>

export interface CourseWithInstructor extends Course {
  instructor: {
    full_name: string
    specialty: string
    profile_picture: string | null
  }
  enrollments_count: number
  average_rating: number
}

export interface EnrollmentWithCourse extends Enrollment {
  course: Course
}

class CourseService {
  // Get all courses
  async getCourses(filters?: {
    category?: string
    difficulty?: string
    priceMax?: number
    search?: string
  }): Promise<CourseWithInstructor[]> {
    try {
      let queryBuilder = supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!courses_instructor_id_fkey (
            full_name,
            specialty,
            profile_picture
          )
        `)

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category)
      }

      if (filters?.difficulty) {
        queryBuilder = queryBuilder.eq('difficulty', filters.difficulty)
      }

      if (filters?.priceMax) {
        queryBuilder = queryBuilder.lte('price', filters.priceMax)
      }

      if (filters?.search) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${filters.search}%,
          description.ilike.%${filters.search}%,
          category.ilike.%${filters.search}%
        `)
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      // Get enrollment counts and ratings for each course
      const coursesWithStats = await Promise.all(
        data.map(async (course) => {
          const enrollmentCount = await this.getCourseEnrollmentCount(course.id)
          const averageRating = await this.getCourseAverageRating(course.id)

          return {
            ...course,
            instructor: {
              full_name: course.instructor?.full_name || '',
              specialty: course.instructor?.specialty || '',
              profile_picture: course.instructor?.profile_picture || null
            },
            enrollments_count: enrollmentCount,
            average_rating: averageRating
          }
        })
      )

      return coursesWithStats
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  }

  // Get courses by instructor
  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', instructorId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching instructor courses:', error)
      return []
    }
  }

  // Get course by ID
  async getCourseById(courseId: string): Promise<CourseWithInstructor | null> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!courses_instructor_id_fkey (
            full_name,
            specialty,
            profile_picture
          )
        `)
        .eq('id', courseId)
        .single()

      if (error) throw error

      const enrollmentCount = await this.getCourseEnrollmentCount(courseId)
      const averageRating = await this.getCourseAverageRating(courseId)

      return {
        ...data,
        instructor: {
          full_name: data.instructor?.full_name || '',
          specialty: data.instructor?.specialty || '',
          profile_picture: data.instructor?.profile_picture || null
        },
        enrollments_count: enrollmentCount,
        average_rating: averageRating
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      return null
    }
  }

  // Create course
  async createCourse(courseData: Omit<CourseInsert, 'instructor_id'>): Promise<Course | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('courses')
        .insert({
          ...courseData,
          instructor_id: user.id
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating course:', error)
      return null
    }
  }

  // Update course
  async updateCourse(courseId: string, updates: CourseUpdate): Promise<Course | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('courses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .eq('instructor_id', user.id) // Ensure user owns the course
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating course:', error)
      return null
    }
  }

  // Delete course
  async deleteCourse(courseId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)
        .eq('instructor_id', user.id) // Ensure user owns the course

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting course:', error)
      return false
    }
  }

  // Enroll in course
  async enrollInCourse(courseId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Check if already enrolled
      const { data: existing } = await supabase
        .from('enrollments')
        .select('id')
        .eq('student_id', user.id)
        .eq('course_id', courseId)
        .single()

      if (existing) {
        throw new Error('Already enrolled in this course')
      }

      const { error } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: courseId,
          enrollment_date: new Date().toISOString()
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error enrolling in course:', error)
      return false
    }
  }

  // Get user enrollments
  async getUserEnrollments(userId?: string): Promise<EnrollmentWithCourse[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses (*)
        `)
        .eq('student_id', targetUserId)
        .order('enrollment_date', { ascending: false })

      if (error) throw error

      return data.map(enrollment => ({
        ...enrollment,
        course: enrollment.course as Course
      }))
    } catch (error) {
      console.error('Error fetching enrollments:', error)
      return []
    }
  }

  // Update enrollment progress
  async updateEnrollmentProgress(enrollmentId: string, progress: number): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const updates: any = {
        progress_percentage: progress,
        updated_at: new Date().toISOString()
      }

      // Mark as completed if progress is 100%
      if (progress >= 100) {
        updates.status = 'COMPLETED'
        updates.completion_date = new Date().toISOString()
      }

      const { error } = await supabase
        .from('enrollments')
        .update(updates)
        .eq('id', enrollmentId)
        .eq('student_id', user.id) // Ensure user owns the enrollment

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating enrollment progress:', error)
      return false
    }
  }

  // Get course enrollment count
  private async getCourseEnrollmentCount(courseId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId)

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error fetching enrollment count:', error)
      return 0
    }
  }

  // Get course average rating
  private async getCourseAverageRating(courseId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('rating')
        .eq('feedback_type', 'COURSE')
        .eq('to_user_id', courseId) // Using to_user_id to store course_id for course feedback

      if (error) throw error

      if (data.length === 0) return 0

      const total = data.reduce((sum, feedback) => sum + feedback.rating, 0)
      return Math.round((total / data.length) * 10) / 10 // Round to 1 decimal place
    } catch (error) {
      console.error('Error fetching course rating:', error)
      return 0
    }
  }

  // Get instructor statistics
  async getInstructorStats(instructorId: string): Promise<{
    totalCourses: number
    totalEnrollments: number
    averageRating: number
    totalRevenue: number
  }> {
    try {
      const courses = await this.getCoursesByInstructor(instructorId)
      
      let totalEnrollments = 0
      let totalRatings = 0
      let ratingSum = 0
      let totalRevenue = 0

      for (const course of courses) {
        const enrollmentCount = await this.getCourseEnrollmentCount(course.id)
        const rating = await this.getCourseAverageRating(course.id)
        
        totalEnrollments += enrollmentCount
        totalRevenue += course.price * enrollmentCount
        
        if (rating > 0) {
          ratingSum += rating
          totalRatings++
        }
      }

      return {
        totalCourses: courses.length,
        totalEnrollments,
        averageRating: totalRatings > 0 ? Math.round((ratingSum / totalRatings) * 10) / 10 : 0,
        totalRevenue
      }
    } catch (error) {
      console.error('Error fetching instructor stats:', error)
      return { totalCourses: 0, totalEnrollments: 0, averageRating: 0, totalRevenue: 0 }
    }
  }
}

export const courseService = new CourseService()