import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Award } from "lucide-react";

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

  const handleStartQuiz = (quizId: string) => {
    setCurrentQuizId(quizId);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
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

  const renderQuizSelector = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Medical Games & Quizzes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Cardiology Quiz</h2>
          <p className="text-gray-600 mb-4">Test your knowledge about heart conditions and treatments</p>
          <Button 
            onClick={() => handleStartQuiz("cardiology")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Start Quiz
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">CLOTQuest Game</h2>
          <p className="text-gray-600 mb-4">Interactive game about hematology and clotting disorders</p>
          <Button 
            onClick={() => handleStartQuiz("clotquest")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Play Game
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Infectious Disease Challenge</h2>
          <p className="text-gray-600 mb-4">Test your knowledge about pathogens and treatments</p>
          <Button 
            onClick={() => handleStartQuiz("infectious")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Start Quiz
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">Medical Ethics Quiz</h2>
          <p className="text-gray-600 mb-4">Test your understanding of medical ethics scenarios</p>
          <Button 
            onClick={() => handleStartQuiz("ethics")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Start Quiz
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">BLS & ACLS Challenge</h2>
          <p className="text-gray-600 mb-4">Test your emergency response knowledge</p>
          <Button 
            onClick={() => handleStartQuiz("bls")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Start Quiz
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-3">COVID-19 Knowledge Test</h2>
          <p className="text-gray-600 mb-4">Latest information on COVID-19 diagnosis and treatment</p>
          <Button 
            onClick={() => handleStartQuiz("covid")}
            className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80"
          >
            Start Quiz
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderQuizQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Question {questionIndex + 1} of {medicalQuestions.length}</span>
            <h2 className="text-2xl font-bold">Medical Quiz</h2>
          </div>
          <div className="bg-[#D4AF37]/20 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">Score: {correctAnswers}/{questionIndex + (showExplanation ? 1 : 0)}</span>
          </div>
        </div>
        
        <Card className="p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>Theme: {currentQuestion.theme}</span>
              <span>Advisor: {currentQuestion.advisor}</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Q: {currentQuestion.question}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-md border cursor-pointer transition-colors ${
                    selectedAnswer === option.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-gray-200 hover:border-[#D4AF37]/50'
                  } ${
                    showExplanation && option.correct
                      ? 'border-green-500 bg-green-50'
                      : showExplanation && selectedAnswer === option.id && !option.correct
                      ? 'border-red-500 bg-red-50'
                      : ''
                  }`}
                  onClick={() => handleSelectAnswer(option.id)}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-medium">{option.id.toUpperCase()})</span>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!showExplanation ? (
            <Button
              className="w-full bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
            >
              CLICK TO CHECK ANSWER
            </Button>
          ) : (
            <Button
              className="w-full bg-[#D4AF37] text-white font-bold py-2 rounded-md hover:bg-[#D4AF37]/90 transition-colors"
              onClick={handleNextQuestion}
            >
              {questionIndex < medicalQuestions.length - 1 ? 'NEXT QUESTION' : 'COMPLETE QUIZ'}
            </Button>
          )}
        </Card>
        
        <div className="flex justify-between">
          <Link to="/community">
            <Button variant="outline">
              JOIN COMMUNITY DISCUSSION
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline">
              BUY ADVISOR'S COURSE
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const renderQuizCompletion = () => {
    const isPerfectScore = correctAnswers === medicalQuestions.length;
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">Your score: {correctAnswers}/{medicalQuestions.length}</p>
          
          {isPerfectScore ? (
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                <Award className="h-12 w-12 text-d4af37" />
              </div>
              <h3 className="text-2xl font-bold text-d4af37 mb-2">CONGRATULATIONS!</h3>
              <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80">
                CLICK TO ACCEPT YOUR BASIC BADGE
              </Button>
            </div>
          ) : (
            <p className="mb-8">Great effort! Keep practicing to improve your score.</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              onClick={() => {
                setQuestionIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
                setCorrectAnswers(0);
                setQuizCompleted(false);
              }}
            >
              PLAY AGAIN
            </Button>
            
            <Link to="/courses" className="col-span-1 md:col-span-1">
              <Button variant="outline" className="w-full">
                BUY ADVISOR'S COURSE
              </Button>
            </Link>
            
            <Link to="/community" className="col-span-1 md:col-span-1">
              <Button variant="outline" className="w-full">
                JOIN COMMUNITY DISCUSSION
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {!currentQuizId && renderQuizSelector()}
        {currentQuizId && !quizCompleted && renderQuizQuestion()}
        {currentQuizId && quizCompleted && renderQuizCompletion()}
      </main>
    </div>
  );
};

export default GamesAndQuizzes;
