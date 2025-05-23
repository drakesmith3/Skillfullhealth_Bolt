
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import KPISummaryCards from '@/components/kpi/KPISummaryCards';
import KPICharts from '@/components/kpi/KPICharts';

const KPIDashboardPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [period, setPeriod] = useState("30");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // KPI Entry History Data
  const historyData = [
    { date: "Jul 18, 2025", facility: "Lagos General Hospital", patients: 25, referrals: 4, presentations: 1, feedback: 5.0 },
    { date: "Jul 12, 2025", facility: "Mercy Medical Center", patients: 18, referrals: 2, presentations: 0, feedback: 4.8 },
    { date: "Jul 10, 2025", facility: "St. Mary's Clinic", patients: 25, referrals: 5, presentations: 2, feedback: 4.5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="kpi tracking" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">KPI Tracking Dashboard</h1>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last 365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Button className="bg-[#D4AF37] text-black flex items-center gap-2 hover:bg-[#D4AF37]/80">
                <Plus className="h-4 w-4" />
                Add KPI Entry
              </Button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">Monitor your key performance indicators to improve your GLOHSEN score.</p>
          
          {/* KPI Summary Cards */}
          <KPISummaryCards timeFrame={period} />
          
          {/* KPI Charts */}
          <KPICharts type="overview" timeFrame={period} />
          
          {/* KPI Entry History */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">KPI Entry History</CardTitle>
              <Input 
                placeholder="Search entries..."
                className="max-w-sm"
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">DATE</TableHead>
                      <TableHead>FACILITY/EMPLOYER</TableHead>
                      <TableHead className="text-center">PATIENTS SEEN</TableHead>
                      <TableHead className="text-center">REFERRALS</TableHead>
                      <TableHead className="text-center">PRESENTATIONS</TableHead>
                      <TableHead className="text-center">FEEDBACK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyData.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.facility}</TableCell>
                        <TableCell className="text-center">{entry.patients}</TableCell>
                        <TableCell className="text-center">{entry.referrals}</TableCell>
                        <TableCell className="text-center">{entry.presentations}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill={i < Math.floor(entry.feedback) ? "#D4AF37" : "none"} 
                                stroke={i < Math.floor(entry.feedback) ? "#D4AF37" : "#D9D9D9"}
                                className="mx-0.5"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm">{entry.feedback}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <p>Showing 3 of 25 entries</p>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Badge variant="secondary" className="bg-[#D4AF37] text-white">
                    1
                  </Badge>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default KPIDashboardPage;
