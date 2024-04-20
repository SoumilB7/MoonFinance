import React from "react";
import { useRouter } from 'next/router';
const Grid = () => {
    const router = useRouter();
    const priceInvested = 5000;
    const numberofAssets = 5;
    const rebalFreq = 'Quarterly';
    const riskProfile = 'Mid';
    const cagr = 10.28;
  return (
    <>
      <div className="grid grid-rows-2 items-center justify-center">
        <div className="flex justify-center">
          <div className="text-white grid grid-cols-2 gap-x-20 gap-y-10 w-[290px] text-nowrap md:h-auto md:w-full md:pt-20 md:gap-20">
            <div className="w-fit">
              {/* Price Invested */}
              <p className="text-2xl font-normal sm:font-normal sm:text-4xl">
                Price Invested
              </p>
              <p className="text-blue-500 text-2xl font-medium">{priceInvested}</p>
            </div>

            <div className="w-fit">
              {/* CAGR */}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                CAGR
              </p>
              <p className="text-blue-500 text-2xl font-medium">{cagr}%</p>
            </div>

            <div className="w-fit">
              {/* Risk Profile*/}
              <p className="text-2xl font-normal md:font-normal md:text-4xl">
                Risk Profile
              </p>
              <p className="text-2xl text-[#F7AD19]">{riskProfile}</p>
            </div>

            <div className="w-fit">
              {/* Assets */}
              <p className="text-2xl md:font-normal md:text-4xl ">Assets</p>
              <p className="text-2xl font-medium">{numberofAssets}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center sm:hidden">
          <button className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 px-8 py-2 text-light w-[200px]">
            Customise Assets
          </button>
        </div>

        <div className="text-white px-8 sm:w-auto sm:px-0 sm:pt-20">
          <p className="text-3xl font-medium sm:font-bold text-nowrap text-center sm:text-start">
            About the allocation
          </p>
          <p className="pt-2 font-light text-wrap text-lg text-center sm:text-start">
            We have analysed your investor profile i.e Your risk apetite,
            stability preference and many other factors which helps us decide
            your favourable investments. Every investor has a unique profile and
            this one suits you the best !
          </p>
        </div>
      </div>
    </>
  );
};

export default Grid;
