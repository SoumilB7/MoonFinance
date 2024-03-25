import React from 'react'
import Image from 'next/image'
import footerLogo from '../public/footerlogo.svg'
import phonecall from '../public/phonecall.svg'
import footermail from '../public/footermail.svg'
import Instagram from '../public/Instagram.svg'
import LinkedIn from '../public/LinkedIn.svg'
import Twitter from '../public/Twitter.svg'
import './style.scss'
export default function Footer() {
  return (
    <>

    <hr />
    <footer id="contactus">
    <div className="footer">
      <div className="first">
        <a href="/"><Image src={footerLogo}  alt="Moon Finance Logo"/></a>
        <h3 style={{marginTop:20}}><Image src={phonecall}   alt='phone'/>+916353332891</h3>
        <h3 style={{marginTop:20}}><Image src={footermail}  alt='email'/>shrey.moonfinance@gmail.com</h3>
      </div>
      <div className="second" style={{lineHeight:0.9}}>
        <p>The Suggested ratios are for research purposes only.</p><p>KOINAI TECH PVT.LTD</p> 
        <p>CIN: U66309GJ2024PTC147792</p>
      </div>
      <div className="third">
        <table>
            <tbody>
            <tr>
                <td>
                    Home
                </td>
            </tr>
            <tr>
                <td>
                    Services
                </td>
            </tr>
            <tr>
                <td>
                    About
                </td>
            </tr>
            </tbody>
        </table>
      </div>
      <div className="fourth">
        <a href="https://www.linkedin.com/company/moon-finance-s/"><Image src={LinkedIn} alt="LinkedIn" style={{height:42,width:42}}/></a>
        <a href="https://www.instagram.com/moonfintech?igsh=MW9hY2tyaHR1amppMA=="><Image src={Instagram} alt="Instagram" style={{height:42,width:42}}/></a>
        <a href="https://www.twitter.com"><Image src={Twitter} alt="Twitter" style={{height:42,width:42}}/></a>
      </div>      
      </div>
  </footer>
    </>
  )
}
