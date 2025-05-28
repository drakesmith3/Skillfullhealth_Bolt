import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Bell, Inbox, LayoutDashboard, UserCircle, Briefcase, 
  Gamepad2, BookOpen, MessageSquare, Rss, Mail, ChevronDown 
} from 'lucide-react';
import Logo3DHyperRealistic from './Logo3DHyperRealistic';
import { useTheme } from '@/contexts/ThemeContext'; // Added useTheme

interface PreHeaderProps {
  currentPage?: string;
  userName?: string;
}

const PreHeader: React.FC<PreHeaderProps> = ({ currentPage = '', userName = "Dr Olusiji" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('/dashboard');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Added theme and toggleTheme
  const [showUserMenu, setShowUserMenu] = useState(false); // Added state for user menu
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Example value
  const [unreadMessages, setUnreadMessages] = useState(2); // Example value

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
      switch (userRole.toLowerCase()) {
        case 'professional':
          setDashboardLink('/dashboard/professional');
          break;
        case 'student':
          setDashboardLink('/dashboard/student');
          break;
        case 'employer':
          setDashboardLink('/dashboard/employer');
          break;
        case 'tutor':
          setDashboardLink('/dashboard/tutor');
          break;
        default:
          setDashboardLink('/dashboard'); 
      }
    } else {
      setDashboardLink('/signin'); 
    }
  }, []);

  const middleMenuItems = [
    { name: 'Job Board', link: '/job-board', icon: Briefcase },
    { name: 'Games & Quizzes', link: '/games-quizzes', icon: Gamepad2 },
    { name: 'Courses', link: '/courses', icon: BookOpen },
    { name: 'Discussion', link: '/community', icon: MessageSquare },
    { name: 'Blog', link: '/blog', icon: Rss },
  ];

  // Updated rightMenuItems to use Mail for Inbox for consistency with duplicate if desired, or keep Inbox
  const rightMenuItems = [
    { name: 'Notifications', link: '/notifications', icon: Bell, label: 'Notifications' },
    { name: 'Inbox', link: '/inbox', icon: Mail, label: 'Inbox' }, // Changed to Mail icon
    { name: 'Dashboard', link: dashboardLink, icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const handleDashboardNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(dashboardLink);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    if (showUserMenu) {
      setShowUserMenu(false);
    }
  };
  
  // Dynamic background and text color based on scroll
  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out shadow-lg";
  const scrolledClasses = "bg-black/90 backdrop-blur-md text-white border-b border-gray-700";
  // Off-white for non-scrolled light mode, and a dark equivalent for dark mode.
  // Text colors will need to be managed for visibility against these backgrounds.
  const notScrolledClasses = scrolled 
    ? scrolledClasses 
    : (theme === 'dark' 
        ? "bg-gray-800 text-gray-200 border-b border-transparent" 
        : "bg-gray-50 text-gray-800 border-b border-transparent"); // Off-white (bg-gray-50)
  
  return (
    <header 
      className={`${headerBaseClasses} ${notScrolledClasses}`}
    >      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1 md:py-1.5">          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" aria-label="GLOHSEN Home">
            <Logo3DHyperRealistic size={60} className="flex-shrink-0" /> 
            <span className={`text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 via-amber-400 to-red-500 text-transparent bg-clip-text bg-size-200 animate-gradient`}>
              GLOHSEN 
            </span>
          </Link>

          {/* Desktop Middle Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {middleMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center text-sm font-medium transition-colors hover:text-amber-500 dark:hover:text-amber-400 ${
                  currentPage === item.name.toLowerCase() 
                    ? 'text-amber-500 dark:text-amber-400' 
                    : (scrolled || theme ==='dark' ? 'text-white' : 'text-gray-700')
                }`}
              >
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Navigation & User */}
          <div className="hidden lg:flex items-center space-x-4">
            {rightMenuItems.map((item) => {
              const isDashboard = item.name === 'Dashboard';
              const iconColorClass = scrolled || theme === 'dark' ? 'text-white' : 'text-gray-700';
              const hoverBgClass = scrolled ? 'hover:bg-white/20' : 'hover:bg-black/10';
              const commonClasses = `p-2 rounded-full ${hoverBgClass} transition-colors flex items-center relative ${iconColorClass}`;

              if (isDashboard) {
                return (
                  <button
                    key={item.name}
                    onClick={handleDashboardNavigation}
                    aria-label={item.label}
                    className={commonClasses}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.link}
                  aria-label={item.label}
                  className={commonClasses}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name === 'Notifications' && unreadNotifications > 0 && (
                    <span className={`absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center ring-2 ${scrolled ? 'ring-gray-900' : 'ring-gray-50' }`}>
                      {unreadNotifications}
                    </span>
                  )}
                  {item.name === 'Inbox' && unreadMessages > 0 && (
                     <span className={`absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center ring-2 ${scrolled ? 'ring-gray-900' : 'ring-gray-50' }`}>
                      {unreadMessages}
                    </span>
                  )}
                </Link>
              );
            })}
            {/* User Menu Dropdown */}
            <div className={`relative flex items-center space-x-2 pl-2 border-l ${scrolled || theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-1 rounded-md ${scrolled ? 'hover:bg-white/20' : 'hover:bg-black/10'} ${scrolled || theme === 'dark' ? 'text-white' : 'text-gray-700'}`}
              >
                <UserCircle className="h-6 w-6" /> 
                <span className="text-sm font-medium">{userName}</span> 
                <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 top-full w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-20 border border-gray-200 dark:border-gray-700"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <UserCircle className="h-5 w-5"/> Your Profile
                  </Link>
                  <Link to="/account-settings" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Menu className="h-5 w-5"/> Account Settings
                  </Link>
                  <button onClick={() => { toggleTheme(); setShowUserMenu(false); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LayoutDashboard className="h-5 w-5"/> 
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <Link 
                    to="/signed-out" // Updated link to the new signed-out page
                    onClick={() => { 
                      // Add any actual logout logic here (e.g., clearing session, API call)
                      sessionStorage.removeItem('userRole'); // Example: clear user role
                      setShowUserMenu(false); 
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700/30">
                    <X className="h-5 w-5"/> 
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 ${scrolled ? 'hover:bg-white/20 text-white' : 'hover:bg-black/10 text-gray-700 dark:text-gray-200'}`}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        // Mobile menu background should be solid for readability
        <div className={`lg:hidden absolute top-full left-0 right-0 shadow-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {/* User Info in Mobile */}
            <div className="py-4 px-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <UserCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200">{userName}</div>
                  <button 
                    onClick={handleDashboardNavigation} 
                    className="text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            </div>

            <nav className="flex flex-col space-y-1 px-2 py-3">
              {middleMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-500 dark:hover:text-amber-400 ${
                    currentPage === item.name.toLowerCase() 
                      ? 'bg-gray-100 dark:bg-gray-700 text-amber-500 dark:text-amber-400' 
                      : 'text-gray-700 dark:text-gray-300' 
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              {/* Separator */}
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
              {rightMenuItems.map((item) => {
                const isDashboard = item.name === 'Dashboard';
                const commonMobileClasses = `flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-500 dark:hover:text-amber-400 relative`;
                const activeMobileClasses = 'bg-gray-100 dark:bg-gray-700 text-amber-500 dark:text-amber-400';
                const inactiveMobileClasses = 'text-gray-700 dark:text-gray-300';

                const isActive = (isDashboard && (currentPage === 'dashboard' || (dashboardLink && dashboardLink.includes(currentPage)))) || (currentPage === item.name.toLowerCase());

                if (isDashboard) {
                  return (
                    <button
                      key={item.name}
                      onClick={handleDashboardNavigation} 
                      className={`${commonMobileClasses} ${isActive ? activeMobileClasses : inactiveMobileClasses}`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${commonMobileClasses} ${isActive ? activeMobileClasses : inactiveMobileClasses}`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.name === 'Notifications' && unreadNotifications > 0 && (
                       <span className={`absolute top-1/2 right-3 transform -translate-y-1/2 block h-3 w-3 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center ring-2 ${theme === 'dark' ? 'ring-gray-900' : 'ring-white'}`}>
                        {unreadNotifications}
                      </span>
                    )}
                    {item.name === 'Inbox' && unreadMessages > 0 && (
                      <span className={`absolute top-1/2 right-3 transform -translate-y-1/2 block h-3 w-3 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center ring-2 ${theme === 'dark' ? 'ring-gray-900' : 'ring-white'}`}>
                        {unreadMessages}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PreHeader;


