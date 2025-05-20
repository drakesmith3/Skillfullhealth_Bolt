
import React from "react";
import { Card } from "@/components/ui/card";
import { Award, FileCheck, BookOpen, Trophy, Star, Activity, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProfileAnalytics = () => {
  const certificates = [
    { name: "Basic Life Support", status: "Current", progress: 100 },
    { name: "Advanced Cardiac Life Support", status: "Current", progress: 100 },
    { name: "Medical Ethics", status: "Current", progress: 100 },
    { name: "Communication Skills", status: "Current", progress: 100 },
    { name: "Professional License", status: "Current", progress: 100 },
  ];
  
  const coursesRecommended = [
    { name: "Emergency Procedures", progress: 0 },
    { name: "Patient Relations", progress: 0 },
    { name: "Modern Medical Technology", progress: 0 },
  ];

  const gamesBadges = [
    { name: "Quick Thinker", description: "Completed quiz in record time" },
    { name: "Knowledge Master", description: "Perfect score on Medical Ethics" },
    { name: "Consistent Learner", description: "Logged in for 7 consecutive days" },
  ];

  const feedback = [
    { rating: 4.8, employer: "General Hospital", comment: "Excellent professional attitude" },
    { rating: 5.0, employer: "City Medical Center", comment: "Great communication skills" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <User className="mr-2 h-6 w-6 text-[#D4AF37]" />
        Professional Profile Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/50 backdrop-blur rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <FileCheck className="mr-2 h-4 w-4 text-green-600" />
            Certificates & Licenses
          </h3>
          <div className="space-y-2">
            {certificates.map((cert, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span>{cert.name}</span>
                  <span className="text-green-600 text-xs font-medium">{cert.status}</span>
                </div>
                <Progress value={cert.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
            Course Completion
          </h3>
          <div className="space-y-2">
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>Completed Courses</span>
                <span className="text-blue-600 font-medium">4</span>
              </div>
              <Progress value={80} className="h-1.5" />
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>In Progress</span>
                <span className="text-amber-600 font-medium">1</span>
              </div>
              <Progress value={30} className="h-1.5" />
            </div>
            <h4 className="text-xs font-medium text-gray-500 mt-3 mb-1">Recommended Courses:</h4>
            {coursesRecommended.map((course, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span>{course.name}</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Trophy className="mr-2 h-4 w-4 text-[#D4AF37]" />
            Badges & Achievements
          </h3>
          <div className="space-y-3">
            {gamesBadges.map((badge, idx) => (
              <div key={idx} className="flex items-start">
                <Award className="h-4 w-4 text-[#D4AF37] mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{badge.name}</div>
                  <div className="text-xs text-gray-500">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/50 backdrop-blur rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Star className="mr-2 h-4 w-4 text-amber-500" />
            Employer Feedback
          </h3>
          <div className="space-y-3">
            {feedback.map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.employer}</span>
                  <div className="flex items-center">
                    <span className="text-amber-500 text-sm">{item.rating}</span>
                    <Star className="h-3.5 w-3.5 text-amber-500 ml-1" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/50 backdrop-blur rounded-xl shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Activity className="mr-2 h-4 w-4 text-indigo-600" />
            Platform Activity
          </h3>
          <div className="space-y-2">
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>Job Applications</span>
                <span className="text-indigo-600 font-medium">8</span>
              </div>
              <Progress value={80} className="h-1.5" />
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>Forum Participation</span>
                <span className="text-indigo-600 font-medium">12 posts</span>
              </div>
              <Progress value={65} className="h-1.5" />
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>Quiz Completion</span>
                <span className="text-indigo-600 font-medium">9/10</span>
              </div>
              <Progress value={90} className="h-1.5" />
            </div>
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span>Weekly Login Rate</span>
                <span className="text-indigo-600 font-medium">5/7 days</span>
              </div>
              <Progress value={71} className="h-1.5" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileAnalytics;
