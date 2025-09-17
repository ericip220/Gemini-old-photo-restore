
import React from 'react';

interface SpinnerProps {
    message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-500"></div>
      <p className="mt-4 text-lg font-semibold text-gray-300">{message}</p>
      <p className="mt-1 text-sm text-gray-400">This can take a moment, please wait.</p>
    </div>
  );
};
