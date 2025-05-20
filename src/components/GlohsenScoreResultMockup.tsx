
import React from "react";
import { useGlohsenScore } from './GlohsenScoreContext';
import { Link } from 'react-router-dom';

interface GlohsenScoreResultMockupProps {
  showFullReport?: boolean;
}

const GlohsenScoreResultMockup = ({ showFullReport = true }: GlohsenScoreResultMockupProps) => {
  const { score } = useGlohsenScore();  
  
  if (!score) {
    return (
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 bg-white/90 backdrop-blur-lg flex flex-col items-center justify-center p-6">
        <h3 className="text-2xl font-bold text-d4af37 mb-2 font-serif">Calculate Your GLOHSEN Score</h3>
        <p className="text-sm text-gray-700 mb-4 text-center">Complete your profile to discover your professional rating.</p>
        <Link to="/score/calculate">
          <button className="mt-6 button-3d bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-bold shadow-lg">
            Start Now
          </button>
        </Link>
      </div>
    );
  }

  const topCategories = [
    { name: 'Experience', score: score.experience },
    { name: 'Skills', score: score.skills },
    { name: 'Activity', score: score.platformActivity },
    { name: 'Awards', score: score.awards },
    { name: 'Employer Match', score: score.employerMatch }
  ].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 bg-white/90 backdrop-blur-lg flex flex-col items-center justify-center p-6">
      <h3 className="text-2xl font-bold text-d4af37 mb-2 font-serif">Your GLOHSEN Score</h3>
      <div className="flex items-center justify-center mb-4">
        <span className="text-5xl font-extrabold text-d4af37 mr-2">{score.total}</span>
        <span className="text-lg text-gray-500">/200</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-[#D4AF37] h-3 rounded-full" 
          style={{ width: `${(score.total / 200) * 100}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-700 mb-2">
        {score.total >= 150 ? 'Outstanding!' : score.total >= 120 ? 'Excellent!' : 'Good progress!'} 
        You are in the top {score.total >= 150 ? '5%' : score.total >= 120 ? '15%' : '30%'} of healthcare professionals.
      </div>
      <div className="grid grid-cols-2 gap-2 w-full mt-4">
        {topCategories.map((item) => (
          <div 
            key={item.name} 
            className="bg-white/60 border border-[#D4AF37]/20 rounded-lg p-2 text-center text-xs font-semibold text-d4af37 shadow-sm"
          >
            {item.name}
          </div>
        ))}
      </div>
      {showFullReport && (
        <Link to="/score/details">
          <button className="mt-6 button-3d bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-bold shadow-lg">
            View Full Report
          </button>
        </Link>
      )}
    </div>
  );
};

export default GlohsenScoreResultMockup;
