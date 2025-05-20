
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, Users, CreditCard, ChartBar, Calendar, 
  Search, FileCheck, MessageCircle, User, Filter, Clock 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const EmployerDashboardPage: React.FC = () => {
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
      <PreHeader currentPage="employer dashboard" userName="Lagos General Hospital" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, Lagos General Hospital!</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Professionals
              </Button>
              <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                Post New Job
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Job Posts</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <FileCheck className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hired Professionals</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget Used</p>
                  <p className="text-2xl font-bold">₦2.5M</p>
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
              <TabsTrigger value="jobs" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" /> Job Listings
              </TabsTrigger>
              <TabsTrigger value="candidates" className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Candidates
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" /> Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Recruitment Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Recent Job Posts</h3>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Emergency Department Physician", type: "30-day Locum", applicants: 8, status: "Open", urgency: "High" },
                        { title: "Medical Officer", type: "14-day Locum", applicants: 12, status: "Open", urgency: "Medium" },
                        { title: "General Practitioner", type: "365-day Locum", applicants: 5, status: "Under Review", urgency: "Low" }
                      ].map((job, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{job.title}</h4>
                            <Badge className={
                              job.urgency === "High" ? "bg-red-100 text-red-800" :
                              job.urgency === "Medium" ? "bg-amber-100 text-amber-800" :
                              "bg-green-100 text-green-800"
                            }>
                              {job.urgency} Priority
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-600">{job.type}</span>
                            <span>{job.applicants} Applicants</span>
                          </div>
                          
                          <Button size="sm" variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Application Statistics</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Applications by Job Type</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>14-day Locum</span>
                              <span>12 applicants</span>
                            </div>
                            <Progress value={40} className="h-2 bg-blue-100">
                              <div className="h-full bg-blue-500"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>30-day Locum</span>
                              <span>8 applicants</span>
                            </div>
                            <Progress value={27} className="h-2 bg-green-100">
                              <div className="h-full bg-green-500"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>365-day Locum</span>
                              <span>5 applicants</span>
                            </div>
                            <Progress value={17} className="h-2 bg-amber-100">
                              <div className="h-full bg-amber-500"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Other</span>
                              <span>3 applicants</span>
                            </div>
                            <Progress value={10} className="h-2 bg-gray-100">
                              <div className="h-full bg-gray-500"></div>
                            </Progress>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">GLOHSEN Score Distribution</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>90 - 100</span>
                              <span>5 applicants</span>
                            </div>
                            <Progress value={18} className="h-2 bg-[#D4AF37]/20">
                              <div className="h-full bg-[#D4AF37]"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>80 - 89</span>
                              <span>12 applicants</span>
                            </div>
                            <Progress value={43} className="h-2 bg-[#D4AF37]/20">
                              <div className="h-full bg-[#D4AF37]"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>70 - 79</span>
                              <span>8 applicants</span>
                            </div>
                            <Progress value={29} className="h-2 bg-[#D4AF37]/20">
                              <div className="h-full bg-[#D4AF37]"></div>
                            </Progress>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>< 70</span>
                              <span>3 applicants</span>
                            </div>
                            <Progress value={10} className="h-2 bg-[#D4AF37]/20">
                              <div className="h-full bg-[#D4AF37]"></div>
                            </Progress>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Recent Candidate Activities</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-sm">
                      <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                          <th className="py-3 px-4 text-left font-medium">Candidate</th>
                          <th className="py-3 px-4 text-left font-medium">Position</th>
                          <th className="py-3 px-4 text-left font-medium">Activity</th>
                          <th className="py-3 px-4 text-left font-medium">Time</th>
                          <th className="py-3 px-4 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 text-sm">
                        {[
                          { name: "Dr. Adewale Johnson", avatar: "AJ", position: "Emergency Physician", activity: "Submitted application", time: "2 hours ago" },
                          { name: "Dr. Chioma Okafor", avatar: "CO", position: "Medical Officer", activity: "Viewed interview invitation", time: "Yesterday" },
                          { name: "Dr. Emmanuel Okonkwo", avatar: "EO", position: "General Practitioner", activity: "Accepted offer", time: "2 days ago" }
                        ].map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{item.avatar}</AvatarFallback>
                                </Avatar>
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{item.position}</td>
                            <td className="py-3 px-4">{item.activity}</td>
                            <td className="py-3 px-4">{item.time}</td>
                            <td className="py-3 px-4">
                              <Button size="sm" variant="outline">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-bold">Job Listings</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <div className="relative">
                      <Input placeholder="Search jobs..." className="pl-9" />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                      New Job Post
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: "JD-5621", title: "Emergency Department Physician", type: "30-day Locum", location: "Lagos", salary: "₦950,000", status: "Active", applicants: 8, posted: "5 days ago", urgent: true },
                    { id: "JD-5598", title: "Medical Officer", type: "14-day Locum", location: "Lagos", salary: "₦450,000", status: "Active", applicants: 12, posted: "1 week ago", urgent: false },
                    { id: "JD-5587", title: "General Practitioner", type: "365-day Locum", location: "Lagos", salary: "₦12,000,000", status: "Under Review", applicants: 5, posted: "2 weeks ago", urgent: false },
                    { id: "JD-5574", title: "Pediatrician", type: "30-day Locum", location: "Lagos", salary: "₦900,000", status: "Closed", applicants: 15, posted: "1 month ago", urgent: false }
                  ].map((job, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex flex-col md:flex-row justify-between mb-3">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{job.title}</h3>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800 ml-2">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">ID: {job.id}</p>
                        </div>
                        
                        <Badge className={
                          job.status === "Active" ? "bg-green-100 text-green-800" :
                          job.status === "Under Review" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Job Type</p>
                          <p className="text-sm">{job.type}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm">{job.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">Salary</p>
                          <p className="text-sm font-medium">{job.salary}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{job.applicants} Applicants</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>Posted {job.posted}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm">View Applications</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="candidates" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Candidate Management</h2>
                <p className="text-gray-600">Candidate details will appear here</p>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Messages</h2>
                <p className="text-gray-600">Message details will appear here</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default EmployerDashboardPage;
