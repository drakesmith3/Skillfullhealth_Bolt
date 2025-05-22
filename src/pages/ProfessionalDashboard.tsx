
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, CreditCard, FileText, MessageSquare, Award } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProfessionalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample GLOHSEN Score data
  const glohsenScore = {
    overall: 97,
    components: [
      { name: "Experience", score: 9, maxScore: 10 },
      { name: "Employer Match", score: 102, maxScore: 110 },
      { name: "Skills", score: 12, maxScore: 15 },
      { name: "Locum Jobs", score: 8, maxScore: 10 },
      { name: "Platform Activity", score: 9, maxScore: 10 },
    ],
    recommendations: [
      "Complete one more CME course to boost your Skills score.",
      "Participate in two more community discussions this week.",
      "Update your availability settings to increase employer matches.",
    ],
  };

  // Sample certificates data
  const certificates = [
    { id: 1, name: "Basic Life Support (BLS)", issuer: "American Heart Association", expiryDate: "Dec 2025", status: "CURRENT" },
    { id: 2, name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", expiryDate: "Jun 2026", status: "CURRENT" },
    { id: 3, name: "Pediatric Advanced Life Support (PALS)", issuer: "American Heart Association", expiryDate: "Jan 2025", status: "CURRENT" },
  ];

  // Sample jobs data
  const jobs = [
    { id: 1, title: "Emergency Room Physician", hospital: "Lagos General Hospital", startDate: "Jul 10, 2025", endDate: "Jul 30, 2025", status: "Upcoming" },
    { id: 2, title: "General Practitioner", hospital: "Mercy Medical Center", startDate: "May 15, 2025", endDate: "Jun 15, 2025", status: "Completed" },
  ];

  return (
    <DashboardLayout
      userType="professional"
      userName="Dr. Olusiji"
      pageTitle="Professional Dashboard"
      pageDescription="Welcome back, Dr. Olusiji!"
    >
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="jobs">My Jobs History</TabsTrigger>
          <TabsTrigger value="transactions">Transactions History</TabsTrigger>
          <TabsTrigger value="inbox">Inbox & Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* GLOHSEN Score Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">GLOHSEN Score</h3>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#D4AF37]">{glohsenScore.overall}</span>
                  </div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">out of 200</p>
                </div>
                <div className="space-y-2">
                  {glohsenScore.components.map((comp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{comp.name}</span>
                        <span className="font-medium">{comp.score}/{comp.maxScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full" 
                          style={{ width: `${(comp.score / comp.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full bg-[#D4AF37] hover:bg-amber-500 text-black">View Details</Button>
              </CardContent>
            </Card>

            {/* Current Jobs Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Current & Upcoming Jobs</h3>
                {jobs.length > 0 ? (
                  <div className="space-y-3">
                    {jobs.map(job => (
                      <div key={job.id} className="border-l-4 border-[#D4AF37] pl-3 py-2">
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.hospital}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">{job.startDate} - {job.endDate}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            job.status === "Upcoming" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : 
                            "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                          }`}>{job.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">No current jobs found</p>
                )}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button variant="outline">Job History</Button>
                  <Button className="bg-[#D4AF37] hover:bg-amber-500 text-black">Find Jobs</Button>
                </div>
              </CardContent>
            </Card>

            {/* Certificates Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Certificates</h3>
                {certificates.length > 0 ? (
                  <div className="space-y-3">
                    {certificates.map(cert => (
                      <div key={cert.id} className="border p-3 rounded-md bg-gray-50 dark:bg-gray-700">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Issued by: {cert.issuer}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">Expires: {cert.expiryDate}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200">
                            {cert.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">No certificates found</p>
                )}
                <Button className="mt-4 w-full">Upload Certificate</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recommendations Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Recommendations to Improve Your Score
                </h3>
                <ul className="space-y-3">
                  {glohsenScore.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block mr-2 mt-0.5 h-5 w-5 rounded-full bg-[#D4AF37] text-black font-bold text-center">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { activity: "Completed CME course", details: "Advanced Cardiac Management", time: "Yesterday" },
                    { activity: "Applied for job", details: "Pediatrician at Lagos Children's Hospital", time: "3 days ago" },
                    { activity: "Viewed notification", details: "Certificate expiring in 30 days", time: "1 week ago" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div>
                        <p className="font-medium">{item.activity}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">My Profile</h2>
              <p>Your profile details and information will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">My Courses</h2>
              <p>Your enrolled and completed courses will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">My Jobs History</h2>
              <p>Your job history and applications will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Transactions History</h2>
              <p>Your financial transactions will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inbox" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Inbox & Feedback</h2>
              <p>Your messages and feedback will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProfessionalDashboard;
