import React from 'react'
import './style.scss'

import Image from 'next/image'
import shrey from '../../public/shrey.svg'
import soumilb from '../../public/soumilb.svg'
import prateek from '../../public/prateek.svg'
import RadhikaL from '../../public/RadhikaL.svg'
import RadhikaA from '../../public/RadhikaA.svg'
export default function About() {
  return (
    <>
     <div className='aboutus_parent'>
        <div className="aboutus_main">
            <div className='aboutusmain'></div>
            <h3>About:</h3>
            <p>Moon Finance is your AI investment advisory, which is built to give 
                professional investment advisory services to every Indian investor at 
                their fingertip. Our service is non-partial & specially curated for your 
                unique investment needs.</p>
            <h3>Our Mission:</h3>
            <p>To be the one-stop investment platform for planning & execution for Indian investors who are investing for a better future.</p>
            <h3>Our Journey:</h3>
            <p>We are a motivated team who are solving the problem they faced in their own investment journey.</p>
        </div>
        <hr/>
        <div className="aboutus_people">
            <h1 style={{textAlign:'center',color:'white',fontSize:100,fontFamily:"verdana"}}>People</h1>
            <div className="aboutus_people_first">
                <div className="aboutus_people_individual">
                    <Image src={shrey} alt='shrey Image'></Image>
                    <h3>Shrey Baldev</h3>
                    <p>CEO & Founder</p>
                </div>
                <div className="aboutus_people_individual">
                   <Image src={soumilb} alt="Soumil Image"></Image>
                    <h3>Soumil Binhani</h3>
                    <p>CTO</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
