
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Mail, User, ChevronDown, Globe, Layout, Briefcase } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PreHeaderProps {
  currentPage: string;
  userName?: string;
}

const PreHeader: React.FC<PreHeaderProps> = ({ currentPage, userName = "Guest" }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [userType, setUserType] = useState<string>("professional");
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);
  const [unreadMessages, setUnreadMessages] = useState<number>(2);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Determine user type from URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/professional')) {
      setUserType("professional");
    } else if (path.includes('/dashboard/employer')) {
      setUserType("employer");
    } else if (path.includes('/dashboard/tutor')) {
      setUserType("tutor");
    } else if (path.includes('/dashboard/student')) {
      setUserType("student");
    } else if (path.includes('/dashboard/client')) {
      setUserType("client");
    }
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundClass = scrolled 
    ? 'bg-black/95 backdrop-blur' 
    : 'bg-gradient-to-r from-[#ea384c] via-[#D4AF37] to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900';

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${backgroundClass} text-white shadow-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left - Globe Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-white animate-spin" />
              <span className="font-bold text-lg">GLOHSEN</span>
            </Link>
          </div>

          {/* Center - Current Page */}
          <div className="hidden md:block">
            <span className="text-sm font-medium capitalize">{currentPage}</span>
          </div>
          
          {/* Right - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Dashboard Quick Link */}
            <Link 
              to={`/dashboard/${userType}`} 
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              title="Dashboard"
            >
              <Layout className="w-5 h-5" />
            </Link>

            {/* Notifications */}
            <Link 
              to={`/dashboard/${userType}/notifications`} 
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Link>
            
            {/* Messages */}
            <Link 
              to={`/dashboard/${userType}/inbox`}
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </Link>
            
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block text-sm font-medium">{userName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-10 border border-gray-200 dark:border-gray-700"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/account-settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Account Settings
                  </Link>
                  <button 
                    onClick={toggleTheme} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <Link 
                    to="/logout" 
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
