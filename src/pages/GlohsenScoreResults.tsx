
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Share2, Download, TrendingUp, Award, Zap, Calendar, FileCheck, Book, MessageCircle, Users, Star, ChevronRight } from "lucide-react";

const GlohsenScoreResults: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [loadingScore, setLoadingScore] = useState<boolean>(true);
  const [animateScore, setAnimateScore] = useState<boolean>(false);
  
  // Simulate loading and then animating the score
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoadingScore(false);
      setAnimateScore(true);
    }, 1000);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  // Animate the score counting up
  useEffect(() => {
    if (!animateScore) return;
    
    const finalScore = 178;
    const duration = 1500; // ms
    const frameDuration = 16; // ms per frame (approx 60fps)
    const totalFrames = Math.floor(duration / frameDuration);
    const increment = finalScore / totalFrames;
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const currentValue = Math.min(Math.ceil(increment * frame), finalScore);
      setScore(currentValue);
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [animateScore]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Score Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="border-0 shadow-xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-600 rounded-full opacity-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500 rounded-full opacity-10"></div>
              <CardHeader className="text-center pb-0">
                <CardDescription className="text-lg mb-2">Your Current</CardDescription>
                <CardTitle className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
                  GLOHSEN Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-6 pb-10">
                {loadingScore ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Calculating your score...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <span className="text-7xl md:text-8xl font-bold">{score}</span>
                      <span className="text-lg md:text-xl text-gray-500">/200</span>
                      <Badge className="absolute -top-1 right-0 translate-x-full bg-amber-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5
                      </Badge>
                    </div>
                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                      Your GLOHSEN Score places you in the <span className="font-semibold text-amber-600 dark:text-amber-400">top 10%</span> of healthcare professionals in your category.
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Score
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Score Breakdown */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Score Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 text-amber-500 mr-2" />
                      Experience & Credentials
                    </CardTitle>
                    <Badge>75/80</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Years of Experience</span>
                        <span className="font-medium">28/30</span>
                      </div>
                      <Progress value={93.3} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Professional Certifications</span>
                        <span className="font-medium">25/25</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Formal Education</span>
                        <span className="font-medium">22/25</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 text-amber-500 mr-2" />
                      Skills & Competencies
                    </CardTitle>
                    <Badge>42/50</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Technical Skills</span>
                        <span className="font-medium">18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Soft Skills Assessment</span>
                        <span className="font-medium">15/15</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Specialization Proficiency</span>
                        <span className="font-medium">9/15</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                      Activity & Engagement
                    </CardTitle>
                    <Badge>35/40</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Platform Activity</span>
                        <span className="font-medium">18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Workshop Participation</span>
                        <span className="font-medium">12/15</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Continuing Education</span>
                        <span className="font-medium">5/5</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 text-amber-500 mr-2" />
                      Feedback & Ratings
                    </CardTitle>
                    <Badge>26/30</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Patient Feedback</span>
                        <span className="font-medium">14/15</span>
                      </div>
                      <Progress value={93.3} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Peer Reviews</span>
                        <span className="font-medium">8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Employer Evaluations</span>
                        <span className="font-medium">4/5</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Score History */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Score History</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Score history chart would go here</p>
                    <p className="text-sm">Your score has increased by 22 points this year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommendations */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Improvement Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <FileCheck className="h-5 w-5 text-amber-500 mr-2" />
                    Get Certified
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add specialized certifications to enhance your score in the specialization category.
                  </p>
                  <Link to="/courses">
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <span>Browse Certifications</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 text-amber-500 mr-2" />
                    Take Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete courses in specialized areas to strengthen your skills score.
                  </p>
                  <Link to="/courses">
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <span>Explore Courses</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-amber-500 mr-2" />
                    Engage Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Participate in the community forum to increase your engagement score.
                  </p>
                  <Link to="/community">
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <span>Join Discussions</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Score Value */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">What Your Score Means</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <MessageCircle className="h-5 w-5 text-red-600 mr-2" />
                      For Healthcare Professionals
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Stands out to potential employers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Validates your skills and experience objectively</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Shows commitment to professional development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Identifies growth areas for targeted improvement</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <Hospital className="h-5 w-5 text-red-600 mr-2" />
                      For Employers
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Simplifies candidate comparison and selection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Reduces hiring risk with objective metrics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Ensures candidates meet specific requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Streamlines the recruitment process</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/calculate-score">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Recalculate Your Score
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Missing Hospital icon
const Hospital = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 6.5v12h3"></path>
    <path d="M2 19.5h3"></path>
    <path d="M12 19.5v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
    <path d="M5 19.5V6.a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14"></path>
    <path d="M8.5 3v3"></path>
    <path d="M10 5H7"></path>
  </svg>
);

export default GlohsenScoreResults;
