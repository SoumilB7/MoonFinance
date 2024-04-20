import Navbar from '@/components/Navbar'
import React from 'react'
import '../app/globals.css'
import Home from '@/components/Home/home'
import Solution from '@/components/Home/solution'
import Recognizition from '@/components/Home/recognizition'
import Faq from '@/components/Home/faq'
import Footer from '@/components/Footer'

const index = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Solution/>
      <Recognizition/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default index
