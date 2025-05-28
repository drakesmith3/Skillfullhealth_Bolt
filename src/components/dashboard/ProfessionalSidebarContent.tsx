
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Award, 
  MessageSquare, 
  BookOpen, 
  Trophy, 
  Users, 
  Bell, 
  LogOut 
} from 'lucide-react';

const ProfessionalSidebarContent: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    // For professional dashboard routes, check both paths
    if (path === '/professional-dashboard') {
      return location.pathname === '/professional-dashboard' || location.pathname === '/dashboard/professional';
    }
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
        <h3 className="text-red-500 font-semibold mb-4">Quick Links</h3>        <nav className="space-y-2">
          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'profile' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <User size={20} />
            <span>MY PROFILE</span>
          </Link>
          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'jobs' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <Briefcase size={20} />
            <span>MY JOB APPLICATIONS</span>
          </Link>
          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'transactions' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <Award size={20} />
            <span>MY TRANSACTIONS</span>
          </Link>
          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'inbox' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <MessageSquare size={20} />
            <span>INBOX/MESSAGES</span>
          </Link>
        </nav>
      </div>

      {/* CME Courses Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">CME Courses</h3>
        <nav className="space-y-2">
          <Link 
            to="/courses"
            className={getLinkClass('/courses')}
          >
            <BookOpen size={20} />
            <span>ENROLL IN NEW COURSE</span>
          </Link>          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'courses' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <BookOpen size={20} />
            <span>YOUR COURSES</span>
          </Link>
          <Link 
            to="/professional-dashboard"
            state={{ activeTab: 'profile' }}
            className={getLinkClass('/professional-dashboard')}
          >
            <Award size={20} />
            <span>MY CERTIFICATIONS</span>
          </Link><Link 
            to="/games-quizzes"
            className={getLinkClass('/games-quizzes')}
          >
            <Trophy size={20} />
            <span>PLAY GAMES/QUIZZES</span>
          </Link>
        </nav>
      </div>      {/* GLOHSEN Score Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">GLOHSEN Score</h3>
        <nav className="space-y-2">
          <Link 
            to="/score"
            className={getLinkClass('/score')}
          >
            <Trophy size={20} />
            <span>VIEW MY SCORE</span>
          </Link>
        </nav>
      </div>

      {/* Community & Jobs Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Community & Jobs</h3>
        <nav className="space-y-2">
          <Link 
            to="/community-forum"
            className={getLinkClass('/community-forum')}
          >
            <Users size={20} />
            <span>COMMUNITY FORUM</span>
          </Link>
          <Link 
            to="/job-board"
            className={getLinkClass('/job-board')}
          >
            <Briefcase size={20} />
            <span>JOB BOARD</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/professional"
            className={getLinkClass('/account-settings/professional')}
          >
            <User size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/professional"
            className={getLinkClass('/notifications/professional')}
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

export default ProfessionalSidebarContent;
