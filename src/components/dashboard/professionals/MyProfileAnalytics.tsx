
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserProfile } from '@/hooks/useUserProfile';

const MyProfileAnalytics: React.FC = () => {
  const { profile, isLoading } = useUserProfile();

  if (isLoading) {
    return <div className="p-4">Loading profile data...</div>;
  }

  if (!profile) {
    return <div className="p-4">No profile data found.</div>;
  }

  // Calculate number of skills by level
  const skillsByLevel = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0
  };

  // Placeholder skill data since we don't have actual skill levels in the mock profile
  const mockSkills = [
    { name: 'Echocardiography', level: 'EXPERT' },
    { name: 'Cardiac Catheterization', level: 'ADVANCED' },
    { name: 'Clinical Research', level: 'INTERMEDIATE' },
    { name: 'Patient Care', level: 'EXPERT' },
    { name: 'Medical Training', level: 'ADVANCED' }
  ];

  mockSkills.forEach(skill => {
    if (skill.level === 'BEGINNER') skillsByLevel.beginner++;
    if (skill.level === 'INTERMEDIATE') skillsByLevel.intermediate++;
    if (skill.level === 'ADVANCED') skillsByLevel.advanced++;
    if (skill.level === 'EXPERT') skillsByLevel.expert++;
  });

  // Profile statistics
  const stats = [
    { name: 'Profile Views', value: profile.profileViews },
    { name: 'Rating', value: `${profile.rating}/5.0` },
    { name: 'Reviews', value: profile.totalReviews },
    { name: 'Years of Experience', value: profile.experience }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Completeness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{profile.profileCompleteness}% complete</span>
              <span className="text-sm text-muted-foreground">
                {profile.profileCompleteness < 100 ? "Complete your profile" : "Profile completed"}
              </span>
            </div>
            <Progress value={profile.profileCompleteness} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">Completed Sections</h4>
              <ul className="space-y-1">
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic Information
                </li>
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Education
                </li>
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Skills
                </li>
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certifications
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">Incomplete Sections</h4>
              <ul className="space-y-1">
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Publications
                </li>
                <li className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  CV/Resume Upload
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 text-center">
                  <h4 className="text-lg font-bold text-primary">{stat.value}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Beginner</span>
                  <span className="text-sm">{skillsByLevel.beginner}</span>
                </div>
                <Progress value={skillsByLevel.beginner * 20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Intermediate</span>
                  <span className="text-sm">{skillsByLevel.intermediate}</span>
                </div>
                <Progress value={skillsByLevel.intermediate * 20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Advanced</span>
                  <span className="text-sm">{skillsByLevel.advanced}</span>
                </div>
                <Progress value={skillsByLevel.advanced * 20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Expert</span>
                  <span className="text-sm">{skillsByLevel.expert}</span>
                </div>
                <Progress value={skillsByLevel.expert * 20} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfileAnalytics;
