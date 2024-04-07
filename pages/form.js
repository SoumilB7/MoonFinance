import React, { useState } from "react";
import '../app/globals.css'
const questions = [
  {
    question: "How much investing experience do you have?",
    options: [
      "Very Experienced",
      "Somewhat inexperienced",
      "Somewhat experienced",
      "Experienced",
      "Very experienced",
    ],
  },

  {
    question:
      "In case of your investment goes down 10% after investing, what will you do?",
    options: [
      "Will exit and will invest in FD",
      "Will hold till cost price comes and exit there",
      "No worry, invested for long term",
      "Average",
    ],
  },

  {
    question: "Your investment pattern.",
    options: [
      "Low risk, Low return",
      "Moderate risk, Moderate return",
      "High risk, High return",
    ],
  },

  {
    question:
      "When making a long-term investment, I plan to keep the money invested for... ?",
    options: [
      "1-2 years",
      "3-4 years",
      "5-6 years",
      "7-8 years",
      "More than 8 years",
    ],
  },

  {
    question:
      "My current and future income sources (for example, salary, social security, pensions) are...",
    options: [
      "Very unstable",
      "Unstable",
      "Somewhat stable",
      "Stable",
      "Very Stable",
    ],
  },

  {
    question:
      "During market declines, I tend to sell portions of my riskier assets and invest the money in safer assets.",
    options: [
      "Strongly agree",
      "Agree",
      "Somewhat agree",
      "Disagree",
      "Strongly disagree",
    ],
  },

  {
    question:
      "I would invest in a mutual fund or ETF (exchanged-traded fund) based solely on a brief conversation with a friend, co-worker, or relative.",
    options: [
      "Strongly agree",
      "Agree",
      "Somewhat agree",
      "Disagree",
      "Strongly disagree",
    ],
  },

  {
    question:
      "If I owned a stock investment that lost about 24% in three months, I would..",
    options: [
      "Sell all the remaining investment",
      "Sell a portion of the remaining investment",
      "Hold onto the investment and sell nothing",
      "Buy more of the remaining investment",
    ],
  },

  {
    question:
      "Generally, I prefer an investment with little or no ups and downs in value, and I am willing to accept the lower returns these investments may make.",
    options: [
      "Strongly agree",
      "Agree",
      "Somewhat agree",
      "Disagree",
      "Strongly disagree",
    ],
  },

];

function InvestmentSurveyForm(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  var risk_score = 0;
  var diversity_score = 0;
  var stability_score = 0;

  const getQuestionByIndex = (index) => {
    return questions[index - 1] || null;
  };

  const handleOptionChange = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion + 1]: optionIndex + 1 });
    console.log("answers:", answers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    console.log("Submitted answers:", answers);
    const calculate = Object.values(answers);
    if (calculate.length === 9) {
      risk_score =
        calculate[0] * 0.15 +
        calculate[1] * 0.1 +
        calculate[2] * 0.3 +
        calculate[4] * 0.15 +
        calculate[5] * 0.12 +
        calculate[6] * 0.05 +
        calculate[7] * 0.08;
      diversity_score =
        calculate[3] * 0.1 +
        calculate[4] * 0.08 +
        calculate[8] * 0.1 +
        2 / risk_score;
      stability_score =
        calculate[0] * 0.1 +
        calculate[1] * 0.1 +
        calculate[5] * 0.2 +
        calculate[6] * 0.15 +
        calculate[7] * 0.15 +
        calculate[4] * 0.4;
      if (
        risk_score !== null &&
        diversity_score !== null &&
        stability_score !== null
      ) {
        const finalCalculation = [risk_score, diversity_score, stability_score];
        props.setCalculate(finalCalculation);
      }
    }
  };

  const renderQuestion = () => {
    const question = getQuestionByIndex(currentQuestion + 1);
    if (!question) return null;

    return (
      <div className="bg-black h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <img src="/logo.png" alt="Moon Finance" className="h-8" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
              Join the Waitlist
            </button>
          </div>
          <div>
            <h2 className="text-xl text-white font-medium mb-4">
              QUESTION {currentQuestion + 1}/{questions.length}
            </h2>
            <h3 className="text-2xl text-white font-medium mb-6">
              {question.question}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleOptionChange(index)}
                    className={`bg-gray-700 text-white font-medium py-2 rounded ${
                      answers[currentQuestion + 1] === index + 1
                        ? "bg-blue-500 hover:bg-blue-600"
                        : ""
                    }`}
                  >
                    {option.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </button>
                ))}
              </div>
            </form>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion > 0 ? currentQuestion - 1 : 0
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!answers[currentQuestion + 1]}
              onClick={handleSubmit}
              className={`px-4 py-2 rounded text-white ${
                !answers[currentQuestion + 1]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 font-semibold"
              }`}
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {Array.from({ length: questions.length }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentQuestion
                      ? "bg-white"
                      : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderQuestion()}</div>;
}

export default InvestmentSurveyForm;