import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PreHeader from '../components/PreHeader';
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
  Crown
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
    audio.play().catch(() => {});  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 dark:from-gray-900 dark:to-red-950/20 print:bg-white">
      <PreHeader currentPage="employers handbook" />
      
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
        </div>

        {/* Premium Table of Contents */}
        <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl overflow-hidden mb-16 border border-white/30 dark:border-gray-800/50">
          {/* Luxurious Header */}
          <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white flex items-center justify-center">
                <div className="mr-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                  <Building className="w-8 h-8" />
                </div>
                <span className="tracking-wide">Executive Overview</span>
                <Crown className="w-6 h-6 ml-4 animate-pulse" />
              </h2>
            </div>
          </div>

          {/* Premium Content Grid */}
          <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
            <div className="grid md:grid-cols-2 gap-6">              {[
                { title: '1. GLOHSEN, GLOHSEN Standard, and GLOHSEN Score', icon: Award, color: 'red' },
                { title: '2. Understanding Evaluating Metrics', icon: BarChart3, color: 'yellow' },
                { title: '3. How Employers Use GLOHSEN', icon: Handshake, color: 'red' },
                { title: '4. Terms, Privacy, and Legal Requirements', icon: Shield, color: 'yellow' },
                { title: '5. Contacting Prospective Candidates', icon: MessageSquare, color: 'red' },
                { title: '6. The Role of the Job Board', icon: Briefcase, color: 'yellow' },
                { title: '7. QUID Currency and Transaction Policies', icon: DollarSign, color: 'red' },
                { title: '8. Platform Rules and Conduct', icon: AlertTriangle, color: 'yellow' },
                { title: '9. Making the Most of GLOHSEN Community', icon: Users, color: 'red' }
              ].map((item, index) => {
                const IconComponent = item.icon;
                const isRed = item.color === 'red';
                
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
                    className={`group relative block p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 ${
                      isRed 
                        ? 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border-red-200/50 dark:border-red-800/30 hover:border-red-400 hover:from-red-100 hover:to-red-200/70' 
                        : 'bg-gradient-to-br from-yellow-50 to-amber-100/50 dark:from-yellow-950/30 dark:to-amber-900/20 border-yellow-200/50 dark:border-yellow-800/30 hover:border-yellow-400 hover:from-yellow-100 hover:to-amber-200/70'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl shadow-lg mr-4 ${
                        isRed 
                          ? 'bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700' 
                          : 'bg-gradient-to-br from-yellow-500 to-amber-600 group-hover:from-yellow-600 group-hover:to-amber-700'
                      } group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                      <div className={`text-2xl font-bold opacity-20 group-hover:opacity-100 transition-opacity duration-300 ${
                        isRed ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        →
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          
          {/* Section 1: GLOHSEN Standard & Scoring System */}
          <section id="section-1" className="group relative">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-black/90 rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-800/50 transition-all duration-500 group-hover:shadow-3xl">
              
              {/* Section Header */}
              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-yellow-500/90 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">                    <h3 className="text-4xl font-black text-white mb-2">
                      Section 1: GLOHSEN, GLOHSEN Standard, and GLOHSEN Score
                    </h3>
                    <p className="text-xl text-red-100 font-medium">
                      Understanding our platform, standards, and evaluation system
                    </p>
                  </div>
                </div>
              </div>              {/* Section Content */}
              <div className="p-8 bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-gray-900/50 dark:to-red-950/20">
                <div className="space-y-8">

                  {/* What is GLOHSEN? */}
                  <div className="backdrop-blur-sm bg-white/80 dark:bg-black/80 rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-start">
                      <div className="mr-6 p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-black dark:text-stone-100 mb-4">
                          What is GLOHSEN?
                        </h4>
                        <p className="text-lg text-gray-800 dark:text-stone-200 leading-relaxed">
                          GLOHSEN (21st Century Global Health Services Network) is a comprehensive healthcare platform connecting employers, professionals, students, and tutors for staffing, training, and HR solutions. We provide advanced evaluation tools and a trusted network for hiring decisions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The GLOHSEN Standard */}
                  <div className="relative backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-yellow-50/80 dark:from-red-950/30 dark:to-yellow-950/30 rounded-3xl p-8 border-2 border-red-200/50 dark:border-red-800/30 shadow-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-3xl font-black text-black dark:text-stone-100 mb-4">
                        The GLOHSEN Standard
                      </h4>
                      <p className="text-xl text-gray-800 dark:text-stone-200 max-w-4xl mx-auto leading-relaxed">
                        Our standard ensures quality, ethical practice, and continuous improvement in healthcare delivery. All professionals and content on our platform must meet three criteria:
                      </p>
                    </div>
                    
                    {/* FEI Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          letter: 'F',
                          title: 'FUN',
                          description: 'Engaging and positive work environment',
                          gradient: 'from-red-500 to-red-600',
                          bgGradient: 'from-red-50 to-red-100'
                        },
                        {
                          letter: 'E',
                          title: 'EASY',
                          description: 'Streamlined processes and clear communication',
                          gradient: 'from-yellow-500 to-amber-600',
                          bgGradient: 'from-yellow-50 to-amber-100'
                        },
                        {
                          letter: 'I',
                          title: 'INDIVIDUALIZED',
                          description: 'Personalized approach to each professional',
                          gradient: 'from-black to-gray-800',
                          bgGradient: 'from-gray-50 to-gray-100'
                        }
                      ].map((item, index) => (
                        <div key={index} className={`group relative text-center backdrop-blur-sm bg-gradient-to-br ${item.bgGradient} dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border-2 border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                          {/* Icon Container */}
                          <div className={`relative w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-black text-xl">{item.letter}</span>
                          </div>
                          <h5 className="text-lg font-black text-black dark:text-stone-100 mb-3 tracking-wide">
                            {item.title}
                          </h5>
                          <p className="text-gray-800 dark:text-stone-200 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
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

                </div>
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
