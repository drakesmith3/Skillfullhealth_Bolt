import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import type { EQQuestion, EQAssessmentProps, EQAssessmentResult } from './types';

const SAMPLE_QUESTIONS: EQQuestion[] = [
  {
    id: 'eq1',
    text: 'When faced with a difficult patient situation, I...',
    type: 'multiple-choice',
    options: [
      'Immediately seek help from a superior',
      'Take a moment to assess my emotional response first',
      'Try to solve the problem independently',
      'Focus on completing required tasks',
    ]
  },
  {
    id: 'eq2',
    text: 'Rate your ability to recognize your own emotions as they occur',
    type: 'likert',
  },
  {
    id: 'eq3',
    text: 'A colleague appears stressed during a busy shift. What would you do?',
    type: 'scenario',
    options: [
      'Offer to help with their workload',
      'Give them space to handle it',
      'Report their stress to a supervisor',
      'Suggest they take a break',
    ]
  }
];

export const EQAssessment: React.FC<EQAssessmentProps> = ({
  onComplete,
  isLoading = false,
  error = null
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  const totalQuestions = SAMPLE_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = useCallback((answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestion.id, currentQuestionIndex, totalQuestions]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleComplete = async () => {
    if (Object.keys(answers).length < totalQuestions) {
      setSubmitError('Please answer all questions before submitting');
      return;
    }

    try {
      setSubmitError(null);
      
      // Calculate mock results - in production this would be more sophisticated
      const result: EQAssessmentResult = {
        score: 85,
        maxScore: 100,
        breakdown: {
          selfAwareness: 17,
          empathy: 18,
          socialSkills: 16,
          selfRegulation: 17,
          motivation: 17
        },
        recommendations: [
          'Practice mindful observation of your emotional responses',
          'Consider advanced communication workshops',
          'Develop stress management techniques'
        ]
      };

      await onComplete(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit assessment');
    }
  };

  const renderQuestion = (question: EQQuestion) => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={answers[question.id] === String(value) ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAnswer(String(value))}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'multiple-choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={answers[question.id] === option ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading assessment...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        {error || submitError ? (
          <div className="flex items-center gap-2 text-red-700 mb-4">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error || submitError}</p>
          </div>
        ) : null}

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Emotional Intelligence Assessment</h2>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-lg">{currentQuestion.text}</p>
            {renderQuestion(currentQuestion)}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button onClick={handleComplete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Complete Assessment'
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={!answers[currentQuestion.id]}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
