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
            Get started with the quiz to get the distribution{" "}
          </h1>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-[#00D54B] hover:bg-[#00C044] text-black font-bold px-6 py-3 rounded-full text-lg flex items-center justify-center mx-auto lg:mx-0 transition duration-300"
          >
            Start 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
