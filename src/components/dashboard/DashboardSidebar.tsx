
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  User, 
  Briefcase, 
  CreditCard, 
  MessageSquare, 
  BookOpen, 
  Gamepad, 
  Award, 
  Settings, 
  Bell, 
  LogOut, 
  TrendingUp 
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => (
  <Link 
    to={to} 
    className="flex items-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
  >
    <span className="mr-3 text-[#D4AF37]">{icon}</span>
    {children}
  </Link>
);

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="px-4 mb-2 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">{title}</h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

interface DashboardSidebarProps {
  userType: 'professional' | 'student' | 'employer' | 'tutor' | 'client';
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userType }) => {
  const dashPath = `/dashboard/${userType}`;
  
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-center font-semibold">
            {userType === 'professional' && 'Dr. Olusiji'}
            {userType === 'student' && 'Sarah Johnson'}
            {userType === 'employer' && 'Hospital Corp.'}
            {userType === 'tutor' && 'Dr. Nkechi'}
            {userType === 'client' && 'James Miller'}
          </h2>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {userType === 'professional' && 'Medical Doctor'}
            {userType === 'student' && 'Medical Student'}
            {userType === 'employer' && 'Healthcare Provider'}
            {userType === 'tutor' && 'Medicine Professor'}
            {userType === 'client' && 'Patient'}
          </p>
        </div>

        {/* Quick Links Section */}
        <SidebarSection title="Quick Links">
          <SidebarLink to={`${dashPath}/profile`} icon={<User size={18} />}>
            My Profile
          </SidebarLink>
          <SidebarLink to={`${dashPath}/jobs`} icon={<Briefcase size={18} />}>
            My Job Applications
          </SidebarLink>
          <SidebarLink to={`${dashPath}/transactions`} icon={<CreditCard size={18} />}>
            My Transactions
          </SidebarLink>
          <SidebarLink to={`${dashPath}/inbox`} icon={<MessageSquare size={18} />}>
            Inbox/Messages
          </SidebarLink>
        </SidebarSection>

        {/* CME Courses Section */}
        {(userType === 'professional' || userType === 'student' || userType === 'tutor') && (
          <SidebarSection title="CME Courses">
            <SidebarLink to="/courses" icon={<BookOpen size={18} />}>
              Enroll in New Course
            </SidebarLink>
            <SidebarLink to="/games" icon={<Gamepad size={18} />}>
              Play Quiz/Games
            </SidebarLink>
            <SidebarLink to={`${dashPath}/profile#certifications`} icon={<Award size={18} />}>
              My Certifications
            </SidebarLink>
          </SidebarSection>
        )}

        {/* GLOHSEN Score Section - Not for students */}
        {userType !== 'student' && (
          <SidebarSection title="GLOHSEN Score">
            <SidebarLink to="/glohsen-score" icon={<TrendingUp size={18} />}>
              View My Score
            </SidebarLink>
          </SidebarSection>
        )}

        {/* Settings Section */}
        <SidebarSection title="Settings">
          <SidebarLink to="/account-settings" icon={<Settings size={18} />}>
            Account Settings
          </SidebarLink>
          <SidebarLink to={`${dashPath}/notifications`} icon={<Bell size={18} />}>
            Notifications
          </SidebarLink>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </SidebarSection>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
