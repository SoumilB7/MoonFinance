import React from 'react'
import Dashboard from '@/components/Dashboard/Dashboard'
import Navbar2 from '@/components/Navbar2'
import Navbar from '@/components/Navbar'
import Graph from '@/components/Dashboard/Graph'
import '../app/globals.css'
const dashboard = () => {
  return (
    <div>
    <Navbar2/>

    <Dashboard/>
    </div>
  )
}

export default dashboard
