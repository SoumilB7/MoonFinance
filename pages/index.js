import Navbar from '@/components/Navbar'
import React from 'react'
import '../app/globals.css'
import Home from '@/components/Home/home'
import Solution from '@/components/Home/solution'
import Recognizition from '@/components/Home/recognizition'
import Faq from '@/components/Home/faq'

const index = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Solution/>
      <Recognizition/>
      <Faq/>
    </div>
  )
}

export default index
