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
import Footer from '../Footer';
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
</style>
const Dashboard = () => {
  const priceInvested = 5000;
  const numberofAssets = 5;
  const rebalFreq = "Quarterly";
  const riskProfile = "Mid";
  const cagr = 10.28;
  return (
    <>
      <div className="h-screen bg-black text-white font-poppins">
        <div className="text-6xl mt-[2%] w-full text-center px-6 font-semibold md:text-left max-sm:px-20 max-sm:text-5xl md:font-bold max-sm:pt-6 text-nowrap">
          Your Assets
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2 font-poppins">
          <div className="sm:pl-[20%] sm:pt-20 pt-8 pl-[2%] md:px-10">
          <Graph/>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 mx-auto my-auto -mt-[10%] gap-x-10 gap-y-10 md:mt-[20%] pl-10">
            {/* Data Grid*/}
            <div className="md:-mt-20 mx-10">
              {/*PRice Invested*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Price Invested
              </p>
              <p className="text-blue-500 text-2xl font-medium">
                {priceInvested}
              </p>
            </div>

            <div className="md:-mt-20">
              {/*CAGR*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                CAGR
              </p>
              <p className="text-blue-500 text-2xl font-medium">{cagr}%</p>
            </div>

            <div className="md:hidden text-nowrap pt-2 mx-10">
              {/*Assets*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Risk Profile
              </p>
              <p className="text-2xl text-[#F7AD19]">{riskProfile}</p>
            </div>

            <div className="mt-2 min-w-[20%] pl-2 md:pl-12">
              {/*RebalFreq*/}
              <p className="text-2xl md:font-normal md:text-4xl ">Assets</p>
              <p className="text-2xl font-medium">{numberofAssets}</p>
            </div>

            <div className="max-md:hidden lg:flex-row sm:w-full pr-2 text-wrap">   
            <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Risk Profile
              </p>
              <p className="text-2xl text-[#F7AD19]">{riskProfile}</p>
            </div>
            
            <div className="max-md:hidden flex-row w-[180%] mb-8 pl-10">
              {" "}
              {/* Laptop Paragraph */}
              <p className="text-3xl font-bold text-nowrap pt-[10%]">
                About the allocation
              </p>
              <p className="pt-4 font-medium text-wrap text-2xl">
              We have analysed your investor profile i.e Your risk apetite, stability preference and many other factors which helps us decide your favourable investments. Every investor has a unique profile and this one suits you the best !
              </p>
            </div>

            <button className="w-[200px] h-[50px] bg-blue-500 mx-[40%] md:-mx-[310%] md:mt-[70%] lg:-mx-[270%] lg:mt-[80%] text-xl rounded-lg hover:bg-blue-700">Customise Assets</button>
          </div>
        </div>
        <div className="max-md:hidden font-poppins">
          <hr className="bg-[#212121] w-[100%] -mt-[30%] opacity-40" />
        </div>
        <div className="w-full text-center md:hidden flex-row justify-center max-sm:px-6 -mt-[25%] pt-2 font-poppins">
          {/*Paragraph*/}
          <p className="text-4xl font-medium max-sm:text-3xl sm:pt-10">
            About the allocation
          </p>
          <p className="text-center text-xl font-medium max-sm:px-6 pt-2">
          We have analysed your investor profile i.e Your risk apetite, stability preference and many other factors which helps us decide your favourable investments. Every investor has a unique profile and this one suits you the best !
          </p>
        </div>
        <div className="md:-mt-[8%] relative">
          <div className="px-[18%] pt-[10%] text-5xl text-nowrap font-semibold sm:px-0 sm:pb-6 md:pl-10 md:pb-10 font-poppins">
            Your Basket
          </div>
          <div className="">
            <Image
              src={dash}
              className="pt-8 blur-sm md:w-full md:blur-lg"
            ></Image>
              <Image
                src={overlap}
                className=" -mt-[60%] mx-[15%] sm:-mt-[50%] sm:mx-[30%] md:-mt-[50%] md:mx-30 absolute lg:mx-[30%] lg:w-[600px] lg:h-[600px] lg:-mt-[50%] h-[200px]"
              ></Image>
          </div>
          <button className="bg-blue-500 font-poppins absolute w-[100px] h-[30px] rounded-lg mx-[37%] -mt-[29%] sm:mx-[37%] md:mx-[36%] md:-mt-[20%] lg:-mt-[23%] lg:mx-[40%] lg:w-[300px] lg:h-[70px] lg:text-3xl hover:bg-blue-700">Invest</button>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Dashboard;
