import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'London', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Stephen King', 'J.K. Rowling', 'F. Scott Fitzgerald'],
    answer: 'Harper Lee',
  },
  // Add more questions here
];

const Form = () => {
    const router= useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const savedState = localStorage.getItem('formState');
    if (savedState) {
      setSelectedOptions(JSON.parse(savedState));
    }
  }, []);

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
    localStorage.setItem('formState', JSON.stringify(updatedSelectedOptions));
  };

  const handleNextButtonClick = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitButtonClick = () => {
    console.log(selectedOptions);
    router.push('/dashboard');
    // setCurrentQuestionIndex(0);
    // setSelectedOptions([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Form</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
            <p className="mb-4">{questionsData[currentQuestionIndex].question}</p>
            <ul>
              {questionsData[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question${currentQuestionIndex}`}
                      value={option}
                      checked={selectedOptions[currentQuestionIndex] === option}
                      onChange={() => handleOptionSelect(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={()=>{currentQuestionIndex === questionsData.length - 1 ? handleSubmitButtonClick() : handleNextButtonClick()}}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {currentQuestionIndex === questionsData.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default Form;
