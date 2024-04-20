import Dashboardf from "@/components/Dashboard/Dashboard";
import Head from "next/head";
import React from "react";
import Navbar from "@/components/Navbarf";
import "../app/globals.css";
import { useRouter } from "next/router";
const Dashboard = () => {
  const router = useRouter();
  const { finalCalculation } = router.query;
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <Dashboardf finalCalculation={finalCalculation} />
    </>
  );
};
export default Dashboard;
