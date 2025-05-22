
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, GraduationCap, Phone, Mail, Settings, LogOut, Users, PieChart, FileText, BookMarked, Bell, Gamepad } from "lucide-react";
import { Link } from "react-router-dom";

const TutorSidebar = () => {
  // Mock tutor data
  const tutor = {
    name: "Dr. Olawumi",
    profession: "Hematology Professor",
    institution: "University Medical Center",
    email: "olawumi.prof@med.edu",
    phone: "+1 (555) 123-4567",
    profilePic: "", // Placeholder for profile picture
    coursesCreated: 7,
    totalStudents: 842,
    averageRating: 4.8,
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">DO</AvatarFallback>
              {tutor.profilePic && <AvatarImage src={tutor.profilePic} alt={tutor.name} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{tutor.name}</h3>
              <p className="text-sm text-gray-400">{tutor.profession}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center mt-3">
            <div className="bg-gray-800 p-2 rounded">
              <p className="text-lg font-bold text-[#D4AF37]">{tutor.coursesCreated}</p>
              <p className="text-xs text-gray-400">Courses</p>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <p className="text-lg font-bold text-[#D4AF37]">{tutor.totalStudents}</p>
              <p className="text-xs text-gray-400">Students</p>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <p className="text-lg font-bold text-[#D4AF37]">{tutor.averageRating}</p>
              <p className="text-xs text-gray-400">Rating</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-3">
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm">{tutor.institution}</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm">{tutor.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm">{tutor.phone}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <Button size="sm" className="flex-1 bg-[#D4AF37] text-black hover:bg-[#C09C30]" asChild>
              <Link to="/dashboard/tutor/transactions">Wallet</Link>
            </Button>
            <Button size="sm" variant="outline" className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/account-settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Tutor Menu */}
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Tutor Menu</h3>
        <div className="space-y-1">
          <Link to="/dashboard/tutor">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <PieChart className="mr-2 h-4 w-4" /> Dashboard Overview
            </Button>
          </Link>
          <Link to="/dashboard/tutor/courses">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BookOpen className="mr-2 h-4 w-4" /> Manage Courses
            </Button>
          </Link>
          <Link to="/dashboard/tutor/students">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Users className="mr-2 h-4 w-4" /> View Your Students
            </Button>
          </Link>
          <Link to="/dashboard/tutor/create-course">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BookMarked className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </Link>
          <Link to="/dashboard/tutor/create-game">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Gamepad className="mr-2 h-4 w-4" /> Create Game/Quiz
            </Button>
          </Link>
        </div>

        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mt-4 mb-2 px-2">Community</h3>
        <div className="space-y-1">
          <Link to="/community">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Users className="mr-2 h-4 w-4" /> Community Forum
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
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorSidebar;
