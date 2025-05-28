
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Briefcase, 
  MessageSquare, 
  BarChart, 
  Star, 
  Settings, 
  Bell, 
  LogOut,
  UserPlus,
  FileText,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Edit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const EmployerSidebar: React.FC = () => {
  const location = useLocation();

  // Mock employer data - in real app, this would come from user context/API
  const employerData = {
    facilityName: "St. Mary's Medical Center",
    hrRepName: "Jane Smith",
    email: "jane.smith@stmarys.com",
    phone: "+1 (555) 234-5678",
    companyHQ: "123 Healthcare Plaza, Boston, MA 02115",
    facilityLocation: "456 Medical Center Dr, Boston, MA 02118",
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
      {/* Facility Profile Summary */}
      <div className="p-4 border-b border-gray-700">
        <div className="text-center mb-4">
          <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-[#D4AF37]">
            <AvatarFallback className="bg-[#D4AF37] text-black text-lg font-semibold">
              {employerData.facilityName.split(' ').map(word => word[0]).join('').substring(0, 2)}
            </AvatarFallback>
            {employerData.profilePicture && (
              <AvatarImage src={employerData.profilePicture} alt={employerData.facilityName} />
            )}
          </Avatar>
          <h3 className="text-red-500 font-bold text-sm mb-1">{employerData.facilityName}</h3>
          <p className="text-[#D4AF37] text-xs">Healthcare Facility</p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <User className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">HR Representative</p>
              <p className="text-[#D4AF37]">{employerData.hrRepName}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Mail className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <p className="text-[#D4AF37] break-all">{employerData.email}</p>
          </div>
          
          <div className="flex items-start gap-2">
            <Phone className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <p className="text-[#D4AF37]">{employerData.phone}</p>
          </div>
          
          <div className="flex items-start gap-2">
            <Building className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Company HQ</p>
              <p className="text-[#D4AF37]">{employerData.companyHQ}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-xs">Facility Location</p>
              <p className="text-[#D4AF37]">{employerData.facilityLocation}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link 
            to="/employer-dashboard"
            state={{ activeTab: 'transactions' }}
            className="flex-1"
          >
            <Button size="sm" className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black text-xs">
              <Wallet className="h-3 w-3 mr-1" />
              Wallet
            </Button>
          </Link>
          <Link 
            to="/account-settings/employer"
            className="flex-1"
          >
            <Button size="sm" variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>      {/* Employer Menu */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-red-500 font-semibold mb-4">EMPLOYER MENU</h3>        <nav className="space-y-2">
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'overview' }}
            className={getLinkClass('/dashboard/employer')}
          >
            <BarChart size={20} />
            <span>DASHBOARD OVERVIEW</span>
          </Link>
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'candidates' }}
            className={getLinkClass('/manage-vacancies')}
          >
            <Briefcase size={20} />
            <span>MANAGE VACANCIES</span>
          </Link>
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'candidates' }}
            className={getLinkClass('/view-candidates')}
          >
            <Users size={20} />
            <span>VIEW YOUR CANDIDATES</span>
          </Link>
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'criteria' }}
            className={getLinkClass('/match-criteria')}
          >
            <Star size={20} />
            <span>YOUR MATCH CRITERIA</span>
          </Link>          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'kpi' }}
            className={getLinkClass('/kpi-analytics')}
          >
            <BarChart size={20} />
            <span>KPI ANALYTICS</span>
          </Link>
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'transactions' }}
            className={getLinkClass('/transactions-history')}
          >
            <CreditCard size={20} />
            <span>TRANSACTIONS HISTORY</span>
          </Link>
          <Link 
            to="/dashboard/employer"
            state={{ activeTab: 'inbox' }}
            className={getLinkClass('/inbox-feedback')}
          >
            <MessageSquare size={20} />
            <span>INBOX & FEEDBACK</span>
          </Link>
        </nav>
      </div>

      {/* Settings Section */}
      <div className="p-4">
        <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
        <nav className="space-y-2">
          <Link 
            to="/account-settings/employer"
            className={getLinkClass('/account-settings/employer')}
          >
            <Settings size={20} />
            <span>ACCOUNT SETTINGS</span>
          </Link>
          <Link 
            to="/notifications/employer"
            className={getLinkClass('/notifications/employer')}
          >
            <Bell size={20} />
            <span>NOTIFICATIONS</span>
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

export default EmployerSidebar;
