
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import AIAgentDashboard from '@/components/admin/AIAgentDashboard';
import ThemeToggle from '@/components/ThemeToggle';

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#ea384c]">Admin Dashboard</h1>
          <ThemeToggle />
        </div>
        <AIAgentDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
