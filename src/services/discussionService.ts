import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Discussion = Tables<'discussions'>
type DiscussionInsert = InsertTables<'discussions'>
type DiscussionUpdate = UpdateTables<'discussions'>

export interface DiscussionWithAuthor extends Discussion {
  author: {
    full_name: string
    profile_picture: string | null
    user_type: string
  }
}

class DiscussionService {
  // Get discussions
  async getDiscussions(filters?: {
    category?: string
    status?: 'OPEN' | 'CLOSED'
    search?: string
    pinned?: boolean
    limit?: number
  }): Promise<DiscussionWithAuthor[]> {
    try {
      let queryBuilder = supabase
        .from('discussions')
        .select(`
          *,
          author:profiles!discussions_author_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category)
      }

      if (filters?.status) {
        queryBuilder = queryBuilder.eq('status', filters.status)
      }

      if (filters?.pinned !== undefined) {
        queryBuilder = queryBuilder.eq('pinned', filters.pinned)
      }

      if (filters?.search) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${filters.search}%,
          content.ilike.%${filters.search}%
        `)
      }

      const { data, error } = await queryBuilder
        .order('pinned', { ascending: false })
        .order('updated_at', { ascending: false })
        .limit(filters?.limit || 20)

      if (error) throw error

      return data.map(discussion => ({
        ...discussion,
        author: {
          full_name: discussion.author?.full_name || 'Anonymous',
          profile_picture: discussion.author?.profile_picture || null,
          user_type: discussion.author?.user_type || 'professional'
        }
      }))
    } catch (error) {
      console.error('Error fetching discussions:', error)
      return []
    }
  }

  // Get discussion by ID
  async getDiscussionById(discussionId: string): Promise<DiscussionWithAuthor | null> {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          author:profiles!discussions_author_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .eq('id', discussionId)
        .single()

      if (error) throw error

      // Increment view count
      await this.incrementViews(discussionId)

      return {
        ...data,
        author: {
          full_name: data.author?.full_name || 'Anonymous',
          profile_picture: data.author?.profile_picture || null,
          user_type: data.author?.user_type || 'professional'
        }
      }
    } catch (error) {
      console.error('Error fetching discussion:', error)
      return null
    }
  }

  // Create discussion
  async createDiscussion(discussionData: Omit<DiscussionInsert, 'author_id'>): Promise<Discussion | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('discussions')
        .insert({
          ...discussionData,
          author_id: user.id,
          status: 'OPEN',
          pinned: false,
          replies_count: 0,
          views_count: 0
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating discussion:', error)
      return null
    }
  }

  // Update discussion
  async updateDiscussion(discussionId: string, updates: DiscussionUpdate): Promise<Discussion | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('discussions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', discussionId)
        .eq('author_id', user.id) // Ensure user owns the discussion
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating discussion:', error)
      return null
    }
  }

  // Delete discussion
  async deleteDiscussion(discussionId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('discussions')
        .delete()
        .eq('id', discussionId)
        .eq('author_id', user.id) // Ensure user owns the discussion

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting discussion:', error)
      return false
    }
  }

  // Close/Open discussion
  async toggleDiscussionStatus(discussionId: string, status: 'OPEN' | 'CLOSED'): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('discussions')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', discussionId)
        .eq('author_id', user.id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error toggling discussion status:', error)
      return false
    }
  }

  // Pin/Unpin discussion (admin only)
  async togglePin(discussionId: string, pinned: boolean): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // In a real app, you'd check if user is admin/moderator
      const { error } = await supabase
        .from('discussions')
        .update({ 
          pinned,
          updated_at: new Date().toISOString()
        })
        .eq('id', discussionId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error toggling pin status:', error)
      return false
    }
  }

  // Increment reply count
  async incrementReplies(discussionId: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_discussion_replies', {
        discussion_id: discussionId
      })

      if (error) {
        // Fallback to manual increment if RPC doesn't exist
        const { data: discussion } = await supabase
          .from('discussions')
          .select('replies_count')
          .eq('id', discussionId)
          .single()

        if (discussion) {
          await supabase
            .from('discussions')
            .update({
              replies_count: (discussion.replies_count || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', discussionId)
        }
      }

      return true
    } catch (error) {
      console.error('Error incrementing replies:', error)
      return false
    }
  }

  // Increment view count
  private async incrementViews(discussionId: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_discussion_views', {
        discussion_id: discussionId
      })

      if (error) {
        // Fallback to manual increment if RPC doesn't exist
        const { data: discussion } = await supabase
          .from('discussions')
          .select('views_count')
          .eq('id', discussionId)
          .single()

        if (discussion) {
          await supabase
            .from('discussions')
            .update({
              views_count: (discussion.views_count || 0) + 1
            })
            .eq('id', discussionId)
        }
      }

      return true
    } catch (error) {
      console.error('Error incrementing views:', error)
      return false
    }
  }

  // Get discussions by user
  async getDiscussionsByUser(userId?: string): Promise<Discussion[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .eq('author_id', targetUserId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user discussions:', error)
      return []
    }
  }

  // Get popular discussions
  async getPopularDiscussions(limit = 10): Promise<DiscussionWithAuthor[]> {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          author:profiles!discussions_author_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .eq('status', 'OPEN')
        .order('views_count', { ascending: false })
        .order('replies_count', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(discussion => ({
        ...discussion,
        author: {
          full_name: discussion.author?.full_name || 'Anonymous',
          profile_picture: discussion.author?.profile_picture || null,
          user_type: discussion.author?.user_type || 'professional'
        }
      }))
    } catch (error) {
      console.error('Error fetching popular discussions:', error)
      return []
    }
  }

  // Get recent discussions
  async getRecentDiscussions(limit = 10): Promise<DiscussionWithAuthor[]> {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          author:profiles!discussions_author_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)
        .eq('status', 'OPEN')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(discussion => ({
        ...discussion,
        author: {
          full_name: discussion.author?.full_name || 'Anonymous',
          profile_picture: discussion.author?.profile_picture || null,
          user_type: discussion.author?.user_type || 'professional'
        }
      }))
    } catch (error) {
      console.error('Error fetching recent discussions:', error)
      return []
    }
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select('category')
        .not('category', 'is', null)

      if (error) throw error

             const categories = [...new Set(data.map(discussion => discussion.category).filter(Boolean) as string[])]
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Search discussions
  async searchDiscussions(query: string, category?: string): Promise<DiscussionWithAuthor[]> {
    try {
      let queryBuilder = supabase
        .from('discussions')
        .select(`
          *,
          author:profiles!discussions_author_id_fkey (
            full_name,
            profile_picture,
            user_type
          )
        `)

      if (query) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${query}%,
          content.ilike.%${query}%
        `)
      }

      if (category) {
        queryBuilder = queryBuilder.eq('category', category)
      }

      const { data, error } = await queryBuilder
        .order('pinned', { ascending: false })
        .order('updated_at', { ascending: false })
        .limit(50)

      if (error) throw error

      return data.map(discussion => ({
        ...discussion,
        author: {
          full_name: discussion.author?.full_name || 'Anonymous',
          profile_picture: discussion.author?.profile_picture || null,
          user_type: discussion.author?.user_type || 'professional'
        }
      }))
    } catch (error) {
      console.error('Error searching discussions:', error)
      return []
    }
  }

  // Get forum statistics
  async getForumStats(): Promise<{
    totalDiscussions: number
    openDiscussions: number
    totalReplies: number
    totalViews: number
    activeUsers: number
  }> {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select('status, replies_count, views_count, author_id')

      if (error) throw error

      const stats = {
        totalDiscussions: data.length,
        openDiscussions: data.filter(d => d.status === 'OPEN').length,
        totalReplies: data.reduce((sum, d) => sum + (d.replies_count || 0), 0),
        totalViews: data.reduce((sum, d) => sum + (d.views_count || 0), 0),
        activeUsers: new Set(data.map(d => d.author_id)).size
      }

      return stats
    } catch (error) {
      console.error('Error fetching forum stats:', error)
      return {
        totalDiscussions: 0,
        openDiscussions: 0,
        totalReplies: 0,
        totalViews: 0,
        activeUsers: 0
      }
    }
  }
}

export const discussionService = new DiscussionService()