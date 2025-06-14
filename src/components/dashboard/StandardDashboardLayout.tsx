import React, { useRef, useEffect } from 'react';
import { createDustParticles } from '../../utils/dustParticles';
import PreHeader from '../PreHeader';
import Footer from '../Footer';

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
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only create dust particles if sidebar and sidebarRef.current exist
    if (sidebar && sidebarRef.current) {
      const { cleanup } = createDustParticles(sidebarRef.current, 15, "#FFD700");
      return cleanup;
    }
  }, [sidebar]); // Added sidebar to dependency array

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="dashboard" />
      
      <div className={`flex min-h-screen pt-16 ${className}`}>
        {/* Sidebar with dust particles - Conditionally rendered */}
        {sidebar && (
          <div 
            ref={sidebarRef}
            className="w-64 bg-black text-white relative overflow-hidden flex-shrink-0"
          >
            {sidebar}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            {children}
          </main>
          {showFooter && <Footer isActive={false} />}
        </div>
      </div>
    </div>
  );
};

export default StandardDashboardLayout;
