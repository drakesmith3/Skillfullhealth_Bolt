
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, Calendar, Award } from "lucide-react";

export interface KPISummaryCardsProps {
  timeFrame: "weekly" | "monthly" | "quarterly" | "yearly";
}

const KPISummaryCards: React.FC<KPISummaryCardsProps> = ({ timeFrame }) => {
  // Mock data based on timeFrame
  const getKPIData = () => {
    switch (timeFrame) {
      case 'weekly':
        return {
          jobs: { value: 14, change: 8.5, increasing: true },
          revenue: { value: 250000, change: 5.3, increasing: true },
          candidates: { value: 47, change: -2.7, increasing: false },
          satisfaction: { value: 94.8, change: 1.2, increasing: true }
        };
      case 'monthly':
        return {
          jobs: { value: 52, change: 12.7, increasing: true },
          revenue: { value: 980000, change: 8.1, increasing: true },
          candidates: { value: 183, change: 5.4, increasing: true },
          satisfaction: { value: 92.3, change: -0.8, increasing: false }
        };
      case 'quarterly':
        return {
          jobs: { value: 156, change: 15.2, increasing: true },
          revenue: { value: 2850000, change: 10.5, increasing: true },
          candidates: { value: 542, change: 7.9, increasing: true },
          satisfaction: { value: 91.7, change: 2.1, increasing: true }
        };
      case 'yearly':
        return {
          jobs: { value: 624, change: 23.7, increasing: true },
          revenue: { value: 12500000, change: 18.2, increasing: true },
          candidates: { value: 2184, change: 11.5, increasing: true },
          satisfaction: { value: 93.5, change: 3.4, increasing: true }
        };
      default:
        return {
          jobs: { value: 52, change: 12.7, increasing: true },
          revenue: { value: 980000, change: 8.1, increasing: true },
          candidates: { value: 183, change: 5.4, increasing: true },
          satisfaction: { value: 92.3, change: -0.8, increasing: false }
        };
    }
  };

  const kpiData = getKPIData();

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Jobs Filled Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-2">
              <Calendar className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
            <div className={`flex items-center ${kpiData.jobs.increasing ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">{kpiData.jobs.change}%</span>
              {kpiData.jobs.increasing ? 
                <ArrowUpRight className="h-4 w-4 ml-1" /> : 
                <ArrowDownRight className="h-4 w-4 ml-1" />
              }
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Jobs Filled</h3>
            <p className="text-3xl font-bold">{kpiData.jobs.value}</p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-100 dark:bg-green-900 p-2">
              <CreditCard className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className={`flex items-center ${kpiData.revenue.increasing ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">{kpiData.revenue.change}%</span>
              {kpiData.revenue.increasing ? 
                <ArrowUpRight className="h-4 w-4 ml-1" /> : 
                <ArrowDownRight className="h-4 w-4 ml-1" />
              }
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
            <p className="text-3xl font-bold">{formatCurrency(kpiData.revenue.value)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-100 dark:bg-purple-900 p-2">
              <Users className="h-6 w-6 text-purple-700 dark:text-purple-300" />
            </div>
            <div className={`flex items-center ${kpiData.candidates.increasing ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">{kpiData.candidates.change}%</span>
              {kpiData.candidates.increasing ? 
                <ArrowUpRight className="h-4 w-4 ml-1" /> : 
                <ArrowDownRight className="h-4 w-4 ml-1" />
              }
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">New Candidates</h3>
            <p className="text-3xl font-bold">{kpiData.candidates.value}</p>
          </div>
        </CardContent>
      </Card>

      {/* Satisfaction Card */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-100 dark:bg-amber-900 p-2">
              <Award className="h-6 w-6 text-amber-700 dark:text-amber-300" />
            </div>
            <div className={`flex items-center ${kpiData.satisfaction.increasing ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">{kpiData.satisfaction.change}%</span>
              {kpiData.satisfaction.increasing ? 
                <ArrowUpRight className="h-4 w-4 ml-1" /> : 
                <ArrowDownRight className="h-4 w-4 ml-1" />
              }
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Satisfaction</h3>
            <p className="text-3xl font-bold">{kpiData.satisfaction.value}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISummaryCards;
