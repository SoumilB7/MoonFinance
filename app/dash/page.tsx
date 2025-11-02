"use client";
import React, { useState } from "react";
import Card from "./Card";
import GraphCard from "./GraphCard";
import AssetSection from "./Alloc";
import TransactionHistory from "./TransactionHistory";


const Page = () => {
  const [transactions, setTransactions] = useState<
    Array<{ id: string; basket: string; price: number; cagr: number }>
  >([]);

  React.useEffect(() => {
    setTransactions([
      {
        id: "1",
        basket: "Basket 1",
        price: 5000,
        cagr: 32,
      },
      {
        id: "2",
        basket: "Basket 2",
        price: 5000,
        cagr: 32,
      },
      {
        id: "3",
        basket: "Basket 3",
        price: 5000,
        cagr: 32,
      },
      {
        id: "4",
        basket: "Basket 4",
        price: 5000,
        cagr: 32,
      },
    ]);
  }, []);

  // Rest of your component code...
  const handleViewBasket = (id: string) => {
    console.log("Viewing basket:", id);
  };

  const handleLoadMore = () => {
    console.log("Loading more transactions...");
  };

  const equitySection = {
    title: "Equity",
    percentage: 50,
    accentColor: "#FF4B91",
    subItems: [
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 30,
      },
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 20,
      },
    ],
  };

  const debtSection = {
    title: "Debt",
    percentage: 30,
    accentColor: "#4ade80",
    subItems: [
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 20,
      },
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 10,
      },
    ],
  };

  const goldSection = {
    title: "Gold",
    percentage: 50,
    accentColor: "#407BFF",
    subItems: [
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 60,
      },
      {
        description: "Lorem ipsum dolor sit amet consectetur",
        percentage: 10,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-4xl text-[#12C38C] pt-6 px-10 font-bold">
        Hello XYZ!
      </h1>
      <p className="text-lg font-light px-10 text-[#6A706E] pb-10">
        Welcome to your financial insights!
      </p>
      <div className="flex flex-col md:flex-row gap-x-16 px-20 md:items-stretch items-center">
        <Card title="Amount Invested" value="₹ 5000" />
        <Card title="Assets Invested In" value="3" />
        <Card title="Expected CAGR" value="10.28%" splitIndex={2} />
        <Card title="Rebalance Frequency" value="Quarterly" />
      </div>
      <div>
        <div className="flex items-center md:items-baseline flex-col md:flex-row gap-x-16 px-20  md:pt-10">
          <GraphCard
            title="Total Investments"
            value="3,90,8000"
            lineColor="#FF69B4"
          />
          <GraphCard
            title="Expected Return"
            value="3,90,8000"
            lineColor="#4ade80"
          />
        </div>
      </div>

      <h1 className="text-5xl text-black pt-20 px-10 md:px-16 font-bold">
        Your Investments
      </h1>

      <div className="space-y-8 px-10 md:px-16 pt-10">
        <AssetSection {...equitySection} />
        <AssetSection {...debtSection} />
        <AssetSection {...goldSection} />
      </div>

      <div className="px-10 md:px-16 pt-10 md:mb-0 mb-5">
        <TransactionHistory
          transactions={transactions}
          onViewBasket={handleViewBasket}
          onLoadMore={handleLoadMore}
        />
      </div>
      <div className="mt-2">
      </div>
    </div>
  );
};

export default Page;
