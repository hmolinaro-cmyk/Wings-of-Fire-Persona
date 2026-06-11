
import React, { useState } from 'react';
import { Question, Answer } from '../types';
import { QUESTIONS } from '../constants';

interface QuizProps {
  onComplete: (answers: Answer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const handleSelect = (answer: Answer) => {
    const newAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setSelectedAnswers(prev => prev.slice(0, -1));
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${
              currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-orange-400 hover:text-orange-300 active:translate-x-[-2px]'
            }`}
            aria-label="Previous question"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="text-right">
            <span className="text-sm font-semibold text-orange-400">Question {currentStep + 1} of {QUESTIONS.length}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-2">
          <span className="text-xs text-slate-400">Tribal Insight Progress</span>
          <span className="text-xs text-slate-400">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight text-white font-serif">
        {currentQuestion.text}
      </h2>

      <div className="grid gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            className="group relative p-4 text-left bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-orange-500 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg hover:shadow-orange-900/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-500 group-hover:border-orange-500 group-hover:bg-orange-500 transition-all duration-300" />
              <span className="text-lg text-slate-100 group-hover:text-white">{option.text}</span>
            </div>
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
