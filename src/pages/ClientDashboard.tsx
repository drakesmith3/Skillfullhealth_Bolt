import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MessageSquare, FileText, Gamepad, Users, Star, TrendingUp, Award, Clock, Calendar, BarChart3, PieChart, Send, Mail, ThumbsUp, Activity, Target, Trophy, ArrowUpRight, Filter, Download, Search, Bell } from "lucide-react";
import { ChartContainer, ChartTooltip } from "../components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from "recharts";
import { Link } from "react-router-dom";

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Chart data for analytics
  const gamePerformanceData = [
    { name: 'Medical Quiz', scores: [85, 78, 92, 88, 95], avgScore: 87.6 },
    { name: 'Anatomy Challenge', scores: [72, 85, 79, 91, 86], avgScore: 82.6 },
    { name: 'Drug Knowledge', scores: [68, 74, 82, 77, 85], avgScore: 77.2 },
    { name: 'Clinical Scenarios', scores: [90, 88, 94, 86, 92], avgScore: 90.0 },
  ];

  const monthlyActivityData = [
    { month: 'Jan', games: 5, discussions: 8, feedback: 3 },
    { month: 'Feb', games: 8, discussions: 12, feedback: 5 },
    { month: 'Mar', games: 6, discussions: 15, feedback: 4 },
    { month: 'Apr', games: 12, discussions: 18, feedback: 7 },
    { month: 'May', games: 14, discussions: 22, feedback: 6 },
  ];

  const feedbackRatingsData = [
    { rating: '5 Stars', count: 8, color: '#10B981' },
    { rating: '4 Stars', count: 4, color: '#3B82F6' },
    { rating: '3 Stars', count: 2, color: '#F59E0B' },
    { rating: '2 Stars', count: 0, color: '#EF4444' },
    { rating: '1 Star', count: 0, color: '#6B7280' },
  ];

  const chartConfig = {
    games: { label: "Games", color: "#D4AF37" },
    discussions: { label: "Discussions", color: "#3B82F6" },
    feedback: { label: "Feedback", color: "#10B981" },
    score: { label: "Score", color: "#8B5CF6" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, James!</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Your health learning journey continues</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                Active Member
              </Badge>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="games">Games & Quizzes Analytics</TabsTrigger>
          <TabsTrigger value="community">My Community Discussion History</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="feedback">Feedbacks You Gave</TabsTrigger>
        </TabsList>        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card size="lg" variant="stats">
              <CardContent compact className="p-6">
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

            <Card size="lg" variant="stats">
              <CardContent compact className="p-6">
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

            <Card size="lg" variant="stats">
              <CardContent compact className="p-6">
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
        </TabsContent>        <TabsContent value="games" className="space-y-6">
          {/* Games Performance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Games Played</h3>
                  <Gamepad className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">24</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Best Score</h3>
                  <Trophy className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Clinical Scenarios</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg Score</h3>
                  <Target className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">84%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Overall</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Streak</h3>
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Days</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Game Performance Chart */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Game Performance Trends
                </h3>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={gamePerformanceData.map(game => ({ name: game.name, score: game.avgScore }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip />
                      <Bar dataKey="score" fill="var(--color-score)" name="Average Score %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Activity */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Monthly Gaming Activity
                </h3>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="games" stroke="var(--color-games)" strokeWidth={3} dot={{ fill: 'var(--color-games)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Games */}
          <Card size="lg" variant="default">
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <Clock className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Recent Game Sessions
              </h3>
              <div className="space-y-4">
                {[
                  { game: 'Medical Terminology Quiz', score: 88, time: '2 hours ago', difficulty: 'Medium', duration: '15 min' },
                  { game: 'Anatomy Memory Challenge', score: 92, time: '1 day ago', difficulty: 'Hard', duration: '20 min' },
                  { game: 'Drug Interaction Simulator', score: 76, time: '2 days ago', difficulty: 'Expert', duration: '25 min' },
                  { game: 'Clinical Decision Making', score: 94, time: '3 days ago', difficulty: 'Hard', duration: '30 min' },
                ].map((session, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{session.game}</h4>
                        <Badge variant="outline" className="text-xs">
                          {session.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Duration: {session.duration}</span>
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">{session.score}%</div>
                      <Button size="sm" variant="outline">
                        Replay
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Games */}
          <Card size="lg" variant="default">
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <Gamepad className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Recommended Games
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Heart Rate Monitor', description: 'Learn cardiovascular assessments', difficulty: 'Beginner', rating: 4.8 },
                  { name: 'Medication Dosage Calculator', description: 'Practice safe dosing', difficulty: 'Intermediate', rating: 4.6 },
                  { name: 'Emergency Response Simulator', description: 'Handle critical situations', difficulty: 'Advanced', rating: 4.9 },
                ].map((game, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{game.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{game.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="secondary">{game.difficulty}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                      Start Game
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="community" className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discussions</h3>
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">15</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Started</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Replies</h3>
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upvotes</h3>
                  <ThumbsUp className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">342</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Received</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reputation</h3>
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2,847</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Chart */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Monthly Community Activity
                </h3>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Area 
                        type="monotone" 
                        dataKey="discussions" 
                        stackId="1"
                        stroke="var(--color-discussions)" 
                        fill="var(--color-discussions)" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Topics */}
            <Card size="lg" variant="default">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Top Discussion Topics
                </h3>
                <div className="space-y-4">
                  {[
                    { topic: 'Mental Health Awareness', posts: 8, replies: 23, lastActivity: '2 hours ago' },
                    { topic: 'Nutrition & Wellness', posts: 5, replies: 18, lastActivity: '1 day ago' },
                    { topic: 'Exercise & Fitness', posts: 4, replies: 15, lastActivity: '2 days ago' },
                    { topic: 'Medical Innovations', posts: 3, replies: 12, lastActivity: '3 days ago' },
                  ].map((topic, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{topic.topic}</h4>
                        <span className="text-xs text-gray-500">{topic.lastActivity}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{topic.posts} posts</span>
                        <span>{topic.replies} replies</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Discussions */}
          <Card size="lg" variant="default">
            <CardContent compact className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Your Recent Discussions
                </h3>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: 'Best practices for managing diabetes in elderly patients',
                    status: 'Active',
                    replies: 12,
                    views: 145,
                    lastReply: '2 hours ago',
                    category: 'General Health',
                    upvotes: 8
                  },
                  {
                    title: 'Mental health resources for healthcare workers',
                    status: 'Answered',
                    replies: 7,
                    views: 89,
                    lastReply: '1 day ago',
                    category: 'Mental Health',
                    upvotes: 15
                  },
                  {
                    title: 'New treatment protocols for hypertension',
                    status: 'Active',
                    replies: 5,
                    views: 67,
                    lastReply: '2 days ago',
                    category: 'Cardiology',
                    upvotes: 6
                  },
                  {
                    title: 'Patient education strategies that work',
                    status: 'Closed',
                    replies: 18,
                    views: 234,
                    lastReply: '5 days ago',
                    category: 'Education',
                    upvotes: 22
                  },
                ].map((discussion, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{discussion.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <Badge variant={discussion.status === 'Active' ? 'default' : discussion.status === 'Answered' ? 'secondary' : 'outline'}>
                            {discussion.status}
                          </Badge>
                          <span>{discussion.category}</span>
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.views} views</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {discussion.upvotes}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>Last reply: {discussion.lastReply}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Discussion
                      </Button>
                      <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="inbox" className="space-y-6">
          {/* Inbox Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Unread</h3>
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">3</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total</h3>
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">47</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Replied</h3>
                  <Send className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">42</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
                </div>
              </CardContent>
            </Card>

            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response Time</h3>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2.4h</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inbox Actions */}
          <Card size="lg" variant="default">
            <CardContent compact className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Inbox Management
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                    Compose
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Mark All Read
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Messages
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Message List */}
          <Card size="lg" variant="default">
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Messages</h3>
              <div className="space-y-4">
                {[
                  {
                    from: 'Dr. Sarah Johnson',
                    subject: 'Follow-up on your health assessment results',
                    preview: 'Thank you for completing the assessment. I wanted to discuss your results and next steps...',
                    time: '2 hours ago',
                    unread: true,
                    priority: 'high',
                    type: 'professional'
                  },
                  {
                    from: 'Glohsen Platform',
                    subject: 'Your monthly health report is ready',
                    preview: 'Your personalized health insights for May 2025 are now available in your dashboard...',
                    time: '1 day ago',
                    unread: true,
                    priority: 'medium',
                    type: 'system'
                  },
                  {
                    from: 'Dr. Michael Chen',
                    subject: 'Appointment confirmation - May 30th',
                    preview: 'This is to confirm your upcoming consultation scheduled for May 30th at 2:00 PM...',
                    time: '2 days ago',
                    unread: false,
                    priority: 'high',
                    type: 'appointment'
                  },
                  {
                    from: 'Community Forum',
                    subject: 'New reply to your discussion',
                    preview: 'Someone replied to your post about "Mental health resources for healthcare workers"...',
                    time: '3 days ago',
                    unread: true,
                    priority: 'low',
                    type: 'community'
                  },
                  {
                    from: 'Dr. Emily Brown',
                    subject: 'Medication dosage adjustment',
                    preview: 'Based on your recent lab results, I recommend adjusting your current medication...',
                    time: '5 days ago',
                    unread: false,
                    priority: 'high',
                    type: 'professional'
                  },
                ].map((message, idx) => (
                  <div key={idx} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    message.unread ? 'border-[#D4AF37] bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className={`font-semibold ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {message.from}
                          </h4>
                          <Badge variant={
                            message.type === 'professional' ? 'default' : 
                            message.type === 'system' ? 'secondary' : 
                            message.type === 'appointment' ? 'destructive' : 'outline'
                          }>
                            {message.type}
                          </Badge>
                          {message.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                          {message.unread && (
                            <Badge variant="outline" className="text-xs bg-[#D4AF37] text-black border-[#D4AF37]">
                              New
                            </Badge>
                          )}
                        </div>
                        <h5 className={`font-medium mb-2 ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {message.subject}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {message.preview}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{message.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                      <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        Read Full Message
                      </Button>
                      {message.unread && (
                        <Button size="sm" variant="ghost">
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  Load More Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="feedback" className="space-y-4">
          {/* Feedback Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">27</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">4.6</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +0.2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Professionals Rated</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +3 new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">89%</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +5% improvement
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Distribution Chart */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Rating Distribution</h3>
                  <Badge variant="outline">Last 6 months</Badge>
                </div>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={feedbackRatingsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ rating, count }) => `${rating}: ${count}`}
                      >
                        {feedbackRatingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Feedback Trend */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Monthly Feedback Trend</h3>
                  <div className="flex gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Download className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Area 
                        type="monotone" 
                        dataKey="feedback" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Feedback History */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Feedback History</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    professional: 'Dr. Sarah Wilson',
                    specialization: 'Cardiologist',
                    rating: 5,
                    date: '2024-01-15',
                    feedback: 'Excellent consultation! Dr. Wilson was very thorough in explaining my heart condition and provided clear treatment options. Highly recommended.',
                    consultation: 'Heart Health Check-up',
                    status: 'Responded'
                  },
                  {
                    professional: 'Dr. Michael Chen',
                    specialization: 'Dermatologist',
                    rating: 4,
                    date: '2024-01-10',
                    feedback: 'Good dermatological consultation. The doctor was knowledgeable and professional. Treatment plan was effective.',
                    consultation: 'Skin Condition Assessment',
                    status: 'Responded'
                  },
                  {
                    professional: 'Dr. Emily Rodriguez',
                    specialization: 'Mental Health Therapist',
                    rating: 5,
                    date: '2024-01-08',
                    feedback: 'Outstanding therapy session. Dr. Rodriguez created a safe and supportive environment. Her techniques are very effective.',
                    consultation: 'Mental Health Therapy',
                    status: 'Pending Response'
                  },
                  {
                    professional: 'Dr. James Thompson',
                    specialization: 'General Practitioner',
                    rating: 4,
                    date: '2024-01-05',
                    feedback: 'Professional and efficient service. Quick diagnosis and appropriate treatment recommendations.',
                    consultation: 'General Health Check',
                    status: 'Responded'
                  },
                  {
                    professional: 'Dr. Lisa Park',
                    specialization: 'Nutritionist',
                    rating: 5,
                    date: '2024-01-02',
                    feedback: 'Fantastic nutrition consultation! Dr. Park provided a comprehensive meal plan that fits my lifestyle perfectly.',
                    consultation: 'Nutrition Planning',
                    status: 'Responded'
                  }
                ].map((feedback, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {feedback.professional}
                          </h4>
                          <Badge variant="outline">{feedback.specialization}</Badge>
                          <Badge 
                            variant={feedback.status === 'Responded' ? 'default' : 'secondary'}
                            className={feedback.status === 'Responded' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {feedback.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {feedback.consultation} • {feedback.date}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium">Your Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          "{feedback.feedback}"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Button size="sm" variant="outline">
                        Edit Feedback
                      </Button>
                      <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        View Professional Profile
                      </Button>
                      {feedback.status === 'Responded' && (
                        <Button size="sm" variant="ghost">
                          View Response
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  Load More Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Analytics Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Feedback Impact & Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <ThumbsUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Positive Impact</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your feedback has helped 12 professionals improve their services
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Contribution Score</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You're in the top 15% of active reviewers on our platform
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Recognition</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Earned "Thoughtful Reviewer" badge for detailed feedback
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
