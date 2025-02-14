"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-10 lg:px-20 py-8">
        {/* Text Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-700">
            Grow your wealth to the{" "}
            <span className="block text-black">Moon with your personal AI</span>{" "}
            investment <span className="text-green-700">advisor</span>
          </h1>
          <button
            onClick={() => router.push("https://www.notion.so/172ab12bf7f4803bbe61facb5f4e6e6b?pvs=106")}
            className="bg-[#00D54B] hover:bg-[#00C044] text-black font-bold px-6 py-3 rounded-full text-lg flex items-center justify-center mx-auto lg:mx-0 transition duration-300"
          >
            Start Investing
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
          <Image
                className="ml-20"
                src="/assets/screenshot.png" // Updated path
                alt="Moon Finance App Screenshots"
                width={1000}
                height={800}
                layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
