import Link from 'next/link'
import React from 'react'
import logo from "../public/logo.png"
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="flex bg-black justify-between items-center p-2">
        <div><Image src={logo} width={175} height={175} alt='logo' className="object-contain"/></div>
        <div className="space-x-4 text-xl">
            <Link className="text-blue-500 hover:text-blue-800" href='/'>Home</Link>
            <Link className="text-blue-500 hover:text-blue-800" href='/about'>About</Link>
            <Link className="text-blue-500 hover:text-blue-800" href='/services'>Services</Link>
            {/* <Link className="text-blue-500 hover:text-blue-800">Blog</Link> */}
            <Link className="text-blue-500 hover:text-blue-800" href='/contactUs'>Contact Us</Link>
        </div>
        <div className="space-x-4">
            <Link href='login'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button></Link>
            <Link href='signup'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button></Link>
        </div>
    </div>
  )
}

export default Navbar
