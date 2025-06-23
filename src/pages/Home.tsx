import React, { Suspense, useState, useEffect, useRef, useCallback, ComponentType } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats, PerspectiveCamera, Stars } from '@react-three/drei';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ChevronRight, Play, X, AlertTriangle } from "lucide-react";

import Features from "../components/FeaturesOptimized";
import HowItWorks from "../components/HowItWorksWheel";
import Feedback from "../components/Feedback";
import Employers from "../components/Employers";
import TutorsAdvisers from "../components/TutorsAdvisers";
import GamesAndQuizzes from "../components/GamesQuizzes";
import SuccessStories from "../components/SuccessStories";
import JoinCommunity from "../components/JoinCommunity";
import Footer from "../components/Footer";
import { audioPlayer } from "../utils/AudioPlayer";
import ProgressIndicator from "../components/ProgressIndicator";
import StoryAnimations from "../components/StoryAnimations";
import { withReturnToTopButton } from "../components/withReturnToTopButton";
import { useSound } from "../contexts/SoundContext";
import { useTheme } from "../contexts/ThemeContext";
import ParticleSystem from "../components/ParticleSystem";
import ThemeToggle from "../components/ThemeToggle";
import Logo3DHyperRealistic from "../components/Logo3DHyperRealistic";

// Ensure ScrollTrigger is registered globally
gsap.registerPlugin(ScrollTrigger);

// Define a common props type for section components
export interface SectionProps {
  isActive: boolean;
  sectionName: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// Story section titles for horizontal storytelling
const storyTitles = [
  "Welcome to GLOHSEN",
  "Discover Features", 
  "How It Works",
  "Client Feedback",
  "For Employers",
  "Tutors & Advisers",
  "Games & Quizzes",
  "Success Stories", 
  "Join Community",
  "Contact & Connect"
];

// Enhanced Header Section with full interactive particle playground
const HeaderSection: React.FC<SectionProps> = ({ scrollToSection }) => {
  const { isDark, theme } = useTheme();
  const [isTransformed, setIsTransformed] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [transformProgress, setTransformProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(true);  const [showDemoModal, setShowDemoModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const particleSystemRef = useRef<any>(null);
  const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup video timeout on unmount
  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, []);

  // Animate particle counter
  useEffect(() => {
    gsap.to({ count: 0 }, {
      count: 1500,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setParticleCount(Math.floor(this.targets()[0].count));
      }
    });
  }, []);

  const handleTransform = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTransformProgress(0);
    
    // Animate progress bar
    gsap.to({ progress: 0 }, {
      progress: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setTransformProgress(this.targets()[0].progress);
      }
    });    // Trigger particle transformation
    if (particleSystemRef.current) {
      particleSystemRef.current.transformToCaduceus();
    }

    setTimeout(() => {
      setIsTransformed(true);
      setIsAnimating(false);
    }, 2000);
  }, [isAnimating]);

  const handleReset = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTransformProgress(0);
    
    if (particleSystemRef.current) {
      particleSystemRef.current.resetParticles();
    }

    setTimeout(() => {
      setIsTransformed(false);
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isTransformed) handleTransform();
      } else if (event.key.toLowerCase() === 'r') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransformed, handleTransform, handleReset]);
  // Click ripple effect
  const createRipple = useCallback((event: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.className = `absolute pointer-events-none rounded-full border-2 opacity-70 ${
      isDark ? 'border-amber-400' : 'border-amber-600'
    }`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.transform = 'translate(-50%, -50%)';

    canvasRef.current?.appendChild(ripple);

    gsap.to(ripple, {
      width: '200px',
      height: '200px',
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    });  }, [isDark]);

  return (
    <div className={`relative w-full h-full min-h-screen overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-red-950 to-amber-950' 
        : 'bg-gradient-to-br from-slate-50 via-red-50 to-amber-50'
    }`}>
      <div className="absolute top-0 left-0 right-0 z-50 px-3 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          
          {/* 3D Logo - Left Corner */}
          <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0">
            <Logo3DHyperRealistic />
          </div>

          {/* Navigation Buttons - Desktop and Mobile Responsive */}
          <div className="flex items-center gap-1 md:gap-3 flex-wrap">
            {[
              { label: 'ABOUT US', path: '/about-us', mobile: 'ABOUT', priority: 1 },
              { label: 'SIGN IN', path: '/signin', mobile: 'SIGN IN', priority: 1 },
              { label: 'SIGN UP', path: '/signup', mobile: 'SIGN UP', priority: 1 },
              { label: 'LEAVE FEEDBACK', path: '/feedback', mobile: 'FEEDBACK', priority: 2 },
              { label: 'GAMES & QUIZZES', path: '/games-quizzes', mobile: 'GAMES', priority: 3 },
              { label: 'COMMUNITY', path: '/community-forum', mobile: 'COMMUNITY', priority: 3 },
              { label: 'BLOG', path: '/blog', mobile: 'BLOG', priority: 4 }
            ].map((nav, index) => (
              <Link key={index} to={nav.path}>
                <Button
                  size="sm"
                  className={`
                    group relative transition-all duration-300 transform hover:scale-105 border-0 shadow-lg hover:shadow-xl overflow-hidden
                    px-2 py-1.5 text-xs font-bold text-black rounded-full
                    md:px-4 md:py-2 md:text-xs
                    ${nav.priority > 2 ? 'hidden sm:flex' : ''}
                    ${nav.priority > 3 ? 'hidden md:flex' : ''}
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
                    border: '1px solid #DAA520',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%)';
                    target.style.borderColor = '#DC143C';
                    target.style.boxShadow = '0 6px 20px rgba(220, 20, 60, 0.4)';
                    target.style.transform = 'scale(1.05) translateY(-2px)';
                    const shineElement = target.querySelector('.shine-effect') as HTMLElement;
                    if (shineElement) {
                      shineElement.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)';
                    target.style.borderColor = '#DAA520';
                    target.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
                    target.style.transform = 'scale(1)';
                  }}
                >                  {/* Shine effect on hover */}
                  <div className="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
                  <span className="relative z-10 md:hidden">{nav.mobile}</span>
                  <span className="relative z-10 hidden md:inline">{nav.label}</span>
                </Button>
              </Link>
            ))}
              {/* Mobile Menu Button for hidden items */}
            <div className="sm:hidden relative">
              <Button
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="group relative px-2 py-1.5 text-xs font-bold text-black rounded-full transition-all duration-300 transform hover:scale-105 border-0 shadow-lg hover:shadow-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
                  border: '1px solid #DAA520',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              >
                <span className="relative z-10">⋯</span>
              </Button>
              
              {/* Mobile Dropdown Menu */}
              {showMobileMenu && (
                <>
                  {/* Overlay to close menu when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMobileMenu(false)}
                  />                  {/* Dropdown Menu */}
                  <div className="absolute right-[-50px] top-full mt-2 z-50 rounded-lg shadow-xl border border-amber-300/50 min-w-[140px] overflow-hidden backdrop-blur-md"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(255, 215, 0, 0.95) 50%, rgba(184, 134, 11, 0.95) 100%)',
                      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {[
                      { label: 'GAMES & QUIZZES', path: '/games-quizzes', mobile: 'GAMES', priority: 2 },
                      { label: 'COMMUNITY', path: '/community-forum', mobile: 'COMMUNITY', priority: 3 },
                      { label: 'BLOG', path: '/blog', mobile: 'BLOG', priority: 4 }
                    ].map((nav, index) => (
                      <Link key={index} to={nav.path}>
                        <button
                          onClick={() => setShowMobileMenu(false)}
                          className="group relative w-full px-4 py-3 text-left text-sm font-bold text-black transition-all duration-300 border-b border-amber-400/30 last:border-b-0 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.background = 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%)';
                            target.style.color = 'white';
                            target.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)';
                            target.style.color = 'black';
                            target.style.transform = 'scale(1)';
                          }}
                        >
                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                          <span className="relative z-10">{nav.mobile}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* UI Controls - Responsive positioning for mobile and desktop */}
      <div className="absolute bottom-20 left-2 md:bottom-32 md:left-4 z-30">
        <Card className={`backdrop-blur-md p-1.5 md:p-2 max-w-[140px] md:max-w-[170px] ${
          isDark 
            ? 'bg-black/15 border-amber-400/20' 
            : 'bg-white/60 border-amber-600/30'
        }`}>
          <div className="space-y-1 md:space-y-1.5">
            {/* Transform and Reset buttons - Stacked on mobile, side by side on desktop */}
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-1.5">
              <Button
                onClick={handleTransform}
                disabled={isTransformed || isAnimating}
                size="sm"
                className={`px-2 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 text-xs ${
                  isDark 
                    ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border-amber-400/30'
                    : 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-700 border-amber-600/50'
                }`}
              >
                <span className="hidden sm:inline">Transform ✨</span>
                <span className="sm:hidden">Transform</span>
              </Button>
              
              <Button
                onClick={handleReset}
                disabled={!isTransformed && !isAnimating}
                variant="ghost"
                size="sm"
                className={`px-2 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 text-xs ${
                  isDark 
                    ? 'text-slate-300 hover:text-amber-400' 
                    : 'text-slate-700 hover:text-amber-700'
                }`}
              >
                <span className="hidden sm:inline">Reset 🔄</span>
                <span className="sm:hidden">Reset</span>
              </Button>
            </div>
            
            {/* Stats button */}
            <div className="flex justify-start">
              <Button
                onClick={() => setShowStats(!showStats)}
                variant="ghost"
                size="sm"
                className={`px-2 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 text-xs ${
                  isDark 
                    ? 'text-slate-100 hover:text-amber-400' 
                    : 'text-slate-400 hover:text-amber-700'
                }`}
              >
                <span className="hidden sm:inline">Stats 📊</span>
                <span className="sm:hidden">📊</span>
              </Button>
            </div>
            
            {isAnimating && (
              <div className="space-y-1">
                <div className={`flex justify-between text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span className="hidden sm:inline">Transforming</span>
                  <span className="sm:hidden">...</span>
                  <span>{transformProgress.toFixed(0)}%</span>
                </div>
                <Progress value={transformProgress} className="h-1" />
              </div>
            )}
            
            {/* Keyboard shortcuts - Hidden on very small screens */}
            <div className={`text-xs opacity-50 space-y-1 hidden sm:block ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center gap-1">
                <kbd className={`px-1 py-0.5 rounded text-xs ${
                  isDark 
                    ? 'bg-slate-700 text-amber-400' 
                    : 'bg-slate-200 text-amber-700'
                }`}>Space</kbd>
                <span className="hidden md:inline">Transform</span>
                <span className="md:hidden">Trans</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className={`px-1 py-0.5 rounded text-xs ${
                  isDark 
                    ? 'bg-slate-700 text-amber-400' 
                    : 'bg-slate-200 text-amber-700'
                }`}>R</kbd>
                <span>Reset</span>
              </div>
            </div>
          </div>
        </Card>{showStats && (
          <Card className={`backdrop-blur-md p-2 md:p-3 mt-2 max-w-[140px] md:max-w-[170px] ${
            isDark 
              ? 'bg-black/15 border-amber-400/20' 
              : 'bg-white/60 border-amber-600/30'
          }`}>
            <div className={`space-y-1 md:space-y-1.5 text-xs ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <div className="flex justify-between">
                <span className="hidden sm:inline">State:</span>
                <span className="sm:hidden">S:</span>
                <span className={`${isDark ? "text-amber-400" : "text-amber-700"} truncate`}>
                  {isTransformed ? "Caduceus" : "Playground"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="hidden sm:inline">Particles:</span>
                <span className="sm:hidden">P:</span>
                <span className={isDark ? "text-amber-400" : "text-amber-700"}>
                  {particleCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="hidden sm:inline">Progress:</span>
                <span className="sm:hidden">%:</span>
                <span className={isDark ? "text-amber-400" : "text-amber-700"}>
                  {transformProgress.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="ghost"
              size="sm"
              className={`w-full px-2 py-1 rounded-full transition-all duration-300 transform hover:scale-105 text-xs mt-2 ${
                isDark 
                  ? 'text-slate-300 hover:text-amber-400' 
                  : 'text-slate-700 hover:text-amber-700'
              }`}
            >
              <span className="hidden sm:inline">Close Stats</span>
              <span className="sm:hidden">Close</span>
            </Button>
          </Card>
        )}
      </div>      {/* Title Overlay - Centered and Mobile Responsive */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text drop-shadow-2xl relative overflow-hidden animate-shine text-center leading-tight ${
          isDark 
            ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600' 
            : ''
        }`}
            style={{
              backgroundImage: !isDark 
                ? 'linear-gradient(to right, #dc2626, #ef4444, #f59e0b)'
                : undefined
            }}>
          <span className="block sm:hidden">Welcome to GLOHSEN</span>
          <span className="hidden sm:block">Welcome to GLOHSEN: Your Story Begins Here</span>
        </h1>
        <p className={`text-sm sm:text-lg md:text-xl lg:text-2xl mt-3 md:mt-6 drop-shadow-lg font-medium text-center max-w-xs sm:max-w-2xl md:max-w-4xl leading-tight ${
          isDark ? 'text-white/90' : 'text-slate-800'
        }`}>
          <span className="block sm:hidden">
            Transforming Healthcare<br />
            Experiences
          </span>
          <span className="hidden sm:block">
            An Exhilarating Journey Through an Empowering Ecosystem<br />
            Transforming Healthcare Experiences
          </span>
        </p>
      </div>      {/* Demo and Scroll Buttons - Mobile Responsive Bottom Center */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        
        {/* Demo Button - Responsive sizing */}        <Button
          onClick={() => {
            setVideoLoading(true);
            setVideoError(false);
            setShowDemoModal(true);
            
            // Set a timeout to detect if video takes too long to load
            if (videoTimeoutRef.current) {
              clearTimeout(videoTimeoutRef.current);
            }
            videoTimeoutRef.current = setTimeout(() => {
              if (videoLoading) {
                console.warn('Video loading timeout - may indicate loading issues');
                setVideoError(true);
                setVideoLoading(false);
              }
            }, 15000); // 15 second timeout
          }}
          className="group relative backdrop-blur-xl rounded-full transition-all duration-700 transform hover:scale-110 shadow-2xl pointer-events-auto text-white font-bold tracking-wide overflow-hidden
            px-4 py-2 text-sm
            sm:px-5 sm:py-2.5 sm:text-base
            md:px-6 md:py-3 md:text-base"
          style={{
            background: 'linear-gradient(135deg, #DC143C 0%, #FF6B35 50%, #FFA500 100%)',
            border: '2px solid #DC143C',
            boxShadow: '0 6px 24px rgba(220, 20, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
          <span className="relative z-10">DEMO</span>
        </Button>

        {/* Double Chevron Scroll Button - Responsive sizing */}
        <Button
          onClick={() => {
            if (scrollToSection) {
              scrollToSection(1); // Index 1 is Features section
            }
          }}
          className="group relative bg-transparent border-none transition-all duration-500 transform hover:scale-110 pointer-events-auto focus:outline-none focus:ring-4 focus:ring-yellow-500/50 hover:bg-yellow-500/10 rounded-xl
            p-3 sm:p-4 md:p-6"
          aria-label="Scroll to next section"
          tabIndex={0}
        >
          <div className="animate-bounce group-hover:animate-pulse">
            <ChevronRight 
              className={`transform group-hover:translate-x-1 transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-2xl
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                ${isDark ? 'text-yellow-500 group-hover:text-yellow-400' : 'text-black group-hover:text-gray-800'}`} 
              style={{color: isDark ? '#FFD700' : '#000000'}} 
            />
          </div>
          <div className="animate-bounce group-hover:animate-pulse -ml-1 sm:-ml-2" style={{animationDelay: '0.1s'}}>
            <ChevronRight 
              className={`transform group-hover:translate-x-2 transition-all duration-300 delay-75 drop-shadow-lg group-hover:drop-shadow-2xl
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                ${isDark ? 'text-yellow-900 group-hover:text-yellow-900' : 'text-black group-hover:text-gray-800'}`} 
              style={{color: isDark ? '#FFD700' : '#000000'}} 
            />
          </div>
          {/* Hover indicator background */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Button>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg pointer-events-auto">
          <div className={`relative max-w-4xl w-full mx-4 rounded-3xl overflow-hidden shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/95 to-black/95' 
              : 'bg-gradient-to-br from-white/95 to-gray-50/95'          }`}>            <Button
              onClick={() => {
                setShowDemoModal(false);
                setVideoLoading(true);
                setVideoError(false);
                // Clear video timeout
                if (videoTimeoutRef.current) {
                  clearTimeout(videoTimeoutRef.current);
                }
                // Stop video by removing src
                const iframe = document.querySelector('#demo-video') as HTMLIFrameElement;
                if (iframe) {
                  iframe.src = '';
                }
              }}
              className="absolute top-4 right-4 z-10 bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 rounded-full p-2"
            >
              <X className="w-6 h-6 text-red-400" />
            </Button>
            
            <div className="p-8">
              <h2 className={`text-3xl font-bold mb-6 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                GLOHSEN Platform Demo
              </h2>              {/* YouTube Video */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-black">
                {videoLoading && !videoError && (
                  <div className={`absolute inset-0 flex items-center justify-center z-10 ${
                    isDark 
                      ? 'bg-gray-800/90 text-gray-400' 
                      : 'bg-gray-100/90 text-gray-600'
                  }`}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Loading Demo Video...</p>
                    </div>
                  </div>
                )}
                
                {videoError && (
                  <div className={`absolute inset-0 flex items-center justify-center z-10 ${
                    isDark 
                      ? 'bg-gray-800/90 text-gray-400' 
                      : 'bg-gray-100/90 text-gray-600'
                  }`}>
                    <div className="text-center p-6">
                      <div className="text-red-500 mb-4">
                        <AlertTriangle className="h-12 w-12 mx-auto" />
                      </div>                      <p className="text-lg font-semibold mb-2">Video Load Error</p>
                      <p className="text-sm mb-4">Unable to load the demo video. This may be due to network restrictions, YouTube access issues, or content blockers.</p>
                      <div className="space-y-2">                        <Button 
                          onClick={() => {
                            setVideoError(false);
                            setVideoLoading(true);
                            // Clear any existing timeout
                            if (videoTimeoutRef.current) {
                              clearTimeout(videoTimeoutRef.current);
                            }
                            // Force reload by recreating the iframe
                            const iframe = document.querySelector('#demo-video') as HTMLIFrameElement;
                            if (iframe) {
                              const src = iframe.src;
                              iframe.src = '';
                              setTimeout(() => {
                                iframe.src = src;
                                // Set new timeout for this retry
                                videoTimeoutRef.current = setTimeout(() => {
                                  if (videoLoading) {
                                    setVideoError(true);
                                    setVideoLoading(false);
                                  }
                                }, 15000);
                              }, 100);
                            }
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white mr-2"
                        >
                          Retry
                        </Button>
                        <Button 
                          onClick={() => {
                            window.open('https://youtu.be/n1hFZu3vLro', '_blank');
                          }}
                          variant="outline"
                          className="border-amber-600 text-amber-600 hover:bg-amber-50"
                        >
                          Open in YouTube
                        </Button>
                      </div>
                    </div>
                  </div>
                )}                <iframe
                  id="demo-video"
                  src="https://www.youtube.com/embed/n1hFZu3vLro?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                  title="GLOHSEN Platform Demo Video"
                  className="w-full h-full rounded-2xl"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => {
                    console.log('Video iframe loaded successfully');
                    setVideoLoading(false);
                    setVideoError(false);
                    if (videoTimeoutRef.current) {
                      clearTimeout(videoTimeoutRef.current);
                    }
                  }}
                  onError={(e) => {
                    console.error('Video failed to load:', e);
                    setVideoLoading(false);
                    setVideoError(true);
                    if (videoTimeoutRef.current) {
                      clearTimeout(videoTimeoutRef.current);
                    }
                  }}
                />
              </div>
                {/* Blur Glassmorphism Close Button Below Video */}
              <div className="flex justify-center">                <Button
                  onClick={() => {
                    setShowDemoModal(false);
                    setVideoLoading(true);
                    setVideoError(false);
                    // Clear video timeout
                    if (videoTimeoutRef.current) {
                      clearTimeout(videoTimeoutRef.current);
                    }
                    // Stop video by removing src
                    const iframe = document.querySelector('#demo-video') as HTMLIFrameElement;
                    if (iframe) {
                      iframe.src = '';
                    }
                  }}
                  className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 via-red-600/30 to-red-700/20 hover:from-red-600/30 hover:via-red-700/40 hover:to-red-800/30 border-2 border-red-400/30 hover:border-red-500/50 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/30 text-red-400 hover:text-red-300 font-bold"
                >
                  <X className="w-5 h-5 mr-2" />
                  Close Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}      {/* 3D Canvas */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onClick={createRipple}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={isDark ? ['#0a0a0a'] : ['#fefefe']} />
          
          {/* Enhanced Lighting - Adjusted for theme */}
          <ambientLight intensity={isDark ? 0.3 : 0.5} />
          <pointLight 
            position={[10, 10, 10]} 
            intensity={isDark ? 1 : 0.8} 
            color={isDark ? "#ffd700" : "#ff8c00"} 
          />
          <pointLight 
            position={[-10, -10, 10]} 
            intensity={isDark ? 0.5 : 0.3} 
            color={isDark ? "#dc143c" : "#b91c1c"} 
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={0.5}
            intensity={isDark ? 0.5 : 0.3}
            color={isDark ? "#ffd700" : "#ff8c00"}
          />
          
          {/* Background stars - Visible only in dark mode */}
          {isDark && (
            <Stars
              radius={300}
              depth={60}
              count={2000}
              factor={7}
              saturation={0}
              fade
            />
          )}
          
          {/* Enhanced Particle System */}
          <ParticleSystem
            ref={particleSystemRef}
            isTransformed={isTransformed}
            particleCount={1500}
          />
          
          {/* Interactive Camera controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={!isTransformed}
            autoRotateSpeed={0.5}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>
    </div>
  );
};

// Create a wrapper component for Footer with isHomePage prop
const HomeFooter: React.FC<SectionProps> = (props) => (
  <Footer {...props} isHomePage={true} />
);

// Define the sections in the desired story order
const sectionsComponents: { component: React.ComponentType<SectionProps>; name: string; title: string }[] = [
  { component: HeaderSection as React.ComponentType<SectionProps>, name: "Header", title: storyTitles[0] },
  { component: withReturnToTopButton(Features as React.ComponentType<SectionProps>), name: "Features", title: storyTitles[1] },
  { component: withReturnToTopButton(HowItWorks as React.ComponentType<SectionProps>), name: "HowItWorks", title: storyTitles[2] },
  { component: withReturnToTopButton(Feedback as React.ComponentType<SectionProps>), name: "Feedback", title: storyTitles[3] },
  { component: withReturnToTopButton(Employers as React.ComponentType<SectionProps>), name: "Employers", title: storyTitles[4] },
  { component: withReturnToTopButton(TutorsAdvisers as React.ComponentType<SectionProps>), name: "TutorsAdvisers", title: storyTitles[5] },
  { component: withReturnToTopButton(GamesAndQuizzes as React.ComponentType<SectionProps>), name: "GamesAndQuizzes", title: storyTitles[6] },
  { component: withReturnToTopButton(SuccessStories as React.ComponentType<SectionProps>), name: "SuccessStories", title: storyTitles[7] },
  { component: withReturnToTopButton(JoinCommunity as React.ComponentType<SectionProps>), name: "JoinCommunity", title: storyTitles[8] },
  { component: HomeFooter as React.ComponentType<SectionProps>, name: "Footer", title: storyTitles[9] },
];

const sectionNames = sectionsComponents.map(s => s.name);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Use global sound context
  const { playClickSound: globalPlayClickSound, isSoundEnabled: globalIsSoundEnabled } = useSound();
  
  // Use global sound state instead of local state
  const isSoundEnabled = globalIsSoundEnabled;

  // Setup user interaction tracking for audio
  useEffect(() => {
    const enableAudio = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        audioPlayer.muted = false;
      }
    };

    // Listen for first user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [hasUserInteracted]);

  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);

  const numSections = sectionsComponents.length;

  // Navigate to section function for horizontal storytelling
  const scrollToSection = useCallback((sectionIndex: number) => {
    const validIndex = Math.max(0, Math.min(sectionIndex, numSections - 1));
    
    if (validIndex === currentSection) return;

    // play a page-turn sound on section change
    if (isSoundEnabled) {
      audioPlayer.play('/page-turn.mp3', volume);
    }
    isScrollingProgrammatically.current = true;
    
    // Update section immediately with smooth transition via CSS
    setCurrentSection(validIndex);
    
    // Reset programmatic scroll flag after animation
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000);
  }, [currentSection, isSoundEnabled, volume]);

  // Setup horizontal navigation and keyboard controls
  useEffect(() => {
    if (isLoading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrollingProgrammatically.current) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          scrollToSection(Math.max(0, currentSection - 1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
          break;
        case 'Home':
          event.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToSection(numSections - 1);
          break;
      }
    };

    // Handle mouse wheel for section navigation
    const handleWheel = (event: WheelEvent) => {
      if (isSoundEnabled) {
        const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        const wheelVol = Math.min(1, Math.abs(delta) / 300);
        audioPlayer.play('/whoosh.mp3', wheelVol);
      }
      if (isScrollingProgrammatically.current) return;
      
      event.preventDefault();
      
      const wheelThreshold = 50;
      if (Math.abs(event.deltaY) > wheelThreshold || Math.abs(event.deltaX) > wheelThreshold) {
        if (event.deltaY > 0 || event.deltaX > 0) {
          // Scroll down/right - go to next section
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
        } else {
          // Scroll up/left - go to previous section
          scrollToSection(Math.max(0, currentSection - 1));
        }
      }
    };

    // Handle touch/swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - go to next section
          scrollToSection(Math.min(numSections - 1, currentSection + 1));
        } else {
          // Swipe right - go to previous section
          scrollToSection(Math.max(0, currentSection - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLoading, currentSection, numSections, scrollToSection]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Preload storytelling sounds
  useEffect(() => {
    audioPlayer.preload([
      '/page-turn.mp3',
      '/whoosh.mp3',
      '/ambient.mp3',
      '/click.mp3'
    ]);
  }, []);

  // Ambient background music setup
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const ambient = new Audio('/ambient.mp3');
    ambient.loop = true;
    ambient.volume = volume * 0.3; // Slightly increased volume
    ambientRef.current = ambient;
    
    // Add error handling
    ambient.addEventListener('error', (e) => {
      console.warn('Ambient audio error:', e);
    });
    
    return () => { 
      ambient.pause(); 
      ambient.src = ''; // Clear src to free memory
    };
  }, [volume]);

  // Toggle ambient playback on sound toggle and user interaction
  useEffect(() => {
    if (isSoundEnabled && hasUserInteracted && ambientRef.current) {
      console.log('Starting ambient music...');
      ambientRef.current.play().catch((error) => {
        console.warn('Failed to play ambient music:', error);
      });
    } else if (ambientRef.current) {
      console.log('Stopping ambient music...');
      ambientRef.current.pause();
    }
  }, [isSoundEnabled, hasUserInteracted]);

  const toggleSound = useCallback(() => {
    const muted = audioPlayer.toggleMute();
    console.log('Sound toggled:', !muted, 'Volume:', volume);
    // Note: We no longer update local isSoundEnabled state since we use global state
  }, [volume]);

  // Create a function to play click sound for buttons
  const playClickSound = useCallback(() => {
    if (isSoundEnabled) {
      audioPlayer.play('/click.mp3', volume);
    }
    // Also use global click sound if available
    if (globalPlayClickSound) {
      globalPlayClickSound();
    }
  }, [isSoundEnabled, volume, globalPlayClickSound]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Story...</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden"
      >
        <ProgressIndicator 
          currentSection={currentSection}
          totalSections={numSections}
          scrollToSection={scrollToSection}
          chapterTitles={storyTitles}
        />

        <StoryAnimations 
          currentSection={currentSection} 
          totalSections={numSections} 
        />
        
        {/* Current section title overlay */}
        <div className="fixed bottom-24 left-4 z-50 opacity-30">
          <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-1">
            <h1 className="text-white/70 text-sm font-medium">
              {sectionsComponents[currentSection]?.title}
            </h1>
          </div>
        </div>

        {/* Horizontal storytelling container */}
        <div 
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ 
            width: `${numSections * 100}vw`,
            transform: `translateX(${-currentSection * 100}vw)`
          }}
        >
          {sectionsComponents.map(({ component: Component, name }, index) => (
            <div
              key={name}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="flex-shrink-0 w-screen h-full relative overflow-y-auto"
              id={`section-${index}`}
            >
              <Component 
                isActive={currentSection === index}
                sectionName={name}
                scrollToSection={scrollToSection}
                playClickSound={playClickSound}
              />
            </div>
          ))}
        </div>

        {/* Story navigation dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
          {sectionsComponents.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                if (isSoundEnabled) audioPlayer.play('/click.mp3', volume);
                scrollToSection(index);
              }}
              className={`group relative w-3 h-3 rounded-full transition-all duration-500 overflow-hidden ${
              currentSection === index 
                ? 'bg-[#ea384c] scale-125 shadow-lg shadow-[#ea384c]/50' 
                : 'bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#DAA520] hover:scale-110 shadow-md hover:shadow-[#FF6B6B]/30'
            }`}
            style={{
              boxShadow: currentSection !== index ? '0 2px 8px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : undefined
            }}
            aria-label={`Go to ${section.title}`}
            title={section.title}
          >
            {/* Red shine effect for navigation dots */}
            {currentSection !== index && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out rounded-full" />
            )}
          </button>
          ))}
        </div>

        {/* Story progress bar */}
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <div className="bg-white/20 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-[#ea384c] to-[#D4AF37] h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentSection + 1) / numSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 opacity-90">
          <button
            onClick={() => { if (isSoundEnabled) audioPlayer.play('/click.mp3', volume); scrollToSection(Math.max(0, currentSection - 1)); }}
            disabled={currentSection === 0}
            className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-all duration-300 ${
              currentSection === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30 hover:scale-110'
            }`}
            aria-label="Previous section"
          >
            ←
          </button>
        </div>

        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40 opacity-70">
          <button
            onClick={() => { if (isSoundEnabled) audioPlayer.play('/click.mp3', volume); scrollToSection(Math.min(numSections - 1, currentSection + 1)); }}
            disabled={currentSection === numSections - 1}
            className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-all duration-300 ${
              currentSection === numSections - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/30 hover:scale-110'
            }`}
            aria-label="Next section"
          >
            →
          </button>
        </div>

        {/* Storytelling instructions overlay */}
        <div className="fixed bottom-16 left-4 z-40 opacity-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
            <div>Use ← → arrows or swipe to navigate</div>
            <div>Mouse wheel also works</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
