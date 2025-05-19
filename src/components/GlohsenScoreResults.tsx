
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Printer, Download, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GlohsenScoreResults = () => {
  const { score, history } = useGlohsenScore();

  if (!score) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No score data available. Please calculate your score first.</p>
      </div>
    );
  }

  const scoreHistory = history.length > 0 ? history.slice(-6).map(h => ({
    month: new Date(h.date).toLocaleDateString('en-US', { month: 'short' }),
    score: h.score,
    avg: Math.round(h.score * 0.9) // Example: industry average is 90% of score
  })) : [
    { month: 'Jan', score: 145, avg: 138 },
    { month: 'Feb', score: 149, avg: 140 },
    { month: 'Mar', score: 152, avg: 142 },
    { month: 'Apr', score: 159, avg: 145 },
    { month: 'May', score: 167, avg: 148 },
    { month: 'Jun', score: 179, avg: 150 }
  ];
    const criteriaBreakdown = [
    { name: "Experience", score: score.experience, maxScore: 10 },
    { name: "Employer Match", score: score.employerMatch, maxScore: 110 },
    { name: "Skills & Certificates", score: score.skills, maxScore: 15 },
    { name: "Locum Jobs", score: score.locumJobs, maxScore: 10 },
    { name: "Platform Activity", score: score.platformActivity, maxScore: 10 },
    { name: "Volunteering", score: score.volunteering, maxScore: 10 },
    { name: "Location", score: score.location, maxScore: 5 },
    { name: "Awards", score: score.awards, maxScore: 10 },
    { name: "Remote Work", score: score.remoteWork, maxScore: 10 },
    { name: "Availability", score: score.availability, maxScore: 10 }
  ];
  
  const totalScore = criteriaBreakdown.reduce((sum, item) => sum + item.score, 0);
  const maxScore = criteriaBreakdown.reduce((sum, item) => sum + item.maxScore, 0);
  const scorePercentage = (totalScore / maxScore) * 100;
  const calculatePerformanceLevel = (score: ScoreBreakdown) => {
    const totalScore = score.total;
    if (totalScore >= 90) return { level: "Outstanding", percentile: "top 5%" };
    if (totalScore >= 80) return { level: "Excellent", percentile: "top 15%" };
    if (totalScore >= 70) return { level: "Very Good", percentile: "top 30%" };
    if (totalScore >= 60) return { level: "Good", percentile: "top 50%" };
    return { level: "Average", percentile: "top 75%" };
  };

  const performance = calculatePerformanceLevel(score);
  const lastUpdated = history.length > 0 ? new Date(history[history.length - 1].date).toLocaleDateString() : "Not available";

  return (
    <div className="w-full bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Your GLOHSEN Score Results</h2>
            <p className="text-sm text-gray-500">View your current score, history, and detailed breakdown.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-[#F9D75D] text-black hover:bg-[#F9D75D]/80">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Left: Score history chart */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="font-bold">Score History</h3>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">3M</Button>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">6M</Button>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">1Y</Button>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto bg-gray-100">All</Button>
                  </div>
                </div>
                
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreHistory}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[120, 200]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Your GLOHSEN Score"
                        stroke="#F9D75D"
                        strokeWidth={3}
                        dot={{ fill: '#F9D75D', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="avg"
                        name="Industry Average"
                        stroke="#FF6B6B"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ fill: '#FF6B6B', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="text-xs text-gray-500 mt-2 flex items-center">
                  <span>Last updated: June 10, 2025</span>
                  <span className="ml-auto text-green-500 flex items-center">
                    +24.3% in last 6 months
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right: Current Score */}
          <div>
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="font-bold mb-4">Current Score</h3>
                  
                  <div className="relative mb-4">
                    <svg className="w-40 h-40" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#EEEEEE"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F9D75D"
                        strokeWidth="2.5"
                        strokeDasharray={`${scorePercentage}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-4xl font-bold text-[#F9D75D]">{score.total}</div>
                      <div className="text-sm text-gray-500">out of 200</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="font-bold">{performance.level}</div>
                    <div className="text-sm text-gray-600">{performance.percentile} of healthcare professionals</div>
                  </div>
                  
                  <Button className="bg-[#F9D75D] text-black hover:bg-[#F9D75D]/80">
                    Improve Your Score
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4">Employer Match Rate</h3>
                <div className="text-center mb-2">
                  <span className="text-2xl font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#F9D75D] h-2.5 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Based on 1047 active job listings matching your specialty
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Score Breakdown */}
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h3 className="font-bold mb-6">Score Breakdown</h3>
            <div className="space-y-4">
              {criteriaBreakdown.map((item) => (
                <div key={item.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.score} / {item.maxScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#F9D75D] h-3 rounded-full"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-bold mb-4">Recommendations to Improve Your Score</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-1 mr-2 flex-shrink-0" />
                <span>Complete your Emotional Intelligence (EQ) Assessment for a potential increase of up to 15 points.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-1 mr-2 flex-shrink-0" />
                <span>Add 2 more advanced certificates related to your specialty to maximize your Skills score.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-1 mr-2 flex-shrink-0" />
                <span>Participate more in platform discussions by answering at least 5 more questions to increase your Platform Activity score.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-[#F9D75D] mt-1 mr-2 flex-shrink-0" />
                <span>Consider volunteering for at least one medical outreach program to boost your Volunteer Willingness score.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlohsenScoreResults;
