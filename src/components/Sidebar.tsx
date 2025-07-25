import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Briefcase, MessageSquare, Calendar, Settings, Search, Award, FileText, Bell, ExternalLink, BookOpen, LogOut, CreditCard, Gamepad, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Card3D from "./Card3D";
import { useClickSound } from "../hooks/useClickSound";

const Sidebar = () => {
  const location = useLocation();
  const { playClick } = useClickSound();
  const isProfessional = location.pathname.includes('professional');
  const isTutor = location.pathname.includes('tutor');

  const handleClick = () => {
    playClick();
  };

  return (
    <div className="space-y-4">
      <Card3D 
        title="LOCUM JOB BOARD" 
        value="VIEW JOBS" 
        variant="primary"
        className="bg-primary text-white p-4 text-center text-xl rounded-lg shadow-md"
      />
      
      <Card className="p-4 shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
        <h3 className="font-bold mb-4 text-primary border-b pb-2">Quick Links</h3>        <div className="space-y-2">
          <Link to="/profile" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <User className="mr-2 h-4 w-4" /> My Profile
            </Button>
          </Link>
          <Link to="/dashboard/professional" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" /> My Job Applications
            </Button>
          </Link>
          <Link to="/dashboard/professional" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" /> My Transactions
            </Button>
          </Link>
          <Link to="/messages" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> Inbox/Messages
            </Button>
          </Link>
        </div>
      </Card>
      
      <Card className="p-4 shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
        <h3 className="font-bold mb-4 text-primary border-b pb-2">CME Courses</h3>        <div className="space-y-2">
          <Link to="/courses" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> Enroll in New Course
            </Button>
          </Link>
          <Link to="/games-quizzes" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <Gamepad className="mr-2 h-4 w-4" /> Play Quiz/Games
            </Button>
          </Link>
          <Link to="/profile" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <Award className="mr-2 h-4 w-4" /> My Certifications
            </Button>
          </Link>
        </div>
      </Card>
      
      <Card className="p-4 shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
        <h3 className="font-bold mb-4 text-primary border-b pb-2">GLOHSEN Score</h3>        <Link to="/score" onClick={handleClick}>
          <Button className="w-full button-3d bg-accent text-black hover:bg-accent/90 mb-2">
            View My Score
          </Button>
        </Link>
        <div className="text-xs text-center text-gray-500">
          Your current score: <span className="font-bold text-primary">97</span>/200
        </div>
      </Card>
      
      <Card className="p-4 shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
        <h3 className="font-bold mb-4 text-primary border-b pb-2">Settings</h3>        <div className="space-y-2">
          <Link to="/account-settings" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
          </Link>
          <Link to="/notifications" onClick={handleClick}>
            <Button className="w-full button-3d flex justify-start" variant="outline">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
          </Link>
          {isTutor && (
            <Link to="/tutor-purse" onClick={handleClick}>
              <Button className="w-full button-3d flex justify-start" variant="outline">
                <Heart className="mr-2 h-4 w-4" /> Tutor Purse
              </Button>
            </Link>
          )}
          {isProfessional && (
            <Link to="/purse-transaction" onClick={handleClick}>
              <Button className="w-full button-3d flex justify-start" variant="outline">
                <Heart className="mr-2 h-4 w-4" /> Purse
              </Button>
            </Link>
          )}
          <Link to="/login" onClick={handleClick}>
            <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full button-3d flex justify-start">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
