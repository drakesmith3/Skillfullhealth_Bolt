import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Award, BookOpen, Briefcase, Loader2 } from 'lucide-react';
import { supabase } from '@/config/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type: string;
  created_at: string;
  profile_completeness: number;
}

interface UserStats {
  certifications: number;
  coursesCompleted: number;
  applications: number;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setUser(profile);
          // Fetch related stats
          const [
            { count: certifications },
            { count: coursesCompleted },
            { count: applications }
          ] = await Promise.all([
            supabase.from('certificates').select('*', { count: 'exact', head: true }).eq('profile_id', authUser.id),
            supabase.from('course_enrollments').select('*', { count: 'exact', head: true }).eq('user_id', authUser.id).eq('status', 'completed'),
            supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('applicant_id', authUser.id)
          ]);

          setStats({
            certifications: certifications ?? 0,
            coursesCompleted: coursesCompleted ?? 0,
            applications: applications ?? 0,
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>Could not load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.full_name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Profile Completeness */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Profile Completeness</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.profile_completeness}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${user.profile_completeness}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate("/account-settings")}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/profile-completion")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Certifications</span>
                  <span className="font-semibold">{stats?.certifications}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Courses Completed</span>
                  <span className="font-semibold">{stats?.coursesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Job Applications</span>
                  <span className="font-semibold">{stats?.applications}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/courses")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/job-board")}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                View Jobs
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/score")}
              >
                <Award className="h-4 w-4 mr-2" />
                Check GLOHSEN Score
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Section - This can be implemented later */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Recent activity will be shown here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;