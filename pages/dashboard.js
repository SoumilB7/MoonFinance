import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import Navbar from "@/components/Navbar";
import Graph from "@/components/Dashboard/Graph";
import Navbarf from '@/components/Navbarf'
import "../app/globals.css";
import Footer from "@/components/Footer";
const dashboard = () => {
  return (
    <>
        <Navbarf/>
        <Dashboard />
    </>
  );
};

export default dashboard;
