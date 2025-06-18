
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200 backdrop-blur-sm group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {theme === 'light' ? (
          // Moon icon for light theme (to switch to dark)
          <Moon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          // Sun icon for dark theme (to switch to light)
          <Sun className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
