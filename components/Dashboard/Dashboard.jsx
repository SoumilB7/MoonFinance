import React from "react";
import Navbarf from "../Navbarf";
import Graph from "./Graph";
import Grid from "./Grid";
import { Poppins } from "next/font/google";
import dash from "../../public/dashboard.svg";
import basket from "../../public/basket.svg";
import overlap from "../../public/overlap.svg";
import Image from "next/image";
import Footer from "../Footer";
import { useRouter } from "next/router";
const Dashboard = ({ finalCalculation }) => {
  const router = useRouter();
  const priceInvested = 5000;
  const numberofAssets = 5;
  const rebalFreq = "Quarterly";
  const riskProfile = "Mid";
  const cagr = 10.28;
  return (
    <>
      <h1 className="text-white text-5xl font-semibold pt-4 max-sm:text-center sm:pl-4 sm:pt-6">
        Your Assets
      </h1>
      <div className="md:grid grid-cols-2">
        <div className="md:w-auto pt-10 sm:pt-12 sm:pb-8">
          <Graph finalCalculation={finalCalculation} />
          <div className="w-full max-sm:hidden flex justify-center">
            <button
              onClick={() => {
                router.push("/form");
              }}
              className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 px-8 py-4 text-light text-3xl text-nowrap"
            >
              Customise Assets
            </button>
          </div>
        </div>
        <div className="sm:pt-10">
          <Grid />
        </div>
      </div>
      <hr className="w-full bg-[#212121] hidden sm:flex" />
      <div>
        <p className="text-4xl sm:text-6xl text-white pt-10 text-center font-bold md:text-start">
          Your Basket
        </p>
        <div className="">
          <div className="absolute z-1">
            <Image
              src={dash}
              className="pt-6 blur-sm sm:blur-md sm:w-screen"
            ></Image>
          </div>
          <div className="relative z-3 w-full grid grid-rows-2 justify-center opacity-100 md:items-center sm:pt-40">
            <Image
              src={overlap}
              className="sm:w-[400px] sm:h-[400px] h-[200px] w-[200px]"
            ></Image>
            <div className="w-full flex justify-center h-fit  sm:mb-80">
              <button className="bg-blue-500 rounded-lg text-center w-[150px] h-[50px] sm:w-[200px] sm:h-[50px] text-white">
                Invest
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
