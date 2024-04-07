import React from "react";
import Image from "next/image";
import shrey from "../../public/shrey.svg";
import soumilb from "../../public/Soumilb.svg";
import prateek from "../../public/prateek.svg";
import RadhikaL from "../../public/RadhikaL.svg";
import RadhikaA from "../../public/RadhikaA.svg";
import Footer from "../Footer";
import Navbar from "../Navbarf";
import Picture from "./Picture";
export default function About() {
  return (
    <>
      <div className="flex-col">
        <Navbar />
        <div className="pl-12 pt-8 pr-10">
          <div className="">
            {" "}
            {/*About Paragraph*/}
            <h1 className="text-3xl font-poppins font-bold">About:</h1>
            <p className="">
              Moon Finance is your AI investment advisory, which is built to
              give professional investment advisory services to every Indian
              investor at their fingertip. Our service is non-partial &
              specially curated for your unique investment needs.
            </p>
          </div>

          <div className="pt-12">
            {" "}
            {/* Our Mission */}
            <h1 className="text-3xl font-poppins font-bold">Our Mission:</h1>
            <p>
              To be the one-stop investment platform for planning & execution
              for Indian investors who are investing for a better future.
            </p>
          </div>

          <div className="pt-12">
            {" "}
            {/* Our Journey */}
            <h1 className="text-3xl font-poppins font-bold">Our Journey:</h1>
            <p>
              We are a motivated team who are solving the problem they faced in
              their own investment journey.
            </p>
          </div>
        </div>

        <div className="pt-10 flex-row">
          {/* People */}
          <h1 className="text-4xl font-poppins font-bold text-center">
            People
          </h1>
          <div>
            <Picture/>
          </div>
        </div>
      </div>
    </>
  );
}
