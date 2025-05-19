import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Award, ChevronRight, Heart } from "lucide-react";
import GlohsenScoreCalculator from "@/components/GlohsenScoreCalculator";
import GlohsenScoreResults from "@/components/GlohsenScoreResults";
import { GlohsenScoreProvider } from "@/components/GlohsenScoreContext";
import GlohsenScoreResultMockup from "@/components/GlohsenScoreResultMockup";
import EQAssessment from "@/components/EQAssessment";
import type { EQAssessmentResult } from "@/components/assessment/types";

// Actual ShadCN UI component imports - assuming these are correctly set up in the project
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Mocked Sidebar if not a real component, or import if it is
const Sidebar = () => <div className="p-4 bg-gray-100 rounded shadow">Sidebar Content (Mocked)</div>;

const GlohsenScorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [eqResult, setEqResult] = useState<EQAssessmentResult | null>(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEQComplete = (result: EQAssessmentResult) => {
    setEqResult(result);
    setActiveTab("results"); // Switch to results tab after completing EQ assessment
  };
  
  return (
    <GlohsenScoreProvider>
      <div className="flex flex-col min-h-screen bg-f5f5f5">
        <PreHeader currentPage="glohsen score" />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-[#000000e6]">
              <Award className="h-8 w-8 text-[#D4AF37]" />
              GLOHSEN Score Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your professional rating, complete assessments, and view your progress over time.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <Sidebar />
              
              {/* Quick Stats Card */}
              <Card className="p-6 mt-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">179/200</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">EQ Score</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">
                      {eqResult ? `${eqResult.score}/${eqResult.maxScore}` : 'Not taken'}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-9">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                  <TabsTrigger value="results">Results & History</TabsTrigger>
                  <TabsTrigger value="eq">EQ Assessment</TabsTrigger>
                </TabsList>
              
                <TabsContent value="overview" className="mt-0">
                  <div className="grid gap-8">
                    <Card className="p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Welcome to Your GLOHSEN Score Dashboard</h2>
                          <p className="text-gray-600 mb-6">
                            Your GLOHSEN Score is a comprehensive evaluation of your professional profile.
                            Complete all assessments to maximize your score and unlock better opportunities.
                          </p>
                        </div>
                        <GlohsenScoreResultMockup showFullReport={true} />
                      </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="font-semibold mb-4">Next Steps</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-600">
                            <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
                            Complete your EQ Assessment
                          </li>
                          <li className="flex items-center gap-2 text-gray-600">
                            <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
                            Update your certifications
                          </li>
                          <li className="flex items-center gap-2 text-gray-600">
                            <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
                            Review your skills inventory
                          </li>
                        </ul>
                      </Card>

                      <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recent Updates</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-600">
                            <Heart className="h-4 w-4 text-[#D4AF37]" />
                            EQ Assessment available
                          </li>
                          <li className="flex items-center gap-2 text-gray-600">
                            <Heart className="h-4 w-4 text-[#D4AF37]" />
                            New skills added to evaluation
                          </li>
                        </ul>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="calculator" className="mt-0">
                  <GlohsenScoreCalculator />
                </TabsContent>
                
                <TabsContent value="results" className="mt-0">
                  <GlohsenScoreResults />
                </TabsContent>
                
                <TabsContent value="eq" className="mt-0">
                  <EQAssessment onComplete={handleEQComplete} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        {showFooter && <Footer isActive={false} />}
      </div>
    </GlohsenScoreProvider>
  );
};

export default GlohsenScorePage;
