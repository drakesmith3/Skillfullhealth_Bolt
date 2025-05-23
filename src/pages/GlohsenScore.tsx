
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  Briefcase, 
  Target,
  Star,
  ChevronRight,
  Calendar,
  AlertCircle
} from "lucide-react";
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import EQAssessment from '@/components/EQAssessment';

const GlohsenScore = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [currentScore] = useState(847);
  const [previousScore] = useState(792);
  const [scoreChange] = useState(currentScore - previousScore);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getScoreLevel = (score: number) => {
    if (score >= 900) return { level: "Expert", color: "text-purple-600", bgColor: "bg-purple-100" };
    if (score >= 800) return { level: "Advanced", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (score >= 700) return { level: "Proficient", color: "text-green-600", bgColor: "bg-green-100" };
    if (score >= 600) return { level: "Competent", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Developing", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const scoreLevel = getScoreLevel(currentScore);

  const scoreComponents = [
    {
      category: "Professional Qualifications",
      score: 180,
      maxScore: 200,
      percentage: 90,
      icon: Award,
      description: "Certifications, licenses, and formal qualifications"
    },
    {
      category: "Work Experience",
      score: 165,
      maxScore: 200,
      percentage: 82.5,
      icon: Briefcase,
      description: "Years of experience and professional roles"
    },
    {
      category: "Continuing Education",
      score: 142,
      maxScore: 200,
      percentage: 71,
      icon: BookOpen,
      description: "CME courses, workshops, and ongoing learning"
    },
    {
      category: "Performance Metrics",
      score: 158,
      maxScore: 200,
      percentage: 79,
      icon: Target,
      description: "KPI tracking, patient outcomes, and feedback scores"
    },
    {
      category: "Platform Activity",
      score: 125,
      maxScore: 150,
      percentage: 83.3,
      icon: Users,
      description: "Engagement with platform features and community"
    },
    {
      category: "Peer Recognition",
      score: 77,
      maxScore: 100,
      percentage: 77,
      icon: Star,
      description: "Reviews, recommendations, and professional network"
    }
  ];

  const recentActivities = [
    { date: "2024-01-15", activity: "Completed Advanced Cardiac Life Support Course", points: "+25 points" },
    { date: "2024-01-10", activity: "Received 5-star patient feedback", points: "+15 points" },
    { date: "2024-01-08", activity: "Participated in Medical Conference", points: "+20 points" },
    { date: "2024-01-05", activity: "Completed quarterly KPI assessment", points: "+10 points" },
  ];

  const recommendations = [
    {
      title: "Complete Pediatric Emergency Medicine Course",
      description: "Enhance your emergency medicine skills with specialized pediatric training",
      points: "+30 points",
      category: "Continuing Education"
    },
    {
      title: "Update Professional Certifications",
      description: "Renew your BLS and ACLS certifications to maintain current status",
      points: "+20 points",
      category: "Professional Qualifications"
    },
    {
      title: "Engage with Community Forum",
      description: "Participate in professional discussions to boost platform activity",
      points: "+15 points",
      category: "Platform Activity"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="glohsen score" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Your GLOHSEN Score</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Global Health Professionals Excellence Network Score
            </p>
          </div>

          {/* Current Score Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Current Score</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-6xl font-bold">{currentScore}</span>
                    <div>
                      <Badge className={`${scoreLevel.bgColor} ${scoreLevel.color} mb-2`}>
                        {scoreLevel.level}
                      </Badge>
                      <div className="flex items-center text-green-200">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{scoreChange} from last assessment
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90 mb-2">Out of 1000</div>
                  <Progress 
                    value={(currentScore / 1000) * 100} 
                    className="w-32 h-3 bg-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="breakdown" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
              <TabsTrigger value="history">Score History</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="assessment">EQ Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid gap-4">
                {scoreComponents.map((component, index) => {
                  const IconComponent = component.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                              <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{component.category}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {component.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {component.score}/{component.maxScore}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {component.percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={component.percentage} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Score Activities</CardTitle>
                  <CardDescription>
                    Track your score changes and improvements over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{activity.activity}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.date}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {activity.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Improve Your Score</CardTitle>
                  <CardDescription>
                    Personalized recommendations to boost your GLOHSEN score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h4 className="font-semibold">{rec.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {rec.description}
                              </p>
                              <Badge variant="secondary">{rec.category}</Badge>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-100 text-green-800 mb-2">
                                {rec.points}
                              </Badge>
                              <Button size="sm" className="block">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Complete Your EQ Assessment
                    </CardTitle>
                    <CardDescription>
                      This assessment contributes to your overall GLOHSEN score calculation
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <EQAssessment />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default GlohsenScore;
