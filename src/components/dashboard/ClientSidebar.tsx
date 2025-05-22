
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Gamepad,  
  Phone, 
  Mail,
  Settings, 
  Bell,
  LogOut,
  Users,
  MessageSquare,
  FileText,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const ClientSidebar = () => {
  // Mock client data
  const client = {
    name: "James Miller",
    profession: "Engineer",
    address: "45 Tech Boulevard, Lagos",
    email: "james.miller@example.com",
    phone: "+234 801 987 6543",
    profilePic: "", // Placeholder for profile picture
  };

  return (
    <div className="h-full flex flex-col p-4 text-white">
      <Card className="bg-[#232836] border-gray-700 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-16 w-16 border-2 border-[#D4AF37]">
              <AvatarFallback className="bg-[#D4AF37] text-black text-lg">JM</AvatarFallback>
              {client.profilePic && <AvatarImage src={client.profilePic} alt={client.name} />}
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-lg">{client.name}</h3>
              <p className="text-sm text-gray-400">{client.profession}</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-300">{client.address}</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm">{client.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
              <p className="text-sm">{client.phone}</p>
            </div>
          </div>

          <div className="flex justify-center pt-3">
            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
              <Link to="/account-settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Client Menu */}
      <div className="flex-grow overflow-y-auto">
        <h3 className="text-[#ea384c] font-semibold text-xs uppercase mb-2 px-2">Client Menu</h3>
        <div className="space-y-1">
          <Link to="/dashboard/client/games">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Gamepad className="mr-2 h-4 w-4" /> Games & Quizzes Analytics
            </Button>
          </Link>
          <Link to="/dashboard/client/inbox">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <MessageSquare className="mr-2 h-4 w-4" /> Inbox/Feedback
            </Button>
          </Link>
          <Link to="/games-quizzes">
            <Button variant="ghost" className="w-full justify-start text-[#D4AF37] hover:bg-gray-700 hover:text-[#ea384c]">
              <Gamepad className="mr-2 h-4 w-4" /> Play Games/Quizzes
            </Button>
          </Link>
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

export default ClientSidebar;
