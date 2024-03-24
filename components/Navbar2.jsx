import React, { useState } from 'react'
import { HiMenu } from "react-icons/hi";
import logo from '../public/Logo.svg'
import Image from 'next/image';
import user from '../public/User.svg'
import Link from 'next/link';
const Navbar2 = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <>
      <div className="text-white flex justify-between items-center h-24 w-full mx-auto bg-[#FFFFFF0D] border-b-2 border-b-[##FFFFFF] border-solid">
        <Image src={logo} alt="" srcset="" className='mx-16' />
          <ul className="hidden md:flex">
            <Link className="p-2 m-2 text-xl hover:border-white hover:rounded-md hover:border-2" href='/'>Home</Link>
            <Link className="p-2 m-2 text-xl hover:border-white hover:rounded-md hover:border-2" href='/about'>About</Link>
            <Link className="p-2 m-2 text-xl hover:border-white hover:rounded-md hover:border-2" href='/dashboard'>Services</Link>
            <Link className="p-2 m-2 text-xl hover:border-white hover:rounded-md hover:border-2" href='/contact'>Contact Us</Link>
            <Link className='p-2 m-2 text-xl hover:border-white hover:rounded-md hover:border-2 flex' href='/'>
              <Image src={user} width={18} height={10} alt="head" className='static' />
              <p className='mx-2 static'>Profile</p>
            </Link>
          </ul>
      </div>
    </>
  )
}

export default Navbar2;