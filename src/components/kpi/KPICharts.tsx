
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface KPIChartsProps {
  type?: 'overview' | 'performance' | 'revenue' | 'growth';
  timeFrame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

type PerformanceData = { name: string; value: number }[];
type RevenueData = { name: string; value: number }[];
type GrowthData = { name: string; value: number }[];

type ChartData = {
  performance: PerformanceData;
  revenue: RevenueData;
  growth: GrowthData;
} | PerformanceData | RevenueData | GrowthData;

const KPICharts: React.FC<KPIChartsProps> = ({ 
  type = "overview", 
  timeFrame = "monthly" 
}) => {
  // Generate mock data based on time frame
  const getChartData = (): ChartData => {
    let performanceData: PerformanceData;
    let revenueData: RevenueData;
    let growthData: GrowthData;

    switch(timeFrame) {
      case 'weekly':
        performanceData = [
          { name: 'Mon', value: 85 },
          { name: 'Tue', value: 78 },
          { name: 'Wed', value: 92 },
          { name: 'Thu', value: 80 },
          { name: 'Fri', value: 88 },
          { name: 'Sat', value: 72 },
          { name: 'Sun', value: 65 }
        ];

        revenueData = [
          { name: 'Mon', value: 3200 },
          { name: 'Tue', value: 2800 },
          { name: 'Wed', value: 3500 },
          { name: 'Thu', value: 3100 },
          { name: 'Fri', value: 3800 },
          { name: 'Sat', value: 2500 },
          { name: 'Sun', value: 2200 }
        ];

        growthData = [
          { name: 'Week Start', value: 100 },
          { name: 'Current', value: 115 }
        ];
        break;

      case 'quarterly':
        performanceData = [
          { name: 'Jan', value: 82 },
          { name: 'Feb', value: 85 },
          { name: 'Mar', value: 88 },
          { name: 'Apr', value: 81 },
          { name: 'May', value: 83 },
          { name: 'Jun', value: 85 },
          { name: 'Jul', value: 87 },
          { name: 'Aug', value: 89 },
          { name: 'Sep', value: 90 },
          { name: 'Oct', value: 88 },
          { name: 'Nov', value: 86 },
          { name: 'Dec', value: 92 }
        ];

        revenueData = [
          { name: 'Jan', value: 10500 },
          { name: 'Feb', value: 12000 },
          { name: 'Mar', value: 13500 },
          { name: 'Apr', value: 12800 },
          { name: 'May', value: 13200 },
          { name: 'Jun', value: 14000 },
          { name: 'Jul', value: 15200 },
          { name: 'Aug', value: 16500 },
          { name: 'Sep', value: 17800 },
          { name: 'Oct', value: 18500 },
          { name: 'Nov', value: 19200 },
          { name: 'Dec', value: 21000 }
        ];

        growthData = [
          { name: 'Q1', value: 100 },
          { name: 'Q2', value: 115 },
          { name: 'Q3', value: 132 },
          { name: 'Q4', value: 145 }
        ];
        break;

      case 'yearly':
        performanceData = [
          { name: '2022', value: 75 },
          { name: '2023', value: 82 },
          { name: '2024', value: 88 },
          { name: '2025', value: 90 }
        ];

        revenueData = [
          { name: '2022', value: 120000 },
          { name: '2023', value: 145000 },
          { name: '2024', value: 182000 },
          { name: '2025', value: 210000 }
        ];

        growthData = [
          { name: '2022', value: 100 },
          { name: '2023', value: 121 },
          { name: '2024', value: 152 },
          { name: '2025', value: 175 }
        ];
        break;

      case 'monthly':
      default:
        performanceData = [
          { name: 'Week 1', value: 82 },
          { name: 'Week 2', value: 85 },
          { name: 'Week 3', value: 80 },
          { name: 'Week 4', value: 88 }
        ];

        revenueData = [
          { name: 'Week 1', value: 8500 },
          { name: 'Week 2', value: 9200 },
          { name: 'Week 3', value: 8800 },
          { name: 'Week 4', value: 9600 }
        ];

        growthData = [
          { name: 'Month Start', value: 100 },
          { name: 'Current', value: 112 }
        ];
        break;
    }

    if (type === 'performance') return performanceData;
    if (type === 'revenue') return revenueData;
    if (type === 'growth') return growthData;

    return { performance: performanceData, revenue: revenueData, growth: growthData };
  };

  const chartData = getChartData();
  
  // Colors for charts
  const COLORS = ['#D4AF37', '#ea384c', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      {type === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={Array.isArray(chartData) ? chartData : chartData.performance}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#D4AF37" name="Performance Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={Array.isArray(chartData) ? chartData : chartData.revenue}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ea384c" 
                      name="Revenue" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Growth</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Tooltip />
                    <Pie
                      data={Array.isArray(chartData) ? chartData : chartData.growth}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {(Array.isArray(chartData) ? chartData : chartData.growth).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      ) : type === 'performance' ? (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData as PerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#D4AF37" name="Performance Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : type === 'revenue' ? (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData as RevenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ea384c" 
                  name="Revenue" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Growth Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <Pie
                  data={chartData as GrowthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(chartData as GrowthData).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KPICharts;
