
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', isLoading = false, disabled, ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-amber-600 text-white hover:bg-amber-500 focus:ring-amber-500',
    secondary: 'bg-gray-600 text-gray-100 hover:bg-gray-500 focus:ring-gray-500',
    danger: 'bg-red-700 text-white hover:bg-red-600 focus:ring-red-600',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100';

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled || isLoading ? disabledClasses : ''}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};
