
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Gamepad, 
  BarChart, 
  Users, 
  CreditCard, 
  Settings, 
  Bell, 
  LogOut,
  Trophy,
  Calendar,
  MessageSquare
} from 'lucide-react';

const StudentSidebarContent: React.FC = () => {
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
        <h3 className="text-red-500 font-semibold mb-4">Study Dashboard</h3>
        <nav className="space-y-2">
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'overview' }}
            className={getLinkClass('/student-dashboard')}
          >
            <BarChart size={20} />
            <span>OVERVIEW</span>
          </Link>
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'courses' }}
            className={getLinkClass('/student-dashboard')}
          >
            <BookOpen size={20} />
            <span>MY COURSES</span>
          </Link>
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'performance' }}
            className={getLinkClass('/student-dashboard')}
          >
            <GraduationCap size={20} />
            <span>PERFORMANCE</span>
          </Link>
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'wallet' }}
            className={getLinkClass('/student-dashboard')}
          >
            <CreditCard size={20} />
            <span>WALLET</span>
          </Link>
        </nav>
      </div>

      {/* Learning Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Learning Hub</h3>
        <nav className="space-y-2">
          <Link 
            to="/courses"
            className={getLinkClass('/courses')}
          >
            <BookOpen size={20} />
            <span>BROWSE COURSES</span>
          </Link>
          <Link 
            to="/medical-quizzes-games"
            className={getLinkClass('/medical-quizzes-games')}
          >
            <Gamepad size={20} />
            <span>GAMES & QUIZZES</span>
          </Link>
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'games' }}
            className={getLinkClass('/student-dashboard')}
          >
            <Trophy size={20} />
            <span>MY ACHIEVEMENTS</span>
          </Link>
          <Link 
            to="/study-calendar"
            className={getLinkClass('/study-calendar')}
          >
            <Calendar size={20} />
            <span>STUDY CALENDAR</span>
          </Link>
        </nav>
      </div>

      {/* Community Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Community</h3>
        <nav className="space-y-2">
          <Link 
            to="/community-forum"
            className={getLinkClass('/community-forum')}
          >
            <Users size={20} />
            <span>STUDY GROUPS</span>
          </Link>
          <Link 
            to="/student-dashboard"
            state={{ activeTab: 'community' }}
            className={getLinkClass('/student-dashboard')}
          >
            <MessageSquare size={20} />
            <span>DISCUSSIONS</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/student"
            className={getLinkClass('/account-settings/student')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/student"
            className={getLinkClass('/notifications/student')}
          >
            <Bell size={20} />
            <span>NOTIFICATIONS</span>
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

export default StudentSidebarContent;
