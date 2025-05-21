
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Award, Activity, CreditCard, Settings } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("community");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="client dashboard" userName="James Miller" />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
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

        {/* Dashboard Tabs */}
        <Tabs defaultValue="community" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="community" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" /> Community
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" /> Games
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Feedback
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Community Activity</h3>
                <p className="text-gray-500 dark:text-gray-400">View and manage your community activity here.</p>
                <div className="mt-4">
                  {/* Community content would go here */}
                  <p>Community features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Health Games & Quizzes</h3>
                <p className="text-gray-500 dark:text-gray-400">Play educational games and take quizzes to improve your health knowledge.</p>
                <div className="mt-4">
                  {/* Games content would go here */}
                  <p>Games & quizzes coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Professional Feedback</h3>
                <p className="text-gray-500 dark:text-gray-400">Share your experiences with healthcare professionals and services.</p>
                <div className="mt-4">
                  {/* Feedback content would go here */}
                  <p>Feedback features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and privacy settings.</p>
                <div className="mt-4">
                  {/* Settings content would go here */}
                  <p>Settings features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default ClientDashboard;
