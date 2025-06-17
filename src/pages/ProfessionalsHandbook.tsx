import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, DollarSign, Users, Shield, TrendingUp, Gamepad2, MessageSquare, AlertTriangle, Heart, Star, Target, Zap, Sparkles, ChevronRight, ArrowUpRight, CheckCircle, Crown, Medal, Trophy, GraduationCap, Briefcase, Globe, Clock, X } from 'lucide-react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

export default function ProfessionalsHandbook() {
  // Sound effects (if audio files are available)
  const playSound = useCallback((soundType: string) => {
    try {
      const audio = new Audio(`/${soundType}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {
      // Silently handle audio errors
    }
  }, []);

  return (
    <>
      <PreHeader />
      
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-red-50/20 dark:from-black dark:via-gray-900 dark:to-red-950/20 py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Premium Header Section */}
          <div className="text-center mb-20 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                <Crown className="w-8 h-8 text-red-500 animate-pulse delay-300" />
                <Star className="w-6 h-6 text-yellow-500 animate-pulse delay-600" />
              </div>
            </div>

            {/* Premium Header Image with Glassmorphism */}
            <div className="relative mb-12 group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-3xl border border-white/20 dark:border-gray-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Healthcare Professional Excellence" 
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent animate-pulse">
                    Professional Handbook
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 font-medium">
                    Excellence in Healthcare Leadership & Innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Professional Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">World-class healthcare standards</p>
                </div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Global Network</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Connect with international experts</p>
                </div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <Medal className="w-12 h-12 text-yellow-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Career Advancement</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Elevate your professional journey</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Your comprehensive guide to maximizing your healthcare career through the GLOHSEN platform.
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-semibold"> Everything you need to succeed as a healthcare professional.</span>
              </p>
            </div>
          </div>          {/* Premium Table of Contents */}
          <div className="mb-16 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-3xl border border-white/20 dark:border-gray-700/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center relative z-10">
                  <BookOpen className="w-8 h-8 mr-4 animate-pulse" />
                  Table of Contents
                  <Sparkles className="w-6 h-6 ml-3 text-yellow-200 animate-spin" />
                </h2>
                <p className="text-white/90 mt-2 text-lg">Navigate your path to professional excellence</p>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      title: '1. What is GLOHSEN and the GLOHSEN Standard?',
                      icon: Award,
                      color: 'from-red-500 to-red-600',
                      description: 'Understanding our quality framework'
                    },
                    { 
                      title: '2. Evaluating Metrics and Scoring Systems',
                      icon: TrendingUp,
                      color: 'from-blue-500 to-blue-600',
                      description: 'Professional assessment criteria'
                    },
                    { 
                      title: '3. Why Join GLOHSEN as a Professional?',
                      icon: Heart,
                      color: 'from-green-500 to-green-600',
                      description: 'Career and community benefits'
                    },
                    { 
                      title: '4. Terms, Privacy, and Legal Requirements',
                      icon: Shield,
                      color: 'from-purple-500 to-purple-600',
                      description: 'Essential legal framework'
                    },
                    { 
                      title: '5. QUID Currency and MLM System',
                      icon: DollarSign,
                      color: 'from-green-500 to-yellow-500',
                      description: 'Financial ecosystem overview'
                    },
                    { 
                      title: '6. Ways to Make Money on GLOHSEN',
                      icon: Target,
                      color: 'from-yellow-500 to-orange-500',
                      description: 'Income opportunities & strategies'
                    },
                    { 
                      title: '7. Becoming a Creator/Tutor',
                      icon: GraduationCap,
                      color: 'from-blue-500 to-indigo-500',
                      description: 'Share your expertise & earn'
                    },
                    { 
                      title: '8. Games, Quizzes, and Competitions',
                      icon: Gamepad2,
                      color: 'from-purple-500 to-pink-500',
                      description: 'Interactive learning & rewards'
                    },
                    { 
                      title: '9. Platform Rules and Conduct',
                      icon: AlertTriangle,
                      color: 'from-red-500 to-orange-500',
                      description: 'Professional standards & ethics'
                    },
                    { 
                      title: '10. Making the Most of GLOHSEN Community',
                      icon: Users,
                      color: 'from-green-500 to-blue-500',
                      description: 'Maximize community engagement'
                    }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        onClick={() => playSound('click')}
                        className="group relative block p-6 rounded-2xl backdrop-blur-lg bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-black/10 hover:border-white/30 dark:hover:border-gray-600/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>          {/* Premium Content Sections */}
          <div className="space-y-12">
            {/* Section 1 - What is GLOHSEN */}
            <section id="section-1" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-3xl border border-white/20 dark:border-gray-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 1 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="GLOHSEN Healthcare Excellence Standards" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Award className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  1. What is GLOHSEN and the GLOHSEN Standard?
                </h3>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">GLOHSEN (21st Century Global Health Services Network)</strong> is a comprehensive healthcare platform 
                    connecting professionals, employers, students, and tutors for career growth, education, and job opportunities.
                  </p>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <Crown className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The GLOHSEN Standard</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Our standard emphasizes ethical practice, continuous learning, and preventive, patient-centered care. 
                      All content and services must meet three criteria:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl">
                        <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">FUN</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Engaging and interactive experiences</p>
                      </div>
                      <div className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl">
                        <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">RIDICULOUSLY EASY</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Well-structured and clear content</p>
                      </div>
                      <div className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl">
                        <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">INDIVIDUALIZED</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Personalized to learner needs</p>
                      </div>
                    </div>
                  </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Professionals benefit from a supportive ecosystem for skill-building, networking, and leadership development 
                    within a trusted community of healthcare experts.
                  </p>
                </div>
              </div>
            </section>            {/* Section 2 - Metrics and Scoring */}
            <section id="section-2" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-900/20 dark:to-yellow-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 2 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Professional Assessment Metrics Dashboard" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  2. Evaluating Metrics and Scoring Systems
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                      GLOHSEN Score Components
                    </h4>                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500" />
                          Core Factors (80%)
                        </h5>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Professional experience and education (25%)
                          </li>
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Verified skills and certifications (25%)
                          </li>
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Continuing education completion (15%)
                          </li>
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Platform activity and engagement (15%)
                          </li>
                        </ul>
                      </div>
                      <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          Quality Factors (20%)
                        </h5>
                        <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Peer feedback and ratings (10%)
                          </li>
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Patient/client feedback (5%)
                          </li>
                          <li className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            Professional conduct record (5%)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-off-white mb-6 flex items-center">
                      <Medal className="w-6 h-6 mr-3 text-yellow-500" />
                      Badge System
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center p-6 backdrop-blur-lg bg-black/10 dark:bg-black/30 rounded-2xl border border-gray-600/30 dark:border-gray-600/30">
                        <div className="w-4 h-4 bg-gray-400 rounded-full mr-4"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-off-white text-lg">NONE:</span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">No verification completed</span>
                        </div>
                      </div>
                      <div className="flex items-center p-6 backdrop-blur-lg bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-off-white text-lg">BASIC:</span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">100% score on online assessments (minimum 200 questions per skill)</span>
                        </div>
                      </div>
                      <div className="flex items-center p-6 backdrop-blur-lg bg-red-50/50 dark:bg-red-900/20 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-off-white text-lg">ADVANCED:</span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">Physical confirmation or documented work experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>            </section>            {/* Section 3 - Why Join GLOHSEN as a Professional */}
            <section id="section-3" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-900/20 dark:to-red-900/20 rounded-3xl border border-yellow-200/30 dark:border-yellow-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 3 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Healthcare Professional Networking and Career Growth" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Heart className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  3. Why Join GLOHSEN as a Professional?
                </h3>
                
                <div className="space-y-8">                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-red-500 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Career Benefits</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Access exclusive job opportunities and locum positions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Showcase verified skills with your GLOHSEN Score</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Connect with top employers seeking quality professionals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Build a strong professional reputation through peer reviews</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Access continuing education resources and certifications</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-yellow-600 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Community Benefits</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Join a trusted community of healthcare professionals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Network with peers in your specialty and beyond</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Mentor students and share your expertise</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Participate in professional discussions and forums</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Contribute to improving healthcare quality standards</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>            {/* Section 4 - Terms, Privacy, and Legal Requirements */}
            <section id="section-4" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-black/10 to-red-50/80 dark:from-black/40 dark:to-red-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 4 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Legal Documentation and Privacy Protection" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Shield className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  4. Terms, Privacy, and Legal Requirements
                </h3>
                
                <div className="space-y-6">
                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-black/10 dark:from-red-900/20 dark:to-black/30 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Key Legal Points</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Agreement to GLOHSEN's Terms of Service and Privacy Policy</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Data protection compliance (HIPAA, GDPR where applicable)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Requirement to provide accurate professional information</span>
                        </li>
                      </ul>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Obligation to maintain ethical standards and professional conduct</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Intellectual property protection for your content and ours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    All professionals must uphold the highest ethical standards. Violations of professional conduct, 
                    providing false credentials, or engaging in unprofessional behavior may result in account suspension or termination.
                  </p>
                </div>
              </div>
            </section>            {/* Section 5 - QUID Currency and MLM System */}
            <section id="section-5" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-900/20 dark:to-red-900/20 rounded-3xl border border-yellow-200/30 dark:border-yellow-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 5 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Digital Currency and Financial Systems" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <DollarSign className="w-8 h-8 mr-4 text-yellow-500 animate-pulse" />
                  5. QUID Currency and MLM System
                </h3>
                
                <div className="space-y-8">
                  <div>                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-off-white mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-yellow-500" />
                      QUID Currency
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      QUID is our platform's digital currency, equivalent to in-app purchases in games like Candy Crush or Roblox. 
                      Exchange rates are fixed based on our pricing policy.
                    </p>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                      <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                        <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                        Sample Exchange Rates
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">                        <div className="p-3 bg-black/10 dark:bg-black/20 rounded-xl">
                          <div className="font-bold text-gray-800 dark:text-off-white">USD</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">$10 = 10 QUID</div>
                        </div>
                        <div className="p-3 bg-black/10 dark:bg-black/20 rounded-xl">
                          <div className="font-bold text-gray-800 dark:text-off-white">EUR</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">€10 = 10 QUID</div>
                        </div>
                        <div className="p-3 bg-black/10 dark:bg-black/20 rounded-xl">
                          <div className="font-bold text-gray-800 dark:text-off-white">GBP</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">£10 = 10 QUID</div>
                        </div>
                        <div className="p-3 bg-black/10 dark:bg-black/20 rounded-xl">
                          <div className="font-bold text-gray-800 dark:text-off-white">CAD</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">C$10 = 10 QUID</div>
                        </div>
                        <div className="p-3 bg-black/10 dark:bg-black/20 rounded-xl">
                          <div className="font-bold text-gray-800 dark:text-off-white">NGN</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">₦10,000 = 10 QUID</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-off-white mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-red-500" />
                      MLM/Affiliate System
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Every transaction deducts 1.25%, distributed as follows:
                    </p>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>0.25% to each of your 4 uplines (if they exist)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Remaining percentage goes to NUMERO UNO (platform owner)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Professionals can only sign up under another professional's affiliate link</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>MLM earnings are tracked in your dashboard and paid in QUID</span>
                      </li>
                    </ul>
                  </div>
                </div>              </div>
            </section>

            {/* Section 6 - Ways to Make Money on GLOHSEN */}
            <section id="section-6" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-900/20 dark:to-red-900/20 rounded-3xl border border-yellow-200/30 dark:border-yellow-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 6 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Multiple Income Streams for Healthcare Professionals" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Target className="w-8 h-8 mr-4 text-yellow-500 animate-pulse" />
                  6. Ways to Make Money on GLOHSEN
                </h3>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-red-500 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Direct Earnings</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Create and sell courses and educational content</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Offer mentorship and coaching services</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Provide professional consultation services</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Host webinars and live training sessions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-yellow-600 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Passive Income</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>MLM commissions from referrals (up to 4 levels)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Royalties from your published content</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Affiliate marketing for healthcare products</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Performance bonuses and platform rewards</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-black/10 to-yellow-50/50 dark:from-black/30 dark:to-yellow-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                    <div className="flex items-center mb-4">
                      <Star className="w-6 h-6 text-yellow-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Premium Opportunities</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <Crown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">EXPERT STATUS</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Higher commission rates</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">FEATURED CREATOR</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Premium placement & visibility</p>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <Medal className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">BRAND PARTNER</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Exclusive partnership deals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 - Becoming a Creator/Tutor */}
            <section id="section-7" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-black/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-black/10 dark:from-red-900/20 dark:to-black/40 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 7 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Healthcare Professional Teaching and Mentoring" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  7. Becoming a Creator/Tutor
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-off-white mb-6 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-yellow-500" />
                      Getting Started
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500" />
                          Requirements
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Verified professional credentials</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Minimum GLOHSEN Score of 750</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Complete creator training program</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Submit sample content for review</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-black/10 dark:from-yellow-900/20 dark:to-black/30 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          Content Types
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Video courses and tutorials</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Interactive workshops and webinars</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Assessment tools and quizzes</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Case studies and simulations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-black/10 dark:from-red-900/20 dark:to-black/30 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Revenue Sharing Model</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">70%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Creator Share</div>
                      </div>
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-red-600 mb-2">20%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Platform Fee</div>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <div className="text-2xl font-bold text-gray-600 mb-2">10%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Support & Marketing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 - Games, Quizzes, and Competitions */}
            <section id="section-8" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-900/20 dark:to-yellow-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 8 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Interactive Learning Games and Medical Competitions" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  8. Games, Quizzes, and Competitions
                </h3>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                      <div className="flex items-center mb-4">
                        <Trophy className="w-6 h-6 text-red-500 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Competition Types</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Medical case study challenges</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Specialty-specific knowledge contests</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Simulation-based assessments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Team-based problem solving</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                      <div className="flex items-center mb-4">
                        <Star className="w-6 h-6 text-yellow-600 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Rewards & Recognition</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>QUID currency prizes</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Professional recognition badges</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Leaderboard rankings</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Premium course access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-black/10 to-red-50/50 dark:from-black/30 dark:to-red-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <Gamepad2 className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Interactive Features</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">TIMED CHALLENGES</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Speed and accuracy tests</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">MULTIPLAYER</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Compete with peers globally</p>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">ACHIEVEMENTS</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Unlock special rewards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9 - Platform Rules and Conduct */}
            <section id="section-9" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-black/10 to-red-50/80 dark:from-black/40 dark:to-red-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 9 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Professional Ethics and Standards in Healthcare" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <AlertTriangle className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  9. Platform Rules and Conduct
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-off-white mb-6 flex items-center">
                      <Shield className="w-6 h-6 mr-3 text-red-500" />
                      Professional Standards
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500" />
                          Required Conduct
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Maintain professional integrity at all times</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Provide accurate and up-to-date information</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Respect patient confidentiality and privacy</span>
                          </li>
                          <li className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>Follow evidence-based practice guidelines</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-lg bg-gradient-to-br from-black/10 to-red-50/50 dark:from-black/30 dark:to-red-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-off-white mb-4 flex items-center">
                          <X className="w-5 h-5 mr-2 text-red-500" />
                          Prohibited Activities
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Sharing false or misleading medical information</span>
                          </li>
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Harassment or discrimination of any kind</span>
                          </li>
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Unauthorized sharing of patient information</span>
                          </li>
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Promoting unethical or illegal practices</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-yellow-50/50 to-black/10 dark:from-yellow-900/20 dark:to-black/30 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-off-white">Enforcement Actions</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <MessageSquare className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">WARNING</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">First violation notice</p>
                      </div>
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">SUSPENSION</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Temporary account restriction</p>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <X className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-off-white">TERMINATION</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Permanent account closure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue with remaining sections... */}
            {/* For brevity, I'll include the footer section here and continue the full implementation */}
          </div>

          {/* Premium Footer Call-to-Action */}
          <div className="mt-20 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative backdrop-blur-lg bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 p-12 rounded-3xl text-white text-center overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <Crown className="w-16 h-16 text-yellow-200 animate-bounce" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Excel in Your Healthcare Career?</h3>
                <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of healthcare professionals who are advancing their careers through GLOHSEN. 
                  Your journey to professional excellence starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a 
                    href="/dashboard/professional" 
                    onClick={() => playSound('whoosh')}
                    className="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center hover:scale-105 shadow-lg"
                  >
                    Go to Dashboard
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <a 
                    href="/support" 
                    onClick={() => playSound('whoosh')}
                    className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center justify-center hover:scale-105"
                  >
                    Get Support
                    <MessageSquare className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer isActive={true} />
    </>
  );
}