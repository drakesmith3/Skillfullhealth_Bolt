
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle, MessageSquare, Calendar, Settings, Trash2 } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const location = useLocation();
  const userType = location.pathname.split('/')[2] || 'professional';
  const [activeTab, setActiveTab] = useState("all");

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'system',
      title: 'Profile Review Complete',
      message: 'Your professional profile has been reviewed and approved.',
      date: '2025-05-20T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Dr. Smith',
      message: 'Hello, I would like to discuss a potential collaboration opportunity.',
      date: '2025-05-19T16:45:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'event',
      title: 'Upcoming Webinar Reminder',
      message: 'The "Healthcare Innovation" webinar starts in 24 hours.',
      date: '2025-05-19T09:15:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'system',
      title: 'Certificate Expiration',
      message: 'Your Medical License certificate will expire in 30 days.',
      date: '2025-05-18T14:20:00',
      read: true,
      priority: 'high'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notif => notif.type === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage={`${userType} notifications`} userName={userType === 'employer' ? 'Hospital Corp.' : 'Dr. Olusiji'} />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Stay updated with your latest activities and alerts
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Mark All as Read
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Notification Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" /> All
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" /> System
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" /> Messages
            </TabsTrigger>
            <TabsTrigger value="event" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`transition-all hover:shadow-md ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700'}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center">
                    {getNotificationIcon(notification.type)}
                    <CardTitle className="ml-2 text-lg">{notification.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <div>{getPriorityBadge(notification.priority)}</div>
                    <div className="flex gap-2">
                      {notification.read ? (
                        <Button variant="ghost" size="sm" className="text-xs">
                          Mark as Unread
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs">
                          Mark as Read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-500 text-xs">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-10">
                <Bell className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
                <p className="text-gray-500 dark:text-gray-400">You don't have any {activeTab !== 'all' ? activeTab : ''} notifications at the moment.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default NotificationsPage;
