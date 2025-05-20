
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, Award, ChartBar, Briefcase, BarChart, CheckCircle, Clock } from "lucide-react";

const GlohsenScoreResultsPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const scoreCategories = [
    { name: "Experience", score: 6, maxScore: 10, description: "Years of professional experience" },
    { name: "Employer Requests Match", score: 30, maxScore: 110, description: "How well you match specific employer requests" },
    { name: "Skills & Certificates", score: 13, maxScore: 15, description: "Compulsory and additional relevant skills" },
    { name: "Locum Jobs", score: 10, maxScore: 10, description: "Number of locum jobs executed through the platform" },
    { name: "Platform Activity", score: 8, maxScore: 10, description: "Contributions to Q&A and platform engagement" },
    { name: "Volunteer Willingness", score: 10, maxScore: 10, description: "Willingness to volunteer or accept challenges" },
    { name: "Location", score: 5, maxScore: 5, description: "Proximity to job locations" },
    { name: "Communication Skills", score: 9, maxScore: 10, description: "Advanced communication & language skills" },
    { name: "Extended Availability", score: 6, maxScore: 10, description: "Willingness to work for extended periods" },
    { name: "Immediate Availability", score: 10, maxScore: 10, description: "Availability to start work immediately" }
  ];

  const totalScore = scoreCategories.reduce((sum, category) => sum + category.score, 0);
  const maxTotalScore = scoreCategories.reduce((sum, category) => sum + category.maxScore, 0);
  
  const matchedEmployers = [
    { 
      name: "General Hospital Lagos", 
      match: 92, 
      requirements: ["Emergency Medicine", "5+ years experience", "BLS & ACLS certified"],
      jobOpportunities: 3
    },
    { 
      name: "Private Healthcare Group", 
      match: 88, 
      requirements: ["General Medicine", "3+ years experience", "Available immediately"],
      jobOpportunities: 5
    },
    { 
      name: "Mercy Medical Center", 
      match: 85, 
      requirements: ["Internal Medicine", "Team leadership", "ATLS certification"],
      jobOpportunities: 2
    }
  ];
  
  const improvementAreas = [
    { area: "Advanced Skills", description: "Add more specialized certifications", importance: "High" },
    { area: "Platform Activity", description: "Contribute more to community discussions", importance: "Medium" },
    { area: "Extended Availability", description: "Increase availability for longer term positions", importance: "Medium" }
  ];
  
  const scoreHistory = [
    { date: "May 2025", score: 97, change: "+5" },
    { date: "April 2025", score: 92, change: "+7" },
    { date: "March 2025", score: 85, change: "+10" },
    { date: "February 2025", score: 75, change: "" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PreHeader currentPage="glohsen score results" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your GLOHSEN Score Results</h1>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-[#EA384C]">{totalScore}</div>
                    <div className="text-sm text-gray-500">out of {maxTotalScore} possible points</div>
                  </div>
                  
                  <div className="w-24 h-24 rounded-full border-8 border-[#D4AF37] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(totalScore / maxTotalScore * 100)}%</div>
                      <div className="text-xs">Percentile</div>
                    </div>
                  </div>
                </div>
                
                <Progress value={(totalScore / maxTotalScore) * 100} className="h-2" />
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Rank</div>
                    <div className="text-lg font-bold">Top 15%</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Job Matches</div>
                    <div className="text-lg font-bold">24</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Last Updated</div>
                    <div className="text-lg font-bold">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <ChartBar className="mr-2 h-5 w-5 text-[#D4AF37]" />
                  Score History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scoreHistory.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{entry.date}</div>
                        {entry.change && (
                          <div className="text-xs text-green-600">{entry.change} points</div>
                        )}
                      </div>
                      <div className="font-bold">{entry.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="breakdown" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
              <TabsTrigger value="matches">Employer Matches</TabsTrigger>
              <TabsTrigger value="improve">Improvement Areas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Detailed Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {scoreCategories.map((category, idx) => (
                      <div key={idx} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{category.name}</h3>
                          <div className="text-lg font-bold">
                            {category.score}/{category.maxScore}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        
                        <Progress 
                          value={(category.score / category.maxScore) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="matches" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    Top Employer Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matchedEmployers.map((employer, idx) => (
                      <div key={idx} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{employer.name}</h3>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Match:</span>
                            <span className="text-lg font-bold text-[#D4AF37]">{employer.match}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-1">Requirements</h4>
                          <div className="flex flex-wrap gap-2">
                            {employer.requirements.map((req, i) => (
                              <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{employer.jobOpportunities} job opportunities available</span>
                          <Button size="sm">View Jobs</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="improve" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-[#D4AF37]" />
                    How to Improve Your Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {improvementAreas.map((area, idx) => (
                      <div key={idx} className="flex gap-4 border-b pb-4 last:border-0">
                        <div className={`p-2 rounded-full h-8 w-8 flex-shrink-0 ${
                          area.importance === "High" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-amber-100 text-amber-600"
                        }`}>
                          {area.importance === "High" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold">{area.area}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              area.importance === "High"
                                ? "bg-red-100 text-red-600"
                                : "bg-amber-100 text-amber-600"
                            }`}>
                              {area.importance} Priority
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {area.description}
                          </p>
                          
                          <Button size="sm" variant="outline">View Recommendations</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
              Recalculate My GLOHSEN Score
            </Button>
          </div>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default GlohsenScoreResultsPage;
