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

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="md:flex-row flex-col items-center h-[20%] bg-[#F9F8F8] flex justify-center md:justify-evenly space-x-52 md:pb-5">
        <div className="h-1/2 flex items-center mt-10 p-4">
          <div className="text-2xl flex-row text-[#6A706E]">
            Invested Amount
            <p className="text-[#12C38C] text-4xl">
              ₹{investment.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white h-1/2 !m-0 !mb-10 md:!mb-0 md:!mt-10 shadow-gray-400 shadow-lg">
          <Image src={circle} alt="" height={20} width={20} />
          <div className="px-4">
            <p className="text-lg font-semibold text-black">Mode</p>
            <p className="text-[#959191]">CAGR</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-center md:text-left text-4xl md:text-5xl p-6 px-20 font-semibold">Your Assets</h1>
        <div className="h-[20%] flex flex-col md:flex-row justify-between px-20">
          <AssetBar title="Amount Invested" value={`₹ ${investment.toLocaleString()}`} />
          <AssetBar
            title="Expected CAGR"
            value={
              <>
                23<span className="text-[#959191] text-2xl font-bold">.66%</span>
              </>
            }
            valueClass="text-[#12C38C] font-bold"
          />
          <AssetBar title="Assets Invested in" value="3" />
          <AssetBar title="Rebalance Frequency" value="Quarterly" />
        </div>
      </div>

      <div className="h-full mt-6">
        <div className="md:mt-0 mt-10 text-3xl p-2 md:pt-10 md:px-20 font-semibold text-center md:text-left">
          About the Allocation
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full md:w-1/2 h-full font-thin text-[#6A706E] p-4 text-lg">
              <p className="pb-8">
                The specifc assets along with their quantities as per the given distribution will be sent on your email.
              </p>
              <button className="rounded-lg w-[52%] h-fit bg-[#12C38C] p-4 text-white font-extrabold"
                onClick={() => {
                  console.log('click');
                  router.push('/quiz');
                }}>
                Take Quiz Again
              </button>
              <p className="text-sm text-center w-full md:w-[52%]">You can risk analyze before investing.</p>
              <div className="flex items-center pt-2 md:justify-normal justify-center">
                <FaSquarePhone className="text-[#12C38C] text-5xl mt-4" />
                <div>
                  <a className="font-bold text-black px-4 text-3xl pt-4" href="https://wa.me/+916353332891" target="_blank" rel="noopener noreferrer">
                    Contact Us
                  </a>
                </div>
              </div>
              <p className="text-[#6A706E]">Email: shrey.moonfinance@gmail.com</p>
            </div>
            <div className="h-full w-1/2 flex justify-center shadow-slate-400 shadow-sm">
              <DonutChart equity={scores.equity / 100} debt={scores.debt / 100} gold={scores.gold / 100} />
            </div>
          </div>
        </div>
        <Footer />
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
