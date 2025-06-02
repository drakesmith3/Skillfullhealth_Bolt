
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BookOpen, Users, CreditCard, ChartBar, Activity, Gamepad, MessageSquare, BarChart, Trophy, Calendar, Target, Clock, Star, TrendingUp, Award, Play, FileText, DollarSign, ArrowUpRight } from "lucide-react";
import { ChartContainer, ChartTooltip } from "../components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import StandardDashboardLayout from "../components/dashboard/StandardDashboardLayout";
import StudentSidebarContent from "../components/dashboard/StudentSidebarContent";

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

  // Chart data
  const progressData = [
    { month: 'Jan', completed: 2, inProgress: 1 },
    { month: 'Feb', completed: 3, inProgress: 2 },
    { month: 'Mar', completed: 4, inProgress: 2 },
    { month: 'Apr', completed: 5, inProgress: 3 },
    { month: 'May', completed: 6, inProgress: 4 },
  ];

  const performanceData = [
    { subject: 'Anatomy', score: 85 },
    { subject: 'Physiology', score: 92 },
    { subject: 'Terminology', score: 78 },
    { subject: 'Ethics', score: 88 },
    { subject: 'Pharmacology', score: 82 },
  ];

  const studyTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.0 },
  ];

  const gamePerformanceData = [
    { name: 'Quiz Games', value: 65, color: '#D4AF37' },
    { name: 'Memory Games', value: 25, color: '#3B82F6' },
    { name: 'Simulation', value: 10, color: '#10B981' },
  ];

  const coursesData = [
    {
      id: 1,
      title: 'Medical Terminology',
      instructor: 'Dr. Sarah Johnson',
      progress: 85,
      status: 'In Progress',
      duration: '12 weeks',
      nextClass: 'May 25, 2025 - 2:00 PM',
      modules: { completed: 17, total: 20 }
    },
    {
      id: 2,
      title: 'Human Anatomy 101',
      instructor: 'Prof. Michael Chen',
      progress: 92,
      status: 'Nearly Complete',
      duration: '16 weeks',
      nextClass: 'May 26, 2025 - 10:00 AM',
      modules: { completed: 22, total: 24 }
    },
    {
      id: 3,
      title: 'Healthcare Ethics',
      instructor: 'Dr. Emily Brown',
      progress: 45,
      status: 'In Progress',
      duration: '8 weeks',
      nextClass: 'May 27, 2025 - 3:00 PM',
      modules: { completed: 9, total: 20 }
    },
    {
      id: 4,
      title: 'Pharmacology Basics',
      instructor: 'Dr. Robert Davis',
      progress: 15,
      status: 'Just Started',
      duration: '20 weeks',
      nextClass: 'May 28, 2025 - 9:00 AM',
      modules: { completed: 3, total: 20 }
    }
  ];

  const transactionData = [
    { date: '2025-05-20', type: 'Course Payment', amount: -15000, description: 'Medical Terminology Course', status: 'Completed' },
    { date: '2025-05-18', type: 'Scholarship', amount: 25000, description: 'Academic Excellence Grant', status: 'Received' },
    { date: '2025-05-15', type: 'Quiz Reward', amount: 500, description: 'High Score Bonus', status: 'Received' },
    { date: '2025-05-10', type: 'Course Payment', amount: -12000, description: 'Anatomy 101 Course', status: 'Completed' },
  ];

  const chartConfig = {
    completed: { label: "Completed", color: "#D4AF37" },
    inProgress: { label: "In Progress", color: "#3B82F6" },
    score: { label: "Score", color: "#10B981" },
    hours: { label: "Hours", color: "#8B5CF6" },
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
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Performance</TabsTrigger>            <TabsTrigger value="community" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Community</TabsTrigger>
            <TabsTrigger value="purse" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Purse</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Course Progress */}
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
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
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
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
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
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
              </Card>              {/* Purse */}
              <Card size="md" variant="stats">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Purse</h3>
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Balance</span>
                      <span className="font-semibold">Q15,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scholarships</span>
                      <span className="text-green-600 font-semibold">Q45,000</span>
                    </div>
                    <Button size="sm" className="w-full mt-2">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Deadlines */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
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
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
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
          </TabsContent>          <TabsContent value="courses" className="space-y-6">
            {/* Course Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Course Progress Trend
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Bar dataKey="completed" fill="var(--color-completed)" name="Completed" />
                        <Bar dataKey="inProgress" fill="var(--color-inProgress)" name="In Progress" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Star className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Subject Performance
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={performanceData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="subject" />
                        <ChartTooltip />
                        <Bar dataKey="score" fill="var(--color-score)" name="Score %" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Enrolled Courses List */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-[#D4AF37]" />
                  My Enrolled Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coursesData.map((course) => (
                    <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.title}</h3>
                        <Badge variant={course.status === 'Nearly Complete' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Instructor: {course.instructor}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Duration: {course.duration}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                          <div 
                            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Modules: {course.modules.completed}/{course.modules.total}
                        </span>
                        <span className="text-xs text-gray-500">Next: {course.nextClass}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                          Continue Learning
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>          <TabsContent value="games" className="space-y-6">
            {/* Games Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Games</h3>
                    <Gamepad className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">24</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Games Played</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">High Score</h3>
                    <Trophy className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Best Performance</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg. Score</h3>
                    <Star className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">82%</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overall Average</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Performance Distribution */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <ChartBar className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Game Type Performance
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gamePerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {gamePerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Game Activities */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Play className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Recent Game Activities
                  </h3>
                  <div className="space-y-4">
                    {[
                      { game: 'Medical Quiz Challenge', score: '85%', time: '2 hours ago', type: 'Quiz', difficulty: 'Hard' },
                      { game: 'Anatomy Memory Game', score: '92%', time: '1 day ago', type: 'Memory', difficulty: 'Medium' },
                      { game: 'Drug Interaction Simulator', score: '78%', time: '2 days ago', type: 'Simulation', difficulty: 'Expert' },
                      { game: 'Medical Terms Crossword', score: '88%', time: '3 days ago', type: 'Puzzle', difficulty: 'Easy' },
                    ].map((game, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{game.game}</h4>
                            <Badge variant="outline" className="text-xs">
                              {game.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Score: <span className="font-semibold text-[#D4AF37]">{game.score}</span></span>
                            <span>Difficulty: {game.difficulty}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{game.time}</p>
                          <Button size="sm" variant="outline" className="mt-1">
                            Replay
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Games */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Gamepad className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Available Games
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Medical Quiz Master', description: 'Test your medical knowledge', difficulty: 'Medium', players: '1.2k+' },
                    { name: 'Anatomy Explorer', description: 'Interactive anatomy learning', difficulty: 'Hard', players: '890+' },
                    { name: 'Drug Dosage Calculator', description: 'Practice medication calculations', difficulty: 'Expert', players: '650+' },
                    { name: 'Medical Ethics Scenarios', description: 'Navigate ethical dilemmas', difficulty: 'Easy', players: '1.5k+' },
                    { name: 'Symptom Detective', description: 'Diagnose based on symptoms', difficulty: 'Hard', players: '420+' },
                    { name: 'Medical History Timeline', description: 'Arrange medical events chronologically', difficulty: 'Medium', players: '780+' },
                  ].map((game, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{game.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{game.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline">{game.difficulty}</Badge>
                        <span className="text-xs text-gray-500">{game.players} players</span>
                      </div>
                      <Button size="sm" className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        Play Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>          <TabsContent value="performance" className="space-y-6">
            {/* Performance KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GPA</h3>
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">3.85</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Semester</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Time</h3>
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completion Rate</h3>
                    <Target className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Assignments</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rank</h3>
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">#12</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">In Class</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Study Hours */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Weekly Study Hours
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studyTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip />
                        <Line 
                          type="monotone" 
                          dataKey="hours" 
                          stroke="var(--color-hours)" 
                          strokeWidth={3}
                          dot={{ fill: 'var(--color-hours)', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Star className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Grade Distribution
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'A (90-100%)', value: 45, color: '#10B981' },
                            { name: 'B (80-89%)', value: 35, color: '#3B82F6' },
                            { name: 'C (70-79%)', value: 15, color: '#F59E0B' },
                            { name: 'D (60-69%)', value: 5, color: '#EF4444' },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'A (90-100%)', value: 45, color: '#10B981' },
                            { name: 'B (80-89%)', value: 35, color: '#3B82F6' },
                            { name: 'C (70-79%)', value: 15, color: '#F59E0B' },
                            { name: 'D (60-69%)', value: 5, color: '#EF4444' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Performance Analytics */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Detailed Performance Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Recent Assessments</h4>
                    {[
                      { subject: 'Medical Terminology', type: 'Final Exam', score: 88, date: '2025-05-20', grade: 'B+' },
                      { subject: 'Anatomy 101', type: 'Midterm', score: 95, date: '2025-05-18', grade: 'A' },
                      { subject: 'Healthcare Ethics', type: 'Assignment', score: 82, date: '2025-05-15', grade: 'B' },
                      { subject: 'Pharmacology', type: 'Quiz', score: 76, date: '2025-05-12', grade: 'B-' },
                    ].map((assessment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{assessment.subject}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{assessment.type} • {assessment.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-[#D4AF37]">{assessment.score}%</div>
                          <Badge variant="outline">{assessment.grade}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Learning Goals Progress</h4>
                    {[
                      { goal: 'Master Medical Terminology', progress: 85, target: 90 },
                      { goal: 'Complete Anatomy Modules', progress: 92, target: 100 },
                      { goal: 'Improve Quiz Scores', progress: 78, target: 85 },
                      { goal: 'Study 20+ Hours/Week', progress: 75, target: 80 },
                    ].map((goal, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 dark:text-white">{goal.goal}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{goal.progress}% / {goal.target}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              goal.progress >= goal.target ? 'bg-green-500' : 'bg-[#D4AF37]'
                            }`}
                            style={{ width: `${Math.min(goal.progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>          <TabsContent value="community" className="space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Groups</h3>
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">3</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Groups</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Forum Posts</h3>
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reputation</h3>
                    <Star className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connections</h3>
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">56</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Study Groups */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    My Study Groups
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Anatomy Study Circle',
                        members: 12,
                        subject: 'Human Anatomy',
                        nextMeeting: 'Tomorrow, 3:00 PM',
                        activity: 'High',
                        description: 'Focused on practical anatomy and lab work'
                      },
                      {
                        name: 'Medical Ethics Discussion',
                        members: 8,
                        subject: 'Healthcare Ethics',
                        nextMeeting: 'May 27, 2:00 PM',
                        activity: 'Medium',
                        description: 'Weekly case study discussions'
                      },
                      {
                        name: 'Pharmacology Masters',
                        members: 15,
                        subject: 'Pharmacology',
                        nextMeeting: 'May 28, 4:00 PM',
                        activity: 'High',
                        description: 'Drug interactions and mechanisms'
                      }
                    ].map((group, idx) => (
                      <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{group.name}</h4>
                          <Badge variant={group.activity === 'High' ? 'default' : 'secondary'}>
                            {group.activity} Activity
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{group.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Subject: {group.subject}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {group.members} members
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Next meeting: {group.nextMeeting}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                            Join Meeting
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Activity */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Recent Forum Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'How to memorize anatomical terms effectively?',
                        author: 'You',
                        replies: 12,
                        views: 89,
                        time: '2 hours ago',
                        category: 'Study Tips'
                      },
                      {
                        title: 'Pharmacology case study help needed',
                        author: 'Mike Johnson',
                        replies: 8,
                        views: 45,
                        time: '1 day ago',
                        category: 'Homework Help'
                      },
                      {
                        title: 'Best resources for medical ethics?',
                        author: 'Sarah Chen',
                        replies: 15,
                        views: 124,
                        time: '2 days ago',
                        category: 'Resources'
                      },
                      {
                        title: 'Study group for final exams',
                        author: 'Alex Rodriguez',
                        replies: 6,
                        views: 32,
                        time: '3 days ago',
                        category: 'Study Groups'
                      }
                    ].map((post, idx) => (
                      <div key={idx} className="border-l-4 border-[#D4AF37] pl-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-r-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">{post.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>by {post.author}</span>
                          <span>{post.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span>{post.replies} replies</span>
                            <span>{post.views} views</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-xs">
                            View Thread
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Engagement Chart */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Community Engagement Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Achievements</h4>
                    <div className="space-y-3">
                      {[
                        { achievement: 'Helpful Member', description: 'Received 10+ helpful votes', date: '2 days ago', icon: '🏆' },
                        { achievement: 'Active Participant', description: 'Posted 25+ forum messages', date: '1 week ago', icon: '💬' },
                        { achievement: 'Study Group Leader', description: 'Led 5+ study sessions', date: '2 weeks ago', icon: '👥' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white">{item.achievement}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Upcoming Events</h4>
                    <div className="space-y-3">
                      {[
                        { event: 'Virtual Study Hall', date: 'Tomorrow, 7:00 PM', attendees: 24 },
                        { event: 'Medical Career Webinar', date: 'May 27, 6:00 PM', attendees: 156 },
                        { event: 'Peer Tutoring Session', date: 'May 28, 4:00 PM', attendees: 12 },
                      ].map((event, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">{event.event}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{event.date}</p>
                            <p className="text-xs text-gray-500">{event.attendees} attending</p>
                          </div>
                          <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>          <TabsContent value="purse" className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Balance</h3>
                    <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">Q15,000</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scholarships</h3>
                    <Award className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">Q45,000</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Received</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Spent</h3>
                    <DollarSign className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">Q27,000</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                  </div>
                </CardContent>
              </Card>

              <Card size="md" variant="stats">
                <CardContent compact className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rewards</h3>
                    <Trophy className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">Q2,500</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Earned</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Spending Analytics */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <ChartBar className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Spending Breakdown
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Course Fees', value: 18000, color: '#D4AF37' },
                            { name: 'Study Materials', value: 5000, color: '#3B82F6' },
                            { name: 'Assessments', value: 3000, color: '#10B981' },
                            { name: 'Certification', value: 1000, color: '#F59E0B' },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Course Fees', value: 18000, color: '#D4AF37' },
                            { name: 'Study Materials', value: 5000, color: '#3B82F6' },
                            { name: 'Assessments', value: 3000, color: '#10B981' },
                            { name: 'Certification', value: 1000, color: '#F59E0B' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}                        </Pie>
                        <ChartTooltip formatter={(value) => [`Q${value.toLocaleString()}`, 'Amount']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card size="lg" variant="default">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Monthly Financial Trends
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: 'Jan', income: 20000, expenses: 15000 },
                        { month: 'Feb', income: 25000, expenses: 18000 },
                        { month: 'Mar', income: 30000, expenses: 22000 },
                        { month: 'Apr', income: 28000, expenses: 25000 },
                        { month: 'May', income: 32000, expenses: 27000 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />                        <YAxis />
                        <ChartTooltip formatter={(value) => [`Q${value.toLocaleString()}`, 'Amount']} />
                        <Line
                          type="monotone" 
                          dataKey="income" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          name="Income"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#EF4444" 
                          strokeWidth={3}
                          name="Expenses"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Recent Transactions
                </h3>
                <div className="space-y-3">
                  {transactionData.map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.amount > 0 ? 
                            <ArrowUpRight className="w-5 h-5" /> : 
                            <DollarSign className="w-5 h-5" />
                          }
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{transaction.type}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}Q{Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2 bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                    <CreditCard className="w-6 h-6" />
                    <span>Add Funds</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <DollarSign className="w-6 h-6" />
                    <span>Withdraw</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span>View Statement</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scholarship Opportunities */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Available Scholarships
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Academic Excellence Grant',
                      amount: 'Q50,000',
                      deadline: 'June 15, 2025',
                      requirements: 'GPA 3.5+, Full-time student',
                      status: 'Eligible'
                    },
                    {
                      name: 'Healthcare Leadership Scholarship',
                      amount: 'Q75,000',
                      deadline: 'July 1, 2025',
                      requirements: 'Leadership experience, Essay required',
                      status: 'Eligible'
                    },
                    {
                      name: 'Community Service Award',
                      amount: 'Q25,000',
                      deadline: 'June 30, 2025',
                      requirements: '100+ volunteer hours',
                      status: 'Apply Now'
                    },
                    {
                      name: 'Medical Innovation Grant',
                      amount: 'Q100,000',
                      deadline: 'August 15, 2025',
                      requirements: 'Research project, Faculty recommendation',
                      status: 'Requirements Not Met'
                    }
                  ].map((scholarship, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{scholarship.name}</h4>
                        <Badge variant={
                          scholarship.status === 'Eligible' ? 'default' : 
                          scholarship.status === 'Apply Now' ? 'secondary' : 'outline'
                        }>
                          {scholarship.status}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-[#D4AF37] mb-2">{scholarship.amount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{scholarship.requirements}</p>
                      <p className="text-xs text-gray-500 mb-3">Deadline: {scholarship.deadline}</p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        disabled={scholarship.status === 'Requirements Not Met'}
                        variant={scholarship.status === 'Eligible' ? 'default' : 'outline'}
                      >
                        {scholarship.status === 'Requirements Not Met' ? 'Not Eligible' : 'Apply Now'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default StudentDashboard;
