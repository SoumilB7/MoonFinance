import React from 'react';
import Image from 'next/image';
import shrey from '../../public/shrey.svg'
const Picture = (props) => {
  return (
    <>
    <div className='font-poppins'>
        <Image src={props.src} alt="iconhere" width={100} height={100} className='md:w-[300px] md:h-[300px]'/>
        <p className='text-2xl font-bold md:text-4xl md:text-center md:pt-8 pt-4'>{props.text1}</p>
        <p className='text-lg text-[#ABABAB] md:text-2xl md:text-center'>{props.text2}</p>
    </div>
    </>
  )
}

export default Picture