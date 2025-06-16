import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, DollarSign, Shield, Zap, TrendingUp, AlertTriangle, Heart, Award, MessageSquare, Sparkles, Star, Target, GraduationCap, Trophy, Gamepad2, Lock, Stethoscope } from 'lucide-react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

export default function TutorsHandbook() {
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
              Tutors' <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text">Handbook</span>
            </h2>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-8 font-medium">
              Edition 2025 | For Healthcare Educators Worldwide
            </div>            {/* Tutors Professional Image */}
            <div className="mb-8 relative group">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&h=500&q=85&crop=faces&facepad=3" 
                alt="Professional Healthcare Educator" 
                className="w-full h-64 object-cover rounded-2xl shadow-2xl border-4 border-white/50 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ 
                  objectPosition: 'center 25%',
                  filter: 'brightness(1.1) contrast(1.05)'
                }}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&h=500&q=85";
                  e.currentTarget.style.objectPosition = 'center 30%';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <p className="text-lg font-bold">Professional Healthcare Educators</p>
                <p className="text-sm opacity-90">Shaping the future of healthcare education</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-3xl p-8 shadow-2xl border border-white/20">
              <p className="text-xl md:text-2xl text-gray-800 dark:text-stone-200 leading-relaxed font-medium">
                Your <span className="text-red-600 font-bold">comprehensive guide</span> to creating exceptional educational content and building a successful teaching career on GLOHSEN. 
                <br />
                <span className="text-yellow-600 font-semibold">Share your expertise</span> and make a lasting impact on healthcare education.
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
                    <BookOpen className="w-8 h-8" />
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
                  { title: '2. Why Join GLOHSEN as a Tutor/Adviser?', icon: Heart, color: 'yellow' },
                  { title: '3. Terms, Privacy, and Legal Requirements', icon: Shield, color: 'red' },
                  { title: '4. How to Become a Creator/Tutor', icon: BookOpen, color: 'yellow' },
                  { title: '5. QUID Currency and Transaction Policies', icon: DollarSign, color: 'red' },
                  { title: '6. Creating Courses and Educational Content', icon: GraduationCap, color: 'yellow' },
                  { title: '7. How to Price Your Courses', icon: TrendingUp, color: 'red' },
                  { title: '8. Platform Rules and Content Standards', icon: AlertTriangle, color: 'yellow' },
                  { title: '9. Making the Most of GLOHSEN Community', icon: Users, color: 'red' }
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
          {/* Section 1: What is GLOHSEN and the GLOHSEN Standard? */}
          <section id="section-1" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 1</h3>
                      <p className="text-white/90 text-lg font-medium">What is GLOHSEN and the GLOHSEN Standard?</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <Star className="w-6 h-6 text-yellow-300 animate-pulse delay-300" />
                    <Star className="w-6 h-6 text-yellow-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 via-amber-50/30 to-red-50/20 dark:from-gray-900/50 dark:via-red-950/20 dark:to-yellow-950/10">
                <div className="space-y-8">                  {/* Platform Overview */}
                  <div className="group/item">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text mb-4 flex items-center">
                      <Target className="w-6 h-6 text-red-600 mr-3" />
                      GLOHSEN Platform Overview
                    </h4>
                    
                    {/* Platform Image */}
                    <div className="mb-6 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&h=300&q=80" 
                        alt="Global Healthcare Network" 
                        className="w-full h-48 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-2xl"></div>
                      <div className="absolute bottom-3 right-4 text-white text-xs font-medium opacity-90">
                        Global Healthcare Education Network
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg border border-white/30">
                      <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                        <span className="font-bold text-red-600">GLOHSEN</span> (21st Century Global Health Services Network) is a comprehensive healthcare platform for 
                        education, staffing, and professional development. As a tutor, you play a <span className="font-semibold text-yellow-600">crucial role</span> in shaping 
                        the next generation of healthcare professionals through high-quality educational content.
                      </p>
                    </div>
                  </div>

                  {/* GLOHSEN Standard */}
                  <div className="relative">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
                      The GLOHSEN Standard for Education
                    </h4>
                    
                    <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-yellow-50/80 dark:from-black/90 dark:to-yellow-950/30 rounded-3xl p-8 shadow-2xl border border-yellow-200/50 dark:border-yellow-800/30">
                      <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8 text-center">
                        All educational content must meet our <span className="font-bold text-red-600">three-pillar standard</span> to ensure exceptional learning experiences:
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        {[
                          { 
                            letter: 'F', 
                            title: 'FUN', 
                            desc: 'Engaging, interactive, and enjoyable learning experiences that motivate students',
                            color: 'from-blue-500 to-blue-600',
                            accent: 'blue'
                          },
                          { 
                            letter: 'RE', 
                            title: 'RIDICULOUSLY EASY', 
                            desc: 'Well-structured, clear, and accessible content that simplifies complex concepts',
                            color: 'from-green-500 to-green-600',
                            accent: 'green'
                          },
                          { 
                            letter: 'I', 
                            title: 'INDIVIDUALIZED', 
                            desc: 'Personalized content that adapts to different learning styles and needs',
                            color: 'from-purple-500 to-purple-600',
                            accent: 'purple'
                          }
                        ].map((pillar, index) => (
                          <div key={index} className="group text-center transform transition-all duration-300 hover:scale-105">
                            <div className={`w-20 h-20 bg-gradient-to-br ${pillar.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white/50`}>
                              <span className="text-white font-black text-xl">{pillar.letter}</span>
                            </div>
                            <h5 className={`font-black text-lg mb-3 text-${pillar.accent}-600 dark:text-${pillar.accent}-400`}>
                              {pillar.title}
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                              {pillar.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Your Role */}
                  <div>
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text mb-4 flex items-center">
                      <GraduationCap className="w-6 h-6 text-red-600 mr-3" />
                      Your Role as an Educator
                    </h4>
                    <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg border border-white/30">
                      <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                        Tutors on GLOHSEN are more than content creators—you're <span className="font-bold text-red-600">mentors</span>, <span className="font-bold text-yellow-600">innovators</span>, and <span className="font-bold text-red-600">leaders</span> in 
                        healthcare education. Your expertise helps bridge the gap between theoretical knowledge and 
                        practical application, preparing the next generation of healthcare professionals for real-world challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 2: Why Join GLOHSEN as a Tutor/Adviser? */}
          <section id="section-2" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 2</h3>
                      <p className="text-white/90 text-lg font-medium">Why Join GLOHSEN as a Tutor/Adviser?</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Heart className="w-6 h-6 text-red-300 animate-pulse" />
                    <Heart className="w-6 h-6 text-red-300 animate-pulse delay-300" />
                    <Heart className="w-6 h-6 text-red-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-yellow-50/50 via-amber-50/30 to-red-50/20 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-red-950/10">
                <div className="space-y-8">
                  {/* Benefits Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Healthcare Educators Collaboration" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-red-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Join Our Global Community</h5>
                      <p className="text-sm opacity-90">Healthcare educators making a difference worldwide</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Professional Benefits */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-4 flex items-center">
                        <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
                        Professional Benefits
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Share your expertise with a global healthcare community',
                          'Build your reputation as a subject matter expert',
                          'Earn revenue from course sales and student enrollments',
                          'Access cutting-edge AI-powered course creation tools',
                          'Receive detailed analytics on student engagement',
                          'Connect with other leading healthcare educators'
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Impact & Recognition */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-red-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text mb-4 flex items-center">
                        <Star className="w-6 h-6 text-red-600 mr-3" />
                        Impact & Recognition
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Make a meaningful difference in healthcare education',
                          'Help shape the future of healthcare professionals',
                          'Gain recognition for innovative teaching methods',
                          'Contribute to improving patient care through education',
                          'Build a lasting legacy in healthcare education',
                          'Access professional development opportunities'
                        ].map((impact, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                              {impact}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Platform Advantages */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-amber-50/80 dark:from-black/90 dark:to-amber-950/30 rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-600 mr-3" />
                      Platform Advantages
                      <Sparkles className="w-6 h-6 text-red-600 ml-3 animate-pulse" />
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'AI-Powered Tools',
                          desc: 'Use our CREATE-A-COURSE AI Agent to develop content faster and more effectively',
                          icon: Gamepad2,
                          color: 'blue'
                        },
                        {
                          title: 'Global Reach',
                          desc: 'Access students and professionals from around the world',
                          icon: Users,
                          color: 'green'
                        },
                        {
                          title: 'Comprehensive Support',
                          desc: 'Get technical support, marketing assistance, and educational resources',
                          icon: Shield,
                          color: 'purple'
                        }
                      ].map((advantage, index) => {
                        const IconComponent = advantage.icon;
                        return (
                          <div key={index} className="group text-center transform transition-all duration-300 hover:scale-105">
                            <div className={`w-16 h-16 bg-gradient-to-br from-${advantage.color}-500 to-${advantage.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white/50`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h5 className={`font-bold text-lg mb-3 text-${advantage.color}-600 dark:text-${advantage.color}-400`}>
                              {advantage.title}
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                              {advantage.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 3: Terms, Privacy, and Legal Requirements */}
          <section id="section-3" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 3</h3>
                      <p className="text-white/90 text-lg font-medium">Terms, Privacy, and Legal Requirements</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Lock className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <Shield className="w-6 h-6 text-yellow-300 animate-pulse delay-300" />
                    <Lock className="w-6 h-6 text-yellow-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-red-50/50 via-stone-50/30 to-yellow-50/20 dark:from-red-950/20 dark:via-gray-950/20 dark:to-yellow-950/10">
                <div className="space-y-8">
                  {/* Legal Compliance Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Legal Compliance and Professional Standards" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Professional Standards & Compliance</h5>
                      <p className="text-sm opacity-90">Maintain the highest ethical and legal standards</p>
                    </div>
                  </div>

                  {/* Legal Compliance */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-black/90 dark:to-blue-950/30 rounded-3xl p-8 shadow-2xl border border-blue-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text mb-6 flex items-center">
                      <Lock className="w-6 h-6 text-blue-600 mr-3" />
                      Legal Compliance
                    </h4>
                    <div className="space-y-6">
                      <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                        By joining as a tutor, you agree to GLOHSEN's <span className="font-bold text-red-600">Terms of Service</span> and <span className="font-bold text-blue-600">Privacy Policy</span>, which protect 
                        your data and intellectual property while ensuring compliance with educational and healthcare standards.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          'All content must be original or properly licensed',
                          'Respect copyright laws and intellectual property rights',
                          'Maintain accuracy in all educational content',
                          'Follow professional ethics and standards',
                          'Protect student privacy and confidentiality',
                          'Adhere to healthcare education guidelines'
                        ].map((requirement, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-red-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              {requirement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Ownership & Rights */}
                  <div>
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Award className="w-6 h-6 text-yellow-600 mr-3" />
                      Content Ownership & Rights
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Your Rights */}
                      <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border-l-4 border-green-500">
                        <h5 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          Your Rights
                        </h5>
                        <div className="space-y-3">
                          {[
                            'Retain ownership of your original content',
                            'Control pricing and availability of your courses',
                            'Receive fair revenue sharing from sales',
                            'Access your content analytics and data'
                          ].map((right, index) => (
                            <div key={index} className="flex items-start group">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                              <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">
                                {right}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Platform Rights */}
                      <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border-l-4 border-blue-500">
                        <h5 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Platform Rights
                        </h5>
                        <div className="space-y-3">
                          {[
                            'License to display and distribute your content',
                            'Right to moderate content for quality standards',
                            'Ability to promote your courses on the platform',
                            'Right to enforce community guidelines'
                          ].map((right, index) => (
                            <div key={index} className="flex items-start group">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                              <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">
                                {right}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Standards */}
                  <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text mb-4 flex items-center">
                      <Stethoscope className="w-6 h-6 text-red-600 mr-3" />
                      Professional Standards
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                      All tutors must maintain the <span className="font-bold text-red-600">highest professional and ethical standards</span>. Content must be accurate, 
                      evidence-based, and aligned with current healthcare best practices. <span className="font-semibold text-yellow-600">Regular updates</span> may be required 
                      to keep content current and relevant.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 4: How to Become a Creator/Tutor */}
          <section id="section-4" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 4</h3>
                      <p className="text-white/90 text-lg font-medium">How to Become a Creator/Tutor</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <GraduationCap className="w-6 h-6 text-white/80 animate-bounce" />
                    <Users className="w-6 h-6 text-white/80 animate-bounce delay-300" />
                    <BookOpen className="w-6 h-6 text-white/80 animate-bounce delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-yellow-50/50 via-amber-50/30 to-red-50/20 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-red-950/10">
                <div className="space-y-8">
                  {/* Application Process Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Healthcare Professional Application Process" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-red-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Start Your Teaching Journey</h5>
                      <p className="text-sm opacity-90">Join our community of expert healthcare educators</p>
                    </div>
                  </div>

                  {/* Application Process */}
                  <div>
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Target className="w-6 h-6 text-yellow-600 mr-3" />
                      Application Process
                    </h4>
                    <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-purple-50/80 dark:from-black/90 dark:to-purple-950/30 rounded-3xl p-8 shadow-2xl border border-purple-200/50">
                      <div className="grid md:grid-cols-4 gap-6">
                        {[
                          { 
                            step: '1', 
                            title: 'Apply', 
                            desc: 'Submit application with credentials',
                            color: 'purple',
                            icon: BookOpen
                          },
                          { 
                            step: '2', 
                            title: 'Review', 
                            desc: 'Credential verification and assessment',
                            color: 'blue',
                            icon: Shield
                          },
                          { 
                            step: '3', 
                            title: 'Sample', 
                            desc: 'Submit sample content for evaluation',
                            color: 'green',
                            icon: Star
                          },
                          { 
                            step: '4', 
                            title: 'Approval', 
                            desc: 'Get approved and start creating',
                            color: 'yellow',
                            icon: Trophy
                          }
                        ].map((step, index) => {
                          const IconComponent = step.icon;
                          return (
                            <div key={index} className="group text-center transform transition-all duration-300 hover:scale-105">
                              <div className={`relative w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white/50`}>
                                <span className="text-white font-black text-2xl absolute">{step.step}</span>
                                <IconComponent className="w-8 h-8 text-white/30 absolute" />
                              </div>
                              <h6 className={`font-bold text-lg mb-2 text-${step.color}-600 dark:text-${step.color}-400`}>
                                {step.title}
                              </h6>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Requirements */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-4 flex items-center">
                        <Award className="w-6 h-6 text-yellow-600 mr-3" />
                        Requirements
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Valid professional credentials and licenses',
                          'Minimum 3 years of experience in your specialty',
                          'Demonstrated expertise in your subject area',
                          'Good standing in the professional community',
                          'Commitment to quality educational standards',
                          'Agreement to platform terms and guidelines'
                        ].map((requirement, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors">
                              {requirement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Application Materials */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-red-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text mb-4 flex items-center">
                        <BookOpen className="w-6 h-6 text-red-600 mr-3" />
                        Application Materials
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Professional resume or CV',
                          'Copies of relevant certifications and licenses',
                          'Sample educational content or teaching materials',
                          'Professional references (2-3 recommended)',
                          'Statement of teaching philosophy and goals',
                          'Proposed course topics and outlines'
                        ].map((material, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                              {material}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Approval Criteria */}
                  <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-green-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-4 flex items-center">
                      <Star className="w-6 h-6 text-green-600 mr-3" />
                      Approval Criteria
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                      Applications are reviewed based on <span className="font-bold text-green-600">professional qualifications</span>, <span className="font-bold text-blue-600">teaching ability</span>, <span className="font-bold text-purple-600">content quality</span>, 
                      and alignment with GLOHSEN standards. The review process typically takes <span className="font-semibold text-yellow-600">5-10 business days</span>. 
                      Successful applicants receive access to our course creation tools and tutor resources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 5: QUID Currency and Transaction Policies */}
          <section id="section-5" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 5</h3>
                      <p className="text-white/90 text-lg font-medium">QUID Currency and Transaction Policies</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <DollarSign className="w-6 h-6 text-green-300 animate-pulse" />
                    <TrendingUp className="w-6 h-6 text-green-300 animate-pulse delay-300" />
                    <DollarSign className="w-6 h-6 text-green-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-red-50/50 via-green-50/30 to-yellow-50/20 dark:from-red-950/20 dark:via-green-950/20 dark:to-yellow-950/10">
                <div className="space-y-8">
                  {/* QUID Currency Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Digital Currency and Financial Transactions" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-green-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">QUID Digital Currency</h5>
                      <p className="text-sm opacity-90">Secure transactions and transparent revenue tracking</p>
                    </div>
                  </div>

                  {/* Understanding QUID */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-green-50/80 dark:from-black/90 dark:to-green-950/30 rounded-3xl p-8 shadow-2xl border border-green-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-green-600 bg-clip-text mb-6 flex items-center">
                      <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                      Understanding QUID
                    </h4>
                    <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8">
                      <span className="font-bold text-green-600">QUID</span> is our platform's digital currency for course sales, rewards, and withdrawals. All course 
                      revenue is tracked in your dashboard, and platform fees apply to transactions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: 'Revenue Tracking',
                          items: [
                            'Real-time sales and enrollment data',
                            'Detailed revenue analytics',
                            'Monthly and annual earning reports',
                            'Student progress and completion rates'
                          ],
                          color: 'blue'
                        },
                        {
                          title: 'Payment Processing',
                          items: [
                            'Secure transaction processing',
                            'Automatic currency conversion',
                            'Multiple withdrawal options',
                            'Tax reporting assistance'
                          ],
                          color: 'purple'
                        }
                      ].map((section, index) => (
                        <div key={index} className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg">
                          <h5 className={`text-lg font-bold text-${section.color}-600 dark:text-${section.color}-400 mb-4`}>
                            {section.title}
                          </h5>
                          <div className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start">
                                <div className={`w-2 h-2 bg-${section.color}-500 rounded-full mr-3 mt-2`}></div>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quality & Returns Policy */}
                  <div>
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Shield className="w-6 h-6 text-yellow-600 mr-3" />
                      Escrow & Returns Policy
                    </h4>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Course Sales',
                          desc: 'Course payments are held in escrow for 30 days. If students don\'t object and the course meets GLOHSEN standards, payment is released to you at month-end.',
                          color: 'yellow'
                        },
                        {
                          title: 'Quality Standards',
                          desc: 'Courses must meet the 50% threshold criteria: 50% of students must rate the course as FUN, RIDICULOUSLY EASY, and INDIVIDUALIZED for payment to be processed.',
                          color: 'blue'
                        },
                        {
                          title: 'Refund Process',
                          desc: 'If courses don\'t meet standards, you have 90 days to improve content or provide individualized mentorship. Otherwise, payments may be refunded to students.',
                          color: 'red'
                        }
                      ].map((policy, index) => (
                        <div key={index} className={`backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border-l-4 border-${policy.color}-500`}>
                          <h5 className={`text-lg font-bold text-${policy.color}-600 dark:text-${policy.color}-400 mb-2`}>
                            {policy.title}
                          </h5>
                          <p className="text-gray-800 dark:text-stone-200 leading-relaxed">
                            {policy.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 6: Creating Courses and Educational Content */}
          <section id="section-6" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 6</h3>
                      <p className="text-white/90 text-lg font-medium">Creating Courses and Educational Content</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Gamepad2 className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <BookOpen className="w-6 h-6 text-yellow-300 animate-pulse delay-300" />
                    <Zap className="w-6 h-6 text-yellow-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-yellow-50/50 via-amber-50/30 to-red-50/20 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-red-950/10">
                <div className="space-y-8">
                  {/* Course Creation Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Digital Course Creation and Technology" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-red-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Create Engaging Courses</h5>
                      <p className="text-sm opacity-90">Use AI-powered tools to build world-class educational content</p>
                    </div>
                  </div>

                  {/* Course Creation Process */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-yellow-50/80 dark:from-black/90 dark:to-yellow-950/30 rounded-3xl p-8 shadow-2xl border border-yellow-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Sparkles className="w-6 h-6 text-yellow-600 mr-3" />
                      Course Creation Process
                    </h4>
                    <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8">
                      Use our <span className="font-bold text-yellow-600">AI-powered Course Creation Wizard</span> to develop engaging, high-quality educational content:
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                      {[
                        {
                          title: 'Required Information',
                          items: [
                            'Subject field and specialty area',
                            'Course title and description',
                            'Learning objectives and outcomes',
                            'Target audience and prerequisites',
                            'Course duration and structure'
                          ],
                          color: 'blue'
                        },
                        {
                          title: 'Content Types',
                          items: [
                            'Interactive games and simulations',
                            'Knowledge assessment quizzes',
                            'Visual mind maps and diagrams',
                            'Digital flashcards for review',
                            'Video lectures and demonstrations'
                          ],
                          color: 'green'
                        }
                      ].map((section, index) => (
                        <div key={index} className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg">
                          <h5 className={`text-lg font-bold text-${section.color}-600 dark:text-${section.color}-400 mb-4`}>
                            {section.title}
                          </h5>
                          <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start group">
                                <div className={`w-2 h-2 bg-${section.color}-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform`}></div>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI-Powered Tools */}
                  <div>
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text mb-6 flex items-center">
                      <Gamepad2 className="w-6 h-6 text-red-600 mr-3" />
                      AI-Powered Tools
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'CREATE-A-COURSE AI',
                          desc: 'Generate course content, structure, and assessments based on your expertise',
                          icon: Sparkles,
                          color: 'blue'
                        },
                        {
                          title: 'Content Optimizer',
                          desc: 'Optimize content for engagement, accessibility, and learning effectiveness',
                          icon: Target,
                          color: 'green'
                        },
                        {
                          title: 'Assessment Builder',
                          desc: 'Create interactive quizzes, games, and assessments automatically',
                          icon: Trophy,
                          color: 'purple'
                        }
                      ].map((tool, index) => {
                        const IconComponent = tool.icon;
                        return (
                          <div key={index} className="group backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 border border-gray-200/50">
                            <div className={`w-16 h-16 bg-gradient-to-br from-${tool.color}-500 to-${tool.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h5 className={`font-bold text-lg mb-3 text-center text-${tool.color}-600 dark:text-${tool.color}-400`}>
                              {tool.title}
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm text-center">
                              {tool.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: How to Price Your Courses */}
          <section id="section-7" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 7</h3>
                      <p className="text-white/90 text-lg font-medium">How to Price Your Courses</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <DollarSign className="w-6 h-6 text-green-300 animate-bounce" />
                    <TrendingUp className="w-6 h-6 text-green-300 animate-bounce delay-300" />
                    <DollarSign className="w-6 h-6 text-green-300 animate-bounce delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-red-50/50 via-blue-50/30 to-yellow-50/20 dark:from-red-950/20 dark:via-blue-950/20 dark:to-yellow-950/10">
                <div className="space-y-8">
                  {/* Pricing Strategy Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Financial Planning and Pricing Strategy" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Strategic Course Pricing</h5>
                      <p className="text-sm opacity-90">Maximize your revenue with data-driven pricing strategies</p>
                    </div>
                  </div>

                  {/* Pricing Strategies */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-black/90 dark:to-blue-950/30 rounded-3xl p-8 shadow-2xl border border-blue-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text mb-6 flex items-center">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      Pricing Strategies
                    </h4>
                    <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8">
                      Set <span className="font-bold text-blue-600">competitive prices</span> based on content depth, duration, and market demand:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Content Factors',
                          items: [
                            'Course duration and depth',
                            'Number of modules and lessons',
                            'Interactive elements included',
                            'Certification value',
                            'Ongoing support provided'
                          ],
                          color: 'blue'
                        },
                        {
                          title: 'Market Factors',
                          items: [
                            'Specialty demand and rarity',
                            'Target audience budget',
                            'Competitor pricing analysis',
                            'Professional development value',
                            'Industry certification requirements'
                          ],
                          color: 'green'
                        },
                        {
                          title: 'Platform Factors',
                          items: [
                            'Platform commission structure',
                            'Marketing and promotion support',
                            'Student acquisition costs',
                            'Payment processing fees',
                            'Revenue sharing model'
                          ],
                          color: 'purple'
                        }
                      ].map((section, index) => (
                        <div key={index} className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-lg">
                          <h5 className={`text-lg font-bold text-${section.color}-600 dark:text-${section.color}-400 mb-4`}>
                            {section.title}
                          </h5>
                          <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start group">
                                <div className={`w-2 h-2 bg-${section.color}-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform`}></div>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Models & Promotional Strategies */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-4 flex items-center">
                        <DollarSign className="w-6 h-6 text-yellow-600 mr-3" />
                        Pricing Models
                      </h4>
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Fixed Pricing',
                            items: [
                              'Set a single price for lifetime access',
                              'Simple for students to understand',
                              'Predictable revenue per enrollment',
                              'Good for comprehensive courses'
                            ]
                          },
                          {
                            title: 'Tiered Pricing',
                            items: [
                              'Basic, standard, and premium tiers',
                              'Different levels of access and support',
                              'Appeals to various budget ranges',
                              'Maximizes revenue potential'
                            ]
                          }
                        ].map((model, index) => (
                          <div key={index} className="space-y-3">
                            <h5 className="font-bold text-lg text-gray-800 dark:text-stone-200">
                              {model.title}
                            </h5>
                            <div className="space-y-2">
                              {model.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mr-3 mt-2"></div>
                                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-green-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-4 flex items-center">
                        <Star className="w-6 h-6 text-green-600 mr-3" />
                        Promotional Strategies
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Launch Discounts',
                            desc: 'Offer early-bird pricing to attract initial students and gather feedback',
                            color: 'green'
                          },
                          {
                            title: 'Bundle Offers',
                            desc: 'Create course bundles or series with discounted pricing for multiple enrollments',
                            color: 'blue'
                          },
                          {
                            title: 'Seasonal Promotions',
                            desc: 'Participate in platform-wide sales events and professional development seasons',
                            color: 'purple'
                          }
                        ].map((strategy, index) => (
                          <div key={index} className="flex items-start group">
                            <div className={`w-4 h-4 bg-${strategy.color}-500 rounded-full mr-4 mt-1 group-hover:scale-125 transition-transform`}></div>
                            <div>
                              <h6 className={`font-bold text-${strategy.color}-600 dark:text-${strategy.color}-400 mb-1`}>
                                {strategy.title}
                              </h6>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {strategy.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>          {/* Section 8: Platform Rules and Content Standards */}
          <section id="section-8" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 8</h3>
                      <p className="text-white/90 text-lg font-medium">Platform Rules and Content Standards</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Shield className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <AlertTriangle className="w-6 h-6 text-yellow-300 animate-pulse delay-300" />
                    <Shield className="w-6 h-6 text-yellow-300 animate-pulse delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-yellow-50/50 via-red-50/30 to-orange-50/20 dark:from-yellow-950/20 dark:via-red-950/20 dark:to-orange-950/10">
                <div className="space-y-8">
                  {/* Platform Rules Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Quality Standards and Content Guidelines" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-red-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Quality Standards & Guidelines</h5>
                      <p className="text-sm opacity-90">Maintaining excellence in healthcare education</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Content Standards */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border-l-4 border-green-500">
                      <h4 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center">
                        <Award className="w-6 h-6 mr-3" />
                        Content Standards
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Provide accurate, evidence-based information',
                          'Maintain current and relevant content',
                          'Use appropriate language and tone',
                          'Include proper citations and references',
                          'Respect intellectual property rights',
                          'Follow professional ethics guidelines'
                        ].map((standard, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                              {standard}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Prohibited Content */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border-l-4 border-red-500">
                      <h4 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-3" />
                        Prohibited Content
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Inaccurate or misleading medical information',
                          'Plagiarized or copyrighted material',
                          'Discriminatory or offensive content',
                          'Promotional content for unproven treatments',
                          'Personal medical advice or diagnosis',
                          'Content that violates professional standards'
                        ].map((prohibition, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                              {prohibition}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quality Assurance Process */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-yellow-50/80 dark:from-black/90 dark:to-yellow-950/30 rounded-3xl p-8 shadow-2xl border border-yellow-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text mb-6 flex items-center">
                      <Star className="w-6 h-6 text-yellow-600 mr-3" />
                      Quality Assurance Process
                    </h4>
                    <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8">
                      All courses undergo review to ensure they meet <span className="font-bold text-yellow-600">GLOHSEN standards</span>:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Initial Review',
                          desc: 'Content accuracy, structure, and compliance check before publication',
                          icon: Shield,
                          color: 'blue'
                        },
                        {
                          title: 'Student Feedback',
                          desc: 'Ongoing monitoring of student ratings and feedback for quality maintenance',
                          icon: Users,
                          color: 'green'
                        },
                        {
                          title: 'Periodic Updates',
                          desc: 'Regular content updates required to maintain currency and relevance',
                          icon: TrendingUp,
                          color: 'purple'
                        }
                      ].map((process, index) => {
                        const IconComponent = process.icon;
                        return (
                          <div key={index} className="group text-center transform transition-all duration-300 hover:scale-105">
                            <div className={`w-16 h-16 bg-gradient-to-br from-${process.color}-500 to-${process.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white/50`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h5 className={`font-bold text-lg mb-3 text-${process.color}-600 dark:text-${process.color}-400`}>
                              {process.title}
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                              {process.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consequences for Violations */}
                  <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-red-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                      Consequences for Violations
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                      Tutors who violate platform rules may face <span className="font-bold text-red-600">content removal</span>, <span className="font-bold text-orange-600">account warnings</span>, <span className="font-bold text-red-600">temporary suspension</span>, 
                      or <span className="font-bold text-red-700">permanent removal</span> from the platform. Serious violations may be reported to relevant professional 
                      licensing boards. We work with tutors to address issues and maintain high standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Making the Most of GLOHSEN Community */}
          <section id="section-9" className="print-break-before relative group">
            <div 
              className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/30 transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] cursor-pointer"
              onClick={playChimeSound}
              onMouseEnter={playWhooshSound}
            >
              {/* Premium Header with Gradient */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
                      <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-wide">Section 9</h3>
                      <p className="text-white/90 text-lg font-medium">Making the Most of GLOHSEN Community</p>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-2">
                    <Users className="w-6 h-6 text-green-300 animate-bounce" />
                    <Heart className="w-6 h-6 text-green-300 animate-bounce delay-300" />
                    <Users className="w-6 h-6 text-green-300 animate-bounce delay-600" />
                  </div>
                </div>
              </div>              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-red-50/50 via-green-50/30 to-blue-50/20 dark:from-red-950/20 dark:via-green-950/20 dark:to-blue-950/10">
                <div className="space-y-8">
                  {/* Community Hero Image */}
                  <div className="relative mb-8">
                    <img 
                      src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&h=300&q=80" 
                      alt="Healthcare Community Collaboration" 
                      className="w-full h-52 object-cover rounded-2xl shadow-lg border-2 border-white/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-green-600/30 rounded-2xl"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h5 className="text-lg font-bold">Build Your Teaching Legacy</h5>
                      <p className="text-sm opacity-90">Connect, collaborate, and grow with our global community</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Online Engagement */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-green-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-4 flex items-center">
                        <Users className="w-6 h-6 text-green-600 mr-3" />
                        Online Engagement
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Participate in educational forums and discussions',
                          'Share teaching insights and best practices',
                          'Collaborate with other educators on projects',
                          'Mentor new tutors and content creators',
                          'Contribute to platform improvement initiatives',
                          'Stay updated with educational technology trends'
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                              {activity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Professional Development */}
                    <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-blue-200/50">
                      <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 flex items-center">
                        <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                        Professional Development
                      </h4>
                      <div className="space-y-3">
                        {[
                          'Attend platform webinars and training sessions',
                          'Learn from successful educators and their strategies',
                          'Access new teaching tools and technologies',
                          'Participate in educational research and studies',
                          'Build your reputation as a thought leader',
                          'Expand your network of professional contacts'
                        ].map((opportunity, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              {opportunity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              
                  {/* Success Tips */}
                  <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-green-50/80 dark:from-black/90 dark:to-green-950/30 rounded-3xl p-8 shadow-2xl border border-green-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-6 flex items-center">
                      <Trophy className="w-6 h-6 text-green-600 mr-3" />
                      Success Tips for Tutors
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {[
                          'Maintain an active and engaging teaching profile',
                          'Respond promptly to student questions and feedback',
                          'Continuously update and improve your content',
                          'Engage with the community through forums and events'
                        ].map((tip, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed text-sm">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {[
                          'Seek feedback and implement improvements',
                          'Collaborate with other tutors on joint projects',
                          'Promote your courses through appropriate channels',
                          'Build long-term relationships with your students'
                        ].map((tip, index) => (
                          <div key={index} className="flex items-start group">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                            <p className="text-gray-800 dark:text-stone-200 leading-relaxed text-sm">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Building Your Teaching Legacy */}
                  <div className="backdrop-blur-lg bg-white/80 dark:bg-black/80 rounded-2xl p-6 shadow-xl border border-purple-200/50">
                    <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text mb-4 flex items-center">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      Building Your Teaching Legacy
                    </h4>
                    <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                      As a <span className="font-bold text-purple-600">GLOHSEN tutor</span>, you have the opportunity to shape the future of healthcare education. 
                      Focus on creating <span className="font-bold text-red-600">lasting impact</span> through quality content, meaningful student relationships, 
                      and contributions to the broader healthcare education community. Your <span className="font-semibold text-yellow-600">expertise and dedication</span> 
                      help build a stronger, more knowledgeable healthcare workforce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section></div>

        {/* Premium Footer */}
        <div className="mt-16 relative">
          <div className="backdrop-blur-lg bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-10 rounded-3xl text-white text-center shadow-2xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 mr-3 animate-pulse" />
                Ready to Start Your Teaching Journey?
                <Sparkles className="w-8 h-8 ml-3 animate-pulse" />
              </h3>
              <p className="text-xl opacity-95 mb-8 leading-relaxed max-w-3xl mx-auto">
                Join hundreds of healthcare educators who are making a difference through quality education. 
                Share your expertise and help shape the future of healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={playClickSound}
                  className="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white/30"
                >
                  <span className="flex items-center justify-center">
                    <Trophy className="w-5 h-5 mr-2 group-hover:text-yellow-600 transition-colors" />
                    Go to Dashboard
                  </span>
                </button>
                <button 
                  onClick={playClickSound}
                  className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 mr-2 group-hover:text-blue-600 transition-colors" />
                    Get Support
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <Footer isActive={false} />
    </>  );
}