import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Imported useNavigate
import { Menu, X, Bell, Inbox, LayoutDashboard, UserCircle, Briefcase, Gamepad2, BookOpen, MessageSquare, Rss } from 'lucide-react';
import LogoFavicon from './LogoFavicon';

interface PreHeaderProps {
  currentPage?: string;
  userName?: string;
}

const PreHeader: React.FC<PreHeaderProps> = ({ currentPage = '', userName = "Dr Olusiji" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('/dashboard'); // Default dashboard link
  const navigate = useNavigate(); // Hook for navigation

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
          setDashboardLink('/dashboard'); // Fallback
      }
    } else {
      setDashboardLink('/signin'); // If no role, link to sign-in
    }
  }, []);

  const middleMenuItems = [
    { name: 'Job Board', link: '/job-board', icon: Briefcase },
    { name: 'Games & Quizzes', link: '/games-quizzes', icon: Gamepad2 },
    { name: 'Courses', link: '/courses', icon: BookOpen },
    { name: 'Discussion', link: '/community', icon: MessageSquare },
    { name: 'Blog', link: '/blog', icon: Rss },
  ];

  const rightMenuItems = [
    { name: 'Notifications', link: '/notifications', icon: Bell, label: 'Notifications' },
    { name: 'Inbox', link: '/inbox', icon: Inbox, label: 'Inbox' },
    { name: 'Dashboard', link: dashboardLink, icon: LayoutDashboard, label: 'Dashboard' }, // Uses dynamic link
  ];

  const handleDashboardNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(dashboardLink);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-lg' 
          : 'bg-transparent'
      } text-gray-800 dark:text-gray-200`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" aria-label="GLOHSEN Home">
            <LogoFavicon />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 via-amber-400 to-red-500 text-transparent bg-clip-text bg-size-200 animate-gradient dark:from-red-400 dark:via-amber-300 dark:to-red-400">
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
                    : ''
                }`}
              >
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Navigation & User */}
          <div className="hidden lg:flex items-center space-x-4">
            {rightMenuItems.map((item) => (
              item.name === 'Dashboard' ? (
                <button
                  key={item.name}
                  onClick={handleDashboardNavigation}
                  aria-label={item.label}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                  <item.icon className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.link}
                  aria-label={item.label}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              )
            ))}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-300 dark:border-gray-600">
              <UserCircle className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">{userName}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl">
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
              {rightMenuItems.map((item) => (
                 item.name === 'Dashboard' ? (
                  <button
                    key={item.name}
                    onClick={handleDashboardNavigation}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-500 dark:hover:text-amber-400 ${
                      (item.name === 'Dashboard' && (currentPage === 'dashboard' || dashboardLink.includes(currentPage))) || 
                      (currentPage === item.name.toLowerCase())
                        ? 'bg-gray-100 dark:bg-gray-700 text-amber-500 dark:text-amber-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                ) : (
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
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PreHeader;
