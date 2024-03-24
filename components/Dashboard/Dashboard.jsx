import React from "react";
import Navbar2 from "../Navbar2";
import { Poppins } from "next/font/google";
import graph1 from "../../public/graph.svg";
import graph2 from "../../public/graph2.svg";
import ellipse1 from "../../public/ellipseGreen.svg";
import ellipse2 from "../../public/ellipseWhite.svg";
import gold from "../../public/gold.svg";
import blue from "../../public/blue.svg";
import ellipse3 from "../../public/ellipse3.svg";
import dash from "../../public/dashboard.svg";
import basket from "../../public/basket.svg";
import { Chart } from "chart.js";
import overlap from "../../public/overlap.svg";
import Graph from "../../components/Dashboard/Graph";
import Image from "next/image";
const Dashboard = () => {
  const priceInvested = 5000;
  const numberofAssets = 5;
  const rebalFreq = "Quarterly";
  const riskProfile = "Mid";
  const cagr = 10.28;
  return (
    <>
      <div className="h-screen bg-black text-white font-[Poppins] overflow-x-hidden overflow-hidden">
        <div className="text-6xl mt-[15%] w-full text-center px-6 font-semibold md:text-left max-sm:px-20 max-sm:text-5xl md:font-bold max-sm:pt-6 text-nowrap">
          Your Assets
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2">
          <div className="pl-[2%] sm:pl-[20%] sm:pt-20">
            <Graph />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 mx-auto my-auto -mt-[10%] gap-x-10 gap-y-10 md:mt-[20%] pl-10">
            {/* Data Grid*/}
            <div className="md:-mt-20">
              {/*PRice Invested*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Price Invested
              </p>
              <p className="text-blue-500 text-3xl font-medium">
                {priceInvested}
              </p>
            </div>

            <div className="md:-mt-20">
              {/*CAGR*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                CAGR
              </p>
              <p className="text-blue-500 text-3xl font-medium">{cagr}%</p>
            </div>

            <div className="md:hidden text-nowrap pt-2">
              {/*Assets*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Risk Profile
              </p>
              <p className="text-3xl text-[#F7AD19]">{riskProfile}</p>
            </div>

            <div className="mt-2 min-w-[20%]">
              {/*RebalFreq*/}
              <p className="text-2xl md:font-bold md:text-2xl">Assets</p>
              <p className="text-2xl font-medium">{numberofAssets}</p>
            </div>

            <div className="max-md:hidden lg:flex-row sm:w-full">
              <p className="text-2xl font-bold">Rebalance Frequency</p>
              <p className="text-xl font-medium">{rebalFreq}</p>
            </div>

            <div className="max-md:hidden flex-row w-[180%] mb-8">
              {" "}
              {/* Laptop Paragraph */}
              <p className="text-3xl font-bold text-nowrap pt-4">
                About the allocation
              </p>
              <p className="pt-4 font-medium text-wrap">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor,
                ipsum voluptate? Voluptates commodi impedit adipisci. Ipsa
                doloremque, quibusdam, placeat similique, molestiae eum
              </p>
            </div>
          </div>
        </div>
        <div className="max-md:hidden">
          <hr className="bg-[#212121] w-[50%] mt-10 mx-6 opacity-40" />
        </div>
        <div className="w-full text-center md:hidden flex-row justify-center max-sm:px-6 -mt-[38%]">
          {/*Paragraph*/}
          <p className="text-4xl font-medium max-sm:text-3xl sm:pt-10">
            About the allocation
          </p>
          <p className="text-center text-xl font-medium max-sm:px-6 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            voluptates aspernatur culpa illo qui vero libero reprehenderit unde
            temporibus tempora deleniti voluptate dolorem eos modi.
          </p>
        </div>
      </div>
      <div className="mt-10 text-5xl font-semibold pb-4 sm:text-center sm:pb-6 z-0">
        Your Basket
      </div>
      <div className="flex justify-center">
        <Image
          src={dash}
          className="blur-sm sm:w-full sm:blur-lg z-0 absolute"
        ></Image>
          <Image src={overlap} className="z-20 relative pt-[20%] "></Image>
      </div>
    </>
  );
};

export default Dashboard;
