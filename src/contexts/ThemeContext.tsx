
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  theme: 'light'
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Check if user prefers dark mode or has set it previously
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  // Apply the theme class to the document whenever the theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };
    
    // Use the newer addEventListener method with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Apply specific styles for dark mode
  useEffect(() => {
    const applyDarkModeStyles = () => {
      // Add any specific CSS variables or styles that need to be updated for dark mode
      if (isDark) {
        document.body.style.setProperty('--background-color', '#121212');
        document.body.style.setProperty('--text-color', '#ffffff');
        document.body.style.setProperty('--card-bg', '#1e1e1e');
      } else {
        document.body.style.removeProperty('--background-color');
        document.body.style.removeProperty('--text-color');
        document.body.style.removeProperty('--card-bg');
      }
    };

    applyDarkModeStyles();
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme,
      theme: isDark ? 'dark' : 'light'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
