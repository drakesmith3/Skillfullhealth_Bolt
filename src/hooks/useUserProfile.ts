
import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { feedbackService } from '../services/feedbackService';
import { authService } from '../services/authService';
import type { ProfessionalProfile } from '../types/dashboard.d';

interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  specialty: string;
  experience: number;
  education: string[];
  certifications: string[];
  skills: string[];
  profileCompleteness: number;
  profileViews: number;
  rating: number;
  totalReviews: number;
  location: {
    city: string;
    country: string;
  };
  joinDate: string;
  avatar?: string;
}

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let professionalProfile: ProfessionalProfile | null = null;

        if (userId) {
          // Fetch specific user's profile
          professionalProfile = await profileService.getProfileByUserId(userId);
        } else {
          // Fetch current user's profile
          professionalProfile = await profileService.getCurrentUserProfile();
        }

        if (!professionalProfile) {
          throw new Error('Profile not found');
        }

        // Get additional data
        const [rating, feedbackStats] = await Promise.all([
          feedbackService.getAverageRating(professionalProfile.userId),
          feedbackService.getFeedbackStats(professionalProfile.userId)
        ]);

        // Transform to UserProfile format for backward compatibility
        const userProfile: UserProfile = {
          userId: professionalProfile.userId,
          fullName: professionalProfile.fullName,
          email: professionalProfile.contact.email,
          role: professionalProfile.specialty || 'Professional',
          specialty: professionalProfile.specialty || '',
          experience: professionalProfile.experience?.[0]?.startDate ? 
            new Date().getFullYear() - new Date(professionalProfile.experience[0].startDate).getFullYear() : 0,
          education: professionalProfile.education.map(edu => 
            `${edu.degree}, ${edu.institution}, ${new Date(edu.startDate).getFullYear()}`
          ),
          certifications: professionalProfile.certificates.map(cert => cert.name),
          skills: professionalProfile.skills.map(skill => skill.name),
          profileCompleteness: professionalProfile.profileCompleteness || 0,
          profileViews: 0, // Would be tracked separately in analytics
          rating: rating,
          totalReviews: feedbackStats.totalFeedback,
          location: {
            city: professionalProfile.location?.city || '',
            country: professionalProfile.location?.country || ''
          },
          joinDate: professionalProfile.userId, // Would need to be tracked separately
          avatar: professionalProfile.profilePicture || undefined
        };
        
        setProfile(userProfile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId]);

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Map UserProfile updates to profile service format
      const profileUpdates: any = {};
      
      if (updatedData.fullName) profileUpdates.full_name = updatedData.fullName;
      if (updatedData.specialty) profileUpdates.specialty = updatedData.specialty;
      if (updatedData.avatar) profileUpdates.profile_picture = updatedData.avatar;
      if (updatedData.location?.city) profileUpdates.location_city = updatedData.location.city;
      if (updatedData.location?.country) profileUpdates.location_country = updatedData.location.country;

      const updatedProfile = await profileService.updateProfile(profileUpdates);
      
      if (updatedProfile) {
        // Update local state
        setProfile(prev => prev ? { ...prev, ...updatedData } : null);
        
        // Update profile completeness
        await profileService.updateProfileCompleteness(updatedProfile.id);
        
        return true;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update user profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, isLoading, error, updateProfile };
};
