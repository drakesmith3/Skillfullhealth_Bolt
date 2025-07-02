import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type BlogPost = Tables<'blog_posts'>
type BlogPostInsert = InsertTables<'blog_posts'>
type BlogPostUpdate = UpdateTables<'blog_posts'>

export interface BlogPostWithAuthor extends BlogPost {
  author: {
    full_name: string
    profile_picture: string | null
    specialty: string | null
  }
}

class BlogService {
  // Get published blog posts
  async getPublishedPosts(filters?: {
    category?: string
    tag?: string
    search?: string
    limit?: number
  }): Promise<BlogPostWithAuthor[]> {
    try {
      let queryBuilder = supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!blog_posts_author_id_fkey (
            full_name,
            profile_picture,
            specialty
          )
        `)
        .eq('published', true)

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category)
      }

      if (filters?.tag) {
        queryBuilder = queryBuilder.contains('tags', [filters.tag])
      }

      if (filters?.search) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${filters.search}%,
          excerpt.ilike.%${filters.search}%,
          content.ilike.%${filters.search}%
        `)
      }

      const { data, error } = await queryBuilder
        .order('published_at', { ascending: false })
        .limit(filters?.limit || 20)

      if (error) throw error

      return data.map(post => ({
        ...post,
        author: {
          full_name: post.author?.full_name || 'Anonymous',
          profile_picture: post.author?.profile_picture || null,
          specialty: post.author?.specialty || null
        }
      }))
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return []
    }
  }

  // Get blog post by ID
  async getPostById(postId: string): Promise<BlogPostWithAuthor | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!blog_posts_author_id_fkey (
            full_name,
            profile_picture,
            specialty
          )
        `)
        .eq('id', postId)
        .single()

      if (error) throw error

      return {
        ...data,
        author: {
          full_name: data.author?.full_name || 'Anonymous',
          profile_picture: data.author?.profile_picture || null,
          specialty: data.author?.specialty || null
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      return null
    }
  }

  // Get posts by author
  async getPostsByAuthor(authorId: string, includeUnpublished = false): Promise<BlogPost[]> {
    try {
      let queryBuilder = supabase
        .from('blog_posts')
        .select('*')
        .eq('author_id', authorId)

      if (!includeUnpublished) {
        queryBuilder = queryBuilder.eq('published', true)
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching author posts:', error)
      return []
    }
  }

  // Create blog post
  async createPost(postData: Omit<BlogPostInsert, 'author_id'>): Promise<BlogPost | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Calculate read time (rough estimate: 200 words per minute)
      const wordCount = postData.content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...postData,
          author_id: user.id,
          read_time: readTime,
          published_at: postData.published ? new Date().toISOString() : null
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating blog post:', error)
      return null
    }
  }

  // Update blog post
  async updatePost(postId: string, updates: BlogPostUpdate): Promise<BlogPost | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Recalculate read time if content is being updated
      if (updates.content) {
        const wordCount = updates.content.split(/\s+/).length
        updates.read_time = Math.ceil(wordCount / 200)
      }

      // Set published_at if publishing for the first time
      if (updates.published && !updates.published_at) {
        updates.published_at = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .eq('author_id', user.id) // Ensure user owns the post
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating blog post:', error)
      return null
    }
  }

  // Delete blog post
  async deletePost(postId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)
        .eq('author_id', user.id) // Ensure user owns the post

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting blog post:', error)
      return false
    }
  }

  // Publish/unpublish post
  async togglePublishStatus(postId: string, published: boolean): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const updates: any = {
        published,
        updated_at: new Date().toISOString()
      }

      if (published) {
        updates.published_at = new Date().toISOString()
      } else {
        updates.published_at = null
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', postId)
        .eq('author_id', user.id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error toggling publish status:', error)
      return false
    }
  }

  // Get featured posts
  async getFeaturedPosts(limit = 5): Promise<BlogPostWithAuthor[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!blog_posts_author_id_fkey (
            full_name,
            profile_picture,
            specialty
          )
        `)
        .eq('published', true)
        .not('featured_image', 'is', null)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(post => ({
        ...post,
        author: {
          full_name: post.author?.full_name || 'Anonymous',
          profile_picture: post.author?.profile_picture || null,
          specialty: post.author?.specialty || null
        }
      }))
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('published', true)
        .not('category', 'is', null)

      if (error) throw error

      const categories = [...new Set(data.map(post => post.category).filter(Boolean))]
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Get all tags
  async getTags(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('published', true)
        .not('tags', 'is', null)

      if (error) throw error

      const allTags = data.flatMap(post => (post.tags as string[]) || [])
      const uniqueTags = [...new Set(allTags)]
      return uniqueTags
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  }

  // Search posts
  async searchPosts(query: string, filters?: {
    category?: string
    tags?: string[]
  }): Promise<BlogPostWithAuthor[]> {
    try {
      let queryBuilder = supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!blog_posts_author_id_fkey (
            full_name,
            profile_picture,
            specialty
          )
        `)
        .eq('published', true)

      if (query) {
        queryBuilder = queryBuilder.or(`
          title.ilike.%${query}%,
          excerpt.ilike.%${query}%,
          content.ilike.%${query}%
        `)
      }

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category)
      }

             if (filters?.tags && filters.tags.length > 0) {
         queryBuilder = queryBuilder.overlaps('tags', filters.tags as any)
       }

      const { data, error } = await queryBuilder
        .order('published_at', { ascending: false })
        .limit(50)

      if (error) throw error

      return data.map(post => ({
        ...post,
        author: {
          full_name: post.author?.full_name || 'Anonymous',
          profile_picture: post.author?.profile_picture || null,
          specialty: post.author?.specialty || null
        }
      }))
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  }

  // Get author statistics
  async getAuthorStats(authorId: string): Promise<{
    totalPosts: number
    publishedPosts: number
    totalViews: number
    averageReadTime: number
  }> {
    try {
      const posts = await this.getPostsByAuthor(authorId, true)
      const publishedPosts = posts.filter(post => post.published)
      
      const totalReadTime = posts.reduce((sum, post) => sum + post.read_time, 0)
      const averageReadTime = posts.length > 0 ? Math.round(totalReadTime / posts.length) : 0

      // Note: Views would need to be tracked separately in a real implementation
      return {
        totalPosts: posts.length,
        publishedPosts: publishedPosts.length,
        totalViews: 0, // Would be tracked with analytics
        averageReadTime
      }
    } catch (error) {
      console.error('Error fetching author stats:', error)
      return {
        totalPosts: 0,
        publishedPosts: 0,
        totalViews: 0,
        averageReadTime: 0
      }
    }
  }

  // Get related posts
  async getRelatedPosts(postId: string, limit = 5): Promise<BlogPostWithAuthor[]> {
    try {
      // First get the current post to find related posts by category and tags
      const currentPost = await this.getPostById(postId)
      if (!currentPost) return []

      let queryBuilder = supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!blog_posts_author_id_fkey (
            full_name,
            profile_picture,
            specialty
          )
        `)
        .eq('published', true)
        .neq('id', postId) // Exclude current post

      // Try to find posts in the same category first
      if (currentPost.category) {
        queryBuilder = queryBuilder.eq('category', currentPost.category)
      }

      const { data, error } = await queryBuilder
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map(post => ({
        ...post,
        author: {
          full_name: post.author?.full_name || 'Anonymous',
          profile_picture: post.author?.profile_picture || null,
          specialty: post.author?.specialty || null
        }
      }))
    } catch (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
  }
}

export const blogService = new BlogService()