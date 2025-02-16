"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface Answers {
  [key: string]: number | string; // questionId -> selectedOption (number) or investment amount (string)
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start at -1 for investment input
  const [answers, setAnswers] = useState<Answers>({ investment: "" }); // Initialize with investment key
  const router = useRouter();

  useEffect(() => {
    // Fetch questions from a JSON file or API
    fetch("/data/question.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);

        // Initialize the answers object with 0 for all questions
        const initialAnswers: Answers = { investment: "" };
        data.forEach((q: Question) => {
          initialAnswers[q.id] = 0; // Default value indicating no answer
        });
        setAnswers(initialAnswers);
      })
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  const handleInvestmentChange = (amount: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      investment: amount, // Update investment amount
    }));
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: optionIndex,
      };
      console.log("Updated Answers:", updatedAnswers);
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > -1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Final Submission:", answers);
    const userUid = localStorage.getItem('userUid');
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers)); // Encode for URL safety
    const response = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({questions:answers,"userID":userUid}),
    });

    if(response.ok){
      const data = await response.json();

    router.push(`/distrib?answers=${encodedAnswers}`);
    }

    if (!response.ok) {
      throw new Error('Failed to submit quiz');
    }

     // Pass the encoded object

  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#03ffc824] text-white px-16">
        {currentQuestionIndex === -1 ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Enter your investment amount</h2>
            <input
              type="number"
              value={answers.investment as string}
              onChange={(e) => handleInvestmentChange(e.target.value)}
              className="p-2 rounded border border-gray-300 w-64 text-black"
              placeholder="Investment amount in Rs"
            />
            <button
              onClick={handleNext}
              disabled={!answers.investment}
              className="px-6 py-2 mt-4 bg-[#03ffc89b] rounded-lg hover:bg-[#2b937c] disabled:opacity-50"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">
                {questions[currentQuestionIndex]?.question}
              </h2>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full ${
                questions[currentQuestionIndex]?.options.length % 2 !== 0
                  ? "grid-rows-auto"
                  : ""
              }`}
            >
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleOptionSelect(
                      questions[currentQuestionIndex].id,
                      index + 1
                    )
                  }
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-lg font-semibold 
                    ${
                      answers[questions[currentQuestionIndex]?.id] === index + 1
                        ? "bg-green-500 border-[#03FFC980] text-white"
                        : "bg-black border-[#03FFC980] text-white hover:opacity-80"
                    } 
                    ${
                      index ===
                        questions[currentQuestionIndex]?.options.length - 1 &&
                      questions[currentQuestionIndex]?.options.length % 2 !== 0
                        ? "md:col-span-2 justify-self-center"
                        : ""
                    }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-8 w-full">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                Back
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#03ffc89b] rounded-lg hover:bg-[#2b937c]"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg hover:bg-[#2b937c]"
                >
                  Next
                </button>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
