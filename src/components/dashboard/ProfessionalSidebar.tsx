
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Briefcase, 
  CreditCard, 
  MessageSquare, 
  BookOpen, 
  Gamepad, 
  Award, 
  Settings, 
  TrendingUp,
  Users,
  FileText,
  Bell,
  LogOut 
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfessionalSidebar = () => {
  // Mock professional data
  const professional = {
    name: "Dr. Olusiji",
    profession: "Medical Doctor",
    email: "olusiji@example.com",
    phone: "+1 (555) 123-4567",
    profilePic: "", // Placeholder for profile picture
    glohsenScore: 97,
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      {/* User Profile Card */}
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">DO</AvatarFallback>
              {professional.profilePic && <AvatarImage src={professional.profilePic} alt={professional.name} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{professional.name}</h3>
              <p className="text-sm text-gray-400">{professional.profession}</p>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">GLOHSEN Score</span>
                <span className="text-sm text-[#D4AF37] font-bold">{professional.glohsenScore}/200</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-[#D4AF37] h-1.5 rounded-full" 
                  style={{ width: `${(professional.glohsenScore / 200) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/profile">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Navigation Sections */}
      <div className="flex-grow flex flex-col space-y-4 overflow-y-auto">
        {/* Quick Links Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Quick Links</h3>
          <div className="space-y-1">
            <Link to="/dashboard/professional/profile">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <User className="mr-2 h-4 w-4" /> My Profile
              </Button>
            </Link>
            <Link to="/dashboard/professional/jobs">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <Briefcase className="mr-2 h-4 w-4" /> My Jobs History
              </Button>
            </Link>
            <Link to="/dashboard/professional/transactions">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <CreditCard className="mr-2 h-4 w-4" /> Transactions History
              </Button>
            </Link>
            <Link to="/dashboard/professional/inbox">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <MessageSquare className="mr-2 h-4 w-4" /> Inbox/Feedback
              </Button>
            </Link>
          </div>
        </div>
        
        {/* CME Courses Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">CME Courses</h3>
          <div className="space-y-1">
            <Link to="/courses">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <BookOpen className="mr-2 h-4 w-4" /> Enroll in New Course
              </Button>
            </Link>
            <Link to="/dashboard/professional/courses">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <BookOpen className="mr-2 h-4 w-4" /> Your Courses
              </Button>
            </Link>
            <Link to="/dashboard/professional/profile#certifications">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <Award className="mr-2 h-4 w-4" /> My Certifications
              </Button>
            </Link>
            <Link to="/games-quizzes">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <Gamepad className="mr-2 h-4 w-4" /> Play Games/Quizzes
              </Button>
            </Link>
          </div>
        </div>
        
        {/* GLOHSEN Score Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">GLOHSEN Score</h3>
          <Link to="/glohsen-score">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <TrendingUp className="mr-2 h-4 w-4" /> View My Score
            </Button>
          </Link>
        </div>
        
        {/* Community Forum Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Community</h3>
          <Link to="/community">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Users className="mr-2 h-4 w-4" /> Community Forum
            </Button>
          </Link>
        </div>

        {/* Job Board Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Jobs</h3>
          <Link to="/jobs">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Briefcase className="mr-2 h-4 w-4" /> Job Board
            </Button>
          </Link>
        </div>
        
        {/* Settings Section */}
        <div>
          <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Settings</h3>
          <div className="space-y-1">
            <Link to="/account-settings">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <Settings className="mr-2 h-4 w-4" /> Account Settings
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSidebar;
