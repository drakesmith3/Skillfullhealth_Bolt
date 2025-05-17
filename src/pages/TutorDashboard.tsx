
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  Video,
  Calendar,
  BarChart,
  Clock,
  Plus,
  PlaySquare,
  MessageCircle,
  FileText,
  Upload,
  TrendingUp
} from "lucide-react";

const TutorDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("month");
  
  const handleCreateCourse = () => {
    toast({
      title: "Course creation started",
      description: "You've begun creating a new course."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Welcome, Dr. Elizabeth
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your courses and student interactions
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateCourse}>
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
              <Link to="/courses">
                <Button variant="outline">View All Courses</Button>
              </Link>
            </div>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Active Courses</h3>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-blue-600">1 pending review</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-100 dark:bg-amber-900 p-2 rounded-md">
                    <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Active Students</h3>
                  <p className="text-2xl font-bold">248</p>
                  <p className="text-xs text-amber-600">+32 this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</h3>
                  <p className="text-2xl font-bold">$3,847</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md">
                    <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Average Rating</h3>
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-xs text-purple-600">Based on 127 reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="courses" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="courses" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Courses
              </TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Students
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Your Courses</CardTitle>
                      <CardDescription>
                        Manage your published and draft courses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {courses.map((course) => (
                        <div key={course.id} className="mb-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative md:w-1/3">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                              <div className="absolute bottom-2 left-2">
                                <Badge className={
                                  course.status === "Live" ? "bg-green-500" : 
                                  course.status === "Draft" ? "bg-gray-500" : 
                                  "bg-amber-500"
                                }>
                                  {course.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4 md:w-2/3">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                <h3 className="font-bold text-lg">{course.title}</h3>
                                <div className="flex items-center mt-1 md:mt-0">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                  <span className="ml-1">{course.rating} ({course.reviews} reviews)</span>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                {course.description}
                              </p>
                              <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{course.students} students</span>
                                </div>
                                <div className="flex items-center">
                                  <Video className="h-3 w-3 mr-1" />
                                  <span>{course.lessons} lessons</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  <span>${course.price}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap justify-end gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Analytics</Button>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">Manage Content</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-6 text-center">
                        <Button onClick={handleCreateCourse} className="bg-red-600 hover:bg-red-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingSessions.map((session, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Calendar className="h-10 w-10 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium">{session.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{session.time}</p>
                              <div className="flex items-center mt-1 text-sm">
                                <Users className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">{session.attendees} attendees</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View All Sessions
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Course Ideas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span>Advanced Physiology</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            High Demand
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span>Medical Ethics</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            High Demand
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-amber-500 mr-2" />
                            <span>Surgical Techniques</span>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            Medium Demand
                          </Badge>
                        </div>
                        <Input placeholder="Add your course idea..." className="mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="flex items-center justify-center flex-col h-24">
                          <Upload className="h-6 w-6 mb-1" />
                          <span>Upload Video</span>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center flex-col h-24">
                          <FileText className="h-6 w-6 mb-1" />
                          <span>Create Quiz</span>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center flex-col h-24">
                          <Calendar className="h-6 w-6 mb-1" />
                          <span>Schedule Session</span>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center flex-col h-24">
                          <MessageCircle className="h-6 w-6 mb-1" />
                          <span>Send Update</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="students">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Students</CardTitle>
                          <CardDescription>
                            Students enrolled in your courses
                          </CardDescription>
                        </div>
                        <div className="relative">
                          <Input placeholder="Search students..." className="w-[200px]" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left p-2">Student</th>
                              <th className="text-left p-2">Course</th>
                              <th className="text-left p-2">Progress</th>
                              <th className="text-left p-2">Last Active</th>
                              <th className="text-left p-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student) => (
                              <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="p-2">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={student.avatar} />
                                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{student.name}</span>
                                  </div>
                                </td>
                                <td className="p-2">{student.course}</td>
                                <td className="p-2">
                                  <div className="flex items-center gap-2">
                                    <Progress value={student.progress} className="h-2 w-24" />
                                    <span className="text-sm">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="p-2 text-gray-600 dark:text-gray-400 text-sm">{student.lastActive}</td>
                                <td className="p-2">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Message</Button>
                                    <Button variant="outline" size="sm">View</Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-6 flex justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Showing 1-10 of 248 students
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" disabled>Previous</Button>
                          <Button variant="outline" size="sm">Next</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Student Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Completion Rate</span>
                            <span className="text-gray-500">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Quiz Participation</span>
                            <span className="text-gray-500">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Discussion Activity</span>
                            <span className="text-gray-500">64%</span>
                          </div>
                          <Progress value={64} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentQuestions.map((question, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{question.student}</span>
                              <span className="text-xs text-gray-500">{question.time}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{question.question}</p>
                            <div className="flex justify-end mt-2">
                              <Button variant="outline" size="sm">Reply</Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          View All Questions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Upcoming Schedule</CardTitle>
                          <CardDescription>
                            Your scheduled live sessions and office hours
                          </CardDescription>
                        </div>
                        <Button variant="outline" className="flex items-center">
                          <Plus className="h-4 w-4 mr-1" />
                          Schedule Session
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px] flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                          <p>Calendar view would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Today's Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {todaysSessions.map((session, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{session.title}</span>
                              <Badge className={
                                session.status === "Upcoming" ? "bg-amber-500" : 
                                session.status === "Live" ? "bg-green-500" : 
                                "bg-gray-500"
                              }>
                                {session.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{session.time}</div>
                            <div className="flex items-center text-sm mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{session.attendees} attendees</span>
                            </div>
                            <div className="flex justify-end mt-2">
                              {session.status === "Upcoming" ? (
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">Start Session</Button>
                              ) : session.status === "Live" ? (
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">Join Now</Button>
                              ) : (
                                <Button variant="outline" size="sm">View Recording</Button>
                              )}
                            </div>
                          </div>
                        ))}
                        {todaysSessions.length === 0 && (
                          <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                            No sessions scheduled for today
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Office Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {officeHours.map((hour, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{hour.day}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{hour.time}</div>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        ))}
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Office Hours
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Session Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="font-medium">Interactive Q&A</div>
                            <div className="text-xs text-gray-500">60 minutes</div>
                          </div>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="font-medium">Case Study Analysis</div>
                            <div className="text-xs text-gray-500">45 minutes</div>
                          </div>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="font-medium">Exam Review</div>
                            <div className="text-xs text-gray-500">90 minutes</div>
                          </div>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Revenue Analytics</CardTitle>
                        <CardDescription>
                          Your earnings over time
                        </CardDescription>
                      </div>
                      <Select defaultValue={timeframe}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Weekly</SelectItem>
                          <SelectItem value="month">Monthly</SelectItem>
                          <SelectItem value="quarter">Quarterly</SelectItem>
                          <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <BarChart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                        <p>Revenue chart would go here</p>
                        <p className="text-sm">$3,847 this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>
                      Enrollment and completion statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-2">Course</th>
                            <th className="text-center p-2">Students</th>
                            <th className="text-center p-2">Completion</th>
                            <th className="text-center p-2">Rating</th>
                            <th className="text-center p-2">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.filter(c => c.status === "Live").map((course) => (
                            <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="p-2 font-medium">{course.title}</td>
                              <td className="p-2 text-center">{course.students}</td>
                              <td className="p-2 text-center">{course.completionRate}%</td>
                              <td className="p-2 text-center">
                                <div className="flex items-center justify-center">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                                  <span>{course.rating}</span>
                                </div>
                              </td>
                              <td className="p-2 text-center">${course.revenue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Student Demographics</CardTitle>
                    <CardDescription>
                      Who your students are and where they're from
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <BarChart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                        <p>Demographics chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Content Engagement</CardTitle>
                    <CardDescription>
                      Which content is most engaging to students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-2">Content</th>
                            <th className="text-center p-2">Course</th>
                            <th className="text-center p-2">Views</th>
                            <th className="text-center p-2">Avg. Time</th>
                            <th className="text-center p-2">Completion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topContent.map((content, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="p-2 font-medium">{content.title}</td>
                              <td className="p-2 text-center">{content.course}</td>
                              <td className="p-2 text-center">{content.views}</td>
                              <td className="p-2 text-center">{content.avgTime}</td>
                              <td className="p-2 text-center">{content.completionRate}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Sample data
const courses = [
  {
    id: 1,
    title: "ClotQuest: Master the Clotting Cascade",
    description: "An interactive course on understanding the coagulation pathways with gamified lessons.",
    thumbnail: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=600&h=400",
    status: "Live",
    rating: 4.9,
    reviews: 78,
    students: 124,
    lessons: 12,
    duration: "6 hours",
    price: 79,
    revenue: 9,826,
    completionRate: 86
  },
  {
    id: 2,
    title: "Advanced Cardiac Life Support (ACLS)",
    description: "Comprehensive training in managing adult cardiac arrest and cardiovascular emergencies.",
    thumbnail: "https://images.unsplash.com/photo-1631815587646-b85a51add42e?auto=format&fit=crop&q=80&w=600&h=400",
    status: "Live",
    rating: 4.8,
    reviews: 42,
    students: 87,
    lessons: 15,
    duration: "16 hours",
    price: 299,
    revenue: 15,548,
    completionRate: 92
  },
  {
    id: 3,
    title: "Medical Ethics and Professionalism",
    description: "Explore contemporary ethical issues in healthcare practice with case studies and discussions.",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400",
    status: "Draft",
    rating: 0,
    reviews: 0,
    students: 0,
    lessons: 10,
    duration: "10 hours",
    price: 149,
    revenue: 0,
    completionRate: 0
  }
];

const students = [
  {
    id: 1,
    name: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    course: "ClotQuest: Master the Clotting Cascade",
    progress: 78,
    lastActive: "Today, 2:45 PM"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    course: "Advanced Cardiac Life Support (ACLS)",
    progress: 32,
    lastActive: "Yesterday, 11:20 AM"
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    course: "ClotQuest: Master the Clotting Cascade",
    progress: 100,
    lastActive: "May 15, 2025, 3:12 PM"
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    course: "Advanced Cardiac Life Support (ACLS)",
    progress: 65,
    lastActive: "Today, 9:30 AM"
  },
  {
    id: 5,
    name: "Robert Wilson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    course: "ClotQuest: Master the Clotting Cascade",
    progress: 45,
    lastActive: "Today, 11:45 AM"
  },
];

const upcomingSessions = [
  {
    title: "Clotting Cascade Live Q&A",
    time: "Today, 4:00 PM - 5:00 PM",
    attendees: 18
  },
  {
    title: "ACLS Case Studies",
    time: "Tomorrow, 11:00 AM - 12:30 PM",
    attendees: 24
  },
  {
    title: "One-on-One Mentoring: Sarah Johnson",
    time: "May 18, 2:00 PM - 2:30 PM",
    attendees: 1
  }
];

const todaysSessions = [
  {
    title: "ACLS Protocol Review",
    time: "10:00 AM - 11:30 AM",
    status: "Completed",
    attendees: 32
  },
  {
    title: "Clotting Cascade Live Q&A",
    time: "4:00 PM - 5:00 PM",
    status: "Upcoming",
    attendees: 18
  }
];

const recentQuestions = [
  {
    student: "John Smith",
    time: "2 hours ago",
    question: "In the clotting cascade, what's the difference between intrinsic and extrinsic pathways?"
  },
  {
    student: "Emily Davis",
    time: "Yesterday",
    question: "Can you explain how Factor VIII works in the coagulation process?"
  },
  {
    student: "Michael Chen",
    time: "2 days ago",
    question: "How do direct oral anticoagulants (DOACs) differ from traditional anticoagulants?"
  }
];

const officeHours = [
  {
    day: "Monday",
    time: "1:00 PM - 3:00 PM"
  },
  {
    day: "Wednesday",
    time: "10:00 AM - 12:00 PM"
  },
  {
    day: "Friday",
    time: "2:00 PM - 4:00 PM"
  }
];

const topContent = [
  {
    title: "Intrinsic vs. Extrinsic Pathways",
    course: "ClotQuest",
    views: 239,
    avgTime: "14:22",
    completionRate: 94
  },
  {
    title: "ACLS Medication Review",
    course: "ACLS",
    views: 187,
    avgTime: "11:45",
    completionRate: 89
  },
  {
    title: "Clinical Case: Acute MI",
    course: "ACLS",
    views: 156,
    avgTime: "18:32",
    completionRate: 82
  },
  {
    title: "Factor VIII and Hemophilia",
    course: "ClotQuest",
    views: 142,
    avgTime: "9:17",
    completionRate: 91
  }
];

export default TutorDashboard;
