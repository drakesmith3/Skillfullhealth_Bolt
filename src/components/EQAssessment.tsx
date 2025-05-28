
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'text';
}

const EQAssessment: React.FC = () => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const questions: Question[] = [
    {
      id: 'lie_professionally',
      text: 'Can/Do you lie to get ahead professionally?',
      type: 'boolean'
    },
    {
      id: 'accept_punishment',
      text: "If you are ever caught lying to get ahead, or get away with an unethical behaviour, will you accept the organisation's established punishment?",
      type: 'boolean'
    },
    {
      id: 'leave_without_notice',
      text: 'Did you leave your last job without notice?',
      type: 'boolean'
    },
    {
      id: 'colleagues_anticipation',
      text: 'Do colleagues say that they absolutely look forward to working with you during their shift?',
      type: 'boolean'
    },
    {
      id: 'colleague_opinion',
      text: 'What is the #1 thing colleagues are likely to say about (working with) you?',
      type: 'text'
    },
    {
      id: 'career_blocker',
      text: 'In your last job/workplace, what really held you back in your last role there?',
      type: 'text'
    }
  ];
  
  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const getCompletionPercentage = (): number => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / questions.length) * 100);
  };
  
  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions to complete the EQ assessment.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitted(true);
    toast({
      title: "Assessment Submitted",
      description: "Your EQ assessment has been recorded. Thank you for your participation!"
    });
  };

  return (
    <Card className="border border-primary/20 shadow-md">
      <CardHeader className="bg-primary/5 border-b border-primary/20">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-lg">Emotional Intelligence (EQ) Assessment</CardTitle>
        </div>
        <CardDescription>
          Your answers help us understand your emotional intelligence and professional ethics profile.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Completion: <Badge variant={getCompletionPercentage() === 100 ? "default" : "outline"}>
              {getCompletionPercentage()}%
            </Badge>
          </div>
          
          {isSubmitted && (
            <Badge className="bg-green-600">Completed</Badge>
          )}
        </div>
        
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="border-b pb-4">
              <Label className="text-base font-medium block mb-3">
                {question.text}
              </Label>
              
              {question.type === 'boolean' ? (
                <RadioGroup
                  value={answers[question.id]}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  disabled={isSubmitted}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                    <Label htmlFor={`${question.id}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${question.id}-no`} />
                    <Label htmlFor={`${question.id}-no`}>No</Label>
                  </div>
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Enter your answer here"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  disabled={isSubmitted}
                  className="min-h-[100px]"
                />
              )}
            </div>
          ))}
        </div>
        
        {!isSubmitted && (
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-6 bg-primary"
            disabled={getCompletionPercentage() < 100}
          >
            Submit Assessment
          </Button>
        )}
        
        {isSubmitted && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center text-green-800">
            Thank you for completing your EQ assessment. Your results have been recorded and will be part of your professional profile.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EQAssessment;
