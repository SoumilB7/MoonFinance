import React from "react";
import Image from "next/image";
import soumilb from '../../public/Soumilb.svg'
import Footer from "../Footer";
import Navbar from "../Navbarf";
import Picture from "./Picture";
export default function About() {
  return (
    <>
      <div className="flex-col text-white">
        <Navbar />
        <div className="pl-12 pt-8 pr-10">
          <div className="">
            {" "}
            {/*About Paragraph*/}
            <h1 className="text-3xl md:text-5xl font-poppins font-bold">About:</h1>
            <p className="md:text-2xl md:pt-4">
              Moon Finance is your AI investment advisory, which is built to
              give professional investment advisory services to every Indian
              investor at their fingertip. Our service is non-partial &
              specially curated for your unique investment needs.
            </p>
          </div>

          <div className="pt-12">
            {" "}
            {/* Our Mission */}
            <h1 className="text-3xl md:text-5xl font-poppins font-bold">Our Mission:</h1>
            <p className="md:text-2xl md:pt-4">
              To be the one-stop investment platform for planning & execution
              for Indian investors who are investing for a better future.
            </p>
          </div>

          <div className="pt-12">
            {" "}
            {/* Our Journey */}
            <h1 className="text-3xl md:text-5xl font-poppins font-bold">Our Journey:</h1>
            <p className="md:text-2xl md:pt-4">
              We are a motivated team who are solving the problem they faced in
              their own investment journey.
            </p>
          </div>
        </div>

        <div className="pt-10 flex-row">
          {/* People */}
          <h1 className="text-4xl font-poppins font-bold text-center md:text-7xl">
            People
          </h1>
          <div className="grid grid-cols-2 pt-10 sm:flex md:justify-evenly justify-center px-8 space-x-10">
            <Picture src="/shrey.svg" text1="Shrey Baldev" text2="CEO & Founder"/>
            <Picture src="/Soumilb.svg" text1="Soumil Binhani" text2="CTO"/>
          </div>
        </div>

        <div className="pt-10">
          <Footer/>
        </div>
      </div>
    </>
  );
}
