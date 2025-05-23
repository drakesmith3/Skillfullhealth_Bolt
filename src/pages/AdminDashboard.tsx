import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AIAgentStatus from '@/components/admin/AIAgentStatus';
import { Bot, BarChart, Settings, AlertCircle, Users, Shield, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage system operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin Controls
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="ai-agents" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="ai-agents" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              <Bot className="h-4 w-4 mr-2" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              <Settings className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-agents" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIAgentStatus />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      AI Agent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-100 rounded-md">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>5 testimonials need manual review before publishing</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-100 rounded-md">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>3 high-confidence feedback matches require confirmation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-blue-500" />
                      AI Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Testimonial Relevance</span>
                          <span className="text-xs font-medium">92%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Feedback Routing Accuracy</span>
                          <span className="text-xs font-medium">87%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">User Satisfaction</span>
                          <span className="text-xs font-medium">95%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <Card className="border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage registered users and access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-12">
                  User management interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="mt-0">
            <Card className="border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Configure system parameters and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-12">
                  System configuration interface will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
