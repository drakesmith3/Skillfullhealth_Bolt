
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, CreditCard, ChartBar, Activity, Gamepad, MessageSquare, BarChart, Trophy, Calendar, Target } from "lucide-react";
import StandardDashboardLayout from "@/components/dashboard/StandardDashboardLayout";
import StudentSidebarContent from "@/components/dashboard/StudentSidebarContent";

const StudentDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const studentStats = {
    coursesEnrolled: 4,
    coursesCompleted: 2,
    overallProgress: 75,
    studyHours: 12.5,
    quizzesTaken: 8,
    avgScore: 82,
    achievements: 5,
    studyStreak: 12
  };

  const upcomingDeadlines = [
    { course: "Medical Terminology", task: "Final Exam", date: "May 25, 2025", status: "Urgent", priority: "high" },
    { course: "Anatomy 101", task: "Assignment 3", date: "May 28, 2025", status: "Upcoming", priority: "medium" },
    { course: "Healthcare Ethics", task: "Discussion Post", date: "June 1, 2025", status: "Upcoming", priority: "low" },
  ];

  const recentActivities = [
    { activity: "Completed quiz", course: "Medical Terminology", score: "85%", time: "Yesterday", type: "quiz" },
    { activity: "Watched lecture", course: "Anatomy 101", duration: "45 minutes", time: "2 days ago", type: "lecture" },
    { activity: "Submitted assignment", course: "Healthcare Ethics", status: "Graded: A", time: "3 days ago", type: "assignment" },
    { activity: "Joined study group", course: "Pharmacology", members: "15 students", time: "5 days ago", type: "community" },
  ];

  return (
    <StandardDashboardLayout
      sidebar={<StudentSidebarContent />}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Sarah!</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Ready to continue your medical studies journey?</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                {studentStats.studyStreak} Day Streak 🔥
              </Badge>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                Continue Learning
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white dark:bg-gray-800 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Courses</TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Games</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Performance</TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Community</TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Course Progress */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Progress</h3>
                    <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Enrolled</span>
                      <span className="text-2xl font-bold text-[#D4AF37]">{studentStats.coursesEnrolled}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-xl font-semibold text-green-600">{studentStats.coursesCompleted}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: `${studentStats.overallProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">{studentStats.overallProgress}% Overall Progress</p>
                  </div>
                </CardContent>
              </Card>

              {/* Study Activity */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Activity</h3>
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{studentStats.studyHours}</div>
                      <p className="text-sm text-gray-500">Hours this week</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Score:</span>
                      <span className="font-semibold text-green-600">{studentStats.avgScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quizzes:</span>
                      <span className="font-semibold">{studentStats.quizzesTaken}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
                    <Trophy className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">{studentStats.achievements}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Badges earned</p>
                    <Button size="sm" className="mt-3 w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wallet</h3>
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Balance</span>
                      <span className="font-semibold">₦15,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scholarships</span>
                      <span className="text-green-600 font-semibold">₦45,000</span>
                    </div>
                    <Button size="sm" className="w-full mt-2">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Deadlines */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                    <Target className="mr-2 h-5 w-5 text-red-500" />
                    Upcoming Deadlines
                  </h3>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-[#D4AF37] pl-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-r-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{item.task}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{item.course}</div>
                          </div>
                          <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          {item.type === 'quiz' && <ChartBar className="w-4 h-4 text-black" />}
                          {item.type === 'lecture' && <BookOpen className="w-4 h-4 text-black" />}
                          {item.type === 'assignment' && <Trophy className="w-4 h-4 text-black" />}
                          {item.type === 'community' && <Users className="w-4 h-4 text-black" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.course}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{item.time}</span>
                            <span className="text-sm font-medium text-[#D4AF37]">
                              {item.score || item.status || item.duration || item.members}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Enrolled Courses</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Track your progress and continue learning</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Games & Quizzes Stats</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your gaming achievements and quiz performance</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Performance Analytics</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Detailed analysis of your learning progress</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Community</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Connect with fellow students and study groups</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Wallet & Transactions</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your payments and financial transactions</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default StudentDashboard;
