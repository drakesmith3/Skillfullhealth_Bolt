import * as React from "react";
import PreHeader from '../PreHeader';
import Footer from '../Footer';
import ResponsiveSidebar from '../ResponsiveSidebar';

interface StandardDashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode; // Made sidebar optional
  className?: string;
  showFooter?: boolean;
}

const StandardDashboardLayout: React.FC<StandardDashboardLayoutProps> = ({
  children,
  sidebar,
  className = "",
  showFooter = false
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="dashboard" />
      
      <div className={`flex min-h-screen pt-16 ${className}`}>
        {/* Responsive Sidebar - Conditionally rendered */}
        {sidebar && (
          <ResponsiveSidebar>
            {sidebar}
          </ResponsiveSidebar>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className={`flex-1 p-4 sm:p-6 ${sidebar ? 'lg:ml-0' : ''}`}>
            {children}
          </main>
          {showFooter && <Footer isActive={false} />}
        </div>
      </div>
    </div>
  );
};

export default StandardDashboardLayout;
