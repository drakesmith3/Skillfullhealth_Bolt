import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, User, Briefcase, MessageSquare, Award, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { createDustParticles } from "@/utils/dustParticles";

const ProfessionalNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'job', title: 'New Job Opportunity', message: 'ICU Nurse position at Lagos General Hospital', time: '1 hour ago', read: false, priority: 'high' },
    { id: 2, type: 'event', title: 'Upcoming Event', message: 'Webinar on "Advancements in Cardiology"', time: '3 hours ago', read: false, priority: 'medium' },
    { id: 3, type: 'achievement', title: 'GLOHSEN Score Update', message: 'Your GLOHSEN score increased by 5 points', time: '6 hours ago', read: false, priority: 'high' },
    { id: 4, type: 'message', title: 'New Message', message: 'Dr. Adebayo sent you a message', time: '1 day ago', read: true, priority: 'medium' },
    { id: 5, type: 'payment', title: 'Payment Received', message: 'Payment of Q50,000 for locum job completed', time: '2 days ago', read: false, priority: 'low' }
  ]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const { cleanup } = createDustParticles(sidebarRef.current);
      return cleanup;
    }
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'job': return <Briefcase className="w-5 h-5 text-red-600" />;
      case 'event': return <Calendar className="w-5 h-5 text-[#D4AF37]" />;
      case 'achievement': return <Award className="w-5 h-5 text-[#D4AF37]" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-gray-600" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-[#D4AF37]" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Professional Sidebar - Consistent GLOHSEN Theme */}
      <div className="w-64 bg-black text-white relative overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Professional Hub</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Briefcase size={20} />
              <span>JOB BOARD</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <User size={20} />
              <span>MY PROFILE</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Award size={20} />
              <span>GLOHSEN SCORE</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Resources</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Calendar size={20} />
              <span>EVENTS</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <MessageSquare size={20} />
              <span>FORUM</span>
            </div>
          </nav>
        </div>

        <div className="p-4">
          <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
          <nav className="space-y-2">
            <Link 
              to="/professional-dashboard"
              state={{ activeTab: 'profile' }}
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
            >
              <User size={20} />
              <span>MY PROFILE</span>
            </Link>
            <Link 
              to="/account-settings/professional"
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
            >
              <User size={20} />
              <span>ACCOUNT SETTINGS</span>
            </Link>
            <div className="flex items-center space-x-3 p-2 bg-gray-800 text-red-500 rounded cursor-pointer">
              <Bell size={20} />
              <span>NOTIFICATIONS</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Professional Notifications</h1>
          <p className="text-gray-600">Stay updated on job opportunities and career advancements</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="job">Jobs</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="achievement">Achievements</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-red-500 bg-red-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Filter by type tabs */}
          {['job', 'event', 'achievement', 'message', 'payment'].map(type => (
            <TabsContent key={type} value={type} className="space-y-4">
              {notifications.filter(n => n.type === type).map((notification) => (
                <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-red-500 bg-red-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalNotifications;

