
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
          AI Photo Restorer
        </h1>
        <p className="text-center text-gray-400 mt-1">Breathe New Life into Old Memories</p>
      </div>
    </header>
  );
};
