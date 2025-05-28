import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import AIAgentDashboard from '../components/admin/AIAgentDashboard';
import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom'; // Import Link
import { Button } from '../components/ui/button'; // Import Button

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#ea384c]">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link to="/mlm">
              <Button variant="outline">MLM Dashboard</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <AIAgentDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
