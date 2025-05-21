
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, TrendingUp, UserCheck, FileText, Calendar, Users, CircleDollarSign, FileCheck } from 'lucide-react';

interface KPISummaryCardsProps {
  timeFrame: string;
}

const KPISummaryCards: React.FC<KPISummaryCardsProps> = ({ timeFrame }) => {
  // Mock data - in a real app, this would come from an API
  const kpiData = {
    weekly: {
      clients: 12,
      clientsDelta: +15,
      appointments: 24,
      appointmentsDelta: +5,
      successRate: 94,
      successRateDelta: +2,
      revenue: 250000,
      revenueDelta: +8,
      cases: 18,
      casesDelta: +10,
      teamSatisfaction: 92,
      teamSatisfactionDelta: 0,
      careQuality: 96,
      careQualityDelta: +1,
      documentation: 88,
      documentationDelta: -3,
    },
    monthly: {
      clients: 48,
      clientsDelta: +12,
      appointments: 96,
      appointmentsDelta: +8,
      successRate: 92,
      successRateDelta: +3,
      revenue: 1000000,
      revenueDelta: +15,
      cases: 72,
      casesDelta: +8,
      teamSatisfaction: 90,
      teamSatisfactionDelta: +2,
      careQuality: 95,
      careQualityDelta: +2,
      documentation: 85,
      documentationDelta: +5,
    },
    quarterly: {
      clients: 144,
      clientsDelta: +8,
      appointments: 288,
      appointmentsDelta: +6,
      successRate: 91,
      successRateDelta: +4,
      revenue: 3000000,
      revenueDelta: +10,
      cases: 216,
      casesDelta: +5,
      teamSatisfaction: 87,
      teamSatisfactionDelta: -1,
      careQuality: 93,
      careQualityDelta: 0,
      documentation: 82,
      documentationDelta: +3,
    },
    yearly: {
      clients: 576,
      clientsDelta: +20,
      appointments: 1152,
      appointmentsDelta: +12,
      successRate: 90,
      successRateDelta: +5,
      revenue: 12000000,
      revenueDelta: +18,
      cases: 864,
      casesDelta: +15,
      teamSatisfaction: 85,
      teamSatisfactionDelta: +5,
      careQuality: 92,
      careQualityDelta: +3,
      documentation: 80,
      documentationDelta: +8,
    }
  };

  const currentData = kpiData[timeFrame as keyof typeof kpiData];
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Clients</h3>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{formatNumber(currentData.clients)}</p>
              <p className={`text-sm flex items-center ${currentData.clientsDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.clientsDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.clientsDelta > 0 ? '+' : ''}{currentData.clientsDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Appointments</h3>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{formatNumber(currentData.appointments)}</p>
              <p className={`text-sm flex items-center ${currentData.appointmentsDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.appointmentsDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.appointmentsDelta > 0 ? '+' : ''}{currentData.appointmentsDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</h3>
            <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-md">
              <UserCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{currentData.successRate}%</p>
              <p className={`text-sm flex items-center ${currentData.successRateDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.successRateDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.successRateDelta > 0 ? '+' : ''}{currentData.successRateDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
              <CircleDollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{formatCurrency(currentData.revenue)}</p>
              <p className={`text-sm flex items-center ${currentData.revenueDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.revenueDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.revenueDelta > 0 ? '+' : ''}{currentData.revenueDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cases</h3>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-md">
              <FileCheck className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{formatNumber(currentData.cases)}</p>
              <p className={`text-sm flex items-center ${currentData.casesDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.casesDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.casesDelta > 0 ? '+' : ''}{currentData.casesDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Satisfaction</h3>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-md">
              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{currentData.teamSatisfaction}%</p>
              <p className={`text-sm flex items-center ${currentData.teamSatisfactionDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.teamSatisfactionDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.teamSatisfactionDelta > 0 ? '+' : ''}{currentData.teamSatisfactionDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Care Quality</h3>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-md">
              <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{currentData.careQuality}%</p>
              <p className={`text-sm flex items-center ${currentData.careQualityDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.careQualityDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.careQualityDelta > 0 ? '+' : ''}{currentData.careQualityDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Documentation</h3>
            <div className="p-2 bg-sky-100 dark:bg-sky-900 rounded-md">
              <FileText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{currentData.documentation}%</p>
              <p className={`text-sm flex items-center ${currentData.documentationDelta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${currentData.documentationDelta < 0 ? 'transform rotate-180' : ''}`} />
                {currentData.documentationDelta > 0 ? '+' : ''}{currentData.documentationDelta}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISummaryCards;
