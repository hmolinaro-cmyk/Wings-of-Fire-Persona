import React, { useEffect, useState } from 'react';
import { QuizResult } from '../types';

interface ResultProps {
  result: QuizResult;
  imageUrl: string | null;
  onReset: () => void;
}

const MagicParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; duration: string; size: string; drift: string }>>([]);

  useEffect(() => {
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${2 + Math.random() * 4}px`,
      drift: `${(Math.random() - 0.5) * 200}px`
    }));
    setParticles(p);
  }, []);

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="magic-particle"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            '--duration': p.duration,
            '--drift': p.drift,
            boxShadow: '0 0 10px white, 0 0 20px #a855f7'
          } as any}
        />
      ))}
    </>
  );
};

const Result: React.FC<ResultProps> = ({ result, imageUrl, onReset }) => {
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (result.isAnimus) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [result.isAnimus]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 md:p-8 relative">
      {/* Big Magical Flash Effect */}
      {showFlash && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="animus-magic-flash w-[200vw] h-[200vw] bg-white rounded-full flex items-center justify-center">
             <span className="text-purple-900 text-9xl font-bold font-serif opacity-30">ANIMUS</span>
          </div>
        </div>
      )}

      {/* Background Magic Elements */}
      {result.isAnimus && <MagicParticles />}

      <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
        <div className="order-2 md:order-1 animate-in slide-in-from-left-8 duration-700">
          <div className={`bg-slate-800 p-6 md:p-10 rounded-3xl border-2 transition-all duration-1000 ${result.isAnimus ? 'animus-card-glow border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : 'border-slate-700 shadow-xl'} relative overflow-hidden`}>
            
            {/* Animus Glow Effect */}
            {result.isAnimus && (
              <>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/30 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full animate-pulse delay-1000" />
              </>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-orange-400 font-bold uppercase tracking-widest text-xs">Your Prophecy Result</span>
              {result.isAnimus && (
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-900/50 animate-bounce">
                  ✨ Rare Animus ✨
                </span>
              )}
            </div>

            <h2 className={`text-4xl md:text-6xl font-bold mb-6 leading-none ${result.isAnimus ? 'shine-text' : 'text-white'}`}>
              {result.isHybrid ? `${result.primaryTribe}-${result.secondaryTribe} Hybrid` : result.primaryTribe}
            </h2>
            
            <div className="mb-8 space-y-4">
              <div className="inline-block px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <h4 className="text-orange-500 font-bold uppercase text-xs tracking-[0.2em] mb-1">Dragon Name</h4>
                <p className="text-2xl font-bold text-slate-100">{result.nameSuggestion}</p>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg font-light italic border-l-4 border-orange-500/30 pl-4">
                "{result.personalityAnalysis}"
              </p>
            </div>

            <div className="mb-10">
              <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-orange-500/30"></span>
                Unique Abilities
                <span className="w-8 h-px bg-orange-500/30"></span>
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {result.abilities.map((ability, idx) => {
                  const isAnimusAbility = ability.toLowerCase().includes('animus');
                  return (
                    <li key={idx} className={`p-3 rounded-xl transition-all duration-300 ${isAnimusAbility ? 'bg-purple-900/20 border border-purple-500/30 text-purple-200' : 'bg-slate-900/40 border border-slate-700/30 text-slate-200'} flex items-start gap-3`}>
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${isAnimusAbility ? 'bg-purple-400 shadow-[0_0_10px_#a855f7]' : 'bg-orange-500'}`} />
                      <span className={isAnimusAbility ? 'font-semibold' : ''}>{ability}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button 
              onClick={onReset}
              className={`w-full py-5 text-xl font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${
                result.isAnimus 
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-purple-900/40' 
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/20'
              }`}
            >
              Return to the Tribes
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 animate-in fade-in zoom-in-95 duration-1000 delay-300 sticky top-24">
          <div className={`aspect-square rounded-[2rem] overflow-hidden bg-slate-950 border-8 transition-colors duration-1000 ${result.isAnimus ? 'border-purple-600/50' : 'border-slate-800'} shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative group`}>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={`Your ${result.primaryTribe} dragon`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center text-slate-500">
                <div className="w-20 h-20 mb-6 relative">
                   <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full animate-ping"></div>
                   <svg className="w-full h-full text-orange-500/50 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                </div>
                <p className="text-lg font-serif tracking-widest uppercase opacity-50">Manifesting Dragon Form...</p>
              </div>
            )}
            
            {/* Visual Overlay for Animus Image */}
            {result.isAnimus && imageUrl && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/40 to-transparent mix-blend-overlay"></div>
            )}

            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
              <span className="text-[10px] text-white/70 font-mono tracking-tighter uppercase">Prophecy Grade: {result.isAnimus ? 'Mythic' : 'Standard'}</span>
            </div>
          </div>
          
          {result.isAnimus && (
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/20 rounded-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000 delay-700">
               <p className="text-purple-200 text-sm text-center leading-relaxed">
                 <span className="font-bold">Legendary Rarity:</span> Animus dragons are born only once in generations. Your magic is a part of you, but be wary of the cost to your soul...
               </p>
            </div>
          )}
          
          <p className="text-center text-xs text-slate-500 mt-6 italic tracking-wide">
            Neural Art Core: Gemini 2.5 Flash Image • Mike Holmes Graphic Novel Dataset
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;