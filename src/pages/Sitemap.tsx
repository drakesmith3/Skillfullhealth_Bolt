import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout'; // Assuming a common layout

const Sitemap: React.FC = () => {
  // Define sitemap structure - adjust links and names as per your actual routes and pages
  const sitemapSections = [
    {
      title: 'Main Navigation',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Sign Up', path: '/signup' },
        { name: 'Login', path: '/login' },
        { name: 'Blog', path: '/blog' },
        { name: 'Community Forum', path: '/community-forum' },
        { name: 'Job Board', path: '/job-board' },
        { name: 'Courses', path: '/courses' },
        { name: 'Games & Quizzes', path: '/games-quizzes' },
      ],
    },
    {
      title: 'User Dashboards',
      links: [
        { name: 'Professional Dashboard', path: '/dashboard/professional' },
        { name: 'Student Dashboard', path: '/dashboard/student' },
        { name: 'Tutor Dashboard', path: '/dashboard/tutor' },
        { name: 'Employer Dashboard', path: '/dashboard/employer' },
        { name: 'Client Dashboard', path: '/dashboard/client' },
      ],
    },
    {
      title: 'GLOHSEN Score',
      links: [
        { name: 'Score Calculator', path: '/score/calculate' },
        { name: 'Score Results', path: '/score/details' },
      ],
    },
    {
      title: 'Legal & Information',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
        { name: 'Cookie Policy', path: '/cookies-policy' },
        { name: 'Cookie Settings', path: '/cookie-settings' },
        { name: 'Accessibility Statement', path: '/accessibility' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Help Center', path: '/help' }, // Assuming /help is your help center
      ],
    },
    // Add more sections and links as needed
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Sitemap</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400 border-b pb-2 border-gray-300 dark:border-gray-700">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
                Can't find what you're looking for? <Link to="/contact-us" className="text-red-600 hover:underline">Contact us</Link>.
            </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sitemap;
