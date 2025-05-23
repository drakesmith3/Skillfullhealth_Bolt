
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';

const Sitemap: React.FC = () => {
  const siteStructure = [
    {
      category: "Main Pages",
      pages: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Services", path: "/services" },
        { name: "Success Stories", path: "/success-stories" }
      ]
    },
    {
      category: "Authentication",
      pages: [
        { name: "Sign In", path: "/signin" },
        { name: "Sign Up", path: "/signup" },
        { name: "Forgot Password", path: "/forgot-password" }
      ]
    },
    {
      category: "Professional Dashboard",
      pages: [
        { name: "Professional Dashboard", path: "/professional-dashboard" },
        { name: "Professional Account Settings", path: "/account-settings/professional" },
        { name: "Professional Notifications", path: "/notifications/professional" },
        { name: "GLOHSEN Score", path: "/glohsen-score" },
        { name: "KPI Dashboard", path: "/kpi-dashboard" }
      ]
    },
    {
      category: "Employer Dashboard",
      pages: [
        { name: "Employer Dashboard", path: "/employer-dashboard" },
        { name: "Employer Account Settings", path: "/account-settings/employer" },
        { name: "Employer Notifications", path: "/notifications/employer" },
        { name: "Employer Criteria", path: "/employer-criteria" }
      ]
    },
    {
      category: "Student Dashboard",
      pages: [
        { name: "Student Dashboard", path: "/student-dashboard" },
        { name: "Student Account Settings", path: "/account-settings/student" },
        { name: "Student Notifications", path: "/notifications/student" }
      ]
    },
    {
      category: "Tutor Dashboard",
      pages: [
        { name: "Tutor Dashboard", path: "/tutor-dashboard" },
        { name: "Tutor Account Settings", path: "/account-settings/tutor" },
        { name: "Tutor Notifications", path: "/notifications/tutor" }
      ]
    },
    {
      category: "Client Dashboard",
      pages: [
        { name: "Client Dashboard", path: "/client-dashboard" },
        { name: "Client Account Settings", path: "/account-settings/client" },
        { name: "Client Notifications", path: "/notifications/client" }
      ]
    },
    {
      category: "Learning & Development",
      pages: [
        { name: "Courses", path: "/courses" },
        { name: "Medical Quizzes & Games", path: "/medical-quizzes-games" },
        { name: "Community Forum", path: "/community-forum" }
      ]
    },
    {
      category: "Job Board",
      pages: [
        { name: "Job Board", path: "/job-board" },
        { name: "Post a Job", path: "/post-job" }
      ]
    },
    {
      category: "Admin",
      pages: [
        { name: "Admin Dashboard", path: "/admin" },
        { name: "General Feedback", path: "/general-feedback" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="sitemap" />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Site Map
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Navigate through all sections of the GLOHSEN platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteStructure.map((section, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-red-500 to-[#D4AF37] text-white">
                  <CardTitle className="text-lg font-semibold">
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {section.pages.map((page, pageIndex) => (
                      <li key={pageIndex}>
                        <Link
                          to={page.path}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
                        >
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Need Help Finding Something?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Can't find what you're looking for? Contact our support team for assistance.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors"
              >
                Contact Support
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <Footer isActive={false} />
    </div>
  );
};

export default Sitemap;
