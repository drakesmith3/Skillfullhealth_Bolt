
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
  Award,
  Gamepad,
  Settings, 
  Bell,
  Heart,
  LogOut,
  Users 
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfessionalSidebar = () => {
  // Mock professional data
  const professional = {
    name: "Oredola Adeola",
    profession: "Midwife | Registered Nurse",
    profilePic: "", // Placeholder for profile picture
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">OA</AvatarFallback>
              {professional.profilePic && <AvatarImage src={professional.profilePic} alt={professional.name} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{professional.name}</h3>
              <p className="text-sm text-gray-400">{professional.profession}</p>
            </div>
          </div>
          
          <div className="flex justify-center pt-3">
            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/account-settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Quick Links */}
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Quick Links</h3>
        <div className="space-y-1">
          <Link to="/dashboard/professional/profile">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <User className="mr-2 h-4 w-4" /> My Profile
            </Button>
          </Link>
          <Link to="/dashboard/professional/jobs-history">
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

        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mt-4 mb-2 px-2">CME Courses</h3>
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
          <Link to="/dashboard/professional/profile">
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

        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mt-4 mb-2 px-2">Other Links</h3>
        <div className="space-y-1">
          <Link to="/score">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Award className="mr-2 h-4 w-4" /> GLOHSEN Score
            </Button>
          </Link>
          <Link to="/community">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Users className="mr-2 h-4 w-4" /> Community Forum
            </Button>
          </Link>
          <Link to="/job-board">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Briefcase className="mr-2 h-4 w-4" /> Job Board
            </Button>
          </Link>
        </div>

        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mt-4 mb-2 px-2">Settings</h3>
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
          <Link to="/wallet-transaction">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Heart className="mr-2 h-4 w-4" /> Wallet
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSidebar;
