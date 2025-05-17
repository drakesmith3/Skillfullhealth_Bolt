
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronsUp, MessageSquare } from 'lucide-react';

const FloatingActionButtons: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Chat with us button */}
      <button
        onClick={() => alert("Chat functionality would open here")}
        className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-amber-500 text-black dark:bg-amber-400 dark:text-black"
        aria-label="Chat with us"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Back to top button - only visible when scrolled down */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-red-800 text-white"
          aria-label="Back to top"
        >
          <ChevronsUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default FloatingActionButtons;
