
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, User, Calendar, Settings, Search, Briefcase, Award, FileText, Bell, ExternalLink, BookOpen, LogOut, CreditCard, ChartBar, Activity, Inbox } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ProfileAnalytics from "@/components/dashboard/professionals/ProfileAnalytics";
import TransactionsHistory from "@/components/dashboard/professionals/TransactionsHistory";
import JobsHistory from "@/components/dashboard/professionals/JobsHistory";
import InboxActivities from "@/components/dashboard/professionals/InboxActivities";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const glohsenScore = 77;
  const employerScore = "85/110";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="professional dashboard" userName="Dr. Olusiji" />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16 flex">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 lg:w-1/5 pr-6">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Professional Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, Dr. Olusiji!</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-green-600 font-semibold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CV/Resume</span>
                    <span className="text-amber-600 font-semibold">Uploaded</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Certificates</span>
                    <span className="text-[#D4AF37] font-semibold">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link to="/profile" className="text-sm text-blue-600 hover:underline flex items-center">
                      Update Profile <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  GLOHSEN Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-300 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{glohsenScore}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm">Employer Criteria Score</div>
                  <div className="font-semibold text-[#EA384C]">{employerScore}</div>
                  <Link to="/calculate-score">
                    <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Earnings</span>
                    <span className="text-black font-semibold">₦5,000,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending</span>
                    <span className="text-amber-600 font-semibold">₦100,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Available</span>
                    <span className="text-green-600 font-semibold">₦150,000</span>
                  </div>
                  <div className="flex justify-end">
                    <Link to="/wallet-transaction">
                      <Button size="sm" className="button-3d bg-[#D4AF37] text-black font-bold">Withdraw</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" /> My Profile
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" /> Transactions
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" /> Jobs
              </TabsTrigger>
              <TabsTrigger value="inbox" className="flex items-center">
                <Inbox className="mr-2 h-4 w-4" /> Inbox
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <ProfileAnalytics />
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <TransactionsHistory />
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <JobsHistory />
            </TabsContent>

            <TabsContent value="inbox" className="space-y-4">
              <InboxActivities />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default DashboardPage;
