
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { BookOpen, Users, CreditCard, ChartBar, Trophy, FileText, BookMarked, User, MessageSquare, Clock, Star, Edit, Send, Search, Filter, Download, Upload, Calendar, BarChart3, TrendingUp, Award, Mail, Phone, MapPin, Globe, CheckCircle, AlertCircle, XCircle, Eye, Play, Pause, MoreVertical } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router-dom";

const TutorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tutor Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Dr. Nkechi!</p>
            </div>
          </div>
        </div>
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="courses">My Courses/Games Analytics</TabsTrigger>
          <TabsTrigger value="students">My Students Analytics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions History</TabsTrigger>
          <TabsTrigger value="inbox">Inbox & Feedback</TabsTrigger>
        </TabsList>        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
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
              </CardContent>            </Card>
            
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Adviser Status
                  </h3>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">2.5%</div>
                      <div className="text-xs text-black">Share</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm">Adviser-Shareholder Network</div>
                  <div className="font-semibold text-[#EA384C]">Top 10%</div>
                </div>
              </CardContent>            </Card>
            
            <Card size="md" variant="stats">
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Earnings
                  </h3>
                </div>
                <div className="space-y-2">                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Earnings</span>
                    <span className="font-semibold">Q2,500,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending</span>
                    <span className="text-amber-600 font-semibold">Q350,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Available</span>
                    <span className="text-green-600 font-semibold">Q180,000</span>
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" className="bg-[#D4AF37] text-black font-bold hover:bg-amber-500">Withdraw</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          <Card size="xl" variant="default">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <ChartBar className="mr-2 h-6 w-6 text-[#D4AF37]" />
              Performance Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Student Engagement</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Course Completion Rate</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Quiz Completion</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Course Statistics</h3>
                
                <div className="space-y-3">
                  {[
                    { course: "Medical Ethics", students: 32, rating: 4.8 },
                    { course: "Clinical Diagnosis", students: 28, rating: 4.7 },
                    { course: "Anatomy 101", students: 45, rating: 4.9 },
                  ].map((course, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="font-medium">{course.course}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.students} students</span>
                        <span className="text-sm text-amber-500">★ {course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Upcoming Classes</h3>
              <div className="space-y-2">
                {[
                  { title: "Advanced Cardiac Life Support", date: "May 25, 2025 • 10:00 AM", students: 15 },
                  { title: "Research Methodology Workshop", date: "May 27, 2025 • 2:30 PM", students: 22 },
                  { title: "Clinical Skills Assessment", date: "June 1, 2025 • 9:00 AM", students: 18 },
                ].map((session, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{session.date}</div>
                    </div>
                    <div className="text-sm font-medium">{session.students} enrolled</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card size="lg" variant="default">
              <CardHeader compact>
                <h2 className="text-xl font-bold flex items-center">
                  <User className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Personal Information
                </h2>
              </CardHeader>
              <CardContent compact className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/api/placeholder/80/80" alt="Dr. Nkechi" />
                    <AvatarFallback className="bg-[#D4AF37] text-black text-lg font-bold">DN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Dr. Nkechi Okafor</h3>
                    <p className="text-gray-600 dark:text-gray-400">Senior Medical Tutor</p>
                    <Badge variant="secondary" className="mt-1">Verified</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    <span>nkechi.okafor@glohsen.com</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                    <span>+234 803 123 4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="mr-2 h-4 w-4 text-gray-500" />
                    <span>linkedin.com/in/dr-nkechi-okafor</span>
                  </div>
                </div>
                
                <Button className="w-full bg-[#D4AF37] text-black hover:bg-amber-500">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card size="lg" variant="default">
              <CardHeader compact>
                <h2 className="text-xl font-bold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Professional Details
                </h2>
              </CardHeader>
              <CardContent compact className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Internal Medicine, Medical Education</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">15+ years in medical practice and education</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical License</label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">MDCN/2008/12345</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">University of Lagos Teaching Hospital</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Teaching Rating</label>
                  <div className="flex items-center mt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">4.9/5.0 (124 reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Stats */}
            <Card size="lg" variant="default">
              <CardHeader compact>
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Teaching Statistics
                </h2>
              </CardHeader>
              <CardContent compact className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-[#D4AF37]">124</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Students</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Active Courses</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Completion Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">3.2k</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Hours</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Course Quality</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificates & Achievements */}
          <Card size="xl" variant="default">
            <CardHeader compact>
              <h2 className="text-xl font-bold flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Certificates & Achievements
              </h2>
            </CardHeader>
            <CardContent compact>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "MBBS", institution: "University of Lagos", year: "2008", type: "Degree" },
                  { title: "Fellow of West African College of Physicians", institution: "WACP", year: "2015", type: "Fellowship" },
                  { title: "Medical Education Certificate", institution: "Harvard Medical School", year: "2019", type: "Certificate" },
                  { title: "Best Tutor Award", institution: "GLOHSEN Platform", year: "2024", type: "Award" },
                  { title: "Digital Health Innovation", institution: "MIT", year: "2023", type: "Certificate" },
                  { title: "Research Excellence Award", institution: "Nigerian Medical Association", year: "2022", type: "Award" },
                ].map((cert, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={cert.type === 'Award' ? 'default' : 'secondary'}>
                        {cert.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{cert.year}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{cert.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{cert.institution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Course Stats Cards */}
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-[#D4AF37] mr-3" />
                  <div>
                    <p className="text-lg font-bold">5</p>
                    <p className="text-xs text-gray-500">Active Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-lg font-bold">124</p>
                    <p className="text-xs text-gray-500">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-lg font-bold">85%</p>
                    <p className="text-xs text-gray-500">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <p className="text-lg font-bold">4.9</p>
                    <p className="text-xs text-gray-500">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Management */}
          <Card size="xl" variant="default">
            <CardHeader compact>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <BookMarked className="mr-2 h-6 w-6 text-[#D4AF37]" />
                  My Courses Management
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm" className="bg-[#D4AF37] text-black hover:bg-amber-500">
                    <Upload className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent compact>
              <div className="space-y-4">
                {[                  {
                    id: 1,
                    title: "Medical Ethics & Professionalism",
                    students: 32,
                    progress: 85,
                    rating: 4.8,
                    status: "Active",
                    lastUpdated: "2 days ago",
                    duration: "6 weeks",
                    revenue: "Q480,000"
                  },
                  {
                    id: 2,
                    title: "Clinical Diagnosis Fundamentals",
                    students: 28,
                    progress: 72,
                    rating: 4.7,
                    status: "Active",
                    lastUpdated: "5 days ago",
                    duration: "8 weeks",
                    revenue: "Q420,000"
                  },
                  {
                    id: 3,
                    title: "Anatomy 101 - Human Body Systems",
                    students: 45,
                    progress: 90,
                    rating: 4.9,
                    status: "Active",
                    lastUpdated: "1 day ago",
                    duration: "12 weeks",
                    revenue: "Q675,000"
                  },
                  {
                    id: 4,
                    title: "Pharmacology Basics",
                    students: 19,
                    progress: 45,
                    rating: 4.6,
                    status: "Draft",
                    lastUpdated: "1 week ago",
                    duration: "10 weeks",
                    revenue: "Q285,000"
                  }
                ].map((course, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">{course.students}</span> students
                          </div>
                          <div>
                            <span className="font-medium">{course.duration}</span> duration
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">{course.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span>Student Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last updated: {course.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card size="lg" variant="default">
              <CardHeader compact>
                <h3 className="text-lg font-bold flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Course Performance
                </h3>
              </CardHeader>
              <CardContent compact>
                <div className="space-y-4">
                  {[
                    { metric: "Student Engagement", value: 92, color: "bg-blue-500" },
                    { metric: "Course Completion", value: 85, color: "bg-green-500" },
                    { metric: "Quiz Performance", value: 78, color: "bg-purple-500" },
                    { metric: "Discussion Participation", value: 65, color: "bg-orange-500" }
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <span className="text-sm">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${metric.color}`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card size="lg" variant="default">
              <CardHeader compact>
                <h3 className="text-lg font-bold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Upcoming Sessions
                </h3>
              </CardHeader>
              <CardContent compact>
                <div className="space-y-3">
                  {[
                    {
                      title: "Advanced Cardiac Life Support",
                      course: "Medical Ethics",
                      time: "May 29, 2025 • 10:00 AM",
                      students: 15,
                      type: "Live Session"
                    },
                    {
                      title: "Case Study Discussion",
                      course: "Clinical Diagnosis",
                      time: "May 30, 2025 • 2:30 PM",
                      students: 22,
                      type: "Workshop"
                    },
                    {
                      title: "Final Assessment Review",
                      course: "Anatomy 101",
                      time: "June 2, 2025 • 9:00 AM",
                      students: 18,
                      type: "Review Session"
                    }
                  ].map((session, idx) => (
                    <div key={idx} className="border-l-4 border-[#D4AF37] pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-sm">{session.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{session.course}</p>
                          <p className="text-xs text-gray-500 mt-1">{session.time}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {session.type}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{session.students} students</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>          <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">124</div>
                  <div className="text-xs text-gray-500">Total Students</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">98</div>
                  <div className="text-xs text-gray-500">Active Students</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-[#D4AF37] mx-auto mb-2" />
                  <div className="text-2xl font-bold">76</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-gray-500">At Risk</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card size="lg" variant="default">
              <CardHeader compact>
                <h3 className="text-lg font-bold flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Student Performance Distribution
                </h3>
              </CardHeader>
              <CardContent compact>
                <div className="space-y-4">
                  {[
                    { grade: "Excellent (90-100%)", count: 32, percentage: 26, color: "bg-green-500" },
                    { grade: "Good (80-89%)", count: 45, percentage: 36, color: "bg-blue-500" },
                    { grade: "Average (70-79%)", count: 28, percentage: 23, color: "bg-yellow-500" },
                    { grade: "Below Average (60-69%)", count: 15, percentage: 12, color: "bg-orange-500" },
                    { grade: "Poor (<60%)", count: 4, percentage: 3, color: "bg-red-500" }
                  ].map((grade, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{grade.grade}</span>
                        <span className="text-sm">{grade.count} students ({grade.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${grade.color}`}
                          style={{ width: `${grade.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card size="lg" variant="default">
              <CardHeader compact>
                <h3 className="text-lg font-bold flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Engagement Metrics
                </h3>
              </CardHeader>
              <CardContent compact>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">78%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Daily Active</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xl font-bold text-green-600">85%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Assignment Submit</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Forum Participation</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Video Watch Time</span>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Quiz Completion</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Students */}
          <Card size="xl" variant="default">
            <CardHeader compact>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <Award className="mr-2 h-6 w-6 text-[#D4AF37]" />
                  Student Analytics Dashboard
                </h2>
                <div className="flex gap-2">
                  <Input placeholder="Search students..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent compact>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      {
                        name: "Adaora Okoye",
                        avatar: "AO",
                        course: "Medical Ethics",
                        progress: 95,
                        grade: "A",
                        lastActivity: "2 hours ago",
                        status: "Excellent",
                        statusColor: "bg-green-100 text-green-800"
                      },
                      {
                        name: "Emeka Nwachukwu",
                        avatar: "EN",
                        course: "Clinical Diagnosis",
                        progress: 88,
                        grade: "B+",
                        lastActivity: "1 day ago",
                        status: "Good",
                        statusColor: "bg-blue-100 text-blue-800"
                      },
                      {
                        name: "Fatima Ibrahim",
                        avatar: "FI",
                        course: "Anatomy 101",
                        progress: 92,
                        grade: "A-",
                        lastActivity: "3 hours ago",
                        status: "Excellent",
                        statusColor: "bg-green-100 text-green-800"
                      },
                      {
                        name: "Samuel Adeleke",
                        avatar: "SA",
                        course: "Pharmacology",
                        progress: 76,
                        grade: "B",
                        lastActivity: "2 days ago",
                        status: "Average",
                        statusColor: "bg-yellow-100 text-yellow-800"
                      },
                      {
                        name: "Chioma Eze",
                        avatar: "CE",
                        course: "Medical Ethics",
                        progress: 45,
                        grade: "C",
                        lastActivity: "1 week ago",
                        status: "At Risk",
                        statusColor: "bg-red-100 text-red-800"
                      }
                    ].map((student, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback className="bg-[#D4AF37] text-black text-xs">
                                {student.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{student.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {student.course}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="bg-[#D4AF37] h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          {student.grade}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {student.lastActivity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge className={student.statusColor}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>          <TabsContent value="transactions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-green-500 mx-auto mb-2" />                  <div className="text-lg font-bold">Q2,500,000</div>
                  <div className="text-xs text-gray-500">Total Earnings</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">Q350,000</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">Q180,000</div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats">
              <CardContent compact className="p-4">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">+15%</div>
                  <div className="text-xs text-gray-500">This Month</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card size="lg" variant="default">
            <CardHeader compact>
              <h3 className="text-lg font-bold">Quick Actions</h3>
            </CardHeader>
            <CardContent compact>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-[#D4AF37] text-black hover:bg-amber-500 p-6 h-auto flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  <span>Withdraw Funds</span>
                  <span className="text-xs opacity-75">Available: Q180,000</span>
                </Button>
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Report</span>
                  <span className="text-xs opacity-75">Financial Summary</span>
                </Button>
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>View Analytics</span>
                  <span className="text-xs opacity-75">Revenue Trends</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card size="xl" variant="default">
            <CardHeader compact>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <CreditCard className="mr-2 h-6 w-6 text-[#D4AF37]" />
                  Transaction History
                </h2>
                <div className="flex gap-2">
                  <Input placeholder="Search transactions..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent compact>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[                      {
                        date: "May 28, 2025",
                        description: "Course Enrollment Payment",
                        course: "Medical Ethics",
                        student: "Adaora Okoye",
                        amount: "Q25,000",
                        status: "Completed",
                        commission: "Q22,500",
                        statusColor: "bg-green-100 text-green-800"
                      },
                      {
                        date: "May 27, 2025",
                        description: "Course Enrollment Payment",
                        course: "Clinical Diagnosis",
                        student: "Emeka Nwachukwu",
                        amount: "Q30,000",
                        status: "Completed",
                        commission: "Q27,000",
                        statusColor: "bg-green-100 text-green-800"
                      },
                      {
                        date: "May 26, 2025",
                        description: "Withdrawal Request",
                        course: "-",
                        student: "-",
                        amount: "Q150,000",
                        status: "Processing",
                        commission: "-Q150,000",
                        statusColor: "bg-yellow-100 text-yellow-800"
                      },
                      {
                        date: "May 25, 2025",
                        description: "Course Enrollment Payment",
                        course: "Anatomy 101",
                        student: "Fatima Ibrahim",
                        amount: "Q35,000",
                        status: "Completed",
                        commission: "Q31,500",
                        statusColor: "bg-green-100 text-green-800"
                      },                      {
                        date: "May 24, 2025",
                        description: "Platform Fee",
                        course: "-",
                        student: "-",
                        amount: "Q5,000",
                        status: "Completed",
                        commission: "-Q5,000",
                        statusColor: "bg-gray-100 text-gray-800"
                      },
                      {
                        date: "May 23, 2025",
                        description: "Course Enrollment Payment",
                        course: "Pharmacology",
                        student: "Samuel Adeleke",
                        amount: "Q28,000",
                        status: "Completed",
                        commission: "Q25,200",
                        statusColor: "bg-green-100 text-green-800"
                      },
                      {
                        date: "May 22, 2025",
                        description: "Refund Request",
                        course: "Medical Ethics",
                        student: "John Doe",
                        amount: "Q25,000",
                        status: "Refunded",
                        commission: "-Q22,500",
                        statusColor: "bg-red-100 text-red-800"
                      },
                      {
                        date: "May 21, 2025",
                        description: "Course Enrollment Payment",
                        course: "Clinical Diagnosis",
                        student: "Chioma Eze",
                        amount: "Q30,000",
                        status: "Completed",
                        commission: "Q27,000",
                        statusColor: "bg-green-100 text-green-800"
                      }
                    ].map((transaction, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {transaction.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          {transaction.description}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {transaction.course}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {transaction.student}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          {transaction.amount}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge className={transaction.statusColor}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.commission.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                            {transaction.commission}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing 1-8 of 156 transactions
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#D4AF37] text-black">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>          <TabsContent value="inbox" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-[#D4AF37]" />
                      Messages
                    </h3>
                    <Badge variant="secondary">12 new</Badge>
                  </div>
                </CardHeader>
                <CardContent compact className="p-0">
                  <div className="space-y-1">
                    {[
                      {
                        id: 1,
                        sender: "GLOHSEN Admin",
                        subject: "New Course Review Guidelines",
                        preview: "We've updated our course review...",
                        time: "2 hours ago",
                        unread: true,
                        type: "admin"
                      },
                      {
                        id: 2,
                        sender: "Adaora Okoye",
                        subject: "Question about Assignment 3",
                        preview: "Hi Dr. Nkechi, I have a question...",
                        time: "5 hours ago",
                        unread: true,
                        type: "student"
                      },
                      {
                        id: 3,
                        sender: "Lagos University Hospital",
                        subject: "Partnership Opportunity",
                        preview: "We would like to discuss a potential...",
                        time: "1 day ago",
                        unread: false,
                        type: "employer"
                      },
                      {
                        id: 4,
                        sender: "Emeka Nwachukwu",
                        subject: "Thank you for the feedback",
                        preview: "Your feedback on my case study...",
                        time: "2 days ago",
                        unread: false,
                        type: "student"
                      },
                      {
                        id: 5,
                        sender: "GLOHSEN Platform",
                        subject: "Monthly Performance Report",
                        preview: "Your teaching performance summary...",
                        time: "3 days ago",
                        unread: false,
                        type: "admin"
                      }
                    ].map((message) => (
                      <div 
                        key={message.id}
                        className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          message.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center">
                            <span className="font-medium text-sm">{message.sender}</span>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <div className="text-sm font-medium mb-1">{message.subject}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {message.preview}
                        </div>
                        <div className="mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              message.type === 'admin' ? 'border-purple-200 text-purple-700' :
                              message.type === 'student' ? 'border-blue-200 text-blue-700' :
                              'border-green-200 text-green-700'
                            }`}
                          >
                            {message.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Detail & Compose */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Message */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Question about Assignment 3</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">AO</AvatarFallback>
                    </Avatar>
                    <span className="mr-4">Adaora Okoye</span>
                    <span>5 hours ago</span>
                  </div>
                </CardHeader>
                <CardContent compact>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Hi Dr. Nkechi,
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      I hope this message finds you well. I have a question about Assignment 3 in the Medical Ethics course. 
                      I'm having difficulty understanding the ethical framework we should apply to the case study about patient autonomy.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Could you please provide some guidance on how to approach this? I want to make sure I'm analyzing it correctly.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Thank you for your time and guidance.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      Best regards,<br />
                      Adaora
                    </p>
                  </div>
                  
                  {/* Reply Section */}
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-medium mb-3">Reply to Adaora</h4>
                    <Textarea 
                      placeholder="Type your reply here..." 
                      className="min-h-[120px] mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                      <Button className="bg-[#D4AF37] text-black hover:bg-amber-500">
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <h3 className="text-lg font-bold">Quick Actions</h3>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="p-4 h-auto flex-col">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>Compose New Message</span>
                      <span className="text-xs opacity-75">Send to students or employers</span>
                    </Button>
                    <Button variant="outline" className="p-4 h-auto flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      <span>Group Message</span>
                      <span className="text-xs opacity-75">Message all course students</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feedback Section */}
          <Card size="xl" variant="default">
            <CardHeader compact>
              <h2 className="text-xl font-bold flex items-center">
                <Star className="mr-2 h-6 w-6 text-[#D4AF37]" />
                Student Feedback & Reviews
              </h2>
            </CardHeader>
            <CardContent compact>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Feedback Summary */}
                <div className="lg:col-span-1">
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">4.9</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Based on 124 reviews
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      {[
                        { stars: 5, count: 98, percentage: 79 },
                        { stars: 4, count: 20, percentage: 16 },
                        { stars: 3, count: 4, percentage: 3 },
                        { stars: 2, count: 2, percentage: 2 },
                        { stars: 1, count: 0, percentage: 0 }
                      ].map((rating, idx) => (
                        <div key={idx} className="flex items-center text-xs">
                          <span className="w-8">{rating.stars}★</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mx-2">
                            <div 
                              className="bg-amber-400 h-2 rounded-full"
                              style={{ width: `${rating.percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-right">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="lg:col-span-2">
                  <h3 className="font-bold mb-4">Recent Reviews</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {[
                      {
                        student: "Adaora Okoye",
                        course: "Medical Ethics",
                        rating: 5,
                        comment: "Dr. Nkechi's teaching style is exceptional. She makes complex ethical concepts easy to understand and provides real-world examples that help us apply the knowledge.",
                        date: "2 days ago"
                      },
                      {
                        student: "Emeka Nwachukwu",
                        course: "Clinical Diagnosis",
                        rating: 5,
                        comment: "Outstanding course content and delivery. The interactive sessions and case studies really helped me understand diagnostic procedures better.",
                        date: "1 week ago"
                      },
                      {
                        student: "Fatima Ibrahim",
                        course: "Anatomy 101",
                        rating: 4,
                        comment: "Very comprehensive course. Dr. Nkechi is patient and thorough in her explanations. The visual aids and diagrams are extremely helpful.",
                        date: "2 weeks ago"
                      },
                      {
                        student: "Samuel Adeleke",
                        course: "Pharmacology",
                        rating: 5,
                        comment: "The best pharmacology course I've taken. Dr. Nkechi breaks down complex drug interactions in a way that's easy to remember and apply.",
                        date: "3 weeks ago"
                      }
                    ].map((review, idx) => (
                      <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{review.student}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{review.course}</div>
                          </div>
                          <div className="text-right">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <div className="text-xs text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent></Tabs>
      </div>
    </div>
  );
};

export default TutorDashboard;
