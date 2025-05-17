
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  Search,
  Filter,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  ArrowUpRight,
  PieChart,
  BarChart
} from "lucide-react";

const EmployerDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("month");
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your hiring metrics report has been downloaded."
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
                Hospital Y Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Managing your healthcare staffing needs
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link to="/employer-criteria">
                <Button className="bg-red-600 hover:bg-red-700">Post a Job</Button>
              </Link>
              <Link to="/job-board">
                <Button variant="outline">View Candidates</Button>
              </Link>
            </div>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                    <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Active Job Posts</h3>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-blue-600">3 closing soon</p>
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
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Total Applications</h3>
                  <p className="text-2xl font-bold">87</p>
                  <p className="text-xs text-amber-600">24 new this week</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Positions Filled</h3>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-green-600">+2 from last month</p>
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
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Avg. GLOHSEN Score</h3>
                  <p className="text-2xl font-bold">172</p>
                  <p className="text-xs text-purple-600">High quality candidates</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="candidates" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="candidates" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Candidates
              </TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="candidates">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Top Candidates</span>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by job" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Positions</SelectItem>
                            <SelectItem value="doctor">ER Physician</SelectItem>
                            <SelectItem value="nurse">Registered Nurse</SelectItem>
                            <SelectItem value="tech">Medical Technician</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardTitle>
                      <CardDescription>Based on your criteria score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topCandidates.map((candidate) => (
                          <div key={candidate.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-amber-500">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="font-bold text-lg">{candidate.name}</h3>
                                <div className="flex items-center">
                                  <Badge className="mr-2 bg-amber-500">{candidate.score.toLocaleString()}</Badge>
                                  <Badge variant="outline">{candidate.position}</Badge>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-400 gap-2 sm:gap-4 mb-3">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 mr-1 text-amber-500" />
                                  <span>GLOHSEN: {candidate.glohsenScore}/200</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{candidate.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{candidate.availability}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {candidate.skills.map((skill, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View Profile</Button>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">Contact</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline">View All Candidates</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Candidate Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Search candidates..." className="pl-10" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Quick Filters</p>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Filter className="h-3 w-3" />
                              High GLOHSEN Score
                            </Button>
                            <Button variant="outline" size="sm">Doctors</Button>
                            <Button variant="outline" size="sm">Nurses</Button>
                            <Button variant="outline" size="sm">Available Now</Button>
                          </div>
                        </div>
                        <Link to="/employer-criteria">
                          <Button className="w-full mt-2">Advanced Search</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Hires</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentHires.map((hire, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={hire.avatar} alt={hire.name} />
                              <AvatarFallback>{hire.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{hire.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{hire.position}</p>
                            </div>
                            <Badge className={
                              hire.status === "Active" ? "bg-green-500" : 
                              hire.status === "Pending" ? "bg-amber-500" : 
                              "bg-gray-500"
                            }>
                              {hire.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs">
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Active Job Postings</span>
                      <Link to="/employer-criteria">
                        <Button className="bg-red-600 hover:bg-red-700">Post New Job</Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-2">Position</th>
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Applications</th>
                            <th className="text-left p-2">Posted Date</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobListings.map((job) => (
                            <tr key={job.id} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="p-2 font-medium">{job.position}</td>
                              <td className="p-2">{job.type}</td>
                              <td className="p-2">{job.applications}</td>
                              <td className="p-2">{job.postedDate}</td>
                              <td className="p-2">
                                <Badge className={
                                  job.status === "Active" ? "bg-green-500" :
                                  job.status === "Closing Soon" ? "bg-amber-500" :
                                  job.status === "Draft" ? "bg-gray-500" :
                                  "bg-blue-500"
                                }>
                                  {job.status}
                                </Badge>
                              </td>
                              <td className="p-2">
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Edit</Button>
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Hiring Metrics</CardTitle>
                      <CardDescription>Track your recruitment performance</CardDescription>
                    </div>
                    <Select value={timeframe} onValueChange={setTimeframe}>
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
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Time to Fill</span>
                          <span className="text-gray-500">Avg. 18 days</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Application to Interview Rate</span>
                          <span className="text-gray-500">32%</span>
                        </div>
                        <Progress value={32} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Interview to Hire Rate</span>
                          <span className="text-gray-500">24%</span>
                        </div>
                        <Progress value={24} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Candidate Experience Rating</span>
                          <span className="text-gray-500">4.6/5</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleDownloadReport} className="mt-6 w-full flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" /> Download Full Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle>Candidate Sources</CardTitle>
                    <CardDescription>Where your candidates are coming from</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span>GLOHSEN Direct</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">65%</span>
                          <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span>Referrals</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">20%</span>
                          <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span>External Job Boards</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">12%</span>
                          <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Social Media</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold">3%</span>
                          <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="flex items-center mx-2">
                          <PieChart className="h-5 w-5 text-red-600 mr-1" />
                          <span className="text-sm">Pie Chart</span>
                        </div>
                        <div className="flex items-center mx-2">
                          <BarChart className="h-5 w-5 text-red-600 mr-1" />
                          <span className="text-sm">Bar Chart</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-2">View Detailed Analytics</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg lg:col-span-2">
                  <CardHeader>
                    <CardTitle>GLOHSEN Score Distribution</CardTitle>
                    <CardDescription>
                      Score distribution of your applicants compared to global average
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 flex items-center justify-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Score distribution chart would go here
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Employer Profile</CardTitle>
                    <CardDescription>
                      Update your organization details visible to potential candidates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Organization Name</label>
                          <Input defaultValue="Hospital Y" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Industry</label>
                          <Select defaultValue="healthcare">
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="pharmacy">Pharmacy</SelectItem>
                              <SelectItem value="medical-device">Medical Devices</SelectItem>
                              <SelectItem value="biotech">Biotech</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Organization Description</label>
                        <textarea 
                          className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800"
                          defaultValue="Hospital Y is a leading healthcare provider dedicated to delivering exceptional patient care through our talented team of professionals."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Input defaultValue="New York, NY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Website</label>
                          <Input defaultValue="https://hospital-y.example.com" />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button className="bg-red-600 hover:bg-red-700">Save Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Default Criteria Settings</CardTitle>
                      <CardDescription>
                        Set default weights for candidate criteria
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Link to="/employer-criteria">
                          <Button className="w-full">Modify Criteria Weights</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>New Applications</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Candidate Messages</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Job Post Expiring</span>
                          <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Weekly Summaries</span>
                          <input type="checkbox" className="toggle toggle-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Sample data
const topCandidates = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    position: "ER Physician",
    glohsenScore: 180,
    score: 894567234, // Employer criteria score
    location: "New York, NY",
    availability: "Available Now",
    skills: ["Emergency Medicine", "Trauma Care", "Pediatrics", "Critical Care", "BLS/ACLS Certified"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    position: "Cardiologist",
    glohsenScore: 175,
    score: 768392105,
    location: "Boston, MA",
    availability: "2 Weeks Notice",
    skills: ["Cardiology", "Interventional", "Echocardiography", "Research", "Teaching"]
  },
  {
    id: 3,
    name: "Nurse Aisha Patel",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    position: "ICU Nurse",
    glohsenScore: 168,
    score: 738291547,
    location: "Chicago, IL",
    availability: "Available Now",
    skills: ["Critical Care", "Ventilator Management", "Medication Administration", "Patient Assessment"]
  }
];

const recentHires = [
  {
    name: "Dr. Robert Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    position: "Neurologist",
    status: "Active"
  },
  {
    name: "Nurse Jessica Adams",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    position: "ER Nurse",
    status: "Pending"
  },
  {
    name: "Dr. David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    position: "Radiologist",
    status: "Active"
  }
];

const jobListings = [
  {
    id: 1,
    position: "Emergency Room Physician",
    type: "Full-time",
    applications: 28,
    postedDate: "May 5, 2025",
    status: "Active"
  },
  {
    id: 2,
    position: "Registered Nurse - ICU",
    type: "Full-time",
    applications: 42,
    postedDate: "May 8, 2025",
    status: "Active"
  },
  {
    id: 3,
    position: "Cardiology Specialist",
    type: "Part-time",
    applications: 15,
    postedDate: "May 10, 2025",
    status: "Closing Soon"
  },
  {
    id: 4,
    position: "Medical Technician",
    type: "Contract",
    applications: 11,
    postedDate: "May 12, 2025",
    status: "Active"
  },
  {
    id: 5,
    position: "Pediatric Nurse",
    type: "Full-time",
    applications: 0,
    postedDate: "Not Posted",
    status: "Draft"
  }
];

export default EmployerDashboard;
