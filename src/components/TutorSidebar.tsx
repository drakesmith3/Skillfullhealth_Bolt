import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, GraduationCap, Phone, Mail, Settings, LogOut, Users, PieChart, FileText, BookMarked } from "lucide-react";
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
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarFallback className="bg-[#D4AF37] text-white text-lg">DO</AvatarFallback>
              {tutor.profilePic && <AvatarImage src={tutor.profilePic} alt={tutor.name} />}
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{tutor.name}</h3>
              <p className="text-sm text-gray-600">{tutor.profession}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-lg font-bold text-d4af37">{tutor.coursesCreated}</p>
              <p className="text-xs text-gray-500">Courses</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-lg font-bold text-d4af37">{tutor.totalStudents}</p>
              <p className="text-xs text-gray-500">Students</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-lg font-bold text-d4af37">{tutor.averageRating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">{tutor.institution}</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">{tutor.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">{tutor.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold" asChild>
              <Link to="/TutorWallet">Wallet</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/account-settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-bold mb-4 text-d4af37 border-b pb-2">Tutor Menu</h3>
        <div className="space-y-1">
          <Link to="/tutor-dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/my-courses">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" /> My Courses
            </Button>
          </Link>
          <Link to="/my-students">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> My Students
            </Button>
          </Link>
          <Link to="/create-course">
            <Button variant="ghost" className="w-full justify-start">
              <BookMarked className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </Link>
          <Link to="/course-analytics">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" /> Analytics
            </Button>
          </Link>
          <Link to="/account-settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default TutorSidebar;
