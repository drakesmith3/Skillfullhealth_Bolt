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
import { ChevronRight, Play, X } from "lucide-react";

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
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const particleSystemRef = useRef<any>(null);

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
    });
  }, [isDark]);  return (
    <div className={`relative w-full h-full min-h-screen overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-red-950 to-amber-950' 
        : 'bg-gradient-to-br from-slate-50 via-red-50 to-amber-50'
    }`}>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* 3D Logo - Left Corner */}
          <div className="w-16 h-16 relative">
            <Logo3DHyperRealistic />
          </div>

          {/* Navigation Buttons - Right Corner */}
          <div className="flex items-center gap-3">
            {[
              { label: 'ABOUT US', path: '/about-us' },
              { label: 'SIGN IN', path: '/signin' },
              { label: 'SIGN UP', path: '/signup' },
              { label: 'LEAVE FEEDBACK', path: '/feedback' },
              { label: 'GAMES & QUIZZES', path: '/games-quizzes' },
              { label: 'COMMUNITY', path: '/community-forum' },
              { label: 'BLOG', path: '/blog' }            ].map((nav, index) => (
              <Link key={index} to={nav.path}>                <Button
                  size="sm"
                  className="px-4 py-2 text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-red-500 hover:via-red-600 hover:to-red-700 rounded-full transition-all duration-300 transform hover:scale-105 border-0 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                  {nav.label}
                </Button>
              </Link>))}
          </div>
        </div>
      </div>      {/* UI Controls - Moved to middle left and made compact with transparent shortcuts */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30">
        <Card className={`backdrop-blur-md p-2 max-w-[170px] ${
          isDark 
            ? 'bg-black/15 border-amber-400/20' 
            : 'bg-white/60 border-amber-600/30'
        }`}>          <div className="space-y-1.5">
            {/* Transform and Reset buttons in top row */}
            <div className="flex gap-1.5">
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
                Transform ✨
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
                Reset 🔄
              </Button>
            </div>
            
            {/* Stats button in second row under Transform */}
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
                Stats 📊
              </Button>
            </div>
            
            {isAnimating && (
              <div className="space-y-1">
                <div className={`flex justify-between text-xs ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>Transforming</span>
                  <span>{transformProgress.toFixed(0)}%</span>
                </div>
                <Progress value={transformProgress} className="h-1" />
              </div>
            )}
            
            {/* Transparent keyboard shortcuts info */}
            <div className={`text-xs opacity-50 space-y-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center gap-1">
                <kbd className={`px-1 py-0.5 rounded text-xs ${
                  isDark 
                    ? 'bg-slate-700 text-amber-400' 
                    : 'bg-slate-200 text-amber-700'
                }`}>Space</kbd>
                <span>Transform</span>
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
          </div></Card>
          {showStats && (
          <Card className={`backdrop-blur-md p-3 mt-2 max-w-[170px] ${
            isDark 
              ? 'bg-black/15 border-amber-400/20' 
              : 'bg-white/60 border-amber-600/30'
          }`}>
            <div className={`space-y-1.5 text-xs ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <div className="flex justify-between">
                <span>State:</span>
                <span className={isDark ? "text-amber-400" : "text-amber-700"}>
                  {isTransformed ? "Caduceus" : "Playground"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Particles:</span>
                <span className={isDark ? "text-amber-400" : "text-amber-700"}>
                  {particleCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
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
              Close Stats
            </Button>
          </Card>
        )}
      </div>      {/* Title Overlay - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text drop-shadow-2xl relative overflow-hidden bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 animate-shine text-center">
          Welcome to GLOHSEN: Your Story Begins Here
        </h1>
        <p className={`text-2xl mt-6 drop-shadow-lg font-medium text-center max-w-4xl ${
          isDark ? 'text-white/90' : 'text-slate-800'
        }`}>
          An Exhilarating Journey Through an Empowering Ecosystem<br />
          Transforming Healthcare Experiences
        </p>
      </div>

      {/* Demo and Scroll Buttons - Bottom Center */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-6">        {/* Demo Button - Luxurious gold with red hover and black text */}
        <Button
          onClick={() => {
            setVideoLoading(true);
            setShowDemoModal(true);
          }}
          className="backdrop-blur-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-red-500 hover:via-red-600 hover:to-red-700 border-2 border-amber-400/70 hover:border-red-500/80 rounded-full px-8 py-4 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-red-500/30 pointer-events-auto text-black font-bold tracking-wide text-lg"
        >
          <Play className="w-6 h-6 mr-3" />
          <span>DEMO</span>
        </Button>        {/* Scroll Button - White in light mode, gold in dark mode */}
        <Button
          onClick={() => {
            if (scrollToSection) {
              scrollToSection(1); // Index 1 is Features section
            }
          }}
          className={`backdrop-blur-2xl border rounded-full px-6 py-4 transition-all duration-500 transform hover:scale-110 shadow-2xl animate-bounce pointer-events-auto ${
            isDark 
              ? 'bg-gradient-to-r from-amber-400/30 via-yellow-500/40 to-amber-600/30 hover:from-amber-500/40 hover:via-yellow-600/50 hover:to-amber-700/40 border-amber-400/30 hover:border-amber-500/50 hover:shadow-amber-500/30 text-amber-600 hover:text-amber-500'
              : 'bg-gradient-to-r from-white/60 via-white/80 to-white/60 hover:from-white/80 hover:via-white/90 hover:to-white/80 border-gray-300/50 hover:border-gray-400/70 hover:shadow-gray-500/20 text-black hover:text-gray-800'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
          <ChevronRight className="w-6 h-6 -ml-4" />
        </Button>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg pointer-events-auto">
          <div className={`relative max-w-4xl w-full mx-4 rounded-3xl overflow-hidden shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/95 to-black/95' 
              : 'bg-gradient-to-br from-white/95 to-gray-50/95'
          }`}>
            <Button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 z-10 bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 rounded-full p-2"
            >
              <X className="w-6 h-6 text-red-400" />
            </Button>
            
            <div className="p-8">
              <h2 className={`text-3xl font-bold mb-6 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                GLOHSEN Platform Demo
              </h2>
                {/* YouTube Video */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-black">
                {videoLoading && (
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
                <iframe
                  src="https://www.youtube.com/embed/n1hFZu3vLro?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1"
                  title="GLOHSEN Platform Demo Video"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setVideoLoading(false)}
                  onError={() => setVideoLoading(false)}
                />
              </div>
                {/* Blur Glassmorphism Close Button Below Video */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowDemoModal(false)}
                  className="backdrop-blur-xl bg-gradient-to-r from-red-500/20 via-red-600/30 to-red-700/20 hover:from-red-600/30 hover:via-red-700/40 hover:to-red-800/30 border-2 border-red-400/30 hover:border-red-500/50 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/30 text-red-400 hover:text-red-300 font-bold"
                >
                  <X className="w-5 h-5 mr-2" />
                  Close Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onClick={createRipple}
      >        <Canvas
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-[#ea384c] scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to ${section.title}`}
              title={section.title}
            />
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
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 opacity-70">
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
        <div className="fixed bottom-16 left-4 z-40 opacity-50">
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
