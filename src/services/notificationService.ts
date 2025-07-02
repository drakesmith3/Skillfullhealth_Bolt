import { supabase } from '../config/supabase'
import type { Database, Tables, InsertTables, UpdateTables } from '../types/database'

type Notification = Tables<'notifications'>
type NotificationInsert = InsertTables<'notifications'>
type NotificationUpdate = UpdateTables<'notifications'>

class NotificationService {
  // Get user notifications
  async getUserNotifications(userId?: string, limit = 50): Promise<Notification[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  }

  // Get unread notifications count
  async getUnreadCount(userId?: string): Promise<number> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', targetUserId)
        .eq('read', false)

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error fetching unread count:', error)
      return 0
    }
  }

  // Create notification
  async createNotification(notificationData: Omit<NotificationInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Notification | null> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          ...notificationData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating notification:', error)
      return null
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', notificationId)
        .eq('user_id', user.id) // Ensure user owns the notification

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error marking notification as read:', error)
      return false
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId?: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', targetUserId)
        .eq('read', false)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      return false
    }
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', user.id) // Ensure user owns the notification

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting notification:', error)
      return false
    }
  }

  // Delete all read notifications
  async deleteAllRead(userId?: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const targetUserId = userId || user?.id
      if (!targetUserId) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', targetUserId)
        .eq('read', true)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting read notifications:', error)
      return false
    }
  }

  // Send notification to user
  async sendNotification(
    userId: string,
    title: string,
    message: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' = 'INFO'
  ): Promise<boolean> {
    return !!(await this.createNotification({
      user_id: userId,
      title,
      message,
      type,
      read: false
    }))
  }

  // Send bulk notifications
  async sendBulkNotifications(
    userIds: string[],
    title: string,
    message: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' = 'INFO'
  ): Promise<boolean> {
    try {
      const notifications = userIds.map(userId => ({
        user_id: userId,
        title,
        message,
        type,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      const { error } = await supabase
        .from('notifications')
        .insert(notifications)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error sending bulk notifications:', error)
      return false
    }
  }

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as Notification)
        }
      )
      .subscribe()
  }

  // Send course enrollment notification
  async sendCourseEnrollmentNotification(userId: string, courseName: string): Promise<boolean> {
    return this.sendNotification(
      userId,
      'Course Enrollment Successful',
      `You have successfully enrolled in "${courseName}". Start learning now!`,
      'SUCCESS'
    )
  }

  // Send job application notification
  async sendJobApplicationNotification(employerId: string, applicantName: string, jobTitle: string): Promise<boolean> {
    return this.sendNotification(
      employerId,
      'New Job Application',
      `${applicantName} has applied for the position: ${jobTitle}`,
      'INFO'
    )
  }

  // Send profile completion reminder
  async sendProfileCompletionReminder(userId: string, completionPercentage: number): Promise<boolean> {
    return this.sendNotification(
      userId,
      'Complete Your Profile',
      `Your profile is ${completionPercentage}% complete. Complete it to get better job matches!`,
      'INFO'
    )
  }

  // Send MLM referral notification
  async sendReferralNotification(userId: string, referrerName: string): Promise<boolean> {
    return this.sendNotification(
      userId,
      'New Referral Bonus',
      `You earned a referral bonus from ${referrerName}!`,
      'SUCCESS'
    )
  }

  // Send certificate expiry reminder
  async sendCertificateExpiryReminder(userId: string, certificateName: string, daysUntilExpiry: number): Promise<boolean> {
    const message = daysUntilExpiry <= 0 
      ? `Your certificate "${certificateName}" has expired. Please renew it.`
      : `Your certificate "${certificateName}" will expire in ${daysUntilExpiry} days.`
    
    return this.sendNotification(
      userId,
      'Certificate Expiry Reminder',
      message,
      daysUntilExpiry <= 0 ? 'ERROR' : 'WARNING'
    )
  }
}

export const notificationService = new NotificationService()