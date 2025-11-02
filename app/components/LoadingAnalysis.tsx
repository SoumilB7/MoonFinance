"use client";

import React, { useEffect, useState } from "react";

interface LoadingAnalysisProps {
  duration?: number; // Duration in milliseconds (default 17000ms = 17 seconds)
}

const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ duration = 17000 }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analyzing your responses...");

  useEffect(() => {
    const interval = 50; // Update every 50ms for smooth animation
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    // Change messages at different progress points
    const messageTimer1 = setTimeout(() => {
      setMessage("Calculating your risk profile...");
    }, duration * 0.25);

    const messageTimer2 = setTimeout(() => {
      setMessage("Evaluating portfolio diversity...");
    }, duration * 0.5);

    const messageTimer3 = setTimeout(() => {
      setMessage("Determining stability factors...");
    }, duration * 0.75);

    const messageTimer4 = setTimeout(() => {
      setMessage("Finalizing your investment strategy...");
    }, duration * 0.9);

    return () => {
      clearInterval(timer);
      clearTimeout(messageTimer1);
      clearTimeout(messageTimer2);
      clearTimeout(messageTimer3);
      clearTimeout(messageTimer4);
    };
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#03ffc89b24] text-white px-8">
      <div className="max-w-2xl w-full">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-[#03FFC980] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#03FFC9]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Processing Your Results
        </h2>

        {/* Dynamic Message */}
        <p className="text-center text-xl mb-8 text-[#03FFC9] min-h-[2rem] transition-all duration-500">
          {message}
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-800 rounded-full h-4 mb-4 overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-[#03FFC9] to-[#2b937c] transition-all duration-300 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-center text-lg font-semibold">
          {Math.round(progress)}%
        </p>

        {/* Additional Info */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>Please wait while we create your personalized investment analysis</p>
          <p className="mt-2">This should take approximately 14-20 seconds</p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-3 h-3 bg-[#03FFC9] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#03FFC9] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-[#03FFC9] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnalysis;
