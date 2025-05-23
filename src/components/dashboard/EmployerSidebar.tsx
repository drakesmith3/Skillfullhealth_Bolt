
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  MessageSquare, 
  BarChart, 
  Star, 
  Settings, 
  Bell, 
  LogOut,
  UserPlus,
  FileText,
  CreditCard
} from 'lucide-react';

const EmployerSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    return `flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
      isActive(path) 
        ? 'bg-gray-800 text-red-500' 
        : 'text-[#D4AF37] hover:text-red-500 hover:bg-gray-800'
    }`;
  };

  return (
    <>
      {/* Quick Links Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Facility Management</h3>
        <nav className="space-y-2">
          <Link 
            to="/employer-dashboard"
            className={getLinkClass('/employer-dashboard')}
          >
            <BarChart size={20} />
            <span>DASHBOARD</span>
          </Link>
          <Link 
            to="/job-postings"
            className={getLinkClass('/job-postings')}
          >
            <Briefcase size={20} />
            <span>JOB POSTINGS</span>
          </Link>
          <Link 
            to="/staff-management"
            className={getLinkClass('/staff-management')}
          >
            <Users size={20} />
            <span>STAFF MANAGEMENT</span>
          </Link>
          <Link 
            to="/facility-profile"
            className={getLinkClass('/facility-profile')}
          >
            <Building size={20} />
            <span>FACILITY PROFILE</span>
          </Link>
        </nav>
      </div>

      {/* Recruitment Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Recruitment</h3>
        <nav className="space-y-2">
          <Link 
            to="/post-job"
            className={getLinkClass('/post-job')}
          >
            <UserPlus size={20} />
            <span>POST NEW JOB</span>
          </Link>
          <Link 
            to="/applications"
            className={getLinkClass('/applications')}
          >
            <FileText size={20} />
            <span>VIEW APPLICATIONS</span>
          </Link>
          <Link 
            to="/candidate-search"
            className={getLinkClass('/candidate-search')}
          >
            <Users size={20} />
            <span>SEARCH CANDIDATES</span>
          </Link>
        </nav>
      </div>

      {/* Analytics Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Analytics</h3>
        <nav className="space-y-2">
          <Link 
            to="/hiring-analytics"
            className={getLinkClass('/hiring-analytics')}
          >
            <BarChart size={20} />
            <span>HIRING METRICS</span>
          </Link>
          <Link 
            to="/staff-feedback"
            className={getLinkClass('/staff-feedback')}
          >
            <Star size={20} />
            <span>STAFF FEEDBACK</span>
          </Link>
          <Link 
            to="/payments-billing"
            className={getLinkClass('/payments-billing')}
          >
            <CreditCard size={20} />
            <span>BILLING & PAYMENTS</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/employer"
            className={getLinkClass('/account-settings/employer')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/employer"
            className={getLinkClass('/notifications/employer')}
          >
            <Bell size={20} />
            <span>NOTIFICATIONS</span>
          </Link>
          <Link 
            to="/messages"
            className={getLinkClass('/messages')}
          >
            <MessageSquare size={20} />
            <span>MESSAGES</span>
          </Link>
          <Link 
            to="/signed-out"
            className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
          >
            <LogOut size={20} />
            <span>LOG OUT</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default EmployerSidebar;
