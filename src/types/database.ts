export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          full_name: string | null
          profession: string | null
          institution: string | null
          user_type: 'professional' | 'student' | 'employer' | 'tutor' | 'client'
          phone_number: string | null
          setup_2fa: boolean
          affiliate_link: string | null
          upline_uin: string | null
          profile_picture: string | null
          headline: string | null
          specialty: string | null
          bio: string | null
          location_city: string | null
          location_state: string | null
          location_country: string | null
          glohsen_score: number | null
          profile_completeness: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          full_name?: string | null
          profession?: string | null
          institution?: string | null
          user_type?: 'professional' | 'student' | 'employer' | 'tutor' | 'client'
          phone_number?: string | null
          setup_2fa?: boolean
          affiliate_link?: string | null
          upline_uin?: string | null
          profile_picture?: string | null
          headline?: string | null
          specialty?: string | null
          bio?: string | null
          location_city?: string | null
          location_state?: string | null
          location_country?: string | null
          glohsen_score?: number | null
          profile_completeness?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          first_name?: string | null
          last_name?: string | null
          full_name?: string | null
          profession?: string | null
          institution?: string | null
          user_type?: 'professional' | 'student' | 'employer' | 'tutor' | 'client'
          phone_number?: string | null
          setup_2fa?: boolean
          affiliate_link?: string | null
          upline_uin?: string | null
          profile_picture?: string | null
          headline?: string | null
          specialty?: string | null
          bio?: string | null
          location_city?: string | null
          location_state?: string | null
          location_country?: string | null
          glohsen_score?: number | null
          profile_completeness?: number | null
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          profile_id: string
          name: string
          level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
          years_of_experience: number
          endorsements: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
          years_of_experience: number
          endorsements?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
          years_of_experience?: number
          endorsements?: number
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          profile_id: string
          name: string
          status: 'CURRENT' | 'EXPIRED' | 'PENDING'
          expiry_date: string
          url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          status: 'CURRENT' | 'EXPIRED' | 'PENDING'
          expiry_date: string
          url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          status?: 'CURRENT' | 'EXPIRED' | 'PENDING'
          expiry_date?: string
          url?: string | null
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          profile_id: string
          degree: string
          institution: string
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          degree: string
          institution: string
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          degree?: string
          institution?: string
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          profile_id: string
          position: string
          company: string
          location: string | null
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          position: string
          company: string
          location?: string | null
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          position?: string
          company?: string
          location?: string | null
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          updated_at?: string
        }
      }
      awards: {
        Row: {
          id: string
          profile_id: string
          title: string
          issuer: string
          date: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          issuer: string
          date: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          issuer?: string
          date?: string
          description?: string | null
          updated_at?: string
        }
      }
      publications: {
        Row: {
          id: string
          profile_id: string
          title: string
          publisher: string
          date: string
          url: string | null
          citations: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          publisher: string
          date: string
          url?: string | null
          citations?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          publisher?: string
          date?: string
          url?: string | null
          citations?: number
          updated_at?: string
        }
      }
      languages: {
        Row: {
          id: string
          profile_id: string
          name: string
          proficiency: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          proficiency: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE'
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          proficiency?: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE'
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          employer_id: string
          title: string
          company: string
          location: string
          salary_min: number | null
          salary_max: number | null
          description: string
          requirements: string[]
          posted_date: string
          deadline: string | null
          status: 'ACTIVE' | 'CLOSED' | 'DRAFT'
          job_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'LOCUM'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          title: string
          company: string
          location: string
          salary_min?: number | null
          salary_max?: number | null
          description: string
          requirements: string[]
          posted_date?: string
          deadline?: string | null
          status?: 'ACTIVE' | 'CLOSED' | 'DRAFT'
          job_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'LOCUM'
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          company?: string
          location?: string
          salary_min?: number | null
          salary_max?: number | null
          description?: string
          requirements?: string[]
          posted_date?: string
          deadline?: string | null
          status?: 'ACTIVE' | 'CLOSED' | 'DRAFT'
          job_type?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'LOCUM'
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration_hours: number
          difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          category: string
          thumbnail: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration_hours: number
          difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          category: string
          thumbnail?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          instructor_id?: string
          price?: number
          duration_hours?: number
          difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
          category?: string
          thumbnail?: string | null
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrollment_date: string
          completion_date: string | null
          progress_percentage: number
          status: 'ENROLLED' | 'COMPLETED' | 'DROPPED'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrollment_date?: string
          completion_date?: string | null
          progress_percentage?: number
          status?: 'ENROLLED' | 'COMPLETED' | 'DROPPED'
          created_at?: string
          updated_at?: string
        }
        Update: {
          completion_date?: string | null
          progress_percentage?: number
          status?: 'ENROLLED' | 'COMPLETED' | 'DROPPED'
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
          read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
          read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          read?: boolean
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          description: string
          metadata: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          description: string
          metadata?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          activity_type?: string
          description?: string
          metadata?: Record<string, any> | null
        }
      }
      feedback: {
        Row: {
          id: string
          from_user_id: string
          to_user_id: string | null
          rating: number
          comment: string | null
          feedback_type: 'GENERAL' | 'COURSE' | 'JOB' | 'EMPLOYER'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_id?: string | null
          rating: number
          comment?: string | null
          feedback_type: 'GENERAL' | 'COURSE' | 'JOB' | 'EMPLOYER'
          created_at?: string
          updated_at?: string
        }
        Update: {
          rating?: number
          comment?: string | null
          feedback_type?: 'GENERAL' | 'COURSE' | 'JOB' | 'EMPLOYER'
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string
          excerpt: string
          featured_image: string | null
          published: boolean
          published_at: string | null
          category: string
          tags: string[]
          read_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content: string
          excerpt: string
          featured_image?: string | null
          published?: boolean
          published_at?: string | null
          category: string
          tags?: string[]
          read_time?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          published?: boolean
          published_at?: string | null
          category?: string
          tags?: string[]
          read_time?: number
          updated_at?: string
        }
      }
      discussions: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string
          category: string
          status: 'OPEN' | 'CLOSED'
          pinned: boolean
          replies_count: number
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content: string
          category: string
          status?: 'OPEN' | 'CLOSED'
          pinned?: boolean
          replies_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          category?: string
          status?: 'OPEN' | 'CLOSED'
          pinned?: boolean
          replies_count?: number
          views_count?: number
          updated_at?: string
        }
      }
      mlm_referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_id: string
          status: 'PENDING' | 'ACTIVE' | 'INACTIVE'
          commission_rate: number
          total_earnings: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_id: string
          status?: 'PENDING' | 'ACTIVE' | 'INACTIVE'
          commission_rate: number
          total_earnings?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'PENDING' | 'ACTIVE' | 'INACTIVE'
          commission_rate?: number
          total_earnings?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'professional' | 'student' | 'employer' | 'tutor' | 'client'
      skill_level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
      certificate_status: 'CURRENT' | 'EXPIRED' | 'PENDING'
      language_proficiency: 'BASIC' | 'INTERMEDIATE' | 'FLUENT' | 'NATIVE'
      job_status: 'ACTIVE' | 'CLOSED' | 'DRAFT'
      job_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'LOCUM'
      course_difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
      enrollment_status: 'ENROLLED' | 'COMPLETED' | 'DROPPED'
      notification_type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
      feedback_type: 'GENERAL' | 'COURSE' | 'JOB' | 'EMPLOYER'
      discussion_status: 'OPEN' | 'CLOSED'
      referral_status: 'PENDING' | 'ACTIVE' | 'INACTIVE'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']