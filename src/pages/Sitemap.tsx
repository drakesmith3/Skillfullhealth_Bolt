
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, User, BookOpen, Briefcase, MessageCircle, Users, Settings, Star, DollarSign } from 'lucide-react';

const Sitemap: React.FC = () => {
  const { theme } = useTheme();

  const siteStructure = [
    {
      title: 'Public Pages',
      icon: Home,
      pages: [
        { name: 'Home', path: '/', description: 'Main landing page with platform overview' },
        { name: 'About Us', path: '/about-us', description: 'Information about GLOHSEN platform' },
        { name: 'Contact Us', path: '/contact-us', description: 'Get in touch with our team' },
        { name: 'Blog', path: '/blog', description: 'Latest healthcare industry insights' },
        { name: 'Sign Up', path: '/signup', description: 'Create a new account' },
        { name: 'Login', path: '/login', description: 'Access your account' }
      ]
    },
    {
      title: 'Community & Learning',
      icon: BookOpen,
      pages: [
        { name: 'Courses', path: '/courses', description: 'Browse available courses and certifications' },
        { name: 'Community Forum', path: '/community-forum', description: 'Connect with healthcare professionals' },
        { name: 'Games & Quizzes', path: '/games-quizzes', description: 'Interactive learning activities' },
        { name: 'Job Board', path: '/job-board', description: 'Find healthcare job opportunities' }
      ]
    },
    {
      title: 'Professional Dashboard',
      icon: User,
      pages: [
        { name: 'Overview', path: '/dashboard/professional', description: 'Professional dashboard overview' },
        { name: 'My Profile', path: '/dashboard/professional', description: 'Manage your professional profile' },
        { name: 'My Courses', path: '/dashboard/professional', description: 'Track your learning progress' },
        { name: 'Jobs History', path: '/dashboard/professional', description: 'View your employment history' },
        { name: 'Transactions', path: '/dashboard/professional', description: 'Financial transaction history' },
        { name: 'Inbox & Feedback', path: '/dashboard/professional', description: 'Messages and feedback from clients' }
      ]
    },
    {
      title: 'Employer Dashboard',
      icon: Briefcase,
      pages: [
        { name: 'Employer Dashboard', path: '/dashboard/employer', description: 'Manage your organization' },
        { name: 'Post Jobs', path: '/dashboard/employer', description: 'Create job postings' },
        { name: 'Find Professionals', path: '/dashboard/employer', description: 'Search for healthcare talent' },
        { name: 'Payment Portal', path: '/employer/payment', description: 'Manage subscription and payments' }
      ]
    },
    {
      title: 'Tutor Dashboard',
      icon: Star,
      pages: [
        { name: 'Tutor Dashboard', path: '/dashboard/tutor', description: 'Manage your teaching activities' },
        { name: 'Create Courses', path: '/dashboard/tutor', description: 'Develop new educational content' },
        { name: 'Student Progress', path: '/dashboard/tutor', description: 'Track student performance' }
      ]
    },
    {
      title: 'Student Dashboard',
      icon: BookOpen,
      pages: [
        { name: 'Student Dashboard', path: '/dashboard/student', description: 'Track your learning journey' },
        { name: 'Enrolled Courses', path: '/dashboard/student', description: 'View your course progress' },
        { name: 'Certificates', path: '/dashboard/student', description: 'Download your achievements' }
      ]
    },
    {
      title: 'Client Dashboard',
      icon: Users,
      pages: [
        { name: 'Client Dashboard', path: '/dashboard/client', description: 'Manage your healthcare needs' },
        { name: 'Find Professionals', path: '/dashboard/client', description: 'Connect with healthcare providers' },
        { name: 'Feedback & Reviews', path: '/dashboard/client', description: 'Rate your experiences' }
      ]
    },
    {
      title: 'Tools & Analytics',
      icon: Settings,
      pages: [
        { name: 'GLOHSEN Score Calculator', path: '/score/calculate', description: 'Calculate your professional score' },
        { name: 'Score Results', path: '/score', description: 'View your GLOHSEN score breakdown' },
        { name: 'KPI Tracking', path: '/kpi-tracking', description: 'Monitor key performance indicators' },
        { name: 'KPI Dashboard', path: '/kpi-dashboard', description: 'Visual analytics dashboard' }
      ]
    },
    {
      title: 'Financial',
      icon: DollarSign,
      pages: [
        { name: 'Professional Wallet', path: '/wallet/professional', description: 'Manage your earnings' },
        { name: 'Tutor Wallet', path: '/wallet/tutor', description: 'Track teaching income' },
        { name: 'Employer Criteria', path: '/employer/criteria', description: 'Set hiring requirements' }
      ]
    },
    {
      title: 'Support & Feedback',
      icon: MessageCircle,
      pages: [
        { name: 'General Feedback', path: '/feedback', description: 'Share your platform experience' },
        { name: 'Account Settings', path: '/account-settings', description: 'Manage your account preferences' },
        { name: 'Profile Completion', path: '/profile-completion', description: 'Complete your profile setup' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#ea384c] mb-4">Site Map</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Navigate through all pages and features of the GLOHSEN platform. 
            Find exactly what you're looking for with our comprehensive site structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className={`rounded-lg border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="h-6 w-6 text-[#D4AF37]" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>
                      <Link 
                        to={page.path}
                        className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium text-[#ea384c] hover:text-[#d12e42]">
                          {page.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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

        <div className="text-center mt-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea384c] text-white rounded-lg hover:bg-[#d12e42] transition-colors"
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
