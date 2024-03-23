import Navbar from '@/components/Navbar'
import React from 'react'
import '../app/globals.css'
import Home from '@/components/Home/home'

const index = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default index
