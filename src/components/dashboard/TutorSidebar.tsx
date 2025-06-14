import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  BarChart, 
  PlusCircle, 
  MessageSquare, 
  Star, 
  Settings, 
  Bell, 
  LogOut,
  GraduationCap,
  FileText,
  CreditCard,
  Calendar
} from 'lucide-react';

const TutorSidebar: React.FC = () => {
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
        <h3 className="text-red-500 font-semibold mb-4">Teaching Dashboard</h3>
        <nav className="space-y-2">
          <Link 
            to="/tutor-dashboard"
            className={getLinkClass('/tutor-dashboard')}
          >
            <BarChart size={20} />
            <span>DASHBOARD</span>
          </Link>
          <Link 
            to="/my-courses"
            className={getLinkClass('/my-courses')}
          >
            <BookOpen size={20} />
            <span>MY COURSES</span>
          </Link>
          <Link 
            to="/my-students"
            className={getLinkClass('/my-students')}
          >
            <Users size={20} />
            <span>MY STUDENTS</span>
          </Link>
          <Link 
            to="/teaching-schedule"
            className={getLinkClass('/teaching-schedule')}
          >
            <Calendar size={20} />
            <span>SCHEDULE</span>
          </Link>
        </nav>
      </div>

      {/* Course Management Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Course Management</h3>
        <nav className="space-y-2">
          <Link 
            to="/create-course"
            className={getLinkClass('/create-course')}
          >
            <PlusCircle size={20} />
            <span>CREATE COURSE</span>
          </Link>
          <Link 
            to="/course-content"
            className={getLinkClass('/course-content')}
          >
            <FileText size={20} />
            <span>MANAGE CONTENT</span>
          </Link>
          <Link 
            to="/course-analytics"
            className={getLinkClass('/course-analytics')}
          >
            <BarChart size={20} />
            <span>COURSE ANALYTICS</span>
          </Link>
          <Link 
            to="/student-progress"
            className={getLinkClass('/student-progress')}
          >
            <GraduationCap size={20} />
            <span>STUDENT PROGRESS</span>
          </Link>
        </nav>
      </div>

      {/* Earnings Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Earnings</h3>
        <nav className="space-y-2">
          <Link 
            to="/tutor-purse"
            className={getLinkClass('/tutor-purse')}
          >
            <CreditCard size={20} />
            <span>PURSE</span>
          </Link>
          <Link 
            to="/earnings-analytics"
            className={getLinkClass('/earnings-analytics')}
          >
            <BarChart size={20} />
            <span>EARNINGS REPORT</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/tutor"
            className={getLinkClass('/account-settings/tutor')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/tutor"
            className={getLinkClass('/notifications/tutor')}
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
            to="/tutor-feedback"
            className={getLinkClass('/tutor-feedback')}
          >
            <Star size={20} />
            <span>FEEDBACK</span>
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

export default TutorSidebar;
