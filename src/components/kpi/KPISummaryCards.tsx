
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Users, Star, Clock, Award } from "lucide-react";

export interface KPISummaryCardsProps {
  timeFrame?: string;
}

const KPISummaryCards: React.FC<KPISummaryCardsProps> = ({ timeFrame = "30" }) => {
  const kpiData = [
    {
      title: "Patients Seen",
      value: "68",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Professional Referrals",
      value: "11",
      change: "+8%",
      trend: "up",
      icon: Star,
      color: "text-green-600"
    },
    {
      title: "Presentations Given",
      value: "3",
      change: "0%",
      trend: "neutral",
      icon: Award,
      color: "text-purple-600"
    },
    {
      title: "Average Feedback Score",
      value: "4.8",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Response Time",
      value: "2.1 hrs",
      change: "-15%",
      trend: "up",
      icon: Clock,
      color: "text-indigo-600"
    },
    {
      title: "GLOHSEN Score Impact",
      value: "+12 pts",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-[#D4AF37]"
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {kpiData.map((kpi, index) => {
        const IconComponent = kpi.icon;
        const isPositive = kpi.trend === "up";
        const isNeutral = kpi.trend === "neutral";
        
        return (
          <Card 
            key={index} 
            size="md" 
            variant="stats"
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader 
              compact 
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <IconComponent className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent compact>
              <div className="text-2xl font-bold mb-1">{kpi.value}</div>
              <div className="flex items-center space-x-1">
                {!isNeutral && (
                  <>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </>
                )}
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isNeutral 
                      ? "bg-gray-100 text-gray-600" 
                      : isPositive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {kpi.change} from last {timeFrame} days
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPISummaryCards;
