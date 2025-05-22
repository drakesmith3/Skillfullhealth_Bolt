
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Briefcase, 
  CreditCard,
  Settings, 
  Bell,
  LogOut,
  BarChart3,
  FileText,
  MessageSquare,
  Building,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const EmployerSidebar = () => {
  // Mock employer data
  const employer = {
    name: "James Johnson",
    facility: "Lagos General Hospital",
    address: "45 Health Boulevard, Lagos",
    email: "james.johnson@lgh.com",
    phone: "+234 801 234 5678",
    profilePic: "", // Placeholder for profile picture
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">JJ</AvatarFallback>
              {employer.profilePic && <AvatarImage src={employer.profilePic} alt={employer.name} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{employer.name}</h3>
              <p className="text-sm text-gray-400">{employer.facility}</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-300">{employer.address}</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-300">{employer.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-300">{employer.phone}</p>
            </div>
          </div>

          <div className="flex justify-between pt-3 gap-2">
            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/wallet-transaction">Wallet</Link>
            </Button>
            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/account-settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Employer Menu */}
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Employer Menu</h3>
        <div className="space-y-1">
          <Link to="/dashboard/employer">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Building className="mr-2 h-4 w-4" /> Dashboard Overview
            </Button>
          </Link>
          <Link to="/dashboard/employer/vacancies">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Briefcase className="mr-2 h-4 w-4" /> Manage Vacancies
            </Button>
          </Link>
          <Link to="/dashboard/employer/candidates">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <User className="mr-2 h-4 w-4" /> View Your Candidates
            </Button>
          </Link>
          <Link to="/dashboard/employer/criteria-score">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <FileText className="mr-2 h-4 w-4" /> Your Match Criteria
            </Button>
          </Link>
          <Link to="/dashboard/employer/kpi">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <BarChart3 className="mr-2 h-4 w-4" /> KPI Analytics
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

export default EmployerSidebar;
