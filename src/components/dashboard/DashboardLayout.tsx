
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import ProfessionalSidebarContent from './ProfessionalSidebarContent';
import EmployerSidebar from './EmployerSidebar';
import TutorSidebar from './TutorSidebar';
import StudentSidebarContent from './StudentSidebarContent';
import ClientSidebar from './ClientSidebar';
import StandardDashboardLayout from './StandardDashboardLayout';

export type UserType = 'professional' | 'student' | 'employer' | 'tutor' | 'client' | 'admin';

interface DashboardLayoutProps {
  userType: UserType;
  userName: string;
  pageTitle: string;
  pageDescription?: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userType,
  userName,
  pageTitle,
  pageDescription,
  children
}) => {
  const renderSidebar = () => {
    switch (userType) {
      case 'professional':
        return <ProfessionalSidebarContent />;
      case 'employer':
        return <EmployerSidebar />;
      case 'tutor':
        return <TutorSidebar />;
      case 'student':
        return <StudentSidebarContent />;
      case 'client':
        return <ClientSidebar />;
      default:
        return null;
    }
  };

  return (
    <StandardDashboardLayout
      sidebar={renderSidebar()}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">{pageDescription}</p>
              )}
            </div>
          </div>
        </div>

        {children}
      </div>
    </StandardDashboardLayout>
  );
};

export default DashboardLayout;
