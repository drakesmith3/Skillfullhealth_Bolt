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

const TutorSidebar: React.FC = () => {
  const location = useLocation();

  // Mock tutor data - in real app, this would come from user context/API
  const tutorData = {
    name: "Dr. Nkechi Okafor",
    currentEmployment: "Glohsen Health University",
    address: "25 Shotade Street, Lagos, Nigeria, 11202",
    workEmail: "nkechi.okafor@glohsen.com",
    phone: "+234 803 123 4567",
    profilePicture: "" // placeholder for profile picture
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
              {tutorData.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
            </AvatarFallback>
            {tutorData.profilePicture && (
              <AvatarImage src={tutorData.profilePicture} alt={tutorData.name} />
            )}
          </Avatar>
          <h3 className="text-red-500 font-bold text-sm mb-1">{tutorData.name}</h3>
          <p className="text-[#D4AF37] text-xs">Content Creator / Tutor</p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Current Employment</p>
              <p className="text-[#D4AF37]">{tutorData.currentEmployment}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Mail className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Work Email</p>
              <p className="text-[#D4AF37] break-all">{tutorData.workEmail}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Phone className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Phone</p>
              <p className="text-[#D4AF37]">{tutorData.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Address</p>
              <p className="text-[#D4AF37]">{tutorData.address}</p>
            </div>
          </div>
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
          <Link 
            to="/signed-out"
            className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
          >
            <LogOut size={20} />
            <span>LOG OUT</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default TutorSidebar;
