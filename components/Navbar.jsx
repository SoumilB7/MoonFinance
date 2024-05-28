"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/Logo.svg";
import { getCookie, setCookie } from "cookies-next";
import { app } from "../firebase/firebase-config";

import axios, { isAxiosError } from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
const auth = getAuth(app);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userToken = getCookie("userToken");
  const userUid = getCookie("userUid");
  const router = useRouter();

  console.log();
  const [isAuth, setAuth] = useState("false");

  const [userData, setUserData] = useState("");
  useEffect(() => {
    setAuth(getCookie("auth") || "false");
  }, []);
  useEffect(() => {
    console.log(isAuth);
    if (isAuth == "false") return;
    const action = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/routes/user/get/byuid/${userUid}`
      );
      console.log(response);
      setUserData(response.data[0]);
    };
    action();
    return;
  }, [isAuth]);
  const handleSignOut = () => {
    console.log("sign out in progress");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        setCookie("userToken", "");
        setCookie("userUid", "");
        setCookie("auth", "false");
        setAuth("false");
        console.log("sign out donee");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error ");
        console.log(error);
      });
  };
  return (
    <div className="flex bg-black justify-between items-center p-2 mx-2 border-b-2 border-b-[##FFFFFF] border-solid">
      <div>
        <Image
          src={logo}
          width={175}
          height={175}
          alt="logo"
          className="object-contain"
        />
      </div>
      <div className="relative lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            className={`fixed top-0 right-0 w-48 py-2 mt-2 bg-black text-white transform transition-transform duration-200 p-4 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black"
              href="/"
            >
              Home
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black"
              href="/about"
            >
              About
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black"
              href="/services"
            >
              Services
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black"
              href="/Login"
            >
              Contact Us
            </Link>

            {isAuth != "false" ? (
              <div>
                <div className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Welcome {`${userData?.name}`}
                </div>

                <button
                  onClick={handleSignOut}
                  className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  signout
                </button>
              </div>
            ) : (
              <div>
                <Link href="Login">
                  <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Login
                  </button>
                </Link>
                <Link href="Signup">
                  <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hidden lg:flex space-x-6 text-xl text-white">
        <Link
          className="p-4 hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-1 text-xl"
          href="/"
        >
          Home
        </Link>
        <Link
          className="p-4 hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-1 text-xl"
          href="/about"
        >
          About
        </Link>
        <Link
          className="p-4 hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-1 text-xl"
          href="/services"
        >
          Services
        </Link>
        <Link
          className="p-4 hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-1 text-xl"
          href="/Login"
        >
          Contact Us
        </Link>
        {console.log("we567890")}
        {console.log(typeof isAuth)}

        <div>
          {isAuth !== "false" ? (
            <div className="space-x-2 flex ">
              <div>
                <div className="block w-full  text-white font-bold py-2 px-4 rounded mt-2">
                  Welcome {`${userData?.name}`}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                sign out
              </button>
            </div>
          ) : (
            <div className="flex space-x-2 ">
              <Link href="Login">
                <div className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Login
                </div>
              </Link>
              <Link href="Signup">
                <div className="block  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  Sign Up
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
