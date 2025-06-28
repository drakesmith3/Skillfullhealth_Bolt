import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "../contexts/ThemeContext";
import { useSound } from "../contexts/SoundContext";
import FloatingActionButtons from "../components/FloatingActionButtons";
import PreHeader from "../components/PreHeader";
import Footer from "../components/Footer";
import { 
  Play, 
  Trophy, 
  Star, 
  Timer, 
  Brain, 
  Heart, 
  Stethoscope, 
  Target, 
  Shield, 
  Users, 
  Zap, 
  Crown, 
  Gem, 
  X, 
  Lock, 
  Unlock, 
  CheckCircle, 
  Gamepad2, 
  Sparkles,
  Award,
  TrendingUp,
  Medal,
  Calendar,
  UserCheck,
  Flame,
  RotateCcw,
  Microscope,
  Pill,
  Droplets,
  Bone,
  Beaker,
  CircuitBoard,
  Activity,
  Hexagon,
  FlaskConical,
  ArrowRight,
  ChevronRight,
  Gift,
  Clock,
  Badge,
  Eye,
  TestTube,
  Atom,
  Waves,
  Building,
  Fingerprint,
  Percent,
  FlaskRound,
  Dna,  UserPlus,
  Share2,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  ShoppingCart,
  TrendingUp as Fire,
  CheckCircle2,
  Zap as Lightning,
  Globe,
  BookOpen,
  GraduationCap,  Filter,
  Scale,
  Bug
} from "lucide-react";

// Import sound and social utilities
import { soundManager, playClick, playWhoosh, playAmbient, stopAmbient } from "../utils/soundUtils";
import { socialManager, Friend, Message, FriendRequest } from "../utils/socialUtils";
import { gameMusicManager, playGameMusic, stopGameMusic } from "../utils/gameMusicUtils";

// Enhanced interfaces for leaderboard and social features
interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
  rank: number;
  streak: number;
  badges: string[];
}

interface SocialActivity {
  id: string;
  friendName: string;
  avatar: string;
  game: string;
  action: string;
  timeAgo: string;
  score?: number;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  prize: string;
  participants: number;
  timeLeft: string;
  type: 'weekly' | 'monthly';
}

interface RecommendedGame {
  id: string;
  title: string;
  reason: string;
  difficulty: string;
  estimatedTime: string;
  isNew: boolean;
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

// Enhanced Game Interface with additional stats
interface EnhancedGame {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  difficulty: string;
  students: string;
  rating: number;
  estimatedTime: string;
  category: string;
  isNew: boolean;
  featured: boolean;
  tags: string[];
  // New enhanced features
  courseField: string;
  completionRate: number;
  isLive?: boolean;
  hotStreak?: number;
  timeToComplete: string;
  ratingSystem: {
    stars: number;
    thumbsUp: number;
    thumbsDown: number;
    doubleThumbsUp: number;
  };
  buyCoursePrice?: string;
  courseTier: 'free' | 'premium' | 'pro';
}

// Theme interface
interface Theme {
  isDarkMode: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
  theme: string;
  advisor: string;
}

interface DiagnosisLevel {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master' | 'Legend';
  syndrome: string;
  symptoms: string[];
  signs: string[];
  differentials: string[];
  correctDiagnosis: string;
  explanation: string;
  points: number;
  unlocked: boolean;
  completed: boolean;
  timeLimit: number; // in seconds
}

interface GameProgress {
  level: number;
  score: number;
  streak: number;
  boosters: {
    timeFreeze: number;
    eliminateTwo: number;
    askExpert: number;
    doublePoints: number;
  };
  achievements: string[];
}

interface GameState {
  currentLevel: DiagnosisLevel | null;
  gameProgress: GameProgress;
  timeRemaining: number;
  selectedAnswers: string[];
  showResults: boolean;
  isPlaying: boolean;
}

// Comprehensive games and quizzes data with enhanced features
const allGamesAndQuizzes: EnhancedGame[] = [
  {
    id: "diagnosis-detective",
    title: "Diagnosis Detective",
    description: "Master the art of medical diagnosis through challenging clinical cases",
    icon: Brain,
    color: "from-purple-600 to-indigo-600",
    difficulty: "Expert",
    students: "15.2k",
    rating: 4.9,
    estimatedTime: "45 min",
    category: "Diagnosis",
    isNew: false,
    featured: true,
    tags: ["Clinical", "Diagnosis", "Cases"],
    courseField: "Internal Medicine",
    completionRate: 87,
    isLive: true,
    hotStreak: 12,
    timeToComplete: "45m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 1247,
      thumbsDown: 23,
      doubleThumbsUp: 342
    },
    buyCoursePrice: "$49.99",
    courseTier: "premium"
  },
  {
    id: "clotquest",
    title: "ClotQuest",
    description: "Navigate the complex world of blood coagulation and hemostasis",
    icon: Droplets,
    color: "from-red-500 to-rose-600",
    difficulty: "Advanced",
    students: "8.7k",
    rating: 4.8,
    estimatedTime: "30 min",
    category: "Hematology",
    isNew: false,
    featured: false,
    tags: ["Blood", "Coagulation", "Lab"],
    courseField: "Hematology",
    completionRate: 92,
    hotStreak: 8,
    timeToComplete: "30m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 892,
      thumbsDown: 14,
      doubleThumbsUp: 203
    },
    buyCoursePrice: "$39.99",
    courseTier: "premium"
  },
  {
    id: "know-human-body",
    title: "Know The Human Body",
    description: "Comprehensive anatomy and physiology exploration game",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    difficulty: "Beginner",
    students: "12.3k",
    rating: 4.7,
    estimatedTime: "25 min",
    category: "Anatomy",
    isNew: false,
    featured: false,
    tags: ["Anatomy", "Physiology", "Basic"],
    courseField: "Anatomy & Physiology",
    completionRate: 95,
    timeToComplete: "25m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 1156,
      thumbsDown: 31,
      doubleThumbsUp: 287
    },
    courseTier: "free"
  },  {
    id: "immunoquest",
    title: "ImmunoQuest",
    description: "Explore the immune system and immunological responses",
    icon: Shield,
    color: "from-red-500 to-red-600",
    difficulty: "Advanced",
    students: "7.8k",
    rating: 4.9,
    estimatedTime: "50 min",
    category: "Immunology",
    isNew: true,
    featured: true,
    tags: ["Immunity", "Immunology", "Defense"],
    courseField: "Immunology",
    completionRate: 89,
    isLive: true,
    hotStreak: 15,
    timeToComplete: "50m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 743,
      thumbsDown: 12,
      doubleThumbsUp: 198
    },
    buyCoursePrice: "$59.99",
    courseTier: "pro"
  },
  {
    id: "pharmfrenzy",
    title: "PharmFrenzy",
    description: "Master pharmacology, drug interactions, and therapeutic protocols",
    icon: Pill,
    color: "from-teal-500 to-blue-600",
    difficulty: "Expert",
    students: "11.7k",
    rating: 4.8,
    estimatedTime: "45 min",
    category: "Pharmacology",
    isNew: false,
    featured: true,
    tags: ["Drugs", "Pharmacology", "Therapy"],
    courseField: "Pharmacology",
    completionRate: 82,
    hotStreak: 9,
    timeToComplete: "45m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 1034,
      thumbsDown: 28,
      doubleThumbsUp: 267
    },
    buyCoursePrice: "$47.99",
    courseTier: "premium"
  },
  {
    id: "human-dna-helical-mystery",
    title: "Human DNA Helical Mystery",
    description: "Explore molecular genetics and DNA structure in this interactive mystery",
    icon: Dna,
    color: "from-green-500 to-emerald-600",
    difficulty: "Expert",
    students: "4.6k",
    rating: 4.9,
    estimatedTime: "55 min",
    category: "Molecular Biology",
    isNew: true,
    featured: true,
    tags: ["DNA", "Molecular", "Genetics"],
    courseField: "Molecular Biology",
    completionRate: 76,
    isLive: true,
    hotStreak: 18,
    timeToComplete: "55m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 423,
      thumbsDown: 8,
      doubleThumbsUp: 89
    },    buyCoursePrice: "$62.99",
    courseTier: "pro"
  },
  {
    id: "cardiology-mastery-quiz",
    title: "Cardiology Mastery Quiz",
    description: "Comprehensive cardiovascular medicine assessment and advanced cardiac diagnostics",
    icon: Heart,
    color: "from-red-500 to-pink-600",
    difficulty: "Expert",
    students: "9.2k",
    rating: 4.8,
    estimatedTime: "40 min",
    category: "Cardiology",
    isNew: false,
    featured: false,
    tags: ["Heart", "ECG", "Cardiology"],
    courseField: "Cardiology",
    completionRate: 84,
    hotStreak: 11,
    timeToComplete: "40m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 892,
      thumbsDown: 23,
      doubleThumbsUp: 156
    },
    buyCoursePrice: "$49.99",
    courseTier: "premium"
  },
  {
    id: "ultrasound-quiz",
    title: "Ultrasound Quiz",
    description: "Master medical imaging and sonographic interpretation skills",
    icon: Activity,
    color: "from-blue-500 to-cyan-600",
    difficulty: "Advanced",
    students: "6.8k",
    rating: 4.6,
    estimatedTime: "35 min",
    category: "Radiology",
    isNew: false,
    featured: false,
    tags: ["Imaging", "Ultrasound", "Diagnostics"],
    courseField: "Radiology",
    completionRate: 88,
    timeToComplete: "35m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 654,
      thumbsDown: 19,
      doubleThumbsUp: 123
    },
    buyCoursePrice: "$39.99",
    courseTier: "premium"
  },
  {
    id: "infectious-disease-wars",
    title: "Infectious Disease Wars",
    description: "Battle pathogens and master antimicrobial strategies in this epic medical warfare game",
    icon: Shield,
    color: "from-orange-500 to-red-600",
    difficulty: "Advanced",
    students: "8.1k",
    rating: 4.7,
    estimatedTime: "45 min",
    category: "Infectious Disease",
    isNew: true,
    featured: false,
    tags: ["Pathogens", "Antibiotics", "Infection"],
    courseField: "Infectious Disease",
    completionRate: 82,
    hotStreak: 9,
    timeToComplete: "45m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 738,
      thumbsDown: 15,
      doubleThumbsUp: 167
    },
    buyCoursePrice: "$44.99",
    courseTier: "premium"
  },
  {
    id: "ethics-simulator",
    title: "Ethics Simulator",
    description: "Navigate complex medical ethical dilemmas and develop moral reasoning skills",
    icon: Scale,
    color: "from-purple-500 to-indigo-600",
    difficulty: "Intermediate",
    students: "5.4k",
    rating: 4.5,
    estimatedTime: "30 min",
    category: "Medical Ethics",
    isNew: false,
    featured: false,
    tags: ["Ethics", "Philosophy", "Decision Making"],
    courseField: "Medical Ethics",
    completionRate: 91,
    timeToComplete: "30m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 512,
      thumbsDown: 12,
      doubleThumbsUp: 98
    },
    buyCoursePrice: "$29.99",
    courseTier: "premium"
  },
  {
    id: "covid-19-chronicles",
    title: "COVID-19 Chronicles",
    description: "Learn pandemic response, virology, and public health management through interactive scenarios",
    icon: Bug,
    color: "from-yellow-500 to-orange-600",
    difficulty: "Intermediate",
    students: "11.3k",
    rating: 4.6,
    estimatedTime: "35 min",
    category: "Public Health",
    isNew: false,
    featured: false,
    tags: ["COVID-19", "Pandemic", "Public Health"],
    courseField: "Public Health",
    completionRate: 89,
    timeToComplete: "35m",
    ratingSystem: {
      stars: 5,
      thumbsUp: 1087,
      thumbsDown: 28,
      doubleThumbsUp: 234
    },
    buyCoursePrice: "$34.99",
    courseTier: "premium"
  }
];

// Mock data for sidebar features
const leaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "👩‍⚕️",
    score: 15420,
    level: 42,
    rank: 1,
    streak: 15,
    badges: ["🏆", "🧬", "💉"]
  },
  {
    id: "2", 
    name: "Dr. Marcus Johnson",
    avatar: "👨‍⚕️",
    score: 14850,
    level: 38,
    rank: 2,
    streak: 12,
    badges: ["🏅", "🔬", "💊"]
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    avatar: "👩‍⚕️",
    score: 14200,
    level: 35,
    rank: 3,
    streak: 8,
    badges: ["🥉", "🫀", "🩺"]
  }
];

const socialActivities: SocialActivity[] = [
  {
    id: "1",
    friendName: "Dr. Alex Kumar",
    avatar: "👨‍⚕️",
    game: "ClotQuest",
    action: "achieved high score",
    timeAgo: "2 minutes ago",
    score: 2850
  },
  {
    id: "2",
    friendName: "Dr. Maria Santos",
    avatar: "👩‍⚕️",
    game: "Diagnosis Detective",
    action: "completed level 5",
    timeAgo: "5 minutes ago"
  }
];

const competitions: Competition[] = [
  {
    id: "1",
    title: "Weekly Diagnosis Challenge",
    description: "Compete in rapid diagnosis scenarios",
    prize: "🏆 Premium Course Access",
    participants: 1247,
    timeLeft: "2d 14h",
    type: "weekly"
  }
];

const recommendedGames: RecommendedGame[] = [
  {
    id: "immunoquest",
    title: "ImmunoQuest",
    reason: "Based on your interest in Hematology",
    difficulty: "Advanced",
    estimatedTime: "50 min",
    isNew: true
  }
];

const userBadges: UserBadge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first game",
    icon: "🎯",
    earned: true,
    earnedDate: "2024-06-20"
  },
  {
    id: "2",
    name: "Diagnosis Master",
    description: "Perfect score in Diagnosis Detective",
    icon: "🧠", 
    earned: true,
    earnedDate: "2024-06-22"
  },
  {
    id: "3",
    name: "Speed Demon",
    description: "Complete a game in under 10 minutes",
    icon: "⚡",
    earned: false
  }
];

const GamesAndQuizzes = () => {
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'selector' | 'diagnosis' | 'quiz'>('selector');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use global sound context
  const { playClickSound, isSoundEnabled } = useSound();
  
  // Social state
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  
  // Use the existing theme context
  const { isDark, theme } = useTheme();
    // Define theme configurations based on the theme context
  const lightTheme: Theme = {
    isDarkMode: false,
    colors: {
      primary: "from-red-400 via-amber-500 to-red-600",
      secondary: "from-yellow-300 to-amber-400",
      accent: "from-orange-400 to-red-500",
      background: "from-amber-50 via-yellow-50 to-orange-50",
      surface: "from-white/80 to-yellow-50/80",
      text: "text-gray-900",
      textSecondary: "text-gray-700",
      border: "border-amber-200/50"
    }
  };

  const darkTheme: Theme = {
    isDarkMode: true,
    colors: {
      primary: "from-red-500 via-yellow-400 to-red-600",
      secondary: "from-red-900/30 to-yellow-900/30",
      accent: "from-yellow-400/50 to-red-500/50",
      background: "from-black via-red-950 to-black",
      surface: "from-red-900/30 via-black/50 to-yellow-900/30",
      text: "text-white",
      textSecondary: "text-gray-300",
      border: "border-red-500/30"
    }
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  // Get unique categories from games
  const categories = ['All', ...Array.from(new Set(allGamesAndQuizzes.map(game => game.courseField)))];
  
  // Filter games by category and search query
  const filteredGames = allGamesAndQuizzes.filter(game => {
    const categoryMatch = selectedCategory === 'All' || game.courseField === selectedCategory;
    const searchMatch = searchQuery === '' || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      game.courseField.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleStartQuiz = (quizId: string) => {
    setCurrentQuizId(quizId);
    setGameMode('quiz');
  };

  // Enhanced Game Card Component
  const GameCard = ({ game, index, featured = false }: { game: EnhancedGame; index: number; featured?: boolean }) => (
    <motion.div
      key={game.id}      className={`group relative overflow-hidden ${
        featured ? 'rounded-3xl' : 'rounded-2xl'
      } bg-gradient-to-br ${currentTheme.colors.surface} backdrop-blur-xl border ${
        isDark ? currentTheme.colors.border : 'border-yellow-600/60'
      } ${
        featured ? 'p-6' : 'p-5'
      } hover:border-yellow-400/50 transition-all duration-500`}
      whileHover={{ scale: featured ? 1.05 : 1.03, y: featured ? -10 : -5 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: featured ? 0.6 : 0.5, delay: (featured ? 0.4 : 0.7) + (index % 12) * 0.05 }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`${featured ? 'w-12 h-12' : 'w-10 h-10'} rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center`}>
            <game.icon className={`${featured ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
          </div>
          <div className="flex items-center gap-2">
            {featured && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">
                FEATURED
              </span>
            )}
            {game.isNew && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 font-semibold">
                NEW
              </span>
            )}
            {game.isLive && (
              <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                LIVE
              </div>
            )}
          </div>
        </div>

        {/* Course Field Badge */}
        <div className="mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">
            {game.courseField}
          </span>
        </div>

        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold ${currentTheme.colors.text} mb-2 group-hover:text-yellow-400 transition-colors`}>
          {game.title}
        </h3>
        
        <p className={`${currentTheme.colors.textSecondary} mb-4 text-sm leading-relaxed ${featured ? '' : 'line-clamp-2'}`}>
          {game.description}
        </p>        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`${isDark ? 'bg-black/20' : 'bg-white/40'} rounded-lg p-2 text-center`}>
            <div className="text-green-400 font-bold text-sm">{game.completionRate}%</div>
            <div className={`${currentTheme.colors.textSecondary} text-xs`}>Completion</div>
          </div>
          <div className={`${isDark ? 'bg-black/20' : 'bg-white/40'} rounded-lg p-2 text-center`}>
            <div className="text-yellow-400 font-bold text-sm">{game.timeToComplete}</div>
            <div className={`${currentTheme.colors.textSecondary} text-xs`}>Duration</div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {game.students}
            </div>
            {game.hotStreak && (
              <div className="flex items-center gap-1 text-orange-400">
                <Fire className="w-3 h-3" />
                {game.hotStreak}
              </div>
            )}
          </div>          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleRatingClick(game.id, 'star')}
                className="hover:scale-125 transition-transform"
              >
                <Star className={`w-3 h-3 ${i < Math.floor(game.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
              </button>
            ))}
            <span className="text-xs text-gray-400 ml-1">{game.rating}</span>
          </div>
        </div>        {/* Rating System */}
        <div className={`flex items-center justify-between mb-4 p-2 ${isDark ? 'bg-black/10' : 'bg-white/20'} rounded-lg`}>
          <div className="flex items-center gap-3 text-xs">
            <button 
              onClick={() => handleRatingClick(game.id, 'thumbsUp')}
              className="flex items-center gap-1 hover:scale-110 transition-transform"
            >
              <ThumbsUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400">{game.ratingSystem.thumbsUp}</span>
            </button>
            <button 
              onClick={() => handleRatingClick(game.id, 'thumbsDown')}
              className="flex items-center gap-1 hover:scale-110 transition-transform"
            >
              <ThumbsDown className="w-3 h-3 text-red-400" />
              <span className="text-red-400">{game.ratingSystem.thumbsDown}</span>
            </button>
            <div className="flex items-center gap-1">
              <Lightning className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400">{game.ratingSystem.doubleThumbsUp}</span>
            </div>
          </div>
          <div className={`text-xs px-2 py-1 rounded font-medium ${
            game.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            game.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            game.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {game.difficulty}
          </div>
        </div>        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => handleCardClick(game.id)}
            className={`flex-1 bg-gradient-to-r ${game.color} px-4 py-3 rounded-xl font-semibold text-white shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              PLAY NOW
            </div>
          </motion.button>          {game.courseTier !== 'free' && (
            <motion.button
              onClick={(e) => handleBuyCourseClick(e, game.id)}
              className="px-4 py-3 border border-yellow-400/50 rounded-xl font-semibold text-yellow-400 hover:bg-yellow-400/10 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              BUY COURSE
            </motion.button>
          )}
        </div>

        {/* Course Tier Indicator */}
        <div className="mt-2 text-center">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            game.courseTier === 'free' ? 'bg-green-500/20 text-green-400' :
            game.courseTier === 'premium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {game.courseTier.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
  const renderMainGamePage = () => (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.background} relative overflow-hidden`}>
      {/* PreHeader */}
      <PreHeader currentPage="Games & Quizzes" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-bounce"></div>
      </div>      <div className="relative z-10 min-h-screen flex">
        {/* Main Content Area */}
        <div className="flex-1 lg:pr-80">
          <div className="container mx-auto px-4 py-8 pt-24">
            {/* Header Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.h1 
                  className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${currentTheme.colors.primary} bg-clip-text text-transparent`}
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  MEDICAL GAMES & QUIZZES
                </motion.h1>
  
              </div>
              
              <motion.p 
                className={`text-xl md:text-2xl ${currentTheme.colors.textSecondary} max-w-4xl mx-auto leading-relaxed`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Master medical knowledge through interactive gaming • Compete globally • Unlock achievements
              </motion.p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div 
              className="mb-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Search Input */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search games, quizzes, and topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl text-lg ${
                      isDark 
                        ? 'bg-gray-800/50 text-white border-gray-600/50 placeholder-gray-400' 
                        : 'bg-white/80 text-gray-900 border-gray-300/50 placeholder-gray-500'
                    } border-2 focus:border-red-500 focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-red-500/20' : 'bg-red-100'}`}>
                      <BookOpen className="w-5 h-5 text-red-500" />
                    </div>
                  </div>
                </div>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 text-sm ${currentTheme.colors.textSecondary} text-center`}
                  >
                    Found {filteredGames.length} result{filteredGames.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </motion.div>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Filter className={`w-5 h-5 ${currentTheme.colors.text}`} />
                <span className={`text-lg font-semibold ${currentTheme.colors.text}`}>Filter by Course Field:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (isSoundEnabled) playClickSound();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${currentTheme.colors.primary} text-white shadow-lg`
                        : isDark 
                          ? 'bg-red-900/30 text-gray-300 hover:bg-red-700/30 hover:text-white'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Featured Games Carousel */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
                <Flame className="w-8 h-8" />
                FEATURED GAMES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.filter(game => game.featured).map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} featured={true} />
                ))}
              </div>
            </motion.div>

            {/* All Games Grid */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-yellow-400 flex items-center gap-3">
                  <Gamepad2 className="w-8 h-8" />
                  ALL GAMES & QUIZZES
                  <span className={`text-lg ${currentTheme.colors.textSecondary}`}>
                    ({filteredGames.length} games)
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>        {/* Right Sidebar with Theme-aware styling */}
        <div className={`fixed right-0 top-0 w-80 h-screen bg-gradient-to-b ${
          isDark 
            ? 'from-black/90 via-red-950/90 to-black/90' 
            : 'from-amber-50/95 via-yellow-50/95 to-orange-50/95'        } backdrop-blur-xl border-l ${currentTheme.colors.border} overflow-y-auto z-50 hidden lg:block`}>
          <div className="p-6 space-y-6 pt-24">
            {/* User Stats Card */}
            <motion.div 
              className={`bg-gradient-to-br ${currentTheme.colors.surface} backdrop-blur-xl border ${currentTheme.colors.border} rounded-2xl p-4`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentTheme.colors.primary} rounded-full flex items-center justify-center`}>
                  <span className="text-xl">👨‍⚕️</span>
                </div>
                <div>
                  <div className={`${currentTheme.colors.text} font-bold`}>Dr. Student</div>
                  <div className={`${currentTheme.colors.textSecondary} text-sm`}>Level 25 • 12,450 XP</div>
                </div>
              </div>              <div className="grid grid-cols-3 gap-3 text-center">
                <div className={`${isDark ? 'bg-black/20' : 'bg-white/40'} rounded-lg p-2`}>
                  <div className="text-yellow-400 font-bold text-lg">42</div>
                  <div className={`${currentTheme.colors.textSecondary} text-xs`}>Games Won</div>
                </div>
                <div className={`${isDark ? 'bg-black/20' : 'bg-white/40'} rounded-lg p-2`}>
                  <div className="text-red-400 font-bold text-lg">15</div>
                  <div className={`${currentTheme.colors.textSecondary} text-xs`}>Streak</div>
                </div>
                <div className={`${isDark ? 'bg-black/20' : 'bg-white/40'} rounded-lg p-2`}>
                  <div className={`${currentTheme.colors.text} font-bold text-lg`}>#847</div>
                  <div className={`${currentTheme.colors.textSecondary} text-xs`}>Rank</div>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div 
              className={`bg-gradient-to-br ${currentTheme.colors.surface} backdrop-blur-xl border ${currentTheme.colors.border} rounded-2xl p-4`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className={`${currentTheme.colors.text} font-bold`}>Leaderboard</h3>
              </div>
              <div className="space-y-2">
                {leaderboardData.map((entry) => (
                  <motion.div
                    key={entry.id}                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      isDark ? 'bg-black/20 hover:bg-black/30' : 'bg-white/30 hover:bg-white/50'
                    } transition-colors`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500 text-black' :
                      entry.rank === 2 ? 'bg-gray-400 text-black' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="text-lg">{entry.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`${currentTheme.colors.text} text-sm font-medium truncate`}>{entry.name}</div>
                      <div className={`${currentTheme.colors.textSecondary} text-xs`}>Level {entry.level} • {entry.score.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 text-xs">{entry.streak}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>            {/* Active Competitions */}
            <motion.div 
              className={`bg-gradient-to-br ${isDark ? 'from-purple-900/20 to-blue-900/20' : 'from-purple-100/80 to-blue-100/80'} backdrop-blur-xl border ${isDark ? 'border-purple-500/30' : 'border-purple-300/50'} rounded-2xl p-4`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Medal className="w-5 h-5 text-purple-400" />
                <h3 className={`${currentTheme.colors.text} font-bold`}>Competitions</h3>
              </div>
              <div className="space-y-3">
                {competitions.map((comp) => (
                  <motion.div
                    key={comp.id}
                    className={`${isDark ? 'bg-black/20 hover:bg-black/30' : 'bg-white/30 hover:bg-white/50'} rounded-lg p-3 transition-colors cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`${currentTheme.colors.text} font-medium text-sm`}>{comp.title}</div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        comp.type === 'weekly' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {comp.type}
                      </div>
                    </div>
                    <div className={`${currentTheme.colors.textSecondary} text-xs mb-2`}>{comp.description}</div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className={currentTheme.colors.textSecondary}>{comp.participants.toLocaleString()}</span>
                      </div>
                      <div className="text-yellow-400 font-medium">{comp.timeLeft}</div>
                    </div>
                    <div className={`text-xs ${currentTheme.colors.textSecondary} mt-1`}>Prize: {comp.prize}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Games */}
            <motion.div 
              className={`bg-gradient-to-br ${isDark ? 'from-green-900/20 to-emerald-900/20' : 'from-green-100/80 to-emerald-100/80'} backdrop-blur-xl border ${isDark ? 'border-green-500/30' : 'border-green-300/50'} rounded-2xl p-4`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className={`${currentTheme.colors.text} font-bold`}>Recommended</h3>
              </div>
              <div className="space-y-3">
                {recommendedGames.map((game) => (
                  <motion.div
                    key={game.id}
                    className={`${isDark ? 'bg-black/20 hover:bg-black/30' : 'bg-white/30 hover:bg-white/50'} rounded-lg p-3 transition-colors cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleCardClick(game.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`${currentTheme.colors.text} font-medium text-sm`}>{game.title}</div>
                      {game.isNew && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className={`${currentTheme.colors.textSecondary} text-xs mb-2`}>{game.reason}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded ${
                        game.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        game.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {game.difficulty}
                      </span>
                      <div className={`flex items-center gap-1 ${currentTheme.colors.textSecondary}`}>
                        <Clock className="w-3 h-3" />
                        <span>{game.estimatedTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Activity */}
            <motion.div 
              className={`bg-gradient-to-br ${isDark ? 'from-blue-900/20 to-cyan-900/20' : 'from-blue-100/80 to-cyan-100/80'} backdrop-blur-xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/50'} rounded-2xl p-4`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <h3 className={`${currentTheme.colors.text} font-bold`}>Friends Activity</h3>
              </div>
              <div className="space-y-3">
                {socialActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className={`${isDark ? 'bg-black/20 hover:bg-black/30' : 'bg-white/30 hover:bg-white/50'} rounded-lg p-3 transition-colors`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{activity.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className={`${currentTheme.colors.text} text-sm font-medium`}>{activity.friendName}</div>
                        <div className={`${currentTheme.colors.textSecondary} text-xs`}>
                          {activity.action} in <span className="text-blue-400">{activity.game}</span>
                          {activity.score && <span className="text-yellow-400 ml-1">({activity.score})</span>}
                        </div>
                        <div className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{activity.timeAgo}</div>
                      </div>
                      <Share2 className={`w-4 h-4 ${currentTheme.colors.textSecondary} hover:${currentTheme.colors.text} cursor-pointer transition-colors`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>            {/* User Badges */}
            <motion.div 
              className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className="w-5 h-5 text-orange-400" />
                <h3 className="text-white font-bold">Your Badges</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {userBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all ${
                      badge.earned 
                        ? 'bg-yellow-500/20 border border-yellow-500/50' 
                        : 'bg-gray-800/30 border border-gray-600/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    title={badge.description}
                  >
                    <div className={`text-lg mb-1 ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <div className={`text-xs text-center font-medium ${
                      badge.earned ? 'text-yellow-400' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </div>
                  </motion.div>                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  // Initialize sound and social features
  useEffect(() => {    // Load social data
    const loadSocialData = async () => {
      try {
        setFriends(socialManager.getFriends());
        setFriendRequests(socialManager.getFriendRequests());
        setUnreadMessages(socialManager.getTotalUnreadMessages());
      } catch (error) {
        console.error('Error loading social data:', error);
      }
    };

    loadSocialData();

    // Start ambient sound if enabled
    if (isSoundEnabled) {
      setTimeout(() => {
        playAmbient();
        setIsAmbientPlaying(true);
      }, 1000);
    }    // Cleanup function
    return () => {
      stopAmbient();
      stopGameMusic();
      setIsAmbientPlaying(false);
    };
  }, []);

  // Update sound settings when changed
  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isSoundEnabled));
    soundManager.setMuted(!isSoundEnabled);
    
    if (isSoundEnabled && !isAmbientPlaying) {
      playAmbient();
      setIsAmbientPlaying(true);
    } else if (!isSoundEnabled && isAmbientPlaying) {
      stopAmbient();
      setIsAmbientPlaying(false);
    }
  }, [isSoundEnabled, isAmbientPlaying]);  // Sound event handlers
  const handleCardClick = (gameId: string) => {
    if (isSoundEnabled) {
      playClickSound();
      // Stop ambient music and start game-specific music
      stopAmbient();
      setIsAmbientPlaying(false);
      // Start game music after a brief delay
      setTimeout(() => {
        playGameMusic(gameId);
      }, 500);
    }
    
    // Handle Diagnostic Detective specifically
    if (gameId === 'diagnosis-detective') {
      // Navigate to the diagnostic detective game
      window.location.href = '/diagnosis-detective';
      return;
    }
    
    console.log(`Starting game: ${gameId}`);
    toast.success(`Starting ${gameId}! Enjoy the immersive experience!`);
    // Add game navigation logic here
  };

  const handleBuyCourseClick = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    if (isSoundEnabled) {
      playWhoosh();
    }
    // Navigate to courses page
    window.location.href = '/courses';
  };
  const handleRatingClick = (gameId: string, ratingType: 'star' | 'thumbsUp' | 'thumbsDown') => {
    if (isSoundEnabled) {
      playClickSound();
    }
    console.log(`Rating ${gameId} with ${ratingType}`);
    toast.success(`Rating submitted for ${gameId}!`);
  };

  // Social interaction handlers
  const handleAddFriend = async (userId: string) => {
    if (isSoundEnabled) {
      playClickSound();
    }
    try {
      await socialManager.sendFriendRequest(userId);
      toast.success('Friend request sent!');
    } catch (error) {
      toast.error('Failed to send friend request');
    }
  };
  const handleAcceptFriend = async (requestId: string) => {
    if (isSoundEnabled) {
      playClickSound();
    }
    try {
      await socialManager.acceptFriendRequest(requestId);
      setFriends(socialManager.getFriends());
      setFriendRequests(socialManager.getFriendRequests());
      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error('Failed to accept friend request');
    }
  };return (
    <div className="min-h-screen">
      {/* Social Notifications */}
      {(friendRequests.length > 0 || unreadMessages > 0) && (
        <motion.div
          className="fixed top-36 right-6 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg backdrop-blur-sm cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isSoundEnabled) playClickSound();
            // Route to user's dashboard for social features
            const userType = localStorage.getItem('userType') || 'professional';
            window.location.href = `/dashboard/${userType}`;
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <UserPlus className="w-5 h-5 text-white" />
          {(friendRequests.length + unreadMessages > 0) && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {friendRequests.length + unreadMessages}
            </span>
          )}
        </motion.div>
      )}      <main>        {gameMode === 'selector' && renderMainGamePage()}
        {gameMode === 'diagnosis' && <div>Diagnosis game coming soon</div>}
        {gameMode === 'quiz' && <div>Quiz mode coming soon</div>}
      </main>      <FloatingActionButtons />
      <Footer isActive={false} />
    </div>
  );
};

export default GamesAndQuizzes;
