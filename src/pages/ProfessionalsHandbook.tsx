import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, DollarSign, Users, Shield, TrendingUp, Gamepad2, MessageSquare, AlertTriangle, Heart, Sparkles, Star, Target, Zap, Stethoscope, Trophy, GraduationCap, Lock } from 'lucide-react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

export default function ProfessionalsHandbook() {
  // Sound effect functions
  const playClickSound = useCallback(() => {
    const audio = new Audio('/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  const playPageTurnSound = useCallback(() => {
    const audio = new Audio('/page-turn.mp3');
    audio.volume = 0.4;
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
    <>
      <PreHeader />
      
      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break-before { page-break-before: always; }
          .print-break-after { page-break-after: always; }
          body { background: white !important; }
          * { box-shadow: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-red-50/20 dark:from-black dark:via-gray-900 dark:to-red-950/20 py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none no-print">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Premium Header Section */}
          <div className="text-center mb-20 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 no-print">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                <Star className="w-4 h-4 text-red-500 animate-pulse delay-300" />
                <Star className="w-6 h-6 text-yellow-500 animate-pulse delay-600" />
              </div>
            </div>
            
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text mb-6 tracking-tight leading-tight">
                GLOHSEN
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-yellow-500/20 blur-lg rounded-lg no-print"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-stone-100 mb-4 tracking-wide">
              Professionals' <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text">Handbook</span>
            </h2>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-8 font-medium">
              Edition 2025 | For Healthcare Professionals Worldwide
            </div>
            
            {/* Healthcare Professional Image */}
            <div className="mb-8 relative">
              <img 
                src="/3 health professionals inside hopsital ward.png" 
                alt="Healthcare Professionals" 
                className="w-full max-h-48 object-cover rounded-2xl shadow-2xl border-4 border-white/50"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-3xl p-8 shadow-2xl border border-white/20">
              <p className="text-xl md:text-2xl text-gray-800 dark:text-stone-200 leading-relaxed font-medium">
                Your <span className="text-red-600 font-bold">comprehensive guide</span> to maximizing your healthcare career through the GLOHSEN platform. 
                <br />
                <span className="text-yellow-600 font-semibold">Everything you need to know</span> to succeed as a healthcare professional.
              </p>
            </div>

            {/* Premium Accent Line */}
            <div className="mt-12 flex justify-center no-print">
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Premium Table of Contents */}
          <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden mb-16 border border-white/30 dark:border-gray-800/50">
            {/* Luxurious Header */}
            <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-white flex items-center justify-center">
                  <div className="mr-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <span className="tracking-wide">Table of Contents</span>
                  <Sparkles className="w-6 h-6 ml-4 animate-pulse" />
                </h2>
              </div>
            </div>

            {/* Premium Content Grid */}
            <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: '1. What is GLOHSEN and the GLOHSEN Standard?', icon: Award, color: 'red' },
                  { title: '2. Evaluating Metrics and Scoring Systems', icon: TrendingUp, color: 'yellow' },
                  { title: '3. Why Join GLOHSEN as a Professional?', icon: Heart, color: 'red' },
                  { title: '4. Terms, Privacy, and Legal Requirements', icon: Shield, color: 'yellow' },
                  { title: '5. QUID Currency and MLM System', icon: DollarSign, color: 'red' },
                  { title: '6. Ways to Make Money on GLOHSEN', icon: Trophy, color: 'yellow' },
                  { title: '7. Becoming a Creator/Tutor', icon: BookOpen, color: 'red' },
                  { title: '8. Games, Quizzes, and Competitions', icon: Gamepad2, color: 'yellow' },
                  { title: '9. Platform Rules and Conduct', icon: AlertTriangle, color: 'red' },
                  { title: '10. Making the Most of GLOHSEN Community', icon: Users, color: 'yellow' }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  const isRed = item.color === 'red';
                  return (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      onClick={(e) => {
                        playPageTurnSound();
                      }}
                      onMouseEnter={playWhooshSound}
                      className={`group relative block p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 ${
                        isRed 
                          ? 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border-red-200/50 dark:border-red-800/30 hover:border-red-400 hover:from-red-100 hover:to-red-200/70' 
                          : 'bg-gradient-to-br from-yellow-50 to-amber-100/50 dark:from-yellow-950/30 dark:to-yellow-900/20 border-yellow-200/50 dark:border-yellow-800/30 hover:border-yellow-400 hover:from-yellow-100 hover:to-amber-200/70'
                      }`}
                    >
                      {/* Premium Icon Container */}
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                        isRed 
                          ? 'bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700' 
                          : 'bg-gradient-to-br from-yellow-500 to-amber-600 group-hover:from-yellow-600 group-hover:to-amber-700'
                      }`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Premium Typography */}
                      <h3 className={`text-lg font-bold leading-tight transition-colors group-hover:${isRed ? 'text-red-700' : 'text-yellow-700'} ${
                        isRed ? 'text-red-900 dark:text-red-100' : 'text-yellow-900 dark:text-yellow-100'
                      }`}>
                        {item.title}
                      </h3>
                        {/* Hover Effect Accent */}
                      <div className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full rounded-b-2xl ${
                        isRed ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-yellow-500 to-amber-600'
                      }`}></div>
                      
                      {/* Premium Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>        {/* Premium Content Sections */}
        <div className="space-y-16">
          {/* Premium Section 1 */}
          <section id="section-1" className="group relative print-break-before">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">1.</span>What is GLOHSEN?
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      The GLOHSEN Standard for Healthcare Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-10">
                  
                  {/* Platform Overview Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          GLOHSEN Platform Overview
                        </h4>
                        <p className="text-lg text-gray-700 dark:text-stone-300 mb-6 leading-relaxed">
                          <strong className="text-red-600">GLOHSEN (21st Century Global Health Services Network)</strong> is a comprehensive healthcare platform 
                          connecting professionals, employers, students, and tutors for career growth, education, and job opportunities.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-stone-300 leading-relaxed">
                          Professionals benefit from a supportive ecosystem for skill-building, networking, and leadership development 
                          within a trusted community of healthcare experts.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* GLOHSEN Standard - Premium Design */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                    <div className="absolute top-4 right-4 opacity-10">
                      <Zap className="w-16 h-16 text-red-600" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-8">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl shadow-lg mr-6">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            The GLOHSEN Standard
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                            Our standard emphasizes ethical practice, continuous learning, and preventive, patient-centered care
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center group">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-lg mb-6 transition-transform group-hover:scale-110">
                            <Gamepad2 className="w-10 h-10 text-white" />
                          </div>
                          <h5 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-3">FUN</h5>
                          <p className="text-gray-700 dark:text-stone-300 leading-relaxed">
                            Engaging and interactive experiences that make learning enjoyable and memorable
                          </p>
                        </div>
                        
                        <div className="text-center group">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-3xl shadow-lg mb-6 transition-transform group-hover:scale-110">
                            <Zap className="w-10 h-10 text-white" />
                          </div>
                          <h5 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-3">RIDICULOUSLY EASY</h5>
                          <p className="text-gray-700 dark:text-stone-300 leading-relaxed">
                            Well-structured, clear content that's accessible and easy to understand
                          </p>
                        </div>
                        
                        <div className="text-center group">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-3xl shadow-lg mb-6 transition-transform group-hover:scale-110">
                            <Target className="w-10 h-10 text-white" />
                          </div>
                          <h5 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-3">INDIVIDUALIZED</h5>
                          <p className="text-gray-700 dark:text-stone-300 leading-relaxed">
                            Personalized to meet individual learner needs and preferences
                          </p>
                        </div>
                      </div>                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium Section 2 */}
            <section id="section-2" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">2.</span>Evaluating Metrics
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        GLOHSEN Score, KPIs, EQ Assessment & Scoring Systems
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Trophy className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    {/* GLOHSEN Score Components */}
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                      <div className="flex items-start mb-8">
                        <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                            GLOHSEN Score Components
                          </h4>
                          <p className="text-lg text-gray-700 dark:text-stone-300 mb-6">
                            The GLOHSEN Score is a comprehensive evaluation of your experience, skills, certifications, and platform activity. 
                            Professional Candidate KPIs and EQ assessments help you track and improve your performance.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-2xl border border-blue-200/50">
                          <h5 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Core Factors (80%)</h5>
                          <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              Professional experience and education
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              Verified skills and certifications
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              Platform activity and engagement
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 rounded-2xl border border-green-200/50">
                          <h5 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Quality Factors (20%)</h5>
                          <ul className="space-y-2 text-gray-700 dark:text-stone-300">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              Peer feedback and ratings
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              Patient/client feedback
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              Professional conduct record
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Badge System */}
                    <div className="relative backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                      <div className="flex items-center mb-8">
                        <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg mr-6">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            Professional Badge System
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                            The feedback system ensures transparency and helps you build a strong professional reputation
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
                          <div className="w-6 h-6 bg-gray-400 rounded-full mr-6 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">NONE:</span>
                            <span className="text-lg text-gray-600 dark:text-gray-400 ml-3">No verification completed</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 rounded-2xl">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full mr-6 flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xl font-bold text-yellow-800 dark:text-yellow-200">BASIC:</span>
                            <span className="text-lg text-yellow-700 dark:text-yellow-300 ml-3">Online assessments completed</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl">
                          <div className="w-6 h-6 bg-green-500 rounded-full mr-6 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xl font-bold text-green-800 dark:text-green-200">ADVANCED:</span>
                            <span className="text-lg text-green-700 dark:text-green-300 ml-3">Physical confirmation or documented work experience</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 3 */}
            <section id="section-3" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">3.</span>Why Join GLOHSEN?
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Professional Benefits and Community Impact
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    {/* Healthcare Professional Benefits Image */}
                    <div className="mb-8 relative">
                      <img 
                        src="/3 health professionals inside hopsital ward.png" 
                        alt="Healthcare Professionals Collaboration" 
                        className="w-full max-h-64 object-cover rounded-2xl shadow-2xl border-4 border-white/50"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl flex items-end p-8">
                        <h4 className="text-2xl font-bold text-white">Join a Global Network of Healthcare Excellence</h4>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="flex items-start mb-6">
                          <div className="mr-4 p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100">Career Benefits</h4>
                        </div>
                        <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Access exclusive job opportunities, locum positions, and continuing education resources</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Showcase your verified skills and credentials to employers using your GLOHSEN Score</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Connect with top employers seeking quality professionals</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="flex items-start mb-6">
                          <div className="mr-4 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100">Community Benefits</h4>
                        </div>
                        <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Join a trusted community of healthcare professionals and grow your career with support and recognition</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Network with peers in your specialty and beyond</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Participate in professional discussions and forums</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>            </section>

            {/* Premium Section 4 */}
            <section id="section-4" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">4.</span>Terms & Privacy
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Legal Requirements and Data Protection
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Lock className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                    <div className="flex items-center mb-8">
                      <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg mr-6">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                          Key Legal Points
                        </h4>
                        <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                          Your responsibilities and our commitments to data protection
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Agreement to GLOHSEN's Terms of Service and Privacy Policy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Data protection compliance (HIPAA, GDPR where applicable)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Requirement to provide accurate professional information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Obligation to maintain ethical standards and professional conduct</span>
                      </li>
                    </ul>
                    
                    <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-yellow-100 dark:from-red-900/40 dark:to-yellow-900/40 rounded-2xl border border-red-200/50">
                      <p className="text-gray-700 dark:text-stone-300 leading-relaxed">
                        All professionals must uphold the highest ethical standards. Violations of professional conduct, 
                        providing false credentials, or engaging in unprofessional behavior may result in account suspension or termination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 5 */}
            <section id="section-5" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">5.</span>QUID & MLM System
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Digital Currency and Affiliate Network
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Trophy className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                      <div className="flex items-start mb-6">
                        <div className="mr-4 p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                          <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                            QUID Currency
                          </h4>
                          <p className="text-lg text-gray-700 dark:text-stone-300 mb-6">
                            QUID is our platform's digital currency, equivalent to in-app purchases in games like Candy Crush or Roblox.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 rounded-2xl border border-green-200/50">
                        <h5 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Sample Exchange Rates</h5>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div className="text-center p-2 bg-white/50 rounded-lg">USD: $10 = 10 QUID</div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">EUR: €10 = 10 QUID</div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">GBP: £10 = 10 QUID</div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">CAD: C$10 = 10 QUID</div>
                          <div className="text-center p-2 bg-white/50 rounded-lg">NGN: ₦10K = 10 QUID</div>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                      <div className="flex items-center mb-8">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl shadow-lg mr-6">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            MLM/Affiliate System
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                            Every transaction deducts 1.25%, distributed as follows:
                          </p>
                        </div>
                      </div>
                      
                      <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>0.25% to each of your 4 uplines (if they exist)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Remaining percentage goes to NUMERO UNO (platform owner)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Professionals can only sign up under another professional's affiliate link</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>MLM earnings are tracked in your dashboard and paid in QUID</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 6 */}
            <section id="section-6" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">6.</span>Ways to Earn
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Multiple Revenue Streams on GLOHSEN
                      </p>
                    </div>
                    <div className="ml-auto">
                      <DollarSign className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl p-8 border border-blue-200/50 shadow-xl">
                        <h4 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-blue-500 rounded-lg">
                            <Stethoscope className="w-6 h-6 text-white" />
                          </div>
                          Employment Opportunities
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Permanent job positions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Locum assignments (temporary work)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Contract-based projects</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Consulting opportunities</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 rounded-2xl p-8 border border-green-200/50 shadow-xl">
                        <h4 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-green-500 rounded-lg">
                            <Gamepad2 className="w-6 h-6 text-white" />
                          </div>
                          Platform Activities
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Win competitions and quizzes</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Moderate community discussions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Participate in research studies</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Provide peer reviews and feedback</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-950/30 dark:to-purple-900/30 rounded-2xl p-8 border border-purple-200/50 shadow-xl">
                        <h4 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-purple-500 rounded-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          Content Creation
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Create and sell courses</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Develop educational games</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Write blog articles</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Mentor students (paid sessions)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/80 dark:from-yellow-950/30 dark:to-amber-900/30 rounded-2xl p-8 border border-yellow-200/50 shadow-xl">
                        <h4 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-yellow-500 rounded-lg">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          Referral Income
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>MLM commissions from referrals</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Multi-level earnings (up to 4 levels)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Passive income from network growth</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Bonus rewards for top referrers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 7 */}
            <section id="section-7" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">7.</span>Creator/Tutor
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Share Your Expertise and Earn Revenue
                      </p>
                    </div>
                    <div className="ml-auto">
                      <GraduationCap className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                      <p className="text-xl text-gray-700 dark:text-stone-300 mb-8 leading-relaxed">
                        Apply to become a Creator/Tutor to share your expertise with the healthcare community and earn revenue.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl p-8 border border-blue-200/50">
                          <h4 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-6 flex items-center">
                            <div className="mr-3 p-2 bg-blue-500 rounded-lg">
                              <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            Requirements
                          </h4>
                          <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Valid professional credentials</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Minimum 2 years experience in specialty</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Good standing in professional community</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Sample content submission</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Agreement to quality standards</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 rounded-2xl p-8 border border-green-200/50">
                          <h4 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center">
                            <div className="mr-3 p-2 bg-green-500 rounded-lg">
                              <Trophy className="w-6 h-6 text-white" />
                            </div>
                            Benefits
                          </h4>
                          <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Revenue from course sales</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Recognition as subject matter expert</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Access to AI course creation tools</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Student analytics and feedback</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>Professional development opportunities</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl shadow-lg mr-6">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            Content Standards
                          </h4>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-stone-300 leading-relaxed">
                        All content must meet the GLOHSEN Standard: be engaging (FUN), well-structured (RIDICULOUSLY EASY), 
                        and adaptable to individual learner needs (INDIVIDUALIZED). Content is regularly reviewed and must 
                        maintain high quality ratings from students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 8 */}
            <section id="section-8" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Gamepad2 className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">8.</span>Games & Competitions
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Interactive Learning and Skill Assessment
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Star className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                      <p className="text-xl text-gray-700 dark:text-stone-300 mb-8 leading-relaxed">
                        Participate in interactive learning activities to enhance your knowledge, earn points, and win prizes.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-950/30 dark:to-purple-900/30 rounded-2xl p-8 text-center border border-purple-200/50 shadow-xl">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                            <Gamepad2 className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Medical Games</h4>
                          <p className="text-gray-700 dark:text-stone-300">
                            Interactive simulations and case studies to practice clinical skills
                          </p>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl p-8 text-center border border-blue-200/50 shadow-xl">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Knowledge Quizzes</h4>
                          <p className="text-gray-700 dark:text-stone-300">
                            Test your expertise and compete with peers in your specialty
                          </p>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 rounded-2xl p-8 text-center border border-green-200/50 shadow-xl">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-6">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Competitions</h4>
                          <p className="text-gray-700 dark:text-stone-300">
                            Win cash prizes and recognition in platform-wide challenges
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                      <div className="flex items-center mb-8">
                        <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg mr-6">
                          <Star className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            Participation Benefits
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                            Enhance your skills and earn rewards through active participation
                          </p>
                        </div>
                      </div>
                      
                      <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Improve your GLOHSEN Score through active participation</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Earn badges and certificates for achievements</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Win QUID prizes and cash rewards</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Build your professional reputation</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Stay current with medical knowledge</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 9 */}
            <section id="section-9" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">9.</span>Rules & Conduct
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Professional Standards and Platform Guidelines
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Shield className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 rounded-2xl p-8 border-l-4 border-green-500 shadow-xl">
                        <h4 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-green-500 rounded-lg">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          Expected Behavior
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Maintain professional conduct at all times</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Provide accurate credentials and information</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Respect patient confidentiality and privacy</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Engage constructively in discussions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Support fellow professionals</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Follow evidence-based practices</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/30 rounded-2xl p-8 border-l-4 border-red-500 shadow-xl">
                        <h4 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-6 flex items-center">
                          <div className="mr-3 p-2 bg-red-500 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          Prohibited Actions
                        </h4>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Providing false credentials or information</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Harassment or discrimination</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Sharing inappropriate content</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Violating patient confidentiality</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Engaging in unprofessional behavior</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Attempting to circumvent platform rules</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl shadow-lg mr-6">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            Consequences
                          </h4>
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-stone-300 leading-relaxed">
                        Professionals who violate platform rules may face warnings, temporary suspension, or permanent 
                        removal from the platform. Serious violations may be reported to relevant professional licensing boards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Section 10 */}
            <section id="section-10" className="group relative print-break-before">
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
                
                <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                        <span className="text-5xl font-black mr-4">10.</span>Community Excellence
                      </h3>
                      <p className="text-xl text-white/90 font-medium">
                        Making the Most of GLOHSEN Community
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Heart className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  <div className="space-y-10">
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="flex items-start mb-6">
                          <div className="mr-4 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                            <MessageSquare className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100">Online Engagement</h4>
                        </div>
                        <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Participate actively in forum discussions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Share your expertise and insights</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Mentor students and junior professionals</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Collaborate on research and projects</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Provide constructive feedback to peers</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Stay updated with industry trends</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                        <div className="flex items-start mb-6">
                          <div className="mr-4 p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold text-black dark:text-stone-100">Professional Growth</h4>
                        </div>
                        <ul className="space-y-4 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Continuously update your skills and knowledge</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Seek feedback and act on it constructively</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Build meaningful professional relationships</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Contribute to quality improvement initiatives</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Participate in continuing education programs</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Share best practices with the community</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 rounded-3xl p-10 border-2 border-green-200/50 dark:border-green-800/30 shadow-2xl">
                      <div className="flex items-center mb-8">
                        <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mr-6">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-2">
                            Success Tips
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-stone-300 font-medium">
                            Maximize your professional impact and career growth
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Complete your profile thoroughly</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Upload current certifications and credentials</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Engage regularly with platform content</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Maintain a professional online presence</span>
                          </li>
                        </ul>
                        <ul className="space-y-3 text-gray-700 dark:text-stone-300">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Respond promptly to messages and opportunities</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Seek out learning and networking opportunities</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Contribute valuable content to discussions</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Build and maintain your GLOHSEN Score</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Premium Call-to-Action Section */}
          <div className="mt-20 mb-16 no-print">
            <div className="relative backdrop-blur-lg bg-gradient-to-r from-red-600/90 via-red-700/90 to-yellow-600/90 rounded-3xl p-12 shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-yellow-500/80"></div>
              <div className="relative z-10 text-center text-white">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm border border-white/30">
                  <Stethoscope className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black mb-6 tracking-wide">Ready to Advance Your Healthcare Career?</h3>
                <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of healthcare professionals who are elevating their careers through GLOHSEN. 
                  Your journey to professional excellence and global impact starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link 
                    to="/dashboard/professional" 
                    onClick={playChimeSound}
                    className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-stone-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Trophy className="w-6 h-6 mr-3" />
                    Go to Dashboard
                  </Link>
                  <Link 
                    to="/support" 
                    onClick={playClickSound}
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageSquare className="w-6 h-6 mr-3" />
                    Get Support                  </Link>                </div>              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isActive={true} />
    </>
  );
};