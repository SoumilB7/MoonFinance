import About from "@/components/About/About";
import Head from "next/head";
import React from "react";
import "../app/globals.css";
import Navbar from "@/components/Navbar";
const about = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <About />
    </>
  );
};
export default about;
