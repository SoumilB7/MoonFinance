"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import circle from "../assets/circle.png";
import AssetBar from "../distrib/AssetBar";
import DonutChart from "../components/DonutChart";
import { FaSquarePhone } from "react-icons/fa6";
import Footer from "../components/Footer";

// Suspense Component to handle searchParams
const SearchParamsHandler: React.FC = () => {
  const searchParams = useSearchParams();
  const [scores, setScores] = useState({ equity: 0, debt: 0, gold: 0 });
  const [investment, setInvestment] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log('distrib');
    const answers = searchParams.get("answers");

    if (answers) {
      try {
        const parsedAnswers = JSON.parse(answers);
        const investmentAmount = parseFloat(parsedAnswers.investment) || 0;
        setInvestment(investmentAmount);

        // Calculate risk, diversity, and stability scores
        const answerValues = Object.values(parsedAnswers).filter((value) => typeof value === "number") as number[];

        let risk_score = 0, diversity_score = 0, stability_score = 0;

        if (answerValues.length === 9) {
          risk_score =
            answerValues[0] * 0.3 +
            answerValues[1] * 0.2 +
            answerValues[2] * 0.2 +
            answerValues[4] * 0.15 +
            answerValues[5] * 0.15;

          diversity_score =
            answerValues[3] * 0.3 +
            answerValues[4] * 0.25 +
            answerValues[8] * 0.2 +
            (2 - risk_score) * 0.25;

          stability_score =
            answerValues[0] * 0.2 +
            answerValues[1] * 0.2 +
            answerValues[5] * 0.3 +
            answerValues[6] * 0.15 +
            answerValues[7] * 0.15;
        }

        // Set asset allocation based on scores
        let equity = 0, debt = 0, gold = 0;

        if (risk_score <= 0.5 && stability_score >= 1.5) {
          equity = 20;
          debt = 60;
          gold = 20;
        } else if (risk_score <= 1 && stability_score >= 1) {
          equity = 30;
          debt = 50;
          gold = 20;
        } else if (risk_score <= 1.5) {
          equity = 50;
          debt = 40;
          gold = 10;
        } else {
          equity = 70;
          debt = 20;
          gold = 10;
        }

        if (diversity_score >= 1.5) {
          equity -= 10;
          debt += 5;
          gold += 5;
        } else if (diversity_score <= 0.5) {
          equity += 10;
          debt -= 5;
          gold -= 5;
        }

        setScores({ equity, debt, gold });
      } catch (error) {
        console.error("Error parsing answers:", error);
      }
    }
  }, [searchParams]);

  const handleGetDistribution = () => {
    const answers = searchParams.get("answers");
    if (answers) {
      router.push(`/analysis?answers=${answers}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#03ffc89b24] text-white flex flex-col items-center justify-center px-8 pt-24 pb-12">
      <div className="max-w-4xl w-full">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-[#03FFC9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl text-gray-300 mb-2">
            Thank you for completing the investment quiz
          </p>
          <p className="text-lg text-[#03FFC9]">
            Your responses have been recorded successfully
          </p>
        </div>

        {/* Investment Summary Card */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8 border-2 border-[#03FFC980]">
          <h2 className="text-2xl font-bold mb-6 text-center">Investment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-black rounded-lg">
              <p className="text-gray-400 mb-2">Investment Amount</p>
              <p className="text-3xl font-bold text-[#03FFC9]">
                ₹{investment.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-black rounded-lg">
              <p className="text-gray-400 mb-2">Questions Answered</p>
              <p className="text-3xl font-bold text-[#03FFC9]">9 / 9</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-xl mb-6 text-gray-300">
            Ready to see your personalized investment distribution?
          </p>
          <button
            onClick={handleGetDistribution}
            className="px-12 py-4 bg-[#03ffc89b] rounded-lg hover:bg-[#2b937c] text-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            Get My Distribution Analysis
          </button>
          <p className="text-sm text-gray-400 mt-4">
            This will take 14-20 seconds to analyze your portfolio
          </p>
        </div>

        {/* Additional Options */}
        <div className="mt-12 text-center space-y-4">
          <button
            onClick={() => router.push('/quiz')}
            className="text-[#03FFC9] hover:text-white transition-colors underline"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

const DistribPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler />
    </Suspense>
  );
};

export default DistribPage;
