import { useCallback, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Utility hook for HowItWorksWheel component optimization
export const useWheelAnimations = (rotationSpeed: number, rotationDuration: number, isDark: boolean) => {
  // Memoized animation duration calculation
  const getRotationDuration = useCallback(() => {
    return rotationDuration / Math.abs(rotationSpeed);
  }, [rotationSpeed, rotationDuration]);

  // Memoized theme-dependent styles
  const themeStyles = useMemo(() => ({
    lightBulbGlow: {
      filter: isDark 
        ? "drop-shadow(0 0 15px #B8860B) drop-shadow(0 0 30px #A07C1F) drop-shadow(0 0 45px #B8860B)"
        : "drop-shadow(0 0 8px rgba(212,175,55,0.3)) drop-shadow(0 0 15px rgba(212,175,55,0.2))"
    },
    wheelBackground: isDark
      ? "transparent"
      : "conic-gradient(from 0deg, #1A1A1A 0%, #333333 50%, #1A1A1A 100%)",
    wheelBoxShadow: isDark
      ? "0 20px 60px 0 rgba(40,20,80,0.35), 0 0 100px 12px #B8860B inset, 0 0 180px 5px rgba(184,134,11,0.15)"
      : "0 25px 80px 0 rgba(10,10,10,0.25), 0 0 120px 15px #2C2C2C inset, 0 0 200px 8px rgba(10,10,10,0.15)",
    sectionBackground: isDark 
      ? 'radial-gradient(circle at center, #101010 0%, rgba(40,20,80,0.35) 30%, rgba(184,134,11,0.2) 60%, #0A0A0A 100%)'
      : 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,215,0,0.15) 25%, rgba(212,175,55,0.1) 50%, rgba(255,182,193,0.2) 75%, rgba(248,248,255,0.9) 100%)'
  }), [isDark]);

  // Memoized CSS animations with theme support
  const animationStyles = useMemo(() => ({
    titleGlow: isDark 
      ? "0 0 30px #FFD700, 0 0 60px #D4AF37, 0 0 90px #B8860B, 0 4px 8px rgba(0,0,0,0.8)" 
      : "0px 6px 12px rgba(0,0,0,0.4), 0px 3px 6px rgba(220,20,60,0.6)",
    titleGlowHover: isDark 
      ? "0 0 40px #FFD700, 0 0 80px #D4AF37, 0 0 120px #B8860B, 0 0 160px #AA8C2C, 0 6px 12px rgba(0,0,0,0.9)" 
      : "0px 8px 16px rgba(0,0,0,0.5), 0px 4px 8px rgba(220,20,60,0.8), 0 0 30px rgba(220,20,60,0.3)",
    centerGemBoxShadow: isDark 
      ? '0 0 20px #FFD700, 0 0 40px #D4AF37, 0 0 60px #B8860B' 
      : '0 0 20px #DC143C, 0 0 40px #FF4444',
    centerGemBoxShadowHover: isDark 
      ? '0 0 30px #FFD700, 0 0 60px #D4AF37, 0 0 90px #B8860B' 
      : '0 0 30px #DC143C, 0 0 60px #FF4444',
    lightBulbGlowIntense: isDark 
      ? "drop-shadow(0 0 25px #B8860B) drop-shadow(0 0 50px #A07C1F) drop-shadow(0 0 75px #B8860B)"
      : "drop-shadow(0 0 12px rgba(212,175,55,0.4)) drop-shadow(0 0 20px rgba(212,175,55,0.3))"
  }), [isDark]);

  // Memoized step card styles
  const stepCardStyles = useMemo(() => ({
    background: isDark 
      ? 'rgba(30,39,56,0.6)' 
      : 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
    boxShadow: isDark
      ? '0 15px 50px 0 rgba(31,38,135,0.35), 0 0 40px 6px #D4AF37 inset, 0 0 80px 2px rgba(212,175,55,0.1)'
      : '0 15px 40px rgba(212,175,55,0.4), 0 0 30px rgba(255,215,0,0.3), 0 0 60px rgba(184,134,11,0.2)',
    border: isDark 
      ? '2px solid rgba(212,175,55,0.3)' 
      : '2px solid #B8860B',
    backdropFilter: isDark ? 'blur(25px) saturate(220%)' : 'none',
    hoverBoxShadow: isDark
      ? '0 30px 80px 0 rgba(31,38,135,0.45), 0 0 60px 12px #D4AF37 inset, 0 0 120px 5px rgba(212,175,55,0.2)'
      : '0 15px 35px rgba(0, 0, 0, 0.15)',
    hoverBorderColor: isDark ? 'rgba(212,175,55,0.5)' : '#B8860B'
  }), [isDark]);

  return {
    getRotationDuration,
    themeStyles,
    animationStyles,
    stepCardStyles
  };
};

export default useWheelAnimations;
