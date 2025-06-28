import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, DollarSign, Users, Shield, TrendingUp, Gamepad2, MessageSquare, AlertTriangle, Heart, Star, Target, Zap, Sparkles, ChevronRight, ArrowUpRight, CheckCircle, Crown, Medal, Trophy, GraduationCap, Briefcase, Globe, Clock, X } from 'lucide-react';

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
                  <p className="text-gray-600 dark:text-white mt-2">World-class healthcare standards</p>
                </div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Global Network</h3>
                  <p className="text-gray-600 dark:text-white mt-2">Connect with international experts</p>
                </div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <Medal className="w-12 h-12 text-yellow-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Career Advancement</h3>
                  <p className="text-gray-600 dark:text-white mt-2">Elevate your professional journey</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-white leading-relaxed font-light">
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
                            <p className="text-sm text-gray-600 dark:text-black mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
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
          <div className="space-y-12">            {/* Section 1 - What is GLOHSEN */}
            <motion.section 
              id="section-1" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-yellow-50/80 border border-red-100/50 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-yellow-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 1 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="GLOHSEN Healthcare Excellence Standards" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Award className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  1. What is GLOHSEN and the GLOHSEN Standard?
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-lg text-gray-700 dark:text-black leading-relaxed">
                    <strong className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">GLOHSEN (21st Century Global Health Services Network)</strong> is a comprehensive healthcare platform 
                    connecting professionals, employers, students, and tutors for career growth, education, and job opportunities.
                  </p>
                  
                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <Crown className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black">The GLOHSEN Standard</h4>
                    </div>
                    <p className="text-gray-700 dark:text-black mb-4">
                      Our standard emphasizes ethical practice, continuous learning, and preventive, patient-centered care. 
                      All content and services must meet three criteria:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.div 
                        className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2 group-hover:animate-pulse" />
                        <h5 className="font-bold text-gray-800 dark:text-black">FUN</h5>
                        <p className="text-sm text-gray-600 dark:text-black">Engaging and interactive experiences</p>
                      </motion.div>
                      <motion.div 
                        className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Target className="w-8 h-8 text-red-500 mx-auto mb-2 group-hover:animate-pulse" />
                        <h5 className="font-bold text-gray-800 dark:text-black">RIDICULOUSLY EASY</h5>
                        <p className="text-sm text-gray-600 dark:text-black">Well-structured and clear content</p>
                      </motion.div>
                      <motion.div 
                        className="text-center p-4 bg-white/20 dark:bg-black/20 rounded-xl cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:animate-pulse" />
                        <h5 className="font-bold text-gray-800 dark:text-black">INDIVIDUALIZED</h5>
                        <p className="text-sm text-gray-600 dark:text-black">Personalized to learner needs</p>
                      </motion.div>                    </div>
                  </div>
                    <p className="text-lg text-gray-700 dark:text-black leading-relaxed">
                    Professionals benefit from a supportive ecosystem for skill-building, networking, and leadership development 
                    within a trusted community of healthcare experts.
                  </p>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.div 
                  className="absolute bottom-8 right-8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => playSound('chime')}
                    className="group w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <ArrowUpRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>
            </motion.section>            {/* Section 2 - Metrics and Scoring */}
            <motion.section 
              id="section-2" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 via-transparent to-yellow-100/30 animate-gradient-x"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-yellow-50/80 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-yellow-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 2 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Professional Assessment Metrics Dashboard" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    2. Evaluating Metrics and Scoring Systems
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                      GLOHSEN Score Components
                    </h4>                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500" />
                          Core Factors (80%)
                        </h5>
                        <ul className="text-gray-700 dark:text-black space-y-3">
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
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          Quality Factors (20%)
                        </h5>
                        <ul className="text-gray-700 dark:text-black space-y-3">
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

                  <div>                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <Medal className="w-6 h-6 mr-3 text-yellow-500" />
                      Badge System
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center p-6 backdrop-blur-lg bg-black/10 dark:bg-black/30 rounded-2xl border border-gray-600/30 dark:border-gray-600/30">
                        <div className="w-4 h-4 bg-gray-400 rounded-full mr-4"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-black text-lg">NONE:</span>
                          <span className="text-gray-600 dark:text-black ml-2">No verification completed</span>
                        </div>
                      </div>
                      <div className="flex items-center p-6 backdrop-blur-lg bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-black text-lg">BASIC:</span>
                          <span className="text-gray-600 dark:text-black ml-2">100% score on online assessments (minimum 200 questions per skill)</span>
                        </div>
                      </div>
                      <div className="flex items-center p-6 backdrop-blur-lg bg-red-50/50 dark:bg-red-900/20 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-black text-lg">ADVANCED:</span>
                          <span className="text-gray-600 dark:text-black ml-2">Physical confirmation or documented work experience</span>
                        </div>
                      </div>
                    </div>                  </div>
                </div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <TrendingUp className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>            {/* Section 3 - Why Join GLOHSEN as a Professional */}
            <motion.section 
              id="section-3" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-red-100/30 animate-gradient-x"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-yellow-50/70 to-red-50/80 border border-yellow-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-red-200/20 to-yellow-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 3 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Healthcare Professional Networking and Career Growth" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <Heart className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    3. Why Join GLOHSEN as a Professional?
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-red-500 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-red-600 transition-colors duration-300">Career Benefits</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "Access exclusive job opportunities and locum positions",
                          "Showcase verified skills with your GLOHSEN Score",
                          "Connect with top employers seeking quality professionals",
                          "Build a strong professional reputation through peer reviews",
                          "Access continuing education resources and certifications"
                        ].map((benefit, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-red-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-yellow-600 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-yellow-600 transition-colors duration-300">Community Benefits</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "Join a trusted community of healthcare professionals",
                          "Participate in professional development programs",
                          "Share knowledge and learn from experienced peers",
                          "Access professional forums and discussion groups",
                          "Receive mentorship opportunities"
                        ].map((benefit, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-yellow-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >                  <Heart className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>
            
            {/* Section 4 - Terms, Privacy, and Legal Requirements */}
            <motion.section 
              id="section-4" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-red-50 to-yellow-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-black/5 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-black/10 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-black/10 to-red-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 4 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Legal Documentation and Privacy Protection" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <Shield className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    4. Terms, Privacy, and Legal Requirements
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div 
                    className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-black/10 dark:from-red-900/20 dark:to-black/30 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 mr-3 group-hover:animate-pulse" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-red-600 transition-colors duration-300">Key Legal Points</h4>
                    </div>
                    <motion.div 
                      className="grid md:grid-cols-2 gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.ul 
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                        className="space-y-3 text-gray-700 dark:text-black"
                      >
                        {[
                          "Agreement to GLOHSEN's Terms of Service and Privacy Policy",
                          "Data protection compliance (HIPAA, GDPR where applicable)",
                          "Requirement to provide accurate professional information"
                        ].map((point, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start hover:text-red-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      <motion.ul 
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          show: { opacity: 1, x: 0 }
                        }}
                        className="space-y-3 text-gray-700 dark:text-black"
                      >
                        {[
                          "Obligation to maintain ethical standards and professional conduct",
                          "Intellectual property protection for your content and ours"
                        ].map((point, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start hover:text-red-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-lg text-gray-700 dark:text-black leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    All professionals must uphold the highest ethical standards. Violations of professional conduct, 
                    providing false credentials, or engaging in unprofessional behavior may result in account suspension or termination.
                  </motion.p>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Shield className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>
              {/* Section 5 - QUID Currency and MLM System */}
            <motion.section 
              id="section-5" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-yellow-50/70 to-red-50/80 border border-yellow-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-red-200/20 to-yellow-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 5 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Digital Currency and Financial Systems" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <DollarSign className="w-8 h-8 mr-4 text-yellow-500 animate-pulse" />
                    5. QUID Currency and MLM System
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-yellow-500 animate-pulse" />
                      QUID Currency
                    </h4>
                    <motion.p 
                      className="text-lg text-gray-700 dark:text-black leading-relaxed mb-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      QUID is our platform's digital currency, equivalent to in-app purchases in games like Candy Crush or Roblox. 
                      Exchange rates are fixed based on our pricing policy.
                    </motion.p>
                    
                    <motion.div 
                      className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                        <Crown className="w-5 h-5 mr-2 text-yellow-500 animate-bounce" />
                        Sample Exchange Rates
                      </h5>
                      <motion.div 
                        className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          { currency: "USD", rate: "$10 = 10 QUID" },
                          { currency: "EUR", rate: "€10 = 10 QUID" },
                          { currency: "GBP", rate: "£10 = 10 QUID" },
                          { currency: "CAD", rate: "C$10 = 10 QUID" },
                          { currency: "NGN", rate: "₦10,000 = 10 QUID" }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              show: { opacity: 1, y: 0 }
                            }}
                            className="p-3 bg-black/10 dark:bg-black/20 rounded-xl hover:bg-yellow-100/30 transition-all duration-300 cursor-pointer group"
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="font-bold text-gray-800 dark:text-black group-hover:text-yellow-600 transition-colors duration-300">{item.currency}</div>
                            <div className="text-sm text-gray-600 dark:text-black">{item.rate}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-red-500 animate-pulse" />
                      MLM/Affiliate System
                    </h4>
                    <motion.p 
                      className="text-lg text-gray-700 dark:text-black leading-relaxed mb-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Every transaction deducts 1.25%, distributed as follows:
                    </motion.p>
                    <motion.ul 
                      className="space-y-3 text-gray-700 dark:text-black"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {[
                        "0.25% to each of your 4 uplines (if they exist)",
                        "Remaining percentage goes to NUMERO UNO (platform owner)",
                        "Professionals can only sign up under another professional's affiliate link",
                        "MLM earnings are tracked in your dashboard and paid in QUID"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            show: { opacity: 1, x: 0 }
                          }}
                          className="flex items-start hover:text-yellow-600 transition-colors duration-300 cursor-pointer"
                          whileHover={{ x: 10 }}
                        >
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <DollarSign className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>            {/* Section 6 - Ways to Make Money on GLOHSEN */}
            <motion.section 
              id="section-6" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-yellow-50/70 to-red-50/80 border border-yellow-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-red-200/20 to-yellow-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 6 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Multiple Income Streams for Healthcare Professionals" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <Target className="w-8 h-8 mr-4 text-yellow-500 animate-pulse" />
                    6. Ways to Make Money on GLOHSEN
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        show: { opacity: 1, x: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-red-500 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-red-600 transition-colors duration-300">Direct Earnings</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "Create and sell courses and educational content",
                          "Offer mentorship and coaching services",
                          "Provide professional consultation services",
                          "Host webinars and live training sessions"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-red-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        show: { opacity: 1, x: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-yellow-600 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-yellow-600 transition-colors duration-300">Passive Income</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "MLM commissions from referrals (up to 4 levels)",
                          "Royalties from your published content",
                          "Affiliate marketing for healthcare products",
                          "Performance bonuses and platform rewards"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-yellow-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="backdrop-blur-lg bg-gradient-to-r from-black/10 to-yellow-50/50 dark:from-black/30 dark:to-yellow-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-4">
                      <Star className="w-6 h-6 text-yellow-500 mr-3 animate-spin" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black">Premium Opportunities</h4>
                    </div>
                    <motion.div 
                      className="grid md:grid-cols-3 gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {[
                        { icon: Crown, title: "EXPERT STATUS", desc: "Higher commission rates", color: "red" },
                        { icon: Trophy, title: "FEATURED CREATOR", desc: "Premium placement & visibility", color: "yellow" },
                        { icon: Medal, title: "BRAND PARTNER", desc: "Exclusive partnership deals", color: "black" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className={`text-center p-4 bg-${item.color === 'black' ? 'black/10 dark:bg-black/20' : `${item.color}-50/50 dark:bg-${item.color}-900/20`} rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className={`w-8 h-8 text-${item.color === 'black' ? 'red' : item.color}-500 mx-auto mb-2 group-hover:animate-pulse`} />
                          <h5 className="font-bold text-gray-800 dark:text-black">{item.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-black">{item.desc}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Target className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>            {/* Section 7 - Becoming a Creator/Tutor */}
            <motion.section 
              id="section-7" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-black/5 to-yellow-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-black/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-black/5 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-black/10 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-black/10 to-red-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 7 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Healthcare Professional Teaching and Mentoring" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <GraduationCap className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    7. Becoming a Creator/Tutor
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-yellow-500" />
                      Getting Started
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500" />
                          Requirements
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-black">
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
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                          Content Types
                        </h5>
                        <ul className="space-y-3 text-gray-700 dark:text-black">
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
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black">Revenue Sharing Model</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">70%</div>
                        <div className="text-sm text-gray-600 dark:text-black">Creator Share</div>
                      </div>
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <div className="text-2xl font-bold text-red-600 mb-2">20%</div>
                        <div className="text-sm text-gray-600 dark:text-black">Platform Fee</div>
                      </div>                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <div className="text-2xl font-bold text-gray-600 dark:text-black mb-2">10%</div>
                        <div className="text-sm text-gray-600 dark:text-black">Support & Marketing</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <GraduationCap className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>            {/* Section 8 - Games, Quizzes, and Competitions */}
            <motion.section 
              id="section-8" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-yellow-50/80 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-yellow-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 8 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Interactive Learning Games and Medical Competitions" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <Gamepad2 className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    8. Games, Quizzes, and Competitions
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        show: { opacity: 1, x: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <Trophy className="w-6 h-6 text-red-500 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-red-600 transition-colors duration-300">Competition Types</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "Medical case study challenges",
                          "Specialty-specific knowledge contests",
                          "Simulation-based assessments",
                          "Team-based problem solving"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-red-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        show: { opacity: 1, x: 0 }
                      }}
                      className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center mb-4">
                        <Star className="w-6 h-6 text-yellow-600 mr-3 group-hover:animate-bounce" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-black group-hover:text-yellow-600 transition-colors duration-300">Rewards & Recognition</h4>
                      </div>
                      <motion.ul 
                        className="space-y-3 text-gray-700 dark:text-black"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {[
                          "QUID currency prizes",
                          "Professional recognition badges",
                          "Leaderboard rankings",
                          "Premium course access"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              show: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start hover:text-yellow-600 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="backdrop-blur-lg bg-gradient-to-r from-black/10 to-red-50/50 dark:from-black/30 dark:to-red-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-4">
                      <Gamepad2 className="w-6 h-6 text-red-500 mr-3 animate-pulse" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black">Interactive Features</h4>
                    </div>
                    <motion.div 
                      className="grid md:grid-cols-3 gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {[
                        { icon: Clock, title: "TIMED CHALLENGES", desc: "Speed and accuracy tests", color: "red" },
                        { icon: Users, title: "MULTIPLAYER", desc: "Compete with peers globally", color: "yellow" },
                        { icon: Award, title: "ACHIEVEMENTS", desc: "Unlock special rewards", color: "black" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className={`text-center p-4 bg-${item.color === 'black' ? 'black/10 dark:bg-black/20' : `${item.color}-50/50 dark:bg-${item.color}-900/20`} rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className={`w-8 h-8 text-${item.color === 'black' ? 'red' : item.color}-500 mx-auto mb-2 group-hover:animate-pulse`} />
                          <h5 className="font-bold text-gray-800 dark:text-black">{item.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-black">{item.desc}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Gamepad2 className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>            {/* Section 9 - Platform Rules and Conduct */}
            <motion.section 
              id="section-9" 
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated Background Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-red-50 to-yellow-50 opacity-60 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-black/5 to-red-50/80 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
                {/* Floating Decorative Elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-black/10 to-red-200/20 rounded-full animate-float"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-red-200/20 to-black/10 rounded-full animate-float-delayed"></div>
                
                {/* Image for Section 9 */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Professional Ethics and Standards in Healthcare" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Premium Header */}
                <motion.div 
                  className="relative z-10 mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <AlertTriangle className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                    9. Platform Rules and Conduct
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>                
                {/* Content with Framer Motion */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-black mb-6 flex items-center">
                      <Shield className="w-6 h-6 mr-3 text-red-500 animate-pulse" />
                      Professional Standards
                    </h4>
                    <motion.div 
                      className="grid md:grid-cols-2 gap-6"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.2
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: -30 },
                          show: { opacity: 1, x: 0 }
                        }}
                        className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-red-500 group-hover:animate-bounce" />
                          Required Conduct
                        </h5>
                        <motion.ul 
                          className="space-y-3 text-gray-700 dark:text-black"
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="show"
                        >
                          {[
                            "Maintain professional integrity at all times",
                            "Provide accurate and up-to-date information",
                            "Respect patient confidentiality and privacy",
                            "Follow evidence-based practice guidelines"
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                show: { opacity: 1, x: 0 }
                              }}
                              className="flex items-start hover:text-red-600 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                      
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          show: { opacity: 1, x: 0 }
                        }}
                        className="backdrop-blur-lg bg-gradient-to-br from-black/10 to-red-50/50 dark:from-black/30 dark:to-red-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h5 className="text-lg font-medium text-gray-800 dark:text-black mb-4 flex items-center">
                          <X className="w-5 h-5 mr-2 text-red-500 group-hover:animate-bounce" />
                          Prohibited Activities
                        </h5>
                        <motion.ul 
                          className="space-y-3 text-gray-700 dark:text-black"
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="show"
                        >
                          {[
                            "Sharing false or misleading medical information",
                            "Harassment or discrimination of any kind",
                            "Unauthorized sharing of patient information",
                            "Promoting unethical or illegal practices"
                          ].map((item, index) => (
                            <motion.li
                              key={index}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                show: { opacity: 1, x: 0 }
                              }}
                              className="flex items-start hover:text-red-600 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="backdrop-blur-lg bg-gradient-to-r from-yellow-50/50 to-black/10 dark:from-yellow-900/20 dark:to-black/30 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 animate-pulse" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-black">Enforcement Actions</h4>
                    </div>
                    <motion.div 
                      className="grid md:grid-cols-3 gap-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {[
                        { icon: MessageSquare, title: "WARNING", desc: "First violation notice", color: "yellow" },
                        { icon: Clock, title: "SUSPENSION", desc: "Temporary account restriction", color: "red" },
                        { icon: X, title: "TERMINATION", desc: "Permanent account closure", color: "black" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className={`text-center p-4 bg-${item.color === 'black' ? 'black/10 dark:bg-black/20' : `${item.color}-50/50 dark:bg-${item.color}-900/20`} rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className={`w-8 h-8 text-${item.color === 'black' ? 'red' : item.color}-500 mx-auto mb-2 group-hover:animate-pulse`} />
                          <h5 className="font-bold text-gray-800 dark:text-black">{item.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-black">{item.desc}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Action Button */}
                <motion.button
                  className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <AlertTriangle className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.section>
{/* Section 10 - Premium Community Engagement */}
          <motion.section 
            id="section-10" 
            className="relative group overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 via-transparent to-yellow-100/30 animate-gradient-x"></div>
            
            {/* Glassmorphism Container */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/80 via-red-50/70 to-yellow-50/80 border border-red-100/50 rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-3xl transition-all duration-500">
              {/* Floating Decorative Elements */}
              <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-200/20 to-yellow-200/20 rounded-full animate-float"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full animate-float-delayed"></div>
              
              {/* Premium Header */}              <motion.div 
                className="relative z-10 mb-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Users className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  10. Making the Most of GLOHSEN Community
                </h3>
                <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
              </motion.div>
              
              {/* Interactive Content Grid */}
              <div className="space-y-12">
                <motion.div 
                  className="grid md:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Online Engagement Card */}
                  <motion.div 
                    className="group relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-yellow-100/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative backdrop-blur-sm bg-white/70 border border-red-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse mr-3"></div>
                        <h4 className="text-xl font-bold bg-gradient-to-r from-red-700 to-yellow-600 bg-clip-text text-transparent">
                          Online Engagement
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Participate actively in forum discussions",
                          "Share your expertise and insights", 
                          "Mentor students and junior professionals",
                          "Collaborate on research and projects",
                          "Provide constructive feedback to peers",
                          "Stay updated with industry trends"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start text-gray-700 dark:text-black hover:text-red-700 dark:hover:text-red-400 transition-colors duration-300 cursor-pointer group/item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ x: 10 }}
                          >
                            <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-red-500 group-hover/item:text-yellow-500 transition-colors duration-300 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Professional Growth Card */}
                  <motion.div 
                    className="group relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-yellow-100/50 to-red-100/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative backdrop-blur-sm bg-white/70 border border-yellow-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-2 bg-gradient-to-l from-yellow-500 to-red-500 rounded-full animate-pulse mr-3"></div>
                        <h4 className="text-xl font-bold bg-gradient-to-l from-yellow-600 to-red-700 bg-clip-text text-transparent">
                          Professional Growth
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Continuously update your skills and knowledge",
                          "Seek feedback and act on it constructively",
                          "Build meaningful professional relationships", 
                          "Contribute to quality improvement initiatives",
                          "Participate in continuing education programs",
                          "Share best practices with the community"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start text-gray-700 dark:text-black hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors duration-300 cursor-pointer group/item"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ x: -10 }}
                          >
                            <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 group-hover/item:text-red-500 transition-colors duration-300 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Success Tips Premium Section */}
                <motion.div 
                  className="relative group overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-200/30 via-yellow-200/30 to-red-200/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative backdrop-blur-xl bg-gradient-to-r from-red-50/80 via-yellow-50/80 to-red-50/80 border border-red-200/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
                    
                    {/* Premium Header with Icon */}
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mb-4 shadow-lg"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Star className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-bold bg-gradient-to-r from-red-700 to-yellow-600 bg-clip-text text-transparent mb-2">
                        Success Tips
                      </h4>
                      <p className="text-gray-600 dark:text-black font-medium">Your roadmap to community excellence</p>
                    </div>
                    
                    {/* Interactive Tips Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        {[
                          "Complete your profile thoroughly",
                          "Upload current certifications and credentials", 
                          "Engage regularly with platform content",
                          "Maintain a professional online presence"
                        ].map((tip, index) => (
                          <motion.div 
                            key={index}
                            className="group/tip flex items-center p-4 rounded-2xl bg-white/50 border border-red-100/50 hover:bg-red-50/50 hover:border-red-200/50 transition-all duration-300 cursor-pointer"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ x: 10, scale: 1.02 }}
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mr-4 group-hover/tip:animate-pulse flex-shrink-0"></div>
                            <span className="font-medium text-gray-700 dark:text-black group-hover/tip:text-red-700 dark:group-hover/tip:text-red-400 transition-colors duration-300">
                              {tip}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {[
                          "Respond promptly to messages and opportunities",
                          "Seek out learning and networking opportunities",
                          "Contribute valuable content to discussions", 
                          "Build and maintain your GLOHSEN Score"
                        ].map((tip, index) => (
                          <motion.div 
                            key={index}
                            className="group/tip flex items-center p-4 rounded-2xl bg-white/50 border border-yellow-100/50 hover:bg-yellow-50/50 hover:border-yellow-200/50 transition-all duration-300 cursor-pointer"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ x: -10, scale: 1.02 }}
                          >
                            <div className="w-3 h-3 bg-gradient-to-l from-yellow-500 to-red-500 rounded-full mr-4 group-hover/tip:animate-pulse flex-shrink-0"></div>
                            <span className="font-medium text-gray-700 dark:text-black group-hover/tip:text-yellow-700 dark:group-hover/tip:text-yellow-400 transition-colors duration-300">
                              {tip}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>                  </div>
                </motion.div>
              </div>
              
              {/* Floating Action Button */}
              <motion.div 
                className="absolute bottom-8 right-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => playSound('chime')}
                  className="group w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowUpRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>
          </motion.section>
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
                  >                    Get Support
                    <MessageSquare className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
