
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlohsenScoreCalculator from '@/components/GlohsenScoreCalculator';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';

const GlohsenScoreCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <PreHeader currentPage="GLOHSEN Score Calculator" userName="User" />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calculate Your GLOHSEN Score</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← Back
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <GlohsenScoreCalculator />
          </div>
        </div>
      </main>

      <Footer isActive={true} />
    </div>
  );
};

export default GlohsenScoreCalculatorPage;
