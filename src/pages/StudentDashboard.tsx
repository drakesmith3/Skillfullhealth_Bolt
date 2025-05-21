
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CreditCard, ChartBar, Activity, Gamepad, MessageSquare, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userType="student"
      userName="Sarah Johnson"
      pageTitle="Student Dashboard"
      pageDescription="Welcome back, Sarah!"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Course Progress
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Enrolled Courses</span>
                <span className="text-green-600 font-semibold">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-[#D4AF37] font-semibold">75%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <Activity className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Learning Activity
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Study Hours (Week)</span>
                <span className="font-semibold">12.5 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Quizzes Taken</span>
                <span className="text-amber-600 font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg. Score</span>
                <span className="text-green-600 font-semibold">82%</span>
              </div>
              <Button size="sm" className="w-full mt-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-medium">
                View Study Stats
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Wallet
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Balance</span>
                <span className="font-semibold">₦15,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Payments</span>
                <span className="text-amber-600 font-semibold">₦110,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Scholarships</span>
                <span className="text-green-600 font-semibold">₦45,000</span>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <ChartBar className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" /> Courses Enrolled
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center">
            <Gamepad className="mr-2 h-4 w-4" /> Games & Quizzes
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" /> Performance
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> Community
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Wallet & Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {[
                    { course: "Medical Terminology", task: "Final Exam", date: "May 25, 2025", status: "Urgent" },
                    { course: "Anatomy 101", task: "Assignment 3", date: "May 28, 2025", status: "Upcoming" },
                    { course: "Healthcare Ethics", task: "Discussion Post", date: "June 1, 2025", status: "Upcoming" },
                  ].map((item, idx) => (
                    <div key={idx} className="border-l-4 border-[#D4AF37] pl-3 py-2">
                      <div className="font-medium">{item.task}</div>
                      <div className="text-sm text-gray-500">{item.course}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs">{item.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === "Urgent" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        }`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Recent Activities</h3>
                <div className="space-y-3">
                  {[
                    { activity: "Completed quiz", course: "Medical Terminology", score: "85%", time: "Yesterday" },
                    { activity: "Watched lecture", course: "Anatomy 101", duration: "45 minutes", time: "2 days ago" },
                    { activity: "Submitted assignment", course: "Healthcare Ethics", status: "Graded: A", time: "3 days ago" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-gray-500">{item.course}</p>
                        <p className="text-xs text-gray-400">{item.time}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {item.score || item.status || item.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">My Enrolled Courses</h2>
            <p className="text-gray-600 mb-4">Courses content will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Games & Quizzes Stats</h2>
            <p className="text-gray-600 mb-4">Games and quizzes statistics will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Performance Analytics</h2>
            <p className="text-gray-600 mb-4">Performance data and analytics will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Community</h2>
            <p className="text-gray-600 mb-4">Community interaction will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Wallet & Transactions</h2>
            <p className="text-gray-600 mb-4">Wallet and transaction information will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentDashboard;
