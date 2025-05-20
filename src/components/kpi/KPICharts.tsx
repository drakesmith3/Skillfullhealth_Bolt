
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const KPICharts = () => {
  // Data for Patients Seen Per Week chart
  const patientsData = [
    { week: 'Week 1', patients: 65 },
    { week: 'Week 2', patients: 78 },
    { week: 'Week 3', patients: 58 },
    { week: 'Week 4', patients: 85 },
  ];

  // Data for Referrals Made chart
  const referralsData = [
    { week: 'Week 1', referrals: 12 },
    { week: 'Week 2', referrals: 9 },
    { week: 'Week 3', referrals: 15 },
    { week: 'Week 4', referrals: 10 },
  ];

  // Data for Health Presentations & Trainings chart
  const presentationsData = [
    { name: 'Health Presentations', value: 14 },
    { name: 'Medical Trainings', value: 9 },
    { name: 'Other', value: 5 },
  ];

  // Data for Feedback Ratings chart
  const feedbackData = [
    { source: 'Employer', rating: 4.8 },
    { source: 'Colleagues', rating: 4.5 },
    { source: 'Patients', rating: 4.9 },
  ];

  // Colors for charts
  const barColors = ['#D4AF37', '#EA384D'];
  const pieColors = ['#D4AF37', '#EA384D', '#333333'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Patients Seen Per Week */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Patients Seen Per Week</CardTitle>
        </CardHeader>
        <CardContent className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={patientsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} patients`, 'Value']}
                labelFormatter={(label) => `${label}`} 
              />
              <Bar dataKey="patients" fill={barColors[0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-500 mt-2">
            Average: 71.5 patients per week
          </div>
        </CardContent>
      </Card>
      
      {/* Referrals Made */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Referrals Made</CardTitle>
        </CardHeader>
        <CardContent className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={referralsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} referrals`, 'Value']}
                labelFormatter={(label) => `${label}`} 
              />
              <Bar dataKey="referrals" fill={barColors[1]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-500 mt-2">
            Average: 11.25 referrals per week
          </div>
        </CardContent>
      </Card>
      
      {/* Health Presentations & Trainings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Health Presentations & Trainings</CardTitle>
        </CardHeader>
        <CardContent className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={presentationsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {presentationsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, 'Value']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-500 mt-2">
            Total: 28 presentations in the last 30 days
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback Ratings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Feedback Ratings</CardTitle>
        </CardHeader>
        <CardContent className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={feedbackData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="source" type="category" />
              <Tooltip 
                formatter={(value) => [`${value}/5`, 'Rating']} 
                labelFormatter={(label) => `${label} Rating`}
              />
              <Bar dataKey="rating" fill="#777777" />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-sm text-gray-500 mt-2">
            Overall average rating: 4.73/5
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPICharts;
