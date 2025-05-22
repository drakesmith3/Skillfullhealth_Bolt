
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, MapPin, Phone, Mail, Briefcase, Settings, LogOut, Users, PieChart, FileText, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const EmployerSidebar = () => {
  // Mock employer data
  const employer = {
    name: "St. Mary's Hospital",
    repName: "Jane Smith",
    email: "recruiting@stmarys.org",
    phone: "+1 (555) 234-5678",
    address: "123 Medical Center Dr, Boston, MA 02115",
    facilityAddress: "Same as HQ",
    logo: "", // Placeholder for logo
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">SM</AvatarFallback>
              {employer.logo && <AvatarImage src={employer.logo} alt={employer.name} />}
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{employer.name}</h3>
              <p className="text-sm text-gray-400">Healthcare Facility</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-[#ea384c]">HR Representative</h4>
              <p className="text-sm">{employer.repName}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm">{employer.email}</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm">{employer.phone}</p>
              </div>
              <div className="flex items-start gap-2">
                <Building className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-300">HQ: {employer.address}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-300">Facility: {employer.facilityAddress}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1 bg-[#D4AF37] text-black hover:bg-[#C09C30]" asChild>
                <Link to="/dashboard/employer/transactions">Wallet</Link>
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
                <Link to="/account-settings">Edit Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Employer Menu */}
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Employer Menu</h3>
        <div className="space-y-1">
          <Link to="/dashboard/employer">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <PieChart className="mr-2 h-4 w-4" /> Dashboard Overview
            </Button>
          </Link>
          <Link to="/dashboard/employer/jobs">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Briefcase className="mr-2 h-4 w-4" /> Manage Vacancies
            </Button>
          </Link>
          <Link to="/dashboard/employer/candidates">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Users className="mr-2 h-4 w-4" /> View Your Candidates
            </Button>
          </Link>
          <Link to="/dashboard/employer/criteria">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <FileText className="mr-2 h-4 w-4" /> Your Match Criteria
            </Button>
          </Link>
          <Link to="/dashboard/employer/kpi">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <PieChart className="mr-2 h-4 w-4" /> KPI Analytics
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
