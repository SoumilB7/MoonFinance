"use client";
import React from "react";
import Link from "next/link";
import Footer from "../components/Footer";

const B2BPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-700">
            Moon Finance B2B Platform
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-slate-600">
            Empower Your Firm and Workforce with AI-Driven Investment Intelligence
          </p>
          <p className="text-lg md:text-xl mb-10 text-slate-600 max-w-4xl mx-auto">
            Moon Finance brings explainable, institutional-grade investment insights to financial firms and enterprises — powered by our proprietary hybrid AI that combines LLMs, RAG, and predictive models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#00D54B] hover:bg-[#00C044] text-black font-bold px-8 py-4 rounded-full text-lg transition duration-300">
              Request API Access
            </button>
            <button className="border-2 border-black hover:bg-gray-100 text-black font-bold px-8 py-4 rounded-full text-lg transition duration-300">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Two Solutions Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-700">
            One AI Platform — Two Enterprise Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Financial Institutions Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-700">
                For Financial Institutions & Fintechs
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Integrate Moon Finance's API into your research or advisory workflows.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>AI-generated research summaries from annual reports and SEBI filings.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Real-time market sentiment and predictive signals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>REST API and SDK for easy integration into existing dashboards.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Improve analyst productivity and reduce research time by 90%.</span>
                </li>
              </ul>
            </div>

            {/* Corporates Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-slate-700">
                For Corporates & HR Teams
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Offer AI-powered investment intelligence as an employee benefit.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Personal dashboards with portfolio insights and learning modules.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>Drives financial wellness, retention, and engagement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#00D54B] mr-2">✓</span>
                  <span>100% data privacy and compliance with Indian regulatory frameworks.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-700">
            Technology That Powers It All
          </h2>
          <p className="text-xl text-center mb-12 text-slate-600 max-w-3xl mx-auto">
            A unified AI framework combining:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-slate-700">RAG + LLMs</h3>
              <p className="text-slate-600">for fundamental document intelligence</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-slate-700">LSTM + Transformers</h3>
              <p className="text-slate-600">for technical trend forecasting</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-slate-700">Aggregator Layer</h3>
              <p className="text-slate-600">delivering explainable, actionable investment scores</p>
            </div>
          </div>
          
          <div className="bg-[#00D54B] bg-opacity-10 p-8 rounded-lg border-2 border-[#00D54B]">
            <p className="text-lg text-center text-slate-700">
              <span className="font-bold">Outcome:</span> Real-time, transparent insights built for scale — not black-box predictions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-700">
            Why Enterprises Choose Moon Finance
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-slate-700">Plug-and-play APIs</h3>
              <p className="text-slate-600">for rapid deployment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-slate-700">Regulation-ready design</h3>
              <p className="text-slate-600">aligned with SEBI and DPDP Act</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-slate-700">Customizable endpoints</h3>
              <p className="text-slate-600">for research, HR, and advisory use cases</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-slate-700">Cloud-native architecture</h3>
              <p className="text-slate-600">supporting 100K+ concurrent queries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-2 text-slate-700">Fully hosted on Indian servers</h3>
              <p className="text-slate-600">with end-to-end encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact Table */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-700">
            Proven Business Impact
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-[#00D54B] text-black">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Segment</th>
                  <th className="px-6 py-4 text-left font-bold">Use Case</th>
                  <th className="px-6 py-4 text-left font-bold">Value Delivered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Brokerage Firms</td>
                  <td className="px-6 py-4 text-slate-600">Research automation</td>
                  <td className="px-6 py-4 text-slate-600">90% faster report analysis</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Asset Managers</td>
                  <td className="px-6 py-4 text-slate-600">Model-driven stock screening</td>
                  <td className="px-6 py-4 text-slate-600">+5–7% research accuracy uplift</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Corporate HR</td>
                  <td className="px-6 py-4 text-slate-600">Employee investment platform</td>
                  <td className="px-6 py-4 text-slate-600">25% higher engagement</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Fintech Platforms</td>
                  <td className="px-6 py-4 text-slate-600">API for investment analytics</td>
                  <td className="px-6 py-4 text-slate-600">10x faster product development</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-700">
            Integrate in Four Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00D54B] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-700">Get API Access</h3>
              <p className="text-slate-600">Request sandbox credentials for your use case</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00D54B] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-700">Customize Models</h3>
              <p className="text-slate-600">Choose from fundamentals, technicals, or hybrid AI modules</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00D54B] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-700">Deploy Securely</h3>
              <p className="text-slate-600">Connect via REST API or enterprise dashboard</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00D54B] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-700">Monitor Results</h3>
              <p className="text-slate-600">Track engagement, accuracy, and user performance in real time</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="bg-[#00D54B] hover:bg-[#00C044] text-black font-bold px-8 py-4 rounded-full text-lg transition duration-300">
              Partner With Us
            </button>
            <button className="border-2 border-black hover:bg-gray-100 text-black font-bold px-8 py-4 rounded-full text-lg transition duration-300">
              View API Docs
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gradient-to-r from-[#00D54B] to-[#00C044]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Ready to Power the Next Generation of Smart Investing?
          </h2>
          <p className="text-xl mb-10 text-black opacity-90">
            Empower your organization with the same AI infrastructure trusted by analysts, fintechs, and forward-thinking enterprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-full text-lg transition duration-300">
              Schedule a Demo
            </button>
            <button className="bg-white hover:bg-gray-100 text-black font-bold px-8 py-4 rounded-full text-lg transition duration-300 border-2 border-black">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default B2BPage;

