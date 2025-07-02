import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  BarChart, 
  PlusCircle, 
  MessageSquare, 
  Star, 
  Settings, 
  Bell, 
  LogOut,
  GraduationCap,
  FileText,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Edit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserDisplay } from "../../hooks/useProfile";
import { useAuth } from "../../contexts/AuthContext";

const TutorSidebar: React.FC = () => {
  const location = useLocation();
  const { displayName, userType, avatarUrl, profile } = useUserDisplay();
  const { signOut } = useAuth();

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    return `flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
      isActive(path) 
        ? 'bg-gray-800 text-red-500' 
        : 'text-[#D4AF37] hover:text-red-500 hover:bg-gray-800'
    }`;
  };
  return (
    <>
      {/* Tutor Profile Summary */}
      <div className="p-4 border-b border-gray-700">
        <div className="text-center mb-4">
          <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-[#D4AF37]">
            <AvatarFallback className="bg-[#D4AF37] text-black text-lg font-semibold">
              {getInitials(displayName)}
            </AvatarFallback>
            {avatarUrl && (
              <AvatarImage src={avatarUrl} alt={displayName} />
            )}
          </Avatar>
          <h3 className="text-red-500 font-bold text-sm mb-1">{displayName}</h3>
          <p className="text-[#D4AF37] text-xs">{profile?.specialty || "Content Creator / Tutor"}</p>
        </div>

        <div className="space-y-2 text-xs">
          {profile?.bio && (
            <div className="flex items-start gap-2">
              <GraduationCap className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs">Bio</p>
                <p className="text-[#D4AF37]">{profile.bio}</p>
              </div>
            </div>
          )}
          
          {profile?.contact?.email && (
            <div className="flex items-start gap-2">
              <Mail className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="text-[#D4AF37] break-all">{profile.contact.email}</p>
              </div>
            </div>
          )}
          
          {profile?.contact?.phone && (
            <div className="flex items-start gap-2">
              <Phone className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="text-[#D4AF37]">{profile.contact.phone}</p>
              </div>
            </div>
          )}
          
          {profile?.location?.city && (
            <div className="flex items-start gap-2">
              <MapPin className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs">Location</p>
                <p className="text-[#D4AF37]">
                  {[profile.location.city, profile.location.state, profile.location.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link 
            to="/tutor-dashboard/purse"
            className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-800 text-[#D4AF37] hover:text-red-500 hover:bg-gray-700 transition-colors"
          >
            <CreditCard className="h-3 w-3" />
            Purse
          </Link>
          <Link 
            to="/account-settings/tutor"
            className="flex-1"
          >
            <Button size="sm" variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Edit Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Teaching Dashboard</h3>
        <nav className="space-y-2">
          <Link 
            to="/tutor-dashboard"
            className={getLinkClass('/tutor-dashboard')}
          >
            <BarChart size={20} />
            <span>DASHBOARD</span>
          </Link>
          <Link 
            to="/my-courses"
            className={getLinkClass('/my-courses')}
          >
            <BookOpen size={20} />
            <span>MY COURSES</span>
          </Link>
          <Link 
            to="/my-students"
            className={getLinkClass('/my-students')}
          >
            <Users size={20} />
            <span>MY STUDENTS</span>
          </Link>
          <Link 
            to="/teaching-schedule"
            className={getLinkClass('/teaching-schedule')}
          >
            <Calendar size={20} />
            <span>SCHEDULE</span>
          </Link>
        </nav>
      </div>

      {/* Course Management Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Course Management</h3>
        <nav className="space-y-2">
          <Link 
            to="/create-course"
            className={getLinkClass('/create-course')}
          >
            <PlusCircle size={20} />
            <span>CREATE COURSE</span>
          </Link>
          <Link 
            to="/course-content"
            className={getLinkClass('/course-content')}
          >
            <FileText size={20} />
            <span>MANAGE CONTENT</span>
          </Link>
          <Link 
            to="/course-analytics"
            className={getLinkClass('/course-analytics')}
          >
            <BarChart size={20} />
            <span>COURSE ANALYTICS</span>
          </Link>
          <Link 
            to="/student-progress"
            className={getLinkClass('/student-progress')}
          >
            <GraduationCap size={20} />
            <span>STUDENT PROGRESS</span>
          </Link>
        </nav>
      </div>

      {/* Earnings Section */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">Earnings</h3>
        <nav className="space-y-2">
          <Link 
            to="/tutor-purse"
            className={getLinkClass('/tutor-purse')}
          >
            <CreditCard size={20} />
            <span>PURSE</span>
          </Link>
          <Link 
            to="/earnings-analytics"
            className={getLinkClass('/earnings-analytics')}
          >
            <BarChart size={20} />
            <span>EARNINGS REPORT</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">Settings</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/tutor"
            className={getLinkClass('/account-settings/tutor')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/tutor"
            className={getLinkClass('/notifications/tutor')}
          >
            <Bell size={20} />
            <span>NOTIFICATIONS</span>
          </Link>
          <Link 
            to="/messages"
            className={getLinkClass('/messages')}
          >
            <MessageSquare size={20} />
            <span>MESSAGES</span>
          </Link>
          <Link 
            to="/tutor-feedback"
            className={getLinkClass('/tutor-feedback')}
          >
            <Star size={20} />
            <span>FEEDBACK</span>
          </Link>
          <button 
            onClick={signOut}
            className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <span>LOG OUT</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default TutorSidebar;
