
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export interface KPIChartsProps {
  type?: string;
  timeFrame?: string;
}

const KPICharts: React.FC<KPIChartsProps> = ({ type = "overview", timeFrame = "30" }) => {
  const performanceData = [
    { month: 'Jan', patients: 45, referrals: 8, feedback: 4.6 },
    { month: 'Feb', patients: 52, referrals: 6, feedback: 4.7 },
    { month: 'Mar', patients: 48, referrals: 9, feedback: 4.5 },
    { month: 'Apr', patients: 61, referrals: 12, feedback: 4.8 },
    { month: 'May', patients: 58, referrals: 10, feedback: 4.9 },
    { month: 'Jun', patients: 68, referrals: 11, feedback: 4.8 },
  ];

  const weeklyData = [
    { week: 'Week 1', hours: 42, cases: 15 },
    { week: 'Week 2', hours: 38, cases: 18 },
    { week: 'Week 3', hours: 45, cases: 20 },
    { week: 'Week 4', hours: 40, cases: 15 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#D4AF37" 
                strokeWidth={2}
                name="Patients Seen"
              />
              <Line 
                type="monotone" 
                dataKey="referrals" 
                stroke="#ea384c" 
                strokeWidth={2}
                name="Referrals"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#D4AF37" name="Hours Worked" />
              <Bar dataKey="cases" fill="#ea384c" name="Cases Handled" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPICharts;
