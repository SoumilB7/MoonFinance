import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import footerLogo from '../public/footerlogo.svg'
import phonecall from '../public/phoneCall.svg'
import footermail from '../public/footermail.svg'
import Instagram from '../public/Instagram.svg'
import LinkedIn from '../public/LinkedIn.svg'
import Twitter from '../public/Twitter.svg'

export default function Footer() {
  return (
    <>
      <hr />
      <footer id="contactus" className="px-4 py-8 md:px-8 lg:px-16 text-white">
        <div className="footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <div className="first flex flex-col items-start">
            <Link href="/"><Image src={footerLogo} alt="Moon Finance Logo"/></Link>
            <h3 className="mt-4 flex items-center"><Image src={phonecall} alt='phone'/>+916353332891</h3>
            <h3 className="mt-4 flex items-center"><Image src={footermail} alt='email'/>shrey.moonfinance@gmail.com</h3>
          </div>
          <div className="second text-xl">
            <p className="mb-2">The Suggested ratios are for research purposes only.</p>
            <p className="mb-2">KOINAI TECH PVT.LTD</p> 
            <p className="mb-2">CIN: U66309GJ2024PTC147792</p>
          </div>
          <div className='third flex flex-row justify-center md:justify-end space-x-20'>
          <div className="w-[15%] flex flex-col items-center">
            <ul className="space-y-2 text-xl">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 items-center w-[15%]">
            <a href="https://www.linkedin.com/company/moon-finance-s/">
              <Image src={LinkedIn} alt="LinkedIn" width={25} height={25}/>
            </a>
            <a href="https://www.instagram.com/moonfintech?igsh=MW9hY2tyaHR1amppMA==">
              <Image src={Instagram} alt="Instagram" width={25} height={25}/>
            </a>
            <a href="https://www.twitter.com">
              <Image src={Twitter} alt="Twitter" width={25} height={25}/>
            </a>
          </div> 
          </div>     
        </div>
      </footer>
    </>
  )
}