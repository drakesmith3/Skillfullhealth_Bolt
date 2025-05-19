
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, MapPin, Phone, Mail, Briefcase, Settings, LogOut, Users, PieChart, FileText } from "lucide-react";
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
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarFallback className="bg-[#D4AF37] text-white text-lg">SM</AvatarFallback>
              {employer.logo && <AvatarImage src={employer.logo} alt={employer.name} />}
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{employer.name}</h3>
              <p className="text-sm text-gray-600">Healthcare Facility</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">HR Representative</h4>
            <p className="text-sm">{employer.repName}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">{employer.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">{employer.phone}</p>
            </div>
            <div className="flex items-start gap-2">
              <Building className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">HQ: {employer.address}</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <p className="text-sm">Facility: {employer.facilityAddress}</p>
            </div>
          </div>

          <Button size="sm" variant="outline" className="w-full" asChild>
            <Link to="/account-settings">
              Edit Profile
            </Link>
          </Button>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-bold mb-4 text-d4af37 border-b pb-2">Employer Menu</h3>
        <div className="space-y-1">
          <Link to="/employer-dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/employer-jobs">
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" /> Manage Jobs
            </Button>
          </Link>
          <Link to="/employer-candidates">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> View Candidates
            </Button>
          </Link>
          <Link to="/employer-criteria">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" /> Match Criteria
            </Button>
          </Link>
          <Link to="/employer-kpi">
            <Button variant="ghost" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" /> KPI Dashboard
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

export default EmployerSidebar;
