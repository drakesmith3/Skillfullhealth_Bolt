
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CreditCard, ChartBar, Trophy, FileText, BookMarked, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar";

const TutorDashboardPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="tutor dashboard" userName="Dr. Nkechi" />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16 flex">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 lg:w-1/5 pr-6">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, Dr. Nkechi!</p>
            </div>
          </div>

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
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <ChartBar className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center">
                <BookMarked className="mr-2 h-4 w-4" /> My Courses
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center">
                <Users className="mr-2 h-4 w-4" /> My Students
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" /> Earnings
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
                          <span className="text-sm">Average Rating</span>
                          <span className="text-sm font-medium">4.8/5.0</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Discussion Participation</span>
                          <span className="text-sm font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Content Metrics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-[#D4AF37]" />
                          </div>
                          <div>
                            <p className="font-medium">Medical Ethics</p>
                            <p className="text-xs text-gray-500">Most Popular Course</p>
                          </div>
                        </div>
                        <span className="font-medium">56 Students</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">New Enrollments</p>
                            <p className="text-xs text-gray-500">Last 30 days</p>
                          </div>
                        </div>
                        <span className="font-medium">+24</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Course Updates Needed</p>
                            <p className="text-xs text-gray-500">Annual review required</p>
                          </div>
                        </div>
                        <span className="font-medium">2 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Recent Activities</h3>
                  
                  <div className="space-y-4">
                    {[
                      { action: "New student enrollment", course: "Advanced Trauma Life Support", time: "2 hours ago" },
                      { action: "Course feedback received", course: "Basic Life Support", time: "Yesterday" },
                      { action: "Completed course review", course: "Medical Ethics", time: "3 days ago" },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.course}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">{activity.time}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Courses</h2>
                <p className="text-gray-600 mb-4">Courses content will appear here</p>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Students</h2>
                <p className="text-gray-600 mb-4">Students management will appear here</p>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Earnings History</h2>
                <p className="text-gray-600 mb-4">Earnings details will appear here</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default TutorDashboardPage;
