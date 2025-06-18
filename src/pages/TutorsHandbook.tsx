import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { BookOpen, Users, DollarSign, Shield, Zap, TrendingUp, AlertTriangle, Heart, Award, MessageSquare, Star, CheckCircle, Crown, Medal, Trophy, GraduationCap, Briefcase, Globe, Clock, X, Target, Gamepad2, ChevronRight, ArrowUpRight, Sparkles, FileText, PlayCircle, Brain, Search, RefreshCw } from 'lucide-react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

export default function TutorHandbook() {
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
      
      {/* Premium Background with Animated Elements */}
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-red-950 dark:to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/30 dark:bg-red-800/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-200/30 dark:bg-yellow-800/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-300/30 dark:bg-red-700/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-yellow-300/30 dark:bg-yellow-700/20 rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Premium Header Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl"></div>
            <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-900/20 dark:to-yellow-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-12 hover:shadow-2xl transition-all duration-500">
              {/* Premium Header Image */}
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Educational Excellence - Tutors and Scholars" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <GraduationCap className="relative w-16 h-16 text-red-600 dark:text-red-400 animate-bounce" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 animate-pulse">
                Tutors Handbook
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Your comprehensive guide to creating exceptional educational content and building a successful 
                teaching career on the GLOHSEN platform. Share your expertise and make a difference in healthcare education.
              </p>
              
              {/* Professional Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 backdrop-blur-lg bg-red-50/50 dark:bg-red-900/20 rounded-2xl border border-red-200/30 dark:border-red-700/30 hover:scale-105 transition-transform duration-300">
                  <Trophy className="w-10 h-10 text-red-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">10,000+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Active Tutors</p>
                </div>
                <div className="text-center p-6 backdrop-blur-lg bg-yellow-50/50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30 hover:scale-105 transition-transform duration-300">
                  <Users className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">500,000+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Students Reached</p>
                </div>
                <div className="text-center p-6 backdrop-blur-lg bg-black/10 dark:bg-black/20 rounded-2xl border border-gray-300/30 dark:border-gray-700/30 hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-10 h-10 text-gray-700 dark:text-gray-300 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">50,000+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Courses Created</p>
                </div>
              </div>
            </div>
          </div>          {/* Premium Table of Contents */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-900/20 dark:to-yellow-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 overflow-hidden hover:shadow-2xl transition-all duration-500">
              
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center relative z-10">
                  <BookOpen className="w-8 h-8 mr-4 animate-pulse" />
                  Table of Contents
                  <Sparkles className="w-6 h-6 ml-3 text-yellow-200 animate-spin" />
                </h2>
                <p className="text-white/90 mt-2 text-lg">Navigate your educational journey to excellence</p>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      title: '1. What is GLOHSEN and the GLOHSEN Standard?',
                      icon: Award,
                      color: 'from-red-500 to-red-600',
                      description: 'Understanding our educational framework'
                    },
                    { 
                      title: '2. Why Join GLOHSEN as a Tutor/Adviser?',
                      icon: Heart,
                      color: 'from-yellow-500 to-yellow-600',
                      description: 'Benefits and impact of teaching'
                    },
                    { 
                      title: '3. Terms, Privacy, and Legal Requirements',
                      icon: Shield,
                      color: 'from-red-500 to-black',
                      description: 'Essential legal framework'
                    },
                    { 
                      title: '4. How to Become a Creator/Tutor',
                      icon: GraduationCap,
                      color: 'from-yellow-500 to-red-500',
                      description: 'Your path to becoming an educator'
                    },
                    { 
                      title: '5. QUID Currency and Transaction Policies',
                      icon: DollarSign,
                      color: 'from-yellow-500 to-yellow-600',
                      description: 'Financial ecosystem for tutors'
                    },
                    { 
                      title: '6. Creating Courses and Educational Content',
                      icon: BookOpen,
                      color: 'from-red-500 to-yellow-500',
                      description: 'Content creation best practices'
                    },
                    { 
                      title: '7. How to Price Your Courses',
                      icon: TrendingUp,
                      color: 'from-yellow-500 to-red-500',
                      description: 'Pricing strategies & market insights'
                    },
                    { 
                      title: '8. Platform Rules and Content Standards',
                      icon: AlertTriangle,
                      color: 'from-red-500 to-black',
                      description: 'Quality standards & guidelines'
                    },                    { 
                      title: '9. Making the Most of GLOHSEN Community',
                      icon: Users,
                      color: 'from-yellow-500 to-red-500',
                      description: 'Community engagement strategies'
                    }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        onClick={() => playSound('click')}
                        className="group relative block p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-black/20 hover:border-red-300/50 dark:hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
          <div className="space-y-16">
            {/* Section 1 - What is GLOHSEN and the GLOHSEN Standard? */}
            <section id="section-1" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-900/20 dark:to-yellow-900/20 rounded-3xl border border-red-200/30 dark:border-red-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 1 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Educational Standards and Academic Excellence" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Award className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  1. What is GLOHSEN and the GLOHSEN Standard?
                </h3>                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                      <Globe className="w-6 h-6 mr-3 text-red-500" />
                      GLOHSEN Platform Overview
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      GLOHSEN (21st Century Global Health Services Network) is a comprehensive healthcare platform for 
                      education, staffing, and professional development. As a tutor, you play a crucial role in shaping 
                      the next generation of healthcare professionals through high-quality educational content.
                    </p>
                  </div>

                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-8 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                      The GLOHSEN Standard for Education - Is It 'FREI'?
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      All educational content must meet our three-pillar standard to ensure exceptional learning experiences:
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <h5 className="font-bold text-gray-800 dark:text-white text-lg mb-3">FUN</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Engaging, interactive, and enjoyable learning experiences that motivate students
                        </p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-white font-bold text-lg">RE</span>
                        </div>
                        <h5 className="font-bold text-gray-800 dark:text-white text-lg mb-3">RIDICULOUSLY EASY</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Well-structured, clear, and accessible content that simplifies complex concepts
                        </p>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <h5 className="font-bold text-gray-800 dark:text-white text-lg mb-3">INDIVIDUALIZED</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          Personalized content that adapts to different learning styles and needs
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                      <GraduationCap className="w-6 h-6 mr-3 text-yellow-500" />
                      Your Role as an Educator
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Tutors on GLOHSEN are more than content creators—you're mentors, innovators, and leaders in 
                      healthcare education. Your expertise helps bridge the gap between theoretical knowledge and 
                      practical application, preparing the next generation of healthcare professionals for real-world challenges.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Section 2 - Why Join GLOHSEN as a Tutor/Adviser? */}
            <section id="section-2" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative backdrop-blur-lg bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-900/20 dark:to-red-900/20 rounded-3xl border border-yellow-200/30 dark:border-yellow-700/30 p-8 hover:shadow-2xl transition-all duration-500">
                {/* Image for Section 2 */}
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Passionate Teaching and Educational Leadership" 
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <Heart className="w-8 h-8 mr-4 text-red-500 animate-pulse" />
                  2. Why Join GLOHSEN as a Tutor/Adviser?
                </h3>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-lg bg-gradient-to-br from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-red-500 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Professional Benefits</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Share your expertise with a global healthcare community</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Build your reputation as a subject matter expert</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Earn revenue from course sales and student enrollments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Access cutting-edge AI-powered course creation tools</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Receive detailed analytics on student engagement and progress</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Connect with other leading healthcare educators</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/50 to-red-50/50 dark:from-yellow-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-yellow-200/30 dark:border-yellow-700/30">
                      <div className="flex items-center mb-4">
                        <Heart className="w-6 h-6 text-yellow-600 mr-3" />
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Impact & Recognition</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Make a meaningful difference in healthcare education</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Help shape the future of healthcare professionals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Gain recognition for innovative teaching methods</span>
                        </li>                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Contribute to improving patient care through education</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Build a lasting legacy in healthcare education</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>Access professional development opportunities</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="backdrop-blur-lg bg-gradient-to-r from-red-50/50 to-black/10 dark:from-red-900/20 dark:to-black/30 p-6 rounded-2xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-red-500 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Platform Advantages</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl">
                        <Zap className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">AI-POWERED TOOLS</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">CREATE-A-COURSE AI Agent for faster development</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl">
                        <Globe className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">GLOBAL REACH</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Access students worldwide</p>
                      </div>
                      <div className="text-center p-4 bg-black/10 dark:bg-black/20 rounded-xl">
                        <Shield className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                        <h5 className="font-bold text-gray-800 dark:text-white">COMPREHENSIVE SUPPORT</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Technical, marketing & educational resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>            {/* Section 3 - Terms, Privacy, and Legal Requirements */}
            <motion.section 
              id="section-3" 
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Glassmorphism Container with Enhanced 3D Effects */}
              <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl transform group-hover:scale-[1.02]">
                
                {/* Premium Section Header */}
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-black p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-black/90 backdrop-blur-sm"></div>
                  {/* Floating Decorative Elements */}
                  <div className="absolute top-4 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                  
                  <div className="relative z-10 flex items-center">
                    <motion.div 
                      className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-3xl font-black text-white mb-2 tracking-wide"
                        initial={{ x: -20 }}
                        whileInView={{ x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-5xl font-black mr-4">3.</span>Terms, Privacy, and Legal Requirements
                      </motion.h3>
                      <p className="text-xl text-white/90 font-medium">
                        Your Rights and Responsibilities
                      </p>
                    </div>
                    <div className="ml-auto">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Premium Content */}
                <div className="p-10 bg-gradient-to-br from-stone-50/50 to-red-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                  {/* Premium Hero Image */}
                  <motion.div 
                    className="relative group/image mb-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-black/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Legal documents, privacy protection, and professional compliance in healthcare education" 
                        className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </motion.div>

                  <div className="space-y-10">
                    {/* Legal Compliance Card */}
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <AlertTriangle className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Legal Compliance</h4>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        By joining as a tutor, you agree to GLOHSEN's Terms of Service and Privacy Policy, which protect 
                        your data and intellectual property while ensuring compliance with educational and healthcare standards.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          {[
                            "All content must be original or properly licensed",
                            "Respect copyright laws and intellectual property rights", 
                            "Maintain accuracy in all educational content"
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-start mb-4"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                        <div>
                          {[
                            "Follow professional ethics and standards",
                            "Protect student privacy and confidentiality",
                            "Comply with educational quality standards"
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-start mb-4"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Ownership & Rights - Premium 3D Layout */}
                    <motion.div 
                      className="relative backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-950/30 dark:to-red-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Floating decorative elements */}
                      <div className="absolute -top-4 left-8">
                        <div className="flex space-x-2">
                          <motion.div 
                            className="w-4 h-4 bg-red-500 rounded-full shadow-lg"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                          <motion.div 
                            className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          ></motion.div>
                          <motion.div 
                            className="w-4 h-4 bg-black rounded-full shadow-lg"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-8">
                        <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                          Content Ownership & <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Rights</span>
                        </h4>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mx-auto"></div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                          className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                          whileHover={{ y: -5, rotateY: 5 }}
                        >
                          <div className="flex items-center mb-4">
                            <motion.div 
                              className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg mr-3"
                              whileHover={{ rotate: 180 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Shield className="w-6 h-6 text-white" />
                            </motion.div>
                            <h5 className="text-xl font-bold text-gray-800 dark:text-white">Your Rights</h5>
                          </div>
                          <ul className="space-y-3">
                            {[
                              "Retain ownership of your original content",
                              "Control pricing and availability of your courses",
                              "Receive fair revenue sharing from sales",
                              "Access your content analytics and data"
                            ].map((item, index) => (
                              <motion.li 
                                key={index}
                                className="flex items-start text-gray-600 dark:text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                              >
                                <motion.span 
                                  className="text-red-500 mr-2 font-bold"
                                  whileHover={{ scale: 1.5 }}
                                >
                                  •
                                </motion.span>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.div 
                          className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-6 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                          whileHover={{ y: -5, rotateY: -5 }}
                        >
                          <div className="flex items-center mb-4">
                            <motion.div 
                              className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg mr-3"
                              whileHover={{ rotate: 180 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Globe className="w-6 h-6 text-white" />
                            </motion.div>
                            <h5 className="text-xl font-bold text-gray-800 dark:text-white">Platform Rights</h5>
                          </div>
                          <ul className="space-y-3">
                            {[
                              "License to display and distribute your content",
                              "Right to moderate content for quality standards",
                              "Ability to promote your courses on the platform",
                              "Right to enforce community guidelines"
                            ].map((item, index) => (
                              <motion.li 
                                key={index}
                                className="flex items-start text-gray-600 dark:text-gray-400"
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                              >
                                <motion.span 
                                  className="text-yellow-500 mr-2 font-bold"
                                  whileHover={{ scale: 1.5 }}
                                >
                                  •
                                </motion.span>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Professional Standards Card */}
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Award className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Professional Standards</h4>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        All tutors must maintain the highest professional and ethical standards. Content must be accurate, 
                        evidence-based, and aligned with current healthcare best practices. Regular updates may be required 
                        to keep content current and relevant.                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>          {/* Section 4 - How to Become a Creator/Tutor */}
          <motion.section 
            id="section-4" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-700 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GraduationCap className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">4.</span>How to Become a Creator/Tutor
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Your Journey to Educational Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Star className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Healthcare educator creating online course content with modern technology" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Application Process - Interactive Steps */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Application <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">Process</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                      {[
                        { step: "1", title: "Apply", desc: "Submit application with credentials", color: "from-yellow-500 to-yellow-600" },
                        { step: "2", title: "Review", desc: "Credential verification and assessment", color: "from-yellow-600 to-red-500" },
                        { step: "3", title: "Sample", desc: "Submit sample content for evaluation", color: "from-red-500 to-red-600" },
                        { step: "4", title: "Approval", desc: "Get approved and start creating", color: "from-red-600 to-yellow-600" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="text-center group/step cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ y: -10, scale: 1.05 }}
                        >
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-2xl group-hover/step:shadow-3xl transition-all duration-300`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.step}
                          </motion.div>
                          <h6 className="font-black text-lg text-black dark:text-white mb-2 group-hover/step:text-yellow-600 transition-colors">{item.title}</h6>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Requirements and Application Materials - Dual Cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: 5 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Shield className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Requirements</h4>
                      </div>
                      <ul className="space-y-4">
                        {[
                          "Valid professional credentials and licenses",
                          "Minimum 3 years of experience in your specialty",
                          "Demonstrated expertise in your subject area",
                          "Good standing in the professional community",
                          "Commitment to quality educational standards",
                          "Agreement to platform terms and guidelines"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: -5 }}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: -15, scale: 1.1 }}
                        >
                          <BookOpen className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Application Materials</h4>
                      </div>
                      <ul className="space-y-4">
                        {[
                          "Professional resume or CV",
                          "Copies of relevant certifications and licenses",
                          "Sample educational content or teaching materials",
                          "Professional references (2-3 recommended)",
                          "Statement of teaching philosophy and goals",
                          "Proposed course topics and outlines"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Approval Criteria - Premium Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Target className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Approval Criteria</h4>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Applications are reviewed based on professional qualifications, teaching ability, content quality, 
                      and alignment with GLOHSEN standards. The review process typically takes 5-10 business days. 
                      Successful applicants receive access to our course creation tools and tutor resources.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 5 - QUID Currency and Transaction Policies */}
          <motion.section 
            id="section-5" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                {/* Floating Currency Icons */}
                <div className="absolute top-4 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300, duration: 1 }}
                  >
                    <DollarSign className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">5.</span>QUID Currency and Transaction Policies
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Your Financial Ecosystem
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Digital currency, financial transactions, and revenue tracking in modern fintech" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Understanding QUID - Premium Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-2xl mb-6"
                        animate={{ rotateY: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <DollarSign className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Understanding <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">QUID</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                      QUID is our platform's digital currency for course sales, rewards, and withdrawals. All course 
                      revenue is tracked in your dashboard, and platform fees apply to transactions.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: 5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                          >
                            <TrendingUp className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Revenue Tracking</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Real-time sales and enrollment data",
                            "Detailed revenue analytics",
                            "Monthly and annual earning reports",
                            "Student progress and completion rates"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <motion.span 
                                className="text-red-500 mr-2 font-bold"
                                whileHover={{ scale: 1.5 }}
                              >
                                •
                              </motion.span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-6 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: -15, scale: 1.1 }}
                          >
                            <Shield className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Payment Processing</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Secure transaction processing",
                            "Automatic currency conversion",
                            "Multiple withdrawal options",
                            "Tax reporting assistance"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <motion.span 
                                className="text-gray-600 dark:text-gray-400 mr-2 font-bold"
                                whileHover={{ scale: 1.5 }}
                              >
                                •
                              </motion.span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Escrow & Returns Policy - Interactive Cards */}
                  <motion.div 
                    className="relative backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Floating decorative elements */}
                    <div className="absolute -top-4 left-8">
                      <div className="flex space-x-2">
                        <motion.div 
                          className="w-4 h-4 bg-red-500 rounded-full shadow-lg"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <motion.div 
                          className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        ></motion.div>
                        <motion.div 
                          className="w-4 h-4 bg-black rounded-full shadow-lg"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Escrow & <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Returns Policy</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-xl"
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="flex items-center mb-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <Clock className="w-6 h-6 text-yellow-500 mr-3" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Course Sales</h5>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Course payments are held in escrow for 30 days. If students don't object and the course meets 
                          GLOHSEN standards, payment is released to you at month-end.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border-l-4 border-red-500 shadow-xl"
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="flex items-center mb-3">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Award className="w-6 h-6 text-red-500 mr-3" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Quality Standards</h5>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Courses must meet the 50% threshold criteria: 50% of students must rate the course as FUN, 
                          RIDICULOUSLY EASY, and INDIVIDUALIZED for payment to be processed.
                        </p>
                      </motion.div>

                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-6 border-l-4 border-gray-600 shadow-xl"
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="flex items-center mb-3">
                          <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <AlertTriangle className="w-6 h-6 text-gray-600 mr-3" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Refund Process</h5>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          If courses don't meet standards, you have 90 days to improve content or provide individualized 
                          mentorship. Otherwise, payments may be refunded to students.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Withdrawal Policy - Final Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <Globe className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Withdrawal Policy</h4>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Withdrawals are processed to the same currency/account used for platform registration. 
                      Minimum withdrawal amounts and processing fees may apply. See your dashboard for current 
                      withdrawal options and any applicable fees.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 6 - Creating Courses and Educational Content */}
          <motion.section 
            id="section-6" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">6.</span>Creating Courses and Educational Content
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Craft Engaging Learning Experiences
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-red-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Course creation, AI-powered educational content development and interactive learning tools" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Course Creation Process - Premium Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-2xl mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Zap className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Course Creation <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Process</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                      Use our AI-powered Course Creation Wizard to develop engaging, high-quality educational content:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-6 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: 5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                          >
                            <FileText className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Required Information</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Subject field and specialty area",
                            "Course title and description",
                            "Learning objectives and outcomes",
                            "Target audience and prerequisites",
                            "Course duration and structure"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <motion.span 
                                className="text-yellow-500 mr-2 font-bold"
                                whileHover={{ scale: 1.5 }}
                              >
                                •
                              </motion.span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-6 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: -15, scale: 1.1 }}
                          >
                            <PlayCircle className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Content Types</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Interactive games and simulations",
                            "Knowledge assessment quizzes",
                            "Visual mind maps and diagrams",
                            "Digital flashcards for review",
                            "Video lectures and demonstrations"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <motion.span 
                                className="text-gray-600 dark:text-gray-400 mr-2 font-bold"
                                whileHover={{ scale: 1.5 }}
                              >
                                •
                              </motion.span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* AI-Powered Tools - Interactive Cards */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-950/30 dark:to-red-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        AI-Powered <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">Tools</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { 
                          title: "CREATE-A-COURSE AI", 
                          desc: "Generate course content, structure, and assessments based on your expertise",
                          color: "from-blue-500 to-blue-600",
                          icon: Brain
                        },
                        { 
                          title: "Content Optimizer", 
                          desc: "Optimize content for engagement, accessibility, and learning effectiveness",
                          color: "from-green-500 to-green-600",
                          icon: TrendingUp
                        },
                        { 
                          title: "Assessment Builder", 
                          desc: "Create interactive quizzes, games, and assessments automatically",
                          color: "from-purple-500 to-purple-600",
                          icon: Target
                        }
                      ].map((tool, index) => (
                        <motion.div 
                          key={index}
                          className="backdrop-blur-sm bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group/tool"
                          whileHover={{ y: -10, scale: 1.02 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/tool:shadow-xl`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <tool.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="font-black text-lg text-black dark:text-white mb-3 group-hover/tool:text-red-600 transition-colors">{tool.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Content Development Best Practices - Dual Cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: 5 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Heart className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Engagement Strategies</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Use real-world case studies and scenarios",
                          "Include interactive elements and multimedia",
                          "Break content into digestible modules",
                          "Provide immediate feedback and explanations",
                          "Encourage peer interaction and discussion"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: -5 }}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: -15, scale: 1.1 }}
                        >
                          <Shield className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Quality Assurance</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Ensure content accuracy and currency",
                          "Test all interactive elements thoroughly",
                          "Provide clear learning objectives",
                          "Include comprehensive assessments",
                          "Gather and act on student feedback"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 7 - How to Price Your Courses */}
          <motion.section 
            id="section-7" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300, duration: 1 }}
                  >
                    <TrendingUp className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">7.</span>How to Price Your Courses
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Strategic Pricing for Maximum Impact
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <DollarSign className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1215&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Course pricing strategy, financial analytics, market analysis and revenue optimization" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Pricing Strategies - Premium Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-2xl mb-6"
                        animate={{ rotateY: [0, 180, 360] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <TrendingUp className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Pricing <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">Strategies</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                      Set competitive prices based on content depth, duration, and market demand:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          title: "Content Factors",
                          items: [
                            "Course duration and depth",
                            "Number of modules and lessons",
                            "Interactive elements included",
                            "Certification value",
                            "Ongoing support provided"
                          ],
                          color: "from-yellow-500 to-yellow-600",
                          bgColor: "from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20",
                          borderColor: "border-yellow-200/50 dark:border-yellow-800/30",
                          icon: BookOpen
                        },
                        {
                          title: "Market Factors",
                          items: [
                            "Specialty demand and rarity",
                            "Target audience budget",
                            "Competitor pricing analysis",
                            "Professional development value",
                            "Industry certification requirements"
                          ],
                          color: "from-red-500 to-red-600",
                          bgColor: "from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20",
                          borderColor: "border-red-200/50 dark:border-red-800/30",
                          icon: TrendingUp
                        },
                        {
                          title: "Platform Factors",
                          items: [
                            "Platform commission structure",
                            "Marketing and promotion support",
                            "Student acquisition costs",
                            "Payment processing fees",
                            "Revenue sharing model"
                          ],
                          color: "from-gray-700 to-black",
                          bgColor: "from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20",
                          borderColor: "border-gray-300/50 dark:border-gray-700/30",
                          icon: Globe
                        }
                      ].map((factor, index) => (
                        <motion.div 
                          key={index}
                          className={`backdrop-blur-sm bg-gradient-to-br ${factor.bgColor} rounded-2xl p-6 border-2 ${factor.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}
                          whileHover={{ y: -5, rotateY: index % 2 === 0 ? 5 : -5 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="flex items-center mb-4">
                            <motion.div 
                              className={`p-3 bg-gradient-to-br ${factor.color} rounded-xl shadow-lg mr-4`}
                              whileHover={{ rotate: 15, scale: 1.1 }}
                            >
                              <factor.icon className="w-8 h-8 text-white" />
                            </motion.div>
                            <h5 className="text-xl font-bold text-gray-800 dark:text-white">{factor.title}</h5>
                          </div>
                          <ul className="space-y-3">
                            {factor.items.map((item, itemIndex) => (
                              <motion.li 
                                key={itemIndex}
                                className="flex items-start text-gray-600 dark:text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + itemIndex * 0.1 }}
                              >
                                <motion.span 
                                  className={`mr-2 font-bold ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                                  whileHover={{ scale: 1.5 }}
                                >
                                  •
                                </motion.span>
                                <span className="text-sm font-medium">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pricing Models - Interactive Cards */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Pricing <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Models</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-6 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: 5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                          >
                            <DollarSign className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Fixed Pricing</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Set a single price for lifetime access",
                            "Simple for students to understand",
                            "Predictable revenue per enrollment",
                            "Good for comprehensive courses"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.3, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                        whileHover={{ y: -5, rotateY: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                            whileHover={{ rotate: -15, scale: 1.1 }}
                          >
                            <Star className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="text-xl font-bold text-gray-800 dark:text-white">Tiered Pricing</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Basic, standard, and premium tiers",
                            "Different levels of access and support",
                            "Appeals to various budget ranges",
                            "Maximizes revenue potential"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.3, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Promotional Strategies - Final Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Promotional Strategies</h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Launch Discounts",
                          desc: "Offer early-bird pricing to attract initial students and gather feedback",
                          color: "bg-green-500"
                        },
                        {
                          title: "Bundle Offers",
                          desc: "Create course bundles or series with discounted pricing for multiple enrollments",
                          color: "bg-blue-500"
                        },
                        {
                          title: "Seasonal Promotions",
                          desc: "Participate in platform-wide sales events and professional development seasons",
                          color: "bg-purple-500"
                        }
                      ].map((strategy, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start group/strategy cursor-pointer"
                          whileHover={{ x: 5 }}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <motion.div 
                            className={`w-3 h-3 ${strategy.color} rounded-full mr-3 mt-2`}
                            whileHover={{ scale: 1.5 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                          <div className="group-hover/strategy:text-red-600 transition-colors">
                            <h6 className="font-bold text-gray-800 dark:text-white mb-1">{strategy.title}</h6>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{strategy.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 8 - Platform Rules and Content Standards */}
          <motion.section 
            id="section-8" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-yellow-600 to-red-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">8.</span>Platform Rules and Content Standards
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Excellence and Compliance Guidelines
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-red-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Platform rules, content standards, quality assurance and compliance guidelines" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Content Standards vs Prohibited Content - Dual Cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-8 border-l-4 border-yellow-500 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: 5 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <CheckCircle className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Content Standards</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Provide accurate, evidence-based information",
                          "Maintain current and relevant content",
                          "Use appropriate language and tone",
                          "Include proper citations and references",
                          "Respect intellectual property rights",
                          "Follow professional ethics guidelines"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-l-4 border-red-500 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: -5 }}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: -15, scale: 1.1 }}
                        >
                          <X className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Prohibited Content</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Inaccurate or misleading medical information",
                          "Plagiarized or copyrighted material",
                          "Discriminatory or offensive content",
                          "Promotional content for unproven treatments",
                          "Personal medical advice or diagnosis",
                          "Content that violates professional standards"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Quality Assurance Process - Premium Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-950/30 dark:to-red-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-red-600 rounded-3xl shadow-2xl mb-6"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Award className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Quality Assurance <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">Process</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                      All courses undergo review to ensure they meet GLOHSEN standards:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Initial Review",
                          desc: "Content accuracy, structure, and compliance check before publication",
                          color: "from-yellow-500 to-yellow-600",
                          bgColor: "from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20",
                          borderColor: "border-yellow-200/50 dark:border-yellow-800/30",
                          icon: Search
                        },
                        {
                          title: "Student Feedback",
                          desc: "Ongoing monitoring of student ratings and feedback for quality maintenance",
                          color: "from-red-500 to-red-600",
                          bgColor: "from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20",
                          borderColor: "border-red-200/50 dark:border-red-800/30",
                          icon: MessageSquare
                        },
                        {
                          title: "Periodic Updates",
                          desc: "Regular content updates required to maintain currency and relevance",
                          color: "from-gray-700 to-black",
                          bgColor: "from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20",
                          borderColor: "border-gray-300/50 dark:border-gray-700/30",
                          icon: RefreshCw
                        }
                      ].map((process, index) => (
                        <motion.div 
                          key={index}
                          className={`backdrop-blur-sm bg-gradient-to-br ${process.bgColor} rounded-2xl p-6 border-2 ${process.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 text-center group/process`}
                          whileHover={{ y: -10, scale: 1.02 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${process.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/process:shadow-xl`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <process.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="font-black text-lg text-black dark:text-white mb-3 group-hover/process:text-red-600 transition-colors">{process.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{process.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Consequences for Violations - Final Warning Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-red-50/80 dark:from-black/80 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-300/50 dark:border-red-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-red-500 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        animate={{ boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Consequences for Violations</h4>
                    </div>
                    <div className="backdrop-blur-sm bg-red-50/50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/30">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Tutors who violate platform rules may face content removal, account warnings, temporary suspension, 
                        or permanent removal from the platform. Serious violations may be reported to relevant professional 
                        licensing boards. We work with tutors to address issues and maintain high standards.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 9 - Making the Most of GLOHSEN Community */}
          <motion.section 
            id="section-9" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-black to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MessageSquare className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">9.</span>Making the Most of GLOHSEN Community
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Connect, Collaborate, and Grow Together
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-red-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Community collaboration, professional networking, educational forums and peer interaction" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Online Engagement vs Professional Development - Dual Cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: 5 }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <MessageSquare className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Online Engagement</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Participate in educational forums and discussions",
                          "Share teaching insights and best practices",
                          "Collaborate with other educators on projects",
                          "Mentor new tutors and content creators",
                          "Contribute to platform improvement initiatives",
                          "Stay updated with educational technology trends"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -5, rotateY: -5 }}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg mr-4"
                          whileHover={{ rotate: -15, scale: 1.1 }}
                        >
                          <GraduationCap className="w-8 h-8 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-black dark:text-white">Professional Development</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Attend platform webinars and training sessions",
                          "Learn from successful educators and their strategies",
                          "Access new teaching tools and technologies",
                          "Participate in educational research and studies",
                          "Build your reputation as a thought leader",
                          "Expand your network of professional contacts"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Success Tips for Tutors - Premium Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-950/30 dark:to-red-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-center mb-8">
                      <motion.div 
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-red-600 rounded-3xl shadow-2xl mb-6"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Star className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-black text-black dark:text-white mb-4">
                        Success Tips for <span className="text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text">Tutors</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        {[
                          "Maintain an active and engaging teaching profile",
                          "Respond promptly to student questions and feedback",
                          "Continuously update and improve your content",
                          "Engage with the community through forums and events"
                        ].map((tip, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start group/tip cursor-pointer"
                            whileHover={{ x: 5 }}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <motion.div 
                              className="w-3 h-3 bg-yellow-500 rounded-full mr-3 mt-2"
                              whileHover={{ scale: 1.5 }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/tip:text-yellow-600 transition-colors">{tip}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {[
                          "Seek feedback and implement improvements",
                          "Collaborate with other tutors on joint projects",
                          "Promote your courses through appropriate channels",
                          "Build long-term relationships with your students"
                        ].map((tip, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start group/tip cursor-pointer"
                            whileHover={{ x: 5 }}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <motion.div 
                              className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2"
                              whileHover={{ scale: 1.5 }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/tip:text-red-600 transition-colors">{tip}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Building Your Teaching Legacy - Final Inspiration Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        animate={{ boxShadow: ["0 0 0 0 rgba(0, 0, 0, 0.7)", "0 0 0 10px rgba(0, 0, 0, 0)", "0 0 0 0 rgba(0, 0, 0, 0)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Crown className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Building Your Teaching Legacy</h4>
                    </div>
                    <div className="backdrop-blur-sm bg-gradient-to-r from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                        As a GLOHSEN tutor, you have the opportunity to shape the future of healthcare education. 
                        <span className="font-black text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text"> Build your educational legacy</span> 
                        through excellence in teaching, meaningful student relationships, and innovation in healthcare education.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>          {/* Section 10 - Building Your Educational Legacy */}
          <motion.section 
            id="section-10" 
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-yellow-600 to-red-500 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                {/* Floating Elements */}
                <div className="absolute top-4 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative z-10 flex items-center">
                  <motion.div 
                    className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-3xl font-black text-white mb-2 tracking-wide"
                      initial={{ x: -20 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-5xl font-black mr-4">10.</span>Building Your Educational Legacy
                    </motion.h3>
                    <p className="text-xl text-white/90 font-medium">
                      Create Lasting Impact Through Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                {/* Premium Hero Image */}
                <motion.div 
                  className="relative group/image mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
                  <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-4 border border-white/30 shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Educational legacy, teaching excellence, global impact and professional recognition" 
                      className="w-full h-48 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </motion.div>

                <div className="space-y-10">
                  {/* Introduction - Inspiration Text */}
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                      As a GLOHSEN educator, you have the opportunity to create a lasting impact on healthcare education. 
                      <span className="font-black text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text"> Build your educational legacy</span> 
                      through excellence in teaching, meaningful student relationships, and innovation in healthcare education.
                    </p>
                  </motion.div>

                  {/* Excellence in Teaching - Premium Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center mb-8">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg mr-6"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <GraduationCap className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-bold text-black dark:text-white">Excellence in Teaching</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-800/30 shadow-xl"
                        whileHover={{ y: -5, rotateY: 5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Star className="w-6 h-6 text-yellow-500 mr-3" />
                          </motion.div>
                          <h5 className="text-xl font-black text-black dark:text-white">Quality Content Creation</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Develop comprehensive, engaging course materials",
                            "Use multimedia and interactive elements effectively",
                            "Maintain currency with latest healthcare developments",
                            "Incorporate evidence-based teaching methods"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.3, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-6 border border-red-200/50 dark:border-red-800/30 shadow-xl"
                        whileHover={{ y: -5, rotateY: -5 }}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Heart className="w-6 h-6 text-red-500 mr-3" />
                          </motion.div>
                          <h5 className="text-xl font-black text-black dark:text-white">Student Success Focus</h5>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Provide personalized feedback and guidance",
                            "Support diverse learning styles and needs",
                            "Foster critical thinking and problem-solving skills",
                            "Encourage professional development and growth"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.3, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              </motion.div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Global Impact & Recognition - Interactive Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-red-50/80 dark:from-yellow-950/30 dark:to-red-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center mb-8">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mr-6"
                        whileHover={{ rotate: -15, scale: 1.1 }}
                      >
                        <Globe className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-3xl font-bold text-black dark:text-white">Global Impact & Recognition</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          icon: Medal,
                          title: "Teaching Awards",
                          desc: "Recognition for excellence in education",
                          color: "from-yellow-500 to-yellow-600"
                        },
                        {
                          icon: Users,
                          title: "Student Network",
                          desc: "Build lasting professional relationships",
                          color: "from-red-500 to-red-600"
                        },
                        {
                          icon: Sparkles,
                          title: "Innovation Legacy",
                          desc: "Pioneer new educational approaches",
                          color: "from-gray-700 to-black"
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="text-center p-6 backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group/item"
                          whileHover={{ y: -10, scale: 1.05 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <motion.div 
                            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover/item:shadow-xl`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <h5 className="font-black text-lg text-black dark:text-white mb-2 group-hover/item:text-red-600 transition-colors">{item.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Your Teaching Legacy - Final Inspirational Card */}
                  <motion.div 
                    className="backdrop-blur-sm bg-gradient-to-br from-black/10 to-gray-100/80 dark:from-black/80 dark:to-gray-900/20 rounded-2xl p-8 border-2 border-gray-300/50 dark:border-gray-700/30 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="p-3 bg-gradient-to-br from-gray-700 to-black rounded-xl shadow-lg mr-4"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        animate={{ boxShadow: ["0 0 0 0 rgba(0, 0, 0, 0.7)", "0 0 0 10px rgba(0, 0, 0, 0)", "0 0 0 0 rgba(0, 0, 0, 0)"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Crown className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black dark:text-white">Your Teaching Legacy</h4>
                    </div>
                    <div className="backdrop-blur-sm bg-gradient-to-r from-red-50/50 to-yellow-50/50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Your impact extends far beyond individual courses. Through excellence in teaching, mentorship, and innovation, 
                        you contribute to the advancement of healthcare education and the development of future healthcare leaders. 
                        Every student you inspire, every concept you clarify, and every skill you teach contributes to better healthcare outcomes worldwide.
                      </p>
                      <div className="text-center">
                        <motion.p 
                          className="text-xl font-black text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          "Great teachers inspire students to become lifelong learners and leaders in their field."
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
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
                <GraduationCap className="w-16 h-16 text-yellow-200 animate-bounce" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Teaching Journey?</h3>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of healthcare educators who are making a difference through quality education. 
                Share your expertise and help shape the future of healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/dashboard/tutor" 
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
      
      <Footer isActive={true} />    </>
  );
}