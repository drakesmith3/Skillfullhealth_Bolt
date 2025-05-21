
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface KPIChartsProps {
  type: string;
  timeFrame: string;
}

const KPICharts: React.FC<KPIChartsProps> = ({ type, timeFrame }) => {
  // Mock data generation based on chart type and time frame
  const getChartData = () => {
    // Overview data with performance, revenue, and growth
    if (type === 'overview') {
      if (timeFrame === 'weekly') {
        return {
          performance: [
            { name: 'Mon', value: 65 },
            { name: 'Tue', value: 72 },
            { name: 'Wed', value: 68 },
            { name: 'Thu', value: 75 },
            { name: 'Fri', value: 80 },
            { name: 'Sat', value: 78 },
            { name: 'Sun', value: 82 }
          ],
          revenue: [
            { name: 'Mon', value: 25000 },
            { name: 'Tue', value: 32000 },
            { name: 'Wed', value: 28000 },
            { name: 'Thu', value: 35000 },
            { name: 'Fri', value: 42000 },
            { name: 'Sat', value: 48000 },
            { name: 'Sun', value: 40000 }
          ],
          growth: [
            { name: 'New Clients', value: 35 },
            { name: 'Returning', value: 45 },
            { name: 'Referrals', value: 20 }
          ]
        };
      } else if (timeFrame === 'monthly') {
        return {
          performance: [
            { name: 'Week 1', value: 70 },
            { name: 'Week 2', value: 75 },
            { name: 'Week 3', value: 82 },
            { name: 'Week 4', value: 88 }
          ],
          revenue: [
            { name: 'Week 1', value: 220000 },
            { name: 'Week 2', value: 240000 },
            { name: 'Week 3', value: 260000 },
            { name: 'Week 4', value: 280000 }
          ],
          growth: [
            { name: 'New Clients', value: 40 },
            { name: 'Returning', value: 35 },
            { name: 'Referrals', value: 25 }
          ]
        };
      } else if (timeFrame === 'quarterly') {
        return {
          performance: [
            { name: 'Month 1', value: 75 },
            { name: 'Month 2', value: 80 },
            { name: 'Month 3', value: 88 }
          ],
          revenue: [
            { name: 'Month 1', value: 900000 },
            { name: 'Month 2', value: 950000 },
            { name: 'Month 3', value: 1150000 }
          ],
          growth: [
            { name: 'New Clients', value: 45 },
            { name: 'Returning', value: 30 },
            { name: 'Referrals', value: 25 }
          ]
        };
      } else {
        return {
          performance: [
            { name: 'Q1', value: 78 },
            { name: 'Q2', value: 82 },
            { name: 'Q3', value: 85 },
            { name: 'Q4', value: 90 }
          ],
          revenue: [
            { name: 'Q1', value: 2800000 },
            { name: 'Q2', value: 3000000 },
            { name: 'Q3', value: 3100000 },
            { name: 'Q4', value: 3500000 }
          ],
          growth: [
            { name: 'New Clients', value: 50 },
            { name: 'Returning', value: 30 },
            { name: 'Referrals', value: 20 }
          ]
        };
      }
    }
    
    // Performance data
    if (type === 'performance') {
      if (timeFrame === 'weekly') {
        return [
          { name: 'Mon', success: 65, target: 70 },
          { name: 'Tue', success: 72, target: 70 },
          { name: 'Wed', success: 68, target: 70 },
          { name: 'Thu', success: 75, target: 70 },
          { name: 'Fri', success: 80, target: 70 },
          { name: 'Sat', success: 78, target: 70 },
          { name: 'Sun', success: 82, target: 70 }
        ];
      } else if (timeFrame === 'monthly') {
        return [
          { name: 'Week 1', success: 70, target: 75 },
          { name: 'Week 2', success: 75, target: 75 },
          { name: 'Week 3', success: 82, target: 75 },
          { name: 'Week 4', success: 88, target: 75 }
        ];
      } else if (timeFrame === 'quarterly') {
        return [
          { name: 'Month 1', success: 75, target: 80 },
          { name: 'Month 2', success: 80, target: 80 },
          { name: 'Month 3', success: 88, target: 80 }
        ];
      } else {
        return [
          { name: 'Q1', success: 78, target: 85 },
          { name: 'Q2', success: 82, target: 85 },
          { name: 'Q3', success: 85, target: 85 },
          { name: 'Q4', success: 90, target: 85 }
        ];
      }
    }
    
    // Revenue data
    if (type === 'revenue') {
      if (timeFrame === 'weekly') {
        return [
          { name: 'Mon', direct: 15000, referral: 10000 },
          { name: 'Tue', direct: 18000, referral: 14000 },
          { name: 'Wed', direct: 16000, referral: 12000 },
          { name: 'Thu', direct: 20000, referral: 15000 },
          { name: 'Fri', direct: 25000, referral: 17000 },
          { name: 'Sat', direct: 30000, referral: 18000 },
          { name: 'Sun', direct: 22000, referral: 18000 }
        ];
      } else if (timeFrame === 'monthly') {
        return [
          { name: 'Week 1', direct: 120000, referral: 100000 },
          { name: 'Week 2', direct: 140000, referral: 100000 },
          { name: 'Week 3', direct: 150000, referral: 110000 },
          { name: 'Week 4', direct: 160000, referral: 120000 }
        ];
      } else if (timeFrame === 'quarterly') {
        return [
          { name: 'Month 1', direct: 500000, referral: 400000 },
          { name: 'Month 2', direct: 550000, referral: 400000 },
          { name: 'Month 3', direct: 650000, referral: 500000 }
        ];
      } else {
        return [
          { name: 'Q1', direct: 1600000, referral: 1200000 },
          { name: 'Q2', direct: 1700000, referral: 1300000 },
          { name: 'Q3', direct: 1800000, referral: 1300000 },
          { name: 'Q4', direct: 2000000, referral: 1500000 }
        ];
      }
    }
    
    // Growth data
    if (type === 'growth') {
      if (timeFrame === 'weekly') {
        return [
          { name: 'New Clients', value: 35 },
          { name: 'Returning', value: 45 },
          { name: 'Referrals', value: 20 }
        ];
      } else if (timeFrame === 'monthly') {
        return [
          { name: 'New Clients', value: 40 },
          { name: 'Returning', value: 35 },
          { name: 'Referrals', value: 25 }
        ];
      } else if (timeFrame === 'quarterly') {
        return [
          { name: 'New Clients', value: 45 },
          { name: 'Returning', value: 30 },
          { name: 'Referrals', value: 25 }
        ];
      } else {
        return [
          { name: 'New Clients', value: 50 },
          { name: 'Returning', value: 30 },
          { name: 'Referrals', value: 20 }
        ];
      }
    }
    
    return [];
  };

  // Colors for charts
  const COLORS = ['#D4AF37', '#ea384c', '#3498db', '#2ecc71'];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Custom tooltip formatters
  const currencyTooltipFormatter = (value: number) => formatCurrency(value);
  const percentTooltipFormatter = (value: number) => `${value}%`;

  const renderChart = () => {
    const data = getChartData();
    
    if (type === 'overview') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={percentTooltipFormatter} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Success Rate" 
                    stroke="#D4AF37" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={currencyTooltipFormatter} />
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#ea384c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Client Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.growth}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.growth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    if (type === 'performance') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Success Rate vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={percentTooltipFormatter} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  name="Success Rate" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="Target" 
                  stroke="#ea384c" 
                  strokeDasharray="3 3" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }
    
    if (type === 'revenue') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={currencyTooltipFormatter} />
                <Legend />
                <Bar dataKey="direct" name="Direct Revenue" fill="#D4AF37" />
                <Bar dataKey="referral" name="Referral Revenue" fill="#ea384c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }
    
    if (type === 'growth') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Client Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }
    
    return null;
  };

  return renderChart();
};

export default KPICharts;
