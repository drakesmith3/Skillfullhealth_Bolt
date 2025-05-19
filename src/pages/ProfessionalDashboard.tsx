import React, { useState, useEffect } from 'react';
import { Bell, Briefcase, Calendar, CreditCard, Settings, Star, User, FileText, CheckCircle, Clock, Award, MessageSquare, DollarSign, BarChart2, Users, TrendingUp, Zap, Shield, LifeBuoy, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

const ProfessionalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 2000); // Show footer after 2 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Sample GLOHSEN Score data
  const glohsenScore = {
    overall: 850,
    components: [
      { name: "Profile Completion", score: 95, weight: 20 },
      { name: "Engagement", score: 80, weight: 30 },
      { name: "Certifications", score: 90, weight: 25 },
      { name: "Reviews", score: 75, weight: 25 },
    ],
    recommendations: [
      "Complete your profile section for 'Specializations'.",
      "Engage in 2 more community discussions this week.",
      "Consider obtaining an advanced certification in your field.",
    ],
  };

  // Sample appointments data
  const appointments = [
    { id: 1, patient: "John Doe", time: "2024-07-28 10:00 AM", status: "Confirmed", type: "Consultation" },
    { id: 2, patient: "Jane Smith", time: "2024-07-29 02:30 PM", status: "Pending", type: "Follow-up" },
  ];

  // Sample earnings data
  const earnings = {
    total: 5250,
    breakdown: [
      { month: "June 2024", amount: 2800 },
      { month: "May 2024", amount: 2450 },
    ],
    pending: 300,
  };
  
  // Sample certificates data
  const certificates = [
    { id: 1, name: "Basic Life Support (BLS)", issuer: "American Heart Association", expiry: "Dec 2025", status: "Active" },
    { id: 2, name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", expiry: "Jun 2026", status: "Active" },
    { id: 3, name: "Pediatric Advanced Life Support (PALS)", issuer: "American Heart Association", expiry: "Jan 2025", status: "Expired" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="professional dashboard" userName="Dr. Olusiji" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16"> {/* mt-16 for fixed PreHeader */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Professional Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, Dr. Olusiji!</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Your current GLOHSEN score and key metrics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">{glohsenScore.overall}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">GLOHSEN Score</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Score Components:</h3>
                  {glohsenScore.components.map(comp => (
                    <div key={comp.name} className="flex justify-between items-center mb-1">
                      <span>{comp.name} (Weight: {comp.weight}%)</span>
                      <span className={`font-semibold ${comp.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>{comp.score}/100</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recommendations:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {glohsenScore.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your professional information.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-gray-500 dark:text-gray-400">Profile editing form will be here.</p>
                {/* Placeholder for profile form */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your scheduled appointments.</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  appointments.map(appt => (
                    <div key={appt.id} className="border p-3 rounded-md mb-2 bg-gray-100 dark:bg-gray-800">
                      <p><strong>Patient:</strong> {appt.patient}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                      <p><strong>Type:</strong> {appt.type}</p>
                      <p><strong>Status:</strong> <span className={appt.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}>{appt.status}</span></p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-20 text-gray-500 dark:text-gray-400">No appointments scheduled.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings</CardTitle>
                <CardDescription>Track your income and transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Total Earned:</strong> ${earnings.total}</p>
                <p><strong>Pending Clearance:</strong> ${earnings.pending}</p>
                <h4 className="font-semibold mt-3 mb-1">Monthly Breakdown:</h4>
                {earnings.breakdown.map(item => (
                  <p key={item.month}>{item.month}: ${item.amount}</p>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>Manage your uploaded certificates and qualifications.</CardDescription>
              </CardHeader>
              <CardContent>
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <Card key={cert.id} className="mb-4 bg-gray-100 dark:bg-gray-800 border">
                      <CardHeader>
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <CardDescription>Issuer: {cert.issuer}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Expiry Date: {cert.expiry}</p>
                        <p>Status: <span className={cert.status === 'Active' ? 'text-green-500' : 'text-red-500'}>{cert.status}</span></p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p className="text-center py-20 text-gray-500 dark:text-gray-400">No certificates uploaded yet.</p>
                )}
                <div className="mt-6 text-center">
                  <Button><FileText className="mr-2 h-4 w-4" /> Upload New Certificate</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>View feedback from patients and employers.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-gray-500 dark:text-gray-400">This section will display feedback about your services.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-20 text-gray-500 dark:text-gray-400">Account settings options will be here.</p>
                {/* Placeholder for settings form */}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default ProfessionalDashboard;
