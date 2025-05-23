import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BookOpen, GraduationCap, Calendar, MessageSquare, Award } from "lucide-react";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'course', title: 'New Course Available', message: 'Advanced Pathophysiology course now available for enrollment', time: '2 hours ago', read: false, priority: 'high' },
    { id: 2, type: 'assignment', title: 'Assignment Due Soon', message: 'Anatomy quiz due in 2 days - complete before deadline', time: '5 hours ago', read: false, priority: 'high' },
    { id: 3, type: 'progress', title: 'Weekly Progress Report', message: 'You completed 85% of this week\'s learning objectives', time: '1 day ago', read: true, priority: 'medium' },
    { id: 4, type: 'community', title: 'New Study Group', message: 'Join the Pharmacology study group - 15 students enrolled', time: '2 days ago', read: false, priority: 'low' },
    { id: 5, type: 'achievement', title: 'Achievement Unlocked', message: 'Congratulations! You earned the "Quiz Master" badge', time: '3 days ago', read: true, priority: 'medium' }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-5 h-5 text-red-600" />;
      case 'assignment': return <Calendar className="w-5 h-5 text-red-600" />;
      case 'progress': return <GraduationCap className="w-5 h-5 text-[#D4AF37]" />;
      case 'community': return <MessageSquare className="w-5 h-5 text-gray-600" />;
      case 'achievement': return <Award className="w-5 h-5 text-[#D4AF37]" />;
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Student Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400">Stay updated with your learning journey</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">All</TabsTrigger>
          <TabsTrigger value="course" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">Courses</TabsTrigger>
          <TabsTrigger value="assignment" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">Assignments</TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">Progress</TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">Community</TabsTrigger>
          <TabsTrigger value="achievement" className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 ${!notification.read ? 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-gray-800'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      <Badge className={`${getPriorityColor(notification.priority)} dark:text-gray-900`}>
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
                      className="dark:text-white dark:border-gray-600 hover:dark:bg-gray-700"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-400 dark:bg-gray-600'}`}></div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {['course', 'assignment', 'progress', 'community', 'achievement'].map(type => (
          <TabsContent key={type} value={type} className="space-y-4">
            {notifications.filter(n => n.type === type).map((notification) => (
              <Card key={notification.id} className={`p-4 cursor-pointer transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 ${!notification.read ? 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-gray-800'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium dark:text-white ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <Badge className={`${getPriorityColor(notification.priority)} dark:text-gray-900`}>
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
                        className="dark:text-white dark:border-gray-600 hover:dark:bg-gray-700"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <div className={`w-3 h-3 rounded-full ${!notification.read ? 'bg-red-500' : 'bg-gray-400 dark:bg-gray-600'}`}></div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StudentNotifications;