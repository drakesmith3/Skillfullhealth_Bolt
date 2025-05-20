
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ListFilter, FilePresentation, Star } from "lucide-react";

const KPISummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-gray-600">Total Patients</CardTitle>
          <Users className="h-5 w-5 text-[#D4AF37]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">286</p>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-gray-600">Referrals Made</CardTitle>
          <ListFilter className="h-5 w-5 text-[#D4AF37]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">45</p>
            <span className="text-green-500 text-sm">+5%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-gray-600">Presentations</CardTitle>
          <FilePresentation className="h-5 w-5 text-[#D4AF37]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">23</p>
            <span className="text-green-500 text-sm">+18%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-gray-600">Avg. Feedback</CardTitle>
          <Star className="h-5 w-5 text-[#D4AF37]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">4.7/5</p>
            <span className="text-green-500 text-sm">+0.2</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISummaryCards;
