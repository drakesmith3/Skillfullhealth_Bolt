
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save, RefreshCw } from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { EmployerSidebar } from '@/components/Employer sidebar';
import EmployerCriteriaForm from '@/components/EmployerCriteriaForm';
import EmployerCriteriaWeights from '@/components/EmployerCriteriaWeights';

const EmployerCriteriaPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="employer criteria" userName="Hospital Corp." />
      
      <div className="flex-grow flex mt-16">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <EmployerSidebar />
        </div>
        
        {/* Main content */}
        <div className="w-full lg:flex-1 px-4 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Search Criteria Settings</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Define your requirements for finding the best healthcare professionals</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Reset to Default
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Export Settings
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-2 bg-[#D4AF37] text-white hover:bg-[#C09C30]">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Professional Requirements</h2>
                  <EmployerCriteriaForm />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Criteria Weights</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Set the importance of each criterion in your hiring process
                  </p>
                  <EmployerCriteriaWeights />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">GLOHSEN Score Requirements</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Define the minimum acceptable GLOHSEN score for candidates
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Minimum Score</span>
                    <span className="text-[#D4AF37] font-bold">75</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="75" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#C09C30] text-white">
                      Apply Score Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default EmployerCriteriaPage;
