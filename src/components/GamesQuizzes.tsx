import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart, Eye, Target, Users, ChevronLeft, ChevronRight, Brain, Dna, Activity, HeartPulse, Pill, Syringe, Stethoscope } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useClickSound } from "../hooks/useClickSound";

// Enhanced Glassmorphism 3D Styles for Games & Quizzes
const GamesQuizzes3DStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .glassmorphism-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 
          0 25px 45px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .glassmorphism-card:hover {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(25px);
        transform: translateY(-8px) scale(1.02);
        box-shadow: 
          0 35px 60px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.3),
          0 0 50px rgba(220, 20, 60, 0.2);
      }
      
      .dark .glassmorphism-card {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 
          0 25px 45px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      
      .dark .glassmorphism-card:hover {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 
          0 35px 60px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 50px rgba(212, 175, 55, 0.3);
      }
      
      .parallax-3d {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .carousel-auto-rotate {
        animation: autoSlide 7s infinite linear;
      }
        @keyframes autoSlide {
        0% { transform: translateX(0); }
        25% { transform: translateX(-33.33%); }
        50% { transform: translateX(-66.66%); }
        75% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
      }
        @keyframes floatParallax {
        0%, 100% {
          transform: translateY(0px) rotateZ(0deg);
          opacity: 0.8;
        }
        50% {
          transform: translateY(-20px) rotateZ(180deg);
          opacity: 1;
        }
      }

      /* Shine animation for buttons */
      @keyframes shineLeft {
        0% {
          transform: translateX(-100%) skewX(-15deg);
        }
        100% {
          transform: translateX(200%) skewX(-15deg);
        }
      }

      .quiz-button-gold {
        background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1px solid #DAA520;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
      }

      .quiz-button-gold:hover {
        background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%);
        border-color: #DC143C;
        box-shadow: 0 6px 20px rgba(220, 20, 60, 0.4);
        transform: translateY(-2px);
      }

      .quiz-button-gold::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: all 0.5s;
      }

      .quiz-button-gold:hover::before {
        animation: shineLeft 0.6s ease-in-out;
      }

      .quiz-nav-button {
        background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
        border: 1px solid #DAA520;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .quiz-nav-button:hover {
        background: linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%);
        border-color: #DC143C;
        transform: scale(1.05);
      }

      .quiz-nav-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: all 0.5s;
      }

      .quiz-nav-button:hover::before {
        animation: shineLeft 0.6s ease-in-out;
      }      @media (prefers-reduced-motion: reduce) {
        .carousel-auto-rotate, .quiz-button-gold::before, .quiz-nav-button::before {
          animation: none;
        }
      }
    `
  }} />
);

const GamesQuizzes = ({ isActive = false, playClickSound }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);  const { isDark } = useTheme();
  const { playClick: contextPlayClickSound } = useClickSound();
  
  // Use the click sound from props or context
  const handleClick = () => {
    if (playClickSound) {
      playClickSound();
    } else if (contextPlayClickSound) {
      contextPlayClickSound();
    }
  };
    // New Medical Games Data
  const games = [
    {
      title: "ImmunoQuest",
      description: "Embark on an immune system adventure to understand how your body fights infections and diseases.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=500&q=80",
      color: "from-red-500 to-red-600",
      icon: Target,
      category: "Immunology",
      difficulty: "Intermediate",
      players: "12.5k+"
    },
    {
      title: "Ultrasound Quiz",
      description: "Master medical imaging interpretation with real ultrasound cases and diagnostic challenges.",
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-blue-600",
      icon: Eye,
      category: "Radiology",
      difficulty: "Advanced",
      players: "8.3k+"
    },
    {
      title: "Blood Group/Genotype Genetics Game",
      description: "Explore heredity patterns and genetic inheritance through interactive blood typing scenarios.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=500&q=80",
      color: "from-purple-500 to-purple-600",
      icon: Heart,
      category: "Genetics",
      difficulty: "Beginner",
      players: "15.7k+"
    },
    {
      title: "Neonatal Jaundice Quiz",
      description: "Learn to identify, assess, and manage newborn jaundice through clinical case studies.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=80",
      color: "from-amber-500 to-amber-600",
      icon: Users,
      category: "Pediatrics",
      difficulty: "Intermediate",
      players: "6.9k+"
    },
    {
      title: "ClotQuest",
      description: "Master the human clotting cascade through an interactive adventure game.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=500&q=80",
      color: "from-red-500 to-red-600",
      icon: Target,
      category: "Hematology",
      difficulty: "Advanced",
      players: "9.2k+"
    },
    {
      title: "DiagnosisDetective",
      description: "Put your diagnostic skills to the test with real-world medical mysteries.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=500&q=80",
      color: "from-amber-500 to-amber-600",
      icon: Eye,
      category: "Diagnostics",
      difficulty: "Expert",
      players: "7.8k+"
    },
    {
      title: "PharmFrenzy",
      description: "Race against time to match medications with the right conditions.",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-blue-600",
      icon: Users,
      category: "Pharmacology",
      difficulty: "Intermediate",
      players: "11.4k+"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % games.length);
    }, 7000); // 7 seconds auto-rotation

    return () => clearInterval(interval);
  }, [isActive, isPaused, games.length]);

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !cardsRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(cardsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.4"
      );
      }, []);
  const nextSlide = () => {
    handleClick();
    setCurrentSlide((prev) => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    handleClick();
    setCurrentSlide((prev) => (prev - 1 + games.length) % games.length);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative flex flex-col justify-start items-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}    >
      {/* Professional 3D Styles */}
      <GamesQuizzes3DStyles />

      <h2
        ref={titleRef}
        className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center z-10 relative px-2 sm:px-4"
      >
        <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
          GAMES & QUIZZES
        </span>
      </h2>      {/* Two Column Layout */}
      <div className="w-full max-w-7xl z-10 relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Professional Parallax Carousel */}
        <div className="parallax-3d">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            <span className={`bg-gradient-to-r ${isDark ? 'from-white via-gray-300 to-white' : 'from-black via-gray-800 to-black'} text-transparent bg-clip-text`}>
              Interactive Games
            </span>
          </h3>
          <div 
            ref={carouselRef}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <div 
              ref={cardsRef}
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {games.map((game, index) => {
                const IconComponent = game.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <Card className={`glassmorphism-card border-0 overflow-hidden cursor-pointer h-full shadow-xl hover:shadow-2xl ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      <div className="relative h-64 sm:h-80">
                        <div className={`absolute inset-0 bg-gradient-to-b ${game.color} opacity-70`}></div>
                        <img 
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Icon Overlay */}
                        <div className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button 
                            className="rounded-full w-16 h-16 p-0 bg-white/90 text-gray-800 hover:bg-white hover:scale-110 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                            onClick={handleClick}
                          >
                            <Play className="h-8 w-8 ml-1" />
                          </Button>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                            {game.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                        <p className="text-base mb-4 opacity-80">{game.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm opacity-70">4.8 ★★★★★</span>
                          <span className="text-sm px-3 py-1 rounded-full bg-gray-200/20 backdrop-blur-sm">
                            {game.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm opacity-70">{game.players} players</span>
                          <span className="text-sm opacity-70">Educational</span>
                        </div>                        <div className="grid grid-cols-3 gap-3">
                          <Link to="/games-quizzes" className="col-span-1">
                            <Button 
                              className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-sm py-2"
                              size="sm"
                              onClick={handleClick}
                            >
                              PLAY GAMES/QUIZ
                            </Button>
                          </Link>                        <Link to="/courses" className="col-span-1">
                            <Button 
                              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white text-sm py-2"
                              size="sm"
                              onClick={handleClick}
                            >
                              BUY COURSE
                            </Button>
                          </Link>
                          <Link to="/games-quizzes" className="col-span-1">
                            <Button 
                              variant="outline"
                              className="w-full text-sm py-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white backdrop-blur-sm"
                              size="sm"
                              onClick={handleClick}
                            >
                              EXPLORE ALL GAMES
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <Button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              variant="ghost"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>            <div className="flex space-x-2">
              {games.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleClick();
                    setCurrentSlide(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div><Button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
              variant="ghost"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>        {/* Column 2: Medical Quiz Carousel */}
        <div className="parallax-3d">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            <span className={`bg-gradient-to-r ${isDark ? 'from-white via-gray-300 to-white' : 'from-black via-gray-800 to-black'} text-transparent bg-clip-text`}>
              Medical Quizzes
            </span>
          </h3>
          <MedicalQuizCarousel playClickSound={playClickSound} />
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-8 max-w-7xl text-center">
        <p className={`mb-6 text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Experience the future of medical education with our immersive learning platform featuring cutting-edge games, professional courses, and comprehensive career support.
        </p>
      </div>
    </div>
  );
};

// Medical Quiz Carousel Component
const MedicalQuizCarousel = ({ playClickSound }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const { playClick: contextPlayClickSound } = useClickSound();
  
  // Use the click sound from props or context
  const handleClick = () => {
    if (playClickSound) {
      playClickSound();
    } else if (contextPlayClickSound) {
      contextPlayClickSound();
    }
  };

  // Quiz/Game Data Types
  interface QuizOption {
    id: string;
    text: string;
    correct: boolean;
  }

  interface QuizItem {
    id: string;
    type: "question" | "game";
    title: string;
    specialty: string;
    icon: React.ReactNode;
    color: string;
    content?: string;
    description?: string;
    options?: QuizOption[];
    difficulty?: "beginner" | "intermediate" | "advanced";
    timeLimit?: number;
    points?: number;
  }

  function interleaveQuizGame(items: QuizItem[]) {
    const quizzes = items.filter(i => i.type === "question");
    const games = items.filter(i => i.type === "game");
    const maxLen = Math.max(quizzes.length, games.length);
    const mixed: QuizItem[] = [];
    for (let i = 0; i < maxLen; i++) {
      if (quizzes[i]) mixed.push(quizzes[i]);
      if (games[i]) mixed.push(games[i]);
    }
    return mixed;
  }

  const quizItems: QuizItem[] = [
    {
      id: "ethics-quiz",
      type: "question",
      title: "Ethics in Medicine",
      specialty: "Medical Ethics",
      icon: <Brain className="h-6 w-6" />,
      color: "#D4AF37",
      content: "What is the correct approach when facing a conflict of interest in patient care?",
      description: "Test your knowledge of ethical principles in healthcare settings",
      options: [
        { id: "a", text: "Disclose the conflict and recuse yourself", correct: true },
        { id: "b", text: "Ignore the conflict", correct: false },
        { id: "c", text: "Let a colleague decide", correct: false }
      ]
    },
    {
      id: "clot-quest",
      type: "game",
      title: "CLOTQuest",
      specialty: "Hematology",
      icon: <Heart className="h-6 w-6" />,
      color: "#B22222",
      description: "Interactive game about blood clotting mechanisms and disorders"
    },
    {
      id: "infectious-diseases",
      type: "question",
      title: "Infectious Disease Challenge",
      specialty: "Infectious Diseases",
      icon: <Dna className="h-6 w-6" />,
      color: "#2C7873",
      content: "Which of the following is NOT typically a vector-borne disease?",
      description: "Test your knowledge of pathogens and disease transmission",
      options: [
        { id: "a", text: "Malaria", correct: false },
        { id: "b", text: "Tuberculosis", correct: true },
        { id: "c", text: "Dengue", correct: false }
      ]
    },
    {
      id: "fracture-fury",
      type: "game",
      title: "Fracture Fury",
      specialty: "Orthopedics",
      icon: <Activity className="h-6 w-6" />,
      color: "#6B5B95",
      description: "Interactive game to identify fracture types and appropriate treatments"
    },
    {
      id: "bls-quiz",
      type: "question",
      title: "BLS Knowledge Check",
      specialty: "Basic Life Support",
      icon: <HeartPulse className="h-6 w-6" />,
      color: "#F28C28",
      content: "What is the correct compression depth for adult CPR according to current guidelines?",
      description: "Essential knowledge for all healthcare professionals",
      options: [
        { id: "a", text: "At least 2 inches (5 cm)", correct: true },
        { id: "b", text: "Less than 1 inch (2.5 cm)", correct: false },
        { id: "c", text: "More than 4 inches (10 cm)", correct: false }
      ]
    },
    {
      id: "immunology-invasion",
      type: "game",
      title: "Immunology Invasion",
      specialty: "Immunology",
      icon: <Pill className="h-6 w-6" />,
      color: "#4C243B",
      description: "Guide immune cells to fight pathogens in this interactive game"
    },
    {
      id: "acls-scenarios",
      type: "question",
      title: "ACLS Scenarios",
      specialty: "Advanced Cardiac Life Support",
      icon: <Activity className="h-6 w-6" />,
      color: "#FF6B6B",
      content: "In a patient with pulseless VT, what is the recommended first-line medication?",
      description: "Critical thinking in cardiac emergencies",
      options: [
        { id: "a", text: "Epinephrine", correct: false },
        { id: "b", text: "Amiodarone", correct: true },
        { id: "c", text: "Aspirin", correct: false }
      ]
    },
    {
      id: "covid-conqueror",
      type: "game",
      title: "COVID Conqueror",
      specialty: "Infectious Disease",
      icon: <Syringe className="h-6 w-6" />,
      color: "#609",
      description: "Navigate through pandemic response scenarios in this educational game"
    },
    {
      id: "communication-quiz",
      type: "question",
      title: "Patient Communication",
      specialty: "Healthcare Communication",
      icon: <Stethoscope className="h-6 w-6" />,
      color: "#388E3C",
      content: "Which approach is most effective when delivering difficult news to patients?",
      description: "Enhance your patient interaction skills",
      options: [
        { id: "a", text: "Be direct, use medical jargon", correct: false },
        { id: "b", text: "Use empathy and clear language", correct: true },
        { id: "c", text: "Let the patient guess", correct: false }
      ]
    }
  ];
  const [items] = useState<QuizItem[]>(() => interleaveQuizGame(quizItems));
  const nextItem = () => {
    handleClick();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevItem = () => {
    handleClick();
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Silent autoplay function that doesn't trigger click sounds
  const autoNextItem = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  // Autoplay with accessibility pause - using silent function to prevent continuous clicking sounds
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const timer = setInterval(autoNextItem, 15000);
    return () => clearInterval(timer);
  }, [autoplayEnabled, items.length]);
  const handleQuizStart = (item: QuizItem) => {
    handleClick();
    navigate(`/courses#${item.id}`);
  };

  const handleGameStart = (item: QuizItem) => {
    handleClick();
    navigate(`/courses#${item.id}`);
  };

  return (
    <div 
      className="relative max-w-4xl mx-auto px-2 py-8" 
      style={{ marginTop: "-10px" }}
      role="region"
      aria-label="Quiz and Game Carousel"
    >
      {/* Accessibility controls */}
      <div className="sr-only">
        <button onClick={() => setAutoplayEnabled(!autoplayEnabled)}>
          {autoplayEnabled ? "Pause" : "Play"} automatic rotation
        </button>
      </div>      {/* Carousel controls */}
      <div className="flex items-center justify-center mb-6 gap-2">
        <Button
          variant="outline"
          className="quiz-nav-button rounded-full p-2 text-white flex-shrink-0"
          onClick={prevItem}
          aria-label="Previous item"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Carousel */}
        <div
          className="relative flex-1 min-h-[208px] md:min-h-[256px] flex items-stretch justify-center"
          ref={carouselRef}
          style={{ height: "25.6vh", maxHeight: 272, marginBottom: "56px" }}
          role="listbox"
          aria-label="Quiz and game items"
        >
          <div className="relative w-full h-full flex items-center justify-center">            {items.map((item, index) => (
              <Card
                key={item.id}
                className={`transition-all duration-500 ease-in-out w-[53vw] max-w-md h-[26.9vh] max-h-[250px] p-5 flex flex-col items-center justify-between text-center border-2 hover:shadow-lg cursor-pointer
                  ${index === activeIndex ? "z-20 opacity-100" : "z-10 opacity-0 pointer-events-none"}
                  ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                style={{
                  borderColor: item.color + "40",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}                onClick={() => {
                  handleClick();
                  setActiveIndex(index);
                }}
                role="option"
                aria-selected={index === activeIndex}
                tabIndex={index === activeIndex ? 0 : -1}
              >
                <div
                  className="rounded-full p-2 mb-2"
                  style={{ backgroundColor: item.color + "20" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div className="space-y-1 flex-grow flex flex-col justify-center max-w-xs mx-auto">
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{item.specialty}</p>                  {/* Quiz content */}
                  {item.type === "question" && item.content && index === activeIndex && (
                    <div role="group" aria-label="Quiz options">
                      <p className={`text-xs mt-1 font-medium p-2 rounded ${
                        isDark 
                          ? 'text-gray-200 bg-gray-700' 
                          : 'text-gray-700 bg-gray-50'
                      }`}>
                        {item.content}
                      </p>                      <div className="mt-2 flex flex-col gap-1">
                        {(item.options || []).map((option) => (
                          <button
                            key={option.id}
                            className="quiz-button-gold w-full px-3 py-2 rounded text-black font-semibold transition-all text-xs"
                            onClick={() => {
                              handleClick();
                              handleQuizStart(item);
                            }}
                            aria-label={`Select answer: ${option.text}`}
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}                  {/* Game description */}
                  {item.type === "game" && item.description && (
                    <div className="flex flex-col flex-1 justify-center">
                      <p className={`text-xs mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>                      {index === activeIndex && (
                        <button
                          className="quiz-button-gold px-5 py-2 rounded text-black text-sm font-medium transition-all"
                          onClick={() => {
                            handleClick();
                            handleGameStart(item);
                          }}
                          aria-label={`Start game: ${item.title}`}
                        >
                          Play Game/Quiz
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>        <Button
          variant="outline"
          className="quiz-nav-button rounded-full p-2 text-white flex-shrink-0"
          onClick={nextItem}
          aria-label="Next item"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>      {/* Navigation dots */}
      <div 
        className="flex justify-center mt-4 space-x-2"
        role="tablist"
        aria-label="Carousel navigation"
      >        {items.map((item, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-[#D4AF37] w-4" : "bg-gray-300"
            }`}
            onClick={() => {
              handleClick();
              setActiveIndex(index);
            }}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to item ${index + 1}: ${item.title}`}
          />
        ))}
      </div>      {/* Gold Action Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <Link to="/games-quizzes">
          <button 
            className="quiz-button-gold px-6 py-3 rounded-lg text-black font-semibold text-sm transition-all"
            onClick={handleClick}
          >
             PLAY GAME/QUIZ
           </button>
         </Link>
         <Link to="/courses">
          <button 
            className="quiz-button-gold px-6 py-3 rounded-lg text-black font-semibold text-sm transition-all"
            onClick={handleClick}
          >
             BUY COURSE
           </button>
         </Link>
      </div>
    </div>
  );
};

export default GamesQuizzes;
