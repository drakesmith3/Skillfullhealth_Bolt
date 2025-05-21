
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import DashboardSidebar from './DashboardSidebar';
import Butterfly from '@/components/Butterfly';
import { useTheme } from '@/contexts/ThemeContext';

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
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total sections for butterfly animation
  const totalSections = React.Children.count(children) || 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage={`${userType} dashboard`} userName={userName} />
      
      {/* Butterfly mascot */}
      <Butterfly sectionIndex={activeSectionIndex} totalSections={totalSections} isActive={true} />
      
      <div className="flex-grow flex mt-16">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar userType={userType} />
        </div>
        
        {/* Main content */}
        <div className="w-full lg:flex-1 px-4 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-lg text-gray-600 dark:text-gray-400">{pageDescription}</p>
              )}
            </div>
          </div>

          {children}
        </div>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default DashboardLayout;
