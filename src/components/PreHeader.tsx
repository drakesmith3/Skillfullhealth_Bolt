
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface PreHeaderProps {
  currentPage?: string;
}

const PreHeader: React.FC<PreHeaderProps> = ({ currentPage = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'Professional/Student', link: '/professional-student' },
    { name: 'Employer', link: '/employer' },
    { name: 'Tutor', link: '/tutor' },
    { name: 'Community Forum', link: '/community' },
    { name: 'Blog', link: '/blog' },
    { name: 'About Us', link: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" aria-label="GLOHSEN Home">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-amber-400 to-red-500 text-transparent bg-clip-text bg-size-200 animate-gradient dark:from-red-400 dark:via-amber-300 dark:to-red-400">
              GLOHSEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                  currentPage === item.name.toLowerCase() 
                    ? 'text-amber-500 dark:text-amber-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`text-base font-medium transition-colors hover:text-amber-500 ${
                    currentPage === item.name.toLowerCase() 
                      ? 'text-amber-500 dark:text-amber-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PreHeader;
