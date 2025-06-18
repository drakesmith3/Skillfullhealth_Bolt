import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  Building, 
  Award, 
  BarChart3, 
  Search, 
  Shield, 
  DollarSign, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  Handshake,
  UserPlus,
  Briefcase,
  Crown,
  Star,
  CheckCircle,
  Target,
  Globe,
  Zap,
  Heart,
  Sparkles,
  Layers,
  ArrowRight,
  Play,
  Monitor,
  Database,
  Lock,
  Scale,
  Clock
} from 'lucide-react';

function EmployersHandbook() {
  // Sound effect functions
  const playClickSound = useCallback(() => {
    const audio = new Audio('/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  const playPageTurnSound = useCallback(() => {
    const audio = new Audio('/page-turn.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }, []);

  const playWhooshSound = useCallback(() => {
    const audio = new Audio('/whoosh.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }, []);
  const playChimeSound = useCallback(() => {
    const audio = new Audio('/CHIME -169854__gnotesoundz__wind-chime-crunch.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 dark:from-gray-900 dark:to-red-950/20 print:bg-white">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          .print-avoid-break { page-break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; color-adjust: exact; }
          .backdrop-blur-lg { backdrop-filter: none !important; }
          .bg-gradient-to-br { background: white !important; }
          .text-white { color: black !important; }
          .border { border-color: #ccc !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16 pt-24 print:px-4 print:py-8 print:pt-8">
          {/* Premium Header - Print Optimized */}
        <div className="relative mb-12 print:mb-6">
          <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 print:bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 print:border-gray-300">
            
            {/* Luxurious Header */}
            <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 print:bg-red-600 p-8 print:p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm print:hidden"></div>
              
              {/* Decorative Elements - Hidden in Print */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 no-print"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 no-print"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Text content */}
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center p-4 bg-white/20 print:bg-gray-100 rounded-2xl backdrop-blur-sm border border-white/30 print:border-gray-300 mb-6 print:mb-4">
                    <Building className="w-12 h-12 text-white print:text-red-600" />
                  </div>
                  
                  <h1 className="text-4xl print:text-3xl font-black text-white print:text-black mb-4 print:mb-3 tracking-wide">
                    <span className="block text-yellow-200 print:text-red-600 text-2xl print:text-xl font-medium mb-2">GLOHSEN</span>
                    EMPLOYERS HANDBOOK
                  </h1>
                  
                  <p className="text-lg print:text-base text-red-100 print:text-gray-700 font-medium max-w-2xl leading-relaxed">
                    Your comprehensive guide to finding, hiring, and managing top healthcare talent through the GLOHSEN platform. Everything you need to streamline your recruitment process.
                  </p>
                  
                  <div className="mt-6 print:mt-3 flex flex-wrap justify-center md:justify-start gap-3 print:gap-2 no-print">
                    <div className="backdrop-blur-sm bg-white/20 px-4 py-2 rounded-xl border border-white/30">
                      <span className="text-white font-bold text-sm">Premium Edition</span>
                    </div>
                    <div className="backdrop-blur-sm bg-white/20 px-4 py-2 rounded-xl border border-white/30">
                      <span className="text-white font-bold text-sm">Executive Level</span>
                    </div>
                    <div className="backdrop-blur-sm bg-white/20 px-4 py-2 rounded-xl border border-white/30">
                      <span className="text-white font-bold text-sm">2025 Edition</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="relative no-print">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                    <img 
                      src="/3 health professionals inside hopsital ward.png" 
                      alt="Healthcare professionals collaborating in hospital environment"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium backdrop-blur-sm bg-black/30 rounded-lg px-3 py-2">
                        Connecting healthcare organizations with top-tier professionals
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating decoration icons */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Enhanced Premium Table of Contents */}
        <div className="relative mb-16">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-gray-800/5 to-black/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/95 via-amber-50/90 to-gray-50/85 dark:from-black/95 dark:via-gray-900/90 dark:to-gray-800/85 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/30 dark:border-gray-700/50">
            
            {/* Luxurious Header with 3D Effect */}
            <div className="relative bg-gradient-to-r from-amber-600 via-gray-800 to-black p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-gray-800/95 to-black/90 backdrop-blur-sm"></div>
              
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-300/20 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/30 rounded-3xl blur-xl"></div>
                    <div className="relative p-6 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30 shadow-2xl">
                      <Building className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-5xl font-black text-white mb-4 tracking-wide drop-shadow-2xl">
                  <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                    Executive Overview
                  </span>
                </h2>
                
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Star className="w-4 h-4 text-amber-300" />
                    <span className="text-amber-100 text-sm font-medium">Premium Content</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                    <Crown className="w-4 h-4 text-amber-300" />
                    <span className="text-amber-100 text-sm font-medium">Executive Level</span>
                  </div>
                </div>
                
                <p className="text-xl text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed">
                  Navigate through our comprehensive guide designed for healthcare industry leaders and decision-makers
                </p>
              </div>
            </div>

            {/* Enhanced Content Grid with Glassmorphism */}
            <div className="p-10 bg-gradient-to-br from-amber-50/30 via-white/50 to-gray-50/30 dark:from-gray-900/30 dark:via-black/50 dark:to-gray-800/30">
              
              {/* Hero Image Section */}
              <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern hospital executive boardroom"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Strategic Healthcare Management</h3>
                  <p className="text-gray-200 text-lg">Empowering employers with advanced recruitment and evaluation tools</p>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {[
                  { 
                    title: '1. GLOHSEN, GLOHSEN Standard, and GLOHSEN Score', 
                    icon: Award, 
                    color: 'amber',
                    description: 'Foundation knowledge and scoring system',
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '2. Understanding Evaluating Metrics', 
                    icon: BarChart3, 
                    color: 'gray',
                    description: 'Advanced analytics and KPI tracking',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '3. How Employers Use GLOHSEN', 
                    icon: Handshake, 
                    color: 'black',
                    description: 'Practical implementation strategies',
                    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '4. Terms, Privacy, and Legal Requirements', 
                    icon: Shield, 
                    color: 'amber',
                    description: 'Compliance and data protection',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '5. Contacting Prospective Candidates', 
                    icon: MessageSquare, 
                    color: 'gray',
                    description: 'Communication best practices',
                    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '6. The Role of the Job Board', 
                    icon: Briefcase, 
                    color: 'black',
                    description: 'Optimizing job postings and visibility',
                    image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '7. QUID Currency and Transaction Policies', 
                    icon: DollarSign, 
                    color: 'amber',
                    description: 'Financial operations and payments',
                    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '8. Platform Rules and Conduct', 
                    icon: AlertTriangle, 
                    color: 'gray',
                    description: 'Guidelines and enforcement policies',
                    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80'
                  },
                  { 
                    title: '9. Making the Most of GLOHSEN Community', 
                    icon: Users, 
                    color: 'black',
                    description: 'Community engagement and networking',
                    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80'
                  }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  const isAmber = item.color === 'amber';
                  const isGray = item.color === 'gray';
                  const isBlack = item.color === 'black';
                  
                  return (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        playPageTurnSound();
                        const element = document.getElementById(`section-${index + 1}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      onMouseEnter={playWhooshSound}
                      className="group relative block transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    >
                      {/* Card Container with Advanced Glassmorphism */}
                      <div className={`relative backdrop-blur-xl rounded-3xl p-8 border-2 shadow-2xl transition-all duration-500 overflow-hidden ${
                        isAmber 
                          ? 'bg-gradient-to-br from-amber-50/90 to-amber-100/70 dark:from-amber-950/40 dark:to-amber-900/30 border-amber-300/40 dark:border-amber-700/40 hover:border-amber-400/60 hover:shadow-amber-500/25' 
                          : isGray
                          ? 'bg-gradient-to-br from-gray-50/90 to-gray-100/70 dark:from-gray-950/40 dark:to-gray-900/30 border-gray-300/40 dark:border-gray-700/40 hover:border-gray-400/60 hover:shadow-gray-500/25'
                          : 'bg-gradient-to-br from-gray-900/10 to-black/20 dark:from-black/40 dark:to-gray-950/30 border-gray-800/40 dark:border-gray-600/40 hover:border-black/60 hover:shadow-black/25'
                      } group-hover:shadow-3xl`}>
                        
                        {/* Background Image */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-3xl"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className={`relative p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 ${
                              isAmber 
                                ? 'bg-gradient-to-br from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700' 
                                : isGray
                                ? 'bg-gradient-to-br from-gray-500 to-gray-600 group-hover:from-gray-600 group-hover:to-gray-700'
                                : 'bg-gradient-to-br from-gray-800 to-black group-hover:from-black group-hover:to-gray-900'
                            }`}>
                              <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                            </div>
                            
                            <div className={`text-3xl font-black opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${
                              isAmber ? 'text-amber-500' : isGray ? 'text-gray-500' : 'text-gray-800'
                            }`}>
                              {String(index + 1).padStart(2, '0')}
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-black text-xl text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                            {item.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                            {item.description}
                          </p>
                          
                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold ${
                              isAmber ? 'text-amber-600' : isGray ? 'text-gray-600' : 'text-gray-800'
                            } group-hover:text-gray-900 transition-colors duration-300`}>
                              Read More
                            </span>
                            <div className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
                              isAmber ? 'bg-amber-100 group-hover:bg-amber-200' : isGray ? 'bg-gray-100 group-hover:bg-gray-200' : 'bg-gray-200 group-hover:bg-gray-300'
                            }`}>
                              <ArrowRight className={`w-4 h-4 ${
                                isAmber ? 'text-amber-600' : isGray ? 'text-gray-600' : 'text-gray-800'
                              } group-hover:translate-x-1 transition-transform duration-300`} />
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                          isAmber ? 'bg-gradient-to-br from-amber-400/10 to-amber-600/10' : isGray ? 'bg-gradient-to-br from-gray-400/10 to-gray-600/10' : 'bg-gradient-to-br from-gray-700/10 to-black/10'
                        }`}></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
            {/* Enhanced Section 1: GLOHSEN Standard & Scoring System */}
          <section id="section-1" className="group relative">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/95 via-amber-50/90 to-gray-50/85 dark:from-black/95 dark:via-gray-900/90 dark:to-gray-800/85 rounded-3xl shadow-2xl overflow-hidden border border-amber-200/30 dark:border-gray-700/50 transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02]">
              
              {/* Floating Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-gray-800/10 to-black/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              
              {/* Enhanced Section Header */}
              <div className="relative bg-gradient-to-r from-amber-600 via-gray-800 to-black p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-gray-800/95 to-black/90 backdrop-blur-sm"></div>
                
                {/* Animated Grid Background */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-400/30 rounded-3xl blur-xl"></div>
                        <div className="relative p-6 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30 shadow-2xl">
                          <Award className="w-12 h-12 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center animate-bounce">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="ml-8">
                        <h3 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
                          Section 1
                        </h3>
                        <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                          <span className="text-amber-200 text-sm font-medium">Foundation Knowledge</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-6xl font-black text-white/20 mb-2">01</div>
                      <div className="flex space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-4xl font-black text-white mb-4 leading-tight">
                    GLOHSEN, GLOHSEN Standard, and GLOHSEN Score
                  </h4>
                  <p className="text-xl text-gray-100 font-medium max-w-4xl leading-relaxed">
                    Understanding our platform, standards, and evaluation system for strategic healthcare talent management
                  </p>
                </div>
              </div>

              {/* Enhanced Section Content */}
              <div className="p-12 bg-gradient-to-br from-amber-50/30 via-white/50 to-gray-50/30 dark:from-gray-900/30 dark:via-black/50 dark:to-gray-800/30">
                
                {/* Hero Image with Overlay */}
                <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80" 
                    alt="Healthcare award ceremony and professional recognition"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-amber-500/90 rounded-2xl backdrop-blur-sm">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white text-3xl font-bold">Excellence in Healthcare</h3>
                        <p className="text-gray-200 text-lg">Recognized standards and professional achievement</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  {/* What is GLOHSEN? - Enhanced */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-gray-800/10 rounded-3xl blur-xl"></div>
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-amber-50/80 dark:from-black/90 dark:to-gray-900/80 rounded-3xl p-10 border border-amber-200/30 dark:border-gray-700/30 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      
                      {/* Content Header */}
                      <div className="flex items-start mb-8">
                        <div className="relative mr-8">
                          <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-lg"></div>
                          <div className="relative p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl">
                            <Building className="w-10 h-10 text-white drop-shadow-lg" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-3xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-amber-600 transition-colors duration-300">
                            What is GLOHSEN?
                          </h4>
                          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-gray-800 rounded-full mb-6"></div>
                        </div>
                      </div>
                        {/* Content Grid */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            GLOHSEN is an AI-powered healthcare ecosystem that revolutionizes professional evaluation and development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Advanced Analytics & KPI Metrics */}
          <section id="section-2" className="group relative print:mb-8">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-gray-800/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-black/10 to-amber-600/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-amber-50/90 to-gray-50/85 dark:from-black/95 dark:via-gray-900/90 dark:to-gray-800/85 print:bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/30 dark:border-gray-700/50 print:border-gray-300 transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.01]">
              
              {/* Luxurious Section Header */}
              <div className="relative bg-gradient-to-r from-amber-600 via-gray-800 to-black print:bg-amber-600 p-12 print:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-gray-800/95 to-black/90 backdrop-blur-sm print:hidden"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden no-print">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-white/10 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 4}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="relative z-10">
                  {/* Hero Image and Content Layout */}
                  <div className="grid lg:grid-cols-2 gap-10 items-center">
                    
                    {/* Left Content */}
                    <div>
                      <div className="flex items-center mb-8">
                        <div className="relative mr-6">
                          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl"></div>
                          <div className="relative p-5 bg-white/20 print:bg-gray-100 rounded-3xl backdrop-blur-sm border border-white/30 print:border-gray-300 shadow-2xl">
                            <BarChart3 className="w-12 h-12 text-white print:text-amber-600 drop-shadow-lg" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 print:bg-amber-500 rounded-full flex items-center justify-center animate-bounce no-print">
                            <TrendingUp className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="text-6xl print:text-4xl font-black text-white/20 print:text-gray-300">02</div>
                      </div>
                      
                      <h3 className="text-5xl print:text-3xl font-black text-white print:text-black mb-6 tracking-wide drop-shadow-2xl print:drop-shadow-none">
                        <span className="bg-gradient-to-r from-amber-200 to-white print:text-amber-600 bg-clip-text text-transparent print:bg-none">
                          Analytics & KPI Metrics
                        </span>
                      </h3>
                      
                      <p className="text-xl print:text-lg text-gray-100 print:text-gray-700 font-medium leading-relaxed mb-8">
                        Advanced evaluation systems and comprehensive performance indicators for strategic healthcare recruitment and management.
                      </p>
                      
                      {/* Premium Badges */}
                      <div className="flex flex-wrap gap-3 no-print">
                        <div className="backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white font-bold text-sm flex items-center">
                            <Database className="w-4 h-4 mr-2" />
                            AI-Powered Analytics
                          </span>
                        </div>
                        <div className="backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white font-bold text-sm flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Real-time KPIs
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Hero Image */}
                    <div className="relative no-print">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                          alt="Advanced analytics dashboard with healthcare KPIs and metrics"
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-white text-lg font-bold backdrop-blur-sm bg-black/40 rounded-lg px-4 py-3">
                            Advanced Analytics Dashboard for Healthcare Recruitment
                          </p>
                        </div>
                      </div>
                      
                      {/* Floating Analytics Icons */}
                      <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <BarChart3 className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Content Area */}
              <div className="p-12 print:p-8 bg-gradient-to-br from-amber-50/30 via-white/50 to-gray-50/30 dark:from-gray-900/30 dark:via-black/50 dark:to-gray-800/30 print:bg-white">
                
                {/* Secondary Hero Image */}
                <div className="relative mb-12 print:mb-8 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30 print:border-gray-300 no-print">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Healthcare analytics and performance metrics visualization"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white text-2xl font-bold mb-2">Performance Intelligence Platform</h4>
                              {/* Section 3: Strategic Platform Implementation */}
          <section id="section-3" className="group relative print:mb-8">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-red-500/10 to-amber-600/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-black/10 to-red-600/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-red-50/90 to-amber-50/85 dark:from-black/95 dark:via-red-950/90 dark:to-amber-900/85 print:bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-200/30 dark:border-red-700/50 print:border-gray-300 transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.01]">
              
              {/* Luxurious Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-amber-600 to-black print:bg-red-600 p-12 print:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-amber-600/95 to-black/90 backdrop-blur-sm print:hidden"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden no-print">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/15 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 5}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="relative z-10">
                  {/* Hero Layout */}
                  <div className="grid lg:grid-cols-2 gap-10 items-center">
                    
                    {/* Left Content */}
                    <div>
                      <div className="flex items-center mb-8">
                        <div className="relative mr-6">
                          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl"></div>
                          <div className="relative p-5 bg-white/20 print:bg-gray-100 rounded-3xl backdrop-blur-sm border border-white/30 print:border-gray-300 shadow-2xl">
                            <Handshake className="w-12 h-12 text-white print:text-red-600 drop-shadow-lg" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 print:bg-amber-500 rounded-full flex items-center justify-center animate-bounce no-print">
                            <Users className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="text-6xl print:text-4xl font-black text-white/20 print:text-gray-300">03</div>
                      </div>
                      
                      <h3 className="text-5xl print:text-3xl font-black text-white print:text-black mb-6 tracking-wide drop-shadow-2xl print:drop-shadow-none">
                        <span className="bg-gradient-to-r from-amber-200 to-white print:text-red-600 bg-clip-text text-transparent print:bg-none">
                          Strategic Implementation
                        </span>
                      </h3>
                      
                      <p className="text-xl print:text-lg text-red-100 print:text-gray-700 font-medium leading-relaxed mb-8">
                        Comprehensive guide to leveraging GLOHSEN for organizational transformation and strategic workforce optimization.
                      </p>
                      
                      {/* Premium Badges */}
                      <div className="flex flex-wrap gap-3 no-print">
                        <div className="backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white font-bold text-sm flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Workflow Optimization
                          </span>
                        </div>
                        <div className="backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white font-bold text-sm flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Strategic ROI
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Hero Image */}
                    <div className="relative no-print">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                          alt="Healthcare professionals collaborating in strategic implementation"
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-white text-lg font-bold backdrop-blur-sm bg-black/40 rounded-lg px-4 py-3">
                            Strategic Workforce Management Excellence
                          </p>
                        </div>
                      </div>
                      
                      {/* Floating Strategic Icons */}
                      <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Handshake className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Content Area */}
              <div className="p-12 print:p-8 bg-gradient-to-br from-red-50/30 via-white/50 to-amber-50/30 dark:from-red-950/30 dark:via-black/50 dark:to-amber-900/30 print:bg-white">
                
                {/* Strategic Implementation Hero Image */}
                <div className="relative mb-12 print:mb-8 rounded-3xl overflow-hidden shadow-2xl border border-red-200/30 print:border-gray-300 no-print">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80" 
                    alt="Healthcare strategic planning and implementation"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white text-2xl font-bold mb-2">Enterprise-Level Implementation</h4>
                    <p className="text-gray-200 text-lg">Transform your healthcare organization with strategic workforce solutions</p>
                  </div>
                </div>
                
                <div className="space-y-12 print:space-y-8">
                  
                  {/* Enhanced Immediate Benefits & Long-term Advantages */}
                  <div className="grid lg:grid-cols-2 gap-10 print:gap-6">
                    
                    {/* Immediate Benefits */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-amber-600/5 to-red-500/5 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                      
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-red-50/90 to-red-100/70 dark:from-red-950/40 dark:to-red-900/30 print:bg-red-50 rounded-3xl p-8 print:p-6 border-2 border-red-300/40 dark:border-red-700/40 print:border-red-300 shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                        
                        {/* Section Header */}
                        <div className="flex items-center mb-8 print:mb-6">
                          <div className="relative mr-6">
                            <div className="absolute inset-0 bg-red-400/20 rounded-2xl blur-lg"></div>
                            <div className="relative p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl">
                              <Zap className="w-8 h-8 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-3xl print:text-2xl font-black text-gray-900 dark:text-white print:text-black mb-2">
                              Immediate Benefits
                            </h4>
                            <p className="text-red-600 dark:text-red-400 print:text-red-600 font-bold text-lg">
                              Instant ROI & Quick Wins
                            </p>
                          </div>
                        </div>
                        
                        {/* Benefits Showcase Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 print:mb-6 no-print">
                          <img 
                            src="https://images.unsplash.com/photo-1586083702768-190ae093d34d?auto=format&fit=crop&w=600&q=80" 
                            alt="Immediate healthcare staffing benefits"
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white font-bold text-sm">Rapid Implementation Results</p>
                          </div>
                        </div>
                        
                        {/* Benefits List */}
                        <ul className="space-y-4 print:space-y-3">
                          {[
                            { text: 'Access to pre-verified, high-quality professionals', icon: CheckCircle },
                            { text: 'Reduced time and cost in recruitment process', icon: Clock },
                            { text: 'AI-powered matching for better candidate fit', icon: Target },
                            { text: 'Streamlined application and interview process', icon: Layers },
                            { text: 'Real-time candidate availability updates', icon: Monitor }
                          ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <li key={index} className="flex items-start group/item">
                                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                                  <IconComponent className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-800 dark:text-gray-200 print:text-gray-700 leading-relaxed font-medium group-hover/item:text-red-600 transition-colors duration-300">
                                  {item.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Long-term Advantages */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-600/5 to-amber-500/5 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                      
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-amber-50/90 to-amber-100/70 dark:from-amber-950/40 dark:to-amber-900/30 print:bg-amber-50 rounded-3xl p-8 print:p-6 border-2 border-amber-300/40 dark:border-amber-700/40 print:border-amber-300 shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                        
                        {/* Section Header */}
                        <div className="flex items-center mb-8 print:mb-6">
                          <div className="relative mr-6">
                            <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-lg"></div>
                            <div className="relative p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl">
                              <TrendingUp className="w-8 h-8 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-3xl print:text-2xl font-black text-gray-900 dark:text-white print:text-black mb-2">
                              Long-term Advantages
                            </h4>
                            <p className="text-amber-600 dark:text-amber-400 print:text-amber-600 font-bold text-lg">
                              Strategic Organizational Growth
                            </p>
                          </div>
                        </div>
                        
                        {/* Advantages Showcase Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 print:mb-6 no-print">
                          <img 
                            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" 
                            alt="Long-term healthcare organizational success"
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white font-bold text-sm">Sustained Excellence & Growth</p>
                          </div>
                        </div>
                        
                        {/* Advantages List */}
                        <ul className="space-y-4 print:space-y-3">
                          {[
                            { text: 'Improved patient satisfaction scores', icon: Heart },
                            { text: 'Enhanced organizational reputation', icon: Star },
                            { text: 'Better staff retention rates', icon: Users },
                            { text: 'Reduced training and onboarding costs', icon: DollarSign },
                            { text: 'Access to continuous professional development', icon: TrendingUp }
                          ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <li key={index} className="flex items-start group/item">
                                <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                                  <IconComponent className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-800 dark:text-gray-200 print:text-gray-700 leading-relaxed font-medium group-hover/item:text-amber-600 transition-colors duration-300">
                                  {item.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Workflow Enhancement Section */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-black/5 to-red-500/5 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                    
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-black/90 dark:to-gray-900/80 print:bg-white rounded-3xl p-10 print:p-6 border-2 border-gray-300/40 dark:border-gray-600/40 print:border-gray-300 shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                      
                      {/* Section Header */}
                      <div className="text-center mb-12 print:mb-8">
                        <div className="inline-flex items-center justify-center mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl"></div>
                            <div className="relative p-6 bg-gradient-to-br from-gray-700 to-black rounded-3xl shadow-2xl">
                              <Layers className="w-12 h-12 text-white drop-shadow-lg" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="text-4xl print:text-3xl font-black text-gray-900 dark:text-white print:text-black mb-4">
                          Workflow Enhancement
                        </h4>
                        <p className="text-xl print:text-lg text-gray-600 dark:text-gray-400 print:text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                          GLOHSEN streamlines your entire hiring workflow from strategic planning to successful onboarding and beyond
                        </p>
                      </div>
                      
                      {/* Workflow Process Cards */}
                      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 print:gap-6 mb-12 print:mb-8">
                        {[
                          { 
                            step: '1', 
                            title: 'Strategic Planning', 
                            description: 'Define requirements, set criteria, and establish hiring goals',
                            icon: Target,
                            color: 'red',
                            image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80'
                          },
                          { 
                            step: '2', 
                            title: 'AI-Powered Matching', 
                            description: 'Receive intelligently ranked candidate recommendations',
                            icon: Database,
                            color: 'amber',
                            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
                          },
                          { 
                            step: '3', 
                            title: 'Comprehensive Review', 
                            description: 'Assess candidates using detailed profiles and GLOHSEN Scores',
                            icon: Search,
                            color: 'gray',
                            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
                          },
                          { 
                            step: '4', 
                            title: 'Seamless Integration', 
                            description: 'Execute hiring decisions and streamlined onboarding',
                            icon: Handshake,
                            color: 'black',
                            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80'
                          }
                        ].map((item, index) => {
                          const IconComponent = item.icon;
                          const isRed = item.color === 'red';
                          const isAmber = item.color === 'amber';
                          const isGray = item.color === 'gray';
                          const isBlack = item.color === 'black';
                          
                          return (
                            <div key={index} className={`group/card relative backdrop-blur-sm rounded-3xl p-6 print:p-4 border-2 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl overflow-hidden ${
                              isRed 
                                ? 'bg-gradient-to-br from-red-50/90 to-red-100/70 dark:from-red-950/40 dark:to-red-900/30 border-red-300/50 dark:border-red-600/40 print:bg-red-50 print:border-red-300' 
                                : isAmber
                                ? 'bg-gradient-to-br from-amber-50/90 to-amber-100/70 dark:from-amber-950/40 dark:to-amber-900/30 border-amber-300/50 dark:border-amber-600/40 print:bg-amber-50 print:border-amber-300'
                                : isGray
                                ? 'bg-gradient-to-br from-gray-50/90 to-gray-100/70 dark:from-gray-800/40 dark:to-gray-700/30 border-gray-300/50 dark:border-gray-600/40 print:bg-gray-50 print:border-gray-300'
                                : 'bg-gradient-to-br from-gray-900/10 to-black/20 dark:from-black/40 dark:to-gray-950/30 border-gray-800/40 dark:border-gray-600/40 print:bg-gray-100 print:border-gray-300'
                            }`}>
                              
                              {/* Background Image */}
                              <div className="absolute inset-0 opacity-5 group-hover/card:opacity-10 transition-opacity duration-500 no-print">
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-full h-full object-cover rounded-3xl"
                                />
                              </div>
                              
                              {/* Content */}
                              <div className="relative z-10 text-center">
                                {/* Step Number & Icon */}
                                <div className="flex items-center justify-between mb-6 print:mb-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-transform duration-300 ${
                                    isRed ? 'bg-gradient-to-br from-red-500 to-red-600' : isAmber ? 'bg-gradient-to-br from-amber-500 to-amber-600' : isGray ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 'bg-gradient-to-br from-gray-800 to-black'
                                  }`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                  </div>
                                  
                                  <div className={`text-4xl print:text-3xl font-black opacity-20 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-300 ${
                                    isRed ? 'text-red-500' : isAmber ? 'text-amber-500' : isGray ? 'text-gray-500' : 'text-gray-800'
                                  }`}>
                                    {item.step}
                                  </div>
                                </div>
                                
                                {/* Title & Description */}
                                <h6 className="text-lg print:text-base font-black text-gray-900 dark:text-white print:text-black mb-3 leading-tight">
                                  {item.title}
                                </h6>
                                <p className="text-gray-700 dark:text-gray-300 print:text-gray-700 text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Enhanced Workflow Illustration */}
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/30 print:border-gray-300 no-print">
                        <img 
                          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80" 
                          alt="Healthcare professionals implementing strategic workflow solutions"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <h5 className="text-white text-2xl font-bold mb-2">Complete Workflow Transformation</h5>
                          <p className="text-gray-200 text-lg">Streamlined hiring connects you with qualified professionals faster than ever</p>
                        </div>
                          {/* Floating Process Icons */}
                        <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                          <Handshake className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

                  {/* Enhanced KPI Metrics Section */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-black/5 to-amber-500/5 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
                    
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-gray-50/80 dark:from-black/90 dark:to-gray-900/80 print:bg-white rounded-3xl p-10 print:p-6 border-2 border-gray-300/40 dark:border-gray-600/40 print:border-gray-300 shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                      
                      {/* Section Header */}
                      <div className="flex items-center justify-between mb-10 print:mb-6">
                        <div className="flex items-center">
                          <div className="relative mr-6">
                            <div className="absolute inset-0 bg-gray-400/20 rounded-2xl blur-lg"></div>
                            <div className="relative p-4 bg-gradient-to-br from-gray-700 to-black rounded-2xl shadow-xl">
                              <BarChart3 className="w-8 h-8 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-3xl print:text-2xl font-black text-gray-900 dark:text-white print:text-black mb-2">
                              Staffing & HR Activity KPIs
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 print:text-gray-600 font-bold text-lg">
                              Performance Intelligence Dashboard
                            </p>
                          </div>
                        </div>
                        
                        <div className="hidden lg:block no-print">
                          <div className="text-6xl font-black text-gray-200 dark:text-gray-700">KPI</div>
                        </div>
                      </div>
                      
                      {/* KPI Image Showcase */}
                      <div className="relative mb-10 print:mb-6 rounded-2xl overflow-hidden shadow-xl no-print">
                        <img 
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" 
                          alt="Healthcare KPI dashboard with performance metrics"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-lg font-bold">Real-time Performance Monitoring</p>
                        </div>
                      </div>
                      
                      {/* Enhanced KPI Cards */}
                      <div className="grid lg:grid-cols-3 gap-8 print:gap-6">
                        {[
                          {
                            title: 'Time-to-Fill',
                            description: 'Average days from job posting to successful hire completion',
                            icon: Clock,
                            color: 'amber',
                            metric: '12 Days',
                            trend: '+15%',
                            image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=400&q=80'
                          },
                          {
                            title: 'Quality of Hire',
                            description: 'Performance ratings, retention rates, and cultural fit assessments',
                            icon: Star,
                            color: 'gray',
                            metric: '4.8/5',
                            trend: '+8%',
                            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80'
                          },
                          {
                            title: 'Cost per Hire',
                            description: 'Total recruitment costs per position successfully filled',
                            icon: DollarSign,
                            color: 'black',
                            metric: '$2,450',
                            trend: '-12%',
                            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80'
                          }
                        ].map((kpi, index) => {
                          const IconComponent = kpi.icon;
                          const isAmber = kpi.color === 'amber';
                          const isGray = kpi.color === 'gray';
                          const isBlack = kpi.color === 'black';
                          
                          return (
                            <div key={index} className={`group relative backdrop-blur-sm rounded-3xl p-8 print:p-6 border-2 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl overflow-hidden ${
                              isAmber 
                                ? 'bg-gradient-to-br from-amber-50/90 to-amber-100/70 dark:from-amber-950/40 dark:to-amber-900/30 border-amber-300/50 dark:border-amber-600/40 print:bg-amber-50 print:border-amber-300' 
                                : isGray
                                ? 'bg-gradient-to-br from-gray-50/90 to-gray-100/70 dark:from-gray-800/40 dark:to-gray-700/30 border-gray-300/50 dark:border-gray-600/40 print:bg-gray-50 print:border-gray-300'
                                : 'bg-gradient-to-br from-gray-900/10 to-black/20 dark:from-black/40 dark:to-gray-950/30 border-gray-800/40 dark:border-gray-600/40 print:bg-gray-100 print:border-gray-300'
                            }`}>
                              
                              {/* Background Image */}
                              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 no-print">
                                <img 
                                  src={kpi.image} 
                                  alt={kpi.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* Content */}
                              <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6 print:mb-4">
                                  <div className={`p-3 rounded-xl shadow-lg ${
                                    isAmber ? 'bg-gradient-to-br from-amber-500 to-amber-600' : isGray ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 'bg-gradient-to-br from-gray-800 to-black'
                                  }`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                  </div>
                                  <div className={`text-2xl font-black ${
                                    isAmber ? 'text-amber-500' : isGray ? 'text-gray-500' : 'text-gray-800'
                                  }`}>
                                    {String(index + 1).padStart(2, '0')}
                                  </div>
                                </div>
                                
                                {/* Metrics */}
                                <div className="text-center mb-6 print:mb-4">
                                  <div className={`text-3xl print:text-2xl font-black mb-2 ${
                                    isAmber ? 'text-amber-600' : isGray ? 'text-gray-600' : 'text-gray-800'
                                  }`}>
                                    {kpi.metric}
                                  </div>
                                  <div className={`text-sm font-bold ${
                                    kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {kpi.trend} vs last quarter
                                  </div>
                                </div>
                                
                                {/* Title & Description */}
                                <h6 className="text-xl print:text-lg font-black text-gray-900 dark:text-white print:text-black mb-3">
                                  {kpi.title}
                                </h6>
                                <p className="text-gray-700 dark:text-gray-300 print:text-gray-700 leading-relaxed text-sm">
                                  {kpi.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}                      </div>
                    </div>
                  </div>

                  {/* New Section: GLOHSEN Specializations */}
                  <div className="mt-16 print:mt-12">
                    <h4 className="text-3xl font-black text-gray-900 dark:text-white print:text-black mb-8 text-center">
                      GLOHSEN Core Specializations
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-8 print:gap-6">
                      {[
                        {
                          letter: 'I',
                          title: 'INDIVIDUALIZED',
                            description: 'Personalized approach tailored to each professional\'s unique skills and goals',
                            gradient: 'from-black to-gray-800',
                            bgGradient: 'from-gray-50 to-gray-100',
                            darkBgGradient: 'from-gray-950/50 to-gray-800/30',
                            icon: Target,
                            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-gray-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            
                            <div className={`relative backdrop-blur-xl bg-gradient-to-br ${item.bgGradient} dark:${item.darkBgGradient} rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105 overflow-hidden`}>
                              
                              {/* Background Image */}
                              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* Content */}
                              <div className="relative z-10 text-center">
                                {/* Large Letter */}
                                <div className={`relative w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                                  <span className="text-white font-black text-2xl drop-shadow-lg">{item.letter}</span>
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                                </div>
                                
                                {/* Icon */}
                                <div className="mb-4">
                                  <item.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto" />
                                </div>
                                
                                {/* Title */}
                                <h5 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-wide group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                                  {item.title}
                                </h5>
                                
                                {/* Description */}
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                                  {item.description}
                                </p>
                                
                                {/* Bottom Decoration */}
                                <div className="mt-6 flex justify-center">
                                  <div className={`w-16 h-1 bg-gradient-to-r ${item.gradient} rounded-full`}></div>
                                </div>
                              </div>
                            </div>
                          </div>                        ))}
                    </div>
                  </div>

                  {/* GLOHSEN Score for Employers */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          GLOHSEN Score for Employers
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          The GLOHSEN Score is a comprehensive evaluation system that helps you identify the best candidates. It considers experience, skills, certifications, platform activity, and peer feedback to provide an objective measure of professional quality.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>                </div>
              </div>
            </div>
          </section>{/* Section 2: AI-Powered Evaluation Metrics */}
          <section id="section-2" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-500 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 2: Understanding Evaluating Metrics
                    </h3>
                    <p className="text-xl text-yellow-100 font-medium">
                      GLOHSEN Employer Criteria Score and comprehensive KPIs
                    </p>
                  </div>
                </div>
              </div>              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-8">
                  
                  {/* GLOHSEN Employer Criteria Score */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-8 border border-yellow-200/50 shadow-xl">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-yellow-600" />
                      GLOHSEN Employer Criteria Score
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 mb-6">
                      Set your hiring criteria and let our AI match candidates based on your specific requirements:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-lg font-bold text-yellow-600 mb-4">Customizable Criteria</h5>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• Experience level requirements</li>
                          <li>• Specific certifications needed</li>
                          <li>• Specialty and subspecialty preferences</li>
                          <li>• Geographic location preferences</li>
                          <li>• Availability requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-amber-600 mb-4">Weighted Scoring</h5>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• Assign importance weights to each criterion</li>
                          <li>• Automatic candidate ranking</li>
                          <li>• Match percentage calculations</li>
                          <li>• Customizable score thresholds</li>
                          <li>• Real-time candidate recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Staffing/HR Activity KPIs */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-red-600" />
                      Staffing/HR Activity KPIs
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Time-to-Fill',
                          description: 'Average days from job posting to hire',
                          icon: '⏱️',
                          color: 'red'
                        },
                        {
                          title: 'Quality of Hire',
                          description: 'Performance ratings and retention rates',
                          icon: '⭐',
                          color: 'yellow'
                        },
                        {
                          title: 'Cost per Hire',
                          description: 'Total recruitment costs per position filled',
                          icon: '💰',
                          color: 'red'
                        }
                      ].map((kpi, index) => (
                        <div key={index} className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                          kpi.color === 'red' 
                            ? 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/50' 
                            : 'bg-gradient-to-br from-yellow-50 to-amber-100/50 border border-yellow-200/50'
                        }`}>
                          <div className="text-center">
                            <div className="text-3xl mb-3">{kpi.icon}</div>
                            <h6 className="text-lg font-bold text-black dark:text-stone-100 mb-2">
                              {kpi.title}
                            </h6>
                            <p className="text-gray-700 dark:text-stone-300 text-sm">
                              {kpi.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EQ Assessment & Feedback System */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border border-red-200/50 shadow-xl">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4 flex items-center">
                      <Users className="w-6 h-6 mr-3 text-red-600" />
                      EQ Assessment & Feedback System
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                      Our platform includes emotional intelligence assessments and comprehensive feedback systems to help you evaluate candidates' soft skills, communication abilities, and cultural fit with your organization.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>          {/* Section 3: How Employers Use GLOHSEN */}
          <section id="section-3" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <Handshake className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 3: How Employers Use GLOHSEN
                    </h3>
                    <p className="text-xl text-red-100 font-medium">
                      Bridging HR/Staffing Gaps and workflow enhancement
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-8">
                  
                  {/* Bridging HR/Staffing Gaps */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 shadow-xl">
                      <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Immediate Benefits</h4>
                      <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                        <li>• Access to pre-verified, high-quality professionals</li>
                        <li>• Reduced time and cost in recruitment process</li>
                        <li>• AI-powered matching for better candidate fit</li>
                        <li>• Streamlined application and interview process</li>
                        <li>• Real-time candidate availability updates</li>
                      </ul>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200/50 shadow-xl">
                      <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Long-term Advantages</h4>
                      <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                        <li>• Improved patient satisfaction scores</li>
                        <li>• Enhanced organizational reputation</li>
                        <li>• Better staff retention rates</li>
                        <li>• Reduced training and onboarding costs</li>
                        <li>• Access to continuous professional development</li>
                      </ul>
                    </div>
                  </div>

                  {/* Workflow Enhancement */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6 text-center">
                      Workflow Enhancement
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 mb-6 text-center">
                      GLOHSEN streamlines your entire hiring workflow from job posting to onboarding:
                    </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {[
                        { step: '1', title: 'Post Job', description: 'Create detailed job postings with specific criteria' },
                        { step: '2', title: 'AI Matching', description: 'Receive ranked candidate recommendations' },
                        { step: '3', title: 'Review & Interview', description: 'Assess candidates using comprehensive profiles' },
                        { step: '4', title: 'Hire & Onboard', description: 'Seamless hiring and integration process' }
                      ].map((item, index) => (
                        <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-lg">{item.step}</span>
                          </div>
                          <h6 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h6>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Visual Workflow Illustration */}
                    <div className="relative mt-8 p-6 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-950/20 dark:to-yellow-950/20 rounded-2xl border border-red-200/50 no-print">
                      <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-md">
                          <img 
                            src="/3 health professionals inside hopsital ward.png" 
                            alt="Healthcare professionals working together"
                            className="w-full h-48 object-cover rounded-xl shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-semibold">
                              Streamlined hiring connects you with qualified professionals faster
                            </p>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                            <Handshake className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Terms, Privacy, and Legal Requirements */}
          <section id="section-4" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-500 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 4: Terms, Privacy, and Legal Requirements
                    </h3>
                    <p className="text-xl text-yellow-100 font-medium">
                      Legal compliance and employer responsibilities
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-8">
                  
                  {/* Legal Compliance */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-8 border border-yellow-200/50 shadow-xl">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Legal Compliance</h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 mb-6">
                      By using GLOHSEN, you agree to our Terms of Service and Privacy Policy, which protect your data and ensure compliance with legal standards including HIPAA where applicable.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• All data is encrypted and securely stored</li>
                          <li>• Compliance with employment laws and regulations</li>
                          <li>• Equal opportunity employment practices</li>
                          <li>• Confidential handling of candidate information</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• Transparent communication and fair feedback</li>
                          <li>• Honor job offers and employment agreements</li>
                          <li>• Maintain professional communication standards</li>
                          <li>• Follow all applicable employment laws</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Employer Responsibilities */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6">Employer Responsibilities</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Provide accurate job descriptions and requirements</li>
                          <li>• Conduct fair and unbiased hiring processes</li>
                          <li>• Respect candidate privacy and confidentiality</li>
                          <li>• Provide timely feedback to applicants</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Honor job offers and employment agreements</li>
                          <li>• Maintain professional communication standards</li>
                          <li>• Follow all applicable employment laws</li>
                          <li>• Report any platform violations or concerns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Contacting Prospective Candidates */}
          <section id="section-5" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 5: Contacting Prospective Candidates
                    </h3>
                    <p className="text-xl text-red-100 font-medium">
                      Communication channels and best practices
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-8">
                  
                  {/* Communication Channels */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Platform Messaging</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Secure in-platform messaging system</li>
                        <li>• Message templates for common inquiries</li>
                        <li>• Read receipts and response tracking</li>
                        <li>• File sharing capabilities</li>
                        <li>• Message history and archiving</li>
                      </ul>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Job Board Integration</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Direct application responses</li>
                        <li>• Automated candidate notifications</li>
                        <li>• Interview scheduling tools</li>
                        <li>• Application status updates</li>
                        <li>• Bulk communication options</li>
                      </ul>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6">Best Practices for Candidate Contact</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Review candidate profiles and GLOHSEN Scores before making contact</li>
                          <li>• Personalize your messages to show genuine interest</li>
                          <li>• Be clear about job requirements and expectations</li>
                          <li>• Respond promptly to candidate inquiries and applications</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Provide constructive feedback even for unsuccessful candidates</li>
                          <li>• Maintain professional tone and respect candidate time</li>
                          <li>• Communication tracking for transparency and compliance</li>
                          <li>• Clear record of hiring process for both parties</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: The Role of the Job Board */}
          <section id="section-6" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-500 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 6: The Role of the Job Board
                    </h3>
                    <p className="text-xl text-yellow-100 font-medium">
                      Advanced job posting features and application management
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-8">
                  
                  {/* Job Posting Features */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Advanced Posting Options</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Detailed job descriptions and requirements</li>
                        <li>• Salary ranges and benefits information</li>
                        <li>• Location and schedule specifications</li>
                        <li>• Required certifications and experience levels</li>
                        <li>• Application deadlines and start dates</li>
                      </ul>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Visibility Controls</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Public or private job postings</li>
                        <li>• Targeted candidate notifications</li>
                        <li>• Featured listing options</li>
                        <li>• Geographic targeting capabilities</li>
                        <li>• Specialty-specific job categories</li>
                      </ul>
                    </div>
                  </div>

                  {/* Application Management */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6">Application Management</h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 mb-6">
                      Streamline your application review process with powerful management tools:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: 'Filter & Sort', description: 'Advanced filters to find the best candidates quickly' },
                        { title: 'Bulk Actions', description: 'Process multiple applications simultaneously' },
                        { title: 'Status Tracking', description: 'Monitor application progress through hiring stages' }
                      ].map((feature, index) => (
                        <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                          <h6 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{feature.title}</h6>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 rounded-xl">
                      <h5 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Analytics & Insights</h5>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        Track job posting performance, application rates, and hiring success metrics. Use these insights to optimize your job descriptions, requirements, and recruitment strategies for better results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: QUID Currency and Transaction Policies */}
          <section id="section-7" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 7: QUID Currency and Transaction Policies
                    </h3>
                    <p className="text-xl text-red-100 font-medium">
                      Understanding QUID, payments, and escrow protection
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-8">
                  
                  {/* Understanding QUID */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border border-red-200/50 shadow-xl">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Understanding QUID</h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 mb-6">
                      QUID is our platform's digital currency for payments, escrow, and withdrawals. All transactions are protected by escrow until job completion and satisfaction.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-bold text-red-600 mb-3">Payment Benefits</h5>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• Secure escrow protection</li>
                          <li>• Transparent pricing</li>
                          <li>• Multiple currency support</li>
                          <li>• Automated payment processing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-yellow-600 mb-3">Transaction Security</h5>
                        <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                          <li>• Funds held until job completion</li>
                          <li>• Dispute resolution process</li>
                          <li>• Refund protection policies</li>
                          <li>• Audit trail for all transactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Escrow & Returns Policy */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Locum Job Payments</h4>
                      <p className="text-gray-800 dark:text-stone-200">
                        Payments are held in escrow and released to professionals upon successful job completion. If there are issues, funds can be returned based on our dispute resolution process.
                      </p>
                    </div>

                    <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-6 border border-white/20 shadow-lg">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Subscription Services</h4>
                      <p className="text-gray-800 dark:text-stone-200">
                        Platform subscriptions and premium features are billed according to your selected plan. Refunds and cancellations are handled according to our refund policy.
                      </p>
                    </div>
                  </div>

                  {/* Withdrawal Policy */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Withdrawal Policy</h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200">
                      Withdrawals are processed to the same currency/account type used for deposits. For cash withdrawals, exchange rates may apply based on your location. See your dashboard for detailed withdrawal options and fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Platform Rules and Conduct */}
          <section id="section-8" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-500 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 8: Platform Rules and Conduct
                    </h3>
                    <p className="text-xl text-yellow-100 font-medium">
                      Expected behavior, prohibited actions, and consequences
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-8">
                  
                  {/* Expected Behavior & Prohibited Actions */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 rounded-2xl p-6 border border-green-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4 text-green-700 dark:text-green-300">Expected Behavior</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Provide accurate job descriptions and requirements</li>
                        <li>• Conduct fair and unbiased hiring processes</li>
                        <li>• Respect candidate privacy and confidentiality</li>
                        <li>• Communicate professionally and promptly</li>
                        <li>• Honor employment agreements and offers</li>
                        <li>• Provide constructive feedback to candidates</li>
                      </ul>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4 text-red-700 dark:text-red-300">Prohibited Actions</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Discriminatory hiring practices</li>
                        <li>• Misleading job descriptions or requirements</li>
                        <li>• Harassment of candidates or platform users</li>
                        <li>• Violation of employment laws</li>
                        <li>• Sharing confidential candidate information</li>
                        <li>• Attempting to circumvent platform fees</li>
                      </ul>
                    </div>
                  </div>

                  {/* Consequences */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">Consequences</h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200">
                      Employers who violate platform rules may face warnings, temporary suspension, or permanent removal from the platform. Serious violations may be reported to relevant authorities and professional organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Making the Most of GLOHSEN Community */}
          <section id="section-9" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 9: Making the Most of GLOHSEN Community
                    </h3>
                    <p className="text-xl text-red-100 font-medium">
                      Online engagement, organizational growth, and success strategies
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-8">
                  
                  {/* Online Engagement & Organizational Growth */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Online Engagement</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Participate in industry discussions and forums</li>
                        <li>• Share insights about healthcare trends and challenges</li>
                        <li>• Connect with other healthcare organizations</li>
                        <li>• Contribute to quality improvement initiatives</li>
                        <li>• Provide feedback on platform features and services</li>
                        <li>• Stay updated with industry best practices</li>
                      </ul>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200/50 shadow-xl">
                      <h4 className="text-xl font-bold text-black dark:text-stone-100 mb-4">Organizational Growth</h4>
                      <ul className="space-y-2 text-gray-800 dark:text-stone-200">
                        <li>• Build your employer brand and reputation</li>
                        <li>• Showcase your organization's culture and values</li>
                        <li>• Develop relationships with top talent</li>
                        <li>• Learn from other successful healthcare organizations</li>
                        <li>• Access professional development resources</li>
                        <li>• Contribute to healthcare education and training</li>
                      </ul>
                    </div>
                  </div>

                  {/* Success Strategies */}
                  <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 rounded-2xl p-8 border border-white/20 shadow-lg">
                    <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-6">Success Strategies</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Maintain an active and complete organization profile</li>
                          <li>• Regularly update job postings and requirements</li>
                          <li>• Respond promptly to candidate applications</li>
                          <li>• Provide detailed feedback to unsuccessful candidates</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-800 dark:text-stone-200">
                          <li>• Engage with the community through forums and events</li>
                          <li>• Share success stories and best practices</li>
                          <li>• Continuously refine your hiring criteria</li>
                          <li>• Build long-term relationships with quality professionals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>        </div>

        {/* Premium Call-to-Action Section */}
        <div className="relative mt-16 backdrop-blur-sm bg-gradient-to-r from-red-600/90 to-yellow-600/90 dark:from-red-800/90 dark:to-yellow-800/90 rounded-3xl p-12 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl text-white text-center overflow-hidden print:hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-600/20 backdrop-blur-3xl"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-6">
              Ready to Transform Your <span className="text-yellow-200">Hiring Process?</span>
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of healthcare organizations that have streamlined their recruitment and improved 
              their staff quality through GLOHSEN's innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="group bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                onClick={playClickSound}
              >
                <span className="flex items-center justify-center">
                  <Building className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Go to Dashboard
                </span>
              </button>
              <button 
                className="group bg-transparent text-white px-10 py-4 rounded-2xl font-bold text-lg border-2 border-white/50 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                onClick={playClickSound}
              >
                <span className="flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Get Support
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isActive={true} />
    </div>
  );
}

export default EmployersHandbook;