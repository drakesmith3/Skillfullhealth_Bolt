import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { ChartContainer, ChartTooltip } from "../components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Briefcase, ChartBar, PieChart as PieChartIcon, CreditCard, MessageSquare, FileText, Search, Award, Users, Download, Star, TrendingUp, Target, Clock, DollarSign } from "lucide-react";
import { Progress } from "../components/ui/progress";
import PreHeader from "../components/PreHeader";
import Footer from "../components/Footer";
import { Link, useLocation } from 'react-router-dom';

const EmployerDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  // Handle navigation from sidebar
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Chart data for analytics
  const recruitmentData = [
    { month: 'Jan', posted: 3, applications: 24, hired: 2, cost: 850000 },
    { month: 'Feb', posted: 2, applications: 18, hired: 1, cost: 620000 },
    { month: 'Mar', posted: 4, applications: 32, hired: 3, cost: 1100000 },
    { month: 'Apr', posted: 2, applications: 16, hired: 2, cost: 780000 },
    { month: 'May', posted: 3, applications: 25, hired: 2, cost: 920000 },
  ];

  const candidateQualityData = [
    { name: 'Excellent Match', value: 35, color: '#10B981' },
    { name: 'Good Match', value: 45, color: '#D4AF37' },
    { name: 'Fair Match', value: 15, color: '#F59E0B' },
    { name: 'Poor Match', value: 5, color: '#EF4444' },
  ];

  const departmentHiringData = [
    { department: 'Emergency', hired: 8, budget: 3200000 },
    { department: 'Surgery', hired: 4, budget: 2100000 },
    { department: 'Medicine', hired: 6, budget: 2800000 },
    { department: 'Pediatrics', hired: 3, budget: 1500000 },
    { department: 'Radiology', hired: 2, budget: 980000 },
  ];

  const financialData = [
    { quarter: 'Q1', budgeted: 4000000, spent: 2570000, saved: 1430000 },
    { quarter: 'Q2', budgeted: 3500000, spent: 2890000, saved: 610000 },
    { quarter: 'Q3', budgeted: 4200000, spent: 3150000, saved: 1050000 },
    { quarter: 'Q4', budgeted: 3800000, spent: 3840000, saved: -40000 },
  ];

  const chartConfig = {
    applications: { label: "Applications", color: "#EA384C" },
    hired: { label: "Hired", color: "#10B981" },
    cost: { label: "Cost", color: "#D4AF37" },
    posted: { label: "Posted", color: "#3B82F6" },
    budget: { label: "Budget", color: "#8B5CF6" },
    spent: { label: "Spent", color: "#EF4444" },
    saved: { label: "Saved", color: "#10B981" },
  };return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <PreHeader currentPage="dashboard" />
      
      <div className="pt-16">        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Tabs positioned just below preheader */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-gray-50 dark:bg-gray-700 rounded-t-xl border-b border-gray-200 dark:border-gray-600">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger 
              value="candidates"
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              CANDIDATES
            </TabsTrigger>
            <TabsTrigger 
              value="criteria"
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              CRITERIA SCORE ANALYTICS
            </TabsTrigger>
            <TabsTrigger 
              value="kpi"
              className="data-[state=active]:bg-[#EA384C] data-[state=active]:text-white text-sm font-medium"
            >
              KPI ANALYTICS
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
          </TabsList>          <TabsContent value="overview" className="p-6 space-y-4">
            {/* Dashboard Overview Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#EA384C] mb-2">Dashboard Overview</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete overview of your facility's recruitment activities and performance metrics
              </p>
            </div>            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card size="md" variant="stats" >
              <CardContent compact className="p-6">
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
            
            <Card size="md" variant="stats" >
              <CardContent compact className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Candidate Quality
                  </h3>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">87%</div>
                      <div className="text-xs text-black">Match</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm">Candidate-Criteria Match Rate</div>
                  <Button variant="outline" size="sm" className="mt-2">View Criteria</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card size="md" variant="stats" >
              <CardContent compact className="p-6">
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
                    <Button size="sm" className="bg-[#D4AF37] text-black font-bold hover:bg-amber-500">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          <Card size="xl" variant="default" className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-xl font-bold mb-6 text-[#EA384C]">Annual Recruitment Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">12-Month Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Job Vacancies Posted</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Total Applications</span>
                      <span className="text-sm font-medium">186</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Candidates Processed</span>
                      <span className="text-sm font-medium">142</span>
                    </div>
                    <Progress value={76} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Successfully Employed</span>
                      <span className="text-sm font-medium">18</span>
                    </div>
                    <Progress value={75} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Financial Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Recruitment Spend</span>
                    <span className="font-semibold text-[#EA384C]">₦12,450,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Cost per Hire</span>
                    <span className="text-amber-600 font-semibold">₦691,667</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Platform Fees</span>
                    <span className="text-blue-600 font-semibold">₦1,245,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Feedback Resolution Rate</span>
                    <span className="text-green-600 font-semibold">94%</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-[#D4AF37] hover:bg-amber-500 text-black w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> View Financial Details
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Activity Tracking */}
            <div className="mt-8 p-4 bg-gradient-to-r from-[#EA384C]/10 to-[#D4AF37]/10 rounded-lg">
              <h3 className="font-semibold text-[#EA384C] mb-3">AI Activity Agent Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#D4AF37]">87%</div>
                  <div className="text-gray-600">Platform Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#EA384C]">156</div>
                  <div className="text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">4.6/5</div>
                  <div className="text-gray-600">Employer Rating</div>
                </div>
              </div>            </div>
          </Card>

          {/* Recruitment Analytics Section */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <ChartBar className="mr-3 h-6 w-6 text-[#EA384C]" />
              Recruitment Analytics Dashboard
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Recruitment Trends */}
              <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-[#EA384C]" />
                    Monthly Recruitment Trends
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recruitmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip formatter={(value, name) => {
                          if (name === 'cost') return [`₦${value.toLocaleString()}`, 'Recruitment Cost'];
                          return [value, name];
                        }} />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="applications" 
                          stroke="var(--color-applications)" 
                          strokeWidth={3}
                          name="Applications"
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="hired" 
                          stroke="var(--color-hired)" 
                          strokeWidth={3}
                          name="Hired"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="cost" 
                          stroke="var(--color-cost)" 
                          strokeWidth={3}
                          name="Cost (₦)"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Candidate Quality Distribution */}
              <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Target className="mr-2 h-5 w-5 text-[#EA384C]" />
                    Candidate Quality Distribution
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={candidateQualityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {candidateQualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department-wise Hiring */}
              <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#EA384C]" />
                    Department-wise Hiring
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={departmentHiringData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip formatter={(value, name) => {
                          if (name === 'budget') return [`₦${value.toLocaleString()}`, 'Budget'];
                          return [value, 'Hired'];
                        }} />
                        <Bar yAxisId="left" dataKey="hired" fill="var(--color-hired)" name="Hired" />
                        <Bar yAxisId="right" dataKey="budget" fill="var(--color-budget)" name="Budget (₦)" />
                        <Legend />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Financial Performance */}
              <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                <CardContent compact className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-[#EA384C]" />
                    Quarterly Financial Performance
                  </h3>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <ChartTooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Amount']} />
                        <Bar dataKey="budgeted" fill="var(--color-budget)" name="Budgeted" />
                        <Bar dataKey="spent" fill="var(--color-spent)" name="Spent" />
                        <Bar dataKey="saved" fill="var(--color-saved)" name="Saved" />
                        <Legend />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics Summary */}
            <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#EA384C]" />
                  Key Performance Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">12.5%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Hiring Success Rate</div>
                    <div className="text-xs text-gray-500 mt-1">↑ 2.3% from last quarter</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">18 days</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Avg. Time to Hire</div>
                    <div className="text-xs text-gray-500 mt-1">↓ 3 days from target</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.7/5</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Candidate Experience</div>
                    <div className="text-xs text-gray-500 mt-1">Based on feedback</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">₦692k</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">Cost per Hire</div>
                    <div className="text-xs text-gray-500 mt-1">Below industry avg.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent><TabsContent value="candidates" className="p-6 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#EA384C] mb-2">Candidates Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your job vacancies, applications, and candidate pipeline
            </p>
          </div>          {/* Current Job Vacancies */}
          <Card size="lg" variant="default" >
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#EA384C]">Active Job Vacancies</h3>
              <div className="space-y-4">
                {[
                  { position: "Senior Registered Nurse", applications: 15, status: "Active", posted: "5 days ago" },
                  { position: "Resident Doctor", applications: 8, status: "Active", posted: "1 week ago" },
                  { position: "Clinical Psychologist", applications: 12, status: "Review", posted: "2 weeks ago" },
                  { position: "Pediatrician", applications: 7, status: "Active", posted: "3 days ago" },
                ].map((job, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{job.position}</h4>
                        <p className="text-sm text-gray-500">Posted {job.posted}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#D4AF37]">{job.applications}</div>
                        <div className="text-sm text-gray-500">Applications</div>
                        <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                        View Applications
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit Job
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button className="bg-[#EA384C] hover:bg-[#D4384C] text-white">
                  <Briefcase className="mr-2 h-4 w-4" /> Post New Vacancy
                </Button>
              </div>
            </CardContent>
          </Card>          {/* Recent Applications */}
          <Card size="lg" variant="default" >
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#EA384C]">Recent Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Candidate</th>
                      <th className="text-left py-2">Position</th>
                      <th className="text-left py-2">GLOHSEN Score</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Applied</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Dr. Sarah Johnson", position: "Senior Registered Nurse", score: 87, status: "Under Review", date: "2 hours ago" },
                      { name: "Michael Chen", position: "Resident Doctor", score: 92, status: "Interview Scheduled", date: "5 hours ago" },
                      { name: "Dr. Amina Hassan", position: "Pediatrician", score: 89, status: "New", date: "1 day ago" },
                      { name: "James Williams", position: "Clinical Psychologist", score: 85, status: "Under Review", date: "2 days ago" },
                    ].map((candidate, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3">{candidate.name}</td>
                        <td className="py-3">{candidate.position}</td>
                        <td className="py-3">
                          <span className="font-bold text-[#D4AF37]">{candidate.score}</span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                            candidate.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{candidate.date}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="mr-2">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="criteria" className="p-6 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#EA384C] mb-2">Criteria Score Analytics</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Analyze candidate matches against your specific hiring criteria and GLOHSEN scores
            </p>
          </div>          {/* Criteria Overview */}
          <Card size="xl" variant="default" >
            <CardContent compact className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#EA384C]">Your Match Criteria Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">87%</div>
                  <div className="text-sm text-gray-600">Average Candidate Match</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#EA384C]/20 to-[#EA384C]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[#EA384C] mb-2">142</div>
                  <div className="text-sm text-gray-600">Candidates Scored</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">Criteria Accuracy</div>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">Criteria Performance Breakdown</h4>
                {[
                  { criteria: "Educational Qualifications", weight: 25, performance: 92, color: "bg-green-500" },
                  { criteria: "Professional Experience", weight: 30, performance: 88, color: "bg-blue-500" },
                  { criteria: "Certifications & Licenses", weight: 20, performance: 95, color: "bg-purple-500" },
                  { criteria: "Soft Skills Assessment", weight: 15, performance: 82, color: "bg-yellow-500" },
                  { criteria: "GLOHSEN Core Competencies", weight: 10, performance: 90, color: "bg-red-500" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.criteria}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Weight: {item.weight}%</span>
                        <span className="font-bold text-[#D4AF37]">{item.performance}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`} 
                        style={{ width: `${item.performance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="bg-[#EA384C] hover:bg-[#D4384C] text-white">
                  <Star className="mr-2 h-4 w-4" /> Update Criteria
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="kpi" className="p-6 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#EA384C] mb-2">KPI Analytics</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track key performance indicators for your recruitment and HR operations
            </p>
          </div>          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Time to Hire</p>
                    <p className="text-2xl font-bold text-[#D4AF37]">21 days</p>
                    <p className="text-xs text-green-600">↓ 15% from last month</p>
                  </div>
                  <ChartBar className="h-8 w-8 text-[#D4AF37]" />
                </div>
              </CardContent>
            </Card>

            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cost per Hire</p>
                    <p className="text-2xl font-bold text-[#EA384C]">₦691K</p>
                    <p className="text-xs text-red-600">↑ 8% from last month</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-[#EA384C]" />
                </div>
              </CardContent>
            </Card>

            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Offer Acceptance</p>
                    <p className="text-2xl font-bold text-green-600">89%</p>
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </div>
                  <Award className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quality Score</p>
                    <p className="text-2xl font-bold text-blue-600">4.6/5</p>
                    <p className="text-xs text-blue-600">↑ 5% from last month</p>
                  </div>
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card size="lg" variant="default" >
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#EA384C]">Recruitment Funnel</h3>
                <div className="space-y-4">
                  {[
                    { stage: "Job Posted", count: 24, percentage: 100, color: "bg-blue-500" },
                    { stage: "Applications Received", count: 186, percentage: 85, color: "bg-green-500" },
                    { stage: "Initial Screening", count: 142, percentage: 68, color: "bg-yellow-500" },
                    { stage: "Interviews", count: 64, percentage: 42, color: "bg-orange-500" },
                    { stage: "Offers Made", count: 28, percentage: 25, color: "bg-purple-500" },
                    { stage: "Hires Completed", count: 18, percentage: 18, color: "bg-red-500" },
                  ].map((stage, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <span className="text-sm font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{stage.count}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${stage.color}`}
                            style={{ width: `${stage.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}                </div>
              </CardContent>
            </Card>
            
            <Card size="lg" variant="default" >
              <CardContent compact className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#EA384C]">Performance Trends</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Monthly Hiring Goals</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">This Month Progress</span>
                      <span className="text-sm font-bold">18/20 hires</span>
                    </div>
                    <Progress value={90} className="h-3" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Budget Utilization</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Budget Used</span>
                      <span className="text-sm font-bold">₦12.4M/₦15M</span>
                    </div>
                    <Progress value={83} className="h-3" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Candidate Satisfaction</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Overall Rating</span>
                      <span className="text-sm font-bold">4.6/5.0</span>
                    </div>
                    <Progress value={92} className="h-3" />
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black">
                      <PieChart className="mr-2 h-4 w-4" /> View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>        <TabsContent value="transactions" className="p-6 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#EA384C] mb-2">Transactions History</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete record of all financial transactions and payments
            </p>
          </div>          {/* Transaction Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
                <div className="text-2xl font-bold text-[#EA384C]">₦12,450,000</div>
                <div className="text-xs text-green-600 mt-1">+8.2% from last year</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Platform Fees</div>
                <div className="text-2xl font-bold text-[#D4AF37]">₦1,245,000</div>
                <div className="text-xs text-blue-600 mt-1">12 transactions</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                <div className="text-2xl font-bold text-orange-600">₦125,000</div>
                <div className="text-xs text-gray-500 mt-1">2 pending payments</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Last Payment</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">₦75,000</div>
                <div className="text-xs text-gray-500 mt-1">2 days ago</div>
              </CardContent>
            </Card>
          </div>          {/* Transaction Table */}
          <Card size="xl" variant="default" >
            <CardContent compact className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#EA384C]">Recent Transactions</h3>
                <Button variant="outline" className="border-[#EA384C] text-[#EA384C] hover:bg-[#EA384C] hover:text-white">
                  <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Date</th>
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Transaction ID</th>
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Description</th>
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Amount</th>
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Status</th>
                      <th className="text-left p-3 font-semibold text-[#EA384C]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        date: "Dec 15, 2024",
                        id: "TXN-2024-001",
                        description: "Job Posting Fee - Senior Nurse Position",
                        amount: "₦75,000",
                        status: "Completed",
                        statusColor: "text-green-600"
                      },
                      {
                        date: "Dec 12, 2024",
                        id: "TXN-2024-002",
                        description: "Premium Candidate Access - Q4 2024",
                        amount: "₦150,000",
                        status: "Completed",
                        statusColor: "text-green-600"
                      },
                      {
                        date: "Dec 10, 2024",
                        id: "TXN-2024-003",
                        description: "AI Matching Service - November",
                        amount: "₦45,000",
                        status: "Pending",
                        statusColor: "text-orange-600"
                      },
                      {
                        date: "Dec 8, 2024",
                        id: "TXN-2024-004",
                        description: "Job Posting Fee - Lab Technician",
                        amount: "₦65,000",
                        status: "Completed",
                        statusColor: "text-green-600"
                      },
                      {
                        date: "Dec 5, 2024",
                        id: "TXN-2024-005",
                        description: "Bulk Candidate Screening Package",
                        amount: "₦200,000",
                        status: "Completed",
                        statusColor: "text-green-600"
                      }
                    ].map((transaction, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{transaction.date}</td>
                        <td className="p-3 text-sm font-mono text-[#D4AF37]">{transaction.id}</td>
                        <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{transaction.description}</td>
                        <td className="p-3 text-sm font-semibold text-gray-900 dark:text-white">{transaction.amount}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.statusColor}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm" className="text-[#EA384C] border-[#EA384C] hover:bg-[#EA384C] hover:text-white">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="inbox" className="p-6 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#EA384C] mb-2">Inbox & Feedback</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage candidate messages, feedback, and communication history
            </p>
          </div>          {/* Communication Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</div>
                <div className="text-2xl font-bold text-[#EA384C]">7</div>
                <div className="text-xs text-red-600 mt-1">Requires attention</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Feedback Rating</div>
                <div className="text-2xl font-bold text-[#D4AF37]">4.6/5</div>
                <div className="text-xs text-green-600 mt-1">+0.2 this month</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Conversations</div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-500 mt-1">3 pending replies</div>
              </CardContent>
            </Card>
            
            <Card size="sm" variant="stats" >
              <CardContent compact className="p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Response Rate</div>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-xs text-green-600 mt-1">Within 24 hours</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">            {/* Recent Messages */}
            <Card size="lg" variant="default" >
              <CardContent compact className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#EA384C]">Recent Messages</h3>
                  <Button variant="outline" className="border-[#EA384C] text-[#EA384C] hover:bg-[#EA384C] hover:text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson, RN",
                      message: "Thank you for considering my application for the Senior Nurse position...",
                      time: "2 hours ago",
                      unread: true,
                      avatar: "SJ"
                    },
                    {
                      name: "Michael Chen, MD",
                      message: "I have some questions regarding the emergency medicine role...",
                      time: "5 hours ago",
                      unread: true,
                      avatar: "MC"
                    },
                    {
                      name: "Emily Rodriguez, LPN",
                      message: "I wanted to follow up on my interview from last week...",
                      time: "1 day ago",
                      unread: false,
                      avatar: "ER"
                    },
                    {
                      name: "David Kim, PT",
                      message: "Could you provide more details about the physical therapy position?",
                      time: "2 days ago",
                      unread: true,
                      avatar: "DK"
                    }
                  ].map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${message.unread ? 'bg-red-50 dark:bg-red-900/20 border-[#EA384C]/30' : 'bg-gray-50 dark:bg-gray-700/50'} hover:shadow-md transition-shadow`}>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-semibold text-sm">
                          {message.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                              {message.name}
                              {message.unread && <span className="ml-2 w-2 h-2 bg-[#EA384C] rounded-full inline-block"></span>}
                            </h4>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>            {/* Feedback & Reviews */}
            <Card size="lg" variant="default" >
              <CardContent compact className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#EA384C]">Recent Feedback</h3>
                  <Button variant="outline" className="border-[#EA384C] text-[#EA384C] hover:bg-[#EA384C] hover:text-white">
                    <Star className="mr-2 h-4 w-4" /> View All Reviews
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      candidate: "Jennifer Martinez, RN",
                      rating: 5,
                      feedback: "Excellent communication throughout the hiring process. Very professional and transparent about expectations.",
                      date: "3 days ago",
                      position: "ICU Nurse"
                    },
                    {
                      candidate: "Robert Thompson, MD",
                      rating: 4,
                      feedback: "Good experience overall. The interview process was well-structured and informative.",
                      date: "1 week ago",
                      position: "Emergency Physician"
                    },
                    {
                      candidate: "Lisa Wang, PT",
                      rating: 5,
                      feedback: "Great facility with supportive staff. The recruitment team was very helpful and responsive.",
                      date: "2 weeks ago",
                      position: "Physical Therapist"
                    }
                  ].map((review, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{review.candidate}</h4>
                          <p className="text-xs text-[#D4AF37] font-medium">{review.position}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                          <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.feedback}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>          {/* Quick Actions */}
          <Card size="lg" variant="default" className="bg-gradient-to-r from-[#EA384C]/10 to-[#D4AF37]/10">
            <CardContent compact className="p-6">
              <h3 className="text-lg font-bold text-[#EA384C] mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-[#EA384C] hover:bg-red-600 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Compose Message
                </Button>
                <Button className="bg-[#D4AF37] hover:bg-amber-500 text-black">
                  <Users className="mr-2 h-4 w-4" />
                  Bulk Message Candidates
                </Button>
                <Button variant="outline" className="border-[#EA384C] text-[#EA384C] hover:bg-[#EA384C] hover:text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export Communications
                </Button>
              </div>
            </CardContent>
          </Card>        </TabsContent>
        </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
