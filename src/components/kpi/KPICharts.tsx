
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Define prop types with specific allowed values
export interface KPIChartsProps {
  type: "overview" | "performance" | "revenue" | "growth";
  timeFrame: "weekly" | "monthly" | "quarterly" | "yearly";
}

const KPICharts: React.FC<KPIChartsProps> = ({ type, timeFrame }) => {
  // Mock data
  const performanceData = [
    { name: 'Jan', actual: 4000, target: 4500 },
    { name: 'Feb', actual: 3000, target: 4000 },
    { name: 'Mar', actual: 5000, target: 5000 },
    { name: 'Apr', actual: 4500, target: 4500 },
    { name: 'May', actual: 6000, target: 5500 },
    { name: 'Jun', actual: 5500, target: 5500 },
  ];

  const revenueData = [
    { name: 'Q1', revenue: 10000, expenses: 6000, profit: 4000 },
    { name: 'Q2', revenue: 12000, expenses: 7000, profit: 5000 },
    { name: 'Q3', revenue: 9000, expenses: 5000, profit: 4000 },
    { name: 'Q4', revenue: 15000, expenses: 8000, profit: 7000 },
  ];

  const growthData = [
    { name: 'New Hires', value: 25 },
    { name: 'Returning', value: 55 },
    { name: 'Turnover', value: 20 },
  ];

  const COLORS = ['#D4AF37', '#ea384c', '#36A2EB', '#22c55e'];

  // Render the correct chart based on the type prop
  const renderChart = () => {
    switch (type) {
      case 'performance':
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#D4AF37" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="target" stroke="#ea384c" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        );
      case 'revenue':
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#D4AF37" />
                <Bar dataKey="expenses" fill="#ea384c" />
                <Bar dataKey="profit" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        );
      case 'growth':
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Growth Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={growthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {growthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        );
      default:
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Overview Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#D4AF37" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-1">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#ea384c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        );
    }
  };

  return renderChart();
};

export default KPICharts;
