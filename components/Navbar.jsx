import Link from 'next/link'
import React from 'react'
import logo from "../public/Logo.svg"
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="flex bg-black justify-between items-center p-2 mx-2">
        <div><Image src={logo} width={175} height={175} alt='logo' className="object-contain"/></div>
        <div className="space-x-6 text-xl text-white ">
            <Link className="text-white p-2 hover:border-2 hover:border-white hover:rounded-lg" href='/'>Home</Link>
            <Link className="text-white p-2 hover:border-2 hover:border-white hover:rounded-lg" href='/about'>About</Link>
            <Link className="text-white p-2 hover:border-2 hover:border-white hover:rounded-lg" href='/services'>Services</Link>
            {/* <Link className="text-white p-2 hover:border-2 hover:border-white">Blog</Link> */}
            <Link className="text-white p-2 hover:border-2 hover:border-white hover:rounded-lg" href='/contactUs'>Contact Us</Link>
        </div>
        <div className="space-x-4">
            <Link href='login'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button></Link>
            <Link href='signup'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button></Link>
        </div>
    </div>
  )
}

export default Navbar
