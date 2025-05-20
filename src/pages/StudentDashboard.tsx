
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, CreditCard, ChartBar, Calendar, GraduationCap, BookMarked, Award, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const StudentDashboardPage: React.FC = () => {
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
      <PreHeader currentPage="student dashboard" userName="John Doe" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, John!</p>
            </div>
            
            <Button className="mt-4 md:mt-0 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
              Find New Courses
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certificates</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">CME Credits</p>
                  <p className="text-2xl font-bold">24</p>
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
              <TabsTrigger value="certificates" className="flex items-center">
                <Award className="mr-2 h-4 w-4" /> Certificates
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Learning Progress</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Ongoing Courses</h3>
                    
                    <div className="space-y-6">
                      {[
                        { name: "Advanced Cardiac Life Support", progress: 75, lessons: "6/8", dueDays: 5 },
                        { name: "Medical Ethics", progress: 30, lessons: "3/10", dueDays: 12 }
                      ].map((course, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{course.name}</h4>
                            <Badge variant="outline">{course.lessons} Completed</Badge>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span>{course.progress}% Complete</span>
                              <span className="text-amber-600">{course.dueDays} days left</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full mt-2">
                            Continue Learning
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Learning Stats</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Overall Completion Rate</h4>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full border-4 border-[#D4AF37] flex items-center justify-center mr-4">
                            <span className="text-xl font-bold">78%</span>
                          </div>
                          <div className="text-sm">
                            <p>You've completed 78% of all your enrolled courses</p>
                            <p className="text-green-600 mt-1">Above average by 12%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Quiz Performance</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">85/100</p>
                            <p className="text-xs text-gray-500">Average Score</p>
                          </div>
                          <div>
                            <p className="font-medium">24</p>
                            <p className="text-xs text-gray-500">Quizzes Taken</p>
                          </div>
                          <div>
                            <p className="font-medium text-green-600">92%</p>
                            <p className="text-xs text-gray-500">Pass Rate</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Learning Activity</h4>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-[#D4AF37] mr-2"></div>
                            <span className="text-xs">This Week</span>
                          </div>
                          <span className="text-xs">8.5 hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-gray-300 mr-2"></div>
                            <span className="text-xs">Last Week</span>
                          </div>
                          <span className="text-xs">6.2 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-lg font-medium mb-4">Recommended Courses</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Basic Life Support", instructor: "Dr. Nkechi", rating: 4.8 },
                      { name: "Examination of Systems", instructor: "Dr. Adewale", rating: 4.9 }
                    ].map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-xs text-gray-500">By {course.instructor}</p>
                        </div>
                        <Button size="sm">Enroll</Button>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-lg font-medium mb-4">Learning Community</h2>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Study Groups</p>
                        <p className="text-xs text-gray-500">3 active groups</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Join More</Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">Recent Discussions</h3>
                    
                    <div className="space-y-2">
                      {[
                        { topic: "ACLS Certification Tips", replies: 12, latest: "2 hours ago" },
                        { topic: "Study Resources for Medical Ethics", replies: 8, latest: "Yesterday" }
                      ].map((discussion, idx) => (
                        <div key={idx} className="p-2 hover:bg-gray-50 rounded">
                          <p className="font-medium text-sm">{discussion.topic}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{discussion.replies} replies</span>
                            <span>{discussion.latest}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Enrolled Courses</h2>
                <p className="text-gray-600">Course details will appear here</p>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Certificates</h2>
                <p className="text-gray-600">Certificate details will appear here</p>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Learning Schedule</h2>
                <p className="text-gray-600">Schedule details will appear here</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default StudentDashboardPage;
