
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Label } from 'recharts';

const enrollmentData = [
  { month: 'Jan', students: 65 },
  { month: 'Feb', students: 78 },
  { month: 'Mar', students: 92 },
  { month: 'Apr', students: 105 },
  { month: 'May', students: 120 },
  { month: 'Jun', students: 135 },
  { month: 'Jul', students: 158 },
  { month: 'Aug', students: 189 },
];

const completionData = [
  { month: 'Jan', completed: 45, partial: 15 },
  { month: 'Feb', completed: 58, partial: 12 },
  { month: 'Mar', completed: 65, partial: 18 },
  { month: 'Apr', completed: 75, partial: 22 },
  { month: 'May', completed: 82, partial: 28 },
  { month: 'Jun', completed: 92, partial: 30 },
  { month: 'Jul', completed: 102, partial: 36 },
  { month: 'Aug', completed: 120, partial: 45 },
];

const revenueData = [
  { month: 'Jan', revenue: 1950 },
  { month: 'Feb', revenue: 2340 },
  { month: 'Mar', revenue: 2760 },
  { month: 'Apr', revenue: 3150 },
  { month: 'May', revenue: 3600 },
  { month: 'Jun', revenue: 4050 },
  { month: 'Jul', revenue: 4740 },
  { month: 'Aug', revenue: 5670 },
];

const feedbackData = [
  { name: '5 Stars', value: 65 },
  { name: '4 Stars', value: 25 },
  { name: '3 Stars', value: 7 },
  { name: '2 Stars', value: 2 },
  { name: '1 Star', value: 1 },
];

const COLORS = ['#22c55e', '#3b82f6', '#6366f1', '#ef4444', '#f97316'];

const TutorAnalytics = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl">Analytics Overview</CardTitle>
        <CardDescription>Monitor your course performance and student engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enrollments">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="completions">Completions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrollments">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} students`, 'Enrollments']} 
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Total course enrollments by month
            </div>
          </TabsContent>
          
          <TabsContent value="completions">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#22c55e" name="Completed" stackId="a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="partial" fill="#3b82f6" name="In Progress" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Course completions and in-progress students by month
            </div>
          </TabsContent>
          
          <TabsContent value="revenue">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#D4AF37" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Total revenue generated by month ($)
            </div>
          </TabsContent>
          
          <TabsContent value="feedback">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feedbackData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {feedbackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} ratings`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Student ratings distribution
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default TutorAnalytics;
