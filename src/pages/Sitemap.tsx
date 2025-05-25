
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Home, User, BookOpen, Briefcase, MessageCircle, Users, Settings, 
  Star, DollarSign, Activity, BarChart3, Shield, Accessibility,
  Brain, Globe, Award, Target
} from 'lucide-react';

const Sitemap: React.FC = () => {
  const { theme } = useTheme();

  const siteStructure = [
    {
      title: 'Public Pages',
      icon: Home,
      pages: [
        { name: 'Home', path: '/', description: 'Interactive parallax storytelling homepage with GLOHSEN overview' },
        { name: 'About Us', path: '/about-us', description: 'Comprehensive information about GLOHSEN platform and mission' },
        { name: 'Contact Us', path: '/contact-us', description: 'Get in touch with our team and support' },
        { name: 'Blog', path: '/blog', description: 'Latest healthcare industry insights and platform updates' },
        { name: 'Sign Up', path: '/signup', description: 'Create a new account with role selection' },
        { name: 'Login', path: '/login', description: 'Secure user authentication and access' },
        { name: 'Sitemap', path: '/sitemap', description: 'Complete site structure and navigation guide' }
      ]
    },
    {
      title: 'Learning & Community',
      icon: BookOpen,
      pages: [
        { name: 'Courses', path: '/courses', description: 'Browse CME courses, certifications, and learning paths' },
        { name: 'Community Forum', path: '/community-forum', description: 'Professional networking and discussion platform' },
        { name: 'Games & Quizzes', path: '/games-quizzes', description: 'Interactive medical learning games and assessments' },
        { name: 'Job Board', path: '/job-board', description: 'Healthcare job opportunities with AI-powered matching' }
      ]
    },
    {
      title: 'Professional Dashboard',
      icon: User,
      pages: [
        { name: 'Overview', path: '/dashboard/professional', description: 'Professional dashboard with GLOHSEN score and activity' },
        { name: 'Profile Management', path: '/dashboard/professional', description: 'Manage professional profile and credentials' },
        { name: 'Course Progress', path: '/dashboard/professional', description: 'Track learning progress and certifications' },
        { name: 'Job Applications', path: '/dashboard/professional', description: 'Manage job applications and employment history' },
        { name: 'MLM Referrals', path: '/dashboard/professional', description: 'Multi-level marketing referral system and earnings' },
        { name: 'Transactions', path: '/dashboard/professional', description: 'Financial transaction history and wallet' },
        { name: 'Inbox & Feedback', path: '/dashboard/professional', description: 'Messages and client feedback management' }
      ]
    },
    {
      title: 'Employer Dashboard',
      icon: Briefcase,
      pages: [
        { name: 'Employer Overview', path: '/dashboard/employer', description: 'Facility management and hiring dashboard' },
        { name: 'Candidate Search', path: '/dashboard/employer', description: 'AI-powered candidate matching and evaluation' },
        { name: 'Job Postings', path: '/dashboard/employer', description: 'Create and manage job vacancy postings' },
        { name: 'Criteria Analytics', path: '/employer/criteria', description: 'Set hiring criteria and score weights' },
        { name: 'Payment Portal', path: '/employer/payment', description: 'Subscription management and billing' },
        { name: 'KPI Analytics', path: '/dashboard/employer', description: 'Key performance indicators and insights' }
      ]
    },
    {
      title: 'Tutor Dashboard',
      icon: Star,
      pages: [
        { name: 'Tutor Overview', path: '/dashboard/tutor', description: 'Teaching dashboard with course management' },
        { name: 'Course Creation', path: '/dashboard/tutor', description: 'Develop and publish educational content' },
        { name: 'Student Analytics', path: '/dashboard/tutor', description: 'Track student progress and engagement' },
        { name: 'Content Analytics', path: '/dashboard/tutor', description: 'Course performance and completion rates' },
        { name: 'Revenue Tracking', path: '/dashboard/tutor', description: 'Earnings from courses and MLM referrals' }
      ]
    },
    {
      title: 'Student Dashboard',
      icon: BookOpen,
      pages: [
        { name: 'Student Overview', path: '/dashboard/student', description: 'Learning journey and progress tracking' },
        { name: 'Enrolled Courses', path: '/dashboard/student', description: 'Active and completed course progress' },
        { name: 'Achievements', path: '/dashboard/student', description: 'Certificates, badges, and accomplishments' },
        { name: 'Performance Analytics', path: '/dashboard/student', description: 'Learning analytics and improvement insights' },
        { name: 'Study Community', path: '/dashboard/student', description: 'Peer interaction and study groups' }
      ]
    },
    {
      title: 'Client Dashboard',
      icon: Users,
      pages: [
        { name: 'Client Overview', path: '/dashboard/client', description: 'Service management and professional connections' },
        { name: 'Find Professionals', path: '/dashboard/client', description: 'Search and connect with healthcare providers' },
        { name: 'Service History', path: '/dashboard/client', description: 'Past services and provider interactions' },
        { name: 'Feedback Management', path: '/dashboard/client', description: 'Rate experiences and provide feedback' },
        { name: 'Community Access', path: '/dashboard/client', description: 'Discussion forums and peer support' }
      ]
    },
    {
      title: 'Analytics & Scoring',
      icon: BarChart3,
      pages: [
        { name: 'GLOHSEN Score Calculator', path: '/score/calculate', description: 'Interactive professional score assessment' },
        { name: 'Score Results', path: '/score', description: 'Detailed GLOHSEN score breakdown and insights' },
        { name: 'KPI Tracking', path: '/kpi-tracking', description: 'Monitor key performance indicators' },
        { name: 'KPI Dashboard', path: '/kpi-dashboard', description: 'Visual analytics and performance metrics' },
        { name: 'Analytics Dashboard', path: '/analytics', description: 'Comprehensive platform analytics and insights' }
      ]
    },
    {
      title: 'Financial Management',
      icon: DollarSign,
      pages: [
        { name: 'Professional Wallet', path: '/wallet/professional', description: 'Earnings, transactions, and financial history' },
        { name: 'Tutor Wallet', path: '/wallet/tutor', description: 'Teaching income and MLM commission tracking' },
        { name: 'MLM System', path: '/mlm', description: 'Multi-level marketing referral management' },
        { name: 'Payment Processing', path: '/payments', description: 'Secure payment gateway and transactions' }
      ]
    },
    {
      title: 'AI-Powered Features',
      icon: Brain,
      pages: [
        { name: 'Recommendation Engine', path: '/recommendations', description: 'AI-powered course and job recommendations' },
        { name: 'Smart Matching', path: '/matching', description: 'Intelligent candidate-employer matching' },
        { name: 'Activity Tracking', path: '/activity', description: 'AI-powered user behavior analysis' },
        { name: 'Feedback Routing', path: '/feedback-routing', description: 'Automated feedback processing and routing' }
      ]
    },
    {
      title: 'Platform Features',
      icon: Globe,
      pages: [
        { name: 'Accessibility Tools', path: '/accessibility', description: 'WCAG-compliant accessibility features' },
        { name: 'Security Center', path: '/security', description: 'Platform security and privacy settings' },
        { name: 'Performance Monitoring', path: '/performance', description: 'Real-time performance analytics' },
        { name: 'Quality Assurance', path: '/quality', description: 'Platform quality metrics and monitoring' }
      ]
    },
    {
      title: 'Account & Settings',
      icon: Settings,
      pages: [
        { name: 'Account Settings', path: '/account-settings', description: 'Personal account preferences and security' },
        { name: 'Profile Completion', path: '/profile-completion', description: 'Complete professional profile setup' },
        { name: 'Notification Settings', path: '/notifications', description: 'Manage communication preferences' },
        { name: 'Privacy Controls', path: '/privacy', description: 'Data privacy and sharing preferences' },
        { name: 'Theme Preferences', path: '/theme', description: 'Light/dark mode and visual preferences' }
      ]
    },
    {
      title: 'Administration',
      icon: Shield,
      pages: [
        { name: 'Admin Dashboard', path: '/admin/dashboard', description: 'System administration and AI agent management' },
        { name: 'User Management', path: '/admin/users', description: 'Platform user administration' },
        { name: 'Content Moderation', path: '/admin/content', description: 'Content review and quality control' },
        { name: 'System Analytics', path: '/admin/analytics', description: 'Platform-wide analytics and insights' },
        { name: 'AI Agent Control', path: '/admin/agents', description: 'Manage recommendation and routing agents' }
      ]
    },
    {
      title: 'Support & Feedback',
      icon: MessageCircle,
      pages: [
        { name: 'General Feedback', path: '/feedback', description: 'Share platform experience and suggestions' },
        { name: 'Help Center', path: '/help', description: 'Documentation and frequently asked questions' },
        { name: 'Contact Support', path: '/support', description: 'Technical support and customer service' },
        { name: 'Feature Requests', path: '/feature-requests', description: 'Suggest new features and improvements' },
        { name: 'Bug Reports', path: '/bug-reports', description: 'Report technical issues and bugs' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#ea384c] mb-4">Complete Site Map</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Navigate through all pages and features of the GLOHSEN platform. 
            Discover our comprehensive healthcare professional ecosystem with AI-powered features, 
            multi-level marketing system, and advanced analytics.
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#D4AF37]" />
              <span>150+ Features</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#D4AF37]" />
              <span>5 User Types</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#D4AF37]" />
              <span>3 AI Agents</span>
            </div>
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-[#D4AF37]" />
              <span>WCAG Compliant</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteStructure.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className={`rounded-lg border p-6 hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="h-6 w-6 text-[#D4AF37]" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>
                      <Link 
                        to={page.path}
                        className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="font-medium text-[#ea384c] group-hover:text-[#d12e42] transition-colors">
                          {page.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                          {page.description}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ea384c]">13</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Main Sections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ea384c]">80+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ea384c]">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">User Roles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#ea384c]">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Agents</div>
              </div>
            </div>
          </div>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ea384c] to-[#d12e42] text-white rounded-lg hover:from-[#d12e42] hover:to-[#c02838] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
