import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, Book, Calendar, CreditCard, BookOpen, GraduationCap, 
  Clock, BarChart2, PieChart, Users, Medal, Send, FileText
} from 'lucide-react';
import { Link } from "react-router-dom";
import PreHeader from '../components/PreHeader';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample GLOHSEN Score data
  const glohsenScore = {
    total: 132,
    maxPossible: 200,
    categories: [
      { name: "Academic Performance", score: 18, maxScore: 25 },
      { name: "Skill Assessments", score: 22, maxScore: 30 },
      { name: "Course Completion", score: 14, maxScore: 20 },
      { name: "Practice Hours", score: 16, maxScore: 25 },
      { name: "Peer Reviews", score: 13, maxScore: 20 },
      { name: "Research & Projects", score: 12, maxScore: 20 },
      { name: "Professional Development", score: 20, maxScore: 30 },
      { name: "Industry Certifications", score: 17, maxScore: 30 },
    ],
  };

  // Sample enrolled courses data
  const enrolledCourses = [
    { 
      id: 1, 
      title: "Advanced Cardiac Life Support", 
      instructor: "Dr. Sarah Williams", 
      progress: 75, 
      nextLesson: "Pharmacology of Cardiac Drugs",
      dueDate: "May 15, 2025"
    },
    { 
      id: 2, 
      title: "Clinical Skills for Nurses", 
      instructor: "Prof. Mark Johnson", 
      progress: 40, 
      nextLesson: "Venipuncture Techniques",
      dueDate: "May 22, 2025"
    },
    { 
      id: 3, 
      title: "Medical Ethics and Law", 
      instructor: "Dr. Patricia Chen", 
      progress: 90, 
      nextLesson: "Final Assessment",
      dueDate: "May 10, 2025"
    },
    { 
      id: 4, 
      title: "Anatomy and Physiology", 
      instructor: "Dr. Robert Miller", 
      progress: 60, 
      nextLesson: "Nervous System Part 2",
      dueDate: "May 18, 2025"
    },
  ];

  // Sample upcoming assignments data
  const upcomingAssignments = [
    { id: 1, title: "Case Study Analysis", course: "Advanced Cardiac Life Support", dueDate: "May 15, 2025", status: "Pending" },
    { id: 2, title: "Clinical Skills Assessment", course: "Clinical Skills for Nurses", dueDate: "May 16, 2025", status: "Pending" },
    { id: 3, title: "Ethics Final Paper", course: "Medical Ethics and Law", dueDate: "May 10, 2025", status: "Pending" },
    { id: 4, title: "Anatomy Quiz", course: "Anatomy and Physiology", dueDate: "May 12, 2025", status: "Pending" },
  ];

  // Sample achievements data
  const achievements = [
    { id: 1, name: "First Aid Master", description: "Completed First Aid certification with distinction", date: "Apr 2025", icon: <Medal className="h-8 w-8 text-amber-500" /> },
    { id: 2, name: "Knowledge Explorer", description: "Completed 10 courses", date: "Mar 2025", icon: <BookOpen className="h-8 w-8 text-blue-500" /> },
    { id: 3, name: "Team Player", description: "Participated in 5 group projects", date: "Feb 2025", icon: <Users className="h-8 w-8 text-green-500" /> },
    { id: 4, name: "Perfect Attendance", description: "Attended all scheduled sessions for a semester", date: "Jan 2025", icon: <Calendar className="h-8 w-8 text-purple-500" /> },
  ];

  // Sample discussion forum data
  const recentDiscussions = [
    { id: 1, title: "Understanding ECG Interpretation", author: "James Wilson", replies: 12, lastActivity: "2 hours ago" },
    { id: 2, title: "Ethical Dilemmas in Emergency Care", author: "Emma Thompson", replies: 8, lastActivity: "Yesterday" },
    { id: 3, title: "Study Group for Pharmacology Exam", author: "Michael Garcia", replies: 15, lastActivity: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="student dashboard" />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Alex Johnson</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">4</span>
            </div>
            <button className="flex items-center bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Credits: 45</span>
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 max-w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              {/* GLOHSEN Score Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your GLOHSEN Score</CardTitle>
                      <CardDescription>Updated 5 days ago</CardDescription>
                    </div>
                    <div className="rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 px-4 py-2 text-lg font-bold">
                      {glohsenScore.total}/{glohsenScore.maxPossible}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={(glohsenScore.total / glohsenScore.maxPossible) * 100} className="h-3 mb-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {glohsenScore.categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm">{category.name}</p>
                          <Progress 
                            value={(category.score / category.maxScore) * 100} 
                            className="h-2 w-40 md:w-60" 
                          />
                        </div>
                        <span className="font-semibold">{category.score}/{category.maxScore}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Enrolled Courses Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Your active courses and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Instructor: {course.instructor}</p>
                          </div>
                          <Badge className="mt-2 md:mt-0">
                            Next due: {course.dueDate}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Next lesson:</span> {course.nextLesson}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/courses">View All Courses</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                  <CardDescription>Assignments due soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3">Title</th>
                          <th className="pb-3">Course</th>
                          <th className="pb-3">Due Date</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAssignments.slice(0, 3).map((assignment) => (
                          <tr key={assignment.id} className="border-b">
                            <td className="py-3">{assignment.title}</td>
                            <td className="py-3">{assignment.course}</td>
                            <td className="py-3">{assignment.dueDate}</td>
                            <td className="py-3">
                              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                                {assignment.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-gray-50 dark:bg-gray-800 border">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
                              {achievement.icon}
                            </div>
                            <h3 className="font-medium">{achievement.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {achievement.description}
                            </p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {achievement.date}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>All your current courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Instructor: {course.instructor}</p>
                          </div>
                          <div className="mt-2 md:mt-0 space-x-2">
                            <Badge>
                              Due: {course.dueDate}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {course.progress}% Complete
                            </Badge>
                          </div>
                        </div>
                        <div className="mb-3">
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                            <span className="font-medium">Next lesson:</span> {course.nextLesson}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View Materials</Button>
                            <Button size="sm">Continue Learning</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button className="bg-red-600 hover:bg-red-700" asChild>
                      <Link to="/courses">Browse More Courses</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <CardTitle>Assignments & Assessments</CardTitle>
                      <CardDescription>Track your assignments and due dates</CardDescription>
                    </div>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                      <Button variant="outline" size="sm">Filter</Button>
                      <Input className="w-[200px]" placeholder="Search assignments..." />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3">Title</th>
                          <th className="pb-3">Course</th>
                          <th className="pb-3">Due Date</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAssignments.map((assignment) => (
                          <tr key={assignment.id} className="border-b">
                            <td className="py-3">{assignment.title}</td>
                            <td className="py-3">{assignment.course}</td>
                            <td className="py-3">{assignment.dueDate}</td>
                            <td className="py-3">
                              <Badge variant={
                                assignment.status === "Completed" ? "outline" : 
                                assignment.status === "In Progress" ? "secondary" : 
                                "outline"
                              } className={
                                assignment.status === "Completed" ? "bg-green-100 text-green-800" : 
                                assignment.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                "bg-amber-100 text-amber-800"
                              }>
                                {assignment.status}
                              </Badge>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button size="sm">Submit</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="mr-2">Previous</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Performance Analytics</CardTitle>
                          <CardDescription>Your academic progress over time</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">This Semester</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart2 className="h-12 w-12 mx-auto mb-2 opacity-40" />
                        <p className="text-lg">Performance chart would display here</p>
                        <p className="text-xs">Showing trends in your course scores and assessments</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Time Distribution</CardTitle>
                      <CardDescription>How you allocate your study time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <PieChart className="h-12 w-12 mx-auto mb-2 opacity-40" />
                        <p className="text-lg">Time allocation chart would display here</p>
                        <p className="text-xs">Showing distribution across different courses and activities</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Assessment</CardTitle>
                      <CardDescription>Your competency levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Clinical Skills</span>
                            <span className="text-gray-500">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Medical Knowledge</span>
                            <span className="text-gray-500">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Patient Communication</span>
                            <span className="text-gray-500">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Critical Thinking</span>
                            <span className="text-gray-500">80%</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Research Capability</span>
                            <span className="text-gray-500">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full">Take Skill Assessment</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Study Time Log</CardTitle>
                      <CardDescription>Your recent study activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium">Cardiac Physiology</div>
                              <div className="text-xs text-gray-500">Yesterday</div>
                            </div>
                          </div>
                          <Badge variant="outline">2.5 hrs</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium">Ethics Case Studies</div>
                              <div className="text-xs text-gray-500">2 days ago</div>
                            </div>
                          </div>
                          <Badge variant="outline">1.5 hrs</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium">Practical Assessment</div>
                              <div className="text-xs text-gray-500">3 days ago</div>
                            </div>
                          </div>
                          <Badge variant="outline">3 hrs</Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">Log Study Time</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <CardTitle>Discussion Forums</CardTitle>
                          <CardDescription>Engage with your learning community</CardDescription>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Input className="w-full md:w-[200px]" placeholder="Search discussions..." />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentDiscussions.map((discussion) => (
                          <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <h3 className="font-semibold">{discussion.title}</h3>
                              <div className="text-sm text-gray-500 mt-1 md:mt-0">
                                {discussion.lastActivity}
                              </div>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <span>Started by: {discussion.author}</span>
                              <Badge className="ml-2" variant="outline">{discussion.replies} replies</Badge>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button variant="outline" size="sm">View Discussion</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-between">
                        <Button variant="outline">View All Discussions</Button>
                        <Button className="bg-red-600 hover:bg-red-700">
                          Start New Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Study Groups</CardTitle>
                      <CardDescription>Connect with peers for collaborative learning</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border">
                          <CardContent className="p-4">
                            <h3 className="font-semibold">Cardiac Care Study Group</h3>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span>12 members</span>
                            </div>
                            <div className="mt-3">
                              <Badge>Weekly on Tuesdays</Badge>
                            </div>
                            <Button className="w-full mt-3" variant="outline" size="sm">
                              Join Group
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="border">
                          <CardContent className="p-4">
                            <h3 className="font-semibold">Medical Ethics Discussion</h3>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span>8 members</span>
                            </div>
                            <div className="mt-3">
                              <Badge>Bi-weekly on Fridays</Badge>
                            </div>
                            <Button className="w-full mt-3" variant="outline" size="sm">
                              Join Group
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full" variant="outline">
                          Create Study Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Mentors</CardTitle>
                      <CardDescription>Connect with your academic advisors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://randomuser.me/api/portraits/women/76.jpg" />
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">Dr. Sarah Williams</div>
                            <div className="text-xs text-gray-500">Cardiac Specialist</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                            <AvatarFallback>RM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">Prof. Robert Miller</div>
                            <div className="text-xs text-gray-500">Academic Advisor</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Resources</CardTitle>
                      <CardDescription>Access study materials and guides</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <Book className="h-5 w-5 text-amber-500 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium">Clinical Skills Handbook</div>
                            <div className="text-xs text-gray-500">PDF, 4.2 MB</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <Book className="h-5 w-5 text-blue-500 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium">Medical Terminology Guide</div>
                            <div className="text-xs text-gray-500">PDF, 3.8 MB</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <Book className="h-5 w-5 text-green-500 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium">Ethics Case Studies</div>
                            <div className="text-xs text-gray-500">PDF, 2.5 MB</div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full" variant="outline">
                          Browse Resource Library
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Educational events and webinars</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="font-medium">Advanced Cardiac Life Support Workshop</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            May 20, 2025 • 2:00 PM
                          </div>
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">
                              Registration Open
                            </Badge>
                          </div>
                        </div>
                        <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="font-medium">Medical Ethics Symposium</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            June 5, 2025 • 10:00 AM
                          </div>
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Coming Soon
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
