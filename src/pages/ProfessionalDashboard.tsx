import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ChartContainer, ChartTooltip } from "../components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { 
  User, Award, CreditCard, ExternalLink, MessageCircle, 
  Briefcase, Activity, Clock, Eye, EyeOff, Upload, 
  ChevronDown, Users, Star, Calendar, DollarSign,
  Mail, Phone, MapPin, FileText, CheckCircle, 
  AlertCircle, TrendingUp, Heart, Stethoscope,
  BookOpen, Target, Zap, Shield, Globe, BarChart,
  BarChart3, MoreVertical, Building, Send, MessageSquare
} from "lucide-react";
import PreHeader from '../components/PreHeader';
import { Link, useLocation } from "react-router-dom";
import { Switch } from "../components/ui/switch";

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [showScore, setShowScore] = useState(true);
  const [showEarnings, setShowEarnings] = useState(true);
  const [subspecialty, setSubspecialty] = useState("General Practice");
  const [availability, setAvailability] = useState("Yes Immediately");
  const [selectedEMR, setSelectedEMR] = useState("");

  // Handle navigation state from sidebar
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const glohsenScore = 77;
  const employerScore = "85/110";
  const earnings = "Q5,000,000";

  // User's selected subspecialties (max 4 from registration)
  const userSubspecialties = [
    "General Practice",
    "Occupational Health and Safety", 
    "Occupational Medicine",
    "Academics"
  ];

  // Availability options
  const availabilityOptions = [
    "Yes Immediately",
    "Yes <30 days",
    "Yes >30 days", 
    "Not available"
  ];

  // EMR/EHR Systems
  const emrSystems = [
    "Epic",
    "Cerner",
    "Helium Health",
    "athenahealth",
    "NextGen",
    "eClinic",
    "Practice Fusion",
    "Other"
  ];

  // Compulsory Skills
  const compulsorySkills = [
    { name: "BLS", status: "ADVANCED", uploaded: true },
    { name: "ACLS", status: "BASIC", uploaded: false },
    { name: "ETHICS", status: "ADVANCED", uploaded: true },
    { name: "COMMUNICATION", status: "ADVANCED", uploaded: true },
    { name: "RESUME/CV", status: "Uploaded", uploaded: true },
  ];

  // Complementary Skills  
  const complementarySkills = [
    { name: "ATLS", status: "BASIC", uploaded: true },
    { name: "PALS", status: "ADVANCED", uploaded: true },
    { name: "NEBOSH INTL DIPLOMA", status: "IN VIEW", uploaded: false }, 
    { name: "MASTERS", status: "NONE", uploaded: false }
  ];

  const coursesTaken = [
    { name: "BLS", level: "ADVANCED", date: "2024-01-15" },
    { name: "ETHICS", level: "ADVANCED", date: "2024-02-20" },
    { name: "COMMUNICATION", level: "ADVANCED", date: "2024-03-10" }
  ];

  const coursesRecommended = [
    { name: "ACLS", action: "Re-Attempt", priority: "High" },
    { name: "NORMAL DELIVERY", action: "Attempt", priority: "Medium" },
    { name: "FIRE SAFETY", action: "Attempt", priority: "Low" },
    { name: "NEBOSH IGC", action: "Attempt", priority: "Medium" },
    { name: "ECG", action: "Attempt", priority: "High" },
    { name: "ULTRASOUND", action: "Attempt", priority: "Medium" }
  ];

  const recentActivities = [
    { text: "Completed: Advanced Cardiology CME", time: "2 hours ago", type: "course" },
    { text: "Commented on 'Best Practices in Telemedicine'", time: "5 hours ago", type: "forum" },
    { text: "Joined the Oncology Group", time: "Yesterday", type: "community" },
    { text: "Updated profile certificates", time: "2 days ago", type: "profile" },
    { text: "Applied for Locum position", time: "3 days ago", type: "job" },
    { text: "Received feedback from employer", time: "1 week ago", type: "feedback" }
  ];

  const aboutToExpire = [
    { name: "Annual License", expiry: "30 days", urgency: "high" },
    { name: "BLS Certificate", expiry: "60 days", urgency: "medium" },
    { name: "ACLS Certificate", expiry: "90 days", urgency: "low" }
  ];
  const forumDiscussions = [
    { title: "Best Practices in Emergency Medicine", replies: 23, lastActive: "2 hours ago" },
    { title: "Telemedicine Success Stories", replies: 45, lastActive: "5 hours ago" },
    { title: "Pediatric Care Updates", replies: 12, lastActive: "1 day ago" }
  ];

  // Chart data for analytics
  const earningsData = [
    { month: 'Jan', earnings: 450000, jobs: 8 },
    { month: 'Feb', earnings: 520000, jobs: 10 },
    { month: 'Mar', earnings: 680000, jobs: 12 },
    { month: 'Apr', earnings: 720000, jobs: 14 },
    { month: 'May', earnings: 850000, jobs: 16 },
  ];

  const skillsDistributionData = [
    { name: 'Clinical Skills', value: 40, color: '#ea384c' },
    { name: 'Emergency Care', value: 25, color: '#D4AF37' },
    { name: 'Communication', value: 20, color: '#3B82F6' },
    { name: 'Leadership', value: 15, color: '#10B981' },
  ];

  const jobPerformanceData = [
    { category: 'Punctuality', score: 95 },
    { category: 'Communication', score: 88 },
    { category: 'Clinical Skills', score: 92 },
    { category: 'Teamwork', score: 89 },
    { category: 'Professionalism', score: 94 },
  ];

  const chartConfig = {
    earnings: { label: "Earnings", color: "#ea384c" },
    jobs: { label: "Jobs", color: "#D4AF37" },
    score: { label: "Score", color: "#10B981" },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <PreHeader currentPage="Professional Dashboard" userName="Dr. Olusiji" />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>            <TabsList className="grid w-full grid-cols-6 mb-8 bg-white dark:bg-gray-800 h-14 shadow-lg border border-gray-200 dark:border-gray-700">
              <TabsTrigger 
                value="overview" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                MY PROFILE
              </TabsTrigger>
              <TabsTrigger 
                value="courses" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                MY COURSES
              </TabsTrigger>
              <TabsTrigger 
                value="jobs" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                MY JOBS HISTORY
              </TabsTrigger>
              <TabsTrigger 
                value="transactions" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                TRANSACTIONS HISTORY
              </TabsTrigger>
              <TabsTrigger 
                value="inbox" 
                className="flex items-center font-semibold text-sm transition-all duration-300 hover:bg-[#ea384c]/10 data-[state=active]:bg-[#ea384c] data-[state=active]:text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                INBOX & FEEDBACK
              </TabsTrigger></TabsList>
            
            <TabsContent value="overview" className="space-y-8 animate-fadeIn">
              {/* Top Section - Profile Info, Score, Earnings */}
              <div className="grid grid-cols-12 gap-6 mb-8">
                {/* Profile Info */}
                <div className="col-span-12 md:col-span-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#ea384c] to-[#d12e42] rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        OLUSIJI OLAWUMI
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">DOCTOR | HEALTH & SAFETY PHYSICIAN</p>
                      <div className="mt-2 flex items-center">
                        <p className="text-sm text-gray-500 mr-2">MDCN: MD12345</p>
                        <a 
                          href="https://portal.mdcn.gov.ng/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors duration-300"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          <span className="text-xs font-medium">Verify</span>
                        </a>
                      </div>
                      <div className="mt-4">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">SUBSPECIALTY:</label>
                        <Select value={subspecialty} onValueChange={setSubspecialty}>
                          <SelectTrigger className="w-full mt-1 border-2 border-gray-200 hover:border-[#ea384c] transition-colors duration-300">
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
                <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#ea384c] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      GLOHSEN SCORE
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="score-toggle"
                        checked={showScore}
                        onCheckedChange={setShowScore}
                        className="data-[state=checked]:bg-[#ea384c]"
                      />
                      {showScore ? <Eye size={16} className="text-gray-600" /> : <EyeOff size={16} className="text-gray-400" />}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#ea384c] mb-2">
                      {showScore ? glohsenScore : "***"}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-[#ea384c] to-[#d12e42] h-2 rounded-full transition-all duration-1000"
                        style={{ width: showScore ? `${glohsenScore}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      EMPLOYER CRITERIA SCORE
                    </div>
                    <div className="text-lg font-bold text-[#ea384c] mb-4">
                      {showScore ? employerScore : "***"}
                    </div>
                    <Link to="/score">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-all duration-300 transform hover:scale-105">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Earnings */}
                <div className="col-span-12 md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#ea384c] flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      EARNINGS
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="earnings-toggle"
                        checked={showEarnings}
                        onCheckedChange={setShowEarnings}
                        className="data-[state=checked]:bg-[#ea384c]"
                      />
                      {showEarnings ? <Eye size={16} className="text-gray-600" /> : <EyeOff size={16} className="text-gray-400" />}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {showEarnings ? earnings : "Q*,***,***"}
                    </div>                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Available Balance</div>
                    <Link to="/purse/professional">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-all duration-300 transform hover:scale-105">
                        Withdraw
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>              {/* Availability Dropdown */}
              <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                <CardContent compact>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#ea384c]/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-[#ea384c]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">AVAILABILITY FOR LOCUM</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Set your current availability status</p>
                      </div>
                    </div>
                    <div className="w-64">
                      <Select value={availability} onValueChange={setAvailability}>
                        <SelectTrigger className="w-full border-2 border-gray-200 hover:border-[#ea384c] transition-colors duration-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Three Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Skills/Certificates */}
                <div className="space-y-6">                  {/* SKILLS/CERTIFICATES Header */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <div className="p-4 bg-gradient-to-r from-[#ea384c] to-[#d12e42] rounded-t-lg">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        SKILLS/CERTIFICATES
                      </h3>
                    </div>
                      {/* Compulsory Skills */}
                    <CardContent compact>
                      <div className="mb-6">
                        <h4 className="text-md font-bold text-[#ea384c] mb-4 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          COMPULSORY SKILLS
                        </h4>
                        <div className="space-y-3">
                          {compulsorySkills.map((skill, index) => (
                            <div key={skill.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-[#ea384c] hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge 
                                    className={
                                      skill.status === 'ADVANCED' ? 'bg-[#D4AF37] text-black hover:bg-[#B8941F]' :
                                      skill.status === 'BASIC' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                                      'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                    }
                                  >
                                    {skill.status}
                                  </Badge>
                                  {!skill.uploaded && (
                                    <Button size="sm" variant="outline" className="text-xs hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                                      <Upload className="h-3 w-3 mr-1" />
                                      Upload
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Complementary Skills */}
                      <div>
                        <h4 className="text-md font-bold text-[#ea384c] mb-4 flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          COMPLEMENTARY SKILLS
                        </h4>
                        <div className="space-y-3 mb-4">
                          {complementarySkills.map((skill, index) => (
                            <div key={skill.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-[#D4AF37] hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge 
                                    className={
                                      skill.status === 'ADVANCED' ? 'bg-[#D4AF37] text-black hover:bg-[#B8941F]' :
                                      skill.status === 'BASIC' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                                      'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                    }
                                  >
                                    {skill.status}
                                  </Badge>
                                  {!skill.uploaded && (
                                    <Button size="sm" variant="outline" className="text-xs hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                                      <Upload className="h-3 w-3 mr-1" />
                                      Upload
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* EMR/EHR Systems */}
                        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-blue-200 dark:border-gray-600">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-blue-600" />
                            EMR/EHR Systems Experience:
                          </label>
                          <Select value={selectedEMR} onValueChange={setSelectedEMR}>
                            <SelectTrigger className="w-full border-2 border-blue-200 hover:border-blue-400 transition-colors duration-300">
                              <SelectValue placeholder="Select EMR/EHR System" />
                            </SelectTrigger>
                            <SelectContent>
                              {emrSystems.map(system => (
                                <SelectItem key={system} value={system}>{system}</SelectItem>
                              ))}
                            </SelectContent>                          </Select>
                        </div>

                        {/* MLM Network Button */}
                        <div className="mt-6 p-4 bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-lg border border-[#D4AF37]">
                          <div className="text-center">
                            <h5 className="text-sm font-bold text-[#D4AF37] mb-2 flex items-center justify-center">
                              <Users className="h-4 w-4 mr-2" />
                              MLM NETWORK
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                              Build your referral network and earn multi-level marketing bonuses
                            </p>
                            <Link to="/mlm-tree">
                              <Button 
                                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-all duration-300 transform hover:scale-105"
                                size="sm"
                              >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                VIEW MY NETWORK
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>{/* Middle Column - CME Courses Taken */}
                <div className="space-y-6">
                  {/* CME Courses Taken */}                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <div className="p-4 bg-gradient-to-r from-[#ea384c] to-[#d12e42] rounded-t-lg">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        CME COURSES TAKEN
                      </h3>
                    </div>
                    <CardContent compact>
                      <div className="space-y-4">
                        {coursesTaken.map((course, index) => (
                          <div key={course.name} className="p-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bold text-lg">{course.name}</div>
                                <div className="text-sm opacity-80">{course.level}</div>
                              </div>
                              <div className="text-xs opacity-70">
                                {new Date(course.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>                  {/* Join the Conversation */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <CardContent compact>
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                          <MessageCircle className="h-6 w-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-lg font-bold ml-3">JOIN THE CONVERSATION</h3>
                      </div>
                      
                      {/* Forum Discussions Preview */}
                      <div className="space-y-3 mb-4">
                        {forumDiscussions.map((discussion, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer">
                            <div className="font-medium text-sm mb-1">{discussion.title}</div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{discussion.replies} replies</span>
                              <span>{discussion.lastActive}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Connect with other professionals and share insights.
                      </p>
                      <Link to="/community-forum">
                        <Button className="w-full bg-[#ea384c] hover:bg-[#d12e42] text-white transition-all duration-300 transform hover:scale-105">
                          VIEW ALL DISCUSSIONS
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>                  {/* Locum Jobs */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-lg">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        LOCUM JOBS
                      </h3>
                    </div>
                    <CardContent compact>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-sm font-medium">Completed Jobs</span>
                          <Badge className="bg-green-500 text-white">4</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="text-sm font-medium">Active Offers</span>
                          <Link to="/job-board" className="text-sm text-[#ea384c] hover:underline font-semibold">
                            5 (View All)
                          </Link>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <span className="text-sm font-medium">Pending Applications</span>
                          <Badge className="bg-yellow-500 text-white">2</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>                  {/* About to Expire */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-lg">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        ABOUT TO EXPIRE
                      </h3>
                    </div>
                    <CardContent compact>
                      <div className="space-y-3">
                        {aboutToExpire.map((item, index) => (
                          <div key={item.name} className={`p-3 rounded-lg border-l-4 ${
                            item.urgency === 'high' ? 'bg-red-50 border-red-500 dark:bg-red-900/20' :
                            item.urgency === 'medium' ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/20' :
                            'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20'
                          } hover:shadow-md transition-all duration-300`}>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{item.name}</span>
                              <div className="flex items-center">
                                <Clock className={`h-4 w-4 mr-1 ${
                                  item.urgency === 'high' ? 'text-red-500' :
                                  item.urgency === 'medium' ? 'text-orange-500' :
                                  'text-yellow-500'
                                }`} />
                                <span className={`text-xs font-semibold ${
                                  item.urgency === 'high' ? 'text-red-500' :
                                  item.urgency === 'medium' ? 'text-orange-500' :
                                  'text-yellow-500'
                                }`}>
                                  {item.expiry}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link to="/profile" className="block mt-4">
                        <Button variant="outline" className="w-full text-xs hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          Update in My Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>                {/* Right Column - CME Courses Recommended */}
                <div className="space-y-6">                  {/* Courses Recommended */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <div className="p-4 bg-gradient-to-r from-[#ea384c] to-[#d12e42] rounded-t-lg">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        CME COURSES RECOMMENDED
                      </h3>
                    </div>
                    <CardContent compact>
                      <div className="space-y-4">
                        {coursesRecommended.map((course, index) => (
                          <div key={course.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-semibold text-sm text-gray-900 dark:text-white">{course.name}</div>
                              <Badge className={
                                course.priority === 'High' ? 'bg-red-500 text-white' :
                                course.priority === 'Medium' ? 'bg-yellow-500 text-white' :
                                'bg-green-500 text-white'
                              }>
                                {course.priority}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-600 dark:text-gray-400">{course.action}</div>
                              <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                                Start
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-all duration-300 transform hover:scale-105">
                          VIEW ALL COURSES
                        </Button>
                      </div>
                    </CardContent>
                  </Card>                  {/* Recent Activity */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <CardContent compact>
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                          <Activity className="h-6 w-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-lg font-bold ml-3">RECENT ACTIVITY</h3>
                      </div>
                      <div className="space-y-4 mb-6">
                        {recentActivities.slice(0, 4).map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                            <div className={`p-1 rounded-full ${
                              activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                              activity.type === 'forum' ? 'bg-green-100 text-green-600' :
                              activity.type === 'community' ? 'bg-purple-100 text-purple-600' :
                              activity.type === 'profile' ? 'bg-orange-100 text-orange-600' :
                              activity.type === 'job' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {activity.type === 'course' && <BookOpen className="h-3 w-3" />}
                              {activity.type === 'forum' && <MessageCircle className="h-3 w-3" />}
                              {activity.type === 'community' && <Users className="h-3 w-3" />}
                              {activity.type === 'profile' && <User className="h-3 w-3" />}
                              {activity.type === 'job' && <Briefcase className="h-3 w-3" />}
                              {activity.type === 'feedback' && <Star className="h-3 w-3" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</div>
                              <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link to="/activity">
                        <Button variant="outline" className="w-full hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          VIEW ALL ACTIVITIES
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>                  {/* Quick Stats */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <CardContent compact>
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        QUICK STATS
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">12</div>
                          <div className="text-xs text-blue-600">Courses Completed</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">4.8</div>
                          <div className="text-xs text-green-600">Avg Rating</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">156</div>
                          <div className="text-xs text-purple-600">CME Hours</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">8</div>
                          <div className="text-xs text-orange-600">Network Size</div>
                        </div>                      </div>
                    </CardContent>                  </Card>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <BarChart className="mr-3 h-6 w-6 text-[#ea384c]" />
                  Performance Analytics
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Earnings Trend */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <CardContent compact className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-[#ea384c]" />
                        Earnings & Jobs Trend
                      </h3>
                      <ChartContainer config={chartConfig} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip formatter={(value, name) => {
                              if (name === 'earnings') return [`Q${value.toLocaleString()}`, 'Earnings'];
                              return [value, 'Jobs'];
                            }} />
                            <Line 
                              yAxisId="left"
                              type="monotone" 
                              dataKey="earnings" 
                              stroke="var(--color-earnings)" 
                              strokeWidth={3}
                              name="Earnings (Q)"
                            />
                            <Line 
                              yAxisId="right"
                              type="monotone" 
                              dataKey="jobs" 
                              stroke="var(--color-jobs)" 
                              strokeWidth={3}
                              name="Jobs Completed"
                            />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Skills Distribution */}
                  <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                    <CardContent compact className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                        <Target className="mr-2 h-5 w-5 text-[#ea384c]" />
                        Skills Distribution
                      </h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={skillsDistributionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {skillsDistributionData.map((entry, index) => (
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

                {/* Job Performance Metrics */}
                <Card size="lg" variant="default" className="hover:shadow-xl transition-all duration-300">
                  <CardContent compact className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                      <Star className="mr-2 h-5 w-5 text-[#ea384c]" />
                      Job Performance Metrics
                    </h3>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={jobPerformanceData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="category" />
                          <ChartTooltip formatter={(value) => [`${value}%`, 'Score']} />
                          <Bar dataKey="score" fill="var(--color-score)" name="Performance Score %" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent><TabsContent value="profile" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">                {/* Personal Information */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="OLUSIJI" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="OLAWUMI" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="olusiji.olawumi@email.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+234 801 234 5678" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue="123 Medical Drive, Victoria Island, Lagos" className="mt-1" />
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <Stethoscope className="h-5 w-5 mr-2" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact className="space-y-4">
                    <div>
                      <Label htmlFor="mdcn">MDCN Registration Number</Label>
                      <Input id="mdcn" defaultValue="MD12345" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Primary Specialization</Label>
                      <Select defaultValue="general-practice">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general-practice">General Practice</SelectItem>
                          <SelectItem value="occupational-health">Occupational Health</SelectItem>
                          <SelectItem value="emergency">Emergency Medicine</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select defaultValue="5-10">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currentWorkplace">Current Workplace</Label>
                      <Input id="currentWorkplace" defaultValue="Lagos General Hospital" className="mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>              {/* GLOHSEN Score History */}
              <Card size="xl" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    GLOHSEN Score History
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-[#ea384c]/10 to-[#d12e42]/10 rounded-lg">
                      <div className="text-3xl font-bold text-[#ea384c] mb-2">77</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current Score</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">+12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">85</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Target Score</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { date: "Jan 2024", score: 77, change: "+5" },
                      { date: "Dec 2023", score: 72, change: "+3" },
                      { date: "Nov 2023", score: 69, change: "+7" },
                      { date: "Oct 2023", score: 62, change: "+2" },
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium">{record.date}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">{record.score}</span>
                          <span className="text-green-600 text-sm">({record.change})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>              {/* Certificates & Licenses */}
              <Card size="xl" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Award className="h-5 w-5 mr-2" />
                    Certificates & Licenses
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Medical License", issued: "MDCN", expiry: "Dec 2024", status: "Active" },
                      { name: "BLS Certification", issued: "AHA", expiry: "Mar 2024", status: "Expiring Soon" },
                      { name: "ACLS Certification", issued: "AHA", expiry: "Jun 2024", status: "Active" },
                      { name: "NEBOSH IGC", issued: "NEBOSH", expiry: "Aug 2025", status: "Active" },
                    ].map((cert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <Badge className={
                            cert.status === 'Active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                          }>
                            {cert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Issued by: {cert.issued}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expires: {cert.expiry}</p>
                        <Button size="sm" variant="outline" className="mt-2 hover:bg-[#ea384c] hover:text-white">
                          <Upload className="h-3 w-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>              {/* AI Activity Tracking */}
              <Card size="xl" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Activity className="h-5 w-5 mr-2" />
                    AI Activity Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-xs text-blue-600">Hours Logged</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-xs text-green-600">Courses Completed</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-xs text-purple-600">Certifications</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.8</div>
                      <div className="text-xs text-orange-600">Avg Rating</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                      Save Profile Changes
                    </Button>
                  </div>                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">              {/* Course Stats Cards */}
                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Completed</p>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CME Hours</p>
                        <p className="text-2xl font-bold text-green-600">156</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                        <p className="text-2xl font-bold text-purple-600">8</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                        <p className="text-2xl font-bold text-orange-600">Q180,000</p>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">                {/* Completed Courses */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Completed Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="space-y-4">
                      {[
                        { 
                          name: "Advanced BLS Training", 
                          completedDate: "Jan 15, 2024", 
                          score: 95, 
                          cmeHours: 8,
                          certificate: true 
                        },
                        { 
                          name: "Medical Ethics & Communication", 
                          completedDate: "Feb 20, 2024", 
                          score: 88, 
                          cmeHours: 12,
                          certificate: true 
                        },
                        { 
                          name: "ACLS Recertification", 
                          completedDate: "Mar 10, 2024", 
                          score: 92, 
                          cmeHours: 16,
                          certificate: true 
                        },
                      ].map((course, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{course.name}</h4>
                            <div className="flex items-center space-x-2">
                              {course.certificate && (
                                <Badge className="bg-[#D4AF37] text-black">Certified</Badge>
                              )}
                              <Badge className="bg-green-500 text-white">{course.score}%</Badge>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                            <span>Completed: {course.completedDate}</span>
                            <span>{course.cmeHours} CME Hours</span>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                              <FileText className="h-3 w-3 mr-1" />
                              Certificate
                            </Button>
                            <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link to="/courses">
                        <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
                          Browse All Courses
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>                {/* Course Analytics & Progress */}
                <div className="space-y-6">
                  {/* Course Completion Trends */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Course Completion Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[
                            { month: 'Sep', completed: 2, cme: 8 },
                            { month: 'Oct', completed: 3, cme: 12 },
                            { month: 'Nov', completed: 5, cme: 20 },
                            { month: 'Dec', completed: 4, cme: 16 },
                            { month: 'Jan', completed: 6, cme: 24 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="completed" stroke="#ea384c" strokeWidth={3} name="Courses Completed" />
                            <Line type="monotone" dataKey="cme" stroke="#D4AF37" strokeWidth={3} name="CME Hours" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CME Hours Distribution */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <Clock className="h-5 w-5 mr-2" />
                        CME Hours Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Emergency Medicine', value: 25, color: '#ea384c' },
                                { name: 'Ethics & Law', value: 20, color: '#D4AF37' },
                                { name: 'Patient Safety', value: 18, color: '#3b82f6' },
                                { name: 'Clinical Skills', value: 15, color: '#10b981' },
                                { name: 'Research Methods', value: 12, color: '#8b5cf6' },
                                { name: 'Others', value: 10, color: '#f59e0b' }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {[
                                { name: 'Emergency Medicine', value: 25, color: '#ea384c' },
                                { name: 'Ethics & Law', value: 20, color: '#D4AF37' },
                                { name: 'Patient Safety', value: 18, color: '#3b82f6' },
                                { name: 'Clinical Skills', value: 15, color: '#10b981' },
                                { name: 'Research Methods', value: 12, color: '#8b5cf6' },
                                { name: 'Others', value: 10, color: '#f59e0b' }
                              ].map((entry, index) => (
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

                  {/* Learning Progress Analytics */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <BarChart className="h-5 w-5 mr-2" />
                        Learning Progress Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>78%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-[#ea384c] h-3 rounded-full w-3/4"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Compulsory Courses</span>
                            <span>100%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full w-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Elective Courses</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div className="bg-blue-500 h-3 rounded-full w-2/3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={[
                            { category: 'Quiz Scores', score: 85 },
                            { category: 'Assignment Completion', score: 92 },
                            { category: 'Video Engagement', score: 78 },
                            { category: 'Discussion Participation', score: 65 },
                            { category: 'Practical Skills', score: 88 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis domain={[0, 100]} />
                            <ChartTooltip formatter={(value) => [`${value}%`, 'Score']} />
                            <Bar dataKey="score" fill="#ea384c" name="Performance Score %" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements & Badges */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <Star className="h-5 w-5 mr-2" />
                        Achievements & Badges
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: "BLS Expert", icon: "🚑", earned: true },
                          { name: "Ethics Pro", icon: "⚖️", earned: true },
                          { name: "ACLS Master", icon: "❤️", earned: true },
                          { name: "Pediatric Care", icon: "👶", earned: true },
                          { name: "Safety Leader", icon: "🛡️", earned: false },
                          { name: "Research Pro", icon: "🔬", earned: false },
                        ].map((badge, index) => (
                          <div key={index} className={`text-center p-3 rounded-lg ${
                            badge.earned 
                              ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 border border-[#D4AF37]' 
                              : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 opacity-50'
                          }`}>
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <div className="text-xs font-medium">{badge.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>            <TabsContent value="transactions" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Transaction Summary Cards */}
                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</p>
                        <p className="text-2xl font-bold text-green-600">Q5,000,000</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payments</p>
                        <p className="text-2xl font-bold text-yellow-600">Q350,000</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="md" variant="stats">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                        <p className="text-2xl font-bold text-blue-600">Q750,000</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="space-y-4">
                    {[                      { id: "TXN001", date: "2024-01-15", description: "Locum Payment - Lagos General Hospital", amount: "Q250,000", status: "Completed", type: "credit" },
                      { id: "TXN002", date: "2024-01-10", description: "Course Fee - Advanced BLS Training", amount: "Q15,000", status: "Completed", type: "debit" },
                      { id: "TXN003", date: "2024-01-05", description: "Locum Payment - Federal Medical Centre", amount: "Q300,000", status: "Completed", type: "credit" },
                      { id: "TXN004", date: "2024-01-02", description: "Platform Commission", amount: "Q12,500", status: "Completed", type: "debit" },
                      { id: "TXN005", date: "2023-12-28", description: "Locum Payment - Private Clinic", amount: "Q180,000", status: "Pending", type: "credit" },
                      { id: "TXN006", date: "2023-12-25", description: "Course Fee - ACLS Renewal", amount: "Q25,000", status: "Completed", type: "debit" },
                      { id: "TXN007", date: "2023-12-20", description: "Locum Payment - University Hospital", amount: "Q400,000", status: "Completed", type: "credit" },
                      { id: "TXN008", date: "2023-12-15", description: "MLM Commission", amount: "Q50,000", status: "Completed", type: "credit" },
                    ].map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? 
                              <TrendingUp className="h-4 w-4" /> : 
                              <DollarSign className="h-4 w-4" />
                            }
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{transaction.description}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {transaction.id} • {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                          </p>
                          <Badge className={
                            transaction.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                          }>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                      Load More Transactions
                    </Button>
                  </div>
                </CardContent>
              </Card>              {/* Transaction Filters & Export */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <FileText className="h-5 w-5 mr-2" />
                    Filter & Export
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label htmlFor="dateFrom">From Date</Label>
                      <Input id="dateFrom" type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="dateTo">To Date</Label>
                      <Input id="dateTo" type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="transactionType">Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="credit">Credits</SelectItem>
                          <SelectItem value="debit">Debits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                      Apply Filters
                    </Button>
                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white">
                      Export to CSV
                    </Button>                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>            <TabsContent value="jobs" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Job Stats Cards */}
                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Jobs</p>
                        <p className="text-2xl font-bold text-green-600">24</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Applications</p>
                        <p className="text-2xl font-bold text-blue-600">5</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className="text-2xl font-bold text-purple-600">92%</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">4.8</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Heart className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Job Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Earnings Trends */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Earnings Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: 'Sep', earnings: 450000, jobs: 3 },
                          { month: 'Oct', earnings: 680000, jobs: 4 },
                          { month: 'Nov', earnings: 520000, jobs: 3 },
                          { month: 'Dec', earnings: 750000, jobs: 5 },
                          { month: 'Jan', earnings: 890000, jobs: 6 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />                        <ChartTooltip formatter={(value, name) => [
                            name === 'earnings' ? `Q${value.toLocaleString()}` : value,
                            name === 'earnings' ? 'Earnings' : 'Jobs'
                          ]} />
                          <Legend />
                          <Line type="monotone" dataKey="earnings" stroke="#ea384c" strokeWidth={3} name="Earnings (Q)" />
                          <Line type="monotone" dataKey="jobs" stroke="#D4AF37" strokeWidth={3} name="Jobs Count" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Types Distribution */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Job Types Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Emergency Medicine', value: 35, color: '#ea384c' },
                              { name: 'General Practice', value: 28, color: '#D4AF37' },
                              { name: 'Night Shifts', value: 20, color: '#3b82f6' },
                              { name: 'Specialist Clinics', value: 12, color: '#10b981' },
                              { name: 'Locum Coverage', value: 5, color: '#8b5cf6' }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Emergency Medicine', value: 35, color: '#ea384c' },
                              { name: 'General Practice', value: 28, color: '#D4AF37' },
                              { name: 'Night Shifts', value: 20, color: '#3b82f6' },
                              { name: 'Specialist Clinics', value: 12, color: '#10b981' },
                              { name: 'Locum Coverage', value: 5, color: '#8b5cf6' }
                            ].map((entry, index) => (
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

              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Work Location Analytics */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <MapPin className="h-5 w-5 mr-2" />
                      Work Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={[
                          { location: 'Lagos', jobs: 12, earnings: 2800000 },
                          { location: 'Abuja', jobs: 8, earnings: 2100000 },
                          { location: 'Kano', jobs: 3, earnings: 780000 },
                          { location: 'Port Harcourt', jobs: 1, earnings: 320000 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="location" />
                          <YAxis />                          <ChartTooltip formatter={(value, name) => [
                            name === 'earnings' ? `Q${value.toLocaleString()}` : value,
                            name === 'earnings' ? 'Total Earnings' : 'Jobs Completed'
                          ]} />
                          <Legend />
                          <Bar dataKey="jobs" fill="#ea384c" name="Jobs Completed" />
                          <Bar dataKey="earnings" fill="#D4AF37" name="Total Earnings (Q)" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Rating Trends */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <Star className="h-5 w-5 mr-2" />
                      Rating Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: 'Sep', rating: 4.6, reviews: 8 },
                          { month: 'Oct', rating: 4.7, reviews: 12 },
                          { month: 'Nov', rating: 4.8, reviews: 9 },
                          { month: 'Dec', rating: 4.9, reviews: 15 },
                          { month: 'Jan', rating: 4.8, reviews: 18 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[4.0, 5.0]} />
                          <ChartTooltip formatter={(value, name) => [
                            name === 'rating' ? `${value}/5.0` : value,
                            name === 'rating' ? 'Average Rating' : 'Reviews Count'
                          ]} />
                          <Legend />
                          <Line type="monotone" dataKey="rating" stroke="#D4AF37" strokeWidth={3} name="Average Rating" />
                          <Line type="monotone" dataKey="reviews" stroke="#3b82f6" strokeWidth={3} name="Reviews Count" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Jobs History */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Recent Jobs History
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="space-y-4">
                    {[
                      { 
                        id: "JOB001", 
                        facility: "Lagos General Hospital", 
                        position: "Locum Midwife", 
                        duration: "5 days", 
                        date: "Jan 10-15, 2024", 
                        payment: "Q250,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB002", 
                        facility: "Federal Medical Centre", 
                        position: "Emergency Nurse", 
                        duration: "3 days", 
                        date: "Jan 5-8, 2024", 
                        payment: "Q180,000", 
                        status: "Completed",
                        rating: 4
                      },
                      { 
                        id: "JOB003", 
                        facility: "Private Maternity Clinic", 
                        position: "Night Shift Midwife", 
                        duration: "7 days", 
                        date: "Dec 20-27, 2023", 
                        payment: "Q315,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB004", 
                        facility: "University Teaching Hospital", 
                        position: "Locum Nurse", 
                        duration: "2 days", 
                        date: "Jan 20-22, 2024", 
                        payment: "Q120,000", 
                        status: "In Progress",
                        rating: null
                      },
                      { 
                        id: "JOB005", 
                        facility: "Specialist Hospital", 
                        position: "ICU Nurse", 
                        duration: "4 days", 
                        date: "Jan 25-29, 2024", 
                        payment: "Q200,000", 
                        status: "Applied",
                        rating: null
                      },
                    ].map((job) => (
                      <div key={job.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{job.facility}</h4>
                            <p className="text-[#ea384c] font-semibold">{job.position}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {job.duration} • {job.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{job.payment}</p>
                            <Badge className={
                              job.status === 'Completed' ? 'bg-green-500 text-white' :
                              job.status === 'In Progress' ? 'bg-blue-500 text-white' :
                              'bg-yellow-500 text-white'
                            }>
                              {job.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Job ID: {job.id}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {job.rating && (
                              <div className="flex items-center">
                                {[...Array(job.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{job.rating}.0</span>
                              </div>
                            )}
                            <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                      Load More Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Search & Preferences */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Target className="h-5 w-5 mr-2" />
                    Job Preferences & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="preferredLocation">Preferred Location</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lagos">Lagos</SelectItem>
                          <SelectItem value="abuja">Abuja</SelectItem>
                          <SelectItem value="kano">Kano</SelectItem>
                          <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="locum">Locum</SelectItem>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="minSalary">Minimum Salary</Label>
                      <Input id="minSalary" placeholder="Q50,000" className="mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Switch id="job-alerts" />
                    <Label htmlFor="job-alerts">Receive job alerts via email</Label>
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                      Save Preferences
                    </Button>
                    <Link to="/job-board">
                      <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent><TabsContent value="inbox" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1">
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center text-[#ea384c]">
                          <Mail className="h-5 w-5 mr-2" />
                          Messages
                        </CardTitle>
                        <Badge variant="secondary">8 new</Badge>
                      </div>
                    </CardHeader>
                    <CardContent compact className="p-0">
                      <div className="space-y-1">
                        {[
                          {
                            id: 1,
                            sender: "GLOHSEN Admin",
                            subject: "New Job Opportunity Available",
                            preview: "A new locum position has been posted...",
                            time: "2 hours ago",
                            unread: true,
                            type: "admin"
                          },
                          {
                            id: 2,
                            sender: "Lagos General Hospital",
                            subject: "Job Application Status Update",
                            preview: "Your application for the emergency...",
                            time: "5 hours ago",
                            unread: true,
                            type: "employer"
                          },
                          {
                            id: 3,
                            sender: "Dr. Sarah Johnson",
                            subject: "Course Feedback Request",
                            preview: "Thank you for completing the BLS...",
                            time: "1 day ago",
                            unread: false,
                            type: "tutor"
                          },
                          {
                            id: 4,
                            sender: "Federal Medical Centre",
                            subject: "Contract Renewal Offer",
                            preview: "We are pleased to offer you a...",
                            time: "2 days ago",
                            unread: false,
                            type: "employer"
                          },
                          {
                            id: 5,
                            sender: "GLOHSEN Platform",
                            subject: "Monthly Performance Summary",
                            preview: "Your professional performance summary...",
                            time: "3 days ago",
                            unread: false,
                            type: "admin"
                          }
                        ].map((message) => (
                          <div 
                            key={message.id}
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              message.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center">
                                <span className="font-medium text-sm">{message.sender}</span>
                                {message.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <div className="text-sm font-medium mb-1">{message.subject}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {message.preview}
                            </div>
                            <div className="mt-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  message.type === 'admin' ? 'border-purple-200 text-purple-700' :
                                  message.type === 'employer' ? 'border-green-200 text-green-700' :
                                  'border-blue-200 text-blue-700'
                                }`}
                              >
                                {message.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Message Detail & Compose */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Message */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-bold">Job Application Status Update</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Lagos General Hospital</span>
                        </div>
                        <span>5 hours ago</span>
                      </div>
                    </CardHeader>
                    <CardContent compact>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Dear Dr. [Name],
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Thank you for your interest in the Emergency Medicine Locum position at Lagos General Hospital. 
                          We are pleased to inform you that your application has been reviewed and you have been 
                          shortlisted for the next stage of the selection process.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          The next step involves a brief interview and orientation session scheduled for next week. 
                          Please confirm your availability for the following time slots:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                          <li>Monday, May 29th - 2:00 PM</li>
                          <li>Tuesday, May 30th - 10:00 AM</li>
                          <li>Wednesday, May 31st - 3:00 PM</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300">
                          Best regards,<br />
                          HR Department<br />
                          Lagos General Hospital
                        </p>
                      </div>
                      
                      {/* Reply Section */}
                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="font-medium mb-3">Reply to Lagos General Hospital</h4>
                        <Textarea 
                          placeholder="Type your reply here..." 
                          className="min-h-[120px] mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Attach
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                          </div>
                          <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="p-4 h-auto flex-col hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          <MessageCircle className="h-6 w-6 mb-2" />
                          <span>Compose New Message</span>
                          <span className="text-xs opacity-75">Send to employers or tutors</span>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto flex-col hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          <Users className="h-6 w-6 mb-2" />
                          <span>Contact Support</span>
                          <span className="text-xs opacity-75">Get help from GLOHSEN team</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Feedback Section */}
              <Card size="xl" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Star className="h-5 w-5 mr-2" />
                    Feedback & Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Feedback Summary */}
                    <div className="lg:col-span-1">
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-4xl font-bold text-[#ea384c] mb-2">4.8</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Based on 87 reviews
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          {[
                            { stars: 5, count: 65, percentage: 75 },
                            { stars: 4, count: 15, percentage: 17 },
                            { stars: 3, count: 5, percentage: 6 },
                            { stars: 2, count: 2, percentage: 2 },
                            { stars: 1, count: 0, percentage: 0 }
                          ].map((rating, idx) => (
                            <div key={idx} className="flex items-center text-xs">
                              <span className="w-8">{rating.stars}★</span>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mx-2">
                                <div 
                                  className="bg-amber-400 h-2 rounded-full"
                                  style={{ width: `${rating.percentage}%` }}
                                />
                              </div>
                              <span className="w-8 text-right">{rating.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="lg:col-span-2">
                      <h3 className="font-bold mb-4">Recent Reviews from Employers</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {[
                          {
                            employer: "Lagos General Hospital",
                            position: "Emergency Medicine Locum",
                            rating: 5,
                            comment: "Exceptional medical skills and professionalism. Dr. [Name] handled emergency cases with remarkable competence and showed excellent patient care throughout the assignment.",
                            date: "2 days ago"
                          },
                          {
                            employer: "Federal Medical Centre",
                            position: "ICU Physician",
                            rating: 5,
                            comment: "Outstanding performance during a challenging period. Demonstrated excellent clinical judgment and worked seamlessly with our medical team.",
                            date: "1 week ago"
                          },
                          {
                            employer: "Private Specialist Hospital",
                            position: "General Practitioner",
                            rating: 4,
                            comment: "Very reliable and knowledgeable. Patients responded well to the care provided. Would definitely recommend for future assignments.",
                            date: "2 weeks ago"
                          },
                          {
                            employer: "Community Health Center",
                            position: "Family Medicine",
                            rating: 5,
                            comment: "Excellent communication skills with patients and staff. Provided comprehensive care and maintained high standards throughout the contract.",
                            date: "3 weeks ago"
                          }
                        ].map((review, idx) => (
                          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium">{review.employer}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{review.position}</div>
                              </div>
                              <div className="text-right">
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <div className="text-xs text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent><TabsContent value="jobs history" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Job Stats Cards */}
                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Jobs</p>
                        <p className="text-2xl font-bold text-green-600">24</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Applications</p>
                        <p className="text-2xl font-bold text-blue-600">5</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className="text-2xl font-bold text-purple-600">92%</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">4.8</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Heart className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Jobs History */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Recent Jobs History
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="space-y-4">
                    {[
                      { 
                        id: "JOB001", 
                        facility: "Lagos General Hospital", 
                        position: "Locum Midwife", 
                        duration: "5 days", 
                        date: "Jan 10-15, 2024", 
                        payment: "Q250,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB002", 
                        facility: "Federal Medical Centre", 
                        position: "Emergency Nurse", 
                        duration: "3 days", 
                        date: "Jan 5-8, 2024", 
                        payment: "Q180,000", 
                        status: "Completed",
                        rating: 4
                      },
                      { 
                        id: "JOB003", 
                        facility: "Private Maternity Clinic", 
                        position: "Night Shift Midwife", 
                        duration: "7 days", 
                        date: "Dec 20-27, 2023", 
                        payment: "Q315,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB004", 
                        facility: "University Teaching Hospital", 
                        position: "Locum Nurse", 
                        duration: "2 days", 
                        date: "Jan 20-22, 2024", 
                        payment: "Q120,000", 
                        status: "In Progress",
                        rating: null
                      },
                      { 
                        id: "JOB005", 
                        facility: "Specialist Hospital", 
                        position: "ICU Nurse", 
                        duration: "4 days", 
                        date: "Jan 25-29, 2024", 
                        payment: "Q200,000", 
                        status: "Applied",
                        rating: null
                      },
                    ].map((job) => (
                      <div key={job.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{job.facility}</h4>
                            <p className="text-[#ea384c] font-semibold">{job.position}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {job.duration} • {job.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{job.payment}</p>
                            <Badge className={
                              job.status === 'Completed' ? 'bg-green-500 text-white' :
                              job.status === 'In Progress' ? 'bg-blue-500 text-white' :
                              'bg-yellow-500 text-white'
                            }>
                              {job.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Job ID: {job.id}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {job.rating && (
                              <div className="flex items-center">
                                {[...Array(job.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{job.rating}.0</span>
                              </div>
                            )}
                            <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                      Load More Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Search & Preferences */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Target className="h-5 w-5 mr-2" />
                    Job Preferences & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="preferredLocation">Preferred Location</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lagos">Lagos</SelectItem>
                          <SelectItem value="abuja">Abuja</SelectItem>
                          <SelectItem value="kano">Kano</SelectItem>
                          <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="locum">Locum</SelectItem>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="minSalary">Minimum Salary</Label>
                      <Input id="minSalary" placeholder="Q50,000" className="mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Switch id="job-alerts" />
                    <Label htmlFor="job-alerts">Receive job alerts via email</Label>
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                      Save Preferences
                    </Button>
                    <Link to="/job-board">
                      <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>            <TabsContent value="inbox" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1">
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center text-[#ea384c]">
                          <Mail className="h-5 w-5 mr-2" />
                          Messages
                        </CardTitle>
                        <Badge variant="secondary">8 new</Badge>
                      </div>
                    </CardHeader>
                    <CardContent compact className="p-0">
                      <div className="space-y-1">
                        {[
                          {
                            id: 1,
                            sender: "GLOHSEN Admin",
                            subject: "New Job Opportunity Available",
                            preview: "A new locum position has been posted...",
                            time: "2 hours ago",
                            unread: true,
                            type: "admin"
                          },
                          {
                            id: 2,
                            sender: "Lagos General Hospital",
                            subject: "Job Application Status Update",
                            preview: "Your application for the emergency...",
                            time: "5 hours ago",
                            unread: true,
                            type: "employer"
                          },
                          {
                            id: 3,
                            sender: "Dr. Sarah Johnson",
                            subject: "Course Feedback Request",
                            preview: "Thank you for completing the BLS...",
                            time: "1 day ago",
                            unread: false,
                            type: "tutor"
                          },
                          {
                            id: 4,
                            sender: "Federal Medical Centre",
                            subject: "Contract Renewal Offer",
                            preview: "We are pleased to offer you a...",
                            time: "2 days ago",
                            unread: false,
                            type: "employer"
                          },
                          {
                            id: 5,
                            sender: "GLOHSEN Platform",
                            subject: "Monthly Performance Summary",
                            preview: "Your professional performance summary...",
                            time: "3 days ago",
                            unread: false,
                            type: "admin"
                          }
                        ].map((message) => (
                          <div 
                            key={message.id}
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              message.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center">
                                <span className="font-medium text-sm">{message.sender}</span>
                                {message.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <div className="text-sm font-medium mb-1">{message.subject}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {message.preview}
                            </div>
                            <div className="mt-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  message.type === 'admin' ? 'border-purple-200 text-purple-700' :
                                  message.type === 'employer' ? 'border-green-200 text-green-700' :
                                  'border-blue-200 text-blue-700'
                                }`}
                              >
                                {message.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Message Detail & Compose */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Message */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-bold">Job Application Status Update</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Lagos General Hospital</span>
                        </div>
                        <span>5 hours ago</span>
                      </div>
                    </CardHeader>
                    <CardContent compact>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Dear Dr. [Name],
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Thank you for your interest in the Emergency Medicine Locum position at Lagos General Hospital. 
                          We are pleased to inform you that your application has been reviewed and you have been 
                          shortlisted for the next stage of the selection process.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          The next step involves a brief interview and orientation session scheduled for next week. 
                          Please confirm your availability for the following time slots:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                          <li>Monday, May 29th - 2:00 PM</li>
                          <li>Tuesday, May 30th - 10:00 AM</li>
                          <li>Wednesday, May 31st - 3:00 PM</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300">
                          Best regards,<br />
                          HR Department<br />
                          Lagos General Hospital
                        </p>
                      </div>
                      
                      {/* Reply Section */}
                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="font-medium mb-3">Reply to Lagos General Hospital</h4>
                        <Textarea 
                          placeholder="Type your reply here..." 
                          className="min-h-[120px] mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Attach
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                          </div>
                          <Button className="bg-[#ea384c] hover:bg-[#d12e42] text-white">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="p-4 h-auto flex-col hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          <MessageCircle className="h-6 w-6 mb-2" />
                          <span>Compose New Message</span>
                          <span className="text-xs opacity-75">Send to employers or tutors</span>
                        </Button>
                        <Button variant="outline" className="p-4 h-auto flex-col hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          <Users className="h-6 w-6 mb-2" />
                          <span>Contact Support</span>
                          <span className="text-xs opacity-75">Get help from GLOHSEN team</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Feedback Section */}
              <Card size="xl" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Star className="h-5 w-5 mr-2" />
                    Feedback & Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Feedback Summary */}
                    <div className="lg:col-span-1">
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-4xl font-bold text-[#ea384c] mb-2">4.8</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Based on 87 reviews
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          {[
                            { stars: 5, count: 65, percentage: 75 },
                            { stars: 4, count: 15, percentage: 17 },
                            { stars: 3, count: 5, percentage: 6 },
                            { stars: 2, count: 2, percentage: 2 },
                            { stars: 1, count: 0, percentage: 0 }
                          ].map((rating, idx) => (
                            <div key={idx} className="flex items-center text-xs">
                              <span className="w-8">{rating.stars}★</span>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mx-2">
                                <div 
                                  className="bg-amber-400 h-2 rounded-full"
                                  style={{ width: `${rating.percentage}%` }}
                                />
                              </div>
                              <span className="w-8 text-right">{rating.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="lg:col-span-2">
                      <h3 className="font-bold mb-4">Recent Reviews from Employers</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {[
                          {
                            employer: "Lagos General Hospital",
                            position: "Emergency Medicine Locum",
                            rating: 5,
                            comment: "Exceptional medical skills and professionalism. Dr. [Name] handled emergency cases with remarkable competence and showed excellent patient care throughout the assignment.",
                            date: "2 days ago"
                          },
                          {
                            employer: "Federal Medical Centre",
                            position: "ICU Physician",
                            rating: 5,
                            comment: "Outstanding performance during a challenging period. Demonstrated excellent clinical judgment and worked seamlessly with our medical team.",
                            date: "1 week ago"
                          },
                          {
                            employer: "Private Specialist Hospital",
                            position: "General Practitioner",
                            rating: 4,
                            comment: "Very reliable and knowledgeable. Patients responded well to the care provided. Would definitely recommend for future assignments.",
                            date: "2 weeks ago"
                          },
                          {
                            employer: "Community Health Center",
                            position: "Family Medicine",
                            rating: 5,
                            comment: "Excellent communication skills with patients and staff. Provided comprehensive care and maintained high standards throughout the contract.",
                            date: "3 weeks ago"
                          }
                        ].map((review, idx) => (
                          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium">{review.employer}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{review.position}</div>
                              </div>
                              <div className="text-right">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <div className="text-xs text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Job Stats Cards */}
                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Jobs</p>
                        <p className="text-2xl font-bold text-green-600">24</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Applications</p>
                        <p className="text-2xl font-bold text-blue-600">5</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className="text-2xl font-bold text-purple-600">92%</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card size="lg" variant="default">
                  <CardContent compact>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">4.8</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Heart className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Job Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Earnings Trends */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Earnings Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: 'Sep', earnings: 450000, jobs: 3 },
                          { month: 'Oct', earnings: 680000, jobs: 4 },
                          { month: 'Nov', earnings: 520000, jobs: 3 },
                          { month: 'Dec', earnings: 750000, jobs: 5 },
                          { month: 'Jan', earnings: 890000, jobs: 6 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />                        <ChartTooltip formatter={(value, name) => [
                            name === 'earnings' ? `Q${value.toLocaleString()}` : value,
                            name === 'earnings' ? 'Earnings' : 'Jobs'
                          ]} />
                          <Legend />
                          <Line type="monotone" dataKey="earnings" stroke="#ea384c" strokeWidth={3} name="Earnings (Q)" />
                          <Line type="monotone" dataKey="jobs" stroke="#D4AF37" strokeWidth={3} name="Jobs Count" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Types Distribution */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Job Types Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Emergency Medicine', value: 35, color: '#ea384c' },
                              { name: 'General Practice', value: 28, color: '#D4AF37' },
                              { name: 'Night Shifts', value: 20, color: '#3b82f6' },
                              { name: 'Specialist Clinics', value: 12, color: '#10b981' },
                              { name: 'Locum Coverage', value: 5, color: '#8b5cf6' }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Emergency Medicine', value: 35, color: '#ea384c' },
                              { name: 'General Practice', value: 28, color: '#D4AF37' },
                              { name: 'Night Shifts', value: 20, color: '#3b82f6' },
                              { name: 'Specialist Clinics', value: 12, color: '#10b981' },
                              { name: 'Locum Coverage', value: 5, color: '#8b5cf6' }
                            ].map((entry, index) => (
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

              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Work Location Analytics */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <MapPin className="h-5 w-5 mr-2" />
                      Work Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={[
                          { location: 'Lagos', jobs: 12, earnings: 2800000 },
                          { location: 'Abuja', jobs: 8, earnings: 2100000 },
                          { location: 'Kano', jobs: 3, earnings: 780000 },
                          { location: 'Port Harcourt', jobs: 1, earnings: 320000 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="location" />
                          <YAxis />                          <ChartTooltip formatter={(value, name) => [
                            name === 'earnings' ? `Q${value.toLocaleString()}` : value,
                            name === 'earnings' ? 'Total Earnings' : 'Jobs Completed'
                          ]} />
                          <Legend />
                          <Bar dataKey="jobs" fill="#ea384c" name="Jobs Completed" />
                          <Bar dataKey="earnings" fill="#D4AF37" name="Total Earnings (Q)" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Rating Trends */}
                <Card size="lg" variant="default">
                  <CardHeader compact>
                    <CardTitle className="flex items-center text-[#ea384c]">
                      <Star className="h-5 w-5 mr-2" />
                      Rating Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent compact>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: 'Sep', rating: 4.6, reviews: 8 },
                          { month: 'Oct', rating: 4.7, reviews: 12 },
                          { month: 'Nov', rating: 4.8, reviews: 9 },
                          { month: 'Dec', rating: 4.9, reviews: 15 },
                          { month: 'Jan', rating: 4.8, reviews: 18 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[4.0, 5.0]} />
                          <ChartTooltip formatter={(value, name) => [
                            name === 'rating' ? `${value}/5.0` : value,
                            name === 'rating' ? 'Average Rating' : 'Reviews Count'
                          ]} />
                          <Legend />
                          <Line type="monotone" dataKey="rating" stroke="#D4AF37" strokeWidth={3} name="Average Rating" />
                          <Line type="monotone" dataKey="reviews" stroke="#3b82f6" strokeWidth={3} name="Reviews Count" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Jobs History */}
              <Card size="lg" variant="default">
                <CardHeader compact>
                  <CardTitle className="flex items-center text-[#ea384c]">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Recent Jobs History
                  </CardTitle>
                </CardHeader>
                <CardContent compact>
                  <div className="space-y-4">
                    {[
                      { 
                        id: "JOB001", 
                        facility: "Lagos General Hospital", 
                        position: "Locum Midwife", 
                        duration: "5 days", 
                        date: "Jan 10-15, 2024", 
                        payment: "Q250,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB002", 
                        facility: "Federal Medical Centre", 
                        position: "Emergency Nurse", 
                        duration: "3 days", 
                        date: "Jan 5-8, 2024", 
                        payment: "Q180,000", 
                        status: "Completed",
                        rating: 4
                      },
                      { 
                        id: "JOB003", 
                        facility: "Private Maternity Clinic", 
                        position: "Night Shift Midwife", 
                        duration: "7 days", 
                        date: "Dec 20-27, 2023", 
                        payment: "Q315,000", 
                        status: "Completed",
                        rating: 5
                      },
                      { 
                        id: "JOB004", 
                        facility: "University Teaching Hospital", 
                        position: "Locum Nurse", 
                        duration: "2 days", 
                        date: "Jan 20-22, 2024", 
                        payment: "Q120,000", 
                        status: "In Progress",
                        rating: null
                      },
                      { 
                        id: "JOB005", 
                        facility: "Specialist Hospital", 
                        position: "ICU Nurse", 
                        duration: "4 days", 
                        date: "Jan 25-29, 2024", 
                        payment: "Q200,000", 
                        status: "Applied",
                        rating: null
                      },
                    ].map((job) => (
                      <div key={job.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{job.facility}</h4>
                            <p className="text-[#ea384c] font-semibold">{job.position}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {job.duration} • {job.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{job.payment}</p>
                            <Badge className={
                              job.status === 'Completed' ? 'bg-green-500 text-white' :
                              job.status === 'In Progress' ? 'bg-blue-500 text-white' :
                              'bg-yellow-500 text-white'
                            }>
                              {job.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Job ID: {job.id}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {job.rating && (
                              <div className="flex items-center">
                                {[...Array(job.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{job.rating}.0</span>
                              </div>
                            )}
                            <Button size="sm" variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                      Load More Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>            <TabsContent value="inbox & Feedback" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inbox Section */}
                <div className="lg:col-span-2 space-y-6">                  <Card size="xl" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <Mail className="h-5 w-5 mr-2" />
                        Messages & Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="space-y-4">
                        {[
                          {
                            id: 1,
                            from: "Lagos General Hospital",
                            subject: "Job Offer - Emergency Department",
                            message: "We would like to offer you a locum position in our Emergency Department for the upcoming weekend shift...",
                            time: "2 hours ago",
                            unread: true,
                            type: "job_offer"
                          },
                          {
                            id: 2,
                            from: "GLOHSEN Platform",
                            subject: "Course Reminder: ACLS Renewal",
                            message: "Your ACLS certification is due for renewal in 30 days. Click here to enroll in our renewal course...",
                            time: "5 hours ago",
                            unread: true,
                            type: "system"
                          },
                          {
                            id: 3,
                            from: "Federal Medical Centre",
                            subject: "Payment Processed",
                            message: "Your payment of Q250,000 for the locum services has been processed and will reflect in your account within 24 hours...",
                            time: "1 day ago",
                            unread: false,
                            type: "payment"
                          },
                          {
                            id: 4,
                            from: "Dr. Sarah Johnson",
                            subject: "Feedback on Recent Assignment",
                            message: "Thank you for the excellent work during your recent assignment. Your professionalism and expertise were outstanding...",
                            time: "2 days ago",
                            unread: false,
                            type: "feedback"
                          },                          {
                            id: 5,
                            from: "GLOHSEN Community",
                            subject: "New Discussion: Best Practices in Healthcare",
                            message: "A new discussion thread has been started in the community forum. Join the conversation and share your expertise...",
                            time: "3 days ago",
                            unread: false,
                            type: "community"
                          }
                        ].map((message) => (
                          <div key={message.id} className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer ${
                            message.unread 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                              : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                          }`}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-full ${
                                  message.type === 'job_offer' ? 'bg-green-100 text-green-600' :
                                  message.type === 'system' ? 'bg-blue-100 text-blue-600' :
                                  message.type === 'payment' ? 'bg-yellow-100 text-yellow-600' :
                                  message.type === 'feedback' ? 'bg-purple-100 text-purple-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {message.type === 'job_offer' && <Briefcase className="h-4 w-4" />}
                                  {message.type === 'system' && <AlertCircle className="h-4 w-4" />}
                                  {message.type === 'payment' && <DollarSign className="h-4 w-4" />}
                                  {message.type === 'feedback' && <Star className="h-4 w-4" />}
                                  {message.type === 'community' && <Users className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h4 className={`font-semibold ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                      {message.from}
                                    </h4>
                                    {message.unread && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                  </div>
                                  <p className={`font-medium ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {message.subject}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                    {message.message}
                                  </p>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 whitespace-nowrap">
                                {message.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                          Load More Messages
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Feedback & Ratings Section */}
                <div className="space-y-6">
                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <Star className="h-5 w-5 mr-2" />
                        Your Ratings
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-[#D4AF37] mb-2">4.8</div>
                        <div className="flex justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Based on 24 reviews</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span>5 stars</span>
                          <span>18 reviews</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-3/4"></div>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-2">
                          <span>4 stars</span>
                          <span>4 reviews</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-1/6"></div>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-2">
                          <span>3 stars</span>
                          <span>2 reviews</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-1/12"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card size="lg" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Recent Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact>
                      <div className="space-y-4">
                        {[
                          {
                            reviewer: "Dr. Sarah Johnson",
                            facility: "Lagos General Hospital",
                            rating: 5,
                            comment: "Outstanding professionalism and expertise. Highly recommended!",
                            date: "Jan 15, 2024"
                          },
                          {
                            reviewer: "Nurse Manager",
                            facility: "Federal Medical Centre",
                            rating: 4,
                            comment: "Great team player with excellent clinical skills.",
                            date: "Jan 8, 2024"
                          },
                          {
                            reviewer: "Dr. Michael Okafor",
                            facility: "Private Clinic",
                            rating: 5,
                            comment: "Reliable and competent. Will definitely work with again.",
                            date: "Dec 27, 2023"
                          }
                        ].map((feedback, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-semibold text-sm">{feedback.reviewer}</h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{feedback.facility}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(feedback.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{feedback.comment}</p>
                            <p className="text-xs text-gray-500">{feedback.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card size="md" variant="default">
                    <CardHeader compact>
                      <CardTitle className="flex items-center text-[#ea384c]">
                        <FileText className="h-5 w-5 mr-2" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent compact className="space-y-3">
                      <Button className="w-full bg-[#ea384c] hover:bg-[#d12e42] text-white transition-all duration-300">
                        Compose Message
                      </Button>
                      <Button variant="outline" className="w-full hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                        Mark All as Read
                      </Button>
                      <Button variant="outline" className="w-full hover:bg-[#ea384c] hover:text-white transition-all duration-300">
                        Export Feedback
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;