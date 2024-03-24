import React from 'react'
import Image from 'next/image'
import HomeImg from '../../public/home/mainvec.svg'
import ArrowImg from '../../public/home/arrow.png'

const Home = () => {
  return (
    <div className='px-4 sm:px-20 flex flex-col sm:flex-row min-h-[88vh] justify-center items-center'>
      <div className='flex flex-col text-white w-full sm:w-1/2 justify-center items-center sm:items-start text-center sm:text-left mt-[2.6rem] sm:m-[0rem]'>
        <h1 className='text-4xl sm:text-8xl font-gotham font-bold'>MOON FINANCE</h1>
        <h4 className='text-2xl sm:text-4xl my-5 text-[#ABABAB]'>Your personal AI investment advisor</h4>
        <button className='flex items-center justify-center flex-row px-4 sm:px-10 py-2 border-2 border-white w-full sm:w-[42%] text-xl sm:text-2xl my-5 rounded-xl bg-[#8d8b8b76]'>
          Start Investing
          <span className='m-1 ml-3'>
            <Image src={ArrowImg} width={22} height={22} alt='Arrow'/> 
          </span>
        </button>
      </div>
      <div className='w-full sm:w-1/2 flex justify-center sm:justify-end'>
        <Image src={HomeImg} width={600} height={600}  alt='Home'/>
      </div>
    </div>
  )
}

export default Home