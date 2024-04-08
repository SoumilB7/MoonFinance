import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import user from '../public/User.svg'
import logo from "../public/Logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-[#1E1F1E] justify-between items-center p-2 mx-auto border-b-2 border-b-[##FFFFFF] border-solid ">
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
            className={`fixed top-0 right-0 w-48 py-2 mt-2 bg-[#1E1F1E] text-white transform transition-transform duration-200 p-4 ${
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
              href="/contactUs"
            >
              Contact Us
            </Link>
            <Link
              className="block px-4 py-2 hover:bg-white hover:text-black"
              href="/"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    <div className="hidden lg:flex text-xl text-white lg:justify-between lg:items-center p-2 mx-auto">
        <div className="space-x-6">
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
            href="/contactUs"
          >
            Contact Us
          </Link>
        </div>
    </div>
          <Link
            className=" hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 text-xl lg:flex mx-2 p-2 hidden"
            href="/"
          >
            <Image
              src={user}
              width={18}
              height={10}
              alt="head"
              className="mx-3"
            />
            Profile
          </Link>
</div>
  );
};

export default Navbar;
