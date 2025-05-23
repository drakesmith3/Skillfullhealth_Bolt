
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, CreditCard, FileText, MessageSquare, Award, TrendingUp, Calendar, Users, Star } from "lucide-react";
import StandardDashboardLayout from "@/components/dashboard/StandardDashboardLayout";
import ProfessionalSidebarContent from "@/components/dashboard/ProfessionalSidebarContent";

const ProfessionalDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Enhanced GLOHSEN Score data with more detail
  const glohsenScore = {
    overall: 97,
    percentile: 89,
    components: [
      { name: "Experience", score: 9, maxScore: 10, trend: "+2" },
      { name: "Employer Match", score: 102, maxScore: 110, trend: "+5" },
      { name: "Skills", score: 12, maxScore: 15, trend: "0" },
      { name: "Locum Jobs", score: 8, maxScore: 10, trend: "+1" },
      { name: "Platform Activity", score: 9, maxScore: 10, trend: "+1" },
    ],
    recommendations: [
      "Complete one more CME course to boost your Skills score by 3 points",
      "Participate in two more community discussions this week",
      "Update your availability settings to increase employer matches by 15%",
    ],
  };

  // Enhanced certificates data
  const certificates = [
    { id: 1, name: "Basic Life Support (BLS)", issuer: "American Heart Association", expiryDate: "Dec 2025", status: "CURRENT", daysLeft: 245 },
    { id: 2, name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", expiryDate: "Jun 2026", status: "CURRENT", daysLeft: 425 },
    { id: 3, name: "Pediatric Advanced Life Support (PALS)", issuer: "American Heart Association", expiryDate: "Jan 2025", status: "EXPIRING", daysLeft: 45 },
  ];

  // Enhanced jobs data
  const jobs = [
    { id: 1, title: "Emergency Room Physician", hospital: "Lagos General Hospital", startDate: "Jul 10, 2025", endDate: "Jul 30, 2025", status: "Upcoming", rate: "₦45,000/day" },
    { id: 2, title: "General Practitioner", hospital: "Mercy Medical Center", startDate: "May 15, 2025", endDate: "Jun 15, 2025", status: "Completed", rate: "₦35,000/day", rating: 4.8 },
  ];

  const recentActivity = [
    { activity: "Completed CME course", details: "Advanced Cardiac Management", time: "Yesterday", type: "education" },
    { activity: "Applied for job", details: "Pediatrician at Lagos Children's Hospital", time: "3 days ago", type: "job" },
    { activity: "Received feedback", details: "5-star rating from Lagos General Hospital", time: "5 days ago", type: "feedback" },
    { activity: "Updated profile", details: "Added new certification", time: "1 week ago", type: "profile" },
  ];

  return (
    <StandardDashboardLayout
      sidebar={<ProfessionalSidebarContent />}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Dr. Olusiji!</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Here's your professional dashboard overview</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                Top 10% Performer
              </Badge>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                View Profile
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white dark:bg-gray-800 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Overview</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Profile</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Courses</TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Jobs</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Transactions</TabsTrigger>
            <TabsTrigger value="inbox" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">Inbox</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* GLOHSEN Score Card */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GLOHSEN Score</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-24 h-24">
                      <div className="w-24 h-24 rounded-full border-4 border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/20">
                        <span className="text-2xl font-bold text-[#D4AF37]">{glohsenScore.overall}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">out of 200</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Top {glohsenScore.percentile}% of professionals
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Active Jobs */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Jobs</h3>
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current positions</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Earnings */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">This Month</h3>
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">₦850K</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certificates</h3>
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2">{certificates.length}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active certs</p>
                    {certificates.some(cert => cert.daysLeft < 60) && (
                      <p className="text-xs text-red-500 mt-1">1 expiring soon</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* GLOHSEN Score Breakdown */}
              <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Score Breakdown</h3>
                  <div className="space-y-4">
                    {glohsenScore.components.map((comp, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{comp.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#D4AF37]">{comp.score}/{comp.maxScore}</span>
                            {comp.trend !== "0" && (
                              <Badge variant="outline" className={comp.trend.startsWith("+") ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}>
                                {comp.trend}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(comp.score / comp.maxScore) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6 w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          {item.type === 'education' && <BookOpen className="w-4 h-4 text-black" />}
                          {item.type === 'job' && <Briefcase className="w-4 h-4 text-black" />}
                          {item.type === 'feedback' && <Star className="w-4 h-4 text-black" />}
                          {item.type === 'profile' && <Users className="w-4 h-4 text-black" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white">{item.activity}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 dark:from-[#D4AF37]/20 dark:to-[#D4AF37]/10 border border-[#D4AF37]/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Personalized Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {glohsenScore.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <div className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold text-sm mr-3 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Profile</h2>
                <p className="text-gray-600 dark:text-gray-400">Your comprehensive professional profile and credentials will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Courses</h2>
                <p className="text-gray-600 dark:text-gray-400">Your enrolled and completed CME courses will be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Jobs History</h2>
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{job.hospital}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">{job.startDate} - {job.endDate}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={job.status === "Upcoming" ? "default" : "secondary"}>
                            {job.status}
                          </Badge>
                          <p className="text-sm font-medium text-[#D4AF37] mt-1">{job.rate}</p>
                          {job.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm ml-1">{job.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Transactions History</h2>
                <p className="text-gray-600 dark:text-gray-400">Your financial transactions and payment history will be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inbox" className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Inbox & Messages</h2>
                <p className="text-gray-600 dark:text-gray-400">Your messages, notifications, and feedback will be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default ProfessionalDashboard;
