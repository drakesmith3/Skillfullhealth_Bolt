
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Answer {
  id: string;
  text: string;
  correct?: boolean;
}

interface QuestionCardProps {
  question?: string;
  options?: Answer[];
  theme?: string;
  advisor?: string;
}

const QuestionCard = ({
  question = "What is the difference between an ECG and an ECHO?",
  options = [
    {
      id: 'a',
      text: 'The ECG is to check the electricity of the heart while an ECHO is the ultrasound of the heart.',
      correct: true
    },
    {
      id: 'b',
      text: 'The ECG checks the structure of the heart and its surrounding blood vessels while an ECHO is for knowing the electrical activity of the heart.',
      correct: false
    },
    {
      id: 'c',
      text: 'Only Jesus & the Holy Spirit knows the answer',
      correct: false
    }
  ],
  theme,
  advisor
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCheck = () => {
    setShowExplanation(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Q: {question}</h2>
        {theme && advisor && (
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Theme: {theme}</span>
            <span>Advisor: {advisor}</span>
          </div>
        )}
        <div className="space-y-4">
          {options.map((answer) => (
            <div
              key={answer.id}
              className={`p-4 rounded-md border cursor-pointer transition-colors ${
                selectedAnswer === answer.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => !showExplanation && setSelectedAnswer(answer.id)}
            >
              <div className="flex items-start gap-2">
                <span className="font-medium">{answer.id.toUpperCase()})</span>
                <span>{answer.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showExplanation && (
        <button
          className="w-full bg-primary text-white font-bold py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          onClick={handleCheck}
          disabled={!selectedAnswer}
        >
          CLICK TO CHECK ANSWER
        </button>
      )}
      
      {advisor && (
        <div className="mt-4 text-center">
          <Link to="/courses" className="text-primary hover:underline">
            Buy {advisor}'s Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
