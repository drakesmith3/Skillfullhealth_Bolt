
import React from 'react';
import { Card } from "@/components/ui/card";

const ClotQuestGame = () => {
  return (
    <div className="relative">
      <Card className="overflow-hidden bg-[#1E293B] text-white border-none">
        <img 
          src="/lovable-uploads/6fc4c722-159d-415f-bd8a-8d655ae36955.png" 
          alt="ClotQuest: Coagulation Cascade Game" 
          className="w-full object-contain h-64"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1E293B] to-transparent p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold">Level 1: Coagulation Cascade</div>
            <div className="text-xs font-mono">Score: <span className="text-d4af37">1000</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';

const CoagulationCascade = () => {
  const [score, setScore] = useState(0);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [placedFactors, setPlacedFactors] = useState({});
  const [gameComplete, setGameComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [patientStatus, setPatientStatus] = useState('critical');

  const pathways = {
    intrinsic: {
      name: 'Intrinsic Pathway',
      color: 'bg-purple-600',
      steps: [
        { id: 'XII', name: 'Factor XII', description: 'Contact Activation' },
        { id: 'XI', name: 'Factor XI', description: 'Activated by XIIa' },
        { id: 'IX', name: 'Factor IX', description: 'Forms complex with VIIIa' },
        { id: 'VIII', name: 'Factor VIII', description: 'Cofactor for IXa' }
      ]
    },
    extrinsic: {
      name: 'Extrinsic Pathway',
      color: 'bg-red-600',
      steps: [
        { id: 'VII', name: 'Factor VII', description: 'Tissue Factor Pathway' },
        { id: 'III', name: 'Tissue Factor', description: 'Initiates Coagulation' }
      ]
    },
    common: {
      name: 'Common Pathway',
      color: 'bg-blue-600',
      steps: [
        { id: 'X', name: 'Factor X', description: 'Converging Point' },
        { id: 'V', name: 'Factor V', description: 'Cofactor for Xa' },
        { id: 'Ca', name: 'Calcium', description: 'Essential Cofactor' },
        { id: 'PL', name: 'Phospholipid', description: 'Surface Activator' },
        { id: 'II', name: 'Thrombin', description: 'Converts Fibrinogen to Fibrin' }
      ]
    }
  };

  const [availableFactors, setAvailableFactors] = useState([]);

  useEffect(() => {
    const factors = [
      ...pathways.intrinsic.steps,
      ...pathways.extrinsic.steps,
      ...pathways.common.steps
    ].sort(() => Math.random() - 0.5);
    setAvailableFactors(factors);
  }, []);

  const handleFactorSelect = (factor) => {
    if (placedFactors[factor.id]) return;
    setSelectedFactor(factor);
  };

  const handleFactorDrop = (pathwayId, stepIndex) => {
    if (!selectedFactor) return;
    const pathway = pathways[pathwayId];
    const correctFactor = pathway.steps[stepIndex];

    if (selectedFactor.id === correctFactor.id) {
      const newPlacedFactors = { ...placedFactors, [selectedFactor.id]: true };
      setPlacedFactors(newPlacedFactors);
      setScore(score + 100);
      setSelectedFactor(null);

      const totalSteps = Object.values(pathways).reduce(
        (sum, pathway) => sum + pathway.steps.length, 0
      );
      if (Object.keys(newPlacedFactors).length === totalSteps) {
        setGameComplete(true);
        setPatientStatus('stable');
      }
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        handleReset();
      }, 2000);
    }
  };

  const handleReset = () => {
    setScore(0);
    setSelectedFactor(null);
    setPlacedFactors({});
    setGameComplete(false);
    setPatientStatus('critical');
    setAvailableFactors([
      ...pathways.intrinsic.steps,
      ...pathways.extrinsic.steps,
      ...pathways.common.steps
    ].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Card className="max-w-6xl mx-auto bg-gray-800 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">ClotQuest: Level 1</h1>
          <div className="text-2xl text-yellow-400">Score: {score}</div>
        </div>

        {/* Pathways */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {Object.entries(pathways).map(([pathwayId, pathway]) => (
            <div key={pathwayId} className="space-y-4">
              <h2 className={`text-xl font-bold ${pathway.color} bg-opacity-20 p-2 rounded`}>
                {pathway.name}
              </h2>
              {pathway.steps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => handleFactorDrop(pathwayId, index)}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${placedFactors[step.id] 
                      ? `${pathway.color} bg-opacity-20 border-green-500`
                      : 'border-gray-600 hover:border-gray-400 bg-gray-700'}`}
                >
                  {placedFactors[step.id] ? (
                    <div className="flex items-center justify-between">
                      <span className="text-white">{step.name}</span>
                      <Check className="text-green-500" />
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">Drop Zone</div>
                  )}
                  <div className="text-sm text-gray-400 mt-2">{step.description}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Available Factors */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {availableFactors.map(factor => (
            <button
              key={factor.id}
              onClick={() => handleFactorSelect(factor)}
              disabled={placedFactors[factor.id]}
              className={`p-4 rounded-lg text-white font-medium transition-all
                ${placedFactors[factor.id] ? 'opacity-50 bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}
                ${selectedFactor?.id === factor.id ? 'ring-4 ring-white' : ''}`}
            >
              {factor.name}
            </button>
          ))}
        </div>

        {/* Patient Status */}
        <div className={`p-4 rounded-lg ${patientStatus === 'critical' 
          ? 'bg-red-900' : 'bg-green-900'} animate-pulse`}>
          <h3 className="text-xl font-bold text-white mb-2">Patient Status</h3>
          <p className="text-white">
            {patientStatus === 'critical' 
              ? '🚨 Active bleeding - Requires immediate coagulation cascade activation'
              : '✅ Stable - Successful clot formation achieved'}
          </p>
        </div>

        {/* Modals */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Level Complete! 🎉</h2>
              <p className="text-white text-lg mb-6">
                Final Score: {score}<br/>
                Ready for Level 2: Clotting Tests?
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => alert('Proceeding to Level 2...')}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                >
                  Continue
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {showError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-400 mb-4">Clotting Failure!</h2>
              <p className="text-white mb-6">Incorrect sequence - Patient deteriorating!</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CoagulationCascade;

import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, AlertCircle, Timer, TestTubes, Droplets, Activity } from 'lucide-react';

interface LabTest {
  name: string;
  icon: React.ComponentType;
  normalRange: string;
}

interface GameCase {
  id: number;
  description: string;
  results: Record<string, string>;
  requiredTests: string[];
  diagnosis: string;
  wrongDiagnosis: string;
  explanation: string;
}

interface LabTests {
  [key: string]: LabTest;
}

const ClotquestLevel2 = () => {
  const [score, setScore] = React.useState(0);
  const [currentCase, setCurrentCase] = React.useState(0);
  const [selectedTests, setSelectedTests] = React.useState<string[]>([]);
  const [showDiagnosis, setShowDiagnosis] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [gameComplete, setGameComplete] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [isCorrectDiagnosis, setIsCorrectDiagnosis] = React.useState(false);
  const [showLevelPrompt, setShowLevelPrompt] = React.useState(false);

  const labTests: LabTests = {
    BT: { name: 'Bleeding Time', icon: Timer, normalRange: '3-9 minutes' },
    aPTT: { name: 'Activated Partial Thromboplastin Time', icon: TestTubes, normalRange: '30-50 seconds' },
    PT: { name: 'Prothrombin Time/INR', icon: Timer, normalRange: 'INR 0.8-1.2' },
    TT: { name: 'Thrombin Time', icon: TestTubes, normalRange: '14-16 seconds' },
    FIB: { name: 'Fibrinogen Assay', icon: Droplets, normalRange: '200-400 mg/dL' },
    PLT: { name: 'Platelet Count', icon: Activity, normalRange: '150,000-450,000/µL' }
  };

  const cases: GameCase[] = [
    {
      id: 1,
      description: "26-year-old male presents with prolonged bleeding after dental extraction. No previous bleeding history.",
      results: {
        aPTT: "68 seconds",
        PT: "Normal",
        BT: "Normal",
        PLT: "Normal"
      },
      requiredTests: ['aPTT', 'PT', 'BT'],
      diagnosis: "Hemophilia A",
      wrongDiagnosis: "Von Willebrand Disease",
      explanation: "Isolated prolonged aPTT with normal PT suggests an intrinsic pathway defect, characteristic of Hemophilia A."
    },
    {
      id: 2,
      description: "45-year-old female on warfarin presents with nose bleeding.",
      results: {
        PT: "INR 4.8",
        aPTT: "52 seconds",
        PLT: "Normal",
        TT: "Normal"
      },
      requiredTests: ['PT', 'aPTT'],
      diagnosis: "Warfarin Overanticoagulation",
      wrongDiagnosis: "Vitamin K Deficiency",
      explanation: "Elevated INR indicates excessive warfarin effect, requiring dose adjustment."
    },
    {
      id: 3,
      description: "35-year-old with multiple bruises and recent leg pain. D-dimer elevated.",
      results: {
        PLT: "95,000/µL",
        PT: "INR 1.8",
        aPTT: "45 seconds",
        FIB: "150 mg/dL"
      },
      requiredTests: ['PLT', 'PT', 'FIB'],
      diagnosis: "DIC (Disseminated Intravascular Coagulation)",
      wrongDiagnosis: "Immune Thrombocytopenia",
      explanation: "Low platelets, elevated PT, and low fibrinogen suggest consumption coagulopathy."
    }
  ];

  const resetGame = () => {
    setScore(0);
    setCurrentCase(0);
    setSelectedTests([]);
    setShowDiagnosis(false);
    setShowFeedback(false);
    setGameComplete(false);
    setShowLevelPrompt(false);
  };

  const handleTestSelection = (testId: string) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(t => t !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const handleDiagnose = () => {
    const currentCaseData = cases[currentCase];
    const hasAllRequired = currentCaseData.requiredTests.every(test =>
      selectedTests.includes(test)
    );
    if (hasAllRequired) {
      setShowDiagnosis(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleDiagnosisSelection = (isCorrect: boolean) => {
    setIsCorrectDiagnosis(isCorrect);
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 100);
      setFeedbackMessage("Excellent diagnosis! Your quick thinking has saved the patient!");
    } else {
      setFeedbackMessage("Incorrect diagnosis. Review the lab results carefully - your patient's life depends on it!");
    }
  };

  const handleNextCase = () => {
    if (currentCase === cases.length - 1) {
      setGameComplete(true);
    } else {
      setCurrentCase(currentCase + 1);
      setSelectedTests([]);
      setShowDiagnosis(false);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Card className="max-w-6xl mx-auto bg-gray-800 p-8">
        {/* Header with Game Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">ClotQuest: Level 2</h1>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600"
            >
              Restart Game
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-2xl text-yellow-400">Score: {score}</div>
            <div className="text-sm text-gray-400">Case {currentCase + 1} of {cases.length}</div>
          </div>
        </div>

        {/* Case Presentation */}
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Case {cases[currentCase].id}</h2>
          <p className="text-gray-200 mb-4">{cases[currentCase].description}</p>
        </div>

        {/* Lab Tests Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(labTests).map(([id, test]) => (
            <button
              key={id}
              onClick={() => handleTestSelection(id)}
              className={`p-4 rounded-lg flex items-center space-x-3 hover:scale-105
                ${selectedTests.includes(id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <test.icon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">{test.name}</div>
                <div className="text-sm opacity-75">Normal: {test.normalRange}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Results Display */}
        {selectedTests.length > 0 && (
          <div className="bg-gray-700 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedTests.map(testId => (
                <div key={testId} className="bg-gray-600 p-4 rounded-lg">
                  <div className="font-medium text-white">{labTests[testId].name}</div>
                  <div className="text-yellow-400">{cases[currentCase].results[testId]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDiagnose}
            disabled={selectedTests.length === 0}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:opacity-50"
          >
            Make Diagnosis
          </button>
        </div>

        {/* Diagnosis Options */}
        {showDiagnosis && !showFeedback && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Select your diagnosis:</h3>
            <div className="space-y-4">
              {[cases[currentCase].diagnosis, cases[currentCase].wrongDiagnosis]
                .sort(() => Math.random() - 0.5)
                .map((diagnosis) => (
                  <button
                    key={diagnosis}
                    onClick={() => handleDiagnosisSelection(diagnosis === cases[currentCase].diagnosis)}
                    className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {diagnosis}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Feedback Display */}
        {showFeedback && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <div className={`text-xl font-bold mb-4 ${isCorrectDiagnosis ? 'text-green-400' : 'text-red-400'}`}>
              {feedbackMessage}
            </div>
            <p className="text-gray-200 mb-4">{cases[currentCase].explanation}</p>
            <button
              onClick={handleNextCase}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            >
              {currentCase < cases.length - 1 ? 'Next Case' : 'Complete Level'}
            </button>
          </div>
        )}

        {/* Error Modal */}
        {showError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-400 mb-4">Incomplete Diagnosis!</h2>
              <p className="text-white mb-6">Additional tests may be needed for accurate diagnosis.</p>
            </div>
          </div>
        )}

        {/* Game Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Level 2 Complete! 🎉</h2>
              <p className="text-white text-lg mb-6">
                Final Score: {score}<br/>
                You've mastered laboratory diagnostics!
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setShowLevelPrompt(true)}
                  className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                >
                  Proceed to Level 3
                </button>
                <button
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Level 3 Prompt Modal */}
        {showLevelPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Ready for Level 3?</h2>
              <p className="text-white text-lg mb-6">
                Level 3: Hemostatic Pathologies awaits!<br/>
                Are you ready to take on more challenging cases?
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => alert('Proceeding to Level 3...')}
                  className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                >
                  Start Level 3
                </button>
                <button
                  onClick={() => setShowLevelPrompt(false)}
                  className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClotquestLevel2;

import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, AlertCircle, Timer, TestTubes, Droplets, Activity, Brain, Liver } from 'lucide-react';

interface LabTest {
  name: string;
  icon: React.ComponentType;
  normalRange: string;
}

interface GameCase {
  id: number;
  description: string;
  results: Record<string, string>;
  requiredTests: string[];
  diagnosis: string;
  wrongDiagnosis: string;
  explanation: string;
}

interface LabTests {
  [key: string]: LabTest;
}

const ClotquestLevel3 = () => {
  const [score, setScore] = React.useState(0);
  const [currentCase, setCurrentCase] = React.useState(0);
  const [selectedTests, setSelectedTests] = React.useState<string[]>([]);
  const [showDiagnosis, setShowDiagnosis] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [gameComplete, setGameComplete] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [isCorrectDiagnosis, setIsCorrectDiagnosis] = React.useState(false);

  // Lab tests for Level 3
  const labTests: LabTests = {
    BT: { name: 'Bleeding Time', icon: Timer, normalRange: '3-9 minutes' },
    aPTT: { name: 'Activated Partial Thromboplastin Time', icon: TestTubes, normalRange: '30-50 seconds' },
    PT: { name: 'Prothrombin Time/INR', icon: Timer, normalRange: 'INR 0.8-1.2' },
    TT: { name: 'Thrombin Time', icon: TestTubes, normalRange: '14-16 seconds' },
    FIB: { name: 'Fibrinogen Assay', icon: Droplets, normalRange: '200-400 mg/dL' },
    PLT: { name: 'Platelet Count', icon: Activity, normalRange: '150,000-450,000/µL' },
    Factor_IX: { name: 'Factor IX Assay', icon: TestTubes, normalRange: '50-150%' },
    Factor_XI: { name: 'Factor XI Assay', icon: TestTubes, normalRange: '70-130%' },
    Protein_C: { name: 'Protein C Activity', icon: TestTubes, normalRange: '70-140%' },
    D_dimer: { name: 'D-dimer', icon: TestTubes, normalRange: '< 500 ng/mL' },
    VWF: { name: 'von Willebrand Factor', icon: TestTubes, normalRange: '50-160%' },
    Factor_V_Leiden: { name: 'Factor V Leiden Mutation', icon: TestTubes, normalRange: 'Negative' },
    APC_Resistance: { name: 'APC Resistance', icon: TestTubes, normalRange: 'Negative' },
    Anticardiolipin: { name: 'Anticardiolipin Antibodies', icon: TestTubes, normalRange: 'Negative' },
    Lupus_Anticoag: { name: 'Lupus Anticoagulant', icon: TestTubes, normalRange: 'Absent' },
    PFA_100: { name: 'PFA-100', icon: Timer, normalRange: '60-160 seconds' },
    Factor_XIII: { name: 'Factor XIII Assay', icon: TestTubes, normalRange: '70-140%' },
    JAK2_Mutation: { name: 'JAK2 V617F Mutation', icon: TestTubes, normalRange: 'Negative' },
    CT_Angio: { name: 'CT Angiogram', icon: Brain, normalRange: 'No filling defects' },
    Anti_PLT_Ab: { name: 'Anti-Platelet Antibodies', icon: TestTubes, normalRange: 'Negative' },
    BM_Mega: { name: 'Bone Marrow Megakaryocytes', icon: TestTubes, normalRange: 'Normal' },
  };

  // Cases for Level 3
  const cases: GameCase[] = [
    {
      id: 1,
      description: '23-year-old male with spontaneous joint bleeding and family history of bleeding disorder.',
      results: {
        aPTT: '82 seconds',
        PT: 'Normal',
        Factor_IX: '3%',
        PLT: 'Normal',
      },
      requiredTests: ['aPTT', 'PT', 'Factor_IX'],
      diagnosis: 'Hemophilia B',
      wrongDiagnosis: 'Hemophilia A',
      explanation: 'Isolated prolonged aPTT with very low Factor IX levels confirms Hemophilia B (Christmas Disease).',
    },
    {
      id: 2,
      description: '35-year-old female with recurrent DVTs despite anticoagulation.',
      results: {
        PT: 'Normal',
        aPTT: 'Normal',
        D_dimer: 'Elevated',
        Factor_V_Leiden: 'Positive',
        APC_Resistance: 'Positive',
      },
      requiredTests: ['Factor_V_Leiden', 'APC_Resistance', 'D_dimer'],
      diagnosis: 'Factor V Leiden Mutation',
      wrongDiagnosis: 'Antiphospholipid Syndrome',
      explanation: 'Positive Factor V Leiden mutation and APC resistance in a patient with recurrent DVTs suggests inherited thrombophilia.',
    },
    {
      id: 3,
      description: '58-year-old with sudden onset headache, confusion, and left-sided weakness.',
      results: {
        PT: 'Normal',
        aPTT: 'Normal',
        PLT: '600,000/µL',
        JAK2_Mutation: 'Positive',
        CT_Angio: 'Multiple cerebral infarcts',
      },
      requiredTests: ['PLT', 'JAK2_Mutation', 'CT_Angio'],
      diagnosis: 'Essential Thrombocythemia',
      wrongDiagnosis: 'Secondary Thrombocytosis',
      explanation: 'Markedly elevated platelets with positive JAK2 mutation and thrombotic complications indicates Essential Thrombocythemia.',
    },
    {
      id: 4,
      description: '42-year-old with lupus presents with multiple miscarriages and arterial thrombosis.',
      results: {
        PT: 'Normal',
        aPTT: 'Prolonged',
        Anticardiolipin: 'Positive',
        Lupus_Anticoag: 'Present',
        PLT: 'Low normal',
      },
      requiredTests: ['aPTT', 'Anticardiolipin', 'Lupus_Anticoag'],
      diagnosis: 'Antiphospholipid Syndrome',
      wrongDiagnosis: 'DIC',
      explanation: 'Positive anticardiolipin antibodies and lupus anticoagulant with clinical history strongly suggests Antiphospholipid Syndrome.',
    }
  ];

  const resetGame = () => {
    setScore(0);
    setCurrentCase(0);
    setSelectedTests([]);
    setShowDiagnosis(false);
    setShowFeedback(false);
    setGameComplete(false);
  };

  const handleTestSelection = (testId: string) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((t) => t !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };

  const handleDiagnose = () => {
    const currentCaseData = cases[currentCase];
    const hasAllRequired = currentCaseData.requiredTests.every((test) => selectedTests.includes(test));
    if (hasAllRequired) {
      setShowDiagnosis(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleDiagnosisSelection = (isCorrect: boolean) => {
    setIsCorrectDiagnosis(isCorrect);
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 100);
      setFeedbackMessage('Excellent diagnosis! Your quick thinking has saved the patient!');
    } else {
      setFeedbackMessage("Incorrect diagnosis. Review the lab results carefully - your patient's life depends on it!");
    }
  };

  const handleNextCase = () => {
    if (currentCase === cases.length - 1) {
      setGameComplete(true);
    } else {
      setCurrentCase(currentCase + 1);
      setSelectedTests([]);
      setShowDiagnosis(false);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <Card className="max-w-6xl mx-auto bg-gray-800 p-8">
        {/* Header with Game Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">ClotQuest: Level 3</h1>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600"
            >
              Restart Game
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-2xl text-yellow-400">Score: {score}</div>
            <div className="text-sm text-gray-400">
              Case {currentCase + 1} of {cases.length}
            </div>
          </div>
        </div>

        {/* Case Presentation */}
        <div className="bg-gray-700 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Case {cases[currentCase].id}</h2>
          <p className="text-gray-200 mb-4">{cases[currentCase].description}</p>
        </div>

        {/* Lab Tests Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(labTests).map(([id, test]) => (
            <button
              key={id}
              onClick={() => handleTestSelection(id)}
              className={`p-4 rounded-lg flex items-center space-x-3 hover:scale-105 ${
                selectedTests.includes(id) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <test.icon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">{test.name}</div>
                <div className="text-sm opacity-75">Normal: {test.normalRange}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Results Display */}
        {selectedTests.length > 0 && (
          <div className="bg-gray-700 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedTests.map((testId) => (
                <div key={testId} className="bg-gray-600 p-4 rounded-lg">
                  <div className="font-medium text-white">{labTests[testId].name}</div>
                  <div className="text-yellow-400">{cases[currentCase].results[testId]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDiagnose}
            disabled={selectedTests.length === 0}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:opacity-50"
          >
            Make Diagnosis
          </button>
        </div>

        {/* Diagnosis Options */}
        {showDiagnosis && !showFeedback && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Select your diagnosis:</h3>
            <div className="space-y-4">
              {[cases[currentCase].diagnosis, cases[currentCase].wrongDiagnosis]
                .sort(() => Math.random() - 0.5)
                .map((diagnosis) => (
                  <button
                    key={diagnosis}
                    onClick={() => handleDiagnosisSelection(diagnosis === cases[currentCase].diagnosis)}
                    className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {diagnosis}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Feedback Display */}
        {showFeedback && (
          <div className="mt-8 bg-gray-700 p-6 rounded-lg">
            <div className={`text-xl font-bold mb-4 ${isCorrectDiagnosis ? 'text-green-400' : 'text-red-400'}`}>
              {feedbackMessage}
            </div>
            <p className="text-gray-200 mb-4">{cases[currentCase].explanation}</p>
            <button
              onClick={handleNextCase}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
            >
              {currentCase < cases.length - 1 ? 'Next Case' : 'Complete Level'}
            </button>
          </div>
        )}

        {/* Error Modal */}
        {showError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-400 mb-4">Incomplete Diagnosis!</h2>
              <p className="text-white mb-6">Additional tests may be needed for accurate diagnosis.</p>
            </div>
          </div>
        )}

        {/* Game Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Level 3 Complete! 🎉</h2>
              <p className="text-white text-lg mb-6">
                Final Score: {score}
                <br />
                You have mastered all levels!
              </p>
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClotquestLevel3;


export default ClotQuestGame;
