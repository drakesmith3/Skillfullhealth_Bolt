import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { CandidateData, ScoreBreakdown } from '@/services/scoreCalculator';
import { calculateGlohsenScore } from '@/services/scoreCalculator';

interface GlohsenScoreContextType {
  score: ScoreBreakdown | null;
  candidateData: CandidateData | null;
  history: Array<{ date: string; score: number }>;
  updateScore: (data: CandidateData) => void;
  resetScore: () => void;
}

const GlohsenScoreContext = createContext<GlohsenScoreContextType | undefined>(undefined);

export const useGlohsenScore = () => {
  const context = useContext(GlohsenScoreContext);
  if (!context) {
    throw new Error('useGlohsenScore must be used within a GlohsenScoreProvider');
  }
  return context;
};

interface GlohsenScoreProviderProps {
  children: ReactNode;
}

export const GlohsenScoreProvider = ({ children }: GlohsenScoreProviderProps) => {
  const [score, setScore] = useState<ScoreBreakdown | null>(null);
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [history, setHistory] = useState<Array<{ date: string; score: number }>>([]);

  const updateScore = useCallback((data: CandidateData) => {
    const calculatedScore = calculateGlohsenScore(data);
    setScore(calculatedScore);
    setCandidateData(data);
    setHistory(prev => [
      ...prev,
      { date: new Date().toISOString(), score: calculatedScore.total }
    ]);
  }, []);

  const resetScore = useCallback(() => {
    setScore(null);
    setCandidateData(null);
    setHistory([]);
  }, []);

  return (
    <GlohsenScoreContext.Provider
      value={{
        score,
        candidateData,
        history,
        updateScore,
        resetScore
      }}
    >
      {children}
    </GlohsenScoreContext.Provider>
  );
};