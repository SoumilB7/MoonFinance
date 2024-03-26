import React from "react";
import "../app/globals.css";
import { useState } from "react";
import { apple } from "@/public/apple.svg";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex row">
      <div className="min-h-screen w-1/2 bg-blue-500">
        <div className="flex justify-center mt-16">
          <svg
            width="245"
            height="245"
            viewBox="0 0 245 245"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M163.47 47.3831L173.509 69.4838L119.881 93.5966L126.588 109.292L180.594 84.2649L190.188 105.874L206.064 61.9018L163.47 47.3831Z"
              fill="white"
            />
            <path
              d="M125.465 152.691V131.89L176.135 108.777V128.423L125.465 152.691Z"
              fill="white"
            />
            <path
              d="M68.7393 64.894L130.688 102.55"
              stroke="white"
              stroke-width="15.8065"
            />
            <path
              d="M125.811 190.846V172.206L147 160.576V178.738L125.811 190.846Z"
              fill="white"
            />
            <path
              d="M104.39 190.008C90.3278 187.174 74.8831 180.368 64.6666 170.298C54.4502 160.228 47.3917 147.397 44.3554 133.377C41.3192 119.357 42.4369 104.756 47.5717 91.361C52.7065 77.9663 61.1471 66.6853 72.7773 58.2875L83.7783 72.5205C74.9795 78.8739 68.2242 87.655 64.3394 97.7888C60.4547 107.923 59.6091 118.969 61.9062 129.576C64.2033 140.183 69.5434 149.89 77.2726 157.509C85.0019 165.127 93.7513 170.741 104.39 172.884L104.39 190.008Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="text-center text-2xl font-sans font-semibold mt-16">
          <label>MOON FINANCE</label>
        </div>
        <div className="text-center text-2xl font-sans font-light mt-4">
          <label>AI investment advisory for GenZ</label>
        </div>
      </div>
      <div className="min-h-screen w-1/2 bg-black">
        <div className="text-6xl font-sans font-bold text-center mt-16 pt-4">
          <label>Sign up</label>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex justify-center">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="bg-black block w-4/6 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Username"
                value={formState.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center mt-4">
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="bg-black block w-4/6 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Phone number"
                value={formState.phone}
                onChange={handleInputChange}
              />
            </div>
            <div  className="flex justify-center mt-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-black block w-4/6 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Email address"
                value={formState.email}
                onChange={handleInputChange}
              />
            </div>
            <div  className="flex justify-center mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-black block w-4/6 py-1.5 px-3 mt-9 border-2 sm:text-sm"
                placeholder="Password"
                value={formState.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-start pl-12 ml-14">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-12 mt-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              CREATE ACCOUNT
            </button>
          </div>
          <hr></hr>
      </div>
    </div>
  );
};

export default Signup;
