
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-lg focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        // Moon icon for light theme (to switch to dark)
        <Moon className="h-5 w-5" />
      ) : (
        // Sun icon for dark theme (to switch to light)
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
