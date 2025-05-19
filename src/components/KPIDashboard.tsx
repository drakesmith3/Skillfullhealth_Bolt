
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, Plus, ChevronLeft, ChevronRight, Star, Printer, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const KPIDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("30");
  
  // Sample data for charts
  const patientData = [
    { name: "Week 1", patients: 65 },
    { name: "Week 2", patients: 75 },
    { name: "Week 3", patients: 50 },
    { name: "Week 4", patients: 80 }
  ];
  
  const referralData = [
    { name: "Week 1", referrals: 12 },
    { name: "Week 2", referrals: 8 },
    { name: "Week 3", referrals: 15 },
    { name: "Week 4", referrals: 10 }
  ];
  
  const presentationData = [
    { name: "Health Presentations", value: 15, color: "#F9D75D" },
    { name: "Medical Trainings", value: 8, color: "#E77878" },
    { name: "Other", value: 2, color: "#777777" }
  ];
  
  const historyData = [
    {
      id: 1,
      date: "Jul 15, 2025",
      facility: "Lagos General Hospital",
      patients: 23,
      referrals: 4,
      presentations: 1,
      feedback: 5.0
    },
    {
      id: 2,
      date: "Jul 12, 2025",
      facility: "Mercy Medical Center",
      patients: 18,
      referrals: 2,
      presentations: 0,
      feedback: 4.8
    },
    {
      id: 3,
      date: "Jul 10, 2025",
      facility: "St. Mary's Clinic",
      patients: 25,
      referrals: 5,
      presentations: 2,
      feedback: 4.9
    }
  ];
  
  // Render 5 stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">KPI Tracking Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitor your key performance indicators to improve your GLOHSEN score.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="flex items-center border rounded-md bg-white px-3 py-1.5 shadow-sm">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <Button size="sm" className="flex items-center gap-2 bg-[#D4AF37] text-white hover:bg-[#D4AF37]/80">
            <Plus className="h-4 w-4" />
            Add KPI Entry
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-500 mb-1">Total Patients</p>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-bold">286</p>
            <p className="text-xs text-green-500">+12%</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-gray-500 mb-1">Referrals Made</p>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-bold">45</p>
            <p className="text-xs text-green-500">+5%</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-gray-500 mb-1">Presentations</p>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-green-500">+15%</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-gray-500 mb-1">Avg. Feedback</p>
          <div className="flex justify-between items-baseline">
            <p className="text-2xl font-bold">4.7/5</p>
            <p className="text-xs text-green-500">+0.2</p>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Patients Chart */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Patients Seen Per Week</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#F9D75D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">Average: 67.5 patients per week</p>
        </Card>
        
        {/* Referrals Chart */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Referrals Made</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="referrals" fill="#E77878" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">Average: 11.25 referrals per week</p>
        </Card>
        
        {/* Presentations Chart */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Health Presentations & Trainings</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={presentationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                >
                  {presentationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">Total: 25 presentations in the last 30 days</p>
        </Card>
        
        {/* Feedback Chart */}
        <Card className="p-4">
          <h3 className="font-bold mb-4">Feedback Ratings</h3>
          <div className="h-[240px] flex flex-col justify-center items-center">
            <div className="text-5xl font-bold text-d4af37">4.75</div>
            <div className="flex text-d4af37 mt-2">
              <Star className="h-6 w-6 fill-[#D4AF37]" />
              <Star className="h-6 w-6 fill-[#D4AF37]" />
              <Star className="h-6 w-6 fill-[#D4AF37]" />
              <Star className="h-6 w-6 fill-[#D4AF37]" />
              <Star className="h-6 w-6 fill-[#D4AF37]" strokeOpacity={0.5} fillOpacity={0.5} />
            </div>
            <p className="text-sm mt-4 text-gray-500">Overall average rating</p>
            
            <div className="w-full mt-8 grid grid-cols-3 gap-2 text-center">
              <div>
                <h4 className="text-xs text-gray-500">Employer</h4>
                <p className="font-bold">4.8/5</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Colleagues</h4>
                <p className="font-bold">4.7/5</p>
              </div>
              <div>
                <h4 className="text-xs text-gray-500">Patients</h4>
                <p className="font-bold">4.9/5</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* KPI Entry History */}
      <Card className="mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">KPI Entry History</h3>
          <Input placeholder="Search entries..." className="max-w-xs" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Facility/Employer</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Patients Seen</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Referrals</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Presentations</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{entry.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{entry.facility}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{entry.patients}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{entry.referrals}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">{entry.presentations}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {renderStars(entry.feedback)}
                      <span className="ml-2 text-gray-700">{entry.feedback.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 1-3 of 25 entries</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="w-10 p-0 font-medium bg-[#D4AF37] text-white">1</Button>
            <Button variant="outline" size="sm" className="w-10 p-0">2</Button>
            <Button variant="outline" size="sm" className="w-10 p-0">3</Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KPIDashboard;
