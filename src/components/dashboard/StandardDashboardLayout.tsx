
import React, { useRef, useEffect } from 'react';
import { createDustParticles } from '@/utils/dustParticles';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';

interface StandardDashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
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
    if (sidebarRef.current) {
      const { cleanup } = createDustParticles(sidebarRef.current, 15, "#FFD700");
      return cleanup;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="dashboard" />
      
      <div className={`flex min-h-screen pt-16 ${className}`}>
        {/* Sidebar with dust particles */}
        <div 
          ref={sidebarRef}
          className="w-64 bg-black text-white relative overflow-hidden flex-shrink-0"
        >
          {sidebar}
        </div>

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
