
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bell, Briefcase, Calendar, CreditCard, Settings, Star, User, FileText } from 'lucide-react';
import PreHeader from '../components/PreHeader';

const ProfessionalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample GLOHSEN Score data
  const glohsenScore = {
    total: 155,
    maxPossible: 200,
    categories: [
      { name: "Years of Experience", score: 7, maxScore: 10 },
      { name: "Skills and Certificates", score: 12, maxScore: 15 },
      { name: "Previous Locum Jobs", score: 8, maxScore: 10 },
      { name: "Platform Activity", score: 9, maxScore: 10 },
      { name: "Flexibility", score: 8, maxScore: 10 },
      { name: "Employer's Specific Requests", score: 85, maxScore: 110 },
      { name: "Location", score: 4, maxScore: 5 },
      { name: "Communication Skills", score: 8, maxScore: 10 },
      { name: "Availability Duration", score: 7, maxScore: 10 },
      { name: "Immediate Availability", score: 7, maxScore: 10 },
    ],
  };

  // Sample jobs data
  const recentJobs = [
    { id: 1, title: "Emergency Room Physician", facility: "Central Hospital", date: "12 May 2025", status: "Completed", payment: "$1,200" },
    { id: 2, title: "General Practitioner", facility: "Westside Clinic", date: "05 May 2025", status: "Completed", payment: "$850" },
    { id: 3, title: "Pediatrician", facility: "Children's Hospital", date: "28 Apr 2025", status: "Upcoming", payment: "Pending" },
    { id: 4, title: "Cardiologist", facility: "Heart Institute", date: "15 Apr 2025", status: "Completed", payment: "$1,500" },
  ];

  // Sample certificates data
  const certificates = [
    { id: 1, name: "Basic Life Support (BLS)", issuer: "American Heart Association", expiry: "Dec 2025", status: "Active" },
    { id: 2, name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", expiry: "Jan 2026", status: "Active" },
    { id: 3, name: "Pediatric Advanced Life Support (PALS)", issuer: "American Heart Association", expiry: "Mar 2025", status: "Active" },
    { id: 4, name: "Neonatal Resuscitation Program (NRP)", issuer: "American Academy of Pediatrics", expiry: "Jun 2025", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="professional dashboard" />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Professional Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Dr. Sarah Johnson</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">3</span>
            </div>
            <button className="flex items-center bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Wallet: $2,550</span>
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 max-w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs History</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              {/* GLOHSEN Score Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your GLOHSEN Score</CardTitle>
                      <CardDescription>Updated 3 days ago</CardDescription>
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
              
              {/* Recent Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>Your recent and upcoming locum assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3">Position</th>
                          <th className="pb-3">Facility</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentJobs.map((job) => (
                          <tr key={job.id} className="border-b">
                            <td className="py-3">{job.title}</td>
                            <td className="py-3">{job.facility}</td>
                            <td className="py-3">{job.date}</td>
                            <td className="py-3">
                              <Badge variant={job.status === "Completed" ? "outline" : "secondary"}>
                                {job.status}
                              </Badge>
                            </td>
                            <td className="py-3">{job.payment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Certificates */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Certificates</CardTitle>
                  <CardDescription>Current certifications and expiration dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                      <Card key={cert.id} className="bg-gray-50 dark:bg-gray-800 border">
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                            </div>
                            <Badge variant="outline" className={cert.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {cert.status}
                            </Badge>
                          </div>
                          <p className="text-sm mt-2">Expires: {cert.expiry}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Jobs History</CardTitle>
                  <CardDescription>Complete record of your locum assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-20 text-gray-500">This section will display your complete job history</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Record of your financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-20 text-gray-500">This section will display your transaction history</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>Your personal and professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-20 text-gray-500">This section will display your profile information</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                  <CardDescription>Feedback from employers and patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-20 text-gray-500">This section will display feedback about your services</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
