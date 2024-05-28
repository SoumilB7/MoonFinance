"use client";
import React from "react";
import Image from "next/image";
import HomeImg from "../../public/home/mainvec.svg";
import ArrowImg from "../../public/home/arrow.png";
import { Router, useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

import axios from "axios";

const Home = () => {
  const router = useRouter();
  const isAuth = getCookie("auth") || "false";
  const userUid = getCookie("userUid");
  const handleStartInvestingClick = async () => {
    console.log("isAuth: ", isAuth);
    try {
      if (isAuth == "false") {
        console.log("User not logged in");
        router.push({
          pathname: "/Login",
        });
        return;
      }
      console.log("User UID: ", userUid);
      const response = await axios.get(
        `http://localhost:3000/api/routes/userResponses/get/byUserId/${userUid}`
      );
      console.log("Response: ");
      console.log(response);

      if (response.data.length == 0) {
        router.push("/form");
      } else {
        const finalCalculation = [
          response.data[0].risk,
          response.data[0].diversity,
          response.data[0].stablity,
        ];

        router.push({
          pathname: "/dashboard",
          query: {
            finalCalculation,
          },
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Error: ", error.response);
    }
  };

  return (
    <div className="px-4 lg:px-20 flex flex-col lg:flex-row min-h-[88vh] justify-center items-center bg-black">
      <div className="flex flex-col text-white w-full lg:w-1/2 justify-center items-center lg:items-start text-center lg:text-left mt-[2.6rem] lg:m-[0rem]">
        <h1 className="text-4xl md:text-8xl lg:text-8xl font-gotham font-bold text-white">
          MOON FINANCE
        </h1>
        <h4 className="text-2xl md:text-4xl lg:text-4xl my-5 text-[#ABABAB]">
          Your personal AI investment advisor
        </h4>
        <button
          onClick={handleStartInvestingClick}
          className="flex items-center text-white md:w-[35%] justify-center flex-row px-4 lg:px-10 py-2 border-2 border-white w-full lg:w-[42%] text-xl lg:text-2xl my-5 rounded-xl bg-[#8d8b8b76]"
        >
          Start Investing
          <span className="m-1 ml-3">
            <Image src={ArrowImg} width={22} height={22} alt="Arrow" />
          </span>
        </button>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          className="object-contain h-auto"
          src={HomeImg}
          width={600}
          height={600}
          alt="Home"
        />
      </div>
    </div>
  );
};

export default Home;
