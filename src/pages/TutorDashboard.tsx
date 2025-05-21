
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CreditCard, ChartBar, Trophy, FileText, BookMarked, User, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const TutorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout 
      userType="tutor" 
      userName="Dr. Nkechi" 
      pageTitle="Tutor Dashboard"
      pageDescription="Welcome back, Dr. Nkechi!"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Content Status
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Courses</span>
                <span className="text-green-600 font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Students</span>
                <span className="text-blue-600 font-semibold">124</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-[#D4AF37] font-semibold">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Adviser Status
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2.5%</div>
                  <div className="text-xs text-white">Share</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm">Adviser-Shareholder Network</div>
              <div className="font-semibold text-[#EA384C]">Top 10%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Earnings
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Earnings</span>
                <span className="font-semibold">₦2,500,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending</span>
                <span className="text-amber-600 font-semibold">₦350,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available</span>
                <span className="text-green-600 font-semibold">₦180,000</span>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold">Withdraw</Button>
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
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> My Profile
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <BookMarked className="mr-2 h-4 w-4" /> My Courses Analytics
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> My Students Analytics
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Transactions History
          </TabsTrigger>
          <TabsTrigger value="inbox" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" /> Inbox & Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <ChartBar className="mr-2 h-6 w-6 text-[#D4AF37]" />
              Performance Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Student Engagement</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Course Completion Rate</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Quiz Completion</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Course Statistics</h3>
                
                <div className="space-y-3">
                  {[
                    { course: "Medical Ethics", students: 32, rating: 4.8 },
                    { course: "Clinical Diagnosis", students: 28, rating: 4.7 },
                    { course: "Anatomy 101", students: 45, rating: 4.9 },
                  ].map((course, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="font-medium">{course.course}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500">{course.students} students</span>
                        <span className="text-sm text-amber-500">★ {course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-3">Upcoming Classes</h3>
              <div className="space-y-2">
                {[
                  { title: "Advanced Cardiac Life Support", date: "May 25, 2025 • 10:00 AM", students: 15 },
                  { title: "Research Methodology Workshop", date: "May 27, 2025 • 2:30 PM", students: 22 },
                  { title: "Clinical Skills Assessment", date: "June 1, 2025 • 9:00 AM", students: 18 },
                ].map((session, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-gray-500">{session.date}</div>
                    </div>
                    <div className="text-sm font-medium">{session.students} enrolled</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">My Profile</h2>
            <p className="text-gray-600 mb-4">Profile content will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">My Courses Analytics</h2>
            <p className="text-gray-600 mb-4">Courses analytics content will appear here</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">My Students Analytics</h2>
            <p className="text-gray-600 mb-4">Students analytics data will appear here</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Transactions History</h2>
            <p className="text-gray-600 mb-4">Transaction history will appear here</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="inbox" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Inbox & Feedback</h2>
            <p className="text-gray-600 mb-4">Messages and feedback will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TutorDashboard;
