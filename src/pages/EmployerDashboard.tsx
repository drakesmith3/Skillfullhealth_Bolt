
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  User, 
  Award, 
  ChartBar, 
  Activity, 
  Inbox, 
  CreditCard, 
  ExternalLink, 
  UserCheck, 
  Clipboard, 
  FileText, 
  Users
} from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

import { 
  Bar,
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const jobActivity = [
  { name: 'Jan', applications: 12, positions: 5 },
  { name: 'Feb', applications: 19, positions: 8 },
  { name: 'Mar', applications: 25, positions: 10 },
  { name: 'Apr', applications: 32, positions: 12 },
  { name: 'May', applications: 28, positions: 15 },
  { name: 'Jun', applications: 35, positions: 18 },
];

const candidateData = [
  { name: 'Reviewed', value: 65 },
  { name: 'Shortlisted', value: 25 },
  { name: 'Interviewed', value: 10 },
];

const hiringMetrics = [
  { name: 'Time to Hire', metric: '14 days', change: '-2 days', status: 'positive' },
  { name: 'Cost per Hire', metric: '₦120,000', change: '-₦15,000', status: 'positive' },
  { name: 'Acceptance Rate', metric: '85%', change: '+5%', status: 'positive' },
  { name: 'Retention Rate', metric: '92%', change: '+1%', status: 'positive' },
];

const employerDashboardTabs = [
  { id: 'overview', label: 'Overview', icon: ChartBar },
  { id: 'jobs', label: 'My Jobs', icon: Briefcase },
  { id: 'candidates', label: 'Candidates', icon: Users },
  { id: 'payments', label: 'Payments', icon: CreditCard },
];

const pendingActions = [
  { title: 'Review New Candidates', count: 12, action: 'View', link: '/candidates' },
  { title: 'Schedule Interviews', count: 5, action: 'Schedule', link: '/interviews' },
  { title: 'Approve Job Postings', count: 3, action: 'Approve', link: '/jobs/pending' },
  { title: 'Complete Profile', count: 1, action: 'Complete', link: '/profile' },
];

// Sample data for job postings
const jobPostings = [
  {
    id: 'job-001',
    title: 'Senior Medical Officer',
    location: 'Lagos',
    type: 'Full-time',
    applicants: 24,
    posted: '2023-06-15',
    status: 'Active',
  },
  {
    id: 'job-002',
    title: 'Locum General Practitioner',
    location: 'Abuja',
    type: 'Contract',
    applicants: 16,
    posted: '2023-05-28',
    status: 'Active',
  },
  {
    id: 'job-003',
    title: 'Pediatric Specialist',
    location: 'Port Harcourt',
    type: 'Part-time',
    applicants: 8,
    posted: '2023-06-02',
    status: 'Closed',
  },
  {
    id: 'job-004',
    title: 'Emergency Department Physician',
    location: 'Kano',
    type: 'Full-time',
    applicants: 19,
    posted: '2023-06-10',
    status: 'Active',
  },
];

// Sample data for candidates
const candidates = [
  {
    id: 'cand-001',
    name: 'Dr. Adeola Johnson',
    position: 'Senior Medical Officer',
    experience: '8 years',
    glohsenScore: 176,
    status: 'Shortlisted',
    jobId: 'job-001',
  },
  {
    id: 'cand-002',
    name: 'Dr. Emmanuel Okafor',
    position: 'Pediatric Specialist',
    experience: '12 years',
    glohsenScore: 185,
    status: 'Interview Scheduled',
    jobId: 'job-003',
  },
  {
    id: 'cand-003',
    name: 'Dr. Sarah Abubakar',
    position: 'Locum General Practitioner',
    experience: '5 years',
    glohsenScore: 162,
    status: 'Application Received',
    jobId: 'job-002',
  },
  {
    id: 'cand-004',
    name: 'Dr. Michael Eze',
    position: 'Emergency Department Physician',
    experience: '10 years',
    glohsenScore: 190,
    status: 'Offer Extended',
    jobId: 'job-004',
  },
];

// Sample data for payment transactions
const paymentTransactions = [
  {
    id: 'trans-001',
    date: '2023-06-15',
    description: 'Job Posting - Senior Medical Officer',
    amount: '50,000',
    status: 'Completed',
  },
  {
    id: 'trans-002',
    date: '2023-05-28',
    description: 'Premium Subscription - Monthly',
    amount: '25,000',
    status: 'Completed',
  },
  {
    id: 'trans-003',
    date: '2023-06-20',
    description: 'Candidate Background Check',
    amount: '15,000',
    status: 'Pending',
  },
  {
    id: 'trans-004',
    date: '2023-06-10',
    description: 'Featured Job Listing',
    amount: '20,000',
    status: 'Completed',
  },
];

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="employer dashboard" userName="Lagos Medical Center" isEmployer={true} />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16 flex">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 lg:w-1/5 pr-6">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, Lagos Medical Center!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="button-3d bg-[#D4AF37] text-black">
                <Briefcase className="mr-2 h-4 w-4" /> Post a New Job
              </Button>
            </div>
          </div>

          {/* Pending Actions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pendingActions.map((action, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm flex items-center">
                    {action.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-2xl font-bold">{action.count}</span>
                    <Link to={action.link}>
                      <Button size="sm" variant="outline" className="text-xs">
                        {action.action}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {employerDashboardTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center">
                  <tab.icon className="mr-2 h-4 w-4" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Activity Chart */}
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Activity</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={jobActivity}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="applications" fill="#D4AF37" name="Applications" />
                          <Bar dataKey="positions" fill="#EA384C" name="Positions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Candidate Pipeline */}
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Candidate Pipeline</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={candidateData} 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={80} 
                            fill="#8884d8" 
                            dataKey="value"
                            label
                          >
                            {candidateData.map((entry, index) => (
                              <cell key={`cell-${index}`} fill={index === 0 ? "#D4AF37" : index === 1 ? "#EA384C" : "#1A1F2C"} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hiring Metrics */}
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hiring Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hiringMetrics.map((metric, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</h4>
                        <p className="text-xl font-bold mt-1">{metric.metric}</p>
                        <span className={`text-xs ${metric.status === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">New candidate applied</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dr. Funmi Adeleke applied for Senior Medical Officer</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                        <Clipboard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Interview scheduled</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Interview with Dr. Emmanuel Okafor on June 25, 2023</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium">New job posted</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Emergency Department Physician position published</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jobs Tab Content */}
            <TabsContent value="jobs" className="space-y-4">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Active Job Postings</h3>
                    <Button className="button-3d bg-[#D4AF37] text-black">
                      <Briefcase className="mr-2 h-4 w-4" /> Post New Job
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicants</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {jobPostings.map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{job.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{job.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{job.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{job.applicants}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{job.posted}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button size="sm" variant="ghost">Edit</Button>
                              <Button size="sm" variant="ghost" className="text-red-600">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Job Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Application Trends</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={jobActivity}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="applications" 
                            stroke="#D4AF37" 
                            name="Applications" 
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Job Performance</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Senior Medical Officer</span>
                          <span className="text-sm font-medium">24 applications</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Locum General Practitioner</span>
                          <span className="text-sm font-medium">16 applications</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Pediatric Specialist</span>
                          <span className="text-sm font-medium">8 applications</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Emergency Department Physician</span>
                          <span className="text-sm font-medium">19 applications</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Candidates Tab Content */}
            <TabsContent value="candidates" className="space-y-4">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recent Candidates</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        Sort
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GLOHSEN Score</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {candidates.map((candidate) => (
                          <tr key={candidate.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{candidate.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{candidate.position}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{candidate.experience}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#D4AF37]">{candidate.glohsenScore}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                candidate.status === 'Shortlisted' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : candidate.status === 'Interview Scheduled'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    : candidate.status === 'Offer Extended'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {candidate.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button size="sm" variant="ghost">View Profile</Button>
                              <Button size="sm" variant="ghost">Contact</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Candidate Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Candidate Sources</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Direct', value: 40 },
                              { name: 'Referrals', value: 25 },
                              { name: 'Job Boards', value: 20 },
                              { name: 'Social Media', value: 15 }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            <cell fill="#D4AF37" />
                            <cell fill="#EA384C" />
                            <cell fill="#1A1F2C" />
                            <cell fill="#6B7280" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Top Candidates by GLOHSEN Score</h3>
                    <div className="space-y-4">
                      {candidates
                        .sort((a, b) => b.glohsenScore - a.glohsenScore)
                        .slice(0, 3)
                        .map((candidate, index) => (
                          <div key={candidate.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                                <span className="font-medium">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium">{candidate.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.position}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-[#D4AF37]">{candidate.glohsenScore}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">GLOHSEN Score</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payments Tab Content */}
            <TabsContent value="payments" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</h3>
                    <p className="text-2xl font-bold mt-1">₦110,000</p>
                    <p className="text-xs text-green-500 mt-1">+5% from last month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payments</h3>
                    <p className="text-2xl font-bold mt-1">₦15,000</p>
                    <p className="text-xs text-gray-500 mt-1">1 transaction</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Status</h3>
                    <p className="text-xl font-bold mt-1">Premium Plan</p>
                    <p className="text-xs text-gray-500 mt-1">Renews on Jul 28, 2023</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Transaction History</h3>
                    <Button variant="outline" size="sm">Download Report</Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount (₦)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {paymentTransactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{transaction.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Button size="sm" variant="ghost">View Receipt</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">VISA ending in 4242</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 06/2025</p>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Default
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 8888</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2024</p>
                        </div>
                      </div>
                      <div>
                        <Button size="sm" variant="ghost">Set Default</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default EmployerDashboard;
