
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StandardDashboardLayout from "@/components/dashboard/StandardDashboardLayout";
import ProfessionalSidebarContent from "@/components/dashboard/ProfessionalSidebarContent";

const ProfessionalDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [subspecialty, setSubspecialty] = useState("Cardiology");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const subspecialties = [
    "Cardiology", "Internal Medicine", "Surgery", "Pediatrics", 
    "Obstetrics & Gynecology", "Emergency Medicine", "Psychiatry"
  ];

  return (
    <StandardDashboardLayout
      sidebar={<ProfessionalSidebarContent />}
      className="bg-gray-50"
    >
      <div className="p-0">
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-6 bg-white border-b border-gray-200 rounded-none h-12">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              MY PROFILE
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              MY COURSES
            </TabsTrigger>
            <TabsTrigger 
              value="jobs" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              MY JOBS HISTORY
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              TRANSACTIONS HISTORY
            </TabsTrigger>
            <TabsTrigger 
              value="inbox" 
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              INBOX & FEEDBACK
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
              <p className="text-gray-600">Welcome to your professional dashboard overview.</p>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="p-0 mt-0">
            <div className="bg-white">
              {/* Profile Header Section */}
              <div className="grid grid-cols-12 border-b border-gray-200">
                {/* Profile Photo */}
                <div className="col-span-2 p-6 border-r border-gray-200 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center border-2 border-[#D4AF37]">
                    <span className="text-xs text-center font-semibold text-black">UPLOAD PICTURE HERE</span>
                  </div>
                </div>

                {/* Name and Details */}
                <div className="col-span-6 p-6 border-r border-gray-200">
                  <h1 className="text-xl font-bold">OREDOLA ADEOLA</h1>
                  <p className="text-sm mt-1">MIDWIFE | <span className="text-[#EA384C]">REGISTERED</span> NURSE</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-sm mr-2">MDCN: MD12345</p>
                    <a href="#" className="text-[#D4AF37] text-xs hover:underline">Verify</a>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm mb-1 font-bold">SUBSPECIALTY:</p>
                    <Select value={subspecialty} onValueChange={setSubspecialty}>
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subspecialties.map(spec => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* GLOHSEN Score */}
                <div className="col-span-2 p-6 border-r border-gray-200">
                  <p className="text-xs font-bold text-[#EA384C] mb-2">Your GLOHSEN SCORE</p>
                  <div className="text-3xl font-bold text-[#EA384C] mb-4">77</div>
                  <p className="text-xs font-bold text-[#EA384C] mb-2">EMPLOYER CRITERIA SCORE</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#EA384C]">85/110</span>
                    <Button size="sm" variant="outline" className="text-xs">View Score</Button>
                  </div>
                </div>

                {/* Earnings */}
                <div className="col-span-2 p-6">
                  <p className="text-xs font-bold text-[#EA384C] mb-2">EARNINGS:</p>
                  <div className="text-2xl font-bold text-black mb-4">₦5,000,000</div>
                  <Button size="sm" className="bg-[#D4AF37] text-black font-bold hover:bg-[#B8941F] w-full">
                    Withdraw
                  </Button>
                </div>
              </div>

              {/* Skills and Availability Section */}
              <div className="grid grid-cols-12">
                {/* Skills Section */}
                <div className="col-span-3 border-r border-gray-200">
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-bold text-[#EA384C]">SKILLS/CERTIFICATES</p>
                  </div>
                  
                  {/* Basic Skills */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-bold text-[#EA384C]">BASIC</p>
                  </div>
                  <div className="text-xs">
                    <div className="p-2 border-b border-gray-200 flex items-center justify-between">
                      <span>BLS</span>
                      <Badge className="bg-[#D4AF37] text-black text-xs">ADV</Badge>
                    </div>
                    <div className="p-2 border-b border-gray-200 flex items-center justify-between">
                      <span>ACLS</span>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="p-2 border-b border-gray-200 flex items-center justify-between">
                      <span>ETHICS</span>
                      <Badge className="bg-[#D4AF37] text-black text-xs">ADV</Badge>
                    </div>
                    <div className="p-2 border-b border-gray-200 flex items-center justify-between">
                      <span>COMMUNICATION</span>
                      <Badge className="bg-[#D4AF37] text-black text-xs">ADV</Badge>
                    </div>
                    <div className="p-2 border-b border-gray-200 flex items-center justify-between">
                      <span>CV</span>
                      <Button size="sm" variant="outline" className="text-xs">Uploaded</Button>
                    </div>
                  </div>

                  {/* Advanced Skills */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-bold text-[#EA384C]">ADVANCED</p>
                  </div>
                  <div className="text-xs">
                    <div className="p-2 border-b border-gray-200">B.Sc</div>
                    <div className="p-2 border-b border-gray-200 text-[#EA384C]">M.Sc</div>
                    <div className="p-2 border-b border-gray-200">MEDICALS</div>
                    <div className="p-2 border-b border-gray-200">Peri-Op Nurse</div>
                    <div className="p-2 border-b border-gray-200">MPH</div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-9">
                  {/* Availability */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#EA384C]">AVAILABILITY FOR LOCUM:</p>
                      <Select defaultValue="yes-immediately">
                        <SelectTrigger className="w-48 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes-immediately">Yes, immediately</SelectItem>
                          <SelectItem value="yes-30days">Yes, <30 days</SelectItem>
                          <SelectItem value="yes-more30">Yes, >30 days</SelectItem>
                          <SelectItem value="not-available">Not available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* CME Courses Section */}
                  <div className="grid grid-cols-2 min-h-[300px]">
                    {/* Recommended Courses */}
                    <div className="border-r border-gray-200">
                      <div className="p-3 bg-white border-b border-gray-200 text-center">
                        <p className="text-xs font-bold text-[#EA384C]">CME COURSES RECOMMENDED</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-gray-100 p-3 rounded text-center">
                          <div className="font-semibold">ACLS</div>
                          <div className="text-[#EA384C] text-sm">Re-Attempt</div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded text-center">
                          <div className="font-semibold">NORMAL DELIVERY</div>
                          <div className="text-blue-600 text-sm">Attempt</div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded text-center">
                          <div className="font-semibold">FIRE SAFETY</div>
                          <div className="text-blue-600 text-sm">Attempt</div>
                        </div>
                      </div>
                    </div>

                    {/* Courses Taken */}
                    <div>
                      <div className="p-3 bg-white border-b border-gray-200 text-center">
                        <p className="text-xs font-bold text-[#EA384C]">CME COURSES TAKEN</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-[#D4AF37] p-3 rounded text-center text-black">
                          <div className="font-semibold">BLS</div>
                          <div className="text-sm">ADVANCED</div>
                        </div>
                        <div className="bg-[#D4AF37] p-3 rounded text-center text-black">
                          <div className="font-semibold">ETHICS</div>
                          <div className="text-sm">ADVANCED</div>
                        </div>
                        <div className="bg-[#D4AF37] p-3 rounded text-center text-black">
                          <div className="font-semibold">COMMUNICATION</div>
                          <div className="text-sm">ADVANCED</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Locum Jobs Section */}
                  <div className="grid grid-cols-2 border-t border-gray-200">
                    <div className="border-r border-gray-200">
                      <div className="p-3 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-bold text-[#EA384C]">LOCUM JOBS</p>
                      </div>
                      <div className="p-4 text-sm">
                        <div>Completed - 4</div>
                        <div className="flex items-center mt-2">
                          <span>Offers</span>
                          <span className="ml-4 text-[#EA384C] cursor-pointer">- 5 (click to view)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="p-3 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-bold text-[#EA384C]">ABOUT TO EXPIRE</p>
                      </div>
                      <div className="p-4 text-sm">
                        <div>Annual License</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">My Courses</h2>
              <p className="text-gray-600">Your enrolled courses, certificates, and learning progress.</p>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">My Jobs History</h2>
              <p className="text-gray-600">Your job applications and employment history.</p>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">Transactions History</h2>
              <p className="text-gray-600">Your payment history and financial transactions.</p>
            </div>
          </TabsContent>

          <TabsContent value="inbox" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">Inbox & Feedback</h2>
              <p className="text-gray-600">Messages, notifications, and feedback from employers and clients.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default ProfessionalDashboard;
