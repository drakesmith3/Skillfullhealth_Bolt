
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, MessageSquare, Trophy, Calendar, Star, CreditCard, User } from "lucide-react";
import { Link } from "react-router-dom";
import StandardDashboardLayout from "@/components/dashboard/StandardDashboardLayout";

const ClientSidebarContent = () => (
  <>
    <div className="p-4 border-b border-gray-700">
      <h3 className="text-red-500 font-semibold mb-4">Client Menu</h3>
      <nav className="space-y-2">
        <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
          <Calendar size={20} />
          <span>MY APPOINTMENTS</span>
        </div>
        <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
          <MessageSquare size={20} />
          <span>MESSAGES</span>
        </div>
        <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
          <Star size={20} />
          <span>MY FEEDBACK</span>
        </div>
      </nav>
    </div>

    <div className="p-4 border-b border-gray-700">
      <h3 className="text-red-500 font-semibold mb-4">Resources</h3>
      <nav className="space-y-2">
        <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
          <Calendar size={20} />
          <span>HEALTH TRACKER</span>
        </div>
        <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
          <MessageSquare size={20} />
          <span>WELLNESS TIPS</span>
        </div>
      </nav>
    </div>

    <div className="p-4">
      <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
      <nav className="space-y-2">
        <Link 
          to="/client-dashboard"
          state={{ activeTab: 'profile' }}
          className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
        >
          <User size={20} />
          <span>MY PROFILE</span>
        </Link>
        <Link 
          to="/account-settings/client"
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
  </>
);

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'message', title: 'New Message Received', message: 'You have a new message from Dr. Smith regarding your appointment.', time: '30 minutes ago', read: false, priority: 'high' },
    { id: 2, type: 'appointment', title: 'Appointment Reminder', message: 'Reminder: Your appointment with Dr. Johnson is scheduled for tomorrow at 10:00 AM.', time: '1 hour ago', read: false, priority: 'medium' },
    { id: 3, type: 'feedback', title: 'Feedback Request', message: 'Please provide feedback on your recent consultation with Dr. Williams.', time: '1 day ago', read: true, priority: 'medium' },
    { id: 4, type: 'achievement', title: 'Milestone Reached', message: 'Congratulations! You have completed 5 consultations this month.', time: '2 days ago', read: true, priority: 'low' },
    { id: 5, type: 'payment', title: 'Payment Confirmation', message: 'Your payment of $50 for the consultation has been successfully processed.', time: '3 days ago', read: true, priority: 'high' }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5 text-red-600" />;
      case 'appointment': return <Calendar className="w-5 h-5 text-[#D4AF37]" />;
      case 'feedback': return <Star className="w-5 h-5 text-gray-600" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-[#D4AF37]" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <StandardDashboardLayout
      sidebar={<ClientSidebarContent />}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Client Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">Stay updated with your healthcare journey</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6 bg-white dark:bg-gray-800 shadow-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">All</TabsTrigger>
            <TabsTrigger value="message" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Messages</TabsTrigger>
            <TabsTrigger value="appointment" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Appointments</TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Feedback</TabsTrigger>
            <TabsTrigger value="achievement" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-lg bg-white dark:bg-gray-800 shadow-lg border-0 ${!notification.read ? 'border-l-4 border-l-red-500' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium text-gray-900 dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Filter by type tabs */}
          {['message', 'appointment', 'feedback', 'achievement'].map(type => (
            <TabsContent key={type} value={type} className="space-y-4">
              {notifications.filter(n => n.type === type).map((notification) => (
                <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-lg bg-white dark:bg-gray-800 shadow-lg border-0 ${!notification.read ? 'border-l-4 border-l-red-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium text-gray-900 dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                        >
                          Mark as Read
                        </Button>
                      )}
                      <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default ClientNotifications;
