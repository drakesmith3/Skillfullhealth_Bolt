import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Job = Tables<'jobs'>
type JobInsert = InsertTables<'jobs'>
type JobUpdate = UpdateTables<'jobs'>

export interface JobWithEmployer extends Job {
  employer: {
    company: string
    full_name: string
    location_city: string
    location_country: string
  }
}

class JobService {
  // Get all active jobs
  async getActiveJobs(limit = 20): Promise<JobWithEmployer[]> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          employer:profiles!jobs_employer_id_fkey (
            full_name,
            location_city,
            location_country
          )
        `)
        .eq('status', 'ACTIVE')
        .order('posted_date', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(job => ({
        ...job,
        employer: {
          company: job.company,
          full_name: job.employer?.full_name || '',
          location_city: job.employer?.location_city || '',
          location_country: job.employer?.location_country || ''
        }
      }))
    } catch (error) {
      console.error('Error fetching jobs:', error)
      return []
    }
  }

  // Get jobs by employer
  async getJobsByEmployer(employerId: string): Promise<Job[]> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('employer_id', employerId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching employer jobs:', error)
      return []
    }
  }

  // Search jobs
  async searchJobs(query: string, filters?: {
    location?: string
    jobType?: string
    salaryMin?: number
    salaryMax?: number
  }): Promise<JobWithEmployer[]> {
    try {
      let queryBuilder = supabase
        .from('jobs')
        .select(`
          *,
          employer:profiles!jobs_employer_id_fkey (
            full_name,
            location_city,
            location_country
          )
        `)
        .eq('status', 'ACTIVE')

      if (query) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${query}%,
          description.ilike.%${query}%,
          company.ilike.%${query}%
        `)
      }

      if (filters?.location) {
        queryBuilder = queryBuilder.ilike('location', `%${filters.location}%`)
      }

      if (filters?.jobType) {
        queryBuilder = queryBuilder.eq('job_type', filters.jobType)
      }

      if (filters?.salaryMin) {
        queryBuilder = queryBuilder.gte('salary_min', filters.salaryMin)
      }

      if (filters?.salaryMax) {
        queryBuilder = queryBuilder.lte('salary_max', filters.salaryMax)
      }

      const { data, error } = await queryBuilder
        .order('posted_date', { ascending: false })
        .limit(50)

      if (error) throw error

      return data.map(job => ({
        ...job,
        employer: {
          company: job.company,
          full_name: job.employer?.full_name || '',
          location_city: job.employer?.location_city || '',
          location_country: job.employer?.location_country || ''
        }
      }))
    } catch (error) {
      console.error('Error searching jobs:', error)
      return []
    }
  }

  // Create job
  async createJob(jobData: Omit<JobInsert, 'employer_id'>): Promise<Job | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('jobs')
        .insert({
          ...jobData,
          employer_id: user.id,
          posted_date: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating job:', error)
      return null
    }
  }

  // Update job
  async updateJob(jobId: string, updates: JobUpdate): Promise<Job | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('jobs')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('employer_id', user.id) // Ensure user owns the job
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating job:', error)
      return null
    }
  }

  // Delete job
  async deleteJob(jobId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('employer_id', user.id) // Ensure user owns the job

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting job:', error)
      return false
    }
  }

  // Get job by ID
  async getJobById(jobId: string): Promise<JobWithEmployer | null> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          employer:profiles!jobs_employer_id_fkey (
            full_name,
            location_city,
            location_country
          )
        `)
        .eq('id', jobId)
        .single()

      if (error) throw error

      return {
        ...data,
        employer: {
          company: data.company,
          full_name: data.employer?.full_name || '',
          location_city: data.employer?.location_city || '',
          location_country: data.employer?.location_country || ''
        }
      }
    } catch (error) {
      console.error('Error fetching job:', error)
      return null
    }
  }

  // Close job
  async closeJob(jobId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('jobs')
        .update({ status: 'CLOSED' })
        .eq('id', jobId)
        .eq('employer_id', user.id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error closing job:', error)
      return false
    }
  }

  // Get job statistics for employer
  async getEmployerJobStats(employerId: string): Promise<{
    total: number
    active: number
    closed: number
    draft: number
  }> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('status')
        .eq('employer_id', employerId)

      if (error) throw error

      const stats = {
        total: data.length,
        active: data.filter(job => job.status === 'ACTIVE').length,
        closed: data.filter(job => job.status === 'CLOSED').length,
        draft: data.filter(job => job.status === 'DRAFT').length
      }

      return stats
    } catch (error) {
      console.error('Error fetching job stats:', error)
      return { total: 0, active: 0, closed: 0, draft: 0 }
    }
  }

  // Apply to job
  async applyToJob(jobId: string, applicationData: any): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
          ...applicationData,
          applied_at: new Date().toISOString()
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error applying to job:', error)
      return false
    }
  }

  // Check if user has applied to job
  async hasUserApplied(jobId: string, userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('applicant_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return !!data
    } catch (error) {
      console.error('Error checking application status:', error)
      return false
    }
  }
}

export const jobService = new JobService()