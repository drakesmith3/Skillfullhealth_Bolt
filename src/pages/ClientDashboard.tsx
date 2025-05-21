
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Award, Activity, CreditCard, Settings, User, Gamepad, Heart } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="client dashboard" userName="James Miller" />
      
      <div className="flex-grow flex mt-16">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 lg:w-1/5 p-4">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4 lg:w-4/5 px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Client Dashboard</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, James!</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Community Engagement
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Forum Posts</span>
                    <span className="text-green-600 font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Replies</span>
                    <span className="text-amber-600 font-semibold">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Likes Received</span>
                    <span className="text-[#D4AF37] font-semibold">112</span>
                  </div>
                  <Button size="sm" className="w-full mt-2">View Community</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Health Stats
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Games Played</span>
                    <span className="text-green-600 font-semibold">14</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quizzes Completed</span>
                    <span className="text-amber-600 font-semibold">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Health Score</span>
                    <span className="text-[#D4AF37] font-semibold">82/100</span>
                  </div>
                  <Button size="sm" className="w-full mt-2">Play Games & Quizzes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Feedback Provided
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Professional Reviews</span>
                    <span className="text-green-600 font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Services Rated</span>
                    <span className="text-amber-600 font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Influence Points</span>
                    <span className="text-[#D4AF37] font-semibold">340</span>
                  </div>
                  <Button size="sm" className="w-full mt-2">Give Feedback</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs - updated according to requirements */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="games" className="flex items-center">
                <Gamepad className="mr-2 h-4 w-4" /> Games & Quizzes Analytics
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Community Discussion
              </TabsTrigger>
              <TabsTrigger value="inbox" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Inbox
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" /> Feedbacks You Gave
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Personal Health Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Recent Health Activities</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center mb-1">
                            <Heart className="h-4 w-4 text-[#ea384c] mr-2" />
                            <span className="font-medium">Exercise Tracker</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">You've exercised 4 times this week</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center mb-1">
                            <Activity className="h-4 w-4 text-[#D4AF37] mr-2" />
                            <span className="font-medium">Health Quiz</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">You scored 85% on "Nutrition Basics"</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center mb-1">
                            <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                            <span className="font-medium">Community Post</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Your question received 5 helpful responses</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Health Recommendations</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Take the Blood Pressure Management Quiz</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Based on your interests in heart health</p>
                          <Button size="sm" variant="outline" className="mt-2">Start Quiz</Button>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Join the "Mental Wellness" Discussion Group</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Connect with others interested in mental health</p>
                          <Button size="sm" variant="outline" className="mt-2">Join Group</Button>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">Rate your recent hospital visit</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Share your experience to help others</p>
                          <Button size="sm" variant="outline" className="mt-2">Add Review</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="games" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Games & Quizzes Analytics</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">View your performance in health games and quizzes.</p>
                  <div className="mt-4">
                    {/* Games & Quizzes Analytics content would go here */}
                    <p>Games & Quizzes analytics content coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Community Discussion History</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">View your participation in community discussions.</p>
                  <div className="mt-4">
                    {/* Community discussion content would go here */}
                    <p>Community discussion content coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inbox" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Inbox</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">View your messages and notifications.</p>
                  <div className="mt-4">
                    {/* Inbox content would go here */}
                    <p>Inbox content coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Feedbacks You Gave</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Review the feedback you've provided.</p>
                  <div className="mt-4">
                    {/* Feedback content would go here */}
                    <p>Feedback history content coming soon...</p>
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

export default ClientDashboard;
