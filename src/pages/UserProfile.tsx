
import React, { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDashboard from "@/components/ProfileDashboard";
import { calculateExampleCandidate } from "@/services/scoreCalculator";
import EQAssessment from "@/components/EQAssessment";
import { Brain, Briefcase, FileText, MessageSquare, User } from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const scoreBreakdown = calculateExampleCandidate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="User" />
                    <AvatarFallback>OA</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">Dr. Oredola Adeola</h2>
                  <p className="text-sm text-gray-500">MDCN: MD12345</p>
                  
                  <div className="mt-4 w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">GLOHSEN Score</span>
                      <Badge>{scoreBreakdown.total}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(scoreBreakdown.total / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <Button 
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start rounded-none p-3"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile Dashboard
                </Button>
                <Button 
                  variant={activeTab === "eq" ? "default" : "ghost"} 
                  className="w-full justify-start rounded-none p-3"
                  onClick={() => setActiveTab("eq")}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  EQ Assessment
                </Button>
                <Button 
                  variant={activeTab === "jobs" ? "default" : "ghost"} 
                  className="w-full justify-start rounded-none p-3"
                  onClick={() => setActiveTab("jobs")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Job History
                </Button>
                <Button 
                  variant={activeTab === "messages" ? "default" : "ghost"} 
                  className="w-full justify-start rounded-none p-3"
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button 
                  variant={activeTab === "documents" ? "default" : "ghost"} 
                  className="w-full justify-start rounded-none p-3"
                  onClick={() => setActiveTab("documents")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium">{scoreBreakdown.experience}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Employer Match:</span>
                  <span className="font-medium">{scoreBreakdown.employerMatch}/110</span>
                </div>
                <div className="flex justify-between">
                  <span>Skills:</span>
                  <span className="font-medium">{scoreBreakdown.skills}/15</span>
                </div>
                <div className="flex justify-between">
                  <span>Locum Jobs:</span>
                  <span className="font-medium">{scoreBreakdown.locumJobs}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Activity:</span>
                  <span className="font-medium">{scoreBreakdown.platformActivity}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Volunteering:</span>
                  <span className="font-medium">{scoreBreakdown.volunteering}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{scoreBreakdown.location}/5</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Profile Dashboard</h1>
                <ProfileDashboard />
              </>
            )}
            
            {activeTab === "eq" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Emotional Intelligence Assessment</h1>
                <EQAssessment />
              </>
            )}
            
            {activeTab === "jobs" && (
              <Card>
                <CardHeader>
                  <CardTitle>Job History</CardTitle>
                  <CardDescription>View your past and current job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Job history content will appear here.</p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Your communication with employers and GLOHSEN</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Messages content will appear here.</p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Your certificates, CV, and other documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Documents content will appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
