"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Suspense Component to handle searchParams
const SearchParamsHandler: React.FC = () => {
  const searchParams = useSearchParams();
  const [scores, setScores] = useState({ equity: 0, debt: 0, gold: 0 });
  const [investment, setInvestment] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("results page");
    const answers = searchParams.get("answers");

    if (answers) {
      try {
        const parsedAnswers = JSON.parse(answers);
        const investmentAmount = parseFloat(parsedAnswers.investment) || 0;
        setInvestment(investmentAmount);
        setUserEmail(parsedAnswers.email || "");

        // Calculate risk, diversity, and stability scores
        const answerValues = Object.values(parsedAnswers).filter(
          (value) => typeof value === "number"
        ) as number[];

        let risk_score = 0,
          diversity_score = 0,
          stability_score = 0;

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
        let equity = 0,
          debt = 0,
          gold = 0;

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

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(18, 195, 140); // #12C38C
    doc.text("SuperFin Investment Report", 105, 20, { align: "center" });

    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 28, {
      align: "center",
    });

    // Add user info section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Investment Summary", 20, 45);

    // Investment details
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Investment Amount: ₹${investment.toLocaleString()}`, 20, 55);
    doc.text(`Email: ${userEmail}`, 20, 62);
    doc.text(`Expected CAGR: 23.66%`, 20, 69);
    doc.text(`Assets Invested In: 3`, 20, 76);
    doc.text(`Rebalance Frequency: Quarterly`, 20, 83);

    // Add allocation section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Asset Allocation", 20, 100);

    // Create table for allocations
    const tableData = [
      ["Asset Class", "Allocation %", "Amount (₹)"],
      [
        "Equity",
        `${scores.equity}%`,
        `₹${((investment * scores.equity) / 100).toLocaleString()}`,
      ],
      [
        "Debt",
        `${scores.debt}%`,
        `₹${((investment * scores.debt) / 100).toLocaleString()}`,
      ],
      [
        "Gold",
        `${scores.gold}%`,
        `₹${((investment * scores.gold) / 100).toLocaleString()}`,
      ],
    ];

    autoTable(doc, {
      startY: 105,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: "grid",
      headStyles: {
        fillColor: [18, 195, 140],
        textColor: 255,
        fontSize: 11,
        fontStyle: "bold",
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add note section
    const finalY = (doc as any).lastAutoTable?.finalY || 140;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Important Notes:", 20, finalY + 15);

    doc.setFontSize(10);
    doc.setTextColor(50);
    const notes = [
      "• This allocation is based on your risk profile and investment goals.",
      "• Portfolio will be rebalanced quarterly to maintain optimal allocation.",
      "• Detailed asset breakdown will be sent to your registered email.",
      "• Contact us for personalized investment advisory services.",
    ];

    notes.forEach((note, index) => {
      doc.text(note, 20, finalY + 25 + index * 7);
    });

    // Add contact info
    doc.setFontSize(10);
    doc.setTextColor(18, 195, 140);
    doc.text("Contact: shrey.baldev@gmail.com", 105, finalY + 60, {
      align: "center",
    });
    doc.text("WhatsApp: +91 6353332891", 105, finalY + 67, {
      align: "center",
    });

    // Add footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      "SuperFin - AI-Powered Portfolio Management",
      105,
      280,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`SuperFin_Investment_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24">
      <div className="max-w-5xl mx-auto px-4 md:px-10 lg:px-20 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Your Investment Report
          </h1>
          <p className="text-slate-300 text-lg">
            Analysis complete! Your personalized portfolio is ready.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 mb-8">
          {/* Investment Summary */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">
              Investment Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <p className="text-slate-400 text-sm mb-2">Investment Amount</p>
                <p className="text-3xl font-bold text-emerald-400">
                  ₹{investment.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <p className="text-slate-400 text-sm mb-2">Expected CAGR</p>
                <p className="text-3xl font-bold text-emerald-400">23.66%</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <p className="text-slate-400 text-sm mb-2">Assets Invested In</p>
                <p className="text-3xl font-bold text-white">3</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <p className="text-slate-400 text-sm mb-2">Rebalance Frequency</p>
                <p className="text-3xl font-bold text-white">Quarterly</p>
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">
              Asset Allocation
            </h2>
            <div className="space-y-4">
              {/* Equity */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold">Equity</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {scores.equity}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${scores.equity}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ₹{((investment * scores.equity) / 100).toLocaleString()}
                </p>
              </div>

              {/* Debt */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold">Debt</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {scores.debt}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${scores.debt}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ₹{((investment * scores.debt) / 100).toLocaleString()}
                </p>
              </div>

              {/* Gold */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold">Gold</span>
                  <span className="text-2xl font-bold text-amber-400">
                    {scores.gold}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${scores.gold}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ₹{((investment * scores.gold) / 100).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30 mb-8">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Important Notes
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>
                  Detailed asset breakdown will be sent to your email:{" "}
                  <span className="text-white font-medium">{userEmail}</span>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>
                  Portfolio will be rebalanced quarterly to maintain optimal
                  allocation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">•</span>
                <span>
                  Contact us for personalized investment advisory services
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={downloadPDF}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 w-full md:w-auto"
          >
            📄 Download PDF Report
          </button>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 w-full md:w-auto"
          >
            Retake Assessment
          </button>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-white">Need Help?</h3>
          <p className="text-slate-300 mb-4">
            Our team is here to assist you with your investment journey
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:shrey.baldev@gmail.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              📧 shrey.baldev@gmail.com
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://wa.me/+916353332891"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              📱 WhatsApp: +91 6353332891
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
        <p className="text-slate-300">Loading your results...</p>
      </div>
    </div>}>
      <SearchParamsHandler />
    </Suspense>
  );
};

export default ResultsPage;
