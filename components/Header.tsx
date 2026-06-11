
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 tracking-wider">
          WINGS OF FIRE <span className="text-slate-100">PERSONA</span>
        </h1>
        <div className="hidden md:block text-slate-400 text-sm italic">
          What tribe do you belong to?
        </div>
      </div>
    </header>
  );
};

export default Header;
