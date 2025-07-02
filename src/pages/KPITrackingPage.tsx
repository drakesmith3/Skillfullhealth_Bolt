
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart, Activity, Calendar, Download, FileText } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import KPISummaryCards from '@/components/kpi/KPISummaryCards';
import KPICharts from '@/components/kpi/KPICharts';

type ChartType = "overview" | "performance" | "revenue" | "growth";
type TimeFrame = "weekly" | "monthly" | "quarterly" | "yearly";

const KPITrackingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChartType>("overview");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="KPI tracking" />
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Key Performance Indicators</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Track and analyze your professional performance metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Date Range
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export Data
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-2 bg-[#D4AF37] text-white hover:bg-[#C09C30]">
              <FileText className="h-4 w-4" /> Generate Report
            </Button>
          </div>
        </div>

        <div className="mb-6 flex justify-between">
          <Tabs defaultValue="monthly" value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-auto">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* KPI Summary Cards */}
        <KPISummaryCards timeFrame={timeFrame} />

        <Tabs defaultValue="overview" className="w-full mt-8" value={activeTab} onValueChange={(value) => setActiveTab(value as ChartType)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center">
              <LineChart className="mr-2 h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" /> Revenue
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" /> Growth
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <KPICharts type={activeTab} timeFrame={timeFrame} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default KPITrackingPage;
