
import React, { useState, useCallback } from 'react';
import { AppState, Answer, QuizResult } from './types';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { analyzeQuizResults, generateDragonImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('intro');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startQuiz = () => {
    setState('quiz');
  };

  const handleQuizComplete = useCallback(async (answers: Answer[]) => {
    setState('analyzing');
    setIsProcessing(true);

    try {
      // Calculate scores
      const tribeScores: Record<string, number> = {};
      const answersText: string[] = [];

      answers.forEach(a => {
        answersText.push(a.text);
        Object.entries(a.scores).forEach(([tribe, weight]) => {
          tribeScores[tribe] = (tribeScores[tribe] || 0) + weight;
        });
      });

      // AI analysis
      const quizResult = await analyzeQuizResults(tribeScores, answersText);
      setResult(quizResult);
      setState('result');

      // Async image generation (it takes longer)
      const img = await generateDragonImage(quizResult);
      setImageUrl(img);
    } catch (error) {
      console.error("Failed to process results:", error);
      alert("Something went wrong calculating your results. Please try again.");
      setState('intro');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = () => {
    setResult(null);
    setImageUrl(null);
    setState('intro');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
      <Header />

      <main className="container mx-auto px-4 mt-8">
        {state === 'intro' && (
          <div className="max-w-3xl mx-auto text-center py-20 px-6 bg-slate-800/50 rounded-3xl border border-slate-700 backdrop-blur-sm">
            <div className="mb-6 inline-block p-4 bg-orange-500/10 rounded-full">
              <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Which Wing of <span className="text-orange-500">Fire</span> Are You?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Discover your dragon tribe through our deep personality analysis. 
              Find out if you're a noble IceWing, a mysterious NightWing, or a rare hybrid!
            </p>
            <button 
              onClick={startQuiz}
              className="px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-orange-900/20"
            >
              Begin Your Journey
            </button>
            <div className="mt-12 flex justify-center gap-8 text-slate-500 grayscale opacity-50">
               {/* Decorative placeholders for tribe icons */}
               <div className="w-8 h-8 rounded-full bg-slate-700" title="MudWing"></div>
               <div className="w-8 h-8 rounded-full bg-slate-700" title="SeaWing"></div>
               <div className="w-8 h-8 rounded-full bg-slate-700" title="SkyWing"></div>
               <div className="w-8 h-8 rounded-full bg-slate-700" title="RainWing"></div>
               <div className="w-8 h-8 rounded-full bg-slate-700" title="SandWing"></div>
            </div>
          </div>
        )}

        {state === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}

        {state === 'analyzing' && (
          <div className="max-w-md mx-auto py-20 text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Reading the Prophecy...</h3>
            <p className="text-slate-400">Our AI is analyzing your heart and fire to determine your dragon tribe.</p>
          </div>
        )}

        {state === 'result' && result && (
          <Result result={result} imageUrl={imageUrl} onReset={reset} />
        )}
      </main>
      
      <footer className="mt-20 py-8 border-t border-slate-800 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Wings of Fire Fan Application • Powered by Gemini AI</p>
        <p className="mt-2">Inspired by the works of Tui T. Sutherland</p>
      </footer>
    </div>
  );
};

export default App;
