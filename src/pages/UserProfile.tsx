import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileDashboard from '@/components/ProfileDashboard';
// Import calculatedExampleScore instead of calculateExampleCandidate
import { calculateExampleScore } from '@/services/scoreCalculator';

const UserProfile: React.FC = () => {
  // Use the correct function name
  const exampleScore = calculateExampleScore();

  return (
    <DashboardLayout
      userType="professional"
      userName="Oredola Adeola"
      pageTitle="My Profile"
      pageDescription="View and manage your profile information"
    >
      <ProfileDashboard />
    </DashboardLayout>
  );
};

export default UserProfile;
