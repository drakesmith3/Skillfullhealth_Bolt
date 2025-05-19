import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KPIDashboardPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Placeholder KPI data
  const kpiData = [
    { title: "Active Users", value: "1,234", change: "+5.2%" },
    { title: "Revenue", value: "$56,789", change: "+12.1%" },
    { title: "Conversion Rate", value: "3.45%", change: "-0.5%" },
    { title: "Support Tickets", value: "123", change: "+10" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="kpi dashboard" />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">KPI Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                {/* Optional: Icon can be added here */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Additional charts or data visualizations can be added here */}
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default KPIDashboardPage;
