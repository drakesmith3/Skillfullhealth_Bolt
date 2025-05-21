
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Match the expected interface used in components
  return {
    theme: context.isDark ? 'dark' : 'light',
    toggleTheme: context.toggleTheme
  };
};

export default useTheme;
