import Dashboardf from '@/components/Dashboardf/Dashboardf'
import React from 'react'
import Navbar from '@/components/Navbarf'
import "../app/globals.css"
import { useRouter } from 'next/router'
const dashboardf = () => {
  const router = useRouter();
  const { finalCalculation } = router.query;
  return (
    <>
    <Navbar/>
    <Dashboardf finalCalculation={finalCalculation}/>
    </>
  )
}
export default dashboardf