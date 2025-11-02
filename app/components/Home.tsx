"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureCard {
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does SuperFin work?",
      answer:
        "SuperFin combines advanced AI with in-depth research by expert analysts to curate a personalized portfolio of assets best aligned with your financial goals and risk profile.",
    },
    {
      question: "Why should I use SuperFin?",
      answer:
        "SuperFin is designed to maximize returns while minimizing risks. It provides SEBI-certified investment advisory and uses data-driven insights to deliver intelligent, goal-based portfolios.",
    },
    {
      question: "How is my money invested?",
      answer:
        "All investments are executed directly through your registered broker, ensuring transparency and compliance at every step.",
    },
    {
      question: "Where is my money invested?",
      answer:
        "Your funds are allocated to a customized portfolio created by SuperFin's AI, tailored to your investment preferences and risk appetite.",
    },
    {
      question: "Is my money safe with SuperFin?",
      answer:
        "Yes. SuperFin never holds your funds. Your money is invested securely through your broker, and all ETFs or securities are credited directly to your demat account, giving you complete control and ownership.",
    },
  ];

  const features: FeatureCard[] = [
    {
      title: "Expert-Level Guidance",
      description:
        "Access strategies designed by seasoned analysts and powered by AI — investment advice that matches the precision of top financial experts.",
    },
    {
      title: "Advanced Security",
      description:
        "Your investments and personal data are safeguarded with industry-grade encryption and secure transaction protocols.",
    },
    {
      title: "Multi-Asset Investments",
      description:
        "Diversify easily across multiple asset classes through a unified, customizable platform built to suit your investment style.",
    },
    {
      title: "Withdraw Anytime",
      description:
        "Enjoy full liquidity and flexibility — manage or withdraw your investments effortlessly, anytime you choose.",
    },
    {
      title: "Cyclic Rebalancing",
      description:
        "SuperFin's AI continuously monitors and rebalances your portfolio to maintain optimal performance, keeping your risk and returns aligned with market trends.",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Track your portfolio performance with comprehensive dashboards and detailed insights, empowering you to make informed decisions at every step.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">
      {/* Hero Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 md:py-24 pt-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              AI-Powered Portfolio Management
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Get started with the quiz to discover your personalized
              investment distribution
            </p>
            <button
              onClick={() => router.push("/quiz")}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What We Do
          </h2>
          <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto leading-relaxed">
            Welcome to SuperFin! Our AI-driven platform starts by learning about
            your financial goals, investment horizon, and risk tolerance. Using
            this data, SuperFin crafts personalized investment recommendations
            and continuously optimizes them to help you achieve your long-term
            financial objectives.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why SuperFin
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-slate-600"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-800/70 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-slate-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Take the first step towards intelligent portfolio management
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105"
          >
            Begin Assessment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
