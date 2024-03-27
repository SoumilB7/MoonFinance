import React from 'react'
import Image from 'next/image'
import HomeImg from '../../public/home/mainvec.svg'
import ArrowImg from '../../public/home/arrow.png'
import { useRouter } from 'next/router'

const Home = () => {
  const router= useRouter();
  return (
    <div className='px-4 lg:px-20 flex flex-col lg:flex-row min-h-[88vh] justify-center items-center'>
      <div className='flex flex-col text-white w-full lg:w-1/2 justify-center items-center lg:items-start text-center lg:text-left mt-[2.6rem] lg:m-[0rem]'>
        <h1 className='text-4xl md:text-8xl lg:text-8xl font-gotham font-bold'>MOON FINANCE</h1>
        <h4 className='text-2xl md:text-4xl lg:text-4xl my-5 text-[#ABABAB]'>Your personal AI investment advisor</h4>
        <button onClick={()=>{router.push('/form')}} className='flex items-center md:w-[35%] justify-center flex-row px-4 lg:px-10 py-2 border-2 border-white w-full lg:w-[42%] text-xl lg:text-2xl my-5 rounded-xl bg-[#8d8b8b76]'>
          Start Investing
          <span className='m-1 ml-3'>
            <Image src={ArrowImg} width={22} height={22} alt='Arrow'/> 
          </span>
        </button>
      </div>
      <div className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
        <Image className="object-contain h-auto" src={HomeImg} width={600} height={600}  alt='Home'/>
      </div>
    </div>
  )
}

export default Home