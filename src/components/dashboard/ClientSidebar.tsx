
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  MessageSquare, 
  Star, 
  Heart, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  User,
  CreditCard,
  Activity
} from 'lucide-react';

const ClientSidebar: React.FC = () => {
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
        <h3 className="text-red-500 font-semibold mb-4">Healthcare Hub</h3>
        <nav className="space-y-2">
          <Link 
            to="/client-dashboard"
            className={getLinkClass('/client-dashboard')}
          >
            <Activity size={20} />
            <span>DASHBOARD</span>
          </Link>
          <Link 
            to="/appointments"
            className={getLinkClass('/appointments')}
          >
            <Calendar size={20} />
            <span>MY APPOINTMENTS</span>
          </Link>
          <Link 
            to="/medical-records"
            className={getLinkClass('/medical-records')}
          >
            <FileText size={20} />
            <span>MEDICAL RECORDS</span>
          </Link>
          <Link 
            to="/health-tracker"
            className={getLinkClass('/health-tracker')}
          >
            <Heart size={20} />
            <span>HEALTH TRACKER</span>
          </Link>
        </nav>
      </div>

      {/* Communication Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Communication</h3>
        <nav className="space-y-2">
          <Link 
            to="/messages"
            className={getLinkClass('/messages')}
          >
            <MessageSquare size={20} />
            <span>MESSAGES</span>
          </Link>
          <Link 
            to="/feedback"
            className={getLinkClass('/feedback')}
          >
            <Star size={20} />
            <span>PROVIDE FEEDBACK</span>
          </Link>
        </nav>
      </div>

      {/* Resources Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Resources</h3>
        <nav className="space-y-2">
          <Link 
            to="/wellness-tips"
            className={getLinkClass('/wellness-tips')}
          >
            <Heart size={20} />
            <span>WELLNESS TIPS</span>
          </Link>
          <Link 
            to="/payments"
            className={getLinkClass('/payments')}
          >
            <CreditCard size={20} />
            <span>PAYMENTS</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/client"
            className={getLinkClass('/account-settings/client')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/client"
            className={getLinkClass('/notifications/client')}
          >
            <Bell size={20} />
            <span>NOTIFICATIONS</span>
          </Link>
          <Link 
            to="/profile"
            className={getLinkClass('/profile')}
          >
            <User size={20} />
            <span>MY PROFILE</span>
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

export default ClientSidebar;
