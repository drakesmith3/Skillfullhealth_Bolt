
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Briefcase, ChartBar, PieChart, CreditCard, MessageSquare, FileText, Search, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userType="employer"
      userName="Hospital Corp."
      pageTitle="Employer Dashboard"
      pageDescription="Welcome back, Hospital Corp.!"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Job Postings
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Jobs</span>
                <span className="text-green-600 font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Applications</span>
                <span className="text-amber-600 font-semibold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Candidates Hired</span>
                <span className="text-[#D4AF37] font-semibold">3</span>
              </div>
              <Button size="sm" className="w-full mt-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-medium">
                Post New Job
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Candidate Quality
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">87%</div>
                  <div className="text-xs text-white">Match</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm">Candidate-Criteria Match Rate</div>
              <Button variant="outline" size="sm" className="mt-2">View Criteria</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Financials
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Allocated</span>
                <span className="font-semibold">₦15,000,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Spent</span>
                <span className="text-amber-600 font-semibold">₦8,250,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available</span>
                <span className="text-green-600 font-semibold">₦6,750,000</span>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <ChartBar className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="criteria" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Criteria Score Analytics
          </TabsTrigger>
          <TabsTrigger value="kpi" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" /> KPI Analytics
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Transactions History
          </TabsTrigger>
          <TabsTrigger value="inbox" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" /> Inbox & Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Recruitment Pipeline</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Applications Received</span>
                      <span className="text-sm font-medium">42</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Screening Completed</span>
                      <span className="text-sm font-medium">35/42</span>
                    </div>
                    <Progress value={83} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Interviews Conducted</span>
                      <span className="text-sm font-medium">18/42</span>
                    </div>
                    <Progress value={43} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Offers Extended</span>
                      <span className="text-sm font-medium">5/42</span>
                    </div>
                    <Progress value={12} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Positions Filled</span>
                      <span className="text-sm font-medium">3/8</span>
                    </div>
                    <Progress value={38} className="h-2 bg-gray-200" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-[#D4AF37] text-black hover:bg-[#C09C30]">
                    <Search className="mr-2 h-4 w-4" /> Find Candidates
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Recent Activities</h3>
                <div className="space-y-3">
                  {[
                    { activity: "New application received", position: "Senior Registered Nurse", time: "2 hours ago" },
                    { activity: "Interview scheduled", position: "Resident Doctor", time: "Yesterday" },
                    { activity: "Offer accepted", position: "Clinical Psychologist", time: "2 days ago" },
                    { activity: "Application reviewed", position: "Pediatrician", time: "3 days ago" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{item.position}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">View All Activities</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <Card className="p-6 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-6">Employer Criteria Score Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Criteria score analytics will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="kpi" className="space-y-4">
          <Card className="p-6 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-6">KPI Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">KPI analytics data will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="p-6 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-6">Transactions History</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Transaction history will appear here</p>
          </Card>
        </TabsContent>

        <TabsContent value="inbox" className="space-y-4">
          <Card className="p-6 dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-6">Inbox & Feedback</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Messages and feedback will appear here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
