import React, { useState } from 'react'
import { HiArrowLeft, HiDeviceMobile, HiMenu, HiX } from "react-icons/hi";
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
      <div className="text-white hidden md:flex justify-between items-center h-24 w-full bg-[#1E1F1E] border-b-2 border-b-[##FFFFFF] border-solid p-4 fixed top-0">
        <Image src={logo} alt="" srcset="" className='mx-10' />
        <div className="hidden md:flex gap-x-6 p-4">
          <div className='mt-2'><Link className='hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 p-2 text-xl' href='/'>Home</Link></div>
          <div className='mt-2'><Link className='hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 p-2 text-xl' href='/about'>About</Link></div>
          <div className='mt-2'><Link className='hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 p-2 text-xl' href='/dashboard'>Services</Link></div>
          <div className='mt-2'><Link className='hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 p-2 text-nowrap text-xl ' href='/contact'>Contact Us</Link></div>
          <div className=''>
            <Link className='flex gap-x-2 hover:border-white hover:rounded-md hover:border-transparent hover:outline hover:outline-2 p-2' href='/'>
              <Image src={user} width={18} height={10} alt="head" />
              <p className='text-xl'>Profile</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='text-white h-20 w-full bg-[#1E1F1E] border-b-2 border-b-[##FFFFFF] border-solid flex md:hidden justify-between font-[Poppins] fixed top-0'>
       <Image src={logo} className='mx-6'/>
        <div onClick={handleNav} className="md:hidden m-5">
          {nav ? '' : <HiMenu size={32} />}
        </div>
        <div className={nav ? 'bg-[#1E1F1E] w-[100%] h-screen right-0 top-0 fixed z-30 text-white transition ease-linear duration-300':' fixed left-[-100%]'}>
          <div 
          onClick={()=>setNav(!nav)}
          className='text-4xl flex justify-end mt-4 '>
            <HiX/>
          </div>
          <ul className='h-full flex flex-col mt-[18%] items-end gap-y-4 text-4xl'>
            <li>
              <Link className='mx-20' href='/'>Home</Link>
            </li>
            <li>
            <Link className='mx-20'  href='/about'>About</Link>
            </li>
            <li>
            <Link className='mx-20'  href='/services'>Services</Link>
            </li>
            <li>
            <Link className='mx-20'  href='/blogs'>Blogs</Link>
            </li>
            <li>
            <Link className='mx-20'  href='/contact'>Contact Us</Link>
            </li>
          </ul>
        </div>
        </div>
    </>
  )
}

export default Navbar2;
