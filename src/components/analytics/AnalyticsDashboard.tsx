
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { BarChart3, TrendingUp, Users, Activity, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsData {
  name: string;
  value: number;
  change: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const engagementData = [
    { name: 'Mon', courses: 12, games: 8, forum: 15 },
    { name: 'Tue', courses: 19, games: 12, forum: 22 },
    { name: 'Wed', courses: 15, games: 10, forum: 18 },
    { name: 'Thu', courses: 22, games: 15, forum: 25 },
    { name: 'Fri', courses: 18, games: 11, forum: 20 },
    { name: 'Sat', courses: 25, games: 18, forum: 30 },
    { name: 'Sun', courses: 20, games: 14, forum: 24 }
  ];

  const kpiData: AnalyticsData[] = [
    { name: 'Total Users', value: 2847, change: 12.5 },
    { name: 'Active Sessions', value: 1234, change: -3.2 },
    { name: 'Course Completions', value: 456, change: 8.7 },
    { name: 'GLOHSEN Score Avg', value: 78.5, change: 2.1 }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTimeRange('7d')}>7D</Button>
          <Button variant="outline" size="sm" onClick={() => setTimeRange('30d')}>30D</Button>
          <Button variant="outline" size="sm" onClick={() => setTimeRange('90d')}>90D</Button>
          <Button size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>
        </div>
      </div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((item, index) => (
          <Card key={index} size="md" variant="dashboard">
            <CardHeader 
              compact 
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent compact>
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
              <p className={`text-xs ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.change > 0 ? '+' : ''}{item.change}% from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="content">Content Analytics</TabsTrigger>
        </TabsList>        <TabsContent value="engagement">
          <Card size="xl" variant="default">
            <CardHeader>
              <CardTitle>Weekly Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="courses" stroke="#ea384c" strokeWidth={2} />
                  <Line type="monotone" dataKey="games" stroke="#D4AF37" strokeWidth={2} />
                  <Line type="monotone" dataKey="forum" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card size="xl" variant="default">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="courses" fill="#ea384c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card size="lg" variant="default">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Emergency Medicine Courses</span>
                  <span className="font-semibold">85% completion rate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cardiology Specialization</span>
                  <span className="font-semibold">78% completion rate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medical Games</span>
                  <span className="font-semibold">92% engagement rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
