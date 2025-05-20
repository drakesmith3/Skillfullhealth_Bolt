
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  UserCircle, 
  LogOut, 
  Settings, 
  Moon,
  Sun 
} from 'lucide-react';
import { ThemeContext } from '@/contexts/ThemeContext';

interface PreHeaderProps {
  currentPage?: string;
  userName?: string;
  isStudent?: boolean;
  isEmployer?: boolean;
  isProfessional?: boolean;
  isTutor?: boolean;
  isClient?: boolean;
}

const PreHeader: React.FC<PreHeaderProps> = ({ 
  currentPage = 'home', 
  userName = 'Guest', 
  isStudent = false,
  isEmployer = false,
  isProfessional = true,
  isTutor = false,
  isClient = false
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  // Determine which user dashboard to navigate to based on user role
  const getDashboardPath = () => {
    if (isStudent) return '/dashboard/student';
    if (isEmployer) return '/dashboard/employer';
    if (isTutor) return '/dashboard/tutor';
    if (isClient) return '/dashboard/client';
    return '/dashboard/professional'; // Default to professional
  };
  
  const getInboxPath = () => {
    if (isStudent) return '/dashboard/student?tab=inbox';
    if (isEmployer) return '/dashboard/employer?tab=inbox';
    if (isTutor) return '/dashboard/tutor?tab=inbox';
    if (isClient) return '/dashboard/client?tab=inbox';
    return '/dashboard/professional?tab=inbox';
  };
  
  const getNotificationsPath = () => {
    const basePath = getDashboardPath();
    return `${basePath.split('?')[0]}/notifications`;
  };
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Main preheader */}
      <div className="relative bg-white dark:bg-[#1A1F2C] shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left side - Logo and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-black dark:text-white hover:text-[#ea384c] dark:hover:text-[#ea384c]"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img 
                  className="h-10 w-auto"
                  src="/logo.png"
                  alt="GLOHSEN Logo"
                />
              </Link>
            </div>
            
            {/* Center - Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className={`text-sm font-medium ${
                  currentPage === 'home' 
                    ? 'text-[#ea384c] dark:text-[#ea384c]'
                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                HOME
              </Link>
              <Link
                to="/about-us"
                className={`text-sm font-medium ${
                  currentPage?.includes('about')
                    ? 'text-[#ea384c] dark:text-[#ea384c]'
                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                ABOUT US
              </Link>
              <Link
                to="/jobs"
                className={`text-sm font-medium ${
                  currentPage?.includes('job')
                    ? 'text-[#ea384c] dark:text-[#ea384c]'
                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                JOBS
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium ${
                  currentPage?.includes('blog')
                    ? 'text-[#ea384c] dark:text-[#ea384c]'
                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                BLOG
              </Link>
              <Link
                to="/contact-us"
                className={`text-sm font-medium ${
                  currentPage?.includes('contact')
                    ? 'text-[#ea384c] dark:text-[#ea384c]'
                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                CONTACT US
              </Link>
            </nav>
            
            {/* Right side - User-related features */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1 text-black dark:text-white hover:text-[#ea384c] dark:hover:text-[#ea384c]"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {/* Search dropdown */}
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 z-10">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Link
                  to={getNotificationsPath()}
                  className="p-1 text-black dark:text-white hover:text-[#ea384c] dark:hover:text-[#ea384c]"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Link>
              </div>
              
              {/* Messages */}
              <div className="relative">
                <Link
                  to={getInboxPath()}
                  className="p-1 text-black dark:text-white hover:text-[#ea384c] dark:hover:text-[#ea384c]"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Link>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1 text-black dark:text-white hover:text-[#ea384c] dark:hover:text-[#ea384c]"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="text-sm font-medium hidden sm:block">{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* User dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <UserCircle className="h-4 w-4 mr-2" /> Dashboard
                      </Link>
                      <Link
                        to="/account-settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-2" /> Account Settings
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPage === 'home' 
                  ? 'text-[#ea384c] dark:text-[#ea384c]'
                  : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/about-us"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPage?.includes('about')
                  ? 'text-[#ea384c] dark:text-[#ea384c]'
                  : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              ABOUT US
            </Link>
            <Link
              to="/jobs"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPage?.includes('job')
                  ? 'text-[#ea384c] dark:text-[#ea384c]'
                  : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              JOBS
            </Link>
            <Link
              to="/blog"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPage?.includes('blog')
                  ? 'text-[#ea384c] dark:text-[#ea384c]'
                  : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              BLOG
            </Link>
            <Link
              to="/contact-us"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                currentPage?.includes('contact')
                  ? 'text-[#ea384c] dark:text-[#ea384c]'
                  : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreHeader;
