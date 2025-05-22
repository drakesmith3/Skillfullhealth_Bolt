import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Gamepad, Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userType="client"
      userName="James Miller"
      pageTitle="Client Dashboard"
      pageDescription="Welcome back, James!"
    >
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="games">Games & Quizzes Analytics</TabsTrigger>
          <TabsTrigger value="community">My Community Discussion History</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="feedback">Feedbacks You Gave</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Gamepad className="h-5 w-5 text-[#D4AF37] mr-2" />
                  Game Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Games Played</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Score</span>
                    <span className="font-semibold text-[#D4AF37]">950</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Score</span>
                    <span className="font-semibold">720</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Badges</span>
                    <span className="font-semibold">5</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-[#D4AF37] hover:bg-amber-500 text-black" asChild>
                  <Link to="/games-quizzes">Play Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="h-5 w-5 text-[#D4AF37] mr-2" />
                  Community
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Discussions Started</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Replies</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Helpful Badges</span>
                    <span className="font-semibold text-[#D4AF37]">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Activity</span>
                    <span className="font-semibold">2 days ago</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-[#D4AF37] hover:bg-amber-500 text-black" asChild>
                  <Link to="/community">Visit Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 text-[#D4AF37] mr-2" />
                  Messages & Feedback
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Unread Messages</span>
                    <span className="font-semibold text-red-500">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Feedback Given</span>
                    <span className="font-semibold">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating Given</span>
                    <span className="font-semibold text-[#D4AF37]">4.5/5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/client/inbox">Inbox</Link>
                  </Button>
                  <Button className="bg-[#D4AF37] hover:bg-amber-500 text-black" asChild>
                    <Link to="/dashboard/client/feedback">Feedback</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  {
                    activity: "Played Medical Quiz",
                    date: "Today",
                    details: "Score: 85/100",
                    icon: <Gamepad className="h-5 w-5 text-[#D4AF37]" />
                  },
                  {
                    activity: "Replied to discussion",
                    date: "Yesterday",
                    details: "'New treatments for hypertension'",
                    icon: <Users className="h-5 w-5 text-[#D4AF37]" />
                  },
                  {
                    activity: "Gave feedback",
                    date: "3 days ago",
                    details: "To Dr. Adeniran - 5/5 stars",
                    icon: <FileText className="h-5 w-5 text-[#D4AF37]" />
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-2">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Games & Quizzes Analytics</h2>
              <p>Your games and quizzes performance analytics will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Community Discussion History</h2>
              <p>Your community forum participation history will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inbox" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Inbox</h2>
              <p>Your messages and notifications will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Feedbacks You Gave</h2>
              <p>History of feedback you've provided to professionals will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClientDashboard;
