import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  BookOpen,
  Settings, 
  Bell,
  LogOut,
  Users,
  MessageSquare,
  Award,
  MapPin,
  Mail,
  Phone,
  BarChart3,
  CreditCard,
  Gamepad
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserDisplay } from "../../hooks/useProfile";
import { useAuth } from "../../contexts/AuthContext";

const StudentSidebar = () => {
  const { displayName, userType, avatarUrl, profile } = useUserDisplay();
  const { signOut } = useAuth();

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">
                {getInitials(displayName)}
              </AvatarFallback>
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{displayName}</h3>
              <p className="text-sm text-gray-400">{profile?.specialty || "Medical Student"}</p>
              <p className="text-xs text-gray-500">{"Healthcare Student"}</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-3">
            {profile?.location?.city && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-300">
                  {[profile.location.city, profile.location.state, profile.location.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            )}
            {profile?.contact?.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-300">{profile.contact.email}</p>
              </div>
            )}
            {profile?.contact?.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-300">{profile.contact.phone}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-3 gap-2">
            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/purse-transaction">Purse</Link>
            </Button>
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
          <Link to="/dashboard/student/profile">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <User className="mr-2 h-4 w-4" /> My Profile
            </Button>
          </Link>
          <Link to="/dashboard/student/transactions">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <CreditCard className="mr-2 h-4 w-4" /> Transaction History
            </Button>
          </Link>
          <Link to="/dashboard/student/performance">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BarChart3 className="mr-2 h-4 w-4" /> Performance History
            </Button>
          </Link>
          <Link to="/dashboard/student/inbox">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <MessageSquare className="mr-2 h-4 w-4" /> Inbox/Feedback
            </Button>
          </Link>
        </div>

        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mt-4 mb-2 px-2">Courses</h3>
        <div className="space-y-1">
          <Link to="/courses">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BookOpen className="mr-2 h-4 w-4" /> Enroll in New Course
            </Button>
          </Link>
          <Link to="/dashboard/student/courses">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BookOpen className="mr-2 h-4 w-4" /> Your Courses
            </Button>
          </Link>
          <Link to="/dashboard/student/profile">
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
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
