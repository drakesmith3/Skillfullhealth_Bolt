import React, { useState } from "react";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Award, Trophy, Users, Calendar, Clock, Brain, Star, Medal, Zap, Heart, Target, BookOpen } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
  theme: string;
  advisor: string;
}

const medicalQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the difference between an ECG and an ECHO?",
    options: [
      {
        id: "a",
        text: "The ECG is to check the electricity of the heart while an ECHO is the ultrasound of the heart.",
        correct: true
      },
      {
        id: "b",
        text: "The ECG checks the structure of the heart and its surrounding blood vessels while an ECHO is for knowing the electrical activity of the heart.",
        correct: false
      },
      {
        id: "c",
        text: "Only Jesus & the Holy Spirit knows the answer",
        correct: false
      }
    ],
    theme: "Cardiology",
    advisor: "Dr. Adebayo"
  },
  {
    id: 2,
    question: "Which of the following is NOT a component of basic life support (BLS)?",
    options: [
      {
        id: "a",
        text: "Chest compressions",
        correct: false
      },
      {
        id: "b",
        text: "Airway management",
        correct: false
      },
      {
        id: "c",
        text: "Administration of epinephrine",
        correct: true
      }
    ],
    theme: "BLS",
    advisor: "Dr. Johnson"
  },
  {
    id: 3,
    question: "What is the correct chest compression to ventilation ratio in adult CPR for a single rescuer?",
    options: [
      {
        id: "a",
        text: "15:2",
        correct: false
      },
      {
        id: "b",
        text: "30:2",
        correct: true
      },
      {
        id: "c",
        text: "5:1",
        correct: false
      }
    ],
    theme: "ACLS",
    advisor: "Dr. Wilson"
  },
  {
    id: 4,
    question: "Which of the following is the most appropriate initial approach for communicating with an anxious patient?",
    options: [
      {
        id: "a",
        text: "Use medical terminology to demonstrate expertise",
        correct: false
      },
      {
        id: "b",
        text: "Maintain eye contact, speak clearly and calmly",
        correct: true
      },
      {
        id: "c",
        text: "Immediately offer sedation medication",
        correct: false
      }
    ],
    theme: "Communication",
    advisor: "Dr. Nguyen"
  },
  {
    id: 5,
    question: "What is the primary cause of ARDS (Acute Respiratory Distress Syndrome)?",
    options: [
      {
        id: "a",
        text: "Pulmonary edema not due to heart failure",
        correct: true
      },
      {
        id: "b",
        text: "Decreased surfactant production",
        correct: false
      },
      {
        id: "c",
        text: "Excessive fluid administration",
        correct: false
      }
    ],
    theme: "Critical Care",
    advisor: "Dr. Martinez"
  },
  {
    id: 6,
    question: "Which of the following is the most common causative agent for community-acquired pneumonia?",
    options: [
      {
        id: "a",
        text: "Streptococcus pneumoniae",
        correct: true
      },
      {
        id: "b",
        text: "Pseudomonas aeruginosa",
        correct: false
      },
      {
        id: "c",
        text: "Mycobacterium tuberculosis",
        correct: false
      }
    ],
    theme: "Infectious Diseases",
    advisor: "Dr. Thompson"
  },
  {
    id: 7,
    question: "What is the first step in managing a patient with an open fracture?",
    options: [
      {
        id: "a",
        text: "Administer pain medication",
        correct: false
      },
      {
        id: "b",
        text: "Control bleeding and cover the wound",
        correct: true
      },
      {
        id: "c",
        text: "Attempt to realign the fracture",
        correct: false
      }
    ],
    theme: "Fractures",
    advisor: "Dr. Ahmed"
  },
  {
    id: 8,
    question: "Which of these vaccines is contraindicated in immunocompromised patients?",
    options: [
      {
        id: "a",
        text: "Pneumococcal vaccine",
        correct: false
      },
      {
        id: "b",
        text: "Live attenuated influenza vaccine",
        correct: true
      },
      {
        id: "c",
        text: "Hepatitis B vaccine",
        correct: false
      }
    ],
    theme: "Immunology",
    advisor: "Dr. Singh"
  },
  {
    id: 9,
    question: "What is the most common mechanism of injury in blunt thoracic trauma?",
    options: [
      {
        id: "a",
        text: "Falls from height",
        correct: false
      },
      {
        id: "b",
        text: "Motor vehicle accidents",
        correct: true
      },
      {
        id: "c",
        text: "Sports injuries",
        correct: false
      }
    ],
    theme: "ATLS",
    advisor: "Dr. Garcia"
  },
  {
    id: 10,
    question: "Which test is most specific for diagnosing COVID-19?",
    options: [
      {
        id: "a",
        text: "Chest CT scan",
        correct: false
      },
      {
        id: "b",
        text: "RT-PCR",
        correct: true
      },
      {
        id: "c",
        text: "IgM antibody test",
        correct: false
      }
    ],
    theme: "COVID-19",
    advisor: "Dr. Chen"
  }
];

const GamesAndQuizzes = () => {
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = currentQuizId ? medicalQuestions[questionIndex] : null;

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Dr. Sarah Johnson", score: 985, badge: "Diamond", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { rank: 2, name: "Dr. Michael Chen", score: 940, badge: "Platinum", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
    { rank: 3, name: "Dr. Aisha Patel", score: 925, badge: "Platinum", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { rank: 4, name: "Dr. James Wilson", score: 890, badge: "Gold", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { rank: 5, name: "Dr. Emily Rodriguez", score: 875, badge: "Gold", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
    { rank: 6, name: "Dr. David Okonkwo", score: 860, badge: "Gold", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { rank: 7, name: "Dr. Lisa Tanaka", score: 845, badge: "Silver", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
    { rank: 8, name: "Dr. Omar Hassan", score: 830, badge: "Silver", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { rank: 9, name: "Dr. Grace Kim", score: 815, badge: "Silver", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { rank: 10, name: "Dr. Robert Garcia", score: 800, badge: "Bronze", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  ];

  // Upcoming tournaments and events
  const upcomingEvents = [
    { title: "Cardiology Championship", date: "June 5, 2025", participants: 128, prize: "Conference Pass" },
    { title: "Emergency Medicine Sprint", date: "June 12, 2025", participants: 64, prize: "Medical Books Bundle" },
    { title: "Weekly Anatomy Challenge", date: "Every Friday", participants: 0, prize: "Knowledge Points" },
  ];
  const handleStartQuiz = (quizId: string) => {
    setCurrentQuizId(quizId);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    
    // Show toast notification when starting a quiz
    toast.success(`Starting ${quizId.charAt(0).toUpperCase() + quizId.slice(1)} Quiz. Good luck!`, {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleSelectAnswer = (answerId: string) => {
    if (!showExplanation) {
      setSelectedAnswer(answerId);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion) return;
    
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.correct || false;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer.");
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < medicalQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  // Render Leaderboard Sidebar
  const renderLeaderboard = () => (
    <div className="w-full lg:w-80 space-y-6">
      {/* Leaderboard Card */}
      <Card className="overflow-hidden border-t-4 border-[#D4AF37]">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center">
              <Trophy className="h-5 w-5 text-[#D4AF37] mr-2" /> 
              Leaderboard
            </h3>
            <Link to="/leaderboard" className="text-sm text-amber-800 hover:underline">View All</Link>
          </div>
        </div>
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-3">
            {leaderboardData.map((player, index) => (
              <div key={index} className={`flex items-center p-2 rounded-lg ${index < 3 ? 'bg-amber-50' : ''}`}>
                <div className="w-8 h-8 flex items-center justify-center font-bold">
                  {index === 0 && <Medal className="h-6 w-6 text-yellow-500" />}
                  {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                  {index === 2 && <Medal className="h-6 w-6 text-amber-700" />}
                  {index > 2 && player.rank}
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{player.name}</p>
                  <div className="flex items-center">
                    <Star className={`h-3 w-3 ${index < 3 ? 'text-[#D4AF37]' : 'text-gray-400'} mr-1`} />
                    <span className="text-xs text-gray-500">{player.badge}</span>
                  </div>
                </div>
                <div className="text-right font-semibold">{player.score}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
        {/* Upcoming Events Card */}
      <Card className="overflow-hidden border-t-4 border-red-700">
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 border-b">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-red-700 mr-2" /> 
            <h3 className="text-lg font-bold">Upcoming Tournaments</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <h4 className="font-semibold text-sm flex items-center">
                  {event.title}
                </h4>
                <div className="mt-1 text-xs text-gray-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.date}
                </div>
                {event.participants > 0 && (
                  <div className="mt-1 text-xs text-gray-600 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {event.participants} participants
                  </div>
                )}
                <div className="mt-1 text-xs text-gray-600 flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  Prize: {event.prize}
                </div>
                <Button variant="link" className="text-xs px-0 h-6 mt-1 text-red-700">
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Your Stats Card */}      <Card className="overflow-hidden border-t-4 border-black">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
          <div className="flex items-center">
            <Brain className="h-5 w-5 text-black mr-2" /> 
            <h3 className="text-lg font-bold">Your Stats</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <Zap className="h-4 w-4 text-yellow-500 mr-1" /> Total Score
              </span>
              <span className="font-bold">1,245</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <Award className="h-4 w-4 text-amber-600 mr-1" /> Badges Earned
              </span>
              <span className="font-bold">7</span>
            </div>            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 text-red-700 mr-1" /> Quizzes Completed
              </span>
              <span className="font-bold">22</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <Target className="h-4 w-4 text-red-700 mr-1" /> Accuracy Rate
              </span>
              <span className="font-bold">87%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <Heart className="h-4 w-4 text-red-700 mr-1" /> Best Category
              </span>
              <span className="font-bold">Cardiology</span>
            </div>
          </div>          <Button className="w-full mt-4 bg-black hover:bg-gray-800 text-white" size="sm">
            View Detailed Stats
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderQuizSelector = () => (
    <div className="px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-[#D4AF37] pb-2 inline-block">Medical Games & Quizzes</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-amber-50 border-t-4 border-[#D4AF37]">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Cardiology Quiz
              </h2>
              <p className="text-gray-600 mb-4">Test your knowledge about heart conditions and treatments</p>
              <Button 
                onClick={() => handleStartQuiz("cardiology")}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
              >
                Start Quiz
              </Button>
            </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-red-50 border-t-4 border-red-700">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-red-700" />
                CLOTQuest Game
              </h2>
              <p className="text-gray-600 mb-4">Interactive game about hematology and clotting disorders</p>
              <Button 
                onClick={() => handleStartQuiz("clotquest")}
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              >
                Play Game
              </Button>
            </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 border-t-4 border-black">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-black" />
                Infectious Disease
              </h2>
              <p className="text-gray-600 mb-4">Test your knowledge about pathogens and treatments</p>
              <Button 
                onClick={() => handleStartQuiz("infectious")}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Start Quiz
              </Button>
            </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-amber-50 border-t-4 border-[#D4AF37]">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-[#D4AF37]" />
                Medical Ethics Quiz
              </h2>
              <p className="text-gray-600 mb-4">Test your understanding of medical ethics scenarios</p>
              <Button 
                onClick={() => handleStartQuiz("ethics")}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black"
              >
                Start Quiz
              </Button>
            </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-red-50 border-t-4 border-red-700">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Target className="mr-2 h-5 w-5 text-red-700" />
                BLS & ACLS Challenge
              </h2>
              <p className="text-gray-600 mb-4">Test your emergency response knowledge</p>
              <Button 
                onClick={() => handleStartQuiz("bls")}
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              >
                Start Quiz
              </Button>
            </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-red-50 border-t-4 border-red-700">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Award className="mr-2 h-5 w-5 text-red-700" />
                COVID-19 Knowledge
              </h2>
              <p className="text-gray-600 mb-4">Latest information on COVID-19 diagnosis and treatment</p>
              <Button 
                onClick={() => handleStartQuiz("covid")}
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              >
                Start Quiz
              </Button>
            </Card>
          </div>
        </div>
        
        {/* Leaderboard sidebar */}
        <div className="hidden lg:block">
          {renderLeaderboard()}
        </div>
      </div>
    </div>
  );
  const renderQuizQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Question {questionIndex + 1} of {medicalQuestions.length}</span>
                <h2 className="text-2xl font-bold border-b-2 border-[#D4AF37] pb-1 inline-block">Medical Quiz</h2>
              </div>
              <div className="bg-[#D4AF37]/20 px-4 py-2 rounded-full flex items-center">
                <Award className="h-5 w-5 text-[#D4AF37] mr-2" />
                <span className="text-sm font-medium">Score: {correctAnswers}/{questionIndex + (showExplanation ? 1 : 0)}</span>
              </div>
            </div>
            
            <Card className="p-6 mb-6 border-t-4 border-[#D4AF37] shadow-md">
              <div className="mb-6">            <div className="flex justify-between text-sm mb-4">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-amber-800">Theme: {currentQuestion.theme}</span>
                  <span className="px-3 py-1 bg-red-50 rounded-full text-red-800">Advisor: {currentQuestion.advisor}</span>
                </div>
                <h3 className="text-xl font-semibold mb-6 border-l-4 border-[#D4AF37] pl-3 py-1 bg-amber-50">Q: {currentQuestion.question}</h3>
                <div className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 rounded-md border-2 cursor-pointer transition-all transform hover:scale-[1.01] ${
                        selectedAnswer === option.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                          : 'border-gray-200 hover:border-[#D4AF37]/50'
                      } ${
                        showExplanation && option.correct
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : showExplanation && selectedAnswer === option.id && !option.correct
                          ? 'border-red-500 bg-red-50 shadow-md'
                          : ''
                      }`}
                      onClick={() => handleSelectAnswer(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          showExplanation && option.correct ? 'bg-green-500' :
                          showExplanation && selectedAnswer === option.id && !option.correct ? 'bg-red-500' :
                          selectedAnswer === option.id ? 'bg-[#D4AF37]' : 'bg-gray-300'
                        }`}>
                          {option.id.toUpperCase()}
                        </div>
                        <span className="pt-1">{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {!showExplanation ? (
                <Button
                  className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:transform-none"
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswer}
                >
                  CLICK TO CHECK ANSWER
                </Button>
              ) : (
                <Button
                  className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-md hover:bg-[#D4AF37]/90 transition-all transform hover:scale-[1.02] shadow-md"
                  onClick={handleNextQuestion}
                >
                  {questionIndex < medicalQuestions.length - 1 ? 'NEXT QUESTION' : 'COMPLETE QUIZ'}
                </Button>
              )}
            </Card>
            
            <div className="flex justify-between">
              <Link to="/community">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  JOIN COMMUNITY DISCUSSION
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  BUY ADVISOR'S COURSE
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Leaderboard sidebar */}
          <div className="hidden lg:block">
            {renderLeaderboard()}
          </div>
        </div>
      </div>
    );
  };
  const renderQuizCompletion = () => {
    const isPerfectScore = correctAnswers === medicalQuestions.length;
    const percentage = Math.round((correctAnswers / medicalQuestions.length) * 100);
    
    return (
      <div className="px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Card className="p-8 text-center border-t-4 border-[#D4AF37] shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
              
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 flex items-center justify-center">
                  <div className="text-3xl font-bold text-amber-800">{percentage}%</div>
                </div>
                <svg className="w-32 h-32 absolute top-0 left-0" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#f3f4f6" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="8"
                    strokeDasharray={`${percentage * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              
              <p className="text-xl mb-2">Your score: <span className="font-bold">{correctAnswers}/{medicalQuestions.length}</span></p>
              <p className="text-gray-600 mb-8">You answered {correctAnswers} out of {medicalQuestions.length} questions correctly.</p>
              
              {isPerfectScore ? (
                <div className="mb-8 bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg">
                  <div className="w-24 h-24 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">CONGRATULATIONS!</h3>
                  <p className="text-amber-700 mb-4">You've achieved a perfect score and earned the Gold Badge!</p>
                  <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black font-bold">
                    CLICK TO ACCEPT YOUR BASIC BADGE
                  </Button>
                </div>              ) : percentage >= 80 ? (
                <div className="mb-8 bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
                  <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <Medal className="h-12 w-12 text-red-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-700 mb-2">WELL DONE!</h3>
                  <p className="text-red-800 mb-4">You've earned the Silver Badge with a great score!</p>
                  <Button className="bg-red-700 hover:bg-red-800 text-white">
                    CLICK TO ACCEPT YOUR SILVER BADGE
                  </Button>
                </div>              ) : percentage >= 60 ? (
                <div className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Star className="h-12 w-12 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">GOOD JOB!</h3>
                  <p className="text-gray-700 mb-4">You've earned the Bronze Badge. Keep practicing!</p>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    CLICK TO ACCEPT YOUR BRONZE BADGE
                  </Button>
                </div>) : (
                <div className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">Keep practicing to improve your score and earn a badge!</p>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    TRY AGAIN FOR A BADGE
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => {
                    setQuestionIndex(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setCorrectAnswers(0);
                    setQuizCompleted(false);
                  }}
                >
                  <Zap className="h-4 w-4" />
                  PLAY AGAIN
                </Button>
                
                <Link to="/courses" className="col-span-1 md:col-span-1">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    BUY ADVISOR'S COURSE
                  </Button>
                </Link>
                
                <Link to="/community" className="col-span-1 md:col-span-1">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    JOIN COMMUNITY DISCUSSION
                  </Button>
                </Link>
              </div>
            </Card>
            
            {/* Recommended next quizzes */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Recommended Next Quizzes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">                <Card className="p-4 border-t-2 border-black hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-black flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Neurology Basics
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Test your knowledge of neurological disorders</p>
                  <Button size="sm" className="w-full bg-black text-white hover:bg-gray-800">
                    Start Quiz
                  </Button>
                </Card>
                  <Card className="p-4 border-t-2 border-red-700 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-red-700 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Emergency Medicine
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Prepare for real-world emergency scenarios</p>
                  <Button size="sm" className="w-full bg-red-700 text-white hover:bg-red-800">
                    Start Quiz
                  </Button>
                </Card>
                  <Card className="p-4 border-t-2 border-[#D4AF37] hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-[#D4AF37] flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Advanced Cardiology
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Take your heart knowledge to the next level</p>
                  <Button size="sm" className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                    Start Quiz
                  </Button>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Leaderboard sidebar */}
          <div className="hidden lg:block">
            {renderLeaderboard()}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PreHeader currentPage="Games & Quizzes" />
      <div className="pt-24 pb-4 flex-grow"> {/* Added padding top to account for PreHeader */}
        <div className="container mx-auto">
          <main>
            {!currentQuizId && renderQuizSelector()}
            {currentQuizId && !quizCompleted && renderQuizQuestion()}
            {currentQuizId && quizCompleted && renderQuizCompletion()}
          </main>
        </div>      </div>
      <Footer isActive={false} />
    </div>
  );
};

export default GamesAndQuizzes;
