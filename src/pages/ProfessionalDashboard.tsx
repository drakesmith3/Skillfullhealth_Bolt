
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StandardDashboardLayout from "@/components/dashboard/StandardDashboardLayout";
import ProfessionalSidebarContent from "@/components/dashboard/ProfessionalSidebarContent";
import { Award, Upload, Star } from "lucide-react";

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
      <div className="p-0 min-h-screen">
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
              <h2 className="text-2xl font-bold mb-6 text-[#EA384C]">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#EA384C]">77</div>
                    <div className="text-sm text-gray-600">GLOHSEN Score</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">₦5,000,000</div>
                    <div className="text-sm text-gray-600">Total Earnings</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">Jobs Completed</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Profile Complete</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#B8941F]">Update Profile</Button>
                      <Button className="w-full bg-[#EA384C] text-white hover:bg-[#D4384C]">Search Jobs</Button>
                      <Button className="w-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">Take Quiz</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Recent Activity</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>BLS Course Completed</span>
                        <span className="text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profile Updated</span>
                        <span className="text-gray-500">1 week ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Job Application Sent</span>
                        <span className="text-gray-500">2 weeks ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Notifications</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-2 bg-yellow-50 rounded">
                        <span className="text-yellow-800">License expiring in 30 days</span>
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <span className="text-blue-800">New job matches available</span>
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <span className="text-green-800">Course recommendation ready</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="p-0 mt-0">
            <div className="bg-white">
              {/* Profile Header Section */}
              <div className="grid grid-cols-12 border-b border-gray-200">
                {/* Profile Photo */}
                <div className="col-span-2 p-6 border-r border-gray-200 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center border-2 border-[#D4AF37] mb-2">
                    <span className="text-xs text-center font-semibold text-black">UPLOAD PICTURE HERE</span>
                  </div>
                  <Button size="sm" className="bg-[#EA384C] text-white hover:bg-[#D4384C] text-xs">
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
                  </Button>
                </div>

                {/* Name and Details */}
                <div className="col-span-6 p-6 border-r border-gray-200">
                  <h1 className="text-xl font-bold">OREDOLA ADEOLA</h1>
                  <p className="text-sm mt-1">MIDWIFE | <span className="text-[#EA384C]">REGISTERED</span> NURSE</p>
                  <div className="mt-2 flex items-center">
                    <p className="text-sm mr-2">MDCN: MD12345</p>
                    <Button size="sm" variant="outline" className="text-xs text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                      Verify
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-bold text-[#EA384C]">SUBSPECIALTY:</Label>
                    <Select value={subspecialty} onValueChange={setSubspecialty}>
                      <SelectTrigger className="w-full max-w-xs mt-1">
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

              {/* Skills and Content Section */}
              <div className="grid grid-cols-12">
                {/* Skills Sidebar */}
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
                          <SelectItem value="yes-30days">Yes, in 30 days</SelectItem>
                          <SelectItem value="yes-more30">Yes, more than 30 days</SelectItem>
                          <SelectItem value="not-available">Not available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-[#EA384C] mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email Address</Label>
                        <Input value="oredola.adeola@email.com" readOnly />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input value="+234 800 123 4567" readOnly />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input value="Lagos, Nigeria" readOnly />
                      </div>
                      <div>
                        <Label>Years of Experience</Label>
                        <Input value="8 years" readOnly />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Short Bio</Label>
                      <Textarea 
                        value="Experienced midwife and registered nurse with 8 years of clinical experience. Specialized in maternal and child health with advanced certifications in BLS and communication."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-6 text-[#EA384C]">My Courses</h2>
              
              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">12</div>
                    <div className="text-sm text-gray-600">Courses Completed</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">Certificates Earned</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">150</div>
                    <div className="text-sm text-gray-600">CME Credits</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Recently Completed</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <div>
                          <div className="font-medium">Basic Life Support (BLS)</div>
                          <div className="text-sm text-gray-600">Completed 2 days ago</div>
                        </div>
                        <Badge className="bg-[#D4AF37] text-black">ADVANCED</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <div>
                          <div className="font-medium">Medical Ethics</div>
                          <div className="text-sm text-gray-600">Completed 1 week ago</div>
                        </div>
                        <Badge className="bg-[#D4AF37] text-black">ADVANCED</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Recommended for You</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <div>
                          <div className="font-medium">Advanced Cardiac Life Support</div>
                          <div className="text-sm text-gray-600">Re-attempt recommended</div>
                        </div>
                        <Button size="sm" className="bg-[#EA384C] text-white hover:bg-[#D4384C]">
                          Start
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <div>
                          <div className="font-medium">Normal Delivery Procedures</div>
                          <div className="text-sm text-gray-600">New course available</div>
                        </div>
                        <Button size="sm" className="bg-[#EA384C] text-white hover:bg-[#D4384C]">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-6 text-[#EA384C]">My Jobs History</h2>
              
              {/* Job Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">4</div>
                    <div className="text-sm text-gray-600">Jobs Completed</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Current Offers</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Recent Job Applications</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Hospital</th>
                            <th className="text-left py-2">Position</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-left py-2">Date Applied</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Lagos General Hospital</td>
                            <td className="py-2">Locum Nurse</td>
                            <td className="py-2">
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            </td>
                            <td className="py-2">2024-05-01</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">City Clinic</td>
                            <td className="py-2">Midwife</td>
                            <td className="py-2">
                              <Badge className="bg-blue-100 text-blue-800">Applied</Badge>
                            </td>
                            <td className="py-2">2024-05-15</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-6 text-[#EA384C]">Transactions History</h2>
              
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">₦5,000,000</div>
                    <div className="text-sm text-gray-600">Total Earnings</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">₦150,000</div>
                    <div className="text-sm text-gray-600">Available Balance</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">₦200,000</div>
                    <div className="text-sm text-gray-600">Pending Payments</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-[#EA384C]">Recent Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Description</th>
                          <th className="text-left py-2">Amount</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Locum Payment - Lagos General</td>
                          <td className="py-2 text-green-600">+₦250,000</td>
                          <td className="py-2">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </td>
                          <td className="py-2">2024-05-20</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Course Payment - BLS Advanced</td>
                          <td className="py-2 text-red-600">-₦15,000</td>
                          <td className="py-2">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </td>
                          <td className="py-2">2024-05-18</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inbox" className="p-0 mt-0">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-6 text-[#EA384C]">Inbox & Feedback</h2>
              
              {/* Message Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#D4AF37]">8</div>
                    <div className="text-sm text-gray-600">Total Messages</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Unread</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">2</div>
                    <div className="text-sm text-gray-600">Employer Feedback</div>
                  </CardContent>
                </Card>
                <Card className="border border-[#D4AF37]">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">4.5</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Recent Messages</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">Lagos General Hospital</div>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="text-sm text-gray-600">Job offer for weekend locum position</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">GLOHSEN Platform</div>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <div className="text-sm text-gray-600">Your GLOHSEN score has been updated</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-[#EA384C]">Employer Feedback</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">City Medical Center</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">"Excellent work ethic and professional demeanor"</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">General Hospital</div>
                          <div className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">"Great communication skills, would hire again"</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardDashboardLayout>
  );
};

export default ProfessionalDashboard;
