
import { useState, useEffect } from 'react';

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
      // In a real app, we would fetch from an API
      // This is mocked data for demonstration
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock profile data
        const mockProfile: UserProfile = {
          userId: userId || 'user123',
          fullName: 'Dr. Olusiji Williams',
          email: 'dr.olusiji@example.com',
          role: 'Professional',
          specialty: 'Cardiology',
          experience: 8,
          education: [
            'MBBS, University of Lagos, 2014',
            'Fellowship in Cardiology, Johns Hopkins, 2018'
          ],
          certifications: [
            'Advanced Cardiac Life Support (ACLS)',
            'Board Certified in Cardiology'
          ],
          skills: [
            'Echocardiography',
            'Cardiac Catheterization',
            'Clinical Research',
            'Patient Care',
            'Medical Training'
          ],
          profileCompleteness: 95,
          profileViews: 432,
          rating: 4.8,
          totalReviews: 27,
          location: {
            city: 'Lagos',
            country: 'Nigeria'
          },
          joinDate: '2024-01-15',
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
        };
        
        setProfile(mockProfile);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile');
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId]);

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProfile(prev => prev ? { ...prev, ...updatedData } : null);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('Failed to update user profile');
      setIsLoading(false);
      return false;
    }
  };

  return { profile, isLoading, error, updateProfile };
};
