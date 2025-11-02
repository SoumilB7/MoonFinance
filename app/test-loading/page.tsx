"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function TestLoadingPage() {
  const router = useRouter();

  const handleTestLoading = () => {
    // Create mock answers
    const mockAnswers = {
      investment: "100000",
      email: "test@example.com",
      phone: "1234567890",
      "1": 3,
      "2": 3,
      "3": 2,
      "4": 4,
      "5": 4,
      "6": 3,
      "7": 3,
      "8": 3,
      "9": 3
    };
    
    const encodedAnswers = encodeURIComponent(JSON.stringify(mockAnswers));
    
    // Go directly to analysis page with loading bar
    router.push(`/analysis?answers=${encodedAnswers}`);
  };

  const handleTestDistrib = () => {
    // Create mock answers
    const mockAnswers = {
      investment: "100000",
      email: "test@example.com",
      phone: "1234567890",
      "1": 3,
      "2": 3,
      "3": 2,
      "4": 4,
      "5": 4,
      "6": 3,
      "7": 3,
      "8": 3,
      "9": 3
    };
    
    const encodedAnswers = encodeURIComponent(JSON.stringify(mockAnswers));
    
    // Go to distrib page first
    router.push(`/distrib?answers=${encodedAnswers}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#03ffc89b24] text-white">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-8">Test Loading Bar</h1>
        
        <div className="space-y-6">
          <div className="p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Option 1: Direct to Loading</h2>
            <p className="text-gray-300 mb-4">
              Skip straight to the loading bar animation
            </p>
            <button
              onClick={handleTestLoading}
              className="px-8 py-4 bg-[#03ffc89b] rounded-lg hover:bg-[#2b937c] text-xl font-semibold transition-colors"
            >
              Test Loading Bar Directly
            </button>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Option 2: Via Distrib Page</h2>
            <p className="text-gray-300 mb-4">
              Go to the summary page first, then click "Get Distribution"
            </p>
            <button
              onClick={handleTestDistrib}
              className="px-8 py-4 bg-[#03ffc89b] rounded-lg hover:bg-[#2b937c] text-xl font-semibold transition-colors"
            >
              Test Full Flow
            </button>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Option 3: Complete Quiz</h2>
            <p className="text-gray-300 mb-4">
              Take the full quiz from the beginning
            </p>
            <button
              onClick={() => router.push('/quiz')}
              className="px-8 py-4 bg-gray-600 rounded-lg hover:bg-gray-700 text-xl font-semibold transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#03ffc920] rounded-lg border border-[#03ffc980]">
          <h3 className="font-bold mb-3 text-xl">Loading Bar Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-left text-sm">
            <li>Animated spinner with chart icon</li>
            <li>Smooth progress bar (0% to 100%)</li>
            <li>Dynamic status messages that change</li>
            <li>Percentage display</li>
            <li>Shimmer effects on progress bar</li>
            <li>14-20 second duration (randomized)</li>
            <li>Automatic redirect to results page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
