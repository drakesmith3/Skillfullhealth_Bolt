import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Gamepad2, Users, DollarSign, Shield, TrendingUp, AlertTriangle, Heart, Award, Sparkles, Star, Target, Zap } from 'lucide-react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

export default function StudentsHandbook() {
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
    audio.play().catch(() => {});  }, []);

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
              <Star className="w-4 h-4 text-red-500 animate-pulse delay-300" />
              <Star className="w-6 h-6 text-yellow-500 animate-pulse delay-600" />
            </div>
          </div>
          
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text mb-6 tracking-tight leading-tight">
              GLOHSEN
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-yellow-500/20 blur-lg rounded-lg"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-stone-100 mb-8 tracking-wide">
            Student <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text">Handbook</span>
          </h2>
          
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-3xl p-8 shadow-2xl border border-white/20">
            <p className="text-xl md:text-2xl text-gray-800 dark:text-stone-200 leading-relaxed font-medium">
              Your <span className="text-red-600 font-bold">comprehensive guide</span> to succeeding as a healthcare student on the GLOHSEN platform. 
              <br />
              <span className="text-yellow-600 font-semibold">Learn, grow, and prepare</span> for your future healthcare career with our innovative tools and community.
            </p>
          </div>

          {/* Premium Accent Line */}
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full shadow-lg"></div>
          </div>
        </div>        {/* Premium Table of Contents */}
        <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden mb-16 border border-white/30 dark:border-gray-800/50">
          {/* Luxurious Header */}
          <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white flex items-center justify-center">
                <div className="mr-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                  <GraduationCap className="w-8 h-8" />
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
                { title: '2. Why Join GLOHSEN as a Student?', icon: Heart, color: 'yellow' },
                { title: '3. Terms, Privacy, and Legal Requirements', icon: Shield, color: 'red' },
                { title: '4. Ways to Make Money on GLOHSEN', icon: DollarSign, color: 'yellow' },
                { title: '5. How to Become a Creator/Tutor', icon: BookOpen, color: 'red' },
                { title: '6. Games, Quizzes, and Competitions', icon: Gamepad2, color: 'yellow' },
                { title: '7. Platform Rules and Student Conduct', icon: AlertTriangle, color: 'red' },
                { title: '8. Making the Most of GLOHSEN Community', icon: Users, color: 'yellow' }
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
              })}            </div>
          </div>
        </div>
        
        {/* Premium Content Sections */}
        <div className="space-y-16">
          {/* Premium Section 1 */}
          <section id="section-1" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div>                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">1.</span>What is GLOHSEN?
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      The GLOHSEN Standard for Excellence
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
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          <span className="font-bold text-red-600">GLOHSEN (21st Century Global Health Services Network)</span> is a comprehensive training 
                          and staffing network for healthcare professionals. As a student, you have access to a 
                          <span className="font-semibold text-yellow-600"> marketplace of skill acquisition, training, and mentorship</span> from top professionals and tutors worldwide.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FREI Standard - Premium Design */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 left-8">
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-10">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        The GLOHSEN Standard: <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">"FREI"</span>
                      </h4>
                      <p className="text-xl text-gray-800 dark:text-stone-200 max-w-3xl mx-auto leading-relaxed">
                        All educational content on our platform meets <span className="font-bold text-red-600">three essential criteria</span> to ensure the best learning experience:
                      </p>
                    </div>
                    
                    {/* FREI Cards - Premium Layout */}
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          letter: 'F',
                          title: 'FUN',
                          description: 'Engaging, interactive, and enjoyable learning experiences that keep you motivated',
                          gradient: 'from-red-500 to-red-600',
                          bgGradient: 'from-red-50 to-red-100',
                          icon: '🎯'
                        },
                        {
                          letter: 'RE',
                          title: 'RIDICULOUSLY EASY',
                          description: 'Complex medical concepts broken down into simple, understandable lessons',
                          gradient: 'from-yellow-500 to-amber-600',
                          bgGradient: 'from-yellow-50 to-amber-100',
                          icon: '⚡'
                        },
                        {
                          letter: 'I',
                          title: 'INDIVIDUALIZED',
                          description: 'Personalized learning paths that adapt to your unique learning style and pace',
                          gradient: 'from-black to-gray-800',
                          bgGradient: 'from-gray-50 to-gray-100',
                          icon: '🎨'
                        }
                      ].map((item, index) => (
                        <div key={index} className={`group relative text-center backdrop-blur-sm bg-gradient-to-br ${item.bgGradient} dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                          onMouseEnter={playWhooshSound}
                        >
                          {/* Premium Icon Container */}
                          <div className={`relative w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-black text-2xl">{item.letter}</span>
                            <div className="absolute -top-2 -right-2 text-2xl">{item.icon}</div>
                          </div>
                          
                          <h5 className="text-xl font-black text-black dark:text-stone-100 mb-4 tracking-wide">
                            {item.title}
                          </h5>
                          <p className="text-gray-800 dark:text-stone-200 leading-relaxed font-medium">
                            {item.description}
                          </p>
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                        </div>
                      ))}
                    </div>                  </div>

                  {/* Learning Ecosystem Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Your Learning Ecosystem
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          GLOHSEN provides a <span className="font-bold text-yellow-600">supportive ecosystem</span> where you can learn, grow, and connect with mentors, 
                          peers, and future employers. Our platform emphasizes <span className="font-semibold text-red-600">preventive, perfect-health-maintenance-oriented 
                          medicine</span> and personal entrepreneurship for all members.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80" 
                        alt="Healthcare professionals collaborating in modern medical environment" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>          {/* Premium Section 2 */}
          <section id="section-2" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div>                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">2.</span>Why Join GLOHSEN?
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Your Gateway to Healthcare Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Star className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-10">
                  
                  {/* Benefits Grid - Premium Layout */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Learning Benefits Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100">Learning Benefits</h4>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Access to a marketplace of skill acquisition and training',
                          'Interactive games, quizzes, and competitions for learning',
                          'Direct connection with mentors and expert tutors',
                          'Personalized learning experiences tailored to your needs',
                          'Earn badges and certificates to showcase your progress',
                          'Free access to many educational games and quizzes'
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-md">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-800 dark:text-stone-200 font-medium leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Career Preparation Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-2xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg mr-4">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100">Career Preparation</h4>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Build a strong foundation for your healthcare career',
                          'Connect with potential employers and professionals',
                          'Develop both technical and soft skills',
                          'Access career guidance and mentorship',
                          'Join study communities and peer support groups',
                          'Prepare for professional certifications and exams'
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-md">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-800 dark:text-stone-200 font-medium leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Premium Success Story */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-amber-200/50 dark:border-amber-800/30 shadow-2xl">
                    {/* Decorative Quote Marks */}
                    <div className="absolute -top-4 left-8 text-6xl text-yellow-500/30 font-serif">"</div>
                    <div className="absolute -bottom-4 right-8 text-6xl text-yellow-500/30 font-serif rotate-180">"</div>
                    
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Success Story</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="flex items-start max-w-4xl mx-auto">
                      <div className="mr-8 relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                          <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Student Amy's <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Transformation</span>
                        </h5>
                        <blockquote className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed italic font-medium">
                          I was struggling with the <span className="font-bold text-red-600">clotting cascade</span> in physiology class until I found 
                          <span className="font-bold text-yellow-600"> Tutor Z's ClotQuest game</span> on GLOHSEN. The interactive approach made everything click! 
                          I went from <span className="font-bold text-red-600">failing to becoming one of the top students</span> in my class. The personalized mentoring                          sessions helped me understand complex concepts that seemed impossible before.
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80" 
                        alt="Diverse group of medical students studying together with laptops and books" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>          {/* Premium Section 3 */}
          <section id="section-3" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-amber-600 via-yellow-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">3.</span>Terms & Privacy
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Your Data, Your Rights, Your Protection
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Star className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-amber-950/20">
                <div className="space-y-10">
                  
                  {/* Legal Protection Card */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-3xl p-10 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-6">
                          <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Legal Compliance</span> & Protection
                        </h4>
                        <p className="text-xl text-gray-800 dark:text-stone-200 leading-relaxed mb-8">
                          By joining GLOHSEN, you agree to our <span className="font-bold text-red-600">Terms of Service</span> and 
                          <span className="font-bold text-yellow-600"> Privacy Policy</span>, which protect your data and privacy in line with 
                          <span className="font-semibold text-red-600">global standards including HIPAA</span> where applicable.
                        </p>
                        
                        {/* Premium Feature List */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            'Your personal information is encrypted and securely stored',
                            'We comply with international privacy regulations (GDPR, HIPAA)',
                            'You maintain control over your personal data and privacy settings',
                            'All educational content is reviewed for accuracy and safety',
                            'Platform interactions are monitored for safety and appropriateness'
                          ].map((item, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 mt-1 shadow-lg">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              <span className="text-gray-800 dark:text-stone-200 font-medium leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Responsibilities - Premium Design */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Student <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Responsibilities</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        {[
                          'Provide accurate information during registration',
                          'Respect the platform\'s code of conduct',
                          'Follow data protection rules and guidelines',
                          'Maintain academic integrity in all activities'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mr-4 mt-1 shadow-lg">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-800 dark:text-stone-200 font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          'Respect intellectual property rights',
                          'Engage respectfully with peers and instructors',
                          'Report any inappropriate behavior or content',
                          'Keep login credentials secure and confidential'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mr-4 mt-1 shadow-lg">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-800 dark:text-stone-200 font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>                  </div>

                  {/* Certificate Tracking Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl shadow-lg">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Certificate & License Tracking
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          We help track your <span className="font-bold text-yellow-600">certificates and licenses</span> for validity and notify you of upcoming expirations. 
                          This ensures you stay current with your professional development and maintain compliance with 
                          <span className="font-semibold text-red-600">educational and professional requirements</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80" 
                        alt="Digital privacy and security concept with healthcare data protection" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>          {/* Premium Section 4 */}
          <section id="section-4" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-amber-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">4.</span>Make Money on GLOHSEN
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Turn Your Knowledge Into Income
                    </p>
                  </div>
                  <div className="ml-auto">
                    <TrendingUp className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-10">
                  
                  {/* Money-Making Opportunities Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                      {/* Active Participation Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                      onMouseEnter={playWhooshSound}
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-2xl mr-4">
                          <Target className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Active <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Participation</span>
                        </h4>
                      </div>
                      
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Moderate Community Discussions',
                            desc: 'Earn rewards for helping maintain quality discussions and supporting fellow students',
                            icon: '💬'
                          },
                          {
                            title: 'Win Competitions',
                            desc: 'Participate in quizzes, games, and challenges with cash prizes and scholarships',
                            icon: '🏆'
                          },
                          {
                            title: 'Research Participation',
                            desc: 'Join research studies and surveys for incentive payments',
                            icon: '🔬'
                          },
                          {
                            title: 'Peer Tutoring',
                            desc: 'Help other students and earn money through peer-to-peer teaching',
                            icon: '👥'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-yellow-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                      {/* Content Creation Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-3xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                      onMouseEnter={playWhooshSound}
                    >
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl mr-4">
                          <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Content <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Creation</span>
                        </h4>                      </div>
                      
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Study Guides',
                            desc: 'Create and sell study materials to other students',
                            icon: '📚'
                          },
                          {
                            title: 'Educational Content',
                            desc: 'Develop quizzes, flashcards, and learning aids',
                            icon: '🧠'
                          },
                          {
                            title: 'Blog Writing',
                            desc: 'Contribute articles about student life and learning experiences',
                            icon: '✍️'
                          },
                          {
                            title: 'Video Content',
                            desc: 'Create educational videos and tutorials for peers',
                            icon: '🎥'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-red-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>                  </div>

                  {/* Scholarship & Prize Opportunities - Premium Design */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-amber-200/50 dark:border-amber-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Scholarship & <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Prize Opportunities</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: Award,
                          title: 'Academic Excellence',
                          desc: 'Scholarships for top performers',
                          gradient: 'from-red-500 to-red-600'
                        },
                        {
                          icon: Gamepad2,
                          title: 'Competition Prizes',
                          desc: 'Cash rewards for quiz champions',
                          gradient: 'from-yellow-500 to-amber-600'
                        },
                        {
                          icon: Users,
                          title: 'Community Contribution',
                          desc: 'Rewards for helping others',
                          gradient: 'from-yellow-500 to-amber-600'
                        }
                      ].map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}>
                              <IconComponent className="w-10 h-10 text-white" />
                            </div>
                            <h5 className="text-xl font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                            <p className="text-gray-800 dark:text-stone-200 font-medium">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Platform Activities */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Platform Activities
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          Regular platform activities like <span className="font-bold text-yellow-600">completing courses</span>, 
                          <span className="font-bold text-red-600"> participating in discussions</span>, and helping 
                          other students can earn you <span className="font-semibold text-yellow-600">points, badges, and monetary rewards</span>. 
                          The more engaged you are, the more opportunities you'll have to <span className="font-bold text-red-600">earn while you learn</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80" 
                        alt="Student earning money through online education and tutoring" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>                </div>
              </div>
            </div>
          </section>

          {/* Premium Section 5 */}
          <section id="section-5" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">5.</span>Become a Creator/Tutor
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Transform Your Knowledge Into Teaching Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <BookOpen className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">                <div className="space-y-10">
                  
                  {/* Student to Tutor Pathway Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Student to Tutor Pathway
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          As you advance in your studies, you can apply to become a <span className="font-bold text-red-600">content-adviser (tutor)</span> and share 
                          your expertise with fellow students and peers. This is a great way to <span className="font-semibold text-yellow-600">reinforce your own 
                          learning</span> while helping others and earning income.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Section - Premium Design */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Requirements to Become a <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Student Tutor</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto"></div>
                    </div>
                    
                    {/* Requirements Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Academic Excellence',
                            desc: 'Demonstrate strong academic performance in your area of expertise',
                            icon: '🎯'
                          },
                          {
                            title: 'Program Progress',
                            desc: 'Complete at least 2 semesters in your program',
                            icon: '📚'
                          },
                          {
                            title: 'Good Standing',
                            desc: 'Maintain good standing with your educational institution',
                            icon: '✅'
                          },
                          {
                            title: 'Mentoring Experience',
                            desc: 'Show evidence of helping and mentoring other students',
                            icon: '👥'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-yellow-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Content Portfolio',
                            desc: 'Submit sample educational content or teaching materials',
                            icon: '📝'
                          },
                          {
                            title: 'References',
                            desc: 'Provide references from instructors or academic advisors',
                            icon: '🎓'
                          },
                          {
                            title: 'Assessment',
                            desc: 'Pass a content creation assessment',
                            icon: '📊'
                          },
                          {
                            title: 'Standards Agreement',
                            desc: 'Agree to maintain quality standards and guidelines',
                            icon: '⭐'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-yellow-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefits Grid - Premium Design */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: 'Academic Benefits',
                        gradient: 'from-red-500 to-red-600',
                        bgGradient: 'from-red-50 to-red-100',
                        items: [
                          'Reinforce your own learning',
                          'Develop teaching and communication skills',
                          'Build your academic reputation',
                          'Gain recognition from faculty'
                        ]
                      },
                      {
                        title: 'Financial Benefits',
                        gradient: 'from-yellow-500 to-amber-600',
                        bgGradient: 'from-yellow-50 to-amber-100',
                        items: [
                          'Earn money from course sales',
                          'Receive tutoring session payments',
                          'Access to creator incentive programs',
                          'Build a sustainable income stream'
                        ]
                      },
                      {
                        title: 'Career Benefits',
                        gradient: 'from-black to-gray-800',
                        bgGradient: 'from-gray-50 to-gray-100',
                        items: [
                          'Enhance your resume and portfolio',
                          'Develop leadership skills',
                          'Build professional networks',
                          'Prepare for future teaching roles'
                        ]
                      }
                    ].map((benefit, index) => (
                      <div key={index} className={`group relative backdrop-blur-sm bg-gradient-to-br ${benefit.bgGradient} dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                        onMouseEnter={playWhooshSound}
                        onClick={playClickSound}
                      >
                        {/* Premium Icon Container */}
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        
                        <h5 className="text-xl font-black text-black dark:text-stone-100 mb-6 text-center tracking-wide">
                          {benefit.title}
                        </h5>
                        
                        <div className="space-y-3">
                          {benefit.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start">
                              <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-sm">
                                <span className="text-white text-xs font-bold">•</span>
                              </div>
                              <span className="text-gray-800 dark:text-stone-200 font-medium text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                      </div>
                    ))}
                  </div>

                  {/* Content Creation Guidelines Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Content Creation Guidelines
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          Student tutors must meet the same <span className="font-bold text-yellow-600">quality standards</span> as professional tutors. Content should be 
                          accurate, engaging, and helpful to fellow students. You'll have access to our <span className="font-semibold text-red-600">AI-powered course 
                          creation tools</span> and receive support from experienced educators on the platform.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                        alt="Student teaching and mentoring other students in a modern learning environment" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Premium Section 6 */}
          <section id="section-6" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">6.</span>Games & Competitions
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Interactive Learning Through Play
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Award className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-10">
                  
                  {/* Interactive Learning Platform Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Interactive Learning Platform
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          GLOHSEN offers a wide variety of <span className="font-bold text-yellow-600">interactive learning activities</span> designed to make studying 
                          engaging and effective. These activities help <span className="font-semibold text-red-600">reinforce learning, test knowledge,</span> and 
                          provide opportunities to win prizes and recognition.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Activities Grid - Premium Design */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: Gamepad2,
                        title: 'Educational Games',
                        desc: 'Interactive simulations and case studies that make complex medical concepts easy to understand',
                        gradient: 'from-yellow-500 to-amber-600',
                        bgGradient: 'from-yellow-50 to-amber-100'
                      },
                      {
                        icon: BookOpen,
                        title: 'Knowledge Quizzes',
                        desc: 'Test your understanding and compete with peers in subject-specific quizzes and assessments',
                        gradient: 'from-red-500 to-red-600',
                        bgGradient: 'from-red-50 to-red-100'
                      },
                      {
                        icon: Award,
                        title: 'Competitions',
                        desc: 'Platform-wide challenges with prizes, scholarships, and recognition for top performers',
                        gradient: 'from-yellow-500 to-amber-600',
                        bgGradient: 'from-yellow-50 to-amber-100'
                      }
                    ].map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className={`group/item relative backdrop-blur-sm bg-gradient-to-br ${activity.bgGradient} dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center`}
                          onMouseEnter={playWhooshSound}
                          onClick={playChimeSound}
                        >
                          {/* Premium Icon Container */}
                          <div className={`relative w-20 h-20 bg-gradient-to-br ${activity.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover/item:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          
                          <h5 className="text-xl font-black text-black dark:text-stone-100 mb-4 tracking-wide">
                            {activity.title}
                          </h5>
                          <p className="text-gray-800 dark:text-stone-200 leading-relaxed font-medium">
                            {activity.desc}
                          </p>
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Featured ClotQuest Game - Premium Showcase */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl p-10 border-2 border-blue-200/50 dark:border-blue-800/30 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                            ClotQuest: <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Interactive Physiology</span>
                          </h4>
                          <p className="text-lg text-gray-800 dark:text-stone-200 mb-6 leading-relaxed">
                            Master the clotting cascade through an engaging adventure game. Navigate through 
                            platelets, enzymes, and factors while learning complex physiological processes.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {['Free to Play', 'Certificate Available', 'Multiplayer'].map((tag, index) => (
                              <span key={index} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-black dark:text-stone-100 font-medium border border-white/30 shadow-lg">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-white/20 dark:bg-black/20 p-6 rounded-2xl border border-white/30 shadow-xl">
                          <h5 className="text-xl font-bold text-black dark:text-stone-100 mb-6 text-center">Game Statistics</h5>
                          <div className="grid grid-cols-2 gap-6">
                            {[
                              { label: 'Students Played', value: '5,432' },
                              { label: 'Average Rating', value: '4.9/5' },
                              { label: 'Completion Rate', value: '92%' },
                              { label: 'Would Recommend', value: '95%' }
                            ].map((stat, index) => (
                              <div key={index} className="text-center">
                                <div className="text-2xl font-black text-black dark:text-stone-100">{stat.value}</div>
                                <div className="text-sm text-gray-700 dark:text-stone-300 font-medium">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participation Benefits - Premium Layout */}
                  <div className="backdrop-blur-sm bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-amber-200/50 dark:border-amber-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Participation <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Benefits</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Learning Enhancement',
                            desc: 'Reinforce learning through interactive practice',
                            icon: '🧠'
                          },
                          {
                            title: 'Achievement System',
                            desc: 'Earn badges and certificates for achievements',
                            icon: '🏆'
                          },
                          {
                            title: 'Prize Opportunities',
                            desc: 'Win cash prizes and scholarship opportunities',
                            icon: '💰'
                          },
                          {
                            title: 'Reputation Building',
                            desc: 'Build your academic and professional reputation',
                            icon: '⭐'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-amber-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-6">
                        {[
                          {
                            title: 'Community Connection',
                            desc: 'Connect with peers who share your interests',
                            icon: '👥'
                          },
                          {
                            title: 'Progress Tracking',
                            desc: 'Track your progress and improvement over time',
                            icon: '📈'
                          },
                          {
                            title: 'Competitive Rankings',
                            desc: 'Access leaderboards and competitive rankings',
                            icon: '🥇'
                          },
                          {
                            title: 'Skill Development',
                            desc: 'Develop problem-solving and critical thinking skills',
                            icon: '🎯'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-amber-200/30">
                            <div className="flex items-start">
                              <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" 
                        alt="Students engaged in interactive learning games and digital competitions" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Premium Section 7 */}
          <section id="section-7" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">7.</span>Platform Rules & Conduct
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Standards for Academic Excellence
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Shield className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-10">
                  
                  {/* Behavior Guidelines - Premium Layout */}
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Expected Behavior Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/80 to-emerald-100/80 dark:from-green-950/30 dark:to-emerald-900/20 rounded-3xl p-8 border-2 border-green-200/50 dark:border-green-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl mr-4">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Expected <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">Behavior</span>
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Academic Integrity',
                            desc: 'Maintain academic integrity in all activities',
                            icon: '🎯'
                          },
                          {
                            title: 'Respectful Interaction',
                            desc: 'Respect fellow students, tutors, and professionals',
                            icon: '🤝'
                          },
                          {
                            title: 'Constructive Engagement',
                            desc: 'Engage constructively in discussions and forums',
                            icon: '💬'
                          },
                          {
                            title: 'Honest Feedback',
                            desc: 'Provide honest feedback and reviews',
                            icon: '⭐'
                          },
                          {
                            title: 'Peer Support',
                            desc: 'Support and help other students when possible',
                            icon: '🤗'
                          },
                          {
                            title: 'Evidence-Based Learning',
                            desc: 'Follow evidence-based learning practices',
                            icon: '📊'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-green-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-1 text-sm">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Prohibited Actions Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-3xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl mr-4">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Prohibited <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Actions</span>
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Academic Dishonesty',
                            desc: 'Cheating or dishonest behavior in assessments',
                            icon: '❌'
                          },
                          {
                            title: 'Harassment',
                            desc: 'Harassment or discrimination against others',
                            icon: '🚫'
                          },
                          {
                            title: 'Inappropriate Content',
                            desc: 'Sharing inappropriate or offensive content',
                            icon: '⚠️'
                          },
                          {
                            title: 'Plagiarism',
                            desc: 'Plagiarism or academic dishonesty',
                            icon: '📝'
                          },
                          {
                            title: 'Disruption',
                            desc: 'Disrupting learning environments or discussions',
                            icon: '🔇'
                          },
                          {
                            title: 'Rule Circumvention',
                            desc: 'Attempting to circumvent platform rules',
                            icon: '🔒'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-red-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-1 text-sm">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academic Integrity Section - Premium Design */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Academic <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Integrity</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mx-auto mb-6"></div>
                      <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed max-w-3xl mx-auto">
                        Academic integrity is <span className="font-bold text-yellow-600">fundamental to your success</span> and the value of your education. 
                        All work submitted must be your own, and you must properly cite any sources used.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* Acceptable Practices */}
                      <div className="backdrop-blur-sm bg-white/60 dark:bg-black/40 rounded-2xl p-6 border border-white/30 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg mr-4">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="text-xl font-bold text-black dark:text-stone-100">Acceptable Practices</h5>
                        </div>
                        <div className="space-y-3">
                          {[
                            'Collaborating on group assignments when permitted',
                            'Seeking help from tutors and mentors',
                            'Using platform resources and study materials',
                            'Discussing concepts with peers for understanding'
                          ].map((practice, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 shadow-sm">
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              <span className="text-gray-800 dark:text-stone-200 font-medium text-sm leading-relaxed">{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Unacceptable Practices */}
                      <div className="backdrop-blur-sm bg-white/60 dark:bg-black/40 rounded-2xl p-6 border border-white/30 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg mr-4">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="text-xl font-bold text-black dark:text-stone-100">Unacceptable Practices</h5>
                        </div>
                        <div className="space-y-3">
                          {[
                            'Copying answers from other students',
                            'Using unauthorized materials during assessments',
                            'Submitting work that is not your own',
                            'Sharing quiz or exam answers with others'
                          ].map((practice, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3 mt-1 shadow-sm">
                                <span className="text-white text-xs font-bold">✗</span>
                              </div>
                              <span className="text-gray-800 dark:text-stone-200 font-medium text-sm leading-relaxed">{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consequences Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Consequences for Violations
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          Students who violate platform rules may face <span className="font-bold text-red-600">warnings, temporary suspension, or permanent 
                          removal</span> from the platform. Academic dishonesty may also be reported to your educational 
                          institution. We believe in <span className="font-semibold text-yellow-600">second chances</span> and work with students to address issues and 
                          maintain high standards of conduct.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" 
                        alt="Students following academic integrity guidelines while studying" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
          <section id="section-8" className="group relative">
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Premium Section Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-red-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-red-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="mr-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">
                      <span className="text-5xl font-black mr-4">8.</span>GLOHSEN Community
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      Maximize Your Learning Experience
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Heart className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Premium Content */}
              <div className="p-10 bg-gradient-to-br from-stone-50/50 to-yellow-50/30 dark:from-gray-900/50 dark:to-yellow-950/20">
                <div className="space-y-10">
                  
                  {/* Engagement & Growth Grid - Premium Layout */}
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Online Engagement Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50/80 to-amber-100/80 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-3xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-2xl mr-4">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Online <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">Engagement</span>
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Study Groups & Forums',
                            desc: 'Participate actively in collaborative learning environments',
                            icon: '👥'
                          },
                          {
                            title: 'Ask Questions',
                            desc: 'Seek help when needed and contribute to discussions',
                            icon: '❓'
                          },
                          {
                            title: 'Share Insights',
                            desc: 'Share your learning experiences and insights with peers',
                            icon: '💡'
                          },
                          {
                            title: 'Collaborate',
                            desc: 'Work together on group projects and assignments',
                            icon: '🤝'
                          },
                          {
                            title: 'Support Peers',
                            desc: 'Provide support and encouragement to fellow students',
                            icon: '🤗'
                          },
                          {
                            title: 'Engage Mentors',
                            desc: 'Connect with mentors and professional advisors',
                            icon: '🎓'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-yellow-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-1 text-sm">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Academic Growth Card */}
                    <div className="backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/30 dark:to-red-900/20 rounded-3xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl mr-4">
                          <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black text-black dark:text-stone-100">
                          Academic <span className="text-transparent bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text">Growth</span>
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Set Clear Goals',
                            desc: 'Set clear learning goals and track your progress',
                            icon: '🎯'
                          },
                          {
                            title: 'Seek Feedback',
                            desc: 'Seek feedback and act on it constructively',
                            icon: '🔄'
                          },
                          {
                            title: 'Build Relationships',
                            desc: 'Build meaningful relationships with peers and mentors',
                            icon: '💝'
                          },
                          {
                            title: 'Research Opportunities',
                            desc: 'Participate in research and learning opportunities',
                            icon: '🔬'
                          },
                          {
                            title: 'Skill Development',
                            desc: 'Develop both technical and soft skills',
                            icon: '🛠️'
                          },
                          {
                            title: 'Career Preparation',
                            desc: 'Prepare for your future healthcare career',
                            icon: '🚀'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-red-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{item.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-1 text-sm">{item.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-xs leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Success Tips Section - Premium Design */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-3xl p-10 border-2 border-amber-200/50 dark:border-amber-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        Success Tips for <span className="text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text">Students</span>
                      </h4>
                      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mx-auto"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Complete Your Profile',
                            desc: 'Fill out your student profile thoroughly for better connections',
                            icon: '👤'
                          },
                          {
                            title: 'Regular Engagement',
                            desc: 'Engage regularly with courses and platform activities',
                            icon: '📅'
                          },
                          {
                            title: 'Help Others',
                            desc: 'Participate in discussions and help fellow students',
                            icon: '🤲'
                          },
                          {
                            title: 'Take Advantage',
                            desc: 'Use free games and quizzes to enhance learning',
                            icon: '🎮'
                          }
                        ].map((tip, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-amber-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{tip.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{tip.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{tip.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Build Relationships',
                            desc: 'Connect with mentors and tutors for guidance',
                            icon: '🌟'
                          },
                          {
                            title: 'Join Communities',
                            desc: 'Participate in study groups and peer communities',
                            icon: '🔗'
                          },
                          {
                            title: 'Seek Opportunities',
                            desc: 'Look for learning and networking opportunities',
                            icon: '🔍'
                          },
                          {
                            title: 'Professional Presence',
                            desc: 'Maintain a positive and professional online presence',
                            icon: '✨'
                          }
                        ].map((tip, index) => (
                          <div key={index} className="group/item relative p-4 rounded-xl bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-all duration-300 border border-amber-200/30">
                            <div className="flex items-start">
                              <div className="text-xl mr-3 mt-1">{tip.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-bold text-black dark:text-stone-100 mb-2">{tip.title}</h5>
                                <p className="text-gray-800 dark:text-stone-200 text-sm leading-relaxed">{tip.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Building Your Future Card */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-red-500 to-yellow-600 rounded-xl shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          Building Your Future
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          Your time as a student on GLOHSEN is an <span className="font-bold text-red-600">investment in your future healthcare career</span>. 
                          Take advantage of every opportunity to learn, grow, and connect with others. The <span className="font-semibold text-yellow-600">relationships 
                          you build, skills you develop, and knowledge you gain</span> will serve you throughout your 
                          professional journey. Remember, the healthcare community is built on <span className="font-bold text-red-600">collaboration, 
                          continuous learning, and mutual support</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Image Container */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 rounded-2xl p-6 border border-white/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80" 
                        alt="Healthcare students collaborating and building community relationships" 
                        className="w-full h-64 object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Premium Closing Section */}
        <div className="mt-20 text-center">
          {/* Elegant Separator */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent w-32"></div>
            <div className="mx-6 p-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-32"></div>
          </div>

          {/* Premium Call to Action */}
          <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl p-12 shadow-2xl border border-white/30 dark:border-gray-800/50 max-w-4xl mx-auto">
            <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text mb-6">
              Your Journey Begins Now
            </h3>
            <p className="text-xl text-gray-800 dark:text-stone-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join thousands of healthcare students who are already transforming their careers with GLOHSEN. 
              Experience the future of medical education today.
            </p>
              {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={playChimeSound}
                onMouseEnter={playWhooshSound}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 text-white font-bold text-lg">Start Learning Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={playChimeSound}
                onMouseEnter={playWhooshSound}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 text-white font-bold text-lg">Explore Platform</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Premium Footer */}
          <div className="mt-16 pb-8">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text mb-4">
                GLOHSEN
              </div>              <p className="text-gray-600 dark:text-stone-400 font-medium">
                Empowering the next generation of healthcare professionals
              </p>              <div className="mt-6 flex justify-center space-x-8">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isActive={true} />
    </>
  );
}
