import Dashboard from "@/components/Dashboard/Dashboard";
import Head from "next/head";
import React from "react";
import Navbar from "@/components/Navbarf";
import "../app/globals.css";
import { useRouter } from "next/router";
const dashboard = () => {
  const router = useRouter();
  const { finalCalculation } = router.query;
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <Dashboard finalCalculation={finalCalculation} />
    </>
  );
};
export default dashboard;
