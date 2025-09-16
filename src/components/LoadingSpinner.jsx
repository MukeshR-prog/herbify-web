import React from "react";

const LoadingSpinner = ({ 
  size = "medium", 
  color = "#64ae40", 
  message = "Loading...",
  fullScreen = false,
  className = ""
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-10 w-10",
    large: "h-16 w-16",
    xl: "h-24 w-24"
  };

  const SpinnerSVG = ({ className: svgClassName }) => (
    <svg
      className={`animate-spin ${svgClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen bg-white/80 backdrop-blur-sm">
        <SpinnerSVG className={sizeClasses[size]} />
        {message && (
          <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <SpinnerSVG className={sizeClasses[size]} />
      {message && (
        <p className="mt-2 text-gray-600 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;