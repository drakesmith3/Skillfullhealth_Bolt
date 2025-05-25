
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Award, CreditCard, ExternalLink, MessageCircle, 
  Briefcase, Activity, Clock, Eye, EyeOff, Upload
} from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showScore, setShowScore] = useState(true);
  const [showEarnings, setShowEarnings] = useState(true);
  const [subspecialty, setSubspecialty] = useState("General Practice");

  const glohsenScore = 77;
  const employerScore = "85/110";
  const earnings = "₦5,000,000";

  // User's selected subspecialties (max 4 from registration)
  const userSubspecialties = [
    "General Practice",
    "Family Medicine/GP", 
    "Obstetrics",
    "Pediatrics"
  ];

  const skillsData = [
    { name: "BLS", status: "ADVANCED", uploaded: true },
    { name: "ACLS", status: "BASIC", uploaded: false },
    { name: "ETHICS", status: "ADVANCED", uploaded: true },
    { name: "COMMUNICATION", status: "ADVANCED", uploaded: true },
    { name: "RESUME/CV", status: "Uploaded", uploaded: true }
  ];

  const coursesTaken = [
    { name: "BLS", level: "ADVANCED" },
    { name: "ETHICS", level: "ADVANCED" },
    { name: "COMMUNICATION", level: "ADVANCED" }
  ];

  const coursesRecommended = [
    { name: "ACLS", action: "Re-Attempt" },
    { name: "NORMAL DELIVERY", action: "Attempt" },
    { name: "FIRE SAFETY", action: "Attempt" },
    { name: "NEBOSH IGC", action: "Attempt" },
    { name: "ECG", action: "Attempt" },
    { name: "ULTRASOUND", action: "Attempt" }
  ];

  const recentActivities = [
    { text: "Completed: Advanced Cardiology CME", time: "2 hours ago" },
    { text: "Commented on 'Best Practices in Telemedicine'", time: "5 hours ago" },
    { text: "Joined the Oncology Group", time: "Yesterday" },
    { text: "Updated profile certificates", time: "2 days ago" }
  ];

  const aboutToExpire = [
    { name: "Annual License", expiry: "30 days" },
    { name: "BLS Certificate", expiry: "60 days" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="Professional Dashboard" userName="Dr. Olusiji" />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white dark:bg-gray-800 h-12">
              <TabsTrigger value="overview" className="flex items-center font-semibold">
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center font-semibold">
                MY PROFILE
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center font-semibold">
                TRANSACTIONS HISTORY
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center font-semibold">
                MY JOBS HISTORY
              </TabsTrigger>
              <TabsTrigger value="inbox" className="flex items-center font-semibold">
                INBOX & FEEDBACK
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Top Section - Profile Info, Score, Earnings */}
              <div className="grid grid-cols-12 gap-6 mb-6">
                {/* Profile Info */}
                <div className="col-span-12 md:col-span-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OREDOLA ADEOLA</h1>
                      <p className="text-gray-600 dark:text-gray-400">MIDWIFE | REGISTERED NURSE</p>
                      <div className="mt-2 flex items-center">
                        <p className="text-sm text-gray-500 mr-2">MDCN: MD12345</p>
                        <a 
                          href="https://portal.mdcn.gov.ng/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F]"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          <span className="text-xs">Verify</span>
                        </a>
                      </div>
                      <div className="mt-4">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">SUBSPECIALTY:</label>
                        <Select value={subspecialty} onValueChange={setSubspecialty}>
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {userSubspecialties.map(specialty => (
                              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GLOHSEN Score */}
                <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#ea384c]">Your GLOHSEN SCORE</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="score-toggle"
                        checked={showScore}
                        onCheckedChange={setShowScore}
                        className="data-[state=checked]:bg-[#ea384c]"
                      />
                      {showScore ? <Eye size={16} /> : <EyeOff size={16} />}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#ea384c] mb-4">
                      {showScore ? glohsenScore : "***"}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      EMPLOYER CRITERIA SCORE
                    </div>
                    <div className="text-lg font-bold text-[#ea384c] mb-4">
                      {showScore ? employerScore : "***"}
                    </div>
                    <Link to="/score/calculate">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Earnings */}
                <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#ea384c]">EARNINGS</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="earnings-toggle"
                        checked={showEarnings}
                        onCheckedChange={setShowEarnings}
                        className="data-[state=checked]:bg-[#ea384c]"
                      />
                      {showEarnings ? <Eye size={16} /> : <EyeOff size={16} />}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {showEarnings ? earnings : "₦*,***,***"}
                    </div>
                    <Link to="/wallet/professional">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                        Withdraw
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Three Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Skills/Certificates */}
                <div className="space-y-6">
                  <Card className="bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-bold text-[#ea384c]">SKILLS/CERTIFICATES</h3>
                    </div>
                    <CardContent className="p-0">
                      <div className="space-y-0">
                        {skillsData.map((skill, index) => (
                          <div key={skill.name} className="p-4 border-b dark:border-gray-700 last:border-b-0 flex items-center justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                className={
                                  skill.status === 'ADVANCED' ? 'bg-[#D4AF37] text-black' :
                                  skill.status === 'BASIC' ? 'bg-gray-200 text-gray-700' :
                                  'bg-blue-100 text-blue-800'
                                }
                              >
                                {skill.status}
                              </Badge>
                              {!skill.uploaded && (
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Upload className="h-3 w-3 mr-1" />
                                  Upload
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Middle Column - CME Courses Taken */}
                <div className="space-y-6">
                  {/* Courses Taken */}
                  <Card className="bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-bold text-[#ea384c]">CME COURSES TAKEN</h3>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {coursesTaken.map((course, index) => (
                          <div key={course.name} className="p-3 bg-[#D4AF37] text-black rounded-lg">
                            <div className="font-semibold">{course.name}</div>
                            <div className="text-xs">{course.level}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Join the Conversation */}
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <MessageCircle className="h-6 w-6 text-[#D4AF37] mr-2" />
                        <h3 className="text-lg font-semibold">JOIN THE CONVERSATION</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Connect with other professionals and share insights.
                      </p>
                      <Link to="/community-forum">
                        <Button className="w-full bg-[#ea384c] hover:bg-[#d12e42] text-white">
                          VIEW ALL DISCUSSIONS
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Locum Jobs */}
                  <Card className="bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-bold text-[#ea384c]">LOCUM JOBS</h3>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Completed</span>
                          <span className="text-sm font-semibold">4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Offers</span>
                          <Link to="/job-board" className="text-sm text-[#ea384c] hover:underline">
                            5 (click to view)
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - CME Courses Recommended */}
                <div className="space-y-6">
                  {/* Courses Recommended */}
                  <Card className="bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-bold text-[#ea384c]">CME COURSES RECOMMENDED</h3>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {coursesRecommended.map((course, index) => (
                          <div key={course.name} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                            <div className="font-semibold text-sm">{course.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{course.action}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Activity className="h-6 w-6 text-[#D4AF37] mr-2" />
                        <h3 className="text-lg font-semibold">RECENT ACTIVITY</h3>
                      </div>
                      <div className="space-y-3 mb-4">
                        {recentActivities.slice(0, 3).map((activity, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{activity.text}</div>
                            <div className="text-xs text-gray-500">{activity.time}</div>
                          </div>
                        ))}
                      </div>
                      <Link to="/activity">
                        <Button variant="outline" className="w-full">
                          VIEW ALL ACTIVITIES
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* About to Expire */}
                  <Card className="bg-white dark:bg-gray-800">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-bold text-[#ea384c]">ABOUT TO EXPIRE</h3>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {aboutToExpire.map((item, index) => (
                          <div key={item.name} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.name}</span>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-orange-500 mr-1" />
                              <span className="text-xs text-orange-500">{item.expiry}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link to="/profile" className="block mt-4">
                        <Button variant="outline" className="w-full text-xs">
                          Update in My Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                <p className="text-gray-600">Profile management content will be here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Transactions History</h2>
                <p className="text-gray-600">Transaction history content will be here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Jobs History</h2>
                <p className="text-gray-600">Jobs history content will be here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="inbox" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Inbox & Feedback</h2>
                <p className="text-gray-600">Inbox and feedback content will be here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default DashboardPage;
