export interface EQQuestion {
  id: string;
  text: string;
  type: 'likert' | 'scenario' | 'multiple-choice';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export interface EQAssessmentResult {
  score: number;
  maxScore: number;
  breakdown: {
    selfAwareness: number;
    empathy: number;
    socialSkills: number;
    selfRegulation: number;
    motivation: number;
  };
  recommendations: string[];
}

export interface EQAssessmentProps {
  onComplete: (result: EQAssessmentResult) => void;
  isLoading?: boolean;
  error?: string | null;
}
