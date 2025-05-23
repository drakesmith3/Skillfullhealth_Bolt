import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Heart, Trophy, MessageSquare, Calendar, User, Star, LogOut as LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createDustParticles } from "@/utils/dustParticles";

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'community', title: 'New Community Post', message: 'Dr. Sarah shared tips on managing diabetes', time: '1 hour ago', read: false, priority: 'medium' },
    { id: 2, type: 'challenge', title: 'Daily Challenge Available', message: 'Take today\'s nutrition quiz and earn points!', time: '2 hours ago', read: false, priority: 'low' },
    { id: 3, type: 'health', title: 'Weekly Health Tip', message: 'Stay hydrated: 8 glasses of water daily recommended', time: '1 day ago', read: true, priority: 'medium' },
    { id: 4, type: 'achievement', title: 'Achievement Unlocked', message: 'Congratulations! You completed 7-day wellness streak', time: '2 days ago', read: false, priority: 'high' },
    { id: 5, type: 'event', title: 'Upcoming Webinar', message: 'Join "Mental Health Awareness" session tomorrow at 3PM', time: '3 days ago', read: true, priority: 'medium' }
  ]);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const cleanup = createDustParticles(sidebarRef.current);
      return () => cleanup();
    }
  }, [sidebarRef]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'community': return <MessageSquare className="w-5 h-5 text-red-600" />;
      case 'challenge': return <Trophy className="w-5 h-5 text-[#D4AF37]" />;
      case 'health': return <Heart className="w-5 h-5 text-red-600" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-[#D4AF37]" />;
      case 'event': return <Calendar className="w-5 h-5 text-gray-600" />;
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
      {/* Client Sidebar - Consistent GLOHSEN Theme */}
      <div ref={sidebarRef} className="w-64 bg-black text-white relative overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Wellness Hub</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Trophy size={20} />
              <span>HEALTH CHALLENGES</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Heart size={20} />
              <span>HEALTH TRACKER</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Trophy size={20} />
              <span>ACHIEVEMENTS</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">My Dashboard</h3>
          <nav className="space-y-2">
            <div 
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
              onClick={() => navigate('/client-dashboard', { state: { activeTab: 'profile' } })}
            >
              <User size={20} />
              <span>MY PROFILE</span>
            </div>
          </nav>
        </div>

        <div className="p-4">
          <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
          <nav className="space-y-2">
            <Link to="/account-settings/client" className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <User size={20} />
              <span>ACCOUNT SETTINGS</span>
            </Link>
            <Link to="/notifications/client" className="flex items-center space-x-3 p-2 bg-gray-800 text-red-500 rounded cursor-pointer">
              <Bell size={20} />
              <span>NOTIFICATIONS</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Wellness Notifications</h1>
          <p className="text-gray-600">Stay connected with your health journey</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="challenge">Challenges</TabsTrigger>
            <TabsTrigger value="health">Health Tips</TabsTrigger>
            <TabsTrigger value="achievement">Achievements</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
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
          {['community', 'challenge', 'health', 'achievement', 'event'].map(type => (
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

export default ClientNotifications;