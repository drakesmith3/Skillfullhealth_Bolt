
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import ProfessionalSidebar from './ProfessionalSidebar';
import EmployerSidebar from './EmployerSidebar';
import TutorSidebar from './TutorSidebar';
import StudentSidebar from './StudentSidebar';
import ClientSidebar from './ClientSidebar';

interface DashboardLayoutProps {
  userType: 'professional' | 'student' | 'employer' | 'tutor' | 'client';
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
  const [showFooter, setShowFooter] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderSidebar = () => {
    switch (userType) {
      case 'professional':
        return <ProfessionalSidebar />;
      case 'employer':
        return <EmployerSidebar />;
      case 'tutor':
        return <TutorSidebar />;
      case 'student':
        return <StudentSidebar />;
      case 'client':
        return <ClientSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage={`${userType} dashboard`} userName={userName} />
      
      <div className="flex-grow flex mt-16">
        {/* Dark styled sidebar - only visible on lg screens and above */}
        <div className="hidden lg:block w-64 bg-[#1A1F2C] border-r border-gray-700 shadow-lg">
          {renderSidebar()}
        </div>
        
        {/* Main content */}
        <div className="w-full lg:flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-4 lg:px-8 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div>
              <h1 className="text-3xl font-bold">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-lg text-gray-600 dark:text-gray-400">{pageDescription}</p>
              )}
            </div>
          </div>

          <div className="px-4 py-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default DashboardLayout;
